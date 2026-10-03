/// <reference path="../as-types.d.ts" />
import "~/promise";
/** What a call carries: its arguments, or its answer, as bytes. */
export declare class Writer {
    data: ArrayBuffer;
    length: i32;
    private room;
    i32(value: i32): void;
    f64(value: f64): void;
    bool(value: bool): void;
    str(value: string): void;
}
/** The other end of a Writer. Past the end every read is zero - what a failed call reads as. */
export declare class Reader {
    data: ArrayBuffer;
    from: i32;
    at: i32;
    /** `from`: the plugin that wrote it - where a function it carries lives. */
    constructor(data: ArrayBuffer, from: i32);
    private take;
    i32(): i32;
    f64(): f64;
    bool(): bool;
    str(): string;
}
/** A module another plugin owns, as a proxy knows it. */
export declare class Service {
    name: string;
    hash: i32;
    private id;
    private failed;
    constructor(name: string, hash: i32);
    /** A call of the module's `op`-th function (or field). */
    begin(op: i32): Writer;
    /** Runs it in the owner and returns the answer; an empty one, and an error in the log, when it cannot. */
    call(w: Writer): Reader;
    private fail;
}
/** Calls `fn`, a function of signature `sig`, with the arguments in `r`; its answer goes to `w`. */
export type Invoke = (fn: usize, sig: i32, r: Reader, w: Writer) => void;
/** The number another plugin calls `fn` back by; 0 for null. The same function keeps its number. */
export declare function sendFunction(fn: usize, sig: i32, invoke: Invoke): i32;
/** Where a stand-in calls: the plugin a function lives in, and its number there. */
declare class Remote {
    plugin: i32;
    id: i32;
    constructor(plugin: i32, id: i32);
}
/**
 * A stand-in for function `id` of the plugin that wrote `r`: a copy of
 * `stub` - a function of the same signature that calls back - with the place
 * in its `_env`, where the stub finds it (__env, the compiler's). The same
 * function is the same stand-in, so it can be compared and removed.
 */
export declare function receiveFunction(r: Reader, stub: usize): usize;
/** The first thing a stub does: where it calls. Before any other call, which would change __env. */
export declare function remoteTarget(): Remote;
/** A call of the function a stand-in stands for. */
export declare function beginCallback(target: Remote): Writer;
export declare function callBack(target: Remote, w: Writer): Reader;
/** Runs op `op` of the served module with the arguments in `r`; the answer goes to `w`. */
export type Dispatch = (op: i32, r: Reader, w: Writer) => void;
/** The module this plugin runs for the others; one a plugin. */
export declare function serve(name: string, hash: i32, dispatch: Dispatch): void;
/** Objects the owner hands out and takes back by number: a menu, a config, a section. */
export declare class Handles {
    objects: Object[];
    ids: Map<usize, i32>;
    id(object: usize): i32;
    at(id: i32): usize;
}
/** @hidden What the module calls: a request of `length` bytes from plugin `from`. */
export declare function __amxts_rpc(length: i32, from: i32): void;
export {};
