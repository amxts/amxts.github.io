/** What `docker create`/`docker run` is given for hlds to leave a core dump in `dir`. */
export declare function coreDumpArgs(dir: string): string[];
/**
 * How the stopped `container` went - its exit code, the signal, out of
 * memory - and, for each core dump in `dir`, every thread's backtrace: gdb
 * reads it in a container of the stopped one's own files (`docker commit`),
 * installed there when the image has none. The backtrace is also written to
 * `dir`/backtrace.txt.
 */
export declare function crashReport(container: string, dir: string): string[];
