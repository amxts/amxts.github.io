import type { Change, Left } from './upgrade';
/** A file's menus brought to the context: the rewritten text, each change, and what is left to do by hand. */
export declare function upgradeMenus(file: string, text: string): {
    text: string;
    changes: Change[];
    left: Left[];
};
