/// <reference path="../../as-types.d.ts" />
/** What a request sends besides its URL. Every field is optional. */
export declare class RequestInit {
    /** GET by default; POST, PUT, PATCH and DELETE are what easy_http has. */
    method?: string;
    /** The text sent with the request, such as JSON for a POST; empty by default. */
    body?: string;
    /** Pairs, as the Fetch standard's HeadersInit: `[["Content-Type", "application/json"]]`. */
    headers?: string[][];
    /**
     * Cancels the request when it aborts; the promise then rejects with its
     * reason, an Error named "AbortError". Inside an async command handler or
     * player event, the player leaving cancels it too.
     */
    signal?: AbortSignal | null;
}
/** What came back. */
export declare class Response {
    /** The HTTP status: 200, 404, ... */
    status: number;
    /** The body, as text. */
    text: string;
    constructor(
    /** The HTTP status: 200, 404, ... */
    status: number, 
    /** The body, as text. */
    text: string);
    /** A 2xx status. */
    get ok(): boolean;
}
/**
 * Sends a request. The promise is fulfilled with the response on a later
 * frame, and rejected when there is none - no connection, a bad URL, a
 * timeout, no easy_http, or an abort. An HTTP error such as 404 is a
 * response, as in fetch: check `response.ok`.
 */
export declare function fetch(url: string, init?: RequestInit): Promise<Response>;
