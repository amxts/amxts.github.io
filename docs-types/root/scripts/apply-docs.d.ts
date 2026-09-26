export type Lang = 'en' | 'ru';
export declare const LANGS: Lang[];
/** One element's words in both languages. */
export interface DocText {
    en: string;
    ru: string;
}
export type DocTable = Record<string, DocText>;
/** The language AMXTS_DOCS_LANG picks: English unless it says "ru". */
export declare function docsLang(value?: string | undefined): Lang;
/** A declaration in a source file, as the tooltips see it. */
export interface Element {
    /** Its path: `Player.health`. */
    key: string;
    /** A plugin author sees it: exported, global, not private, not `_`-named. */
    public: boolean;
    /** The JSDoc block above it, when there is one: where it is and its text. */
    doc: {
        start: number;
        end: number;
        text: string;
    } | null;
    /** Where a new block goes: the start of the line it would take. */
    insertAt: number;
    /** The declaration shares its line with code before it: a new block goes in that line. */
    inline: boolean;
    /** The declaration's indentation. */
    indent: string;
    /** The line (0-based) the declaration starts on. */
    line: number;
}
/** The comment's body: `/** a *\/` is "a"; a block's lines lose their ` * `. */
export declare function docBody(comment: string): string;
/** A body as a comment at `indent`, its lines ended by `eol`: one line when it is one line. */
export declare function renderDoc(text: string, indent: string, eol?: string): string;
/**
 * Every named declaration in a file - top-level ones, namespaces' members,
 * class and interface members - with its key, whether a plugin author sees
 * it, and its JSDoc block.
 */
export declare function elements(fileName: string, source: string): Element[];
/** A template literal written indented, as the code around it: without that indentation. */
export declare function dedent(text: string): string;
/** A docs file's table, every text dedented. */
export declare function loadTable(path: string): Promise<DocTable>;
/**
 * A table as its file, the way the code-style skill's rule 29 has it: both
 * languages in backticks and laid out alike - on one line each, or both
 * indented under the key when either has more than one line.
 */
export declare function formatTable(table: DocTable, header: string[], quote: '\'' | '"'): string;
/** Rewrites the tables of `sources` in the form formatTable gives; the ones it changed. */
export declare function formatSources(sources: DocSource[]): Promise<string[]>;
/** The text in `lang`, English when that one is not written. */
export declare function pick(text: DocText, lang: Lang): string;
/** `source` with the words of `table` in `lang` above every element it names. */
export declare function applyTable(fileName: string, source: string, table: DocTable, lang: Lang): string;
/** A source file of the public API and the file its words are in. */
export interface DocSource {
    /** The source, absolute. */
    file: string;
    /** Its words: <package>/scripts/docs/<the source's path in the package>. */
    docs: string;
    /** The package's folder. */
    root: string;
}
/** The core's hand-written API: what `~/facade` and the globals give a plugin. */
export declare const CORE_API: string[];
export declare function docsFileOf(root: string, file: string): string;
/**
 * A module package's API files: its module file and every file that file
 * re-exports (`export * from "./types"`), followed through.
 */
export declare function moduleApi(moduleFile: string): string[];
export declare function coreSources(core: string): DocSource[];
export declare function moduleSources(pkg: {
    dir: string;
    module: string;
}): DocSource[];
/** Writes `lang` into every source that has a docs file; the ones it changed. */
export declare function applySources(sources: DocSource[], lang: Lang): Promise<string[]>;
export declare const FILTER = "amxts-docs";
/**
 * Registers the clean filter in `root`'s repository, when `root` is the top
 * of one: .gitattributes names the files, .git/config the command. Whether
 * it is one.
 */
export declare function registerFilter(root: string): boolean;
/**
 * The core's hood and the modules of the project in `dir` - or, in a
 * module's own folder, that module - in `lang`; the line that says so.
 */
export declare function applyProject(dir: string, lang: Lang): Promise<string>;
/** The core's API files and those of the modules the project in `dir` uses - or of the module `dir` is. */
export declare function projectSources(dir: string): Promise<{
    roots: string[];
    sources: DocSource[];
}>;
