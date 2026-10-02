/** How `ftp.connect` logs in, and what every call of the client takes by default. */
export interface FtpOptions {
    /** The user to log in as; the address's own (`sftp://admin@example.com`) when left out. */
    user?: string;
    /** The password to log in with; the address's own when left out. */
    password?: string;
    /**
     * SFTP: the private key to log in with, a file of the game folder
     * (`addons/amxmodx/data/backup_key`) - an RSA key in PEM.
     */
    keyFile?: string;
    /** SFTP: the passphrase `keyFile` is encrypted with. */
    keyPassphrase?: string;
    /**
     * SFTP: the server's host key, its SHA-256 fingerprint in base64 as
     * `ssh-keygen -lf` prints it, without `SHA256:`. A server with another key
     * is refused; left out, any host key is taken.
     */
    hostKey?: string;
    /**
     * FTPS: the certificate authorities the server's certificate must come
     * from, as PEM text - for a server with a certificate of its own making.
     * Left out, the ones a browser trusts.
     */
    ca?: string;
    /** Milliseconds each call may take before it fails; no limit by default. */
    timeout?: number;
}
/** One call's own options: `upload`'s, `download`'s and the others' last argument. */
export interface FtpCallOptions {
    /** Milliseconds this call may take before it fails; the client's `timeout` when left out. */
    timeout?: number;
    /** A signal that cancels the call; the promise then rejects with the signal's reason. */
    signal?: AbortSignal | null;
}
/** A file or a folder in a listing. */
export interface FtpEntry {
    /** The entry's name, without its folder, e.g. `"maps.ini"`. */
    name: string;
    /** The entry's size in bytes; a folder's as the server gives it. */
    size: number;
    /** `true` for a folder. */
    isDirectory: boolean;
    /** The entry's last change, as the server lists it: to the minute, or to the day for an older file. */
    modified: Date;
}
/** Where a client's addresses start: the protocol, the host and the folder of `ftp.connect`'s address. */
interface Origin {
    /** `"ftp:"`, `"ftpes:"`, `"ftps:"` or `"sftp:"`, as the address has it. */
    scheme: string;
    /** The host and its port, e.g. `"example.com:2121"`. */
    host: string;
    /** The address's folder, encoded, without a slash at the end: `""` or `"/backup"`. */
    folder: string;
}
/**
 * A connection to an FTP, FTPS or SFTP server, from `ftp.connect`. Every call
 * returns a promise and runs on the server's network client.
 *
 * ```ts
 * await client.upload("addons/amxmodx/logs/today.log", "/backup/today.log");
 * const entries = await client.list("/backup");
 * await client.close();
 * ```
 */
export declare class FtpClient {
    private readonly origin;
    private readonly user;
    private readonly login;
    private closed;
    constructor(origin: Origin, user: string, login: FtpOptions);
    /**
     * Sends a file of the game folder to `remotePath`, byte for byte - a log, a
     * map, a demo - making the remote folders that are not there.
     *
     * ```ts
     * await client.upload("addons/amxmodx/logs/today.log", "/backup/today.log");
     * ```
     */
    upload(localPath: string, remotePath: string, options?: FtpCallOptions): Promise<void>;
    /**
     * Fetches `remotePath` into a file of the game folder, byte for byte. A
     * download that fails leaves a file already there as it was.
     *
     * ```ts
     * await client.download("/maps/de_dust2.bsp", "maps/de_dust2.bsp");
     * ```
     */
    download(remotePath: string, localPath: string, options?: FtpCallOptions): Promise<void>;
    /**
     * The text of `remotePath`, read as UTF-8 - a config, a list.
     *
     * ```ts
     * const maps = await client.readFile("/configs/maps.ini");
     * ```
     */
    readFile(remotePath: string, options?: FtpCallOptions): Promise<string>;
    /**
     * Writes `text` to `remotePath` as UTF-8, in place of what was there,
     * making the remote folders that are not there.
     *
     * ```ts
     * await client.writeFile("/status/online.txt", `${server.players.length}`);
     * ```
     */
    writeFile(remotePath: string, text: string, options?: FtpCallOptions): Promise<void>;
    /**
     * The files and folders in `remotePath` - the folder of `ftp.connect`'s
     * address when left out.
     *
     * ```ts
     * const entries = await client.list("/configs");
     * const big = entries.filter((entry) => !entry.isDirectory && entry.size > 1_000_000);
     * ```
     */
    list(remotePath?: string, options?: FtpCallOptions): Promise<FtpEntry[]>;
    /** Ends the client: a call after it rejects. */
    close(): Promise<void>;
    /** @hidden checks the login: the folder of the address entered, nothing transferred. */
    __check(): Promise<void>;
    /** The request's options: the login, then the call's timeout and signal. */
    private requestOptions;
    /**
     * The address of `path` as the network client reads it. An absolute path
     * starts at the server's root, a relative one at the folder of
     * `ftp.connect`'s address. FTP counts a URL's path from the login folder
     * (`%2F` is its root); SFTP from the root (`/~` is the login folder).
     */
    private address;
    /** Sends a request; its result, or a rejection that says what failed. */
    private send;
    /** What failed, in words: the action, the path and why - never the password. */
    private failure;
    /** `text` with the password, should a server repeat it, as `***`. */
    private hidden;
}
/**
 * Connects to an FTP, FTPS or SFTP server - `ftp`, imported from
 * `@amxts/ftp`.
 *
 * ```ts
 * import { ftp } from "@amxts/ftp";
 *
 * const client = await ftp.connect("sftp://backup@example.com", { password });
 * ```
 */
export declare class Ftp {
    /**
     * Logs in to the server of `url` and gives a client for it; rejects when
     * the login fails. The scheme says how: `ftp:` plain FTP, `ftpes:` FTP
     * with TLS asked for (explicit FTPS), `ftps:` TLS from the first byte
     * (implicit FTPS), `sftp:` SFTP over SSH. A folder in the address is where
     * relative paths start.
     *
     * ```ts
     * const client = await ftp.connect("ftpes://files.example.com:2121/backup", { user: "cs", password });
     * ```
     */
    connect(url: string, options?: FtpOptions): Promise<FtpClient>;
}
/** Connects to an FTP, FTPS or SFTP server: `ftp.connect(url, options)`. */
export declare const ftp: Ftp;
export {};
