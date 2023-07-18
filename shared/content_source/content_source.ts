/**
 * An imutable strucuture that represents a content source.
 * 
 * Content sources is a identifiable source which content can come from. 
 * Content sources can be subscribed to by admins or networks. When a content source is 
 * subscribed to, it whitelists the source and begins making those incoming parcels available.
 * 
 * For example, if I wanted to make it so everytime I sent an email from `joel@example.com` it would
 * send an announcment in my Discord server, I would first create a content source for this email and then
 * I would subscribe my server to the source so that they are linked.
 */
export class ContentSource {
    public readonly id: string;
    public readonly source: string;

    constructor(id: string, source: string) {
        this.id = id;
        this.source = source;
    }

    getSubscribers(): Array<string> {
        return [];
    }

    /**
     * Resolves a content source from a given email address.
     * If the content source does not exist in persistant storage it will create
     * a new one.
     */
    static resolveFromEmail(email: string): ContentSource {
        return new ContentSource("1", "joel@example.com");
    }
}