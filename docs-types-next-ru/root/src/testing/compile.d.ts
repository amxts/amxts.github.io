import type { PluginNative } from '../../scripts/plugin-natives';
/** A compiled plugin, and the natives its `export function`s became. */
export interface Compiled {
    module: any;
    natives: PluginNative[];
    /** The binary, for a plugin that awaits: the scheduler reads its function table. */
    binary: Uint8Array;
    /** Whether it carries the coroutine scheduler's exports (as/promise.ts). */
    async: boolean;
}
/** Forgets what this run compiled, so that the next compile() asks the disk cache again. */
export declare function forgetCompiled(): void;
/**
 * The plugin at `source` as a WebAssembly.Module, compiled once per test run.
 *
 * One flag differs from the server build: `--exportStart`. On the server WAMR
 * runs a plugin's top level while it instantiates, and its natives can read
 * the plugin's memory while that happens. A JavaScript import cannot - the
 * instance, and the memory with it, exists only once instantiation is over -
 * so the top level is exported as `_start` and the fake calls it straight
 * afterwards. The order of everything is the same.
 */
export declare function compile(source: string): Promise<Compiled>;
/**
 * scripts/compile.ts's compileToWasm - the server build's first half - with
 * the disk cache in front: the problem it reports, or null and `wasm` written.
 */
export declare function compileWasmFile(plugin: {
    source: string;
    root: string;
}, wasm: string, names?: boolean): Promise<string | null>;
/** What asc made of sources held in memory: the binary and the text files it wrote, or what it printed. */
export interface SourcesCompiled {
    error: string | null;
    binary: Uint8Array | null;
    /** Text outputs by the name asc was given: `--textFile probe.wat`. */
    text: Record<string, string>;
}
/**
 * asc - the patched one, as the build runs it - on `sources` alone, a test's
 * snippet of the compiler at work, with the disk cache in front. Nothing is
 * read from disk, so the sources and `args` are the whole key.
 */
export declare function compileSources(args: string[], sources: Record<string, string>): Promise<SourcesCompiled>;
/**
 * wamrc from `wasm` to `aot`, with the disk cache in front - keyed by the
 * binary, wamrc itself and its arguments: its exit status and what it printed.
 */
export declare function compileAot(wamrc: string, args: string[], wasm: string, aot: string): Promise<{
    status: number | null;
    output: string;
}>;
