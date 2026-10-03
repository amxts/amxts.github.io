/// <reference path="../as-types.d.ts" />
import { Client, ClientMessage, Player, PlayerChangeEvent, StatusIconState, Team, VariantName } from "./facade";
import { Vector } from "./vector";
import { WeaponKind } from "./entities";
import { Damage, HideHud } from "./flags";
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
 * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после `"putinserver"`.
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
 * Стал известен SteamID игрока. Может прийти до или после `"putinserver"`.
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
     * SteamID игрока, например `"STEAM_0:1:12345"`. У бота — `"BOT"`, у HLTV — `"HLTV"`; на LAN-сервере — `"STEAM_ID_LAN"`.
     *
     * Pawn: `authid[]`
     */
    authid: string;
    constructor(player: Client, authid: string);
}
/**
 * Старая форма `"disconnected"`, которая пропускает часть случаев: используйте `"disconnected"`.
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
    filename: string;
    /**
     * Buffer storing the disconnect reason (can be overwritten)
     *
     * Pawn: `reason[64]`
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
    eventid: number;
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
    constructor(flags: number, entity: number, eventid: number, delay: number, origin: Vector, angles: Vector, fparam1: number, fparam2: number, iparam1: number, iparam2: number, bparam1: number, bparam2: number);
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
/**
 * Игрок подбирает патроны: уведомление сбоку экрана.
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
 * Полосу прогресса посреди экрана игрока показывают или прячут.
 *
 * Pawn: `register_message(get_user_msgid("BarTime"), ...)`
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
}
/**
 * Меняется броня игрока на его HUD.
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
 * Тело погибшего игрока остаётся на земле, чтобы клиенты его нарисовали.
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
     * Игрок, чьё это тело.
     *
     * Pawn: `get_msg_arg_*(12)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * Оружие в руках игрока и его обойма на HUD.
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
     * Виды урона, например `"Fall"`, `"Bullet"`.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get damageType(): Damage[];
    set damageType(value: Damage[]);
}
/**
 * Убийство в правом верхнем углу каждого экрана.
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
 * Меняется здоровье игрока на его HUD.
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
 * Pawn: `register_message(get_user_msgid("HideWeapon"), ...)`
 */
export declare class HideWeaponMessage extends ClientMessage {
    private readonly kind;
    /**
     * Скрытые части, например `"Money"`, `"Timer"`. Присвойте, чтобы изменить.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get flags(): HideHud[];
    set flags(value: HideHud[]);
}
/**
 * Подсказка посреди экрана игрока из собственных текстов игры.
 *
 * Pawn: `register_message(get_user_msgid("HudTextArgs"), ...)`
 */
export declare class HudTextArgsMessage extends ClientMessage {
    private readonly kind;
    /**
     * Текст игры, например `"#Hint_press_buy_to_purchase"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * Игрок подбирает предмет: уведомление сбоку экрана.
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
 * Меняются деньги игрока на его HUD.
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
 * HUD игрока сбрасывается при его появлении.
 *
 * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
 */
export declare class ResetHUDMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Задаются часы раунда вверху HUD игрока.
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
}
/**
 * Строка игрока в таблице счёта.
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
 * Звук, который играет игроку, например фраза рации.
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
 * Задаётся поле зрения игрока.
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
 * Значок состояния на HUD игрока — зона закупки, бомба — показывается, мигает или прячется.
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
}
/**
 * Команда игрока в таблице счёта.
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
     * Имя команды, например `"TERRORIST"`, `"CT"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get team(): string;
    set team(value: string);
}
/**
 * Текст игры — объявление, подсказка — в чате, консоли или посреди экрана.
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
}
/**
 * Игрок подбирает оружие: уведомление сбоку экрана.
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
/** Every event a server raises, by name: the short one and the Pawn one, and every message it sends. */
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
     * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после `"putinserver"`.
     *
     * Pawn: `client_connect`
     */
    connect: ClientConnectEvent;
    /**
     * Игрок начал подключаться. В игре его ещё нет: показывать ему что-то можно после `"putinserver"`.
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
     * Стал известен SteamID игрока. Может прийти до или после `"putinserver"`.
     *
     * Pawn: `client_authorized`
     */
    authorized: ClientAuthorizedEvent;
    /**
     * Стал известен SteamID игрока. Может прийти до или после `"putinserver"`.
     *
     * Pawn: `client_authorized`
     */
    client_authorized: ClientAuthorizedEvent;
    /**
     * Старая форма `"disconnected"`, которая пропускает часть случаев: используйте `"disconnected"`.
     *
     * Pawn: `client_disconnect`
     */
    disconnect: ClientDisconnectEvent;
    /**
     * Старая форма `"disconnected"`, которая пропускает часть случаев: используйте `"disconnected"`.
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
     * Слот игрока освобождается, после `"disconnected"`.
     *
     * Pawn: `client_remove`
     */
    remove: ClientRemoveEvent;
    /**
     * Слот игрока освобождается, после `"disconnected"`.
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
     * Кадр сервера, сотни раз в секунду. Обработчик должен быть очень лёгким, иначе используйте `setInterval`.
     *
     * Pawn: `server_frame`
     */
    frame: ServerFrameEvent;
    /**
     * Кадр сервера, сотни раз в секунду. Обработчик должен быть очень лёгким, иначе используйте `setInterval`.
     *
     * Pawn: `server_frame`
     */
    server_frame: ServerFrameEvent;
    /**
     * Игрок написал `"kill"` в консоли, чтобы убить себя.
     *
     * Pawn: `client_kill`
     */
    kill: ClientKillEvent;
    /**
     * Игрок написал `"kill"` в консоли, чтобы убить себя.
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
     * Игрок отправил impulse: `100` — фонарик, `201` — спрей.
     *
     * Pawn: `client_impulse`
     */
    impulse: ClientImpulseEvent;
    /**
     * Игрок отправил impulse: `100` — фонарик, `201` — спрей.
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
     * Движок проигрывает клиентам событие: выстрел, звук и эффекты оружия.
     *
     * Pawn: `pfn_playbackevent`
     */
    pfnPlaybackevent: PfnPlaybackeventEvent;
    /**
     * Движок проигрывает клиентам событие: выстрел, звук и эффекты оружия.
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
    /** У игрока изменилось поле, которое плагины добавили в `Player`; `{ field: "spawnProtected" }` слушает одно поле. */
    playerchange: PlayerChangeEvent;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ADStop"), ...)`
     */
    "message:ADStop": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("AllowSpec"), ...)`
     */
    "message:AllowSpec": ClientMessage;
    /**
     * Игрок подбирает патроны: уведомление сбоку экрана.
     *
     * Pawn: `register_message(get_user_msgid("AmmoPickup"), ...)`
     */
    "message:AmmoPickup": AmmoPickupMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("AmmoX"), ...)`
     */
    "message:AmmoX": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ArmorType"), ...)`
     */
    "message:ArmorType": ClientMessage;
    /**
     * Полосу прогресса посреди экрана игрока показывают или прячут.
     *
     * Pawn: `register_message(get_user_msgid("BarTime"), ...)`
     */
    "message:BarTime": BarTimeMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BarTime2"), ...)`
     */
    "message:BarTime2": ClientMessage;
    /**
     * Меняется броня игрока на его HUD.
     *
     * Pawn: `register_message(get_user_msgid("Battery"), ...)`
     */
    "message:Battery": BatteryMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BlinkAcct"), ...)`
     */
    "message:BlinkAcct": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BombDrop"), ...)`
     */
    "message:BombDrop": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BombPickup"), ...)`
     */
    "message:BombPickup": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BotProgress"), ...)`
     */
    "message:BotProgress": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BotVoice"), ...)`
     */
    "message:BotVoice": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Brass"), ...)`
     */
    "message:Brass": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BuyClose"), ...)`
     */
    "message:BuyClose": ClientMessage;
    /**
     * Тело погибшего игрока остаётся на земле, чтобы клиенты его нарисовали.
     *
     * Pawn: `register_message(get_user_msgid("ClCorpse"), ...)`
     */
    "message:ClCorpse": ClCorpseMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Crosshair"), ...)`
     */
    "message:Crosshair": ClientMessage;
    /**
     * Оружие в руках игрока и его обойма на HUD.
     *
     * Pawn: `register_message(get_user_msgid("CurWeapon"), ...)`
     */
    "message:CurWeapon": CurWeaponMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("CZCareer"), ...)`
     */
    "message:CZCareer": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("CZCareerHUD"), ...)`
     */
    "message:CZCareerHUD": ClientMessage;
    /**
     * Игроку показывают полученный урон: красные метки сбоку экрана.
     *
     * Pawn: `register_message(get_user_msgid("Damage"), ...)`
     */
    "message:Damage": DamageMessage;
    /**
     * Убийство в правом верхнем углу каждого экрана.
     *
     * Pawn: `register_message(get_user_msgid("DeathMsg"), ...)`
     */
    "message:DeathMsg": DeathMsgMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Flashlight"), ...)`
     */
    "message:Flashlight": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("FlashBat"), ...)`
     */
    "message:FlashBat": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Fog"), ...)`
     */
    "message:Fog": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ForceCam"), ...)`
     */
    "message:ForceCam": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("GameMode"), ...)`
     */
    "message:GameMode": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("GameTitle"), ...)`
     */
    "message:GameTitle": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Geiger"), ...)`
     */
    "message:Geiger": ClientMessage;
    /**
     * Меняется здоровье игрока на его HUD.
     *
     * Pawn: `register_message(get_user_msgid("Health"), ...)`
     */
    "message:Health": HealthMessage;
    /**
     * Меняются скрытые части HUD игрока.
     *
     * Pawn: `register_message(get_user_msgid("HideWeapon"), ...)`
     */
    "message:HideWeapon": HideWeaponMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HLTV"), ...)`
     */
    "message:HLTV": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HostageK"), ...)`
     */
    "message:HostageK": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HostagePos"), ...)`
     */
    "message:HostagePos": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HudText"), ...)`
     */
    "message:HudText": ClientMessage;
    /**
     * Подсказка посреди экрана игрока из собственных текстов игры.
     *
     * Pawn: `register_message(get_user_msgid("HudTextArgs"), ...)`
     */
    "message:HudTextArgs": HudTextArgsMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HudTextPro"), ...)`
     */
    "message:HudTextPro": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("InitHUD"), ...)`
     */
    "message:InitHUD": ClientMessage;
    /**
     * Игрок подбирает предмет: уведомление сбоку экрана.
     *
     * Pawn: `register_message(get_user_msgid("ItemPickup"), ...)`
     */
    "message:ItemPickup": ItemPickupMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ItemStatus"), ...)`
     */
    "message:ItemStatus": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Location"), ...)`
     */
    "message:Location": ClientMessage;
    /**
     * Меняются деньги игрока на его HUD.
     *
     * Pawn: `register_message(get_user_msgid("Money"), ...)`
     */
    "message:Money": MoneyMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("MOTD"), ...)`
     */
    "message:MOTD": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("NVGToggle"), ...)`
     */
    "message:NVGToggle": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Radar"), ...)`
     */
    "message:Radar": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ReceiveW"), ...)`
     */
    "message:ReceiveW": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ReloadSound"), ...)`
     */
    "message:ReloadSound": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ReqState"), ...)`
     */
    "message:ReqState": ClientMessage;
    /**
     * HUD игрока сбрасывается при его появлении.
     *
     * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
     */
    "message:ResetHUD": ResetHUDMessage;
    /**
     * Задаются часы раунда вверху HUD игрока.
     *
     * Pawn: `register_message(get_user_msgid("RoundTime"), ...)`
     */
    "message:RoundTime": RoundTimeMessage;
    /**
     * Строка чата.
     *
     * Pawn: `register_message(get_user_msgid("SayText"), ...)`
     */
    "message:SayText": SayTextMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Scenario"), ...)`
     */
    "message:Scenario": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ScoreAttrib"), ...)`
     */
    "message:ScoreAttrib": ClientMessage;
    /**
     * Строка игрока в таблице счёта.
     *
     * Pawn: `register_message(get_user_msgid("ScoreInfo"), ...)`
     */
    "message:ScoreInfo": ScoreInfoMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ScreenFade"), ...)`
     */
    "message:ScreenFade": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ScreenShake"), ...)`
     */
    "message:ScreenShake": ClientMessage;
    /**
     * Звук, который играет игроку, например фраза рации.
     *
     * Pawn: `register_message(get_user_msgid("SendAudio"), ...)`
     */
    "message:SendAudio": SendAudioMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ServerName"), ...)`
     */
    "message:ServerName": ClientMessage;
    /**
     * Задаётся поле зрения игрока.
     *
     * Pawn: `register_message(get_user_msgid("SetFOV"), ...)`
     */
    "message:SetFOV": SetFOVMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ShadowIdx"), ...)`
     */
    "message:ShadowIdx": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ShowMenu"), ...)`
     */
    "message:ShowMenu": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ShowTimer"), ...)`
     */
    "message:ShowTimer": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("SpecHealth"), ...)`
     */
    "message:SpecHealth": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("SpecHealth2"), ...)`
     */
    "message:SpecHealth2": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Spectator"), ...)`
     */
    "message:Spectator": ClientMessage;
    /**
     * Значок состояния на HUD игрока — зона закупки, бомба — показывается, мигает или прячется.
     *
     * Pawn: `register_message(get_user_msgid("StatusIcon"), ...)`
     */
    "message:StatusIcon": StatusIconMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("StatusText"), ...)`
     */
    "message:StatusText": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("StatusValue"), ...)`
     */
    "message:StatusValue": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TaskTime"), ...)`
     */
    "message:TaskTime": ClientMessage;
    /**
     * Команда игрока в таблице счёта.
     *
     * Pawn: `register_message(get_user_msgid("TeamInfo"), ...)`
     */
    "message:TeamInfo": TeamInfoMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TeamScore"), ...)`
     */
    "message:TeamScore": ClientMessage;
    /**
     * Текст игры — объявление, подсказка — в чате, консоли или посреди экрана.
     *
     * Pawn: `register_message(get_user_msgid("TextMsg"), ...)`
     */
    "message:TextMsg": TextMsgMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Train"), ...)`
     */
    "message:Train": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorClose"), ...)`
     */
    "message:TutorClose": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorLine"), ...)`
     */
    "message:TutorLine": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorState"), ...)`
     */
    "message:TutorState": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorText"), ...)`
     */
    "message:TutorText": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("VGUIMenu"), ...)`
     */
    "message:VGUIMenu": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ViewMode"), ...)`
     */
    "message:ViewMode": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("VoiceMask"), ...)`
     */
    "message:VoiceMask": ClientMessage;
    /**
     * Сообщение, которое сервер шлёт клиентам; его аргументы — `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("WeaponList"), ...)`
     */
    "message:WeaponList": ClientMessage;
    /**
     * Игрок подбирает оружие: уведомление сбоку экрана.
     *
     * Pawn: `register_message(get_user_msgid("WeapPickup"), ...)`
     */
    "message:WeapPickup": WeapPickupMessage;
}
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
