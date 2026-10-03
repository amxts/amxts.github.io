import ts from 'typescript';
/** One name a plugin can use without importing it. */
export interface AutoImport {
    /** What the plugin writes: `Player`, `semiclip`. */
    name: string;
    /** Where it comes from, as an import line writes it: `@amxts/core`, `@amxts/resemiclip`. */
    from: string;
    /** `import * as semiclip from "..."` rather than `import { Player } from "..."`. */
    namespace: boolean;
}
/**
 * What a module gives in `defineModule({ imports })`: its API as a namespace
 * under `as`, or its export `name` under that name.
 */
export type ModuleImport = {
    from: string;
    as: string;
} | {
    from: string;
    name: string;
};
/** The name a plugin uses what a module gives by. */
export declare function importedName(each: ModuleImport): string;
export declare const CORE = "@amxts/core";
/**
 * The facade's exports that are the hood, not the plugin API: what the
 * facade and the generated files are built from - cells, raw handlers and
 * the listener tables - and what a module's natives call through the kit
 * (as/kit.ts). A plugin that needs one imports it by name. Every other
 * export of the facade is auto-imported, a new one included; so is none
 * whose name starts with `_`.
 */
export declare const HOOD: Set<string>;
/** Everything the facade exports, the hood included. */
export declare function facadeExports(facadeFile: string): string[];
/** The facade's public exports: what a plugin uses from `@amxts/core` without an import. */
export declare function coreImports(facadeFile: string): AutoImport[];
/**
 * The project's table: the facade's names, then each module's. Two sources
 * of one name are a problem, naming both - the plugin could not tell which
 * it gets.
 */
export declare function importTable(core: AutoImport[], modules: {
    name: string;
    imports: ModuleImport[];
}[], problems: string[]): Map<string, AutoImport>;
/**
 * The names a file uses without declaring them in a scope that reaches the
 * use, and without importing them: what it expects from outside.
 */
export declare function freeNames(file: ts.SourceFile): Set<string>;
/**
 * The file with an import line after its last for every name of the table
 * it uses and does not declare - or as it is, when it uses none.
 */
export declare function withAutoImports(path: string, text: string, table: Map<string, AutoImport>): string;
/**
 * `.amxts/imports.d.ts`: the table as globals, so that the editor completes,
 * checks and goes to the definition of what a plugin uses without an import.
 * An alias, not a copy: a class is its type and its value, a namespace its
 * types too (`menus.Menu`).
 */
export declare function importsDeclaration(table: AutoImport[]): string;
