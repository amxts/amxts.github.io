export declare function listIncludes(): string[];
export declare function includePath(name: string): string;
export declare function readInclude(name: string): string;
/**
 * Parses includes/order.txt. A bare name is included and (by the host
 * generator) pulled; a line starting with `-` is a deny marker — the name
 * still has to resolve (reapi.inc unconditionally #includes reapi_vtc,
 * reapi_reunion and reapi_rechecker, so they must be on disk to compile it),
 * but it is excluded from whatever build the caller pulls into a native
 * table. A #include costs nothing; a native reference does, because AMX Mod X
 * refuses to load a plugin whose native table names a module the server does
 * not have loaded.
 */
export declare function parseOrder(content: string): {
    includes: string[];
    denied: Set<string>;
};
/** The listed names plus everything they #include, recursively. */
export declare function resolveTransitive(names: string[]): string[];
