/**
 * The types of Config Core's API: configs, sections and their entries.
 */
/** A `key = value` line, or a `key = { ... }` block. */
export type EntryKind = "value" | "block";
/** A block's content, one of: one value, a line of strings, or rows. */
export type ContentKind = "value" | "strings" | "entries";
/** A line of a section or a row of a block. */
export interface Entry {
    /** The name before `=`; "" for a row of a block. */
    key: string;
    /** "value" for `key = value`, "block" for `key = { ... }`. */
    kind: EntryKind;
    /** The entry's content, one of: one value, a line of strings, or rows. */
    content: ContentKind;
    /** The entry's values, in order; empty for a block of rows. */
    values: string[];
    /** A block's rows; empty otherwise. */
    rows: Entry[];
    /** The comment and blank lines read before it; null for one made at run time. */
    comments: string[] | null;
}
/** A [section] of a config file. */
export interface Section {
    /** The name between the brackets. */
    name: string;
    /** The comment and blank lines read before it; null for one made at run time. */
    comments: string[] | null;
    /** The section's lines, in file order. */
    entries: Entry[];
}
/** A loaded config file. */
export interface Config {
    /** The name it was loaded under, ".ini" included. */
    name: string;
    /** In file order; a name the file has twice is there twice. */
    sections: Section[];
}
/** One entry of a section as `entries()` lists it. */
export interface SectionEntry {
    /** The name before `=`. */
    key: string;
    /** The entry's values; empty for a block. */
    values: string[];
    /** Whether it is a `key = { ... }` block. */
    block: boolean;
}
/** A dump of one section - the heading, then the entries - as `dump_config` prints it. */
export interface SectionDump {
    /** "Section 0: NAME". */
    heading: string;
    /** The section's entries, a line each. */
    lines: string[];
}
/** Config Core's options: `configs` in amxts.config.ts. */
export interface ConfigCoreOptions {
    /** The folder under configs/ that names are loaded from, e.g. "myserver"; "" is configs/ itself. */
    baseDir: string;
}
declare module "@amxts/core" {
    interface ModuleOptions {
        configs?: Partial<ConfigCoreOptions>;
    }
}
