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
     * of asc's full optimisation, and wamrc at -O0 (QUICK_LEVELS) - a few
     * seconds for a small plugin rather than ten. It does the same, a little slower.
     */
    quick?: boolean;
}
/** The hood's exports every plugin carries; see compilePlugin. */
export declare const HOOD_EXPORTS = "__amxts_exports.ts";
/**
 * The second entry of a plugin that never waits: its globals - Promise,
 * defineModule - are there for any plugin, one that imports nothing
 * included; and the hood exports where its walks of listeners keep the
 * slowest one, which the module reads and sets (as/facade.ts, __probe):
 * exported, the optimiser does not fold them away.
 */
export declare const BASE_EXPORTS = "import \"~/facade\";\nexport { __probe, __probeAt, __probeEnv, __probeUs } from \"~/facade\";\n";
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
 * What finishing throws to stop asc as soon as a plugin compiled without the
 * scheduler's exports turns out to make a promise: it is compiled again with
 * them, and asc's optimiser - most of a compile's time - is not run on a
 * module that goes. asc hands a transform's throw back as its error.
 */
export declare const MAKES_PROMISE: Error;
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
 * wamrc, with its map (scripts/source-map.ts). Tests run the result as it is;
 * with `names` it keeps its function names, so a test can see what Asyncify
 * instrumented. With `natives`, the plugin's `export function`s become
 * natives, listed there.
 */
export declare function compileToWasm(plugin: Pick<Plugin, 'source' | 'root' | 'quick'>, wasm: string, names?: boolean, natives?: PluginNative[]): Promise<string | null>;
/**
 * The last transform of a compile: Binaryen's work after asc's own, on the
 * module asc is about to write - a quick build's optimisation at `level`,
 * and Asyncify for a plugin whose coroutines can park. It runs there rather
 * than on the written binary so that the source map asc writes beside it is
 * of the code that runs: Binaryen reads a binary without its map. asc has no
 * hook after its optimiser, so this wraps the module's emitBinary, which asc
 * calls once to write the module. `done` gets the functions' names, by wasm
 * index, as they are written.
 *
 * A plugin that makes a promise - an async function, fetch, sleep - has the
 * host drive its jobs, so one compiled without the scheduler's exports stops
 * here, before asc's optimiser, with MAKES_PROMISE, to be compiled again with
 * them: the optimiser has the whole program, and one compiled with them comes
 * out otherwise. The optimiser only takes imports away, so a plugin that does
 * not import co_wake here never does.
 */
export declare function finishing(hoodExports: string, level: number | null, done?: (first: number, names: string[]) => void): {
    afterCompile(module: any): void;
};
/** `module.name` of every function a wasm binary imports. */
export declare function importsOf(wasm: Uint8Array): Set<string>;
