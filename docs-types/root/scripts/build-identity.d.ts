/** This checkout's build: the version, and the commit when git knows it. */
export declare function buildIdentity(): string;
/** The build the generated module carries, or null before `bun run generate`. */
export declare function moduleBuild(): string | null;
/** The `--define` that builds amxts-compile as of `build`. */
export declare function buildDefine(build: string): string;
