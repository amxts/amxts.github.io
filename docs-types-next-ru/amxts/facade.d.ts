/// <reference path="../as-types.d.ts" />
/// <reference path="./amxts.d.ts" />
import "./promise";
import { Vector } from "./vector";
/** Обработчик, который получает `id` игрока и ничего не возвращает, — так вызываются события игрока и команды. */
export type Handler = (id: number) => void;
/**
 * Обработчик, который получает до четырёх чисел и ничего не возвращает: для
 * форварда, который передаёт больше, чем `id` игрока, и для хукчейна.
 *
 * Строковый аргумент приходит числом: прочитайте его через `argString`.
 * Чтобы остановить событие или заблокировать то, что перехватывает хукчейн,
 * вызовите `handled()`.
 */
export type WideHandler = (a: number, b: number, c: number, d: number) => void;
/** @hidden Для капота: что сервер вызывает вместо `handler`. */
export declare function hostIndex<T>(handler: T, wide: bool): i32;
/**
 * Останавливает событие: AMX Mod X больше никому его не передаёт, а хукчейн
 * не вызывает то, что перехватил. Действует только на выполняющийся
 * обработчик.
 *
 *   function onSay(id: number) {
 *     if (muted(id)) handled();
 *   }
 *
 * Pawn: `return PLUGIN_HANDLED`
 */
export declare function handled(): void;
/** @hidden Sets the handler's answer to a number other than `0` or `1`: a game event's status. */
export declare function __outcome(value: number): void;
/**
 * Переводит число в ячейку `Float:` для Pawn — для сырого натива или `ret()`:
 *
 *   ret(floatCell(2.5));
 *   rg_round_end(floatCell(5.0), ...);
 */
export declare function floatCell(value: f64): number;
/**
 * Округляет число до ближайшего целого: время раунда 59.6 секунды — это `60`,
 * а не `59`.
 *
 * Pawn: `floatround`
 */
export declare function rounded(value: number): number;
/** Переводит ячейку `Float:` из Pawn обратно в число. */
export declare function cellFloat(cell: number): f64;
/** Задаёт значение, которое экспортированный натив возвращает вызвавшему его плагину. */
export declare function ret(value: number): void;
/**
 * Имя паблика, который вызывает `handler`, — для натива AMX Mod X,
 * принимающего колбэк по имени: `register_think`, `set_native_filter`.
 *
 * ```ts
 * const pub = publicFor(onThink, "think:myplugin_box");
 * if (pub.length > 0) register_think("myplugin_box", pub);
 * ```
 *
 * Пустое имя значит «уже зарегистрировано»: такую регистрацию нельзя
 * отменить, она переживает горячую перезагрузку, и повторная вызывала бы
 * обработчик дважды. `key` опознаёт регистрацию между перезагрузками — любое
 * имя, уникальное в пределах плагина. `fallback` — ответ, если обработчик
 * ничего не вернул: `0` почти везде, `1` там, где натив ждёт обработанное событие.
 *
 * Регистрируйте из события `"pluginsLoaded"`, а не с верхнего уровня файла: консольная
 * команда, зарегистрированная так рано (`register_concmd`, `register_srvcmd`),
 * роняет сервер, когда её вводят.
 */
export declare function publicFor(handler: WideHandler, key: string, fallback?: number): string;
/**
 * @hidden `publicFor`, the public switched by `hook`: switched off, a call
 * answers `fallback` in the module, without reaching the plugin.
 */
export declare function __switchedPublic(handler: WideHandler, key: string, hook: __Switch | null, fallback?: number): string;
/**
 * @hidden A registration with AMX Mod X - a hook, or a public it calls - that
 * is switched off while what it delivers has no listener and back on for the
 * next one, so that an event nobody listens to does not reach the plugin.
 * One switched off before it is made is made switched off.
 */
export declare class __Switch {
    private on;
    private parts;
    /** Switches every registration of it on or off. */
    set(on: bool): void;
    /** What switches one registration, once it is made; run at once while the switch is off. */
    add(part: (on: bool) => void): void;
}
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
 * `argText(i)` читают любой из них, `setArg` и `setArgText` пишут обратно.
 * Проще так: `export function` входного файла — это натив с настоящими
 * типами (см. страницу «Нативы»).
 *
 * Вызывайте на верхнем уровне файла: AMX Mod X спрашивает у каждого плагина
 * нативы до того, как запустит хоть один.
 *
 * Pawn: `register_native`
 */
export declare function nativeFn(name: string, handler: WideHandler): void;
/**
 * Число, которое собственный натив плагина передаёт в Pawn как `Float:`.
 *
 * Для TypeScript это `number`. Пишется только в сигнатуре экспортированного
 * натива, где Pawn нужно знать, какие числа дробные; в остальном коде число —
 * это `number`.
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
 * @hidden Writes a `Float:v[3]` argument where it lies: a hookchain's vector,
 * which reapi copies back into the game's once the listener returns.
 */
export declare function __setNativeVector(index: i32, value: Vector): void;
/**
 * @hidden A forward's array argument, as many numbers as it has: what the
 * emitting plugin sent, or the size the include declares; none when neither
 * says. `floats` reads them as `Float:`.
 */
export declare function __forwardNumbers(index: i32, floats: bool): f64[];
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
 * Динамический массив AMX Mod X — чтобы вернуть список Pawn-плагину, который
 * ждёт хэндл `Array:`.
 *
 * ```ts
 * export function cfg_get_value_array(section: ConfigSection, key: string) {
 *   const words = lookup(section, key);                // string[] | null
 *   return words != null ? CellArray.fromStrings(words) : null;
 * }
 * // native Array:cfg_get_value_array(ConfigSection:section, const key[]);
 * ```
 *
 * Pawn-плагин, получивший массив, владеет им и сам его удаляет; `null`
 * приходит к нему как `Invalid_Array`. Внутри TypeScript список — это
 * `string[]` или `number[]`: этот класс нужен только для передачи в Pawn.
 *
 * Pawn: `ArrayCreate`, `Array:`
 */
export declare class CellArray {
    /** Хэндл массива — `Array:`, который получает Pawn. */
    readonly handle: i32;
    /** An empty array whose items are `cellSize` cells each: 1 for a number, the buffer size for text. */
    constructor(cellSize?: number);
    /** Новый массив строк, каждая до `cellSize - 1` байт. */
    static fromStrings(values: string[], cellSize?: number): CellArray;
    /** Новый массив дробных чисел, которые Pawn читает как `Float:`. */
    static fromFloats(values: number[]): CellArray;
    /** Число элементов в массиве. */
    get length(): number;
    /** Добавляет строку; она должна уместиться в `cellSize - 1` байт UTF-8. */
    pushString(value: string): void;
    /** Добавляет целочисленное значение или хэндл другого массива. */
    pushCell(value: number): void;
    /** Добавляет дробное число, которое Pawn читает как `Float:`. */
    pushFloat(value: number): void;
    /** Добавляет один элемент из нескольких чисел: `[a, b]` в массив, созданный через `new CellArray(2)`. */
    pushCells(values: number[]): void;
}
/**
 * Читает аргумент выполняющегося обработчика по номеру; `0` — его первый
 * параметр. Нужна для аргументов после четвёртого, которых обработчик
 * параметрами не получает.
 *
 *   function onSomething(a: number, b: number, c: number, d: number) {
 *     const fifth = arg(4);
 *   }
 */
export declare function arg(index: number): number;
/**
 * Читает аргумент выполняющегося колбэка как строку.
 *
 * Форварду это не нужно: его обработчик получает строки уже текстом.
 */
export declare function argText(index: number): string;
/**
 * Число аргументов, которые на самом деле пришли в выполняющийся вызов.
 *
 * Обработчик всегда получает четыре, дополненные нулями, поэтому натив с
 * необязательными аргументами по этому числу отличает переданный ноль от
 * непереданного:
 *
 *   const flashes = argc() >= 2 ? arg(1) : -1;
 */
export declare function argc(): number;
/**
 * `id` плагина, который вызвал выполняющийся экспортированный натив, или `-1`.
 *
 * Для натива, который касается вызывающего: квар, зарегистрированный
 * плагином, префикс чата, заданный для него.
 */
export declare function caller(): number;
/**
 * Записывает число обратно через аргумент, переданный по ссылке (`&value`
 * в Pawn).
 *
 * Pawn: `set_param_byref`
 */
export declare function setArg(index: number, value: number): void;
/**
 * Записывает текст обратно через строковый аргумент.
 *
 * Для колбэка, который передаёт не текст для чтения, а буфер для заполнения.
 * `max` — место, которое дал вызывающий; обычно это аргумент сразу после
 * буфера.
 *
 *   function placeholder(id: number, target: number, out: number, max: number) {
 *     setArgText(2, "ready", max);
 *   }
 */
export declare function setArgText(index: number, text: string, max: number): void;
/** Читает строковый аргумент, который широкий обработчик получил числом. */
export declare function argString(pointer: number): string;
/**
 * @hidden A Pawn string at `pointer`: a byte of UTF-8 in each cell, up to the
 * zero cell or `max` cells. AMX Mod X, the engine and the game keep text as
 * bytes - get_amxstring takes the low byte of each cell - so a letter outside
 * ASCII is two or three cells, and a cell per UTF-16 unit came out as
 * mojibake one way and a truncated byte the other (a Cyrillic word arrived as "@0").
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
/** Читает текст, который сырой натив из `@amxts/core/natives` записал в массив ячеек. Обратно — `stringToCells`. */
export declare function cellsToString(cells: StaticArray<i32>): string;
/** Записывает текст в массив ячеек как строку Pawn — для сырого натива. */
export declare function stringToCells(text: string, cells: StaticArray<i32>): void;
/**
 * Передаёт строку сырому нативу из `@amxts/core/natives` без объявления буфера под неё:
 *
 *   cfg_set_base_dir(cells("myplugin"));
 *
 * До восьми строк в одном вызове; девятая затирает первую. Только для
 * входящих аргументов: нативу, который пишет текст обратно, нужен `out()`.
 */
export declare function cells(text: string): number;
/**
 * Буфер, в который сырой натив пишет текст; прочитать его — `text()`.
 *
 *   const name = out();
 *   get_user_name(id, name, TEXT_MAX);
 *   console.log(text(name));
 *
 * Одновременно — до четырёх. Числу, которое натив пишет через `&ссылку`,
 * тоже нужен такой буфер; прочитать его — `cell()`.
 */
export declare function out(): number;
/** Читает текст, который натив записал в буфер `out()`. */
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
    /** Буфер из трёх дробных чисел для натива, который принимает вектор: позицию, размер, цвет. */
    static vector(x: f64, y: f64, z: f64): CellBuffer;
    /** Число ячеек в буфере. */
    get length(): number;
    /** Адрес буфера — аргумент для натива, который принимает массив. */
    get address(): number;
    /** Целочисленное значение в ячейке с номером `index`: `buffer[0]`. */
    get(index: number): number;
    /** Кладёт целочисленное значение в ячейку с номером `index`: `buffer[0] = 5`. */
    set(index: number, value: number): void;
    /** Дробное число в ячейке с номером `index`, которое натив записал как `Float:`. */
    float(index: number): f64;
    /** Кладёт дробное число в ячейку с номером `index` — для натива, который читает `Float:`. */
    setFloat(index: number, value: f64): void;
    /** Текст, который натив записал в буфер. */
    text(): string;
    /** Записывает текст в буфер начиная с ячейки `at`, как строку Pawn. */
    write(at: number, value: string): void;
    /** Записывает `value` во все ячейки: `buffer.fill(0)` очищает буфер. */
    fill(value: number): void;
}
/** Массив из `length` копий `value`: `arrayOf(33, 0)`. Во всех ячейках одно и то же `value` — объектам дайте каждой ячейке свой. */
export declare function arrayOf<T>(length: number, value: T): T[];
/** Читает число, которое натив записал в буфер `out()`, переданный как `&ссылка`. */
export declare function cell(buffer: number): number;
/** Кладёт число в буфер `out()` — для ссылки, которую натив и читает, и пишет. */
export declare function putCell(buffer: number, value: number): number;
/**
 * Пустая точка для сообщения одному игроку:
 *
 *   message_begin(MSG_ONE, msgid, noOrigin(), id);
 *
 * Точку читают только сообщения игрокам рядом с ней.
 */
export declare function noOrigin(): number[];
/** Длина текста, который вмещает буфер `out()`: `255`. */
export declare const TEXT_MAX: i32;
/** Команда Counter-Strike под именем, которое даёт ей игра: одно из `"TERRORIST"`, `"CT"`, `"SPECTATOR"`, `"UNASSIGNED"`. */
export type Team = "TERRORIST" | "CT" | "SPECTATOR" | "UNASSIGNED";
/** Способ, которым игра игрока подтверждает, кто он, по словам Reunion, например `"steam"` или `"revEmu"`; `"unknown"` на сервере без Reunion. */
export type AuthType = "unknown" | "steam" | "steamEmu" | "revEmu" | "revEmu2013" | "oldRevEmu" | "sc2009" | "avsmp" | "sxei" | "sse3" | "dproto" | "hltv";
/** Оружие, которое может держать игрок, по имени класса, например `"weapon_ak47"` или `"weapon_knife"`. */
export type WeaponName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90";
/** Предмет, который выдаёт `player.give`: оружие, броня (`"item_kevlar"`, `"item_assaultsuit"`) или набор сапёра (`"item_thighpack"`). */
export type ItemName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90" | "item_kevlar" | "item_assaultsuit" | "item_thighpack";
/** @hidden Every weapon's class name: what Ham Sandwich hooks a weapon's event on for "every weapon". */
export declare function __weaponClassnames(): string[];
/** Модуль AMX Mod X, наличие которого плагин может проверить, — одно из `"reapi"`, `"cstrike"`, `"fun"`, `"hamsandwich"`, `"engine"`, `"fakemeta"`. */
export type ModuleName = "reapi" | "cstrike" | "fun" | "hamsandwich" | "engine" | "fakemeta";
/**
 * `true`, если на сервере есть модуль: `if (hasModule("reapi")) ...`.
 * Проверяйте перед нативом, который есть только в одном модуле.
 *
 * Pawn: `LibraryExists`, `module_exists`
 */
export declare function hasModule(name: ModuleName): boolean;
/** @hidden Whether the server has reapi: the hood's choice of backend, made once. */
export declare function __hasReapi(): bool;
/**
 * @hidden A line in the console the first time it is said: what this server
 * cannot do, where a plugin asks for it - not on every call, which a field
 * read in a frame listener makes every frame.
 */
export declare function __sayOnce(text: string): void;
/** Параметры `player.kill()`. */
export interface KillOptions {
    /** Фраги игрока не меняются: штрафа за самоубийство нет. */
    keepFrags?: boolean;
}
import { Button } from "./flags";
/**
 * Один шаг бота, `bot.move({ ... })`: скорости — в единицах в секунду, как их
 * дают клавиши игрока: `250` — бег с ножом, `-250` — назад.
 */
export interface MoveOptions {
    /** Вперёд, или назад, если число отрицательное. */
    forward?: number;
    /** Вправо, или влево, если число отрицательное. */
    side?: number;
    /** Вверх, или вниз, если число отрицательное: в воде и на лестнице. */
    up?: number;
    /** Кнопки, зажатые на время шага: `["jump", "duck"]`. */
    buttons?: Button[];
    /** Направление взгляда бота, `[pitch, yaw, roll]` или Vector; если не задано — куда он смотрит сейчас. */
    angles?: number[];
    /** Длительность шага в миллисекундах, от `1` до `255`; если не задано — время кадра сервера. */
    msec?: number;
}
/**
 * Подключающийся игрок — в `"connect"`, `"authorized"` и `"putInServer"`: имя,
 * адрес, SteamID и команда, но ещё без здоровья и оружия. Любой Player — тоже
 * Client.
 *
 * ```ts
 * server.addEventListener("putInServer", (event) => {
 * 	print(event.player, `Welcome, ${event.player.name}!`);
 * });
 * ```
 */
export interface Client {
    /** Слот игрока, от `1` до `32`. */
    readonly id: number;
    /** Имя игрока. */
    readonly name: string;
    /** IP-адрес игрока без порта, например `"192.168.0.10"`. */
    readonly ip: string;
    /** SteamID игрока, например `"STEAM_0:1:12345"`. У бота — `"BOT"`, у HLTV — `"HLTV"`; пока Steam не подтвердил игрока — `"STEAM_ID_PENDING"` (дождитесь события `"authorized"`), на LAN-сервере — `"STEAM_ID_LAN"`. С Reunion игра без Steam получает SteamID, сделанный из её ключа (`authKey`): `"STEAM_..."` или `"VALVE_..."`, как скажут настройки Reunion на сервере. */
    readonly steamId: string;
    /** Способ, которым игра игрока подтвердила, кто он, по словам Reunion: одно из `"steam"` (игра из Steam), `"steamEmu"`, `"revEmu"`, `"revEmu2013"`, `"oldRevEmu"`, `"sc2009"`, `"avsmp"`, `"sxei"`, `"sse3"` (игра без Steam — по эмулятору, которым она подтвердила себя), `"dproto"`, `"hltv"` или `"unknown"` на сервере без Reunion. */
    readonly authType: AuthType;
    /** Сетевой протокол игры игрока: `48` у нынешней игры, `47` у старой, которую пускает Reunion. `0` на сервере без Reunion. */
    readonly protocol: number;
    /** Ключ, которым игра игрока подтвердила себя, как его прочитал Reunion: из него сделан SteamID игрока. `""` на сервере без Reunion. */
    readonly authKey: string;
    /** `true`, если это бот. */
    readonly isBot: boolean;
    /** `true`, пока игрок на сервере. */
    readonly isConnected: boolean;
    /** Права админа у игрока — по буквам из `users.ini`: `client.access.includes("cvar")`. */
    readonly access: Access[];
    /** Команда игрока, одно из `"TERRORIST"`, `"CT"`, `"SPECTATOR"` или `"UNASSIGNED"` (пока игрок ни в одну не вступил). Запись переводит игрока, как и `player.team`. */
    team: Team;
    /** `true`, если игрока никто не слышит в голосовом чате. Запись заглушает его или снимает заглушку. */
    muted: boolean;
    /** `true`, если в голосовом чате его слышат все игроки, с какой бы стороны они ни были. */
    heardByEveryone: boolean;
    /** `true`, если в голосовом чате он слышит всех игроков, с какой бы стороны они ни были. */
    hearsEveryone: boolean;
    /** Язык, на котором игрок читает текст сервера, например `"en"`, `"ru"`: тот, что для него выбирает `lang.translate`. */
    readonly language: string;
    /** Сигнал, который срабатывает, когда игрок уходит с сервера: `fetch(url, { signal: client.signal })`. */
    readonly signal: AbortSignal;
    /** Выполняет команду в консоли игрока, будто он сам её набрал: `client.command("stop")`. */
    command(text: string): void;
    /** Кикает игрока с сервера с причиной, которую он видит: `client.kick("Спам")`. */
    kick(reason?: string): void;
    /** Вводит игрока в сторону так, как игра вводит того, кто выбрал её в меню команд: `client.joinTeam("CT")`. `false`, если игра отказала. */
    joinTeam(team: Team): boolean;
    /** Спрашивает у игры игрока один из её кваров: `await client.queryCvar("fps_max")` — значение текстом или `null`, если такого квара в его игре нет. */
    queryCvar(name: string): Promise<string | null>;
}
/**
 * Игрок в игре: всё, что есть у Client, а также здоровье, броня, фраги,
 * оружие и экран.
 *
 * Событие об игроке передаёт его как `event.player`; `server.players`
 * возвращает всех на сервере.
 */
export declare class Player extends PlayerFields implements Client {
    constructor(id: number);
    /**
     * Имя игрока.
     *
     * Pawn: `get_user_name`
     */
    get name(): string;
    /**
     * Здоровье игрока. При появлении `100`. Если записать `0` или меньше, игрок умрёт.
     *
     * Pawn: `get_user_health`, `set_user_health`
     */
    get health(): number;
    set health(hp: number);
    /**
     * Броня игрока в очках: `100` с купленным бронежилетом, `0` без него.
     *
     * Pawn: `get_user_armor`, `set_user_armor`
     */
    get armor(): number;
    set armor(value: number);
    /**
     * Фраги игрока на табло.
     *
     * Pawn: `get_user_frags`, `set_user_frags`
     */
    get frags(): number;
    set frags(value: number);
    /**
     * Смерти игрока на табло. Запись сразу обновляет табло.
     *
     * Pawn: `cs_get_user_deaths`, `cs_set_user_deaths`
     */
    get deaths(): number;
    /** The deaths on the scoreboard; setting them tells the scoreboard too. */
    set deaths(value: number);
    /**
     * Команда игрока, одно из `"TERRORIST"`, `"CT"`, `"SPECTATOR"` или `"UNASSIGNED"`. Верна и
     * сразу после смены команды. Запись переводит игрока.
     *
     * Pawn: `cs_get_user_team`, `rg_set_user_team`
     */
    get team(): Team;
    /**
     * Moves the player to another team, as reapi's rg_set_user_team does: the
     * model is picked for the new team, the scoreboard is told, and the round's
     * win conditions are not checked - the caller decides when that happens.
     */
    set team(value: Team);
    /**
     * Вводит игрока в сторону так, как игра вводит того, кто выбрал её в меню
     * команд, а внешность выбирается за него: `player.joinTeam("CT")`. Только
     * что пришедший игрок после этого в игре и может появиться, чего
     * `player.team = ...` для него не делает. Живой игрок, отправленный в
     * зрители, тихо умирает: без смерти и без фрага. `false`, если игра отказала.
     *
     * Pawn: `rg_join_team`
     */
    joinTeam(team: Team): boolean;
    /**
     * IP-адрес игрока без порта, например `"192.168.0.10"`.
     *
     * Pawn: `get_user_ip`
     */
    get ip(): string;
    /**
     * SteamID игрока, например `"STEAM_0:1:12345"`. У бота — `"BOT"`, у HLTV — `"HLTV"`; пока Steam не подтвердил игрока — `"STEAM_ID_PENDING"` (дождитесь события `"authorized"`), на LAN-сервере — `"STEAM_ID_LAN"`. С Reunion игра без Steam получает SteamID, сделанный из её ключа (`authKey`): `"STEAM_..."` или `"VALVE_..."`, как скажут настройки Reunion на сервере.
     *
     * Pawn: `get_user_authid`
     */
    get steamId(): string;
    /**
     * Способ, которым игра игрока подтвердила, кто он, по словам Reunion: одно из `"steam"` (игра из Steam), `"steamEmu"`, `"revEmu"`, `"revEmu2013"`, `"oldRevEmu"`, `"sc2009"`, `"avsmp"`, `"sxei"`, `"sse3"` (игра без Steam — по эмулятору, которым она подтвердила себя), `"dproto"`, `"hltv"` или `"unknown"` на сервере без Reunion.
     *
     * Pawn: `REU_GetAuthtype`
     */
    get authType(): AuthType;
    /**
     * Сетевой протокол игры игрока: `48` у нынешней игры, `47` у старой, которую пускает Reunion. `0` на сервере без Reunion.
     *
     * Pawn: `REU_GetProtocol`
     */
    get protocol(): number;
    /**
     * Ключ, которым игра игрока подтвердила себя, как его прочитал Reunion: из него сделан SteamID игрока. `""` на сервере без Reunion.
     *
     * Pawn: `REU_GetAuthKey`
     */
    get authKey(): string;
    /**
     * `true`, пока игрок жив.
     *
     * Pawn: `is_user_alive`
     */
    get isAlive(): boolean;
    /**
     * `true`, пока игрок на сервере.
     *
     * Pawn: `is_user_connected`
     */
    get isConnected(): boolean;
    /**
     * `true`, если это бот.
     *
     * Pawn: `is_user_bot`
     */
    get isBot(): boolean;
    /**
     * Сигнал, который срабатывает, когда игрок уходит с сервера, с ошибкой
     * (Error) по имени `"AbortError"`; следующий игрок в этом слоте получает новый.
     *
     * ```ts
     * const response = await fetch(url, { signal: player.signal });
     * ```
     *
     * Асинхронный обработчик команды или события игрока уже работает под ним:
     * его `await` тихо прекращаются, когда игрок уходит.
     */
    get signal(): AbortSignal;
    /**
     * `true`, если игрока никто не слышит в голосовом чате — с alltalk и без.
     * Запись заглушает его или снимает заглушку; остальные настройки голоса
     * остаются.
     *
     * Pawn: `set_speak`, `SPEAK_MUTED`
     */
    get muted(): boolean;
    set muted(value: boolean);
    /**
     * `true`, если в голосовом чате его слышат все игроки, с какой бы стороны
     * они ни были, и без alltalk. Заглушка (`muted`) всё равно его глушит.
     *
     * Pawn: `set_speak`, `SPEAK_ALL`
     */
    get heardByEveryone(): boolean;
    set heardByEveryone(value: boolean);
    /**
     * `true`, если в голосовом чате он слышит всех игроков, с какой бы стороны
     * они ни были, и без alltalk: зритель, который слышит обе стороны.
     *
     * Pawn: `set_speak`, `SPEAK_LISTENALL`
     */
    get hearsEveryone(): boolean;
    set hearsEveryone(value: boolean);
    private setSpeak;
    /**
     * Язык, на котором игрок читает текст сервера, например `"en"`, `"ru"`:
     * тот, что для него выбирает `lang.translate`. Это его `setinfo lang` или
     * язык сервера, если своего у него нет или `amx_client_languages` равен `0`.
     *
     * Pawn: `get_user_info(id, "lang")`, `amx_language`
     */
    get language(): string;
    /**
     * Показывает строку текста на экране игрока:
     * `player.showHud("-35 HP", { color: [255, 40, 40], x: 0.02, y: 0.88, hold: 2 })`.
     * У каждой опции есть значение по умолчанию.
     *
     * Pawn: `set_hudmessage`, `show_hudmessage`
     */
    showHud(text: string, options?: HudOptions): void;
    /**
     * Проигрывает звук одному игроку, как рация, — он слышит его одинаково,
     * где бы ни стоял: `player.playSound("vox/one.wav")`. Путь — внутри
     * `sound/`, как его принимает `server.precache`.
     *
     * Pawn: `SendAudio`, `rg_send_audio`
     */
    playSound(sample: string): void;
    /** Эффекты на экране игрока: `player.screen.fade({ ... })`, `.shake(...)`, `.statusIcon(...)` — см. Screen. */
    get screen(): Screen;
    /**
     * Выдаёт игроку оружие или предмет: `player.give("weapon_flashbang")`.
     * `false`, если игра его не выдала.
     *
     * Pawn: `rg_give_item`, `give_item`
     */
    give(item: ItemName): boolean;
    /**
     * Отбирает у игрока всё оружие. Костюм (броня, HUD) остаётся, если
     * `removeSuit` не `true`.
     *
     * Pawn: `rg_remove_all_items`, `strip_user_weapons`
     */
    removeAllItems(removeSuit?: boolean): void;
    /**
     * Задаёт запас патронов игрока к оружию, которое у него есть: `player.setAmmo("weapon_flashbang", 2)`.
     *
     * Pawn: `rg_set_user_bpammo`, `cs_set_user_bpammo`
     */
    setAmmo(weapon: WeaponName, amount: number): void;
    /**
     * Запас патронов игрока к оружию, которое у него есть: `player.getAmmo("weapon_ak47")`;
     * для гранаты — сколько их у него. `0` для оружия, которого у него нет.
     *
     * Pawn: `rg_get_user_bpammo`, `cs_get_user_bpammo`
     */
    getAmmo(weapon: WeaponName): number;
    /**
     * Возрождает игрока в текущем раунде, на точке, которую выберет игра.
     *
     * Pawn: `rg_round_respawn`
     */
    respawn(): void;
    /**
     * Убивает игрока, как консольная команда `kill`. С
     * `{ keepFrags: true }` смерть не отнимает фрагов.
     *
     * Pawn: `user_kill`, `user_silentkill`
     */
    kill(options?: KillOptions): void;
    /**
     * Права админа у игрока — по буквам из `users.ini`:
     * `player.access.includes("cvar")`.
     *
     * Pawn: `get_user_flags`
     */
    get access(): Access[];
    /**
     * Даёт игроку в руки оружие, которое у него есть. `false`, если такого
     * нет.
     *
     * Pawn: `rg_switch_weapon`
     */
    switchWeapon(weapon: WeaponName): boolean;
    /**
     * Пересчитывает скорость игрока по оружию в руках — например, после
     * замедления.
     *
     * Pawn: `rg_reset_maxspeed`
     */
    resetMaxSpeed(): void;
    /**
     * Выполняет команду в консоли самого игрока, будто он набрал её сам:
     * `player.command("messagemode say_team")`, `player.command("stop")`.
     * Выполняет её игра игрока, а не сервер.
     *
     * Pawn: `client_cmd`
     */
    command(text: string): void;
    /**
     * Кикает игрока с сервера с причиной, которую он видит:
     * `player.kick("Спам")`; без неё — собственной причиной игры.
     *
     * Pawn: `server_cmd("kick #%d")`
     */
    kick(reason?: string): void;
    /**
     * Двигает бота, созданного `server.addBot`, как клавиши и мышь игрока за один
     * кадр: `bot.move({ forward: 250, buttons: ["jump"] })`. Сам бот ничего не
     * делает, поэтому его двигают каждый кадр — в событии `"frame"`, — иначе он
     * стоит на месте. Игрока, который не бот, метод отклоняет с ошибкой.
     *
     * Pawn: `engfunc(EngFunc_RunPlayerMove, ...)`
     */
    move(options?: MoveOptions): void;
    /**
     * Спрашивает у игры игрока один из её кваров: `await
     * player.queryCvar("fps_max")` — значение текстом, например `"100"`, или
     * `null`, если такого квара в его игре нет или она его не называет. Ответ —
     * то, что говорит его игра, заявление, которое чит может подменить. У бота
     * игры нет, и он сразу отвечает `null`; если игрок уходит раньше ответа,
     * промис отклоняется с `"AbortError"`.
     *
     * Pawn: `query_client_cvar`
     */
    queryCvar(name: string): Promise<string | null>;
}
/**
 * Вызывает натив, заполняющий текстовый буфер, и возвращает текст. Сам
 * натив передаётся аргументом:
 *
 *   readText(get_mapname)                 // "c21_kitty"
 *   readText(get_user_name, 32, id)       // так не надо: для этого есть Player.name
 */
export declare function readText(fill: (out: number, max: number) => number, max?: number): string;
/**
 * `id` игроков на сервере в виде массива. `flags`: `"a"` живые, `"b"` мёртвые,
 * `"c"` без ботов, `"h"` без HLTV, `"e"` только `team`. `server.players` — все,
 * как игроки, их фильтруют как массив.
 *
 * Pawn: `get_players`
 */
export declare function playerIds(flags?: string, team?: string): number[];
/** Параметры команды: кому она доступна и её описание в списке. */
export interface CommandOptions {
    /** Право админа, которое нужно игроку для команды; если не указано, команда доступна всем. */
    access?: Access;
    /** Описание команды, которое показывают `amx_help` и `server.commands`. */
    description?: string;
}
/** Команда, которую добавил плагин, как её перечисляет `server.commands`: то, что показывает `/help`. */
export declare class CommandInfo {
    /** Использование команды, как её набирают, например `"/kick <target> [reason]"`. */
    readonly usage: string;
    /** Описание команды, как его дала настройка `description`; `""`, если описания нет. */
    readonly description: string;
    /** Право админа, которое нужно команде; `null`, если пользоваться ей может каждый. */
    readonly access: Access | null;
    /** Команда ли это консоли сервера, а не игрока. */
    readonly server: boolean;
    constructor(
    /** The command's usage, as it is typed, e.g. `"/kick <target> [reason]"`. */
    usage: string, 
    /** The command's description, as its `description` option gave it; `""` without one. */
    description: string, 
    /** The admin right the command needs; `null` when everyone may use it. */
    access: Access | null, 
    /** Whether it is a command of the server console rather than a player's. */
    server: boolean);
}
/**
 * @hidden The words a command was typed with, as the build's code for one
 * command reads its arguments (scripts/typed-commands.ts): each by its place,
 * as its type says. A word that is not what the command takes answers the
 * one who typed it with the usage, and sets `failed`: the handler does not run.
 */
export declare class __CommandWords {
    /** The player who typed it; `null` for the server's console. */
    readonly player: Player | null;
    readonly usage: string;
    readonly words: string[];
    /** The line from each word on, as typed: what the last text argument takes. */
    readonly rests: string[];
    /** Set once a word is wrong: the one who typed it has been told. */
    failed: bool;
    constructor(
    /** The player who typed it; `null` for the server's console. */
    player: Player | null, usage: string, words: string[], 
    /** The line from each word on, as typed: what the last text argument takes. */
    rests: string[]);
    get count(): i32;
    /** The word at `at`; `""` when it was not typed. */
    text(at: i32): string;
    /** The rest of the line from the word at `at`. */
    rest(at: i32): string;
    /** The word at `at` as a number; a word that is not one fails. */
    number(at: i32): number;
    /** The word at `at`, one of `names`; another fails. */
    name(at: i32, names: string[]): string;
    /** The player the word at `at` names - `#userid`, the whole name or a part of it. None, or several, fails. */
    target(at: i32): Player | null;
    /** Whether at least `count` words were typed; fewer fails. */
    need(count: i32): bool;
    /** Whether no word is left over after the first `count`; one more fails. */
    done(count: i32): bool;
    /** Tells the one who typed it what was wrong, and the usage. */
    private fail;
}
/**
 * Переводит буквы из `users.ini` в права: `accessOf("abc")` —
 * [`"immunity"`, `"reservation"`, `"kick"`]. Неизвестные буквы пропускаются.
 *
 * Pawn: `read_flags`
 */
export declare function accessOf(letters: string): Access[];
/**
 * @hidden The hood of a game event Ham Sandwich delivers (as/hooks.ts):
 * `fn` hooked on the class, a reload taking its slot back, switched by `hook`.
 */
export declare function __ham(fn: i32, classname: string, handler: WideHandler, post: bool, hook?: __Switch | null): void;
/**
 * Вид HUD-сообщения. У каждого поля есть значение по умолчанию, так что
 * `{ color: [255, 40, 40] }` достаточно.
 *
 * Pawn: `set_hudmessage`
 */
export interface HudOptions {
    /** Цвет текста: красный, зелёный, синий, от `0` до `255`. */
    color?: number[];
    /** Положение по горизонтали: `0` — левый край, `1` — правый; `-1` — по центру. */
    x?: number;
    /** Положение по вертикали: `0` — верх, `1` — низ; `-1` — по центру. */
    y?: number;
    /** Время, которое сообщение держится на экране, в секундах. */
    hold?: number;
    /** Эффект появления, одно из: `"fade"` — плавно, `"flicker"` — мерцая, `"typewriter"` — по буквам. */
    effect?: HudEffect;
    /** Время появления в секундах. */
    fadeIn?: number;
    /** Время исчезания в секундах. */
    fadeOut?: number;
    /** Канал HUD, от `1` до `4`; `-1` — выбрать свободный. */
    channel?: number;
    /** Длительность эффектов `"flicker"` и `"typewriter"` в секундах. */
    effectTime?: number;
    /**
     * Крупные буквы — для итога или заголовка. Каналов у них нет, так что
     * `channel` не действует.
     *
     * Pawn: `set_dhudmessage`
     */
    large?: boolean;
}
/** Эффект появления HUD-сообщения, одно из: `"fade"` — плавно, `"flicker"` — мерцая, `"typewriter"` — по буквам. */
export type HudEffect = "fade" | "flicker" | "typewriter";
/**
 * Строка HUD для одного сообщения: новое заменяет прежнее, а не занимает
 * ещё один канал, — для обратного отсчёта, который перерисовывается каждую
 * секунду, для меняющегося предупреждения. `clear` убирает его раньше
 * времени.
 *
 * ```ts
 * const countdown = new HudLine();
 * countdown.show(player, `${left}`, { color: [255, 50, 50], hold: 1.1 });
 * countdown.clear(player);
 * countdown.clearAll();
 * ```
 *
 * Pawn: `CreateHudSyncObj`, `ShowSyncHudMsg`
 */
export declare class HudLine {
    private handle;
    /** Показывает игроку `text` на этой строке вместо того, что она показывала ему раньше. */
    show(player: Player, text: string, options?: HudOptions): void;
    /** Убирает сообщение строки с экрана игрока раньше времени. */
    clear(player: Player): void;
    /** Убирает сообщение строки со всех экранов. */
    clearAll(): void;
}
/** Направление затемнения, одно из: `"in"` — от цвета к чистому экрану, `"out"` — от чистого экрана к цвету. */
export type FadeDirection = "in" | "out";
/** Параметры `player.screen.fade`. Время — в секундах. */
export interface FadeOptions {
    /** Цвет: красный, зелёный, синий и альфа, от `0` до `255`; по умолчанию чёрный. */
    color?: number[];
    /** Длительность перехода в секундах; по умолчанию `1`. */
    duration?: number;
    /** Время, которое держится полный цвет, в секундах; по умолчанию `0`. */
    hold?: number;
    /** Направление затемнения, одно из: `"in"` (по умолчанию) — от цвета к чистому экрану, `"out"` — от чистого экрана к цвету. */
    direction?: FadeDirection;
    /** Цвет остаётся на экране до следующего затемнения. */
    stay?: boolean;
    /** Тонирует изображение на экране, а не закрашивает его. */
    modulate?: boolean;
}
/** Параметры `player.screen.shake`. */
export interface ShakeOptions {
    /** Сила тряски: насколько смещается вид, до 16 единиц; по умолчанию `4`. */
    amplitude?: number;
    /** Длительность тряски в секундах; по умолчанию `1`. */
    duration?: number;
    /** Частота тряски — толчков в секунду; по умолчанию `5`. */
    frequency?: number;
}
/** Параметры `player.screen.progressBar`. */
export interface ProgressBarOptions {
    /** Заполненность полосы в начале, в процентах; по умолчанию `0` — пустая. */
    startPercent?: number;
}
/** Состояние иконки статуса, одно из: `"hide"` — убрана, `"show"` — горит, `"flash"` — мигает. */
export type StatusIconState = "hide" | "show" | "flash";
/**
 * Эффекты, которые один игрок видит поверх мира: затемнение, тряска, иконки
 * статуса и части HUD, которые рисует сама игра.
 *
 * ```ts
 * player.screen.fade({ color: [0, 0, 0, 255], duration: 0.5, hold: 1, stay: true });
 * player.screen.shake({ amplitude: 8, duration: 1, frequency: 5 });
 * player.screen.statusIcon("dmg_cold", "show", [0, 160, 255]);
 * ```
 *
 * Время — в секундах. Обработчик сообщений слышит то, что шлёт экран, как
 * слышит сообщения игры: `"progressBar"` слышит `progressBar(seconds)`.
 *
 * Pawn: `ScreenFade`, `ScreenShake`, `StatusIcon`, ...
 */
export declare class Screen {
    private id;
    constructor(id: i32);
    private begin;
    /**
     * Окрашивает экран игрока с плавным переходом.
     *
     * Pawn: `ScreenFade`
     */
    fade(options?: FadeOptions): void;
    /**
     * Трясёт экран игрока.
     *
     * Pawn: `ScreenShake`
     */
    shake(options?: ShakeOptions): void;
    /**
     * Зажигает, заставляет мигать или убирает иконку статуса по имени спрайта
     * (`"dmg_cold"`, `"buyzone"`, `"c4"`, ...), в заданном цвете.
     *
     * Pawn: `StatusIcon`
     */
    statusIcon(sprite: string, state: StatusIconState, color?: number[]): void;
    /**
     * Выставляет таймер раунда вверху HUD игрока, в секундах. Отправляется
     * ненадёжно, как это делает сама игра: клиент с плохим соединением может
     * его пропустить.
     *
     * Pawn: `RoundTime`
     */
    roundTime(seconds: number): void;
    /**
     * Сразу скрывает части HUD игрока. Запись `player.hideHud` делает то же
     * кадром позже; этот метод — для случаев, когда это уже поздно.
     *
     * Pawn: `HideWeapon`
     */
    hideHud(parts: HideHud[]): void;
    /**
     * Показывает или скрывает стандартный прицел Counter-Strike на экране игрока.
     *
     * Pawn: `Crosshair`
     */
    crosshair(shown: boolean): void;
    /**
     * Выставляет иконку фонарика на HUD игрока: включён или выключен и заряд
     * батареи в процентах.
     *
     * Pawn: `Flashlight`
     */
    flashlight(on: boolean, battery?: number): void;
    /**
     * Показывает полосу прогресса посреди экрана игрока, которая заполняется за
     * `seconds` секунд; `0` её убирает. С `startPercent` она начинается уже
     * частично заполненной и заполняет остаток `seconds`:
     *
     * ```ts
     * player.screen.progressBar(4, { startPercent: 50 });   // наполовину полна, заполнится за 2 секунды
     * ```
     *
     * Pawn: `BarTime`, `BarTime2`, `rg_send_bartime`, `rg_send_bartime2`
     */
    progressBar(seconds: number, options?: ProgressBarOptions): void;
}
/**
 * Канал, на котором играет звук, одно из `"auto"` (по умолчанию), `"weapon"`,
 * `"voice"`, `"item"`, `"body"`, `"stream"`, `"static"`. Новый звук на канале
 * сущности обрывает тот, что играет на нём; `"auto"` не обрывает никогда.
 */
export type SoundChannel = "auto" | "weapon" | "voice" | "item" | "body" | "stream" | "static";
/** Настройки `entity.emitSound`; у каждой есть значение по умолчанию. */
export interface SoundOptions {
    /** Канал сущности, на котором играет звук; по умолчанию `"auto"`. */
    channel?: SoundChannel;
    /** Громкость, от `0` до `1`; по умолчанию `1`. */
    volume?: number;
    /** Затухание звука с расстоянием: `0` слышен по всей карте, `0.8` (по умолчанию) — как шаги, `2` — только вблизи. */
    attenuation?: number;
    /** Высота в процентах: `100` (по умолчанию) — как записан, `50` — октавой ниже, до `255`. */
    pitch?: number;
}
/**
 * Файл, который игра прекэшировала, — спрайт, модель, звук, — как его
 * возвращает `server.precache`. Эффект принимает его там, где рисует спрайт
 * или модель:
 *
 * ```ts
 * const shock = server.precache("sprites/shockwave.spr");
 * effects.beamCylinder({ at: here, radius: 385, sprite: shock, life: 0.4, width: 60 });
 * ```
 */
export declare class Resource {
    /** Путь к файлу, как его получил `server.precache`, например `"sprites/shockwave.spr"`. */
    readonly path: string;
    constructor(
    /** The file's path, as `server.precache` was given it, e.g. `"sprites/shockwave.spr"`. */
    path: string);
    /**
     * Индекс файла в списке прекэша игры, как его принимает натив; `0`, пока
     * файл не прекэширован.
     */
    get index(): number;
}
/**
 * @hidden A forward the host relays, heard by `fn` (a one-cell handler) only
 * when its argument `arg` is `value`: the module compares it, so a forward
 * that comes often crosses into the plugin for that value alone.
 */
export declare function __onCell(event: string, fn: i32, arg: i32, value: i32): void;
/** @hidden Takes the handler `fn` of a forward the host relays off again: once its event has no listener left. */
export declare function __off(event: string, fn: i32): void;
/** @hidden Runs `register` from plugin_init on: now, or when it comes. */
export declare function __whenUp(register: () => void): void;
/** @hidden Runs `register` from plugin_precache on - or plugin_init, after a reload mid-map. */
export declare function __whenPrecache(register: () => void): void;
/**
 * Аргументы сообщения по месту, `0` — первый: число или текст, как их
 * записало сообщение.
 *
 * ```ts
 * server.addMessageListener("botProgress", (event) => {
 *   console.log(`${event.args.length} ${event.args.number(0)}`);
 * });
 * ```
 *
 * Pawn: `get_msg_args`, `get_msg_arg_*`, `set_msg_arg_*`
 */
export declare class MessageArgs {
    /** Число аргументов. */
    get length(): number;
    /** Текст ли аргумент на месте `index`; иначе это число. */
    isText(index: number): boolean;
    /** Аргумент на месте `index` как число: байт, short, координата, угол. */
    number(index: number): number;
    /** Аргумент на месте `index` как текст. */
    text(index: number): string;
    /** Записывает числовой аргумент: сообщение уходит с ним. */
    setNumber(index: number, value: number): void;
    /** Записывает текстовый аргумент: сообщение уходит с ним. */
    setText(index: number, value: string): void;
}
/**
 * Сообщение, которое сервер шлёт клиентам, — строка чата, часы раунда, значок
 * HUD, — услышанное по пути, до того как оно ушло:
 *
 * ```ts
 * server.addMessageListener("text", (event) => {
 *   if (event.text == "#Round_Draw") event.preventDefault();
 * });
 * ```
 *
 * У сообщения с известной раскладкой на каждый аргумент есть типизированное
 * поле (`event.text`), и запись в него меняет то, что получит клиент;
 * сообщение без известной раскладки читается по месту, через `event.args`,
 * которые есть у любого сообщения.
 *
 * Pawn: `register_message`
 */
export declare class ClientMessage {
    /** @hidden The player it goes to: the message's msg_entity. */
    __receiver: i32;
    /** Имя сообщения у игры, например `"TextMsg"` у `text`. */
    name: string;
    /** Игрок, которому идёт сообщение; `null` — сообщение всем. */
    get player(): Player | null;
    /** Аргументы сообщения по месту: `event.args.text(1)`. */
    get args(): MessageArgs;
    /**
     * Останавливает сообщение: клиент его не получит.
     *
     * Pawn: `return PLUGIN_HANDLED`
     */
    preventDefault(): void;
    /** @hidden Whether the message has the argument. */
    protected __has(arg: i32): bool;
    /** @hidden An argument as a number. */
    protected __number(arg: i32): f64;
    /** @hidden */
    protected __setNumber(arg: i32, value: f64): void;
    /** @hidden */
    protected __text(arg: i32): string;
    /** @hidden */
    protected __setText(arg: i32, value: string): void;
    /** @hidden Every text from the argument on. */
    protected __texts(arg: i32): string[];
    /** @hidden Writes the texts from the argument on, as many as the message has. */
    protected __setTexts(arg: i32, value: string[]): void;
    /** @hidden A player's number argument; `0` or past the players is none. */
    protected __player(arg: i32): Player | null;
    /** @hidden Three coordinates from the argument on. */
    protected __vector(arg: i32): Vector;
    /** @hidden */
    protected __setVector(arg: i32, value: number[]): void;
    /** @hidden `count` bytes from the argument on: a colour. */
    protected __bytes(arg: i32, count: i32): number[];
    /** @hidden */
    protected __setBytes(arg: i32, value: number[]): void;
    /** @hidden Whether the argument has the bit. */
    protected __bit(arg: i32, bit: i32): bool;
    /** @hidden Sets or clears one bit of the argument, keeping the others. */
    protected __setBit(arg: i32, bit: i32, on: bool): void;
}
/**
 * У игрока изменилось поле, которое плагины добавили в `Player`, — его
 * записал любой плагин, на TypeScript или Pawn:
 *
 * ```ts
 * server.addEventListener("playerChange", (event) => {
 *   print(event.player, event.value ? "You are protected" : "Your spawn protection is over");
 * }, { field: "spawnProtected" });
 * ```
 *
 * С `field` у `event.value` и `event.previous` тип поля; именованный
 * обработчик принимает `PlayerChangeEvent<"spawnProtected">`. Без него
 * слышно любое поле, а какое — говорит `event.field`.
 */
export declare class PlayerChangeEvent<F extends string = string> {
    /** @hidden What a change's event is told apart by, at compile time. */
    __playerChange: bool;
    /** @hidden The player's slot. */
    __slot: i32;
    /** @hidden The value before the change, as the module keeps it: a number, or a text. */
    __previousNumber: f64;
    /** @hidden */
    __previousText: string;
    /** @hidden The value after it. */
    __number: f64;
    /** @hidden */
    __text: string;
    /** Поле, которое изменилось, например `"spawnProtected"`; член поля-объекта — через точку, `"glow.enabled"`. */
    field: string;
    /** Игрок, у которого изменилось поле. */
    get player(): Player;
}
/** Третий аргумент `server.addEventListener`. */
export interface ServerListenerOptions {
    /**
     * Для `"playerChange"`: поле, которое слушают, например `"spawnProtected"`,
     * или член поля-объекта, `"glow.enabled"`; имя поля-объекта слышит
     * каждый его член. Без него — любое поле.
     */
    field?: string;
}
/** Событие, которое получает обработчик изменения квара: квар, старое и новое значение. */
export declare class CvarChangeEvent {
    /** Квар, который изменился. */
    cvar: Cvar;
    /** Значение квара до изменения, текстом. */
    oldValue: string;
    /** Новое значение квара, текстом. */
    value: string;
    constructor(
    /** The cvar that changed. */
    cvar: Cvar, 
    /** The cvar's value before the change, as text. */
    oldValue: string, 
    /** The cvar's new value, as text. */
    value: string);
}
/** Обработчик изменения квара: `(event) => ...`; старое и новое значение — в `event`. */
export type CvarListener = (event: CvarChangeEvent) => void;
/**
 * @hidden The start of every exported native. A Pawn plugin calls one from
 * its plugin_init at the earliest - often before the host's own - and by then
 * plugin_natives is over, so a Cvar the native makes (a register_cvar native
 * of the plugin's) is made at once rather than when this plugin's init comes.
 */
export declare function __nativeCall(): void;
/**
 * Квар сервера; читается и пишется, как `value` у поля ввода:
 *
 * ```ts
 * const freeze = new Cvar("mp_freezetime");
 * freeze.number = 5;
 * const speed = new Cvar("my_speed", "250");     // создаётся со значением 250, если его нет
 * speed.addEventListener("change", (event) => console.log(`${event.oldValue} -> ${event.value}`));
 * ```
 *
 * `value` — текст квара; `number` и `boolean` читают и пишут тот же квар как
 * число и как переключатель.
 *
 * Pawn: `get_cvar_pointer`, `create_cvar`, `get_pcvar_string`, `set_pcvar_num`, `hook_cvar_change`
 */
export declare class Cvar {
    /** Имя квара, как его знает консоль, например `"mp_timelimit"`. */
    name: string;
    private defaultValue;
    /**
     * Хэндл квара в движке; `0`, если такого квара на сервере нет.
     *
     * Pawn: `get_cvar_pointer`
     */
    pointer: i32;
    private listeners;
    private hooked;
    constructor(
    /** The cvar's name, as the console knows it, e.g. `"mp_timelimit"`. */
    name: string, defaultValue?: string | null);
    /**
     * @internal Находит или создаёт квар и начинает слушать его изменения. Cvar,
     * созданный на верхнем уровне плагина, ждёт `plugin_init`: создание квара, пока
     * плагины ещё загружаются, роняет сервер.
     */
    attach(): void;
    private hook;
    /** `true`, если такой квар есть на сервере. */
    get exists(): bool;
    /** Значение квара текстом, например `"250"`. */
    get value(): string;
    set value(text: string);
    /** Значение квара числом. Число без дробной части так и записывается: `"5"`, а не `"5.000000"`. */
    get number(): number;
    set number(value: number);
    /** Квар как переключатель: `true` при любом значении, кроме `0`. Запись `true` ставит `1`, `false` — `0`. */
    get boolean(): bool;
    set boolean(on: bool);
    /** Вызывает `listener` при каждом изменении значения квара. */
    addEventListener(type: "change", listener: CvarListener): void;
    /** Перестаёт вызывать обработчик, добавленный через `addEventListener`. */
    removeEventListener(type: "change", listener: CvarListener): void;
    /** @internal Вызывает обработчики изменения; это делает сервер, когда квар меняется. Плагин слушает через `addEventListener`. */
    dispatch(event: CvarChangeEvent): void;
}
/**
 * Сервер — цель событий, как в DOM: его события, команды, карта и папки
 * AMX Mod X. Используется через `server`:
 *
 * ```ts
 * server.addEventListener("putInServer", (event) => {
 *   print(event.player, "Welcome!");      // event — это PutinserverEvent
 * });
 * server.map;                             // "de_dust2"
 * server.maxPlayers;                      // 32
 * server.command("echo hi");
 * ```
 *
 * Имя события пишется строкой: редактор его подсказывает и передаёт
 * обработчику собственный тип события. Обработчик может пользоваться
 * переменными функции, в которой он написан, — это замыкание, как в JavaScript.
 */
export declare class Server {
    /**
     * Вызывает `listener` каждый раз, когда сервер шлёт клиенту сообщение
     * `name`, до того как оно ушло: обработчик читает его поля, меняет их или
     * останавливает его через `preventDefault()`.
     *
     * ```ts
     * server.addMessageListener("death", (event) => {
     *   if (event.headshot) console.log(`${event.killer?.name} - headshot - ${event.victim?.name}`);
     * });
     * ```
     *
     * Редактор подсказывает имена, и в описании каждого — собственное имя у игры:
     * `death` — это `DeathMsg` игры. Одно имя может слышать несколько
     * сообщений игры, которые означают одно и то же: `progressBar` — это
     * `BarTime` и `BarTime2`, а `event.name` говорит, какое из них пришло.
     *
     * Pawn: `register_message`
     */
    addMessageListener<K extends keyof ServerMessageMap>(name: K, listener: (event: ServerMessageMap[K]) => void): void;
    /** Перестаёт вызывать обработчик, добавленный через `addMessageListener`, — то же имя и ту же функцию. */
    removeMessageListener<K extends keyof ServerMessageMap>(name: K, listener: (event: ServerMessageMap[K]) => void): void;
    /**
     * Имя текущей карты, например `"de_dust2"`.
     *
     * Pawn: `get_mapname`
     */
    get map(): string;
    /**
     * Число слотов для игроков на сервере, например `32`.
     *
     * Pawn: `get_maxplayers`
     */
    get maxPlayers(): number;
    /**
     * Игроки на сервере, все подключённые, кроме HLTV-прокси; читается заново
     * при каждом обращении. Выборку сужает `filter` массива:
     *
     * ```ts
     * const alive = server.players.filter(player => player.isAlive);
     * const cts = server.players.filter(player => player.team === "CT" && !player.isBot);
     * ```
     *
     * Pawn: `get_players`
     */
    get players(): Player[];
    /**
     * Добавляет бота с именем `name`: игрока, которого ведёт сервер, — без игры за
     * ним и без своего разума: он стоит, где появился, пока плагин не двинет его
     * через `bot.move()`. `null`, если свободного слота нет. `"putInServer"`
     * срабатывает для него, как для любого, `bot.isBot` равно `true`, а
     * `bot.kick()` убирает его.
     *
     * ```ts
     * const bot = server.addBot("Dummy");
     * bot?.joinTeam("CT");
     * ```
     *
     * Pawn: `engfunc(EngFunc_CreateFakeClient)`, `dllfunc(DLLFunc_ClientConnect)`, `dllfunc(DLLFunc_ClientPutInServer)`
     */
    addBot(name: string): Player | null;
    /**
     * Папка конфигов AMX Mod X относительно папки игры — в том виде, в каком её
     * принимает `fs`: `addons/amxmodx/configs`, если сервер её не перенёс.
     *
     * ```ts
     * const text = fs.readFileSync(`${server.configsDir}/myplugin.ini`);
     * ```
     *
     * Pawn: `get_configsdir`
     */
    get configsDir(): string;
    /**
     * Папка AMX Mod X для файлов данных плагинов: `addons/amxmodx/data`, если сервер её не перенёс.
     *
     * Pawn: `get_datadir`
     */
    get dataDir(): string;
    /**
     * Выполняет команду в консоли сервера, как если бы её ввели там:
     * `server.command("changelevel de_dust2")`. Текст уходит как есть: `%` остаётся `%`.
     *
     * Pawn: `server_cmd`
     */
    command(text: string): void;
    /**
     * Команды, которые добавил этот плагин, игроков и сервера, в порядке
     * добавления: у каждой `usage`, `description` и `access` — то, что
     * печатает `/help`.
     *
     * ```ts
     * server.addCommand("/help", ({ player }) => {
     *   for (const command of server.commands) {
     *     if (command.access == null || player.access.includes(command.access)) print(player, command.usage);
     *   }
     * });
     * ```
     */
    get commands(): CommandInfo[];
    /**
     * @hidden A player's command, its words read by `run` - the parser the
     * build writes for each `addCommand` call (scripts/typed-commands.ts).
     */
    __addCommand(usage: string, run: (words: __CommandWords) => void, options?: CommandOptions): void;
    /** @hidden A command of the server console, its words read by `run`, as `__addCommand`'s are. */
    __addServerCommand(usage: string, run: (words: __CommandWords) => void): void;
    /** Показывает HUD-сообщение всем игрокам, с теми же настройками, что у `player.showHud`. */
    showHud(text: string, options?: HudOptions): void;
    /**
     * Прекэширует файл, чтобы игра могла им пользоваться, а игроки его скачали:
     * `const shock = server.precache("sprites/shockwave.spr")`. На верхнем уровне
     * файла он прекэшируется, когда грузится карта; в событии `"precache"` —
     * сразу. Звук пишется так, как его играет игра, — внутри `sound/`:
     * `"myplugin/hit.wav"`. Возвращает файл как `Resource` — то, что эффект
     * принимает вместо спрайта или модели.
     *
     * Pawn: `precache_model`, `precache_sound`, `precache_generic`
     */
    precache(path: string): Resource;
}
/** Сервер, на котором работает плагин: его события, команды и карта. */
export declare const server: Server;
/**
 * События игры (hookchain'ы reapi и функции Ham Sandwich) и управление
 * раундом — цель событий, как в DOM:
 *
 * ```ts
 * game.addEventListener("takeDamage", (event) => {
 *   if (event.player.isBot) event.preventDefault();
 * });
 * game.addEventListener("canPlayerHearPlayer", (event) => event.listener.team == event.sender.team);
 * game.addEventListener("fallDamage", (event) => event.result / 2, true);
 * ```
 *
 * Тип события следует из его имени. То, что возвращает обработчик, — ответ
 * игре: до действия игры он заменяет то, что игра сделала бы, после (`post`) —
 * её результат. Обработчик, который ничего не возвращает, оставляет решение
 * игре; `event.preventDefault()` блокирует без ответа. Значение не того типа —
 * ошибка и в редакторе, и при сборке.
 *
 * Правила игры — её поля: `game.isFreezeTime`, `game.ctWins`,
 * `game.roundWinner`.
 *
 * Pawn: `RegisterHookChain`, `RegisterHam`, `get_member_game`
 */
export declare class Game extends GameFields {
    /**
     * Вызывает `listener` каждый раз, когда игра выполняет `type`. С `true` —
     * или `{ post: true }` — после того как игра сделала своё, с её ответом в
     * `event.result`; по умолчанию — до этого, и может её остановить.
     * `classname` сужает его до одного класса сущностей, и до плагина доходят
     * только они: `{ classname: "weapon_knife" }`. Обработчик `"touch"` вместо
     * этого берёт классы, о которых речь: `{ toucher: "player", touched: "player" }`.
     *
     * Pawn: `RegisterHookChain`, `RegisterHam`, `register_touch`
     */
    addEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, options?: boolean | GameListenerOptions): void;
    /** Перестаёт вызывать обработчик, добавленный через `addEventListener`, — ту же функцию с теми же настройками. */
    removeEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, options?: boolean | GameListenerOptions): void;
    /**
     * Часы игры: секунды с начала карты. Поля сущностей, которые хранят момент, —
     * `nextThink`, `damageTime` — идут по ним:
     * `grenade.damageTime = game.time + 1`. Таймеры атаки — `nextPrimaryAttack`
     * оружия, `nextAttack` игрока — считаются от текущего момента:
     * `weapon.nextPrimaryAttack = 1` — это через секунду.
     *
     * Pawn: `get_gametime`
     */
    get time(): number;
    /**
     * Завершает раунд сейчас:
     *
     * ```ts
     * game.endRound({ winner: "TERRORIST" });                 // победа террористов, следующий раунд через 5 с
     * game.endRound({ winner: "draw", delay: 3 });            // ничья, следующий раунд через 3 с
     * game.endRound({ winner: "none", message: "" });         // тихий рестарт: без сообщения
     * ```
     *
     * Победитель определяет счёт, сообщение и звук (`"Terrorists Win!"`);
     * `message` и `sound` заменяют их, `""` — выключает.
     *
     * Pawn: `rg_round_end`
     */
    endRound(options: EndRoundOptions): void;
}
/**
 * Третий аргумент `game.addEventListener`: `true` означает
 * `{ post: true }`; обработчик `"touch"` называет классы, о которых речь.
 */
export interface GameListenerOptions {
    /** Вызывает обработчик после того, как игра сделала своё, с её ответом в `event.result`. */
    post?: boolean;
    /** Класс сущностей, на котором слушается событие, например `"weapon_knife"`: до обработчика доходят только его сущности. */
    classname?: string;
    /** Для `"touch"`: класс сущности, которая входит в другую, например `"player"`; если не задан — любой. */
    toucher?: string;
    /** Для `"touch"`: класс сущности, которой коснулись, например `"func_door"`; если не задан — любой. */
    touched?: string;
}
/**
 * Способ, которым одна сущность использует другую, — нажимает кнопку, открывает
 * дверь, — одно из `"off"`, `"on"`, `"set"` или `"toggle"`.
 *
 * Pawn: `USE_OFF`, `USE_ON`, `USE_SET`, `USE_TOGGLE`
 */
export type UseType = "off" | "on" | "set" | "toggle";
/** Настройки действия сущности, такого как `weapon.deploy()` или `entity.heal(...)`. */
export interface ActionOptions {
    /**
     * Вызываются ли и обработчики игры — этого плагина и всех остальных,
     * Pawn-плагинов тоже; по умолчанию `true`. `false` выполняет только
     * собственную функцию игры.
     *
     * Pawn: `ExecuteHamB`, `ExecuteHam`
     */
    hooks?: boolean;
}
/**
 * Две сущности коснулись: `toucher` вошла в `touched`. До обработчика
 * доходят только классы, которые он просил:
 *
 * ```ts
 * game.addEventListener("touch", onTouch, { toucher: "player", touched: "player" });
 * ```
 *
 * Pawn: `register_touch`
 */
export declare class TouchEvent {
    /** Сущность, которая вошла в другую. */
    toucher: Entity;
    /** Сущность, которой она коснулась. */
    touched: Entity;
    constructor(
    /** The entity that moved into the other. */
    toucher: Entity, 
    /** The entity it touched. */
    touched: Entity);
    /** Блокирует касание: игра на него не реагирует. */
    preventDefault(): void;
}
/** Победитель раунда, одно из `"TERRORIST"`, `"CT"`, `"draw"` или `"none"` — рестарт без победителя. */
export type RoundWinner = "TERRORIST" | "CT" | "draw" | "none";
/** Настройки `game.endRound`; обязателен только `winner`. */
export interface EndRoundOptions {
    /** Победитель раунда, одно из `"TERRORIST"`, `"CT"`, `"draw"` или `"none"` — рестарт. */
    winner: RoundWinner;
    /** Секунд до начала следующего раунда; по умолчанию `5`. */
    delay?: number;
    /** Сообщение посередине экрана или текст игры вроде `"#Terrorists_Win"`; `"default"` — обычное для этого победителя, `""` — без сообщения. */
    message?: string;
    /** Звук — радиофраза вроде `"terwin"`; `"default"` — обычный для этого победителя, `""` — без звука. */
    sound?: string;
    /**
     * `true` — оповестить обработчики `roundEnd` всех плагинов, в том числе
     * Pawn-плагинов, как когда игра сама завершает раунд. По умолчанию `false`:
     * обработчик `roundEnd`, который завершает раунд, вызвал бы сам себя.
     *
     * Pawn: `rg_round_end(..., trigger)`
     */
    dispatch?: boolean;
}
/** Игра, в которой работает плагин: её события (hookchain'ы reapi и функции Ham Sandwich), поля её правил и `endRound`. */
export declare const game: Game;
/**
 * Места, где показывается сообщение: `Variant.chat`, `center`, `console`,
 * `notify`. Обычная строка работает так же — `"center"`; незнакомое имя уходит
 * в чат.
 *
 * Pawn: `print_chat`, `print_center`, `print_console`, `print_notify`
 */
export declare namespace Variant {
    /** Строка в чате игрока. */
    const chat: string;
    /** Текст посередине экрана игрока. */
    const center: string;
    /** Строка в консоли игрока. */
    const console: string;
    /** Строка в консоли игрока, отправленная как уведомление; при `developer 1` CS показывает её ещё и в левом верхнем углу экрана. */
    const notify: string;
}
/** Место показа сообщения строкой, одно из `"chat"`, `"center"`, `"console"` или `"notify"`. */
export type VariantName = "chat" | "center" | "console" | "notify";
export { Flag } from "./constants";
export * from "./events";
import { FlagName, HookName } from "./constants";
import { Entity, GameFields, PlayerFields } from "./entities";
export { Entity, Weapon, WeaponKind, weaponKindOf } from "./entities";
export { RenderMode, RenderFx, MoveType, Solid, TakeDamage, DeadFlag, WaterLevel, Contents, FixAngle, HitGroup, ArmorType, ObserverMode, JoinState, GameMenu, PlayerModel, IgnoredChat, ThrowDirection, BloodColor, MusicState } from "./entities";
import { ServerMessageMap } from "./events";
/** Получатель сообщения вместе с местом показа: `{ id: 0, variant: "center" }`. `id` — `id` игрока, `0` — все. */
export interface Target {
    /** `id` игрока-получателя; `0` — все игроки. */
    id: number;
    /** Место показа сообщения, одно из `"chat"` (по умолчанию), `"center"`, `"console"` или `"notify"`. */
    variant?: VariantName;
}
/** Переводит цветовые метки строки чата (`!g`, `!r`, ...) в коды цвета для клиента и записывает в `swapTeam`, какой цвет команды нужен строке. Её вызывает `print`; экспортирована для тестов. */
export declare function paint(text: string): string;
/** Цвет команды, который последний вызов `paint()` выбрал для строки, — одно из `"TERRORIST"` (красный), `"CT"` (синий), `"SPECTATOR"` (серый) или `""` — цвет команды читающего. `print` читает его сразу после. */
export declare let swapTeam: string;
/**
 * Отправляет сообщение игроку или всем игрокам (`0`).
 *
 * ```ts
 * print(player, "Health restored!");                    // чат игрока
 * print(0, "Round starts in 5 seconds");                // чат всех игроков
 * print(player, "Health restored!", "center");          // посередине экрана игрока
 * print({ id: 0, variant: "center" }, "Go!");           // посередине экрана у всех
 * ```
 *
 * Первый аргумент — игрок, `id` игрока или `0` — все. Третий — где показать
 * сообщение, одно из `"chat"` (по умолчанию), `"center"` — посередине экрана, `"console"` —
 * в консоли игрока, `"notify"` — тоже в консоли; на экране CS показывает его
 * только при `developer 1`.
 *
 * Цветовые метки работают только в чате, и буква — тот же цвет, что в меню:
 * - `!y` жёлтый (обычный цвет чата), `!g` зелёный
 * - `!r` красный, `!b` синий, `!d` серый, `!t` цвет команды читающего
 *
 * Метки только для меню (`!w`, `!R`) из строки чата убираются. Красный, синий,
 * серый и `!t` делят один цвет команды на сообщение: побеждает первый.
 *
 * Pawn: `client_print`, `client_print_color`
 */
export declare function print<T extends Target | Client | number = Target>(to: T, message: string, variant?: VariantName): void;
/**
 * Словари сервера: файлы `data/lang`, строка на ключ и язык, и каждый игрок
 * читает их на своём.
 *
 * ```ts
 * lang.load("myplugin");                                        // data/lang/myplugin.txt
 * print(player, lang.translate(player, "MYPLUGIN_WELCOME", [player.name]));
 * ```
 *
 * Pawn: `register_dictionary`, `LookupLangKey`
 */
export declare namespace lang {
    /**
     * Загружает словарь `data/lang/<name>.txt`: `lang.load("myplugin")`.
     * `false`, если такого файла нет.
     *
     * Pawn: `register_dictionary`
     */
    function load(name: string): boolean;
    /**
     * Строка ключа на языке игрока, `null` — на языке сервера:
     * `lang.translate(player, "MYPLUGIN_WELCOME", [player.name])`.
     *
     * `%s`, `%d`, `%f` (`%.1f`, `%02d`, ...) заполняются из `args` по порядку;
     * тот, на который аргумента не хватило, остаётся как написан. Цветовые коды
     * словаря возвращаются метками — `\y` как `!y`, `^4` как `!g`, — так что
     * строка годится и для меню, и для чата. Ключ, которого нет ни в одном
     * словаре, возвращается как есть.
     *
     * Pawn: `LookupLangKey`, `format` с `%L`
     */
    function translate(player: Client | null, key: string, args?: string[]): string;
}
/**
 * Читает и задаёт квар по имени одним вызовом: `cvar.num("mp_freezetime")`.
 *
 * Для квара, который нужен не один раз, лучше `Cvar`: он создаёт недостающий
 * квар, слышит его изменения и читает его как текст, число или переключатель.
 */
export declare namespace cvar {
    /**
     * Значение квара целым числом: `cvar.num("mp_freezetime")`.
     *
     * Pawn: `get_cvar_num`
     */
    function num(name: string): number;
    /**
     * Задаёт квару целочисленное значение: `cvar.setNum("mp_freezetime", 5)`.
     *
     * Pawn: `set_cvar_num`
     */
    function setNum(name: string, value: number): void;
    /**
     * Значение квара текстом: `cvar.str("hostname")`.
     *
     * Pawn: `get_cvar_string`
     */
    function str(name: string): string;
    /**
     * Задаёт квару текст: `cvar.setStr("hostname", "My Server")`.
     *
     * Pawn: `set_cvar_string`
     */
    function setStr(name: string, value: string): void;
}
/**
 * Регистрирует консольную команду для игроков; обработчик получает `id`
 * игрока, который её ввёл. Обычно для этого берут `server.addCommand`.
 *
 * Pawn: `register_clcmd`
 */
export declare function cmd(pattern: string, handler: Handler, flag?: FlagName, info?: string): void;
/**
 * Регистрирует консольную команду для игроков, обработчик которой получает
 * сырые аргументы `(id, level, cid)`. `handled()` в обработчике не пускает
 * команду дальше, к другим плагинам.
 *
 * Pawn: `register_clcmd`
 */
export declare function cmdWide(pattern: string, handler: WideHandler, flag?: FlagName, info?: string): void;
/** Функция, которую запускает таймер: `() => ...`. */
export type TimerHandler = () => void;
/**
 * Запускает `handler` один раз через `ms` миллисекунд и возвращает дескриптор
 * таймера, как в браузере:
 *
 * ```ts
 * const handle = setTimeout(() => print(player, "Welcome!"), 2000);
 * clearTimeout(handle);
 * ```
 *
 * Обработчик может пользоваться переменными вокруг. Точность — один серверный кадр.
 *
 * Pawn: `set_task`
 */
export declare function setTimeout(handler: TimerHandler, ms?: number): number;
/** Настройки `sleep()`. */
export interface SleepOptions {
    /** AbortSignal, который отменяет ожидание: промис тогда отклоняется с причиной сигнала. */
    signal?: AbortSignal;
}
/**
 * Возвращает промис, который выполняется через `ms` миллисекунд, — так ждут
 * внутри async-функции:
 *
 * ```ts
 * await sleep(1000);
 * await sleep(5000, { signal: AbortSignal.timeout(2000) }); // отклоняется через 2 с
 * ```
 *
 * Точность — один серверный кадр. Внутри async-обработчика команды или
 * события игрока ожидание заканчивается и тогда, когда этот игрок выходит.
 *
 * Pawn: `set_task`
 */
export declare function sleep(ms: number, options?: SleepOptions): Promise<void>;
/**
 * Запускает `handler` каждые `ms` миллисекунд, пока его не остановит
 * `clearInterval`; возвращает дескриптор таймера.
 *
 * Pawn: `set_task` with the "b" flag
 */
export declare function setInterval(handler: TimerHandler, ms: number): number;
/**
 * Останавливает таймер с этим дескриптором. Уже сработавший или остановленный
 * таймер игнорируется. Остановить эти таймеры можно только так: task-нативы
 * Pawn их не видят.
 *
 * Pawn: `remove_task`
 */
export declare function clearTimeout(handle: number): void;
/** Останавливает интервал с этим дескриптором; то же, что `clearTimeout`. */
export declare function clearInterval(handle: number): void;
/**
 * Вызов Pawn-натива с хвостом `...`, собираемый по одному аргументу, —
 * низкоуровневый способ. Натив из `@amxts/core/natives` — обычная функция, и ему это
 * не нужно.
 *
 *   new Call(NATIVE_server_print).str("%s").str(text).run();
 *
 * Найдите `...` в объявлении натива. Аргументы до него передаются как есть,
 * через `num` или `str`. Число в хвосте передаётся через `ref` — по адресу, —
 * а `out(i)` читает то, что натив туда записал; строка везде идёт через `str`.
 *
 *   ExecuteHam(Ham:function, this, any:...)      num, num, then the tail
 *   SetHookChainArg(number, AType:type, any:...) num, num, then the tail
 *   ExecuteForward(handle, &ret, any:...)        num, ref for &ret, then tail
 *
 * Аргумент не того вида ломает вызов тихо и совсем в другом месте.
 */
export declare class Call {
    private id;
    private args;
    private mask;
    private cells;
    private held;
    private n;
    constructor(id: i32);
    /** Keeps an argument's cells alive until the call is done. */
    private hold;
    /** Puts an argument and its kind at the next place. */
    private push;
    private grow;
    /** Добавляет числовой аргумент как есть: индекс сущности, константу, количество. */
    num(value: number): Call;
    /** Добавляет дробный аргумент — тот, что натив объявляет как `Float:`. */
    float(value: f64): Call;
    /** Добавляет строковый аргумент — одинаково до `...` и в хвосте. */
    str(text: string): Call;
    /** Добавляет массив ячеек, который натив читает и может перезаписать, а следом — его длину. */
    buffer(cells: CellBuffer, length: number): Call;
    /**
     * Добавляет массив ячеек, в который пишет натив, в хвост `...`: его длина
     * идёт следом по адресу, как числа хвоста, — `get_member(id, member,
     * dest[], len)`.
     */
    tailBuffer(cells: CellBuffer, length: number): Call;
    /** Добавляет вектор: три дробных числа по одному адресу — координаты, углы, цвет. В отличие от `buffer`, длина за ним не идёт. */
    vec(x: f64, y: f64, z: f64): Call;
    /** Добавляет вектор, который заполняет натив; после `run` результат — в `cells`. */
    vecInto(cells: CellBuffer): Call;
    /**
     * Добавляет массив в хвост `...` форварда: `ExecuteForward` получает его
     * таким, каким его делает `PrepareArray`. `floats` передаёт числа как `Float:`.
     */
    array(values: number[], floats?: bool): Call;
    /** Добавляет число, передаваемое по адресу, — так передаётся аргумент хвоста `...`; `out` читает, что натив в него записал. */
    ref(value: number): Call;
    /** Значение, которое натив оставил в аргументе `ref` на этой позиции, после `run`. */
    out(index: i32): number;
    /** Число уже добавленных аргументов: позиция, которую займёт следующий. */
    get count(): i32;
    /**
     * Добавляет в хвост `...` место для текста, который пишет натив, с `text`
     * в начале; его длина идёт следом по адресу, как того ждёт `ret[], len`.
     * После `run` текст — в `cellsAt` этой позиции.
     */
    textInto(text: string, length: i32): Call;
    /** Ячейки по адресу аргумента на этой позиции, после `run`: вектор или текст, который записал натив. */
    cellsAt(index: i32): StaticArray<i32>;
    /** Вызывает натив с добавленными аргументами и возвращает его результат. */
    run(): number;
}
/**
 * Значение, которое натив возвращает через свой аргумент там, где Pawn
 * передаёт переменную, чтобы натив её заполнил: текст в `ret[], len`, число
 * в `&value`. Передайте его туда, где натив его ждёт; после вызова `value` —
 * то, что записал натив.
 *
 * ```ts
 * const reason = new Ref("");
 * if (!dllfunc(DLLFunc_ClientConnect, id, "Bot", "127.0.0.1", reason)) console.log(reason.value);
 * ```
 */
export declare class Ref<T> {
    /** Значение, которое записал натив; до вызова — то, с которого он начинает. */
    value: T;
    constructor(/** The value the native wrote; before the call, the one it starts with. */ value: T);
    /** @hidden Adds this to a call: text as room to write in with its length, a number or a boolean by address. */
    __push(call: Call, float: bool): void;
    /** @hidden Reads what the native wrote at this position of the call. */
    __back(call: Call, at: i32, float: bool): void;
}
/** @hidden What an argument left out of a native's `...` tail stands at: nothing is sent for it. */
export declare function __noArgument<T>(): T;
/**
 * @hidden A native's `...` tail of up to twelve arguments of any kind, onto
 * `call`, and the call run: what the generated wrappers of @amxts/core/natives call.
 * `floats` is the native's float table for this call (bit `i`: the tail's
 * argument `i` is a Float; TAIL_FLOAT_RESULT: so is the result) - a
 * plugin's number cannot say whether it is one. What the native wrote into
 * a vector or a Ref is read back into it.
 */
export declare function __callTail<A, B, C, D, E, F, G, H, I, J, K, L>(call: Call, floats: i32, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L): number;
/**
 * @hidden A field of a reapi field native, as T: a whole number or a Float
 * as a number (or a boolean), a vector as a Vector, text as a string. A T the
 * field is not reads as nothing, and the console says which one to write.
 */
export declare function __getField<T>(call: Call, kind: i32, element: number, native: string): T;
/**
 * @hidden Writes a field of a reapi field native from a value of its kind:
 * a number - a Float where the field is one - a boolean, a vector (a Vector or
 * any three numbers), text. A value of another kind writes nothing, and the
 * console says so. The native's result: 1 when it wrote.
 */
export declare function __setField<T>(call: Call, kind: i32, value: T, element: number, native: string): number;
/**
 * Регистрирует хукчейн reapi с сырым обработчиком из четырёх чисел — нижний
 * уровень под `game.addEventListener`, которым пользуется плагин.
 *
 * Имя — из reapi, без класса там, где он не нужен: `"restart_round"`,
 * `"player_spawn"`; редактор их дополняет. Числа за именами берутся из
 * инклудов reapi, поэтому инклуды должны быть от того reapi, что стоит на
 * сервере. Возвращает дескриптор хука.
 *
 * Pawn: `RegisterHookChain`, `EnableHookChain`, `DisableHookChain`
 */
export declare function hook(name: HookName, handler: WideHandler, post?: bool): number;
/** Имя, версия, автор и описание плагина для `plugin({ ... })`; их показывает `amxts_plugins` в консоли сервера. */
export interface PluginInfo {
    /** Имя плагина, например `"My Plugin"`. */
    name: string;
    /** Версия плагина, например `"1.0.0"`. */
    version: string;
    /** Автор плагина. */
    author: string;
    /** Описание плагина, одной строкой. */
    description?: string;
    /**
     * Pawn-инклуд, нативы которого реализует плагин, например `"myplugin.inc"`, из
     * `includes/` или рядом с плагином. Каждая экспортированная функция уходит в
     * Pawn так, как её объявляет инклуд, и Pawn-плагины подключают этот инклуд.
     */
    include?: string;
}
/**
 * Объявляет плагин: имя, версия, автор и описание — так их показывает список
 * плагинов сервера. Вызывается один раз, на верхнем уровне файла:
 *
 * ```ts
 * plugin({ name: "Hello", version: "1.0.0", author: "you", description: "An example" });
 * ```
 *
 * `include` — Pawn-инклуд, нативы которого реализует плагин.
 *
 * Pawn: `register_plugin`
 */
export declare function plugin(info: PluginInfo): void;
/**
 * Настройки модулей в `amxts.config.ts`, каждая — под `configKey` своего модуля.
 * Здесь пусто: модуль добавляет свой ключ, дополняя этот интерфейс в
 * `"@amxts/core"`, — `menus?: Partial<MenuCoreOptions>`, — и редактор проверяет
 * конфиг по нему.
 */
export interface ModuleOptions {
}
/**
 * Объявляет модуль: `export default defineModule<Options>({ meta, requires,
 * defaults, setup })` в файле модуля. `setup` выполняется один
 * раз, когда сервер загружает модуль, — с `defaults` и тем, что поверх них
 * задаёт `amxts.config.ts`. Глобальная; `import { defineModule } from "@amxts/core"` тоже работает.
 */
export declare function defineModule<T>(definition: AmxtsModule<T>): AmxtsModule<T>;
/**
 * Плагин, чей вызов модуль выполняет сейчас, — числом: то, что модуль хранит
 * для этого плагина, — созданное им меню, переданную им функцию, — помечается
 * этим числом и убирается, когда `onPluginStop()` даёт то же число. `0`, когда
 * вызова другого плагина нет: собственный плагин модуля, его нативы для
 * Pawn-плагинов, его события и таймеры.
 *
 * ```ts
 * export function addRule(test: Rule) {
 * 	rules.push({ test, from: callingPlugin() });
 * }
 * ```
 */
export declare function callingPlugin(): number;
/**
 * Вызывает `listener`, когда останавливается плагин, вызывавший модуль, —
 * выгружен, перезагружен или не загрузился, — с числом, которое давал
 * `callingPlugin()` во время его вызовов. Модуль убирает то, что этот плагин
 * ему дал: перезагруженный плагин — новый, он даёт всё заново, а функция
 * остановленного ничего не отвечает.
 *
 * ```ts
 * onPluginStop((plugin) => {
 * 	rules = rules.filter(rule => rule.from != plugin);
 * });
 * ```
 */
export declare function onPluginStop(listener: (plugin: number) => void): void;
/** @hidden as/remote.ts: a call of the run `from` starts; the run whose call ran before it, to give back. */
export declare function __callFrom(from: i32): i32;
/** @hidden as/remote.ts: the plugin of the run `run` stopped. */
export declare function __pluginStopped(run: i32): void;
/**
 * Правило остановки форварда, одно из: `"never"` — его слышат все плагины, что бы они
 * ни вернули; `"handled"` — его останавливает первый плагин, который сообщил,
 * что обработал форвард.
 *
 * Pawn: `ET_IGNORE`, `ET_STOP`
 */
export type ForwardStop = "never" | "handled";
/** Заглушка для неиспользуемого аргумента типа у `Forward`: у `Forward<number>` один аргумент. */
export declare class NoArgument {
}
/** What subscribe() hangs on: a Forward, reached by its tag - see forwardTrampoline. */
declare abstract class ForwardListener {
    abstract deliver(): void;
}
/**
 * Форвард, который слушают другие плагины — и Pawn, и TypeScript. Его
 * аргументы — параметры типа, до 32 — столько, сколько AMX Mod X даёт форварду:
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
 * swapped.emit(catcher, caught);              // Pawn получает их id
 * ```
 *
 * Pawn-плагин слушает его через `public myplugin_on_round_end(winner)`, как
 * обычно, TypeScript-плагин — через `subscribe(handler)`. number, boolean и
 * Player (его `id`) приходят в Pawn числами, `Float` — Float, string —
 * строкой, `number[]` и `Vector` — массивом. `Team` и
 * `RoundWinner` уходят числом Pawn там, где инклуд объявляет форвард с таким
 * тегом; `Team` для форварда, которого нет ни в одном инклуде, — ошибка сборки.
 *
 * Форвард создаётся при первом emit или раньше, вызовом `create()`, — когда
 * все плагины уже загружены (`plugin_cfg` или позже), иначе загруженные после
 * него его не услышат.
 *
 * Pawn: `CreateMultiForward`, `ExecuteForward`
 */
export declare class Forward<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument, T13 = NoArgument, T14 = NoArgument, T15 = NoArgument, T16 = NoArgument, T17 = NoArgument, T18 = NoArgument, T19 = NoArgument, T20 = NoArgument, T21 = NoArgument, T22 = NoArgument, T23 = NoArgument, T24 = NoArgument, T25 = NoArgument, T26 = NoArgument, T27 = NoArgument, T28 = NoArgument, T29 = NoArgument, T30 = NoArgument, T31 = NoArgument, T32 = NoArgument> extends ForwardListener {
    /** Имя форварда, под которым его слушают Pawn-плагины. */
    name: string;
    private crossing;
    /** Правило остановки форварда, одно из `"never"` (по умолчанию) или `"handled"`. Задаётся до первого emit. */
    stopWhen: ForwardStop;
    private handle;
    private tag;
    private handlers;
    /**
     * @param name The forward's name, as Pawn plugins hook it.
     * @param crossing @internal Written by the build from the forward's Pawn
     * declaration in an include, or its types; a plugin leaves it out.
     */
    constructor(
    /** The forward's name, as Pawn plugins listen to it. */
    name: string, crossing?: string);
    /**
     * Вызывает `handler` при каждом срабатывании форварда — из этого плагина,
     * другого TypeScript-плагина или Pawn-плагина:
     *
     * ```ts
     * const greeted = new Forward<string, number>("showcase_on_greeted");
     * greeted.subscribe((name, count) => console.log(`${name}: ${count}`));
     * ```
     *
     * Параметры обработчика получают типы форварда; именованная функция может
     * принимать их меньше. Форвард, созданный Pawn-плагином, доходит до
     * TypeScript, только если он объявлен в одном из инклудов хост-плагина
     * amxts; отправленный из TypeScript доходит до всех подписчиков.
     */
    subscribe(handler: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13, a14: T14, a15: T15, a16: T16, a17: T17, a18: T18, a19: T19, a20: T20, a21: T21, a22: T22, a23: T23, a24: T24, a25: T25, a26: T26, a27: T27, a28: T28, a29: T29, a30: T30, a31: T31, a32: T32) => void): void;
    /** Перестаёт вызывать обработчик, переданный в `subscribe()`. */
    unsubscribe(handler: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13, a14: T14, a15: T15, a16: T16, a17: T17, a18: T18, a19: T19, a20: T20, a21: T21, a22: T22, a23: T23, a24: T24, a25: T25, a26: T26, a27: T27, a28: T28, a29: T29, a30: T30, a31: T31, a32: T32) => void): void;
    /** Передаёт аргументы форварда всем обработчикам из `subscribe()`; вызывает это сервер, а не плагин. */
    deliver(): void;
    /**
     * Создаёт форвард сейчас, а не при первом emit; повторные вызовы ничего не делают.
     *
     * Pawn: `CreateMultiForward`
     */
    create(): void;
    /**
     * Отправляет форвард всем плагинам, которые его слушают; `true`, если он ушёл.
     *
     * Pawn: `ExecuteForward`
     */
    emit(a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12, a13?: T13, a14?: T14, a15?: T15, a16?: T16, a17?: T17, a18?: T18, a19?: T19, a20?: T20, a21?: T21, a22?: T22, a23?: T23, a24?: T24, a25?: T25, a26?: T26, a27?: T27, a28?: T28, a29?: T29, a30?: T30, a31?: T31, a32?: T32): boolean;
}
/**
 * Хранилище текста по ключу на диске: Map, который переживает смену карты и
 * перезапуск сервера.
 *
 * ```ts
 * const demos = new Storage("core_demo_counters");
 * const last = demos.get(auth);      // string | null
 * demos.set(auth, "3");
 * if (demos.has(auth)) ...
 * demos.delete(auth);
 * ```
 *
 * Файл называется по имени хранилища, лежит в папке `vault` в папке данных
 * AMX Mod X и открывается при первом обращении. Значения — текст: число
 * кладётся через `toString()`, а читается через `parseInt`.
 *
 * Pawn: `nvault_open`, `nvault_get`, `nvault_set`, `nvault_remove`
 */
export declare class Storage {
    /** Имя хранилища — оно же имя его файла. */
    name: string;
    private vault;
    constructor(
    /** The storage's name, which is also its file's name. */
    name: string);
    /** Значение по ключу `key` или `null`, если его нет. */
    get(key: string): string | null;
    /** Записывает `value` по ключу `key`, заменяя прежнее значение. */
    set(key: string, value: string): void;
    /** `true`, если по ключу `key` есть значение. */
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
export * from "./effects";
export * from "./fetch";
export { EntityFilter } from "./entities";
/**
 * Публичная функция другого плагина — паблик Pawn-плагина или имя
 * `publicFor` TypeScript-плагина, — которую можно вызвать отсюда:
 *
 * ```ts
 * const fn = PawnFunction.find(caller(), "OnAction");       // null, если такой нет
 * if (fn != null) fn.call().int(id).text("KEY").run();
 * const call = fn.call().int(id).int(target).buffer(256).int(255);
 * call.run();
 * const value = call.bufferText;                            // что она записала в value[]
 * ```
 *
 * Pawn: `get_func_id`, `callfunc_begin_i`
 */
export declare class PawnFunction {
    /** `id` плагина, которому принадлежит функция. */
    readonly plugin: i32;
    /**
     * Индекс функции в её плагине.
     *
     * Pawn: `get_func_id`
     */
    readonly index: i32;
    constructor(
    /** The `id` of the plugin the function belongs to. */
    plugin: i32, 
    /**
     * The function's index in its plugin.
     *
     * Pawn: `get_func_id`
     */
    index: i32);
    /**
     * Находит паблик `name` в плагине с этим `id` (`caller()` натива); `null`, если
     * такого паблика у плагина нет.
     *
     * Pawn: `get_func_id`
     */
    static find(plugin: number, name: string): PawnFunction | null;
    /** Начинает вызов функции: добавьте её аргументы по порядку, затем `run()`. */
    call(): PawnCall;
}
/**
 * Один вызов PawnFunction: её аргументы по порядку, затем `run()`. Строк и
 * массивов можно передать сколько угодно, а то, что функция записала в
 * `buffer()`, потом читается из `bufferText`.
 *
 * Pawn: `callfunc_push_int`, `callfunc_push_str`, `callfunc_push_array`, `callfunc_end`
 */
export declare class PawnCall {
    private fn;
    private kinds;
    private ints;
    private texts;
    private cells;
    /** Текст, который функция записала в свой `buffer()`, после `run()`. */
    bufferText: string;
    constructor(fn: PawnFunction);
    /** Добавляет числовой аргумент. */
    int(value: number): PawnCall;
    /** Добавляет логический аргумент; функция получает `1` или `0`. */
    bool(value: boolean): PawnCall;
    /** Добавляет строковый аргумент. */
    text(value: string): PawnCall;
    /** Добавляет массив из `size` ячеек, который заполняет функция, — её `value[]`; один на вызов. Текст потом — в `bufferText`. */
    buffer(size: number): PawnCall;
    /** Вызывает функцию и возвращает её результат или `0`, если вызвать не удалось. */
    run(): number;
    private add;
}
/**
 * Создаёт `Array:` AMX Mod X по `cellSize` ячеек на элемент и возвращает его дескриптор.
 *
 * Pawn: `ArrayCreate`
 */
export declare function createCellArray(cellSize: number): number;
/**
 * Освобождает `Array:`, созданный `createCellArray`; после этого дескриптор недействителен.
 *
 * Pawn: `ArrayDestroy`
 */
export declare function destroyCellArray(handle: number): void;
/**
 * Читает все элементы `Array:` по `cellSize` ячеек на элемент, каждый — массивом чисел.
 *
 * Pawn: `ArrayGetArray`
 */
export declare function cellArrayRows(handle: number, cellSize: number): number[][];
/**
 * Добавляет в конец `Array:` один элемент — массив чисел.
 *
 * Pawn: `ArrayPushArray`
 */
export declare function pushCellArrayRow(handle: number, row: number[]): void;
/** Читает Pawn-строку из `count` ячеек строки таблицы, начиная со `start`: по байту UTF-8 на ячейку, до первого нуля. */
export declare function cellsText(row: number[], start: number, count: number): string;
/** Записывает текст в `count` ячеек Pawn-строки: не больше `count - 1` байт, без половинок букв, остаток — нули. */
export declare function textCells(text: string, count: number): number[];
/** Переводит цветовые метки меню (`!y`, `!R`, ...) в коды, которыми рисует игра, и убирает метки только для чата (`!g`, `!b`, `!t`) и собственные коды игры, записанные в текст (`\y`); любой другой `!` остаётся. Её вызывает `showMenu`, а модуль отдаёт её результат в Pawn. */
export declare function menuColors(text: string): string;
/**
 * Текст из Pawn — строка словаря, аргумент Pawn-плагина — с цветовыми кодами,
 * ставшими метками: коды меню `\y` `\r` `\d` `\w` `\R` — это `!y` `!r`
 * `!d` `!w` `!R`, а байты чата `^1` `^3` `^4` — `!y` `!t` `!g`.
 */
export declare function colorTags(text: string): string;
/**
 * Показывает игроку старое меню любой длины: `keys` — клавиши, которые оно
 * принимает, `title` — имя, под которым приходят нажатия.
 *
 * Цветовые метки, те же буквы, что в чате: `!y` жёлтый, `!r` красный, `!d` серый,
 * `!w` белый, `!R` — к правому краю. Метки только для чата (`!g`, `!b`, `!t`)
 * убираются, как и собственные коды игры (`\y`): текст пишется метками.
 *
 * Pawn: `show_menu`, `register_menucmd`
 */
export declare function showMenu(id: number, keys: number, text: string, title: string): void;
/** Цвет номеров пунктов меню: цветовой тег меню, `"!y"`, `"!r"`, `"!d"` или `"!w"`. */
export type MenuColor = "!y" | "!r" | "!d" | "!w";
/** Настройки `Menu`: его страницы и тексты его собственных пунктов. */
export interface MenuOptions {
    /**
     * Пунктов на странице, не больше `7`: под ними идут «Назад», «Дальше» и «Выход».
     * `0` ставит все пункты на одну страницу, без «Назад» и «Дальше», — не больше `10`.
     *
     * Pawn: `MPROP_PERPAGE`
     */
    perPage?: number;
    /**
     * Есть ли у меню пункт «Выход»; по умолчанию `true`.
     *
     * Pawn: `MPROP_EXIT`
     */
    exit?: boolean;
    /**
     * Текст пункта «Назад»; по умолчанию `"Back"` AMX Mod X на языке игрока.
     *
     * Pawn: `MPROP_BACKNAME`
     */
    backText?: string;
    /**
     * Текст пункта «Дальше»; по умолчанию `"More"` AMX Mod X.
     *
     * Pawn: `MPROP_NEXTNAME`
     */
    nextText?: string;
    /**
     * Текст пункта «Выход»; по умолчанию `"Exit"` AMX Mod X.
     *
     * Pawn: `MPROP_EXITNAME`
     */
    exitText?: string;
    /**
     * Цвет номеров пунктов; по умолчанию `"!r"`, красный.
     *
     * Pawn: `MPROP_NUMBER_COLOR`
     */
    numberColor?: MenuColor;
}
/** Контекст, который получают функции меню: игрок, которому оно показано, само меню и данные, с которыми его показали. */
export interface MenuContext<Data extends object = object> {
    /** Игрок, которому показано меню. */
    player: Player;
    /** Само меню: `menu.show(player, data)` оставляет его открытым после выбора. */
    menu: Menu<Data>;
    /** Данные, которые получил `show`. */
    data: Data;
}
/** Пункт `Menu`: его заголовок, когда он показан и доступен и что делает его выбор. */
export interface MenuItemOptions<Data extends object = object> {
    /** Текст пункта — или функция, которая даёт его для игрока, которому он показан. */
    title: string | ((context: MenuContext<Data>) => string);
    /** Может ли игрок его выбрать; недоступный рисуется серым и ничего не делает. По умолчанию `true`. */
    enabled?: boolean | ((context: MenuContext<Data>) => boolean);
    /** Показан ли он вообще; скрытый пункт не занимает места. По умолчанию `true`. */
    visible?: boolean | ((context: MenuContext<Data>) => boolean);
    /** Действие пункта, которое выполняется, когда игрок его выбирает. Меню закрывается, если эта функция не покажет его снова. */
    onSelect: (context: MenuContext<Data>) => void;
}
/**
 * Меню самого AMX Mod X: пункты, которые игрок выбирает цифровыми клавишами,
 * на страницах с «Назад» и «Дальше», и «Выход». `Data` — то, с чем его
 * показывают; это получают его функции рядом с игроком.
 *
 * ```ts
 * interface ShopData {
 *   category: string;
 * }
 *
 * const shop = new Menu<ShopData>("!yShop");
 * shop.addItem({
 *   title: "Armor - $1000",
 *   enabled: ({ player }) => player.armor < 100,
 *   onSelect: ({ player }) => {
 *     player.armor = 100;
 *   },
 * });
 * shop.show(player, { category: "armor" });
 * ```
 *
 * Заголовок и у каждого пункта заголовок, `visible` и `enabled` вычисляются
 * при каждом `show`, для этого игрока. Цветовые теги — как в `showMenu`: `!y`
 * жёлтый, `!r` красный, `!d` серый, `!w` белый, `!R` — к правому краю.
 *
 * Pawn: `menu_create`, `menu_setprop`
 */
export declare class Menu<Data extends object = object> {
    private readonly title;
    private readonly options;
    private readonly items;
    constructor(title: string | ((context: MenuContext<Data>) => string), options?: MenuOptions);
    /**
     * Добавляет пункт: его заголовок, когда он показан и доступен и что делает
     * его выбор.
     *
     * ```ts
     * shop.addItem({
     *   title: ({ player }) => `Heal (${player.health} HP)`,
     *   visible: ({ player }) => player.isAlive,
     *   enabled: ({ player }) => player.health < 100,
     *   onSelect: ({ player }) => {
     *     player.health = 100;
     *   },
     * });
     * ```
     *
     * Pawn: `menu_additem`
     */
    addItem(item: MenuItemOptions<Data>): void;
    /**
     * Показывает меню игроку, с данными, которые получают его функции; оно
     * закрывается, когда он выбирает пункт или выходит из меню.
     *
     * Pawn: `menu_display`
     */
    show(player: Player, data?: Data | null): void;
}
