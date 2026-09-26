/// <reference path="../as-types.d.ts" />
import { Client, Player } from "./facade";
/**
 * Плагин загрузился: здесь регистрируют команды, события и хуки.
 *
 * Важно: Код на верхнем уровне файла плагина выполняется в тот же момент, поэтому большинству плагинов это событие не нужно.
 *
 * Pawn: `plugin_init()`
 */
export declare class PluginInitEvent {
}
/**
 * Админ поставил плагин на паузу.
 *
 * Pawn: `plugin_pause()`
 */
export declare class PluginPauseEvent {
}
/**
 * Админ снял плагин с паузы.
 *
 * Pawn: `plugin_unpause()`
 */
export declare class PluginUnpauseEvent {
}
/**
 * Сервер сейчас сменит карту.
 *
 * Важно: This is *only* called if the mod itself handles the map change. The server command "changelevel", which is used by many plugins, will not trigger this forward. Unfortunately, this means that in practice this forward can be unreliable and will not be called in many situations.
 * Важно: AMXX 1.8.3 has added the engine_changelevel() function, which will utilize the correct engine function to change the map, and therefore trigger this forward.
 *
 * Pawn: `server_changelevel(map)`
 */
export declare class ServerChangelevelEvent {
    /**
     * Карта, на которую переходит сервер, например "de_dust2".
     *
     * Pawn: `map`
     */
    map: string;
    constructor(map: string);
}
/**
 * Все конфиги прочитаны, все плагины загружены: момент читать квары и создавать форварды для других плагинов.
 *
 * Важно: When this forward is called, most plugins should have registered their cvars and commands already.
 *
 * Pawn: `plugin_cfg()`
 */
export declare class PluginCfgEvent {
}
/**
 * Карта заканчивается или сервер выключается: сохраните то, что должно пережить смену карты.
 *
 * Важно: The plugin is required to manually free Handles it has acquired, such as those from dynamic data structures. Failing to do that will result in the plugin and AMXX leaking memory.
 *
 * Pawn: `plugin_end()`
 */
export declare class PluginEndEvent {
}
/**
 * Called when a message is about to be logged.
 *
 * Важно: Message data and information can be retrieved using the read_log* set of functions.
 *
 * Pawn: `plugin_log()`
 */
export declare class PluginLogEvent {
}
/**
 * Карта загружается: единственный момент, когда можно подгрузить (precache) модели, звуки и спрайты.
 *
 * Важно: Горячая перезагрузка плагина его не повторяет: для precache нужна смена карты.
 *
 * Pawn: `plugin_precache()`
 */
export declare class PluginPrecacheEvent {
}
/**
 * Игрок поменял свои данные, обычно ник.
 *
 * Pawn: `client_infochanged(id)`
 */
export declare class ClientInfochangedEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после "putinserver".
 *
 * Важно: This forward is called too early to do anything that directly affects the client.
 *
 * Pawn: `client_connect(id)`
 */
export declare class ClientConnectEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Client;
    constructor(player: Client);
}
/**
 * Игрок начал подключаться, уже с именем и адресом: здесь его можно не пустить.
 *
 * Важно: This forward is called too early to do anything that directly affects the client.
 *
 * Pawn: `client_connectex(id, name, ip, reason)`
 */
export declare class ClientConnectexEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Client;
    /**
     * Имя, с которым игрок заходит.
     *
     * Pawn: `name`
     */
    name: string;
    /**
     * Адрес игрока с портом, например "192.168.0.5:27005".
     *
     * Pawn: `ip`
     */
    ip: string;
    /**
     * Сообщение, которое игрок увидит, если его не пустят.
     *
     * Pawn: `reason`
     */
    reason: string;
    constructor(player: Client, name: string, ip: string, reason: string);
}
/**
 * Стал известен SteamID игрока. Может прийти до или после "putinserver".
 *
 * Важно: SteamID бота — "BOT".
 *
 * Pawn: `client_authorized(id, authid)`
 */
export declare class ClientAuthorizedEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Client;
    /**
     * SteamID игрока, например "STEAM_0:1:12345". У бота — "BOT", у HLTV — "HLTV"; на LAN-сервере — "STEAM_ID_LAN".
     *
     * Pawn: `authid`
     */
    authid: string;
    constructor(player: Client, authid: string);
}
/**
 * Старая форма "disconnected", которая пропускает часть случаев: используйте "disconnected".
 *
 * Pawn: `client_disconnect(id)`
 */
export declare class ClientDisconnectEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок покинул сервер: вышел сам, отвалился или был кикнут.
 *
 * Важно: Игрока здесь ещё можно прочитать (имя, команду), но на экран ему уже ничего не дойдёт.
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
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * `true`, если игрока отключил сервер (кик, таймаут), а не он вышел сам.
     *
     * Pawn: `bool:drop`
     */
    dropped: boolean;
    /**
     * Причина выхода, как её сообщает сервер; пусто, если игрок просто вышел.
     *
     * Pawn: `message`
     */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * Слот игрока освобождается, после "disconnected".
 *
 * Важно: This fires after the client_disconnected() forward, when the player entity has been removed (e.g. is_user_connected(id) will return false).
 *
 * Pawn: `client_remove(id, bool:drop, message)`
 */
export declare class ClientRemoveEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * `true`, если игрока отключил сервер.
     *
     * Pawn: `bool:drop`
     */
    dropped: boolean;
    /**
     * Причина выхода игрока.
     *
     * Pawn: `message`
     */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * Игрок отправил консольную команду. Для одной команды проще `server.addCommand("name", handler)`.
 *
 * Важно: The command and its arguments can be read using the read_arg* set of functions.
 *
 * Pawn: `client_command(id)`
 */
export declare class ClientCommandEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок зашёл и уже в игре: момент поприветствовать его.
 *
 * Важно: It is not defined whether the client already has a SteamID when this forward is called. client_authorized may occur either before or after this.
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
     * Игрок, о котором событие.
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
     * Игрок, о котором событие.
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
 * Важно: This is best place to initialize plugin functions which are based on cvar data.
 * Важно: This will always be called once and only once per map. It will be called few seconds after plugin_cfg().
 *
 * Pawn: `OnConfigsExecuted()`
 */
export declare class OnConfigsExecutedEvent {
}
/**
 * Called when the map has loaded, right after plugin_cfg() but any time before OnConfigsExecuted. It's called after amxx.cfg and all AutoExecConfig() exec commands have been added to the server command buffer.
 *
 * Важно: This will always be called once and only once per map.
 *
 * Pawn: `OnAutoConfigsBuffered()`
 */
export declare class OnAutoConfigsBufferedEvent {
}
/**
 * Called when CS internally fires a command to a player.
 *
 * Важно: This is most notably used by the rebuy/autobuy functionality, Condition Zero also uses this to pass commands to bots internally.
 *
 * Pawn: `CS_InternalCommand(id, cmd)`
 */
export declare class CS_InternalCommandEvent {
    /**
     * Игрок, о котором событие.
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
 * Важно: This is called immediately when the client issues a buy command. The game has not yet checked if the client can actually buy the weapon.
 * Важно: For a list of possible item ids see the CSI_* constants.
 *
 * Pawn: `CS_OnBuyAttempt(index, item)`
 */
export declare class CS_OnBuyAttemptEvent {
    /**
     * Игрок, о котором событие.
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
 * Важно: This is called right before the user receives the item and before the money is deducted from their cash reserves.
 * Важно: For a list of possible item ids see the CSI_* constants.
 *
 * Pawn: `CS_OnBuy(index, item)`
 */
export declare class CS_OnBuyEvent {
    /**
     * Игрок, о котором событие.
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
 * Две сущности коснулись друг друга.
 *
 * Pawn: `pfn_touch(ptr, ptd)`
 */
export declare class PfnTouchEvent {
    /**
     * Сущность, которая налетела на другую.
     *
     * Pawn: `ptr`
     */
    toucher: number;
    /**
     * Сущность, которой коснулись.
     *
     * Pawn: `ptd`
     */
    touched: number;
    constructor(toucher: number, touched: number);
}
/**
 * Кадр сервера, сотни раз в секунду. Обработчик должен быть очень лёгким, иначе используйте setInterval.
 *
 * Важно: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `server_frame()`
 */
export declare class ServerFrameEvent {
}
/**
 * Игрок написал "kill" в консоли, чтобы убить себя.
 *
 * Pawn: `client_kill(id)`
 */
export declare class ClientKillEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Called at the start of each client think.
 *
 * Важно: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `client_PreThink(id)`
 */
export declare class Client_PreThinkEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Called after each client think.
 *
 * Важно: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `client_PostThink(id)`
 */
export declare class Client_PostThinkEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Игрок отправил impulse: 100 — фонарик, 201 — спрей.
 *
 * Pawn: `client_impulse(id, impulse)`
 */
export declare class ClientImpulseEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    /**
     * Номер impulse: 100, 201.
     *
     * Pawn: `impulse`
     */
    impulse: number;
    constructor(player: Player, impulse: number);
}
/**
 * Called for CmdStart() on a client.
 *
 * Важно: Use [get|set]_usercmd() to read and modify information in the usercmd struct.
 *
 * Pawn: `client_cmdStart(id)`
 */
export declare class ClientCmdStartEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Player;
    constructor(player: Player);
}
/**
 * Сущность «думает»: пришло её запланированное обновление.
 *
 * Pawn: `pfn_think(entid)`
 */
export declare class PfnThinkEvent {
    /**
     * Сущность, которая «думает».
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
 * Важно: Use copy_keyvalue() to retrieve the keyvalue information, and DispatchKeyVaue() to modify it.
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
 * На карте появляется сущность.
 *
 * Pawn: `pfn_spawn(entid)`
 */
export declare class PfnSpawnEvent {
    /**
     * Сущность, которая появляется.
     *
     * Pawn: `entid`
     */
    entity: number;
    constructor(entity: number);
}
/** Every event a server raises, by name: the short one and the Pawn one. */
export interface ServerEventMap {
    /**
     * Плагин загрузился: здесь регистрируют команды, события и хуки.
     *
     * Pawn: `plugin_init`
     */
    init: PluginInitEvent;
    /**
     * Плагин загрузился: здесь регистрируют команды, события и хуки.
     *
     * Pawn: `plugin_init`
     */
    plugin_init: PluginInitEvent;
    /**
     * Админ поставил плагин на паузу.
     *
     * Pawn: `plugin_pause`
     */
    pause: PluginPauseEvent;
    /**
     * Админ поставил плагин на паузу.
     *
     * Pawn: `plugin_pause`
     */
    plugin_pause: PluginPauseEvent;
    /**
     * Админ снял плагин с паузы.
     *
     * Pawn: `plugin_unpause`
     */
    unpause: PluginUnpauseEvent;
    /**
     * Админ снял плагин с паузы.
     *
     * Pawn: `plugin_unpause`
     */
    plugin_unpause: PluginUnpauseEvent;
    /**
     * Сервер сейчас сменит карту.
     *
     * Pawn: `server_changelevel`
     */
    changelevel: ServerChangelevelEvent;
    /**
     * Сервер сейчас сменит карту.
     *
     * Pawn: `server_changelevel`
     */
    server_changelevel: ServerChangelevelEvent;
    /**
     * Все конфиги прочитаны, все плагины загружены: момент читать квары и создавать форварды для других плагинов.
     *
     * Pawn: `plugin_cfg`
     */
    cfg: PluginCfgEvent;
    /**
     * Все конфиги прочитаны, все плагины загружены: момент читать квары и создавать форварды для других плагинов.
     *
     * Pawn: `plugin_cfg`
     */
    plugin_cfg: PluginCfgEvent;
    /**
     * Карта заканчивается или сервер выключается: сохраните то, что должно пережить смену карты.
     *
     * Pawn: `plugin_end`
     */
    end: PluginEndEvent;
    /**
     * Карта заканчивается или сервер выключается: сохраните то, что должно пережить смену карты.
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
     * Карта загружается: единственный момент, когда можно подгрузить (precache) модели, звуки и спрайты.
     *
     * Pawn: `plugin_precache`
     */
    precache: PluginPrecacheEvent;
    /**
     * Карта загружается: единственный момент, когда можно подгрузить (precache) модели, звуки и спрайты.
     *
     * Pawn: `plugin_precache`
     */
    plugin_precache: PluginPrecacheEvent;
    /**
     * Игрок поменял свои данные, обычно ник.
     *
     * Pawn: `client_infochanged`
     */
    infochanged: ClientInfochangedEvent;
    /**
     * Игрок поменял свои данные, обычно ник.
     *
     * Pawn: `client_infochanged`
     */
    client_infochanged: ClientInfochangedEvent;
    /**
     * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после "putinserver".
     *
     * Pawn: `client_connect`
     */
    connect: ClientConnectEvent;
    /**
     * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после "putinserver".
     *
     * Pawn: `client_connect`
     */
    client_connect: ClientConnectEvent;
    /**
     * Игрок начал подключаться, уже с именем и адресом: здесь его можно не пустить.
     *
     * Pawn: `client_connectex`
     */
    connectex: ClientConnectexEvent;
    /**
     * Игрок начал подключаться, уже с именем и адресом: здесь его можно не пустить.
     *
     * Pawn: `client_connectex`
     */
    client_connectex: ClientConnectexEvent;
    /**
     * Стал известен SteamID игрока. Может прийти до или после "putinserver".
     *
     * Pawn: `client_authorized`
     */
    authorized: ClientAuthorizedEvent;
    /**
     * Стал известен SteamID игрока. Может прийти до или после "putinserver".
     *
     * Pawn: `client_authorized`
     */
    client_authorized: ClientAuthorizedEvent;
    /**
     * Старая форма "disconnected", которая пропускает часть случаев: используйте "disconnected".
     *
     * Pawn: `client_disconnect`
     */
    disconnect: ClientDisconnectEvent;
    /**
     * Старая форма "disconnected", которая пропускает часть случаев: используйте "disconnected".
     *
     * Pawn: `client_disconnect`
     */
    client_disconnect: ClientDisconnectEvent;
    /**
     * Игрок покинул сервер: вышел сам, отвалился или был кикнут.
     *
     * Pawn: `client_disconnected`
     */
    disconnected: ClientDisconnectedEvent;
    /**
     * Игрок покинул сервер: вышел сам, отвалился или был кикнут.
     *
     * Pawn: `client_disconnected`
     */
    client_disconnected: ClientDisconnectedEvent;
    /**
     * Слот игрока освобождается, после "disconnected".
     *
     * Pawn: `client_remove`
     */
    remove: ClientRemoveEvent;
    /**
     * Слот игрока освобождается, после "disconnected".
     *
     * Pawn: `client_remove`
     */
    client_remove: ClientRemoveEvent;
    /**
     * Игрок отправил консольную команду. Для одной команды проще `server.addCommand("name", handler)`.
     *
     * Pawn: `client_command`
     */
    command: ClientCommandEvent;
    /**
     * Игрок отправил консольную команду. Для одной команды проще `server.addCommand("name", handler)`.
     *
     * Pawn: `client_command`
     */
    client_command: ClientCommandEvent;
    /**
     * Игрок зашёл и уже в игре: момент поприветствовать его.
     *
     * Pawn: `client_putinserver`
     */
    putinserver: ClientPutinserverEvent;
    /**
     * Игрок зашёл и уже в игре: момент поприветствовать его.
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
     * Две сущности коснулись друг друга.
     *
     * Pawn: `pfn_touch`
     */
    pfnTouch: PfnTouchEvent;
    /**
     * Две сущности коснулись друг друга.
     *
     * Pawn: `pfn_touch`
     */
    pfn_touch: PfnTouchEvent;
    /**
     * Кадр сервера, сотни раз в секунду. Обработчик должен быть очень лёгким, иначе используйте setInterval.
     *
     * Pawn: `server_frame`
     */
    frame: ServerFrameEvent;
    /**
     * Кадр сервера, сотни раз в секунду. Обработчик должен быть очень лёгким, иначе используйте setInterval.
     *
     * Pawn: `server_frame`
     */
    server_frame: ServerFrameEvent;
    /**
     * Игрок написал "kill" в консоли, чтобы убить себя.
     *
     * Pawn: `client_kill`
     */
    kill: ClientKillEvent;
    /**
     * Игрок написал "kill" в консоли, чтобы убить себя.
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
     * Игрок отправил impulse: 100 — фонарик, 201 — спрей.
     *
     * Pawn: `client_impulse`
     */
    impulse: ClientImpulseEvent;
    /**
     * Игрок отправил impulse: 100 — фонарик, 201 — спрей.
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
     * Сущность «думает»: пришло её запланированное обновление.
     *
     * Pawn: `pfn_think`
     */
    pfnThink: PfnThinkEvent;
    /**
     * Сущность «думает»: пришло её запланированное обновление.
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
     * На карте появляется сущность.
     *
     * Pawn: `pfn_spawn`
     */
    pfnSpawn: PfnSpawnEvent;
    /**
     * На карте появляется сущность.
     *
     * Pawn: `pfn_spawn`
     */
    pfn_spawn: PfnSpawnEvent;
}
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
