import { ContentSource } from "../content_source";
import { Parcel } from "./parcel";

/**
 * The parcel context is a structure that contains a parcel and metadata (context) about where it should be
 * "delivered" within the application. The parcel itself is only a container for the message data. This context
 * "wraps" the parcel and contains critical information such as who the intended reciepient of the message is.
 * 
 * This is needed for when we have multiple admins using one ingress point. Each admin only expects to see parcels
 * relevant to them.
 */
export class ParcelContext {
    readonly parcel: Parcel;
    readonly recipient: ContentSource;

    constructor(parcel: Parcel, recipient: ContentSource) {
        this.parcel = parcel;
        this.recipient = recipient;
    }
}

/**
 * The master queue which manages all incoming parcels. 
 * This manager handles all incoming parcels and distributes them to the correct subscribers.
 */
export class ParcelManager {

    private static instance: ParcelManager;

    public static getInstance(): ParcelManager {
        if (!ParcelManager.instance) {
            ParcelManager.instance = new ParcelManager();
        }
        return ParcelManager.instance;
    }

    /**
     * Posts the parcel (wrapped in a parcel context) to persistant storage where it can be accessed by relevant
     * subscribers.
     * @param object 
     */
    send(object: ParcelContext) {
        // 1. Store in the database
        console.log(object, "Parcel Context Posted!");
    }
}