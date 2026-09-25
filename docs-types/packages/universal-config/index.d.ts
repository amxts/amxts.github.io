import { ContentKind, EntryKind, Section, SectionDump, SectionEntry, Config, UniversalConfigOptions } from "./types";
export * from "./types";
declare const _default: AmxtsModule<UniversalConfigOptions>;
export default _default;
/** The folder under configs/ that file names are relative to: "" is configs/ itself. */
export declare function setBaseDir(dir: string): void;
/**
 * Loads `configs/<baseDir>/<name>`; ".ini" is added when the name has none.
 * A file that is not there loads empty, for a plugin to fill and save.
 */
export declare function load(name: string): Config;
/** A section of a config by its name - the last one, when the file has two. */
export declare function section(config: Config, name: string): Section | null;
/** The section, made when the config does not have it. */
export declare function createSection(config: Config, name: string): Section;
/**
 * Writes every section of a config to `configs/<baseDir>/<name>`, with the
 * comments and blank lines it was read with. A section or an entry made at
 * run time gets a blank line before it.
 */
export declare function save(config: Config, name: string): boolean;
/** Writes one section alone to `configs/<baseDir>/<name>`; `save()` writes them all. */
export declare function writeSection(written: Section, name: string): boolean;
/** What `dump_config` prints: every section of every config with its entries. */
export declare function dump(): SectionDump[];
/** The `index`-th value of a key's line, without its quotes; null when there is none. A key with "/" is a path. */
export declare function getValue(section: Section, key: string, index?: number): string | null;
/**
 * A value by a path, `line` a row of its block. With the key in the section
 * more than once and no line asked for, `index` picks which one - and, as in
 * the original, still picks the value in it.
 */
export declare function getValueByPath(section: Section, path: string, index?: number, line?: number): string | null;
/** A whole number; 0 when there is none. */
export declare function getInt(section: Section, key: string, index?: number): number;
/** A number; 0 when there is none. */
export declare function getNumber(section: Section, key: string, index?: number): number;
/** True for a whole number other than 0: "1", "2"; "true" is false. */
export declare function getBoolean(section: Section, key: string, index?: number): boolean;
/**
 * The words of a key's line - of its `index`-th line when the key is there
 * more than once. For a block, every value of every row. Null when there is
 * no such key or nothing in it.
 */
export declare function getWords(section: Section, key: string, index?: number): string[] | null;
/** The numbers in the value `index` - "1.0 2.0 3.0" is three; null when there is no value. */
export declare function getNumbers(section: Section, key: string, index?: number): number[] | null;
/** Every value of the line a path leads to, quotes and all; [] for an empty line, null for none. */
export declare function getValues(section: Section, path: string, index?: number, line?: number): string[] | null;
/** The section's keys, in file order. */
export declare function keys(section: Section): string[];
/** Every entry: its key, and its values when it is a line. */
export declare function entries(section: Section): SectionEntry[];
/**
 * How many: values in a line, rows in a block, or - for a key that is there
 * more than once - how many times it is. A path counts what it leads to.
 */
export declare function size(section: Section, key: string): number;
export declare function has(section: Section, key: string): boolean;
/**
 * Sets a value. A key that is not there is made; a value past the end of its
 * line is added with empty ones before it. For a block, `line` is the row -
 * made, with the rows before it, when missing. A path makes the blocks on its
 * way.
 */
export declare function set(section: Section, key: string, text: string, index?: number, line?: number): boolean;
export declare function setInt(section: Section, key: string, value: number, index?: number): boolean;
export declare function setNumber(section: Section, key: string, value: number, index?: number): boolean;
/** Written as 1 or 0. */
export declare function setBoolean(section: Section, key: string, value: boolean, index?: number): boolean;
/** Removes every entry of the key; false when there was none. */
export declare function remove(section: Section, key: string): boolean;
/**
 * Makes the key a line of values or a block, emptying it when it changes; a
 * key that is not there is made. Turning it into a block drops the other
 * entries of the key.
 */
export declare function setKind(section: Section, key: string, kind: EntryKind): void;
/** Says what the key holds; between rows and text it is emptied. A key that is not there is made. */
export declare function setContent(section: Section, key: string, content: ContentKind): void;
/** The comment written before row `row` of the block `key`; "" removes it. False when there is no such row. */
export declare function setRowComment(section: Section, key: string, row: number, comment: string): boolean;
/** How a Pawn plugin knows a config: its place among the loaded ones; -1 for none. */
export declare function configHandle(config: Config): number;
export declare function configByHandle(handle: number): Config | null;
/** How a Pawn plugin knows a section: its place among every loaded one; -1 for none. */
export declare function sectionHandle(found: Section): number;
export declare function sectionByHandle(handle: number): Section | null;
/** A section of that name in any config: the last one loaded. */
export declare function findSection(name: string): Section | null;
/** Every section of every config, in the order they were loaded. */
export declare function allSections(): Section[];
