export interface ServerFile {
    /** Under addons/amxts. */
    path: string;
    text: string;
    /** The author's: written only while missing. */
    keep: boolean;
}
/**
 * The editor's settings for the plugins folder. AssemblyScript's standard
 * library beside it (`.assemblyscript/`, which a server kit carries with the
 * compiler) gives the types; `~/` is the folder itself, and `@amxts/core`
 * and its entries are the core's files in it.
 * Written out rather than extending assemblyscript/std/assembly.json, as the
 * core's own does: that path only resolves where node_modules is.
 */
export declare function serverTsconfig(): string;
/** What goes into addons/amxts, in the order it is written. */
export declare function serverFiles(): ServerFile[];
