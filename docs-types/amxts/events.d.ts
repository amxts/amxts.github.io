/// <reference path="../as-types.d.ts" />
import { Client, Player } from "./facade";
/**
 * The plugin has loaded: register commands, events and hooks here.
 *
 * Note: Top-level code in the plugin file runs at the same moment, so most plugins never need this event.
 *
 * AMX Mod X: `plugin_init()`
 */
export declare class PluginInitEvent {
}
/**
 * An admin paused this plugin.
 *
 * AMX Mod X: `plugin_pause()`
 */
export declare class PluginPauseEvent {
}
/**
 * An admin resumed this plugin.
 *
 * AMX Mod X: `plugin_unpause()`
 */
export declare class PluginUnpauseEvent {
}
/**
 * The server is about to change the map.
 *
 * Note: This is *only* called if the mod itself handles the map change. The server command "changelevel", which is used by many plugins, will not trigger this forward. Unfortunately, this means that in practice this forward can be unreliable and will not be called in many situations.
 * Note: AMXX 1.8.3 has added the engine_changelevel() function, which will utilize the correct engine function to change the map, and therefore trigger this forward.
 *
 * AMX Mod X: `server_changelevel(map)`
 */
export declare class ServerChangelevelEvent {
    /** The map it changes to. */
    map: string;
    constructor(map: string);
}
/**
 * Every config has been read and every plugin is loaded - the moment to read cvars and to create forwards other plugins listen to.
 *
 * Note: When this forward is called, most plugins should have registered their cvars and commands already.
 *
 * AMX Mod X: `plugin_cfg()`
 */
export declare class PluginCfgEvent {
}
/**
 * The map is ending or the server is shutting down: save what has to survive.
 *
 * Note: The plugin is required to manually free Handles it has acquired, such as those from dynamic data structures. Failing to do that will result in the plugin and AMXX leaking memory.
 *
 * AMX Mod X: `plugin_end()`
 */
export declare class PluginEndEvent {
}
/**
 * Called when a message is about to be logged.
 *
 * Note: Message data and information can be retrieved using the read_log* set of functions.
 *
 * AMX Mod X: `plugin_log()`
 */
export declare class PluginLogEvent {
}
/**
 * The map is loading: the only moment models, sounds and sprites can be precached.
 *
 * Note: A hot reload of the plugin does not run it again - precaching needs a map change.
 *
 * AMX Mod X: `plugin_precache()`
 */
export declare class PluginPrecacheEvent {
}
/**
 * A player changed his info - usually his name.
 *
 * AMX Mod X: `client_infochanged(id)`
 */
export declare class ClientInfochangedEvent {
    /** The player the event is about. */
    player: Player;
    constructor(player: Player);
}
/**
 * A player started connecting. He is not in the game yet - wait for "putinserver" to show him anything.
 *
 * Note: This forward is called too early to do anything that directly affects the client.
 *
 * AMX Mod X: `client_connect(id)`
 */
export declare class ClientConnectEvent {
    /** The player the event is about. */
    player: Client;
    constructor(player: Client);
}
/**
 * A player started connecting, with his name and address - the place to turn him away.
 *
 * Note: This forward is called too early to do anything that directly affects the client.
 *
 * AMX Mod X: `client_connectex(id, name, ip, reason)`
 */
export declare class ClientConnectexEvent {
    /** The player the event is about. */
    player: Client;
    /** The name he connects with. */
    name: string;
    /** His address, with the port. */
    ip: string;
    /** What he is shown if he is turned away. */
    reason: string;
    constructor(player: Client, name: string, ip: string, reason: string);
}
/**
 * A player's SteamID is known. It may come before or after "putinserver".
 *
 * Note: A bot's SteamID is "BOT".
 *
 * AMX Mod X: `client_authorized(id, authid)`
 */
export declare class ClientAuthorizedEvent {
    /** The player the event is about. */
    player: Client;
    /** His SteamID. */
    authid: string;
    constructor(player: Client, authid: string);
}
/**
 * Old form of "disconnected" that misses some cases - use "disconnected".
 *
 * AMX Mod X: `client_disconnect(id)`
 */
export declare class ClientDisconnectEvent {
    /** The player the event is about. */
    player: Player;
    constructor(player: Player);
}
/**
 * A player left the server - quit, timed out or was kicked.
 *
 * Note: He can still be read here (name, team), but nothing reaches his screen any more.
 *
 * @example
 * server.addEventListener("disconnected", (event) => {
 * 	console.log(`${event.player.name} left: ${event.reason}`);
 * });
 *
 * AMX Mod X: `client_disconnected(id, bool:drop, message, maxlen)`
 */
export declare class ClientDisconnectedEvent {
    /** The player the event is about. */
    player: Player;
    /** True if the server dropped him (kick, timeout) rather than him leaving. */
    dropped: boolean;
    /** Why he left, as the server says it; empty when he just quit. */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * A player's slot is being freed, after "disconnected".
 *
 * Note: This fires after the client_disconnected() forward, when the player entity has been removed (e.g. is_user_connected(id) will return false).
 *
 * AMX Mod X: `client_remove(id, bool:drop, message)`
 */
export declare class ClientRemoveEvent {
    /** The player the event is about. */
    player: Player;
    /** True if the server dropped him. */
    dropped: boolean;
    /** Why he left. */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * A player sent a console command. For one command, `cmd("name", handler)` is simpler.
 *
 * Note: The command and its arguments can be read using the read_arg* set of functions.
 *
 * AMX Mod X: `client_command(id)`
 */
export declare class ClientCommandEvent {
    /** The player the event is about. */
    player: Player;
    constructor(player: Player);
}
/**
 * A player has joined and is in the game - the moment to greet him.
 *
 * Note: It is not defined whether the client already has a SteamID when this forward is called. client_authorized may occur either before or after this.
 *
 * @example
 * server.addEventListener("putinserver", (event) => {
 * 	print(event.player, "Welcome!");
 * });
 *
 * AMX Mod X: `client_putinserver(id)`
 */
export declare class ClientPutinserverEvent {
    /** The player the event is about. */
    player: Client;
    constructor(player: Client);
}
/**
 * Called when an inconsistent file is encountered by the engine.
 *
 * AMX Mod X: `inconsistent_file(id, filename, reason)`
 */
export declare class InconsistentFileEvent {
    /** The player the event is about. */
    player: Player;
    /** Detected file */
    filename: string;
    /** Buffer storing the disconnect reason (can be overwritten) */
    reason: string;
    constructor(player: Player, filename: string, reason: string);
}
/**
 * Allows plugins to declare module dependencies using require_module()
 *
 * AMX Mod X: `plugin_modules()`
 */
export declare class PluginModulesEvent {
}
/**
 * Called when the map has loaded, and all configs are done executing. This includes servercfgfile (server.cfg), amxx.cfg, plugin's config, and per-map config.
 *
 * Note: This is best place to initialize plugin functions which are based on cvar data.
 * Note: This will always be called once and only once per map. It will be called few seconds after plugin_cfg().
 *
 * AMX Mod X: `OnConfigsExecuted()`
 */
export declare class OnConfigsExecutedEvent {
}
/**
 * Called when the map has loaded, right after plugin_cfg() but any time before OnConfigsExecuted. It's called after amxx.cfg and all AutoExecConfig() exec commands have been added to the server command buffer.
 *
 * Note: This will always be called once and only once per map.
 *
 * AMX Mod X: `OnAutoConfigsBuffered()`
 */
export declare class OnAutoConfigsBufferedEvent {
}
/**
 * Called when CS internally fires a command to a player.
 *
 * Note: This is most notably used by the rebuy/autobuy functionality, Condition Zero also uses this to pass commands to bots internally.
 *
 * AMX Mod X: `CS_InternalCommand(id, cmd)`
 */
export declare class CS_InternalCommandEvent {
    /** The player the event is about. */
    player: Player;
    /** Command string */
    cmd: string;
    constructor(player: Player, cmd: string);
}
/**
 * Called when a client attempts to purchase an item.
 *
 * Note: This is called immediately when the client issues a buy command. The game has not yet checked if the client can actually buy the weapon.
 * Note: For a list of possible item ids see the CSI_* constants.
 *
 * AMX Mod X: `CS_OnBuyAttempt(index, item)`
 */
export declare class CS_OnBuyAttemptEvent {
    /** The player the event is about. */
    player: Player;
    /** Item id */
    item: number;
    constructor(player: Player, item: number);
}
/**
 * Called when a client purchases an item.
 *
 * Note: This is called right before the user receives the item and before the money is deducted from their cash reserves.
 * Note: For a list of possible item ids see the CSI_* constants.
 *
 * AMX Mod X: `CS_OnBuy(index, item)`
 */
export declare class CS_OnBuyEvent {
    /** The player the event is about. */
    player: Player;
    /** Item id */
    item: number;
    constructor(player: Player, item: number);
}
/**
 * Two entities touched.
 *
 * AMX Mod X: `pfn_touch(ptr, ptd)`
 */
export declare class PfnTouchEvent {
    /** The entity that moved into the other. */
    toucher: number;
    /** The entity it touched. */
    touched: number;
    constructor(toucher: number, touched: number);
}
/**
 * Every server frame - hundreds of times a second. Keep the listener tiny, or use setInterval.
 *
 * Note: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * AMX Mod X: `server_frame()`
 */
export declare class ServerFrameEvent {
}
/**
 * A player typed "kill" in the console to kill himself.
 *
 * AMX Mod X: `client_kill(id)`
 */
export declare class ClientKillEvent {
    /** The player the event is about. */
    player: Player;
    constructor(player: Player);
}
/**
 * Called at the start of each client think.
 *
 * Note: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * AMX Mod X: `client_PreThink(id)`
 */
export declare class Client_PreThinkEvent {
    /** The player the event is about. */
    player: Player;
    constructor(player: Player);
}
/**
 * Called after each client think.
 *
 * Note: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * AMX Mod X: `client_PostThink(id)`
 */
export declare class Client_PostThinkEvent {
    /** The player the event is about. */
    player: Player;
    constructor(player: Player);
}
/**
 * A player sent an impulse: 100 is the flashlight, 201 the spray.
 *
 * AMX Mod X: `client_impulse(id, impulse)`
 */
export declare class ClientImpulseEvent {
    /** The player the event is about. */
    player: Player;
    /** The impulse number. */
    impulse: number;
    constructor(player: Player, impulse: number);
}
/**
 * Called for CmdStart() on a client.
 *
 * Note: Use [get|set]_usercmd() to read and modify information in the usercmd struct.
 *
 * AMX Mod X: `client_cmdStart(id)`
 */
export declare class ClientCmdStartEvent {
    /** The player the event is about. */
    player: Player;
    constructor(player: Player);
}
/**
 * An entity thinks - its scheduled update.
 *
 * AMX Mod X: `pfn_think(entid)`
 */
export declare class PfnThinkEvent {
    /** The entity. */
    entity: number;
    constructor(entity: number);
}
/**
 * Called when an event is played.
 *
 * AMX Mod X: `pfn_playbackevent(flags, entid, eventid, Float:delay)`
 */
export declare class PfnPlaybackeventEvent {
    /** Event flags */
    flags: number;
    /** Index of entity to invoke event on */
    entity: number;
    /** Index of event in the precache table */
    eventid: number;
    /** Time until the event is played */
    delay: number;
    constructor(flags: number, entity: number, eventid: number, delay: number);
}
/**
 * Called when a keyvalue pair is sent to an entity.
 *
 * Note: Use copy_keyvalue() to retrieve the keyvalue information, and DispatchKeyVaue() to modify it.
 *
 * AMX Mod X: `pfn_keyvalue(entid)`
 */
export declare class PfnKeyvalueEvent {
    /** Entity index */
    entity: number;
    constructor(entity: number);
}
/**
 * An entity is being spawned on the map.
 *
 * AMX Mod X: `pfn_spawn(entid)`
 */
export declare class PfnSpawnEvent {
    /** The entity. */
    entity: number;
    constructor(entity: number);
}
/** Every event a server raises, by name: the short one and the Pawn one. */
export interface ServerEventMap {
    /** The plugin has loaded: register commands, events and hooks here. */
    init: PluginInitEvent;
    /** The plugin has loaded: register commands, events and hooks here. */
    plugin_init: PluginInitEvent;
    /** An admin paused this plugin. */
    pause: PluginPauseEvent;
    /** An admin paused this plugin. */
    plugin_pause: PluginPauseEvent;
    /** An admin resumed this plugin. */
    unpause: PluginUnpauseEvent;
    /** An admin resumed this plugin. */
    plugin_unpause: PluginUnpauseEvent;
    /** The server is about to change the map. */
    changelevel: ServerChangelevelEvent;
    /** The server is about to change the map. */
    server_changelevel: ServerChangelevelEvent;
    /** Every config has been read and every plugin is loaded - the moment to read cvars and to create forwards other plugins listen to. */
    cfg: PluginCfgEvent;
    /** Every config has been read and every plugin is loaded - the moment to read cvars and to create forwards other plugins listen to. */
    plugin_cfg: PluginCfgEvent;
    /** The map is ending or the server is shutting down: save what has to survive. */
    end: PluginEndEvent;
    /** The map is ending or the server is shutting down: save what has to survive. */
    plugin_end: PluginEndEvent;
    /** Called when a message is about to be logged. */
    log: PluginLogEvent;
    /** Called when a message is about to be logged. */
    plugin_log: PluginLogEvent;
    /** The map is loading: the only moment models, sounds and sprites can be precached. */
    precache: PluginPrecacheEvent;
    /** The map is loading: the only moment models, sounds and sprites can be precached. */
    plugin_precache: PluginPrecacheEvent;
    /** A player changed his info - usually his name. */
    infochanged: ClientInfochangedEvent;
    /** A player changed his info - usually his name. */
    client_infochanged: ClientInfochangedEvent;
    /** A player started connecting. He is not in the game yet - wait for "putinserver" to show him anything. */
    connect: ClientConnectEvent;
    /** A player started connecting. He is not in the game yet - wait for "putinserver" to show him anything. */
    client_connect: ClientConnectEvent;
    /** A player started connecting, with his name and address - the place to turn him away. */
    connectex: ClientConnectexEvent;
    /** A player started connecting, with his name and address - the place to turn him away. */
    client_connectex: ClientConnectexEvent;
    /** A player's SteamID is known. It may come before or after "putinserver". */
    authorized: ClientAuthorizedEvent;
    /** A player's SteamID is known. It may come before or after "putinserver". */
    client_authorized: ClientAuthorizedEvent;
    /** Old form of "disconnected" that misses some cases - use "disconnected". */
    disconnect: ClientDisconnectEvent;
    /** Old form of "disconnected" that misses some cases - use "disconnected". */
    client_disconnect: ClientDisconnectEvent;
    /** A player left the server - quit, timed out or was kicked. */
    disconnected: ClientDisconnectedEvent;
    /** A player left the server - quit, timed out or was kicked. */
    client_disconnected: ClientDisconnectedEvent;
    /** A player's slot is being freed, after "disconnected". */
    remove: ClientRemoveEvent;
    /** A player's slot is being freed, after "disconnected". */
    client_remove: ClientRemoveEvent;
    /** A player sent a console command. For one command, `cmd("name", handler)` is simpler. */
    command: ClientCommandEvent;
    /** A player sent a console command. For one command, `cmd("name", handler)` is simpler. */
    client_command: ClientCommandEvent;
    /** A player has joined and is in the game - the moment to greet him. */
    putinserver: ClientPutinserverEvent;
    /** A player has joined and is in the game - the moment to greet him. */
    client_putinserver: ClientPutinserverEvent;
    /** Called when an inconsistent file is encountered by the engine. */
    inconsistentFile: InconsistentFileEvent;
    /** Called when an inconsistent file is encountered by the engine. */
    inconsistent_file: InconsistentFileEvent;
    /** Allows plugins to declare module dependencies using require_module() */
    modules: PluginModulesEvent;
    /** Allows plugins to declare module dependencies using require_module() */
    plugin_modules: PluginModulesEvent;
    /** Called when the map has loaded, and all configs are done executing. This includes servercfgfile (server.cfg), amxx.cfg, plugin's config, and per-map config. */
    OnConfigsExecuted: OnConfigsExecutedEvent;
    /** Called when the map has loaded, right after plugin_cfg() but any time before OnConfigsExecuted. It's called after amxx.cfg and all AutoExecConfig() exec commands have been added to the server command buffer. */
    OnAutoConfigsBuffered: OnAutoConfigsBufferedEvent;
    /** Called when CS internally fires a command to a player. */
    CS_InternalCommand: CS_InternalCommandEvent;
    /** Called when a client attempts to purchase an item. */
    CS_OnBuyAttempt: CS_OnBuyAttemptEvent;
    /** Called when a client purchases an item. */
    CS_OnBuy: CS_OnBuyEvent;
    /** Two entities touched. */
    pfnTouch: PfnTouchEvent;
    /** Two entities touched. */
    pfn_touch: PfnTouchEvent;
    /** Every server frame - hundreds of times a second. Keep the listener tiny, or use setInterval. */
    frame: ServerFrameEvent;
    /** Every server frame - hundreds of times a second. Keep the listener tiny, or use setInterval. */
    server_frame: ServerFrameEvent;
    /** A player typed "kill" in the console to kill himself. */
    kill: ClientKillEvent;
    /** A player typed "kill" in the console to kill himself. */
    client_kill: ClientKillEvent;
    /** Called at the start of each client think. */
    PreThink: Client_PreThinkEvent;
    /** Called at the start of each client think. */
    client_PreThink: Client_PreThinkEvent;
    /** Called after each client think. */
    PostThink: Client_PostThinkEvent;
    /** Called after each client think. */
    client_PostThink: Client_PostThinkEvent;
    /** A player sent an impulse: 100 is the flashlight, 201 the spray. */
    impulse: ClientImpulseEvent;
    /** A player sent an impulse: 100 is the flashlight, 201 the spray. */
    client_impulse: ClientImpulseEvent;
    /** Called for CmdStart() on a client. */
    cmdStart: ClientCmdStartEvent;
    /** Called for CmdStart() on a client. */
    client_cmdStart: ClientCmdStartEvent;
    /** An entity thinks - its scheduled update. */
    pfnThink: PfnThinkEvent;
    /** An entity thinks - its scheduled update. */
    pfn_think: PfnThinkEvent;
    /** Called when an event is played. */
    pfnPlaybackevent: PfnPlaybackeventEvent;
    /** Called when an event is played. */
    pfn_playbackevent: PfnPlaybackeventEvent;
    /** Called when a keyvalue pair is sent to an entity. */
    pfnKeyvalue: PfnKeyvalueEvent;
    /** Called when a keyvalue pair is sent to an entity. */
    pfn_keyvalue: PfnKeyvalueEvent;
    /** An entity is being spawned on the map. */
    pfnSpawn: PfnSpawnEvent;
    /** An entity is being spawned on the map. */
    pfn_spawn: PfnSpawnEvent;
}
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
