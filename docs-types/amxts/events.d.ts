/// <reference path="../as-types.d.ts" />
import { Client, ClientMessage, Player, PlayerChangeEvent, StatusIconState, Team, VariantName } from "./facade";
import { Vector } from "./vector";
import { WeaponKind } from "./entities";
import { Damage, HideHud } from "./flags";
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
 * A player picks up ammo: the notice at the side of his screen.
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
 * The progress bar in the middle of a player's screen is shown or hidden.
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
 * A player's armour on his HUD changes.
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
 * A dead player's body is left on the ground for the clients to draw.
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
     * The player whose body it is.
     *
     * Pawn: `get_msg_arg_*(12)`
     */
    get target(): Player | null;
    set target(value: Player | null);
}
/**
 * The weapon in a player's hands and its clip on his HUD.
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
}
/**
 * A kill in the top right corner of every screen.
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
 * A player's health on his HUD changes.
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
 * A hint in the middle of a player's screen, from the game's own texts.
 *
 * Pawn: `register_message(get_user_msgid("HudTextArgs"), ...)`
 */
export declare class HudTextArgsMessage extends ClientMessage {
    private readonly kind;
    /**
     * The game's text, e.g. `"#Hint_press_buy_to_purchase"`.
     *
     * Pawn: `get_msg_arg_*(1)`
     */
    get text(): string;
    set text(value: string);
}
/**
 * A player picks up an item: the notice at the side of his screen.
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
 * A player's money on his HUD changes.
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
 * A player's HUD is reset, at his spawn.
 *
 * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
 */
export declare class ResetHUDMessage extends ClientMessage {
    private readonly kind;
}
/**
 * The round clock at the top of a player's HUD is set.
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
}
/**
 * A player's row on the scoreboard.
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
 * A sound played to a player, such as a radio line.
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
 * A player's field of view is set.
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
 * A status icon on a player's HUD - the buy zone, the bomb - is shown, flashed or hidden.
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
}
/**
 * A player's team on the scoreboard.
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
     * The team's name, e.g. `"TERRORIST"`, `"CT"`.
     *
     * Pawn: `get_msg_arg_*(2)`
     */
    get team(): string;
    set team(value: string);
}
/**
 * A text from the game - an announcement, a hint - in chat, the console or the middle of the screen.
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
}
/**
 * A player picks up a weapon: the notice at the side of his screen.
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
/** Every event a server raises, by name: the short one and the Pawn one, and every message it sends. */
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
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ADStop"), ...)`
     */
    "message:ADStop": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("AllowSpec"), ...)`
     */
    "message:AllowSpec": ClientMessage;
    /**
     * A player picks up ammo: the notice at the side of his screen.
     *
     * Pawn: `register_message(get_user_msgid("AmmoPickup"), ...)`
     */
    "message:AmmoPickup": AmmoPickupMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("AmmoX"), ...)`
     */
    "message:AmmoX": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ArmorType"), ...)`
     */
    "message:ArmorType": ClientMessage;
    /**
     * The progress bar in the middle of a player's screen is shown or hidden.
     *
     * Pawn: `register_message(get_user_msgid("BarTime"), ...)`
     */
    "message:BarTime": BarTimeMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BarTime2"), ...)`
     */
    "message:BarTime2": ClientMessage;
    /**
     * A player's armour on his HUD changes.
     *
     * Pawn: `register_message(get_user_msgid("Battery"), ...)`
     */
    "message:Battery": BatteryMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BlinkAcct"), ...)`
     */
    "message:BlinkAcct": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BombDrop"), ...)`
     */
    "message:BombDrop": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BombPickup"), ...)`
     */
    "message:BombPickup": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BotProgress"), ...)`
     */
    "message:BotProgress": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BotVoice"), ...)`
     */
    "message:BotVoice": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Brass"), ...)`
     */
    "message:Brass": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("BuyClose"), ...)`
     */
    "message:BuyClose": ClientMessage;
    /**
     * A dead player's body is left on the ground for the clients to draw.
     *
     * Pawn: `register_message(get_user_msgid("ClCorpse"), ...)`
     */
    "message:ClCorpse": ClCorpseMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Crosshair"), ...)`
     */
    "message:Crosshair": ClientMessage;
    /**
     * The weapon in a player's hands and its clip on his HUD.
     *
     * Pawn: `register_message(get_user_msgid("CurWeapon"), ...)`
     */
    "message:CurWeapon": CurWeaponMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("CZCareer"), ...)`
     */
    "message:CZCareer": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("CZCareerHUD"), ...)`
     */
    "message:CZCareerHUD": ClientMessage;
    /**
     * A player is shown the damage he took: the red marks at the side of his screen.
     *
     * Pawn: `register_message(get_user_msgid("Damage"), ...)`
     */
    "message:Damage": DamageMessage;
    /**
     * A kill in the top right corner of every screen.
     *
     * Pawn: `register_message(get_user_msgid("DeathMsg"), ...)`
     */
    "message:DeathMsg": DeathMsgMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Flashlight"), ...)`
     */
    "message:Flashlight": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("FlashBat"), ...)`
     */
    "message:FlashBat": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Fog"), ...)`
     */
    "message:Fog": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ForceCam"), ...)`
     */
    "message:ForceCam": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("GameMode"), ...)`
     */
    "message:GameMode": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("GameTitle"), ...)`
     */
    "message:GameTitle": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Geiger"), ...)`
     */
    "message:Geiger": ClientMessage;
    /**
     * A player's health on his HUD changes.
     *
     * Pawn: `register_message(get_user_msgid("Health"), ...)`
     */
    "message:Health": HealthMessage;
    /**
     * The parts of a player's HUD that are hidden change.
     *
     * Pawn: `register_message(get_user_msgid("HideWeapon"), ...)`
     */
    "message:HideWeapon": HideWeaponMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HLTV"), ...)`
     */
    "message:HLTV": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HostageK"), ...)`
     */
    "message:HostageK": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HostagePos"), ...)`
     */
    "message:HostagePos": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HudText"), ...)`
     */
    "message:HudText": ClientMessage;
    /**
     * A hint in the middle of a player's screen, from the game's own texts.
     *
     * Pawn: `register_message(get_user_msgid("HudTextArgs"), ...)`
     */
    "message:HudTextArgs": HudTextArgsMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("HudTextPro"), ...)`
     */
    "message:HudTextPro": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("InitHUD"), ...)`
     */
    "message:InitHUD": ClientMessage;
    /**
     * A player picks up an item: the notice at the side of his screen.
     *
     * Pawn: `register_message(get_user_msgid("ItemPickup"), ...)`
     */
    "message:ItemPickup": ItemPickupMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ItemStatus"), ...)`
     */
    "message:ItemStatus": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Location"), ...)`
     */
    "message:Location": ClientMessage;
    /**
     * A player's money on his HUD changes.
     *
     * Pawn: `register_message(get_user_msgid("Money"), ...)`
     */
    "message:Money": MoneyMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("MOTD"), ...)`
     */
    "message:MOTD": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("NVGToggle"), ...)`
     */
    "message:NVGToggle": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Radar"), ...)`
     */
    "message:Radar": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ReceiveW"), ...)`
     */
    "message:ReceiveW": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ReloadSound"), ...)`
     */
    "message:ReloadSound": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ReqState"), ...)`
     */
    "message:ReqState": ClientMessage;
    /**
     * A player's HUD is reset, at his spawn.
     *
     * Pawn: `register_message(get_user_msgid("ResetHUD"), ...)`
     */
    "message:ResetHUD": ResetHUDMessage;
    /**
     * The round clock at the top of a player's HUD is set.
     *
     * Pawn: `register_message(get_user_msgid("RoundTime"), ...)`
     */
    "message:RoundTime": RoundTimeMessage;
    /**
     * A chat line.
     *
     * Pawn: `register_message(get_user_msgid("SayText"), ...)`
     */
    "message:SayText": SayTextMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Scenario"), ...)`
     */
    "message:Scenario": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ScoreAttrib"), ...)`
     */
    "message:ScoreAttrib": ClientMessage;
    /**
     * A player's row on the scoreboard.
     *
     * Pawn: `register_message(get_user_msgid("ScoreInfo"), ...)`
     */
    "message:ScoreInfo": ScoreInfoMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ScreenFade"), ...)`
     */
    "message:ScreenFade": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ScreenShake"), ...)`
     */
    "message:ScreenShake": ClientMessage;
    /**
     * A sound played to a player, such as a radio line.
     *
     * Pawn: `register_message(get_user_msgid("SendAudio"), ...)`
     */
    "message:SendAudio": SendAudioMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ServerName"), ...)`
     */
    "message:ServerName": ClientMessage;
    /**
     * A player's field of view is set.
     *
     * Pawn: `register_message(get_user_msgid("SetFOV"), ...)`
     */
    "message:SetFOV": SetFOVMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ShadowIdx"), ...)`
     */
    "message:ShadowIdx": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ShowMenu"), ...)`
     */
    "message:ShowMenu": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ShowTimer"), ...)`
     */
    "message:ShowTimer": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("SpecHealth"), ...)`
     */
    "message:SpecHealth": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("SpecHealth2"), ...)`
     */
    "message:SpecHealth2": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Spectator"), ...)`
     */
    "message:Spectator": ClientMessage;
    /**
     * A status icon on a player's HUD - the buy zone, the bomb - is shown, flashed or hidden.
     *
     * Pawn: `register_message(get_user_msgid("StatusIcon"), ...)`
     */
    "message:StatusIcon": StatusIconMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("StatusText"), ...)`
     */
    "message:StatusText": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("StatusValue"), ...)`
     */
    "message:StatusValue": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TaskTime"), ...)`
     */
    "message:TaskTime": ClientMessage;
    /**
     * A player's team on the scoreboard.
     *
     * Pawn: `register_message(get_user_msgid("TeamInfo"), ...)`
     */
    "message:TeamInfo": TeamInfoMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TeamScore"), ...)`
     */
    "message:TeamScore": ClientMessage;
    /**
     * A text from the game - an announcement, a hint - in chat, the console or the middle of the screen.
     *
     * Pawn: `register_message(get_user_msgid("TextMsg"), ...)`
     */
    "message:TextMsg": TextMsgMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("Train"), ...)`
     */
    "message:Train": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorClose"), ...)`
     */
    "message:TutorClose": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorLine"), ...)`
     */
    "message:TutorLine": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorState"), ...)`
     */
    "message:TutorState": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("TutorText"), ...)`
     */
    "message:TutorText": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("VGUIMenu"), ...)`
     */
    "message:VGUIMenu": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("ViewMode"), ...)`
     */
    "message:ViewMode": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("VoiceMask"), ...)`
     */
    "message:VoiceMask": ClientMessage;
    /**
     * A message the server sends its clients; its arguments are `event.args`.
     *
     * Pawn: `register_message(get_user_msgid("WeaponList"), ...)`
     */
    "message:WeaponList": ClientMessage;
    /**
     * A player picks up a weapon: the notice at the side of his screen.
     *
     * Pawn: `register_message(get_user_msgid("WeapPickup"), ...)`
     */
    "message:WeapPickup": WeapPickupMessage;
}
/** Adds a listener for the event E - server.addEventListener's hood. */
export declare function addServerListener<E>(listener: (event: E) => void): void;
/** Takes a listener off again - server.removeEventListener's hood. */
export declare function removeServerListener<E>(listener: (event: E) => void): void;
