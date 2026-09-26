import type { PluginNative } from '../../scripts/plugin-natives';
import type { HookShape } from './tables';
import { Coroutines } from './coroutines';
import { Memory } from './memory';
/** What a test hands the plugin: a cell, a flag, or text. */
export type Value = number | boolean | string;
/**
 * One argument of a call the plugin is handling, as the caller's frame holds
 * it: a cell, text, or an array (a Pawn array passed by reference - the
 * plugin can read it and write into it).
 */
export type ArgValue = Value | number[] | Pointer;
/**
 * An argument another plugin passed by address - an `any:...` tail - read
 * in its memory as text or as a cell, whichever the native asks for.
 */
export declare class Pointer {
    readonly plugin: PluginInstance;
    readonly at: number;
    constructor(plugin: PluginInstance, at: number);
}
/** What `server.native()` gives back: the result decoded the way Pawn would read it. */
export type NativeResult = number | boolean | string | number[] | null | undefined;
/** A path as AMX Mod X takes it, relative to the game folder: `a/b/c.txt`. */
export declare function normalizePath(path: string): string;
/** A wasm function the server calls back, and how. */
interface Handler {
    plugin: PluginInstance;
    /** Its index in the plugin's function table. */
    fn: number;
    /** 0: one cell, the player id. 1: four cells. See SHAPE_* in as/facade.ts. */
    shape: number;
    /** A closure's number: fn is then the plugin's dispatcher, called with it first (Handler.tag in module.cpp). */
    tag?: number;
}
/** A host public standing in for a handler: `__amxts_cb<index>`. */
interface Slot extends Handler {
    index: number;
    /** What the call answers when the handler says nothing. */
    fallback: number;
    key: string;
}
interface Task {
    slot: Slot;
    id: number;
    interval: number;
    due: number;
    repeat: boolean;
    order: number;
}
interface Cvar {
    name: string;
    value: string;
    pointer: number;
    hooks: Slot[];
}
/** The hookchain being run, for GetHookChainReturn and friends. */
export interface Chain {
    shape: HookShape;
    answer: Value;
    args: Value[];
    /** SetHookChainReturn ran: reapi lets a chain that answers be stopped only then. */
    answered?: boolean;
}
/** What firing a hookchain came to. */
export interface HookResult {
    /** A pre listener stopped the game's function: preventDefault, or an answer. */
    prevented: boolean;
    /** The chain's answer after every listener: a number, a boolean or text, by the chain. */
    result: Value;
    /** The arguments as the listeners left them (`event.damage = 10`). */
    args: Value[];
}
/** A user message a plugin sent: ScreenFade, StatusIcon, ... */
export interface UserMessage {
    name: string;
    /** The player it went to; 0 for everyone. */
    player: number;
    /** What was written, in order: bytes, shorts and longs as numbers, strings as text. */
    args: (number | string)[];
}
/** A forward a plugin sent out through ExecuteForward. */
export interface SentForward {
    name: string;
    args: Value[];
}
/** One line a player was shown. */
export interface Message {
    variant: 'chat' | 'center' | 'console' | 'notify' | 'hud';
    text: string;
}
export interface ServerOptions {
    /** "de_dust2" unless said. */
    map?: string;
    /** 32 unless said. */
    maxPlayers?: number;
    /** The modules hasModule() finds. All of reapi, cstrike, fun, hamsandwich, engine, fakemeta, nvault unless said. */
    modules?: string[];
    /** Cvars the server has before the plugin loads: `{ mp_freezetime: "5" }`. */
    cvars?: Record<string, string>;
    /** Files in the game folder before the plugin loads, by path: `{ "addons/amxmodx/configs/x.ini": "..." }`. */
    files?: Record<string, string>;
    /**
     * The system the server runs on, as `~/os` finds it: "win32" puts the amxts
     * module's amxts_amxx.dll in the modules folder. "linux" unless said.
     */
    platform?: 'win32' | 'linux';
}
export type TeamName = 'UNASSIGNED' | 'TERRORIST' | 'CT' | 'SPECTATOR';
export declare const TEAMS: TeamName[];
export interface JoinOptions {
    team?: TeamName;
    health?: number;
    armor?: number;
    alive?: boolean;
    bot?: boolean;
    authid?: string;
    ip?: string;
    /** Admin flags as users.ini writes them: "abcdefghijklmnopqrstu". "z" - a plain user - unless said. */
    flags?: string;
    origin?: number[];
    /** What he carries; the first is in his hands. A knife unless said. */
    weapons?: string[];
}
/** Any entity: its entvars and members, as the natives read and write them. */
export declare class FakeEntity {
    readonly server: FakeServer;
    readonly id: number;
    /** Keyed by the constant's value, and `value:element` for an array member. */
    readonly fields: Map<string, string | number | number[]>;
    constructor(server: FakeServer, id: number, classname: string);
    /**
     * A field by its constant's name, with or without the prefix:
     * `get("gravity")`, `get("var_renderfx")`, `get("m_iHideHUD")`. A float
     * is a number, a vector an array of three.
     */
    get(name: string, element?: number): number | number[] | string;
    set(name: string, value: number | number[] | string, element?: number): void;
    static key(field: number, element?: number): string;
    get classname(): string;
    get origin(): number[];
    set origin(value: number[]);
}
/** A weapon a player carries. */
export declare class FakeWeapon extends FakeEntity {
    readonly kind: string;
    constructor(server: FakeServer, id: number, kind: string, owner: number);
}
/** A player: what the natives read, and what he was shown. */
export declare class FakePlayer extends FakeEntity {
    name: string;
    connected: boolean;
    alive: boolean;
    readonly bot: boolean;
    readonly authid: string;
    readonly ip: string;
    /** Admin flags as bits: ADMIN_* . */
    flags: number;
    /** SPEAK_* flags: `muted` is SPEAK_MUTED. */
    speak: number;
    /** Backpack ammo by weapon name. */
    readonly ammo: Map<string, number>;
    /** Every line he was shown, in order. */
    readonly messages: Message[];
    /** What was run in his console: client_cmd, engclient_cmd. */
    readonly commands: string[];
    /** His userinfo keys - `lang` says his language. */
    readonly info: Map<string, string>;
    constructor(server: FakeServer, id: number, name: string, options: JoinOptions);
    get health(): number;
    set health(value: number);
    get armor(): number;
    set armor(value: number);
    get frags(): number;
    set frags(value: number);
    get deaths(): number;
    set deaths(value: number);
    get team(): TeamName;
    set team(value: TeamName);
    get muted(): boolean;
    /** The chat lines he was shown, one a line, colour bytes taken out. */
    get chat(): string;
    /** What was printed in the middle of his screen. */
    get center(): string;
    /** What was printed in his console. */
    get console(): string;
    /** HUD messages. */
    get hud(): string;
    private lines;
    /** A line for him. @internal */
    show(variant: Message['variant'], text: string): void;
    /** Forgets what he was shown, for a test that checks one step at a time. */
    clearMessages(): void;
    /** Every weapon he carries, slot by slot. */
    get items(): FakeWeapon[];
    /** What is in his hands. */
    get activeItem(): FakeWeapon | null;
    /** Hands him a weapon, at the end of its slot's chain. */
    give(kind: string): FakeWeapon;
    /** Takes every weapon away. */
    stripWeapons(): void;
    /** `say <text>` - a chat line, and a chat command if it is one. True if a plugin swallowed it. */
    say(text: string): boolean;
    /** `say_team <text>`. */
    sayTeam(text: string): boolean;
    private chatLine;
    /** A console command, split the way the engine splits it: `amx_slap "Some One" 5`. True if handled. */
    command(line: string): boolean;
    /** Leaves the server: the disconnect events, then the slot is free. */
    disconnect(options?: {
        dropped?: boolean;
        reason?: string;
    }): void;
}
/** A loaded plugin: its instance, its memory, and where it takes strings. */
export declare class PluginInstance {
    readonly server: FakeServer;
    readonly source: string;
    readonly natives: PluginNative[];
    instance: any;
    memory: Memory;
    /** The buffer __strings() lends: where an event's text is copied. */
    strings: number;
    /** What plugin() said about it. */
    info: {
        name: string;
        version: string;
        author: string;
        description: string;
    };
    /** The coroutine scheduler, for a plugin that awaits; null for one that does not. */
    readonly coroutines: Coroutines | null;
    constructor(server: FakeServer, source: string, module: any, natives?: PluginNative[], binary?: Uint8Array);
    /** Runs the file's top level, then asks for the string buffer - the module's order. */
    start(): void;
    get table(): any;
    /**
     * Copies text into the plugin's string buffer, a cell a character, as
     * CopyStringToPlugin does. `offset` counts cells and moves past it.
     */
    copyString(text: string, offset: {
        cells: number;
    }): number;
    private importFor;
}
/**
 * The server a plugin runs on in a test.
 *
 * ```ts
 * const server = await loadPlugin("as/showcase.ts");
 * const player = server.join("Alice", { team: "CT" });
 * player.say("/tour");
 * server.advance(5000);
 * ```
 */
export declare class FakeServer {
    readonly map: string;
    readonly maxPlayers: number;
    readonly modules: Set<string>;
    /** Milliseconds since the map started; advance() moves it. */
    time: number;
    /** Date.now() when the map started. */
    readonly startedAt: number;
    readonly plugins: PluginInstance[];
    /** Players by slot, 1 to maxPlayers; weapons and other entities after them. */
    readonly entities: Map<number, FakeEntity>;
    /** What console.log and server_print wrote, one entry a line. */
    readonly logLines: string[];
    /** What server_cmd ran. */
    readonly commands: string[];
    /** Forwards the plugins sent out with ExecuteForward, in order. */
    readonly forwards: SentForward[];
    /** nVault files, by name. */
    readonly vaults: Map<string, Map<string, string>>;
    /**
     * The game folder's files, by path relative to it
     * (`addons/amxmodx/data/x.txt`): what fs and the file natives read and
     * write. A test fills it before the plugin reads, and reads it after.
     */
    readonly files: Map<string, Uint8Array<ArrayBufferLike>>;
    /** Folders that are there with nothing in them; a file's folders are there anyway. */
    readonly folders: Set<string>;
    /** What get_localinfo answers: the folders AMX Mod X was told about. */
    readonly localinfo: Map<string, string>;
    /**
     * The dynamic arrays (cellarray.inc) plugins made, by handle: an item is
     * its cells, text a byte a cell. `cellArrayStrings(handle)` and
     * `cellArrayCells(handle)` read one the way a Pawn plugin would.
     */
    readonly cellArrays: Map<number, {
        cellSize: number;
        items: number[][];
    }>;
    private nextCellArray;
    /** fopen's and open_dir's handles. @internal */
    readonly handles: Map<number, {
        path: string;
        position: number;
    } | {
        entries: string[];
        next: number;
    }>;
    /** Everything below is the module's state. @internal */
    readonly events: Map<string, Handler[]>;
    readonly subscriptions: Map<string, {
        handler: Handler;
        tag: number;
    }[]>;
    readonly slots: Slot[];
    readonly clientCommands: Map<string, Slot[]>;
    readonly hookchains: Map<string, {
        pre: Slot[];
        post: Slot[];
    }>;
    readonly tasks: Task[];
    readonly exported: Map<string, Handler>;
    readonly cvars: Map<string, Cvar>;
    readonly vaultHandles: string[];
    readonly forwardHandles: {
        name: string;
        types: number[];
    }[];
    hud: {
        color: number[];
        x: number;
        y: number;
        hold: number;
        channel: number;
    };
    /** The game rules' members a plugin set (set_member_game), by member. */
    readonly rules: Map<number, number>;
    /** Rounds a plugin ended with rg_round_end, in order. */
    readonly roundEnds: {
        status: number;
        event: number;
        delay: number;
        message: string;
        sound: string;
        trigger: boolean;
    }[];
    /** Sounds played: from an entity (rh_emit_sound2), or sent to a player (rg_send_audio). */
    readonly sounds: {
        entity: number;
        sample: string;
    }[];
    /**
     * User messages plugins sent, in order: the message's name, the player it
     * went to (0 for everyone), and what was written, write_* by write_*.
     */
    readonly userMessages: UserMessage[];
    /** The ids get_user_msgid handed out, by name - ShowMenu's is the game's 96. @internal */
    readonly messageIds: Map<string, number>;
    /** The message between message_begin and message_end. @internal */
    writing: UserMessage | null;
    /** Told of every message as it ends: the menu kit reads ShowMenu here. @internal */
    readonly messageListeners: ((message: UserMessage) => void)[];
    /** resemiclip's masks, by player: bit N set - player N+1 is not solid to him. */
    readonly semiclipMasks: Map<number, number>;
    /** The progress bar each player was last shown (rg_send_bartime), in seconds. */
    readonly bartimes: Map<number, number>;
    /** RegisterHam's callbacks, by `<function id>:<class>:pre|post`. */
    readonly hams: Map<string, Slot[]>;
    /** register_touch's callbacks. */
    readonly touches: Slot[];
    /** query_client_cvar's questions, waiting for answerCvar(). */
    readonly cvarQueries: {
        player: number;
        cvar: string;
        slot: Slot;
    }[];
    /** What precache_model and precache_sound were asked for, in order: the index is the place + 1. */
    readonly precached: string[];
    /**
     * The fields plugins add to Player, by slot and field name, as the module
     * keeps them: a number
     * (a boolean is 1 or 0) or a text. Cleared when a player leaves.
     */
    readonly playerData: Map<number, Map<string, string | number>>;
    /** Which of those texts are lists of player ids ("3,5"), by `slot:key`: a player who leaves goes from them. */
    readonly playerLists: Set<string>;
    /** How often each field changed on anyone, by the name before the first dot (Player.revision). */
    readonly playerRevisions: Map<string, number>;
    /** The arguments of the callback that is running, for arg() and arg_text(). */
    callArgs: ArgValue[] | null;
    /** The command being handled, for read_argv. */
    argv: string[];
    chain: Chain | null;
    current: PluginInstance | null;
    private outcome;
    private outcomeSaid;
    private taskOrder;
    private hookHandles;
    private entityIds;
    constructor(options?: ServerOptions);
    /** Loads a plugin: its top level runs now, its init when start() is called. */
    load(source: string): Promise<PluginInstance>;
    /** plugin_init and plugin_cfg, as a map start sends them. */
    start(): void;
    /** Everything logged, one line a line. */
    get log(): string;
    /** The players on the server. */
    get players(): FakePlayer[];
    player(id: number): FakePlayer | undefined;
    /** A cvar's value, or undefined when the server has no such cvar. */
    cvar(name: string): string | undefined;
    /** Sets a cvar as the console would: `mp_freezetime 5`, and its change listeners hear it. */
    setCvar(name: string, value: string | number): void;
    /** A file's text, or undefined when there is no such file. */
    file(path: string): string | undefined;
    /** Puts a file in the game folder, as UTF-8. */
    writeFile(path: string, text: string): void;
    /** Whether a folder is there: named in `folders`, or holding a file. */
    folderExists(path: string): boolean;
    /** ArrayCreate. @internal */
    createCellArray(cellSize: number): number;
    /** A dynamic array's items as text (ArrayGetString), or null for a handle that is not there - Invalid_Array is 0. */
    cellArrayStrings(handle: number): string[] | null;
    /** A dynamic array's items as cells - each item's cells when it holds more than one - or null. */
    cellArrayCells(handle: number): (number | number[])[] | null;
    /** A storage's nVault, as a Map a test can fill before the plugin reads it. */
    vault(name: string): Map<string, string>;
    /** A player connects: client_connect, client_authorized, client_putinserver. */
    join(name: string, options?: JoinOptions): FakePlayer;
    /**
     * Moves the clock forward and runs every timer that comes due on the way,
     * in order - a repeating one as many times as it fits.
     */
    advance(ms: number): void;
    /**
     * Raises a forward the host plugin relays - "client_putinserver",
     * "plugin_cfg" - or one a Pawn plugin sends: every handler and every
     * Forward.subscribe() of that name hears it. Text arrives as text, a
     * boolean as 1 or 0. Returns the highest answer, as the module does.
     */
    fire(name: string, ...args: Value[]): number;
    /**
     * Runs a reapi hookchain the way the game would: the pre listeners, then
     * the game's own function unless one of them stopped it, then the post
     * listeners.
     *
     * ```ts
     * server.fireHook("takeDamage", [victim.id, 0, attacker.id, 30.0, 2]);
     * server.fireHook("flPlayerFallDamage", [player.id], { result: 40 });
     * ```
     *
     * `event` is the name game.addEventListener takes, or reapi's short one
     * ("take_damage"). `args` are the chain's arguments in order; a float is
     * written as a number and goes as one. `result` is what the game's own
     * function answers when it runs - what a post listener reads as
     * event.result.
     */
    fireHook(event: string, args?: Value[], options?: {
        result?: Value;
    }): HookResult;
    /**
     * One of the module's own natives for Pawn plugins, as a Pawn plugin calls
     * it: the amxts_*_player_data natives over the fields plugins add to Player
     * (runtime/host/amxts.inc).
     *
     * ```ts
     * server.amxtsNative("amxts_get_player_data", bot.id, "ghost");       // 1
     * server.amxtsNative("amxts_set_player_data_string", bot.id, "tag", "x");
     * ```
     *
     * A number comes back whole, a Float as a number, a text as the text
     * `out[]` holds (`len` is the last argument, 4095 when left out).
     */
    amxtsNative(name: string, ...args: Value[]): number | string;
    /** A Player field's number: 0 when never written, or a text. @internal */
    playerNumber(id: number, key: string): number;
    /** A Player field's text: "" when never written, or a number. @internal */
    playerText(id: number, key: string): string;
    /** Writes a Player field, as the module does: only for a slot. @internal */
    setPlayerData(id: number, key: string, value: number | string, players?: boolean): void;
    /** A player left: his fields go, and he goes from everyone's lists of players. @internal */
    clearPlayerData(id: number): void;
    private bumpRevision;
    /**
     * Calls a native a plugin exported with nativeFn, as another plugin would.
     * Returns what it gave back with ret(); a `setArg` it made lands in `args`.
     */
    callNative(name: string, ...args: ArgValue[]): number;
    /**
     * Calls a plugin's own native - an `export function` of its entry file -
     * the way a Pawn plugin would, with its `.inc` signature: text as a Pawn
     * string, a `Float` as its bits, an array followed by its size, and an
     * out-buffer for a string or array result. Returns the result as Pawn
     * reads it back: the text in `out[]` for a string (null for a `string |
     * null` that returned false), the cells written for an array, a float for
     * a `Float`, a boolean for a `boolean`.
     */
    native(name: string, ...args: ArgValue[]): NativeResult;
    /** native(), with an out-buffer of `room` cells: `charsmax(out)` for a string, `max` for an array. */
    nativeWithRoom(name: string, room: number, args: ArgValue[]): NativeResult;
    /**
     * A plugin calling another plugin's `export function` native
     * through its ~/natives wrapper: the cells it pushed - text and buffers as
     * addresses in its memory - turned into the frame the native reads, and
     * what the native wrote into a buffer copied back, as AMX Mod X does.
     * @internal
     */
    callFromPlugin(caller: PluginInstance, name: string, cells: number[]): number;
    /** Fire in module.cpp: one handler, its outcome, and the state put back. @internal */
    call(handler: Handler, args: number[], fallback: number): number;
    /** Runs `body` as `plugin`: what its natives are called on behalf of. @internal */
    within<T>(plugin: PluginInstance, body: () => T): T;
    /** The arguments arg() and arg_text() read while `body` runs. @internal */
    withCallArgs<T>(args: ArgValue[], body: () => T): T;
    private cellFor;
    /** A client command: client_command, then every handler of it until one takes it. @internal */
    clientCommand(player: FakePlayer, argv: string[]): boolean;
    /** A slot by the public name a native was given: "__amxts_cb3". @internal */
    slotByPublic(name: string): Slot;
    /** One player touching another: every register_touch callback, as the engine calls it. */
    touch(toucher: FakePlayer, touched: FakePlayer): void;
    /** A client answering query_client_cvar: every question about that cvar it had. */
    answerCvar(player: FakePlayer, cvar: string, value: string): void;
    /** An entity on the map, as create_entity makes one. */
    createEntity(classname: string): FakeEntity;
    /** @internal */
    nextEntityId(): number;
    /** @internal */
    createCvar(name: string, value: string): Cvar;
    /** @internal */
    cvarByPointer(pointer: number): Cvar | undefined;
    /** A new value, and hook_cvar_change's callbacks told (pcvar, old, new). @internal */
    changeCvar(cvar: Cvar, value: string): void;
    /** A native from natives.ts, called by `plugin`. @internal */
    callNativeImpl(plugin: PluginInstance, name: string, args: number[]): number;
    /**
     * The externals the facade declares, as module.cpp registers
     * them in g_wasmNatives. Each is called with the plugin that called it.
     * @internal
     */
    /** Modules a plugin runs for the others (module.cpp's g_services), and the bytes of the call in flight. @internal */
    private services;
    private rpcRequest;
    private rpcReply;
    private rpcResult;
    readonly bridge: {
        amxts_serve(this: FakeServer, plugin: PluginInstance, name: number, hash: number): void;
        amxts_owner(this: FakeServer, plugin: PluginInstance, name: number, hash: number): number;
        amxts_rpc(this: FakeServer, plugin: PluginInstance, service: number, target: number, data: number, length: number): number;
        amxts_rpc_take(this: FakeServer, plugin: PluginInstance, to: number): void;
        amxts_rpc_reply(this: FakeServer, plugin: PluginInstance, data: number, length: number): void;
        amxts_rpc_result(this: FakeServer, plugin: PluginInstance, to: number): void;
        abort(this: FakeServer, plugin: PluginInstance, message: number, file: number, line: number, column: number): never;
        seed(): number;
        'Date.now': (this: FakeServer) => number;
        'performance.now': (this: FakeServer) => number;
        'console.log': (this: FakeServer, plugin: PluginInstance, message: number) => void;
        'console.info': (this: FakeServer, plugin: PluginInstance, message: number) => void;
        'console.debug': (this: FakeServer, plugin: PluginInstance, message: number) => void;
        'console.warn': (this: FakeServer, plugin: PluginInstance, message: number) => void;
        'console.error': (this: FakeServer, plugin: PluginInstance, message: number) => void;
        'console.assert': (this: FakeServer, plugin: PluginInstance, condition: number, message: number) => void;
        'console.time': () => void;
        'console.timeLog': () => void;
        'console.timeEnd': () => void;
        print_server(this: FakeServer, plugin: PluginInstance, message: number): void;
        print_client(this: FakeServer, plugin: PluginInstance, id: number, channel: number, message: number): void;
        say_text(this: FakeServer, plugin: PluginInstance, id: number, text: number): void;
        get_name(this: FakeServer, plugin: PluginInstance, id: number, out: number, max: number): number;
        get_health(this: FakeServer, plugin: PluginInstance, id: number): number;
        set_health(this: FakeServer, plugin: PluginInstance, id: number, hp: number): void;
        outcome(this: FakeServer, plugin: PluginInstance, value: number): void;
        on(this: FakeServer, plugin: PluginInstance, name: number, fn: number, shape: number): void;
        subscribe(this: FakeServer, plugin: PluginInstance, name: number, fn: number, tag: number): void;
        emit_local(this: FakeServer, plugin: PluginInstance, name: number, mask: number, cells: number, argc: number): void;
        slot(this: FakeServer, plugin: PluginInstance, fn: number, shape: number, key: number, fallback: number): number;
        clcmd(this: FakeServer, plugin: PluginInstance, pattern: number, fn: number, flags: number, info: number, shape: number): number;
        task(this: FakeServer, plugin: PluginInstance, secondsBits: number, fn: number, id: number, repeat: number): number;
        stop_task(this: FakeServer, plugin: PluginInstance, id: number): number;
        hook(this: FakeServer, plugin: PluginInstance, id: number, fn: number, post: number): number;
        ham(this: FakeServer, plugin: PluginInstance, id: number, entityClass: number, fn: number, post: number): number;
        tag(this: FakeServer, _plugin: PluginInstance, tag: number): void;
        co_id(this: FakeServer, _plugin: PluginInstance): number;
        export(this: FakeServer, plugin: PluginInstance, name: number, fn: number): number;
        plugin(this: FakeServer, plugin: PluginInstance, name: number, version: number, author: number, description: number): void;
        arg(this: FakeServer, plugin: PluginInstance, index: number): number;
        arg_text(this: FakeServer, plugin: PluginInstance, index: number, out: number, max: number): number;
        arg_string(this: FakeServer, plugin: PluginInstance, index: number, out: number, max: number): number;
        arg_array(this: FakeServer, plugin: PluginInstance, index: number, out: number, count: number): number;
        set_arg_array(this: FakeServer, plugin: PluginInstance, index: number, cells: number, count: number): number;
        set_arg(this: FakeServer, plugin: PluginInstance, index: number, value: number): 0 | 1;
        set_arg_text(this: FakeServer, plugin: PluginInstance, index: number, text: number, max: number): number;
        player_data_get(this: FakeServer, plugin: PluginInstance, id: number, key: number): number;
        player_data_set(this: FakeServer, plugin: PluginInstance, id: number, key: number, value: number): void;
        player_data_get_text(this: FakeServer, plugin: PluginInstance, id: number, key: number, out: number, max: number): number;
        player_data_set_text(this: FakeServer, plugin: PluginInstance, id: number, key: number, value: number): void;
        player_data_set_players(this: FakeServer, plugin: PluginInstance, id: number, key: number, value: number): void;
        player_data_revision(this: FakeServer, plugin: PluginInstance, key: number): number;
        argc(this: FakeServer): number;
        caller(): number;
        call(this: FakeServer, plugin: PluginInstance, id: number, argsPtr: number, maskPtr: number, argc: number): number;
    };
    /** What `tag()` said for the next registration (w_tag in module.cpp). */
    private pendingTag;
    private takeTag;
    private takeSlot;
}
export {};
