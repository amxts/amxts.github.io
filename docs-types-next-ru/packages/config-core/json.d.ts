/**
 * JSON for Config Core, with what JSONC adds: // and /* *\/ comments and a
 * comma after the last member or item. Read into the tree and written back.
 * Not part of the API.
 */
import { TreeDocument, TreeNode } from "./internal";
/** Reads a JSON or JSONC text into the tree; the first thing it cannot read stops it, with the place. */
export declare class JsonReader {
    text: string;
    pos: number;
    /** What stopped the reading; "" while nothing has. */
    error: string;
    errorAt: number;
    /** One level of indentation as the text has it; "" until an indented line is met. */
    indent: string;
    /** Comment and blank lines waiting for the value they are written before. */
    pending: string[] | null;
    starts: number[];
    constructor(text: string);
    get failed(): boolean;
    fail(at: number, message: string): void;
    placeAt(at: number): import("./internal").Place;
    takeComments(): string[] | null;
    keep(line: string): void;
    /**
     * Skips spaces and comments. A comment on a line of its own is kept for the
     * value after it, and so is a blank line; one after a value on its line is
     * dropped.
     */
    skip(): void;
    noteIndent(start: number): void;
    /** The document: one value, spaces and comments around it. */
    read(): TreeNode;
    value(): TreeNode;
    object(): TreeNode;
    array(): TreeNode;
    /** After a member or an item: a comma, or the bracket that closes; false when it is neither. */
    comma(close: string): boolean;
    string(): TreeNode;
}
/** Text in double quotes, escaped as JSON escapes it. */
export declare function jsonText(text: string): string;
/** The document as JSON lines, its comments kept. */
export declare function writeJson(document: TreeDocument): string[];
