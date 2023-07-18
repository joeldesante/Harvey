/**
 * These flags act as hints for other Harvey services so that it is easier to decern the type of data
 * being processed.
 * 
 * `IMAGE`
 * Identifies attachments which contain still image data.
 * 
 * `VIDEO`
 * Identifies attachments which contain video data.
 * 
 * `FILE`
 * Identifies attachments which are generically a file type (pdf, txt, etc...).
 * 
 * `OTHER` 
 * A catch all for when you dont want to explicitly label the attachment type.
 */
export enum AttachmentType {
    IMAGE,
    VIDEO,
    FILE,
    OTHER
}

/**
 * An immutable structure to contain attachment data for a parcel.
 * An attachment could be an image, video, file, or any other media/object.
 */
export class Attachment {

    readonly data: ArrayBuffer;
    readonly name: string;
    readonly attachmentType: AttachmentType;
    
    constructor(data: ArrayBuffer, name: string, attachmentType: AttachmentType) {
        this.data = data;
        this.name = name;
        this.attachmentType = attachmentType;
    }
}