/// <reference path="../as-types.d.ts" />
import "./promise";
import { Vector } from "./vector";
/** Обычный обработчик: id игрока на входе, ничего на выходе — так вызываются событие игрока и команда. */
export type Handler = (id: number) => void;
/**
 * Широкий обработчик: до четырёх чисел на входе, ничего на выходе.
 *
 * Он нужен форварду, который передаёт больше, чем id игрока, и хукчейну.
 * Строковый аргумент приходит числом: прочитайте его через `argString` или
 * регистрируйте событие тем способом, который прочитает строку сам.
 *
 * Чтобы AMX Mod X не передавал событие дальше или чтобы заблокировать то, что
 * перехватывает хукчейн, вызовите handled().
 */
export type WideHandler = (a: number, b: number, c: number, d: number) => void;
/** @hidden Для капота: что сервер вызывает вместо `handler`. */
export declare function hostIndex<T>(handler: T, wide: bool): i32;
/**
 * Останавливает событие здесь: AMX Mod X не передаёт его никому больше, а
 * хукчейн не вызывает то, что перехватил. Действует только на обработчик,
 * который сейчас выполняется.
 *
 *   function onSay(id: number): void {
 *     if (muted(id)) handled();
 *   }
 */
export declare function handled(): void;
/** Для натива, чей ответ не просто 0 или 1 — например, у Ham. */
export declare function outcome(value: number): void;
/**
 * Число как `Float:` в Pawn — для сырого натива или `ret()`:
 *
 *   ret(floatCell(2.5));
 *   rg_round_end(floatCell(5.0), ...);
 */
export declare function floatCell(value: f64): number;
/** Число, округлённое до целого, как floatround в Pawn: время раунда 59.6 секунды — это 60, а не 59. */
export declare function rounded(value: number): number;
/** Обратное преобразование: ячейка с дробным числом — в обычное число. */
export declare function cellFloat(cell: number): f64;
/** Что экспортированный натив возвращает вызвавшему его плагину. */
export declare function ret(value: number): void;
/**
 * Имя паблика хоста, который вызывает `handler`, — для любого натива AMXX,
 * принимающего колбэк по имени: register_message, register_touch,
 * query_client_cvar, ezhttp_post, set_native_filter, регистраторы menu_core:
 *
 * ```ts
 * const pub = publicFor(onDeathMsg, "msg:DeathMsg");
 * if (pub.length > 0) register_message(get_user_msgid("DeathMsg"), pub);
 * ```
 *
 * Вся тонкость — в этом `if`, и проверяет он длину: пустая строка всё равно
 * не null. Ни одну из таких регистраций
 * нельзя отменить, поэтому после горячей перезагрузки плагин забирает свой
 * слот обратно, а сторона AMXX по-прежнему на него указывает — повторная
 * регистрация вызывала бы обработчик дважды. Пустое имя значит "уже
 * зарегистрировано, не трогай", а заодно покрывает случай, когда слотов не
 * осталось, — модуль уже пожаловался на это сам.
 *
 * `key` опознаёт регистрацию между перезагрузками; подойдёт что угодно
 * стабильное и уникальное в пределах плагина. `fallback` — то, что получит
 * вызывающий, если обработчик ничего не скажет: 0 почти везде, 1 там, где
 * механизм ждёт PLUGIN_HANDLED.
 *
 * **Регистрируйте из события "cfg", а не с верхнего уровня файла.**
 * Верхний уровень плагина выполняется так рано, что натив, регистрирующий
 * команду в движке (register_concmd, register_srvcmd), роняет сервер, когда
 * эту команду потом вводят; в `server.addEventListener("cfg", ...)` всё
 * работает. Исключение — `cmd()`: клиентская команда никогда не попадает в
 * таблицу движка.
 */
export declare function publicFor(handler: WideHandler, key: string, fallback?: number): string;
/**
 * Экспортирует натив, который могут вызывать другие плагины, в том числе на
 * Pawn.
 *
 *   nativeFn("myplugin_get_mode", getGameMode)
 *
 *   function getGameMode(a: number, b: number, c: number, d: number) {
 *     ret(mode);
 *   }
 *
 * Обработчик получает первые четыре аргумента числами; `arg(i)` и
 * `argText(i)` читают любой из них, а `setArg` / `setArgText` пишут обратно.
 * Новому способу всё это не нужно: `export function` входного файла — это
 * натив с настоящими типами (страница про нативы в документации).
 *
 * Экспортируйте натив, пока файл читается, — на верхнем уровне, а не позже:
 * AMX Mod X спрашивает у каждого плагина его нативы до того, как запустит хоть
 * один.
 */
export declare function nativeFn(name: string, handler: WideHandler): void;
/**
 * Число, которое уходит в Pawn как `Float:`.
 *
 * Для TypeScript это `number`, и в коде, который его использует, ничего не
 * меняется. Важно оно только там, где собственный натив плагина встречается с
 * Pawn: `Float:` в Pawn — это тег, на месте вызова его не видно, поэтому
 * натив этим именем говорит, какие из его чисел дробные. Везде остальном
 * число — просто `number`.
 *
 * ```ts
 * export function cfg_get_float(file: string, key: string): Float { ... }
 * //   native Float:cfg_get_float(const file[], const key[]);
 * export function set_speed(id: number, speed: Float) { ... }
 * //   native set_speed(id, Float:speed);
 * ```
 */
export type Float = number;
/** @hidden Registers a generated wrapper as the native `name`. */
export declare function __native(name: string, wrapper: () => void): void;
/** @hidden A cell argument as a number. */
export declare function __nativeInt(index: i32): f64;
/** @hidden A `Float:` argument. */
export declare function __nativeFloat(index: i32): f64;
/** @hidden A `bool:` argument. */
export declare function __nativeBool(index: i32): bool;
/**
 * @hidden A string argument, whole: the module says how long it is first, so
 * there is no buffer to outgrow.
 */
export declare function __nativeString(index: i32): string;
/** @hidden An array argument whose size is the argument after it. */
export declare function __nativeInts(index: i32): f64[];
/** @hidden A `Float:` array argument whose size is the argument after it. */
export declare function __nativeFloats(index: i32): f64[];
/** @hidden A `Float:v[3]` argument. */
export declare function __nativeVector(index: i32): Vector;
/**
 * @hidden What the function returned, handed back the way its type says:
 * a string into the caller's `out[], len`, a `string | null` the same and
 * `true` or `false` as the result, an array into `out[], max` with the count
 * as the result, a number or a boolean as the result itself.
 */
export declare function __nativeReturn<T>(value: T, out: i32): void;
/** @hidden A cell argument under one of the plugin's exported enums. */
export declare function __nativeCell(index: i32): i32;
/**
 * @hidden Whether a `Player` argument is a player slot, 1 to maxPlayers -
 * or 0, for a `Player | null` one. The wrapper calls the function only then.
 */
export declare function __nativeTarget(index: i32, orNone: bool): bool;
/** @hidden A `Player` argument: the player in that slot, null for 0. */
export declare function __nativePlayer(index: i32): Player | null;
/**
 * @hidden Whether a `Team` argument - `TeamName:` in the include - is a
 * TeamName number, 0 to 3. The wrapper calls the function only then.
 */
export declare function __nativeIsTeam(index: i32): bool;
/** @hidden A `Team` argument: its TeamName number as the name. */
export declare function __nativeTeam(index: i32): Team;
/**
 * @hidden A native not called because a `Player` argument was no player:
 * its result's default - 0, which Pawn reads as false, 0.0 or no array, and
 * "" in the caller's out[] when it passed one (`cells` is how many it passes
 * without).
 */
export declare function __nativeSkip(out: i32, cells: i32): void;
/**
 * @hidden How far past its own place a parameter after the result buffer
 * is: 2 when the caller passed `out[], len`, 0 when it passed only the
 * parameters' `cells`. See indexes() in scripts/plugin-natives.ts.
 */
export declare function __nativeShift(cells: i32): i32;
/** @hidden A CellArray result: its handle, Invalid_Array (0) for null. */
export declare function __nativeReturnArray(value: CellArray | null): void;
/** @hidden A `Float:` result. */
export declare function __nativeReturnFloat(value: f64): void;
/** @hidden How many cells the Pawn caller passed. */
export declare function __nativeCount(): i32;
/** @hidden A number an `any:...` tail passes, which Pawn does by address. */
export declare function __nativeRef(index: i32): f64;
/**
 * @hidden The result of a native whose include declares no out-argument: a
 * number or a boolean as the cell the native returns.
 */
export declare function __nativeResult<T>(value: T): void;
/**
 * @hidden One field of a native's result, written through the argument the
 * include declares for it: text into `x[], len`, a number through `&x`, an
 * array into `x[], size`.
 */
export declare function __nativeOut<T>(value: T, index: i32): void;
/** @hidden The same for a `Float:&x` or `Float:x[], size` out-argument. */
export declare function __nativeOutFloat<T>(value: T, index: i32): void;
/**
 * @hidden A `const fmt[], any:...` pair, formatted as AMX Mod X's format()
 * would: %s %d %i %u %c %x %f (with width, `-`, `0` and a precision) and %L,
 * which takes a player and a key and formats that player's translation with
 * the arguments after them. The tail is passed by address, as Pawn passes
 * `any:...`: a string is read there, a number through it.
 */
export declare function __nativeFormat(index: i32): string;
/**
 * @hidden A value as a new AMX Mod X `Array:` - the handle, or
 * Invalid_Array (0) for null. Text is an item a string; a number a Float
 * cell (a TypeScript number is a float); a list of lists an Array of their
 * handles, except rows of numbers, which are items of whole-number cells, as
 * a list-menu row is. The Pawn plugin that gets it destroys it.
 */
export declare function __nativePawnArray<T>(value: T): i32;
/** @hidden An `Array:` of handles, a cell each. */
export declare function __nativePawnHandles(handles: i32[]): i32;
/** @hidden A `Float:out[], max` result; the count is what the native returns. */
export declare function __nativeReturnFloats(values: f64[], out: i32): void;
/**
 * Динамический массив AMX Mod X (cellarray.inc): так список попадает в
 * Pawn-плагин, который ждёт хэндл `Array:`.
 *
 * ```ts
 * export function cfg_get_value_array(section: ConfigSection, key: string) {
 *   const words = lookup(section, key);                // string[] | null
 *   return words != null ? CellArray.fromStrings(words) : null;
 * }
 * // native Array:cfg_get_value_array(ConfigSection:section, const key[]);
 * ```
 *
 * Натив, который его возвращает, отдаёт Pawn хэндл (`null` — это
 * Invalid_Array), и дальше им владеет Pawn-плагин: `ArrayDestroy` — его
 * забота, как и с любым `Array:`, который отдаёт натив. Внутри TypeScript
 * список — это `string[]` или `number[]`; этот класс нужен только для
 * передачи.
 *
 * Текст записывается в UTF-8, по байту на ячейку, — так AMX Mod X хранит
 * строки.
 */
export declare class CellArray {
    /** Хэндл `Array:`, который получает Pawn. */
    readonly handle: i32;
    /** An empty array whose items are `cellSize` cells each: 1 for a number, the buffer size for text. */
    constructor(cellSize?: number);
    /** Текстовые элементы, каждый до `cellSize - 1` байт (размер для строк в ArrayCreate). */
    static fromStrings(values: string[], cellSize?: number): CellArray;
    /** Элементы `Float:`, по одной ячейке на каждый. */
    static fromFloats(values: number[]): CellArray;
    /** Сколько в нём элементов. */
    get length(): number;
    /** Добавляет текстовый элемент в UTF-8, по байту на ячейку; он должен уместиться в `cellSize - 1` байт. */
    pushString(value: string): void;
    /** Целое число — или хэндл другого массива — одной ячейкой. */
    pushCell(value: number): void;
    /** Добавляет элемент `Float:` — одну ячейку. */
    pushFloat(value: number): void;
    /** Один элемент из нескольких ячеек: `[a, b]` в массив, созданный через `new CellArray(2)`. */
    pushCells(values: number[]): void;
}
export declare function __strings(): i32;
/**
 * Аргумент выполняющегося обработчика по номеру.
 *
 * Обработчик получает четыре; у обработчика сообщения или хукчейна их бывает
 * больше, и эта функция их читает. Индекс 0 — первый параметр обработчика.
 *
 *   function onSomething(a: number, b: number, c: number, d: number) {
 *     const fifth = arg(4);
 *   }
 */
export declare function arg(index: number): number;
/**
 * Тот же аргумент, прочитанный как строка, которую он обозначает.
 *
 * Это для колбэка. Строки форварда обработчик получает уже готовыми — их
 * раскодирует регистратор этого форварда.
 */
export declare function argText(index: number): string;
/**
 * Сколько аргументов на самом деле пришло в выполняющийся вызов.
 *
 * Обработчик всегда получает четыре ячейки, дополненные нулями, поэтому натив
 * с необязательными последними аргументами иначе не отличит переданный ноль
 * от непереданного:
 *
 *   const flashes = argc() >= 2 ? arg(1) : -1;
 */
export declare function argc(): number;
/**
 * Какой плагин вызвал выполняющийся экспортированный натив, или -1.
 *
 * AMX Mod X передаёт нативу id вызывающего, а некоторые нативы касаются
 * именно вызывающего, а не своих аргументов: квар, зарегистрированный *этим*
 * плагином, префикс чата, заданный *для* него.
 */
export declare function caller(): number;
/**
 * Записывает число обратно через аргумент, переданный по ссылке.
 *
 * `&value` из Pawn приходит адресом, а не числом: функция пишет по этому
 * адресу — то же, что делает `set_param_byref` на стороне Pawn.
 */
export declare function setArg(index: number, value: number): void;
/**
 * Записывает текст обратно через строковый аргумент.
 *
 * Некоторые колбэки передают не текст для чтения, а буфер, который надо
 * заполнить: плейсхолдер menu_core, аргумент хукчейна, который плагин хочет
 * изменить. `max` — сколько места, по словам вызывающего, в буфере; обычно
 * это аргумент сразу после буфера.
 *
 *   function placeholder(id: number, target: number, out: number, max: number) {
 *     setArgText(2, "ready", max);
 *   }
 */
export declare function setArgText(index: number, text: string, max: number): void;
/** Читает строковый аргумент, который получил широкий обработчик. */
export declare function argString(pointer: number): string;
/**
 * @hidden A Pawn string at `pointer`: a byte of UTF-8 in each cell, up to the
 * zero cell or `max` cells. AMX Mod X, the engine and the game keep text as
 * bytes - get_amxstring takes the low byte of each cell - so a letter outside
 * ASCII is two or three cells, and a cell per UTF-16 unit came out as
 * mojibake one way and a truncated byte the other ("раз" arrived as "@0").
 */
export declare function __cellText(pointer: usize, max: i32): string;
/**
 * @hidden Text as a Pawn string, a byte of UTF-8 a cell, into `cells` - at
 * most `cells.length - 1` bytes and never half a letter - and the zero cell.
 * Returns how many bytes went in.
 */
export declare function __writeCellText(text: string, cells: StaticArray<i32>, at?: i32): i32;
/** @hidden Text as a Pawn string in a buffer of its own size. */
export declare function __cellsOf(text: string): StaticArray<i32>;
/** Текст из массива, заполненного сырым нативом из `~/natives`, — по байту UTF-8 на элемент. Обратно — stringToCells. */
export declare function cellsToString(cells: StaticArray<i32>): string;
/** Записывает текст в массив ячеек как строку Pawn: по байту UTF-8 на ячейку, в конце терминатор. */
export declare function stringToCells(text: string, cells: StaticArray<i32>): void;
/**
 * Строка для сырого натива из `~/natives` — без объявления буфера под неё:
 *
 *   cfg_set_base_dir(cells("myplugin"));
 *
 * Она попадает в один из восьми буферов по очереди, поэтому несколько строк в
 * одном вызове не затирают друг друга. Восемь — предел: девятая в том же
 * выражении снова займёт первый. Только для входящих аргументов: нативу,
 * который пишет текст обратно, нужен `out()`.
 */
export declare function cells(text: string): number;
/**
 * Буфер, в который сырой натив пишет текст; прочитать его — `text()`.
 *
 *   const name = out();
 *   get_user_name(id, name, TEXT_MAX);
 *   console.log(text(name));
 *
 * Четыре буфера по очереди, так что пара чтений в одном выражении не
 * сталкивается. Числу, которое натив пишет через `&ссылку`, тоже нужен такой
 * буфер; прочитать его — `cell()`.
 */
export declare function out(): number;
/** Текст, который натив записал в один из этих буферов. */
export declare function text(buffer: number): string;
/**
 * Ряд чисел, из которого натив читает или в который пишет: вектор, список
 * игроков, строка текста. Пользуются им как обычным массивом — `buffer[0]`,
 * `buffer.float(2)`, `buffer.text()`, — а натив принимает его `address`.
 *
 *   const origin = new CellBuffer(3);
 *   entity_set_origin(cube, origin.address);
 */
export declare class CellBuffer {
    private data;
    constructor(length: number);
    /** Три дробных числа для натива, который принимает вектор: позицию, размер, цвет. */
    static vector(x: f64, y: f64, z: f64): CellBuffer;
    /** Сколько в нём ячеек. */
    get length(): number;
    /** Где он лежит в памяти — это и передают нативу, который принимает массив. */
    get address(): number;
    /** Ячейка с номером `index` как целое число: `buffer[0]`. */
    get(index: number): number;
    /** Кладёт целое число в ячейку с номером `index`: `buffer[0] = 5`. */
    set(index: number, value: number): void;
    /** Ячейка с дробным числом — как число. */
    float(index: number): f64;
    /** Кладёт число в ячейку с номером `index` как дробное — так, как натив читает `Float:`. */
    setFloat(index: number, value: f64): void;
    /** Текст, который записал в него натив, — до терминатора или до конца буфера. */
    text(): string;
    /** Записывает текст начиная с `at`, по байту UTF-8 на ячейку, вместе с терминатором. */
    write(at: number, value: string): void;
    /** Записывает `value` во все ячейки: `buffer.fill(0)` очищает буфер. */
    fill(value: number): void;
}
/** Массив из `length` копий `value`: `arrayOf(33, 0)`. Во всех ячейках одно и то же `value` — объектам дайте каждой ячейке свой. */
export declare function arrayOf<T>(length: number, value: T): T[];
/** Число, которое натив записал через такой буфер, — для аргумента `&reference`. */
export declare function cell(buffer: number): number;
/** Кладёт число в такой буфер — для ссылки, которую натив и читает, и пишет. */
export declare function putCell(buffer: number, value: number): number;
/**
 * "Без точки", которую принимает message_begin, когда сообщение идёт одному
 * игроку.
 *
 *   message_begin(MSG_ONE, msgid, noOrigin(), id);
 *
 * Этот аргумент — три дробных числа, и читается он только для сообщений тем,
 * кто рядом с точкой; остальным там нужен адрес, а по адресу — ничего.
 */
export declare function noOrigin(): number[];
/** Сколько вмещает один такой буфер. */
export declare const TEXT_MAX: i32;
/**
 * A player: the hand-written basics below, and every entvar and CBasePlayer
 * member as a typed property from as/entities.ts (`player.gravity`,
 * `player.hideHud`, `player.origin`).
 */
/** Команды Counter-Strike под теми именами, которые даёт им сама игра. */
export type Team = "TERRORIST" | "CT" | "SPECTATOR" | "UNASSIGNED";
/**
 * Всё оружие, которое может держать игрок, по classname.
 *
 * Порядок — как в WeaponIdType: индекс имени — это id, который принимает
 * reapi; 0 и 2 (неиспользуемый слот glock) пусты.
 */
export type WeaponName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90";
/** Что выдаёт `give`: оружие или броню и набор сапёра. */
export type ItemName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90" | "item_kevlar" | "item_assaultsuit" | "item_thighpack";
/**
 * Каких игроков возвращает `Player.all`. Все поля необязательны:
 * `Player.all({ alive: true, team: "CT" })`.
 */
export interface PlayerFilter {
    /** Только живые. */
    alive?: boolean;
    /** Только мёртвые. */
    dead?: boolean;
    /** Только эта команда. */
    team?: Team;
    /** Только боты. */
    bots?: boolean;
    /** Только люди, без ботов. */
    humans?: boolean;
}
/** Модули AMX Mod X, о которых плагин может спросить. */
export type ModuleName = "reapi" | "cstrike" | "fun" | "hamsandwich" | "engine" | "fakemeta";
/**
 * Есть ли на сервере модуль: `if (hasModule("reapi")) ...`.
 *
 * Фасад спрашивает это сам: действия игрока идут через reapi, где он есть, и
 * через стандартные модули, где его нет, — ReHLDS стоит не на каждом сервере.
 * Плагин спрашивает то же самое перед нативом, который есть только в одном
 * модуле.
 */
export declare function hasModule(name: ModuleName): boolean;
/** Как проходит `player.kill()`. */
export interface KillOptions {
    /** Не трогать фраги: без штрафа за самоубийство. */
    keepFrags?: boolean;
}
/**
 * Игрок, пока он подключается (в "connect", "authorized" и "putinserver"), —
 * ещё до входа в игру: кто он, а не здоровье или оружие. Player — тоже
 * Client, так что там, где принимают Client, подойдёт любой из них.
 *
 * ```ts
 * server.addEventListener("putinserver", (event) => {
 * 	print(event.player, `Welcome, ${event.player.name}!`);
 * });
 * ```
 */
export interface Client {
    /** Слот игрока, от 1 до 32. */
    readonly id: number;
    /** Имя, под которым он играет. */
    readonly name: string;
    /** Его адрес без порта. */
    readonly ip: string;
    /** Его SteamID: "STEAM_0:1:12345" или "BOT". В "putinserver" он может быть ещё неизвестен. */
    readonly authid: string;
    /** Бот ли он. */
    readonly isBot: boolean;
    /** Есть ли он ещё на сервере. */
    readonly isConnected: boolean;
    /** Что может этот админ — буквы из users.ini: `client.access.includes("Cvar")`. */
    readonly access: Access[];
    /** Его команда: "UNASSIGNED", пока он ни в одну не вступил. Запись переводит его, как и `player.team`. */
    team: Team;
    /** Его никто не слышит в голосовом чате. */
    muted: boolean;
    /** Срабатывает, когда он уходит с сервера: `fetch(url, { signal: client.signal })`. */
    readonly signal: AbortSignal;
    /** Выполняет команду в его собственной консоли, как будто он сам её там ввёл. */
    command(text: string): void;
}
/**
 * Игрок в игре: всё, что есть у Client, и то, что у него есть, пока он
 * играет, — здоровье, броня, фраги, команда, оружие, то, что он видит на
 * экране.
 *
 * Событие об игроке передаёт его как `event.player`, а `Player.all()`
 * возвращает всех на сервере.
 */
export declare class Player extends PlayerFields implements Client {
    constructor(id: number);
    /**
     * Игроки на сервере в виде объектов: `Player.all({ alive: true })`.
     *
     * Каждое поле сужает выборку: `{ bots: true }` — только боты,
     * `{ humans: true }` — только люди. Без фильтра — все подключённые; HLTV-прокси
     * в их число не входит никогда.
     */
    static all(filter?: PlayerFilter): Player[];
    /**
     * Число, которое растёт при каждом изменении поля, добавленного плагином в
     * Player, у любого игрока — записал ли его какой-то плагин, на TS или Pawn,
     * или поле сбросилось, когда игрок ушёл: `Player.revision("semiclip")`.
     * Уведомлений нет: плагин, реагирующий на изменения, хранит последнее
     * увиденное число и сравнивает, не чаще раза за кадр. Запись того же значения,
     * что уже лежит в поле, изменением не считается.
     */
    static revision(field: string): number;
    /** Имя, под которым он играет. */
    get name(): string;
    /** Его здоровье: `100` при появлении. Запись 0 или меньше его убивает. */
    get health(): number;
    set health(hp: number);
    /** Его броня в очках: `100` с купленным бронежилетом, `0` без него. */
    get armor(): number;
    set armor(value: number);
    /** Его фраги на табло. */
    get frags(): number;
    set frags(value: number);
    /**
     * Читаются там же, куда пишутся: у AMX Mod X своя копия смертей
     * (get_user_deaths), и после `player.deaths = 7` она всё ещё показывала 0 —
     * проверено на сервере.
     */
    get deaths(): number;
    /** The deaths on the scoreboard; setting them tells the scoreboard too. */
    set deaths(value: number);
    /**
     * Команда, прочитанная из самого игрока (m_iTeam).
     *
     * Не get_user_team: у AMX Mod X своя копия, и сразу после смены команды она
     * ещё показывает старую.
     */
    get team(): Team;
    /**
     * Moves the player to another team, as reapi's rg_set_user_team does: the
     * model is picked for the new team, the scoreboard is told, and the round's
     * win conditions are not checked - the caller decides when that happens.
     */
    set team(value: Team);
    /** Его адрес без порта. */
    get ip(): string;
    /** Его SteamID: "STEAM_0:1:12345" или "BOT". В "putinserver" он может быть ещё неизвестен. */
    get authid(): string;
    /** Жив ли он. */
    get isAlive(): boolean;
    /** Есть ли он ещё на сервере. */
    get isConnected(): boolean;
    /** Бот ли он. */
    get isBot(): boolean;
    /**
     * Срабатывает, когда этот игрок уходит с сервера, с ошибкой (Error) по имени
     * "AbortError"; следующий игрок в этом слоте получает новый сигнал.
     *
     * ```ts
     * const response = await fetch(url, { signal: player.signal });
     * ```
     *
     * Асинхронный обработчик команды или события игрока уже работает под ним:
     * каждый `await` в нём тихо сдаётся, когда игрок уходит.
     */
    get signal(): AbortSignal;
    /**
     * Этого игрока никто не слышит в голосовом чате — с alltalk и без, как
     * `video.muted`. Прочитать значение — это и есть проверка:
     * `if (player.muted) ...`.
     *
     * Это флаг SPEAK_MUTED модуля engine, который тот применяет на самом
     * последнем шаге маршрутизации голоса (Voice_SetClientListening), после
     * sv_alltalk и правил игры. Остальные speak-флаги игрока остаются как были.
     */
    get muted(): boolean;
    /**
     * Строка текста на экране этого игрока:
     * `player.showHud("-35 HP", { color: [255, 40, 40], x: 0.02, y: 0.88, hold: 2 })`.
     * У каждой опции значение по умолчанию то же, что в AMX Mod X.
     */
    showHud(text: string, options?: HudOptions): void;
    /**
     * То, что этот игрок видит поверх мира: `player.screen.fade({ ... })`,
     * `.shake(...)`, `.statusIcon(...)` — см. Screen.
     */
    get screen(): Screen;
    set muted(value: boolean);
    /** Выдаёт оружие или предмет: `player.give("weapon_flashbang")`. */
    give(item: ItemName): boolean;
    /** Отбирает всё оружие; костюм (броня, HUD) остаётся, если не попросить иначе. */
    removeAllItems(removeSuit?: boolean): void;
    /** Задаёт запас патронов к оружию в рюкзаке: `player.setAmmo("weapon_flashbang", 2)`. */
    setAmmo(weapon: WeaponName, amount: number): void;
    /** Возвращает игрока в раунд — на точку, где его спавнит игра. */
    respawn(): void;
    /**
     * Убивает игрока, как консольная команда `kill`. С
     * `{ keepFrags: true }` смерть ничего не стоит ему в таблице счёта —
     * user_silentkill из fun.inc.
     */
    kill(options?: KillOptions): void;
    /** Что разрешено этому админу — буквы из users.ini: `player.access.includes("Cvar")`. */
    get access(): Access[];
    /** Даёт игроку в руки оружие, которое у него есть. False, если такого нет. */
    switchWeapon(weapon: WeaponName): boolean;
    /** Пересчитывает скорость по оружию в руках — например, после замедления. */
    resetMaxSpeed(): void;
    /**
     * Выполняет команду в консоли самого игрока, будто он набрал её там:
     * `player.command("messagemode nh_fov")`, `player.command("stop")`.
     * Выполняет её клиент, а не сервер — то же, что `server.command` для
     * консоли сервера (client_cmd).
     */
    command(text: string): void;
}
/**
 * Читает натив, заполняющий текстовый буфер, без ручного буфера. Сам натив
 * передаётся аргументом:
 *
 *   readText(get_mapname)                 // "c21_kitty"
 *   readText(get_user_name, 32, id)       // not this one: see Player.name
 */
export declare function readText(fill: (out: number, max: number) => number, max?: number): string;
/**
 * id, которые находит get_players, в виде массива.
 *
 * `flags` — те же, что у get_players: "a" живые, "b" мёртвые, "c" без ботов,
 * "h" без HLTV, "e" только `team`. Натив пишет в буфер и возвращает счётчик
 * через ссылку, поэтому он обёрнут здесь, а не вызывается напрямую.
 */
export declare function playerIds(flags?: string, team?: string): number[];
/**
 * The server: what it is running, and the events it raises.
 *
 * ```ts
 * server.addEventListener("putinserver", (event) => {
 *   print(event.player, "Welcome!");     // event: PutinserverEvent, inferred
 * });
 * server.map;                             // "de_dust2"
 * server.maxPlayers;                      // 32
 * server.command("echo hi");
 * ```
 *
 * The event name is typed like a DOM one - `K extends keyof ServerEventMap` -
 * so an editor completes it, refuses a misspelled one, and hands the listener
 * the event's own type. The compiler reads the same signature through a patch
 * (runtime/patches): the name has to be written out as a string literal,
 * because a string held in a variable says nothing about which event it is.
 *
 * A listener may use the variables of the function it is written in - it is
 * a closure, as in JavaScript.
 */
/** Что получает обработчик команды: кто её набрал и что шло после имени. */
export type CommandHandler = (player: Player, args: string[]) => void;
/** Как регистрируется команда: кому она доступна и что о ней написано в списке. */
export interface CommandOptions {
    /** Флаг админа, который нужен игроку; если не указан — доступна всем. */
    access?: Access;
    /** Что показывают рядом с ней `amx_help` и подобные. */
    description?: string;
}
/**
 * Права, которые дают буквы из users.ini, в виде имён: `accessOf("abc")` —
 * ["Immunity", "Reservation", "Kick"]. Неизвестные буквы пропускаются.
 */
export declare function accessOf(letters: string): Access[];
/** Что получает обработчик серверной команды: слова после её имени. */
export type ServerCommandHandler = (args: string[]) => void;
/**
 * Как выглядит HUD-сообщение. У каждого поля есть значение по умолчанию
 * из AMX Mod X, так что `{ color: [255, 40, 40] }` достаточно.
 */
export interface HudOptions {
    /** Красный, зелёный, синий, от 0 до 255. */
    color?: number[];
    /** 0 — левый край, 1 — правый; -1 — по центру. */
    x?: number;
    /** 0 — верх, 1 — низ; -1 — по центру. */
    y?: number;
    /** Сколько секунд сообщение держится на экране. */
    hold?: number;
    /** "fade" — плавное появление и исчезание, "flicker" — мерцание, "typewriter" — вывод по буквам. */
    effect?: HudEffect;
    /** Время появления в секундах. */
    fadeIn?: number;
    /** Время исчезания в секундах. */
    fadeOut?: number;
    /** Один из четырёх каналов HUD; -1 — AMX Mod X сам выберет свободный. */
    channel?: number;
    /** Длительность эффектов flicker и typewriter в секундах. */
    effectTime?: number;
    /**
     * Крупные буквы (director HUD, set_dhudmessage): для итога или
     * заголовка. Каналов у него нет, так что `channel` не действует.
     */
    large?: boolean;
}
/** Как появляется HUD-сообщение: "fade" — плавно, "flicker" — мерцая, "typewriter" — по буквам. */
export type HudEffect = "fade" | "flicker" | "typewriter";
/**
 * Место на HUD для одного сообщения: новое сообщение здесь заменяет
 * прежнее, а не занимает свой канал — обратный отсчёт, который
 * перерисовывается каждую секунду, меняющееся предупреждение. `clear`
 * убирает его раньше времени.
 *
 * ```ts
 * const countdown = new HudLine();
 * countdown.show(player, `${left}`, { color: [255, 50, 50], hold: 1.1 });
 * countdown.clear(player);
 * countdown.clearAll();
 * ```
 *
 * Внутри — объект синхронизации HUD из AMX Mod X (CreateHudSyncObj, ShowSyncHudMsg).
 */
export declare class HudLine {
    private handle;
    /** Показывает игроку `text` на этом месте вместо того, что эта строка показывала ему раньше. */
    show(player: Player, text: string, options?: HudOptions): void;
    /** Убирает её с экрана этого игрока раньше времени. */
    clear(player: Player): void;
    /** Убирает её со всех экранов. */
    clearAll(): void;
}
/** Направление затемнения: "in" — от цвета к чистому экрану, "out" — от чистого экрана к цвету. */
export type FadeDirection = "in" | "out";
/** Как `player.screen.fade` окрашивает экран. Время — в секундах. */
export interface FadeOptions {
    /** Красный, зелёный, синий и альфа, от 0 до 255. */
    color?: number[];
    /** Длительность перехода в секундах. */
    duration?: number;
    /** Сколько секунд держится полный цвет. */
    hold?: number;
    /** "in" (по умолчанию) — от цвета к чистому экрану, "out" — от чистого экрана к цвету. */
    direction?: FadeDirection;
    /** Цвет остаётся на экране до следующего затемнения (FFADE_STAYOUT). */
    stay?: boolean;
    /** Тонирует изображение на экране, а не закрашивает его (FFADE_MODULATE). */
    modulate?: boolean;
}
/** Как `player.screen.shake` трясёт экран. */
export interface ShakeOptions {
    /** Насколько смещается вид, до 16 единиц. */
    amplitude?: number;
    /** Длительность в секундах. */
    duration?: number;
    /** Толчков в секунду. */
    frequency?: number;
}
/** Состояние иконки статуса: убрана, горит или мигает. */
export type StatusIconState = "hide" | "show" | "flash";
/**
 * То, что один игрок видит поверх мира: затемнение, тряска, иконки статуса
 * и части HUD, которые рисует сама игра.
 *
 * ```ts
 * player.screen.fade({ color: [0, 0, 0, 255], duration: 0.5, hold: 1, stay: true });
 * player.screen.shake({ amplitude: 8, duration: 1, frequency: 5 });
 * player.screen.statusIcon("dmg_cold", "show", [0, 160, 255]);
 * ```
 *
 * Каждый вызов — одно user message этому игроку (ScreenFade, ScreenShake,
 * StatusIcon, ...). Время — в секундах; собственные единицы сообщений
 * (ScreenFade считает в 1/4096 с) остаются под капотом.
 */
export declare class Screen {
    private id;
    constructor(id: i32);
    private begin;
    /** Окрашивает экран с плавным переходом в одну или другую сторону: ScreenFade. */
    fade(options?: FadeOptions): void;
    /** Трясёт экран: ScreenShake. */
    shake(options?: ShakeOptions): void;
    /**
     * Иконка статуса по имени спрайта (sprites/hud.txt: "dmg_cold",
     * "buyzone", "c4", ...) — зажечь, заставить мигать или убрать, в заданном
     * цвете: StatusIcon.
     */
    statusIcon(sprite: string, state: StatusIconState, color?: number[]): void;
    /**
     * Таймер раунда вверху HUD, в секундах: RoundTime. Отправляется
     * ненадёжно, как это делает сама игра: у клиента с забитым надёжным
     * каналом таймер перестаёт отображаться.
     */
    roundTime(seconds: number): void;
    /**
     * Сразу сообщает клиенту, какие части HUD скрыть: HideWeapon.
     * `player.hideHud` игра сама отправит кадром позже; этот метод — для
     * случаев, когда кадр спустя уже поздно.
     */
    hideHud(parts: HideHud[]): void;
    /** Рисует ли клиент стандартный прицел Counter-Strike: Crosshair. */
    crosshair(shown: boolean): void;
    /** Иконка фонарика: включён или выключен и заряд батареи в процентах: Flashlight. */
    flashlight(on: boolean, battery?: number): void;
}
/** Что получает обработчик изменения квара. */
export declare class CvarChangeEvent {
    /** Квар, который изменился. */
    cvar: Cvar;
    /** Что в нём было до изменения. */
    oldValue: string;
    /** Что в нём теперь. */
    value: string;
    constructor(
    /** The cvar that changed. */
    cvar: Cvar, 
    /** What it held before. */
    oldValue: string, 
    /** What it holds now. */
    value: string);
}
/** Обработчик изменения квара: `(event) => ...`, старое и новое значение — в `event`. */
export type CvarListener = (event: CvarChangeEvent) => void;
/**
 * @hidden The start of every exported native. A Pawn plugin calls one from
 * its plugin_init at the earliest - often before the host's own - and by then
 * plugin_natives is over, so a Cvar the native makes (nhnse_register_cvar)
 * is made at once rather than when this plugin's init comes.
 */
export declare function __nativeCall(): void;
/**
 * Квар сервера — как `value` у поля ввода:
 *
 * ```ts
 * const freeze = new Cvar("mp_freezetime");
 * freeze.number = 5;
 * const speed = new Cvar("my_speed", "250");     // made with 250 if it does not exist
 * speed.addEventListener("change", (event) => console.log(`${event.oldValue} -> ${event.value}`));
 * ```
 *
 * `value` — текст, как его хранит сервер; `number` и `boolean` читают и
 * пишут тот же квар как число и как переключатель. Один класс, а не
 * Cvar<number> и Cvar<string>: квар внутри — это текст, и читать его можно
 * и так, и так, а дженерик заставил бы дважды указывать тип впустую.
 */
export declare class Cvar {
    /** Имя квара, как его знает консоль: "mp_timelimit". */
    name: string;
    private defaultValue;
    /** Хэндл квара в движке; 0, если такого квара нет. */
    pointer: i32;
    private listeners;
    private hooked;
    constructor(
    /** The cvar's name, as the console knows it: "mp_timelimit". */
    name: string, defaultValue?: string | null);
    /**
     * @internal Находит или создаёт квар и вешает на него хук. Верхний уровень
     * плагина выполняется во время plugin_natives, а create_cvar в этот момент
     * роняет сервер при загрузке; поэтому Cvar, созданный так рано, ждёт plugin_init.
     */
    attach(): void;
    private hook;
    /** Есть ли такой квар на сервере. */
    get exists(): bool;
    /** Текст, который в нём хранится. */
    get value(): string;
    set value(text: string);
    /** То же значение как число. Целое записывается как целое: "5", а не "5.000000". */
    get number(): number;
    set number(value: number);
    /** То же значение как переключатель: включён при любом значении, кроме 0. */
    get boolean(): bool;
    set boolean(on: bool);
    /** Вызывает `listener` при каждом изменении значения квара. */
    addEventListener(type: "change", listener: CvarListener): void;
    /** Перестаёт вызывать обработчик, добавленный через addEventListener. */
    removeEventListener(type: "change", listener: CvarListener): void;
    /** @internal Его вызывает сервер при изменении квара; плагин слушает через addEventListener. */
    dispatch(event: CvarChangeEvent): void;
}
/**
 * Сервер как DOM-цель: его события, команды, карта, папки AMX Mod X.
 * Используется через `server`, самому создавать не нужно.
 */
export declare class Server {
    /** Вызывает `listener` каждый раз, когда сервер порождает событие `type`. */
    addEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /** Перестаёт вызывать обработчик, добавленный через addEventListener, — ту же функцию. */
    removeEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /** Текущая карта. */
    get map(): string;
    /** Сколько слотов для игроков на сервере. */
    get maxPlayers(): number;
    /**
     * Где AMX Mod X хранит конфиги, относительно папки игры — в том виде,
     * какой принимает `fs`: `addons/amxmodx/configs`, если сервер не
     * перенёс её (`amxx_configsdir`, get_configsdir в Pawn).
     *
     * ```ts
     * const text = fs.readFileSync(`${server.configsDir}/myplugin.ini`);
     * ```
     */
    get configsDir(): string;
    /** Где AMX Mod X хранит данные плагинов — `addons/amxmodx/data`, если её не перенесли (`amxx_datadir`). */
    get dataDir(): string;
    /**
     * Выполняет команду в консоли сервера, как если бы её там ввели:
     * `server.command("changelevel " + map)`. Текст уходит как есть — `%` в нём
     * остаётся просто `%`.
     */
    command(text: string): void;
    /**
     * Команда, которую набирают игроки: `"/hp"` в чате (say и say_team), имя
     * без слеша — в консоли.
     *
     * ```ts
     * server.addCommand("/hp", (player, args) => print(player, `${player.health} HP`));
     * server.addCommand("/kick", kick, { access: "Kick", description: "Kick a player" });
     * ```
     *
     * `args` — слова после имени. Сработавшая чат-команда не дублируется в
     * чате; команда, недоступная игроку, не трогается. Имя
     * `"say <phrase>"` — строка чата без слеша: `"say time"` срабатывает, когда
     * кто-то пишет ровно "time".
     */
    addCommand(name: string, handler: CommandHandler, options?: CommandOptions): void;
    /**
     * Команда консоли самого сервера — набранная там, пришедшая по rcon или
     * вызванная через server_cmd другого плагина. Игроки её не набирают.
     *
     * ```ts
     * server.addServerCommand("myplugin_reset",(args) => reset(args.length > 0 ? args[0] : "all"));
     * ```
     *
     * `args` — слова после имени, как их разбил движок.
     * Регистрируется в движке на plugin_init, поэтому её можно добавлять
     * с верхнего уровня файла.
     */
    addServerCommand(name: string, handler: ServerCommandHandler): void;
    /** HUD-сообщение всем на сервере — см. player.showHud. */
    showHud(text: string, options?: HudOptions): void;
}
/** Сервер, на котором работает плагин. */
export declare const server: Server;
/**
 * События самой игры — hookchain'ы reapi — как DOM-цель:
 *
 * ```ts
 * game.addEventListener("takeDamage", (event) => {
 *   if (event.player.isBot) event.preventDefault();
 * });
 * game.addEventListener("canPlayerHearPlayer", (event) => event.listener.team == event.sender.team);
 * game.addEventListener("flPlayerFallDamage", (event) => event.result / 2, true);
 * ```
 *
 * Тип события выводится из его имени, как у `server`. То, что возвращает
 * обработчик, — ответ цепочки: в pre-обработчике он заменяет то, что игра
 * сделала бы, в post-обработчике — то, что она сделала. Обработчик, который
 * ничего не возвращает, оставляет решение игре, а `event.preventDefault()`
 * блокирует без ответа. Значение не того типа — строка там, где цепочка
 * отвечает true или false, — ошибка и в редакторе, и при компиляции.
 */
export declare class Game {
    /**
     * Вызывает `listener` каждый раз, когда игра выполняет `type`.
     *
     * `post`: после того как игра сделала своё, с её ответом в
     * event.result. По умолчанию false — до неё, с возможностью остановить, —
     * как собственный `post = 0` у RegisterHookChain и RegisterHam.
     */
    addEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /** Перестаёт вызывать обработчик, добавленный через addEventListener, — ту же функцию с тем же `post`. */
    removeEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /**
     * Завершает раунд сразу:
     *
     * ```ts
     * game.endRound({ winner: "TERRORIST" });                 // the hiders win, next round in 5 s
     * game.endRound({ winner: "draw", delay: 3 });
     * game.endRound({ winner: "none", message: "" });         // a quiet restart: no message
     * ```
     *
     * От победителя зависят счёт, сообщение и звук, которые игра использует
     * для такого финала ("Terrorists Win!"); `message` и `sound` заменяют их,
     * "" — без них. rg_round_end из reapi.
     */
    endRound(options: EndRoundOptions): void;
}
/** Кто побеждает в раунде, который завершает game.endRound: сторона, ничья или никто — рестарт. */
export type RoundWinner = "TERRORIST" | "CT" | "draw" | "none";
/** Как `game.endRound` завершает раунд. Обязателен только `winner`. */
export interface EndRoundOptions {
    /** Кто побеждает: "TERRORIST", "CT", "draw" или "none" — рестарт. */
    winner: RoundWinner;
    /** Через сколько секунд начнётся следующий раунд. */
    delay?: number;
    /** Сообщение по центру экрана или токен #CSTRIKE_; "default" — стандартное для этого победителя, "" — без сообщения. */
    message?: string;
    /** Звук (радиофраза); "default" — стандартный для этого победителя, "" — без звука. */
    sound?: string;
    /**
     * Оповестить обработчики roundEnd — game.addEventListener("roundEnd") всех плагинов
     * и хуки RG_RoundEnd в Pawn, — как когда игра сама завершает раунд. По
     * умолчанию false, как `trigger` у rg_round_end: обработчик roundEnd,
     * который снова завершает раунд, вызвал бы сам себя.
     */
    dispatch?: boolean;
}
/** Игра, в которой работает плагин: её события (hookchain'ы reapi) и `endRound`. */
export declare const game: Game;
/**
 * Какой вид сообщения отправить игроку.
 *
 * Строки, а не числа, чтобы `{ variant: "chat" }` читалось само по себе,
 * а эти константы нужны только для автодополнения в редакторе. Число, которое
 * ждёт AMX Mod X, подбирается при отправке; незнакомое имя превращается
 * в чат, где сообщение труднее всего пропустить.
 *
 * Это ровно четыре вида client_print и ничего больше. Консоль сервера — другой
 * натив, вообще без получателя, поэтому `log` не принимает ни id, ни вид.
 */
export declare namespace Variant {
    /** Строка в чате. */
    const chat: string;
    /** Текст посреди экрана. */
    const center: string;
    /** Строка в консоли игрока. */
    const console: string;
    /**
     * Строка в консоль игрока, отправленная как уведомление: при включённом
     * developer она видна ещё и в левом верхнем углу экрана.
     */
    const notify: string;
}
/** Все имена, которые принимает вид сообщения, — для автодополнения в редакторе. */
export type VariantName = "chat" | "center" | "console" | "notify";
export { Flag } from "./constants";
export * from "./events";
import { FlagName, HookName, HamName } from "./constants";
import { PlayerFields } from "./entities";
export { Entity, Weapon, WeaponKind, weaponKindOf } from "./entities";
import { ServerEventMap } from "./events";
/**
 * Кому адресовано сообщение, когда одного id игрока мало.
 *
 * `id`, а не Player, потому что обработчик получает именно его — и потому что
 * 0 означает всех.
 */
export interface Target {
    /** id игрока; 0 — все. */
    id: number;
    /** Где показать: "chat", "center", "console" или "notify". */
    variant?: VariantName;
}
/**
 * Превращает цветовые теги в байты, которые понимает клиент, и решает, в какой
 * команде получателю нужно показать отправителя.
 *
 * Экспортирована, потому что именно эту часть стоит тестировать: чтобы увидеть
 * собранные байты, клиент не нужен. Ответ на вторую половину лежит в
 * `swapTeam`, пока строка не отправлена, — одно всегда идёт вместе с другим.
 */
export declare function paint(text: string): string;
/** Что решила paint(); print читает это сразу после неё. */
export declare let swapTeam: string;
/**
 * Выводит сообщение игроку или, с 0, всем.
 *
 * ```ts
 * print(player, `${player.name}, your HP: ${player.health}`);
 * print(0, "Round starts in 5 seconds");
 * print(player, "Health restored!", "center");
 * print({ id, variant: "center" }, "the same, as an object");
 * ```
 *
 * Первый аргумент — Player, его id или 0 для всех. Третий — где показать
 * строку: "chat" (по умолчанию), "center" — посередине экрана, "console" — в
 * консоли игрока, или "notify".
 *
 * Чат раскрашивается: `!g` зелёный, `!y` жёлтый, `!t` цвет команды
 * отправителя, `!r` красный, `!b` синий, `!w` серый. `!` перед другой
 * буквой остаётся как есть, а остальные виды сообщений теги не обрабатывают.
 *
 * Один командный цвет на строку: красный, синий, серый и `!t` занимают один
 * слот, поэтому `!rRed !bBlue` выйдет красным целиком — побеждает первый тег.
 * Зелёный и жёлтый сочетаются с любым из них.
 *
 * В консоль сервера пишет `console.log`.
 */
export declare function print<T extends Target | Client | number = Target>(to: T, message: string, variant?: VariantName): void;
/**
 * Читает и задаёт квар по имени одним вызовом: `cvar.num("mp_freezetime")`.
 *
 * Обычно для этого берут `Cvar` — он создаёт недостающий квар, слышит его
 * изменения и читает его как текст, число или переключатель. Это — для
 * разового чтения.
 */
export declare namespace cvar {
    /** Значение квара как целое число: `cvar.num("mp_freezetime")`. */
    function num(name: string): number;
    /** Задаёт квару целое число: `cvar.setNum("mp_freezetime", 5)`. */
    function setNum(name: string, value: number): void;
    /** Значение квара как текст: `cvar.str("hostname")`. */
    function str(name: string): string;
    /** Задаёт квару текст: `cvar.setStr("hostname", "My Server")`. */
    function setStr(name: string, value: string): void;
}
/** Регистрирует клиентскую команду. Обработчик получает игрока, который её ввёл. */
export declare function cmd(pattern: string, handler: Handler, flag?: FlagName, info?: string): void;
/**
 * То же, для команды, которой нужны остальные аргументы или которая должна
 * ответить.
 *
 * Обработчик клиентской команды вызывается с (id, level, cid); если вернуть
 * `Continue`, AMX Mod X передаст команду дальше — всем, кто её тоже
 * зарегистрировал.
 */
export declare function cmdWide(pattern: string, handler: WideHandler, flag?: FlagName, info?: string): void;
/** То, что запускает таймер. */
export type TimerHandler = () => void;
/**
 * Запускает обработчик один раз, через заданное число миллисекунд, и возвращает
 * его дескриптор — как в браузере:
 *
 * ```ts
 * const handle = setTimeout(() => print(player, "Welcome!"), 2000);
 * clearTimeout(handle);
 * ```
 *
 * Обработчик может пользоваться переменными вокруг. Под капотом — серверный
 * таймер (set_task), поэтому точность — один серверный кадр.
 */
export declare function setTimeout(handler: TimerHandler, ms?: number): number;
/** Что sleep() принимает помимо времени. */
export interface SleepOptions {
    /** Прерывает ожидание, когда сигнал срабатывает: промис отклоняется с его причиной. */
    signal?: AbortSignal;
}
/**
 * Промис, который выполняется через `ms`, — способ подождать внутри
 * async-функции:
 *
 * ```ts
 * await sleep(1000);
 * await sleep(5000, { signal: AbortSignal.timeout(2000) }); // rejects after 2 s
 * ```
 *
 * Под капотом — серверный таймер (set_task), поэтому точность — один серверный
 * кадр. Внутри async-обработчика команды или события игрока ожидание
 * заканчивается и тогда, когда этот игрок выходит.
 */
export declare function sleep(ms: number, options?: SleepOptions): Promise<void>;
/** То же, но срабатывает каждые `ms`, пока его не остановит clearInterval. */
export declare function setInterval(handler: TimerHandler, ms: number): number;
/**
 * Останавливает таймер с этим дескриптором и освобождает слот его колбэка.
 * Неактивный дескриптор — уже сработавший или уже остановленный —
 * игнорируется.
 *
 * `remove_task` из Pawn этих таймеров не видит: они принадлежат хост-плагину,
 * и повторяющийся продолжил бы срабатывать.
 */
export declare function clearTimeout(handle: number): void;
/** То же самое. Два имени, потому что читающий код ожидает оба. */
export declare function clearInterval(handle: number): void;
/**
 * Натив с хвостом `...`, собираемый по одному аргументу.
 *
 * У такого натива нет типизированной функции в ~/natives, только его id
 * (NATIVE_...). Каждый аргумент сообщает, что он такое, потому что хвост не
 * несёт типов:
 *
 *   new Call(NATIVE_server_print).str("%s").str(text).run();
 *
 * **Прочитайте объявление и найдите `...`.** Всё до него — обычные параметры,
 * они передаются как есть, через `num` или `str`. Всё после — аргументы
 * хвоста, а хвост Pawn передаёт по адресу, а не по значению, поэтому число
 * там идёт через `ref` — это даёт ему собственную ячейку, — а `out(i)`
 * читает то, что натив записал в эту ячейку. Строка и так передаётся по
 * адресу.
 *
 *   ExecuteHam(Ham:function, this, any:...)      num, num, then the tail
 *   SetHookChainArg(number, AType:type, any:...) num, num, then the tail
 *   ExecuteForward(handle, &ret, any:...)        num, ref for &ret, then tail
 *
 * Ошибка здесь тихая и дорогая: `ExecuteHam`, получив сущность по адресу,
 * сообщил "Entity out of range" совсем из другого места, а перенаправление
 * на нож, ради которого его вызывали, просто не произошло.
 */
export declare class Call {
    private id;
    private args;
    private mask;
    private cells;
    private held;
    private n;
    constructor(id: i32);
    /** Ячейка как есть: индекс сущности, константа, количество. */
    num(value: number): Call;
    /** Число, которое натив читает как `Float:`. */
    float(value: f64): Call;
    /**
     * Строка. Натив получает адрес копии, которая живёт, пока вызов не закончен, —
     * одинаково до `...` и в хвосте: строка и так передаётся по адресу.
     */
    str(text: string): Call;
    /** Ячейки, которые натив читает и может перезаписать. Следом идёт длина. */
    buffer(cells: CellBuffer, length: number): Call;
    /**
     * Три дробных числа по одному адресу — координаты, углы, цвет.
     *
     * Не `buffer`: за ним следует длина, потому что так объявлены нативы, которые
     * его заполняют. Вектор свою длину знает сам.
     */
    vec(x: f64, y: f64, z: f64): Call;
    /**
     * Вектор, который заполняет натив; результат читается из буфера вызывающего.
     *
     * `vec` держит свои три ячейки у себя — это годится, чтобы передать вектор,
     * и бесполезно, чтобы получить его обратно: скорость, координаты, цвет,
     * которые вызывающий хочет изменить и вернуть. Здесь три ячейки остаются там,
     * где вызывающий прочитает их после `run`.
     */
    vecInto(cells: CellBuffer): Call;
    /** Значение, передаваемое по адресу, — так обязан передаваться аргумент хвоста `...`. */
    ref(value: number): Call;
    /** Что натив оставил в аргументе `ref` на этой позиции. */
    out(index: i32): number;
    /** Вызывает натив с собранными аргументами; возвращает то, что вернул натив. */
    run(): number;
}
/**
 * Регистрирует хукчейн reapi с сырым обработчиком на уровне ячеек — это капот
 * под game.addEventListener, которым пользуется плагин. Типизированные события вызывают
 * это по разу на каждую цепочку и сторону; плагин, вызвавший это напрямую,
 * получает форму Pawn (четыре ячейки, HC_* вручную), которую типизированные
 * события как раз прячут.
 *
 * Имя — из reapi, без класса там, где он не нужен, чтобы различить две
 * цепочки: `RG_CSGameRules_RestartRound` — это `"restart_round"`, а
 * `RG_CBasePlayer_Spawn` — `"player_spawn"`. Редактор их дополняет, а опечатка
 * ломает сборку.
 *
 * Обработчик широкий, потому что хукчейн передаёт свои аргументы и ждёт в ответ
 * `HC_CONTINUE` или `HC_SUPERCEDE`. Числа за именами вычисляются из инклудов
 * самого reapi, а reapi меняет их от релиза к релизу — берите инклуды того
 * релиза, что стоит на сервере, иначе регистрация молча попадёт на чужую
 * цепочку.
 *
 * Возвращает дескриптор reapi, который принимают EnableHookChain и
 * DisableHookChain.
 */
export declare function hook(name: HookName, handler: WideHandler, post?: bool): number;
/** То же для Ham Sandwich: `ham("spawn", "player", onSpawn)`. */
export declare function ham(name: HamName, entityClass: string, handler: WideHandler, post?: bool): number;
/**
 * Что плагин сообщает о себе: `plugin({ name, version, author, description })`.
 * Это показывает `amxts_plugins` в консоли сервера.
 */
export interface PluginInfo {
    /** Имя плагина, как его показывает `amxts_plugins`: "My Plugin". */
    name: string;
    /** Его версия, как её показывает `amxts_plugins`: "1.0.0". */
    version: string;
    /** Кто его написал. */
    author: string;
    /** Что он делает, одной строкой. */
    description?: string;
    /**
     * Pawn-инклуд, нативы которого реализует этот плагин, — `"myplugin.inc"`,
     * из includes/ или рядом с плагином. Сборка его читает: каждая
     * экспортированная функция уходит в Pawn так, как её объявляет инклуд, и
     * именно этот инклуд получают Pawn-плагины.
     */
    include?: string;
}
/**
 * Представляет плагин: имя, версия, автор и описание — так их показывает
 * список плагинов сервера. Вызывается один раз, на верхнем уровне файла:
 *
 * ```ts
 * plugin({ name: "Hello", version: "1.0.0", author: "you", description: "An example" });
 * ```
 *
 * `include` — Pawn-инклуд, нативы которого реализует плагин.
 */
export declare function plugin(info: PluginInfo): void;
/**
 * Что amxts.config.ts задаёт каждому модулю под его configKey. Здесь пусто:
 * модуль добавляет свой ключ, дополняя этот интерфейс в "@amxts/core", —
 * `menus?: Partial<MenuCoreOptions>`, — и редактор типизирует конфиг по нему.
 */
export interface ModuleOptions {
}
/**
 * Определение модуля — `export default defineModule<Options>({ meta,
 * requires, defaults, setup })` в файле модуля, глобальное, как в Nuxt.
 * Сборка читает meta, requires и defaults из исходника, а setup
 * выполняется один раз, когда сервер загружает модуль, — с настройками по
 * умолчанию и тем, что поверх них задаёт amxts.config.ts. Функция
 * глобальная, но явный `import { defineModule } from "@amxts/core"` тоже
 * работает.
 */
export declare function defineModule<T>(definition: AmxtsModule<T>): AmxtsModule<T>;
/**
 * Когда плагины, отвечающие на форвард, его останавливают: `"never"` — его
 * слышат все, что бы они ни вернули, — или `"handled"`: первый PLUGIN_HANDLED
 * его завершает.
 */
export type ForwardStop = "never" | "handled";
/** Неиспользуемый аргумент типа у Forward: у `Forward<number>` один аргумент. */
export declare class NoArgument {
}
/** What subscribe() hangs on: a Forward, reached by its tag - see forwardTrampoline. */
declare abstract class ForwardListener {
    abstract deliver(a: i32, b: i32, c: i32): void;
}
/**
 * Форвард, на который подписываются другие плагины — и Pawn, и TypeScript.
 * Его аргументы — параметры типа:
 *
 * ```ts
 * const roundStart = new Forward("myplugin_on_round_start");
 * const roundEnd = new Forward<RoundWinner>("myplugin_on_round_end");
 * const configChanged = new Forward<string, string>("myplugin_on_config_changed");
 *
 * roundStart.emit();
 * roundEnd.emit(winner);
 * configChanged.emit(id, value);
 *
 * const swapped = new Forward<Player, Player>("myplugin_on_player_swapped");
 * swapped.emit(catcher, caught);              // Pawn gets their ids
 * ```
 *
 * Pawn-плагин ловит его через `public myplugin_on_round_end(winner)`, как и
 * всегда. Какая константа FP_* у каждого аргумента, следует из его типа —
 * number, boolean и Player (его id) идут ячейкой, string — строкой, — а
 * ET_IGNORE стоит по умолчанию; ни то ни другое плагина не касается. `Team`
 * уходит числом TeamName, `RoundWinner` — числом WinStatus, а number — как
 * Float там, где так сказано в объявлении форварда в инклуде
 * (`forward x(id, TeamName:team)`, `WinStatus:status`): сборка читает его и
 * передаёт Forward второй аргумент конструктора. Team для форварда, которого
 * нет ни в одном инклуде, — ошибка сборки: в Pawn он пришёл бы текстом.
 *
 * Форвард создаётся при первом emit или вызовом `create()` в выбранный
 * плагином момент: CreateMultiForward находит подписанные плагины в момент
 * вызова, поэтому ему нужно дождаться, пока все они загрузятся (plugin_cfg или
 * позже), и вызывается он только один раз.
 *
 * TypeScript-плагин подписывается на тот же форвард через `subscribe(handler)`.
 */
export declare class Forward<A = NoArgument, B = NoArgument, C = NoArgument> extends ForwardListener {
    /** Имя форварда, под которым его ловят Pawn-плагины. */
    name: string;
    private crossing;
    /** Задаётся до первого emit; без него форвард никто не останавливает. */
    stopWhen: ForwardStop;
    private handle;
    private tag;
    private handlers;
    /**
     * @param name The forward's name, as Pawn plugins hook it.
     * @param crossing @internal Written by the build from the forward's Pawn
     * declaration in an include; a plugin leaves it out.
     */
    constructor(
    /** The forward's name, as Pawn plugins hook it. */
    name: string, crossing?: string);
    private crossingOf;
    /**
     * Вызывает `handler` при каждом срабатывании форварда — из этого плагина,
     * другого TypeScript-плагина или Pawn-плагина:
     *
     * ```ts
     * const greeted = new Forward<string, number>("showcase_on_greeted");
     * greeted.subscribe((name, count) => console.log(`${name}: ${count}`));
     * ```
     *
     * Параметры получают типы форварда, поэтому стрелочной функции аннотации не
     * нужны, а именованная функция может принимать их меньше.
     *
     * Форвард, созданный Pawn-плагином, доходит до TypeScript, только если он
     * объявлен в инклуде, из которого собран хост-плагин:
     * AMX Mod X вызывает форвард по имени паблика, а у хоста паблики есть ровно
     * для этих. Отправленный из TypeScript, любой форвард доходит до всех
     * подписчиков.
     */
    subscribe(handler: (a: A, b: B, c: C) => void): void;
    /** Перестаёт вызывать обработчик, переданный в subscribe(). */
    unsubscribe(handler: (a: A, b: B, c: C) => void): void;
    /**
     * Передаёт ячейки, пришедшие от модуля, всем обработчикам из subscribe(),
     * раскодировав их по типам форварда. Вызывается капотом, а не плагином.
     */
    deliver(a: i32, b: i32, c: i32): void;
    /** Создаёт форвард сейчас, а не при первом emit. Один раз; повторные вызовы ничего не делают. */
    create(): void;
    /** Отправляет форвард всем подписанным плагинам. true, если он ушёл. */
    emit(a?: A, b?: B, c?: C): boolean;
}
/**
 * Текст по ключу, на диске: Map, который переживает смену карты и
 * перезапуск.
 *
 * ```ts
 * const demos = new Storage("core_demo_counters");
 * const last = demos.get(auth);      // string | null
 * demos.set(auth, "3");
 * if (demos.has(auth)) ...
 * demos.delete(auth);
 * ```
 *
 * Под капотом — nVault: файл в addons/amxmodx/data/vault с именем хранилища,
 * открывается при первом обращении. Значения — строки, как и в nVault: число
 * кладётся через toString(), а читается через parseInt.
 */
export declare class Storage {
    /** Имя хранилища: так называется файл nVault, в котором оно лежит. */
    name: string;
    private vault;
    constructor(
    /** The storage's name: the nVault file it lives in. */
    name: string);
    /** Значение по ключу `key` или null, если его нет. */
    get(key: string): string | null;
    /** Записывает `value` по ключу `key`, заменяя прежнее значение. */
    set(key: string, value: string): void;
    /** Есть ли значение по ключу `key`. */
    has(key: string): boolean;
    /** Удаляет ключ `key` вместе со значением; отсутствующий ключ игнорируется. */
    delete(key: string): void;
    private open;
}
export * from "./flags";
import { Access, HideHud } from "./flags";
export * from "./hooks";
import { GameAnswerMap, GameEventMap } from "./hooks";
export * from "./vector";
export { EntityFilter } from "./entities";
/**
 * Публичная функция другого плагина: паблик Pawn-плагина или имя publicFor
 * TypeScript-плагина (паблик хост-плагина).
 *
 * ```ts
 * const fn = PawnFunction.find(caller(), "OnAction");       // null when there is none
 * if (fn != null) fn.call().int(id).text("KEY").run();
 * const call = fn.call().int(id).int(target).buffer(256).int(255);
 * call.run();
 * const value = call.bufferText;                               // what it wrote into value[]
 * ```
 */
export declare class PawnFunction {
    /** Id плагина, в котором находится функция. */
    readonly plugin: i32;
    /** Индекс функции в этом плагине — тот, что даёт get_func_id. */
    readonly index: i32;
    constructor(
    /** The id of the plugin the function is in. */
    plugin: i32, 
    /** The function's index in that plugin, as get_func_id gives it. */
    index: i32);
    /** `name` в плагине с этим id — caller() натива; null, если такого паблика у него нет. */
    static find(plugin: number, name: string): PawnFunction | null;
    /** Начинает вызов функции: её аргументы по порядку, затем run(). */
    call(): PawnCall;
}
/**
 * Один вызов PawnFunction: его аргументы по порядку, затем run().
 *
 * Вызов принимает сколько угодно строк и массивов, а то, что функция
 * записала в buffer(), потом читается через `bufferText` — родные
 * callfunc_push_str и callfunc_push_array в Pawn так не могли, если таких
 * аргументов больше одного.
 */
export declare class PawnCall {
    private fn;
    private kinds;
    private ints;
    private texts;
    private cells;
    /** Что функция записала в свой buffer(), после того как run() завершился. */
    bufferText: string;
    constructor(fn: PawnFunction);
    /** Числовой аргумент, передаётся ячейкой. */
    int(value: number): PawnCall;
    /** Логический аргумент, передаётся как 1 или 0. */
    bool(value: boolean): PawnCall;
    /** Строковый аргумент; функция получает его как Pawn-строку. */
    text(value: string): PawnCall;
    /** Массив, который заполняет функция, — `value[]` — из `size` ячеек. Один на вызов. */
    buffer(size: number): PawnCall;
    /** Вызывает функцию; возвращает её результат или 0, если вызвать не удалось. */
    run(): number;
    private add;
}
/** Новый `Array:` AMX Mod X по `cellSize` ячеек на элемент; возвращает его дескриптор. */
export declare function createCellArray(cellSize: number): number;
/** Освобождает `Array:`, созданный createCellArray; после этого дескриптор недействителен. */
export declare function destroyCellArray(handle: number): void;
/** Все элементы `Array:` по `cellSize` ячеек на элемент, каждый — массивом своих ячеек. */
export declare function cellArrayRows(handle: number, cellSize: number): number[][];
/** Добавляет в `Array:` один элемент из ячеек. */
export declare function pushCellArrayRow(handle: number, row: number[]): void;
/** Pawn-строка в `count` ячейках строки таблицы начиная со `start`: по байту UTF-8 на ячейку, до нулевой. */
export declare function cellsText(row: number[], start: number, count: number): string;
/** Текст как `count` ячеек Pawn-строки: не больше count - 1 байт, без половинок букв, остаток заполнен нулями. */
export declare function textCells(text: string, count: number): number[];
/**
 * show_menu для текста любой длины. До 500 байт это сам show_menu; длиннее —
 * сначала начало уходит сообщениями ShowMenu с пометкой "more" (клиент их
 * склеивает), а остаток отправляет show_menu: он завершает меню и сообщает
 * AMX Mod X его заголовок, чтобы нажатия дошли до register_menucmd.
 *
 * Текст пишется с цветовыми тегами, как в чате, — `!y` жёлтый, `!r` красный,
 * `!w` белый, `!d` серый, `!R` к правому краю, — а собственные коды игры
 * (`\y`, как в старом menu.ini) проходят как есть.
 */
export declare function showMenu(id: number, keys: number, text: string, title: string): void;
