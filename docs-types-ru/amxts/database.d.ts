/// <reference path="../as-types.d.ts" />
/// <reference path="./sql.types.d.ts" />
import "./promise";
import { ChangeQuery, InsertBuilder, SelectBuilder, SelectFieldsBuilder, SqlDialect, Table, UpdateBuilder, __Reader, __Sql } from "./sql";
/** Значение для `?` запроса: текст, число, логическое, байты или `null`. */
export type DatabaseValue = string | number | boolean | Uint8Array | null;
/** Итог `execute`: номер вставленной строки и сколько строк изменено. */
export interface ExecuteResult {
    /** `AUTO_INCREMENT`-номер вставленной строки; `0`, если вставки не было. */
    insertId: number;
    /** Число строк, которые запрос вставил, изменил или удалил; для `UPDATE` — подошедших под условие. */
    affectedRows: number;
}
/** Почему запрос не удался: текст базы, с кодом ошибки и SQLSTATE, если запрос отклонил сервер. */
export declare class DatabaseError extends Error {
    /** Номер ошибки сервера, например `1062` — повтор ключа; `0`, если запрос не дошёл до сервера. */
    code: number;
    /** SQLSTATE ошибки, например `"23000"`; `""`, если запрос не дошёл до сервера. */
    sqlState: string;
    constructor(message: string, code?: number, sqlState?: string);
}
/** На чём выполняется запрос: соединение или его транзакция. Строки — JSON-текст, массив объектов; байты в них — текст base64, как `JSON.stringify` пишет Uint8Array. */
export interface DatabaseQueries {
    /** Диалект, на котором база пишет SQL: на нём построитель запросов пишет свои запросы. */
    readonly dialect: SqlDialect;
    /** Выполняет запрос, который читает строки; отдаёт их JSON-текстом, `[{"name":"a"}]`. */
    query(sql: string, params: DatabaseValue[]): Promise<string>;
    /** Выполняет запрос, который меняет строки; отдаёт `{ insertId, affectedRows }`. */
    execute(sql: string, params: DatabaseValue[]): Promise<ExecuteResult>;
}
/** Транзакция, начатая провайдером: её запросы и как она заканчивается. */
export interface DatabaseTransaction extends DatabaseQueries {
    /** Сохраняет то, что изменила транзакция. */
    commit(): Promise<void>;
    /** Отменяет то, что изменила транзакция. */
    rollback(): Promise<void>;
}
/**
 * Соединение, которое провайдер даёт для адреса: на нём работает `Database`.
 * Его запросы выполняются в том порядке, в каком переданы.
 */
export interface DatabaseConnection extends DatabaseQueries {
    /** Начинает транзакцию; отклоняется, если у базы их нет. */
    begin(): Promise<DatabaseTransaction>;
    /** Отпускает соединение. */
    close(): void;
}
/** What `query` and `execute` are for both a database and a transaction. */
declare abstract class __Queries {
    /** @hidden */
    abstract get __queries(): DatabaseQueries;
    /**
     * Выполняет запрос, который читает строки, и отдаёт их как `T` — интерфейс
     * колонок. Колонка, которой нет в `T`, пропускается; поле, которого нет в
     * строке, сохраняет значение по умолчанию, а без него это `TypeError`.
     * Значения для `?` запроса — `params`, по порядку.
     */
    query<T>(sql: string, params?: DatabaseValue[]): Promise<T[]>;
    /** Выполняет запрос, который меняет строки, — `INSERT`, `UPDATE`, `DELETE` — со значениями для его `?`. */
    execute(sql: string, params?: DatabaseValue[]): Promise<ExecuteResult>;
    /** Начинает запрос строк: `db.select().from(records)` — все колонки, или `db.select({ time: records.time })` — выбранные. */
    select(): SelectBuilder;
    /** @hidden `select({ ... })` as the build writes it, with the row's reader (scripts/typed-tables.ts). */
    __selectFields<S>(reader: __Reader<S>, names: string[], fields: __Sql[]): SelectFieldsBuilder<S>;
    /** Начинает вставку в таблицу: `db.insert(records).values({ ... })`. */
    insert<R, I, U>(table: Table<R, I, U>): InsertBuilder<R, I, U>;
    /** Начинает изменение строк таблицы: `db.update(records).set({ ... }).where(...)`. */
    update<R, I, U>(table: Table<R, I, U>): UpdateBuilder<R, I, U>;
    /** Начинает удаление строк таблицы: `db.delete(records).where(...)` — без `where` все строки. */
    delete<R, I, U>(table: Table<R, I, U>): ChangeQuery;
    /** Создаёт таблицу с её ключами, если в базе её ещё нет: `CREATE TABLE IF NOT EXISTS`. */
    create<R, I, U>(table: Table<R, I, U>): Promise<void>;
}
/** Запросы транзакции: `db.transaction(async (tx) => { await tx.execute(...); })`. */
export declare class Transaction extends __Queries {
    private __transaction;
    constructor(__transaction: DatabaseTransaction);
    /** @hidden */
    get __queries(): DatabaseQueries;
}
/**
 * База по адресу — `mysql://user:password@host:3306/database` или тот же
 * с `jdbc:` впереди, как его даёт игровая панель, — которой плагин
 * отправляет SQL. Запросы идут в фоне, в порядке отправки; каждый
 * промис выполняется на одном из следующих кадров сервера.
 *
 * ```ts
 * const db = new Database(env("MYPLUGIN_DB", ""));
 * const top = await db.query<Record>("SELECT name, time FROM records WHERE map = ? ORDER BY time LIMIT 10", [server.map]);
 * ```
 */
export declare class Database extends __Queries {
    private __connection;
    constructor(url: string);
    /** @hidden */
    get __queries(): DatabaseQueries;
    /**
     * Выполняет `fn` в транзакции: то, что она отправила через `tx`,
     * фиксируется, когда она вернулась, и откатывается, когда бросила
     * исключение, — ошибка уходит дальше вызывающему. У транзакции, пока она
     * идёт, своё соединение.
     */
    transaction<R>(fn: (tx: Transaction) => Promise<R>): Promise<R>;
    /** Отпускает соединение; что это значит, решает провайдер (соединение MySQL модуль держит для следующей карты). */
    close(): void;
    /**
     * Делает `scheme` (`"sqlite"`) схемой адреса базы: `connect` даёт
     * соединение для адреса с ней. Библиотека провайдера вызывает это при
     * импорте.
     */
    static register(scheme: string, connect: (url: string) => DatabaseConnection): void;
}
export {};
