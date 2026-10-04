/** The third-party includes the core generates the API from: `bun run setup` fetches them. */
export declare const VENDOR: string;
/** The server's own includes: addons/amxmodx/scripting/include beside its addons/amxts (AMXTS_SERVER), when it is there. */
export declare function serverIncludes(): string | null;
/** The folders includes are looked in for a project, first to last. */
export declare function includeDirs(project?: string): string[];
export declare function listIncludes(): string[];
export declare function includePath(name: string): string;
export declare function readInclude(name: string): string;
/**
 * Parses includes/order.txt. A bare name is included and (by the host
 * generator) pulled; a line starting with `-` is a deny marker - the name
 * still has to resolve (an include that #includes it needs it on disk), but
 * it is excluded from whatever build the caller pulls into a native table.
 */
export declare function parseOrder(content: string): {
    includes: string[];
    denied: Set<string>;
};
/** The listed names plus everything they #include, recursively. */
export declare function resolveTransitive(names: string[]): string[];
