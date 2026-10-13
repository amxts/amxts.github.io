/// <reference path="../as-types.d.ts" />
export declare const JOB_COPY: i32;
export declare const JOB_DEFLATE: i32;
export declare const JOB_INFLATE: i32;
export declare const JOB_GZIP: i32;
export declare const JOB_GUNZIP: i32;
export declare const JOB_DEFLATE_RAW: i32;
export declare const JOB_INFLATE_RAW: i32;
export declare const JOB_READ: i32;
export declare const JOB_WRITE: i32;
export declare const JOB_APPEND: i32;
/** What a job ended with: its bytes - `null` when it failed - their CRC-32, and why it failed. */
export declare class __JobResult {
    data: Uint8Array | null;
    crc: u32;
    error: string;
}
/** A started job's own end: called once, on the frame it comes back. */
export declare class __Job {
    finish(result: __JobResult): void;
}
/** Starts a job on the worker; `job` is finished on the frame it ends, or at once when it cannot start. */
export declare function __jobStart(op: i32, path: string, data: usize, length: i32, size: i32, job: __Job): void;
/** Does a job at once, on the game thread. */
export declare function __jobRun(op: i32, path: string, data: usize, length: i32, size: i32): __JobResult;
