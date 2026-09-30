/** Sets the folder under configs/ that names are relative to, e.g. "myserver"; "" is configs/ itself. */
export declare function setBaseDir(dir: string): void;
/** A file's path: under configs/ and the base folder. */
export declare function configPath(file: string): string;
/** Lines to a file, its folder made when missing, each ended as this system ends them. */
export declare function writeLines(path: string, lines: string[]): boolean;
