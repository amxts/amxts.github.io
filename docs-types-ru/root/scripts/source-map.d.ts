/** The custom section's name. */
export declare const MAP_SECTION = "amxts.map";
/** A place in the TypeScript: 1-based line and column. */
export interface Place {
    file: string;
    line: number;
    column: number;
}
/** A plugin's map, read back. */
export interface PluginMap {
    /** The project's folder for a dev build, else empty: the files are relative to it. */
    root: string;
    files: string[];
    first: number;
    functions: string[];
    mappings: string;
}
/**
 * A plugin's map from asc's source map: each file by `name` - null leaves it
 * out, its code then has no place - and `functions`, by wasm index from
 * `first`. Code the source map gives no place - a call the optimiser made
 * anew, as often as not - is where the code before it is: a frame stops at
 * such calls. A mapping that says what the one before it said goes.
 */
export declare function pluginMap(sourceMap: string, name: (file: string) => string | null, first: number, functions: string[], root?: string): PluginMap;
/** Where the code at byte `offset` of the wasm came from, or null. */
export declare function placeOf(map: PluginMap, offset: number): Place | null;
/**
 * A function's name as a stack shows it, from its name in the wasm; empty
 * for the library's error handling - `__throw`, the errors' constructors,
 * what makes their stack - which a stack leaves out: the frame below is where
 * the error was made.
 */
export declare function displayName(internal: string): string;
/** The section's text for `map`. */
export declare function mapText(map: PluginMap): string;
/** `wasm` with `text` appended as the custom section `name`. */
export declare function withSection(wasm: Uint8Array, name: string, text: string): Uint8Array;
/** The map a wasm carries, or null. */
export declare function readMap(wasm: Uint8Array): PluginMap | null;
/** The text of a wasm's custom section by its name, or null. */
export declare function readSection(wasm: Uint8Array, wanted: string): string | null;
/** The section's text, read back. */
export declare function parseMap(text: string): PluginMap;
