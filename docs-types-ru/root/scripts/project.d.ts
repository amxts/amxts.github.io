/** The core's folder: the package this file ships in. */
export declare const CORE_DIR: string;
/** What `~/` is: the core's facade, natives and libraries. */
export declare const CORE_PLUGINS: string;
export declare const CONFIG_FILE = "amxts.config.ts";
/** What amxts.config.ts exports, before any module's own key. */
export interface AmxtsConfig {
    modules?: string[];
    /** Where the project's plugins are, from the project's folder: "plugins". */
    pluginsDir?: string;
    /** Where the build writes the .aot files and plugins.ini: "dist". */
    outDir?: string;
    [configKey: string]: unknown;
}
export type OptionValue = string | number | boolean | null | OptionValue[] | {
    [key: string]: OptionValue;
};
export type Options = Record<string, OptionValue>;
/** What a module file's defineModule({...}) says, read from its source. */
export interface ModuleDefinition {
    name: string | null;
    configKey: string | null;
    requires: string[];
    defaults: Options;
    /** `defineModule<MenuCoreOptions>`: the type setup's parameter is. */
    optionsType: string | null;
    hasSetup: boolean;
}
export interface ModulePackage {
    /** The package name: "@amxts/menu-core". */
    name: string;
    /** Its name without the scope - the module's name in the tree and on the server: "menu-core". */
    short: string;
    dir: string;
    /** The module file: the API plugins import. */
    module: string;
    /**
     * Its Pawn natives: the plugin that owns the module - its one instance on
     * the server. Without one, the build generates an owner that only runs it.
     */
    natives: string | null;
    /** The Pawn include the natives implement. */
    include: string | null;
    /**
     * `"contract": true`: the include is the original's, kept as it is - the
     * build checks the natives against it instead of writing it.
     */
    contract: boolean;
    version: string;
    description: string;
    definition: ModuleDefinition;
}
export interface Project {
    dir: string;
    config: AmxtsConfig | null;
    pluginsDir: string;
    outDir: string;
    /** Every module package found: the project itself, modules/*, node_modules. */
    packages: ModulePackage[];
    /** The ones this project uses, in load order: every module after what it requires. */
    modules: ModulePackage[];
    /** What is wrong with the project: a missing module, a requirement not listed. */
    problems: string[];
}
/** A module file's definition; null when it has none. Throws on one it cannot read. */
export declare function readDefinition(path: string, text?: string): ModuleDefinition | null;
/** An options value as AssemblyScript source: an object literal the options' interface takes. */
export declare function optionsSource(value: OptionValue): string;
/**
 * The module file as asc reads it: `export default defineModule({ ... })`
 * becomes `function __amxts_setup(options: T) { ... }`, in the same place and
 * on the same lines, and the file's last line calls it with `options`. What
 * the editor needs and asc cannot read - `declare module "@amxts/core"` with
 * the module's ModuleOptions - is blanked.
 */
export declare function moduleSource(path: string, text: string, options: Options): string;
/** The module package in `dir`, when its package.json has an "amxts" field with a module. */
export declare function readPackage(dir: string): ModulePackage | null;
/** amxts.config.ts's default export, read with a global defineConfig; null without the file. */
export declare function readConfig(dir: string): AmxtsConfig | null;
/**
 * The project in `dir`: its config, its modules in load order and what is
 * wrong with them. Without amxts.config.ts every module package it can see
 * is in use, in dependency order - a module's own repository, testing itself.
 */
export declare function loadProject(dir?: string): Project;
/** Defaults, then the config's values over them: objects merged key by key, anything else replaced. */
export declare function mergeOptions(defaults: Options, given: unknown): Options;
/** The options a module's setup gets in this project. */
export declare function optionsOf(project: Project, definition: ModuleDefinition): Options;
/** plugins.ini: the modules' owners in load order, then the project's plugins. */
export declare function pluginList(project: Project, plugins: string[]): string[];
/**
 * The sources one compile reads: the core's as/ as `~/`, the project's plugins
 * over it, and the module packages mapped into it. Every path in and out is an
 * absolute path in that tree; `real` says which file on disk it is.
 */
export declare class Sources {
    readonly root: string;
    readonly project: Project;
    /** A plugin that imports a module package the config does not list. */
    readonly problems: string[];
    constructor(root: string, project: Project);
    private rel;
    private moduleNamed;
    /** The package a file on disk belongs to. */
    packageOf(real: string): ModulePackage | null;
    /** The file on disk at this place in the tree, or null. */
    real(path: string): string | null;
    /** The owner the build writes for a module without natives, at ~/<name>.ts. */
    generated(path: string): string | null;
    exists(path: string): boolean;
    /** What the build compiles as a module's owner: its natives file, or the generated one's place. */
    ownerSource(pkg: ModulePackage): string;
    /** Where a file on disk is in the tree: a package's plugin is ~/<name>.ts. */
    place(real: string): string;
    /** An entry for asc: the plugin's place in the tree, relative to it. */
    entry(real: string): string;
    /** The file's text as asc reads it: imports rewritten, a module's definition turned into its setup. */
    read(path: string): string | null;
    /** A specifier as the tree has it: a package by its place, a relative import inside a package likewise. */
    private specifier;
    rewrite(real: string, text: string): string;
    /** The tree place a specifier in `from` points at, before the .ts is tried. */
    private target;
    /** Every place in the tree a source reaches through its imports, itself included. */
    reach(path: string, seen?: Set<string>): Set<string>;
    /** The include a plugin's natives must match: its package's, when the package says `"contract": true`. */
    contractOf(entry: string): string | null;
    /** Where a plugin's `include: "x.inc"` may be: beside it, its package's include, the plugins folders, includes/. */
    includeCandidates(entry: string, file: string): string[];
}
/** The tree for `root` in the current project (process.cwd(), or setProjectDir); one per compile. */
export declare function sourcesFor(root: string): Sources;
/** The project builds and tests read from; process.cwd() until set. */
export declare function setProjectDir(dir: string): void;
export declare function currentProjectDir(): string;
