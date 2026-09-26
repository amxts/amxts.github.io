/// <reference path="../as-types.d.ts" />
import "./promise";
import { Vector } from "./vector";
/** A handler that takes a player id and returns nothing — what player events and commands call. */
export type Handler = (id: number) => void;
/**
 * A handler that takes up to four numbers and returns nothing: for a forward
 * that passes more than a player id, and for a hookchain.
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
/** Sets the handler's answer to a number other than 0 or 1 — for Ham, for instance. */
export declare function outcome(value: number): void;
/**
 * Converts a number to a Pawn `Float:` cell, for a raw native or `ret()`:
 *
 *   ret(floatCell(2.5));
 *   rg_round_end(floatCell(5.0), ...);
 */
export declare function floatCell(value: f64): number;
/**
 * Rounds a number to the nearest whole number: a round time of 59.6 seconds
 * is 60, not 59.
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
 * callback by name: register_message, register_touch, query_client_cvar,
 * set_native_filter.
 *
 * ```ts
 * const pub = publicFor(onDeathMsg, "msg:DeathMsg");
 * if (pub.length > 0) register_message(get_user_msgid("DeathMsg"), pub);
 * ```
 *
 * An empty name means "already registered": such a registration cannot be
 * undone and survives a hot reload, so registering again would call the
 * handler twice. `key` identifies the registration across reloads — any name
 * unique within the plugin. `fallback` is the answer when the handler returns
 * nothing: 0 for most natives, 1 where the native expects the event handled.
 *
 * Register from the "cfg" event, not at the top of the file: a console
 * command registered that early (register_concmd, register_srvcmd) crashes
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
 * it as Invalid_Array. Inside TypeScript a list is a `string[]` or a
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
export declare function __strings(): i32;
/**
 * Reads an argument of the running handler by position; 0 is its first
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
 * The id of the plugin that called the running exported native, or -1.
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
/** The length of text an `out()` buffer holds: 255. */
export declare const TEXT_MAX: i32;
/**
 * A player: the hand-written basics below, and every entvar and CBasePlayer
 * member as a typed property from as/entities.ts (`player.gravity`,
 * `player.hideHud`, `player.origin`).
 */
/** A Counter-Strike team, by the name the game gives it: one of "TERRORIST", "CT", "SPECTATOR", "UNASSIGNED". */
export type Team = "TERRORIST" | "CT" | "SPECTATOR" | "UNASSIGNED";
/** A weapon a player can hold, by its class name, e.g. "weapon_ak47" or "weapon_knife". */
export type WeaponName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90";
/** An item `player.give` hands over: a weapon, armour ("item_kevlar", "item_assaultsuit") or the defuse kit ("item_thighpack"). */
export type ItemName = "weapon_p228" | "weapon_scout" | "weapon_hegrenade" | "weapon_xm1014" | "weapon_c4" | "weapon_mac10" | "weapon_aug" | "weapon_smokegrenade" | "weapon_elite" | "weapon_fiveseven" | "weapon_ump45" | "weapon_sg550" | "weapon_galil" | "weapon_famas" | "weapon_usp" | "weapon_glock18" | "weapon_awp" | "weapon_mp5navy" | "weapon_m249" | "weapon_m3" | "weapon_m4a1" | "weapon_tmp" | "weapon_g3sg1" | "weapon_flashbang" | "weapon_deagle" | "weapon_sg552" | "weapon_ak47" | "weapon_knife" | "weapon_p90" | "item_kevlar" | "item_assaultsuit" | "item_thighpack";
/**
 * The filter of `Player.all`; every field is optional, e.g.
 * `Player.all({ alive: true, team: "CT" })`.
 */
export interface PlayerFilter {
    /** Only living players. */
    alive?: boolean;
    /** Only dead players. */
    dead?: boolean;
    /** Only players of this team, e.g. "CT". */
    team?: Team;
    /** Only bots. */
    bots?: boolean;
    /** Only people, no bots. */
    humans?: boolean;
}
/** An AMX Mod X module a plugin can check for, one of "reapi", "cstrike", "fun", "hamsandwich", "engine", "fakemeta". */
export type ModuleName = "reapi" | "cstrike" | "fun" | "hamsandwich" | "engine" | "fakemeta";
/**
 * `true` when the server has the module: `if (hasModule("reapi")) ...`.
 * Check it before a native that only one module has.
 *
 * Pawn: `LibraryExists`, `module_exists`
 */
export declare function hasModule(name: ModuleName): boolean;
/** The options of `player.kill()`. */
export interface KillOptions {
    /** Keeps the player's frags: no penalty for the suicide. */
    keepFrags?: boolean;
}
/**
 * A connecting player, in "connect", "authorized" and "putinserver": name,
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
    /** The player's slot, 1 to 32. */
    readonly id: number;
    /** The player's name. */
    readonly name: string;
    /** The player's IP address without the port, e.g. "192.168.0.10". */
    readonly ip: string;
    /** The player's SteamID, e.g. "STEAM_0:1:12345". A bot has "BOT", HLTV has "HLTV"; until Steam confirms the player it is "STEAM_ID_PENDING" (wait for the "authorized" event), and on a LAN server "STEAM_ID_LAN". */
    readonly authid: string;
    /** `true` for a bot. */
    readonly isBot: boolean;
    /** `true` while the player is on the server. */
    readonly isConnected: boolean;
    /** The player's admin rights, from the letters in users.ini: `client.access.includes("Cvar")`. */
    readonly access: Access[];
    /** The player's team, one of "TERRORIST", "CT", "SPECTATOR" or "UNASSIGNED" (until the player joins a team). Setting it moves the player, as `player.team` does. */
    team: Team;
    /** `true` when nobody hears the player on the voice chat. Setting it mutes or unmutes him. */
    muted: boolean;
    /** A signal that aborts when the player leaves the server: `fetch(url, { signal: client.signal })`. */
    readonly signal: AbortSignal;
    /** Runs a command in the player's console, as if he had typed it: `client.command("stop")`. */
    command(text: string): void;
}
/**
 * A player in the game: everything a Client has, plus health, armor, frags,
 * weapons and the screen.
 *
 * An event about a player gives one as `event.player`; `Player.all()`
 * lists everyone on the server.
 */
export declare class Player extends PlayerFields implements Client {
    constructor(id: number);
    /**
     * The players on the server: `Player.all({ alive: true })`.
     *
     * Every field narrows: `{ bots: true }` is bots only, `{ humans: true }`
     * people only. Without a filter, everyone connected, never an HLTV proxy.
     *
     * Pawn: `get_players`
     */
    static all(filter?: PlayerFilter): Player[];
    /**
     * The change counter of a field plugins added to Player:
     * `Player.revision("semiclip")`. It goes up whenever the field changes on
     * any player — written by any plugin, TS or Pawn, or reset when a player
     * leaves; writing the same value is no change. To act on changes, keep the
     * last number and compare, at most once a frame.
     */
    static revision(field: string): number;
    /**
     * The player's name.
     *
     * Pawn: `get_user_name`
     */
    get name(): string;
    /**
     * The player's health: 100 at spawn. Setting it to 0 or less kills the player.
     *
     * Pawn: `get_user_health`, `set_user_health`
     */
    get health(): number;
    set health(hp: number);
    /**
     * The player's armor points: 100 with a bought vest, 0 without one.
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
     * The player's team, one of "TERRORIST", "CT", "SPECTATOR" or "UNASSIGNED". Correct
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
     * The player's IP address without the port, e.g. "192.168.0.10".
     *
     * Pawn: `get_user_ip`
     */
    get ip(): string;
    /**
     * The player's SteamID, e.g. "STEAM_0:1:12345". A bot has "BOT", HLTV has "HLTV"; until Steam confirms the player it is "STEAM_ID_PENDING" (wait for the "authorized" event), and on a LAN server "STEAM_ID_LAN".
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
     * "AbortError"; the next player in the slot gets a new one.
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
    /**
     * Shows a line of text on the player's screen:
     * `player.showHud("-35 HP", { color: [255, 40, 40], x: 0.02, y: 0.88, hold: 2 })`.
     * Every option has a default.
     *
     * Pawn: `set_hudmessage`, `show_hudmessage`
     */
    showHud(text: string, options?: HudOptions): void;
    /** The player's screen effects: `player.screen.fade({ ... })`, `.shake(...)`, `.statusIcon(...)` — see Screen. */
    get screen(): Screen;
    set muted(value: boolean);
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
     * Sets the player's reserve ammo for a weapon: `player.setAmmo("weapon_flashbang", 2)`.
     *
     * Pawn: `rg_set_user_bpammo`, `cs_set_user_bpammo`
     */
    setAmmo(weapon: WeaponName, amount: number): void;
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
     * The player's admin rights, from the letters in users.ini:
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
     * `player.command("messagemode nh_fov")`, `player.command("stop")`.
     * The player's game runs it, not the server.
     *
     * Pawn: `client_cmd`
     */
    command(text: string): void;
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
 * The ids of the players on the server, as an array. `flags`: "a" living,
 * "b" dead, "c" no bots, "h" no HLTV, "e" only `team`. `Player.all` does the
 * same with readable options.
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
/** A command's handler: gets the player who typed it and the words after the command's name. */
export type CommandHandler = (player: Player, args: string[]) => void;
/** The options of a command: who may use it and its description in a listing. */
export interface CommandOptions {
    /** The admin right a player needs to use the command; left out, everyone may. */
    access?: Access;
    /** The command's description, shown by `amx_help` and the like. */
    description?: string;
}
/**
 * Converts users.ini letters to rights: `accessOf("abc")` is
 * ["Immunity", "Reservation", "Kick"]. An unknown letter is skipped.
 *
 * Pawn: `read_flags`
 */
export declare function accessOf(letters: string): Access[];
/** A server command's handler: gets the words after the command's name. */
export type ServerCommandHandler = (args: string[]) => void;
/**
 * The look of a HUD message. Every field has a default, so
 * `{ color: [255, 40, 40] }` is enough.
 *
 * Pawn: `set_hudmessage`
 */
export interface HudOptions {
    /** The text's colour: red, green, blue, 0 to 255 each. */
    color?: number[];
    /** The horizontal position: 0 is the left edge, 1 the right; -1 centres the text. */
    x?: number;
    /** The vertical position: 0 is the top, 1 the bottom; -1 centres the text. */
    y?: number;
    /** The time the message stays on screen, in seconds. */
    hold?: number;
    /** The appearance effect, one of: "fade" in and out, "flicker", or "typewriter" — letter by letter. */
    effect?: HudEffect;
    /** The fade-in time, in seconds. */
    fadeIn?: number;
    /** The fade-out time, in seconds. */
    fadeOut?: number;
    /** The HUD channel, 1 to 4; -1 picks a free one. */
    channel?: number;
    /** The duration of the "flicker" and "typewriter" effects, in seconds. */
    effectTime?: number;
    /**
     * Large letters, for a result or a headline. They have no channels, so
     * `channel` does not apply.
     *
     * Pawn: `set_dhudmessage`
     */
    large?: boolean;
}
/** A HUD message's appearance effect, one of: "fade" in and out, "flicker", or "typewriter" — letter by letter. */
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
/** A fade's direction, one of: "in" from the colour to a clear view, "out" from a clear view to the colour. */
export type FadeDirection = "in" | "out";
/** The options of `player.screen.fade`. Times are in seconds. */
export interface FadeOptions {
    /** The colour: red, green, blue and alpha, 0 to 255 each; black by default. */
    color?: number[];
    /** The fade's duration, in seconds; 1 by default. */
    duration?: number;
    /** The time the full colour holds, in seconds; 0 by default. */
    hold?: number;
    /** The fade's direction, one of: "in" (the default) from the colour to a clear view, "out" from a clear view to the colour. */
    direction?: FadeDirection;
    /** Keeps the colour on the screen until the next fade. */
    stay?: boolean;
    /** Tints what is on the screen rather than painting over it. */
    modulate?: boolean;
}
/** The options of `player.screen.shake`. */
export interface ShakeOptions {
    /** The shake's strength: how far the view moves, up to 16 units; 4 by default. */
    amplitude?: number;
    /** The shake's duration, in seconds; 1 by default. */
    duration?: number;
    /** The shake's frequency, in jolts a second; 5 by default. */
    frequency?: number;
}
/** A status icon's state, one of "hide", "show" (lit) or "flash". */
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
     * Shows, flashes or hides a status icon by its sprite name ("dmg_cold",
     * "buyzone", "c4", ...), in a colour.
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
 * plugin_natives is over, so a Cvar the native makes (nhnse_register_cvar)
 * is made at once rather than when this plugin's init comes.
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
    /** The cvar's name, as the console knows it, e.g. "mp_timelimit". */
    name: string;
    private defaultValue;
    /**
     * The cvar's handle in the engine; 0 when the server has no such cvar.
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
     * @internal Finds or creates the cvar and starts hearing its changes. A Cvar
     * made at the top level of a plugin waits for plugin_init: creating a cvar
     * while plugins are still loading takes the server down.
     */
    attach(): void;
    private hook;
    /** `true` when the server has this cvar. */
    get exists(): bool;
    /** The cvar's value as text, e.g. "250". */
    get value(): string;
    set value(text: string);
    /** The cvar's value as a number. A whole number is written without a fraction: "5", not "5.000000". */
    get number(): number;
    set number(value: number);
    /** The cvar as an on/off switch: `true` for anything but 0. Writing `true` sets 1, `false` sets 0. */
    get boolean(): bool;
    set boolean(on: bool);
    /** Calls `listener` whenever the cvar's value changes. */
    addEventListener(type: "change", listener: CvarListener): void;
    /** Stops calling a listener added with addEventListener. */
    removeEventListener(type: "change", listener: CvarListener): void;
    /** @internal Calls the change listeners; the server does it when the cvar changes. A plugin listens with addEventListener. */
    dispatch(event: CvarChangeEvent): void;
}
/** The server, an event target like the DOM's: its events, commands, map and the folders AMX Mod X keeps. Used through `server`. */
export declare class Server {
    /** Calls `listener` every time the server raises the event `type`. */
    addEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /** Stops calling a listener added with addEventListener - the same function. */
    removeEventListener<K extends keyof ServerEventMap>(type: K, listener: (event: ServerEventMap[K]) => void): void;
    /**
     * The current map's name, e.g. "de_dust2".
     *
     * Pawn: `get_mapname`
     */
    get map(): string;
    /**
     * The number of player slots on the server: 32.
     *
     * Pawn: `get_maxplayers`
     */
    get maxPlayers(): number;
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
     * Adds a command players type: `"/hp"` in chat, or a name without the slash
     * in the console.
     *
     * ```ts
     * server.addCommand("/hp", (player, args) => print(player, `${player.health} HP`));
     * server.addCommand("/kick", kick, { access: "Kick", description: "Kick a player" });
     * ```
     *
     * `args` are the words after the command. A chat command is not repeated in
     * chat, and it does not run for a player without the `access` right.
     * `"say time"` runs when a player writes exactly "time" in chat.
     *
     * Pawn: `register_clcmd`
     */
    addCommand(name: string, handler: CommandHandler, options?: CommandOptions): void;
    /**
     * Adds a command of the server console - typed there, sent over rcon or run by
     * another plugin. Players cannot use it.
     *
     * ```ts
     * server.addServerCommand("myplugin_reset",(args) => reset(args.length > 0 ? args[0] : "all"));
     * ```
     *
     * `args` are the words after the command. It may be added at the top level of
     * the file.
     *
     * Pawn: `register_srvcmd`
     */
    addServerCommand(name: string, handler: ServerCommandHandler): void;
    /** Shows a HUD message to every player, with the same options as `player.showHud`. */
    showHud(text: string, options?: HudOptions): void;
}
/** The server the plugin runs on: its events, commands and map. */
export declare const server: Server;
/**
 * The game's events (reapi hookchains) and round control, as an event target
 * like the DOM's:
 *
 * ```ts
 * game.addEventListener("takeDamage", (event) => {
 *   if (event.player.isBot) event.preventDefault();
 * });
 * game.addEventListener("canPlayerHearPlayer", (event) => event.listener.team == event.sender.team);
 * game.addEventListener("flPlayerFallDamage", (event) => event.result / 2, true);
 * ```
 *
 * The event's type follows from its name. What a listener returns is the
 * answer to the game: before the game acts it replaces what the game would
 * do, after it (`post`) it replaces the result. A listener that returns
 * nothing leaves it to the game; `event.preventDefault()` blocks without an
 * answer. A value of the wrong type is an error in the editor and in the build.
 *
 * Pawn: `RegisterHookChain`
 */
export declare class Game {
    /**
     * Calls `listener` every time the game runs `type`. With `post` set to `true`
     * it runs after the game has acted, with the game's answer in `event.result`;
     * by default it runs before and can stop it.
     *
     * Pawn: `RegisterHookChain`
     */
    addEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /** Stops calling a listener added with addEventListener - the same function and the same `post`. */
    removeEventListener<K extends keyof GameEventMap, R extends GameAnswerMap[K] | void | Promise<GameAnswerMap[K] | void> = void>(type: K, listener: (event: GameEventMap[K]) => R, post?: boolean): void;
    /**
     * Ends the round now:
     *
     * ```ts
     * game.endRound({ winner: "TERRORIST" });                 // terrorists win, next round in 5 s
     * game.endRound({ winner: "draw", delay: 3 });            // a draw, next round in 3 s
     * game.endRound({ winner: "none", message: "" });         // a quiet restart: no message
     * ```
     *
     * The winner sets the score, the message and the sound ("Terrorists Win!");
     * `message` and `sound` replace them, "" turns them off.
     *
     * Pawn: `rg_round_end`
     */
    endRound(options: EndRoundOptions): void;
}
/** The winner of a round, one of "TERRORIST", "CT", "draw", or "none" - a restart without a winner. */
export type RoundWinner = "TERRORIST" | "CT" | "draw" | "none";
/** The options of `game.endRound`; only `winner` is required. */
export interface EndRoundOptions {
    /** The round's winner, one of "TERRORIST", "CT", "draw", or "none" - a restart. */
    winner: RoundWinner;
    /** Seconds until the next round starts; 5 by default. */
    delay?: number;
    /** The message in the middle of the screen, or a game text such as "#Terrorists_Win"; "default" is the usual one for this winner, "" none. */
    message?: string;
    /** The sound, a radio phrase such as "terwin"; "default" is the usual one for this winner, "" none. */
    sound?: string;
    /**
     * `true` to tell the roundEnd listeners of every plugin, Pawn ones too, as when
     * the game ends a round itself. `false` by default: a roundEnd listener that
     * ends the round would call itself.
     *
     * Pawn: `rg_round_end(..., trigger)`
     */
    dispatch?: boolean;
}
/** The game the plugin runs in: its events (reapi hookchains) and `endRound`. */
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
/** The place a message shows, as a string: one of "chat", "center", "console" or "notify". */
export type VariantName = "chat" | "center" | "console" | "notify";
export { Flag } from "./constants";
export * from "./events";
import { FlagName, HookName, HamName } from "./constants";
import { PlayerFields } from "./entities";
export { Entity, Weapon, WeaponKind, weaponKindOf } from "./entities";
import { ServerEventMap } from "./events";
/** A message's recipient together with its place: `{ id: 0, variant: "center" }`. `id` is a player's id, 0 for everyone. */
export interface Target {
    /** The recipient's player id; 0 for every player. */
    id: number;
    /** The place the message shows, one of "chat" (the default), "center", "console" or "notify". */
    variant?: VariantName;
}
/** Turns a chat line's colour tags (`!g`, `!r`, ...) into the colour codes the client reads, and records in `swapTeam` which team colour the line needs. `print` calls it; exported for tests. */
export declare function paint(text: string): string;
/** The team colour the last `paint()` chose for the line, one of "TERRORIST" (red), "CT" (blue), "SPECTATOR" (grey), or "" - the reader's own team colour. `print` reads it right after. */
export declare let swapTeam: string;
/**
 * Sends a message to a player, or to every player (0).
 *
 * ```ts
 * print(player, "Health restored!");                   // the player's chat
 * print(0, "Round starts in 5 seconds");                // everyone's chat
 * print(player, "Health restored!", "center");          // the middle of the player's screen
 * print({ id: 0, variant: "center" }, "Go!");           // the middle of everyone's screen
 * ```
 *
 * The first argument is a player, a player's id, or 0 for everyone. The third
 * is where the message shows, one of "chat" (the default), "center" - the middle of
 * the screen, "console" - the player's console, "notify" - the console too; CS
 * shows it on screen only with `developer 1`.
 *
 * Colour tags work in chat only:
 * - `!g` green, `!y` yellow (the usual chat colour)
 * - `!r` red, `!b` blue, `!w` grey, `!t` the colour of the reader's team
 *
 * In one message only one of red, blue, grey and `!t` works - the first one used.
 *
 * Pawn: `client_print`, `client_print_color`
 */
export declare function print<T extends Target | Client | number = Target>(to: T, message: string, variant?: VariantName): void;
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
 * Registers a console command for players; the handler gets the id of the
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
    /** Adds a number argument as it is: an entity index, a constant, a count. */
    num(value: number): Call;
    /** Adds a fractional number argument, one the native declares as `Float:`. */
    float(value: f64): Call;
    /** Adds a string argument, before the `...` or in the tail alike. */
    str(text: string): Call;
    /** Adds an array of cells the native reads and may write into, followed by its length. */
    buffer(cells: CellBuffer, length: number): Call;
    /** Adds a vector: three fractional numbers at one address - an origin, angles, a colour. Unlike `buffer`, no length follows it. */
    vec(x: f64, y: f64, z: f64): Call;
    /** Adds a vector the native fills in; after `run` the result is in `cells`. */
    vecInto(cells: CellBuffer): Call;
    /** Adds a number passed by address, as a `...` tail argument must be; `out` reads what the native wrote into it. */
    ref(value: number): Call;
    /** The value the native left in the `ref` argument at this position, after `run`. */
    out(index: i32): number;
    /** Calls the native with the arguments added so far and returns its result. */
    run(): number;
}
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
/**
 * Registers a Ham Sandwich hook the same way: `ham("spawn", "player", onSpawn)`.
 *
 * Pawn: `RegisterHam`
 */
export declare function ham(name: HamName, entityClass: string, handler: WideHandler, post?: bool): number;
/** The plugin's name, version, author and description, given to `plugin({ ... })`; `amxts_plugins` in the server console lists them. */
export interface PluginInfo {
    /** The plugin's name, e.g. "My Plugin". */
    name: string;
    /** The plugin's version, e.g. "1.0.0". */
    version: string;
    /** The plugin's author. */
    author: string;
    /** The plugin's description, in one line. */
    description?: string;
    /**
     * The Pawn include whose natives the plugin implements: `"myplugin.inc"`, from
     * includes/ or beside the plugin. Each exported function reaches Pawn as the
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
 * The modules' settings in amxts.config.ts, each under its module's configKey.
 * Empty here: a module adds its key by augmenting this interface in
 * "@amxts/core" - `menus?: Partial<MenuCoreOptions>` - and the editor checks
 * the config against it.
 */
export interface ModuleOptions {
}
/**
 * Defines a module: `export default defineModule<Options>({ meta, requires,
 * defaults, setup })` in its module file, like Nuxt's. `setup` runs once,
 * when the server loads the module, with `defaults` and what amxts.config.ts
 * sets over them. Global; `import { defineModule } from "@amxts/core"` works too.
 */
export declare function defineModule<T>(definition: AmxtsModule<T>): AmxtsModule<T>;
/**
 * The forward's stopping rule: `"never"` - every plugin hears it, whatever it
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
    abstract deliver(a: i32, b: i32, c: i32): void;
}
/**
 * A forward other plugins listen to, Pawn and TypeScript alike. Its arguments
 * are its type parameters:
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
 * Player (its id) reach Pawn as numbers, a string as a string. A `Team` or a
 * `RoundWinner` goes as Pawn's number where an include declares the forward
 * with that tag; a `Team` for a forward no include declares is a build error.
 *
 * The forward is created on its first emit, or earlier by `create()` - once
 * every plugin has loaded (plugin_cfg or later), or those loaded after it
 * would not hear it.
 *
 * Pawn: `CreateMultiForward`, `ExecuteForward`
 */
export declare class Forward<A = NoArgument, B = NoArgument, C = NoArgument> extends ForwardListener {
    /** The forward's name, as Pawn plugins listen to it. */
    name: string;
    private crossing;
    /** The forward's stopping rule, one of "never" (the default) or "handled". Set it before the first emit. */
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
    subscribe(handler: (a: A, b: B, c: C) => void): void;
    /** Stops calling a handler given to `subscribe()`. */
    unsubscribe(handler: (a: A, b: B, c: C) => void): void;
    /** Passes the forward's arguments to every `subscribe()` handler; the server calls it, not a plugin. */
    deliver(a: i32, b: i32, c: i32): void;
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
    emit(a?: A, b?: B, c?: C): boolean;
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
 * in with toString() and comes out with parseInt.
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
    /** The value under `key`, or null when there is none. */
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
 * const value = call.bufferText;                               // what it wrote into value[]
 * ```
 *
 * Pawn: `get_func_id`, `callfunc_begin_i`
 */
export declare class PawnFunction {
    /** The id of the plugin the function belongs to. */
    readonly plugin: i32;
    /**
     * The function's index in its plugin.
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
     * Finds the public `name` in the plugin with this id (a native's `caller()`);
     * null when the plugin has no such public.
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
    /** Adds a boolean argument; the function gets 1 or 0. */
    bool(value: boolean): PawnCall;
    /** Adds a string argument. */
    text(value: string): PawnCall;
    /** Adds an array of `size` cells for the function to fill - its `value[]`; one per call. The text is then in `bufferText`. */
    buffer(size: number): PawnCall;
    /** Calls the function and returns its result, or 0 when it could not be called. */
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
 * Frees an `Array:` made by createCellArray; its handle is no good afterwards.
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
/** Writes text as `count` cells of a Pawn string: at most count - 1 bytes, never half a letter, the rest zeros. */
export declare function textCells(text: string, count: number): number[];
/**
 * Shows a player an old-style menu of any length: `keys` are the keys it
 * accepts, `title` the name its key presses come back under.
 *
 * Colour tags: `!y` yellow, `!r` red, `!w` white, `!d` grey, `!R` to the right
 * edge. The game's own codes (`\y`, as in an old menu.ini) pass as they are.
 *
 * Pawn: `show_menu`, `register_menucmd`
 */
export declare function showMenu(id: number, keys: number, text: string, title: string): void;
