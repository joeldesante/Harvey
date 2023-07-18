interface Queue<T> {

    /**
     * Pushes an object of the given type to the end of the queue.
     * @param object 
     */
    push(object: T): void
    
    /**
     * Pops the first item off the queue and returns that value.
     */
    pop(): T

    /**
     * The number of items in the queue
     */
    size(): Number
}