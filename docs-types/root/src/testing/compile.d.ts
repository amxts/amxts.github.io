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
