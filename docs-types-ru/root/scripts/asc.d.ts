/**
 * asc.main, and nothing of the compile kept alive after it.
 *
 * asc hands a transform its compile by writing the program onto the transform
 * class's prototype, where it stays until that class's next compile: a class
 * that lives on - a module's own, a test file's - would keep the whole
 * program, a few hundred MB for a plugin. Each compile is given subclasses of
 * its own, which go with it. The program is then garbage JavaScriptCore does
 * not collect soon on its own, and one process compiling plugin after plugin
 * - a build, the test suite from an empty cache - piles it up past 3 GB; a
 * full collection after each compile keeps one program's worth.
 */
export declare function ascMain(args: string[], options: Record<string, any>): Promise<{
    error: Error | null;
    stdout: any;
    stderr: any;
}>;
