import type { PluginNative } from './plugin-natives';
import type { System } from './system';
export interface Plugin {
    /** The .ts to compile. */
    source: string;
    /** The .aot to write. */
    output: string;
    /** What `~/` means: the folder plugins and their libraries live in. */
    root: string;
    wamrc: string;
    signatures: string;
    /**
     * The system of the server that loads it: the .aot is written in that
     * system's object format (scripts/system.ts). This machine's by default.
     */
    system?: System;
    /**
     * Compiled for a development loop (`amxts dev`): Binaryen's -O1 in place
     * of asc's full optimisation, and wamrc at -O0 - a few seconds for a small
     * plugin rather than ten. It does the same, a little slower.
     */
    quick?: boolean;
}
/** The hood's exports every plugin carries; see compilePlugin. */
export declare const HOOD_EXPORTS = "__amxts_exports.ts";
/**
 * The second entry of a plugin that never waits: the hood has nothing to
 * export, but its globals - Promise, defineModule - are there for any
 * plugin, one that imports nothing included.
 */
export declare const BASE_EXPORTS = "import \"~/facade\";\n";
/**
 * What the module's coroutine scheduler calls, for a plugin that uses
 * Promise or async/await (as/promise.ts, runtime/src/module.cpp). Only such a
 * plugin carries them: exporting them from every plugin would compile the
 * whole scheduler into plugins that never wait for anything.
 */
export declare const ASYNC_EXPORTS: string;
/**
 * A transform that moves the imports at the end of a file - the ones the
 * build adds (scripts/auto-imports.ts), after the file's last line - to its
 * top, as ES modules run an imported file before the one that imports it:
 * asc compiles an imported file's top level where the import stands. The
 * imports a file writes itself stay where they are.
 */
export declare class HoistImports {
    afterParse(parser: any): void;
}
/** The import a coroutine parks in - the one Asyncify unwinds from. */
export declare const SUSPEND_IMPORT = "env.co_suspend";
/**
 * Where compilePlugin writes the Pawn include for a plugin's natives: beside
 * the .aot, named after the plugin - or, for a plugin that implements an
 * include (a contract), under that include's own name, so a Pawn plugin's
 * `#include` of it works whatever the module is called.
 */
export declare function includePath(output: string, natives?: PluginNative[]): string;
/** What went wrong, or null when the plugin compiled. `natives` gets the plugin's natives. */
export declare function compilePlugin(plugin: Plugin, natives?: PluginNative[]): Promise<string | null>;
/**
 * The second half of compilePlugin: wamrc, from `wasm` to the plugin's .aot
 * for its system, with the include of its `natives` beside it. One wasm
 * makes the .aot of either system (scripts/prebuilt.ts makes both).
 */
export declare function compileToMachineCode(plugin: Plugin, wasm: string, natives: PluginNative[]): string | null;
/**
 * The plugin's `export function`s, as a Pawn plugin includes them, beside
 * its .aot. One that exports nothing leaves no include behind, not even a
 * stale one; neither does a contract, whose include has a name of its own.
 */
export declare function writeInclude(output: string, natives: PluginNative[]): void;
/**
 * The first half of compilePlugin: the plugin's .ts to `wasm`, ready for
 * wamrc. Tests run the result as it is; with `names` it keeps its function
 * names, so a test can see what Asyncify instrumented. With `natives`, the
 * plugin's `export function`s become natives, listed there.
 */
export declare function compileToWasm(plugin: Pick<Plugin, 'source' | 'root' | 'quick'>, wasm: string, names?: boolean, natives?: PluginNative[]): Promise<string | null>;
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
export declare function asyncify(wasm: Uint8Array, names?: boolean, level?: number): Uint8Array;
/** `module.name` of every function a wasm binary imports. */
export declare function importsOf(wasm: Uint8Array): Set<string>;
