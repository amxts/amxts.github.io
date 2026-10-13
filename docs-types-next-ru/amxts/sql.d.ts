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
/** Колонка таблицы — `records.time`, — по которой запросы сравнивают, сортируют и выбирают. */
export declare class Column<T> extends __Column {
}
/** Значение, которое запрос вычисляет по колонке: `count()`, `sum(records.time)`. */
export declare class Aggregate<T> extends __Sql {
    __function: string;
    __of: __Column | null;
    constructor(__function: string, __of: __Column | null);
    __write(sql: __SqlWriter): void;
}
/** Агрегат, который равен `null`, если строк для него нет: `sum`, `avg`, `min`, `max`. */
export declare class NullableAggregate<T> extends Aggregate<T> {
}
/** Число строк — а с колонкой, число строк, где в ней есть значение. */
export declare function count(column?: __Column | null): Aggregate<number>;
/** Сумма значений колонки; `null`, если их нет. */
export declare function sum<T>(column: Column<T>): NullableAggregate<number>;
/** Среднее значений колонки; `null`, если их нет. */
export declare function avg<T>(column: Column<T>): NullableAggregate<number>;
/** Наименьшее значение колонки; `null`, если значений нет. */
export declare function min<T>(column: Column<T>): NullableAggregate<T>;
/** Наибольшее значение колонки; `null`, если значений нет. */
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
 * Таблица, которую описывает `table(...)`: её колонки — её поля, `records.time`.
 * `typeof records.$inferSelect` — её строка, `typeof records.$inferInsert` —
 * то, что принимает вставка.
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
/** Условие для `where`: `eq(records.map, server.map)`, `and(...)`. */
export declare abstract class Condition extends __Sql {
}
/** Колонка равна значению или другой колонке. */
export declare function eq<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** Колонка не равна значению или другой колонке. */
export declare function ne<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** Колонка больше значения или другой колонки. */
export declare function gt<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** Колонка больше или равна значению или другой колонке. */
export declare function gte<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** Колонка меньше значения или другой колонки. */
export declare function lt<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** Колонка меньше или равна значению или другой колонке. */
export declare function lte<T, V extends T | Column<T>>(column: Column<T>, value: V): Condition;
/** Текстовая колонка подходит под `pattern`, `LIKE` из SQL: `%` — любой текст, `_` — один символ. */
export declare function like<T>(column: Column<T>, pattern: string): Condition;
/** Значение колонки — одно из `values`; при пустом списке — никогда. */
export declare function inArray<T>(column: Column<T>, values: T[]): Condition;
/** Значение колонки между `low` и `high`, обе границы включены. */
export declare function between<T>(column: Column<T>, low: T, high: T): Condition;
/** В колонке нет значения: `NULL` из SQL. */
export declare function isNull<T>(column: Column<T>): Condition;
/** В колонке есть значение. */
export declare function isNotNull<T>(column: Column<T>): Condition;
/** Выполняются все условия; без условий подходит любая строка. */
export declare function and(...conditions: Condition[]): Condition;
/** Выполняется одно из условий; без условий не подходит ни одна строка. */
export declare function or(...conditions: Condition[]): Condition;
/** Условие не выполняется. */
export declare function not(condition: Condition): Condition;
/** Порядок для `orderBy`: по колонке или агрегату, по возрастанию или убыванию. */
export declare class Order extends __Sql {
    __by: __Sql;
    __descending: bool;
    constructor(__by: __Sql, __descending: bool);
    __write(sql: __SqlWriter): void;
}
/** Сначала наименьшие. */
export declare function asc(by: __Sql): Order;
/** Сначала наибольшие. */
export declare function desc(by: __Sql): Order;
/**
 * Способ, которым база пишет SQL: имена, `?`, upsert, типы колонок для `create`.
 * Соединение провайдера называет свой диалект; построитель отдаёт ему части
 * запроса, так что один и тот же запрос пишется для любой базы. Этот класс
 * пишет стандартный SQL; диалект переопределяет то, что его база пишет
 * иначе, а то, чего она не умеет, отклоняет через `unsupported`.
 */
export declare abstract class SqlDialect {
    /** Имя базы для сообщений, например `"mysql"`. */
    abstract get name(): string;
    /** Имя таблицы или колонки так, как его пишет запрос, например `"name"`. */
    quote(name: string): string;
    /** Метка `index`-го значения (с 1): `?`. */
    placeholder(index: number): string;
    /** Колонка, выбранная как текст: `CAST(column AS TEXT)`. */
    castText(sql: __SqlWriter, column: __Column): void;
    /** `LIMIT` и `OFFSET`; NaN — не задан. */
    limit(sql: __SqlWriter, limit: f64, offset: f64): void;
    /** Вставка, в которой не задано ни одной колонки. */
    insertDefaults(sql: __SqlWriter): void;
    /** Значение, которое вставка нескольких строк оставляет умолчанию колонки. */
    defaultValue(sql: __SqlWriter): void;
    /** После `INSERT ... VALUES ...`: для строки, чей `target` уже занят, изменить вместо этого `set` — а без него ничего не делать. */
    onConflict(sql: __SqlWriter, target: __Column[], set: __Sql[] | null): void;
    /** После вставки: то, что даёт `insertId`, — ничего, если его отдаёт сервер. */
    returningId(sql: __SqlWriter, key: __Column | null): void;
    /** Тип колонки в `CREATE TABLE`: `VARCHAR(32)`. */
    columnType(column: __Column): string;
    /** `CREATE TABLE IF NOT EXISTS` для таблицы, а затем запросы, которые нужны её индексам. */
    createTable<R, I, U>(table: Table<R, I, U>): string[];
    /** Колонка в `CREATE TABLE`: имя, тип, `NOT NULL`, умолчание и `UNIQUE`. */
    columnDefinition(sql: __SqlWriter, column: __Column): void;
    /** Пишет составные ключи внутри `CREATE TABLE`, если база принимает их там; false оставляет каждый отдельному `CREATE INDEX`. */
    indexesInside(sql: __SqlWriter, indexes: __Index[]): bool;
    /** `CREATE INDEX` для составного ключа. */
    index(table: string, index: __Index): string;
    /** Умолчание для `create`, вписанное в запрос, — значение из кода плагина, никогда не то, что ввёл игрок. */
    literal(value: DatabaseValue): string;
    /** Ошибка о том, чего база этого диалекта не умеет: `mysql has no ...: write ... instead`. */
    unsupported(what: string, instead: string): DatabaseError;
}
declare const __mysql: SqlDialect;
export { 
/** The dialect of MySQL and MariaDB, the module's own client. */
__mysql as mysql, };
/** Начало запроса строк: `db.select().from(records)`. */
export declare class SelectBuilder {
    private __queries;
    constructor(__queries: DatabaseQueries);
    /** Таблица, строки которой читает запрос, со всеми колонками. */
    from<R, I, U>(table: Table<R, I, U>): SelectQuery<R>;
}
/** Начало запроса выбранных колонок: `db.select({ time: records.time }).from(records)`. */
export declare class SelectFieldsBuilder<S> {
    private __queries;
    private __reader;
    private __names;
    private __fields;
    constructor(__queries: DatabaseQueries, __reader: __Reader<S>, __names: string[], __fields: __Sql[]);
    /** Таблица, строки которой читает запрос. */
    from<R, I, U>(table: Table<R, I, U>): SelectQuery<S>;
}
/** Запрос строк, который уходит, когда его ждут: `await db.select().from(records).where(...)`. */
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
    /** Только строки, для которых выполняется условие. */
    where(condition: Condition): SelectQuery<R>;
    /** Одна строка на каждое значение этих колонок; по ним считаются агрегаты. */
    groupBy(...by: __Sql[]): SelectQuery<R>;
    /** Строки в этом порядке: по колонке — сначала наименьшие — или `asc(...)` и `desc(...)`. */
    orderBy(...by: __Sql[]): SelectQuery<R>;
    /** Не больше стольких строк. */
    limit(count: number): SelectQuery<R>;
    /** Сначала пропускает столько строк. */
    offset(count: number): SelectQuery<R>;
    /** @hidden what `await` awaits: the query sent. */
    __promise(): Promise<R[]>;
    private __send;
    /** Отправляет запрос и вызывает `onFulfilled` с его строками. */
    then<U = void>(onFulfilled: (rows: R[]) => U, onRejected?: ((reason: Error) => U) | null): Promise<U>;
    /** Отправляет запрос; `onRejected` вызывается, если он не удался. */
    catch<U = void>(onRejected: (reason: Error) => U): Promise<R[]>;
}
/** Начало вставки: `db.insert(records).values({ ... })`. */
export declare class InsertBuilder<R, I, U> {
    private __queries;
    private __table;
    constructor(__queries: DatabaseQueries, __table: Table<R, I, U>);
    /** Строка для вставки или строки. */
    values(rows: I | I[]): InsertQuery<R, I, U>;
}
/** Ключ, занятое значение которого — конфликт: колонка с уникальным или первичным ключом или колонки такого ключа. */
export interface ConflictTarget {
    /** Колонка или колонки уникального ключа. */
    target: __Column | __Column[];
}
/** Изменение, которое вставка делает вместо этого в строке, чей ключ уже занят. */
export interface ConflictUpdate<U> {
    /** Колонка или колонки уникального ключа. */
    target: __Column | __Column[];
    /** Колонки, которые нужно изменить в той строке, и их значения. */
    set: U;
}
/** Вставка, которая уходит, когда её ждут; отдаёт `{ insertId, affectedRows }`. */
export declare class InsertQuery<R, I, U> {
    private __queries;
    private __table;
    private __rows;
    private __target;
    private __set;
    constructor(__queries: DatabaseQueries, __table: Table<R, I, U>, __rows: I[]);
    /** Пропускает строку, если её ключ уже занят. */
    onConflictDoNothing(config: ConflictTarget): InsertQuery<R, I, U>;
    /** Если ключ строки уже занят, меняет вместо этого `set` в той строке. */
    onConflictDoUpdate(config: ConflictUpdate<U>): InsertQuery<R, I, U>;
    /** @hidden what `await` awaits: the insert sent. */
    __promise(): Promise<ExecuteResult>;
    private __send;
    /** Отправляет вставку и вызывает `onFulfilled` с её итогом. */
    then<V = void>(onFulfilled: (result: ExecuteResult) => V, onRejected?: ((reason: Error) => V) | null): Promise<V>;
    /** Отправляет вставку; `onRejected` вызывается, если она не удалась. */
    catch<V = void>(onRejected: (reason: Error) => V): Promise<ExecuteResult>;
}
/** Начало изменения: `db.update(records).set({ ... })`. */
export declare class UpdateBuilder<R, I, U> {
    private __queries;
    private __table;
    constructor(__queries: DatabaseQueries, __table: Table<R, I, U>);
    /** Колонки, которые нужно изменить, и их значения. */
    set(values: U): ChangeQuery;
}
/** Изменение или удаление, которое уходит, когда его ждут; отдаёт `{ insertId, affectedRows }`. */
export declare class ChangeQuery {
    private __queries;
    private __table;
    private __set;
    private __where;
    /** `set` null: a delete. */
    constructor(__queries: DatabaseQueries, __table: string, __set: __Sql[] | null);
    /** Только строки, для которых выполняется условие; без него — все строки. */
    where(condition: Condition): ChangeQuery;
    /** @hidden what `await` awaits: the statement sent. */
    __promise(): Promise<ExecuteResult>;
    private __send;
    /** Отправляет запрос и вызывает `onFulfilled` с его итогом. */
    then<V = void>(onFulfilled: (result: ExecuteResult) => V, onRejected?: ((reason: Error) => V) | null): Promise<V>;
    /** Отправляет запрос; `onRejected` вызывается, если он не удался. */
    catch<V = void>(onRejected: (reason: Error) => V): Promise<ExecuteResult>;
}
