/**
 * Universal Config's own bookkeeping. Not part of the API.
 */
import { Entry } from "./types";
/** Where a path leads: the entry, and the line of a block it means. */
export interface Found {
    entry: Entry;
    line: number;
}
