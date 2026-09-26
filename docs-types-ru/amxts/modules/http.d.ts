/// <reference path="../../as-types.d.ts" />
/** Что запрос отправляет помимо URL. Все поля необязательны. */
export declare class RequestInit {
    /** По умолчанию GET; из остальных easy_http умеет POST, PUT, PATCH и DELETE. */
    method?: string;
    /** Текст, который уходит с запросом, например JSON для POST; по умолчанию пустой. */
    body?: string;
    /** Пары, как HeadersInit из стандарта Fetch: `[["Content-Type", "application/json"]]`. */
    headers?: string[][];
    /**
     * Отменяет запрос, когда срабатывает; промис тогда отклоняется с его
     * причиной — Error с именем "AbortError". Внутри async-обработчика команды
     * или события игрока запрос отменяется и тогда, когда игрок выходит.
     */
    signal?: AbortSignal | null;
}
/** То, что пришло в ответ. */
export declare class Response {
    /** HTTP-статус: 200, 404, ... */
    status: number;
    /** Тело ответа, текстом. */
    text: string;
    constructor(
    /** The HTTP status: 200, 404, ... */
    status: number, 
    /** The body, as text. */
    text: string);
    /** Статус 2xx. */
    get ok(): boolean;
}
/**
 * Отправляет запрос. Промис выполняется с ответом в одном из следующих
 * кадров и отклоняется, если ответа нет: нет соединения, плохой URL,
 * таймаут, нет easy_http или отмена. HTTP-ошибка вроде 404 — это ответ,
 * как и в fetch: проверяйте `response.ok`.
 */
export declare function fetch(url: string, init?: RequestInit): Promise<Response>;
