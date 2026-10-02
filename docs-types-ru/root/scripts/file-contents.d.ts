/**
 * The file a watcher of `folder` names - `file`, relative to it - when a
 * build reads it: a .ts, not a declaration file the editor config has, and
 * not in node_modules or the folders in `skip`. Null for any other.
 */
export declare function sourceIn(folder: string, file: string, skip?: string[]): string | null;
/** The files under `folder` sourceIn() takes; node_modules is not looked into. */
export declare function sourcesIn(folder: string, skip?: string[]): string[];
/** Files known by what they hold. */
export declare class FileContents {
    private seen;
    constructor(files: string[]);
    /**
     * Of these files, the ones that hold something else than when they were
     * seen last - a new file and one gone included. Each is seen as it is now.
     */
    changed(files: string[]): string[];
}
