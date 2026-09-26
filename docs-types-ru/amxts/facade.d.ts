/// <reference path="../as-types.d.ts" />
/// <reference path="./amxts.d.ts" />
import "./promise";
import { Vector } from "./vector";
/** Обработчик, который получает id игрока и ничего не возвращает, — так вызываются события игрока и команды. */
export type Handler = (id: number) => void;
/**
 * Обработчик, который получает до четырёх чисел и ничего не возвращает: для
 * форварда, который передаёт больше, чем id игрока, и для хукчейна.
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
/** Задаёт ответ обработчика числом, отличным от 0 и 1, — например, для Ham. */
export declare function outcome(value: number): void;
/**
 * Переводит число в ячейку `Float:` для Pawn — для сырого натива или `ret()`:
 *
 *   ret(floatCell(2.5));
 *   rg_round_end(floatCell(5.0), ...);
 */
export declare function floatCell(value: f64): number;
/**
 * Округляет число до ближайшего целого: время раунда 59.6 секунды — это 60,
 * а не 59.
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
 * принимающего колбэк по имени: register_message, register_touch,
 * query_client_cvar, set_native_filter.
 *
 * ```ts
 * const pub = publicFor(onDeathMsg, "msg:DeathMsg");
 * if (pub.length > 0) register_message(get_user_msgid("DeathMsg"), pub);
 * ```
 *
 * Пустое имя значит «уже зарегистрировано»: такую регистрацию нельзя
 * отменить, она переживает горячую перезагрузку, и повторная вызывала бы
 * обработчик дважды. `key` опознаёт регистрацию между перезагрузками — любое
 * имя, уникальное в пределах плагина. `fallback` — ответ, если обработчик
 * ничего не вернул: 0 почти везде, 1 там, где натив ждёт обработанное событие.
 *
 * Регистрируйте из события "cfg", а не с верхнего уровня файла: консольная
 * команда, зарегистрированная так рано (register_concmd, register_srvcmd),
 * роняет сервер, когда её вводят.
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
 * приходит к нему как Invalid_Array. Внутри TypeScript список — это
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
export declare function __strings(): i32;
/**
 * Читает аргумент выполняющегося обработчика по номеру; 0 — его первый
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
 * id плагина, который вызвал выполняющийся экспортированный натив, или -1.
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
/** Читает текст, который сырой натив из `~/natives` записал в массив ячеек. Обратно — `stringToCells`. */
export declare function cellsToString(cells: StaticArray<i32>): string;
/** Записывает текст в массив ячеек как строку Pawn — для сырого натива. */
export declare function stringToCells(text: string, cells: StaticArray<i32>): void;
/**
 * Передаёт строку сырому нативу из `~/natives` без объявления буфера под неё:
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
/** Длина текста, который вмещает буфер `out()`: 255. */
export declare const TEXT_MAX: i32;
/**
 * A player: the hand-written basics below, and every entvar and CBasePlayer
 * member as a typed property from as/entities.ts (`player.gravity`,
 * `player.hideHud`, `player.origin`).
 */
/** Команда Counter-Strike под именем, которое даёт ей игра: одно из "TERRORIST", "CT", "SPECTATOR", "UNASSIGNED". */
export type Team = "TERRORIST" | "CT" | "SPECTATOR" | "UNASSIGNED";
/** Оружие, которое может держать игрок, по имени класса, например "weapon_ak47" или "weapon_knife". */
export type WeaponName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90";
/** Предмет, который выдаёт `player.give`: оружие, броня ("item_kevlar", "item_assaultsuit") или набор сапёра ("item_thighpack"). */
export type ItemName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90" | "item_kevlar" | "item_assaultsuit" | "item_thighpack";
/**
 * Фильтр `Player.all`; все поля необязательны, например
 * `Player.all({ alive: true, team: "CT" })`.
 */
export interface PlayerFilter {
    /** Только живые игроки. */
    alive?: boolean;
    /** Только мёртвые игроки. */
    dead?: boolean;
    /** Только игроки этой команды, например "CT". */
    team?: Team;
    /** Только боты. */
    bots?: boolean;
    /** Только люди, без ботов. */
    humans?: boolean;
}
/** Модуль AMX Mod X, наличие которого плагин может проверить, — одно из "reapi", "cstrike", "fun", "hamsandwich", "engine", "fakemeta". */
export type ModuleName = "reapi" | "cstrike" | "fun" | "hamsandwich" | "engine" | "fakemeta";
/**
 * `true`, если на сервере есть модуль: `if (hasModule("reapi")) ...`.
 * Проверяйте перед нативом, который есть только в одном модуле.
 *
 * Pawn: `LibraryExists`, `module_exists`
 */
export declare function hasModule(name: ModuleName): boolean;
/** Параметры `player.kill()`. */
export interface KillOptions {
    /** Фраги игрока не меняются: штрафа за самоубийство нет. */
    keepFrags?: boolean;
}
/**
 * Подключающийся игрок — в "connect", "authorized" и "putinserver": имя,
 * адрес, SteamID и команда, но ещё без здоровья и оружия. Любой Player — тоже
 * Client.
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
    /** Имя игрока. */
    readonly name: string;
    /** IP-адрес игрока без порта, например "192.168.0.10". */
    readonly ip: string;
    /** SteamID игрока, например "STEAM_0:1:12345". У бота — "BOT", у HLTV — "HLTV"; пока Steam не подтвердил игрока — "STEAM_ID_PENDING" (дождитесь события "authorized"), на LAN-сервере — "STEAM_ID_LAN". */
    readonly authid: string;
    /** `true`, если это бот. */
    readonly isBot: boolean;
    /** `true`, пока игрок на сервере. */
    readonly isConnected: boolean;
    /** Права админа у игрока — по буквам из users.ini: `client.access.includes("Cvar")`. */
    readonly access: Access[];
    /** Команда игрока, одно из "TERRORIST", "CT", "SPECTATOR" или "UNASSIGNED" (пока игрок ни в одну не вступил). Запись переводит игрока, как и `player.team`. */
    team: Team;
    /** `true`, если игрока никто не слышит в голосовом чате. Запись заглушает его или снимает заглушку. */
    muted: boolean;
    /** Сигнал, который срабатывает, когда игрок уходит с сервера: `fetch(url, { signal: client.signal })`. */
    readonly signal: AbortSignal;
    /** Выполняет команду в консоли игрока, будто он сам её набрал: `client.command("stop")`. */
    command(text: string): void;
}
/**
 * Игрок в игре: всё, что есть у Client, а также здоровье, броня, фраги,
 * оружие и экран.
 *
 * Событие об игроке передаёт его как `event.player`; `Player.all()`
 * возвращает всех на сервере.
 */
export declare class Player extends PlayerFields implements Client {
    constructor(id: number);
    /**
     * Игроки на сервере: `Player.all({ alive: true })`.
     *
     * Каждое поле сужает выборку: `{ bots: true }` — только боты,
     * `{ humans: true }` — только люди. Без фильтра — все подключённые, кроме
     * HLTV-прокси.
     *
     * Pawn: `get_players`
     */
    static all(filter?: PlayerFilter): Player[];
    /**
     * Счётчик изменений поля, которое плагины добавили в Player:
     * `Player.revision("semiclip")`. Растёт при каждом изменении поля у любого
     * игрока — записал ли его плагин на TS или Pawn, или поле сбросилось, когда
     * игрок ушёл; запись того же значения изменением не считается. Чтобы
     * реагировать на изменения, храните последнее число и сравнивайте, не чаще
     * раза за кадр.
     */
    static revision(field: string): number;
    /**
     * Имя игрока.
     *
     * Pawn: `get_user_name`
     */
    get name(): string;
    /**
     * Здоровье игрока: 100 при появлении. Если записать 0 или меньше, игрок умрёт.
     *
     * Pawn: `get_user_health`, `set_user_health`
     */
    get health(): number;
    set health(hp: number);
    /**
     * Броня игрока в очках: 100 с купленным бронежилетом, 0 без него.
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
     * Команда игрока, одно из "TERRORIST", "CT", "SPECTATOR" или "UNASSIGNED". Верна и
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
     * IP-адрес игрока без порта, например "192.168.0.10".
     *
     * Pawn: `get_user_ip`
     */
    get ip(): string;
    /**
     * SteamID игрока, например "STEAM_0:1:12345". У бота — "BOT", у HLTV — "HLTV"; пока Steam не подтвердил игрока — "STEAM_ID_PENDING" (дождитесь события "authorized"), на LAN-сервере — "STEAM_ID_LAN".
     *
     * Pawn: `get_user_authid`
     */
    get authid(): string;
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
     * (Error) по имени "AbortError"; следующий игрок в этом слоте получает новый.
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
    /**
     * Показывает строку текста на экране игрока:
     * `player.showHud("-35 HP", { color: [255, 40, 40], x: 0.02, y: 0.88, hold: 2 })`.
     * У каждой опции есть значение по умолчанию.
     *
     * Pawn: `set_hudmessage`, `show_hudmessage`
     */
    showHud(text: string, options?: HudOptions): void;
    /** Эффекты на экране игрока: `player.screen.fade({ ... })`, `.shake(...)`, `.statusIcon(...)` — см. Screen. */
    get screen(): Screen;
    set muted(value: boolean);
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
     * Задаёт запас патронов игрока к оружию: `player.setAmmo("weapon_flashbang", 2)`.
     *
     * Pawn: `rg_set_user_bpammo`, `cs_set_user_bpammo`
     */
    setAmmo(weapon: WeaponName, amount: number): void;
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
     * Права админа у игрока — по буквам из users.ini:
     * `player.access.includes("Cvar")`.
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
     * `player.command("messagemode nh_fov")`, `player.command("stop")`.
     * Выполняет её игра игрока, а не сервер.
     *
     * Pawn: `client_cmd`
     */
    command(text: string): void;
}
/**
 * Вызывает натив, заполняющий текстовый буфер, и возвращает текст. Сам
 * натив передаётся аргументом:
 *
 *   readText(get_mapname)                 // "c21_kitty"
 *   readText(get_user_name, 32, id)       // not this one: see Player.name
 */
export declare function readText(fill: (out: number, max: number) => number, max?: number): string;
/**
 * id игроков на сервере в виде массива. `flags`: "a" живые, "b" мёртвые,
 * "c" без ботов, "h" без HLTV, "e" только `team`. `Player.all` делает то
 * же с понятными полями.
 *
 * Pawn: `get_players`
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
/** Обработчик команды: получает игрока, который её набрал, и слова после имени команды. */
export type CommandHandler = (player: Player, args: string[]) => void;
/** Параметры команды: кому она доступна и её описание в списке. */
export interface CommandOptions {
    /** Право админа, которое нужно игроку для команды; если не указано, команда доступна всем. */
    access?: Access;
    /** Описание команды, которое показывают `amx_help` и подобные. */
    description?: string;
}
/**
 * Переводит буквы из users.ini в права: `accessOf("abc")` —
 * ["Immunity", "Reservation", "Kick"]. Неизвестные буквы пропускаются.
 *
 * Pawn: `read_flags`
 */
export declare function accessOf(letters: string): Access[];
/** Обработчик серверной команды: получает слова после имени команды. */
export type ServerCommandHandler = (args: string[]) => void;
/**
 * Вид HUD-сообщения. У каждого поля есть значение по умолчанию, так что
 * `{ color: [255, 40, 40] }` достаточно.
 *
 * Pawn: `set_hudmessage`
 */
export interface HudOptions {
    /** Цвет текста: красный, зелёный, синий, от 0 до 255. */
    color?: number[];
    /** Положение по горизонтали: 0 — левый край, 1 — правый; -1 — по центру. */
    x?: number;
    /** Положение по вертикали: 0 — верх, 1 — низ; -1 — по центру. */
    y?: number;
    /** Время, которое сообщение держится на экране, в секундах. */
    hold?: number;
    /** Эффект появления, одно из: "fade" — плавно, "flicker" — мерцая, "typewriter" — по буквам. */
    effect?: HudEffect;
    /** Время появления в секундах. */
    fadeIn?: number;
    /** Время исчезания в секундах. */
    fadeOut?: number;
    /** Канал HUD, от 1 до 4; -1 — выбрать свободный. */
    channel?: number;
    /** Длительность эффектов "flicker" и "typewriter" в секундах. */
    effectTime?: number;
    /**
     * Крупные буквы — для итога или заголовка. Каналов у них нет, так что
     * `channel` не действует.
     *
     * Pawn: `set_dhudmessage`
     */
    large?: boolean;
}
/** Эффект появления HUD-сообщения, одно из: "fade" — плавно, "flicker" — мерцая, "typewriter" — по буквам. */
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
/** Направление затемнения, одно из: "in" — от цвета к чистому экрану, "out" — от чистого экрана к цвету. */
export type FadeDirection = "in" | "out";
/** Параметры `player.screen.fade`. Время — в секундах. */
export interface FadeOptions {
    /** Цвет: красный, зелёный, синий и альфа, от 0 до 255; по умолчанию чёрный. */
    color?: number[];
    /** Длительность перехода в секундах; по умолчанию 1. */
    duration?: number;
    /** Время, которое держится полный цвет, в секундах; по умолчанию 0. */
    hold?: number;
    /** Направление затемнения, одно из: "in" (по умолчанию) — от цвета к чистому экрану, "out" — от чистого экрана к цвету. */
    direction?: FadeDirection;
    /** Цвет остаётся на экране до следующего затемнения. */
    stay?: boolean;
    /** Тонирует изображение на экране, а не закрашивает его. */
    modulate?: boolean;
}
/** Параметры `player.screen.shake`. */
export interface ShakeOptions {
    /** Сила тряски: насколько смещается вид, до 16 единиц; по умолчанию 4. */
    amplitude?: number;
    /** Длительность тряски в секундах; по умолчанию 1. */
    duration?: number;
    /** Частота тряски — толчков в секунду; по умолчанию 5. */
    frequency?: number;
}
/** Состояние иконки статуса, одно из: "hide" — убрана, "show" — горит, "flash" — мигает. */
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
 * Время — в секундах.
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
     * ("dmg_cold", "buyzone", "c4", ...), в заданном цвете.
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
 * plugin_natives is over, so a Cvar the native makes (nhnse_register_cvar)
 * is made at once rather than when this plugin's init comes.
 */
export declare function __nativeCall(): void;
/**
 * Квар сервера; читается и пишется, как `value` у поля ввода:
 *
 * ```ts
 * const freeze = new Cvar("mp_freezetime");
 * freeze.number = 5;
 * const speed = new Cvar("my_speed", "250");     // made with 250 if it does not exist
 * speed.addEventListener("change", (event) => console.log(`${event.oldValue} -> ${event.value}`));
 * ```
 *
 * `value` — текст квара; `number` и `boolean` читают и пишут тот же квар как
 * число и как переключатель.
 *
 * Pawn: `get_cvar_pointer`, `create_cvar`, `get_pcvar_string`, `set_pcvar_num`, `hook_cvar_change`
 */
export declare class Cvar {
    /** Имя квара, как его знает консоль, например "mp_timelimit". */
    name: string;
    private defaultValue;
    /**
     * Хэндл квара в движке; 0, если такого квара на сервере нет.
     *
     * Pawn: `get_cvar_pointer`
     */
    pointer: i32;
    private listeners;
    private hooked;
    constructor(
    /** The cvar's name, as the console knows it, e.g. "mp_timelimit". */
    name: string, defaultValue?: string | null);
    /**
     * @internal Находит или создаёт квар и начинает слушать его изменения. Cvar,
     * созданный на верхнем уровне плагина, ждёт plugin_init: создание квара, пока
     * плагины ещё загружаются, роняет сервер.
     */
    attach(): void;
    private hook;
    /** `true`, если такой квар есть на сервере. */
    get exists(): bool;
    /** Значение квара текстом, например "250". */
    get value(): string;
    set value(text: string);
    /** Значение квара числом. Число без дробной части так и записывается: "5", а не "5.000000". */
    get number(): number;
    set number(value: number);
    /** Квар как переключатель: `true` при любом значении, кроме 0. Запись `true` ставит 1, `false` — 0. */
    get boolean(): bool;
    set boolean(on: bool);
    /** Вызывает `listener` при каждом изменении значения квара. */
    addEventListener(type: "change", listener: CvarListener): void;
    /** Перестаёт вызывать обработчик, добавленный через addEventListener. */
    removeEventListener(type: "change", listener: CvarListener): void;
    /** @internal Вызывает обработчики изменения; это делает сервер, когда квар меняется. Плагин слушает через addEventListener. */
    dispatch(event: CvarChangeEvent): void;
}
/** Сервер — цель событий, как в DOM: его события, команды, карта и папки AMX Mod X. Используется через `server`. */
export declare class Server {
    /** Вызывает `listener` каждый раз, когда на сервере происходит событие `type`. */
    addEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /** Перестаёт вызывать обработчик, добавленный через addEventListener, — ту же функцию. */
    removeEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /**
     * Имя текущей карты, например "de_dust2".
     *
     * Pawn: `get_mapname`
     */
    get map(): string;
    /**
     * Число слотов для игроков на сервере: 32.
     *
     * Pawn: `get_maxplayers`
     */
    get maxPlayers(): number;
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
     * Добавляет команду, которую набирают игроки: `"/hp"` в чате или имя без
     * слеша — в консоли.
     *
     * ```ts
     * server.addCommand("/hp", (player, args) => print(player, `${player.health} HP`));
     * server.addCommand("/kick", kick, { access: "Kick", description: "Kick a player" });
     * ```
     *
     * `args` — слова после команды. Чат-команда не повторяется в чате и не
     * срабатывает у игрока без права `access`. `"say time"` срабатывает, когда
     * игрок пишет в чат ровно "time".
     *
     * Pawn: `register_clcmd`
     */
    addCommand(name: string, handler: CommandHandler, options?: CommandOptions): void;
    /**
     * Добавляет команду консоли сервера — набранную там, пришедшую по rcon или
     * вызванную другим плагином. Игроки её не набирают.
     *
     * ```ts
     * server.addServerCommand("myplugin_reset",(args) => reset(args.length > 0 ? args[0] : "all"));
     * ```
     *
     * `args` — слова после команды. Её можно добавлять на верхнем уровне файла.
     *
     * Pawn: `register_srvcmd`
     */
    addServerCommand(name: string, handler: ServerCommandHandler): void;
    /** Показывает HUD-сообщение всем игрокам, с теми же настройками, что у `player.showHud`. */
    showHud(text: string, options?: HudOptions): void;
}
/** Сервер, на котором работает плагин: его события, команды и карта. */
export declare const server: Server;
/**
 * События игры (hookchain'ы reapi) и управление раундом — цель событий, как
 * в DOM:
 *
 * ```ts
 * game.addEventListener("takeDamage", (event) => {
 *   if (event.player.isBot) event.preventDefault();
 * });
 * game.addEventListener("canPlayerHearPlayer", (event) => event.listener.team == event.sender.team);
 * game.addEventListener("flPlayerFallDamage", (event) => event.result / 2, true);
 * ```
 *
 * Тип события следует из его имени. То, что возвращает обработчик, — ответ
 * игре: до действия игры он заменяет то, что игра сделала бы, после (`post`) —
 * её результат. Обработчик, который ничего не возвращает, оставляет решение
 * игре; `event.preventDefault()` блокирует без ответа. Значение не того типа —
 * ошибка и в редакторе, и при сборке.
 *
 * Pawn: `RegisterHookChain`
 */
export declare class Game {
    /**
     * Вызывает `listener` каждый раз, когда игра выполняет `type`. С `post`,
     * равным `true`, — после того как игра сделала своё, с её ответом в
     * `event.result`; по умолчанию — до этого, и может её остановить.
     *
     * Pawn: `RegisterHookChain`
     */
    addEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /** Перестаёт вызывать обработчик, добавленный через addEventListener, — ту же функцию с тем же `post`. */
    removeEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /**
     * Завершает раунд сейчас:
     *
     * ```ts
     * game.endRound({ winner: "TERRORIST" });                 // terrorists win, next round in 5 s
     * game.endRound({ winner: "draw", delay: 3 });            // a draw, next round in 3 s
     * game.endRound({ winner: "none", message: "" });         // a quiet restart: no message
     * ```
     *
     * Победитель определяет счёт, сообщение и звук ("Terrorists Win!");
     * `message` и `sound` заменяют их, "" — выключает.
     *
     * Pawn: `rg_round_end`
     */
    endRound(options: EndRoundOptions): void;
}
/** Победитель раунда, одно из "TERRORIST", "CT", "draw" или "none" — рестарт без победителя. */
export type RoundWinner = "TERRORIST" | "CT" | "draw" | "none";
/** Настройки `game.endRound`; обязателен только `winner`. */
export interface EndRoundOptions {
    /** Победитель раунда, одно из "TERRORIST", "CT", "draw" или "none" — рестарт. */
    winner: RoundWinner;
    /** Секунд до начала следующего раунда; по умолчанию 5. */
    delay?: number;
    /** Сообщение посередине экрана или текст игры вроде "#Terrorists_Win"; "default" — обычное для этого победителя, "" — без сообщения. */
    message?: string;
    /** Звук — радиофраза вроде "terwin"; "default" — обычный для этого победителя, "" — без звука. */
    sound?: string;
    /**
     * `true` — оповестить обработчики roundEnd всех плагинов, в том числе
     * Pawn-плагинов, как когда игра сама завершает раунд. По умолчанию `false`:
     * обработчик roundEnd, который завершает раунд, вызвал бы сам себя.
     *
     * Pawn: `rg_round_end(..., trigger)`
     */
    dispatch?: boolean;
}
/** Игра, в которой работает плагин: её события (hookchain'ы reapi) и `endRound`. */
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
/** Место показа сообщения строкой, одно из "chat", "center", "console" или "notify". */
export type VariantName = "chat" | "center" | "console" | "notify";
export { Flag } from "./constants";
export * from "./events";
import { FlagName, HookName, HamName } from "./constants";
import { PlayerFields } from "./entities";
export { Entity, Weapon, WeaponKind, weaponKindOf } from "./entities";
import { ServerEventMap } from "./events";
/** Получатель сообщения вместе с местом показа: `{ id: 0, variant: "center" }`. `id` — id игрока, 0 — все. */
export interface Target {
    /** id игрока-получателя; 0 — все игроки. */
    id: number;
    /** Место показа сообщения, одно из "chat" (по умолчанию), "center", "console" или "notify". */
    variant?: VariantName;
}
/** Переводит цветовые метки строки чата (`!g`, `!r`, ...) в коды цвета для клиента и записывает в `swapTeam`, какой цвет команды нужен строке. Её вызывает `print`; экспортирована для тестов. */
export declare function paint(text: string): string;
/** Цвет команды, который последний вызов `paint()` выбрал для строки, — одно из "TERRORIST" (красный), "CT" (синий), "SPECTATOR" (серый) или "" — цвет команды читающего. `print` читает его сразу после. */
export declare let swapTeam: string;
/**
 * Отправляет сообщение игроку или всем игрокам (0).
 *
 * ```ts
 * print(player, "Health restored!");                   // the player's chat
 * print(0, "Round starts in 5 seconds");                // everyone's chat
 * print(player, "Health restored!", "center");          // the middle of the player's screen
 * print({ id: 0, variant: "center" }, "Go!");           // the middle of everyone's screen
 * ```
 *
 * Первый аргумент — игрок, id игрока или 0 — все. Третий — где показать
 * сообщение, одно из "chat" (по умолчанию), "center" — посередине экрана, "console" —
 * в консоли игрока, "notify" — тоже в консоли; на экране CS показывает его
 * только при `developer 1`.
 *
 * Цветовые метки работают только в чате:
 * - `!g` зелёный, `!y` жёлтый (обычный цвет чата)
 * - `!r` красный, `!b` синий, `!w` серый, `!t` цвет команды читающего
 *
 * В одном сообщении из красного, синего, серого и `!t` работает только один — первый.
 *
 * Pawn: `client_print`, `client_print_color`
 */
export declare function print<T extends Target | Client | number = Target>(to: T, message: string, variant?: VariantName): void;
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
 * Регистрирует консольную команду для игроков; обработчик получает id
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
 * await sleep(5000, { signal: AbortSignal.timeout(2000) }); // rejects after 2 s
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
 * низкоуровневый способ. Натив из `~/natives` — обычная функция, и ему это
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
    /** Добавляет числовой аргумент как есть: индекс сущности, константу, количество. */
    num(value: number): Call;
    /** Добавляет дробный аргумент — тот, что натив объявляет как `Float:`. */
    float(value: f64): Call;
    /** Добавляет строковый аргумент — одинаково до `...` и в хвосте. */
    str(text: string): Call;
    /** Добавляет массив ячеек, который натив читает и может перезаписать, а следом — его длину. */
    buffer(cells: CellBuffer, length: number): Call;
    /** Добавляет вектор: три дробных числа по одному адресу — координаты, углы, цвет. В отличие от `buffer`, длина за ним не идёт. */
    vec(x: f64, y: f64, z: f64): Call;
    /** Добавляет вектор, который заполняет натив; после `run` результат — в `cells`. */
    vecInto(cells: CellBuffer): Call;
    /** Добавляет число, передаваемое по адресу, — так передаётся аргумент хвоста `...`; `out` читает, что натив в него записал. */
    ref(value: number): Call;
    /** Значение, которое натив оставил в аргументе `ref` на этой позиции, после `run`. */
    out(index: i32): number;
    /** Вызывает натив с добавленными аргументами и возвращает его результат. */
    run(): number;
}
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
/**
 * Регистрирует хук Ham Sandwich так же: `ham("spawn", "player", onSpawn)`.
 *
 * Pawn: `RegisterHam`
 */
export declare function ham(name: HamName, entityClass: string, handler: WideHandler, post?: bool): number;
/** Имя, версия, автор и описание плагина для `plugin({ ... })`; их показывает `amxts_plugins` в консоли сервера. */
export interface PluginInfo {
    /** Имя плагина, например "My Plugin". */
    name: string;
    /** Версия плагина, например "1.0.0". */
    version: string;
    /** Автор плагина. */
    author: string;
    /** Описание плагина, одной строкой. */
    description?: string;
    /**
     * Pawn-инклуд, нативы которого реализует плагин: `"myplugin.inc"`, из
     * includes/ или рядом с плагином. Каждая экспортированная функция уходит в
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
 * Настройки модулей в amxts.config.ts, каждая — под configKey своего модуля.
 * Здесь пусто: модуль добавляет свой ключ, дополняя этот интерфейс в
 * "@amxts/core", — `menus?: Partial<MenuCoreOptions>`, — и редактор проверяет
 * конфиг по нему.
 */
export interface ModuleOptions {
}
/**
 * Объявляет модуль: `export default defineModule<Options>({ meta, requires,
 * defaults, setup })` в файле модуля, как в Nuxt. `setup` выполняется один
 * раз, когда сервер загружает модуль, — с `defaults` и тем, что поверх них
 * задаёт amxts.config.ts. Глобальная; `import { defineModule } from "@amxts/core"` тоже работает.
 */
export declare function defineModule<T>(definition: AmxtsModule<T>): AmxtsModule<T>;
/**
 * Правило остановки форварда: `"never"` — его слышат все плагины, что бы они
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
    abstract deliver(a: i32, b: i32, c: i32): void;
}
/**
 * Форвард, который слушают другие плагины — и Pawn, и TypeScript. Его
 * аргументы — параметры типа:
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
 * Pawn-плагин слушает его через `public myplugin_on_round_end(winner)`, как
 * обычно, TypeScript-плагин — через `subscribe(handler)`. number, boolean и
 * Player (его id) приходят в Pawn числами, string — строкой. `Team` и
 * `RoundWinner` уходят числом Pawn там, где инклуд объявляет форвард с таким
 * тегом; `Team` для форварда, которого нет ни в одном инклуде, — ошибка сборки.
 *
 * Форвард создаётся при первом emit или раньше, вызовом `create()`, — когда
 * все плагины уже загружены (plugin_cfg или позже), иначе загруженные после
 * него его не услышат.
 *
 * Pawn: `CreateMultiForward`, `ExecuteForward`
 */
export declare class Forward<A = NoArgument, B = NoArgument, C = NoArgument> extends ForwardListener {
    /** Имя форварда, под которым его слушают Pawn-плагины. */
    name: string;
    private crossing;
    /** Правило остановки форварда, одно из "never" (по умолчанию) или "handled". Задаётся до первого emit. */
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
    /** The forward's name, as Pawn plugins listen to it. */
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
     * Параметры обработчика получают типы форварда; именованная функция может
     * принимать их меньше. Форвард, созданный Pawn-плагином, доходит до
     * TypeScript, только если он объявлен в одном из инклудов хост-плагина
     * amxts; отправленный из TypeScript доходит до всех подписчиков.
     */
    subscribe(handler: (a: A, b: B, c: C) => void): void;
    /** Перестаёт вызывать обработчик, переданный в `subscribe()`. */
    unsubscribe(handler: (a: A, b: B, c: C) => void): void;
    /** Передаёт аргументы форварда всем обработчикам из `subscribe()`; вызывает это сервер, а не плагин. */
    deliver(a: i32, b: i32, c: i32): void;
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
    emit(a?: A, b?: B, c?: C): boolean;
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
 * кладётся через toString(), а читается через parseInt.
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
    /** Значение по ключу `key` или null, если его нет. */
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
export { EntityFilter } from "./entities";
/**
 * Публичная функция другого плагина — паблик Pawn-плагина или имя
 * `publicFor` TypeScript-плагина, — которую можно вызвать отсюда:
 *
 * ```ts
 * const fn = PawnFunction.find(caller(), "OnAction");       // null when there is none
 * if (fn != null) fn.call().int(id).text("KEY").run();
 * const call = fn.call().int(id).int(target).buffer(256).int(255);
 * call.run();
 * const value = call.bufferText;                               // what it wrote into value[]
 * ```
 *
 * Pawn: `get_func_id`, `callfunc_begin_i`
 */
export declare class PawnFunction {
    /** id плагина, которому принадлежит функция. */
    readonly plugin: i32;
    /**
     * Индекс функции в её плагине.
     *
     * Pawn: `get_func_id`
     */
    readonly index: i32;
    constructor(
    /** The id of the plugin the function belongs to. */
    plugin: i32, 
    /**
     * The function's index in its plugin.
     *
     * Pawn: `get_func_id`
     */
    index: i32);
    /**
     * Находит паблик `name` в плагине с этим id (`caller()` натива); null, если
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
    /** Добавляет логический аргумент; функция получает 1 или 0. */
    bool(value: boolean): PawnCall;
    /** Добавляет строковый аргумент. */
    text(value: string): PawnCall;
    /** Добавляет массив из `size` ячеек, который заполняет функция, — её `value[]`; один на вызов. Текст потом — в `bufferText`. */
    buffer(size: number): PawnCall;
    /** Вызывает функцию и возвращает её результат или 0, если вызвать не удалось. */
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
 * Освобождает `Array:`, созданный createCellArray; после этого дескриптор недействителен.
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
/** Записывает текст в `count` ячеек Pawn-строки: не больше count - 1 байт, без половинок букв, остаток — нули. */
export declare function textCells(text: string, count: number): number[];
/**
 * Показывает игроку старое меню любой длины: `keys` — клавиши, которые оно
 * принимает, `title` — имя, под которым приходят нажатия.
 *
 * Цветовые метки: `!y` жёлтый, `!r` красный, `!w` белый, `!d` серый, `!R` — к
 * правому краю. Собственные коды игры (`\y`, как в старом menu.ini) проходят
 * как есть.
 *
 * Pawn: `show_menu`, `register_menucmd`
 */
export declare function showMenu(id: number, keys: number, text: string, title: string): void;
