import { ContentSource } from "../content_source/content_source";
import { Attachment } from "./attachment";

/**
 * A parcel is a "package" containing a title, message, author, attachments, and other related metadata. 
 *
 * Parcels are a generic container that Harvey uses to bundle information together so that it can eventually be 
 * distributed to a number of different distrobution channels.
 *
 * The idea is that Harvey can recieve data from some source (email, api, or other), package 
 * it into a parcel, then redistribute the parcel to another outgoing channel 
 * (like a discord announment channel, a reddit feed, a twitter/threads feed, or a blog).
 *
 * Parcels act as a reliable and consistent intermediary structure so that we arn't left trying 
 * to parse all of the possible input streams on the fly.
 * 
 * Parcels are immutable data structures. They will never change once they have been created.
 */
export class Parcel {
    public readonly subject: string;
    public readonly message: string;
    public readonly author: ContentSource;
    public readonly attachments: ReadonlyArray<Attachment>;
    public readonly createdOn: Date;

    constructor(subject: string, message: string, author: ContentSource, attachments: ReadonlyArray<Attachment>, createdOn?: Date) {
        this.subject = subject;
        this.message = message;
        this.author = author;
        this.attachments = attachments;
        this.createdOn = createdOn || new Date();
    }
}