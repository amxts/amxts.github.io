import type { FakeServer, PluginInstance } from './server';
/** A value of a query's `?`, as the plugin gave it. */
export type DatabaseValue = string | number | boolean | Uint8Array | null;
/** A row a query gives: its columns by name - a `Uint8Array` is a BLOB's, `BINARY`'s or `VARBINARY`'s bytes. */
export type DatabaseRow = Record<string, DatabaseValue>;
/** What an `execute` gives; a field left out is `0`. */
export interface DatabaseExecuted {
    insertId?: number;
    affectedRows?: number;
}
/** What a statement answers: rows for a query, the counts for an execute - or a function of the values that gives one. */
export type DatabaseAnswer = DatabaseRow[] | DatabaseExecuted | ((params: DatabaseValue[]) => DatabaseRow[] | DatabaseExecuted);
/** How a statement fails, as the server refuses one: `{ code: 1062, message: "Duplicate entry ..." }`. A failure without `code` is a lost connection. */
export interface DatabaseFailure {
    code?: number;
    sqlState?: string;
    message: string;
}
/** A query a plugin sent: its SQL, its values and the transaction it ran in (`0` for none). */
export interface SentQuery {
    sql: string;
    params: DatabaseValue[];
    transaction: number;
}
/** A transaction a plugin ran: what it sent, and how it ended - `null` while it runs. */
export interface SentTransaction {
    id: number;
    queries: SentQuery[];
    committed: boolean | null;
}
/** The database at an address, as a test sets it up and reads what the plugins sent it. */
export declare class FakeDatabase {
    /** Every query the plugins sent, in order. */
    readonly queries: SentQuery[];
    /** Every transaction the plugins ran, in order. */
    readonly transactions: SentTransaction[];
    private readonly rules;
    /**
     * Answers a statement - its SQL as written, spacing aside, or a pattern -
     * with rows, with an execute's counts, or with a function of its values.
     * The answer given last for a statement is the one used.
     */
    answer(sql: string | RegExp, answer: DatabaseAnswer): this;
    /** Makes a statement fail as the server would refuse it. */
    fail(sql: string | RegExp, failure: DatabaseFailure): this;
    /** What a statement gives: the outcome the plugin reads. @internal */
    run(kind: number, sql: string, params: DatabaseValue[]): {
        status: number;
        text: string;
        state: string;
    };
}
/** The pools plugins opened and the queries they sent: what db_* reach. */
export declare class FakeDatabases {
    private readonly server;
    /** The databases a test set up, by address; `''` for every address. */
    readonly byUrl: Map<string, FakeDatabase>;
    private readonly pools;
    private readonly queries;
    private readonly ended;
    /** The transactions that have begun and not ended, by id. */
    private readonly open;
    private nextId;
    constructor(server: FakeServer);
    /** The database at `url` - every address when it is left out - made on first use. */
    database(url?: string): FakeDatabase;
    /** db_open: the pool's id, the same for one address; 0 for an address that is not mysql://. */
    openPool(url: string): number;
    /** db_query: the query's outcome is worked out now and handed over on the next frame. */
    query(plugin: PluginInstance, pool: number, tx: number, kind: number, sql: string, paramsJson: string, fn: number): number;
    /** What stops the test: a query nothing answered, thrown by server.responses(). @internal */
    problem: Error | null;
    /** What a query gives, recording it on its database. */
    private outcome;
    private of;
    status(plugin: PluginInstance, id: number): number;
    text(plugin: PluginInstance, id: number, what: number, out: number, max: number): number;
    close(plugin: PluginInstance, id: number): void;
    /** Whether a query has ended and waits for a frame. */
    get busy(): boolean;
    /** One frame: every query that has ended goes to its callback. */
    frame(): void;
}
