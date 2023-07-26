import { IncomingMessage } from "http";
import { randomBytes, createHash } from "crypto";
import https from "https";
import { URL } from "url";
import { Socket as TCPSocket } from "net";
import { SocketFrameParser } from "./frame_parser";
import { EventEmitter } from "stream";

export class Socket extends EventEmitter {

    private socket: TCPSocket | null;
    private readonly requestOptions;
    private readonly socketSecKey: string;


    constructor(url: string) {

        super();
        const socket_url = new URL(url);
        this.socketSecKey = Socket.generateWebsocketKey();

        this.socket = null;
        this.requestOptions = {
            host: socket_url.host,
            path: `${socket_url.pathname}?${socket_url.searchParams}`,
            headers: {
                'Connection': 'Upgrade',
                'Upgrade': 'websocket',
                'Sec-WebSocket-Key': this.socketSecKey,
                'Sec-WebSocket-Version': 13
            },
        };
    }

    private onSocketData(buffer: Buffer) {
        const frame = SocketFrameParser.parse(buffer);
        this.emit('message', frame.payload.toString());
    }

    private onRequestUpgraded(response: IncomingMessage, socket: TCPSocket, head: Buffer) {

        if(!response.headers["sec-websocket-accept"]) {
            throw new Error("Server did not respond with Sec-Websocket-Accept header.");
        }

        const isSocketValid = Socket.validateWebsocketAccept(this.socketSecKey, response.headers["sec-websocket-accept"]);
        if (!isSocketValid) {
            this.disconnect();
            throw new Error("Invalid Sec-WebSocket-Accept header value.");
        }

        this.socket = socket;
        this.socket.on('data', (buffer: Buffer) => { this.onSocketData(buffer) });
    }

    private static generateWebsocketKey(): string {
        const randomBytesValue = randomBytes(16);
        return randomBytesValue.toString("base64")
    }

    private static validateWebsocketAccept(key: string, accept: string): boolean {
        const WEBSOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";      // See https://www.rfc-editor.org/rfc/rfc6455#section-1.3
        const keyToHash = `${key}${WEBSOCKET_GUID}`;
        const hash = createHash('sha1').update(keyToHash).digest('base64');
        return hash === accept;
    }

    /**
     * Opens the conncetion to the server.
     */
    connect() {

        if(this.socket) {
            throw Error("Socket already connected.");
        }

        const request = https.request(this.requestOptions);
        request.on('upgrade', (response: IncomingMessage, socket: TCPSocket, head: Buffer) => { this.onRequestUpgraded(response, socket, head) });
        request.end();
    }

    /**
     * Closes the connection from the server/
     */
    disconnect() {
        if(!this.socket) {
            throw Error("Socket was never connected.");
        }

        this.socket.end();
        this.socket.destroy();
    }

    /**
     * Sends a message from the client to the recieving server.
     */
    send(message: string) {
        if(!this.socket) {
            throw new Error("Can not send message. The socket is not connected.");
        }
        this.socket.write(message);
    }
}