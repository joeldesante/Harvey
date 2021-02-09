import { Client } from "discord.js";
import { Service } from "./Service";

export class ServiceManager {

    private registeredServices: Array<Service>;
    private client: Client;

    constructor(client: Client) {
        this.registeredServices = new Array<Service>();
        this.client = client;
    }

    registerService(service: Service) {
        this.registeredServices.push(service);
        service.start(this.client);
    }

    stopAllServices() {
        this.registeredServices.forEach(service => {
            service.stop();
        });
    }
}