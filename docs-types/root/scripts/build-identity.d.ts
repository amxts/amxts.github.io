/**
 * The version the core builds as: its package.json's, or AMXTS_AS_VERSION's.
 * `bun run publish:local --as 0.2.0` stages the packages as another version
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
 * the core: `bun run abi:lock` writes it when a version is released.
 */
export declare const ABI_LOCK = "runtime/abi-lock.txt";
/**
 * The shapes of a released lock (runtime/abi-lock.txt: the version, then
 * every import of it) that a natives table has no longer, or has otherwise,
 * while the two are of one line: a plugin built for that release would be
 * refused by this one's module. Another line owes the lock nothing.
 */
export declare function shapeChanges(lock: string, natives: string, version?: string): string[];
/** The line of a version, `major.minor`: `0.3` of `0.3.1` and of `0.3.0-rc.1`. */
export declare function releaseLine(version: string): string;
/**
 * What the module compares of an identity: its line and its ground's hash,
 * `0.3+abi.1a2b3c4d` of `0.3.1+abi.1a2b3c4d`. The modules of two identities
 * with one abiLine load each other's plugins, of the imports they both have.
 */
export declare function abiLine(abi: string): string;
