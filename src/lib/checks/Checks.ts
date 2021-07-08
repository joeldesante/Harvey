/* src\lib\checks\Checks.ts
 * Joel DeSante
 * Copyright (c) Joel DeSante, 2021
 */

export class Checks {
    public static onFalse(value: boolean): boolean {
        return !value;
    }

    public static onNull(value: any): boolean {
        if (value === null) return true;
        return false;
    }

    public static onUndefined(value: any): boolean {
        if(value === undefined) return true;
        return false;
    }
}