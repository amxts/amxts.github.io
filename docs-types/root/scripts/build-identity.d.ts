/** This checkout's build: the version, and the commit when git knows it. */
export declare function buildIdentity(): string;
/** The build the generated module carries, or null before `bun run generate`. */
export declare const moduleBuild: () => string | null;
/** The ABI the generated module loads plugins of, or null before `bun run generate`. */
export declare const moduleAbi: () => string | null;
/** The `--define`s that build amxts-compile as of `build`, stamping plugins with `abi`. */
export declare function buildDefines(build: string, abi: string): string[];
/** The custom section of a plugin that holds its ABI: wamrc copies it into the .aot. */
export declare const ABI_SECTION = "amxts.abi";
/** The imports a file of the hood declares: `ent_get(i32,i32)i32`, the parameters' names left out. */
export declare function importsOf(code: string): string[];
/**
 * The ABI this core compiles plugins for, which the module it builds loads.
 * amxts-compile on a server has the module's own built in; anywhere else it
 * is read off the hood's files, through the tracked reads, so a cached
 * compile is made again when they change.
 */
export declare function abiIdentity(): string;
