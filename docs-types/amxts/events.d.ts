/// <reference path="../as-types.d.ts" />
import { Client, ClientMessage, FadeDirection, Player, PlayerChangeEvent, StatusIconState, Team, VariantName } from "./facade";
import { Vector } from "./vector";
import { WeaponKind } from "./entities";
import { Damage, HideHud, ScoreStatus } from "./flags";
import { VguiMenu } from "./hooks";
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
 * Pawn: `server_changelevel(map[])`
 */
export declare class ServerChangelevelEvent {
    /**
     * The map the server changes to, e.g. `"de_dust2"`.
     *
     * Pawn: `map[]`
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
 * A player started connecting. The player is not in the game yet: show him anything after `"putinserver"`.
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
 * Pawn: `client_connectex(id, name[], ip[], reason[128])`
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
     * Pawn: `name[]`
     */
    name: string;
    /**
     * The player's address with the port, e.g. `"192.168.0.5:27005"`.
     *
     * Pawn: `ip[]`
     */
    ip: string;
    /**
     * The message the player sees if he is turned away.
     *
     * Pawn: `reason[128]`
     */
    reason: string;
    constructor(player: Client, name: string, ip: string, reason: string);
}
/**
 * A player's SteamID is known. May come before or after `"putinserver"`.
 *
 * Note: A bot's SteamID is `"BOT"`.
 *
 * Pawn: `client_authorized(id, authid[])`
 */
export declare class ClientAuthorizedEvent {
    /**
     * The player the event is about.
     *
     * Pawn: `id`
     */
    player: Client;
    /**
     * The player's SteamID, e.g. `"STEAM_0:1:12345"`. A bot has `"BOT"`, HLTV has `"HLTV"`; on a LAN server it is `"STEAM_ID_LAN"`.
     *
     * Pawn: `authid[]`
     */
    authid: string;
    constructor(player: Client, authid: string);
}
/**
 * Old form of `"disconnected"` that misses some cases: use `"disconnected"`.
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
 * Pawn: `client_disconnected(id, bool:drop, message[], maxlen)`
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
     * Pawn: `message[]`
     */
    reason: string;
    constructor(player: Player, dropped: boolean, reason: string);
}
/**
 * A player's slot is being freed, after `"disconnected"`.
 *
 * Note: This fires after the client_disconnected() forward, when the player entity has been removed (e.g. is_user_connected(id) will return false).
 *
 * Pawn: `client_remove(id, bool:drop, message[])`
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
     * Pawn: `message[]`
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
 * Pawn: `inconsistent_file(id, filename[], reason[64])`
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
 * Pawn: `CS_InternalCommand(id, cmd[])`
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
     * Pawn: `cmd[]`
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
 * A server frame, hundreds of times a second. Keep the listener tiny, or use `setInterval`.
 *
 * Note: Using his forward can easily become performance-critical. More specific hooks and forwards should be used whenever possible.
 *
 * Pawn: `server_frame()`
 */
export declare class ServerFrameEvent {
}
/**
 * A player typed `"kill"` in the console to kill himself.
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
 * A player sent an impulse: `100` is the flashlight, `201` the spray.
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
     * The impulse number: `100`, `201`.
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
 * The engine plays an event to the clients: a shot, a weapon's sound and effects.
 *
 * Pawn: `pfn_playbackevent(flags, entid, eventid, Float:delay, Float:Origin[3], Float:Angles[3], Float:fparam1, Float:fparam2, iparam1, iparam2, bparam1, bparam2)`
 */
export declare class PfnPlaybackeventEvent {
    /**
     * The event's flags, how the engine sends it.
     *
     * Pawn: `flags`
     */
    flags: number;
    /**
     * The entity the event plays on, usually the player who fired.
     *
     * Pawn: `entid`
     */
    entity: number;
    /**
     * The event's index in the precached events.
     *
     * Pawn: `eventid`
     */
    eventid: number;
    /**
     * The seconds before the event plays.
     *
     * Pawn: `Float:delay`
     */
    delay: number;
    /**
     * The point the event plays from.
     *
     * Pawn: `Float:Origin[3]`
     */
    origin: Vector;
    /**
     * The angles the event plays with.
     *
     * Pawn: `Float:Angles[3]`
     */
    angles: Vector;
    /**
     * The event's first fractional parameter.
     *
     * Pawn: `Float:fparam1`
     */
    fparam1: number;
    /**
     * The event's second fractional parameter.
     *
     * Pawn: `Float:fparam2`
     */
    fparam2: number;
    /**
     * The event's first whole-number parameter.
     *
     * Pawn: `iparam1`
     */
    iparam1: number;
    /**
     * The event's second whole-number parameter.
     *
     * Pawn: `iparam2`
     */
    iparam2: number;
    /**
     * The event's first flag parameter, `1` or `0`.
     *
     * Pawn: `bparam1`
     */
    bparam1: number;
    /**
     * The event's second flag parameter, `1` or `0`.
     *
     * Pawn: `bparam2`
     */
    bparam2: number;
    constructor(flags: number, entity: number, eventid: number, delay: number, origin: Vector, angles: Vector, fparam1: number, fparam2: number, iparam1: number, iparam2: number, bparam1: number, bparam2: number);
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
/**
 * A player's HUD stops showing the round's advertisement.
 *
 * The game's `ADStop` message.
 *
 * Pawn: `register_message(get_user_msgid("ADStop"), ...)`
 */
export declare class ADStopMessage extends ClientMessage {
    private readonly kind;
}
/**
 * Whether a player may pick Spectate in the team menu.
 *
 * The game's `AllowSpec` message.
 *
 * Pawn: `register_message(get_user_msgid("AllowSpec"), ...)`
 */
export declare class AllowSpecMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` when the menu offers it.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get allowed(): boolean;
    set allowed(value: boolean);
}
/**
 * A player picks up ammo: the notice at the side of his screen.
 *
 * The game's `AmmoPickup` message.
 *
 * Pawn: `register_message(get_user_msgid("AmmoPickup"), ...)`
 */
export declare class AmmoPickupMessage extends ClientMessage {
    private readonly kind;
    /**
     * The ammo's index in the game's list of kinds.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get ammo(): number;
    set ammo(value: number);
    /**
     * The amount picked up.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get amount(): number;
    set amount(value: number);
}
/**
 * A player's reserve ammo of one kind on his HUD changes.
 *
 * The game's `AmmoX` message.
 *
 * Pawn: `register_message(get_user_msgid("AmmoX"), ...)`
 */
export declare class AmmoXMessage extends ClientMessage {
    private readonly kind;
    /**
     * The ammo's index in the game's list of kinds.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get ammo(): number;
    set ammo(value: number);
    /**
     * The reserve shown.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get amount(): number;
    set amount(value: number);
}
/**
 * The armour icon on a player's HUD: a vest, or a vest and a helmet.
 *
 * The game's `ArmorType` message.
 *
 * Pawn: `register_message(get_user_msgid("ArmorType"), ...)`
 */
export declare class ArmorTypeMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` for a vest and a helmet.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get helmet(): boolean;
    set helmet(value: boolean);
}
/**
 * The progress bar in the middle of a player's screen is shown or hidden.
 *
 * The game's `BarTime` message.
 *
 * Pawn: `register_message(get_user_msgid("BarTime"), ...)`
 */
export declare class BarTimeMessage extends ClientMessage {
    private readonly kind;
    /**
     * The seconds the bar or the clock shows. Assign to change them.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get seconds(): number;
    set seconds(value: number);
}
/**
 * The progress bar in the middle of a player's screen, starting part of the way full.
 *
 * The game's `BarTime2` message.
 *
 * Pawn: `register_message(get_user_msgid("BarTime2"), ...)`
 */
export declare class BarTime2Message extends ClientMessage {
    private readonly kind;
    /**
     * The seconds the bar or the clock shows. Assign to change them.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get seconds(): number;
    set seconds(value: number);
    /**
     * The bar's fill at the start, in percent.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get startPercent(): number;
    set startPercent(value: number);
}
/**
 * A player's armour on his HUD changes.
 *
 * The game's `Battery` message.
 *
 * Pawn: `register_message(get_user_msgid("Battery"), ...)`
 */
export declare class BatteryMessage extends ClientMessage {
    private readonly kind;
    /**
     * The armour shown.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get armor(): number;
    set armor(value: number);
}
/**
 * A player's money on his HUD blinks: he cannot afford what he tried to buy.
 *
 * The game's `BlinkAcct` message.
 *
 * Pawn: `register_message(get_user_msgid("BlinkAcct"), ...)`
 */
export declare class BlinkAcctMessage extends ClientMessage {
    private readonly kind;
    /**
     * The number of blinks.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get blinks(): number;
    set blinks(value: number);
}
/**
 * The bomb on the terrorists' radar: dropped or planted.
 *
 * The game's `BombDrop` message.
 *
 * Pawn: `register_message(get_user_msgid("BombDrop"), ...)`
 */
export declare class BombDropMessage extends ClientMessage {
    private readonly kind;
    /**
     * The point where the bomb lies.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get origin(): Vector;
    set origin(value: number[]);
    /**
     * `true` for a bomb planted, `false` for one dropped.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get planted(): boolean;
    set planted(value: boolean);
}
/**
 * The bomb is picked up: it leaves the terrorists' radar.
 *
 * The game's `BombPickup` message.
 *
 * Pawn: `register_message(get_user_msgid("BombPickup"), ...)`
 */
export declare class BombPickupMessage extends ClientMessage {
    private readonly kind;
}
/**
 * The voice icon over a bot who talks on the radio.
 *
 * The game's `BotVoice` message.
 *
 * Pawn: `register_message(get_user_msgid("BotVoice"), ...)`
 */
export declare class BotVoiceMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` while the bot talks.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get talking(): boolean;
    set talking(value: boolean);
    /**
     * The bot who talks.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * A player's buy menu is closed.
 *
 * The game's `BuyClose` message.
 *
 * Pawn: `register_message(get_user_msgid("BuyClose"), ...)`
 */
export declare class BuyCloseMessage extends ClientMessage {
    private readonly kind;
}
/**
 * A dead player's body is left on the ground for the clients to draw.
 *
 * The game's `ClCorpse` message.
 *
 * Pawn: `register_message(get_user_msgid("ClCorpse"), ...)`
 */
export declare class ClCorpseMessage extends ClientMessage {
    private readonly kind;
    /**
     * The body's model, e.g. `"sas"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get model(): string;
    set model(value: string);
    /**
     * The team of the player whose body it is.
     *
     * Pawn: `get_msg_arg_*(11)`
     */
    get team(): Team;
    set team(value: Team);
    /**
     * The player whose body it is.
     *
     * Pawn: `get_msg_arg_*(12)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * Counter-Strike's own crosshair on a player's screen is shown or hidden.
 *
 * The game's `Crosshair` message.
 *
 * Pawn: `register_message(get_user_msgid("Crosshair"), ...)`
 */
export declare class CrosshairMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` to show it.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get shown(): boolean;
    set shown(value: boolean);
}
/**
 * The weapon in a player's hands and its clip on his HUD.
 *
 * The game's `CurWeapon` message.
 *
 * Pawn: `register_message(get_user_msgid("CurWeapon"), ...)`
 */
export declare class CurWeaponMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` for the weapon in his hands.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * The weapon, by its kind, e.g. `"ak47"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
    /**
     * The rounds in the clip.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get clip(): number;
    set clip(value: number);
}
/**
 * A player is shown the damage he took: the red marks at the side of his screen.
 *
 * The game's `Damage` message.
 *
 * Pawn: `register_message(get_user_msgid("Damage"), ...)`
 */
export declare class DamageMessage extends ClientMessage {
    private readonly kind;
    /**
     * The armour he lost.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get armor(): number;
    set armor(value: number);
    /**
     * The health he lost.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * The kinds of damage, e.g. `"Fall"`, `"Bullet"`.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get damageType(): Damage[];
    set damageType(value: Damage[]);
    /**
     * The point the damage came from: the marks point to it.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get origin(): Vector;
    set origin(value: number[]);
}
/**
 * A kill in the top right corner of every screen.
 *
 * The game's `DeathMsg` message.
 *
 * Pawn: `register_message(get_user_msgid("DeathMsg"), ...)`
 */
export declare class DeathMsgMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player who killed; `null` for the world.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get killer(): Player | null;
    set killer(value: Player | null);
    /**
     * The player who died.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get victim(): Player | null;
    set victim(value: Player | null);
    /**
     * `true` for a headshot.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get headshot(): boolean;
    set headshot(value: boolean);
    /**
     * The weapon's name as the icon shows it, e.g. `"ak47"`, `"grenade"`.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get weapon(): string;
    set weapon(value: string);
}
/**
 * The flashlight icon on a player's HUD: on or off, and its battery.
 *
 * The game's `Flashlight` message.
 *
 * Pawn: `register_message(get_user_msgid("Flashlight"), ...)`
 */
export declare class FlashlightMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` while the flashlight is on.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get on(): boolean;
    set on(value: boolean);
    /**
     * The flashlight's battery, in percent.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get battery(): number;
    set battery(value: number);
}
/**
 * The flashlight's battery on a player's HUD changes.
 *
 * The game's `FlashBat` message.
 *
 * Pawn: `register_message(get_user_msgid("FlashBat"), ...)`
 */
export declare class FlashBatMessage extends ClientMessage {
    private readonly kind;
    /**
     * The flashlight's battery, in percent.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get battery(): number;
    set battery(value: number);
}
/**
 * The Geiger counter's clicks a player hears near radiation.
 *
 * The game's `Geiger` message.
 *
 * Pawn: `register_message(get_user_msgid("Geiger"), ...)`
 */
export declare class GeigerMessage extends ClientMessage {
    private readonly kind;
    /**
     * The distance to the radiation: the less, the faster the clicks.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get range(): number;
    set range(value: number);
}
/**
 * A player's health on his HUD changes.
 *
 * The game's `Health` message.
 *
 * Pawn: `register_message(get_user_msgid("Health"), ...)`
 */
export declare class HealthMessage extends ClientMessage {
    private readonly kind;
    /**
     * The health shown.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get health(): number;
    set health(value: number);
}
/**
 * The parts of a player's HUD that are hidden change.
 *
 * The game's `HideWeapon` message.
 *
 * Pawn: `register_message(get_user_msgid("HideWeapon"), ...)`
 */
export declare class HideWeaponMessage extends ClientMessage {
    private readonly kind;
    /**
     * The hidden parts, e.g. `"Money"`, `"Timer"`. Assign to change them.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get flags(): HideHud[];
    set flags(value: HideHud[]);
}
/**
 * A hostage is killed: it leaves the counter-terrorists' radar.
 *
 * The game's `HostageK` message.
 *
 * Pawn: `register_message(get_user_msgid("HostageK"), ...)`
 */
export declare class HostageKMessage extends ClientMessage {
    private readonly kind;
    /**
     * The hostage's number on the map, from `1`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get hostage(): number;
    set hostage(value: number);
}
/**
 * A hostage on the counter-terrorists' radar.
 *
 * The game's `HostagePos` message.
 *
 * Pawn: `register_message(get_user_msgid("HostagePos"), ...)`
 */
export declare class HostagePosMessage extends ClientMessage {
    private readonly kind;
    /**
     * The hostage's number on the map, from `1`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get hostage(): number;
    set hostage(value: number);
    /**
     * The point where the hostage is.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get origin(): Vector;
    set origin(value: number[]);
}
/**
 * A hint in the middle of a player's screen.
 *
 * The game's `HudText` message.
 *
 * Pawn: `register_message(get_user_msgid("HudText"), ...)`
 */
export declare class HudTextMessage extends ClientMessage {
    private readonly kind;
    /**
     * The text, or the game's own for it, e.g. `"#Hint_press_buy_to_purchase"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * A hint in the middle of a player's screen, from the game's own texts.
 *
 * The game's `HudTextArgs` message.
 *
 * Pawn: `register_message(get_user_msgid("HudTextArgs"), ...)`
 */
export declare class HudTextArgsMessage extends ClientMessage {
    private readonly kind;
    /**
     * The text, or the game's own for it, e.g. `"#Hint_press_buy_to_purchase"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get text(): string;
    set text(value: string);
    /**
     * The texts put into the game's text in place of `%s1`, `%s2`, ... - e.g. a player's name. Assign to change them; their number stays.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get params(): string[];
    set params(value: string[]);
}
/**
 * A hint in the middle of a player's screen, for a player new to the game.
 *
 * The game's `HudTextPro` message.
 *
 * Pawn: `register_message(get_user_msgid("HudTextPro"), ...)`
 */
export declare class HudTextProMessage extends ClientMessage {
    private readonly kind;
    /**
     * The text, or the game's own for it, e.g. `"#Hint_press_buy_to_purchase"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * A player's HUD is set up, when he enters the game.
 *
 * The game's `InitHUD` message.
 *
 * Pawn: `register_message(get_user_msgid("InitHUD"), ...)`
 */
export declare class InitHUDMessage extends ClientMessage {
    private readonly kind;
}
/**
 * A player picks up an item: the notice at the side of his screen.
 *
 * The game's `ItemPickup` message.
 *
 * Pawn: `register_message(get_user_msgid("ItemPickup"), ...)`
 */
export declare class ItemPickupMessage extends ClientMessage {
    private readonly kind;
    /**
     * The item's class name, e.g. `"item_kevlar"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get item(): string;
    set item(value: string);
}
/**
 * The night vision and the defuse kit a player has, for his HUD.
 *
 * The game's `ItemStatus` message.
 *
 * Pawn: `register_message(get_user_msgid("ItemStatus"), ...)`
 */
export declare class ItemStatusMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` when the player has night vision.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get nightVision(): boolean;
    set nightVision(value: boolean);
    /**
     * `true` when the player has a defuse kit.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get defuseKit(): boolean;
    set defuseKit(value: boolean);
}
/**
 * The place on the map a player is in, as the radio names it.
 *
 * The game's `Location` message.
 *
 * Pawn: `register_message(get_user_msgid("Location"), ...)`
 */
export declare class LocationMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player whose place it is.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * The place's name, e.g. `"BombsiteA"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get place(): string;
    set place(value: string);
}
/**
 * A player's money on his HUD changes.
 *
 * The game's `Money` message.
 *
 * Pawn: `register_message(get_user_msgid("Money"), ...)`
 */
export declare class MoneyMessage extends ClientMessage {
    private readonly kind;
    /**
     * The money shown.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get amount(): number;
    set amount(value: number);
    /**
     * `true` to flash the change.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get flash(): boolean;
    set flash(value: boolean);
}
/**
 * A part of the message of the day, the window a joining player sees.
 *
 * The game's `MOTD` message.
 *
 * Pawn: `register_message(get_user_msgid("MOTD"), ...)`
 */
export declare class MOTDMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` for the last part: the window opens.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get last(): boolean;
    set last(value: boolean);
    /**
     * The part's text.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * A player's night vision is turned on or off.
 *
 * The game's `NVGToggle` message.
 *
 * Pawn: `register_message(get_user_msgid("NVGToggle"), ...)`
 */
export declare class NVGToggleMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` while night vision is on.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get on(): boolean;
    set on(value: boolean);
}
/**
 * A teammate on a player's radar.
 *
 * The game's `Radar` message.
 *
 * Pawn: `register_message(get_user_msgid("Radar"), ...)`
 */
export declare class RadarMessage extends ClientMessage {
    private readonly kind;
    /**
     * The teammate shown.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * The point where the teammate is.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get origin(): Vector;
    set origin(value: number[]);
}
/**
 * The game asks a player's client for its state, for the voice.
 *
 * The game's `ReqState` message.
 *
 * Pawn: `register_message(get_user_msgid("ReqState"), ...)`
 */
export declare class ReqStateMessage extends ClientMessage {
    private readonly kind;
}
/**
 * A player's HUD is reset, at his spawn.
 *
 * The game's `ResetHUD` message.
 *
 * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
 */
export declare class ResetHUDMessage extends ClientMessage {
    private readonly kind;
}
/**
 * The round clock at the top of a player's HUD is set.
 *
 * The game's `RoundTime` message.
 *
 * Pawn: `register_message(get_user_msgid("RoundTime"), ...)`
 */
export declare class RoundTimeMessage extends ClientMessage {
    private readonly kind;
    /**
     * The seconds the bar or the clock shows. Assign to change them.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get seconds(): number;
    set seconds(value: number);
}
/**
 * A chat line.
 *
 * The game's `SayText` message.
 *
 * Pawn: `register_message(get_user_msgid("SayText"), ...)`
 */
export declare class SayTextMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player who wrote it; `null` for the server.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get sender(): Player | null;
    set sender(value: Player | null);
    /**
     * The line, or the game's format for it, e.g. `"#Cstrike_Chat_All"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
    /**
     * The texts put into the game's text in place of `%s1`, `%s2`, ... - e.g. a player's name. Assign to change them; their number stays.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get params(): string[];
    set params(value: string[]);
}
/**
 * The scenario icon on a player's HUD, such as the bomb's or a hostage's.
 *
 * The game's `Scenario` message.
 *
 * Pawn: `register_message(get_user_msgid("Scenario"), ...)`
 */
export declare class ScenarioMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` while the icon is shown.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * The icon's sprite name, e.g. `"hostage1"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get sprite(): string;
    set sprite(value: string);
    /**
     * The icon's opacity, `0` to `255`.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get alpha(): number;
    set alpha(value: number);
}
/**
 * The marks the scoreboard shows beside a player: dead, the bomb, the VIP.
 *
 * The game's `ScoreAttrib` message.
 *
 * Pawn: `register_message(get_user_msgid("ScoreAttrib"), ...)`
 */
export declare class ScoreAttribMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player whose row it is.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * The marks on the row, e.g. `"Dead"`, `"Bomb"`, `"Vip"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get flags(): ScoreStatus[];
    set flags(value: ScoreStatus[]);
}
/**
 * A player's row on the scoreboard.
 *
 * The game's `ScoreInfo` message.
 *
 * Pawn: `register_message(get_user_msgid("ScoreInfo"), ...)`
 */
export declare class ScoreInfoMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player whose row it is.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * The frags shown.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get frags(): number;
    set frags(value: number);
    /**
     * The deaths shown.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get deaths(): number;
    set deaths(value: number);
    /**
     * The team the row is under.
     *
     * Pawn: `get_msg_arg_*(5)`
     */
    get team(): Team;
    set team(value: Team);
}
/**
 * A player's screen is coloured, fading in or out - a flashbang, a fade to black.
 *
 * The game's `ScreenFade` message.
 *
 * Pawn: `register_message(get_user_msgid("ScreenFade"), ...)`
 */
export declare class ScreenFadeMessage extends ClientMessage {
    private readonly kind;
    /**
     * The fade's duration, in seconds.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get duration(): number;
    set duration(value: number);
    /**
     * The time the full colour holds, in seconds.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get hold(): number;
    set hold(value: number);
    /**
     * One of `"in"`, from the colour to a clear view, or `"out"`, from a clear view to the colour.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get direction(): FadeDirection;
    set direction(value: FadeDirection);
    /**
     * `true` when the colour tints the screen rather than painting over it.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get modulate(): boolean;
    set modulate(value: boolean);
    /**
     * `true` when the colour stays until the next fade.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get stay(): boolean;
    set stay(value: boolean);
    /**
     * The colour: red, green, blue and alpha, `0` to `255` each.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get color(): number[];
    set color(value: number[]);
}
/**
 * A player's view shakes - an explosion nearby.
 *
 * The game's `ScreenShake` message.
 *
 * Pawn: `register_message(get_user_msgid("ScreenShake"), ...)`
 */
export declare class ScreenShakeMessage extends ClientMessage {
    private readonly kind;
    /**
     * The shake's strength: how far the view moves, up to 16 units.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get amplitude(): number;
    set amplitude(value: number);
    /**
     * The shake's duration, in seconds.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get duration(): number;
    set duration(value: number);
    /**
     * The shake's frequency, in jolts a second.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get frequency(): number;
    set frequency(value: number);
}
/**
 * A sound played to a player, such as a radio line.
 *
 * The game's `SendAudio` message.
 *
 * Pawn: `register_message(get_user_msgid("SendAudio"), ...)`
 */
export declare class SendAudioMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player the sound is from; `null` for none.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get sender(): Player | null;
    set sender(value: Player | null);
    /**
     * The sound, e.g. `"%!MRAD_GO"` for a radio line.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get sound(): string;
    set sound(value: string);
    /**
     * The pitch in percent, `100` as recorded.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get pitch(): number;
    set pitch(value: number);
}
/**
 * The server's name a player's client shows.
 *
 * The game's `ServerName` message.
 *
 * Pawn: `register_message(get_user_msgid("ServerName"), ...)`
 */
export declare class ServerNameMessage extends ClientMessage {
    private readonly kind;
    /**
     * The server's name, as `hostname` sets it.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get serverName(): string;
    set serverName(value: string);
}
/**
 * A player's field of view is set.
 *
 * The game's `SetFOV` message.
 *
 * Pawn: `register_message(get_user_msgid("SetFOV"), ...)`
 */
export declare class SetFOVMessage extends ClientMessage {
    private readonly kind;
    /**
     * The field of view, in degrees.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get fov(): number;
    set fov(value: number);
}
/**
 * A text menu on a player's screen - the team menu without VGUI, the radio, a plugin's menu.
 *
 * The game's `ShowMenu` message.
 *
 * Pawn: `register_message(get_user_msgid("ShowMenu"), ...)`
 */
export declare class ShowMenuMessage extends ClientMessage {
    private readonly kind;
    /**
     * `true` when more of the menu's text follows in the next message.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get more(): boolean;
    set more(value: boolean);
    /**
     * The menu's text, or the game's own for it, e.g. `"#Team_Select"`.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * The round clock appears on a player's HUD.
 *
 * The game's `ShowTimer` message.
 *
 * Pawn: `register_message(get_user_msgid("ShowTimer"), ...)`
 */
export declare class ShowTimerMessage extends ClientMessage {
    private readonly kind;
}
/**
 * The health of the player a spectator watches.
 *
 * The game's `SpecHealth` message.
 *
 * Pawn: `register_message(get_user_msgid("SpecHealth"), ...)`
 */
export declare class SpecHealthMessage extends ClientMessage {
    private readonly kind;
    /**
     * The health shown.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get health(): number;
    set health(value: number);
}
/**
 * The health of the player a spectator watches, and who it is.
 *
 * The game's `SpecHealth2` message.
 *
 * Pawn: `register_message(get_user_msgid("SpecHealth2"), ...)`
 */
export declare class SpecHealth2Message extends ClientMessage {
    private readonly kind;
    /**
     * The health shown.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get health(): number;
    set health(value: number);
    /**
     * The player watched.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * A player becomes a spectator, or stops being one, on the scoreboard.
 *
 * The game's `Spectator` message.
 *
 * Pawn: `register_message(get_user_msgid("Spectator"), ...)`
 */
export declare class SpectatorMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * `true` while the player spectates.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get spectator(): boolean;
    set spectator(value: boolean);
}
/**
 * A status icon on a player's HUD - the buy zone, the bomb - is shown, flashed or hidden.
 *
 * The game's `StatusIcon` message.
 *
 * Pawn: `register_message(get_user_msgid("StatusIcon"), ...)`
 */
export declare class StatusIconMessage extends ClientMessage {
    private readonly kind;
    /**
     * One of `"hide"`, `"show"` or `"flash"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get state(): StatusIconState;
    set state(value: StatusIconState);
    /**
     * The icon's sprite name, e.g. `"buyzone"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get sprite(): string;
    set sprite(value: string);
    /**
     * The icon's colour: red, green and blue, `0` to `255` each; empty when it is hidden.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get color(): number[];
    set color(value: number[]);
}
/**
 * The status line at the bottom of a player's screen, such as the name of the player he aims at.
 *
 * The game's `StatusText` message.
 *
 * Pawn: `register_message(get_user_msgid("StatusText"), ...)`
 */
export declare class StatusTextMessage extends ClientMessage {
    private readonly kind;
    /**
     * The status line's number, from `0`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get line(): number;
    set line(value: number);
    /**
     * The line's text, or its format, e.g. `"1 %c1: %p2"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * A value the status line shows, such as the player a player aims at.
 *
 * The game's `StatusValue` message.
 *
 * Pawn: `register_message(get_user_msgid("StatusValue"), ...)`
 */
export declare class StatusValueMessage extends ClientMessage {
    private readonly kind;
    /**
     * The value's number in the line's format: `1` a team, `2` a player, `3` health.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get slot(): number;
    set slot(value: number);
    /**
     * The value.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get value(): number;
    set value(value: number);
}
/**
 * The countdown of a task on a player's HUD, such as rescuing the hostages in a career.
 *
 * The game's `TaskTime` message.
 *
 * Pawn: `register_message(get_user_msgid("TaskTime"), ...)`
 */
export declare class TaskTimeMessage extends ClientMessage {
    private readonly kind;
    /**
     * The seconds left.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get seconds(): number;
    set seconds(value: number);
    /**
     * `true` while the clock runs.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get active(): boolean;
    set active(value: boolean);
    /**
     * The seconds the clock takes to fade out.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get fade(): number;
    set fade(value: number);
}
/**
 * A player's team on the scoreboard.
 *
 * The game's `TeamInfo` message.
 *
 * Pawn: `register_message(get_user_msgid("TeamInfo"), ...)`
 */
export declare class TeamInfoMessage extends ClientMessage {
    private readonly kind;
    /**
     * The player whose team it is.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get target(): Player | null;
    set target(value: Player | null);
    /**
     * The team, e.g. `"TERRORIST"`, `"CT"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get team(): Team;
    set team(value: Team);
}
/**
 * A team's score on the scoreboard.
 *
 * The game's `TeamScore` message.
 *
 * Pawn: `register_message(get_user_msgid("TeamScore"), ...)`
 */
export declare class TeamScoreMessage extends ClientMessage {
    private readonly kind;
    /**
     * The team, `"TERRORIST"` or `"CT"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get team(): Team;
    set team(value: Team);
    /**
     * The rounds the team has won.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get score(): number;
    set score(value: number);
}
/**
 * A text from the game - an announcement, a hint - in chat, the console or the middle of the screen.
 *
 * The game's `TextMsg` message.
 *
 * Pawn: `register_message(get_user_msgid("TextMsg"), ...)`
 */
export declare class TextMsgMessage extends ClientMessage {
    private readonly kind;
    /**
     * The place it shows, one of `"chat"`, `"center"`, `"console"` or `"notify"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get destination(): VariantName;
    set destination(value: VariantName);
    /**
     * The text, or the game's own for it, e.g. `"#Round_Draw"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get text(): string;
    set text(value: string);
    /**
     * The texts put into the game's text in place of `%s1`, `%s2`, ... - e.g. a player's name. Assign to change them; their number stays.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get params(): string[];
    set params(value: string[]);
}
/**
 * The speed of the train a player drives, on his HUD.
 *
 * The game's `Train` message.
 *
 * Pawn: `register_message(get_user_msgid("Train"), ...)`
 */
export declare class TrainMessage extends ClientMessage {
    private readonly kind;
    /**
     * The speed step, `0` for none.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get speed(): number;
    set speed(value: number);
}
/**
 * A tutor's message on a player's screen closes.
 *
 * The game's `TutorClose` message.
 *
 * Pawn: `register_message(get_user_msgid("TutorClose"), ...)`
 */
export declare class TutorCloseMessage extends ClientMessage {
    private readonly kind;
}
/**
 * A VGUI menu of the game opens on a player's screen: the team menu, the class menu, the buy menu.
 *
 * The game's `VGUIMenu` message.
 *
 * Pawn: `register_message(get_user_msgid("VGUIMenu"), ...)`
 */
export declare class VGUIMenuMessage extends ClientMessage {
    private readonly kind;
    /**
     * The menu, e.g. `"team"`, `"classT"`, `"buy"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get menu(): VguiMenu;
    set menu(value: VguiMenu);
}
/**
 * A player's view goes back to first person.
 *
 * The game's `ViewMode` message.
 *
 * Pawn: `register_message(get_user_msgid("ViewMode"), ...)`
 */
export declare class ViewModeMessage extends ClientMessage {
    private readonly kind;
}
/**
 * A weapon's description for a player's client: its ammo, its slot, its place in the slot.
 *
 * The game's `WeaponList` message.
 *
 * Pawn: `register_message(get_user_msgid("WeaponList"), ...)`
 */
export declare class WeaponListMessage extends ClientMessage {
    private readonly kind;
    /**
     * The weapon's class name, e.g. `"weapon_ak47"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get classname(): string;
    set classname(value: string);
    /**
     * The index of the weapon's ammo in the game's list of kinds.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get ammo(): number;
    set ammo(value: number);
    /**
     * The most of that ammo a player carries.
     *
     * Pawn: `get_msg_arg_*(3)`
     */
    get maxAmmo(): number;
    set maxAmmo(value: number);
    /**
     * The index of the weapon's second ammo, `-1` for none.
     *
     * Pawn: `get_msg_arg_*(4)`
     */
    get ammo2(): number;
    set ammo2(value: number);
    /**
     * The most of the second ammo a player carries.
     *
     * Pawn: `get_msg_arg_*(5)`
     */
    get maxAmmo2(): number;
    set maxAmmo2(value: number);
    /**
     * The slot the weapon is in, from `0`.
     *
     * Pawn: `get_msg_arg_*(6)`
     */
    get slot(): number;
    set slot(value: number);
    /**
     * The weapon's place in the slot, from `0`.
     *
     * Pawn: `get_msg_arg_*(7)`
     */
    get position(): number;
    set position(value: number);
    /**
     * The weapon, by its kind, e.g. `"ak47"`.
     *
     * Pawn: `get_msg_arg_*(8)`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
}
/**
 * A player picks up a weapon: the notice at the side of his screen.
 *
 * The game's `WeapPickup` message.
 *
 * Pawn: `register_message(get_user_msgid("WeapPickup"), ...)`
 */
export declare class WeapPickupMessage extends ClientMessage {
    private readonly kind;
    /**
     * The weapon, by its kind, e.g. `"knife"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
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
     * A player started connecting. The player is not in the game yet: show him anything after `"putinserver"`.
     *
     * Pawn: `client_connect`
     */
    connect: ClientConnectEvent;
    /**
     * A player started connecting. The player is not in the game yet: show him anything after `"putinserver"`.
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
     * A player's SteamID is known. May come before or after `"putinserver"`.
     *
     * Pawn: `client_authorized`
     */
    authorized: ClientAuthorizedEvent;
    /**
     * A player's SteamID is known. May come before or after `"putinserver"`.
     *
     * Pawn: `client_authorized`
     */
    client_authorized: ClientAuthorizedEvent;
    /**
     * Old form of `"disconnected"` that misses some cases: use `"disconnected"`.
     *
     * Pawn: `client_disconnect`
     */
    disconnect: ClientDisconnectEvent;
    /**
     * Old form of `"disconnected"` that misses some cases: use `"disconnected"`.
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
     * A player's slot is being freed, after `"disconnected"`.
     *
     * Pawn: `client_remove`
     */
    remove: ClientRemoveEvent;
    /**
     * A player's slot is being freed, after `"disconnected"`.
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
     * A server frame, hundreds of times a second. Keep the listener tiny, or use `setInterval`.
     *
     * Pawn: `server_frame`
     */
    frame: ServerFrameEvent;
    /**
     * A server frame, hundreds of times a second. Keep the listener tiny, or use `setInterval`.
     *
     * Pawn: `server_frame`
     */
    server_frame: ServerFrameEvent;
    /**
     * A player typed `"kill"` in the console to kill himself.
     *
     * Pawn: `client_kill`
     */
    kill: ClientKillEvent;
    /**
     * A player typed `"kill"` in the console to kill himself.
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
     * A player sent an impulse: `100` is the flashlight, `201` the spray.
     *
     * Pawn: `client_impulse`
     */
    impulse: ClientImpulseEvent;
    /**
     * A player sent an impulse: `100` is the flashlight, `201` the spray.
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
     * The engine plays an event to the clients: a shot, a weapon's sound and effects.
     *
     * Pawn: `pfn_playbackevent`
     */
    pfnPlaybackevent: PfnPlaybackeventEvent;
    /**
     * The engine plays an event to the clients: a shot, a weapon's sound and effects.
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
    /** A field plugins added to `Player` changed on a player; `{ field: "spawnProtected" }` hears one field. */
    playerchange: PlayerChangeEvent;
}
/** Every message the server sends its clients, by the name server.addMessageListener takes. */
export interface ServerMessageMap {
    /**
     * A player's HUD stops showing the round's advertisement.
     *
     * The game's `ADStop` message.
     *
     * Pawn: `register_message(get_user_msgid("ADStop"), ...)`
     */
    adStop: ADStopMessage;
    /**
     * Whether a player may pick Spectate in the team menu.
     *
     * The game's `AllowSpec` message.
     *
     * Pawn: `register_message(get_user_msgid("AllowSpec"), ...)`
     */
    allowSpectate: AllowSpecMessage;
    /**
     * A player picks up ammo: the notice at the side of his screen.
     *
     * The game's `AmmoPickup` message.
     *
     * Pawn: `register_message(get_user_msgid("AmmoPickup"), ...)`
     */
    ammoPickup: AmmoPickupMessage;
    /**
     * A player's reserve ammo of one kind on his HUD changes.
     *
     * The game's `AmmoX` message.
     *
     * Pawn: `register_message(get_user_msgid("AmmoX"), ...)`
     */
    ammo: AmmoXMessage;
    /**
     * The armour icon on a player's HUD: a vest, or a vest and a helmet.
     *
     * The game's `ArmorType` message.
     *
     * Pawn: `register_message(get_user_msgid("ArmorType"), ...)`
     */
    armorType: ArmorTypeMessage;
    /**
     * The progress bar in the middle of a player's screen is shown or hidden.
     *
     * The game's `BarTime` message.
     *
     * Pawn: `register_message(get_user_msgid("BarTime"), ...)`
     */
    progressBar: BarTimeMessage;
    /**
     * The progress bar in the middle of a player's screen, starting part of the way full.
     *
     * The game's `BarTime2` message.
     *
     * Pawn: `register_message(get_user_msgid("BarTime2"), ...)`
     */
    progressBarPartial: BarTime2Message;
    /**
     * A player's armour on his HUD changes.
     *
     * The game's `Battery` message.
     *
     * Pawn: `register_message(get_user_msgid("Battery"), ...)`
     */
    armor: BatteryMessage;
    /**
     * A player's money on his HUD blinks: he cannot afford what he tried to buy.
     *
     * The game's `BlinkAcct` message.
     *
     * Pawn: `register_message(get_user_msgid("BlinkAcct"), ...)`
     */
    moneyBlink: BlinkAcctMessage;
    /**
     * The bomb on the terrorists' radar: dropped or planted.
     *
     * The game's `BombDrop` message.
     *
     * Pawn: `register_message(get_user_msgid("BombDrop"), ...)`
     */
    bombDrop: BombDropMessage;
    /**
     * The bomb is picked up: it leaves the terrorists' radar.
     *
     * The game's `BombPickup` message.
     *
     * Pawn: `register_message(get_user_msgid("BombPickup"), ...)`
     */
    bombPickup: BombPickupMessage;
    /**
     * The progress bar a player's client shows while the bots learn a new map. Its arguments are read by place, through `event.args`.
     *
     * The game's `BotProgress` message.
     *
     * Pawn: `register_message(get_user_msgid("BotProgress"), ...)`
     */
    botProgress: ClientMessage;
    /**
     * The voice icon over a bot who talks on the radio.
     *
     * The game's `BotVoice` message.
     *
     * Pawn: `register_message(get_user_msgid("BotVoice"), ...)`
     */
    botVoice: BotVoiceMessage;
    /**
     * A spent shell a weapon throws out, for the clients to draw. Its arguments are read by place, through `event.args`.
     *
     * The game's `Brass` message.
     *
     * Pawn: `register_message(get_user_msgid("Brass"), ...)`
     */
    shellCasing: ClientMessage;
    /**
     * A player's buy menu is closed.
     *
     * The game's `BuyClose` message.
     *
     * Pawn: `register_message(get_user_msgid("BuyClose"), ...)`
     */
    closeBuyMenu: BuyCloseMessage;
    /**
     * A dead player's body is left on the ground for the clients to draw.
     *
     * The game's `ClCorpse` message.
     *
     * Pawn: `register_message(get_user_msgid("ClCorpse"), ...)`
     */
    corpse: ClCorpseMessage;
    /**
     * Counter-Strike's own crosshair on a player's screen is shown or hidden.
     *
     * The game's `Crosshair` message.
     *
     * Pawn: `register_message(get_user_msgid("Crosshair"), ...)`
     */
    crosshair: CrosshairMessage;
    /**
     * The weapon in a player's hands and its clip on his HUD.
     *
     * The game's `CurWeapon` message.
     *
     * Pawn: `register_message(get_user_msgid("CurWeapon"), ...)`
     */
    currentWeapon: CurWeaponMessage;
    /**
     * A step of Condition Zero's career, its single-player campaign. Its arguments are read by place, through `event.args`.
     *
     * The game's `CZCareer` message.
     *
     * Pawn: `register_message(get_user_msgid("CZCareer"), ...)`
     */
    czCareer: ClientMessage;
    /**
     * Condition Zero's career on a player's HUD. Its arguments are read by place, through `event.args`.
     *
     * The game's `CZCareerHUD` message.
     *
     * Pawn: `register_message(get_user_msgid("CZCareerHUD"), ...)`
     */
    czCareerHud: ClientMessage;
    /**
     * A player is shown the damage he took: the red marks at the side of his screen.
     *
     * The game's `Damage` message.
     *
     * Pawn: `register_message(get_user_msgid("Damage"), ...)`
     */
    damage: DamageMessage;
    /**
     * A kill in the top right corner of every screen.
     *
     * The game's `DeathMsg` message.
     *
     * Pawn: `register_message(get_user_msgid("DeathMsg"), ...)`
     */
    death: DeathMsgMessage;
    /**
     * The flashlight icon on a player's HUD: on or off, and its battery.
     *
     * The game's `Flashlight` message.
     *
     * Pawn: `register_message(get_user_msgid("Flashlight"), ...)`
     */
    flashlight: FlashlightMessage;
    /**
     * The flashlight's battery on a player's HUD changes.
     *
     * The game's `FlashBat` message.
     *
     * Pawn: `register_message(get_user_msgid("FlashBat"), ...)`
     */
    flashlightBattery: FlashBatMessage;
    /**
     * The fog on a player's screen: its colour and density. Its arguments are read by place, through `event.args`.
     *
     * The game's `Fog` message.
     *
     * Pawn: `register_message(get_user_msgid("Fog"), ...)`
     */
    fog: ClientMessage;
    /**
     * The views a dead player may watch the game in, as `mp_forcecamera` and `mp_forcechasecam` allow. Its arguments are read by place, through `event.args`.
     *
     * The game's `ForceCam` message.
     *
     * Pawn: `register_message(get_user_msgid("ForceCam"), ...)`
     */
    forceCamera: ClientMessage;
    /**
     * Whether the game is played in teams, for a player's client. Its arguments are read by place, through `event.args`.
     *
     * The game's `GameMode` message.
     *
     * Pawn: `register_message(get_user_msgid("GameMode"), ...)`
     */
    gameMode: ClientMessage;
    /**
     * The game's title on a player's screen when he enters the game. Its arguments are read by place, through `event.args`.
     *
     * The game's `GameTitle` message.
     *
     * Pawn: `register_message(get_user_msgid("GameTitle"), ...)`
     */
    gameTitle: ClientMessage;
    /**
     * The Geiger counter's clicks a player hears near radiation.
     *
     * The game's `Geiger` message.
     *
     * Pawn: `register_message(get_user_msgid("Geiger"), ...)`
     */
    geiger: GeigerMessage;
    /**
     * A player's health on his HUD changes.
     *
     * The game's `Health` message.
     *
     * Pawn: `register_message(get_user_msgid("Health"), ...)`
     */
    health: HealthMessage;
    /**
     * The parts of a player's HUD that are hidden change.
     *
     * The game's `HideWeapon` message.
     *
     * Pawn: `register_message(get_user_msgid("HideWeapon"), ...)`
     */
    hideWeapon: HideWeaponMessage;
    /**
     * A note to the HLTV proxies, such as a new round's start. Its arguments are read by place, through `event.args`.
     *
     * The game's `HLTV` message.
     *
     * Pawn: `register_message(get_user_msgid("HLTV"), ...)`
     */
    hltv: ClientMessage;
    /**
     * A hostage is killed: it leaves the counter-terrorists' radar.
     *
     * The game's `HostageK` message.
     *
     * Pawn: `register_message(get_user_msgid("HostageK"), ...)`
     */
    hostageKilled: HostageKMessage;
    /**
     * A hostage on the counter-terrorists' radar.
     *
     * The game's `HostagePos` message.
     *
     * Pawn: `register_message(get_user_msgid("HostagePos"), ...)`
     */
    hostagePosition: HostagePosMessage;
    /**
     * A hint in the middle of a player's screen.
     *
     * The game's `HudText` message.
     *
     * Pawn: `register_message(get_user_msgid("HudText"), ...)`
     */
    hint: HudTextMessage;
    /**
     * A hint in the middle of a player's screen, from the game's own texts.
     *
     * The game's `HudTextArgs` message.
     *
     * Pawn: `register_message(get_user_msgid("HudTextArgs"), ...)`
     */
    hintWithParams: HudTextArgsMessage;
    /**
     * A hint in the middle of a player's screen, for a player new to the game.
     *
     * The game's `HudTextPro` message.
     *
     * Pawn: `register_message(get_user_msgid("HudTextPro"), ...)`
     */
    newPlayerHint: HudTextProMessage;
    /**
     * A player's HUD is set up, when he enters the game.
     *
     * The game's `InitHUD` message.
     *
     * Pawn: `register_message(get_user_msgid("InitHUD"), ...)`
     */
    initHud: InitHUDMessage;
    /**
     * A player picks up an item: the notice at the side of his screen.
     *
     * The game's `ItemPickup` message.
     *
     * Pawn: `register_message(get_user_msgid("ItemPickup"), ...)`
     */
    itemPickup: ItemPickupMessage;
    /**
     * The night vision and the defuse kit a player has, for his HUD.
     *
     * The game's `ItemStatus` message.
     *
     * Pawn: `register_message(get_user_msgid("ItemStatus"), ...)`
     */
    itemStatus: ItemStatusMessage;
    /**
     * The place on the map a player is in, as the radio names it.
     *
     * The game's `Location` message.
     *
     * Pawn: `register_message(get_user_msgid("Location"), ...)`
     */
    location: LocationMessage;
    /**
     * A player's money on his HUD changes.
     *
     * The game's `Money` message.
     *
     * Pawn: `register_message(get_user_msgid("Money"), ...)`
     */
    money: MoneyMessage;
    /**
     * A part of the message of the day, the window a joining player sees.
     *
     * The game's `MOTD` message.
     *
     * Pawn: `register_message(get_user_msgid("MOTD"), ...)`
     */
    motd: MOTDMessage;
    /**
     * A player's night vision is turned on or off.
     *
     * The game's `NVGToggle` message.
     *
     * Pawn: `register_message(get_user_msgid("NVGToggle"), ...)`
     */
    nightVision: NVGToggleMessage;
    /**
     * A teammate on a player's radar.
     *
     * The game's `Radar` message.
     *
     * Pawn: `register_message(get_user_msgid("Radar"), ...)`
     */
    radar: RadarMessage;
    /**
     * The weather on the map, rain or snow, for a player's client. Its arguments are read by place, through `event.args`.
     *
     * The game's `ReceiveW` message.
     *
     * Pawn: `register_message(get_user_msgid("ReceiveW"), ...)`
     */
    weather: ClientMessage;
    /**
     * The sound of a weapon reloaded nearby, for a player's client. Its arguments are read by place, through `event.args`.
     *
     * The game's `ReloadSound` message.
     *
     * Pawn: `register_message(get_user_msgid("ReloadSound"), ...)`
     */
    reloadSound: ClientMessage;
    /**
     * The game asks a player's client for its state, for the voice.
     *
     * The game's `ReqState` message.
     *
     * Pawn: `register_message(get_user_msgid("ReqState"), ...)`
     */
    requestState: ReqStateMessage;
    /**
     * A player's HUD is reset, at his spawn.
     *
     * The game's `ResetHUD` message.
     *
     * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
     */
    resetHud: ResetHUDMessage;
    /**
     * The round clock at the top of a player's HUD is set.
     *
     * The game's `RoundTime` message.
     *
     * Pawn: `register_message(get_user_msgid("RoundTime"), ...)`
     */
    roundTime: RoundTimeMessage;
    /**
     * A chat line.
     *
     * The game's `SayText` message.
     *
     * Pawn: `register_message(get_user_msgid("SayText"), ...)`
     */
    chat: SayTextMessage;
    /**
     * The scenario icon on a player's HUD, such as the bomb's or a hostage's.
     *
     * The game's `Scenario` message.
     *
     * Pawn: `register_message(get_user_msgid("Scenario"), ...)`
     */
    scenarioIcon: ScenarioMessage;
    /**
     * The marks the scoreboard shows beside a player: dead, the bomb, the VIP.
     *
     * The game's `ScoreAttrib` message.
     *
     * Pawn: `register_message(get_user_msgid("ScoreAttrib"), ...)`
     */
    scoreAttribute: ScoreAttribMessage;
    /**
     * A player's row on the scoreboard.
     *
     * The game's `ScoreInfo` message.
     *
     * Pawn: `register_message(get_user_msgid("ScoreInfo"), ...)`
     */
    score: ScoreInfoMessage;
    /**
     * A player's screen is coloured, fading in or out - a flashbang, a fade to black.
     *
     * The game's `ScreenFade` message.
     *
     * Pawn: `register_message(get_user_msgid("ScreenFade"), ...)`
     */
    screenFade: ScreenFadeMessage;
    /**
     * A player's view shakes - an explosion nearby.
     *
     * The game's `ScreenShake` message.
     *
     * Pawn: `register_message(get_user_msgid("ScreenShake"), ...)`
     */
    screenShake: ScreenShakeMessage;
    /**
     * A sound played to a player, such as a radio line.
     *
     * The game's `SendAudio` message.
     *
     * Pawn: `register_message(get_user_msgid("SendAudio"), ...)`
     */
    sound: SendAudioMessage;
    /**
     * The server's name a player's client shows.
     *
     * The game's `ServerName` message.
     *
     * Pawn: `register_message(get_user_msgid("ServerName"), ...)`
     */
    serverName: ServerNameMessage;
    /**
     * A player's field of view is set.
     *
     * The game's `SetFOV` message.
     *
     * Pawn: `register_message(get_user_msgid("SetFOV"), ...)`
     */
    fov: SetFOVMessage;
    /**
     * The sprite a player's client draws the players' shadows with. Its arguments are read by place, through `event.args`.
     *
     * The game's `ShadowIdx` message.
     *
     * Pawn: `register_message(get_user_msgid("ShadowIdx"), ...)`
     */
    shadow: ClientMessage;
    /**
     * A text menu on a player's screen - the team menu without VGUI, the radio, a plugin's menu.
     *
     * The game's `ShowMenu` message.
     *
     * Pawn: `register_message(get_user_msgid("ShowMenu"), ...)`
     */
    menu: ShowMenuMessage;
    /**
     * The round clock appears on a player's HUD.
     *
     * The game's `ShowTimer` message.
     *
     * Pawn: `register_message(get_user_msgid("ShowTimer"), ...)`
     */
    showTimer: ShowTimerMessage;
    /**
     * The health of the player a spectator watches.
     *
     * The game's `SpecHealth` message.
     *
     * Pawn: `register_message(get_user_msgid("SpecHealth"), ...)`
     */
    spectatedHealth: SpecHealthMessage;
    /**
     * The health of the player a spectator watches, and who it is.
     *
     * The game's `SpecHealth2` message.
     *
     * Pawn: `register_message(get_user_msgid("SpecHealth2"), ...)`
     */
    spectatedPlayerHealth: SpecHealth2Message;
    /**
     * A player becomes a spectator, or stops being one, on the scoreboard.
     *
     * The game's `Spectator` message.
     *
     * Pawn: `register_message(get_user_msgid("Spectator"), ...)`
     */
    spectator: SpectatorMessage;
    /**
     * A status icon on a player's HUD - the buy zone, the bomb - is shown, flashed or hidden.
     *
     * The game's `StatusIcon` message.
     *
     * Pawn: `register_message(get_user_msgid("StatusIcon"), ...)`
     */
    statusIcon: StatusIconMessage;
    /**
     * The status line at the bottom of a player's screen, such as the name of the player he aims at.
     *
     * The game's `StatusText` message.
     *
     * Pawn: `register_message(get_user_msgid("StatusText"), ...)`
     */
    statusText: StatusTextMessage;
    /**
     * A value the status line shows, such as the player a player aims at.
     *
     * The game's `StatusValue` message.
     *
     * Pawn: `register_message(get_user_msgid("StatusValue"), ...)`
     */
    statusValue: StatusValueMessage;
    /**
     * The countdown of a task on a player's HUD, such as rescuing the hostages in a career.
     *
     * The game's `TaskTime` message.
     *
     * Pawn: `register_message(get_user_msgid("TaskTime"), ...)`
     */
    taskTime: TaskTimeMessage;
    /**
     * A player's team on the scoreboard.
     *
     * The game's `TeamInfo` message.
     *
     * Pawn: `register_message(get_user_msgid("TeamInfo"), ...)`
     */
    team: TeamInfoMessage;
    /**
     * A team's score on the scoreboard.
     *
     * The game's `TeamScore` message.
     *
     * Pawn: `register_message(get_user_msgid("TeamScore"), ...)`
     */
    teamScore: TeamScoreMessage;
    /**
     * A text from the game - an announcement, a hint - in chat, the console or the middle of the screen.
     *
     * The game's `TextMsg` message.
     *
     * Pawn: `register_message(get_user_msgid("TextMsg"), ...)`
     */
    text: TextMsgMessage;
    /**
     * The speed of the train a player drives, on his HUD.
     *
     * The game's `Train` message.
     *
     * Pawn: `register_message(get_user_msgid("Train"), ...)`
     */
    train: TrainMessage;
    /**
     * A tutor's message on a player's screen closes.
     *
     * The game's `TutorClose` message.
     *
     * Pawn: `register_message(get_user_msgid("TutorClose"), ...)`
     */
    tutorClose: TutorCloseMessage;
    /**
     * A tutor's pointer on a player's screen, at a thing in the world. Its arguments are read by place, through `event.args`.
     *
     * The game's `TutorLine` message.
     *
     * Pawn: `register_message(get_user_msgid("TutorLine"), ...)`
     */
    tutorLine: ClientMessage;
    /**
     * The tutor's state on a player's client. Its arguments are read by place, through `event.args`.
     *
     * The game's `TutorState` message.
     *
     * Pawn: `register_message(get_user_msgid("TutorState"), ...)`
     */
    tutorState: ClientMessage;
    /**
     * A tutor's message on a player's screen. Its arguments are read by place, through `event.args`.
     *
     * The game's `TutorText` message.
     *
     * Pawn: `register_message(get_user_msgid("TutorText"), ...)`
     */
    tutorText: ClientMessage;
    /**
     * A VGUI menu of the game opens on a player's screen: the team menu, the class menu, the buy menu.
     *
     * The game's `VGUIMenu` message.
     *
     * Pawn: `register_message(get_user_msgid("VGUIMenu"), ...)`
     */
    vguiMenu: VGUIMenuMessage;
    /**
     * A player's view goes back to first person.
     *
     * The game's `ViewMode` message.
     *
     * Pawn: `register_message(get_user_msgid("ViewMode"), ...)`
     */
    viewMode: ViewModeMessage;
    /**
     * The players a player hears on the voice chat, and the ones he has muted. Its arguments are read by place, through `event.args`.
     *
     * The game's `VoiceMask` message.
     *
     * Pawn: `register_message(get_user_msgid("VoiceMask"), ...)`
     */
    voiceMask: ClientMessage;
    /**
     * A weapon's description for a player's client: its ammo, its slot, its place in the slot.
     *
     * The game's `WeaponList` message.
     *
     * Pawn: `register_message(get_user_msgid("WeaponList"), ...)`
     */
    weaponList: WeaponListMessage;
    /**
     * A player picks up a weapon: the notice at the side of his screen.
     *
     * The game's `WeapPickup` message.
     *
     * Pawn: `register_message(get_user_msgid("WeapPickup"), ...)`
     */
    weaponPickup: WeapPickupMessage;
}
/** The game's name of a message, by the name server.addMessageListener takes; a name it does not know as it is. */
export declare function protocolMessageName(name: string): string;
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
