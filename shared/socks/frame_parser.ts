enum FrameType {
    CONTINUATION = 0,
    TEXT = 0x1,
    BINARY = 0x2,
    CLOSE = 0x8,
    PING = 0x9,
    PONG = 0xA,
    OTHER
}

enum FrameHeaderMask {
    FIN = 0b1000000000000000,
    PAYLOAD_SIZE = 0b0000000001111111,
    OPCODE = 0b0000111100000000
}

class Frame {

    readonly isFinal: boolean;
    readonly type: FrameType;
    readonly length: number;
    readonly payload: Buffer;

    constructor(type: FrameType, length: number, isFinal: boolean, payload: Buffer) {
        this.type = type;
        this.isFinal = isFinal;
        this.length = length;
        this.payload = payload;
    }
}

export type { Frame, FrameType };

export class SocketFrameParser {
    static parse(buffer: Buffer): Frame {
        
        const frameHeader = buffer.subarray(0, 2);
        const payload = buffer.subarray(2);

        return new Frame(FrameType.TEXT, payload.byteLength, true, payload);

    }
}