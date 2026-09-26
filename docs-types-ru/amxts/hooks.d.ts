/// <reference path="../as-types.d.ts" />
import { Player, RoundWinner, Team, Vector } from "./facade";
import { Entity, Weapon, WeaponKind } from "./entities";
import { Damage } from "./flags";
/** What every hookchain event can do. */
export declare class HookEvent {
    private written;
    private writtenText;
    /** An argument as the handler sees it now: its own write, or what came in. */
    protected __cell(index: i32): i32;
    protected __text(index: i32): string;
    protected __wrote(index: i32, value: i32): void;
    protected __wroteText(index: i32, value: string): void;
    /**
     * Stops the chain here: what it hooks does not run - HC_SUPERCEDE. For a
     * chain that answers, return the answer from the handler instead; this is
     * for blocking without one.
     */
    preventDefault(): void;
    /**
     * Stops the chain and every hook after this one, the hooked function
     * included - HC_BREAK. Rarely what is wanted; preventDefault() is.
     */
    stopImmediatePropagation(): void;
}
/**
 * One registered handler: one that says nothing, or one that answers. Two
 * fields rather than one because a handler's return type is fixed when it
 * is compiled - AssemblyScript has no "maybe returns".
 */
export declare class HookEntry<E, T> {
    silent: ((event: E) => void) | null;
    answer: ((event: E) => T) | null;
    /** An async listener as it was added: `silent` holds its wrapper, asyncListener. */
    source: usize;
}
/** What a player is paid for - RewardType. "unknown" - a number the include does not name. */
export type RewardReason = "none" | "roundBonus" | "playerReset" | "playerJoin" | "playerSpecJoin" | "playerBoughtSomething" | "hostageTook" | "hostageRescued" | "hostageDamaged" | "hostageKilled" | "teammatesKilled" | "enemyKilled" | "intoGame" | "vipKilled" | "vipRescuedMyself" | "unknown";
/** What kind of file a resource is - ResourceType_t. */
export type ResourceType = "sound" | "skin" | "model" | "decal" | "generic" | "eventscript" | "world" | "unknown";
/** What a player picked in the team menu - MenuChooseTeam. The sides by the names Team gives them. "unknown" - a number the include does not name. */
export type TeamChoice = "TERRORIST" | "CT" | "VIP" | "auto" | "SPECTATOR" | "unknown";
/** How a player would get an item the restriction is asked about - ItemRestType. "unknown" - a number the include does not name. */
export type ItemRestriction = "buying" | "touched" | "equipped" | "unknown";
/** What the bots are told happened - GameEventType. "unknown" - a number the include does not name. */
export type BotEvent = "invalid" | "weaponFired" | "weaponFiredOnEmpty" | "weaponReloaded" | "heGrenadeExploded" | "flashbangGrenadeExploded" | "smokeGrenadeExploded" | "grenadeBounced" | "beingShotAt" | "playerBlindedByFlashbang" | "playerFootstep" | "playerJumped" | "playerDied" | "playerLandedFromHeight" | "playerTookDamage" | "hostageDamaged" | "hostageKilled" | "door" | "breakGlass" | "breakWood" | "breakMetal" | "breakFlesh" | "breakConcrete" | "bombPlanted" | "bombDropped" | "bombPickedUp" | "bombBeep" | "bombDefusing" | "bombDefuseAborted" | "bombDefused" | "bombExploded" | "hostageUsed" | "hostageRescued" | "allHostagesRescued" | "vipEscaped" | "vipAssassinated" | "terroristsWin" | "ctsWin" | "roundDraw" | "roundWin" | "roundLoss" | "roundStart" | "playerSpawned" | "clientCorpseSpawned" | "buyTimeStart" | "playerLeftBuyZone" | "deathCameraStart" | "killAll" | "roundTime" | "die" | "kill" | "headshot" | "killFlashbanged" | "tutorBuyMenuOpenned" | "tutorAutobuy" | "playerBoughtSomething" | "tutorNotBuyingAnything" | "tutorNeedToBuyPrimaryWeapon" | "tutorNeedToBuyPrimaryAmmo" | "tutorNeedToBuySecondaryAmmo" | "tutorNeedToBuyArmor" | "tutorNeedToBuyDefuseKit" | "tutorNeedToBuyGrenade" | "careerTaskDone" | "startRadio1" | "radioCoverMe" | "radioYouTakeThePoint" | "radioHoldThisPosition" | "radioRegroupTeam" | "radioFollowMe" | "radioTakingFire" | "startRadio2" | "radioGoGoGo" | "radioTeamFallBack" | "radioStickTogetherTeam" | "radioGetInPositionAndWait" | "radioStormTheFront" | "radioReportInTeam" | "startRadio3" | "radioAffirmative" | "radioEnemySpotted" | "radioNeedBackup" | "radioSectorClear" | "radioInPosition" | "radioReportingIn" | "radioGetOutOfThere" | "radioNegative" | "radioEnemyDown" | "endRadio" | "newMatch" | "playerChangedTeam" | "bulletImpact" | "gameCommence" | "weaponZoomed" | "hostageCalledForHelp" | "unknown";
/** Why a round ended - ScenarioEventEndRound. "unknown" - a number the include does not name. */
export type RoundEndReason = "none" | "targetBomb" | "vipEscaped" | "vipAssassinated" | "terroristsEscaped" | "ctsPreventEscape" | "escapingTerroristsNeutralized" | "bombDefused" | "ctsWin" | "terroristsWin" | "endDraw" | "allHostagesRescued" | "targetSaved" | "hostageNotRescued" | "terroristsNotEscaped" | "vipNotEscaped" | "gameCommence" | "gameRestart" | "gameOver" | "unknown";
/** What else a death message carries - DeathMessageFlags. */
export type DeathMessageFlag = "Position" | "Assistant" | "KillRarity";
/** What made a kill rare - KillRarity. */
export type KillRarity = "Headshot" | "KillerBlind" | "NoScope" | "Penetrated" | "ThruSmoke" | "AssistedFlash" | "DominationBegan" | "Domination" | "Revenge" | "InAir";
/** A VGUI menu - VGUIMenu. "unknown" - a number the include does not name. */
export type VguiMenu = "team" | "mapBriefing" | "classT" | "classCT" | "buy" | "buyPistol" | "buyShotGun" | "buyRifle" | "buySubMachineGun" | "buyMachineGun" | "buyItem" | "unknown";
/**
 * reapi: `RH_SV_ActivateServer` (const runPhysics)
 */
export declare class ActivateServerEvent extends HookEvent {
    private readonly kind;
    /** `const runPhysics` - argument 1. */
    get runPhysics(): number;
    set runPhysics(value: number);
}
/**
 * У игрока меняются деньги. Присвойте event.amount, чтобы изменить сумму.
 *
 * reapi: `RG_CBasePlayer_AddAccount` (const this, amount, RewardType:type, bool:bTrackChange)
 */
export declare class AddAccountEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** `amount` - argument 2. */
    get amount(): number;
    set amount(value: number);
    /** За что: "roundBonus", "enemyKilled", "playerBoughtSomething", "hostageRescued", ... */
    get reason(): RewardReason;
    set reason(value: RewardReason);
    /** `bool:bTrackChange` - argument 4. */
    get trackChange(): boolean;
    set trackChange(value: boolean);
}
/**
 * Called inside TraceAttack to store entity damage to multidamage data
 *
 * reapi: `RG_AddMultiDamage` (const pevInflictor, const pEntity, Float:flDamage, bitsDamageType)
 */
export declare class AddMultiDamageEvent extends HookEvent {
    private readonly kind;
    /** `const pevInflictor` - argument 1, read only. */
    get inflictor(): Entity;
    /** `const pEntity` - argument 2, read only. */
    get entity(): Entity;
    /** `Float:flDamage` - argument 3. */
    get damage(): number;
    set damage(value: number);
    /** `bitsDamageType` - argument 4. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * reapi: `RG_CBasePlayer_AddPlayerItem` (const this, const pItem)
 */
export declare class AddPlayerItemEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `const pItem` - argument 2, read only. */
    get item(): Weapon;
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayer_AddPoints` (const this, score, bAllowNegativeScore)
 */
export declare class AddPointsEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `score` - argument 2. */
    get score(): number;
    set score(value: number);
    /** `bAllowNegativeScore` - argument 3. */
    get allowNegativeScore(): number;
    set allowNegativeScore(value: number);
}
/**
 * reapi: `RG_CBasePlayer_AddPointsToTeam` (const this, score, bAllowNegativeScore)
 */
export declare class AddPointsToTeamEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `score` - argument 2. */
    get score(): number;
    set score(value: number);
    /** `bAllowNegativeScore` - argument 3. */
    get allowNegativeScore(): number;
    set allowNegativeScore(value: number);
}
/**
 * Файл добавляется в то, что скачивают клиенты.
 *
 * reapi: `RH_SV_AddResource` (ResourceType_t:type, const filename[], size, flags, index)
 */
export declare class AddResourceEvent extends HookEvent {
    private readonly kind;
    /** Какой это файл: "sound", "model", "decal", "generic", ... */
    get resourceType(): ResourceType;
    set resourceType(value: ResourceType);
    /** `const filename[]` - argument 2. */
    get filename(): string;
    set filename(value: string);
    /** `size` - argument 3. */
    get size(): number;
    set size(value: number);
    /** `flags` - argument 4. */
    get flags(): number;
    set flags(value: number);
    /** Номер ресурса в списке. */
    get resourceIndex(): number;
    set resourceIndex(value: number);
}
/**
 * Called whenever player is on air (not touching floor)
 *
 * reapi: `RG_PM_AirAccelerate` (Float:wishdir[3], Float:wishspeed, Float:accel, const playerIndex)
 */
export declare class AirAccelerateEvent extends HookEvent {
    private readonly kind;
    /** `Float:wishdir[3]` - argument 1, read only. */
    get wishdir(): Vector;
    /** `Float:wishspeed` - argument 2. */
    get wishspeed(): number;
    set wishspeed(value: number);
    /** `Float:accel` - argument 3. */
    get accel(): number;
    set accel(value: number);
    /** `const playerIndex` - argument 4, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_PM_AirMove` (const playerIndex)
 */
export declare class AirMoveEvent extends HookEvent {
    private readonly kind;
    /** `const playerIndex` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called when an entity is created.
 *
 * reapi: `RH_ED_Alloc` ()
 */
export declare class AllocEvent extends HookEvent {
    private readonly kind;
    /** What the game answered (`Edict * (Entity index)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called before adding an entity to the physents of a player.
 *
 * reapi: `RH_SV_AllowPhysent` (const entity, const client)
 */
export declare class AllowPhysentEvent extends HookEvent {
    private readonly kind;
    /** `const entity` - argument 1, read only. */
    get entity(): Entity;
    /** `const client` - argument 2. */
    get client(): number;
    set client(value: number);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Called after game finished a bullet tracing for applying damage cached on multidamage data
 *
 * reapi: `RG_ApplyMultiDamage` (const pevInflictor, const pevAttacker)
 */
export declare class ApplyMultiDamageEvent extends HookEvent {
    private readonly kind;
    /** `const pevInflictor` - argument 1, read only. */
    get inflictor(): Entity;
    /** `const pevAttacker` - argument 2, read only. */
    get attacker(): Player;
}
/**
 * reapi: `RG_CSGameRules_BalanceTeams` ()
 */
export declare class BalanceTeamsEvent extends HookEvent {
    private readonly kind;
}
/**
 * reapi: `RG_CBasePlayer_Duck` (const this)
 */
export declare class BasePlayerDuckEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_Jump` (const this)
 */
export declare class BasePlayerJumpEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_Spawn` (const this)
 */
export declare class BasePlayerSpawnEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_Blind` (const this, Float:flUntilTime, Float:flHoldTime, Float:flFadeTime, iAlpha)
 */
export declare class BlindEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `Float:flUntilTime` - argument 2. */
    get untilTime(): number;
    set untilTime(value: number);
    /** `Float:flHoldTime` - argument 3. */
    get holdTime(): number;
    set holdTime(value: number);
    /** `Float:flFadeTime` - argument 4. */
    get fadeTime(): number;
    set fadeTime(value: number);
    /** `iAlpha` - argument 5. */
    get alpha(): number;
    set alpha(value: number);
}
/**
 * reapi: `RG_CGib_BounceGibTouch` (const this, pOther)
 */
export declare class BounceGibTouchEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get gib(): Entity;
    /** `pOther` - argument 2, read only. */
    get other(): Entity;
}
/**
 * The player buys ammo.
 *
 * reapi: `RG_BuyGunAmmo` (const index, const weapon_entity, const bool:blinkMoney)
 */
export declare class BuyGunAmmoEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `const weapon_entity` - argument 2. */
    get weapon_entity(): number;
    set weapon_entity(value: number);
    /** `const bool:blinkMoney` - argument 3. */
    get blinkMoney(): boolean;
    set blinkMoney(value: boolean);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Called when player buys an item from buy menu (Nightvision, Kevlar, etc.)
 *
 * reapi: `RG_BuyItem` (const pPlayer, iSlot)
 */
export declare class BuyItemEvent extends HookEvent {
    private readonly kind;
    /** `const pPlayer` - argument 1, read only. */
    get player(): Player;
    /** `iSlot` - argument 2. */
    get slot(): number;
    set slot(value: number);
}
/**
 * Игрок покупает оружие. В post-обработчике event.result - само оружие.
 *
 * reapi: `RG_BuyWeaponByWeaponID` (const index, const WeaponIdType:weaponID)
 */
export declare class BuyWeaponByWeaponIdEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** Какое оружие, как его называет weapon.kind: "ak47", "awp", ... */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
    /** What the game answered (`CBaseEntity * (Entity index of weapon)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayerWeapon_CanDeploy` (const this)
 */
export declare class CanDeployEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weapon(): Weapon;
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * The player is touching a CBasePlayerItem, do I give it to him?
 *
 * reapi: `RG_CSGameRules_CanHavePlayerItem` (const index, const item)
 */
export declare class CanHavePlayerItemEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `const item` - argument 2, read only. */
    get item(): Weapon;
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Слышит ли один игрок другого в голосовом чате. Верните true или false, чтобы решить.
 *
 * reapi: `RG_CSGameRules_CanPlayerHearPlayer` (const listener, const sender)
 */
export declare class CanPlayerHearPlayerEvent extends HookEvent {
    private readonly kind;
    /** Кто слушает. */
    get listener(): Player;
    /** Кто говорит. */
    get sender(): Player;
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Можно ли игроку перейти в команду. Верните true или false, чтобы решить.
 *
 * reapi: `RG_CBasePlayer_CanSwitchTeam` (const this, TeamName:teamToSwap)
 */
export declare class CanSwitchTeamEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** Команда, в которую он перейдёт. */
    get team(): Team;
    set team(value: Team);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CSGameRules_ChangeLevel` ()
 */
export declare class ChangeLevelEvent extends HookEvent {
    private readonly kind;
}
/**
 * reapi: `RG_CSGameRules_CheckMapConditions` ()
 */
export declare class CheckMapConditionsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called every client frame to check time based damage
 *
 * reapi: `RG_CBasePlayer_CheckTimeBasedDamage` (const this)
 */
export declare class CheckTimeBasedDamageEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called when a player's userinfo is being checked.
 *
 * reapi: `RH_SV_CheckUserInfo` (adr, buffer, bool:reconnect, reconnectSlot, name[])
 */
export declare class CheckUserInfoEvent extends HookEvent {
    private readonly kind;
    /** `adr` - argument 1. */
    get adr(): number;
    set adr(value: number);
    /** `buffer` - argument 2. */
    get buffer(): number;
    set buffer(value: number);
    /** `bool:reconnect` - argument 3. */
    get reconnect(): boolean;
    set reconnect(value: boolean);
    /** `reconnectSlot` - argument 4. */
    get reconnectSlot(): number;
    set reconnectSlot(value: number);
    /** `name[]` - argument 5. */
    get name(): string;
    set name(value: string);
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a player jumps on water for the first time
 *
 * reapi: `RG_PM_CheckWaterJump` (const playerIndex)
 */
export declare class CheckWaterJumpEvent extends HookEvent {
    private readonly kind;
    /** `const playerIndex` - argument 1, read only. */
    get player(): Player;
}
/**
 * Игра проверяет, не победила ли какая-то сторона. preventDefault() не даст ей закончить раунд.
 *
 * reapi: `RG_CSGameRules_CheckWinConditions` ()
 */
export declare class CheckWinConditionsEvent extends HookEvent {
    private readonly kind;
}
/**
 * reapi: `RG_HandleMenu_ChooseAppearance` (const index, const slot)
 */
export declare class ChooseAppearanceEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `const slot` - argument 2. */
    get slot(): number;
    set slot(value: number);
}
/**
 * Игрок выбрал пункт в меню команд. preventDefault() - и выбор не засчитается.
 *
 * reapi: `RG_HandleMenu_ChooseTeam` (const index, const MenuChooseTeam:slot)
 */
export declare class ChooseTeamEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** Что он выбрал: "TERRORIST", "CT", "VIP", "auto" или "SPECTATOR". Присвойте, чтобы изменить. */
    get choice(): TeamChoice;
    set choice(value: TeamChoice);
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayer_Classify` (const this)
 */
export declare class ClassifyEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Recreate all the map entities from the map data (preserving their indices),
 *
 * reapi: `RG_CSGameRules_CleanUpMap` ()
 */
export declare class CleanUpMapEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called when game clears multidamage data (before TraceAttack)
 *
 * reapi: `RG_ClearMultiDamage` ()
 */
export declare class ClearMultiDamageEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called after processing a client connection request.
 *
 * reapi: `RH_ClientConnected` (const client)
 */
export declare class ClientConnectedEvent extends HookEvent {
    private readonly kind;
    /** `const client` - argument 1. */
    get client(): number;
    set client(value: number);
}
/**
 * Called when message is being printed to client console.
 *
 * reapi: `RH_SV_ClientPrintf` (const string[])
 */
export declare class ClientPrintfEvent extends HookEvent {
    private readonly kind;
    /** `const string[]` - argument 1. */
    get string(): string;
    set string(value: string);
}
/**
 * The player has changed userinfo; can change it now.
 *
 * reapi: `RG_CSGameRules_ClientUserInfoChanged` (const index, infobuffer[])
 */
export declare class ClientUserInfoChangedEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `infobuffer[]` - argument 2. */
    get infobuffer(): string;
    set infobuffer(value: string);
}
/**
 * Called when processing a 'connect' client connectionless packet.
 *
 * reapi: `RH_SV_ConnectClient` ()
 */
export declare class ConnectClientEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called when a player drops a weapon (usually manual drop or death)
 *
 * reapi: `RG_CreateWeaponBox` (const weaponent, const owner, modelName[], Float:origin[3], Float:angles[3], Float:velocity[3], Float:lifeTime, bool:packAmmo)
 */
export declare class CreateWeaponBoxEvent extends HookEvent {
    private readonly kind;
    /** `const weaponent` - argument 1. */
    get weaponent(): number;
    set weaponent(value: number);
    /** `const owner` - argument 2, read only. */
    get owner(): Entity;
    /** `modelName[]` - argument 3. */
    get modelName(): string;
    set modelName(value: string);
    /** `Float:origin[3]` - argument 4, read only. */
    get origin(): Vector;
    /** `Float:angles[3]` - argument 5, read only. */
    get angles(): Vector;
    /** `Float:velocity[3]` - argument 6, read only. */
    get velocity(): Vector;
    /** `Float:lifeTime` - argument 7. */
    get lifeTime(): number;
    set lifeTime(value: number);
    /** `bool:packAmmo` - argument 8. */
    get packAmmo(): boolean;
    set packAmmo(value: boolean);
    /** What the game answered (`CWeaponBox * (Entity index of weaponbox)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * What do I do with player's weapons when he's killed?
 *
 * reapi: `RG_CSGameRules_DeadPlayerWeapons` (const index)
 */
export declare class DeadPlayerWeaponsEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Call this from within a GameRules class to report an obituary.
 *
 * reapi: `RG_CSGameRules_DeathNotice` (const victim, const killer, const inflictor)
 */
export declare class DeathNoticeEvent extends HookEvent {
    private readonly kind;
    /** `const victim` - argument 1, read only. */
    get victim(): Player;
    /** `const killer` - argument 2, read only. */
    get killer(): Player;
    /** `const inflictor` - argument 3, read only. */
    get inflictor(): Entity;
}
/**
 * Called when a client emits a "death sound" after death.
 *
 * reapi: `RG_CBasePlayer_DeathSound` (const this, lastHitGroup, bool:hasArmour)
 */
export declare class DeathSoundEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `lastHitGroup` - argument 2. */
    get lastHitGroup(): number;
    set lastHitGroup(value: number);
    /** `bool:hasArmour` - argument 3. */
    get hasArmour(): boolean;
    set hasArmour(value: boolean);
}
/**
 * Оружие достают. Присвойте event.viewModel / weaponModel, чтобы поменять модель.
 *
 * reapi: `RG_CBasePlayerWeapon_DefaultDeploy` (const this, szViewModel[], szWeaponModel[], iAnim, szAnimExt[], skiplocal)
 */
export declare class DefaultDeployEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weapon(): Weapon;
    /** `szViewModel[]` - argument 2. */
    get viewModel(): string;
    set viewModel(value: string);
    /** `szWeaponModel[]` - argument 3. */
    get weaponModel(): string;
    set weaponModel(value: string);
    /** `iAnim` - argument 4. */
    get anim(): number;
    set anim(value: number);
    /** `szAnimExt[]` - argument 5. */
    get animExt(): string;
    set animExt(value: string);
    /** `skiplocal` - argument 6. */
    get skiplocal(): number;
    set skiplocal(value: number);
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayerWeapon_DefaultReload` (const this, iClipSize, iAnim, Float:fDelay)
 */
export declare class DefaultReloadEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weapon(): Weapon;
    /** `iClipSize` - argument 2. */
    get clipSize(): number;
    set clipSize(value: number);
    /** `iAnim` - argument 3. */
    get anim(): number;
    set anim(value: number);
    /** `Float:fDelay` - argument 4. */
    get delay(): number;
    set delay(value: number);
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayerWeapon_DefaultShotgunReload` (const this, iAnim, iStartAnim, Float:fDelay, Float:fStartDelay, const pszReloadSound1[], const pszReloadSound2[])
 */
export declare class DefaultShotgunReloadEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weapon(): Weapon;
    /** `iAnim` - argument 2. */
    get anim(): number;
    set anim(value: number);
    /** `iStartAnim` - argument 3. */
    get startAnim(): number;
    set startAnim(value: number);
    /** `Float:fDelay` - argument 4. */
    get delay(): number;
    set delay(value: number);
    /** `Float:fStartDelay` - argument 5. */
    get startDelay(): number;
    set startDelay(value: number);
    /** `const pszReloadSound1[]` - argument 6. */
    get reloadSound1(): string;
    set reloadSound1(value: string);
    /** `const pszReloadSound2[]` - argument 7. */
    get reloadSound2(): string;
    set reloadSound2(value: string);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Called when a player has ended to defuses the bomb or when the previous defuser has taken off or been killed.
 *
 * reapi: `RG_CGrenade_DefuseBombEnd` (const this, const player, bool:bDefused)
 */
export declare class DefuseBombEndEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get grenade(): Entity;
    /** `const player` - argument 2, read only. */
    get player(): Player;
    /** `bool:bDefused` - argument 3. */
    get defused(): boolean;
    set defused(value: boolean);
}
/**
 * Called when a player goes to start defuse the bomb.
 *
 * reapi: `RG_CGrenade_DefuseBombStart` (const this, const player)
 */
export declare class DefuseBombStartEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get grenade(): Entity;
    /** `const player` - argument 2, read only. */
    get player(): Player;
}
/**
 * reapi: `RH_Cvar_DirectSet` (pcvar, const value[])
 */
export declare class DirectSetEvent extends HookEvent {
    private readonly kind;
    /** `pcvar` - argument 1. */
    get pcvar(): number;
    set pcvar(value: number);
    /** `const value[]` - argument 2. */
    get value(): string;
    set value(value: string);
}
/**
 * VIP player got to the point of rescue.
 *
 * reapi: `RG_CBasePlayer_Disappear` (const this)
 */
export declare class DisappearEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RH_SV_DropClient` (const client, bool:crash, const fmt[])
 */
export declare class DropClientEvent extends HookEvent {
    private readonly kind;
    /** `const client` - argument 1. */
    get client(): number;
    set client(value: number);
    /** `bool:crash` - argument 2. */
    get crash(): boolean;
    set crash(value: boolean);
    /** `const fmt[]` - argument 3. */
    get fmt(): string;
    set fmt(value: string);
}
/**
 * Called when a idle player is removed from server.
 *
 * reapi: `RG_CBasePlayer_DropIdlePlayer` (const this, const reason[])
 */
export declare class DropIdlePlayerEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `const reason[]` - argument 2. */
    get reason(): string;
    set reason(value: string);
}
/**
 * Игрок выбрасывает оружие. В post-обработчике event.result - коробка с оружием на земле.
 *
 * reapi: `RG_CBasePlayer_DropPlayerItem` (const this, const pszItemName[])
 */
export declare class DropPlayerItemEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** Имя оружия, "weapon_ak47". */
    get itemName(): string;
    set itemName(value: string);
    /** What the game answered (`CBaseEntity * (Entity index of item)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a player throws the shield on the ground.
 *
 * reapi: `RG_CBasePlayer_DropShield` (const this, bool:deploy)
 */
export declare class DropShieldEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `bool:deploy` - argument 2. */
    get deploy(): boolean;
    set deploy(value: boolean);
    /** What the game answered (`CBaseEntity * (Entity index of shield)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when client it's in the scoreboard
 *
 * reapi: `RH_SV_EmitPings` (const client)
 */
export declare class EmitPingsEvent extends HookEvent {
    private readonly kind;
    /** `const client` - argument 1. */
    get client(): number;
    set client(value: number);
}
/**
 * Called when game selects a spawn point (info_player_start/deathmatch) to position the player
 *
 * reapi: `RG_CBasePlayer_EntSelectSpawnPoint` (const this)
 */
export declare class EntSelectSpawnPointEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`edict_t * (Entity index of selected spawn point)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a command is being sent to server.
 *
 * reapi: `RH_ExecuteServerStringCmd` (const cmd[], source, id)
 */
export declare class ExecuteServerStringCmdEvent extends HookEvent {
    private readonly kind;
    /** `const cmd[]` - argument 1. */
    get cmd(): string;
    set cmd(value: string);
    /** `source` - argument 2. */
    get source(): number;
    set source(value: number);
    /** `id` - argument 3, read only. */
    get id(): Entity;
}
/**
 * Called when a C4 goes to explodes.
 *
 * reapi: `RG_CGrenade_ExplodeBomb` (const this, tracehandle, const bitsDamageType)
 */
export declare class ExplodeBombEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get grenade(): Entity;
    /** `tracehandle` - argument 2. */
    get tracehandle(): number;
    set tracehandle(value: number);
    /** `const bitsDamageType` - argument 3. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Called when a flashbang detonates.
 *
 * reapi: `RG_CGrenade_ExplodeFlashbang` (const this, tracehandle, const bitsDamageType)
 */
export declare class ExplodeFlashbangEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get grenade(): Entity;
    /** `tracehandle` - argument 2. */
    get tracehandle(): number;
    set tracehandle(value: number);
    /** `const bitsDamageType` - argument 3. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Called when a hegrenade detonates.
 *
 * reapi: `RG_CGrenade_ExplodeHeGrenade` (const this, tracehandle, const bitsDamageType)
 */
export declare class ExplodeHeGrenadeEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get grenade(): Entity;
    /** `tracehandle` - argument 2. */
    get tracehandle(): number;
    set tracehandle(value: number);
    /** `const bitsDamageType` - argument 3. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Дымовая граната взрывается.
 *
 * reapi: `RG_CGrenade_ExplodeSmokeGrenade` (const this)
 */
export declare class ExplodeSmokeGrenadeEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get grenade(): Entity;
}
/**
 * Is this player allowed to respawn now?
 *
 * reapi: `RG_CSGameRules_FPlayerCanRespawn` (const index)
 */
export declare class FPlayerCanRespawnEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Can this player take damage from this attacker?
 *
 * reapi: `RG_CSGameRules_FPlayerCanTakeDamage` (const index, const attacker)
 */
export declare class FPlayerCanTakeDamageEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `const attacker` - argument 2, read only. */
    get attacker(): Player;
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Should the player switch to this weapon?
 *
 * reapi: `RG_CSGameRules_FShouldSwitchWeapon` (const index, const weapon)
 */
export declare class FShouldSwitchWeaponEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `const weapon` - argument 2, read only. */
    get weapon(): Weapon;
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBaseEntity_FireBuckshots` (pEntity, cShots, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread[3], Float:flDistance, iTracerFreq, iDamage, pevAttacker)
 */
export declare class FireBuckshotsEvent extends HookEvent {
    private readonly kind;
    /** `pEntity` - argument 1, read only. */
    get entity(): Entity;
    /** `cShots` - argument 2. */
    get shots(): number;
    set shots(value: number);
    /** `Float:vecSrc[3]` - argument 3, read only. */
    get src(): Vector;
    /** `Float:vecDirShooting[3]` - argument 4, read only. */
    get dirShooting(): Vector;
    /** `Float:vecSpread[3]` - argument 5, read only. */
    get spread(): Vector;
    /** `Float:flDistance` - argument 6. */
    get distance(): number;
    set distance(value: number);
    /** `iTracerFreq` - argument 7. */
    get tracerFreq(): number;
    set tracerFreq(value: number);
    /** `iDamage` - argument 8. */
    get damage(): number;
    set damage(value: number);
    /** `pevAttacker` - argument 9, read only. */
    get attacker(): Player;
}
/**
 * reapi: `RG_CBaseEntity_FireBullets` (pEntity, cShots, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread[3], Float:flDistance, iBulletType, iTracerFreq, iDamage, pevAttacker)
 */
export declare class FireBulletsEvent extends HookEvent {
    private readonly kind;
    /** `pEntity` - argument 1, read only. */
    get entity(): Entity;
    /** `cShots` - argument 2. */
    get shots(): number;
    set shots(value: number);
    /** `Float:vecSrc[3]` - argument 3, read only. */
    get src(): Vector;
    /** `Float:vecDirShooting[3]` - argument 4, read only. */
    get dirShooting(): Vector;
    /** `Float:vecSpread[3]` - argument 5, read only. */
    get spread(): Vector;
    /** `Float:flDistance` - argument 6. */
    get distance(): number;
    set distance(value: number);
    /** `iBulletType` - argument 7. */
    get bulletType(): number;
    set bulletType(value: number);
    /** `iTracerFreq` - argument 8. */
    get tracerFreq(): number;
    set tracerFreq(value: number);
    /** `iDamage` - argument 9. */
    get damage(): number;
    set damage(value: number);
    /** `pevAttacker` - argument 10, read only. */
    get attacker(): Player;
}
/**
 * reapi: `RG_CBaseEntity_FireBullets3` (pEntity, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread, Float:flDistance, iPenetration, iBulletType, iDamage, Float:flRangeModifier, pevAttacker, bool:bPistol, shared_rand)
 */
export declare class FireBullets3Event extends HookEvent {
    private readonly kind;
    /** `pEntity` - argument 1, read only. */
    get entity(): Entity;
    /** `Float:vecSrc[3]` - argument 2, read only. */
    get src(): Vector;
    /** `Float:vecDirShooting[3]` - argument 3, read only. */
    get dirShooting(): Vector;
    /** `Float:vecSpread` - argument 4. */
    get spread(): number;
    set spread(value: number);
    /** `Float:flDistance` - argument 5. */
    get distance(): number;
    set distance(value: number);
    /** `iPenetration` - argument 6. */
    get penetration(): number;
    set penetration(value: number);
    /** `iBulletType` - argument 7. */
    get bulletType(): number;
    set bulletType(value: number);
    /** `iDamage` - argument 8. */
    get damage(): number;
    set damage(value: number);
    /** `Float:flRangeModifier` - argument 9. */
    get rangeModifier(): number;
    set rangeModifier(value: number);
    /** `pevAttacker` - argument 10, read only. */
    get attacker(): Player;
    /** `bool:bPistol` - argument 11. */
    get pistol(): boolean;
    set pistol(value: boolean);
    /** `shared_rand` - argument 12. */
    get shared_rand(): number;
    set shared_rand(value: number);
}
/**
 * Игра считает урон от падения. В post-обработчике event.result - это число; верните своё, чтобы заменить его.
 *
 * reapi: `RG_CSGameRules_FlPlayerFallDamage` (const index)
 */
export declare class FlPlayerFallDamageEvent extends HookEvent {
    private readonly kind;
    /** Кто упал. */
    get player(): Player;
    /** What the game answered (`float`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when an entity is removed (freed from server).
 *
 * reapi: `RH_ED_Free` (const entity)
 */
export declare class FreeEvent extends HookEvent {
    private readonly kind;
    /** `const entity` - argument 1, read only. */
    get entity(): Entity;
}
/**
 * reapi: `RH_GetEntityInit` (const classname[])
 */
export declare class GetEntityInitEvent extends HookEvent {
    private readonly kind;
    /** `const classname[]` - argument 1. */
    get classname(): string;
    set classname(value: string);
}
/**
 * reapi: `RG_GetForceCamera` (const pObserver)
 */
export declare class GetForceCameraEvent extends HookEvent {
    private readonly kind;
    /** `const pObserver` - argument 1, read only. */
    get observer(): Entity;
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a player enters the game.
 *
 * reapi: `RG_CBasePlayer_GetIntoGame` (const this)
 */
export declare class GetIntoGameEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * I can't use this weapon anymore, get me the next best one.
 *
 * reapi: `RG_CSGameRules_GetNextBestWeapon` (const index, const currentWeapon)
 */
export declare class GetNextBestWeaponEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `const currentWeapon` - argument 2. */
    get currentWeapon(): number;
    set currentWeapon(value: number);
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Place this player on his spawnspot and face him in the proper direction.
 *
 * reapi: `RG_CSGameRules_GetPlayerSpawnSpot` (const index)
 */
export declare class GetPlayerSpawnSpotEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`edict_t * (Entity index of spawnspot)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CGib_Spawn` (const this, const szGibModel[])
 */
export declare class GibSpawnEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get gib(): Entity;
    /** `const szGibModel[]` - argument 2. */
    get gibModel(): string;
    set gibModel(value: string);
}
/**
 * reapi: `RG_CBasePlayer_GiveAmmo` (const this, iAmount, szName[], iMax)
 */
export declare class GiveAmmoEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `iAmount` - argument 2. */
    get amount(): number;
    set amount(value: number);
    /** `szName[]` - argument 3. */
    get name(): string;
    set name(value: string);
    /** `iMax` - argument 4. */
    get max(): number;
    set max(value: number);
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CSGameRules_GiveC4` ()
 */
export declare class GiveC4Event extends HookEvent {
    private readonly kind;
    /** What the game answered (`CBasePlayer * (Entity index of player)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Player;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Игра выдаёт появившемуся игроку стандартное оружие. preventDefault() - и не выдаст ничего.
 *
 * reapi: `RG_CBasePlayer_GiveDefaultItems` (const this)
 */
export declare class GiveDefaultItemsEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_GiveNamedItem` (const this, const pszName[])
 */
export declare class GiveNamedItemEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `const pszName[]` - argument 2. */
    get name(): string;
    set name(value: string);
    /** What the game answered (`CBaseEntity * (Entity index of item)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayer_GiveShield` (const this, bool:bDeploy)
 */
export declare class GiveShieldEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `bool:bDeploy` - argument 2. */
    get deploy(): boolean;
    set deploy(value: boolean);
}
/**
 * reapi: `RG_CSGameRules_GoToIntermission` ()
 */
export declare class GoToIntermissionEvent extends HookEvent {
    private readonly kind;
}
/**
 * Запрещён ли игроку предмет. Верните true, чтобы запретить.
 *
 * reapi: `RG_CBasePlayer_HasRestrictItem` (const this, ItemID:item, ItemRestType:type)
 */
export declare class HasRestrictItemEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** `ItemID:item` - argument 2, read only. */
    get item(): Weapon;
    /** Как он его получит: "buying" (покупка), "touched" (подобрал) или "equipped" (выдан при спавне). */
    get restriction(): ItemRestriction;
    set restriction(value: ItemRestriction);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Игра показывает игроку подсказку.
 *
 * reapi: `RG_CBasePlayer_HintMessageEx` (const this, const message[], Float:duration, bool:bDisplayIfPlayerDead, bool:bOverride)
 */
export declare class HintMessageExEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** `const message[]` - argument 2. */
    get message(): string;
    set message(value: string);
    /** `Float:duration` - argument 3. */
    get duration(): number;
    set duration(value: number);
    /** `bool:bDisplayIfPlayerDead` - argument 4. */
    get displayIfPlayerDead(): boolean;
    set displayIfPlayerDead(value: boolean);
    /** Показывается и игроку, который отключил подсказки. */
    get displayIfHintsOff(): boolean;
    set displayIfHintsOff(value: boolean);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Игрок отправляет impulse: 100 - фонарик, 201 - спрей.
 *
 * reapi: `RG_CBasePlayer_ImpulseCommands` (const this)
 */
export declare class ImpulseCommandsEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
}
/**
 * Called when a player hit to entity.
 *
 * reapi: `RG_IsPenetrableEntity` (Float:vecSrc[3], Float:vecEnd[3], index, entity)
 */
export declare class IsPenetrableEntityEvent extends HookEvent {
    private readonly kind;
    /** `Float:vecSrc[3]` - argument 1, read only. */
    get src(): Vector;
    /** `Float:vecEnd[3]` - argument 2, read only. */
    get end(): Vector;
    /** `index` - argument 3, read only. */
    get player(): Player;
    /** `entity` - argument 4, read only. */
    get entity(): Entity;
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Called every client frame (PlayerPostThink) for the player's active weapon
 *
 * reapi: `RG_CBasePlayerWeapon_ItemPostFrame` (const this)
 */
export declare class ItemPostFrameEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weapon(): Weapon;
}
/**
 * Called when a client "thinks for the join status".
 *
 * reapi: `RG_CBasePlayer_JoiningThink` (const this)
 */
export declare class JoiningThinkEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called whenever player fires a weapon and shakes player screen (punchangles altering)
 *
 * reapi: `RG_CBasePlayerWeapon_KickBack` (const this, Float:up_base, Float:lateral_base, Float:up_modifier, Float:lateral_modifier, Float:p_max, Float:lateral_max, direction_change)
 */
export declare class KickBackEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weapon(): Weapon;
    /** `Float:up_base` - argument 2. */
    get up_base(): number;
    set up_base(value: number);
    /** `Float:lateral_base` - argument 3. */
    get lateral_base(): number;
    set lateral_base(value: number);
    /** `Float:up_modifier` - argument 4. */
    get up_modifier(): number;
    set up_modifier(value: number);
    /** `Float:lateral_modifier` - argument 5. */
    get lateral_modifier(): number;
    set lateral_modifier(value: number);
    /** `Float:p_max` - argument 6. */
    get p_max(): number;
    set p_max(value: number);
    /** `Float:lateral_max` - argument 7. */
    get lateral_max(): number;
    set lateral_max(value: number);
    /** `direction_change` - argument 8. */
    get direction_change(): number;
    set direction_change(value: number);
}
/**
 * reapi: `RG_CBasePlayer_Killed` (const this, pevAttacker, iGib)
 */
export declare class KilledEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `pevAttacker` - argument 2, read only. */
    get attacker(): Player;
    /** `iGib` - argument 3. */
    get gib(): number;
    set gib(value: number);
}
/**
 * Called when a player is on a ladder.
 *
 * reapi: `RG_PM_LadderMove` (const pLadder, const playerIndex)
 */
export declare class LadderMoveEvent extends HookEvent {
    private readonly kind;
    /** `const pLadder` - argument 1, read only. */
    get ladder(): Entity;
    /** `const playerIndex` - argument 2, read only. */
    get player(): Player;
}
/**
 * Makes a random player the bomber.
 *
 * reapi: `RG_CBasePlayer_MakeBomber` (const this)
 */
export declare class MakeBomberEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Makes a random player the VIP.
 *
 * reapi: `RG_CBasePlayer_MakeVIP` (const this)
 */
export declare class MakeVipEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_PM_Move` (const playerIndex)
 */
export declare class MoveEvent extends HookEvent {
    private readonly kind;
    /** `const playerIndex` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_ObjectCaps` (const this)
 */
export declare class ObjectCapsEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a client attempt to find the next observer.
 *
 * reapi: `RG_CBasePlayer_Observer_FindNextPlayer` (const this, bool bReverse, name[])
 */
export declare class ObserverFindNextPlayerEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `bool bReverse` - argument 2. */
    get arg2(): number;
    set arg2(value: number);
    /** `name[]` - argument 3. */
    get name(): string;
    set name(value: string);
}
/**
 * reapi: `RG_CBasePlayer_Observer_IsValidTarget` (const this, iPlayerIndex, bool:bSameTeam)
 */
export declare class ObserverIsValidTargetEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `iPlayerIndex` - argument 2. */
    get playerIndex(): number;
    set playerIndex(value: number);
    /** `bool:bSameTeam` - argument 3. */
    get sameTeam(): boolean;
    set sameTeam(value: boolean);
    /** What the game answered (`CBasePlayer *`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Player;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a client attempt to change the observer mode.
 *
 * reapi: `RG_CBasePlayer_Observer_SetMode` (const this, iMode)
 */
export declare class ObserverSetModeEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `iMode` - argument 2. */
    get mode(): number;
    set mode(value: number);
}
/**
 * reapi: `RG_CBasePlayer_Observer_Think` (const this)
 */
export declare class ObserverThinkEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Игра сообщает ботам, что что-то произошло.
 *
 * reapi: `RG_CBotManager_OnEvent` (GameEventType:event, const pEntity, const pOther)
 */
export declare class OnEventEvent extends HookEvent {
    private readonly kind;
    /** Что произошло: "weaponFired", "playerDied", "bombPlanted", "roundStart", ... */
    get gameEvent(): BotEvent;
    set gameEvent(value: BotEvent);
    /** `const pEntity` - argument 2, read only. */
    get entity(): Entity;
    /** `const pOther` - argument 3, read only. */
    get other(): Entity;
}
/**
 * Закончилось время заморозки в начале раунда.
 *
 * reapi: `RG_CSGameRules_OnRoundFreezeEnd` ()
 */
export declare class OnRoundFreezeEndEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called on spawn, the attempt to equip a player.
 *
 * reapi: `RG_CBasePlayer_OnSpawnEquip` (const this, bool:addDefault, bool:equipGame)
 */
export declare class OnSpawnEquipEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `bool:addDefault` - argument 2. */
    get addDefault(): boolean;
    set addDefault(value: boolean);
    /** `bool:equipGame` - argument 3. */
    get equipGame(): boolean;
    set equipGame(value: boolean);
}
/**
 * Called when a client emits a "pain sound" after received damage.
 *
 * reapi: `RG_CBasePlayer_Pain` (const this)
 */
export declare class PainEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called when a player plant's the bomb on the ground.
 *
 * reapi: `RG_PlantBomb` (const index, Float:vecStart[3], Float:vecVelocity[3])
 */
export declare class PlantBombEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `Float:vecStart[3]` - argument 2, read only. */
    get start(): Vector;
    /** `Float:vecVelocity[3]` - argument 3, read only. */
    get velocity(): Vector;
    /** What the game answered (`CGrenade * (Entity index of bomb)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called whenever player emits an step sound
 *
 * reapi: `RG_PM_PlayStepSound` (step, Float:fvol, const playerIndex)
 */
export declare class PlayStepSoundEvent extends HookEvent {
    private readonly kind;
    /** `step` - argument 1. */
    get step(): number;
    set step(value: number);
    /** `Float:fvol` - argument 2. */
    get fvol(): number;
    set fvol(value: number);
    /** `const playerIndex` - argument 3, read only. */
    get player(): Player;
}
/**
 * Флешка ослепляет игрока. preventDefault() - и он ничего не заметит.
 *
 * reapi: `RG_PlayerBlind` (const index, const inflictor, const attacker, const Float:fadeTime, const Float:fadeHold, const alpha, Float:color[3])
 */
export declare class PlayerBlindEvent extends HookEvent {
    private readonly kind;
    /** Кого ослепляет. */
    get player(): Player;
    /** `const inflictor` - argument 2, read only. */
    get inflictor(): Entity;
    /** `const attacker` - argument 3, read only. */
    get attacker(): Player;
    /** `const Float:fadeTime` - argument 4. */
    get fadeTime(): number;
    set fadeTime(value: number);
    /** `const Float:fadeHold` - argument 5. */
    get fadeHold(): number;
    set fadeHold(value: number);
    /** `const alpha` - argument 6. */
    get alpha(): number;
    set alpha(value: number);
    /** Цвет вспышки, [r, g, b] как Vector. Только чтение. */
    get color(): Vector;
}
/**
 * reapi: `RG_CBasePlayer_PlayerDeathThink` (const this)
 */
export declare class PlayerDeathThinkEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called each time player gets a weapon linked to his inventory
 *
 * reapi: `RG_CSGameRules_PlayerGotWeapon` (const pPlayer, const pWeapon)
 */
export declare class PlayerGotWeaponEvent extends HookEvent {
    private readonly kind;
    /** `const pPlayer` - argument 1, read only. */
    get player(): Player;
    /** `const pWeapon` - argument 2, read only. */
    get weapon(): Weapon;
}
/**
 * Игрока убили.
 *
 * reapi: `RG_CSGameRules_PlayerKilled` (const victim, const killer, const inflictor)
 */
export declare class PlayerKilledEvent extends HookEvent {
    private readonly kind;
    /** Кто погиб. */
    get victim(): Player;
    /** Кто убил. */
    get killer(): Player;
    /** Чем убили. */
    get inflictor(): Entity;
}
/**
 * Игрок появился на карте (спавн).
 *
 * reapi: `RG_CSGameRules_PlayerSpawn` (const index)
 */
export declare class PlayerSpawnEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
}
/**
 * Called on every frame to check player ducking
 *
 * reapi: `RG_PM_Duck` (const playerIndex)
 */
export declare class PmDuckEvent extends HookEvent {
    private readonly kind;
    /** `const playerIndex` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called on every frame while player presses jump button
 *
 * reapi: `RG_PM_Jump` (const playerIndex)
 */
export declare class PmJumpEvent extends HookEvent {
    private readonly kind;
    /** `const playerIndex` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_PostThink` (const this)
 */
export declare class PostThinkEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Каждый кадр для каждого игрока, до его движения - сотни раз в секунду. Обработчик должен быть очень лёгким.
 *
 * reapi: `RG_CBasePlayer_PreThink` (const this)
 */
export declare class PreThinkEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_Precache` (const this)
 */
export declare class PrecacheEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called when a generic resource is being added to generic precache list.
 *
 * reapi: `RH_PF_precache_generic_I` (const string[])
 */
export declare class PrecacheGenericIEvent extends HookEvent {
    private readonly kind;
    /** `const string[]` - argument 1. */
    get string(): string;
    set string(value: string);
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a model is being added to model precache list.
 *
 * reapi: `RH_PF_precache_model_I` (const string[])
 */
export declare class PrecacheModelIEvent extends HookEvent {
    private readonly kind;
    /** `const string[]` - argument 1. */
    get string(): string;
    set string(value: string);
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a sound is being added to sound precache list.
 *
 * reapi: `RH_PF_precache_sound_I` (const string[])
 */
export declare class PrecacheSoundIEvent extends HookEvent {
    private readonly kind;
    /** `const string[]` - argument 1. */
    get string(): string;
    set string(value: string);
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a message is being sent to the server's console.
 *
 * reapi: `RH_Con_Printf` (const string[])
 */
export declare class PrintfEvent extends HookEvent {
    private readonly kind;
    /** `const string[]` - argument 1. */
    get string(): string;
    set string(value: string);
}
/**
 * Отправляется радиосообщение. preventDefault() заглушит его.
 *
 * reapi: `RG_CBasePlayer_Radio` (const this, const msg_id[], const msg_verbose[], pitch, bool:showIcon)
 */
export declare class RadioEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** `const msg_id[]` - argument 2. */
    get msg_id(): string;
    set msg_id(value: string);
    /** `const msg_verbose[]` - argument 3. */
    get msg_verbose(): string;
    set msg_verbose(value: string);
    /** `pitch` - argument 4. */
    get pitch(): number;
    set pitch(value: number);
    /** `bool:showIcon` - argument 5. */
    get showIcon(): boolean;
    set showIcon(value: boolean);
}
/**
 * reapi: `RG_CBasePlayer_RemoveAllItems` (const this, bool:removeSuit)
 */
export declare class RemoveAllItemsEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `bool:removeSuit` - argument 2. */
    get removeSuit(): boolean;
    set removeSuit(value: boolean);
}
/**
 * reapi: `RG_CSGameRules_RemoveGuns` ()
 */
export declare class RemoveGunsEvent extends HookEvent {
    private readonly kind;
}
/**
 * reapi: `RG_CBasePlayer_RemovePlayerItem` (const this, const pItem)
 */
export declare class RemovePlayerItemEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `const pItem` - argument 2, read only. */
    get item(): Weapon;
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called when a player's remove protection.
 *
 * reapi: `RG_CBasePlayer_RemoveSpawnProtection` (const this)
 */
export declare class RemoveSpawnProtectionEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Игра сбрасывает скорость игрока - при спавне и каждой смене оружия. preventDefault() оставит скорость, которую вы задали.
 *
 * reapi: `RG_CBasePlayer_ResetMaxSpeed` (const this)
 */
export declare class ResetMaxSpeedEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
}
/**
 * reapi: `RG_CBaseAnimating_ResetSequenceInfo` (const this)
 */
export declare class ResetSequenceInfoEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get entity(): Entity;
}
/**
 * Начинается новый раунд.
 *
 * reapi: `RG_CSGameRules_RestartRound` ()
 */
export declare class RestartRoundEvent extends HookEvent {
    private readonly kind;
}
/**
 * Раунд заканчивается.
 *
 * reapi: `RG_RoundEnd` (WinStatus:status, ScenarioEventEndRound:event, Float:tmDelay)
 */
export declare class RoundEndEvent extends HookEvent {
    private readonly kind;
    /** Кто победил: "TERRORIST", "CT", "draw" или "none" - как у game.endRound. Присвойте, чтобы изменить. */
    get winner(): RoundWinner;
    set winner(value: RoundWinner);
    /** Почему раунд закончился: "terroristsWin", "ctsWin", "bombDefused", "targetSaved", "gameRestart", ... "unknown" - номер, которому у игры нет имени. */
    get reason(): RoundEndReason;
    set reason(value: RoundEndReason);
    /** Секунд до следующего раунда. */
    get delay(): number;
    set delay(value: number);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayer_RoundRespawn` (const this)
 */
export declare class RoundRespawnEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Игра сообщает всем, кто кого убил.
 *
 * reapi: `RG_CSGameRules_SendDeathMessage` (const pKiller, const pVictim, const pAssister, const pevInflictor, const killerWeaponName[], const DeathMessageFlags:iDeathMessageFlags, const KillRarity:iRarityOfKill)
 */
export declare class SendDeathMessageEvent extends HookEvent {
    private readonly kind;
    /** `const pKiller` - argument 1, read only. */
    get killer(): Player;
    /** `const pVictim` - argument 2, read only. */
    get victim(): Player;
    /** `const pAssister` - argument 3, read only. */
    get assister(): Entity;
    /** `const pevInflictor` - argument 4, read only. */
    get inflictor(): Entity;
    /** `const killerWeaponName[]` - argument 5. */
    get killerWeaponName(): string;
    set killerWeaponName(value: string);
    /** Что ещё несёт сообщение: "Position", "Assistant", "KillRarity". */
    get flags(): DeathMessageFlag[];
    set flags(values: DeathMessageFlag[]);
    /** Чем убийство необычно: "Headshot", "NoScope", "Penetrated", "InAir", ... */
    get rarity(): KillRarity[];
    set rarity(values: KillRarity[]);
}
/**
 * Called when server sends resources list and location.
 *
 * reapi: `RH_SV_SendResources` (const client)
 */
export declare class SendResourcesEvent extends HookEvent {
    private readonly kind;
    /** `const client` - argument 1. */
    get client(): number;
    set client(value: number);
}
/**
 * Called whenever game sends an animation to his current holder (player)
 *
 * reapi: `RG_CBasePlayerWeapon_SendWeaponAnim` (const this, iAnim, skiplocal)
 */
export declare class SendWeaponAnimEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weapon(): Weapon;
    /** `iAnim` - argument 2. */
    get anim(): number;
    set anim(value: number);
    /** `skiplocal` - argument 3. */
    get skiplocal(): number;
    set skiplocal(value: number);
}
/**
 * reapi: `RG_CSGameRules_ServerDeactivate` ()
 */
export declare class ServerDeactivateEvent extends HookEvent {
    private readonly kind;
}
/**
 * reapi: `RG_CBasePlayer_SetAnimation` (const this, PLAYER_ANIM:playerAnim)
 */
export declare class SetAnimationEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `PLAYER_ANIM:playerAnim` - argument 2, read only. */
    get playerAnim(): Player;
}
/**
 * reapi: `RG_CBasePlayer_SetClientUserInfoModel` (const this, infobuffer[], szNewModel[])
 */
export declare class SetClientUserInfoModelEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `infobuffer[]` - argument 2. */
    get infobuffer(): string;
    set infobuffer(value: string);
    /** `szNewModel[]` - argument 3. */
    get newModel(): string;
    set newModel(value: string);
}
/**
 * reapi: `RG_CBasePlayer_SetClientUserInfoName` (const this, infobuffer[], szNewName[])
 */
export declare class SetClientUserInfoNameEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `infobuffer[]` - argument 2. */
    get infobuffer(): string;
    set infobuffer(value: string);
    /** `szNewName[]` - argument 3. */
    get newName(): string;
    set newName(value: string);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Called when a player dies to pack up the appropriate weapons and ammo items, and creates a weaponbox that falls to floor with sets specify the model or when a player drop the item.
 *
 * reapi: `RG_CWeaponBox_SetModel` (const this, const szModelName[])
 */
export declare class SetModelEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get weaponBox(): Entity;
    /** `const szModelName[]` - argument 2. */
    get modelName(): string;
    set modelName(value: string);
}
/**
 * Called when a player's set protection.
 *
 * reapi: `RG_CBasePlayer_SetSpawnProtection` (const this, Float:time)
 */
export declare class SetSpawnProtectionEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `Float:time` - argument 2. */
    get time(): number;
    set time(value: number);
}
/**
 * Игра показывает игроку меню.
 *
 * reapi: `RG_ShowMenu` (const index, const bitsSlots, const iDisplayTime, const iNeedMore, pszText[])
 */
export declare class ShowMenuEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** `const bitsSlots` - argument 2. */
    get slots(): number;
    set slots(value: number);
    /** `const iDisplayTime` - argument 3. */
    get displayTime(): number;
    set displayTime(value: number);
    /** `const iNeedMore` - argument 4. */
    get needMore(): number;
    set needMore(value: number);
    /** `pszText[]` - argument 5. */
    get text(): string;
    set text(value: string);
}
/**
 * Игра показывает игроку VGUI-меню (выбор команды).
 *
 * reapi: `RG_ShowVGUIMenu` (const index, VGUIMenu:menuType, const bitsSlots, szOldMenu[])
 */
export declare class ShowVguiMenuEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
    /** Какое меню: "team", "classT", "classCT", "buy", "buyPistol", ... */
    get menu(): VguiMenu;
    set menu(value: VguiMenu);
    /** `const bitsSlots` - argument 3. */
    get slots(): number;
    set slots(value: number);
    /** `szOldMenu[]` - argument 4. */
    get oldMenu(): string;
    set oldMenu(value: string);
}
/**
 * reapi: `RG_SpawnHeadGib` (pevVictim)
 */
export declare class SpawnHeadGibEvent extends HookEvent {
    private readonly kind;
    /** `pevVictim` - argument 1, read only. */
    get victim(): Player;
    /** What the game answered (`CGib * (Entity index of gib)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_SpawnRandomGibs` (pevVictim, cGibs, human)
 */
export declare class SpawnRandomGibsEvent extends HookEvent {
    private readonly kind;
    /** `pevVictim` - argument 1, read only. */
    get victim(): Player;
    /** `cGibs` - argument 2. */
    get gibs(): number;
    set gibs(value: number);
    /** `human` - argument 3. */
    get human(): number;
    set human(value: number);
}
/**
 * Включается камера погибшего игрока.
 *
 * reapi: `RG_CBasePlayer_StartDeathCam` (const this)
 */
export declare class StartDeathCamEvent extends HookEvent {
    private readonly kind;
    /** Игрок, о котором событие. */
    get player(): Player;
}
/**
 * The player goes into observer mode.
 *
 * reapi: `RG_CBasePlayer_StartObserver` (const this, Float:vecPosition[3], Float:vecViewAngle[3])
 */
export declare class StartObserverEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `Float:vecPosition[3]` - argument 2, read only. */
    get position(): Vector;
    /** `Float:vecViewAngle[3]` - argument 3, read only. */
    get viewAngle(): Vector;
}
/**
 * Сейчас прозвучит звук. Присвойте event.sample, чтобы заменить его, или preventDefault(), чтобы заглушить.
 *
 * reapi: `RH_SV_StartSound` (const recipients, const entity, const channel, const sample[], const volume, Float:attenuation, const fFlags, const pitch)
 */
export declare class StartSoundEvent extends HookEvent {
    private readonly kind;
    /** `const recipients` - argument 1. */
    get recipients(): number;
    set recipients(value: number);
    /** `const entity` - argument 2, read only. */
    get entity(): Entity;
    /** `const channel` - argument 3. */
    get channel(): number;
    set channel(value: number);
    /** `const sample[]` - argument 4. */
    get sample(): string;
    set sample(value: string);
    /** `const volume` - argument 5. */
    get volume(): number;
    set volume(value: number);
    /** `Float:attenuation` - argument 6. */
    get attenuation(): number;
    set attenuation(value: number);
    /** `const fFlags` - argument 7. */
    get flags(): number;
    set flags(value: number);
    /** `const pitch` - argument 8. */
    get pitch(): number;
    set pitch(value: number);
}
/**
 * Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things.
 *
 * reapi: `RG_CBasePlayer_SwitchTeam` (const this)
 */
export declare class SwitchTeamEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Игрок сейчас получит урон. Верните число - столько он и получит, или вызовите preventDefault(), чтобы урона не было.
 *
 * reapi: `RG_CBasePlayer_TakeDamage` (const this, pevInflictor, pevAttacker, Float:flDamage, bitsDamageType)
 */
export declare class TakeDamageEvent extends HookEvent {
    private readonly kind;
    /** Кого ранят. */
    get player(): Player;
    /** Чем ранили: оружие, граната, мир. */
    get inflictor(): Entity;
    /** Кто ранил. */
    get attacker(): Player;
    /** Сколько, до брони. Присвойте, чтобы изменить. */
    get damage(): number;
    set damage(value: number);
    /** Вид урона: "Fall", "Bullet", "Burn", ... */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /** What the game answered (`int`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * reapi: `RG_CBasePlayer_TakeHealth` (const this, Float:flHealth, bitsDamageType)
 */
export declare class TakeHealthEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `Float:flHealth` - argument 2. */
    get health(): number;
    set health(value: number);
    /** `bitsDamageType` - argument 3. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /** What the game answered (`BOOL`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): number;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Called each time player tries to join a team to ensure availability
 *
 * reapi: `RG_CSGameRules_TeamFull` (team_id)
 */
export declare class TeamFullEvent extends HookEvent {
    private readonly kind;
    /** `team_id` - argument 1. */
    get team_id(): number;
    set team_id(value: number);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar)
 *
 * reapi: `RG_CSGameRules_TeamStacked` (newTeam_id, curTeam_id)
 */
export declare class TeamStackedEvent extends HookEvent {
    private readonly kind;
    /** `newTeam_id` - argument 1. */
    get newTeam_id(): number;
    set newTeam_id(value: number);
    /** `curTeam_id` - argument 2. */
    get curTeam_id(): number;
    set curTeam_id(value: number);
    /** What the game answered (`bool`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): boolean;
    /** Blocks the game's function; the chain answers false. */
    preventDefault(): void;
}
/**
 * Called every server frame to process game rules
 *
 * reapi: `RG_CSGameRules_Think` ()
 */
export declare class ThinkEvent extends HookEvent {
    private readonly kind;
}
/**
 * Игрок бросил флешку. В post-обработчике event.result - сама граната.
 *
 * reapi: `RG_ThrowFlashbang` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time)
 */
export declare class ThrowFlashbangEvent extends HookEvent {
    private readonly kind;
    /** Кто бросил. */
    get player(): Player;
    /** `Float:vecStart[3]` - argument 2, read only. */
    get start(): Vector;
    /** `Float:vecVelocity[3]` - argument 3, read only. */
    get velocity(): Vector;
    /** `Float:time` - argument 4. */
    get time(): number;
    set time(value: number);
    /** What the game answered (`CGrenade * (Entity index of flashbang)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Игрок бросает гранату.
 *
 * reapi: `RG_CBasePlayer_ThrowGrenade` (const this, const grenade, Float:vecSrc[3], Float:vecThrow[3], Float:time, const usEvent)
 */
export declare class ThrowGrenadeEvent extends HookEvent {
    private readonly kind;
    /** Кто бросил. */
    get player(): Player;
    /** `const grenade` - argument 2. */
    get grenade(): number;
    set grenade(value: number);
    /** `Float:vecSrc[3]` - argument 3, read only. */
    get src(): Vector;
    /** Её скорость, Vector. Только чтение. */
    get velocity(): Vector;
    /** `Float:time` - argument 5. */
    get time(): number;
    set time(value: number);
    /** `const usEvent` - argument 6. */
    get usEvent(): number;
    set usEvent(value: number);
    /** What the game answered (`CGrenade * (Entity index of grenade)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Игрок бросил осколочную гранату. В post-обработчике event.result - сама граната.
 *
 * reapi: `RG_ThrowHeGrenade` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time, const team, const usEvent)
 */
export declare class ThrowHeGrenadeEvent extends HookEvent {
    private readonly kind;
    /** Кто бросил. */
    get player(): Player;
    /** Откуда летит граната, Vector. Только чтение. */
    get start(): Vector;
    /** Её скорость, Vector. Только чтение. */
    get velocity(): Vector;
    /** `Float:time` - argument 4. */
    get time(): number;
    set time(value: number);
    /** `const team` - argument 5. */
    get team(): number;
    set team(value: number);
    /** `const usEvent` - argument 6. */
    get usEvent(): number;
    set usEvent(value: number);
    /** What the game answered (`CGrenade * (Entity index of hegrenade)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Игрок бросил дымовую гранату. В post-обработчике event.result - сама граната.
 *
 * reapi: `RG_ThrowSmokeGrenade` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time, const usEvent)
 */
export declare class ThrowSmokeGrenadeEvent extends HookEvent {
    private readonly kind;
    /** Кто бросил. */
    get player(): Player;
    /** Откуда летит граната, Vector. Только чтение. */
    get start(): Vector;
    /** Её скорость, Vector. Только чтение. */
    get velocity(): Vector;
    /** `Float:time` - argument 4. */
    get time(): number;
    set time(value: number);
    /** `const usEvent` - argument 5. */
    get usEvent(): number;
    set usEvent(value: number);
    /** What the game answered (`CGrenade * (Entity index of smokegrenade)`) - read it in a post hook. To answer, return a value from the handler. */
    get result(): Entity;
    /** Blocks the game's function; the chain answers 0. */
    preventDefault(): void;
}
/**
 * Выстрел или нож попал в игрока, ещё до урона. preventDefault() - и попадания не было.
 *
 * reapi: `RG_CBasePlayer_TraceAttack` (const this, pevAttacker, Float:flDamage, Float:vecDir[3], tracehandle, bitsDamageType)
 */
export declare class TraceAttackEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
    /** `pevAttacker` - argument 2, read only. */
    get attacker(): Player;
    /** `Float:flDamage` - argument 3. */
    get damage(): number;
    set damage(value: number);
    /** Направление выстрела, Vector. Только чтение. */
    get dir(): Vector;
    /** `tracehandle` - argument 5. */
    get tracehandle(): number;
    set tracehandle(value: number);
    /** `bitsDamageType` - argument 6. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * reapi: `RG_RadiusFlash_TraceLine` (const index, inflictor, attacker, Float:vecSrc[3], Float:vecSpot[3], tracehandle)
 */
export declare class TraceLineEvent extends HookEvent {
    private readonly kind;
    /** `const index` - argument 1, read only. */
    get player(): Player;
    /** `inflictor` - argument 2, read only. */
    get inflictor(): Entity;
    /** `attacker` - argument 3, read only. */
    get attacker(): Player;
    /** `Float:vecSrc[3]` - argument 4, read only. */
    get src(): Vector;
    /** `Float:vecSpot[3]` - argument 5, read only. */
    get spot(): Vector;
    /** `tracehandle` - argument 6. */
    get tracehandle(): number;
    set tracehandle(value: number);
}
/**
 * Called whenever player tries to unduck
 *
 * reapi: `RG_PM_UnDuck` (const playerIndex)
 */
export declare class UnDuckEvent extends HookEvent {
    private readonly kind;
    /** `const playerIndex` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_CBasePlayer_UpdateClientData` (const this)
 */
export declare class UpdateClientDataEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * Called when a player press use and if a suitable candidate is not found.
 *
 * reapi: `RG_CBasePlayer_UseEmpty` (const this)
 */
export declare class UseEmptyEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get player(): Player;
}
/**
 * reapi: `RG_CGib_WaitTillLand` (const this)
 */
export declare class WaitTillLandEvent extends HookEvent {
    private readonly kind;
    /** `const this` - argument 1, read only. */
    get gib(): Entity;
}
/**
 * Called on every frame after a player jumps on water for a short period of time
 *
 * reapi: `RG_PM_WaterJump` (const playerIndex)
 */
export declare class WaterJumpEvent extends HookEvent {
    private readonly kind;
    /** `const playerIndex` - argument 1, read only. */
    get player(): Player;
}
/**
 * Receiver is player index or 0 when update will be sended to all.
 *
 * reapi: `RH_SV_WriteFullClientUpdate` (const client, buffer, const receiver)
 */
export declare class WriteFullClientUpdateEvent extends HookEvent {
    private readonly kind;
    /** `const client` - argument 1. */
    get client(): number;
    set client(value: number);
    /** `buffer` - argument 2. */
    get buffer(): number;
    set buffer(value: number);
    /** `const receiver` - argument 3, read only. */
    get receiver(): Player;
}
/**
 * Every reapi hookchain, by the name game.addEventListener takes - the event
 * it hands the listener. What an editor completes; the compiler reads it
 * through the same patch as ServerEventMap (runtime/patches).
 */
export interface GameEventMap {
    /** reapi `RH_SV_ActivateServer`. */
    activateServer: ActivateServerEvent;
    /** У игрока меняются деньги. Присвойте event.amount, чтобы изменить сумму. - reapi `RG_CBasePlayer_AddAccount`. */
    addAccount: AddAccountEvent;
    /** Called inside TraceAttack to store entity damage to multidamage data - reapi `RG_AddMultiDamage`. */
    addMultiDamage: AddMultiDamageEvent;
    /** reapi `RG_CBasePlayer_AddPlayerItem`. */
    addPlayerItem: AddPlayerItemEvent;
    /** reapi `RG_CBasePlayer_AddPoints`. */
    addPoints: AddPointsEvent;
    /** reapi `RG_CBasePlayer_AddPointsToTeam`. */
    addPointsToTeam: AddPointsToTeamEvent;
    /** Файл добавляется в то, что скачивают клиенты. - reapi `RH_SV_AddResource`. */
    addResource: AddResourceEvent;
    /** Called whenever player is on air (not touching floor) - reapi `RG_PM_AirAccelerate`. */
    airAccelerate: AirAccelerateEvent;
    /** reapi `RG_PM_AirMove`. */
    airMove: AirMoveEvent;
    /** Called when an entity is created. - reapi `RH_ED_Alloc`. */
    alloc: AllocEvent;
    /** Called before adding an entity to the physents of a player. - reapi `RH_SV_AllowPhysent`. */
    allowPhysent: AllowPhysentEvent;
    /** Called after game finished a bullet tracing for applying damage cached on multidamage data - reapi `RG_ApplyMultiDamage`. */
    applyMultiDamage: ApplyMultiDamageEvent;
    /** reapi `RG_CSGameRules_BalanceTeams`. */
    balanceTeams: BalanceTeamsEvent;
    /** reapi `RG_CBasePlayer_Duck`. */
    basePlayerDuck: BasePlayerDuckEvent;
    /** reapi `RG_CBasePlayer_Jump`. */
    basePlayerJump: BasePlayerJumpEvent;
    /** reapi `RG_CBasePlayer_Spawn`. */
    basePlayerSpawn: BasePlayerSpawnEvent;
    /** reapi `RG_CBasePlayer_Blind`. */
    blind: BlindEvent;
    /** reapi `RG_CGib_BounceGibTouch`. */
    bounceGibTouch: BounceGibTouchEvent;
    /** The player buys ammo. - reapi `RG_BuyGunAmmo`. */
    buyGunAmmo: BuyGunAmmoEvent;
    /** Called when player buys an item from buy menu (Nightvision, Kevlar, etc.) - reapi `RG_BuyItem`. */
    buyItem: BuyItemEvent;
    /** Игрок покупает оружие. В post-обработчике event.result - само оружие. - reapi `RG_BuyWeaponByWeaponID`. */
    buyWeaponByWeaponId: BuyWeaponByWeaponIdEvent;
    /** reapi `RG_CBasePlayerWeapon_CanDeploy`. */
    canDeploy: CanDeployEvent;
    /** The player is touching a CBasePlayerItem, do I give it to him? - reapi `RG_CSGameRules_CanHavePlayerItem`. */
    canHavePlayerItem: CanHavePlayerItemEvent;
    /** Слышит ли один игрок другого в голосовом чате. Верните true или false, чтобы решить. - reapi `RG_CSGameRules_CanPlayerHearPlayer`. */
    canPlayerHearPlayer: CanPlayerHearPlayerEvent;
    /** Можно ли игроку перейти в команду. Верните true или false, чтобы решить. - reapi `RG_CBasePlayer_CanSwitchTeam`. */
    canSwitchTeam: CanSwitchTeamEvent;
    /** reapi `RG_CSGameRules_ChangeLevel`. */
    changeLevel: ChangeLevelEvent;
    /** reapi `RG_CSGameRules_CheckMapConditions`. */
    checkMapConditions: CheckMapConditionsEvent;
    /** Called every client frame to check time based damage - reapi `RG_CBasePlayer_CheckTimeBasedDamage`. */
    checkTimeBasedDamage: CheckTimeBasedDamageEvent;
    /** Called when a player's userinfo is being checked. - reapi `RH_SV_CheckUserInfo`. */
    checkUserInfo: CheckUserInfoEvent;
    /** Called when a player jumps on water for the first time - reapi `RG_PM_CheckWaterJump`. */
    checkWaterJump: CheckWaterJumpEvent;
    /** Игра проверяет, не победила ли какая-то сторона. preventDefault() не даст ей закончить раунд. - reapi `RG_CSGameRules_CheckWinConditions`. */
    checkWinConditions: CheckWinConditionsEvent;
    /** reapi `RG_HandleMenu_ChooseAppearance`. */
    chooseAppearance: ChooseAppearanceEvent;
    /** Игрок выбрал пункт в меню команд. preventDefault() - и выбор не засчитается. - reapi `RG_HandleMenu_ChooseTeam`. */
    chooseTeam: ChooseTeamEvent;
    /** reapi `RG_CBasePlayer_Classify`. */
    classify: ClassifyEvent;
    /** Recreate all the map entities from the map data (preserving their indices), - reapi `RG_CSGameRules_CleanUpMap`. */
    cleanUpMap: CleanUpMapEvent;
    /** Called when game clears multidamage data (before TraceAttack) - reapi `RG_ClearMultiDamage`. */
    clearMultiDamage: ClearMultiDamageEvent;
    /** Called after processing a client connection request. - reapi `RH_ClientConnected`. */
    clientConnected: ClientConnectedEvent;
    /** Called when message is being printed to client console. - reapi `RH_SV_ClientPrintf`. */
    clientPrintf: ClientPrintfEvent;
    /** The player has changed userinfo; can change it now. - reapi `RG_CSGameRules_ClientUserInfoChanged`. */
    clientUserInfoChanged: ClientUserInfoChangedEvent;
    /** Called when processing a 'connect' client connectionless packet. - reapi `RH_SV_ConnectClient`. */
    connectClient: ConnectClientEvent;
    /** Called when a player drops a weapon (usually manual drop or death) - reapi `RG_CreateWeaponBox`. */
    createWeaponBox: CreateWeaponBoxEvent;
    /** What do I do with player's weapons when he's killed? - reapi `RG_CSGameRules_DeadPlayerWeapons`. */
    deadPlayerWeapons: DeadPlayerWeaponsEvent;
    /** Call this from within a GameRules class to report an obituary. - reapi `RG_CSGameRules_DeathNotice`. */
    deathNotice: DeathNoticeEvent;
    /** Called when a client emits a "death sound" after death. - reapi `RG_CBasePlayer_DeathSound`. */
    deathSound: DeathSoundEvent;
    /** Оружие достают. Присвойте event.viewModel / weaponModel, чтобы поменять модель. - reapi `RG_CBasePlayerWeapon_DefaultDeploy`. */
    defaultDeploy: DefaultDeployEvent;
    /** reapi `RG_CBasePlayerWeapon_DefaultReload`. */
    defaultReload: DefaultReloadEvent;
    /** reapi `RG_CBasePlayerWeapon_DefaultShotgunReload`. */
    defaultShotgunReload: DefaultShotgunReloadEvent;
    /** Called when a player has ended to defuses the bomb or when the previous defuser has taken off or been killed. - reapi `RG_CGrenade_DefuseBombEnd`. */
    defuseBombEnd: DefuseBombEndEvent;
    /** Called when a player goes to start defuse the bomb. - reapi `RG_CGrenade_DefuseBombStart`. */
    defuseBombStart: DefuseBombStartEvent;
    /** reapi `RH_Cvar_DirectSet`. */
    directSet: DirectSetEvent;
    /** VIP player got to the point of rescue. - reapi `RG_CBasePlayer_Disappear`. */
    disappear: DisappearEvent;
    /** reapi `RH_SV_DropClient`. */
    dropClient: DropClientEvent;
    /** Called when a idle player is removed from server. - reapi `RG_CBasePlayer_DropIdlePlayer`. */
    dropIdlePlayer: DropIdlePlayerEvent;
    /** Игрок выбрасывает оружие. В post-обработчике event.result - коробка с оружием на земле. - reapi `RG_CBasePlayer_DropPlayerItem`. */
    dropPlayerItem: DropPlayerItemEvent;
    /** Called when a player throws the shield on the ground. - reapi `RG_CBasePlayer_DropShield`. */
    dropShield: DropShieldEvent;
    /** Called when client it's in the scoreboard - reapi `RH_SV_EmitPings`. */
    emitPings: EmitPingsEvent;
    /** Called when game selects a spawn point (info_player_start/deathmatch) to position the player - reapi `RG_CBasePlayer_EntSelectSpawnPoint`. */
    entSelectSpawnPoint: EntSelectSpawnPointEvent;
    /** Called when a command is being sent to server. - reapi `RH_ExecuteServerStringCmd`. */
    executeServerStringCmd: ExecuteServerStringCmdEvent;
    /** Called when a C4 goes to explodes. - reapi `RG_CGrenade_ExplodeBomb`. */
    explodeBomb: ExplodeBombEvent;
    /** Called when a flashbang detonates. - reapi `RG_CGrenade_ExplodeFlashbang`. */
    explodeFlashbang: ExplodeFlashbangEvent;
    /** Called when a hegrenade detonates. - reapi `RG_CGrenade_ExplodeHeGrenade`. */
    explodeHeGrenade: ExplodeHeGrenadeEvent;
    /** Дымовая граната взрывается. - reapi `RG_CGrenade_ExplodeSmokeGrenade`. */
    explodeSmokeGrenade: ExplodeSmokeGrenadeEvent;
    /** Is this player allowed to respawn now? - reapi `RG_CSGameRules_FPlayerCanRespawn`. */
    fPlayerCanRespawn: FPlayerCanRespawnEvent;
    /** Can this player take damage from this attacker? - reapi `RG_CSGameRules_FPlayerCanTakeDamage`. */
    fPlayerCanTakeDamage: FPlayerCanTakeDamageEvent;
    /** Should the player switch to this weapon? - reapi `RG_CSGameRules_FShouldSwitchWeapon`. */
    fShouldSwitchWeapon: FShouldSwitchWeaponEvent;
    /** reapi `RG_CBaseEntity_FireBuckshots`. */
    fireBuckshots: FireBuckshotsEvent;
    /** reapi `RG_CBaseEntity_FireBullets`. */
    fireBullets: FireBulletsEvent;
    /** reapi `RG_CBaseEntity_FireBullets3`. */
    fireBullets3: FireBullets3Event;
    /** Игра считает урон от падения. В post-обработчике event.result - это число; верните своё, чтобы заменить его. - reapi `RG_CSGameRules_FlPlayerFallDamage`. */
    flPlayerFallDamage: FlPlayerFallDamageEvent;
    /** Called when an entity is removed (freed from server). - reapi `RH_ED_Free`. */
    free: FreeEvent;
    /** reapi `RH_GetEntityInit`. */
    getEntityInit: GetEntityInitEvent;
    /** reapi `RG_GetForceCamera`. */
    getForceCamera: GetForceCameraEvent;
    /** Called when a player enters the game. - reapi `RG_CBasePlayer_GetIntoGame`. */
    getIntoGame: GetIntoGameEvent;
    /** I can't use this weapon anymore, get me the next best one. - reapi `RG_CSGameRules_GetNextBestWeapon`. */
    getNextBestWeapon: GetNextBestWeaponEvent;
    /** Place this player on his spawnspot and face him in the proper direction. - reapi `RG_CSGameRules_GetPlayerSpawnSpot`. */
    getPlayerSpawnSpot: GetPlayerSpawnSpotEvent;
    /** reapi `RG_CGib_Spawn`. */
    gibSpawn: GibSpawnEvent;
    /** reapi `RG_CBasePlayer_GiveAmmo`. */
    giveAmmo: GiveAmmoEvent;
    /** reapi `RG_CSGameRules_GiveC4`. */
    giveC4: GiveC4Event;
    /** Игра выдаёт появившемуся игроку стандартное оружие. preventDefault() - и не выдаст ничего. - reapi `RG_CBasePlayer_GiveDefaultItems`. */
    giveDefaultItems: GiveDefaultItemsEvent;
    /** reapi `RG_CBasePlayer_GiveNamedItem`. */
    giveNamedItem: GiveNamedItemEvent;
    /** reapi `RG_CBasePlayer_GiveShield`. */
    giveShield: GiveShieldEvent;
    /** reapi `RG_CSGameRules_GoToIntermission`. */
    goToIntermission: GoToIntermissionEvent;
    /** Запрещён ли игроку предмет. Верните true, чтобы запретить. - reapi `RG_CBasePlayer_HasRestrictItem`. */
    hasRestrictItem: HasRestrictItemEvent;
    /** Игра показывает игроку подсказку. - reapi `RG_CBasePlayer_HintMessageEx`. */
    hintMessageEx: HintMessageExEvent;
    /** Игрок отправляет impulse: 100 - фонарик, 201 - спрей. - reapi `RG_CBasePlayer_ImpulseCommands`. */
    impulseCommands: ImpulseCommandsEvent;
    /** Called when a player hit to entity. - reapi `RG_IsPenetrableEntity`. */
    isPenetrableEntity: IsPenetrableEntityEvent;
    /** Called every client frame (PlayerPostThink) for the player's active weapon - reapi `RG_CBasePlayerWeapon_ItemPostFrame`. */
    itemPostFrame: ItemPostFrameEvent;
    /** Called when a client "thinks for the join status". - reapi `RG_CBasePlayer_JoiningThink`. */
    joiningThink: JoiningThinkEvent;
    /** Called whenever player fires a weapon and shakes player screen (punchangles altering) - reapi `RG_CBasePlayerWeapon_KickBack`. */
    kickBack: KickBackEvent;
    /** reapi `RG_CBasePlayer_Killed`. */
    killed: KilledEvent;
    /** Called when a player is on a ladder. - reapi `RG_PM_LadderMove`. */
    ladderMove: LadderMoveEvent;
    /** Makes a random player the bomber. - reapi `RG_CBasePlayer_MakeBomber`. */
    makeBomber: MakeBomberEvent;
    /** Makes a random player the VIP. - reapi `RG_CBasePlayer_MakeVIP`. */
    makeVip: MakeVipEvent;
    /** reapi `RG_PM_Move`. */
    move: MoveEvent;
    /** reapi `RG_CBasePlayer_ObjectCaps`. */
    objectCaps: ObjectCapsEvent;
    /** Called when a client attempt to find the next observer. - reapi `RG_CBasePlayer_Observer_FindNextPlayer`. */
    observerFindNextPlayer: ObserverFindNextPlayerEvent;
    /** reapi `RG_CBasePlayer_Observer_IsValidTarget`. */
    observerIsValidTarget: ObserverIsValidTargetEvent;
    /** Called when a client attempt to change the observer mode. - reapi `RG_CBasePlayer_Observer_SetMode`. */
    observerSetMode: ObserverSetModeEvent;
    /** reapi `RG_CBasePlayer_Observer_Think`. */
    observerThink: ObserverThinkEvent;
    /** Игра сообщает ботам, что что-то произошло. - reapi `RG_CBotManager_OnEvent`. */
    onEvent: OnEventEvent;
    /** Закончилось время заморозки в начале раунда. - reapi `RG_CSGameRules_OnRoundFreezeEnd`. */
    onRoundFreezeEnd: OnRoundFreezeEndEvent;
    /** Called on spawn, the attempt to equip a player. - reapi `RG_CBasePlayer_OnSpawnEquip`. */
    onSpawnEquip: OnSpawnEquipEvent;
    /** Called when a client emits a "pain sound" after received damage. - reapi `RG_CBasePlayer_Pain`. */
    pain: PainEvent;
    /** Called when a player plant's the bomb on the ground. - reapi `RG_PlantBomb`. */
    plantBomb: PlantBombEvent;
    /** Called whenever player emits an step sound - reapi `RG_PM_PlayStepSound`. */
    playStepSound: PlayStepSoundEvent;
    /** Флешка ослепляет игрока. preventDefault() - и он ничего не заметит. - reapi `RG_PlayerBlind`. */
    playerBlind: PlayerBlindEvent;
    /** reapi `RG_CBasePlayer_PlayerDeathThink`. */
    playerDeathThink: PlayerDeathThinkEvent;
    /** Called each time player gets a weapon linked to his inventory - reapi `RG_CSGameRules_PlayerGotWeapon`. */
    playerGotWeapon: PlayerGotWeaponEvent;
    /** Игрока убили. - reapi `RG_CSGameRules_PlayerKilled`. */
    playerKilled: PlayerKilledEvent;
    /** Игрок появился на карте (спавн). - reapi `RG_CSGameRules_PlayerSpawn`. */
    playerSpawn: PlayerSpawnEvent;
    /** Called on every frame to check player ducking - reapi `RG_PM_Duck`. */
    pmDuck: PmDuckEvent;
    /** Called on every frame while player presses jump button - reapi `RG_PM_Jump`. */
    pmJump: PmJumpEvent;
    /** reapi `RG_CBasePlayer_PostThink`. */
    postThink: PostThinkEvent;
    /** Каждый кадр для каждого игрока, до его движения - сотни раз в секунду. Обработчик должен быть очень лёгким. - reapi `RG_CBasePlayer_PreThink`. */
    preThink: PreThinkEvent;
    /** reapi `RG_CBasePlayer_Precache`. */
    precache: PrecacheEvent;
    /** Called when a generic resource is being added to generic precache list. - reapi `RH_PF_precache_generic_I`. */
    precacheGenericI: PrecacheGenericIEvent;
    /** Called when a model is being added to model precache list. - reapi `RH_PF_precache_model_I`. */
    precacheModelI: PrecacheModelIEvent;
    /** Called when a sound is being added to sound precache list. - reapi `RH_PF_precache_sound_I`. */
    precacheSoundI: PrecacheSoundIEvent;
    /** Called when a message is being sent to the server's console. - reapi `RH_Con_Printf`. */
    printf: PrintfEvent;
    /** Отправляется радиосообщение. preventDefault() заглушит его. - reapi `RG_CBasePlayer_Radio`. */
    radio: RadioEvent;
    /** reapi `RG_CBasePlayer_RemoveAllItems`. */
    removeAllItems: RemoveAllItemsEvent;
    /** reapi `RG_CSGameRules_RemoveGuns`. */
    removeGuns: RemoveGunsEvent;
    /** reapi `RG_CBasePlayer_RemovePlayerItem`. */
    removePlayerItem: RemovePlayerItemEvent;
    /** Called when a player's remove protection. - reapi `RG_CBasePlayer_RemoveSpawnProtection`. */
    removeSpawnProtection: RemoveSpawnProtectionEvent;
    /** Игра сбрасывает скорость игрока - при спавне и каждой смене оружия. preventDefault() оставит скорость, которую вы задали. - reapi `RG_CBasePlayer_ResetMaxSpeed`. */
    resetMaxSpeed: ResetMaxSpeedEvent;
    /** reapi `RG_CBaseAnimating_ResetSequenceInfo`. */
    resetSequenceInfo: ResetSequenceInfoEvent;
    /** Начинается новый раунд. - reapi `RG_CSGameRules_RestartRound`. */
    restartRound: RestartRoundEvent;
    /** Раунд заканчивается. - reapi `RG_RoundEnd`. */
    roundEnd: RoundEndEvent;
    /** reapi `RG_CBasePlayer_RoundRespawn`. */
    roundRespawn: RoundRespawnEvent;
    /** Игра сообщает всем, кто кого убил. - reapi `RG_CSGameRules_SendDeathMessage`. */
    sendDeathMessage: SendDeathMessageEvent;
    /** Called when server sends resources list and location. - reapi `RH_SV_SendResources`. */
    sendResources: SendResourcesEvent;
    /** Called whenever game sends an animation to his current holder (player) - reapi `RG_CBasePlayerWeapon_SendWeaponAnim`. */
    sendWeaponAnim: SendWeaponAnimEvent;
    /** reapi `RG_CSGameRules_ServerDeactivate`. */
    serverDeactivate: ServerDeactivateEvent;
    /** reapi `RG_CBasePlayer_SetAnimation`. */
    setAnimation: SetAnimationEvent;
    /** reapi `RG_CBasePlayer_SetClientUserInfoModel`. */
    setClientUserInfoModel: SetClientUserInfoModelEvent;
    /** reapi `RG_CBasePlayer_SetClientUserInfoName`. */
    setClientUserInfoName: SetClientUserInfoNameEvent;
    /** Called when a player dies to pack up the appropriate weapons and ammo items, and creates a weaponbox that falls to floor with sets specify the model or when a player drop the item. - reapi `RG_CWeaponBox_SetModel`. */
    setModel: SetModelEvent;
    /** Called when a player's set protection. - reapi `RG_CBasePlayer_SetSpawnProtection`. */
    setSpawnProtection: SetSpawnProtectionEvent;
    /** Игра показывает игроку меню. - reapi `RG_ShowMenu`. */
    showMenu: ShowMenuEvent;
    /** Игра показывает игроку VGUI-меню (выбор команды). - reapi `RG_ShowVGUIMenu`. */
    showVguiMenu: ShowVguiMenuEvent;
    /** reapi `RG_SpawnHeadGib`. */
    spawnHeadGib: SpawnHeadGibEvent;
    /** reapi `RG_SpawnRandomGibs`. */
    spawnRandomGibs: SpawnRandomGibsEvent;
    /** Включается камера погибшего игрока. - reapi `RG_CBasePlayer_StartDeathCam`. */
    startDeathCam: StartDeathCamEvent;
    /** The player goes into observer mode. - reapi `RG_CBasePlayer_StartObserver`. */
    startObserver: StartObserverEvent;
    /** Сейчас прозвучит звук. Присвойте event.sample, чтобы заменить его, или preventDefault(), чтобы заглушить. - reapi `RH_SV_StartSound`. */
    startSound: StartSoundEvent;
    /** Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things. - reapi `RG_CBasePlayer_SwitchTeam`. */
    switchTeam: SwitchTeamEvent;
    /** Игрок сейчас получит урон. Верните число - столько он и получит, или вызовите preventDefault(), чтобы урона не было. - reapi `RG_CBasePlayer_TakeDamage`. */
    takeDamage: TakeDamageEvent;
    /** reapi `RG_CBasePlayer_TakeHealth`. */
    takeHealth: TakeHealthEvent;
    /** Called each time player tries to join a team to ensure availability - reapi `RG_CSGameRules_TeamFull`. */
    teamFull: TeamFullEvent;
    /** Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar) - reapi `RG_CSGameRules_TeamStacked`. */
    teamStacked: TeamStackedEvent;
    /** Called every server frame to process game rules - reapi `RG_CSGameRules_Think`. */
    think: ThinkEvent;
    /** Игрок бросил флешку. В post-обработчике event.result - сама граната. - reapi `RG_ThrowFlashbang`. */
    throwFlashbang: ThrowFlashbangEvent;
    /** Игрок бросает гранату. - reapi `RG_CBasePlayer_ThrowGrenade`. */
    throwGrenade: ThrowGrenadeEvent;
    /** Игрок бросил осколочную гранату. В post-обработчике event.result - сама граната. - reapi `RG_ThrowHeGrenade`. */
    throwHeGrenade: ThrowHeGrenadeEvent;
    /** Игрок бросил дымовую гранату. В post-обработчике event.result - сама граната. - reapi `RG_ThrowSmokeGrenade`. */
    throwSmokeGrenade: ThrowSmokeGrenadeEvent;
    /** Выстрел или нож попал в игрока, ещё до урона. preventDefault() - и попадания не было. - reapi `RG_CBasePlayer_TraceAttack`. */
    traceAttack: TraceAttackEvent;
    /** reapi `RG_RadiusFlash_TraceLine`. */
    traceLine: TraceLineEvent;
    /** Called whenever player tries to unduck - reapi `RG_PM_UnDuck`. */
    unDuck: UnDuckEvent;
    /** reapi `RG_CBasePlayer_UpdateClientData`. */
    updateClientData: UpdateClientDataEvent;
    /** Called when a player press use and if a suitable candidate is not found. - reapi `RG_CBasePlayer_UseEmpty`. */
    useEmpty: UseEmptyEvent;
    /** reapi `RG_CGib_WaitTillLand`. */
    waitTillLand: WaitTillLandEvent;
    /** Called on every frame after a player jumps on water for a short period of time - reapi `RG_PM_WaterJump`. */
    waterJump: WaterJumpEvent;
    /** Receiver is player index or 0 when update will be sended to all. - reapi `RH_SV_WriteFullClientUpdate`. */
    writeFullClientUpdate: WriteFullClientUpdateEvent;
}
/**
 * What a listener may return for each chain: the chain's answer type, or
 * void for one that answers nothing. Only the editor reads this - it is the
 * constraint on a listener's return type.
 */
export interface GameAnswerMap {
    activateServer: void;
    addAccount: void;
    addMultiDamage: void;
    addPlayerItem: number;
    addPoints: void;
    addPointsToTeam: void;
    addResource: void;
    airAccelerate: void;
    airMove: void;
    alloc: Entity;
    allowPhysent: boolean;
    applyMultiDamage: void;
    balanceTeams: void;
    basePlayerDuck: void;
    basePlayerJump: void;
    basePlayerSpawn: void;
    blind: void;
    bounceGibTouch: void;
    buyGunAmmo: boolean;
    buyItem: void;
    buyWeaponByWeaponId: Entity;
    canDeploy: number;
    canHavePlayerItem: number;
    canPlayerHearPlayer: boolean;
    canSwitchTeam: boolean;
    changeLevel: void;
    checkMapConditions: void;
    checkTimeBasedDamage: void;
    checkUserInfo: number;
    checkWaterJump: void;
    checkWinConditions: void;
    chooseAppearance: void;
    chooseTeam: number;
    classify: number;
    cleanUpMap: void;
    clearMultiDamage: void;
    clientConnected: void;
    clientPrintf: void;
    clientUserInfoChanged: void;
    connectClient: void;
    createWeaponBox: Entity;
    deadPlayerWeapons: number;
    deathNotice: void;
    deathSound: void;
    defaultDeploy: number;
    defaultReload: number;
    defaultShotgunReload: boolean;
    defuseBombEnd: void;
    defuseBombStart: void;
    directSet: void;
    disappear: void;
    dropClient: void;
    dropIdlePlayer: void;
    dropPlayerItem: Entity;
    dropShield: Entity;
    emitPings: void;
    entSelectSpawnPoint: Entity;
    executeServerStringCmd: void;
    explodeBomb: void;
    explodeFlashbang: void;
    explodeHeGrenade: void;
    explodeSmokeGrenade: void;
    fPlayerCanRespawn: number;
    fPlayerCanTakeDamage: number;
    fShouldSwitchWeapon: number;
    fireBuckshots: void;
    fireBullets: void;
    fireBullets3: void;
    flPlayerFallDamage: number;
    free: void;
    getEntityInit: void;
    getForceCamera: number;
    getIntoGame: boolean;
    getNextBestWeapon: number;
    getPlayerSpawnSpot: Entity;
    gibSpawn: void;
    giveAmmo: number;
    giveC4: Player;
    giveDefaultItems: void;
    giveNamedItem: Entity;
    giveShield: void;
    goToIntermission: void;
    hasRestrictItem: boolean;
    hintMessageEx: boolean;
    impulseCommands: void;
    isPenetrableEntity: boolean;
    itemPostFrame: void;
    joiningThink: void;
    kickBack: void;
    killed: void;
    ladderMove: void;
    makeBomber: boolean;
    makeVip: void;
    move: void;
    objectCaps: number;
    observerFindNextPlayer: void;
    observerIsValidTarget: Player;
    observerSetMode: void;
    observerThink: void;
    onEvent: void;
    onRoundFreezeEnd: void;
    onSpawnEquip: void;
    pain: void;
    plantBomb: Entity;
    playStepSound: void;
    playerBlind: void;
    playerDeathThink: void;
    playerGotWeapon: void;
    playerKilled: void;
    playerSpawn: void;
    pmDuck: void;
    pmJump: void;
    postThink: void;
    preThink: void;
    precache: void;
    precacheGenericI: number;
    precacheModelI: number;
    precacheSoundI: number;
    printf: void;
    radio: void;
    removeAllItems: void;
    removeGuns: void;
    removePlayerItem: number;
    removeSpawnProtection: void;
    resetMaxSpeed: void;
    resetSequenceInfo: void;
    restartRound: void;
    roundEnd: boolean;
    roundRespawn: void;
    sendDeathMessage: void;
    sendResources: void;
    sendWeaponAnim: void;
    serverDeactivate: void;
    setAnimation: void;
    setClientUserInfoModel: void;
    setClientUserInfoName: boolean;
    setModel: void;
    setSpawnProtection: void;
    showMenu: void;
    showVguiMenu: void;
    spawnHeadGib: Entity;
    spawnRandomGibs: void;
    startDeathCam: void;
    startObserver: void;
    startSound: void;
    switchTeam: void;
    takeDamage: number;
    takeHealth: number;
    teamFull: boolean;
    teamStacked: boolean;
    think: void;
    throwFlashbang: Entity;
    throwGrenade: Entity;
    throwHeGrenade: Entity;
    throwSmokeGrenade: Entity;
    traceAttack: void;
    traceLine: void;
    unDuck: void;
    updateClientData: void;
    useEmpty: void;
    waitTillLand: void;
    waterJump: void;
    writeFullClientUpdate: void;
}
/** Adds a listener for the chain whose event is E - game.addEventListener's hood. */
export declare function addGameListener<E, R>(listener: (event: E) => R, post: bool): void;
/** Takes a listener off again - game.removeEventListener's hood. */
export declare function removeGameListener<E, R>(listener: (event: E) => R, post: bool): void;
