/// <reference path="../as-types.d.ts" />
/// <reference path="./sql.types.d.ts" />
import "./promise";
import { ChangeQuery, InsertBuilder, SelectBuilder, SelectFieldsBuilder, SqlDialect, Table, UpdateBuilder, __Reader, __Sql } from "./sql";
/** A value of a query's `?`: text, a number, a boolean, bytes or `null`. */
export type DatabaseValue = string | number | boolean | Uint8Array | null;
/** The outcome of `execute`: the id the row it inserted got, and how many rows it changed. */
export interface ExecuteResult {
    /** The `AUTO_INCREMENT` id of the row inserted; `0` when there was none. */
    insertId: number;
    /** The number of rows the statement inserted, changed or deleted - for `UPDATE`, the rows it matched. */
    affectedRows: number;
}
/** Why a query failed: the database's message, with its error code and SQLSTATE when the server refused it. */
export declare class DatabaseError extends Error {
    /** The server's error number, such as `1062` for a duplicate key; `0` when the query did not reach the server. */
    code: number;
    /** The error's SQLSTATE, such as `"23000"`; `""` when the query did not reach the server. */
    sqlState: string;
    constructor(message: string, code?: number, sqlState?: string);
}
/** The side a query runs on: a connection, or a transaction of one. Rows are JSON text, an array of objects; bytes in them are base64 text, as `JSON.stringify` writes a Uint8Array. */
export interface DatabaseQueries {
    /** The dialect the database writes SQL in: what the query builder writes its statements in. */
    readonly dialect: SqlDialect;
    /** Runs a statement that reads rows; gives them as JSON text, `[{"name":"a"}]`. */
    query(sql: string, params: DatabaseValue[]): Promise<string>;
    /** Runs a statement that changes rows; gives `{ insertId, affectedRows }`. */
    execute(sql: string, params: DatabaseValue[]): Promise<ExecuteResult>;
}
/** A transaction a provider began: its queries, and how it ends. */
export interface DatabaseTransaction extends DatabaseQueries {
    /** Keeps what the transaction changed. */
    commit(): Promise<void>;
    /** Undoes what the transaction changed. */
    rollback(): Promise<void>;
}
/**
 * A connection a provider gives for an address: what `Database` runs on.
 * Its queries run in the order they are given.
 */
export interface DatabaseConnection extends DatabaseQueries {
    /** Begins a transaction; rejects when the database has none. */
    begin(): Promise<DatabaseTransaction>;
    /** Lets the connection go. */
    close(): void;
}
/** What `query` and `execute` are for both a database and a transaction. */
declare abstract class __Queries {
    /** @hidden */
    abstract get __queries(): DatabaseQueries;
    /**
     * Runs a statement that reads rows and gives them as `T`, an interface of
     * the columns. A column `T` does not name is skipped; a field the row lacks
     * keeps its default, or is a `TypeError` when it has none. The values of
     * the statement's `?` are `params`, in order.
     */
    query<T>(sql: string, params?: DatabaseValue[]): Promise<T[]>;
    /** Runs a statement that changes rows - `INSERT`, `UPDATE`, `DELETE` - with the values of its `?`. */
    execute(sql: string, params?: DatabaseValue[]): Promise<ExecuteResult>;
    /** Starts a query of rows: `db.select().from(records)`, every column - or `db.select({ time: records.time })`, the ones chosen. */
    select(): SelectBuilder;
    /** @hidden `select({ ... })` as the build writes it, with the row's reader (scripts/typed-tables.ts). */
    __selectFields<S>(reader: __Reader<S>, names: string[], fields: __Sql[]): SelectFieldsBuilder<S>;
    /** Starts an insert into the table: `db.insert(records).values({ ... })`. */
    insert<R, I, U>(table: Table<R, I, U>): InsertBuilder<R, I, U>;
    /** Starts an update of the table's rows: `db.update(records).set({ ... }).where(...)`. */
    update<R, I, U>(table: Table<R, I, U>): UpdateBuilder<R, I, U>;
    /** Starts a delete of the table's rows: `db.delete(records).where(...)` - every row without `where`. */
    delete<R, I, U>(table: Table<R, I, U>): ChangeQuery;
    /** Creates the table, with its keys, unless the database has it already: `CREATE TABLE IF NOT EXISTS`. */
    create<R, I, U>(table: Table<R, I, U>): Promise<void>;
}
/** The queries of a transaction: `db.transaction(async (tx) => { await tx.execute(...); })`. */
export declare class Transaction extends __Queries {
    private __transaction;
    constructor(__transaction: DatabaseTransaction);
    /** @hidden */
    get __queries(): DatabaseQueries;
}
/**
 * A database at an address - `mysql://user:password@host:3306/database`, or
 * the same with `jdbc:` before it, as a game panel gives it - that a plugin
 * sends SQL to. The queries run in the background, in the order
 * sent; each promise settles on a later server frame.
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
     * Runs `fn` in a transaction: what it sends through `tx` is committed when
     * it returns, and rolled back when it throws - the error goes on to the
     * caller. A transaction has a connection of its own while it runs.
     */
    transaction<R>(fn: (tx: Transaction) => Promise<R>): Promise<R>;
    /** Lets the connection go; the provider decides what that means (the module keeps MySQL's for the next map). */
    close(): void;
    /**
     * Makes `scheme` (`"sqlite"`) an address a database can have: `connect`
     * gives the connection for an address of it. A provider's library calls it
     * when it is imported.
     */
    static register(scheme: string, connect: (url: string) => DatabaseConnection): void;
}
export {};
