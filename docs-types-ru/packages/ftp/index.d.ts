/** Как `ftp.connect` входит на сервер и что каждый вызов клиента берёт по умолчанию. */
export interface FtpOptions {
    /** Пользователь для входа; если не указан — из адреса (`sftp://admin@example.com`). */
    user?: string;
    /** Пароль для входа; если не указан — из адреса. */
    password?: string;
    /**
     * SFTP: закрытый ключ для входа, файл игровой папки
     * (`addons/amxmodx/data/backup_key`), — ключ RSA в PEM.
     */
    keyFile?: string;
    /** SFTP: пароль, которым зашифрован `keyFile`. */
    keyPassphrase?: string;
    /**
     * SFTP: ключ хоста сервера — его отпечаток SHA-256 в base64, как его печатает
     * `ssh-keygen -lf`, без `SHA256:`. Сервер с другим ключом отвергается;
     * если не указан, принимается любой ключ хоста.
     */
    hostKey?: string;
    /**
     * FTPS: удостоверяющие центры, которыми должен быть выдан сертификат
     * сервера, текстом PEM, — для сервера с самодельным сертификатом.
     * Если не указаны — те, которым доверяет браузер.
     */
    ca?: string;
    /** Сколько миллисекунд может длиться каждый вызов, прежде чем он завершится ошибкой; по умолчанию без ограничения. */
    timeout?: number;
}
/** Параметры одного вызова: последний аргумент `upload`, `download` и остальных. */
export interface FtpCallOptions {
    /** Сколько миллисекунд может длиться этот вызов, прежде чем он завершится ошибкой; если не указано — `timeout` клиента. */
    timeout?: number;
    /** Сигнал, отменяющий вызов; промис тогда отклоняется с причиной сигнала. */
    signal?: AbortSignal | null;
}
/** Файл или папка в списке. */
export interface FtpEntry {
    /** Имя записи без папки, например `"maps.ini"`. */
    name: string;
    /** Размер записи в байтах; у папки — какой даёт сервер. */
    size: number;
    /** `true` для папки. */
    isDirectory: boolean;
    /** Время последнего изменения записи, как его даёт сервер: с точностью до минуты, у старого файла — до дня. */
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
 * Подключение к серверу FTP, FTPS или SFTP из `ftp.connect`. Каждый вызов
 * возвращает промис и выполняется сетевым клиентом сервера.
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
     * Отправляет файл игровой папки в `remotePath` байт в байт — лог, карту,
     * демо, — создавая удалённые папки, которых нет.
     *
     * ```ts
     * await client.upload("addons/amxmodx/logs/today.log", "/backup/today.log");
     * ```
     */
    upload(localPath: string, remotePath: string, options?: FtpCallOptions): Promise<void>;
    /**
     * Скачивает `remotePath` в файл игровой папки байт в байт. Неудачная
     * загрузка оставляет уже существующий файл как был.
     *
     * ```ts
     * await client.download("/maps/de_dust2.bsp", "maps/de_dust2.bsp");
     * ```
     */
    download(remotePath: string, localPath: string, options?: FtpCallOptions): Promise<void>;
    /**
     * Текст `remotePath`, прочитанный как UTF-8, — конфиг, список.
     *
     * ```ts
     * const maps = await client.readFile("/configs/maps.ini");
     * ```
     */
    readFile(remotePath: string, options?: FtpCallOptions): Promise<string>;
    /**
     * Записывает `text` в `remotePath` как UTF-8 вместо того, что там было,
     * создавая удалённые папки, которых нет.
     *
     * ```ts
     * await client.writeFile("/status/online.txt", `${server.players.length}`);
     * ```
     */
    writeFile(remotePath: string, text: string, options?: FtpCallOptions): Promise<void>;
    /**
     * Файлы и папки в `remotePath`; если путь не указан — в папке адреса
     * `ftp.connect`.
     *
     * ```ts
     * const entries = await client.list("/configs");
     * const big = entries.filter((entry) => !entry.isDirectory && entry.size > 1_000_000);
     * ```
     */
    list(remotePath?: string, options?: FtpCallOptions): Promise<FtpEntry[]>;
    /** Закрывает клиент: вызов после этого отклоняется. */
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
 * Подключается к серверу FTP, FTPS или SFTP — `ftp`, импортированный из
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
     * Входит на сервер `url` и даёт клиент для него; отклоняется, если вход не
     * удался. Схема говорит как: `ftp:` — обычный FTP, `ftpes:` — FTP с
     * запросом TLS (явный FTPS), `ftps:` — TLS с первого байта (неявный
     * FTPS), `sftp:` — SFTP поверх SSH. Папка в адресе — то, откуда
     * начинаются относительные пути.
     *
     * ```ts
     * const client = await ftp.connect("ftpes://files.example.com:2121/backup", { user: "cs", password });
     * ```
     */
    connect(url: string, options?: FtpOptions): Promise<FtpClient>;
}
/** Подключается к серверу FTP, FTPS или SFTP: `ftp.connect(url, options)`. */
export declare const ftp: Ftp;
export {};
