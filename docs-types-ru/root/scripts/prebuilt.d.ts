import type { NativesBeside, PluginNative } from './plugin-natives';
import type { ModulePackage, Options, Sources } from './project';
import type { System } from './system';
/** Where a module package keeps its compiled owner: prebuilt/<system>/<name>.aot, and the manifest. */
export declare const PREBUILT_DIR = "prebuilt";
/** A package as a prebuilt module was compiled with it. */
interface Built {
    version: string;
    /** Its content: the code files, TypeScript without comments. */
    hash: string;
}
export interface PrebuiltManifest {
    format: number;
    module: string;
    version: string;
    /** The core and every module package the compile read, by name. */
    from: Record<string, Built>;
    /** The options each of those modules was compiled with. */
    options: Record<string, Options>;
    /** The forwards it raises with something other than text, as the includes declared them (null: none did). */
    forwards: Record<string, string | null>;
    /** The places under `~/` the compile read: a project's plugins folder must not hold them. */
    places: string[];
    /** Its natives, for the include a Pawn plugin compiles against. */
    natives: PluginNative[];
    beside: NativesBeside;
    systems: Partial<Record<System, {
        file: string;
        size: number;
        sha256: string;
    }>>;
}
/** What a build does with a module's prebuilt .aot: takes it, or compiles the module and says why. */
export type PrebuiltUse = {
    aot: Uint8Array;
    natives: PluginNative[];
    beside: NativesBeside;
} | {
    why: string;
};
/** Whether a package's folder is one a package manager installed, not a folder on this machine. */
export declare function fromRegistry(dir: string): boolean;
/**
 * The prebuilt .aot of a module from npm for `system`, when it is what the
 * project would compile; else why not. Null for a module that has none - a
 * folder on this machine, or a package without prebuilt/ - which is compiled
 * as any plugin is.
 */
export declare function prebuiltOf(pkg: ModulePackage, system: System, sources: Sources): PrebuiltUse | null;
export {};
