/// <reference path="../as-types.d.ts" />
import { __Switch } from "./facade";
import { AddMoneyEvent, BounceGibTouchEvent, BuyAmmoEvent, BuyItemEvent, BuyWeaponEvent, CanPlayerHearPlayerEvent, ChangeLevelEvent, MapResetEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClientConnectedEvent, UserInfoChangeEvent, ConnectClientEvent, DeathNoticeEvent, DeathSoundEvent, DefuseBombEndEvent, DefuseBombStartEvent, DisconnectClientEvent, DropPlayerItemEvent, ExplodeBombEvent, GameThinkEvent, GibSpawnEvent, GiveBombEvent, IntermissionEvent, ItemRestrictedEvent, BecomeBomberEvent, BecomeVipEvent, RoundStartEvent, PainEvent, PlantBombEvent, PlayerBlindEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PrecacheFileEvent, PrecacheModelEvent, PrecacheSoundEvent, NewRoundEvent, RoundEndEvent, SendDeathMessageEvent, ChangeNameEvent, SetModelEvent, ShowVguiMenuEvent, StartSoundEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent } from "./hooks";
/** The listeners of one event, phase by phase: as/hooks.ts's `<event>FireHlds`. */
type Fire<E> = (event: E, post: bool) => void;
/**
 * A new round: the HLTV message the game sends when it restarts a round,
 * before the players respawn. A map's first round is a restart too - the
 * game commences once both sides have players.
 */
export declare function newRoundHlds(fire: Fire<NewRoundEvent>, hook: __Switch): void;
/** The round once its players have respawned: the decals' reset at its HLTV message's time. */
export declare function newRoundPostHlds(fire: Fire<NewRoundEvent>, hook: __Switch): void;
/** The map cleaned up for a new round: the decals' reset, its last step. */
export declare function mapResetHlds(fire: Fire<MapResetEvent>, hook: __Switch): void;
/** The freeze time is over: the game logs "Round_Start". */
export declare function roundStartHlds(fire: Fire<RoundStartEvent>, hook: __Switch): void;
/**
 * The round's end: the game logs "Round_End" after its message, its log line
 * of who won and its sound, which say who won and why - the message, or
 * where a plugin changed it the log line, then the sound. The delay is the
 * game's when the round is already ending (as game.endRound leaves it), or
 * the original game's: 3 seconds for "Game Commencing", 5 for every other end.
 */
export declare function roundEndHlds(fire: Fire<RoundEndEvent>, hook: __Switch): void;
/** The game rules think once a frame: the server's frame. */
export declare function gameThinkHlds(fire: Fire<GameThinkEvent>, hook: __Switch): void;
/** The map is over: the game sends SVC_INTERMISSION, which AMX Mod X's events hear as "30". */
export declare function intermissionHlds(fire: Fire<IntermissionEvent>, hook: __Switch): void;
/** The game changes the map: AMX Mod X's server_changelevel. */
export declare function changeLevelHlds(fire: Fire<ChangeLevelEvent>, hook: __Switch): void;
/** A player spawned into the round: Ham Sandwich's Spawn after the game, of a player alive - not one who only joined. */
export declare function playerSpawnHlds(fire: Fire<PlayerSpawnEvent>, hook: __Switch): void;
/** A player was killed: Ham Sandwich's Killed after the game; the inflictor is the last that hurt him. */
export declare function playerKilledHlds(fire: Fire<PlayerKilledEvent>, hook: __Switch): void;
/** The game tells everyone of a death: its DeathMsg. */
export declare function deathNoticeHlds(fire: Fire<DeathNoticeEvent>, hook: __Switch): void;
/** The death message itself: DeathMsg, which preventDefault() keeps from the players. */
export declare function sendDeathMessageHlds(fire: Fire<SendDeathMessageEvent>, hook: __Switch): void;
/** A player's pain: the sound the game plays for it, his last hit group and his armour read from him. */
export declare function painHlds(fire: Fire<PainEvent>, hook: __Switch): void;
/** A player's death cry: the sound the game plays for it. */
export declare function deathSoundHlds(fire: Fire<DeathSoundEvent>, hook: __Switch): void;
/** A sound the game plays through the engine's EmitSound; the recipients are everyone. */
export declare function startSoundHlds(fire: Fire<StartSoundEvent>, hook: __Switch): void;
/** The terrorist who gets the bomb at the round's start: the game logs "Spawned_With_The_Bomb". */
export declare function giveBombHlds(fire: Fire<GiveBombEvent>, hook: __Switch): void;
export declare function becomeBomberHlds(fire: Fire<BecomeBomberEvent>, hook: __Switch): void;
export declare function becomeVipHlds(fire: Fire<BecomeVipEvent>, hook: __Switch): void;
/** The bomb planted: the game gives the new bomb its model, with its planter, place and velocity set. */
export declare function plantBombHlds(fire: Fire<PlantBombEvent>, hook: __Switch): void;
/** A defuse begins: the game logs "Begin_Bomb_Defuse_With_Kit", or "_Without_Kit". */
export declare function defuseBombStartHlds(fire: Fire<DefuseBombStartEvent>, hook: __Switch): void;
/** The bomb defused: the game logs "Defused_The_Bomb". */
export declare function defuseBombEndHlds(fire: Fire<DefuseBombEndEvent>, hook: __Switch): void;
/** The bomb blew up: the terrorists trigger "Target_Bombed". */
export declare function explodeBombHlds(fire: Fire<ExplodeBombEvent>, hook: __Switch): void;
/** A player's money changed: the Money message the game sends him, by how much it moved. */
export declare function addMoneyHlds(fire: Fire<AddMoneyEvent>, hook: __Switch): void;
/** A weapon bought: CS_OnBuy of a gun; a grenade is equipment. */
export declare function buyWeaponHlds(fire: Fire<BuyWeaponEvent>, hook: __Switch): void;
/** An item of the equipment menu bought: CS_OnBuy, its slot there. */
export declare function buyItemHlds(fire: Fire<BuyItemEvent>, hook: __Switch): void;
/** Ammo bought: CS_OnBuy of a gun's ammo. */
export declare function buyAmmoHlds(fire: Fire<BuyAmmoEvent>, hook: __Switch): void;
/** Whether an item is forbidden to buy: cstrike's CS_OnBuyAttempt, answered `true` to forbid. */
export declare function itemRestrictedHlds(fire: Fire<ItemRestrictedEvent>, hook: __Switch): void;
/** A team picked: `jointeam`, or a number in the game's team menu. */
export declare function chooseTeamHlds(fire: Fire<ChooseTeamEvent>, hook: __Switch): void;
/** A model picked: `joinclass`, or a number in the game's class menu. */
export declare function chooseAppearanceHlds(fire: Fire<ChooseAppearanceEvent>, hook: __Switch): void;
/** A weapon dropped: the player's `drop` command, with the weapon he names. */
export declare function dropPlayerItemHlds(fire: Fire<DropPlayerItemEvent>, hook: __Switch): void;
/** A VGUI menu shown: its VGUIMenu message, which preventDefault() keeps from the player. */
export declare function showVguiMenuHlds(fire: Fire<ShowVguiMenuEvent>, hook: __Switch): void;
export declare function clientConnectedHlds(fire: Fire<ClientConnectedEvent>, hook: __Switch): void;
export declare function connectClientHlds(fire: Fire<ConnectClientEvent>, hook: __Switch): void;
/** A client dropped: AMX Mod X's client_disconnected, with the reason it was told. */
export declare function disconnectClientHlds(fire: Fire<DisconnectClientEvent>, hook: __Switch): void;
export declare function userInfoChangeHlds(fire: Fire<UserInfoChangeEvent>, hook: __Switch): void;
/** A new name asked for: the info's name is not the one the player has. */
export declare function changeNameHlds(fire: Fire<ChangeNameEvent>, hook: __Switch): void;
/** A player blinded: Ham Sandwich's CS_Player_Blind after the game - (untilTime, holdTime, fadeTime, alpha). */
export declare function playerBlindHlds(fire: Fire<PlayerBlindEvent>, hook: __Switch): void;
/** A player got a weapon: Ham Sandwich's AddPlayerItem after the game, when it took the item. */
export declare function playerGotWeaponHlds(fire: Fire<PlayerGotWeaponEvent>, hook: __Switch): void;
/**
 * Who hears whom: the game tells the engine for each pair of players, and the
 * answer is told instead - preventDefault() answers `false`.
 */
export declare function canPlayerHearPlayerHlds(fire: Fire<CanPlayerHearPlayerEvent>, hook: __Switch): void;
export declare function throwHeGrenadeHlds(fire: Fire<ThrowHeGrenadeEvent>, hook: __Switch): void;
export declare function throwFlashbangHlds(fire: Fire<ThrowFlashbangEvent>, hook: __Switch): void;
export declare function throwSmokeGrenadeHlds(fire: Fire<ThrowSmokeGrenadeEvent>, hook: __Switch): void;
/** Any grenade thrown; the grenade's weapon is the one in the thrower's hands. */
export declare function throwGrenadeHlds(fire: Fire<ThrowGrenadeEvent>, hook: __Switch): void;
/** A weaponbox given its model: preventDefault() keeps it off. */
export declare function setModelHlds(fire: Fire<SetModelEvent>, hook: __Switch): void;
/** A gib spawned: the game gives it its model last. */
export declare function gibSpawnHlds(fire: Fire<GibSpawnEvent>, hook: __Switch): void;
/** A gib touched something: the engine module's touch of the gib, which preventDefault() blocks. */
export declare function bounceGibTouchHlds(fire: Fire<BounceGibTouchEvent>, hook: __Switch): void;
export declare function precacheModelHlds(fire: Fire<PrecacheModelEvent>, hook: __Switch): void;
export declare function precacheSoundHlds(fire: Fire<PrecacheSoundEvent>, hook: __Switch): void;
export declare function precacheFileHlds(fire: Fire<PrecacheFileEvent>, hook: __Switch): void;
/** The game's name in the server browser: the one written, or the game's own. */
export declare function gameNameHlds(): string;
/** Writes the game's name: the game's GetGameDescription is answered with it from now on. */
export declare function setGameNameHlds(value: string): void;
export declare function gameStartTimeHlds(): i32;
export declare function setGameStartTimeHlds(cell: i32): void;
/** The game time the map ends by its time limit, 0 for none: mp_timelimit after the game's start. */
export declare function timeLimitHlds(): i32;
/** Moves the map's end: mp_timelimit, in minutes after the game's start. */
export declare function setTimeLimitHlds(cell: i32): void;
export declare function maxPlayersHlds(): i32;
export declare function setMaxPlayersHlds(cell: i32): void;
export {};
