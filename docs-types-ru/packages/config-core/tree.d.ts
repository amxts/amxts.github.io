/**
 * Config Core's tree: the values of a YAML, JSON or INI file as one shape,
 * and what reading and writing them have in common. Not part of the API.
 */
import { ConfigKind } from "./types";
import { Place, TreeNode } from "./internal";
export declare const BACKSLASH = "\\";
export declare function makeNode(kind: ConfigKind, key: string, text: string, place: Place): TreeNode;
export declare function numberNode(text: string, value: number, place: Place): TreeNode;
export declare function nowhere(): Place;
/** Text as one kind of line end, without a byte order mark. */
export declare function normalize(text: string): string;
/** Where each line of the text starts. */
export declare function lineStarts(text: string): number[];
/** The line and column of a position, from 1. */
export declare function placeOf(starts: number[], at: number): Place;
export declare function isDigits(text: string): boolean;
export declare function isHexDigits(text: string): boolean;
/** A character below a space, "\n" and "\t" among them. */
export declare function isControl(character: string): boolean;
/** "\u001b" for a control character: its code in four hex digits. */
export declare function unicodeEscape(character: string): string;
/** "a.b[0].c" as its parts: "a", "b", "[0]", "c" - an item of a list keeps its brackets. */
export declare function pathParts(path: string): string[];
/** The index a part "[3]" gives an item of a list; -1 for a part that is not one. */
export declare function itemIndex(part: string): number;
/** A member of an object by its key, or an item of an array by its index in brackets, "[0]". */
export declare function member(node: TreeNode, part: string): TreeNode | null;
/** The node a path leads to; the node itself for "". */
export declare function follow(node: TreeNode, path: string): TreeNode | null;
/** The index of an object's member with that key; -1 for none. */
export declare function memberIndex(object: TreeNode, key: string): number;
export declare function isScalar(node: TreeNode): boolean;
/** A scalar as text: a number as it was written; null for anything else. */
export declare function scalarText(node: TreeNode | null): string | null;
/** A value as a number: a number, or text that is one; NaN for anything else. */
export declare function numberOf(node: TreeNode | null): number;
/**
 * Text as a boolean - the one rule a config's true and false are read by:
 * 1 for true, yes, on (in any case) or a number other than 0; 0 for false,
 * no, off or 0; -1 for anything else.
 */
export declare function booleanText(text: string): 1 | 0 | -1;
/** A value as a boolean: 1 true, 0 false, -1 neither - true or false, a number (0 is false), or text as `booleanText()` reads it. */
export declare function booleanOf(node: TreeNode | null): 1 | 0 | -1;
/** Adds a line to the comment and blank lines written before the node. */
export declare function addComment(node: TreeNode, comment: string): void;
