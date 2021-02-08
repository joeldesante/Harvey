export abstract class Controller {
    /**
     * 
     * @param data All needed data shall be included in the map.
     */
    abstract execute(data: Map<string, any>): Promise<null>;
}