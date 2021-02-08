export abstract class Controller {
    /**
     * 
     * @param data All needed data shall be included in the map.
     * @returns true if the command was successful.
     */
    abstract execute(data: Map<string, any>): void;
}