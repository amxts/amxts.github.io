export declare const DEFAULT_STORE = "https://perms-store.brokukaschannel.workers.dev";
interface WireOwner {
    group?: string;
    user?: string;
}
interface WireChange {
    op: string;
    owner?: WireOwner;
    node?: string;
    value?: boolean;
    until?: string | null;
    server?: string | null;
    group?: string;
    weight?: number;
    parent?: string;
    user?: string;
    name?: string;
}
interface WireRevision {
    revision: number;
    changes: WireChange[];
}
export declare function setStore(url: string): void;
export declare function isOpen(): boolean;
/** Opens a session, or gives the one that is open; the lines to print, or an error's. */
export declare function openEditor(): Promise<string>;
/** Closes the session: the store forgets it and the module stops polling. */
export declare function closeEditor(): Promise<void>;
/** Applies what the page saved, revision by revision, applies it and says so to the store. */
export declare function applyRevisions(revisions: WireRevision[]): Promise<void>;
export {};
