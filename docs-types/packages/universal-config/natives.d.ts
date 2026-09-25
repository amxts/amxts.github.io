/** A loaded config file. */
export declare enum ConfigFile {
    CFG_FILE_INVALID = -1
}
/** A section of a loaded file. */
export declare enum ConfigSection {
    CFG_SECTION_INVALID = -1
}
/** What a key is: a `key = value` line or a `key = { ... }` block. */
export declare enum EntryType {
    CFG_ENTRY_SIMPLE = 0,
    CFG_ENTRY_BRACKET = 1
}
/** What a key holds: one value, a line of strings, or rows. */
export declare enum ContentType {
    CFG_CONTENT_SIMPLE = 0,
    CFG_CONTENT_STRINGS = 1,
    CFG_CONTENT_ENTRIES = 2
}
/**
 * Loads a config file from `configs/<base dir>/`; ".ini" is added when the
 * name has none. A file that is not there still gets a handle, empty.
 */
export declare function cfg_load_file(fileName: string): number;
/** A section of a loaded file by its name, or CFG_SECTION_INVALID. */
export declare function cfg_get_section(cfg: ConfigFile, sectionName: string): number;
/**
 * The value of a key, or of a path ("block/subkey"), into value[]; index is
 * the value's place in its line. false when there is none.
 */
export declare function cfg_get_value(section: ConfigSection, key: string, index?: number): string | null;
/** A value by a path: index is its place in the line, lineIndex the row of the block. */
export declare function cfg_get_value_by_path(section: ConfigSection, path: string, index?: number, lineIndex?: number): string | null;
/** The whole number a key or path holds; 0 when there is none. */
export declare function cfg_get_int(section: ConfigSection, key: string, index?: number): number;
/** The number a key or path holds; 0.0 when there is none. */
export declare function cfg_get_float(section: ConfigSection, key: string, index?: number): number;
/** true when the value is a whole number other than 0. */
export declare function cfg_get_bool(section: ConfigSection, key: string, index?: number): boolean;
/**
 * The words of a key's line (index: which line, when the key is there more
 * than once); for a block, every value of every row. The caller destroys the
 * array; Invalid_Array when there are no words.
 */
export declare function cfg_get_value_array(section: ConfigSection, key: string, index?: number): string[] | null;
/** The numbers of value index as an array of Floats; the caller destroys it. Invalid_Array when there are none. */
export declare function cfg_get_float_array(section: ConfigSection, key: string, index?: number): number[] | null;
/**
 * Every value of the line a path leads to (lineIndex: the row of a block), as
 * written. The caller destroys the array.
 */
export declare function cfg_get_value_array_by_path(section: ConfigSection, path: string, index?: number, lineIndex?: number): string[] | null;
/** The section's keys in file order; Invalid_Array when it has none. */
export declare function cfg_get_top_level_keys(section: ConfigSection): string[] | null;
/**
 * The whole section, as an array of three: the keys, the values (an array of
 * strings per key, "{block}" for a block) and [key, value] index pairs.
 */
export declare function cfg_get_section_data(section: ConfigSection): SectionData | null;
/** What cfg_get_section_data hands Pawn: an Array of these three, in this order. */
interface SectionData {
    keys: string[];
    values: string[][];
    /** [key, value] index pairs. */
    pairs: number[][];
}
/** How many values a line has, rows a block has, or - for a key that is there more than once - how many times it is. */
export declare function cfg_get_array_size(section: ConfigSection, key: string): number;
/** Sets a value; a key that is not there is made. For a block, lineIndex is the row. */
export declare function cfg_set_value(section: ConfigSection, key: string, value: string, index?: number, lineIndex?: number): boolean;
/** Sets a whole number. */
export declare function cfg_set_int(section: ConfigSection, key: string, value: number, index?: number): boolean;
/** Sets a number; it is written as it was given, 2.5 as "2.5". */
export declare function cfg_set_float(section: ConfigSection, key: string, value: number, index?: number): boolean;
/** Sets 1 or 0. */
export declare function cfg_set_bool(section: ConfigSection, key: string, value: boolean, index?: number): boolean;
/** Removes every entry of the key; false when there was none. */
export declare function cfg_delete_key(section: ConfigSection, key: string): boolean;
/** Whether the section has the key. */
export declare function cfg_has_key(section: ConfigSection, key: string): boolean;
/** A section of the file; one that is not there is made, in memory. */
export declare function cfg_create_section(cfg: ConfigFile, sectionName: string): number;
/** Makes the key a line of values or a block; a key that is not there is made. */
export declare function cfg_set_entry_type(section: ConfigSection, key: string, entryType: EntryType): boolean;
/** Says what the key holds; a key that is not there is made. */
export declare function cfg_set_entry_content_type(section: ConfigSection, key: string, contentType: ContentType): boolean;
/**
 * Writes one section to a file; the file's other sections are not in it.
 * With cfg = CFG_FILE_INVALID the section is looked for in every loaded file.
 */
export declare function cfg_write_file(cfg: ConfigFile, fileName: string, sectionName: string): boolean;
/**
 * Saves every section of the file with the comments it was read with. The
 * file name has to be given: without one it returns false, as the original
 * does.
 */
export declare function cfg_save_config(cfg: ConfigFile, fileName?: string): boolean;
/** The folder under configs/ that file names are relative to. */
export declare function cfg_set_base_dir(dir: string): void;
/** How many sections are loaded, across every file. */
export declare function cfg_get_sections_count(): number;
/** A section's name by its number, 0 .. cfg_get_sections_count() - 1. */
export declare function cfg_get_section_name(index: number): string | null;
/**
 * The comment line written above row `row` of the block `key` - "; ID | VALUE",
 * say; "" removes it. false when there is no such block or row.
 */
export declare function cfg_set_row_comment(section: ConfigSection, key: string, row: number, comment: string): boolean;
export {};
