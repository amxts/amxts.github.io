/// <reference path="../as-types.d.ts" />
import { Client, Player } from "./facade";
/**
 * Плагин загрузился: здесь регистрируют команды, события и хуки.
 *
 * Важно: Код на верхнем уровне файла плагина выполняется в тот же момент, поэтому большинству плагинов это событие не нужно.
 *
 * AMX Mod X: `plugin_init()`
 */
export declare class PluginInitEvent {
}
/**
 * Админ поставил плагин на паузу.
 *
 * AMX Mod X: `plugin_pause()`
 */
export declare class PluginPauseEvent {
}
/**
 * Админ снял плагин с паузы.
 *
 * AMX Mod X: `plugin_unpause()`
 */
export declare class PluginUnpauseEvent {
}
/**
 * Сервер сейчас сменит карту.
 *
 * Важно: This is *only* called if the mod itself handles the map change. The server command "changelevel", which is used by many plugins, will not trigger this forward. Unfortunately, this means that in practice this forward can be unreliable and will not be called in many situations.
 * Важно: AMXX 1.8.3 has added the engine_changelevel() function, which will utilize the correct engine function to change the map, and therefore trigger this forward.
 *
 * AMX Mod X: `server_changelevel(map)`
 */
export declare class ServerChangelevelEvent {
    /** Карта, на которую он переходит. */
    map: string;
    constructor(map: string);
}
/**
 * Все конфиги прочитаны и все плагины загружены - момент читать квары и создавать форварды для других плагинов.
 *
 * Важно: When this forward is called, most plugins should have registered their cvars and commands already.
 *
 * AMX Mod X: `plugin_cfg()`
 */
export declare class PluginCfgEvent {
}
/**
 * Карта заканчивается или сервер выключается: сохраните то, что должно пережить смену карты.
 *
 * Важно: The plugin is required to manually free Handles it has acquired, such as those from dynamic data structures. Failing to do that will result in the plugin and AMXX leaking memory.
 *
 * AMX Mod X: `plugin_end()`
 */
export declare class PluginEndEvent {
}
/**
 * Called when a message is about to be logged.
 *
 * Важно: Message data and information can be retrieved using the read_log* set of functions.
 *
 * AMX Mod X: `plugin_log()`
 */
export declare class PluginLogEvent {
}
/**
 * Карта загружается: единственный момент, когда можно подгрузить модели, звуки и спрайты (precache).
 *
 * Важно: При горячей перезагрузке плагина не повторяется: для precache нужна смена карты.
 *
 * AMX Mod X: `plugin_precache()`
 */
export declare class PluginPrecacheEvent {
}
/**
 * Игрок поменял свои данные - обычно ник.
 *
 * AMX Mod X: `client_infochanged(id)`
 */
export declare class ClientInfochangedEvent {
    /** Игрок, о котором событие. */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок начал подключаться. Он ещё не в игре - показывать ему что-то можно после "putinserver".
 *
 * Важно: This forward is called too early to do anything that directly affects the client.
 *
 * AMX Mod X: `client_connect(id)`
 */
export declare class ClientConnectEvent {
    /** Игрок, о котором событие. */
    player: Client;
    constructor(player: Client);
}
/**
 * Игрок начал подключаться, с именем и адресом - здесь его можно не пустить.
 *
 * Важно: This forward is called too early to do anything that directly affects the client.
 *
 * AMX Mod X: `client_connectex(id, name, ip, reason)`
 */
export declare class ClientConnectexEvent {
    /** Игрок, о котором событие. */
    player: Client;
    /** Имя, с которым он заходит. */
    name: string;
    /** Его адрес вместе с портом. */
    ip: string;
    /** Что ему покажут, если его не пустят. */
    reason: string;
    constructor(player: Client, name: string, ip: string, reason: string);
}
/**
 * Стал известен SteamID игрока. Может прийти до или после "putinserver".
 *
 * Важно: У бота SteamID - "BOT".
 *
 * AMX Mod X: `client_authorized(id, authid)`
 */
export declare class ClientAuthorizedEvent {
    /** Игрок, о котором событие. */
    player: Client;
    /** Его SteamID. */
    authid: string;
    constructor(player: Client, authid: string);
}
/**
 * Старая форма "disconnected", пропускающая часть случаев - используйте "disconnected".
 *
 * AMX Mod X: `client_disconnect(id)`
 */
export declare class ClientDisconnectEvent {
    /** Игрок, о котором событие. */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок покинул сервер - вышел сам, отвалился или был кикнут.
 *
 * Важно: Его ещё можно прочитать (имя, команду), но на его экран уже ничего не дойдёт.
 *
 * @example
 * server.addEventListener("disconnected", (event) => {
 * 	console.log(`${event.player.name} left: ${event.reason}`);
 * });
 *
 * AMX Mod X: `client_disconnected(id, bool:drop, message, maxlen)`
 */
export declare class ClientDisconnectedEvent {
    /** Игрок, о котором событие. */
    player: Player;
    /** true, если его отключил сервер (кик, таймаут), а не он вышел сам. */
    dropped: boolean;
    /** Причина выхода, как её сообщает сервер; пусто, если он просто вышел. */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * Слот игрока освобождается, после "disconnected".
 *
 * Важно: This fires after the client_disconnected() forward, when the player entity has been removed (e.g. is_user_connected(id) will return false).
 *
 * AMX Mod X: `client_remove(id, bool:drop, message)`
 */
export declare class ClientRemoveEvent {
    /** Игрок, о котором событие. */
    player: Player;
    /** true, если его отключил сервер. */
    dropped: boolean;
    /** Причина выхода. */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * Игрок отправил консольную команду. Для одной команды проще `cmd("name", handler)`.
 *
 * Важно: The command and its arguments can be read using the read_arg* set of functions.
 *
 * AMX Mod X: `client_command(id)`
 */
export declare class ClientCommandEvent {
    /** Игрок, о котором событие. */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок зашёл и уже в игре - момент поприветствовать его.
 *
 * Важно: It is not defined whether the client already has a SteamID when this forward is called. client_authorized may occur either before or after this.
 *
 * @example
 * server.addEventListener("putinserver", (event) => {
 * 	print(event.player, "Welcome!");
 * });
 *
 * AMX Mod X: `client_putinserver(id)`
 */
export declare class ClientPutinserverEvent {
    /** Игрок, о котором событие. */
    player: Client;
    constructor(player: Client);
}
/**
 * Called when an inconsistent file is encountered by the engine.
 *
 * AMX Mod X: `inconsistent_file(id, filename, reason)`
 */
export declare class InconsistentFileEvent {
    /** Игрок, о котором событие. */
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
 * Важно: This is best place to initialize plugin functions which are based on cvar data.
 * Важно: This will always be called once and only once per map. It will be called few seconds after plugin_cfg().
 *
 * AMX Mod X: `OnConfigsExecuted()`
 */
export declare class OnConfigsExecutedEvent {
}
/**
 * Called when the map has loaded, right after plugin_cfg() but any time before OnConfigsExecuted. It's called after amxx.cfg and all AutoExecConfig() exec commands have been added to the server command buffer.
 *
 * Важно: This will always be called once and only once per map.
 *
 * AMX Mod X: `OnAutoConfigsBuffered()`
 */
export declare class OnAutoConfigsBufferedEvent {
}
/**
 * Called when CS internally fires a command to a player.
 *
 * Важно: This is most notably used by the rebuy/autobuy functionality, Condition Zero also uses this to pass commands to bots internally.
 *
 * AMX Mod X: `CS_InternalCommand(id, cmd)`
 */
export declare class CS_InternalCommandEvent {
    /** Игрок, о котором событие. */
    player: Player;
    /** Command string */
    cmd: string;
    constructor(player: Player, cmd: string);
}
/**
 * Called when a client attempts to purchase an item.
 *
 * Важно: This is called immediately when the client issues a buy command. The game has not yet checked if the client can actually buy the weapon.
 * Важно: For a list of possible item ids see the CSI_* constants.
 *
 * AMX Mod X: `CS_OnBuyAttempt(index, item)`
 */
export declare class CS_OnBuyAttemptEvent {
    /** Игрок, о котором событие. */
    player: Player;
    /** Item id */
    item: number;
    constructor(player: Player, item: number);
}
/**
 * Called when a client purchases an item.
 *
 * Важно: This is called right before the user receives the item and before the money is deducted from their cash reserves.
 * Важно: For a list of possible item ids see the CSI_* constants.
 *
 * AMX Mod X: `CS_OnBuy(index, item)`
 */
export declare class CS_OnBuyEvent {
    /** Игрок, о котором событие. */
    player: Player;
    /** Item id */
    item: number;
    constructor(player: Player, item: number);
}
/**
 * Две сущности коснулись друг друга.
 *
 * AMX Mod X: `pfn_touch(ptr, ptd)`
 */
export declare class PfnTouchEvent {
    /** Сущность, которая налетела на другую. */
    toucher: number;
    /** Сущность, которой коснулись. */
    touched: number;
    constructor(toucher: number, touched: number);
}
/**
 * Каждый кадр сервера - сотни раз в секунду. Обработчик должен быть очень лёгким, или используйте setInterval.
 *
 * Важно: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * AMX Mod X: `server_frame()`
 */
export declare class ServerFrameEvent {
}
/**
 * Игрок написал "kill" в консоли, чтобы убить себя.
 *
 * AMX Mod X: `client_kill(id)`
 */
export declare class ClientKillEvent {
    /** Игрок, о котором событие. */
    player: Player;
    constructor(player: Player);
}
/**
 * Called at the start of each client think.
 *
 * Важно: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * AMX Mod X: `client_PreThink(id)`
 */
export declare class Client_PreThinkEvent {
    /** Игрок, о котором событие. */
    player: Player;
    constructor(player: Player);
}
/**
 * Called after each client think.
 *
 * Важно: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * AMX Mod X: `client_PostThink(id)`
 */
export declare class Client_PostThinkEvent {
    /** Игрок, о котором событие. */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок отправил impulse: 100 - фонарик, 201 - спрей.
 *
 * AMX Mod X: `client_impulse(id, impulse)`
 */
export declare class ClientImpulseEvent {
    /** Игрок, о котором событие. */
    player: Player;
    /** Номер impulse. */
    impulse: number;
    constructor(player: Player, impulse: number);
}
/**
 * Called for CmdStart() on a client.
 *
 * Важно: Use [get|set]_usercmd() to read and modify information in the usercmd struct.
 *
 * AMX Mod X: `client_cmdStart(id)`
 */
export declare class ClientCmdStartEvent {
    /** Игрок, о котором событие. */
    player: Player;
    constructor(player: Player);
}
/**
 * Сущность «думает» - её запланированное обновление.
 *
 * AMX Mod X: `pfn_think(entid)`
 */
export declare class PfnThinkEvent {
    /** Сущность. */
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
 * Важно: Use copy_keyvalue() to retrieve the keyvalue information, and DispatchKeyVaue() to modify it.
 *
 * AMX Mod X: `pfn_keyvalue(entid)`
 */
export declare class PfnKeyvalueEvent {
    /** Entity index */
    entity: number;
    constructor(entity: number);
}
/**
 * На карте появляется сущность.
 *
 * AMX Mod X: `pfn_spawn(entid)`
 */
export declare class PfnSpawnEvent {
    /** Сущность. */
    entity: number;
    constructor(entity: number);
}
/** Every event a server raises, by name: the short one and the Pawn one. */
export interface ServerEventMap {
    /** Плагин загрузился: здесь регистрируют команды, события и хуки. */
    init: PluginInitEvent;
    /** Плагин загрузился: здесь регистрируют команды, события и хуки. */
    plugin_init: PluginInitEvent;
    /** Админ поставил плагин на паузу. */
    pause: PluginPauseEvent;
    /** Админ поставил плагин на паузу. */
    plugin_pause: PluginPauseEvent;
    /** Админ снял плагин с паузы. */
    unpause: PluginUnpauseEvent;
    /** Админ снял плагин с паузы. */
    plugin_unpause: PluginUnpauseEvent;
    /** Сервер сейчас сменит карту. */
    changelevel: ServerChangelevelEvent;
    /** Сервер сейчас сменит карту. */
    server_changelevel: ServerChangelevelEvent;
    /** Все конфиги прочитаны и все плагины загружены - момент читать квары и создавать форварды для других плагинов. */
    cfg: PluginCfgEvent;
    /** Все конфиги прочитаны и все плагины загружены - момент читать квары и создавать форварды для других плагинов. */
    plugin_cfg: PluginCfgEvent;
    /** Карта заканчивается или сервер выключается: сохраните то, что должно пережить смену карты. */
    end: PluginEndEvent;
    /** Карта заканчивается или сервер выключается: сохраните то, что должно пережить смену карты. */
    plugin_end: PluginEndEvent;
    /** Called when a message is about to be logged. */
    log: PluginLogEvent;
    /** Called when a message is about to be logged. */
    plugin_log: PluginLogEvent;
    /** Карта загружается: единственный момент, когда можно подгрузить модели, звуки и спрайты (precache). */
    precache: PluginPrecacheEvent;
    /** Карта загружается: единственный момент, когда можно подгрузить модели, звуки и спрайты (precache). */
    plugin_precache: PluginPrecacheEvent;
    /** Игрок поменял свои данные - обычно ник. */
    infochanged: ClientInfochangedEvent;
    /** Игрок поменял свои данные - обычно ник. */
    client_infochanged: ClientInfochangedEvent;
    /** Игрок начал подключаться. Он ещё не в игре - показывать ему что-то можно после "putinserver". */
    connect: ClientConnectEvent;
    /** Игрок начал подключаться. Он ещё не в игре - показывать ему что-то можно после "putinserver". */
    client_connect: ClientConnectEvent;
    /** Игрок начал подключаться, с именем и адресом - здесь его можно не пустить. */
    connectex: ClientConnectexEvent;
    /** Игрок начал подключаться, с именем и адресом - здесь его можно не пустить. */
    client_connectex: ClientConnectexEvent;
    /** Стал известен SteamID игрока. Может прийти до или после "putinserver". */
    authorized: ClientAuthorizedEvent;
    /** Стал известен SteamID игрока. Может прийти до или после "putinserver". */
    client_authorized: ClientAuthorizedEvent;
    /** Старая форма "disconnected", пропускающая часть случаев - используйте "disconnected". */
    disconnect: ClientDisconnectEvent;
    /** Старая форма "disconnected", пропускающая часть случаев - используйте "disconnected". */
    client_disconnect: ClientDisconnectEvent;
    /** Игрок покинул сервер - вышел сам, отвалился или был кикнут. */
    disconnected: ClientDisconnectedEvent;
    /** Игрок покинул сервер - вышел сам, отвалился или был кикнут. */
    client_disconnected: ClientDisconnectedEvent;
    /** Слот игрока освобождается, после "disconnected". */
    remove: ClientRemoveEvent;
    /** Слот игрока освобождается, после "disconnected". */
    client_remove: ClientRemoveEvent;
    /** Игрок отправил консольную команду. Для одной команды проще `cmd("name", handler)`. */
    command: ClientCommandEvent;
    /** Игрок отправил консольную команду. Для одной команды проще `cmd("name", handler)`. */
    client_command: ClientCommandEvent;
    /** Игрок зашёл и уже в игре - момент поприветствовать его. */
    putinserver: ClientPutinserverEvent;
    /** Игрок зашёл и уже в игре - момент поприветствовать его. */
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
    /** Две сущности коснулись друг друга. */
    pfnTouch: PfnTouchEvent;
    /** Две сущности коснулись друг друга. */
    pfn_touch: PfnTouchEvent;
    /** Каждый кадр сервера - сотни раз в секунду. Обработчик должен быть очень лёгким, или используйте setInterval. */
    frame: ServerFrameEvent;
    /** Каждый кадр сервера - сотни раз в секунду. Обработчик должен быть очень лёгким, или используйте setInterval. */
    server_frame: ServerFrameEvent;
    /** Игрок написал "kill" в консоли, чтобы убить себя. */
    kill: ClientKillEvent;
    /** Игрок написал "kill" в консоли, чтобы убить себя. */
    client_kill: ClientKillEvent;
    /** Called at the start of each client think. */
    PreThink: Client_PreThinkEvent;
    /** Called at the start of each client think. */
    client_PreThink: Client_PreThinkEvent;
    /** Called after each client think. */
    PostThink: Client_PostThinkEvent;
    /** Called after each client think. */
    client_PostThink: Client_PostThinkEvent;
    /** Игрок отправил impulse: 100 - фонарик, 201 - спрей. */
    impulse: ClientImpulseEvent;
    /** Игрок отправил impulse: 100 - фонарик, 201 - спрей. */
    client_impulse: ClientImpulseEvent;
    /** Called for CmdStart() on a client. */
    cmdStart: ClientCmdStartEvent;
    /** Called for CmdStart() on a client. */
    client_cmdStart: ClientCmdStartEvent;
    /** Сущность «думает» - её запланированное обновление. */
    pfnThink: PfnThinkEvent;
    /** Сущность «думает» - её запланированное обновление. */
    pfn_think: PfnThinkEvent;
    /** Called when an event is played. */
    pfnPlaybackevent: PfnPlaybackeventEvent;
    /** Called when an event is played. */
    pfn_playbackevent: PfnPlaybackeventEvent;
    /** Called when a keyvalue pair is sent to an entity. */
    pfnKeyvalue: PfnKeyvalueEvent;
    /** Called when a keyvalue pair is sent to an entity. */
    pfn_keyvalue: PfnKeyvalueEvent;
    /** На карте появляется сущность. */
    pfnSpawn: PfnSpawnEvent;
    /** На карте появляется сущность. */
    pfn_spawn: PfnSpawnEvent;
}
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
