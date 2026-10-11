import type { Change, Left } from './upgrade';
/** A file's calls brought to their new shapes; what upgrade cannot rewrite safely is listed. */
export declare function upgradeCalls(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
