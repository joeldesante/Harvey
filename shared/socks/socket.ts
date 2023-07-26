import { IncomingMessage } from "http";
import https from "https";
import { URL } from "url";
import { Socket as TCPSocket } from "net";
import { SocketFrameParser } from "./frame_parser";
import { EventEmitter } from "stream";

export class Socket extends EventEmitter {

    private requestOptions;
    private socket: TCPSocket | null;


    constructor(url: string) {

        super();
        const socket_url = new URL(url);
        
        this.socket = null;
        this.requestOptions = {
            host: socket_url.host,
            path: `${socket_url.pathname}?${socket_url.searchParams}`,
            headers: {
                'Connection': 'Upgrade',
                'Upgrade': 'websocket',
                'Sec-WebSocket-Key': '08kp54j1E3z4IfuM1m75tQ==',    // FIXME: Make this a random value each time and implement key validation!
                'Sec-WebSocket-Version': 13
            },
        };
    }

    private onSocketData(buffer: Buffer) {
        const frame = SocketFrameParser.parse(buffer);
        this.emit('message', frame.payload.toString());
    }

    private onRequestUpgraded(response: IncomingMessage, socket: TCPSocket, head: Buffer) {
        this.socket = socket;
        this.socket.on('data', (buffer: Buffer) => { this.onSocketData(buffer) });
    }

    connect() {

        if(this.socket) {
            throw Error("Socket already connected.");
        }

        const request = https.request(this.requestOptions);
        request.on('upgrade', (response: IncomingMessage, socket: TCPSocket, head: Buffer) => { this.onRequestUpgraded(response, socket, head) });
        request.end();

    }
}