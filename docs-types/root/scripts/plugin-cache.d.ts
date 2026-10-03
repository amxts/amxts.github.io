import type { Plugin } from './compile';
import type { NativesBeside, PluginNative } from './plugin-natives';
/** A plugin as the cache keeps it: its .aot, and the natives its include is written from. */
interface Kept {
    aot: Uint8Array;
    natives: PluginNative[];
    beside: NativesBeside;
}
/**
 * The plugin cache of the project in `dir`; with null, nothing is kept.
 * `ownIncludes`: the includes the build writes - its plugins' - by name.
 */
export declare function pluginCache(dir: string | null, ownIncludes?: string[]): {
    counts: {
        hits: number;
        misses: number;
    };
    /** The plugin as an earlier build kept it, put in place; its natives. Null when there is none to take. */
    reuse(plugin: Plugin): PluginNative[] | null;
    take: typeof take;
    /** compilePlugin, and what it made kept: what went wrong, or null. `natives` gets the plugin's natives. */
    compile(plugin: Plugin, natives: PluginNative[]): Promise<string | null>;
};
/**
 * A plugin compiled before - kept by a build, or come with its module
 * (scripts/prebuilt.ts) - put in place as the plugin, with its include; its natives.
 */
declare function take(plugin: Plugin, kept: Kept): PluginNative[];
export {};
