/// <reference path="../../as-types.d.ts" />
/** A request's options besides its URL. Every field is optional. */
export declare class RequestInit {
    /** The request's method, one of "GET" (the default), "POST", "PUT", "PATCH", "DELETE". */
    method?: string;
    /** The text sent with the request, such as JSON for a POST; empty by default. */
    body?: string;
    /** The request's headers, as pairs: `[["Content-Type", "application/json"]]`. */
    headers?: string[][];
    /**
     * A signal that cancels the request; the promise then rejects with an
     * Error named "AbortError". In an async command handler or player event,
     * the player leaving cancels the request too.
     */
    signal?: AbortSignal | null;
}
/** The server's response to a request. */
export declare class Response {
    /** The response's HTTP status: 200, 404, ... */
    status: number;
    /** The response's body, as text. */
    text: string;
    constructor(
    /** The response's HTTP status: 200, 404, ... */
    status: number, 
    /** The response's body, as text. */
    text: string);
    /** `true` for a 2xx status. */
    get ok(): boolean;
}
/**
 * Sends a request. The promise is fulfilled with the response on a later
 * frame, and rejected when there is none - no connection, a bad URL, a
 * timeout, no easy_http, or an abort. An HTTP error such as 404 is a
 * response, as in fetch: check `response.ok`.
 *
 * Pawn: `ezhttp_get`, `ezhttp_post` (easy_http)
 */
export declare function fetch(url: string, init?: RequestInit): Promise<Response>;
