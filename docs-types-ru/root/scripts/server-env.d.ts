/** The custom section of a plugin that lists the variables it reads: wamrc copies it into the .aot. */
export declare const ENV_SECTION = "amxts.env";
/**
 * A .env file's variables: `KEY=value` lines, `#` comments, a value in
 * quotes kept as it is - `#` and spaces too - and one without them cut at a
 * ` #` comment and trimmed. A line without `=` is no variable.
 */
export declare function parseDotenv(text: string): Map<string, string>;
/** One call of the facade's env(): its section line - null when its name or default is not written out - and its line in the file. */
export interface EnvCall {
    entry: string | null;
    line: number;
}
/** The calls of the facade's env() in a file, by the name it imports env() under. */
export declare function envCallsOf(text: string): EnvCall[];
/**
 * One compile's section lines: `read` goes into the compile's readFile with
 * every file the plugin reaches, `entries` gives them after, one a name, and
 * `problems` each call whose name or default is not written out; a new one
 * for every compile.
 */
export declare function envBuild(): {
    read(file: string, text: string): void;
    entries: () => string[];
    problems: string[];
};
/**
 * What the section's lines need that `variables` has not, as the module's
 * line names it: `KZ_MAP_TOKEN` for a required one missing,
 * `KZ_MAX_RECORDS as a number` for one there and of another kind.
 */
export declare function envProblems(entries: string[], variables: Map<string, string>): string[];
/** The section of a plugin's .aot by its name, as the module reads it (AotSection); null when it has none. */
export declare function aotSection(aot: Uint8Array, wanted: string): string | null;
