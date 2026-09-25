export declare class Coroutines {
    /** What a trap inside a coroutine said: it drops that one coroutine, as on the server. */
    readonly traps: string[];
    private exports;
    private kinds;
    private coroutines;
    private running;
    private wake;
    private entering;
    private nextId;
    private top;
    /** How deep the server is inside this plugin: jobs run when it is out. */
    depth: number;
    constructor(wasm: Uint8Array);
    /** The imports the scheduler answers. */
    imports(): Record<string, (...args: any[]) => any>;
    /** Once the instance is there: where the shadow stack starts with nothing running. */
    attach(exports: any): void;
    /** Whether a job is waiting to run. */
    get waiting(): boolean;
    /** Runs the plugin's jobs once nothing of it is on the stack - module.cpp's DrainJobs. */
    drain(): void;
    /** One call into a coroutine, first or resumed - module.cpp's RunCoroutine. */
    private run;
    /** call_indirect with the cells co_spawn copied, each read as the parameter it is. */
    private callRaw;
    /** The parameter types of every function in the table, by index. */
    private readTable;
}
