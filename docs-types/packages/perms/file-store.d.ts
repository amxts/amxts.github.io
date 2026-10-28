export declare function setFile(name: string): void;
/** The file's path, for the console. */
export declare function filePath(): string;
/** Reads the file into the model; `false`, with the model untouched, when it could not be read. */
export declare function readFile(): boolean;
/** Writes the model into the file, keeping its comments on lines of their own. */
export declare function writeFile(): boolean;
