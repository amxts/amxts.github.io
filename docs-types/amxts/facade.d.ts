/// <reference path="../as-types.d.ts" />
import "./promise";
import { Vector } from "./vector";
/**
 * The usual handler: a player id, nothing to say back.
 *
 * `call_indirect` checks the type on the module's side, so a handler's shape
 * is fixed at registration and there are exactly two of them. This one covers
 * a player event and a command.
 */
export type Handler = (id: number) => void;
/**
 * The wide handler: up to four cells, and nothing returned.
 *
 * A forward carrying more than a player id needs this, and so does a hookchain.
 * String arguments arrive as pointers into this plugin's own memory; read them
 * with `argString`, or use the registrar for that event, which does it for you.
 *
 * To stop AMX Mod X passing the event on, or to block what a hookchain hooks,
 * call handled() - a handler returns nothing at all.
 */
export type WideHandler = (a: number, b: number, c: number, d: number) => void;
/**
 * Stops the event here: AMX Mod X does not pass it to anyone else, and a
 * hookchain does not call what it hooked.
 *
 *   function onSay(id: number): void {
 *     if (muted(id)) handled();
 *   }
 *
 * Said rather than returned, so that the nine handlers in ten which have
 * nothing to say about it end without a line about this bridge. It applies to
 * the handler that is running and to nothing else.
 */
export declare function handled(): void;
/** For a native whose answer is not simply 0 or 1 - Ham's, for instance. */
export declare function outcome(value: number): void;
/**
 * A float as the cell Pawn carries it in.
 *
 * Every argument and every return crosses as a 32-bit cell, and a float rides
 * in one as its bit pattern. A float literal here is 64-bit, so the narrowing
 * belongs in one place rather than at every call:
 *
 *   ret(floatCell(2.5));
 *   rg_round_end(floatCell(5.0), ...);
 */
export declare function floatCell(value: f64): number;
/**
 * A real number as a whole one, rounded rather than chopped.
 *
 * Pawn's floatround, and the thing every count of seconds needs on its way to
 * something that counts in whole ones. `<number>x` truncates, which loses a
 * second off every round time that is not exact.
 */
export declare function rounded(value: number): number;
/** The other way: a cell that holds a float, as a number to work with. */
export declare function cellFloat(cell: number): f64;
/** What an exported native gives back to the plugin that called it. */
export declare function ret(value: number): void;
/**
 * The name of a host public that calls `handler`, for any AMXX native that
 * takes a callback as a name - register_message, register_touch,
 * query_client_cvar, ezhttp_post, set_native_filter, menu_core's registrars:
 *
 * ```ts
 * const pub = publicFor(onDeathMsg, "msg:DeathMsg");
 * if (pub.length > 0) register_message(get_user_msgid("DeathMsg"), pub);
 * ```
 *
 * The `if` is the whole subtlety - and it tests the length, because a string
 * in AssemblyScript is a reference and an empty one is still not null. None of those registrations can be undone,
 * so after a hot reload the plugin takes its own slot back and the AMXX side
 * is still pointing at it - registering again would fire the handler twice.
 * An empty name means "already registered, leave it alone", and also covers
 * the case of no slot left, which the module has already complained about.
 *
 * `key` is what identifies the registration across a reload; anything stable
 * and unique within the plugin will do. `fallback` is what the caller gets
 * when the handler says nothing - 0 for most things, 1 where the facility
 * expects PLUGIN_HANDLED.
 *
 * **Register from the `plugin_cfg` event, not from the top of the file.** A
 * plugin's top level runs during plugin_natives, which is early enough that a
 * native registering a command with the engine - register_concmd, register_srvcmd -
 * crashes the server when that command is later typed. Measured, not guessed:
 * the same registration moved into `server.addEventListener("cfg", ...)` works. `cmd()` is
 * the exception, because a client command never reaches the engine's table.
 */
export declare function publicFor(handler: WideHandler, key: string, fallback?: number): string;
/**
 * Exports a native for other plugins - Pawn ones included - to call.
 *
 *   nativeFn("nhnse_get_game_mode", getGameMode)
 *
 *   function getGameMode(a: number, b: number, c: number, d: number) {
 *     ret(mode);
 *   }
 *
 * AMX Mod X implements a native as a public in some plugin, so this lends one
 * of the host plugin's, and the module keeps the name: register_native cannot
 * be undone, so a reload takes the same slot back rather than registering the
 * name twice.
 *
 * The handler gets the first four cells as they are; `arg(i)` and
 * `argText(i)` read any of them, and `setArg` / `setArgText` write back. The
 * newer way needs none of that: an `export function` of the entry file is a
 * native with its real types - see docs/api/natives.md.
 *
 * It must be exported while the file is read, not later: AMX Mod X asks every
 * plugin for its natives before it starts any of them, which is why plugins
 * are loaded from plugin_natives at all.
 */
export declare function nativeFn(name: string, handler: WideHandler): void;
/**
 * A number that crosses to Pawn as a `Float:`.
 *
 * To TypeScript it is `number`, and nothing changes in the code that uses it.
 * It matters only where a plugin's own native meets Pawn: Pawn's `Float:` is a
 * tag, invisible at the call site, so a native says which of its numbers are
 * floats by this name. Everywhere else a number is just `number`.
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
 * An AMX Mod X dynamic array (cellarray.inc): how a list reaches a Pawn
 * plugin that expects an `Array:` handle.
 *
 * ```ts
 * export function cfg_get_value_array(section: ConfigSection, key: string) {
 *   const words = lookup(section, key);                // string[] | null
 *   return words != null ? CellArray.fromStrings(words) : null;
 * }
 * // native Array:cfg_get_value_array(ConfigSection:section, const key[]);
 * ```
 *
 * A native that returns one hands Pawn the handle - `null` is Invalid_Array -
 * and the Pawn plugin owns it from then on: `ArrayDestroy` is its job, as
 * with any `Array:` a native gives out. Within TypeScript a list is a
 * `string[]` or a `number[]`; this is only for crossing.
 *
 * Text goes in as UTF-8, a byte a cell, the way AMX Mod X keeps strings.
 */
export declare class CellArray {
    /** The `Array:` handle Pawn gets. */
    readonly handle: i32;
    /** An empty array whose items are `cellSize` cells each: 1 for a number, the buffer size for text. */
    constructor(cellSize?: number);
    /** Text items, each up to `cellSize - 1` bytes (ArrayCreate's size for strings). */
    static fromStrings(values: string[], cellSize?: number): CellArray;
    /** `Float:` items, one cell each. */
    static fromFloats(values: number[]): CellArray;
    /** How many items it holds. */
    get length(): number;
    pushString(value: string): void;
    /** A whole number - or another array's handle - as one cell. */
    pushCell(value: number): void;
    pushFloat(value: number): void;
    /** One item of several cells: `[a, b]` into an array made with `new CellArray(2)`. */
    pushCells(values: number[]): void;
}
export declare function __strings(): i32;
/**
 * An argument of the handler that is running, by position.
 *
 * A handler takes four, because the module calls it through one fixed type and
 * four covers nearly everything. A message handler or a hookchain sometimes
 * carries more; they are still there, and this reads them. Index 0 is the same
 * cell the handler got as its first parameter.
 *
 *   function onSomething(a: number, b: number, c: number, d: number) {
 *     const fifth = arg(4);
 *   }
 */
export declare function arg(index: number): number;
/**
 * The same argument, read as the string it points at.
 *
 * A string does not cross as text: what arrives is an address in the memory of
 * whoever made the call - the host plugin for a command or a hook, the calling
 * plugin for a native this one exported. The module reads it there and hands
 * back the text.
 *
 * This is for a callback. A forward's strings are decoded for the handler
 * already, by the registrar that named it.
 */
export declare function argText(index: number): string;
/**
 * How many arguments the call that is running actually carried.
 *
 * A handler is always handed four cells, padded with zeros, so a native whose
 * later arguments are optional cannot otherwise tell a zero that was passed
 * from one that was not:
 *
 *   const flashes = argc() >= 2 ? arg(1) : -1;
 */
export declare function argc(): number;
/**
 * Which plugin called the exported native that is running, or -1.
 *
 * AMX Mod X hands a native the id of its caller, and some natives are about
 * the caller rather than about their arguments - a cvar registered *by* a
 * plugin, a chat prefix set *for* one.
 */
export declare function caller(): number;
/**
 * Writes a number back through an argument passed by reference.
 *
 * Pawn's `&value` arrives as an address, not as the number: this writes
 * through it, which is what `set_param_byref` does on that side.
 */
export declare function setArg(index: number, value: number): void;
/**
 * Writes text back through a string argument.
 *
 * Some callbacks hand over a buffer to fill rather than text to read - a
 * menu_core placeholder, a hookchain argument a plugin means to change. `max`
 * is how much room the caller said there is, which is usually the argument
 * right after the buffer.
 *
 *   function placeholder(id: number, target: number, out: number, max: number) {
 *     setArgText(2, "ready", max);
 *   }
 */
export declare function setArgText(index: number, text: string, max: number): void;
/** Reads a string argument a wide handler was given. */
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
/**
 * A Pawn string is text in cells - a byte of UTF-8 in each - so a plugin that
 * calls the raw layer in as/natives.ts passes an i32 array where a C
 * programmer would pass bytes. These two turn that array into a string and
 * back.
 */
export declare function cellsToString(cells: StaticArray<i32>): string;
export declare function stringToCells(text: string, cells: StaticArray<i32>): void;
/**
 * A Pawn string for a raw native, without declaring a buffer for it.
 *
 *   cfg_set_base_dir(cells("nhnse"));
 *   cfg_get_value(section, cells("CHAT_PREFIX"), changetype<i32>(out), 64);
 *
 * The natives in `~/natives` take addresses, because that is what Pawn pushes:
 * a string has to be somewhere this plugin owns before its address means
 * anything. This writes it into one of eight buffers in turn, so several in
 * one call do not overwrite each other - eight is the limit, and a ninth in
 * the same expression starts again at the first.
 *
 * Only for arguments going in. A native that writes back needs a buffer of the
 * plugin's own, so that it is still there afterwards to read.
 */
export declare function cells(text: string): number;
/**
 * A buffer for a native to write text into, read back with `text()`.
 *
 *   const name = out();
 *   get_user_name(id, name, TEXT_MAX);
 *   console.log(text(name));
 *
 * `cells()` is the other direction - text going in. This one is for the
 * natives that hand something back, which would otherwise mean declaring a
 * StaticArray, changetype-ing it and decoding it by hand at every call. Four
 * buffers in turn, so a couple of reads in one expression do not collide.
 *
 * A number a native writes through a `&reference` also needs one of these;
 * `cell()` reads it back.
 */
export declare function out(): number;
/** The text a native wrote into one of those buffers. */
export declare function text(buffer: number): string;
/**
 * A row of cells for a native to read from or write into.
 *
 * Pawn hands an array over by its address, and a native that fills one - a
 * vector, a list of players, a line of text - writes into memory the caller
 * owns. This is that memory, used like an ordinary array: `buffer[0]`,
 * `buffer.float(2)`, `buffer.text()`. Its `address` is what a native takes.
 *
 *   const origin = new CellBuffer(3);
 *   entity_set_origin(cube, origin.address);
 *
 * It exists so that a plugin never has to write changetype or StaticArray:
 * those are how AssemblyScript reaches raw memory, and they belong here.
 */
export declare class CellBuffer {
    private data;
    constructor(length: number);
    /** Three floats, for a native that takes a vector: an origin, a size, a colour. */
    static vector(x: f64, y: f64, z: f64): CellBuffer;
    get length(): number;
    /** Where it lives, which is what a native taking an array is given. */
    get address(): number;
    get(index: number): number;
    set(index: number, value: number): void;
    /** A cell that holds a float, as a number. */
    float(index: number): f64;
    setFloat(index: number, value: f64): void;
    /** The text a native wrote into it, up to its terminator or its end. */
    text(): string;
    /** Text written in from `at`, a byte of UTF-8 a cell, terminator included. */
    write(at: number, value: string): void;
    fill(value: number): void;
}
/**
 * An array of `length` copies of `value`: `arrayOf(33, 0)`.
 *
 * TypeScript would write `Array(33).fill(0)`, and AssemblyScript cannot read
 * that without a type argument it has no way to infer. This is the same thing
 * with the type taken from `value`, which is where a reader looks for it too.
 * For objects, give each slot its own - every slot here is the same `value`.
 */
export declare function arrayOf<T>(length: number, value: T): T[];
/** The number a native wrote through one, for a `&reference` argument. */
export declare function cell(buffer: number): number;
/** Puts a number in one, for a reference a native reads as well as writes. */
export declare function putCell(buffer: number, value: number): number;
/**
 * The "no origin" a message_begin takes when it is going to one player.
 *
 *   message_begin(MSG_ONE, msgid, noOrigin(), id);
 *
 * The argument is three floats and is only read for the messages sent to
 * whoever is near a point; the rest need an address there and nothing at it.
 */
export declare function noOrigin(): number[];
/** As much as one of those buffers holds. */
export declare const TEXT_MAX: i32;
/**
 * A player: the hand-written basics below, and every entvar and CBasePlayer
 * member as a typed property from as/entities.ts (`player.gravity`,
 * `player.hideHud`, `player.origin`).
 */
/** The teams of Counter-Strike, by the names the game itself gives them. */
export type Team = "TERRORIST" | "CT" | "SPECTATOR" | "UNASSIGNED";
/**
 * Every weapon a player can hold, by its classname.
 *
 * The order is WeaponIdType's: the index of a name is the id reapi takes,
 * with 0 and 2 (the unused glock slot) left empty.
 */
export type WeaponName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90";
/**
 * What `give` hands over: a weapon, or armour and the defuse kit.
 *
 * Spelled out rather than `WeaponName | "item_kevlar" | ...`: AssemblyScript
 * reads a union of string literals as `string`, but not one that mixes a
 * named type in.
 */
export type ItemName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90" | "item_kevlar" | "item_assaultsuit" | "item_thighpack";
/**
 * Which players `Player.all` returns. Every field is optional:
 * `Player.all({ alive: true, team: "CT" })`.
 */
export declare class PlayerFilter {
    /** Only the living. */
    alive?: boolean;
    /** Only the dead. */
    dead?: boolean;
    /** Only this team. */
    team?: Team;
    /** Only bots. */
    bots?: boolean;
    /** Only people, no bots. */
    humans?: boolean;
}
/** The AMX Mod X modules a plugin can ask about. */
export type ModuleName = "reapi" | "cstrike" | "fun" | "hamsandwich" | "engine" | "fakemeta";
/**
 * Whether the server has a module: `if (hasModule("reapi")) ...`.
 *
 * The facade asks this itself - a player's actions go through reapi where
 * there is reapi, and through the stock modules where there is not, because
 * not every server runs ReHLDS. A plugin asks it too, before a native that
 * only one module has.
 */
export declare function hasModule(name: ModuleName): boolean;
/** How `player.kill()` goes. */
export interface KillOptions {
    /** Leave the frags alone: no suicide penalty. */
    keepFrags: boolean;
}
/**
 * A player as he is while connecting - in "connect", "authorized" and
 * "putinserver" - before he is in the game: who he is, not health or weapons.
 * A Player is a Client too, so what takes a Client takes either.
 *
 * ```ts
 * server.addEventListener("putinserver", (event) => {
 * 	print(event.player, `Welcome, ${event.player.name}!`);
 * });
 * ```
 */
export interface Client {
    /** The player's slot, 1 to 32. */
    readonly id: number;
    /** The name he plays under. */
    readonly name: string;
    /** His address, without the port. */
    readonly ip: string;
    /** His SteamID: "STEAM_0:1:12345", or "BOT". It may not be known yet in "putinserver". */
    readonly authid: string;
    /** Whether he is a bot. */
    readonly isBot: boolean;
    /** Whether he is still on the server. */
    readonly isConnected: boolean;
    /** What this admin may do - the letters in users.ini: `client.access.includes("Cvar")`. */
    readonly access: Access[];
    /** His team: "UNASSIGNED" until he joins one. Setting it moves him, as `player.team` does. */
    team: Team;
    /** Nobody hears him on the voice chat. */
    muted: boolean;
    /** Aborts when he leaves the server: `fetch(url, { signal: client.signal })`. */
    readonly signal: AbortSignal;
    /** Runs a command in his own console, as if he had typed it there. */
    command(text: string): void;
}
export declare class Player extends PlayerFields implements Client {
    constructor(id: number);
    /**
     * The players on the server, as objects: `Player.all({ alive: true })`.
     *
     * Every field narrows: `{ bots: true }` is bots only, `{ humans: true }`
     * people only. Without a filter, everyone connected; an HLTV proxy is
     * never one of them.
     */
    static all(filter?: PlayerFilter): Player[];
    /**
     * A number that goes up whenever the field a plugin added to Player
     * changes on anyone - written by any plugin, TS or Pawn, or dropped when
     * a player leaves: `Player.revision("semiclip")`. Nothing is sent: a
     * plugin that acts on a change keeps the number it last saw and compares,
     * once a frame at most. Writing the value already there is no change.
     */
    static revision(field: string): number;
    get name(): string;
    get health(): number;
    set health(hp: number);
    get armor(): number;
    set armor(value: number);
    get frags(): number;
    set frags(value: number);
    /**
     * Read where they are written: AMX Mod X keeps its own copy of deaths
     * (get_user_deaths), and after `player.deaths = 7` it still said 0 -
     * measured on the server.
     */
    get deaths(): number;
    /** The deaths on the scoreboard; setting them tells the scoreboard too. */
    set deaths(value: number);
    /**
     * The team, read from the player himself (m_iTeam).
     *
     * Not get_user_team: AMX Mod X keeps its own copy, and right after a team
     * change it still says the old one.
     */
    get team(): Team;
    /**
     * Moves the player to another team, as reapi's rg_set_user_team does: the
     * model is picked for the new team, the scoreboard is told, and the round's
     * win conditions are not checked - the caller decides when that happens.
     */
    set team(value: Team);
    get ip(): string;
    get authid(): string;
    get isAlive(): boolean;
    get isConnected(): boolean;
    get isBot(): boolean;
    /**
     * Aborts when this player leaves the server, with an Error named
     * "AbortError"; the next player in the slot gets a fresh one.
     *
     * ```ts
     * const response = await fetch(url, { signal: player.signal });
     * ```
     *
     * An async command handler or player event runs under it already: every
     * `await` in it gives up quietly when the player leaves.
     */
    get signal(): AbortSignal;
    /**
     * Nobody hears this player on the voice chat - with or without alltalk,
     * like `video.muted`. Reading it is the check: `if (player.muted) ...`.
     *
     * The engine module's SPEAK_MUTED flag, which it applies at the very last
     * step of voice routing (Voice_SetClientListening), after sv_alltalk and
     * the game's rules have had their say. The player's other speak flags are
     * left as they were.
     */
    get muted(): boolean;
    /**
     * A line of text on this player's screen:
     * `player.showHud("-35 HP", { color: [255, 40, 40], x: 0.02, y: 0.88, hold: 2 })`.
     * Every option has AMX Mod X's own default.
     */
    showHud(text: string, options?: HudOptions): void;
    /**
     * What this player sees over the world: `player.screen.fade({ ... })`,
     * `.shake(...)`, `.statusIcon(...)` - see Screen.
     */
    get screen(): Screen;
    set muted(value: boolean);
    /** Hands over a weapon or an item: `player.give("weapon_flashbang")`. */
    give(item: ItemName): boolean;
    /** Takes every weapon away; the suit (armour, HUD) stays unless asked. */
    removeAllItems(removeSuit?: boolean): void;
    /** Sets the backpack ammo of a weapon: `player.setAmmo("weapon_flashbang", 2)`. */
    setAmmo(weapon: WeaponName, amount: number): void;
    /** Brings the player back into the round where the game spawns him. */
    respawn(): void;
    /**
     * Kills the player, as the `kill` console command does. With
     * `{ keepFrags: true }` the death costs him nothing on the scoreboard -
     * fun.inc's user_silentkill.
     */
    kill(options?: KillOptions): void;
    /** What this admin may do - the letters in users.ini: `player.access.includes("Cvar")`. */
    get access(): Access[];
    /** Puts a weapon the player carries in his hands. False if he has none. */
    switchWeapon(weapon: WeaponName): boolean;
    /** Recomputes the speed from the weapon in hand - after a slow, say. */
    resetMaxSpeed(): void;
    /**
     * Runs a command in the player's own console, as if he had typed it
     * there: `player.command("messagemode nh_fov")`, `player.command("stop")`.
     * The client runs it, not the server - what `server.command` is to the
     * server's console (client_cmd).
     */
    command(text: string): void;
}
/**
 * Reads a native that fills a text buffer, without one being built by hand.
 *
 *   readText(get_mapname)                 // "c21_kitty"
 *   readText(get_user_name, 32, id)       // not this one: see Player.name
 *
 * A Pawn string is one character per cell, so calling such a native directly
 * means declaring a StaticArray<i32>, passing its address, and decoding it
 * afterwards - three lines of this bridge's plumbing in the middle of a
 * plugin. The native itself is passed in: a function is a value.
 */
export declare function readText(fill: (out: number, max: number) => number, max?: number): string;
/**
 * The ids get_players finds, as an array.
 *
 * `flags` are get_players' own: "a" the living, "b" the dead, "c" no bots,
 * "h" no HLTV, "e" only `team`. The native writes into a buffer and counts
 * through a reference, which is why it is wrapped here and not called raw.
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
/** What a command handler gets: who typed it and what followed the name. */
export type CommandHandler = (player: Player, args: string[]) => void;
/** How a command is registered: who may use it and what it says in a listing. */
export declare class CommandOptions {
    /** The admin flag a player needs; everyone when left out. */
    access?: Access | null;
    /** What `amx_help` and the like show next to it. */
    description?: string;
}
/**
 * The rights users.ini letters give, as names: `accessOf("abc")` is
 * ["Immunity", "Reservation", "Kick"]. A letter it does not know is left out.
 */
export declare function accessOf(letters: string): Access[];
/** What a server command's handler gets: the words after its name. */
export type ServerCommandHandler = (args: string[]) => void;
/**
 * How a HUD message looks. Every field has AMX Mod X's own default, so
 * `{ color: [255, 40, 40] }` is enough.
 */
export declare class HudOptions {
    /** Red, green, blue, 0 to 255. */
    color?: number[];
    /** 0 is the left edge, 1 the right; -1 centres it. */
    x?: number;
    /** 0 is the top, 1 the bottom; -1 centres it. */
    y?: number;
    /** Seconds it stays on screen. */
    hold?: number;
    /** "fade" in and out, "flicker", or "typewriter" - written out letter by letter. */
    effect?: HudEffect;
    /** Seconds to fade in. */
    fadeIn?: number;
    /** Seconds to fade out. */
    fadeOut?: number;
    /** One of the four HUD channels; -1 lets AMX Mod X pick a free one. */
    channel?: number;
    /** Seconds the flicker and typewriter effects take. */
    effectTime?: number;
    /**
     * Large letters (the director HUD, set_dhudmessage): for a result or a
     * headline. It has no channels, so `channel` does not apply.
     */
    large?: boolean;
}
export type HudEffect = "fade" | "flicker" | "typewriter";
/**
 * A place on the HUD that holds one message: showing another there replaces
 * it rather than taking a channel of its own - a countdown redrawn every
 * second, a warning that changes. `clear` takes it away early.
 *
 * ```ts
 * const countdown = new HudLine();
 * countdown.show(player, `${left}`, { color: [255, 50, 50], hold: 1.1 });
 * countdown.clear(player);
 * countdown.clearAll();
 * ```
 *
 * AMX Mod X's HUD sync object underneath (CreateHudSyncObj, ShowSyncHudMsg).
 */
export declare class HudLine {
    private handle;
    show(player: Player, text: string, options?: HudOptions): void;
    clear(player: Player): void;
    /** Takes it off every screen. */
    clearAll(): void;
}
/** Which way a fade goes: "in" from the colour to a clear view, "out" from a clear view to the colour. */
export type FadeDirection = "in" | "out";
/** How `player.screen.fade` colours the screen. Times are seconds. */
export declare class FadeOptions {
    /** Red, green, blue and alpha, 0 to 255. */
    color?: number[];
    /** Seconds the fade takes. */
    duration?: number;
    /** Seconds the full colour holds. */
    hold?: number;
    /** "in" (the default) fades from the colour to a clear view, "out" from a clear view to the colour. */
    direction?: FadeDirection;
    /** The colour stays on the screen until the next fade (FFADE_STAYOUT). */
    stay?: boolean;
    /** Tints what is on the screen rather than painting over it (FFADE_MODULATE). */
    modulate?: boolean;
}
/** How `player.screen.shake` shakes the view. */
export declare class ShakeOptions {
    /** How far the view moves, up to 16 units. */
    amplitude?: number;
    /** Seconds it lasts. */
    duration?: number;
    /** Shakes a second. */
    frequency?: number;
}
/** What a status icon does: taken away, lit, or flashing. */
export type StatusIconState = "hide" | "show" | "flash";
/**
 * What one player sees drawn over the world: fades, shakes, status icons and
 * the parts of the HUD the game draws itself.
 *
 * ```ts
 * player.screen.fade({ color: [0, 0, 0, 255], duration: 0.5, hold: 1, stay: true });
 * player.screen.shake({ amplitude: 8, duration: 1, frequency: 5 });
 * player.screen.statusIcon("dmg_cold", "show", [0, 160, 255]);
 * ```
 *
 * Each is one user message to this player (ScreenFade, ScreenShake,
 * StatusIcon, ...). Times are seconds; the message's own units - ScreenFade
 * counts 1/4096 s - are the hood's.
 */
export declare class Screen {
    private id;
    constructor(id: i32);
    private begin;
    /** Colours the screen, fading it in or out: ScreenFade. */
    fade(options?: FadeOptions): void;
    /** Shakes the view: ScreenShake. */
    shake(options?: ShakeOptions): void;
    /**
     * A status icon by its sprite name (sprites/hud.txt: "dmg_cold",
     * "buyzone", "c4", ...) lit, flashing or taken away, in a colour: StatusIcon.
     */
    statusIcon(sprite: string, state: StatusIconState, color?: number[]): void;
    /**
     * The round clock at the top of the HUD, in seconds: RoundTime. Sent
     * unreliably, as the game sends it: a client whose reliable channel is
     * backed up stops drawing the clock.
     */
    roundTime(seconds: number): void;
    /**
     * Tells the client now which parts of the HUD to hide: HideWeapon.
     * `player.hideHud` is what the game itself sends a frame later; this is
     * for when that frame is too late.
     */
    hideHud(parts: HideHud[]): void;
    /** Whether the client draws Counter-Strike's own crosshair: Crosshair. */
    crosshair(shown: boolean): void;
    /** The flashlight icon: on or off, and its battery in percent: Flashlight. */
    flashlight(on: boolean, battery?: number): void;
}
/** What a cvar's change listener gets. */
export declare class CvarChangeEvent {
    /** The cvar that changed. */
    cvar: Cvar;
    /** What it held before. */
    oldValue: string;
    /** What it holds now. */
    value: string;
    constructor(
    /** The cvar that changed. */
    cvar: Cvar, 
    /** What it held before. */
    oldValue: string, 
    /** What it holds now. */
    value: string);
}
export type CvarListener = (event: CvarChangeEvent) => void;
/**
 * @hidden The start of every exported native. A Pawn plugin calls one from
 * its plugin_init at the earliest - often before the host's own - and by then
 * plugin_natives is over, so a Cvar the native makes (nhnse_register_cvar)
 * is made at once rather than when this plugin's init comes.
 */
export declare function __nativeCall(): void;
/**
 * A server cvar, as an input's `value`:
 *
 * ```ts
 * const freeze = new Cvar("mp_freezetime");
 * freeze.number = 5;
 * const speed = new Cvar("my_speed", "250");     // made with 250 if it does not exist
 * speed.addEventListener("change", (event) => console.log(`${event.oldValue} -> ${event.value}`));
 * ```
 *
 * `value` is the text, as the server keeps it; `number` and `boolean` read and
 * write the same cvar as a number and as a switch. One class rather than
 * Cvar<number> and Cvar<string>: a cvar is text underneath and is read either
 * way, and a generic would need the kind named twice for nothing.
 */
export declare class Cvar {
    name: string;
    private defaultValue;
    /** The engine's handle for it; 0 when there is no such cvar. */
    pointer: i32;
    private listeners;
    private hooked;
    constructor(name: string, defaultValue?: string | null);
    /**
     * @internal Finds or creates the cvar and hooks it. A plugin's top level
     * runs during plugin_natives, and create_cvar there takes the server down
     * while it loads; so a Cvar made that early waits for plugin_init.
     */
    attach(): void;
    private hook;
    /** Whether the cvar exists on the server. */
    get exists(): bool;
    /** The text it holds. */
    get value(): string;
    set value(text: string);
    /** The same as a number. A whole number is written as one: "5", not "5.000000". */
    get number(): number;
    set number(value: number);
    /** The same as a switch: on for anything but 0. */
    get boolean(): bool;
    set boolean(on: bool);
    /** Calls `listener` whenever the cvar's value changes. */
    addEventListener(type: "change", listener: CvarListener): void;
    /** Stops calling a listener added with addEventListener. */
    removeEventListener(type: "change", listener: CvarListener): void;
    /** @internal The trampoline's way in. */
    dispatch(event: CvarChangeEvent): void;
}
export declare class Server {
    /** Calls `listener` every time the server raises `type`. */
    addEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /** Stops calling a listener added with addEventListener - the same function. */
    removeEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /** The map that is running. */
    get map(): string;
    /** How many player slots the server has. */
    get maxPlayers(): number;
    /**
     * Where AMX Mod X keeps its configs, relative to the game folder - what
     * `fs` takes: `addons/amxmodx/configs` unless the server moved it
     * (`amxx_configsdir`, Pawn's get_configsdir).
     *
     * ```ts
     * const text = fs.readFileSync(`${server.configsDir}/hns.ini`);
     * ```
     */
    get configsDir(): string;
    /** Where AMX Mod X keeps plugin data - `addons/amxmodx/data` unless moved (`amxx_datadir`). */
    get dataDir(): string;
    /**
     * Runs a command in the server's console, as if it had been typed there:
     * `server.command("changelevel " + map)`.
     *
     * server_cmd takes a `...` tail, so this goes through the dispatcher - and
     * passes the text as an argument rather than as the format, because a map
     * name with a % in it would otherwise be read as a conversion.
     */
    command(text: string): void;
    /**
     * A command players type: `"/hp"` in chat (say and say_team), a name
     * without the slash in the console.
     *
     * ```ts
     * server.addCommand("/hp", (player, args) => print(player, `${player.health} HP`));
     * server.addCommand("/kick", kick, { access: "Kick", description: "Kick a player" });
     * ```
     *
     * `args` are the words after the name. A chat command is not repeated in
     * chat when it runs; one the player may not use is left alone. A name
     * `"say <phrase>"` is a chat line without a slash - `"say time"` runs when
     * someone says exactly "time".
     */
    addCommand(name: string, handler: CommandHandler, options?: CommandOptions): void;
    /**
     * A command of the server's own console - typed there, sent over rcon or
     * run by another plugin's server_cmd. No player types it.
     *
     * ```ts
     * server.addServerCommand("hns_reset", (args) => reset(args.length > 0 ? args[0] : "all"));
     * ```
     *
     * `args` are the words after the name, as the engine split them.
     * Registered with the engine at plugin_init, so it may be added from the
     * top of the file.
     */
    addServerCommand(name: string, handler: ServerCommandHandler): void;
    /** A HUD message for everyone on the server - see player.showHud. */
    showHud(text: string, options?: HudOptions): void;
}
/** The server this plugin runs on. */
export declare const server: Server;
/**
 * The game's own events - reapi's hookchains - as a DOM target:
 *
 * ```ts
 * game.addEventListener("takeDamage", (event) => {
 *   if (event.player.isBot) event.preventDefault();
 * });
 * game.addEventListener("canPlayerHearPlayer", (event) => event.listener.team == event.sender.team);
 * game.addEventListener("flPlayerFallDamage", (event) => event.result / 2, true);
 * ```
 *
 * The event is typed by its name, like `server`'s. What the listener returns
 * is the chain's answer: in a pre listener it replaces what the game would
 * have done, in a post listener it replaces what it did. A listener that
 * returns nothing lets the game decide, and `event.preventDefault()` blocks
 * without an answer. Returning a value of the wrong type - a string where the
 * chain answers true or false - is an editor error and a compile error.
 */
export declare class Game {
    /**
     * Calls `listener` every time the game runs `type`.
     *
     * `post`: after the game has done its part, with its answer in
     * event.result. False by default - before it, able to stop it - as
     * RegisterHookChain's and RegisterHam's own `post = 0`.
     */
    addEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /** Stops calling a listener added with addEventListener - the same function and the same `post`. */
    removeEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /**
     * Ends the round now:
     *
     * ```ts
     * game.endRound({ winner: "TERRORIST" });                 // the hiders win, next round in 5 s
     * game.endRound({ winner: "draw", delay: 3 });
     * game.endRound({ winner: "none", message: "" });         // a quiet restart: no message
     * ```
     *
     * The winner decides the score, the message and the sound the game uses
     * for such an end ("Terrorists Win!"); `message` and `sound` replace them,
     * "" for none. reapi's rg_round_end.
     */
    endRound(options: EndRoundOptions): void;
}
/** Who wins a round game.endRound ends: a side, a draw, or nobody - a restart. */
export type RoundWinner = "TERRORIST" | "CT" | "draw" | "none";
/** How `game.endRound` ends the round. Only `winner` is needed. */
export declare class EndRoundOptions {
    /** Who wins: "TERRORIST", "CT", "draw", or "none" - a restart. */
    winner: RoundWinner;
    /** Seconds until the next round starts. */
    delay?: number;
    /** The centre message, or a #CSTRIKE_ token; "default" is the one for this winner, "" none. */
    message?: string;
    /** The sound (a radio sentence); "default" is the one for this winner, "" none. */
    sound?: string;
    /**
     * Tell the roundEnd listeners - every plugin's game.addEventListener("roundEnd"),
     * Pawn's RG_RoundEnd hooks - as when the game ends a round itself. False by
     * default, as rg_round_end's `trigger`: a roundEnd listener that ends the
     * round again would call itself.
     */
    dispatch?: boolean;
}
export declare const game: Game;
/**
 * Which kind of message to send a player.
 *
 * Strings rather than numbers, so that `{ variant: "chat" }` reads as itself
 * and these constants are only for an editor to complete. The number AMX Mod X
 * wants is looked up when the message is sent; a name it does not know falls
 * back to the chat, where a message is least likely to be missed.
 *
 * These are client_print's four and nothing else. The server console is a
 * different native with no recipient at all, which is why `log` takes neither
 * an id nor a variant.
 */
export declare namespace Variant {
    const chat: string;
    const center: string;
    const console: string;
    const notify: string;
}
/** Every name a message's variant accepts, for an editor to complete. */
export type VariantName = "chat" | "center" | "console" | "notify";
export { Flag } from "./constants";
export * from "./events";
import { FlagName, HookName, HamName } from "./constants";
import { PlayerFields } from "./entities";
export { Entity, Weapon, WeaponKind, weaponKindOf } from "./entities";
import { ServerEventMap } from "./events";
/**
 * Who a message goes to, when there is more to say than a player id.
 *
 * `id` rather than a Player, because that is what a handler is handed - and
 * what 0 means, which is everyone.
 */
export declare class Target {
    /** The player's id; 0 is everyone. */
    id: number;
    /** Where it shows: "chat", "center", "console" or "notify". */
    variant?: VariantName;
}
/**
 * Says something to a player, or to everyone with id 0.
 *
 *   print(id, `${player.name}, your HP: ${player.health}`)
 *   print(id, "middle of the screen", "center")
 *   print(0, "everyone")
 *   print({ id, variant: "center" }, "the same, as an object")
 *
 * Both forms, and both checked. AssemblyScript has no function overloading,
 * and an object literal takes its type from the parameter it is passed to, so
 * accepting either shape means a type parameter - and a type parameter is
 * inferred from whatever arrives, which is how the checking was lost at first.
 * The constraint is what brings it back: TypeScript holds `Target | number`
 * and refuses a string, and refuses a misspelled variant inside the object
 * with the right spelling suggested. AssemblyScript cannot hold a constraint
 * of two types at all - it resolves a generic to one - so runtime/patches
 * lets it read the constraint and leave the enforcement to TypeScript, with
 * the ERROR below as the backstop that survives compilation.
 *
 * Chat is painted: `!g` green, `!y` yellow, `!t` the sender's team colour,
 * `!r` red, `!b` blue, `!w` grey. A `!` that is not one of those is left
 * alone, and the other variants ignore them.
 *
 * **One team colour to a line.** Red, blue, grey and `!t` are all the same
 * byte - what differs is the team the recipient's client is told the sender is
 * on, and that is one swap per message. `!rRed !bBlue` comes out red twice:
 * the first tag wins. Green and yellow are colours of their own and mix with
 * it freely.
 */
/**
 * Turns the colour tags into the bytes a client reads, and says which team the
 * recipient has to be told the sender is on.
 *
 * Exported because it is the part worth testing: a client is not needed to see
 * what bytes were built. `swapTeam` holds the answer to the second half until
 * the line is sent - the two always travel together.
 */
export declare function paint(text: string): string;
/** What paint() decided, read by print immediately afterwards. */
export declare let swapTeam: string;
export declare function print<T extends Target | Client | number = Target>(to: T, message: string, variant?: VariantName): void;
export declare namespace cvar {
    function num(name: string): number;
    function setNum(name: string, value: number): void;
    function str(name: string): string;
    function setStr(name: string, value: string): void;
}
/** Registers a client command. The handler receives the player who typed it. */
export declare function cmd(pattern: string, handler: Handler, flag?: FlagName, info?: string): void;
/**
 * The same, for a command that wants its other arguments or has to answer.
 *
 * A client command's handler is called with (id, level, cid); returning
 * `Continue` lets AMX Mod X pass the command on to whoever else registered it.
 */
export declare function cmdWide(pattern: string, handler: WideHandler, flag?: FlagName, info?: string): void;
/** What a timer runs. */
export type TimerHandler = () => void;
/**
 * Runs the handler once, after a delay in milliseconds, and returns its
 * handle - as in the browser:
 *
 * ```ts
 * const handle = setTimeout(() => print(player, "Welcome!"), 2000);
 * clearTimeout(handle);
 * ```
 *
 * The handler may use the variables around it. A server timer (set_task)
 * underneath, so it is as fine-grained as a server frame.
 */
export declare function setTimeout(handler: TimerHandler, ms?: number): number;
/** What sleep() takes besides the time. */
export declare class SleepOptions {
    /** Gives the wait up when it aborts: the promise rejects with its reason. */
    signal?: AbortSignal | null;
}
/**
 * A promise fulfilled after `ms` - the way to wait inside an async function:
 *
 * ```ts
 * await sleep(1000);
 * await sleep(5000, { signal: AbortSignal.timeout(2000) }); // rejects after 2 s
 * ```
 *
 * A server timer (set_task) underneath, so it is as fine-grained as a server
 * frame. Inside an async command handler or player event it also ends when
 * that player leaves.
 */
export declare function sleep(ms: number, options?: SleepOptions): Promise<void>;
/** The same, firing every `ms` until clearInterval stops it. */
export declare function setInterval(handler: TimerHandler, ms: number): number;
/**
 * Stops the timer with that handle, and gives its callback slot back. A
 * handle that is not armed - fired already, cleared already - is ignored.
 *
 * Not the raw `remove_task`: a task armed here belongs to the host plugin,
 * and remove_task's default is to look only at the plugin asking, so it finds
 * nothing. Measured - a repeating task went on firing through it.
 */
export declare function clearTimeout(handle: number): void;
/** The same. Two names because a reader expects both. */
export declare function clearInterval(handle: number): void;
/**
 * A native with a `...` tail, built one argument at a time.
 *
 * WebAssembly fixes an import's arity, so these cannot be declared in
 * as/natives.ts at all — only their ids are. Each argument says what it is,
 * because a tail carries no types and the module cannot infer them:
 *
 *   new Call(NATIVE_server_print).str("%s").str(text).run();
 *
 * **Read the declaration and find the `...`.** Everything before it is an
 * ordinary parameter and goes as it is, with `num` or `str`. Everything after
 * it is a tail argument, and Pawn pushes a tail by address rather than by
 * value, so a number there goes through `ref` - which gives it a cell of its
 * own - and `out(i)` reads back whatever the native wrote into that cell. A
 * string is already an address either way.
 *
 *   ExecuteHam(Ham:function, this, any:...)      num, num, then the tail
 *   SetHookChainArg(number, AType:type, any:...) num, num, then the tail
 *   ExecuteForward(handle, &ret, any:...)        num, ref for &ret, then tail
 *
 * Getting this wrong is quiet and expensive: `ExecuteHam` given the entity by
 * address reported "Entity out of range" from somewhere else entirely, and
 * the knife redirect it was meant to perform simply never happened.
 */
export declare class Call {
    private id;
    private args;
    private mask;
    private cells;
    private held;
    private n;
    constructor(id: i32);
    /** A cell as it stands: an entity index, a constant, a count. */
    num(value: number): Call;
    /** A float, which in Pawn is a cell holding its bit pattern. */
    float(value: f64): Call;
    str(text: string): Call;
    /** Cells the native reads and may write back. The length follows it. */
    buffer(cells: CellBuffer, length: number): Call;
    /**
     * Three floats at one address - an origin, an angle, a colour.
     *
     * Not `buffer`, which is followed by its length because that is how a
     * native that fills one is declared. A vector carries its own length.
     */
    vec(x: f64, y: f64, z: f64): Call;
    /**
     * A vector the native fills in, read back from the caller's own buffer.
     *
     * `vec` holds its three cells privately, which is right for handing one
     * over and useless for getting one back - a velocity, an origin, a colour
     * the caller means to change and put back. The three cells stay where the
     * caller can read them after `run`.
     */
    vecInto(cells: CellBuffer): Call;
    /** A value passed by address, as a `...` tail argument must be. */
    ref(value: number): Call;
    /** What the native left in the `ref` argument at that position. */
    out(index: i32): number;
    run(): number;
}
/**
 * Registers a reapi hookchain with a raw, cell-level handler - the hood under
 * game.addEventListener, which is what a plugin uses. as/hooks.ts calls this
 * once per chain and side; a plugin calling it directly gets the Pawn shape
 * (four cells, HC_* by hand) that the typed events exist to hide.
 *
 * The name is reapi's, with the class dropped where it is not needed to tell
 * two chains apart - `RG_CSGameRules_RestartRound` is `"restart_round"`, and
 * `RG_CBasePlayer_Spawn` is `"player_spawn"`. An editor completes them, and a
 * misspelling fails the build.
 *
 * The handler is wide because a hookchain hands over its arguments and expects
 * `HC_CONTINUE` or `HC_SUPERCEDE` back. The numbers behind the names are
 * computed from reapi's own includes, and reapi moves them between releases -
 * take the includes from the release your server runs, or a registration lands
 * on an unrelated chain in silence.
 *
 * Returns reapi's handle, which EnableHookChain and DisableHookChain take.
 */
export declare function hook(name: HookName, handler: WideHandler, post?: bool): number;
/** The same for Ham Sandwich: `ham("spawn", "player", onSpawn)`. */
export declare function ham(name: HamName, entityClass: string, handler: WideHandler, post?: bool): number;
/**
 * What a plugin says about itself, for `amxts_plugins` in the server console.
 *
 * Every field is spelled out because TypeScript wants a whole object where
 * AssemblyScript would take a piece of one, and a plugin declares itself once.
 * AMX Mod X has one entry per .amxx file and every plugin here shares the
 * host's, so this is the only place their names exist.
 */
export declare class PluginInfo {
    /** The plugin's name, as `amx plugins` lists it: "My Plugin". */
    name: string;
    /** Its version, as `amx plugins` lists it: "1.0.0". */
    version: string;
    /** Who wrote it. */
    author: string;
    /** What it does, in a line. */
    description: string;
    /**
     * The Pawn include this plugin's natives implement - `"myplugin.inc"`,
     * from includes/ or beside the plugin. The build reads it: each exported
     * function crosses to Pawn as that include declares it, and the include
     * is what Pawn plugins get.
     */
    include?: string;
}
export declare function plugin(info: PluginInfo): void;
/**
 * What amxts.config.ts sets for each module, under its configKey. Empty here:
 * a module adds its own key by augmenting this interface in "@amxts/core" -
 * `menus?: Partial<MenuCoreOptions>` - and the editor types the config from it.
 */
export interface ModuleOptions {
}
/**
 * A module's definition - `export default defineModule<Options>({ meta,
 * requires, defaults, setup })` in its module file, global like Nuxt's.
 * asc never compiles the call: the build reads meta, requires and defaults
 * from the source and turns setup into a function of the module that its
 * top level calls with the merged options (scripts/project.ts). This is
 * here, and global, so that an explicit `import { defineModule } from
 * "@amxts/core"` resolves too; its types for the editor are in amxts.d.ts.
 */
export declare function defineModule<T>(definition: AmxtsModule<T>): AmxtsModule<T>;
/**
 * When the plugins answering a forward stop it: `"never"` - everyone hears
 * it, whatever they return - or `"handled"`, the first PLUGIN_HANDLED ends it.
 */
export type ForwardStop = "never" | "handled";
/** The type argument a Forward leaves unused: `Forward<number>` has one argument. */
export declare class NoArgument {
}
/** What subscribe() hangs on: a Forward, reached by its tag - see forwardTrampoline. */
declare abstract class ForwardListener {
    abstract deliver(a: i32, b: i32, c: i32): void;
}
/**
 * A forward other plugins hook, Pawn and TypeScript alike. The arguments are
 * its type parameters:
 *
 * ```ts
 * const roundStart = new Forward("nhnse_on_round_start");
 * const roundEnd = new Forward<RoundWinner>("nhnse_on_round_end");
 * const configChanged = new Forward<string, string>("nhnse_on_config_changed");
 *
 * roundStart.emit();
 * roundEnd.emit(winner);
 * configChanged.emit(id, value);
 *
 * const swapped = new Forward<Player, Player>("nhnse_on_player_swapped");
 * swapped.emit(catcher, caught);              // Pawn gets their ids
 * ```
 *
 * A Pawn plugin hooks it with `public nhnse_on_round_end(winner)`, as it
 * always has. Which FP_* constant each argument is follows from its type -
 * number, boolean and Player (his id) a cell, string a string - and ET_IGNORE
 * is the default; neither is the plugin's business. A `Team` goes as its
 * TeamName number, a `RoundWinner` as its WinStatus number and a number as a
 * Float where the forward's declaration in an include says so
 * (`forward x(id, TeamName:team)`, `WinStatus:status`): the build reads it and
 * hands the Forward the second constructor argument. A Team for a forward no
 * include declares is a build error - it would reach Pawn as text.
 *
 * The forward is made on its first emit, or by `create()` at a moment of the
 * plugin's choosing - CreateMultiForward finds the plugins that hook it at the
 * moment it runs, so it has to wait until they are all loaded (plugin_cfg or
 * later), and runs only once.
 *
 * `subscribe(handler)` - a TypeScript plugin hooking the same forward, typed
 * by the same parameters - is the agreed name and the next step: the host
 * would have to tell a handler which forward called it (docs/API-DESIGN.md).
 */
export declare class Forward<A = NoArgument, B = NoArgument, C = NoArgument> extends ForwardListener {
    name: string;
    private crossing;
    /** Set before the first emit; nobody stops the forward unless told to. */
    stopWhen: ForwardStop;
    private handle;
    private tag;
    private handlers;
    /**
     * @param name The forward's name, as Pawn plugins hook it.
     * @param crossing @internal Written by the build from the forward's Pawn
     * declaration - see crossForwards in scripts/plugin-natives.ts.
     */
    constructor(name: string, crossing?: string);
    private crossingOf;
    /**
     * Calls `handler` each time the forward is emitted - by this plugin, another
     * TypeScript plugin, or a Pawn plugin:
     *
     * ```ts
     * const greeted = new Forward<string, number>("showcase_on_greeted");
     * greeted.subscribe((name, count) => console.log(`${name}: ${count}`));
     * ```
     *
     * The parameters take the forward's types, so an arrow needs no annotations,
     * and a named function may take fewer of them.
     *
     * A forward a Pawn plugin creates reaches TypeScript only when it is
     * declared in an include the host plugin is built from (nhnse_on_* are):
     * AMX Mod X calls a forward by public name, and the host has a public for
     * exactly those. Emitted from TypeScript, any forward reaches every
     * subscriber.
     */
    subscribe(handler: (a: A, b: B, c: C) => void): void;
    /** Stops calling a handler subscribe() was given. */
    unsubscribe(handler: (a: A, b: B, c: C) => void): void;
    deliver(a: i32, b: i32, c: i32): void;
    /** Makes the forward now rather than on its first emit. Once; later calls do nothing. */
    create(): void;
    /** Sends the forward to every plugin that hooks it. True if it went out. */
    emit(a?: A, b?: B, c?: C): boolean;
}
/**
 * Key to text, kept on disk: a Map that survives a map change and a restart.
 *
 * ```ts
 * const demos = new Storage("core_demo_counters");
 * const last = demos.get(auth);      // string | null
 * demos.set(auth, "3");
 * if (demos.has(auth)) ...
 * demos.delete(auth);
 * ```
 *
 * nVault underneath - a file under addons/amxmodx/data/vault named after the
 * storage, opened on first use. Values are text, as nVault's are: a number
 * goes in through toString() and comes out through parseInt.
 */
export declare class Storage {
    name: string;
    private vault;
    constructor(name: string);
    /** The value under `key`, or null when there is none. */
    get(key: string): string | null;
    set(key: string, value: string): void;
    has(key: string): boolean;
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
 * A public function of another plugin: a Pawn plugin's, or a TypeScript
 * plugin's publicFor name (a public of the host plugin).
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
    readonly plugin: i32;
    readonly index: i32;
    constructor(plugin: i32, index: i32);
    /** `name` in the plugin with that id - a native's caller(); null when it has no such public. */
    static find(plugin: number, name: string): PawnFunction | null;
    call(): PawnCall;
}
/**
 * One call of a PawnFunction: its arguments in order, then run().
 *
 * callfunc_begin_i and callfunc_push_int as they are; a string and an array
 * go through the module's callfunc_text / callfunc_buffer, which keep them on
 * the host heap until callfunc_finish (callfunc_end) and copy the array back
 * here. callfunc_push_str / callfunc_push_array could not: each put its
 * argument at the same address for the length of that one native, and AMX Mod
 * X took the second for the first (runtime/src/module.cpp).
 */
export declare class PawnCall {
    private fn;
    private kinds;
    private ints;
    private texts;
    private cells;
    /** What the function wrote into its buffer(), once run() is over. */
    bufferText: string;
    constructor(fn: PawnFunction);
    int(value: number): PawnCall;
    bool(value: boolean): PawnCall;
    text(value: string): PawnCall;
    /** An array the function fills - `value[]` - of `size` cells. One per call. */
    buffer(size: number): PawnCall;
    /** Calls it; what it returned, or 0 when it could not be called. */
    run(): number;
    private add;
}
/** A new AMX Mod X `Array:` of `cellSize` cells an item; its handle. */
export declare function createCellArray(cellSize: number): number;
export declare function destroyCellArray(handle: number): void;
/** Every item of an `Array:` of `cellSize` cells an item, each as its cells. */
export declare function cellArrayRows(handle: number, cellSize: number): number[][];
/** One item of cells onto an `Array:`. */
export declare function pushCellArrayRow(handle: number, row: number[]): void;
/** The Pawn string in `count` cells of a row from `start`: a byte of UTF-8 a cell, up to a zero one. */
export declare function cellsText(row: number[], start: number, count: number): string;
/** Text as `count` cells of a Pawn string: at most count - 1 bytes, never half a letter, zero-filled. */
export declare function textCells(text: string, count: number): number[];
/**
 * show_menu for text of any length. Up to 500 bytes it is show_menu itself;
 * beyond that the head goes out first as ShowMenu messages marked "more" -
 * the client joins them - and show_menu sends the rest, which ends the menu
 * and tells AMX Mod X its title, so the keys reach register_menucmd.
 *
 * The text is written with the colour tags chat uses - `!y` yellow, `!r` red,
 * `!w` white, `!d` grey, `!R` to the right edge - and the game's own codes
 * (`\y`, as an old menu.ini has them) pass as they are.
 */
export declare function showMenu(id: number, keys: number, text: string, title: string): void;
/**
 * How `menus.show` (~/modules/menu-core) opens a menu - an object literal,
 * each field with its default: `menus.show(player, "SHOP", { time: 10 })`.
 *
 * A class, like PlayerFilter, and here rather than beside the menus: a
 * TypeScript interface with optional fields is what it should be, and
 * AssemblyScript does not take one yet (AS219) - docs/API-DESIGN.md.
 */
export declare class MenuShowOptions {
    /** Seconds on the countdown; -1 keeps the one running, or takes the menu's TIME. */
    time?: number;
    /** Who the menu is about: %target%, and the target an action gets. */
    target?: number;
    /** Starts the way back anew. */
    resetHistory?: boolean;
    /** Opens over a menu that holds on: a countdown, or locked. */
    force?: boolean;
    /** Leaves the menu out of the way back. */
    skipHistory?: boolean;
}
/** What `menus.addItem` (~/modules/menu-core) takes besides the name - see MenuShowOptions for why a class. */
export declare class MenuItemOptions {
    /** Text after the name, placeholders and all: "%hp%". */
    placeholder?: string;
    /** The condition it is shown under - a name from addCondition, "!NAME" for its opposite, several space-separated must all hold. */
    condition?: string;
    /** What choosing it does - a name from addAction, or a built-in: "SHOW_<MENU>", "CLOSE_MENU". */
    action?: string;
    /** What choosing it does, instead of naming an action. */
    onSelect?: ((player: Player, target: number, name: string) => void) | null;
    /** Greys it out while it holds - a name from addRestriction, "ADMIN" or "FLAG_<letters>". */
    restriction?: string;
    /** Shown beside it while it is greyed out; "" is the restriction's own message. */
    restrictionMessage?: string;
    /** Its place among the items; -1 is the end. */
    at?: number;
    /** Blank lines before it. */
    spaceBefore?: number;
    /** Blank lines after it. */
    spaceAfter?: number;
}
