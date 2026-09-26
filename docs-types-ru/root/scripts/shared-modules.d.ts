/**
 * Whether a plugin owns `~/modules/<name>`: as/<name>.ts beside it - or, on a
 * server, where plugins are compiled from the plugins folder, <name>.aot.
 */
export declare function hasOwner(root: string, name: string): boolean;
type Wire = {
    kind: 'num';
    as: string;
} | {
    kind: 'bool';
} | {
    kind: 'str';
} | {
    kind: 'player';
} | {
    kind: 'null';
    of: Wire;
} | {
    kind: 'array';
    of: Wire;
} | {
    kind: 'fn';
    params: Wire[];
    result: Wire | null;
    sig: number;
} | {
    kind: 'record';
    cls: ClassInfo;
} | {
    kind: 'handle';
    cls: ClassInfo;
};
interface ClassInfo {
    /** As written: `Menu`. */
    name: string;
    /** The compiler's name: `modules/menu-core/Menu`. */
    internal: string;
    /** Where to import it from: `~/facade`; null for the module's own. */
    from: string | null;
    /**
     * `optional`: an optional boolean (`force?: boolean`) - whether it was
     * given crosses too, so `options.force ?? true` reads the same on the other
     * side. An optional number crosses as its undefined, an optional object as null.
     */
    fields: {
        name: string;
        wire: Wire;
        optional?: boolean;
        readonly?: boolean;
        declared?: string;
    }[];
    /** It has methods: a record goes back after a call, as the other side left it. */
    methods: boolean;
    /** A handle's public methods, which the proxy calls on the owner's object. */
    calls: ExportedFunction[];
    /** Import alias for a class the module does not declare. */
    alias: string;
}
interface ExportedFunction {
    name: string;
    /** The parameters as the module writes them, defaults included. */
    params: string[];
    paramNames: string[];
    wires: Wire[];
    result: Wire | null;
}
export interface ModuleAnalysis {
    name: string;
    /** The module's source. */
    text: string;
    functions: ExportedFunction[];
    /** Exported types other than handles, as the module writes them: copied into the proxy. */
    declarations: string[];
    /** The module's imports, as `import` lines, with the names they bring in. */
    imports: {
        names: string[];
        line: (used: Set<string>) => string | null;
    }[];
    handles: ClassInfo[];
    classes: ClassInfo[];
    fns: Wire[];
    hash: number;
}
/** The module's exports, as the compiler sees them; remembered while the file is unchanged. */
export declare function analyzeModule(root: string, name: string): Promise<ModuleAnalysis>;
/** The module as a plugin that does not own it reads it. */
export declare function proxySource(analysis: ModuleAnalysis): string;
/** The owner's side: the dispatcher that runs each call on the real module. */
export declare function serveSource(analysis: ModuleAnalysis): string;
/**
 * One compile's shared modules: which of the modules it reaches it runs and
 * which it calls, worked out - and the modules analysed - before asc starts.
 * `read` goes into the compile's readFile, `transform` into its transforms.
 */
export declare function sharedModulesBuild(root: string, entry: string): Promise<{
    /** The proxy in place of a module this plugin does not own. */
    read(path: string, text: string): string;
    transform: {
        new (): {
            afterParse(parser: any): void;
        };
    };
}>;
export {};
