import { ConfigFormat, ConfigKind, ConfigCoreOptions } from "./types";
import { TreeDocument, TreeNode } from "./internal";
export * from "./types";
declare const _default: AmxtsModule<ConfigCoreOptions>;
export default _default;
/** Sets the folder under `configs/` that file names are relative to, e.g. `"myserver"`; `""` is `configs/` itself. */
export declare function setBaseDir(dir: string): void;
/**
 * Reads a config file into an object shaped like `defaults`: each value the
 * file has, where it is of the right kind, and the default for the rest.
 * The file is `configs/<baseDir>/<name>` - YAML, JSON or INI, whichever is
 * there (`resolve()`). A value of the wrong kind, a name not in its union and
 * a key the object does not have are said in the server console with the
 * file, the line and the column. `save()` writes the object back.
 *
 *     const settings = configs.load("settings", {
 *         chat: { prefix: "[HNS]" },
 *         round: { time: 2.5 },
 *     });
 *     settings.round.time = 3;
 *     configs.save(settings);
 */
export declare function load<T extends object>(name: string, defaults: T): T;
/**
 * Writes an object `load()` read back into its file, in the file's format:
 * comments on lines of their own stay where they were. `false` when it could
 * not be written, or the object was not read by `load()`.
 */
export declare function save<T extends object>(settings: T): boolean;
/** A document read, and the ConfigNodes that show its values: one a value, made when it is first asked for. */
interface Loaded {
    document: TreeDocument;
    shown: Map<TreeNode, ConfigNode>;
}
/**
 * A value of a config file: an object, an array, text, a number, a boolean
 * or `null`, with the place it was read from. `read()` gives the file's top
 * value; a path leads into it: `"chat.prefix"`, `"items[0].name"`. For a file
 * whose shape is not known beforehand; a config of a known shape is read
 * into an object by `load(name, defaults)`.
 *
 *     const maps = configs.read("maps");
 *     for (const map of maps.values()) if (map.getBoolean("enabled")) console.log(map.key);
 */
export declare class ConfigNode {
    private node;
    private loaded;
    /** The value's kind, one of `"object"`, `"array"`, `"string"`, `"number"`, `"boolean"` or `"null"`. */
    readonly kind: ConfigKind;
    /** The value's key in its object, e.g. `"prefix"`; `""` for an item of an array and for the top value. */
    readonly key: string;
    /** The path of the file the value was read from, e.g. `"addons/amxmodx/configs/settings.yaml"`; `""` for a text given to `parse()`. */
    readonly file: string;
    /** The file's format, one of `"ini"`, `"yaml"` or `"json"`. */
    readonly format: ConfigFormat;
    /** The line the value - or its key - was read from, from `1`; `0` for a value set at run time. */
    readonly line: number;
    /** The column the value - or its key - starts at, from `1`; `0` for a value set at run time and in an INI file. */
    readonly column: number;
    constructor(node: TreeNode, loaded: Loaded);
    /** The value a path leads to, e.g. `"chat.prefix"` or `"items[0]"`; `null` when there is none. */
    get(path: string): ConfigNode | null;
    /** Whether a path leads to a value, `null` among them. */
    has(path: string): boolean;
    /** The keys of an object, in file order - of this one, or of the one a path leads to; [] for anything else. */
    keys(path?: string): string[];
    /** The items of an array or the values of an object, in file order - of this one, or of the one a path leads to; [] for anything else. */
    values(path?: string): ConfigNode[];
    /** A value as text: text as it is, a number as written, `"true"` or `"false"`; `fallback` (or `""`) for none, `null`, an object or an array. */
    getString(path?: string, fallback?: string): string;
    /** A value as a number: a number, or text that is one, e.g. `"2.5"`; `fallback` for anything else. */
    getNumber(path?: string, fallback?: number): number;
    /** A value as a boolean: `true` or `false`, a number (`0` is `false`), or text - `"yes"`, `"no"`, `"on"`, `"off"`, `"true"`, `"false"` in any case, or a number; `fallback` for anything else. */
    getBoolean(path?: string, fallback?: boolean): boolean;
    /** A list of text: the text of each item of an array, or one value as a list of one; [] for none. */
    getStrings(path?: string): string[];
    /** Sets text at a path, making the objects - and the lists, before an item `"[0]"` - on the way; `false` where the path goes through a value that is not an object or a list. */
    set(path: string, value: string): boolean;
    /** Sets a number at a path, as `set()` sets text. */
    setNumber(path: string, value: number): boolean;
    /** Sets a boolean at a path, as `set()` sets text. */
    setBoolean(path: string, value: boolean): boolean;
    /** Sets a list of text at a path, as `set()` sets text. */
    setStrings(path: string, values: string[]): boolean;
    /** Removes the value a path leads to; `false` when there was none. */
    remove(path: string): boolean;
    /** Writes the whole file back in its format, with the comments that were on lines of their own. `false` for a text given to `parse()`. */
    save(): boolean;
    private put;
}
/**
 * The file a name is read from by `read()`: the name, when it ends in `.ini`,
 * `.yaml`, `.yml`, `.json` or `.jsonc`; else the first of `name.ini`, `name.yaml`,
 * `name.yml`, `name.json` and `name.jsonc` that is there - two of them are an
 * error in the server console - and `name.yaml` when none is.
 */
export declare function resolve(name: string): string;
/**
 * Reads a config file from `configs/<baseDir>/` - INI, YAML or JSON - as a
 * tree of values. A name without an extension finds the file (`resolve()`).
 * A file that is not there reads as an empty object, to be filled and saved;
 * one that cannot be read is reported in the server console with the line
 * and the column, and reads as an empty object too. For a file whose shape
 * is not known beforehand; a config of a known shape is read into an object
 * by `load(name, defaults)`.
 *
 *     const maps = configs.read("maps");     // maps.ini, .yaml, .yml, .json or .jsonc
 *     for (const key of maps.keys()) console.log(key);
 */
export declare function read(name: string): ConfigNode;
/** Reads a text in a format - `"ini"`, `"yaml"` or `"json"` - as `read()` reads a file; `save()` has no file to write it to. */
export declare function parse(text: string, format: ConfigFormat): ConfigNode;
