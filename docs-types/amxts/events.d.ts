/// <reference path="../as-types.d.ts" />
import { Client, Player } from "./facade";
/**
 * The plugin has loaded: register commands, events and hooks here.
 *
 * Note: Top-level code in the plugin file runs at the same moment, so most plugins never need this event.
 *
 * Pawn: `plugin_init()`
 */
export declare class PluginInitEvent {
}
/**
 * An admin paused this plugin.
 *
 * Pawn: `plugin_pause()`
 */
export declare class PluginPauseEvent {
}
/**
 * An admin resumed this plugin.
 *
 * Pawn: `plugin_unpause()`
 */
export declare class PluginUnpauseEvent {
}
/**
 * The server is about to change the map.
 *
 * Note: This is *only* called if the mod itself handles the map change. The server command "changelevel", which is used by many plugins, will not trigger this forward. Unfortunately, this means that in practice this forward can be unreliable and will not be called in many situations.
 * Note: AMXX 1.8.3 has added the engine_changelevel() function, which will utilize the correct engine function to change the map, and therefore trigger this forward.
 *
 * Pawn: `server_changelevel(map)`
 */
export declare class ServerChangelevelEvent {
    /**
     * The map the server changes to, e.g. "de_dust2".
     *
     * Pawn: `map`
     */
    map: string;
    constructor(map: string);
}
/**
 * Every config has been read and every plugin is loaded: the moment to read cvars and to create forwards other plugins listen to.
 *
 * Note: When this forward is called, most plugins should have registered their cvars and commands already.
 *
 * Pawn: `plugin_cfg()`
 */
export declare class PluginCfgEvent {
}
/**
 * The map is ending or the server is shutting down: save what has to survive.
 *
 * Note: The plugin is required to manually free Handles it has acquired, such as those from dynamic data structures. Failing to do that will result in the plugin and AMXX leaking memory.
 *
 * Pawn: `plugin_end()`
 */
export declare class PluginEndEvent {
}
/**
 * Called when a message is about to be logged.
 *
 * Note: Message data and information can be retrieved using the read_log* set of functions.
 *
 * Pawn: `plugin_log()`
 */
export declare class PluginLogEvent {
}
/**
 * The map is loading: the only moment models, sounds and sprites can be precached.
 *
 * Note: A hot reload of the plugin does not run it again: precaching needs a map change.
 *
 * Pawn: `plugin_precache()`
 */
export declare class PluginPrecacheEvent {
}
/**
 * A player changed his info, usually the name.
 *
 * Pawn: `client_infochanged(id)`
 */
export declare class ClientInfochangedEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * A player started connecting. The player is not in the game yet: show him anything after "putinserver".
 *
 * Note: This forward is called too early to do anything that directly affects the client.
 *
 * Pawn: `client_connect(id)`
 */
export declare class ClientConnectEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Client;
    constructor(player: Client);
}
/**
 * A player started connecting, with a name and an address: the place to turn him away.
 *
 * Note: This forward is called too early to do anything that directly affects the client.
 *
 * Pawn: `client_connectex(id, name, ip, reason)`
 */
export declare class ClientConnectexEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Client;
    /**
     * The name the player connects with.
     *
     * Pawn: `name`
     */
    name: string;
    /**
     * The player's address with the port, e.g. "192.168.0.5:27005".
     *
     * Pawn: `ip`
     */
    ip: string;
    /**
     * The message the player sees if he is turned away.
     *
     * Pawn: `reason`
     */
    reason: string;
    constructor(player: Client, name: string, ip: string, reason: string);
}
/**
 * A player's SteamID is known. May come before or after "putinserver".
 *
 * Note: A bot's SteamID is "BOT".
 *
 * Pawn: `client_authorized(id, authid)`
 */
export declare class ClientAuthorizedEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Client;
    /**
     * The player's SteamID, e.g. "STEAM_0:1:12345". A bot has "BOT", HLTV has "HLTV"; on a LAN server it is "STEAM_ID_LAN".
     *
     * Pawn: `authid`
     */
    authid: string;
    constructor(player: Client, authid: string);
}
/**
 * Old form of "disconnected" that misses some cases: use "disconnected".
 *
 * Pawn: `client_disconnect(id)`
 */
export declare class ClientDisconnectEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * A player left the server: quit, timed out or was kicked.
 *
 * Note: The player can still be read here (name, team), but nothing reaches his screen any more.
 *
 * Pawn: `client_disconnected(id, bool:drop, message, maxlen)`
 *
 * @example
 * server.addEventListener("disconnected", (event) => {
 * 	console.log(`${event.player.name} left: ${event.reason}`);
 * });
 */
export declare class ClientDisconnectedEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * `true` when the server dropped the player (kick, timeout) rather than he left.
     *
     * Pawn: `bool:drop`
     */
    dropped: boolean;
    /**
     * The reason the server gives for the leave; empty when the player just quit.
     *
     * Pawn: `message`
     */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * A player's slot is being freed, after "disconnected".
 *
 * Note: This fires after the client_disconnected() forward, when the player entity has been removed (e.g. is_user_connected(id) will return false).
 *
 * Pawn: `client_remove(id, bool:drop, message)`
 */
export declare class ClientRemoveEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * `true` when the server dropped the player.
     *
     * Pawn: `bool:drop`
     */
    dropped: boolean;
    /**
     * The reason the player left.
     *
     * Pawn: `message`
     */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * A player sent a console command. For one command, `server.addCommand("name", handler)` is simpler.
 *
 * Note: The command and its arguments can be read using the read_arg* set of functions.
 *
 * Pawn: `client_command(id)`
 */
export declare class ClientCommandEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * A player has joined and is in the game: the moment to greet him.
 *
 * Note: It is not defined whether the client already has a SteamID when this forward is called. client_authorized may occur either before or after this.
 *
 * Pawn: `client_putinserver(id)`
 *
 * @example
 * server.addEventListener("putinserver", (event) => {
 * 	print(event.player, "Welcome!");
 * });
 */
export declare class ClientPutinserverEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Client;
    constructor(player: Client);
}
/**
 * Called when an inconsistent file is encountered by the engine.
 *
 * Pawn: `inconsistent_file(id, filename, reason)`
 */
export declare class InconsistentFileEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * Detected file
     *
     * Pawn: `filename`
     */
    filename: string;
    /**
     * Buffer storing the disconnect reason (can be overwritten)
     *
     * Pawn: `reason`
     */
    reason: string;
    constructor(player: Player, filename: string, reason: string);
}
/**
 * Allows plugins to declare module dependencies using require_module()
 *
 * Pawn: `plugin_modules()`
 */
export declare class PluginModulesEvent {
}
/**
 * Called when the map has loaded, and all configs are done executing. This includes servercfgfile (server.cfg), amxx.cfg, plugin's config, and per-map config.
 *
 * Note: This is best place to initialize plugin functions which are based on cvar data.
 * Note: This will always be called once and only once per map. It will be called few seconds after plugin_cfg().
 *
 * Pawn: `OnConfigsExecuted()`
 */
export declare class OnConfigsExecutedEvent {
}
/**
 * Called when the map has loaded, right after plugin_cfg() but any time before OnConfigsExecuted. It's called after amxx.cfg and all AutoExecConfig() exec commands have been added to the server command buffer.
 *
 * Note: This will always be called once and only once per map.
 *
 * Pawn: `OnAutoConfigsBuffered()`
 */
export declare class OnAutoConfigsBufferedEvent {
}
/**
 * Called when CS internally fires a command to a player.
 *
 * Note: This is most notably used by the rebuy/autobuy functionality, Condition Zero also uses this to pass commands to bots internally.
 *
 * Pawn: `CS_InternalCommand(id, cmd)`
 */
export declare class CS_InternalCommandEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * Command string
     *
     * Pawn: `cmd`
     */
    cmd: string;
    constructor(player: Player, cmd: string);
}
/**
 * Called when a client attempts to purchase an item.
 *
 * Note: This is called immediately when the client issues a buy command. The game has not yet checked if the client can actually buy the weapon.
 * Note: For a list of possible item ids see the CSI_* constants.
 *
 * Pawn: `CS_OnBuyAttempt(index, item)`
 */
export declare class CS_OnBuyAttemptEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `index`
     */
    player: Player;
    /**
     * Item id
     *
     * Pawn: `item`
     */
    item: number;
    constructor(player: Player, item: number);
}
/**
 * Called when a client purchases an item.
 *
 * Note: This is called right before the user receives the item and before the money is deducted from their cash reserves.
 * Note: For a list of possible item ids see the CSI_* constants.
 *
 * Pawn: `CS_OnBuy(index, item)`
 */
export declare class CS_OnBuyEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `index`
     */
    player: Player;
    /**
     * Item id
     *
     * Pawn: `item`
     */
    item: number;
    constructor(player: Player, item: number);
}
/**
 * Two entities touched.
 *
 * Pawn: `pfn_touch(ptr, ptd)`
 */
export declare class PfnTouchEvent {
    /**
     * The entity that moved into the other.
     *
     * Pawn: `ptr`
     */
    toucher: number;
    /**
     * The entity that was touched.
     *
     * Pawn: `ptd`
     */
    touched: number;
    constructor(toucher: number, touched: number);
}
/**
 * A server frame, hundreds of times a second. Keep the listener tiny, or use setInterval.
 *
 * Note: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `server_frame()`
 */
export declare class ServerFrameEvent {
}
/**
 * A player typed "kill" in the console to kill himself.
 *
 * Pawn: `client_kill(id)`
 */
export declare class ClientKillEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Called at the start of each client think.
 *
 * Note: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `client_PreThink(id)`
 */
export declare class Client_PreThinkEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Called after each client think.
 *
 * Note: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `client_PostThink(id)`
 */
export declare class Client_PostThinkEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * A player sent an impulse: 100 is the flashlight, 201 the spray.
 *
 * Pawn: `client_impulse(id, impulse)`
 */
export declare class ClientImpulseEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * The impulse number: 100, 201.
     *
     * Pawn: `impulse`
     */
    impulse: number;
    constructor(player: Player, impulse: number);
}
/**
 * Called for CmdStart() on a client.
 *
 * Note: Use [get|set]_usercmd() to read and modify information in the usercmd struct.
 *
 * Pawn: `client_cmdStart(id)`
 */
export declare class ClientCmdStartEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * An entity thinks: its scheduled update has come.
 *
 * Pawn: `pfn_think(entid)`
 */
export declare class PfnThinkEvent {
    /**
     * The entity that thinks.
     *
     * Pawn: `entid`
     */
    entity: number;
    constructor(entity: number);
}
/**
 * Called when an event is played.
 *
 * Pawn: `pfn_playbackevent(flags, entid, eventid, Float:delay)`
 */
export declare class PfnPlaybackeventEvent {
    /**
     * Event flags
     *
     * Pawn: `flags`
     */
    flags: number;
    /**
     * Index of entity to invoke event on
     *
     * Pawn: `entid`
     */
    entity: number;
    /**
     * Index of event in the precache table
     *
     * Pawn: `eventid`
     */
    eventid: number;
    /**
     * Time until the event is played
     *
     * Pawn: `Float:delay`
     */
    delay: number;
    constructor(flags: number, entity: number, eventid: number, delay: number);
}
/**
 * Called when a keyvalue pair is sent to an entity.
 *
 * Note: Use copy_keyvalue() to retrieve the keyvalue information, and DispatchKeyVaue() to modify it.
 *
 * Pawn: `pfn_keyvalue(entid)`
 */
export declare class PfnKeyvalueEvent {
    /**
     * Entity index
     *
     * Pawn: `entid`
     */
    entity: number;
    constructor(entity: number);
}
/**
 * An entity is being spawned on the map.
 *
 * Pawn: `pfn_spawn(entid)`
 */
export declare class PfnSpawnEvent {
    /**
     * The entity being spawned.
     *
     * Pawn: `entid`
     */
    entity: number;
    constructor(entity: number);
}
/** Every event a server raises, by name: the short one and the Pawn one. */
export interface ServerEventMap {
    /**
     * The plugin has loaded: register commands, events and hooks here.
     *
     * Pawn: `plugin_init`
     */
    init: PluginInitEvent;
    /**
     * The plugin has loaded: register commands, events and hooks here.
     *
     * Pawn: `plugin_init`
     */
    plugin_init: PluginInitEvent;
    /**
     * An admin paused this plugin.
     *
     * Pawn: `plugin_pause`
     */
    pause: PluginPauseEvent;
    /**
     * An admin paused this plugin.
     *
     * Pawn: `plugin_pause`
     */
    plugin_pause: PluginPauseEvent;
    /**
     * An admin resumed this plugin.
     *
     * Pawn: `plugin_unpause`
     */
    unpause: PluginUnpauseEvent;
    /**
     * An admin resumed this plugin.
     *
     * Pawn: `plugin_unpause`
     */
    plugin_unpause: PluginUnpauseEvent;
    /**
     * The server is about to change the map.
     *
     * Pawn: `server_changelevel`
     */
    changelevel: ServerChangelevelEvent;
    /**
     * The server is about to change the map.
     *
     * Pawn: `server_changelevel`
     */
    server_changelevel: ServerChangelevelEvent;
    /**
     * Every config has been read and every plugin is loaded: the moment to read cvars and to create forwards other plugins listen to.
     *
     * Pawn: `plugin_cfg`
     */
    cfg: PluginCfgEvent;
    /**
     * Every config has been read and every plugin is loaded: the moment to read cvars and to create forwards other plugins listen to.
     *
     * Pawn: `plugin_cfg`
     */
    plugin_cfg: PluginCfgEvent;
    /**
     * The map is ending or the server is shutting down: save what has to survive.
     *
     * Pawn: `plugin_end`
     */
    end: PluginEndEvent;
    /**
     * The map is ending or the server is shutting down: save what has to survive.
     *
     * Pawn: `plugin_end`
     */
    plugin_end: PluginEndEvent;
    /**
     * Called when a message is about to be logged.
     *
     * Pawn: `plugin_log`
     */
    log: PluginLogEvent;
    /**
     * Called when a message is about to be logged.
     *
     * Pawn: `plugin_log`
     */
    plugin_log: PluginLogEvent;
    /**
     * The map is loading: the only moment models, sounds and sprites can be precached.
     *
     * Pawn: `plugin_precache`
     */
    precache: PluginPrecacheEvent;
    /**
     * The map is loading: the only moment models, sounds and sprites can be precached.
     *
     * Pawn: `plugin_precache`
     */
    plugin_precache: PluginPrecacheEvent;
    /**
     * A player changed his info, usually the name.
     *
     * Pawn: `client_infochanged`
     */
    infochanged: ClientInfochangedEvent;
    /**
     * A player changed his info, usually the name.
     *
     * Pawn: `client_infochanged`
     */
    client_infochanged: ClientInfochangedEvent;
    /**
     * A player started connecting. The player is not in the game yet: show him anything after "putinserver".
     *
     * Pawn: `client_connect`
     */
    connect: ClientConnectEvent;
    /**
     * A player started connecting. The player is not in the game yet: show him anything after "putinserver".
     *
     * Pawn: `client_connect`
     */
    client_connect: ClientConnectEvent;
    /**
     * A player started connecting, with a name and an address: the place to turn him away.
     *
     * Pawn: `client_connectex`
     */
    connectex: ClientConnectexEvent;
    /**
     * A player started connecting, with a name and an address: the place to turn him away.
     *
     * Pawn: `client_connectex`
     */
    client_connectex: ClientConnectexEvent;
    /**
     * A player's SteamID is known. May come before or after "putinserver".
     *
     * Pawn: `client_authorized`
     */
    authorized: ClientAuthorizedEvent;
    /**
     * A player's SteamID is known. May come before or after "putinserver".
     *
     * Pawn: `client_authorized`
     */
    client_authorized: ClientAuthorizedEvent;
    /**
     * Old form of "disconnected" that misses some cases: use "disconnected".
     *
     * Pawn: `client_disconnect`
     */
    disconnect: ClientDisconnectEvent;
    /**
     * Old form of "disconnected" that misses some cases: use "disconnected".
     *
     * Pawn: `client_disconnect`
     */
    client_disconnect: ClientDisconnectEvent;
    /**
     * A player left the server: quit, timed out or was kicked.
     *
     * Pawn: `client_disconnected`
     */
    disconnected: ClientDisconnectedEvent;
    /**
     * A player left the server: quit, timed out or was kicked.
     *
     * Pawn: `client_disconnected`
     */
    client_disconnected: ClientDisconnectedEvent;
    /**
     * A player's slot is being freed, after "disconnected".
     *
     * Pawn: `client_remove`
     */
    remove: ClientRemoveEvent;
    /**
     * A player's slot is being freed, after "disconnected".
     *
     * Pawn: `client_remove`
     */
    client_remove: ClientRemoveEvent;
    /**
     * A player sent a console command. For one command, `server.addCommand("name", handler)` is simpler.
     *
     * Pawn: `client_command`
     */
    command: ClientCommandEvent;
    /**
     * A player sent a console command. For one command, `server.addCommand("name", handler)` is simpler.
     *
     * Pawn: `client_command`
     */
    client_command: ClientCommandEvent;
    /**
     * A player has joined and is in the game: the moment to greet him.
     *
     * Pawn: `client_putinserver`
     */
    putinserver: ClientPutinserverEvent;
    /**
     * A player has joined and is in the game: the moment to greet him.
     *
     * Pawn: `client_putinserver`
     */
    client_putinserver: ClientPutinserverEvent;
    /**
     * Called when an inconsistent file is encountered by the engine.
     *
     * Pawn: `inconsistent_file`
     */
    inconsistentFile: InconsistentFileEvent;
    /**
     * Called when an inconsistent file is encountered by the engine.
     *
     * Pawn: `inconsistent_file`
     */
    inconsistent_file: InconsistentFileEvent;
    /**
     * Allows plugins to declare module dependencies using require_module()
     *
     * Pawn: `plugin_modules`
     */
    modules: PluginModulesEvent;
    /**
     * Allows plugins to declare module dependencies using require_module()
     *
     * Pawn: `plugin_modules`
     */
    plugin_modules: PluginModulesEvent;
    /**
     * Called when the map has loaded, and all configs are done executing. This includes servercfgfile (server.cfg), amxx.cfg, plugin's config, and per-map config.
     *
     * Pawn: `OnConfigsExecuted`
     */
    OnConfigsExecuted: OnConfigsExecutedEvent;
    /**
     * Called when the map has loaded, right after plugin_cfg() but any time before OnConfigsExecuted. It's called after amxx.cfg and all AutoExecConfig() exec commands have been added to the server command buffer.
     *
     * Pawn: `OnAutoConfigsBuffered`
     */
    OnAutoConfigsBuffered: OnAutoConfigsBufferedEvent;
    /**
     * Called when CS internally fires a command to a player.
     *
     * Pawn: `CS_InternalCommand`
     */
    CS_InternalCommand: CS_InternalCommandEvent;
    /**
     * Called when a client attempts to purchase an item.
     *
     * Pawn: `CS_OnBuyAttempt`
     */
    CS_OnBuyAttempt: CS_OnBuyAttemptEvent;
    /**
     * Called when a client purchases an item.
     *
     * Pawn: `CS_OnBuy`
     */
    CS_OnBuy: CS_OnBuyEvent;
    /**
     * Two entities touched.
     *
     * Pawn: `pfn_touch`
     */
    pfnTouch: PfnTouchEvent;
    /**
     * Two entities touched.
     *
     * Pawn: `pfn_touch`
     */
    pfn_touch: PfnTouchEvent;
    /**
     * A server frame, hundreds of times a second. Keep the listener tiny, or use setInterval.
     *
     * Pawn: `server_frame`
     */
    frame: ServerFrameEvent;
    /**
     * A server frame, hundreds of times a second. Keep the listener tiny, or use setInterval.
     *
     * Pawn: `server_frame`
     */
    server_frame: ServerFrameEvent;
    /**
     * A player typed "kill" in the console to kill himself.
     *
     * Pawn: `client_kill`
     */
    kill: ClientKillEvent;
    /**
     * A player typed "kill" in the console to kill himself.
     *
     * Pawn: `client_kill`
     */
    client_kill: ClientKillEvent;
    /**
     * Called at the start of each client think.
     *
     * Pawn: `client_PreThink`
     */
    PreThink: Client_PreThinkEvent;
    /**
     * Called at the start of each client think.
     *
     * Pawn: `client_PreThink`
     */
    client_PreThink: Client_PreThinkEvent;
    /**
     * Called after each client think.
     *
     * Pawn: `client_PostThink`
     */
    PostThink: Client_PostThinkEvent;
    /**
     * Called after each client think.
     *
     * Pawn: `client_PostThink`
     */
    client_PostThink: Client_PostThinkEvent;
    /**
     * A player sent an impulse: 100 is the flashlight, 201 the spray.
     *
     * Pawn: `client_impulse`
     */
    impulse: ClientImpulseEvent;
    /**
     * A player sent an impulse: 100 is the flashlight, 201 the spray.
     *
     * Pawn: `client_impulse`
     */
    client_impulse: ClientImpulseEvent;
    /**
     * Called for CmdStart() on a client.
     *
     * Pawn: `client_cmdStart`
     */
    cmdStart: ClientCmdStartEvent;
    /**
     * Called for CmdStart() on a client.
     *
     * Pawn: `client_cmdStart`
     */
    client_cmdStart: ClientCmdStartEvent;
    /**
     * An entity thinks: its scheduled update has come.
     *
     * Pawn: `pfn_think`
     */
    pfnThink: PfnThinkEvent;
    /**
     * An entity thinks: its scheduled update has come.
     *
     * Pawn: `pfn_think`
     */
    pfn_think: PfnThinkEvent;
    /**
     * Called when an event is played.
     *
     * Pawn: `pfn_playbackevent`
     */
    pfnPlaybackevent: PfnPlaybackeventEvent;
    /**
     * Called when an event is played.
     *
     * Pawn: `pfn_playbackevent`
     */
    pfn_playbackevent: PfnPlaybackeventEvent;
    /**
     * Called when a keyvalue pair is sent to an entity.
     *
     * Pawn: `pfn_keyvalue`
     */
    pfnKeyvalue: PfnKeyvalueEvent;
    /**
     * Called when a keyvalue pair is sent to an entity.
     *
     * Pawn: `pfn_keyvalue`
     */
    pfn_keyvalue: PfnKeyvalueEvent;
    /**
     * An entity is being spawned on the map.
     *
     * Pawn: `pfn_spawn`
     */
    pfnSpawn: PfnSpawnEvent;
    /**
     * An entity is being spawned on the map.
     *
     * Pawn: `pfn_spawn`
     */
    pfn_spawn: PfnSpawnEvent;
}
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
