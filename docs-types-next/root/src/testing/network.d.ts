import type { FakeServer, PluginInstance } from './server';
/** What kind of failure ended a request, as the module names it (NetErrorKind); `''` for none. */
type Kind = '' | 'login' | 'denied' | 'notFound' | 'refused' | 'timeout' | 'tls' | 'aborted' | 'other';
interface Outcome {
    /** The HTTP status, FTP's last reply, 0 for SFTP; -1 when there was no response. */
    status: number;
    statusText: string;
    /** The last response's header lines, `name: value` each. */
    headers: string;
    url: string;
    redirects: number;
    body: Uint8Array;
    error: string;
    kind: Kind;
    /** The protocol's last reply code, a failed request's too. */
    reply: number;
}
/** A request a plugin holds, as the module keeps one. */
interface FakeRequest {
    plugin: PluginInstance;
    url: string;
    method: string;
    headers: [string, string][];
    body: Uint8Array | null;
    follow: boolean;
    proxy: string;
    ca: string;
    user: string;
    password: string;
    /** A file of the game folder, as the server's files hold it. */
    keyFile: string;
    keyPassphrase: string;
    hostKey: string;
    /** FTP's TLS: '', 'try', 'control' or 'all'. */
    ssl: string;
    upload: boolean;
    list: boolean;
    createDirs: boolean;
    quote: string[];
    postquote: string[];
    timeout: number;
    /** A file of the game folder the answer goes into, or an upload comes from. */
    file: string;
    /** The callback's index in the plugin's table. */
    fn: number;
    state: 'setting' | 'sent' | 'ended';
    cancelled: boolean;
    controller: AbortController;
    /** Settled when the response is in. */
    done: Promise<void> | null;
    outcome: Outcome | null;
}
export declare class FakeNetwork {
    private readonly server;
    /** Every request plugins hold, by id. */
    readonly requests: Map<number, FakeRequest>;
    /** What came back, in order, for the next frame. */
    private readonly ended;
    private nextId;
    constructor(server: FakeServer);
    /** The plugin's request in one of `states`; undefined for another plugin's. */
    private of;
    open(plugin: PluginInstance, url: string): number;
    option(plugin: PluginInstance, id: number, name: string, value: string): number;
    body(plugin: PluginInstance, id: number, bytes: Uint8Array): void;
    send(plugin: PluginInstance, id: number, fn: number): number;
    /** Runs a request by its URL's scheme, with its timeout; a download with `file` lands in the game folder. */
    private run;
    /** What an upload sends: its file of the game folder, or its body. */
    private uploaded;
    private http;
    /**
     * FTP and FTPS as curl speaks them: log in, the quote commands, into the
     * path's folder (making it, for an upload with createDirs), then the
     * transfer - a listing for a path that ends in `/`.
     */
    private ftp;
    /**
     * SFTP as curl speaks it: log in (a password, or a key of the game
     * folder), the host key checked against its SHA-256, the quote commands,
     * then the transfer - a listing for a path that ends in `/`.
     */
    private sftp;
    /** One of curl's SFTP quote commands. */
    private sftpCommand;
    /** Takes a request back: one under way is aborted and never heard of again. */
    cancel(plugin: PluginInstance, id: number): void;
    status(plugin: PluginInstance, id: number): number;
    reply(plugin: PluginInstance, id: number): number;
    redirects(plugin: PluginInstance, id: number): number;
    text(plugin: PluginInstance, id: number, what: number, out: number, max: number): number;
    size(plugin: PluginInstance, id: number): number;
    read(plugin: PluginInstance, id: number, out: number, max: number): number;
    /** Whether a request is still out. */
    get busy(): boolean;
    /**
     * Waits for the requests that are out, and hands each response to its
     * plugin - until none is out: a callback may send another.
     */
    settle(): Promise<void>;
    /** One frame: every request that has come back goes to its callback. */
    frame(): void;
}
export {};
