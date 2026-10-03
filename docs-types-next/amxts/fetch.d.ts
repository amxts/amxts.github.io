/// <reference path="../as-types.d.ts" />
import "./promise";
/** A URL's parts, as URL keeps them. */
declare class __UrlParts {
    protocol: string;
    username: string;
    password: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
}
/**
 * A web address taken apart: its protocol, host, path and query.
 *
 * ```ts
 * const url = new URL("https://example.com/api/stats?id=7");
 * url.searchParams.set("map", server.map);
 * const response = await fetch(url);
 * ```
 */
export declare class URL {
    private __parts;
    private __params;
    /** Parses `url`, relative to `base` when it is given; throws a TypeError when it is not a URL. */
    constructor(url: string, base?: string | null);
    /** `true` when `url`, relative to `base` when given, is a URL `new URL` would take. */
    static canParse(url: string, base?: string | null): bool;
    /** The URL, or `null` when `url` is not one - `new URL` without the throw. */
    static parse(url: string, base?: string | null): URL | null;
    /** @hidden */
    static __of(parts: __UrlParts): URL;
    /** The whole URL as text, e.g. `"https://example.com/api?id=7"`. */
    get href(): string;
    set href(value: string);
    /** The scheme with its colon, e.g. `"https:"`. */
    get protocol(): string;
    /** The user name before the host, e.g. `"admin"` in `ftp://admin:secret@example.com`; `""` when there is none. */
    get username(): string;
    /** The password before the host; `""` when there is none. */
    get password(): string;
    /** The host with its port when the URL names one, e.g. `"example.com:8080"`. */
    get host(): string;
    /** The host without the port, e.g. `"example.com"`. */
    get hostname(): string;
    /** The port as text, e.g. `"8080"`; `""` for the protocol's default one. */
    get port(): string;
    /** The path, e.g. `"/api/stats"`. */
    get pathname(): string;
    set pathname(value: string);
    /** The query with its `?`, e.g. `"?id=7"`; `""` when there is none. */
    get search(): string;
    set search(value: string);
    /** The fragment with its `#`, e.g. `"#top"`; `""` when there is none. */
    get hash(): string;
    set hash(value: string);
    /** The scheme, host and port, e.g. `"https://example.com"`; `"null"` for a URL without a host. */
    get origin(): string;
    /** The query as names and values; a change to them changes the URL. */
    get searchParams(): URLSearchParams;
    /** The whole URL as text, as `href`. */
    toString(): string;
    /** The whole URL as text: what `JSON.stringify` writes for it. */
    toJSON(): string;
    /** @hidden the user, password and host, as they stand between `//` and the path. */
    __authority(): string;
    /** @hidden the query, written back by its URLSearchParams. */
    __setQuery(query: string): void;
    private __syncParams;
}
/**
 * A query's names and values, such as `id=7&map=de_dust2`.
 *
 * ```ts
 * const query = new URLSearchParams({ id: "7", map: server.map });
 * const response = await fetch(`https://example.com/api?${query}`);
 * ```
 */
export declare class URLSearchParams {
    private __names;
    private __values;
    /** @hidden the URL whose query this is. */
    __url: URL | null;
    /** The names and values of `init`, in its order. */
    constructor(init?: Record<string, string>);
    /** The number of name and value pairs, a name given twice counted twice. */
    get size(): number;
    /** Adds a pair; a name already there keeps its value too. */
    append(name: string, value: string): void;
    /** Removes every pair of `name`. */
    delete(name: string): void;
    /** The first value of `name`, or `null` when there is none. */
    get(name: string): string | null;
    /** Every value of `name`, in order. */
    getAll(name: string): string[];
    /** `true` when there is a pair of `name`. */
    has(name: string): bool;
    /** Sets `name` to `value`: the first pair takes it, the other pairs of the name go. */
    set(name: string, value: string): void;
    /** Orders the pairs by name; pairs of one name keep their order. */
    sort(): void;
    /** Calls `callback` with each value and its name, in order. */
    forEach(callback: (value: string, name: string) => void): void;
    /** Every name, in order; a name given twice is there twice. */
    keys(): string[];
    /** Every value, in order. */
    values(): string[];
    /** Every pair as `[name, value]`, in order. */
    entries(): string[][];
    /** The query as text, without the `?`: `id=7&map=de_dust2`. */
    toString(): string;
    /** @hidden takes the pairs of a query, `?` or not. */
    __read(query: string): void;
    private __update;
}
/**
 * A request's or a response's HTTP headers. Names are matched without
 * regard to case.
 *
 * ```ts
 * const type = response.headers.get("content-type");
 * ```
 */
export declare class Headers {
    private __names;
    private __values;
    /** The headers of `init`: an object of names and values. */
    constructor(init?: Record<string, string>);
    /** Adds a value to `name`; one already there stays, and `get` joins them. */
    append(name: string, value: string): void;
    /** Removes `name` and all its values. */
    delete(name: string): void;
    /** The value of `name` - its values joined with `", "` when it has several - or `null` when there is none. */
    get(name: string): string | null;
    /** Every `Set-Cookie` header of a response, each its own text. */
    getSetCookie(): string[];
    /** `true` when there is a header of `name`. */
    has(name: string): bool;
    /** Sets `name` to `value`, in place of every value it had. */
    set(name: string, value: string): void;
    /** Calls `callback` with each header's value and its name in lower case, ordered by name. */
    forEach(callback: (value: string, name: string) => void): void;
    /** Every header's name in lower case, ordered by name. */
    keys(): string[];
    /** Every header's value, ordered by name. */
    values(): string[];
    /** Every header as `[name, value]`, ordered by name; the values of a name joined, but each `set-cookie` on its own. */
    entries(): string[][];
    /** @hidden a copy. */
    __copy(): Headers;
    /** @hidden the header lines of a response, `name: value` each. */
    static __parse(lines: string): Headers;
}
/** The check of a server's certificate, for HTTPS. */
export interface TlsOptions {
    /**
     * The certificate authorities a server's certificate must come from, as
     * PEM text - for a server with a certificate of its own making. Left out,
     * the authorities a browser trusts.
     */
    ca?: string;
}
/** A request's options: `fetch`'s second argument. Every field is optional. */
export interface RequestInit {
    /** The request's method, e.g. `"POST"`; `"GET"` by default. */
    method?: string;
    /** The request's headers, as an object of names and values: `{ Authorization: "Bearer abc" }`. */
    headers?: Record<string, string>;
    /** The text sent with the request, such as JSON. A GET or HEAD request has none. */
    body?: string;
    /**
     * The request's answer to a redirect: one of `"follow"` (the default) - on
     * to its address, `"manual"` - the redirect itself as the response, `"error"` - a rejection.
     */
    redirect?: "follow" | "manual" | "error";
    /** A signal that cancels the request; the promise then rejects with the signal's reason. */
    signal?: AbortSignal | null;
    /** A proxy the request goes through, e.g. `"http://proxy.example.com:3128"`. */
    proxy?: string;
    /** The check of the server's certificate, for HTTPS. */
    tls?: TlsOptions;
}
/**
 * A request: its address, method, headers and body - what `fetch` sends.
 *
 * ```ts
 * const request = new Request("https://example.com/api", { method: "POST", body: "hi" });
 * const response = await fetch(request);
 * ```
 */
export declare class Request {
    private __url;
    private __method;
    private __headers;
    private __body;
    private __redirect;
    private __signal;
    private __proxy;
    private __ca;
    /** A request to `url` with the options of `init`. */
    constructor(url: string, init?: RequestInit);
    /** The address the request goes to. */
    get url(): string;
    /** The request's method, e.g. `"GET"`. */
    get method(): string;
    /** The request's headers. */
    get headers(): Headers;
    /** The request's answer to a redirect: one of `"follow"`, `"manual"` or `"error"`. */
    get redirect(): string;
    /** The signal that cancels the request. */
    get signal(): AbortSignal;
    /** A copy of the request, to send again. */
    clone(): Request;
    /** @hidden the request with what `init` gives in place of its own. */
    __with(init: RequestInit): Request;
    /** @hidden */
    __bodyText(): string | null;
    /** @hidden */
    __proxyUrl(): string;
    /** @hidden */
    __authorities(): string;
}
/** A response's options: `new Response`'s second argument. */
export interface ResponseInit {
    /** The response's status; `200` by default. */
    status?: number;
    /** The words after the status, e.g. `"Not Found"`; `""` by default. */
    statusText?: string;
    /** The response's headers, as an object of names and values. */
    headers?: Record<string, string>;
}
/**
 * The server's answer to a request: its status, headers and body.
 *
 * ```ts
 * const response = await fetch("https://example.com/api/stats");
 * if (!response.ok) return console.log(`HTTP ${response.status}`);
 * const stats = await response.json<Stats>();
 * ```
 */
export declare class Response {
    private __status;
    private __statusText;
    private __headers;
    private __body;
    private __url;
    private __redirected;
    private __used;
    /** A response whose body is `body`, with the status and headers of `init` - for a test, say. */
    constructor(body?: string | null, init?: ResponseInit);
    /** The response's HTTP status, e.g. `200` or `404`. */
    get status(): number;
    /** The words after the status, e.g. `"Not Found"`; `""` when the server sent none. */
    get statusText(): string;
    /** `true` for a status from `200` to `299`. */
    get ok(): bool;
    /** The response's headers. */
    get headers(): Headers;
    /** The address the response came from, after any redirects. */
    get url(): string;
    /** `true` when the request was redirected on the way. */
    get redirected(): bool;
    /** `true` once the body has been read: it can be read once. */
    get bodyUsed(): bool;
    /** The body as text, decoded as UTF-8. */
    text(): Promise<string>;
    /**
     * The body read as JSON into `T`, an interface of the fields the JSON
     * has; rejects with a SyntaxError when it is not JSON.
     *
     * ```ts
     * interface Stats {
     *   kills: number;
     * }
     * const stats = await response.json<Stats>();
     * ```
     */
    json<T>(): Promise<T>;
    /** The body as bytes. */
    arrayBuffer(): Promise<ArrayBuffer>;
    /** A copy of the response, whose body can be read apart from this one's. */
    clone(): Response;
    /** @hidden what the network client handed back. */
    static __received(status: number, statusText: string, headers: Headers, body: ArrayBuffer, url: string, redirected: bool): Response;
    /** The error of a second read, or null the first time. */
    private __take;
}
/**
 * Why a request ended without its answer, as `request` says it: `""` - it
 * got one (an HTTP status such as `404` is an answer); `"login"` - the user,
 * password or key was refused; `"denied"` - the account may not do it (FTP
 * cannot enter a folder, SFTP says permission denied); `"notFound"` - no
 * such remote file; `"refused"` - no connection: the host is unknown or
 * refuses it; `"timeout"` - `timeout` ran out; `"tls"` - the secure
 * connection failed: a certificate, or an SSH host key, not trusted;
 * `"aborted"` - the signal aborted it; `"other"` - anything else, said in
 * `errorText`.
 */
export type RequestErrorKind = "" | "login" | "denied" | "notFound" | "refused" | "timeout" | "tls" | "aborted" | "other";
/**
 * `request`'s options: what to send and how. Every field is optional; the
 * URL's scheme - `http:`, `https:`, `ftp:`, `ftps:` or `sftp:` - says which
 * of them apply.
 */
export interface RequestOptions {
    /** HTTP's method, e.g. `"POST"`; `"GET"` by default. `"HEAD"` transfers nothing - with `quote`, only the commands run. */
    method?: string;
    /** HTTP's headers, as an object of names and values. */
    headers?: Record<string, string>;
    /** The text sent: HTTP's body, or - with `upload` - the file's content. */
    body?: string;
    /** The user to log in as; the URL's own (`ftp://user@host`) when left out. */
    user?: string;
    /** The password to log in with. */
    password?: string;
    /**
     * SFTP: the private key to log in with, a file of the game folder
     * (`addons/amxmodx/data/id_rsa`) - an RSA key in PEM
     * (`ssh-keygen -t rsa -m PEM`).
     */
    keyFile?: string;
    /** SFTP: the passphrase `keyFile` is encrypted with. */
    keyPassphrase?: string;
    /**
     * SFTP: the server's host key, its SHA-256 fingerprint in base64 as
     * `ssh-keygen -lf` prints it without `SHA256:` - a server with another key
     * is refused (`"tls"`). Left out, any host key is taken.
     */
    hostKey?: string;
    /**
     * FTP: TLS asked for with `AUTH TLS` on a plain `ftp:` connection - one of
     * `"try"` (when the server has it), `"control"` (the commands at least)
     * or `"all"` (the commands and the files, or fail). `ftps:` is TLS from
     * the first byte without it.
     */
    ssl?: "try" | "control" | "all";
    /** Sends `body` - or `file` - to the URL's path, in place of reading it: an FTP or SFTP upload, an HTTP PUT. */
    upload?: boolean;
    /** FTP and SFTP: the names in the URL's folder, one a line, in place of a listing with sizes and dates. */
    list?: boolean;
    /** FTP or SFTP commands run before the transfer, in order: `["DELE old.txt"]`, `["rename a.txt b.txt"]`. */
    quote?: string[];
    /** FTP and SFTP: an upload makes the folders of its path that are not there. */
    createDirs?: boolean;
    /** Milliseconds the whole request may take; past them it ends as `"timeout"`. No limit by default. */
    timeout?: number;
    /** A signal that aborts the request: it then ends at once as `"aborted"`. */
    signal?: AbortSignal | null;
    /**
     * A file of the game folder (`maps/de_dust2.bsp`) the answer is written
     * into - or, with `upload`, the upload is read from - in place of `body`.
     * The bytes go between the network and the disk without passing through
     * the plugin. A download that fails leaves an older file of that name as
     * it was. A path outside the game folder (absolute, or with `..`) is
     * refused.
     */
    file?: string;
    /** HTTP: whether a redirect is followed; `true` by default. */
    follow?: boolean;
    /** A proxy the request goes through, e.g. `"http://proxy.example.com:3128"`. */
    proxy?: string;
    /** The certificate authorities a server's certificate must come from, as PEM text; the ones a browser trusts by default. */
    ca?: string;
}
/** The end of a request: its answer, or why there is none. */
export declare class RequestResult {
    /** HTTP's status, or FTP's last reply once the transfer is done (`226`); `0` for SFTP; `-1` when the request failed. */
    status: number;
    /** Why there is no answer, or `""`. */
    errorKind: RequestErrorKind;
    /** The failure, in words; `""` when there was none. */
    errorText: string;
    /** The protocol's last reply code, a failed request's too: HTTP's status, FTP's reply (`530`, `550`), SFTP's status (`2` no such file); `0` when there was none. */
    replyCode: number;
    /** The words after HTTP's status, e.g. `"Not Found"`. */
    statusText: string;
    /** HTTP's response headers. */
    headers: Headers;
    /** The answer's bytes - a download, a listing; empty when it went into `file`. */
    body: ArrayBuffer;
    /** The address the answer came from, after any redirects. */
    url: string;
    /** `true` when an HTTP redirect was followed on the way. */
    redirected: bool;
    /** @hidden the signal's reason, for an aborted request. */
    __reason: Error | null;
    /** The answer as text, decoded as UTF-8. */
    text(): string;
    /** @hidden a request that ended before it was sent, or was aborted. */
    static __failed(kind: RequestErrorKind, text: string, reason?: Error | null): RequestResult;
}
/**
 * Sends a request to `url` - HTTP, HTTPS, FTP, FTPS or SFTP - with the
 * server's network client, and gives what it ended with. It never rejects:
 * a failure is `errorKind` and `errorText`.
 *
 * ```ts
 * import { request } from "@amxts/core/kit";
 *
 * const result = await request("sftp://example.com/maps/de_dust2.bsp", {
 *   user: "admin",
 *   keyFile: "addons/amxmodx/data/id_rsa",
 *   upload: true,
 *   file: "maps/de_dust2.bsp",
 * });
 * if (result.errorKind != "") console.error(`${result.errorKind}: ${result.errorText}`);
 * ```
 *
 * The promise settles on a later server frame: the game does not wait. In an
 * async command handler or a player's event, the player leaving aborts it.
 */
export declare function request(url: string, options?: RequestOptions): Promise<RequestResult>;
/**
 * Sends a request and gives its response, as the browser's `fetch` does.
 *
 * ```ts
 * const response = await fetch("https://example.com/api/stats");
 * const stats = await response.json<Stats>();
 * ```
 *
 * The promise is fulfilled once the response's headers and body have come,
 * on a later server frame: the game does not wait for it. A status such as
 * `404` is a response too - check `response.ok`. The promise rejects with a
 * TypeError when there is no response (no connection, a bad address) and
 * with the signal's reason when `init.signal` aborts. In an async command
 * handler or a player's event, the player leaving aborts it too.
 */
export declare function fetch(input: string, init?: RequestInit): Promise<Response>;
/** Sends a request to a URL made with `new URL`. */
export declare function fetch(input: URL, init?: RequestInit): Promise<Response>;
/** Sends a request made with `new Request`; what `init` gives takes the place of the request's own. */
export declare function fetch(input: Request, init?: RequestInit): Promise<Response>;
/** `useFetch`'s options. Every field is optional. */
export interface UseFetchOptions<B = string> {
    /** The request's method, e.g. `"POST"`; `"GET"` by default. */
    method?: string;
    /** Names and values added to the URL's query: `{ page: "2" }` adds `?page=2`. */
    query?: Record<string, string>;
    /** The request's headers, as an object of names and values. */
    headers?: Record<string, string>;
    /**
     * The request's body: text as it is, or an object of the type given second
     * (`useFetch<Answer, Report>`) as JSON.
     */
    body?: B;
    /** The number of further tries when a request fails on the way or the server answers `5xx`, `408` or `429`; `0` by default. */
    retry?: number;
    /** Milliseconds between two tries; `500` by default. */
    retryDelay?: number;
    /** Milliseconds a try may take before it is given up with a TimeoutError; no limit by default. */
    timeout?: number;
    /** A signal that cancels the request. */
    signal?: AbortSignal | null;
    /** A proxy the request goes through, e.g. `"http://proxy.example.com:3128"`. */
    proxy?: string;
    /** The check of the server's certificate, for HTTPS. */
    tls?: TlsOptions;
}
/** The answer of `useFetch`: the data or the error, and the status. */
export interface FetchResult<T> {
    /** The response's JSON read into `T`; `null` when there was an error or no body. */
    data: T | null;
    /** Why there is no data: a FetchError for a status that is not `2xx`, a TypeError for no response, the signal's reason for an abort, a SyntaxError for a body that is not JSON. */
    error: Error | null;
    /** The response's HTTP status; `0` when there was no response. */
    status: number;
}
/** A response whose status is not `2xx`, as `useFetch` reports it. */
export declare class FetchError extends Error {
    /** The response's HTTP status, e.g. `404`. */
    status: number;
    /** The words after the status, e.g. `"Not Found"`. */
    statusText: string;
    /** The response's body as text: often what the server says went wrong. */
    body: string;
    /** A response's error, e.g. `404 Not Found`. */
    constructor(
    /** The response's HTTP status, e.g. `404`. */
    status: number, 
    /** The words after the status, e.g. `"Not Found"`. */
    statusText: string, 
    /** The response's body as text: often what the server says went wrong. */
    body: string);
}
/**
 * Sends a request and reads its JSON into `T`, an interface of the fields
 * the JSON has. It never throws: what went wrong is `error`.
 *
 * ```ts
 * interface Weather {
 *   temperature: number;
 * }
 *
 * const { data, error } = await useFetch<Weather>("https://example.com/weather", { query: { city: "Paris" } });
 * if (error) return console.error(error.message);
 * print(player, `${data!.temperature} °C`);
 * ```
 *
 * A body that is an object goes as JSON: `useFetch<Answer, Report>(url, { method: "POST", body: report })`.
 */
export declare function useFetch<T, B = string>(url: string, options?: UseFetchOptions<B>): Promise<FetchResult<T>>;
export {};
