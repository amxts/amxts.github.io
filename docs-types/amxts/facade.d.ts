/// <reference path="../as-types.d.ts" />
/// <reference path="./amxts.d.ts" />
import "./promise";
import { Vector } from "./vector";
/** A handler that takes a player `id` and returns nothing — what player events and commands call. */
export type Handler = (id: number) => void;
/**
 * A handler that takes up to four numbers and returns nothing: for a forward
 * that passes more than a player `id`, and for a hookchain.
 *
 * A string argument arrives as a number: read it with `argString`. To stop
 * the event, or to block what a hookchain hooks, call `handled()`.
 */
export type WideHandler = (a: number, b: number, c: number, d: number) => void;
/** @hidden For the hood: what the server calls for `handler`. */
export declare function hostIndex<T>(handler: T, wide: bool): i32;
/**
 * Stops the event: AMX Mod X passes it to no one else, and a hookchain does
 * not call what it hooked. Applies only to the handler that is running.
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
 * Converts a number to a Pawn `Float:` cell, for a raw native or `ret()`:
 *
 *   ret(floatCell(2.5));
 *   rg_round_end(floatCell(5.0), ...);
 */
export declare function floatCell(value: f64): number;
/**
 * Rounds a number to the nearest whole number: a round time of 59.6 seconds
 * is `60`, not `59`.
 *
 * Pawn: `floatround`
 */
export declare function rounded(value: number): number;
/** Converts a Pawn `Float:` cell back to a number. */
export declare function cellFloat(cell: number): f64;
/** Sets the value an exported native returns to the plugin that called it. */
export declare function ret(value: number): void;
/**
 * A public name that calls `handler`, for an AMX Mod X native that takes a
 * callback by name: `register_think`, `set_native_filter`.
 *
 * ```ts
 * const pub = publicFor(onThink, "think:myplugin_box");
 * if (pub.length > 0) register_think("myplugin_box", pub);
 * ```
 *
 * An empty name means “already registered”: such a registration cannot be
 * undone and survives a hot reload, so registering again would call the
 * handler twice. `key` identifies the registration across reloads — any name
 * unique within the plugin. `fallback` is the answer when the handler returns
 * nothing: `0` for most natives, `1` where the native expects the event handled.
 *
 * Register from the `"cfg"` event, not at the top of the file: a console
 * command registered that early (`register_concmd`, `register_srvcmd`) crashes
 * the server when typed.
 */
export declare function publicFor(handler: WideHandler, key: string, fallback?: number): string;
/**
 * Exports a native for other plugins - Pawn ones included - to call.
 *
 *   nativeFn("myplugin_get_mode", getGameMode)
 *
 *   function getGameMode(a: number, b: number, c: number, d: number) {
 *     ret(mode);
 *   }
 *
 * The handler gets the first four arguments as numbers; `arg(i)` and
 * `argText(i)` read any of them, `setArg` and `setArgText` write back.
 * Simpler: an `export function` of the entry file is a native with real
 * types (see the Natives page).
 *
 * Call it at the top level of the file: AMX Mod X asks every plugin for its
 * natives before it starts any of them.
 *
 * Pawn: `register_native`
 */
export declare function nativeFn(name: string, handler: WideHandler): void;
/**
 * A number that a plugin's own native passes to Pawn as `Float:`.
 *
 * To TypeScript it is `number`. Write it only in the signature of an exported
 * native, where Pawn has to know which numbers are fractional; everywhere
 * else a number is `number`.
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
 * A dynamic array of AMX Mod X, for returning a list to a Pawn plugin that
 * expects an `Array:` handle.
 *
 * ```ts
 * export function cfg_get_value_array(section: ConfigSection, key: string) {
 *   const words = lookup(section, key);                // string[] | null
 *   return words != null ? CellArray.fromStrings(words) : null;
 * }
 * // native Array:cfg_get_value_array(ConfigSection:section, const key[]);
 * ```
 *
 * The Pawn plugin that gets the array owns it and destroys it; `null` reaches
 * it as `Invalid_Array`. Inside TypeScript a list is a `string[]` or a
 * `number[]`: this class is only for handing one to Pawn.
 *
 * Pawn: `ArrayCreate`, `Array:`
 */
export declare class CellArray {
    /** The array's handle, the `Array:` Pawn gets. */
    readonly handle: i32;
    /** An empty array whose items are `cellSize` cells each: 1 for a number, the buffer size for text. */
    constructor(cellSize?: number);
    /** A new array of strings, each up to `cellSize - 1` bytes. */
    static fromStrings(values: string[], cellSize?: number): CellArray;
    /** A new array of fractional numbers, which Pawn reads as `Float:`. */
    static fromFloats(values: number[]): CellArray;
    /** The number of items in the array. */
    get length(): number;
    /** Adds a string; it must fit in `cellSize - 1` bytes of UTF-8. */
    pushString(value: string): void;
    /** Adds a whole number, or another array's handle. */
    pushCell(value: number): void;
    /** Adds a fractional number, which Pawn reads as `Float:`. */
    pushFloat(value: number): void;
    /** Adds one item of several numbers: `[a, b]` into an array made with `new CellArray(2)`. */
    pushCells(values: number[]): void;
}
/**
 * Reads an argument of the running handler by position; `0` is its first
 * parameter. Useful past the fourth, which a handler does not get as a
 * parameter.
 *
 *   function onSomething(a: number, b: number, c: number, d: number) {
 *     const fifth = arg(4);
 *   }
 */
export declare function arg(index: number): number;
/**
 * Reads an argument of the running callback as a string.
 *
 * A forward's strings need no call: its handler gets them as text already.
 */
export declare function argText(index: number): string;
/**
 * The number of arguments the running call actually carried.
 *
 * A handler always gets four, padded with zeros, so a native with optional
 * arguments tells a passed zero from a missing one by this:
 *
 *   const flashes = argc() >= 2 ? arg(1) : -1;
 */
export declare function argc(): number;
/**
 * The `id` of the plugin that called the running exported native, or `-1`.
 *
 * For a native that is about its caller: a cvar registered by a plugin, a
 * chat prefix set for one.
 */
export declare function caller(): number;
/**
 * Writes a number back through an argument passed by reference (`&value`
 * in Pawn).
 *
 * Pawn: `set_param_byref`
 */
export declare function setArg(index: number, value: number): void;
/**
 * Writes text back through a string argument.
 *
 * For a callback that hands over a buffer to fill rather than text to read.
 * `max` is the room the caller gave, usually the argument right after the
 * buffer.
 *
 *   function placeholder(id: number, target: number, out: number, max: number) {
 *     setArgText(2, "ready", max);
 *   }
 */
export declare function setArgText(index: number, text: string, max: number): void;
/** Reads a string argument that a wide handler got as a number. */
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
/** Reads the text a raw native from `~/natives` wrote into a cell array. `stringToCells` is the other way. */
export declare function cellsToString(cells: StaticArray<i32>): string;
/** Writes text into a cell array as a Pawn string, for a raw native. */
export declare function stringToCells(text: string, cells: StaticArray<i32>): void;
/**
 * Passes a string to a raw native from `~/natives` without declaring a
 * buffer for it:
 *
 *   cfg_set_base_dir(cells("myplugin"));
 *
 * Up to eight strings in one call; a ninth overwrites the first. Only for
 * arguments going in: a native that writes text back needs `out()`.
 */
export declare function cells(text: string): number;
/**
 * A buffer for a raw native to write text into; `text()` reads it back.
 *
 *   const name = out();
 *   get_user_name(id, name, TEXT_MAX);
 *   console.log(text(name));
 *
 * Up to four at once. A number a native writes through a `&reference` needs
 * one too; `cell()` reads it back.
 */
export declare function out(): number;
/** Reads the text a native wrote into an `out()` buffer. */
export declare function text(buffer: number): string;
/**
 * A row of numbers for a native to read from or write into: a vector, a list
 * of players, a line of text. Used like an ordinary array - `buffer[0]`,
 * `buffer.float(2)`, `buffer.text()` - and its `address` is what the native
 * takes.
 *
 *   const origin = new CellBuffer(3);
 *   entity_set_origin(cube, origin.address);
 */
export declare class CellBuffer {
    private data;
    constructor(length: number);
    /** A buffer of three fractional numbers, for a native that takes a vector: an origin, a size, a colour. */
    static vector(x: f64, y: f64, z: f64): CellBuffer;
    /** The number of cells in the buffer. */
    get length(): number;
    /** The buffer's address, the argument a native that takes an array needs. */
    get address(): number;
    /** The whole number in the cell at `index`: `buffer[0]`. */
    get(index: number): number;
    /** Puts a whole number in the cell at `index`: `buffer[0] = 5`. */
    set(index: number, value: number): void;
    /** The fractional number in the cell at `index`, which a native wrote as `Float:`. */
    float(index: number): f64;
    /** Puts a fractional number in the cell at `index`, for a native that reads `Float:`. */
    setFloat(index: number, value: f64): void;
    /** The text a native wrote into the buffer. */
    text(): string;
    /** Writes text into the buffer from the cell `at`, as a Pawn string. */
    write(at: number, value: string): void;
    /** Sets every cell to `value`: `buffer.fill(0)` clears it. */
    fill(value: number): void;
}
/** An array of `length` copies of `value`: `arrayOf(33, 0)`. Every slot is the same `value` - for objects, give each slot its own. */
export declare function arrayOf<T>(length: number, value: T): T[];
/** Reads the number a native wrote through an `out()` buffer passed as a `&reference`. */
export declare function cell(buffer: number): number;
/** Puts a number in an `out()` buffer, for a reference a native reads as well as writes. */
export declare function putCell(buffer: number, value: number): number;
/**
 * An empty origin for a message sent to one player:
 *
 *   message_begin(MSG_ONE, msgid, noOrigin(), id);
 *
 * Only messages sent to players near a point read the origin.
 */
export declare function noOrigin(): number[];
/** The length of text an `out()` buffer holds: `255`. */
export declare const TEXT_MAX: i32;
/** A Counter-Strike team, by the name the game gives it: one of `"TERRORIST"`, `"CT"`, `"SPECTATOR"`, `"UNASSIGNED"`. */
export type Team = "TERRORIST" | "CT" | "SPECTATOR" | "UNASSIGNED";
/** A weapon a player can hold, by its class name, e.g. `"weapon_ak47"` or `"weapon_knife"`. */
export type WeaponName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90";
/** An item `player.give` hands over: a weapon, armour (`"item_kevlar"`, `"item_assaultsuit"`) or the defuse kit (`"item_thighpack"`). */
export type ItemName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90" | "item_kevlar" | "item_assaultsuit" | "item_thighpack";
/** @hidden Every weapon's class name: what Ham Sandwich hooks a weapon's event on for "every weapon". */
export declare function __weaponClassnames(): string[];
/** An AMX Mod X module a plugin can check for, one of `"reapi"`, `"cstrike"`, `"fun"`, `"hamsandwich"`, `"engine"`, `"fakemeta"`. */
export type ModuleName = "reapi" | "cstrike" | "fun" | "hamsandwich" | "engine" | "fakemeta";
/**
 * `true` when the server has the module: `if (hasModule("reapi")) ...`.
 * Check it before a native that only one module has.
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
/** The options of `player.kill()`. */
export interface KillOptions {
    /** Keeps the player's frags: no penalty for the suicide. */
    keepFrags?: boolean;
}
/**
 * A connecting player, in `"connect"`, `"authorized"` and `"putinserver"`: name,
 * address, SteamID and team, but no health or weapons yet. Every Player is a
 * Client too.
 *
 * ```ts
 * server.addEventListener("putinserver", (event) => {
 * 	print(event.player, `Welcome, ${event.player.name}!`);
 * });
 * ```
 */
export interface Client {
    /** The player's slot, `1` to `32`. */
    readonly id: number;
    /** The player's name. */
    readonly name: string;
    /** The player's IP address without the port, e.g. `"192.168.0.10"`. */
    readonly ip: string;
    /** The player's SteamID, e.g. `"STEAM_0:1:12345"`. A bot has `"BOT"`, HLTV has `"HLTV"`; until Steam confirms the player it is `"STEAM_ID_PENDING"` (wait for the `"authorized"` event), and on a LAN server `"STEAM_ID_LAN"`. */
    readonly authid: string;
    /** `true` for a bot. */
    readonly isBot: boolean;
    /** `true` while the player is on the server. */
    readonly isConnected: boolean;
    /** The player's admin rights, from the letters in `users.ini`: `client.access.includes("Cvar")`. */
    readonly access: Access[];
    /** The player's team, one of `"TERRORIST"`, `"CT"`, `"SPECTATOR"` or `"UNASSIGNED"` (until the player joins a team). Setting it moves the player, as `player.team` does. */
    team: Team;
    /** `true` when nobody hears the player on the voice chat. Setting it mutes or unmutes him. */
    muted: boolean;
    /** `true` when every player hears him on the voice chat, whatever the side. */
    heardByEveryone: boolean;
    /** `true` when he hears every player on the voice chat, whatever the side. */
    hearsEveryone: boolean;
    /** The language the player reads the server's text in, e.g. `"en"`, `"ru"`: the one `lang.translate` picks for him. */
    readonly language: string;
    /** A signal that aborts when the player leaves the server: `fetch(url, { signal: client.signal })`. */
    readonly signal: AbortSignal;
    /** Runs a command in the player's console, as if he had typed it: `client.command("stop")`. */
    command(text: string): void;
    /** Kicks the player off the server, with the reason he is shown: `client.kick("Spam")`. */
    kick(reason?: string): void;
    /** Joins a side as the game joins a player who picks it in the team menu: `client.joinTeam("CT")`. `false` if the game refused. */
    joinTeam(team: Team): boolean;
    /** Asks the player's game for one of its cvars: `await client.queryCvar("fps_max")`, the value as text, or `null` when his game has none. */
    queryCvar(name: string): Promise<string | null>;
}
/**
 * A player in the game: everything a Client has, plus health, armor, frags,
 * weapons and the screen.
 *
 * An event about a player gives one as `event.player`; `server.players`
 * lists everyone on the server.
 */
export declare class Player extends PlayerFields implements Client {
    constructor(id: number);
    /**
     * The player's name.
     *
     * Pawn: `get_user_name`
     */
    get name(): string;
    /**
     * The player's health. `100` at spawn. Setting it to `0` or less kills the player.
     *
     * Pawn: `get_user_health`, `set_user_health`
     */
    get health(): number;
    set health(hp: number);
    /**
     * The player's armor points: `100` with a bought vest, `0` without one.
     *
     * Pawn: `get_user_armor`, `set_user_armor`
     */
    get armor(): number;
    set armor(value: number);
    /**
     * The player's frags on the scoreboard.
     *
     * Pawn: `get_user_frags`, `set_user_frags`
     */
    get frags(): number;
    set frags(value: number);
    /**
     * The player's deaths on the scoreboard. Setting it updates the scoreboard
     * at once.
     *
     * Pawn: `cs_get_user_deaths`, `cs_set_user_deaths`
     */
    get deaths(): number;
    /** The deaths on the scoreboard; setting them tells the scoreboard too. */
    set deaths(value: number);
    /**
     * The player's team, one of `"TERRORIST"`, `"CT"`, `"SPECTATOR"` or `"UNASSIGNED"`. Correct
     * right after a team change too. Setting it moves the player.
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
     * Joins a side the way the game joins a player who picks it in the team
     * menu, appearance picked for him: `player.joinTeam("CT")`. A player who
     * has just arrived is in the game after it and can spawn, which
     * `player.team = ...` does not do for him. `false` if the game refused.
     *
     * Pawn: `rg_join_team`
     */
    joinTeam(team: Team): boolean;
    /**
     * The player's IP address without the port, e.g. `"192.168.0.10"`.
     *
     * Pawn: `get_user_ip`
     */
    get ip(): string;
    /**
     * The player's SteamID, e.g. `"STEAM_0:1:12345"`. A bot has `"BOT"`, HLTV has `"HLTV"`; until Steam confirms the player it is `"STEAM_ID_PENDING"` (wait for the `"authorized"` event), and on a LAN server `"STEAM_ID_LAN"`.
     *
     * Pawn: `get_user_authid`
     */
    get authid(): string;
    /**
     * `true` while the player is alive.
     *
     * Pawn: `is_user_alive`
     */
    get isAlive(): boolean;
    /**
     * `true` while the player is on the server.
     *
     * Pawn: `is_user_connected`
     */
    get isConnected(): boolean;
    /**
     * `true` for a bot.
     *
     * Pawn: `is_user_bot`
     */
    get isBot(): boolean;
    /**
     * A signal that aborts when the player leaves the server, with an Error named
     * `"AbortError"`; the next player in the slot gets a new one.
     *
     * ```ts
     * const response = await fetch(url, { signal: player.signal });
     * ```
     *
     * An async command handler or player event already runs under it: its
     * `await`s stop quietly when the player leaves.
     */
    get signal(): AbortSignal;
    /**
     * `true` when nobody hears the player on the voice chat, with alltalk or
     * without. Setting it mutes or unmutes him; his other voice settings stay.
     *
     * Pawn: `set_speak`, `SPEAK_MUTED`
     */
    get muted(): boolean;
    set muted(value: boolean);
    /**
     * `true` when every player hears him on the voice chat, whatever the side
     * and without alltalk. A mute (`muted`) still silences him.
     *
     * Pawn: `set_speak`, `SPEAK_ALL`
     */
    get heardByEveryone(): boolean;
    set heardByEveryone(value: boolean);
    /**
     * `true` when he hears every player on the voice chat, whatever the side
     * and without alltalk: a spectator who hears both sides.
     *
     * Pawn: `set_speak`, `SPEAK_LISTENALL`
     */
    get hearsEveryone(): boolean;
    set hearsEveryone(value: boolean);
    private setSpeak;
    /**
     * The language the player reads the server's text in, e.g. `"en"`, `"ru"`:
     * the one `lang.translate` picks for him. It is his `setinfo lang`, or the
     * server's language when he has none or `amx_client_languages` is `0`.
     *
     * Pawn: `get_user_info(id, "lang")`, `amx_language`
     */
    get language(): string;
    /**
     * Shows a line of text on the player's screen:
     * `player.showHud("-35 HP", { color: [255, 40, 40], x: 0.02, y: 0.88, hold: 2 })`.
     * Every option has a default.
     *
     * Pawn: `set_hudmessage`, `show_hudmessage`
     */
    showHud(text: string, options?: HudOptions): void;
    /**
     * Plays a sound to the player alone, the way the radio does - heard as it
     * is wherever he stands: `player.playSound("vox/one.wav")`. The path is
     * under `sound/`, as `server.precache` takes it.
     *
     * Pawn: `SendAudio`, `rg_send_audio`
     */
    playSound(sample: string): void;
    /** The player's screen effects: `player.screen.fade({ ... })`, `.shake(...)`, `.statusIcon(...)` — see Screen. */
    get screen(): Screen;
    /**
     * Gives the player a weapon or an item: `player.give("weapon_flashbang")`.
     * `false` if the game did not give it.
     *
     * Pawn: `rg_give_item`, `give_item`
     */
    give(item: ItemName): boolean;
    /**
     * Takes all the player's weapons away. The suit (armour, HUD) stays unless
     * `removeSuit` is `true`.
     *
     * Pawn: `rg_remove_all_items`, `strip_user_weapons`
     */
    removeAllItems(removeSuit?: boolean): void;
    /**
     * Sets the player's reserve ammo for a weapon he carries: `player.setAmmo("weapon_flashbang", 2)`.
     *
     * Pawn: `rg_set_user_bpammo`, `cs_set_user_bpammo`
     */
    setAmmo(weapon: WeaponName, amount: number): void;
    /**
     * The player's reserve ammo for a weapon he carries: `player.getAmmo("weapon_ak47")`;
     * for a grenade, how many he has. `0` for a weapon he does not carry.
     *
     * Pawn: `rg_get_user_bpammo`, `cs_get_user_bpammo`
     */
    getAmmo(weapon: WeaponName): number;
    /**
     * Respawns the player in the current round, at a spawn point the game picks.
     *
     * Pawn: `rg_round_respawn`
     */
    respawn(): void;
    /**
     * Kills the player, as the `kill` console command does. With
     * `{ keepFrags: true }` the death costs no frags.
     *
     * Pawn: `user_kill`, `user_silentkill`
     */
    kill(options?: KillOptions): void;
    /**
     * The player's admin rights, from the letters in `users.ini`:
     * `player.access.includes("Cvar")`.
     *
     * Pawn: `get_user_flags`
     */
    get access(): Access[];
    /**
     * Puts a weapon the player carries into his hands. `false` if he does not
     * have it.
     *
     * Pawn: `rg_switch_weapon`
     */
    switchWeapon(weapon: WeaponName): boolean;
    /**
     * Recomputes the player's speed from the weapon in hand, after a slowdown for
     * instance.
     *
     * Pawn: `rg_reset_maxspeed`
     */
    resetMaxSpeed(): void;
    /**
     * Runs a command in the player's own console, as if he had typed it:
     * `player.command("messagemode say_team")`, `player.command("stop")`.
     * The player's game runs it, not the server.
     *
     * Pawn: `client_cmd`
     */
    command(text: string): void;
    /**
     * Kicks the player off the server, with the reason he is shown:
     * `player.kick("Spam")`; without one, the game's own.
     *
     * Pawn: `server_cmd("kick #%d")`
     */
    kick(reason?: string): void;
    /**
     * Asks the player's game for one of its cvars: `await
     * player.queryCvar("fps_max")` is the value as text, e.g. `"100"`, or
     * `null` when his game has no such cvar or will not tell. The answer is
     * what his game says, a claim a cheat can change. A bot has no game to ask
     * and answers `null` at once; when the player leaves before he answers, the
     * promise is rejected with an `"AbortError"`.
     *
     * Pawn: `query_client_cvar`
     */
    queryCvar(name: string): Promise<string | null>;
}
/**
 * Calls a native that fills a text buffer and returns the text. The native
 * itself is passed in:
 *
 *   readText(get_mapname)                 // "c21_kitty"
 *   readText(get_user_name, 32, id)       // not this one: see Player.name
 */
export declare function readText(fill: (out: number, max: number) => number, max?: number): string;
/**
 * The ids of the players on the server, as an array. `flags`: `"a"` living,
 * `"b"` dead, `"c"` no bots, `"h"` no HLTV, `"e"` only `team`. `server.players` is
 * everyone, as players, to filter as an array.
 *
 * Pawn: `get_players`
 */
export declare function playerIds(flags?: string, team?: string): number[];
/** The options of a command: who may use it and its description in a listing. */
export interface CommandOptions {
    /** The admin right a player needs to use the command; left out, everyone may. */
    access?: Access;
    /** The command's description, shown by `amx_help` and in `server.commands`. */
    description?: string;
}
/** A command the plugin added, as `server.commands` lists it: what a `/help` shows. */
export declare class CommandInfo {
    /** The command's usage, as it is typed, e.g. `"/kick <target> [reason]"`. */
    readonly usage: string;
    /** The command's description, as its `description` option gave it; `""` without one. */
    readonly description: string;
    /** The admin right the command needs; `null` when everyone may use it. */
    readonly access: Access | null;
    /** Whether it is a command of the server console rather than a player's. */
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
 * Converts `users.ini` letters to rights: `accessOf("abc")` is
 * [`"Immunity"`, `"Reservation"`, `"Kick"`]. An unknown letter is skipped.
 *
 * Pawn: `read_flags`
 */
export declare function accessOf(letters: string): Access[];
/**
 * @hidden The hood of a game event Ham Sandwich delivers (as/hooks.ts):
 * `fn` hooked on the class, a reload taking its slot back.
 */
export declare function __ham(fn: i32, classname: string, handler: WideHandler, post: bool): void;
/**
 * The look of a HUD message. Every field has a default, so
 * `{ color: [255, 40, 40] }` is enough.
 *
 * Pawn: `set_hudmessage`
 */
export interface HudOptions {
    /** The text's colour: red, green, blue, `0` to `255` each. */
    color?: number[];
    /** The horizontal position: `0` is the left edge, `1` the right; `-1` centres the text. */
    x?: number;
    /** The vertical position: `0` is the top, `1` the bottom; `-1` centres the text. */
    y?: number;
    /** The time the message stays on screen, in seconds. */
    hold?: number;
    /** The appearance effect, one of: `"fade"` in and out, `"flicker"`, or `"typewriter"` — letter by letter. */
    effect?: HudEffect;
    /** The fade-in time, in seconds. */
    fadeIn?: number;
    /** The fade-out time, in seconds. */
    fadeOut?: number;
    /** The HUD channel, `1` to `4`; `-1` picks a free one. */
    channel?: number;
    /** The duration of the `"flicker"` and `"typewriter"` effects, in seconds. */
    effectTime?: number;
    /**
     * Large letters, for a result or a headline. They have no channels, so
     * `channel` does not apply.
     *
     * Pawn: `set_dhudmessage`
     */
    large?: boolean;
}
/** A HUD message's appearance effect, one of: `"fade"` in and out, `"flicker"`, or `"typewriter"` — letter by letter. */
export type HudEffect = "fade" | "flicker" | "typewriter";
/**
 * A HUD line for one message: showing a new one replaces the old instead of
 * taking another channel — for a countdown redrawn every second, a warning
 * that changes. `clear` removes it early.
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
    /** Shows `text` to the player on this line, replacing what it showed him before. */
    show(player: Player, text: string, options?: HudOptions): void;
    /** Removes the line's message from the player's screen before its time is up. */
    clear(player: Player): void;
    /** Removes the line's message from every screen. */
    clearAll(): void;
}
/** A fade's direction, one of: `"in"` from the colour to a clear view, `"out"` from a clear view to the colour. */
export type FadeDirection = "in" | "out";
/** The options of `player.screen.fade`. Times are in seconds. */
export interface FadeOptions {
    /** The colour: red, green, blue and alpha, `0` to `255` each; black by default. */
    color?: number[];
    /** The fade's duration, in seconds; `1` by default. */
    duration?: number;
    /** The time the full colour holds, in seconds; `0` by default. */
    hold?: number;
    /** The fade's direction, one of: `"in"` (the default) from the colour to a clear view, `"out"` from a clear view to the colour. */
    direction?: FadeDirection;
    /** Keeps the colour on the screen until the next fade. */
    stay?: boolean;
    /** Tints what is on the screen rather than painting over it. */
    modulate?: boolean;
}
/** The options of `player.screen.shake`. */
export interface ShakeOptions {
    /** The shake's strength: how far the view moves, up to 16 units; `4` by default. */
    amplitude?: number;
    /** The shake's duration, in seconds; `1` by default. */
    duration?: number;
    /** The shake's frequency, in jolts a second; `5` by default. */
    frequency?: number;
}
/** A status icon's state, one of `"hide"`, `"show"` (lit) or `"flash"`. */
export type StatusIconState = "hide" | "show" | "flash";
/**
 * The effects one player sees over the world: fades, shakes, status icons and
 * the parts of the HUD the game draws itself.
 *
 * ```ts
 * player.screen.fade({ color: [0, 0, 0, 255], duration: 0.5, hold: 1, stay: true });
 * player.screen.shake({ amplitude: 8, duration: 1, frequency: 5 });
 * player.screen.statusIcon("dmg_cold", "show", [0, 160, 255]);
 * ```
 *
 * Times are in seconds.
 *
 * Pawn: `ScreenFade`, `ScreenShake`, `StatusIcon`, ...
 */
export declare class Screen {
    private id;
    constructor(id: i32);
    private begin;
    /**
     * Colours the player's screen, fading in or out.
     *
     * Pawn: `ScreenFade`
     */
    fade(options?: FadeOptions): void;
    /**
     * Shakes the player's view.
     *
     * Pawn: `ScreenShake`
     */
    shake(options?: ShakeOptions): void;
    /**
     * Shows, flashes or hides a status icon by its sprite name (`"dmg_cold"`,
     * `"buyzone"`, `"c4"`, ...), in a colour.
     *
     * Pawn: `StatusIcon`
     */
    statusIcon(sprite: string, state: StatusIconState, color?: number[]): void;
    /**
     * Sets the round clock at the top of the player's HUD, in seconds. Sent
     * unreliably, as the game does: a client with a lagging connection may skip
     * it.
     *
     * Pawn: `RoundTime`
     */
    roundTime(seconds: number): void;
    /**
     * Hides parts of the player's HUD right now. Setting `player.hideHud` does
     * the same a frame later; this is for when that is too late.
     *
     * Pawn: `HideWeapon`
     */
    hideHud(parts: HideHud[]): void;
    /**
     * Shows or hides Counter-Strike's own crosshair on the player's screen.
     *
     * Pawn: `Crosshair`
     */
    crosshair(shown: boolean): void;
    /**
     * Sets the flashlight icon on the player's HUD: on or off, and the battery in
     * percent.
     *
     * Pawn: `Flashlight`
     */
    flashlight(on: boolean, battery?: number): void;
    /**
     * Shows the progress bar in the middle of the player's screen, filling up
     * over `seconds`; `0` hides it.
     *
     * Pawn: `BarTime`, `rg_send_bartime`
     */
    progressBar(seconds: number): void;
}
/**
 * The channel a sound plays on, one of `"auto"` (the default), `"weapon"`,
 * `"voice"`, `"item"`, `"body"`, `"stream"`, `"static"`. A new sound on an
 * entity's channel cuts the one playing there; `"auto"` never cuts.
 */
export type SoundChannel = "auto" | "weapon" | "voice" | "item" | "body" | "stream" | "static";
/** The options of `entity.emitSound`; every one has a default. */
export interface SoundOptions {
    /** The entity's channel the sound plays on; `"auto"` by default. */
    channel?: SoundChannel;
    /** The volume, `0` to `1`; `1` by default. */
    volume?: number;
    /** The sound's fall-off with distance: `0` is heard across the map, `0.8` (the default) as a footstep, `2` only close by. */
    attenuation?: number;
    /** The pitch in percent: `100` (the default) as recorded, `50` an octave lower, up to `255`. */
    pitch?: number;
}
/**
 * A file the game has precached - a sprite, a model, a sound - as
 * `server.precache` returns it. An effect takes it where it draws a sprite or
 * a model:
 *
 * ```ts
 * const shock = server.precache("sprites/shockwave.spr");
 * effects.beamCylinder({ at: here, radius: 385, sprite: shock, life: 0.4, width: 60 });
 * ```
 */
export declare class Resource {
    /** The file's path, as `server.precache` was given it, e.g. `"sprites/shockwave.spr"`. */
    readonly path: string;
    constructor(
    /** The file's path, as `server.precache` was given it, e.g. `"sprites/shockwave.spr"`. */
    path: string);
    /**
     * The file's index in the game's precache list, as a native takes it; `0`
     * while it is not precached.
     */
    get index(): number;
}
/**
 * @hidden A forward the host relays, heard by `fn` (a one-cell handler) only
 * when its argument `arg` is `value`: the module compares it, so a forward
 * that comes often crosses into the plugin for that value alone.
 */
export declare function __onCell(event: string, fn: i32, arg: i32, value: i32): void;
/** @hidden Runs `register` from plugin_init on: now, or when it comes. */
export declare function __whenUp(register: () => void): void;
/** @hidden Runs `register` from plugin_precache on - or plugin_init, after a reload mid-map. */
export declare function __whenPrecache(register: () => void): void;
/**
 * The arguments of a message, by their place, `0` for the first: a number
 * or a text, as the message wrote it.
 *
 * ```ts
 * server.addEventListener("message:BotProgress", (event) => {
 *   console.log(`${event.args.length} ${event.args.number(0)}`);
 * });
 * ```
 *
 * Pawn: `get_msg_args`, `get_msg_arg_*`, `set_msg_arg_*`
 */
export declare class MessageArgs {
    /** The number of arguments. */
    get length(): number;
    /** Whether the argument at `index` is text; otherwise it is a number. */
    isText(index: number): boolean;
    /** The argument at `index` as a number: a byte, a short, a coordinate, an angle. */
    number(index: number): number;
    /** The argument at `index` as text. */
    text(index: number): string;
    /** Writes a number argument: the message goes out with it. */
    setNumber(index: number, value: number): void;
    /** Writes a text argument: the message goes out with it. */
    setText(index: number, value: string): void;
}
/**
 * A message the server sends its clients - a chat line, the round clock, a
 * HUD icon - heard on its way, before it leaves:
 *
 * ```ts
 * server.addEventListener("message:TextMsg", (event) => {
 *   if (event.text == "#Round_Draw") event.preventDefault();
 * });
 * ```
 *
 * A message whose layout is known has a typed field for each argument
 * (`event.text`), and writing one changes what the client gets; a message
 * without a known layout is read by place, through `event.args`, which
 * every message has.
 *
 * Pawn: `register_message`
 */
export declare class ClientMessage {
    /** @hidden What a message's event is told apart by, at compile time. */
    __message: bool;
    /** @hidden The player it goes to: the message's msg_entity. */
    __receiver: i32;
    /** The message's name, e.g. `"TextMsg"`. */
    name: string;
    /** The player the message goes to; `null` for a message to everyone. */
    get player(): Player | null;
    /** The message's arguments, by their place: `event.args.text(1)`. */
    get args(): MessageArgs;
    /**
     * Stops the message: the client does not get it.
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
 * A field plugins added to `Player` changed on a player - written by any
 * plugin, TypeScript or Pawn:
 *
 * ```ts
 * server.addEventListener("playerchange", (event) => {
 *   print(event.player, event.value ? "You are protected" : "Your spawn protection is over");
 * }, { field: "spawnProtected" });
 * ```
 *
 * With `field`, `event.value` and `event.previous` have the field's type; a
 * named listener takes `PlayerChangeEvent<"spawnProtected">`. Without it
 * every field is heard, and `event.field` says which.
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
    /** The field that changed, e.g. `"spawnProtected"`; a member of an object field is dotted, `"glow.enabled"`. */
    field: string;
    /** The player whose field changed. */
    get player(): Player;
}
/** The third argument of `server.addEventListener`. */
export interface ServerListenerOptions {
    /**
     * For `"playerchange"`: the field listened for, e.g. `"spawnProtected"`, or
     * an object field's member, `"glow.enabled"`; an object field's name
     * hears each of its members. Left out, every field.
     */
    field?: string;
}
/** The event a cvar's change listener receives: the cvar, its old and its new value. */
export declare class CvarChangeEvent {
    /** The cvar that changed. */
    cvar: Cvar;
    /** The cvar's value before the change, as text. */
    oldValue: string;
    /** The cvar's new value, as text. */
    value: string;
    constructor(
    /** The cvar that changed. */
    cvar: Cvar, 
    /** The cvar's value before the change, as text. */
    oldValue: string, 
    /** The cvar's new value, as text. */
    value: string);
}
/** A cvar's change listener: `(event) => ...`, with the old and the new value in `event`. */
export type CvarListener = (event: CvarChangeEvent) => void;
/**
 * @hidden The start of every exported native. A Pawn plugin calls one from
 * its plugin_init at the earliest - often before the host's own - and by then
 * plugin_natives is over, so a Cvar the native makes (a register_cvar native
 * of the plugin's) is made at once rather than when this plugin's init comes.
 */
export declare function __nativeCall(): void;
/**
 * A server cvar, read and written like an input's `value`:
 *
 * ```ts
 * const freeze = new Cvar("mp_freezetime");
 * freeze.number = 5;
 * const speed = new Cvar("my_speed", "250");     // made with 250 if it does not exist
 * speed.addEventListener("change", (event) => console.log(`${event.oldValue} -> ${event.value}`));
 * ```
 *
 * `value` is the cvar's text; `number` and `boolean` read and write the same
 * cvar as a number and as an on/off switch.
 *
 * Pawn: `get_cvar_pointer`, `create_cvar`, `get_pcvar_string`, `set_pcvar_num`, `hook_cvar_change`
 */
export declare class Cvar {
    /** The cvar's name, as the console knows it, e.g. `"mp_timelimit"`. */
    name: string;
    private defaultValue;
    /**
     * The cvar's handle in the engine; `0` when the server has no such cvar.
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
     * @internal Finds or creates the cvar and starts hearing its changes. A Cvar
     * made at the top level of a plugin waits for `plugin_init`: creating a cvar
     * while plugins are still loading takes the server down.
     */
    attach(): void;
    private hook;
    /** `true` when the server has this cvar. */
    get exists(): bool;
    /** The cvar's value as text, e.g. `"250"`. */
    get value(): string;
    set value(text: string);
    /** The cvar's value as a number. A whole number is written without a fraction: `"5"`, not `"5.000000"`. */
    get number(): number;
    set number(value: number);
    /** The cvar as an on/off switch: `true` for anything but `0`. Writing `true` sets `1`, `false` sets `0`. */
    get boolean(): bool;
    set boolean(on: bool);
    /** Calls `listener` whenever the cvar's value changes. */
    addEventListener(type: "change", listener: CvarListener): void;
    /** Stops calling a listener added with `addEventListener`. */
    removeEventListener(type: "change", listener: CvarListener): void;
    /** @internal Calls the change listeners; the server does it when the cvar changes. A plugin listens with `addEventListener`. */
    dispatch(event: CvarChangeEvent): void;
}
/**
 * The server, an event target like the DOM's: its events, commands, map and
 * the folders AMX Mod X keeps. Used through `server`:
 *
 * ```ts
 * server.addEventListener("putinserver", (event) => {
 *   print(event.player, "Welcome!");      // event is a PutinserverEvent
 * });
 * server.map;                             // "de_dust2"
 * server.maxPlayers;                      // 32
 * server.command("echo hi");
 * ```
 *
 * The event's name is written out as a string: the editor completes it and
 * hands the listener the event's own type. A listener may use the variables
 * of the function it is written in - it is a closure, as in JavaScript.
 */
export declare class Server {
    /**
     * The current map's name, e.g. `"de_dust2"`.
     *
     * Pawn: `get_mapname`
     */
    get map(): string;
    /**
     * The number of player slots on the server, e.g. `32`.
     *
     * Pawn: `get_maxplayers`
     */
    get maxPlayers(): number;
    /**
     * The players on the server, every one connected - never an HLTV proxy -
     * read anew each time. Narrow them with the array's `filter`:
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
     * The AMX Mod X configs folder, relative to the game folder, as `fs` takes it:
     * `addons/amxmodx/configs` unless the server moved it.
     *
     * ```ts
     * const text = fs.readFileSync(`${server.configsDir}/myplugin.ini`);
     * ```
     *
     * Pawn: `get_configsdir`
     */
    get configsDir(): string;
    /**
     * The AMX Mod X folder for plugins' data files: `addons/amxmodx/data` unless the server moved it.
     *
     * Pawn: `get_datadir`
     */
    get dataDir(): string;
    /**
     * Runs a command in the server console, as if typed there:
     * `server.command("changelevel de_dust2")`. The text goes as it is: a `%` stays a `%`.
     *
     * Pawn: `server_cmd`
     */
    command(text: string): void;
    /**
     * The commands this plugin added, players' and the server's, in the order
     * they were added: each one's `usage`, `description` and `access` - what a
     * `/help` prints.
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
    /** Shows a HUD message to every player, with the same options as `player.showHud`. */
    showHud(text: string, options?: HudOptions): void;
    /**
     * Precaches a file, so the game can use it and players download it:
     * `const shock = server.precache("sprites/shockwave.spr")`. At the top level
     * of the file it is precached when the map loads; in the `"precache"` event,
     * at once. A sound is written as the game plays it, under `sound/`:
     * `"myplugin/hit.wav"`. Returns the file as a `Resource` - what an effect
     * takes for a sprite or a model.
     *
     * Pawn: `precache_model`, `precache_sound`, `precache_generic`
     */
    precache(path: string): Resource;
}
/** The server the plugin runs on: its events, commands and map. */
export declare const server: Server;
/**
 * The game's events (reapi hookchains and Ham Sandwich functions) and round
 * control, as an event target like the DOM's:
 *
 * ```ts
 * game.addEventListener("takeDamage", (event) => {
 *   if (event.player.isBot) event.preventDefault();
 * });
 * game.addEventListener("canPlayerHearPlayer", (event) => event.listener.team == event.sender.team);
 * game.addEventListener("fallDamage", (event) => event.result / 2, true);
 * ```
 *
 * The event's type follows from its name. What a listener returns is the
 * answer to the game: before the game acts it replaces what the game would
 * do, after it (`post`) it replaces the result. A listener that returns
 * nothing leaves it to the game; `event.preventDefault()` blocks without an
 * answer. A value of the wrong type is an error in the editor and in the build.
 *
 * The game rules are its fields: `game.isFreezeTime`, `game.ctWins`,
 * `game.roundWinner`.
 *
 * Pawn: `RegisterHookChain`, `RegisterHam`, `get_member_game`
 */
export declare class Game extends GameFields {
    /**
     * Calls `listener` every time the game runs `type`. With `true` - or
     * `{ post: true }` - it runs after the game has acted, with the game's answer
     * in `event.result`; by default it runs before and can stop it.
     * `classname` narrows it to one class of entity, and only that class's
     * reach the plugin: `{ classname: "weapon_knife" }`. A `"touch"` listener
     * takes the classes it is about instead: `{ toucher: "player", touched: "player" }`.
     *
     * Pawn: `RegisterHookChain`, `RegisterHam`, `register_touch`
     */
    addEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, options?: boolean | GameListenerOptions): void;
    /** Stops calling a listener added with `addEventListener` - the same function and the same options. */
    removeEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, options?: boolean | GameListenerOptions): void;
    /**
     * The game's clock: seconds since the map started. Entity fields that hold a
     * moment - `nextThink`, `damageTime` - are on it:
     * `grenade.damageTime = game.time + 1`. The attack timers - a weapon's
     * `nextPrimaryAttack`, a player's `nextAttack` - count from now instead:
     * `weapon.nextPrimaryAttack = 1` is a second away.
     *
     * Pawn: `get_gametime`
     */
    get time(): number;
    /**
     * Ends the round now:
     *
     * ```ts
     * game.endRound({ winner: "TERRORIST" });                 // terrorists win, next round in 5 s
     * game.endRound({ winner: "draw", delay: 3 });            // a draw, next round in 3 s
     * game.endRound({ winner: "none", message: "" });         // a quiet restart: no message
     * ```
     *
     * The winner sets the score, the message and the sound (`"Terrorists Win!"`);
     * `message` and `sound` replace them, `""` turns them off.
     *
     * Pawn: `rg_round_end`
     */
    endRound(options: EndRoundOptions): void;
}
/**
 * The third argument of `game.addEventListener`: `true` stands for
 * `{ post: true }`; a `"touch"` listener names the classes it is about.
 */
export interface GameListenerOptions {
    /** Runs the listener after the game has acted, with its answer in `event.result`. */
    post?: boolean;
    /** The class of entity the event is listened for on, e.g. `"weapon_knife"`: only its entities reach the listener. */
    classname?: string;
    /** For `"touch"`: the class of the entity that moves into the other, e.g. `"player"`; left out, any. */
    toucher?: string;
    /** For `"touch"`: the class of the entity touched, e.g. `"func_door"`; left out, any. */
    touched?: string;
}
/**
 * The way one entity uses another - a button pressed, a door opened - one of
 * `"off"`, `"on"`, `"set"` or `"toggle"`.
 *
 * Pawn: `USE_OFF`, `USE_ON`, `USE_SET`, `USE_TOGGLE`
 */
export type UseType = "off" | "on" | "set" | "toggle";
/** The options of an entity's action such as `weapon.deploy()` or `entity.heal(...)`. */
export interface ActionOptions {
    /**
     * Whether the game's listeners run too - this plugin's and every other's,
     * Pawn ones included; `true` by default. `false` runs the game's own
     * function alone.
     *
     * Pawn: `ExecuteHamB`, `ExecuteHam`
     */
    hooks?: boolean;
}
/**
 * Two entities touched: `toucher` moved into `touched`. Only the classes a
 * listener asked for reach it:
 *
 * ```ts
 * game.addEventListener("touch", onTouch, { toucher: "player", touched: "player" });
 * ```
 *
 * Pawn: `register_touch`
 */
export declare class TouchEvent {
    /** The entity that moved into the other. */
    toucher: Entity;
    /** The entity it touched. */
    touched: Entity;
    constructor(
    /** The entity that moved into the other. */
    toucher: Entity, 
    /** The entity it touched. */
    touched: Entity);
    /** Blocks the touch: the game does not act on it. */
    preventDefault(): void;
}
/** The winner of a round, one of `"TERRORIST"`, `"CT"`, `"draw"`, or `"none"` - a restart without a winner. */
export type RoundWinner = "TERRORIST" | "CT" | "draw" | "none";
/** The options of `game.endRound`; only `winner` is required. */
export interface EndRoundOptions {
    /** The round's winner, one of `"TERRORIST"`, `"CT"`, `"draw"`, or `"none"` - a restart. */
    winner: RoundWinner;
    /** Seconds until the next round starts; `5` by default. */
    delay?: number;
    /** The message in the middle of the screen, or a game text such as `"#Terrorists_Win"`; `"default"` is the usual one for this winner, `""` none. */
    message?: string;
    /** The sound, a radio phrase such as `"terwin"`; `"default"` is the usual one for this winner, `""` none. */
    sound?: string;
    /**
     * `true` to tell the `roundEnd` listeners of every plugin, Pawn ones too, as when
     * the game ends a round itself. `false` by default: a `roundEnd` listener that
     * ends the round would call itself.
     *
     * Pawn: `rg_round_end(..., trigger)`
     */
    dispatch?: boolean;
}
/** The game the plugin runs in: its events (reapi hookchains and Ham Sandwich functions), its rules' fields and `endRound`. */
export declare const game: Game;
/**
 * The places a message can show: `Variant.chat`, `center`, `console`, `notify`.
 * A plain string works the same - `"center"`; an unknown name goes to chat.
 *
 * Pawn: `print_chat`, `print_center`, `print_console`, `print_notify`
 */
export declare namespace Variant {
    /** A line in the player's chat. */
    const chat: string;
    /** Text in the middle of the player's screen. */
    const center: string;
    /** A line in the player's console. */
    const console: string;
    /** A line in the player's console, sent as a notification; with `developer 1` CS also shows it in the top-left corner of the screen. */
    const notify: string;
}
/** The place a message shows, as a string: one of `"chat"`, `"center"`, `"console"` or `"notify"`. */
export type VariantName = "chat" | "center" | "console" | "notify";
export { Flag } from "./constants";
export * from "./events";
import { FlagName, HookName } from "./constants";
import { Entity, GameFields, PlayerFields } from "./entities";
export { Entity, Weapon, WeaponKind, weaponKindOf } from "./entities";
export { RenderMode, RenderFx, MoveType, Solid, TakeDamage, DeadFlag, WaterLevel, Contents, FixAngle, HitGroup, ArmorType, ObserverMode, JoinState, GameMenu, PlayerModel, IgnoredChat, ThrowDirection, BloodColor, MusicState } from "./entities";
/** A message's recipient together with its place: `{ id: 0, variant: "center" }`. `id` is a player's `id`, `0` for everyone. */
export interface Target {
    /** The recipient's player `id`; `0` for every player. */
    id: number;
    /** The place the message shows, one of `"chat"` (the default), `"center"`, `"console"` or `"notify"`. */
    variant?: VariantName;
}
/** Turns a chat line's colour tags (`!g`, `!r`, ...) into the colour codes the client reads, and records in `swapTeam` which team colour the line needs. `print` calls it; exported for tests. */
export declare function paint(text: string): string;
/** The team colour the last `paint()` chose for the line, one of `"TERRORIST"` (red), `"CT"` (blue), `"SPECTATOR"` (grey), or `""` - the reader's own team colour. `print` reads it right after. */
export declare let swapTeam: string;
/**
 * Sends a message to a player, or to every player (`0`).
 *
 * ```ts
 * print(player, "Health restored!");                    // the player's chat
 * print(0, "Round starts in 5 seconds");                // everyone's chat
 * print(player, "Health restored!", "center");          // the middle of the player's screen
 * print({ id: 0, variant: "center" }, "Go!");           // the middle of everyone's screen
 * ```
 *
 * The first argument is a player, a player's `id`, or `0` for everyone. The third
 * is where the message shows, one of `"chat"` (the default), `"center"` - the middle of
 * the screen, `"console"` - the player's console, `"notify"` - the console too; CS
 * shows it on screen only with `developer 1`.
 *
 * Colour tags work in chat only, and a letter is the same colour as in a menu:
 * - `!y` yellow (the usual chat colour), `!g` green
 * - `!r` red, `!b` blue, `!d` grey, `!t` the colour of the reader's team
 *
 * A menu's own tags (`!w`, `!R`) are dropped from a chat line. Red, blue,
 * grey and `!t` share the message's one team colour: the first one used wins.
 *
 * Pawn: `client_print`, `client_print_color`
 */
export declare function print<T extends Target | Client | number = Target>(to: T, message: string, variant?: VariantName): void;
/**
 * The server's dictionaries: the files of `data/lang`, a line per key and
 * language, and each player reads them in his own.
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
     * Loads the dictionary `data/lang/<name>.txt`: `lang.load("myplugin")`.
     * `false` when there is no such file.
     *
     * Pawn: `register_dictionary`
     */
    function load(name: string): boolean;
    /**
     * The key's line in the player's language, `null` for the server's:
     * `lang.translate(player, "MYPLUGIN_WELCOME", [player.name])`.
     *
     * `%s`, `%d`, `%f` (`%.1f`, `%02d`, ...) are filled from `args` in order;
     * one no argument is left for stays as written. The dictionary's colour
     * codes come back as tags - `\y` as `!y`, `^4` as `!g` - so the line goes
     * to a menu and to chat alike. A key no dictionary has comes back as it is.
     *
     * Pawn: `LookupLangKey`, `format` with `%L`
     */
    function translate(player: Client | null, key: string, args?: string[]): string;
}
/**
 * Reads and sets a cvar by name in one call: `cvar.num("mp_freezetime")`.
 *
 * For a cvar used more than once `Cvar` is the better choice: it creates a
 * missing cvar, hears its changes and reads it as text, a number or a switch.
 */
export declare namespace cvar {
    /**
     * The cvar's value as a whole number: `cvar.num("mp_freezetime")`.
     *
     * Pawn: `get_cvar_num`
     */
    function num(name: string): number;
    /**
     * Sets the cvar to a whole number: `cvar.setNum("mp_freezetime", 5)`.
     *
     * Pawn: `set_cvar_num`
     */
    function setNum(name: string, value: number): void;
    /**
     * The cvar's value as text: `cvar.str("hostname")`.
     *
     * Pawn: `get_cvar_string`
     */
    function str(name: string): string;
    /**
     * Sets the cvar's text: `cvar.setStr("hostname", "My Server")`.
     *
     * Pawn: `set_cvar_string`
     */
    function setStr(name: string, value: string): void;
}
/**
 * Registers a console command for players; the handler gets the `id` of the
 * player who typed it. `server.addCommand` is the usual way.
 *
 * Pawn: `register_clcmd`
 */
export declare function cmd(pattern: string, handler: Handler, flag?: FlagName, info?: string): void;
/**
 * Registers a console command for players whose handler gets the raw
 * arguments `(id, level, cid)`. `handled()` in the handler stops the command
 * from going on to other plugins.
 *
 * Pawn: `register_clcmd`
 */
export declare function cmdWide(pattern: string, handler: WideHandler, flag?: FlagName, info?: string): void;
/** The function a timer runs: `() => ...`. */
export type TimerHandler = () => void;
/**
 * Runs `handler` once after `ms` milliseconds and returns the timer's handle,
 * as in the browser:
 *
 * ```ts
 * const handle = setTimeout(() => print(player, "Welcome!"), 2000);
 * clearTimeout(handle);
 * ```
 *
 * The handler may use the variables around it. The precision is one server frame.
 *
 * Pawn: `set_task`
 */
export declare function setTimeout(handler: TimerHandler, ms?: number): number;
/** The options of `sleep()`. */
export interface SleepOptions {
    /** An AbortSignal that cancels the wait: the promise then rejects with the signal's reason. */
    signal?: AbortSignal;
}
/**
 * Returns a promise fulfilled after `ms` milliseconds - the way to wait inside
 * an async function:
 *
 * ```ts
 * await sleep(1000);
 * await sleep(5000, { signal: AbortSignal.timeout(2000) }); // rejects after 2 s
 * ```
 *
 * The precision is one server frame. Inside an async command handler or
 * player event the wait also ends when that player leaves.
 *
 * Pawn: `set_task`
 */
export declare function sleep(ms: number, options?: SleepOptions): Promise<void>;
/**
 * Runs `handler` every `ms` milliseconds until `clearInterval` stops it;
 * returns the timer's handle.
 *
 * Pawn: `set_task` with the "b" flag
 */
export declare function setInterval(handler: TimerHandler, ms: number): number;
/**
 * Stops the timer with this handle. A timer that has already fired or been
 * stopped is ignored. Only this stops these timers: Pawn's task natives do not
 * see them.
 *
 * Pawn: `remove_task`
 */
export declare function clearTimeout(handle: number): void;
/** Stops the interval with this handle; the same as `clearTimeout`. */
export declare function clearInterval(handle: number): void;
/**
 * A call of a Pawn native with a `...` tail, built one argument at a time -
 * the low-level way. A native from `~/natives` is an ordinary function and
 * needs none of this.
 *
 *   new Call(NATIVE_server_print).str("%s").str(text).run();
 *
 * Find the `...` in the native's declaration. Arguments before it go as they
 * are, with `num` or `str`. A number in the tail goes with `ref`, which passes
 * it by address, and `out(i)` reads back what the native wrote there; a string
 * goes with `str` anywhere.
 *
 *   ExecuteHam(Ham:function, this, any:...)      num, num, then the tail
 *   SetHookChainArg(number, AType:type, any:...) num, num, then the tail
 *   ExecuteForward(handle, &ret, any:...)        num, ref for &ret, then tail
 *
 * A wrong kind of argument fails quietly, somewhere else.
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
    /** Adds a number argument as it is: an entity index, a constant, a count. */
    num(value: number): Call;
    /** Adds a fractional number argument, one the native declares as `Float:`. */
    float(value: f64): Call;
    /** Adds a string argument, before the `...` or in the tail alike. */
    str(text: string): Call;
    /** Adds an array of cells the native reads and may write into, followed by its length. */
    buffer(cells: CellBuffer, length: number): Call;
    /**
     * Adds an array of cells the native writes into, in a `...` tail: its length
     * follows by address, as a tail's numbers do - `get_member(id, member,
     * dest[], len)`.
     */
    tailBuffer(cells: CellBuffer, length: number): Call;
    /** Adds a vector: three fractional numbers at one address - an origin, angles, a colour. Unlike `buffer`, no length follows it. */
    vec(x: f64, y: f64, z: f64): Call;
    /** Adds a vector the native fills in; after `run` the result is in `cells`. */
    vecInto(cells: CellBuffer): Call;
    /**
     * Adds an array to a forward's `...` tail: `ExecuteForward` gets it as
     * `PrepareArray` makes it. `floats` sends the numbers as `Float:`.
     */
    array(values: number[], floats?: bool): Call;
    /** Adds a number passed by address, as a `...` tail argument must be; `out` reads what the native wrote into it. */
    ref(value: number): Call;
    /** The value the native left in the `ref` argument at this position, after `run`. */
    out(index: i32): number;
    /** Calls the native with the arguments added so far and returns its result. */
    run(): number;
}
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
 * Registers a reapi hookchain with a raw handler of four numbers - the low
 * level under `game.addEventListener`, which is what a plugin uses.
 *
 * The name is reapi's, without the class where it is not needed:
 * `"restart_round"`, `"player_spawn"`; the editor completes them. The numbers
 * behind the names come from reapi's includes, so they must be the ones of the
 * reapi the server runs. Returns the hook's handle.
 *
 * Pawn: `RegisterHookChain`, `EnableHookChain`, `DisableHookChain`
 */
export declare function hook(name: HookName, handler: WideHandler, post?: bool): number;
/** The plugin's name, version, author and description, given to `plugin({ ... })`; `amxts_plugins` in the server console lists them. */
export interface PluginInfo {
    /** The plugin's name, e.g. `"My Plugin"`. */
    name: string;
    /** The plugin's version, e.g. `"1.0.0"`. */
    version: string;
    /** The plugin's author. */
    author: string;
    /** The plugin's description, in one line. */
    description?: string;
    /**
     * The Pawn include whose natives the plugin implements, e.g. `"myplugin.inc"`, from
     * `includes/` or beside the plugin. Each exported function reaches Pawn as the
     * include declares it, and Pawn plugins use that include.
     */
    include?: string;
}
/**
 * Declares the plugin: its name, version, author and description, as the
 * server's plugin list shows them. Called once, at the top level:
 *
 * ```ts
 * plugin({ name: "Hello", version: "1.0.0", author: "you", description: "An example" });
 * ```
 *
 * `include` names the Pawn include whose natives the plugin implements.
 *
 * Pawn: `register_plugin`
 */
export declare function plugin(info: PluginInfo): void;
/**
 * The modules' settings in `amxts.config.ts`, each under its module's `configKey`.
 * Empty here: a module adds its key by augmenting this interface in
 * `"@amxts/core"` - `menus?: Partial<MenuCoreOptions>` - and the editor checks
 * the config against it.
 */
export interface ModuleOptions {
}
/**
 * Defines a module: `export default defineModule<Options>({ meta, requires,
 * defaults, setup })` in its module file. `setup` runs once,
 * when the server loads the module, with `defaults` and what `amxts.config.ts`
 * sets over them. Global; `import { defineModule } from "@amxts/core"` works too.
 */
export declare function defineModule<T>(definition: AmxtsModule<T>): AmxtsModule<T>;
/**
 * The forward's stopping rule, one of: `"never"` - every plugin hears it, whatever it
 * returns; `"handled"` - the first plugin that says it handled the forward
 * stops it.
 *
 * Pawn: `ET_IGNORE`, `ET_STOP`
 */
export type ForwardStop = "never" | "handled";
/** A placeholder for an unused type argument of `Forward`: `Forward<number>` has one argument. */
export declare class NoArgument {
}
/** What subscribe() hangs on: a Forward, reached by its tag - see forwardTrampoline. */
declare abstract class ForwardListener {
    abstract deliver(): void;
}
/**
 * A forward other plugins listen to, Pawn and TypeScript alike. Its arguments
 * are its type parameters, up to 32 - as many as AMX Mod X gives a forward:
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
 * A Pawn plugin listens with `public myplugin_on_round_end(winner)`, as usual;
 * a TypeScript plugin with `subscribe(handler)`. A number, a boolean and a
 * Player (its `id`) reach Pawn as numbers, a `Float` as a Float, a string as
 * a string, a `number[]` or a `Vector` as an array. A `Team` or a
 * `RoundWinner` goes as Pawn's number where an include declares the forward
 * with that tag; a `Team` for a forward no include declares is a build error.
 *
 * The forward is created on its first emit, or earlier by `create()` - once
 * every plugin has loaded (`plugin_cfg` or later), or those loaded after it
 * would not hear it.
 *
 * Pawn: `CreateMultiForward`, `ExecuteForward`
 */
export declare class Forward<T1 = NoArgument, T2 = NoArgument, T3 = NoArgument, T4 = NoArgument, T5 = NoArgument, T6 = NoArgument, T7 = NoArgument, T8 = NoArgument, T9 = NoArgument, T10 = NoArgument, T11 = NoArgument, T12 = NoArgument, T13 = NoArgument, T14 = NoArgument, T15 = NoArgument, T16 = NoArgument, T17 = NoArgument, T18 = NoArgument, T19 = NoArgument, T20 = NoArgument, T21 = NoArgument, T22 = NoArgument, T23 = NoArgument, T24 = NoArgument, T25 = NoArgument, T26 = NoArgument, T27 = NoArgument, T28 = NoArgument, T29 = NoArgument, T30 = NoArgument, T31 = NoArgument, T32 = NoArgument> extends ForwardListener {
    /** The forward's name, as Pawn plugins listen to it. */
    name: string;
    private crossing;
    /** The forward's stopping rule, one of `"never"` (the default) or `"handled"`. Set it before the first emit. */
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
     * Calls `handler` each time the forward is emitted - by this plugin, another
     * TypeScript plugin or a Pawn plugin:
     *
     * ```ts
     * const greeted = new Forward<string, number>("showcase_on_greeted");
     * greeted.subscribe((name, count) => console.log(`${name}: ${count}`));
     * ```
     *
     * The handler's parameters take the forward's types; a named function may
     * take fewer of them. A forward created by a Pawn plugin reaches TypeScript
     * only when one of the amxts host plugin's includes declares it; one emitted
     * from TypeScript reaches every subscriber.
     */
    subscribe(handler: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13, a14: T14, a15: T15, a16: T16, a17: T17, a18: T18, a19: T19, a20: T20, a21: T21, a22: T22, a23: T23, a24: T24, a25: T25, a26: T26, a27: T27, a28: T28, a29: T29, a30: T30, a31: T31, a32: T32) => void): void;
    /** Stops calling a handler given to `subscribe()`. */
    unsubscribe(handler: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13, a14: T14, a15: T15, a16: T16, a17: T17, a18: T18, a19: T19, a20: T20, a21: T21, a22: T22, a23: T23, a24: T24, a25: T25, a26: T26, a27: T27, a28: T28, a29: T29, a30: T30, a31: T31, a32: T32) => void): void;
    /** Passes the forward's arguments to every `subscribe()` handler; the server calls it, not a plugin. */
    deliver(): void;
    /**
     * Creates the forward now rather than on its first emit; later calls do nothing.
     *
     * Pawn: `CreateMultiForward`
     */
    create(): void;
    /**
     * Sends the forward to every plugin that listens to it; `true` if it went out.
     *
     * Pawn: `ExecuteForward`
     */
    emit(a1?: T1, a2?: T2, a3?: T3, a4?: T4, a5?: T5, a6?: T6, a7?: T7, a8?: T8, a9?: T9, a10?: T10, a11?: T11, a12?: T12, a13?: T13, a14?: T14, a15?: T15, a16?: T16, a17?: T17, a18?: T18, a19?: T19, a20?: T20, a21?: T21, a22?: T22, a23?: T23, a24?: T24, a25?: T25, a26?: T26, a27?: T27, a28?: T28, a29?: T29, a30?: T30, a31?: T31, a32?: T32): boolean;
}
/**
 * A key-to-text store on disk: a Map that survives a map change and a server
 * restart.
 *
 * ```ts
 * const demos = new Storage("core_demo_counters");
 * const last = demos.get(auth);      // string | null
 * demos.set(auth, "3");
 * if (demos.has(auth)) ...
 * demos.delete(auth);
 * ```
 *
 * The file is named after the storage, kept in the `vault` folder of the AMX
 * Mod X data folder, and opened on first use. Values are text: a number goes
 * in with `toString()` and comes out with `parseInt`.
 *
 * Pawn: `nvault_open`, `nvault_get`, `nvault_set`, `nvault_remove`
 */
export declare class Storage {
    /** The storage's name, which is also its file's name. */
    name: string;
    private vault;
    constructor(
    /** The storage's name, which is also its file's name. */
    name: string);
    /** The value under `key`, or `null` when there is none. */
    get(key: string): string | null;
    /** Puts `value` under `key`, replacing what was there. */
    set(key: string, value: string): void;
    /** `true` when there is a value under `key`. */
    has(key: string): boolean;
    /** Removes `key` and its value; a key that is not there is ignored. */
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
 * A public function of another plugin - a Pawn plugin's public, or a
 * TypeScript plugin's `publicFor` name - to call from here:
 *
 * ```ts
 * const fn = PawnFunction.find(caller(), "OnAction");       // null when there is none
 * if (fn != null) fn.call().int(id).text("KEY").run();
 * const call = fn.call().int(id).int(target).buffer(256).int(255);
 * call.run();
 * const value = call.bufferText;                            // what it wrote into value[]
 * ```
 *
 * Pawn: `get_func_id`, `callfunc_begin_i`
 */
export declare class PawnFunction {
    /** The `id` of the plugin the function belongs to. */
    readonly plugin: i32;
    /**
     * The function's index in its plugin.
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
     * Finds the public `name` in the plugin with this `id` (a native's `caller()`);
     * `null` when the plugin has no such public.
     *
     * Pawn: `get_func_id`
     */
    static find(plugin: number, name: string): PawnFunction | null;
    /** Starts a call of the function: add its arguments in order, then `run()`. */
    call(): PawnCall;
}
/**
 * One call of a PawnFunction: its arguments in order, then `run()`. Any
 * number of strings and arrays may be passed, and what the function writes
 * into a `buffer()` is read afterwards from `bufferText`.
 *
 * Pawn: `callfunc_push_int`, `callfunc_push_str`, `callfunc_push_array`, `callfunc_end`
 */
export declare class PawnCall {
    private fn;
    private kinds;
    private ints;
    private texts;
    private cells;
    /** The text the function wrote into its `buffer()`, once `run()` is over. */
    bufferText: string;
    constructor(fn: PawnFunction);
    /** Adds a number argument. */
    int(value: number): PawnCall;
    /** Adds a boolean argument; the function gets `1` or `0`. */
    bool(value: boolean): PawnCall;
    /** Adds a string argument. */
    text(value: string): PawnCall;
    /** Adds an array of `size` cells for the function to fill - its `value[]`; one per call. The text is then in `bufferText`. */
    buffer(size: number): PawnCall;
    /** Calls the function and returns its result, or `0` when it could not be called. */
    run(): number;
    private add;
}
/**
 * Creates an AMX Mod X `Array:` of `cellSize` cells an item and returns its handle.
 *
 * Pawn: `ArrayCreate`
 */
export declare function createCellArray(cellSize: number): number;
/**
 * Frees an `Array:` made by `createCellArray`; its handle is no good afterwards.
 *
 * Pawn: `ArrayDestroy`
 */
export declare function destroyCellArray(handle: number): void;
/**
 * Reads every item of an `Array:` of `cellSize` cells an item, each as an array of numbers.
 *
 * Pawn: `ArrayGetArray`
 */
export declare function cellArrayRows(handle: number, cellSize: number): number[][];
/**
 * Adds one item, an array of numbers, to the end of an `Array:`.
 *
 * Pawn: `ArrayPushArray`
 */
export declare function pushCellArrayRow(handle: number, row: number[]): void;
/** Reads a Pawn string from `count` cells of a row, from `start`: a UTF-8 byte a cell, up to the first zero. */
export declare function cellsText(row: number[], start: number, count: number): string;
/** Writes text as `count` cells of a Pawn string: at most `count - 1` bytes, never half a letter, the rest zeros. */
export declare function textCells(text: string, count: number): number[];
/** Turns a menu's colour tags (`!y`, `!R`, ...) into the codes the game draws, and drops the ones only chat has (`!g`, `!b`, `!t`) and the game's own codes written into the text (`\y`); any other `!` stays. `showMenu` calls it, and a module hands its result to Pawn. */
export declare function menuColors(text: string): string;
/**
 * Text from Pawn - a dictionary's line, a Pawn plugin's argument - with its
 * colour codes made tags: a menu's `\y` `\r` `\d` `\w` `\R` are `!y` `!r`
 * `!d` `!w` `!R`, and chat's bytes `^1` `^3` `^4` are `!y` `!t` `!g`.
 */
export declare function colorTags(text: string): string;
/**
 * Shows a player an old-style menu of any length: `keys` are the keys it
 * accepts, `title` the name its key presses come back under.
 *
 * Colour tags, the same letters as in chat: `!y` yellow, `!r` red, `!d` grey,
 * `!w` white, `!R` to the right edge. Chat's own tags (`!g`, `!b`, `!t`)
 * are dropped, and so are the game's own codes (`\y`): text is written with tags.
 *
 * Pawn: `show_menu`, `register_menucmd`
 */
export declare function showMenu(id: number, keys: number, text: string, title: string): void;
/** A colour of a menu's item numbers: a menu's colour tag, `"!y"`, `"!r"`, `"!d"` or `"!w"`. */
export type MenuColor = "!y" | "!r" | "!d" | "!w";
/** The options of a `Menu`: its pages and the texts of its own items. */
export interface MenuOptions {
    /**
     * Items on a page, `7` at most: Back, More and Exit go below them. `0`
     * puts every item on one page, without Back and More - `10` at most.
     *
     * Pawn: `MPROP_PERPAGE`
     */
    perPage?: number;
    /**
     * Whether the menu has an Exit item; `true` by default.
     *
     * Pawn: `MPROP_EXIT`
     */
    exit?: boolean;
    /**
     * The Back item's text; AMX Mod X's `"Back"`, in the player's language, by default.
     *
     * Pawn: `MPROP_BACKNAME`
     */
    backText?: string;
    /**
     * The More item's text; AMX Mod X's `"More"` by default.
     *
     * Pawn: `MPROP_NEXTNAME`
     */
    nextText?: string;
    /**
     * The Exit item's text; AMX Mod X's `"Exit"` by default.
     *
     * Pawn: `MPROP_EXITNAME`
     */
    exitText?: string;
    /**
     * The colour of the item numbers; `"!r"`, red, by default.
     *
     * Pawn: `MPROP_NUMBER_COLOR`
     */
    numberColor?: MenuColor;
}
/** The context a menu's functions get: the player it is shown to, the menu and the data it was shown with. */
export interface MenuContext<Data extends object = object> {
    /** The player the menu is shown to. */
    player: Player;
    /** The menu itself: `menu.show(player, data)` keeps it open after a choice. */
    menu: Menu<Data>;
    /** The data `show` was given. */
    data: Data;
}
/** An item of a `Menu`: its title, when it is shown and can be chosen, and what choosing it does. */
export interface MenuItemOptions<Data extends object = object> {
    /** The item's text - or a function that gives it for the player it is shown to. */
    title: string | ((context: MenuContext<Data>) => string);
    /** Whether the player can choose it; one he cannot is drawn grey and does nothing. `true` by default. */
    enabled?: boolean | ((context: MenuContext<Data>) => boolean);
    /** Whether it is shown at all; a hidden item takes no place. `true` by default. */
    visible?: boolean | ((context: MenuContext<Data>) => boolean);
    /** The item's action, run when the player chooses it. The menu closes, unless this shows it again. */
    onSelect: (context: MenuContext<Data>) => void;
}
/**
 * A menu of AMX Mod X's own: items a player picks with the number keys, on
 * pages with Back and More, and Exit. `Data` is what it is shown with, which
 * its functions get beside the player.
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
 * The title and each item's title, `visible` and `enabled` are asked at
 * every `show`, for that player. Colour tags as in `showMenu`: `!y` yellow,
 * `!r` red, `!d` grey, `!w` white, `!R` to the right edge.
 *
 * Pawn: `menu_create`, `menu_setprop`
 */
export declare class Menu<Data extends object = object> {
    private readonly title;
    private readonly options;
    private readonly items;
    constructor(title: string | ((context: MenuContext<Data>) => string), options?: MenuOptions);
    /**
     * Adds an item: its title, when it is shown and can be chosen, and what
     * choosing it does.
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
     * Shows the menu to a player, with the data its functions get; it closes
     * when he chooses an item or leaves it.
     *
     * Pawn: `menu_display`
     */
    show(player: Player, data?: Data | null): void;
}
