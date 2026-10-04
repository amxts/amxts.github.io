import ts from 'typescript';
/** The module, by its place in the tree, as the files' imports have it once rewritten (scripts/project.ts). */
export declare const CONFIG_MODULE = "~/modules/config-core";
type Scalar = 'text' | 'number' | 'boolean';
/**
 * What a config value is. `written` is its type as the file writes it, where
 * the file names one (`value as Limits`): the generated interface says the
 * same, so the value is of that type there too.
 */
export type Shape = Kinds & {
    written?: string;
};
type Kinds = {
    kind: Scalar;
} | {
    kind: 'name';
    names: string[];
} | {
    kind: 'list';
    of: Shape;
} | {
    kind: 'object';
    fields: Field[];
} | {
    kind: 'map';
    of: Shape;
};
export interface Field {
    name: string;
    shape: Shape;
    optional: boolean;
}
type ObjectShape = Extract<Shape, {
    kind: 'object';
}>;
/** How the transform reaches other files: an import in `from` resolved, with the text the build reads there. */
export type ImportReader = (from: string, spec: string) => {
    path: string;
    text: string;
} | null;
/** A shape that cannot be read, at a node of the file it is in. */
export declare class ShapeError extends Error {
    readonly node: ts.Node;
    readonly file: ts.SourceFile;
    constructor(node: ts.Node, file: ts.SourceFile, message: string);
}
interface Context {
    path: string;
    file: ts.SourceFile;
}
export declare class Shapes {
    private imports;
    private files;
    constructor(imports: ImportReader);
    parsed(path: string, text: string): ts.SourceFile;
    /** A type as written in a file. */
    ofType(node: ts.TypeNode, at: Context, seen?: string[]): Shape;
    private list;
    private members;
    /** A type by its name: declared in the file, imported by name, or reached through a namespace import. */
    private named;
    declaration(name: ts.EntityName, at: Context): {
        node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration;
        at: Context;
    } | null;
    private local;
    /** What a local name is imported as: a name of another file, or that whole file. */
    private importOf;
    /** A name a file exports: declared there, or passed on from another file. */
    private exported;
    private open;
    /** The defaults' value, when no type is given: what it visibly is. */
    ofValue(node: ts.Expression, at: Context): Shape;
}
/** A shape as one line: equal shapes, equal lines. */
export declare function describe(shape: Shape): string;
/** The type as AssemblyScript reads it; an object type in place is a class of its own there (Parser.parseTypeLiteral). */
export declare function typeOf(shape: Shape): string;
/**
 * What an INI file has no place for: the values at the top that are not
 * objects - an INI file holds [sections] of values - and lists of objects.
 */
export declare function iniMisfits(shape: ObjectShape): {
    outside: string[];
    objectLists: string[];
};
export interface TypedConfigs {
    /** The file as the compiler reads it: the calls replaced, the functions after its last line. */
    text: string;
    /** What stopped a call: `file:line:column: ...`. */
    problems: string[];
}
/**
 * The typed calls of one file made into generated code. `path` is the file's
 * place in the tree, `display` how a message names it, `imports` how a type
 * imported from another file is found.
 */
export declare function typedConfigs(path: string, display: string, text: string, imports: ImportReader): TypedConfigs;
/**
 * A file's text with code the build wrote for it: after its last line of its
 * own, so every line above keeps its number, but before the imports that
 * follow it - the auto-imports' line - with the code's own import after
 * them. The build moves a file's trailing imports to its top
 * (HoistImports), and the code would stop them being the last.
 */
export declare function withGenerated(path: string, text: string, code: string, imports: string): string;
export {};
