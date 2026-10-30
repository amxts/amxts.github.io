import type { Plugin } from './compile';
import type { NativesBeside, PluginNative } from './plugin-natives';
/** A compile's peak, asc's and wamrc's together: measured at about a gigabyte, with room. */
export declare const COMPILE_MEMORY: number;
/**
 * The least the compiles of a build may hold together: they take half the
 * memory free when it starts, unless AMXTS_BUILD_MEMORY says otherwise. A
 * large plugin's compile holds more than COMPILE_MEMORY - one measured
 * close to 3 GB - and the other half is room for it and for the machine's
 * other work.
 */
export declare const BUILD_MEMORY: number;
/** How many compiles run at once: AMXTS_BUILD_JOBS, else as many as the memory budget holds, at most one per CPU. */
export declare function compileSlots(env?: Record<string, string | undefined>, cpus?: number, free?: number): number;
/**
 * `run` on every item, at most `slots` at a time, each given the slot it runs
 * in (0, 1, ...) and its index: the items start in order, and the results come
 * back in it.
 */
export declare function inSlots<T, R>(items: T[], slots: number, run: (item: T, slot: number, index: number) => Promise<R>): Promise<R[]>;
/** One plugin compiled: what went wrong, or null, and its natives. */
export interface Compiled {
    problem: string | null;
    natives: PluginNative[];
}
/** What a worker is sent: the plugin, and the plugin cache it compiles through (scripts/plugin-cache.ts). */
export interface WorkerJob {
    plugin: Plugin;
    /** The project, whose cache it is; null for none. */
    dir: string | null;
    /** The includes the build writes itself. */
    includes: string[];
}
export type WorkerResult = Compiled & {
    beside: NativesBeside;
};
export interface CompileAll {
    /** The project and the includes its builds write: the plugin cache's (null: none). */
    dir: string | null;
    includes: string[];
    /** The compile in this process: the build's plugin cache. */
    here: (plugin: Plugin, natives: PluginNative[]) => Promise<string | null>;
    started?: (index: number) => void;
    finished?: (index: number, compiled: Compiled) => void;
    /** The workers below the machine's other work: the test server's build, which no one waits on at the keyboard. */
    low?: boolean;
}
/**
 * The plugins compiled, several at once when there is room - in this process
 * when there is room for one. After a failure no other compile starts: those
 * that did not are null.
 */
export declare function compileAll(plugins: Plugin[], options: CompileAll): Promise<(Compiled | null)[]>;
