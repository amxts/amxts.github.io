/// <reference path="../as-types.d.ts" />
/// <reference path="./sql.types.d.ts" />
import { DatabaseError, DatabaseQueries, DatabaseValue, ExecuteResult } from "./database";
/** @hidden */ export declare const __INT: i32;
/** @hidden */ export declare const __BIGINT: i32;
/** @hidden */ export declare const __DOUBLE: i32;
/** @hidden */ export declare const __DECIMAL: i32;
/** @hidden */ export declare const __VARCHAR: i32;
/** @hidden */ export declare const __TEXT: i32;
/** @hidden */ export declare const __BOOLEAN: i32;
/** @hidden */ export declare const __DATETIME: i32;
/** @hidden */ export declare const __JSON: i32;
/** @hidden */ export declare const __BINARY: i32;
/** @hidden */ export declare const __VARBINARY: i32;
/** @hidden */ export declare const __BLOB: i32;
/** @hidden */ export declare const __MEDIUMBLOB: i32;
/** @hidden */ export declare const __LONGBLOB: i32;
/** @hidden */ export declare const __NOT_NULL: i32;
/** @hidden */ export declare const __PRIMARY_KEY: i32;
/** @hidden */ export declare const __AUTOINCREMENT: i32;
/** @hidden */ export declare const __UNIQUE: i32;
/** @hidden */ export declare const __HAS_DEFAULT: i32;
/** @hidden a `bigint({ mode: "string" })`: selected as text, so no digit is lost. */
export declare const __AS_TEXT: i32;
/** @hidden Something that writes itself into a statement: a column, a condition, an order. */
export declare abstract class __Sql {
    abstract __write(sql: __SqlWriter): void;
}
/** @hidden A statement as it is written: its text in parts, and the values of its `?`. */
export declare class __SqlWriter {
    dialect: SqlDialect;
    parts: string[];
    params: DatabaseValue[];
    constructor(dialect: SqlDialect);
    text(text: string): void;
    name(name: string): void;
    value(value: DatabaseValue): void;
    list(items: __Sql[], separator?: string): void;
    get sql(): string;
}
/** @hidden A boolean column's value as the database gives it: a boolean, MySQL's 0 or 1, or text that says one. */
export declare function __booleanOf(value: DatabaseValue): bool;
declare const __notGivenText: string;
declare const __notGivenValue: DatabaseValue;
declare const __notGivenObject: __NotGiven;
export { __notGivenObject, __notGivenText, __notGivenValue };
/** @hidden the mark of an object left out. */
export declare class __NotGiven {
}
/** @hidden whether an insert's or an update's field was given: it holds no mark of being left out. */
export declare function __given<T>(value: T): bool;
/** @hidden A number as a value: its null and undefined are SQL's NULL. */
export declare function __numberValue(value: f64): DatabaseValue;
/** @hidden A column whatever it holds: what tables, targets and orders take. */
export declare abstract class __Column extends __Sql {
    __name: string;
    __kind: i32;
    __flags: i32;
    __length: i32;
    __scale: i32;
    __default: DatabaseValue;
    constructor(__name: string, __kind: i32, __flags: i32, __length?: i32, __scale?: i32, __default?: DatabaseValue);
    __write(sql: __SqlWriter): void;
    /** @hidden as a select list has it: a `bigint` kept as text is cast to text. */
    __select(sql: __SqlWriter): void;
}
/** A column of a table - `records.time` - which queries compare, order and select by. */
export declare class Column<T> extends __Column {
}
/** A value a query works out of a column: `count()`, `sum(records.time)`. */
export declare class Aggregate<T> extends __Sql {
    __function: string;
    __of: __Column | null;
    constructor(__function: string, __of: __Column | null);
    __write(sql: __SqlWriter): void;
}
/** An aggregate that is `null` when no row is there to work it out of: `sum`, `avg`, `min`, `max`. */
export declare class NullableAggregate<T> extends Aggregate<T> {
}
/** The number of rows - or, of a column, of the rows that hold a value in it. */
export declare function count(column?: __Column | null): Aggregate<number>;
/** The sum of a column's values; `null` when there are none. */
export declare function sum<T>(column: Column<T>): NullableAggregate<number>;
/** The average of a column's values; `null` when there are none. */
export declare function avg<T>(column: Column<T>): NullableAggregate<number>;
/** The least of a column's values; `null` when there are none. */
export declare function min<T>(column: Column<T>): NullableAggregate<T>;
/** The greatest of a column's values; `null` when there are none. */
export declare function max<T>(column: Column<T>): NullableAggregate<T>;
/** A composite key of a table, made by the third argument of `table`: a unique one or a plain index. */
export declare class __Index {
    name: string;
    unique: bool;
    columns: string[];
    constructor(name: string, unique: bool, columns: string[]);
}
/** @hidden What reads a query's rows: a table, or the build's reader of a choice of columns. */
export declare abstract class __Reader<R> {
    abstract __read(text: string): R[];
}
/**
 * A table `table(...)` describes: its columns are its fields, `records.time`.
 * `typeof records.$inferSelect` is its row, `typeof records.$inferInsert`
 * what an insert takes.
 */
export declare abstract class Table<R, I, U> extends __Reader<R> {
    __name: string;
    /** @hidden */ __columns: __Column[];
    /** @hidden */ __indexes: __Index[];
    constructor(__name: string);
    /** @hidden lays an insert's row out: each column's value, and whether it was given. */
    abstract __insertRow(row: I, values: DatabaseValue[], given: bool[]): void;
    /** @hidden lays an update's values out likewise. */
    abstract __setRow(set: U, values: DatabaseValue[], given: bool[]): void;
}
/** A condition of `where`: `eq(records.map, server.map)`, `and(...)`. */
export declare abstract class Condition extends __Sql {
}
/** The column equals the value, or the other column. */
export declare function eq<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** The column does not equal the value, or the other column. */
export declare function ne<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** The column is greater than the value, or the other column. */
export declare function gt<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** The column is greater than or equal to the value, or the other column. */
export declare function gte<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** The column is less than the value, or the other column. */
export declare function lt<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** The column is less than or equal to the value, or the other column. */
export declare function lte<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** The text column matches `pattern`, SQL's `LIKE`: `%` any text, `_` one character. */
export declare function like<T>(column: Column<T>, pattern: string): Condition;
/** The column's value is one of `values`; never, when there are none. */
export declare function inArray<T>(column: Column<T>, values: T[]): Condition;
/** The column's value is between `low` and `high`, both included. */
export declare function between<T>(column: Column<T>, low: T, high: T): Condition;
/** The column holds no value: SQL's `NULL`. */
export declare function isNull<T>(column: Column<T>): Condition;
/** The column holds a value. */
export declare function isNotNull<T>(column: Column<T>): Condition;
/** Every condition holds; with none, any row does. */
export declare function and(...conditions: Condition[]): Condition;
/** One of the conditions holds; with none, no row does. */
export declare function or(...conditions: Condition[]): Condition;
/** The condition does not hold. */
export declare function not(condition: Condition): Condition;
/** An order of `orderBy`: by a column or an aggregate, up or down. */
export declare class Order extends __Sql {
    __by: __Sql;
    __descending: bool;
    constructor(__by: __Sql, __descending: bool);
    __write(sql: __SqlWriter): void;
}
/** Smallest first. */
export declare function asc(by: __Sql): Order;
/** Greatest first. */
export declare function desc(by: __Sql): Order;
/**
 * A database's way of writing SQL: the names, the `?`, the upsert, the
 * column types of `create`. A provider's connection names its dialect; the builder
 * hands the parts of a statement to it, so the same query is written for
 * any database. This class writes standard SQL; a dialect overrides what
 * its database writes otherwise, and what it cannot do it refuses with
 * `unsupported`.
 */
export declare abstract class SqlDialect {
    /** The database's name, for a message, e.g. `"mysql"`. */
    abstract get name(): string;
    /** A table's or a column's name as the statement has it, e.g. `"name"`. */
    quote(name: string): string;
    /** The mark of the `index`-th value (from 1): `?`. */
    placeholder(index: number): string;
    /** A column selected as text: `CAST(column AS TEXT)`. */
    castText(sql: __SqlWriter, column: __Column): void;
    /** `LIMIT` and `OFFSET`; NaN for one not given. */
    limit(sql: __SqlWriter, limit: f64, offset: f64): void;
    /** An insert without a single column given. */
    insertDefaults(sql: __SqlWriter): void;
    /** A value an insert of several rows leaves to the column's default. */
    defaultValue(sql: __SqlWriter): void;
    /** After `INSERT ... VALUES ...`: on a row whose `target` is taken already, change `set` instead - or, with none, do nothing. */
    onConflict(sql: __SqlWriter, target: __Column[], set: __Sql[] | null): void;
    /** After an insert: what makes `insertId` - nothing where the server gives it. */
    returningId(sql: __SqlWriter, key: __Column | null): void;
    /** A column's type in `CREATE TABLE`: `VARCHAR(32)`. */
    columnType(column: __Column): string;
    /** `CREATE TABLE IF NOT EXISTS` of the table, and then any statement its indexes need. */
    createTable<R, I, U>(table: Table<R, I, U>): string[];
    /** A column of `CREATE TABLE`: its name, type, `NOT NULL`, default and `UNIQUE`. */
    columnDefinition(sql: __SqlWriter, column: __Column): void;
    /** Writes the composite keys inside `CREATE TABLE`, where the database takes them there; false leaves each to a `CREATE INDEX`. */
    indexesInside(sql: __SqlWriter, indexes: __Index[]): bool;
    /** `CREATE INDEX` of a composite key. */
    index(table: string, index: __Index): string;
    /** A default of `create`, written into the statement - a value of the plugin's code, never one a player typed. */
    literal(value: DatabaseValue): string;
    /** The error of something this dialect's database cannot do: `mysql has no ...: write ... instead`. */
    unsupported(what: string, instead: string): DatabaseError;
}
declare const __mysql: SqlDialect;
export { 
/** The dialect of MySQL and MariaDB, the module's own client. */
__mysql as mysql, };
/** The start of a query of rows: `db.select().from(records)`. */
export declare class SelectBuilder {
    private __queries;
    constructor(__queries: DatabaseQueries);
    /** The table whose rows the query reads, every column of them. */
    from<R, I, U>(table: Table<R, I, U>): SelectQuery<R>;
}
/** The start of a query of chosen columns: `db.select({ time: records.time }).from(records)`. */
export declare class SelectFieldsBuilder<S> {
    private __queries;
    private __reader;
    private __names;
    private __fields;
    constructor(__queries: DatabaseQueries, __reader: __Reader<S>, __names: string[], __fields: __Sql[]);
    /** The table whose rows the query reads. */
    from<R, I, U>(table: Table<R, I, U>): SelectQuery<S>;
}
/** A query of rows, sent when it is awaited: `await db.select().from(records).where(...)`. */
export declare class SelectQuery<R> {
    private __queries;
    private __reader;
    private __table;
    private __fields;
    private __names;
    private __where;
    private __groupBy;
    private __orderBy;
    private __limit;
    private __offset;
    constructor(__queries: DatabaseQueries, __reader: __Reader<R>, __table: string, __fields: __Sql[], __names: string[] | null);
    /** Only the rows the condition holds for. */
    where(condition: Condition): SelectQuery<R>;
    /** One row for each value of these columns, which aggregates are worked out over. */
    groupBy(...by: __Sql[]): SelectQuery<R>;
    /** The rows in this order: by a column - smallest first - or `asc(...)` and `desc(...)`. */
    orderBy(...by: __Sql[]): SelectQuery<R>;
    /** At most this many rows. */
    limit(count: number): SelectQuery<R>;
    /** Leaves out this many rows first. */
    offset(count: number): SelectQuery<R>;
    /** @hidden what `await` awaits: the query sent. */
    __promise(): Promise<R[]>;
    private __send;
    /** Sends the query and calls `onFulfilled` with its rows. */
    then<U = void>(onFulfilled: (rows: R[]) => U, onRejected?: ((reason: Error) => U) | null): Promise<U>;
    /** Sends the query; `onRejected` is called if it fails. */
    catch<U = void>(onRejected: (reason: Error) => U): Promise<R[]>;
}
/** The start of an insert: `db.insert(records).values({ ... })`. */
export declare class InsertBuilder<R, I, U> {
    private __queries;
    private __table;
    constructor(__queries: DatabaseQueries, __table: Table<R, I, U>);
    /** The row to insert, or the rows. */
    values(rows: I | I[]): InsertQuery<R, I, U>;
}
/** The key whose taken value is a conflict: a column with a unique or primary key, or the columns of one. */
export interface ConflictTarget {
    /** The column, or the columns, of the unique key. */
    target: __Column | __Column[];
}
/** The change an insert makes instead on a row whose key is taken. */
export interface ConflictUpdate<U> {
    /** The column, or the columns, of the unique key. */
    target: __Column | __Column[];
    /** The columns to change on the row there, and their values. */
    set: U;
}
/** An insert, sent when it is awaited; gives `{ insertId, affectedRows }`. */
export declare class InsertQuery<R, I, U> {
    private __queries;
    private __table;
    private __rows;
    private __target;
    private __set;
    constructor(__queries: DatabaseQueries, __table: Table<R, I, U>, __rows: I[]);
    /** Leaves a row out when its key is taken already. */
    onConflictDoNothing(config: ConflictTarget): InsertQuery<R, I, U>;
    /** Changes `set` on the row there instead when the row's key is taken already. */
    onConflictDoUpdate(config: ConflictUpdate<U>): InsertQuery<R, I, U>;
    /** @hidden what `await` awaits: the insert sent. */
    __promise(): Promise<ExecuteResult>;
    private __send;
    /** Sends the insert and calls `onFulfilled` with what it did. */
    then<V = void>(onFulfilled: (result: ExecuteResult) => V, onRejected?: ((reason: Error) => V) | null): Promise<V>;
    /** Sends the insert; `onRejected` is called if it fails. */
    catch<V = void>(onRejected: (reason: Error) => V): Promise<ExecuteResult>;
}
/** The start of an update: `db.update(records).set({ ... })`. */
export declare class UpdateBuilder<R, I, U> {
    private __queries;
    private __table;
    constructor(__queries: DatabaseQueries, __table: Table<R, I, U>);
    /** The columns to change, and their values. */
    set(values: U): ChangeQuery;
}
/** An update or a delete, sent when it is awaited; gives `{ insertId, affectedRows }`. */
export declare class ChangeQuery {
    private __queries;
    private __table;
    private __set;
    private __where;
    /** `set` null: a delete. */
    constructor(__queries: DatabaseQueries, __table: string, __set: __Sql[] | null);
    /** Only the rows the condition holds for; without it, every row. */
    where(condition: Condition): ChangeQuery;
    /** @hidden what `await` awaits: the statement sent. */
    __promise(): Promise<ExecuteResult>;
    private __send;
    /** Sends the statement and calls `onFulfilled` with what it did. */
    then<V = void>(onFulfilled: (result: ExecuteResult) => V, onRejected?: ((reason: Error) => V) | null): Promise<V>;
    /** Sends the statement; `onRejected` is called if it fails. */
    catch<V = void>(onRejected: (reason: Error) => V): Promise<ExecuteResult>;
}
