/// <reference path="../as-types.d.ts" />
import { Client, ClientMessage, FadeDirection, Player, PlayerChangeEvent, StatusIconState, Team, VariantName } from "./facade";
import { Vector } from "./vector";
import { WeaponKind } from "./entities";
import { Damage, HideHud, ScoreStatus } from "./flags";
import { VguiMenu } from "./hooks";
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
 * Pawn: `server_changelevel(map[])`
 */
export declare class ServerChangelevelEvent {
    /**
     * Карта, на которую переходит сервер, например `"de_dust2"`.
     *
     * Pawn: `map[]`
     */
    map: string;
    constructor(map: string);
}
/**
 * Все плагины запустились: момент создавать форварды для других плагинов. Конфиги выполняются после него: квары читайте в `"configsExecuted"`.
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
 * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после `"putInServer"`.
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
 * Pawn: `client_connectex(id, name[], ip[], reason[128])`
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
     * Pawn: `name[]`
     */
    name: string;
    /**
     * Адрес игрока с портом, например `"192.168.0.5:27005"`.
     *
     * Pawn: `ip[]`
     */
    ip: string;
    /**
     * Сообщение, которое игрок увидит, если его не пустят.
     *
     * Pawn: `reason[128]`
     */
    reason: string;
    constructor(player: Client, name: string, ip: string, reason: string);
}
/**
 * Стал известен SteamID игрока. Может прийти до или после `"putInServer"`.
 *
 * Важно: SteamID бота — `"BOT"`.
 *
 * Pawn: `client_authorized(id, authid[])`
 */
export declare class ClientAuthorizedEvent {
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `id`
     */
    player: Client;
    /**
     * SteamID игрока, например `"STEAM_0:1:12345"`. У бота — `"BOT"`, у HLTV — `"HLTV"`; на LAN-сервере — `"STEAM_ID_LAN"`. С Reunion игра без Steam получает SteamID, сделанный из её ключа: `"STEAM_..."` или `"VALVE_..."`, как скажут настройки Reunion на сервере.
     *
     * Pawn: `authid[]`
     */
    steamId: string;
    constructor(player: Client, steamId: string);
}
/**
 * Игрок покинул сервер: вышел сам, отвалился или был кикнут.
 *
 * Важно: Игрока здесь ещё можно прочитать (имя, команду), но на экран ему уже ничего не дойдёт.
 *
 * Pawn: `client_disconnected(id, bool:drop, message[], maxlen)`
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
     * Pawn: `message[]`
     */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * Слот игрока освобождается, после `"disconnected"`.
 *
 * Важно: This fires after the client_disconnected() forward, when the player entity has been removed (e.g. is_user_connected(id) will return false).
 *
 * Pawn: `client_remove(id, bool:drop, message[])`
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
     * Pawn: `message[]`
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
 * server.addEventListener("putInServer", (event) => {
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
 * Pawn: `inconsistent_file(id, filename[], reason[64])`
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
     * Pawn: `filename[]`
     */
    file: string;
    /**
     * Buffer storing the disconnect reason (can be overwritten)
     *
     * Pawn: `reason[64]`
     */
    reason: string;
    constructor(player: Player, file: string, reason: string);
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
 * Pawn: `CS_InternalCommand(id, cmd[])`
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
     * Pawn: `cmd[]`
     */
    command: string;
    constructor(player: Player, command: string);
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
 * Кадр сервера, сотни раз в секунду. Обработчик должен быть очень лёгким, иначе используйте `setInterval`.
 *
 * Важно: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `server_frame()`
 */
export declare class ServerFrameEvent {
}
/**
 * Игрок написал `"kill"` в консоли, чтобы убить себя.
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
 * Игрок отправил impulse: `100` — фонарик, `201` — спрей.
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
     * Номер impulse: `100`, `201`.
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
 * Сущность «думает»: пришло её запланированное обновление. Любой сущности; одного класса — `game.addEventListener("think", listener, { classname })`.
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
 * Движок проигрывает клиентам событие: выстрел, звук и эффекты оружия.
 *
 * Pawn: `pfn_playbackevent(flags, entid, eventid, Float:delay, Float:Origin[3], Float:Angles[3], Float:fparam1, Float:fparam2, iparam1, iparam2, bparam1, bparam2)`
 */
export declare class PfnPlaybackeventEvent {
    /**
     * Флаги события — как движок его отправляет.
     *
     * Pawn: `flags`
     */
    flags: number;
    /**
     * Сущность, на которой играет событие, — обычно игрок, который выстрелил.
     *
     * Pawn: `entid`
     */
    entity: number;
    /**
     * Номер события среди загруженных заранее событий.
     *
     * Pawn: `eventid`
     */
    eventIndex: number;
    /**
     * Секунды до того, как событие проиграется.
     *
     * Pawn: `Float:delay`
     */
    delay: number;
    /**
     * Точка, откуда проигрывается событие.
     *
     * Pawn: `Float:Origin[3]`
     */
    origin: Vector;
    /**
     * Углы, с которыми проигрывается событие.
     *
     * Pawn: `Float:Angles[3]`
     */
    angles: Vector;
    /**
     * Первый дробный параметр события.
     *
     * Pawn: `Float:fparam1`
     */
    fparam1: number;
    /**
     * Второй дробный параметр события.
     *
     * Pawn: `Float:fparam2`
     */
    fparam2: number;
    /**
     * Первый целый параметр события.
     *
     * Pawn: `iparam1`
     */
    iparam1: number;
    /**
     * Второй целый параметр события.
     *
     * Pawn: `iparam2`
     */
    iparam2: number;
    /**
     * Первый параметр-флаг события, `1` или `0`.
     *
     * Pawn: `bparam1`
     */
    bparam1: number;
    /**
     * Второй параметр-флаг события, `1` или `0`.
     *
     * Pawn: `bparam2`
     */
    bparam2: number;
    constructor(flags: number, entity: number, eventIndex: number, delay: number, origin: Vector, angles: Vector, fparam1: number, fparam2: number, iparam1: number, iparam2: number, bparam1: number, bparam2: number);
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
 * На карте появляется сущность, в том числе сущности самой карты, пока она загружается. Появление игрока — `game.addEventListener("spawn", listener)`.
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
/**
 * HUD игрока перестаёт показывать рекламу раунда.
 *
 * Сообщение игры `ADStop`.
 *
 * Pawn: `register_message(get_user_msgid("ADStop"), ...)`
 */
export declare class ADStopMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Можно ли игроку выбрать «Наблюдать» в меню команды.
 *
 * Сообщение игры `AllowSpec`.
 *
 * Pawn: `register_message(get_user_msgid("AllowSpec"), ...)`
 */
export declare class AllowSpecMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true`, когда меню это предлагает.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get allowed(): boolean;
    set allowed(value: boolean);
}
/**
 * Игрок подбирает патроны: уведомление сбоку экрана.
 *
 * Сообщение игры `AmmoPickup`.
 *
 * Pawn: `register_message(get_user_msgid("AmmoPickup"), ...)`
 */
export declare class AmmoPickupMessage extends ClientMessage {
    private readonly kind;
    /**
     * Индекс патронов в списке видов у игры.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get ammo(): number;
    set ammo(value: number);
    /**
     * Подобранное количество.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get amount(): number;
    set amount(value: number);
}
/**
 * Меняется запас патронов одного вида на HUD игрока.
 *
 * Сообщение игры `AmmoX`.
 *
 * Pawn: `register_message(get_user_msgid("AmmoX"), ...)`
 */
export declare class AmmoXMessage extends ClientMessage {
    private readonly kind;
    /**
     * Индекс патронов в списке видов у игры.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get ammo(): number;
    set ammo(value: number);
    /**
     * Показанный запас.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get amount(): number;
    set amount(value: number);
}
/**
 * Значок брони на HUD игрока: жилет или жилет со шлемом.
 *
 * Сообщение игры `ArmorType`.
 *
 * Pawn: `register_message(get_user_msgid("ArmorType"), ...)`
 */
export declare class ArmorTypeMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` — жилет со шлемом.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get helmet(): boolean;
    set helmet(value: boolean);
}
/**
 * Полосу прогресса посреди экрана игрока показывают или прячут — пустой или заполненной не с нуля.
 *
 * Сообщения игры `BarTime` и `BarTime2`.
 *
 * Pawn: `register_message(get_user_msgid("BarTime"), ...)`, `register_message(get_user_msgid("BarTime2"), ...)`
 */
export declare class BarTimeMessage extends ClientMessage {
    private readonly kind;
    /**
     * Секунды, которые показывают полоса или часы. Присвойте, чтобы изменить.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get seconds(): number;
    set seconds(value: number);
    /**
     * Заполненность полосы в начале, в процентах. В `BarTime` его нет: там он читается как `0`, а запись ничего не делает.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get startPercent(): number;
    set startPercent(value: number);
}
/**
 * Меняется броня игрока на его HUD.
 *
 * Сообщение игры `Battery`.
 *
 * Pawn: `register_message(get_user_msgid("Battery"), ...)`
 */
export declare class BatteryMessage extends ClientMessage {
    private readonly kind;
    /**
     * Показанная броня.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get armor(): number;
    set armor(value: number);
}
/**
 * Деньги на HUD игрока мигают: ему не хватает на покупку.
 *
 * Сообщение игры `BlinkAcct`.
 *
 * Pawn: `register_message(get_user_msgid("BlinkAcct"), ...)`
 */
export declare class BlinkAcctMessage extends ClientMessage {
    private readonly kind;
    /**
     * Число миганий.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get blinks(): number;
    set blinks(value: number);
}
/**
 * Бомба на радаре террористов: брошена или заложена.
 *
 * Сообщение игры `BombDrop`.
 *
 * Pawn: `register_message(get_user_msgid("BombDrop"), ...)`
 */
export declare class BombDropMessage extends ClientMessage {
    private readonly kind;
    /**
     * Точка, где лежит бомба.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get origin(): Vector;
    set origin(value: number[]);
    /**
     * `true` — бомба заложена, `false` — брошена.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get planted(): boolean;
    set planted(value: boolean);
}
/**
 * Бомбу подобрали: она пропадает с радара террористов.
 *
 * Сообщение игры `BombPickup`.
 *
 * Pawn: `register_message(get_user_msgid("BombPickup"), ...)`
 */
export declare class BombPickupMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Значок голоса над ботом, который говорит по рации.
 *
 * Сообщение игры `BotVoice`.
 *
 * Pawn: `register_message(get_user_msgid("BotVoice"), ...)`
 */
export declare class BotVoiceMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true`, пока бот говорит.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get talking(): boolean;
    set talking(value: boolean);
    /**
     * Бот, который говорит.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * Меню закупки игрока закрывается.
 *
 * Сообщение игры `BuyClose`.
 *
 * Pawn: `register_message(get_user_msgid("BuyClose"), ...)`
 */
export declare class BuyCloseMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Тело погибшего игрока остаётся на земле, чтобы клиенты его нарисовали.
 *
 * Сообщение игры `ClCorpse`.
 *
 * Pawn: `register_message(get_user_msgid("ClCorpse"), ...)`
 */
export declare class ClCorpseMessage extends ClientMessage {
    private readonly kind;
    /**
     * Модель тела, например `"sas"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get model(): string;
    set model(value: string);
    /**
     * Команда игрока, чьё это тело.
     *
     * Pawn: `get_msg_arg_*(11)`
     */
    get team(): Team;
    set team(value: Team);
    /**
     * Игрок, чьё это тело.
     *
     * Pawn: `get_msg_arg_*(12)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * Собственный прицел Counter-Strike на экране игрока показывают или прячут.
 *
 * Сообщение игры `Crosshair`.
 *
 * Pawn: `register_message(get_user_msgid("Crosshair"), ...)`
 */
export declare class CrosshairMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` — показать.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get shown(): boolean;
    set shown(value: boolean);
}
/**
 * Оружие в руках игрока и его обойма на HUD.
 *
 * Сообщение игры `CurWeapon`.
 *
 * Pawn: `register_message(get_user_msgid("CurWeapon"), ...)`
 */
export declare class CurWeaponMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` — для оружия в его руках.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * Оружие по его виду, например `"ak47"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
    /**
     * Патроны в обойме.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get clip(): number;
    set clip(value: number);
}
/**
 * Игроку показывают полученный урон: красные метки сбоку экрана.
 *
 * Сообщение игры `Damage`.
 *
 * Pawn: `register_message(get_user_msgid("Damage"), ...)`
 */
export declare class DamageMessage extends ClientMessage {
    private readonly kind;
    /**
     * Потерянная броня.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get armor(): number;
    set armor(value: number);
    /**
     * Потерянное здоровье.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Виды урона, например `"fall"`, `"bullet"`.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get damageType(): Damage[];
    set damageType(value: Damage[]);
    /**
     * Точка, откуда пришёл урон: метки указывают на неё.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get origin(): Vector;
    set origin(value: number[]);
}
/**
 * Убийство в правом верхнем углу каждого экрана.
 *
 * Сообщение игры `DeathMsg`.
 *
 * Pawn: `register_message(get_user_msgid("DeathMsg"), ...)`
 */
export declare class DeathMsgMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок, который убил; `null` — мир.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get killer(): Player | null;
    set killer(value: Player | null);
    /**
     * Игрок, который погиб.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get victim(): Player | null;
    set victim(value: Player | null);
    /**
     * `true` — выстрел в голову.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get headshot(): boolean;
    set headshot(value: boolean);
    /**
     * Имя оружия, как его показывает значок, например `"ak47"`, `"grenade"`.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get weapon(): string;
    set weapon(value: string);
}
/**
 * Значок фонарика на HUD игрока: включён ли он, и его заряд.
 *
 * Сообщение игры `Flashlight`.
 *
 * Pawn: `register_message(get_user_msgid("Flashlight"), ...)`
 */
export declare class FlashlightMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true`, пока фонарик включён.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get on(): boolean;
    set on(value: boolean);
    /**
     * Заряд фонарика, в процентах.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get battery(): number;
    set battery(value: number);
}
/**
 * Меняется заряд фонарика на HUD игрока.
 *
 * Сообщение игры `FlashBat`.
 *
 * Pawn: `register_message(get_user_msgid("FlashBat"), ...)`
 */
export declare class FlashBatMessage extends ClientMessage {
    private readonly kind;
    /**
     * Заряд фонарика, в процентах.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get battery(): number;
    set battery(value: number);
}
/**
 * Щелчки счётчика Гейгера, которые игрок слышит рядом с радиацией.
 *
 * Сообщение игры `Geiger`.
 *
 * Pawn: `register_message(get_user_msgid("Geiger"), ...)`
 */
export declare class GeigerMessage extends ClientMessage {
    private readonly kind;
    /**
     * Расстояние до радиации: чем меньше, тем чаще щелчки.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get range(): number;
    set range(value: number);
}
/**
 * Меняется здоровье игрока на его HUD.
 *
 * Сообщение игры `Health`.
 *
 * Pawn: `register_message(get_user_msgid("Health"), ...)`
 */
export declare class HealthMessage extends ClientMessage {
    private readonly kind;
    /**
     * Показанное здоровье.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get health(): number;
    set health(value: number);
}
/**
 * Меняются скрытые части HUD игрока.
 *
 * Сообщение игры `HideWeapon`.
 *
 * Pawn: `register_message(get_user_msgid("HideWeapon"), ...)`
 */
export declare class HideWeaponMessage extends ClientMessage {
    private readonly kind;
    /**
     * Скрытые части, например `"money"`, `"timer"`. Присвойте, чтобы изменить.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get flags(): HideHud[];
    set flags(value: HideHud[]);
}
/**
 * Заложник убит: он пропадает с радара спецназа.
 *
 * Сообщение игры `HostageK`.
 *
 * Pawn: `register_message(get_user_msgid("HostageK"), ...)`
 */
export declare class HostageKMessage extends ClientMessage {
    private readonly kind;
    /**
     * Номер заложника на карте, с `1`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get hostage(): number;
    set hostage(value: number);
}
/**
 * Заложник на радаре спецназа.
 *
 * Сообщение игры `HostagePos`.
 *
 * Pawn: `register_message(get_user_msgid("HostagePos"), ...)`
 */
export declare class HostagePosMessage extends ClientMessage {
    private readonly kind;
    /**
     * Номер заложника на карте, с `1`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get hostage(): number;
    set hostage(value: number);
    /**
     * Точка, где находится заложник.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get origin(): Vector;
    set origin(value: number[]);
}
/**
 * Подсказка посреди экрана игрока.
 *
 * Сообщения игры `HudText`, `HudTextArgs` и `HudTextPro`.
 *
 * Pawn: `register_message(get_user_msgid("HudText"), ...)`, `register_message(get_user_msgid("HudTextArgs"), ...)`, `register_message(get_user_msgid("HudTextPro"), ...)`
 */
export declare class HudTextMessage extends ClientMessage {
    private readonly kind;
    /**
     * Текст или собственный текст игры, например `"#Hint_press_buy_to_purchase"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get text(): string;
    set text(value: string);
    /**
     * Тексты, которые подставляются в текст игры вместо `%s1`, `%s2`, ... — например, имя игрока. Присвойте, чтобы изменить; их число остаётся. В `HudText` и `HudTextPro` его нет: там он читается как `[]`, а запись ничего не делает.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get params(): string[];
    set params(value: string[]);
}
/**
 * HUD игрока готовится, когда он входит в игру.
 *
 * Сообщение игры `InitHUD`.
 *
 * Pawn: `register_message(get_user_msgid("InitHUD"), ...)`
 */
export declare class InitHUDMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Игрок подбирает предмет: уведомление сбоку экрана.
 *
 * Сообщение игры `ItemPickup`.
 *
 * Pawn: `register_message(get_user_msgid("ItemPickup"), ...)`
 */
export declare class ItemPickupMessage extends ClientMessage {
    private readonly kind;
    /**
     * Имя класса предмета, например `"item_kevlar"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get item(): string;
    set item(value: string);
}
/**
 * Прибор ночного видения и набор сапёра, которые есть у игрока, для его HUD.
 *
 * Сообщение игры `ItemStatus`.
 *
 * Pawn: `register_message(get_user_msgid("ItemStatus"), ...)`
 */
export declare class ItemStatusMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true`, когда у игрока есть ночное видение.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get nightVision(): boolean;
    set nightVision(value: boolean);
    /**
     * `true`, когда у игрока есть набор сапёра.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get defuseKit(): boolean;
    set defuseKit(value: boolean);
}
/**
 * Место на карте, где находится игрок, как его называет рация.
 *
 * Сообщение игры `Location`.
 *
 * Pawn: `register_message(get_user_msgid("Location"), ...)`
 */
export declare class LocationMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок, чьё это место.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * Имя места, например `"BombsiteA"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get place(): string;
    set place(value: string);
}
/**
 * Меняются деньги игрока на его HUD.
 *
 * Сообщение игры `Money`.
 *
 * Pawn: `register_message(get_user_msgid("Money"), ...)`
 */
export declare class MoneyMessage extends ClientMessage {
    private readonly kind;
    /**
     * Показанные деньги.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get amount(): number;
    set amount(value: number);
    /**
     * `true` — мигнуть изменением.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get flash(): boolean;
    set flash(value: boolean);
}
/**
 * Часть сообщения дня — окна, которое видит вошедший игрок.
 *
 * Сообщение игры `MOTD`.
 *
 * Pawn: `register_message(get_user_msgid("MOTD"), ...)`
 */
export declare class MOTDMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` — последняя часть: окно открывается.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get last(): boolean;
    set last(value: boolean);
    /**
     * Текст части.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * Ночное видение игрока включают или выключают.
 *
 * Сообщение игры `NVGToggle`.
 *
 * Pawn: `register_message(get_user_msgid("NVGToggle"), ...)`
 */
export declare class NVGToggleMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true`, пока ночное видение включено.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get on(): boolean;
    set on(value: boolean);
}
/**
 * Союзник на радаре игрока.
 *
 * Сообщение игры `Radar`.
 *
 * Pawn: `register_message(get_user_msgid("Radar"), ...)`
 */
export declare class RadarMessage extends ClientMessage {
    private readonly kind;
    /**
     * Показанный союзник.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * Точка, где находится союзник.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get origin(): Vector;
    set origin(value: number[]);
}
/**
 * Игра запрашивает у клиента игрока его состояние — для голоса.
 *
 * Сообщение игры `ReqState`.
 *
 * Pawn: `register_message(get_user_msgid("ReqState"), ...)`
 */
export declare class ReqStateMessage extends ClientMessage {
    private readonly kind;
}
/**
 * HUD игрока сбрасывается при его появлении.
 *
 * Сообщение игры `ResetHUD`.
 *
 * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
 */
export declare class ResetHUDMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Задаются часы раунда вверху HUD игрока.
 *
 * Сообщение игры `RoundTime`.
 *
 * Pawn: `register_message(get_user_msgid("RoundTime"), ...)`
 */
export declare class RoundTimeMessage extends ClientMessage {
    private readonly kind;
    /**
     * Секунды, которые показывают полоса или часы. Присвойте, чтобы изменить.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get seconds(): number;
    set seconds(value: number);
}
/**
 * Строка чата.
 *
 * Сообщение игры `SayText`.
 *
 * Pawn: `register_message(get_user_msgid("SayText"), ...)`
 */
export declare class SayTextMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок, который её написал; `null` — сервер.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get sender(): Player | null;
    set sender(value: Player | null);
    /**
     * Строка или формат игры для неё, например `"#Cstrike_Chat_All"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
    /**
     * Тексты, которые подставляются в текст игры вместо `%s1`, `%s2`, ... — например, имя игрока. Присвойте, чтобы изменить; их число остаётся.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get params(): string[];
    set params(value: string[]);
}
/**
 * Значок сценария на HUD игрока, например бомбы или заложника.
 *
 * Сообщение игры `Scenario`.
 *
 * Pawn: `register_message(get_user_msgid("Scenario"), ...)`
 */
export declare class ScenarioMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true`, пока значок показан.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * Имя спрайта значка, например `"hostage1"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get sprite(): string;
    set sprite(value: string);
    /**
     * Непрозрачность значка, от `0` до `255`.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get alpha(): number;
    set alpha(value: number);
}
/**
 * Отметки, которые таблица счёта показывает рядом с игроком: погиб, бомба, VIP.
 *
 * Сообщение игры `ScoreAttrib`.
 *
 * Pawn: `register_message(get_user_msgid("ScoreAttrib"), ...)`
 */
export declare class ScoreAttribMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок, чья это строка.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * Отметки в строке, например `"dead"`, `"bomb"`, `"vip"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get flags(): ScoreStatus[];
    set flags(value: ScoreStatus[]);
}
/**
 * Строка игрока в таблице счёта.
 *
 * Сообщение игры `ScoreInfo`.
 *
 * Pawn: `register_message(get_user_msgid("ScoreInfo"), ...)`
 */
export declare class ScoreInfoMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок, чья это строка.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * Показанные фраги.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get frags(): number;
    set frags(value: number);
    /**
     * Показанные смерти.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get deaths(): number;
    set deaths(value: number);
    /**
     * Команда, под которой строка.
     *
     * Pawn: `get_msg_arg_*(5)`
     */
    get team(): Team;
    set team(value: Team);
}
/**
 * Экран игрока окрашивается с затуханием — флешка, затемнение.
 *
 * Сообщение игры `ScreenFade`.
 *
 * Pawn: `register_message(get_user_msgid("ScreenFade"), ...)`
 */
export declare class ScreenFadeMessage extends ClientMessage {
    private readonly kind;
    /**
     * Длительность затухания, в секундах.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get duration(): number;
    set duration(value: number);
    /**
     * Время, которое держится полный цвет, в секундах.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get hold(): number;
    set hold(value: number);
    /**
     * Одно из `"in"` — от цвета к чистому экрану, или `"out"` — от чистого экрана к цвету.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get direction(): FadeDirection;
    set direction(value: FadeDirection);
    /**
     * `true`, когда цвет тонирует экран, а не закрашивает его.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get modulate(): boolean;
    set modulate(value: boolean);
    /**
     * `true`, когда цвет остаётся до следующего затухания.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get stay(): boolean;
    set stay(value: boolean);
    /**
     * Цвет: красный, зелёный, синий и альфа, от `0` до `255` каждый.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get color(): number[];
    set color(value: number[]);
}
/**
 * Вид игрока трясётся — рядом взрыв.
 *
 * Сообщение игры `ScreenShake`.
 *
 * Pawn: `register_message(get_user_msgid("ScreenShake"), ...)`
 */
export declare class ScreenShakeMessage extends ClientMessage {
    private readonly kind;
    /**
     * Сила тряски: насколько сдвигается вид, до 16 единиц.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get amplitude(): number;
    set amplitude(value: number);
    /**
     * Длительность тряски, в секундах.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get duration(): number;
    set duration(value: number);
    /**
     * Частота тряски, в толчках в секунду.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get frequency(): number;
    set frequency(value: number);
}
/**
 * Звук, который играет игроку, например фраза рации.
 *
 * Сообщение игры `SendAudio`.
 *
 * Pawn: `register_message(get_user_msgid("SendAudio"), ...)`
 */
export declare class SendAudioMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок, от которого звук; `null` — ни от кого.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get sender(): Player | null;
    set sender(value: Player | null);
    /**
     * Звук, например `"%!MRAD_GO"` — фраза рации.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get sound(): string;
    set sound(value: string);
    /**
     * Высота в процентах, `100` — как записан.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get pitch(): number;
    set pitch(value: number);
}
/**
 * Имя сервера, которое показывает клиент игрока.
 *
 * Сообщение игры `ServerName`.
 *
 * Pawn: `register_message(get_user_msgid("ServerName"), ...)`
 */
export declare class ServerNameMessage extends ClientMessage {
    private readonly kind;
    /**
     * Имя сервера, как его задаёт `hostname`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get serverName(): string;
    set serverName(value: string);
}
/**
 * Задаётся поле зрения игрока.
 *
 * Сообщение игры `SetFOV`.
 *
 * Pawn: `register_message(get_user_msgid("SetFOV"), ...)`
 */
export declare class SetFOVMessage extends ClientMessage {
    private readonly kind;
    /**
     * Поле зрения, в градусах.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get fov(): number;
    set fov(value: number);
}
/**
 * Текстовое меню на экране игрока — меню команды без VGUI, рация, меню плагина.
 *
 * Сообщение игры `ShowMenu`.
 *
 * Pawn: `register_message(get_user_msgid("ShowMenu"), ...)`
 */
export declare class ShowMenuMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true`, когда продолжение текста меню идёт следующим сообщением.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get more(): boolean;
    set more(value: boolean);
    /**
     * Текст меню или собственный текст игры, например `"#Team_Select"`.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * На HUD игрока появляются часы раунда.
 *
 * Сообщение игры `ShowTimer`.
 *
 * Pawn: `register_message(get_user_msgid("ShowTimer"), ...)`
 */
export declare class ShowTimerMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Здоровье игрока, за которым следит наблюдатель.
 *
 * Сообщения игры `SpecHealth` и `SpecHealth2`.
 *
 * Pawn: `register_message(get_user_msgid("SpecHealth"), ...)`, `register_message(get_user_msgid("SpecHealth2"), ...)`
 */
export declare class SpecHealthMessage extends ClientMessage {
    private readonly kind;
    /**
     * Показанное здоровье.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get health(): number;
    set health(value: number);
    /**
     * Игрок, за которым следят. В `SpecHealth` его нет: там он читается как `null`, а запись ничего не делает.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * Игрок становится наблюдателем или перестаёт им быть — в таблице счёта.
 *
 * Сообщение игры `Spectator`.
 *
 * Pawn: `register_message(get_user_msgid("Spectator"), ...)`
 */
export declare class SpectatorMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * `true`, пока игрок наблюдает.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get spectator(): boolean;
    set spectator(value: boolean);
}
/**
 * Значок состояния на HUD игрока — зона закупки, бомба — показывается, мигает или прячется.
 *
 * Сообщение игры `StatusIcon`.
 *
 * Pawn: `register_message(get_user_msgid("StatusIcon"), ...)`
 */
export declare class StatusIconMessage extends ClientMessage {
    private readonly kind;
    /**
     * Одно из `"hide"`, `"show"` или `"flash"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get state(): StatusIconState;
    set state(value: StatusIconState);
    /**
     * Имя спрайта значка, например `"buyzone"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get sprite(): string;
    set sprite(value: string);
    /**
     * Цвет значка: красный, зелёный и синий, от `0` до `255` каждый; пусто, когда он скрыт.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get color(): number[];
    set color(value: number[]);
}
/**
 * Строка состояния внизу экрана игрока, например имя игрока, в которого он целится.
 *
 * Сообщение игры `StatusText`.
 *
 * Pawn: `register_message(get_user_msgid("StatusText"), ...)`
 */
export declare class StatusTextMessage extends ClientMessage {
    private readonly kind;
    /**
     * Номер строки состояния, с `0`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get line(): number;
    set line(value: number);
    /**
     * Текст строки или её формат, например `"1 %c1: %p2"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * Значение, которое показывает строка состояния, например игрок, в которого целится игрок.
 *
 * Сообщение игры `StatusValue`.
 *
 * Pawn: `register_message(get_user_msgid("StatusValue"), ...)`
 */
export declare class StatusValueMessage extends ClientMessage {
    private readonly kind;
    /**
     * Номер значения в формате строки: `1` — команда, `2` — игрок, `3` — здоровье.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get slot(): number;
    set slot(value: number);
    /**
     * Значение.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get value(): number;
    set value(value: number);
}
/**
 * Отсчёт задания на HUD игрока, например спасения заложников в карьере.
 *
 * Сообщение игры `TaskTime`.
 *
 * Pawn: `register_message(get_user_msgid("TaskTime"), ...)`
 */
export declare class TaskTimeMessage extends ClientMessage {
    private readonly kind;
    /**
     * Оставшиеся секунды.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get seconds(): number;
    set seconds(value: number);
    /**
     * `true`, пока часы идут.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * Секунды, за которые часы гаснут.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get fade(): number;
    set fade(value: number);
}
/**
 * Команда игрока в таблице счёта.
 *
 * Сообщение игры `TeamInfo`.
 *
 * Pawn: `register_message(get_user_msgid("TeamInfo"), ...)`
 */
export declare class TeamInfoMessage extends ClientMessage {
    private readonly kind;
    /**
     * Игрок, чья это команда.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * Команда, например `"TERRORIST"`, `"CT"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get team(): Team;
    set team(value: Team);
}
/**
 * Счёт команды в таблице счёта.
 *
 * Сообщение игры `TeamScore`.
 *
 * Pawn: `register_message(get_user_msgid("TeamScore"), ...)`
 */
export declare class TeamScoreMessage extends ClientMessage {
    private readonly kind;
    /**
     * Команда, `"TERRORIST"` или `"CT"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get team(): Team;
    set team(value: Team);
    /**
     * Раунды, которые выиграла команда.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get score(): number;
    set score(value: number);
}
/**
 * Текст игры — объявление, подсказка — в чате, консоли или посреди экрана.
 *
 * Сообщение игры `TextMsg`.
 *
 * Pawn: `register_message(get_user_msgid("TextMsg"), ...)`
 */
export declare class TextMsgMessage extends ClientMessage {
    private readonly kind;
    /**
     * Место, где он виден, одно из `"chat"`, `"center"`, `"console"` или `"notify"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get destination(): VariantName;
    set destination(value: VariantName);
    /**
     * Текст или собственный текст игры, например `"#Round_Draw"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
    /**
     * Тексты, которые подставляются в текст игры вместо `%s1`, `%s2`, ... — например, имя игрока. Присвойте, чтобы изменить; их число остаётся.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get params(): string[];
    set params(value: string[]);
}
/**
 * Скорость поезда, которым управляет игрок, на его HUD.
 *
 * Сообщение игры `Train`.
 *
 * Pawn: `register_message(get_user_msgid("Train"), ...)`
 */
export declare class TrainMessage extends ClientMessage {
    private readonly kind;
    /**
     * Ступень скорости, `0` — никакой.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get speed(): number;
    set speed(value: number);
}
/**
 * Сообщение подсказчика на экране игрока закрывается.
 *
 * Сообщение игры `TutorClose`.
 *
 * Pawn: `register_message(get_user_msgid("TutorClose"), ...)`
 */
export declare class TutorCloseMessage extends ClientMessage {
    private readonly kind;
}
/**
 * На экране игрока открывается VGUI-меню игры: меню команды, класса, закупки.
 *
 * Сообщение игры `VGUIMenu`.
 *
 * Pawn: `register_message(get_user_msgid("VGUIMenu"), ...)`
 */
export declare class VGUIMenuMessage extends ClientMessage {
    private readonly kind;
    /**
     * Меню, например `"team"`, `"classT"`, `"buy"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get menu(): VguiMenu;
    set menu(value: VguiMenu);
}
/**
 * Вид игрока возвращается к виду от первого лица.
 *
 * Сообщение игры `ViewMode`.
 *
 * Pawn: `register_message(get_user_msgid("ViewMode"), ...)`
 */
export declare class ViewModeMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Описание оружия для клиента игрока: его патроны, слот, место в слоте.
 *
 * Сообщение игры `WeaponList`.
 *
 * Pawn: `register_message(get_user_msgid("WeaponList"), ...)`
 */
export declare class WeaponListMessage extends ClientMessage {
    private readonly kind;
    /**
     * Имя класса оружия, например `"weapon_ak47"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get classname(): string;
    set classname(value: string);
    /**
     * Индекс патронов оружия в списке видов у игры.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get ammo(): number;
    set ammo(value: number);
    /**
     * Наибольший запас этих патронов у игрока.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get maxAmmo(): number;
    set maxAmmo(value: number);
    /**
     * Индекс вторых патронов оружия, `-1` — нет.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get ammo2(): number;
    set ammo2(value: number);
    /**
     * Наибольший запас вторых патронов у игрока.
     *
     * Pawn: `get_msg_arg_*(5)`
     */
    get maxAmmo2(): number;
    set maxAmmo2(value: number);
    /**
     * Слот оружия, с `0`.
     *
     * Pawn: `get_msg_arg_*(6)`
     */
    get slot(): number;
    set slot(value: number);
    /**
     * Место оружия в слоте, с `0`.
     *
     * Pawn: `get_msg_arg_*(7)`
     */
    get position(): number;
    set position(value: number);
    /**
     * Оружие по его виду, например `"ak47"`.
     *
     * Pawn: `get_msg_arg_*(8)`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
}
/**
 * Игрок подбирает оружие: уведомление сбоку экрана.
 *
 * Сообщение игры `WeapPickup`.
 *
 * Pawn: `register_message(get_user_msgid("WeapPickup"), ...)`
 */
export declare class WeapPickupMessage extends ClientMessage {
    private readonly kind;
    /**
     * Оружие по его виду, например `"knife"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
}
/** Every event a server raises, by name. */
export interface ServerEventMap {
    /**
     * Плагин загрузился: здесь регистрируют команды, события и хуки.
     *
     * Pawn: `plugin_init`
     */
    init: PluginInitEvent;
    /**
     * Админ поставил плагин на паузу.
     *
     * Pawn: `plugin_pause`
     */
    pause: PluginPauseEvent;
    /**
     * Админ снял плагин с паузы.
     *
     * Pawn: `plugin_unpause`
     */
    unpause: PluginUnpauseEvent;
    /**
     * Сервер сейчас сменит карту.
     *
     * Pawn: `server_changelevel`
     */
    changeLevel: ServerChangelevelEvent;
    /**
     * Все плагины запустились: момент создавать форварды для других плагинов. Конфиги выполняются после него: квары читайте в `"configsExecuted"`.
     *
     * Pawn: `plugin_cfg`
     */
    pluginsLoaded: PluginCfgEvent;
    /**
     * Карта заканчивается или сервер выключается: сохраните то, что должно пережить смену карты.
     *
     * Pawn: `plugin_end`
     */
    end: PluginEndEvent;
    /**
     * Called when a message is about to be logged.
     *
     * Pawn: `plugin_log`
     */
    log: PluginLogEvent;
    /**
     * Карта загружается: единственный момент, когда можно подгрузить (precache) модели, звуки и спрайты.
     *
     * Pawn: `plugin_precache`
     */
    precache: PluginPrecacheEvent;
    /**
     * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после `"putInServer"`.
     *
     * Pawn: `client_connect`
     */
    connect: ClientConnectEvent;
    /**
     * Игрок начал подключаться, уже с именем и адресом: здесь его можно не пустить.
     *
     * Pawn: `client_connectex`
     */
    connectAttempt: ClientConnectexEvent;
    /**
     * Стал известен SteamID игрока. Может прийти до или после `"putInServer"`.
     *
     * Pawn: `client_authorized`
     */
    authorized: ClientAuthorizedEvent;
    /**
     * Игрок покинул сервер: вышел сам, отвалился или был кикнут.
     *
     * Pawn: `client_disconnected`
     */
    disconnected: ClientDisconnectedEvent;
    /**
     * Слот игрока освобождается, после `"disconnected"`.
     *
     * Pawn: `client_remove`
     */
    remove: ClientRemoveEvent;
    /**
     * Игрок отправил консольную команду. Для одной команды проще `server.addCommand("name", handler)`.
     *
     * Pawn: `client_command`
     */
    command: ClientCommandEvent;
    /**
     * Игрок зашёл и уже в игре: момент поприветствовать его.
     *
     * Pawn: `client_putinserver`
     */
    putInServer: ClientPutinserverEvent;
    /**
     * Called when an inconsistent file is encountered by the engine.
     *
     * Pawn: `inconsistent_file`
     */
    inconsistentFile: InconsistentFileEvent;
    /**
     * Allows plugins to declare module dependencies using require_module()
     *
     * Pawn: `plugin_modules`
     */
    modules: PluginModulesEvent;
    /**
     * Called when the map has loaded, and all configs are done executing. This includes servercfgfile (server.cfg), amxx.cfg, plugin's config, and per-map config.
     *
     * Pawn: `OnConfigsExecuted`
     */
    configsExecuted: OnConfigsExecutedEvent;
    /**
     * Called when the map has loaded, right after plugin_cfg() but any time before OnConfigsExecuted. It's called after amxx.cfg and all AutoExecConfig() exec commands have been added to the server command buffer.
     *
     * Pawn: `OnAutoConfigsBuffered`
     */
    configsQueued: OnAutoConfigsBufferedEvent;
    /**
     * Called when CS internally fires a command to a player.
     *
     * Pawn: `CS_InternalCommand`
     */
    internalCommand: CS_InternalCommandEvent;
    /**
     * Кадр сервера, сотни раз в секунду. Обработчик должен быть очень лёгким, иначе используйте `setInterval`.
     *
     * Pawn: `server_frame`
     */
    frame: ServerFrameEvent;
    /**
     * Игрок написал `"kill"` в консоли, чтобы убить себя.
     *
     * Pawn: `client_kill`
     */
    suicide: ClientKillEvent;
    /**
     * Игрок отправил impulse: `100` — фонарик, `201` — спрей.
     *
     * Pawn: `client_impulse`
     */
    impulse: ClientImpulseEvent;
    /**
     * Called for CmdStart() on a client.
     *
     * Pawn: `client_cmdStart`
     */
    cmdStart: ClientCmdStartEvent;
    /**
     * Сущность «думает»: пришло её запланированное обновление. Любой сущности; одного класса — `game.addEventListener("think", listener, { classname })`.
     *
     * Pawn: `pfn_think`
     */
    entityThink: PfnThinkEvent;
    /**
     * Движок проигрывает клиентам событие: выстрел, звук и эффекты оружия.
     *
     * Pawn: `pfn_playbackevent`
     */
    playbackEvent: PfnPlaybackeventEvent;
    /**
     * Called when a keyvalue pair is sent to an entity.
     *
     * Pawn: `pfn_keyvalue`
     */
    keyValue: PfnKeyvalueEvent;
    /**
     * На карте появляется сущность, в том числе сущности самой карты, пока она загружается. Появление игрока — `game.addEventListener("spawn", listener)`.
     *
     * Pawn: `pfn_spawn`
     */
    entitySpawn: PfnSpawnEvent;
    /** У игрока изменилось поле, которое плагины добавили в `Player`; `{ field: "spawnProtected" }` слушает одно поле. */
    playerChange: PlayerChangeEvent;
}
/** Every message the server sends its clients, by the name server.addMessageListener takes. */
export interface ServerMessageMap {
    /**
     * HUD игрока перестаёт показывать рекламу раунда.
     *
     * Сообщение игры `ADStop`.
     *
     * Pawn: `register_message(get_user_msgid("ADStop"), ...)`
     */
    adStop: ADStopMessage;
    /**
     * Можно ли игроку выбрать «Наблюдать» в меню команды.
     *
     * Сообщение игры `AllowSpec`.
     *
     * Pawn: `register_message(get_user_msgid("AllowSpec"), ...)`
     */
    allowSpectate: AllowSpecMessage;
    /**
     * Игрок подбирает патроны: уведомление сбоку экрана.
     *
     * Сообщение игры `AmmoPickup`.
     *
     * Pawn: `register_message(get_user_msgid("AmmoPickup"), ...)`
     */
    ammoPickup: AmmoPickupMessage;
    /**
     * Меняется запас патронов одного вида на HUD игрока.
     *
     * Сообщение игры `AmmoX`.
     *
     * Pawn: `register_message(get_user_msgid("AmmoX"), ...)`
     */
    ammo: AmmoXMessage;
    /**
     * Значок брони на HUD игрока: жилет или жилет со шлемом.
     *
     * Сообщение игры `ArmorType`.
     *
     * Pawn: `register_message(get_user_msgid("ArmorType"), ...)`
     */
    armorType: ArmorTypeMessage;
    /**
     * Полосу прогресса посреди экрана игрока показывают или прячут — пустой или заполненной не с нуля.
     *
     * Сообщения игры `BarTime` и `BarTime2`.
     *
     * Pawn: `register_message(get_user_msgid("BarTime"), ...)`, `register_message(get_user_msgid("BarTime2"), ...)`
     */
    progressBar: BarTimeMessage;
    /**
     * Меняется броня игрока на его HUD.
     *
     * Сообщение игры `Battery`.
     *
     * Pawn: `register_message(get_user_msgid("Battery"), ...)`
     */
    armor: BatteryMessage;
    /**
     * Деньги на HUD игрока мигают: ему не хватает на покупку.
     *
     * Сообщение игры `BlinkAcct`.
     *
     * Pawn: `register_message(get_user_msgid("BlinkAcct"), ...)`
     */
    moneyBlink: BlinkAcctMessage;
    /**
     * Бомба на радаре террористов: брошена или заложена.
     *
     * Сообщение игры `BombDrop`.
     *
     * Pawn: `register_message(get_user_msgid("BombDrop"), ...)`
     */
    bombDrop: BombDropMessage;
    /**
     * Бомбу подобрали: она пропадает с радара террористов.
     *
     * Сообщение игры `BombPickup`.
     *
     * Pawn: `register_message(get_user_msgid("BombPickup"), ...)`
     */
    bombPickup: BombPickupMessage;
    /**
     * Полоса прогресса, которую клиент игрока показывает, пока боты изучают новую карту. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `BotProgress`.
     *
     * Pawn: `register_message(get_user_msgid("BotProgress"), ...)`
     */
    botProgress: ClientMessage;
    /**
     * Значок голоса над ботом, который говорит по рации.
     *
     * Сообщение игры `BotVoice`.
     *
     * Pawn: `register_message(get_user_msgid("BotVoice"), ...)`
     */
    botVoice: BotVoiceMessage;
    /**
     * Гильза, которую выбрасывает оружие, — клиенты её рисуют. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `Brass`.
     *
     * Pawn: `register_message(get_user_msgid("Brass"), ...)`
     */
    shellCasing: ClientMessage;
    /**
     * Меню закупки игрока закрывается.
     *
     * Сообщение игры `BuyClose`.
     *
     * Pawn: `register_message(get_user_msgid("BuyClose"), ...)`
     */
    closeBuyMenu: BuyCloseMessage;
    /**
     * Тело погибшего игрока остаётся на земле, чтобы клиенты его нарисовали.
     *
     * Сообщение игры `ClCorpse`.
     *
     * Pawn: `register_message(get_user_msgid("ClCorpse"), ...)`
     */
    corpse: ClCorpseMessage;
    /**
     * Собственный прицел Counter-Strike на экране игрока показывают или прячут.
     *
     * Сообщение игры `Crosshair`.
     *
     * Pawn: `register_message(get_user_msgid("Crosshair"), ...)`
     */
    crosshair: CrosshairMessage;
    /**
     * Оружие в руках игрока и его обойма на HUD.
     *
     * Сообщение игры `CurWeapon`.
     *
     * Pawn: `register_message(get_user_msgid("CurWeapon"), ...)`
     */
    currentWeapon: CurWeaponMessage;
    /**
     * Шаг карьеры Condition Zero, её одиночной кампании. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `CZCareer`.
     *
     * Pawn: `register_message(get_user_msgid("CZCareer"), ...)`
     */
    czCareer: ClientMessage;
    /**
     * Карьера Condition Zero на HUD игрока. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `CZCareerHUD`.
     *
     * Pawn: `register_message(get_user_msgid("CZCareerHUD"), ...)`
     */
    czCareerHud: ClientMessage;
    /**
     * Игроку показывают полученный урон: красные метки сбоку экрана.
     *
     * Сообщение игры `Damage`.
     *
     * Pawn: `register_message(get_user_msgid("Damage"), ...)`
     */
    damage: DamageMessage;
    /**
     * Убийство в правом верхнем углу каждого экрана.
     *
     * Сообщение игры `DeathMsg`.
     *
     * Pawn: `register_message(get_user_msgid("DeathMsg"), ...)`
     */
    death: DeathMsgMessage;
    /**
     * Значок фонарика на HUD игрока: включён ли он, и его заряд.
     *
     * Сообщение игры `Flashlight`.
     *
     * Pawn: `register_message(get_user_msgid("Flashlight"), ...)`
     */
    flashlight: FlashlightMessage;
    /**
     * Меняется заряд фонарика на HUD игрока.
     *
     * Сообщение игры `FlashBat`.
     *
     * Pawn: `register_message(get_user_msgid("FlashBat"), ...)`
     */
    flashlightBattery: FlashBatMessage;
    /**
     * Туман на экране игрока: его цвет и плотность. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `Fog`.
     *
     * Pawn: `register_message(get_user_msgid("Fog"), ...)`
     */
    fog: ClientMessage;
    /**
     * Виды, в которых мёртвый игрок может смотреть игру, как разрешают `mp_forcecamera` и `mp_forcechasecam`. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `ForceCam`.
     *
     * Pawn: `register_message(get_user_msgid("ForceCam"), ...)`
     */
    forceCamera: ClientMessage;
    /**
     * Играют ли командами — для клиента игрока. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `GameMode`.
     *
     * Pawn: `register_message(get_user_msgid("GameMode"), ...)`
     */
    gameMode: ClientMessage;
    /**
     * Заголовок игры на экране игрока, когда он входит в игру. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `GameTitle`.
     *
     * Pawn: `register_message(get_user_msgid("GameTitle"), ...)`
     */
    gameTitle: ClientMessage;
    /**
     * Щелчки счётчика Гейгера, которые игрок слышит рядом с радиацией.
     *
     * Сообщение игры `Geiger`.
     *
     * Pawn: `register_message(get_user_msgid("Geiger"), ...)`
     */
    geiger: GeigerMessage;
    /**
     * Меняется здоровье игрока на его HUD.
     *
     * Сообщение игры `Health`.
     *
     * Pawn: `register_message(get_user_msgid("Health"), ...)`
     */
    health: HealthMessage;
    /**
     * Меняются скрытые части HUD игрока.
     *
     * Сообщение игры `HideWeapon`.
     *
     * Pawn: `register_message(get_user_msgid("HideWeapon"), ...)`
     */
    hideWeapon: HideWeaponMessage;
    /**
     * Заметка для прокси HLTV, например о начале нового раунда. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `HLTV`.
     *
     * Pawn: `register_message(get_user_msgid("HLTV"), ...)`
     */
    hltv: ClientMessage;
    /**
     * Заложник убит: он пропадает с радара спецназа.
     *
     * Сообщение игры `HostageK`.
     *
     * Pawn: `register_message(get_user_msgid("HostageK"), ...)`
     */
    hostageKilled: HostageKMessage;
    /**
     * Заложник на радаре спецназа.
     *
     * Сообщение игры `HostagePos`.
     *
     * Pawn: `register_message(get_user_msgid("HostagePos"), ...)`
     */
    hostagePosition: HostagePosMessage;
    /**
     * Подсказка посреди экрана игрока.
     *
     * Сообщения игры `HudText`, `HudTextArgs` и `HudTextPro`.
     *
     * Pawn: `register_message(get_user_msgid("HudText"), ...)`, `register_message(get_user_msgid("HudTextArgs"), ...)`, `register_message(get_user_msgid("HudTextPro"), ...)`
     */
    hint: HudTextMessage;
    /**
     * HUD игрока готовится, когда он входит в игру.
     *
     * Сообщение игры `InitHUD`.
     *
     * Pawn: `register_message(get_user_msgid("InitHUD"), ...)`
     */
    initHud: InitHUDMessage;
    /**
     * Игрок подбирает предмет: уведомление сбоку экрана.
     *
     * Сообщение игры `ItemPickup`.
     *
     * Pawn: `register_message(get_user_msgid("ItemPickup"), ...)`
     */
    itemPickup: ItemPickupMessage;
    /**
     * Прибор ночного видения и набор сапёра, которые есть у игрока, для его HUD.
     *
     * Сообщение игры `ItemStatus`.
     *
     * Pawn: `register_message(get_user_msgid("ItemStatus"), ...)`
     */
    itemStatus: ItemStatusMessage;
    /**
     * Место на карте, где находится игрок, как его называет рация.
     *
     * Сообщение игры `Location`.
     *
     * Pawn: `register_message(get_user_msgid("Location"), ...)`
     */
    location: LocationMessage;
    /**
     * Меняются деньги игрока на его HUD.
     *
     * Сообщение игры `Money`.
     *
     * Pawn: `register_message(get_user_msgid("Money"), ...)`
     */
    money: MoneyMessage;
    /**
     * Часть сообщения дня — окна, которое видит вошедший игрок.
     *
     * Сообщение игры `MOTD`.
     *
     * Pawn: `register_message(get_user_msgid("MOTD"), ...)`
     */
    motd: MOTDMessage;
    /**
     * Ночное видение игрока включают или выключают.
     *
     * Сообщение игры `NVGToggle`.
     *
     * Pawn: `register_message(get_user_msgid("NVGToggle"), ...)`
     */
    nightVision: NVGToggleMessage;
    /**
     * Союзник на радаре игрока.
     *
     * Сообщение игры `Radar`.
     *
     * Pawn: `register_message(get_user_msgid("Radar"), ...)`
     */
    radar: RadarMessage;
    /**
     * Погода на карте, дождь или снег, — для клиента игрока. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `ReceiveW`.
     *
     * Pawn: `register_message(get_user_msgid("ReceiveW"), ...)`
     */
    weather: ClientMessage;
    /**
     * Звук перезарядки оружия поблизости — для клиента игрока. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `ReloadSound`.
     *
     * Pawn: `register_message(get_user_msgid("ReloadSound"), ...)`
     */
    reloadSound: ClientMessage;
    /**
     * Игра запрашивает у клиента игрока его состояние — для голоса.
     *
     * Сообщение игры `ReqState`.
     *
     * Pawn: `register_message(get_user_msgid("ReqState"), ...)`
     */
    requestState: ReqStateMessage;
    /**
     * HUD игрока сбрасывается при его появлении.
     *
     * Сообщение игры `ResetHUD`.
     *
     * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
     */
    resetHud: ResetHUDMessage;
    /**
     * Задаются часы раунда вверху HUD игрока.
     *
     * Сообщение игры `RoundTime`.
     *
     * Pawn: `register_message(get_user_msgid("RoundTime"), ...)`
     */
    roundTime: RoundTimeMessage;
    /**
     * Строка чата.
     *
     * Сообщение игры `SayText`.
     *
     * Pawn: `register_message(get_user_msgid("SayText"), ...)`
     */
    chat: SayTextMessage;
    /**
     * Значок сценария на HUD игрока, например бомбы или заложника.
     *
     * Сообщение игры `Scenario`.
     *
     * Pawn: `register_message(get_user_msgid("Scenario"), ...)`
     */
    scenarioIcon: ScenarioMessage;
    /**
     * Отметки, которые таблица счёта показывает рядом с игроком: погиб, бомба, VIP.
     *
     * Сообщение игры `ScoreAttrib`.
     *
     * Pawn: `register_message(get_user_msgid("ScoreAttrib"), ...)`
     */
    scoreAttribute: ScoreAttribMessage;
    /**
     * Строка игрока в таблице счёта.
     *
     * Сообщение игры `ScoreInfo`.
     *
     * Pawn: `register_message(get_user_msgid("ScoreInfo"), ...)`
     */
    score: ScoreInfoMessage;
    /**
     * Экран игрока окрашивается с затуханием — флешка, затемнение.
     *
     * Сообщение игры `ScreenFade`.
     *
     * Pawn: `register_message(get_user_msgid("ScreenFade"), ...)`
     */
    screenFade: ScreenFadeMessage;
    /**
     * Вид игрока трясётся — рядом взрыв.
     *
     * Сообщение игры `ScreenShake`.
     *
     * Pawn: `register_message(get_user_msgid("ScreenShake"), ...)`
     */
    screenShake: ScreenShakeMessage;
    /**
     * Звук, который играет игроку, например фраза рации.
     *
     * Сообщение игры `SendAudio`.
     *
     * Pawn: `register_message(get_user_msgid("SendAudio"), ...)`
     */
    sound: SendAudioMessage;
    /**
     * Имя сервера, которое показывает клиент игрока.
     *
     * Сообщение игры `ServerName`.
     *
     * Pawn: `register_message(get_user_msgid("ServerName"), ...)`
     */
    serverName: ServerNameMessage;
    /**
     * Задаётся поле зрения игрока.
     *
     * Сообщение игры `SetFOV`.
     *
     * Pawn: `register_message(get_user_msgid("SetFOV"), ...)`
     */
    fov: SetFOVMessage;
    /**
     * Спрайт, которым клиент игрока рисует тени игроков. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `ShadowIdx`.
     *
     * Pawn: `register_message(get_user_msgid("ShadowIdx"), ...)`
     */
    shadow: ClientMessage;
    /**
     * Текстовое меню на экране игрока — меню команды без VGUI, рация, меню плагина.
     *
     * Сообщение игры `ShowMenu`.
     *
     * Pawn: `register_message(get_user_msgid("ShowMenu"), ...)`
     */
    menu: ShowMenuMessage;
    /**
     * На HUD игрока появляются часы раунда.
     *
     * Сообщение игры `ShowTimer`.
     *
     * Pawn: `register_message(get_user_msgid("ShowTimer"), ...)`
     */
    showTimer: ShowTimerMessage;
    /**
     * Здоровье игрока, за которым следит наблюдатель.
     *
     * Сообщения игры `SpecHealth` и `SpecHealth2`.
     *
     * Pawn: `register_message(get_user_msgid("SpecHealth"), ...)`, `register_message(get_user_msgid("SpecHealth2"), ...)`
     */
    spectatedHealth: SpecHealthMessage;
    /**
     * Игрок становится наблюдателем или перестаёт им быть — в таблице счёта.
     *
     * Сообщение игры `Spectator`.
     *
     * Pawn: `register_message(get_user_msgid("Spectator"), ...)`
     */
    spectator: SpectatorMessage;
    /**
     * Значок состояния на HUD игрока — зона закупки, бомба — показывается, мигает или прячется.
     *
     * Сообщение игры `StatusIcon`.
     *
     * Pawn: `register_message(get_user_msgid("StatusIcon"), ...)`
     */
    statusIcon: StatusIconMessage;
    /**
     * Строка состояния внизу экрана игрока, например имя игрока, в которого он целится.
     *
     * Сообщение игры `StatusText`.
     *
     * Pawn: `register_message(get_user_msgid("StatusText"), ...)`
     */
    statusText: StatusTextMessage;
    /**
     * Значение, которое показывает строка состояния, например игрок, в которого целится игрок.
     *
     * Сообщение игры `StatusValue`.
     *
     * Pawn: `register_message(get_user_msgid("StatusValue"), ...)`
     */
    statusValue: StatusValueMessage;
    /**
     * Отсчёт задания на HUD игрока, например спасения заложников в карьере.
     *
     * Сообщение игры `TaskTime`.
     *
     * Pawn: `register_message(get_user_msgid("TaskTime"), ...)`
     */
    taskTime: TaskTimeMessage;
    /**
     * Команда игрока в таблице счёта.
     *
     * Сообщение игры `TeamInfo`.
     *
     * Pawn: `register_message(get_user_msgid("TeamInfo"), ...)`
     */
    team: TeamInfoMessage;
    /**
     * Счёт команды в таблице счёта.
     *
     * Сообщение игры `TeamScore`.
     *
     * Pawn: `register_message(get_user_msgid("TeamScore"), ...)`
     */
    teamScore: TeamScoreMessage;
    /**
     * Текст игры — объявление, подсказка — в чате, консоли или посреди экрана.
     *
     * Сообщение игры `TextMsg`.
     *
     * Pawn: `register_message(get_user_msgid("TextMsg"), ...)`
     */
    text: TextMsgMessage;
    /**
     * Скорость поезда, которым управляет игрок, на его HUD.
     *
     * Сообщение игры `Train`.
     *
     * Pawn: `register_message(get_user_msgid("Train"), ...)`
     */
    train: TrainMessage;
    /**
     * Сообщение подсказчика на экране игрока закрывается.
     *
     * Сообщение игры `TutorClose`.
     *
     * Pawn: `register_message(get_user_msgid("TutorClose"), ...)`
     */
    tutorClose: TutorCloseMessage;
    /**
     * Указатель подсказчика на экране игрока — на предмет в мире. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `TutorLine`.
     *
     * Pawn: `register_message(get_user_msgid("TutorLine"), ...)`
     */
    tutorLine: ClientMessage;
    /**
     * Состояние подсказчика на клиенте игрока. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `TutorState`.
     *
     * Pawn: `register_message(get_user_msgid("TutorState"), ...)`
     */
    tutorState: ClientMessage;
    /**
     * Сообщение подсказчика на экране игрока. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `TutorText`.
     *
     * Pawn: `register_message(get_user_msgid("TutorText"), ...)`
     */
    tutorText: ClientMessage;
    /**
     * На экране игрока открывается VGUI-меню игры: меню команды, класса, закупки.
     *
     * Сообщение игры `VGUIMenu`.
     *
     * Pawn: `register_message(get_user_msgid("VGUIMenu"), ...)`
     */
    vguiMenu: VGUIMenuMessage;
    /**
     * Вид игрока возвращается к виду от первого лица.
     *
     * Сообщение игры `ViewMode`.
     *
     * Pawn: `register_message(get_user_msgid("ViewMode"), ...)`
     */
    viewMode: ViewModeMessage;
    /**
     * Игроки, которых игрок слышит в голосовом чате, и те, кого он заглушил. Его аргументы читаются по месту, через `event.args`.
     *
     * Сообщение игры `VoiceMask`.
     *
     * Pawn: `register_message(get_user_msgid("VoiceMask"), ...)`
     */
    voiceMask: ClientMessage;
    /**
     * Описание оружия для клиента игрока: его патроны, слот, место в слоте.
     *
     * Сообщение игры `WeaponList`.
     *
     * Pawn: `register_message(get_user_msgid("WeaponList"), ...)`
     */
    weaponList: WeaponListMessage;
    /**
     * Игрок подбирает оружие: уведомление сбоку экрана.
     *
     * Сообщение игры `WeapPickup`.
     *
     * Pawn: `register_message(get_user_msgid("WeapPickup"), ...)`
     */
    weaponPickup: WeapPickupMessage;
}
/** The game's names of the messages a name server.addMessageListener takes hears; a name it does not know as it is. */
export declare function protocolMessageNames(name: string): string[];
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
