import type { PluginNative } from './plugin-natives';
export interface Plugin {
    /** The .ts to compile. */
    source: string;
    /** The .aot to write. */
    output: string;
    /** What `~/` means: the folder plugins and their libraries live in. */
    root: string;
    wamrc: string;
    signatures: string;
}
/** The hood's exports every plugin carries; see compilePlugin. */
export declare const HOOD_EXPORTS = "__amxts_exports.ts";
/**
 * What the module's coroutine scheduler calls, for a plugin that uses
 * Promise or async/await (as/promise.ts, runtime/src/module.cpp). Only such a
 * plugin carries them: exporting them from every plugin would compile the
 * whole scheduler into plugins that never wait for anything.
 */
export declare const ASYNC_EXPORTS: string;
/** The import a coroutine parks in - the one Asyncify unwinds from. */
export declare const SUSPEND_IMPORT = "env.co_suspend";
/** Where compilePlugin writes the Pawn include for a plugin's own natives. */
export declare function includePath(output: string): string;
/** What went wrong, or null when the plugin compiled. */
export declare function compilePlugin(plugin: Plugin): Promise<string | null>;
/**
 * The first half of compilePlugin: the plugin's .ts to `wasm`, ready for
 * wamrc. Tests run the result as it is; with `names` it keeps its function
 * names, so a test can see what Asyncify instrumented. With `natives`, the
 * plugin's `export function`s become natives, listed there.
 */
export declare function compileToWasm(plugin: Pick<Plugin, 'source' | 'root'>, wasm: string, names?: boolean, natives?: PluginNative[]): Promise<string | null>;
/**
 * Asyncify, so that a coroutine can park in co_suspend and be rewound later.
 *
 * What to instrument is Binaryen's own call graph from that one import: the
 * async function bodies, __await, and whatever calls them directly. Indirect
 * calls are left out (asyncify-ignore-indirect), and that is exact rather
 * than a guess: an async function is always entered by the host - its
 * prologue asks co_spawn to call it - so no `await` is ever reached through
 * a function table, and a listener that is async returns to its caller at its
 * first `await` like any other call. Nothing can be missing from the list,
 * which is the failure that hangs rather than traps.
 */
export declare function asyncify(wasm: Uint8Array, names?: boolean): Uint8Array;
/** `module.name` of every function a wasm binary imports. */
export declare function importsOf(wasm: Uint8Array): Set<string>;
