/// <reference path="../../as-types.d.ts" />
/** Настройки запроса помимо URL. Все поля необязательны. */
export declare class RequestInit {
    /** Метод запроса, одно из "GET" (по умолчанию), "POST", "PUT", "PATCH", "DELETE". */
    method?: string;
    /** Текст, который уходит с запросом, например JSON для POST; по умолчанию пустой. */
    body?: string;
    /** Заголовки запроса, парами: `[["Content-Type", "application/json"]]`. */
    headers?: string[][];
    /**
     * Сигнал, который отменяет запрос; промис тогда отклоняется с Error с
     * именем "AbortError". В async-обработчике команды или события игрока
     * запрос отменяется и тогда, когда игрок выходит.
     */
    signal?: AbortSignal | null;
}
/** Ответ сервера на запрос. */
export declare class Response {
    /** HTTP-статус ответа: 200, 404, ... */
    status: number;
    /** Тело ответа, текстом. */
    text: string;
    constructor(
    /** The response's HTTP status: 200, 404, ... */
    status: number, 
    /** The response's body, as text. */
    text: string);
    /** `true` при статусе 2xx. */
    get ok(): boolean;
}
/**
 * Отправляет запрос. Промис выполняется с ответом в одном из следующих
 * кадров и отклоняется, если ответа нет: нет соединения, плохой URL,
 * таймаут, нет easy_http или отмена. HTTP-ошибка вроде 404 — это ответ,
 * как и в fetch: проверяйте `response.ok`.
 *
 * Pawn: `ezhttp_get`, `ezhttp_post` (easy_http)
 */
export declare function fetch(url: string, init?: RequestInit): Promise<Response>;
