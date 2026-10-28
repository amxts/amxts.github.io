import type { Change, SkipCode } from "./model";
/** A change the model refused, and why. */
export interface Skipped {
    change: Change;
    code: SkipCode;
    reason: string;
}
export interface Committed {
    done: Change[];
    skipped: Skipped[];
}
/** Starts the store: MySQL when `url` is given, else the file; reads it. */
export declare function open(file: string, url: string): Promise<void>;
/** Reads the store again: `perms reload`, `amx_reloadadmins`. */
export declare function reload(): Promise<void>;
/** Applies changes in order, writes those that applied, and works the players out again. */
export declare function commit(changes: Change[]): Promise<Committed>;
/** Writes the whole model to the store, after an import. */
export declare function writeEverything(): Promise<void>;
export declare function storageName(): "file" | "mysql";
