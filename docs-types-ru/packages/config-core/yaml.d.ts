/**
 * YAML for Config Core: the part of it configs are written in, read into the
 * tree and written back. Block and flow mappings and lists, plain, quoted and
 * block (| and >) text, comments, one document. Anchors, aliases, tags,
 * complex keys, directives and several documents in a file are not read:
 * the reader stops there and says where. Not part of the API.
 */
import { Place, TreeDocument, TreeNode } from "./internal";
/** A plain value with its type: null, a boolean, a number, or text. */
export declare function plainValue(text: string, place: Place): TreeNode;
/** Reads a YAML text into the tree; the first thing it cannot read stops it, with the place. */
export declare class YamlReader {
    text: string;
    pos: number;
    /** What stopped the reading; "" while nothing has. */
    error: string;
    errorAt: number;
    /** Where a quoted text read last ends: just past its closing quote. */
    after: number;
    /** One level of indentation as the text has it; "" until an indented line is met. */
    indent: string;
    /** Comment and blank lines waiting for the value they are written before. */
    pending: string[] | null;
    starts: number[];
    constructor(text: string);
    get failed(): boolean;
    fail(at: number, message: string): void;
    placeAt(at: number): Place;
    /** The column of a position, from 0: how far in it is. */
    columnOf(at: number): number;
    lineEnd(at: number): number;
    nextLine(at: number): number;
    /** The spaces a line starts with. */
    indentAt(start: number): number;
    /** The comment and blank lines kept so far, handed to whoever takes them. */
    takeComments(): string[] | null;
    keep(line: string): void;
    /**
     * Moves to the next line with a value on it, keeping the comment and blank
     * lines on the way. False at the end of the text, and at a "---" or "..."
     * line, where the document ends.
     */
    skipToContent(): boolean;
    /** The document: its value - an empty object for none - after an optional "---". */
    read(): TreeNode;
    /** A value that starts at `at`: a list, a mapping, or a value on this line. */
    valueAt(at: number, parent: number): TreeNode;
    /** The ":" that ends a key starting at `at`, on the same line; -1 when it is not a key. */
    keyEnd(at: number): number;
    /** Where a quoted text that starts at `at` closes on its line; -1 when it goes on to the next. */
    quoteEnd(at: number): number;
    /** A key's text: quoted, or plain up to its ":". */
    keyText(at: number, colon: number): string;
    mapping(at: number): TreeNode;
    /** A key's value: on its line, or on the lines under it. */
    memberValue(after: number, indent: number): TreeNode;
    /**
     * The value on the lines under a key or a "-": more indented than it, or -
     * under a key - a list at the key's own indentation. Null when there is none.
     */
    below(indent: number, underKey: boolean, place: Place): TreeNode;
    /** A list of "- " items; `atKey` when it is written at its key's own indentation, where the next key is the key's neighbour. */
    sequence(at: number, atKey: boolean): TreeNode;
    /** A value written on its line: [ ] or { }, quoted or plain text, or a | or > block that starts here. */
    inline(at: number, parent: number, afterKey: boolean): TreeNode;
    /** Plain text to the end of the line or a comment, with its type. */
    plain(at: number, afterKey: boolean): TreeNode;
    /** After a value on a line only spaces and a comment may follow. */
    endLine(at: number): void;
    /** Text in quotes: '' is a quote in '...', escapes in "...", and a line break is a space. */
    quoted(at: number): TreeNode;
    /** A line break inside quotes: a space, or a line end for each blank line after it. */
    lineBreak(at: number): string;
    /** The escape at `at` in "...": the text it stands for. */
    escape(at: number): string;
    /** A | or > block: the lines under it that are more indented than `parent`. */
    block(at: number, parent: number): TreeNode;
    /** Spaces, line ends and comments inside [ ] and { }. */
    skipFlowSpace(): void;
    /** A value inside [ ] or { }, or one of them. */
    flowValue(): TreeNode;
    /** Plain text inside [ ] or { }: up to a comma, a bracket, ": " or the end of the line. */
    flowPlain(at: number): TreeNode;
    flowSequence(): TreeNode;
    flowMapping(): TreeNode;
}
/** Text written plain when YAML reads it back as the same text; else in double quotes. */
export declare function yamlText(text: string): string;
/** The document as YAML lines. */
export declare function writeYaml(document: TreeDocument): string[];
