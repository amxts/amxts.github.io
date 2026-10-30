/**
 * The version the core builds as: its package.json's, or AMXTS_AS_VERSION's.
 * `npm run publish:local -- --as 0.2.0` stages the packages as another version
 * than the checkout's; the modules it compiles for them, and a module built
 * for a server that runs their plugins, are of that version only with it set.
 */
export declare function coreVersion(): string;
/** This checkout's build: the version, and the commit when git knows it. */
export declare function buildIdentity(): string;
/** The custom section of a plugin that holds its ABI: wamrc copies it into the .aot. */
export declare const ABI_SECTION = "amxts.abi";
/** The natives table a compile reads: AMXTS_NATIVES, else the core's. */
export declare function nativesFile(): string | undefined;
/** The name of an import's shape: `add` of `add (iiii)i [a1>,v,s,v leaf`. */
export declare const importName: (shape: string) => string;
/** Every import there is, by name, with its shape. */
export declare function importShapes(): Map<string, string>;
/**
 * The ground this core compiles plugins on, which the module it builds loads
 * plugins of: `0.3.1+abi.1a2b3c4d`. It is read off the patches, through the
 * tracked reads, so a cached compile is made again when they change.
 */
export declare function abiIdentity(): string;
/**
 * The ABI section of a plugin that imports `imports` (`env.add`, as a wasm
 * names them): the identity, then the shape of each import, a line each.
 */
export declare function pluginAbi(imports: Iterable<string>): string;
/**
 * The imports of the line's last release, each with its shape, relative to
 * the core: `npm run abi:lock` writes it when a version is released.
 */
export declare const ABI_LOCK = "runtime/abi-lock.txt";
/**
 * The shapes of a released lock (runtime/abi-lock.txt: the version, then
 * every import of it) that a natives table has no longer, or has otherwise,
 * while the two are of one line: a plugin built for that release would be
 * refused by this one's module. Another line owes the lock nothing.
 */
export declare function shapeChanges(lock: string, natives: string, version?: string): string[];
/**
 * The dispatcher's ids as/natives.ts gives, the natives by id: `log_amx` at
 * 49 of `export const NATIVE_log_amx: i32 = 49;`. A plugin passes the id to
 * the dispatcher (the import `call`) to reach a variadic native.
 */
export declare function dispatcherIds(natives: string): string[];
/**
 * The dispatcher's ids of a released lock, the natives by id, while the lock
 * and `version` are of one line; none for another line, which may renumber.
 */
export declare function lockedCalls(lock: string, version?: string): string[];
/**
 * The ids of a released lock that `ids` (dispatcherIds) gives to another
 * native, or to none: a plugin built for that release would call the wrong
 * native, in silence. A new variadic native takes an id after the locked ones.
 */
export declare function callChanges(lock: string, ids: string[], version?: string): string[];
/** The line of a version, `major.minor`: `0.3` of `0.3.1` and of `0.3.0-rc.1`. */
export declare function releaseLine(version: string): string;
/**
 * What the module compares of an identity: its line and its ground's hash,
 * `0.3+abi.1a2b3c4d` of `0.3.1+abi.1a2b3c4d`. The modules of two identities
 * with one abiLine load each other's plugins, of the imports they both have.
 */
export declare function abiLine(abi: string): string;
/**
 * The imports of a plugin's ABI section that a released lock has not with
 * that shape, and the release: a core newer than it made them - a checkout
 * past the release - and a server of that release refuses the plugin.
 */
export declare function unlockedImports(abi: string, lock: string): {
    release: string;
    imports: string[];
};
/** What a module file loads plugins of: its ABI and its imports, each with its shape. */
export interface ModuleAbi {
    abi: string;
    shapes: Map<string, string>;
}
/**
 * What a module file loads, read off the file as moduleAbiOf reads its ABI:
 * the natives table it carries (g_nativesTable, runtime/src/embedded.h) is
 * strings of whole lines, so its shapes are the strings' lines of that form.
 * Null when the file carries no ABI.
 */
export declare function moduleAbi(file: string): ModuleAbi | null;
/**
 * Why a module refuses a plugin whose ABI section is `abi`, as its AbiFits
 * decides - another line or ground, an import it has not or has of another
 * shape - or null when it loads it.
 */
export declare function refusal(abi: string, module: ModuleAbi): string | null;
