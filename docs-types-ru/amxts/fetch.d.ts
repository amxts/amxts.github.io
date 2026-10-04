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
 * Веб-адрес, разобранный на части: протокол, хост, путь и запрос.
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
    /** `true`, если `url` (относительно `base`, когда он задан) — адрес, который примет `new URL`. */
    static canParse(url: string, base?: string | null): bool;
    /** Адрес или `null`, если `url` не адрес, — `new URL` без исключения. */
    static parse(url: string, base?: string | null): URL | null;
    /** @hidden */
    static __of(parts: __UrlParts): URL;
    /** Весь адрес текстом, например `"https://example.com/api?id=7"`. */
    get href(): string;
    set href(value: string);
    /** Схема с двоеточием, например `"https:"`. */
    get protocol(): string;
    /** Имя пользователя перед хостом, например `"admin"` в `ftp://admin:secret@example.com`; `""`, если его нет. */
    get username(): string;
    /** Пароль перед хостом; `""`, если его нет. */
    get password(): string;
    /** Хост с портом, когда адрес его называет, например `"example.com:8080"`. */
    get host(): string;
    /** Хост без порта, например `"example.com"`. */
    get hostname(): string;
    /** Порт текстом, например `"8080"`; `""` для порта протокола по умолчанию. */
    get port(): string;
    /** Путь, например `"/api/stats"`. */
    get pathname(): string;
    set pathname(value: string);
    /** Запрос со знаком `?`, например `"?id=7"`; `""`, если его нет. */
    get search(): string;
    set search(value: string);
    /** Фрагмент со знаком `#`, например `"#top"`; `""`, если его нет. */
    get hash(): string;
    set hash(value: string);
    /** Схема, хост и порт, например `"https://example.com"`; `"null"` для адреса без хоста. */
    get origin(): string;
    /** Запрос как имена и значения; их изменение меняет адрес. */
    get searchParams(): URLSearchParams;
    /** Весь адрес текстом, как `href`. */
    toString(): string;
    /** Весь адрес текстом: то, что пишет для него `JSON.stringify`. */
    toJSON(): string;
    /** @hidden the user, password and host, as they stand between `//` and the path. */
    __authority(): string;
    /** @hidden the query, written back by its URLSearchParams. */
    __setQuery(query: string): void;
    private __syncParams;
}
/**
 * Имена и значения запроса, например `id=7&map=de_dust2`.
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
    /** Число пар имени и значения; имя, данное дважды, считается дважды. */
    get size(): number;
    /** Добавляет пару; у имени, которое уже есть, остаётся и прежнее значение. */
    append(name: string, value: string): void;
    /** Убирает все пары с именем `name`. */
    delete(name: string): void;
    /** Первое значение `name` или `null`, если его нет. */
    get(name: string): string | null;
    /** Все значения `name` по порядку. */
    getAll(name: string): string[];
    /** `true`, если есть пара с именем `name`. */
    has(name: string): bool;
    /** Ставит `name` значение `value`: его получает первая пара, остальные пары этого имени уходят. */
    set(name: string, value: string): void;
    /** Упорядочивает пары по имени; пары одного имени сохраняют свой порядок. */
    sort(): void;
    /** Вызывает `callback` с каждым значением и его именем по порядку. */
    forEach(callback: (value: string, name: string) => void): void;
    /** Все имена по порядку; имя, данное дважды, встречается дважды. */
    keys(): string[];
    /** Все значения по порядку. */
    values(): string[];
    /** Все пары как `[name, value]` по порядку. */
    entries(): string[][];
    /** Запрос текстом, без `?`: `id=7&map=de_dust2`. */
    toString(): string;
    /** @hidden takes the pairs of a query, `?` or not. */
    __read(query: string): void;
    private __update;
}
/**
 * HTTP-заголовки запроса или ответа. Имена сравниваются без учёта
 * регистра.
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
    /** Добавляет значение к `name`; прежнее остаётся, и `get` их объединяет. */
    append(name: string, value: string): void;
    /** Убирает `name` со всеми его значениями. */
    delete(name: string): void;
    /** Значение `name` — несколько значений через `", "` — или `null`, если такого заголовка нет. */
    get(name: string): string | null;
    /** Все заголовки `Set-Cookie` ответа, каждый отдельным текстом. */
    getSetCookie(): string[];
    /** `true`, если есть заголовок `name`. */
    has(name: string): bool;
    /** Ставит `name` значение `value` вместо всех прежних. */
    set(name: string, value: string): void;
    /** Вызывает `callback` со значением каждого заголовка и его именем в нижнем регистре, по порядку имён. */
    forEach(callback: (value: string, name: string) => void): void;
    /** Имена всех заголовков в нижнем регистре, по порядку имён. */
    keys(): string[];
    /** Значения всех заголовков по порядку имён. */
    values(): string[];
    /** Все заголовки как `[name, value]` по порядку имён; значения одного имени объединены, но каждый `set-cookie` отдельно. */
    entries(): string[][];
    /** @hidden a copy. */
    __copy(): Headers;
    /** @hidden the header lines of a response, `name: value` each. */
    static __parse(lines: string): Headers;
}
/** Проверка сертификата сервера при HTTPS. */
export interface TlsOptions {
    /**
     * Центры сертификации, от которых должен быть сертификат сервера, текстом
     * PEM — для сервера с собственным сертификатом. Если не задано — центры,
     * которым доверяет браузер.
     */
    ca?: string;
}
/** Настройки запроса: второй аргумент `fetch`. Все поля необязательны. */
export interface RequestInit {
    /** Метод запроса, например `"POST"`; по умолчанию `"GET"`. */
    method?: string;
    /** Заголовки запроса, объектом имён и значений: `{ Authorization: "Bearer abc" }`. */
    headers?: Record<string, string>;
    /** Текст, который уходит с запросом, например JSON. У запроса GET или HEAD его нет. */
    body?: string;
    /**
     * Поведение запроса при перенаправлении: одно из `"follow"` (по умолчанию) — по
     * его адресу, `"manual"` — само перенаправление ответом, `"error"` — отказ.
     */
    redirect?: "follow" | "manual" | "error";
    /** Сигнал, который отменяет запрос; промис тогда отклоняется с причиной сигнала. */
    signal?: AbortSignal | null;
    /** Прокси, через который идёт запрос, например `"http://proxy.example.com:3128"`. */
    proxy?: string;
    /** Проверка сертификата сервера при HTTPS. */
    tls?: TlsOptions;
}
/**
 * Запрос: адрес, метод, заголовки и тело — то, что отправляет `fetch`.
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
    /** Адрес, на который идёт запрос. */
    get url(): string;
    /** Метод запроса, например `"GET"`. */
    get method(): string;
    /** Заголовки запроса. */
    get headers(): Headers;
    /** Поведение запроса при перенаправлении: одно из `"follow"`, `"manual"` или `"error"`. */
    get redirect(): string;
    /** Сигнал, который отменяет запрос. */
    get signal(): AbortSignal;
    /** Копия запроса, чтобы отправить его ещё раз. */
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
/** Настройки ответа: второй аргумент `new Response`. */
export interface ResponseInit {
    /** Статус ответа; по умолчанию `200`. */
    status?: number;
    /** Слова после статуса, например `"Not Found"`; по умолчанию `""`. */
    statusText?: string;
    /** Заголовки ответа, объектом имён и значений. */
    headers?: Record<string, string>;
}
/**
 * Ответ сервера на запрос: статус, заголовки и тело.
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
    /** HTTP-статус ответа, например `200` или `404`. */
    get status(): number;
    /** Слова после статуса, например `"Not Found"`; `""`, если сервер их не прислал. */
    get statusText(): string;
    /** `true` при статусе от `200` до `299`. */
    get ok(): bool;
    /** Заголовки ответа. */
    get headers(): Headers;
    /** Адрес, с которого пришёл ответ, после всех перенаправлений. */
    get url(): string;
    /** `true`, если запрос по пути перенаправили. */
    get redirected(): bool;
    /** `true`, когда тело уже прочитано: прочитать его можно один раз. */
    get bodyUsed(): bool;
    /** Тело текстом, в UTF-8. */
    text(): Promise<string>;
    /**
     * Тело, прочитанное как JSON в `T` — интерфейс с полями этого JSON;
     * отклоняется с SyntaxError, если это не JSON.
     *
     * ```ts
     * interface Stats {
     *   kills: number;
     * }
     * const stats = await response.json<Stats>();
     * ```
     */
    json<T>(): Promise<T>;
    /** Тело байтами. */
    arrayBuffer(): Promise<ArrayBuffer>;
    /** Копия ответа, тело которой читается отдельно от этого. */
    clone(): Response;
    /** @hidden what the network client handed back. */
    static __received(status: number, statusText: string, headers: Headers, body: ArrayBuffer, url: string, redirected: bool): Response;
    /** The error of a second read, or null the first time. */
    private __take;
}
/**
 * Почему запрос закончился без ответа, как это говорит `request`: `""` —
 * ответ есть (HTTP-статус вроде `404` — тоже ответ); `"login"` —
 * пользователь, пароль или ключ не приняты; `"denied"` — учётной записи это
 * нельзя (FTP не может войти в папку, SFTP отвечает «нет прав»);
 * `"notFound"` — такого файла на сервере нет; `"refused"` — нет соединения:
 * хост неизвестен или отказывает; `"timeout"` — вышло время `timeout`;
 * `"tls"` — не удалось защищённое соединение: сертификату или ключу хоста
 * SSH нет доверия; `"aborted"` — запрос прервал сигнал; `"other"` — всё
 * остальное, словами в `errorText`.
 */
export type RequestErrorKind = "" | "login" | "denied" | "notFound" | "refused" | "timeout" | "tls" | "aborted" | "other";
/**
 * Параметры `request`: что отправить и как. Все поля необязательны; схема
 * адреса — `http:`, `https:`, `ftp:`, `ftps:` или `sftp:` — решает, какие
 * из них действуют.
 */
export interface RequestOptions {
    /** Метод HTTP, например `"POST"`; по умолчанию `"GET"`. `"HEAD"` ничего не передаёт — с `quote` выполняются только команды. */
    method?: string;
    /** Заголовки HTTP — объект имён и значений. */
    headers?: Record<string, string>;
    /** Отправляемый текст: тело HTTP или — с `upload` — содержимое файла. */
    body?: string;
    /** Пользователь для входа; если не задан — тот, что в адресе (`ftp://user@host`). */
    user?: string;
    /** Пароль для входа. */
    password?: string;
    /**
     * SFTP: закрытый ключ для входа, файл игровой папки
     * (`addons/amxmodx/data/id_rsa`) — ключ RSA в PEM
     * (`ssh-keygen -t rsa -m PEM`).
     */
    keyFile?: string;
    /** SFTP: пароль, которым зашифрован `keyFile`. */
    keyPassphrase?: string;
    /**
     * SFTP: ключ хоста сервера — его отпечаток SHA-256 в base64, как его печатает
     * `ssh-keygen -lf`, без `SHA256:`; сервер с другим ключом отвергается
     * (`"tls"`). Если не задан, принимается любой ключ хоста.
     */
    hostKey?: string;
    /**
     * FTP: TLS, запрошенный через `AUTH TLS` на обычном соединении `ftp:`, —
     * `"try"` (если сервер умеет), `"control"` (хотя бы команды) или
     * `"all"` (команды и файлы, иначе ошибка). `ftps:` — TLS с первого байта
     * и без этого параметра.
     */
    ssl?: "try" | "control" | "all";
    /** Отправляет `body` — или `file` — по пути адреса вместо чтения: загрузка на FTP или SFTP, HTTP PUT. */
    upload?: boolean;
    /** FTP и SFTP: имена в папке адреса, по одному в строке, вместо списка с размерами и датами. */
    list?: boolean;
    /** Команды FTP или SFTP, выполняемые по порядку до передачи: `["DELE old.txt"]`, `["rename a.txt b.txt"]`. */
    quote?: string[];
    /** FTP и SFTP: загрузка создаёт недостающие папки своего пути. */
    createDirs?: boolean;
    /** Время в миллисекундах, которое может идти весь запрос; дольше — он заканчивается как `"timeout"`. По умолчанию без ограничения. */
    timeout?: number;
    /** Сигнал, прерывающий запрос: тогда он сразу заканчивается как `"aborted"`. */
    signal?: AbortSignal | null;
    /**
     * Файл игровой папки (`maps/de_dust2.bsp`), в который пишется ответ, —
     * или, с `upload`, из которого читается загрузка, — вместо `body`.
     * Байты идут между сетью и диском, не проходя через плагин. Неудачная
     * закачка оставляет прежний файл с этим именем как был. Путь вне игровой
     * папки (абсолютный или с `..`) отвергается.
     */
    file?: string;
    /** HTTP: идти ли по перенаправлению; по умолчанию `true`. */
    follow?: boolean;
    /** Прокси, через который идёт запрос, например `"http://proxy.example.com:3128"`. */
    proxy?: string;
    /** Удостоверяющие центры, от которых должен быть сертификат сервера, текстом PEM; по умолчанию — те, которым доверяет браузер. */
    ca?: string;
}
/** Итог запроса: его ответ или почему ответа нет. */
export declare class RequestResult {
    /** Статус HTTP или последний ответ FTP после передачи (`226`); `0` для SFTP; `-1`, если запрос не удался. */
    status: number;
    /** Почему нет ответа, или `""`. */
    errorKind: RequestErrorKind;
    /** Неудача словами; `""`, если её не было. */
    errorText: string;
    /** Последний код ответа протокола, и у неудавшегося запроса: статус HTTP, ответ FTP (`530`, `550`), статус SFTP (`2` — нет такого файла); `0`, если его не было. */
    replyCode: number;
    /** Слова после статуса HTTP, например `"Not Found"`. */
    statusText: string;
    /** Заголовки ответа HTTP. */
    headers: Headers;
    /** Байты ответа — скачанное, список; пусто, если ответ ушёл в `file`. */
    body: ArrayBuffer;
    /** Адрес, откуда пришёл ответ, после всех перенаправлений. */
    url: string;
    /** `true`, если по пути было перенаправление HTTP. */
    redirected: bool;
    /** @hidden the signal's reason, for an aborted request. */
    __reason: Error | null;
    /** Ответ текстом, декодированный как UTF-8. */
    text(): string;
    /** @hidden a request that ended before it was sent, or was aborted. */
    static __failed(kind: RequestErrorKind, text: string, reason?: Error | null): RequestResult;
}
/**
 * Отправляет запрос по `url` — HTTP, HTTPS, FTP, FTPS или SFTP — сетевым
 * клиентом сервера и даёт то, чем он закончился. Никогда не отклоняется:
 * неудача — это `errorKind` и `errorText`.
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
 * Промис выполняется в одном из следующих кадров сервера: игра не ждёт. В
 * async-обработчике команды или события игрока уход игрока прерывает запрос.
 */
export declare function request(url: string, options?: RequestOptions): Promise<RequestResult>;
/**
 * Отправляет запрос и даёт ответ, как `fetch` в браузере.
 *
 * ```ts
 * const response = await fetch("https://example.com/api/stats");
 * const stats = await response.json<Stats>();
 * ```
 *
 * Промис выполняется, когда пришли заголовки и тело ответа, в одном из
 * следующих кадров сервера: игра его не ждёт. Статус вроде `404` — тоже
 * ответ, проверяйте `response.ok`. Промис отклоняется с TypeError, если
 * ответа нет (нет соединения, плохой адрес), и с причиной сигнала, если
 * сработал `init.signal`. В async-обработчике команды или события игрока
 * запрос отменяется и тогда, когда игрок выходит.
 */
export declare function fetch(input: string, init?: RequestInit): Promise<Response>;
/** Отправляет запрос по адресу, сделанному через `new URL`. */
export declare function fetch(input: URL, init?: RequestInit): Promise<Response>;
/** Отправляет запрос, сделанный через `new Request`; то, что задаёт `init`, заменяет его собственное. */
export declare function fetch(input: Request, init?: RequestInit): Promise<Response>;
/** Настройки `useFetch`. Все поля необязательны. */
export interface UseFetchOptions<B = string> {
    /** Метод запроса, например `"POST"`; по умолчанию `"GET"`. */
    method?: string;
    /** Имена и значения, которые добавляются в запрос адреса: `{ page: "2" }` добавляет `?page=2`. */
    query?: Record<string, string>;
    /** Заголовки запроса, объектом имён и значений. */
    headers?: Record<string, string>;
    /**
     * Тело запроса: текст как есть или объект типа, данного вторым
     * (`useFetch<Answer, Report>`), — в виде JSON.
     */
    body?: B;
    /** Число повторных попыток, если запрос сорвался по пути или сервер ответил `5xx`, `408` или `429`; по умолчанию `0`. */
    retry?: number;
    /** Миллисекунды между попытками; по умолчанию `500`. */
    retryDelay?: number;
    /** Миллисекунды на одну попытку, после которых её бросают с TimeoutError; по умолчанию без предела. */
    timeout?: number;
    /** Сигнал, который отменяет запрос. */
    signal?: AbortSignal | null;
    /** Прокси, через который идёт запрос, например `"http://proxy.example.com:3128"`. */
    proxy?: string;
    /** Проверка сертификата сервера при HTTPS. */
    tls?: TlsOptions;
}
/** Результат `useFetch`: данные или ошибка, и статус. */
export interface FetchResult<T> {
    /** JSON ответа, прочитанный в `T`; `null`, если была ошибка или тела нет. */
    data: T | null;
    /** Почему данных нет: FetchError для статуса не из `2xx`, TypeError, если ответа нет, причина сигнала при отмене, SyntaxError для тела, которое не JSON. */
    error: Error | null;
    /** HTTP-статус ответа; `0`, если ответа не было. */
    status: number;
}
/** Ответ со статусом не из `2xx`, как о нём сообщает `useFetch`. */
export declare class FetchError extends Error {
    /** HTTP-статус ответа, например `404`. */
    status: number;
    /** Слова после статуса, например `"Not Found"`. */
    statusText: string;
    /** Тело ответа текстом: часто там сервер пишет, что не так. */
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
 * Отправляет запрос и читает его JSON в `T` — интерфейс с полями этого
 * JSON. Никогда не бросает исключение: что пошло не так — в `error`.
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
 * Тело-объект уходит как JSON: `useFetch<Answer, Report>(url, { method: "POST", body: report })`.
 */
export declare function useFetch<T, B = string>(url: string, options?: UseFetchOptions<B>): Promise<FetchResult<T>>;
export {};
