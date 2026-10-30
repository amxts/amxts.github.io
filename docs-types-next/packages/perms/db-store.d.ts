import type { Change } from "./model";
export declare function useDatabase(url: string): void;
export declare function usesDatabase(): boolean;
export declare function createTables(): Promise<void>;
/** Reads every table into the model. */
export declare function readDatabase(): Promise<void>;
/** Whether another server changed the set since it was read. */
export declare function changedElsewhere(): Promise<boolean>;
/** Writes the changes the model applied and moves the revision, so the other servers read them. */
export declare function writeChanges(changes: Change[]): Promise<void>;
/** Writes the whole model, for `perms import` into an empty database. */
export declare function writeAll(): Promise<void>;
