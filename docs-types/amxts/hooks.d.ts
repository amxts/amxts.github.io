/// <reference path="../as-types.d.ts" />
import { Player, RoundWinner, Team, TouchEvent, UseType, Vector } from "./facade";
import { Entity, Weapon, WeaponKind } from "./entities";
import { Damage } from "./flags";
/** What every game event can do. */
export declare class HookEvent {
    /** @hidden Ham Sandwich delivered the event rather than reapi: the arguments and the answer go back its way. */
    __ham: bool;
    private written;
    private writtenText;
    private writtenVector;
    /** An argument as the handler sees it now: its own write, or what came in. */
    protected __cell(index: i32): i32;
    protected __text(index: i32): string;
    protected __vector(index: i32): Vector;
    /** Writes a number argument back: `atype` says how it is read, a float as its bits. */
    protected __set(index: i32, atype: i32, cell: i32): void;
    protected __setText(index: i32, value: string): void;
    protected __setEntity(index: i32, id: number): void;
    protected __setVector(index: i32, value: Vector): void;
    /** The game's answer as a cell - ATYPE_EDICT is an entity. */
    protected __resultCell(atype: i32): i32;
    protected __resultText(): string;
    protected __resultVector(): Vector;
    /** @hidden A listener's answer: the game's function's result, and in a pre listener the function blocked. */
    __answer(atype: i32, cell: i32, post: bool): void;
    /** @hidden */
    __answerText(value: string, post: bool): void;
    /** @hidden */
    __answerVector(value: Vector, post: bool): void;
    /**
     * Blocks a function that answers: reapi wants the answer set first -
     * "Can't suppress original function call without new return value set" -
     * so it is the neutral one.
     */
    protected __block(atype: i32): void;
    /**
     * Blocks the game's function this event is about. For one that answers, return the answer from the handler instead; this is for blocking without one.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
    /**
     * Stops the event: the game's function does not run, and neither do other plugins' listeners where the game can stop them. Rarely what is wanted; preventDefault() usually is.
     *
     * Pawn: `HC_BREAK`
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
/**
 * The reason a player is paid. "unknown" - a number the include does not name.
 *
 * Pawn: `RewardType`
 */
export type RewardReason = "none" | "roundBonus" | "playerReset" | "playerJoin" | "playerSpecJoin" | "playerBoughtSomething" | "hostageTook" | "hostageRescued" | "hostageDamaged" | "hostageKilled" | "teammatesKilled" | "enemyKilled" | "intoGame" | "vipKilled" | "vipRescuedMyself" | "unknown";
/**
 * The kind of file a resource is: a sound, a model, a decal, ...
 *
 * Pawn: `ResourceType_t`
 */
export type ResourceType = "sound" | "skin" | "model" | "decal" | "generic" | "eventscript" | "world" | "unknown";
/**
 * The player's pick in the team menu; the sides by the names Team gives them. "unknown" - a number the include does not name.
 *
 * Pawn: `MenuChooseTeam`
 */
export type TeamChoice = "TERRORIST" | "CT" | "VIP" | "auto" | "SPECTATOR" | "unknown";
/**
 * The way a player would get the item a restriction is asked about: buying, touching, equipping. "unknown" - a number the include does not name.
 *
 * Pawn: `ItemRestType`
 */
export type ItemRestriction = "buying" | "touched" | "equipped" | "unknown";
/**
 * The game event the bots are told about. "unknown" - a number the include does not name.
 *
 * Pawn: `GameEventType`
 */
export type BotEvent = "invalid" | "weaponFired" | "weaponFiredOnEmpty" | "weaponReloaded" | "heGrenadeExploded" | "flashbangGrenadeExploded" | "smokeGrenadeExploded" | "grenadeBounced" | "beingShotAt" | "playerBlindedByFlashbang" | "playerFootstep" | "playerJumped" | "playerDied" | "playerLandedFromHeight" | "playerTookDamage" | "hostageDamaged" | "hostageKilled" | "door" | "breakGlass" | "breakWood" | "breakMetal" | "breakFlesh" | "breakConcrete" | "bombPlanted" | "bombDropped" | "bombPickedUp" | "bombBeep" | "bombDefusing" | "bombDefuseAborted" | "bombDefused" | "bombExploded" | "hostageUsed" | "hostageRescued" | "allHostagesRescued" | "vipEscaped" | "vipAssassinated" | "terroristsWin" | "ctsWin" | "roundDraw" | "roundWin" | "roundLoss" | "roundStart" | "playerSpawned" | "clientCorpseSpawned" | "buyTimeStart" | "playerLeftBuyZone" | "deathCameraStart" | "killAll" | "roundTime" | "die" | "kill" | "headshot" | "killFlashbanged" | "tutorBuyMenuOpenned" | "tutorAutobuy" | "playerBoughtSomething" | "tutorNotBuyingAnything" | "tutorNeedToBuyPrimaryWeapon" | "tutorNeedToBuyPrimaryAmmo" | "tutorNeedToBuySecondaryAmmo" | "tutorNeedToBuyArmor" | "tutorNeedToBuyDefuseKit" | "tutorNeedToBuyGrenade" | "careerTaskDone" | "startRadio1" | "radioCoverMe" | "radioYouTakeThePoint" | "radioHoldThisPosition" | "radioRegroupTeam" | "radioFollowMe" | "radioTakingFire" | "startRadio2" | "radioGoGoGo" | "radioTeamFallBack" | "radioStickTogetherTeam" | "radioGetInPositionAndWait" | "radioStormTheFront" | "radioReportInTeam" | "startRadio3" | "radioAffirmative" | "radioEnemySpotted" | "radioNeedBackup" | "radioSectorClear" | "radioInPosition" | "radioReportingIn" | "radioGetOutOfThere" | "radioNegative" | "radioEnemyDown" | "endRadio" | "newMatch" | "playerChangedTeam" | "bulletImpact" | "gameCommence" | "weaponZoomed" | "hostageCalledForHelp" | "unknown";
/**
 * The reason a round ended, e.g. "targetBomb", "bombDefused", "ctsWin", "targetSaved". "unknown" - a number the include does not name.
 *
 * Pawn: `ScenarioEventEndRound`
 */
export type RoundEndReason = "none" | "targetBomb" | "vipEscaped" | "vipAssassinated" | "terroristsEscaped" | "ctsPreventEscape" | "escapingTerroristsNeutralized" | "bombDefused" | "ctsWin" | "terroristsWin" | "endDraw" | "allHostagesRescued" | "targetSaved" | "hostageNotRescued" | "terroristsNotEscaped" | "vipNotEscaped" | "gameCommence" | "gameRestart" | "gameOver" | "unknown";
/**
 * The extras a death message carries.
 *
 * Pawn: `DeathMessageFlags`
 */
export type DeathMessageFlag = "Position" | "Assistant" | "KillRarity";
/**
 * The things that made a kill rare: a headshot, through smoke, in the air, ...
 *
 * Pawn: `KillRarity`
 */
export type KillRarity = "Headshot" | "KillerBlind" | "NoScope" | "Penetrated" | "ThruSmoke" | "AssistedFlash" | "DominationBegan" | "Domination" | "Revenge" | "InAir";
/**
 * A VGUI menu of the game: the team menu, the class menu, the buy menu, ... "unknown" - a number the include does not name.
 *
 * Pawn: `VGUIMenu`
 */
export type VguiMenu = "team" | "mapBriefing" | "classT" | "classCT" | "buy" | "buyPistol" | "buyShotGun" | "buyRifle" | "buySubMachineGun" | "buyMachineGun" | "buyItem" | "unknown";
/**
 * Usually called to activate some objects.
 *
 * Pawn: `Ham_Activate`
 */
export declare class ActivateEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Pawn: `RH_SV_ActivateServer` (const runPhysics)
 */
export declare class ActivateServerEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `runPhysics`
     */
    get runPhysics(): number;
    set runPhysics(value: number);
}
/**
 * A player's money changes. Assign `event.amount` to change how much.
 *
 * Pawn: `RG_CBasePlayer_AddAccount` (const this, amount, RewardType:type, bool:bTrackChange)
 */
export declare class AddAccountEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `amount`
     */
    get amount(): number;
    set amount(value: number);
    /**
     * The reason for the money, e.g. `"roundBonus"`, `"enemyKilled"`, `"playerBoughtSomething"`, `"hostageRescued"`.
     *
     * Pawn: `RewardType:type`
     */
    get reason(): RewardReason;
    set reason(value: RewardReason);
    /**
     * Argument 4.
     *
     * Pawn: `bool:bTrackChange`
     */
    get trackChange(): boolean;
    set trackChange(value: boolean);
}
/**
 * Unsure.
 *
 * Pawn: `Ham_Item_AddDuplicate`
 */
export declare class AddDuplicateEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `original`
     */
    get original(): Weapon;
    set original(value: Weapon);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called inside TraceAttack to store entity damage to multidamage data
 *
 * Pawn: `RG_AddMultiDamage` (const pevInflictor, const pEntity, Float:flDamage, bitsDamageType)
 */
export declare class AddMultiDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Argument 3.
     *
     * Pawn: `Float:flDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Pawn: `RG_CBasePlayer_AddPlayerItem` (const this, const pItem), `Ham_AddPlayerItem`
 */
export declare class AddPlayerItemEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pItem`
     */
    get item(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_AddPoints` (const this, score, bAllowNegativeScore), `Ham_AddPoints`
 */
export declare class AddPointsEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `score`
     */
    get score(): number;
    set score(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bAllowNegativeScore`
     */
    get allowNegativeScore(): number;
    set allowNegativeScore(value: number);
}
/**
 * Pawn: `RG_CBasePlayer_AddPointsToTeam` (const this, score, bAllowNegativeScore), `Ham_AddPointsToTeam`
 */
export declare class AddPointsToTeamEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `score`
     */
    get score(): number;
    set score(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bAllowNegativeScore`
     */
    get allowNegativeScore(): number;
    set allowNegativeScore(value: number);
}
/**
 * A file is added to what clients download.
 *
 * Pawn: `RH_SV_AddResource` (ResourceType_t:type, const filename[], size, flags, index)
 */
export declare class AddResourceEvent extends HookEvent {
    private readonly kind;
    /**
     * The file's kind, e.g. `"sound"`, `"model"`, `"decal"`, `"generic"`.
     *
     * Pawn: `ResourceType_t:type`
     */
    get resourceType(): ResourceType;
    set resourceType(value: ResourceType);
    /**
     * Argument 2.
     *
     * Pawn: `filename[]`
     */
    get filename(): string;
    set filename(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `size`
     */
    get size(): number;
    set size(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `flags`
     */
    get flags(): number;
    set flags(value: number);
    /**
     * The resource's number in the list.
     *
     * Pawn: `index`
     */
    get resourceIndex(): number;
    set resourceIndex(value: number);
}
/**
 * A weapon of one class goes to a player - picked up or given. Return `false` to refuse it.
 *
 * Pawn: `Ham_Item_AddToPlayer`
 */
export declare class AddToPlayerEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The player who gets it.
     *
     * Pawn: `player`
     */
    get player(): Player;
    set player(value: Player);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Unsure.
 *
 * Pawn: `Ham_Weapon_AddWeapon`
 */
export declare class AddWeaponEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called whenever player is on air (not touching floor)
 *
 * Pawn: `RG_PM_AirAccelerate` (Float:wishdir[3], Float:wishspeed, Float:accel, const playerIndex)
 */
export declare class AirAccelerateEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `Float:wishdir[3]`
     */
    get wishdir(): Vector;
    /**
     * Argument 2.
     *
     * Pawn: `Float:wishspeed`
     */
    get wishspeed(): number;
    set wishspeed(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `Float:accel`
     */
    get accel(): number;
    set accel(value: number);
    /**
     * Argument 4, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_PM_AirMove` (const playerIndex)
 */
export declare class AirMoveEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Called when an entity is created.
 *
 * Pawn: `RH_ED_Alloc` ()
 */
export declare class AllocEvent extends HookEvent {
    private readonly kind;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Edict * (Entity index))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called before adding an entity to the physents of a player.
 *
 * Pawn: `RH_SV_AllowPhysent` (const entity, const client)
 */
export declare class AllowPhysentEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called after game finished a bullet tracing for applying damage cached on multidamage data
 *
 * Pawn: `RG_ApplyMultiDamage` (const pevInflictor, const pevAttacker)
 */
export declare class ApplyMultiDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
}
/**
 * Called when an entity starts being attached to (normally invisible and "following") a player.
 *
 * Pawn: `Ham_Item_AttachToPlayer`
 */
export declare class AttachToPlayerEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `player`
     */
    get player(): Player;
    set player(value: Player);
}
/**
 * Returns a vector that tells the autoaim direction.
 *
 * Pawn: `Ham_CS_Player_GetAutoaimVector`
 */
export declare class AutoaimVectorEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `Float:delta`
     */
    get delta(): number;
    set delta(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Vector)
     */
    get result(): Vector;
}
/**
 * Pawn: `RG_CSGameRules_BalanceTeams` ()
 */
export declare class BalanceTeamsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called when monster dies and prepares its entity to become a corpse.
 *
 * Pawn: `Ham_BecomeDead`
 */
export declare class BecomeDeadEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Normally called whenever a barnacle grabs the entity.
 *
 * Pawn: `Ham_FBecomeProne`
 */
export declare class BecomeProneEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * This functions searches the link list whose head is the caller's m_pLink field.
 *
 * Pawn: `Ham_BestVisibleEnemy`
 */
export declare class BestVisibleEnemyEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Entity)
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_Blind` (const this, Float:flUntilTime, Float:flHoldTime, Float:flFadeTime, iAlpha), `Ham_CS_Player_Blind`
 */
export declare class BlindEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `Float:flUntilTime`
     */
    get untilTime(): number;
    set untilTime(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `Float:flHoldTime`
     */
    get holdTime(): number;
    set holdTime(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `Float:flFadeTime`
     */
    get fadeTime(): number;
    set fadeTime(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `iAlpha`
     */
    get alpha(): number;
    set alpha(value: number);
}
/**
 * A moving entity of one class - a door, a train - is blocked by another in its way.
 *
 * Pawn: `Ham_Blocked`
 */
export declare class BlockedEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The entity the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The entity in the way.
     *
     * Pawn: `other`
     */
    get other(): Entity;
    set other(value: Entity);
}
/**
 * Normally returns the blood color of the entity.
 *
 * Pawn: `Ham_BloodColor`
 */
export declare class BloodColorEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Position to shoot at.
 *
 * Pawn: `Ham_BodyTarget`
 */
export declare class BodyTargetEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `Float:from[3]`
     */
    get from(): Vector;
    set from(value: Vector);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Vector)
     */
    get result(): Vector;
}
/**
 * Pawn: `RG_CGib_BounceGibTouch` (const this, pOther)
 */
export declare class BounceGibTouchEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get gib(): Entity;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pOther`
     */
    get other(): Entity;
}
/**
 * The player buys ammo.
 *
 * Pawn: `RG_BuyGunAmmo` (const index, const weapon_entity, const bool:blinkMoney)
 */
export declare class BuyGunAmmoEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `weapon_entity`
     */
    get weapon_entity(): number;
    set weapon_entity(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bool:blinkMoney`
     */
    get blinkMoney(): boolean;
    set blinkMoney(value: boolean);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when player buys an item from buy menu (Nightvision, Kevlar, etc.)
 *
 * Pawn: `RG_BuyItem` (const pPlayer, iSlot)
 */
export declare class BuyItemEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pPlayer`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `iSlot`
     */
    get slot(): number;
    set slot(value: number);
}
/**
 * A player buys a weapon. In a post listener `event.result` is the weapon.
 *
 * Pawn: `RG_BuyWeaponByWeaponID` (const index, const WeaponIdType:weaponID)
 */
export declare class BuyWeaponByWeaponIdEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The weapon bought, as `weapon.kind` names it, e.g. `"ak47"` or `"awp"`.
     *
     * Pawn: `WeaponIdType:weaponID`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of weapon))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayerWeapon_CanDeploy` (const this), `Ham_Item_CanDeploy`
 */
export declare class CanDeployEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the player can drop the specified item.
 *
 * Pawn: `Ham_CS_Item_CanDrop`
 */
export declare class CanDropEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The player is touching a CBasePlayerItem, do I give it to him?
 *
 * Pawn: `RG_CSGameRules_CanHavePlayerItem` (const index, const item)
 */
export declare class CanHavePlayerItemEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `item`
     */
    get item(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity can be holstered.
 *
 * Pawn: `Ham_Item_CanHolster`
 */
export declare class CanHolsterEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game asks if one player hears another on voice. Return `true` or `false` to decide.
 *
 * Pawn: `RG_CSGameRules_CanPlayerHearPlayer` (const listener, const sender)
 */
export declare class CanPlayerHearPlayerEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who would hear.
     *
     * Pawn: `listener`
     */
    get listener(): Player;
    /**
     * The player who is talking.
     *
     * Pawn: `sender`
     */
    get sender(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game asks if a player may move to a team. Return `true` or `false` to decide.
 *
 * Pawn: `RG_CBasePlayer_CanSwitchTeam` (const this, TeamName:teamToSwap)
 */
export declare class CanSwitchTeamEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The team the player would move to.
     *
     * Pawn: `TeamName:teamToSwap`
     */
    get team(): Team;
    set team(value: Team);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Returns the center of the entity.
 *
 * Pawn: `Ham_Center`
 */
export declare class CenterEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Vector)
     */
    get result(): Vector;
}
/**
 * Pawn: `RG_CSGameRules_ChangeLevel` ()
 */
export declare class ChangeLevelEvent extends HookEvent {
    private readonly kind;
}
/**
 * Turns a monster towards its ideal_yaw.
 *
 * Pawn: `Ham_ChangeYaw`
 */
export declare class ChangeYawEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `speed`
     */
    get speed(): number;
    set speed(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CSGameRules_CheckMapConditions` ()
 */
export declare class CheckMapConditionsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called every client frame to check time based damage
 *
 * Pawn: `RG_CBasePlayer_CheckTimeBasedDamage` (const this)
 */
export declare class CheckTimeBasedDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Called when a player's userinfo is being checked.
 *
 * Pawn: `RH_SV_CheckUserInfo` (adr, buffer, bool:reconnect, reconnectSlot, name[])
 */
export declare class CheckUserInfoEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `adr`
     */
    get adr(): number;
    set adr(value: number);
    /**
     * Argument 2.
     *
     * Pawn: `buffer`
     */
    get buffer(): number;
    set buffer(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bool:reconnect`
     */
    get reconnect(): boolean;
    set reconnect(value: boolean);
    /**
     * Argument 4.
     *
     * Pawn: `reconnectSlot`
     */
    get reconnectSlot(): number;
    set reconnectSlot(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `name[]`
     */
    get name(): string;
    set name(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player jumps on water for the first time
 *
 * Pawn: `RG_PM_CheckWaterJump` (const playerIndex)
 */
export declare class CheckWaterJumpEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * The game checks if a side has won. `preventDefault()` stops it from ending the round.
 *
 * Pawn: `RG_CSGameRules_CheckWinConditions` ()
 */
export declare class CheckWinConditionsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Typically called when an entity dies to notify any children entities about the death.
 *
 * Pawn: `Ham_DeathNotice`
 */
export declare class ChildDeathNoticeEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `child`
     */
    get child(): Entity;
    set child(value: Entity);
}
/**
 * Pawn: `RG_HandleMenu_ChooseAppearance` (const index, const slot)
 */
export declare class ChooseAppearanceEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `slot`
     */
    get slot(): number;
    set slot(value: number);
}
/**
 * A player picked an item in the team menu. `preventDefault()` ignores the pick.
 *
 * Pawn: `RG_HandleMenu_ChooseTeam` (const index, const MenuChooseTeam:slot)
 */
export declare class ChooseTeamEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The player's pick, one of `"TERRORIST"`, `"CT"`, `"VIP"`, `"auto"` or `"SPECTATOR"`. Assign to change it.
     *
     * Pawn: `MenuChooseTeam:slot`
     */
    get choice(): TeamChoice;
    set choice(value: TeamChoice);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_Classify` (const this), `Ham_Classify`
 */
export declare class ClassifyEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Recreate all the map entities from the map data (preserving their indices),
 *
 * Pawn: `RG_CSGameRules_CleanUpMap` ()
 */
export declare class CleanUpMapEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called when game clears multidamage data (before TraceAttack)
 *
 * Pawn: `RG_ClearMultiDamage` ()
 */
export declare class ClearMultiDamageEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called after processing a client connection request.
 *
 * Pawn: `RH_ClientConnected` (const client)
 */
export declare class ClientConnectedEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
}
/**
 * Called when message is being printed to client console.
 *
 * Pawn: `RH_SV_ClientPrintf` (const string[])
 */
export declare class ClientPrintfEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
}
/**
 * The player has changed userinfo; can change it now.
 *
 * Pawn: `RG_CSGameRules_ClientUserInfoChanged` (const index, infobuffer[])
 */
export declare class ClientUserInfoChangedEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `infobuffer[]`
     */
    get infobuffer(): string;
    set infobuffer(value: string);
}
/**
 * Called when processing a 'connect' client connectionless packet.
 *
 * Pawn: `RH_SV_ConnectClient` ()
 */
export declare class ConnectClientEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called when a player drops a weapon (usually manual drop or death)
 *
 * Pawn: `RG_CreateWeaponBox` (const weaponent, const owner, modelName[], Float:origin[3], Float:angles[3], Float:velocity[3], Float:lifeTime, bool:packAmmo)
 */
export declare class CreateWeaponBoxEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `weaponent`
     */
    get weaponent(): number;
    set weaponent(value: number);
    /**
     * Argument 2, read only.
     *
     * Pawn: `owner`
     */
    get owner(): Entity;
    /**
     * Argument 3.
     *
     * Pawn: `modelName[]`
     */
    get modelName(): string;
    set modelName(value: string);
    /**
     * Argument 4, read only.
     *
     * Pawn: `Float:origin[3]`
     */
    get origin(): Vector;
    /**
     * Argument 5, read only.
     *
     * Pawn: `Float:angles[3]`
     */
    get angles(): Vector;
    /**
     * Argument 6, read only.
     *
     * Pawn: `Float:velocity[3]`
     */
    get velocity(): Vector;
    /**
     * Argument 7.
     *
     * Pawn: `Float:lifeTime`
     */
    get lifeTime(): number;
    set lifeTime(value: number);
    /**
     * Argument 8.
     *
     * Pawn: `bool:packAmmo`
     */
    get packAmmo(): boolean;
    set packAmmo(value: boolean);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CWeaponBox * (Entity index of weaponbox))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Returns the damage decal of the entity for the damage type.
 *
 * Pawn: `Ham_DamageDecal`
 */
export declare class DamageDecalEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `damageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * What do I do with player's weapons when he's killed?
 *
 * Pawn: `RG_CSGameRules_DeadPlayerWeapons` (const index)
 */
export declare class DeadPlayerWeaponsEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Determines the best type of death animation to play.
 *
 * Pawn: `Ham_GetDeathActivity`
 */
export declare class DeathActivityEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Call this from within a GameRules class to report an obituary.
 *
 * Pawn: `RG_CSGameRules_DeathNotice` (const victim, const killer, const inflictor)
 */
export declare class DeathNoticeEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `victim`
     */
    get victim(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `killer`
     */
    get killer(): Player;
    /**
     * Argument 3, read only.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
}
/**
 * Called when a client emits a "death sound" after death.
 *
 * Pawn: `RG_CBasePlayer_DeathSound` (const this)
 */
export declare class DeathSoundEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * A weapon is being taken out. Assign `event.viewModel` / `weaponModel` to change what is shown.
 *
 * Pawn: `RG_CBasePlayerWeapon_DefaultDeploy` (const this, szViewModel[], szWeaponModel[], iAnim, szAnimExt[], skiplocal)
 */
export declare class DefaultDeployEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `szViewModel[]`
     */
    get viewModel(): string;
    set viewModel(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `szWeaponModel[]`
     */
    get weaponModel(): string;
    set weaponModel(value: string);
    /**
     * Argument 4.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `szAnimExt[]`
     */
    get animExt(): string;
    set animExt(value: string);
    /**
     * Argument 6.
     *
     * Pawn: `skiplocal`
     */
    get skiplocal(): number;
    set skiplocal(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayerWeapon_DefaultReload` (const this, iClipSize, iAnim, Float:fDelay)
 */
export declare class DefaultReloadEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `iClipSize`
     */
    get clipSize(): number;
    set clipSize(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `Float:fDelay`
     */
    get delay(): number;
    set delay(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayerWeapon_DefaultShotgunReload` (const this, iAnim, iStartAnim, Float:fDelay, Float:fStartDelay, const pszReloadSound1[], const pszReloadSound2[])
 */
export declare class DefaultShotgunReloadEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `iStartAnim`
     */
    get startAnim(): number;
    set startAnim(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `Float:fDelay`
     */
    get delay(): number;
    set delay(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `Float:fStartDelay`
     */
    get startDelay(): number;
    set startDelay(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `pszReloadSound1[]`
     */
    get reloadSound1(): string;
    set reloadSound1(value: string);
    /**
     * Argument 7.
     *
     * Pawn: `pszReloadSound2[]`
     */
    get reloadSound2(): string;
    set reloadSound2(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player has ended to defuses the bomb or when the previous defuser has taken off or been killed.
 *
 * Pawn: `RG_CGrenade_DefuseBombEnd` (const this, const player, bool:bDefused)
 */
export declare class DefuseBombEndEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Argument 2, read only.
     *
     * Pawn: `player`
     */
    get player(): Player;
    /**
     * Argument 3.
     *
     * Pawn: `bool:bDefused`
     */
    get defused(): boolean;
    set defused(value: boolean);
}
/**
 * Called when a player goes to start defuse the bomb.
 *
 * Pawn: `RG_CGrenade_DefuseBombStart` (const this, const player)
 */
export declare class DefuseBombStartEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Argument 2, read only.
     *
     * Pawn: `player`
     */
    get player(): Player;
}
/**
 * Unsure, I believe this is the delay between activation for an entity.
 *
 * Pawn: `Ham_GetDelay`
 */
export declare class DelayEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Float)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A weapon of one class is drawn. Return `false` to refuse it.
 *
 * Pawn: `Ham_Item_Deploy`
 */
export declare class DeployEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RH_Cvar_DirectSet` (pcvar, const value[])
 */
export declare class DirectSetEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `pcvar`
     */
    get pcvar(): number;
    set pcvar(value: number);
    /**
     * Argument 2.
     *
     * Pawn: `value[]`
     */
    get value(): string;
    set value(value: string);
}
/**
 * VIP player got to the point of rescue.
 *
 * Pawn: `RG_CBasePlayer_Disappear` (const this)
 */
export declare class DisappearEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * A weapon of one class is dropped.
 *
 * Pawn: `Ham_Item_Drop`
 */
export declare class DropEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Pawn: `RH_SV_DropClient` (const client, bool:crash, const fmt[])
 */
export declare class DropClientEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
    /**
     * Argument 2.
     *
     * Pawn: `bool:crash`
     */
    get crash(): boolean;
    set crash(value: boolean);
    /**
     * Argument 3.
     *
     * Pawn: `fmt[]`
     */
    get fmt(): string;
    set fmt(value: string);
}
/**
 * Called when a idle player is removed from server.
 *
 * Pawn: `RG_CBasePlayer_DropIdlePlayer` (const this, const reason[])
 */
export declare class DropIdlePlayerEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `reason[]`
     */
    get reason(): string;
    set reason(value: string);
}
/**
 * A player drops a weapon. In a post listener `event.result` is the weapon box on the ground.
 *
 * Pawn: `RG_CBasePlayer_DropPlayerItem` (const this, const pszItemName[])
 */
export declare class DropPlayerItemEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The weapon's class name, e.g. `"weapon_ak47"`.
     *
     * Pawn: `pszItemName[]`
     */
    get itemName(): string;
    set itemName(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of item))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player throws the shield on the ground.
 *
 * Pawn: `RG_CBasePlayer_DropShield` (const this, bool:deploy)
 */
export declare class DropShieldEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `bool:deploy`
     */
    get deploy(): boolean;
    set deploy(value: boolean);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of shield))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A player ducks.
 *
 * Pawn: `RG_CBasePlayer_Duck` (const this), `Ham_Player_Duck`
 */
export declare class DuckEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Returns the ear position of the entity.
 *
 * Pawn: `Ham_EarPosition`
 */
export declare class EarPositionEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Vector)
     */
    get result(): Vector;
}
/**
 * Called when client it's in the scoreboard
 *
 * Pawn: `RH_SV_EmitPings` (const client)
 */
export declare class EmitPingsEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
}
/**
 * Called when game selects a spawn point (info_player_start/deathmatch) to position the player
 *
 * Pawn: `RG_CBasePlayer_EntSelectSpawnPoint` (const this)
 */
export declare class EntSelectSpawnPointEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (edict_t * (Entity index of selected spawn point))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a command is being sent to server.
 *
 * Pawn: `RH_ExecuteServerStringCmd` (const cmd[], source, id)
 */
export declare class ExecuteServerStringCmdEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `cmd[]`
     */
    get cmd(): string;
    set cmd(value: string);
    /**
     * Argument 2.
     *
     * Pawn: `source`
     */
    get source(): number;
    set source(value: number);
    /**
     * Argument 3, read only.
     *
     * Pawn: `id`
     */
    get id(): Entity;
}
/**
 * Called when a C4 goes to explodes.
 *
 * Pawn: `RG_CGrenade_ExplodeBomb` (const this, tracehandle, const bitsDamageType)
 */
export declare class ExplodeBombEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Called when a flashbang detonates.
 *
 * Pawn: `RG_CGrenade_ExplodeFlashbang` (const this, tracehandle, const bitsDamageType)
 */
export declare class ExplodeFlashbangEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Called when a hegrenade detonates.
 *
 * Pawn: `RG_CGrenade_ExplodeHeGrenade` (const this, tracehandle, const bitsDamageType)
 */
export declare class ExplodeHeGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * A smoke grenade is going off.
 *
 * Pawn: `RG_CGrenade_ExplodeSmokeGrenade` (const this)
 */
export declare class ExplodeSmokeGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
}
/**
 * Gets ammo from the target weapon.
 *
 * Pawn: `Ham_Weapon_ExtractAmmo`
 */
export declare class ExtractAmmoEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `target`
     */
    get target(): Weapon;
    set target(value: Weapon);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Gets clip ammo from the target weapon.
 *
 * Pawn: `Ham_Weapon_ExtractClipAmmo`
 */
export declare class ExtractClipAmmoEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `target`
     */
    get target(): Weapon;
    set target(value: Weapon);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Returns the eye position of the entity.
 *
 * Pawn: `Ham_EyePosition`
 */
export declare class EyePositionEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Vector)
     */
    get result(): Vector;
}
/**
 * Slowly fades a entity out, then removes it.
 *
 * Pawn: `Ham_FadeMonster`
 */
export declare class FadeMonsterEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Pawn: `RG_CBaseEntity_FireBuckshots` (pEntity, cShots, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread[3], Float:flDistance, iTracerFreq, iDamage, pevAttacker)
 */
export declare class FireBuckshotsEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `cShots`
     */
    get shots(): number;
    set shots(value: number);
    /**
     * Argument 3, read only.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Argument 4, read only.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get dirShooting(): Vector;
    /**
     * Argument 5, read only.
     *
     * Pawn: `Float:vecSpread[3]`
     */
    get spread(): Vector;
    /**
     * Argument 6.
     *
     * Pawn: `Float:flDistance`
     */
    get distance(): number;
    set distance(value: number);
    /**
     * Argument 7.
     *
     * Pawn: `iTracerFreq`
     */
    get tracerFreq(): number;
    set tracerFreq(value: number);
    /**
     * Argument 8.
     *
     * Pawn: `iDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Argument 9, read only.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
}
/**
 * Pawn: `RG_CBaseEntity_FireBullets` (pEntity, cShots, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread[3], Float:flDistance, iBulletType, iTracerFreq, iDamage, pevAttacker)
 */
export declare class FireBulletsEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `cShots`
     */
    get shots(): number;
    set shots(value: number);
    /**
     * Argument 3, read only.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Argument 4, read only.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get dirShooting(): Vector;
    /**
     * Argument 5, read only.
     *
     * Pawn: `Float:vecSpread[3]`
     */
    get spread(): Vector;
    /**
     * Argument 6.
     *
     * Pawn: `Float:flDistance`
     */
    get distance(): number;
    set distance(value: number);
    /**
     * Argument 7.
     *
     * Pawn: `iBulletType`
     */
    get bulletType(): number;
    set bulletType(value: number);
    /**
     * Argument 8.
     *
     * Pawn: `iTracerFreq`
     */
    get tracerFreq(): number;
    set tracerFreq(value: number);
    /**
     * Argument 9.
     *
     * Pawn: `iDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Argument 10, read only.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
}
/**
 * Pawn: `RG_CBaseEntity_FireBullets3` (pEntity, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread, Float:flDistance, iPenetration, iBulletType, iDamage, Float:flRangeModifier, pevAttacker, bool:bPistol, shared_rand)
 */
export declare class FireBullets3Event extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Argument 2, read only.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Argument 3, read only.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get dirShooting(): Vector;
    /**
     * Argument 4.
     *
     * Pawn: `Float:vecSpread`
     */
    get spread(): number;
    set spread(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `Float:flDistance`
     */
    get distance(): number;
    set distance(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `iPenetration`
     */
    get penetration(): number;
    set penetration(value: number);
    /**
     * Argument 7.
     *
     * Pawn: `iBulletType`
     */
    get bulletType(): number;
    set bulletType(value: number);
    /**
     * Argument 8.
     *
     * Pawn: `iDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Argument 9.
     *
     * Pawn: `Float:flRangeModifier`
     */
    get rangeModifier(): number;
    set rangeModifier(value: number);
    /**
     * Argument 10, read only.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * Argument 11.
     *
     * Pawn: `bool:bPistol`
     */
    get pistol(): boolean;
    set pistol(value: boolean);
    /**
     * Argument 12.
     *
     * Pawn: `shared_rand`
     */
    get shared_rand(): number;
    set shared_rand(value: number);
}
/**
 * The game works out how much a fall hurts. In a post listener `event.result` is that number; return a number to replace it.
 *
 * Pawn: `RG_CSGameRules_FlPlayerFallDamage` (const index)
 */
export declare class FlPlayerFallDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who fell.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (float)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Is this player allowed to respawn now?
 *
 * Pawn: `RG_CSGameRules_FPlayerCanRespawn` (const index)
 */
export declare class FPlayerCanRespawnEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Can this player take damage from this attacker?
 *
 * Pawn: `RG_CSGameRules_FPlayerCanTakeDamage` (const index, const attacker)
 */
export declare class FPlayerCanTakeDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `attacker`
     */
    get attacker(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when an entity is removed (freed from server).
 *
 * Pawn: `RH_ED_Free` (const entity)
 */
export declare class FreeEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
}
/**
 * Should the player switch to this weapon?
 *
 * Pawn: `RG_CSGameRules_FShouldSwitchWeapon` (const index, const weapon)
 */
export declare class FShouldSwitchWeaponEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `weapon`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game rules' think: every frame, the round's clock and win conditions checked.
 *
 * Pawn: `RG_CSGameRules_Think` ()
 */
export declare class GameThinkEvent extends HookEvent {
    private readonly kind;
}
/**
 * Pawn: `RH_GetEntityInit` (const classname[])
 */
export declare class GetEntityInitEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `classname[]`
     */
    get classname(): string;
    set classname(value: string);
}
/**
 * Pawn: `RG_GetForceCamera` (const pObserver)
 */
export declare class GetForceCameraEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pObserver`
     */
    get observer(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player enters the game.
 *
 * Pawn: `RG_CBasePlayer_GetIntoGame` (const this)
 */
export declare class GetIntoGameEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * I can't use this weapon anymore, get me the next best one.
 *
 * Pawn: `RG_CSGameRules_GetNextBestWeapon` (const index, const currentWeapon)
 */
export declare class GetNextBestWeaponEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `currentWeapon`
     */
    get currentWeapon(): number;
    set currentWeapon(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Place this player on his spawnspot and face him in the proper direction.
 *
 * Pawn: `RG_CSGameRules_GetPlayerSpawnSpot` (const index)
 */
export declare class GetPlayerSpawnSpotEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (edict_t * (Entity index of spawnspot))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Create some gore and get rid of a monster's model.
 *
 * Pawn: `Ham_GibMonster`
 */
export declare class GibMonsterEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Pawn: `RG_CGib_Spawn` (const this, const szGibModel[])
 */
export declare class GibSpawnEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get gib(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `szGibModel[]`
     */
    get gibModel(): string;
    set gibModel(value: string);
}
/**
 * Pawn: `RG_CBasePlayer_GiveAmmo` (const this, iAmount, szName[], iMax), `Ham_GiveAmmo`
 */
export declare class GiveAmmoEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `iAmount`
     */
    get amount(): number;
    set amount(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `szName[]`
     */
    get name(): string;
    set name(value: string);
    /**
     * Argument 4.
     *
     * Pawn: `iMax`
     */
    get max(): number;
    set max(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CSGameRules_GiveC4` ()
 */
export declare class GiveC4Event extends HookEvent {
    private readonly kind;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CBasePlayer * (Entity index of player))
     */
    get result(): Player;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game hands a spawned player the default weapons. `preventDefault()` gives nothing.
 *
 * Pawn: `RG_CBasePlayer_GiveDefaultItems` (const this)
 */
export declare class GiveDefaultItemsEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_GiveNamedItem` (const this, const pszName[])
 */
export declare class GiveNamedItemEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `pszName[]`
     */
    get name(): string;
    set name(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of item))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_GiveShield` (const this, bool:bDeploy)
 */
export declare class GiveShieldEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `bool:bDeploy`
     */
    get deploy(): boolean;
    set deploy(value: boolean);
}
/**
 * Pawn: `RG_CSGameRules_GoToIntermission` ()
 */
export declare class GoToIntermissionEvent extends HookEvent {
    private readonly kind;
}
/**
 * Returns a vector that tells the gun position.
 *
 * Pawn: `Ham_Player_GetGunPosition`
 */
export declare class GunPositionEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Vector)
     */
    get result(): Vector;
}
/**
 * Returns if monster has alien gibs.
 *
 * Pawn: `Ham_HasAlienGibs`
 */
export declare class HasAlienGibsEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Returns if monster has human gibs.
 *
 * Pawn: `Ham_HasHumanGibs`
 */
export declare class HasHumanGibsEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game asks if an item is forbidden to a player. Return `true` to forbid it.
 *
 * Pawn: `RG_CBasePlayer_HasRestrictItem` (const this, ItemID:item, ItemRestType:type)
 */
export declare class HasRestrictItemEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `ItemID:item`
     */
    get item(): Weapon;
    /**
     * The way the player would get the item, one of `"buying"`, `"touched"` (picked up) or `"equipped"` (given on spawn).
     *
     * Pawn: `ItemRestType:type`
     */
    get restriction(): ItemRestriction;
    set restriction(value: ItemRestriction);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the target is the same as the one passed.
 *
 * Pawn: `Ham_HasTarget`
 */
export declare class HasTargetEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `target`
     */
    get target(): number;
    set target(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game shows a player a hint.
 *
 * Pawn: `RG_CBasePlayer_HintMessageEx` (const this, const message[], Float:duration, bool:bDisplayIfPlayerDead, bool:bOverride)
 */
export declare class HintMessageExEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `message[]`
     */
    get message(): string;
    set message(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `Float:duration`
     */
    get duration(): number;
    set duration(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `bool:bDisplayIfPlayerDead`
     */
    get displayIfPlayerDead(): boolean;
    set displayIfPlayerDead(value: boolean);
    /**
     * `true` to show the hint even to a player who turned hints off.
     *
     * Pawn: `bool:bOverride`
     */
    get displayIfHintsOff(): boolean;
    set displayIfHintsOff(value: boolean);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A weapon of one class is put away.
 *
 * Pawn: `Ham_Item_Holster`
 */
export declare class HolsterEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Returns the illumination of the entity.
 *
 * Pawn: `Ham_Illumination`
 */
export declare class IlluminationEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A player sends an impulse: `100` is the flashlight, `201` the spray.
 *
 * Pawn: `RG_CBasePlayer_ImpulseCommands` (const this), `Ham_Player_ImpulseCommands`
 */
export declare class ImpulseCommandsEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Returns true if the passed ent is in the caller's forward view cone.
 *
 * Pawn: `Ham_FInViewCone`
 */
export declare class InViewConeEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `other`
     */
    get other(): Entity;
    set other(value: Entity);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity is alive.
 *
 * Pawn: `Ham_IsAlive`
 */
export declare class IsAliveEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the player is a bot.
 *
 * Pawn: `Ham_CS_Player_IsBot`
 */
export declare class IsBotEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity uses a BSP model.
 *
 * Pawn: `Ham_IsBSPModel`
 */
export declare class IsBspModelEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity is in the world.
 *
 * Pawn: `Ham_IsInWorld`
 */
export declare class IsInWorldEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity is moving.
 *
 * Pawn: `Ham_IsMoving`
 */
export declare class IsMovingEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity is a net client.
 *
 * Pawn: `Ham_IsNetClient`
 */
export declare class IsNetClientEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player hit to entity.
 *
 * Pawn: `RG_IsPenetrableEntity` (Float:vecSrc[3], Float:vecEnd[3], index, entity)
 */
export declare class IsPenetrableEntityEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Argument 2, read only.
     *
     * Pawn: `Float:vecEnd[3]`
     */
    get end(): Vector;
    /**
     * Argument 3, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 4, read only.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity is a player.
 *
 * Pawn: `Ham_IsPlayer`
 */
export declare class IsPlayerEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the entity is sneaking.
 *
 * Pawn: `Ham_IsSneaking`
 */
export declare class IsSneakingEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Returns whether an entity is activated.
 *
 * Pawn: `Ham_IsTriggered`
 */
export declare class IsTriggeredEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `activator`
     */
    get activator(): Entity;
    set activator(value: Entity);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the weapon is usable (has ammo, etc.)
 *
 * Pawn: `Ham_Weapon_IsUsable`
 */
export declare class IsUsableEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * -
 *
 * Pawn: `Ham_CS_Item_IsWeapon`
 */
export declare class IsWeaponEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called every client frame (PlayerPostThink) for the player's active weapon
 *
 * Pawn: `RG_CBasePlayerWeapon_ItemPostFrame` (const this), `Ham_Item_PostFrame`
 */
export declare class ItemPostFrameEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * A weapon of one class is thought over in its owner's hands, every frame before his move.
 *
 * Pawn: `Ham_Item_PreFrame`
 */
export declare class ItemPreFrameEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Returns the item slot for the item.
 *
 * Pawn: `Ham_Item_ItemSlot`
 */
export declare class ItemSlotEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Updates item data for the client.
 *
 * Pawn: `Ham_Item_UpdateClientData`
 */
export declare class ItemUpdateClientDataEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `player`
     */
    get player(): Player;
    set player(value: Player);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a client "thinks for the join status".
 *
 * Pawn: `RG_CBasePlayer_JoiningThink` (const this)
 */
export declare class JoiningThinkEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * A player jumps.
 *
 * Pawn: `RG_CBasePlayer_Jump` (const this), `Ham_Player_Jump`
 */
export declare class JumpEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Called whenever player fires a weapon and shakes player screen (punchangles altering)
 *
 * Pawn: `RG_CBasePlayerWeapon_KickBack` (const this, Float:up_base, Float:lateral_base, Float:up_modifier, Float:lateral_modifier, Float:p_max, Float:lateral_max, direction_change)
 */
export declare class KickBackEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `Float:up_base`
     */
    get up_base(): number;
    set up_base(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `Float:lateral_base`
     */
    get lateral_base(): number;
    set lateral_base(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `Float:up_modifier`
     */
    get up_modifier(): number;
    set up_modifier(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `Float:lateral_modifier`
     */
    get lateral_modifier(): number;
    set lateral_modifier(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `Float:p_max`
     */
    get p_max(): number;
    set p_max(value: number);
    /**
     * Argument 7.
     *
     * Pawn: `Float:lateral_max`
     */
    get lateral_max(): number;
    set lateral_max(value: number);
    /**
     * Argument 8.
     *
     * Pawn: `direction_change`
     */
    get direction_change(): number;
    set direction_change(value: number);
}
/**
 * Normally called when an item gets deleted.
 *
 * Pawn: `Ham_Item_Kill`
 */
export declare class KillEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * An entity dies - a player, or with `classname` a breakable, a hostage. `preventDefault()` keeps it alive.
 *
 * Pawn: `RG_CBasePlayer_Killed` (const this, pevAttacker, iGib), `Ham_Killed`
 */
export declare class KilledEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player who dies; for another class, `event.entity`.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The killer.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * The body's fate: `0` the usual death, `1` never torn apart, `2` always.
     *
     * Pawn: `iGib`
     */
    get gib(): number;
    set gib(value: number);
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
}
/**
 * Called when a player is on a ladder.
 *
 * Pawn: `RG_PM_LadderMove` (const pLadder, const playerIndex)
 */
export declare class LadderMoveEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pLadder`
     */
    get ladder(): Entity;
    /**
     * Argument 2, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Function to find enemies or food by sight.
 *
 * Pawn: `Ham_Look`
 */
export declare class LookEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `distance`
     */
    get distance(): number;
    set distance(value: number);
}
/**
 * Makes a random player the bomber.
 *
 * Pawn: `RG_CBasePlayer_MakeBomber` (const this)
 */
export declare class MakeBomberEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Makes a random player the VIP.
 *
 * Pawn: `RG_CBasePlayer_MakeVIP` (const this)
 */
export declare class MakeVipEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Gets the maximum speed for whenever a player has the item deployed.
 *
 * Pawn: `Ham_CS_Item_GetMaxSpeed`
 */
export declare class MaxSpeedEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Float)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when monster has died.
 *
 * Pawn: `Ham_MonsterInitDead`
 */
export declare class MonsterInitDeadEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Pawn: `RG_PM_Move` (const playerIndex)
 */
export declare class MoveEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Returns the next target of this.
 *
 * Pawn: `Ham_GetNextTarget`
 */
export declare class NextTargetEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Entity)
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_ObjectCaps` (const this), `Ham_ObjectCaps`
 */
export declare class ObjectCapsEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a client attempt to find the next observer.
 *
 * Pawn: `RG_CBasePlayer_Observer_FindNextPlayer` (const this, bool bReverse, name[])
 */
export declare class ObserverFindNextPlayerEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `bool bReverse`
     */
    get arg2(): number;
    set arg2(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `name[]`
     */
    get name(): string;
    set name(value: string);
}
/**
 * Pawn: `RG_CBasePlayer_Observer_IsValidTarget` (const this, iPlayerIndex, bool:bSameTeam)
 */
export declare class ObserverIsValidTargetEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `iPlayerIndex`
     */
    get playerIndex(): number;
    set playerIndex(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bool:bSameTeam`
     */
    get sameTeam(): boolean;
    set sameTeam(value: boolean);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CBasePlayer *)
     */
    get result(): Player;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a client attempt to change the observer mode.
 *
 * Pawn: `RG_CBasePlayer_Observer_SetMode` (const this, iMode)
 */
export declare class ObserverSetModeEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `iMode`
     */
    get mode(): number;
    set mode(value: number);
}
/**
 * Pawn: `RG_CBasePlayer_Observer_Think` (const this)
 */
export declare class ObserverThinkEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Not entirely sure.
 *
 * Pawn: `Ham_OnControls`
 */
export declare class OnControlsEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `on`
     */
    get on(): Entity;
    set on(value: Entity);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game tells the bots something happened.
 *
 * Pawn: `RG_CBotManager_OnEvent` (GameEventType:event, const pEntity, const pOther)
 */
export declare class OnEventEvent extends HookEvent {
    private readonly kind;
    /**
     * The thing that happened, e.g. `"weaponFired"`, `"playerDied"`, `"bombPlanted"`, `"roundStart"`.
     *
     * Pawn: `GameEventType:event`
     */
    get gameEvent(): BotEvent;
    set gameEvent(value: BotEvent);
    /**
     * Argument 2, read only.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Argument 3, read only.
     *
     * Pawn: `pOther`
     */
    get other(): Entity;
}
/**
 * The freeze time at the start of the round is over.
 *
 * Pawn: `RG_CSGameRules_OnRoundFreezeEnd` ()
 */
export declare class OnRoundFreezeEndEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called on spawn, the attempt to equip a player.
 *
 * Pawn: `RG_CBasePlayer_OnSpawnEquip` (const this, bool:addDefault, bool:equipGame)
 */
export declare class OnSpawnEquipEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `bool:addDefault`
     */
    get addDefault(): boolean;
    set addDefault(value: boolean);
    /**
     * Argument 3.
     *
     * Pawn: `bool:equipGame`
     */
    get equipGame(): boolean;
    set equipGame(value: boolean);
}
/**
 * Unsure.
 *
 * Pawn: `Ham_OverrideReset`
 */
export declare class OverrideResetEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Called when a client emits a "pain sound" after received damage.
 *
 * Pawn: `RG_CBasePlayer_Pain` (const this, HitBoxGroup:lastHitGroup, bool:hasArmour)
 */
export declare class PainEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `HitBoxGroup:lastHitGroup`
     */
    get lastHitGroup(): number;
    set lastHitGroup(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bool:hasArmour`
     */
    get hasArmour(): boolean;
    set hasArmour(value: boolean);
}
/**
 * Called when monster is about to emit pain sound.
 *
 * Pawn: `Ham_PainSound`
 */
export declare class PainSoundEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Called when a player plant's the bomb on the ground.
 *
 * Pawn: `RG_PlantBomb` (const index, Float:vecStart[3], Float:vecVelocity[3])
 */
export declare class PlantBombEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * Argument 3, read only.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of bomb))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Plays the weapon's empty sound.
 *
 * Pawn: `Ham_Weapon_PlayEmptySound`
 */
export declare class PlayEmptySoundEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A flashbang is blinding a player. `preventDefault()` keeps the player's eyes clear.
 *
 * Pawn: `RG_PlayerBlind` (const index, const inflictor, const attacker, const Float:fadeTime, const Float:fadeHold, const alpha, Float:color[3])
 */
export declare class PlayerBlindEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who is blinded.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
    /**
     * Argument 3, read only.
     *
     * Pawn: `attacker`
     */
    get attacker(): Player;
    /**
     * Argument 4.
     *
     * Pawn: `Float:fadeTime`
     */
    get fadeTime(): number;
    set fadeTime(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `Float:fadeHold`
     */
    get fadeHold(): number;
    set fadeHold(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `alpha`
     */
    get alpha(): number;
    set alpha(value: number);
    /**
     * The flash's colour, [r, g, b] as a Vector. Read only.
     *
     * Pawn: `Float:color[3]`
     */
    get color(): Vector;
}
/**
 * Pawn: `RG_CBasePlayer_PlayerDeathThink` (const this)
 */
export declare class PlayerDeathThinkEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Called each time player gets a weapon linked to his inventory
 *
 * Pawn: `RG_CSGameRules_PlayerGotWeapon` (const pPlayer, const pWeapon)
 */
export declare class PlayerGotWeaponEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pPlayer`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pWeapon`
     */
    get weapon(): Weapon;
}
/**
 * A player was killed.
 *
 * Pawn: `RG_CSGameRules_PlayerKilled` (const victim, const killer, const inflictor)
 */
export declare class PlayerKilledEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who died.
     *
     * Pawn: `victim`
     */
    get victim(): Player;
    /**
     * The player who killed the victim.
     *
     * Pawn: `killer`
     */
    get killer(): Player;
    /**
     * The source of the kill: a weapon, a grenade, the world.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
}
/**
 * A player spawned.
 *
 * Pawn: `RG_CSGameRules_PlayerSpawn` (const index)
 */
export declare class PlayerSpawnEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `index`
     */
    get player(): Player;
}
/**
 * Called whenever player emits an step sound
 *
 * Pawn: `RG_PM_PlayStepSound` (step, Float:fvol, const playerIndex)
 */
export declare class PlayStepSoundEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `step`
     */
    get step(): number;
    set step(value: number);
    /**
     * Argument 2.
     *
     * Pawn: `Float:fvol`
     */
    get fvol(): number;
    set fvol(value: number);
    /**
     * Argument 3, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Called on every frame to check player ducking
 *
 * Pawn: `RG_PM_Duck` (const playerIndex)
 */
export declare class PmDuckEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Called on every frame while player presses jump button
 *
 * Pawn: `RG_PM_Jump` (const playerIndex)
 */
export declare class PmJumpEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Returns true if the passed ent is in the caller's forward view cone.
 *
 * Pawn: `Ham_FVecInViewCone`
 */
export declare class PointInViewConeEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `Float:point[3]`
     */
    get point(): Vector;
    set point(value: Vector);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Returns true if a line can be traced from the caller's eyes to given vector.
 *
 * Pawn: `Ham_FVecVisible`
 */
export declare class PointVisibleEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `Float:point[3]`
     */
    get point(): Vector;
    set point(value: Vector);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_PostThink` (const this), `Ham_Player_PostThink`
 */
export declare class PostThinkEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_Precache` (const this), `Ham_Precache`
 */
export declare class PrecacheEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
}
/**
 * Called when a generic resource is being added to generic precache list.
 *
 * Pawn: `RH_PF_precache_generic_I` (const string[])
 */
export declare class PrecacheGenericIEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a model is being added to model precache list.
 *
 * Pawn: `RH_PF_precache_model_I` (const string[])
 */
export declare class PrecacheModelIEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a sound is being added to sound precache list.
 *
 * Pawn: `RH_PF_precache_sound_I` (const string[])
 */
export declare class PrecacheSoundIEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A player's frame, before he moves: every frame for every player, hundreds of times a second. Keep the listener tiny.
 *
 * Pawn: `RG_CBasePlayer_PreThink` (const this), `Ham_Player_PreThink`
 */
export declare class PreThinkEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Returns the ammo index of the item.
 *
 * Pawn: `Ham_Item_PrimaryAmmoIndex`
 */
export declare class PrimaryAmmoIndexEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A weapon of one class fires its primary attack - a shot, a knife's slash: `{ classname: "weapon_knife" }`. `preventDefault()` stops it.
 *
 * Pawn: `Ham_Weapon_PrimaryAttack`
 */
export declare class PrimaryAttackEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Called when a message is being sent to the server's console.
 *
 * Pawn: `RH_Con_Printf` (const string[])
 */
export declare class PrintfEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
}
/**
 * A radio message is sent. `preventDefault()` silences it.
 *
 * Pawn: `RG_CBasePlayer_Radio` (const this, const msg_id[], const msg_verbose[], pitch, bool:showIcon)
 */
export declare class RadioEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `msg_id[]`
     */
    get msg_id(): string;
    set msg_id(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `msg_verbose[]`
     */
    get msg_verbose(): string;
    set msg_verbose(value: string);
    /**
     * Argument 4.
     *
     * Pawn: `pitch`
     */
    get pitch(): number;
    set pitch(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `bool:showIcon`
     */
    get showIcon(): boolean;
    set showIcon(value: boolean);
}
/**
 * Whether or not the entity can reflect gauss shots..
 *
 * Pawn: `Ham_ReflectGauss`
 */
export declare class ReflectGaussEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Checks relation ship between two monsters.
 *
 * Pawn: `Ham_IRelationship`
 */
export declare class RelationshipEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `other`
     */
    get other(): Entity;
    set other(value: Entity);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A weapon of one class reloads. `preventDefault()` stops it.
 *
 * Pawn: `Ham_Weapon_Reload`
 */
export declare class ReloadEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Pawn: `RG_CBasePlayer_RemoveAllItems` (const this, bool:removeSuit)
 */
export declare class RemoveAllItemsEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `bool:removeSuit`
     */
    get removeSuit(): boolean;
    set removeSuit(value: boolean);
}
/**
 * Pawn: `RG_CSGameRules_RemoveGuns` ()
 */
export declare class RemoveGunsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Pawn: `RG_CBasePlayer_RemovePlayerItem` (const this, const pItem), `Ham_RemovePlayerItem`
 */
export declare class RemovePlayerItemEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pItem`
     */
    get item(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player's remove protection.
 *
 * Pawn: `RG_CBasePlayer_RemoveSpawnProtection` (const this)
 */
export declare class RemoveSpawnProtectionEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Prints debug information about monster to console. (state, activity, and other)
 *
 * Pawn: `Ham_ReportAIState`
 */
export declare class ReportAiStateEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Sets the weapon so that it can play empty sound again.
 *
 * Pawn: `Ham_Weapon_ResetEmptySound`
 */
export declare class ResetEmptySoundEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * The game resets a player's speed, on spawn and on every weapon switch. `preventDefault()` keeps the speed you set.
 *
 * Pawn: `RG_CBasePlayer_ResetMaxSpeed` (const this), `Ham_CS_Player_ResetMaxSpeed`
 */
export declare class ResetMaxSpeedEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBaseAnimating_ResetSequenceInfo` (const this)
 */
export declare class ResetSequenceInfoEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Normally called when a map-based item respawns, such as a health kit or something.
 *
 * Pawn: `Ham_Respawn`
 */
export declare class RespawnEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Entity)
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * This is called on a map reset for most map based entities.
 *
 * Pawn: `Ham_CS_Restart`
 */
export declare class RestartEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * A new round is starting.
 *
 * Pawn: `RG_CSGameRules_RestartRound` ()
 */
export declare class RestartRoundEvent extends HookEvent {
    private readonly kind;
}
/**
 * There is no more ammo for this gun, so switch to the next best one.
 *
 * Pawn: `Ham_Weapon_RetireWeapon`
 */
export declare class RetireWeaponEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * The round is ending.
 *
 * Pawn: `RG_RoundEnd` (WinStatus:status, ScenarioEventEndRound:event, Float:tmDelay)
 */
export declare class RoundEndEvent extends HookEvent {
    private readonly kind;
    /**
     * The round's winner, one of `"TERRORIST"`, `"CT"`, `"draw"` or `"none"`, as `game.endRound` takes it. Assign to change it.
     *
     * Pawn: `WinStatus:status`
     */
    get winner(): RoundWinner;
    set winner(value: RoundWinner);
    /**
     * The reason the round ended, e.g. `"terroristsWin"`, `"ctsWin"`, `"bombDefused"`, `"targetSaved"`, `"gameRestart"`; `"unknown"` for a number the game does not name.
     *
     * Pawn: `ScenarioEventEndRound:event`
     */
    get reason(): RoundEndReason;
    set reason(value: RoundEndReason);
    /**
     * The seconds until the next round.
     *
     * Pawn: `Float:tmDelay`
     */
    get delay(): number;
    set delay(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_RoundRespawn` (const this), `Ham_CS_RoundRespawn`
 */
export declare class RoundRespawnEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Returns the secondary ammo index of the item.
 *
 * Pawn: `Ham_Item_SecondaryAmmoIndex`
 */
export declare class SecondaryAmmoIndexEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A weapon of one class fires its secondary attack - a knife's stab, a scope. `preventDefault()` stops it.
 *
 * Pawn: `Ham_Weapon_SecondaryAttack`
 */
export declare class SecondaryAttackEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * The game tells everyone who killed whom.
 *
 * Pawn: `RG_CSGameRules_SendDeathMessage` (const pKiller, const pVictim, const pAssister, const pevInflictor, const killerWeaponName[], const DeathMessageFlags:iDeathMessageFlags, const KillRarity:iRarityOfKill)
 */
export declare class SendDeathMessageEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pKiller`
     */
    get killer(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pVictim`
     */
    get victim(): Player;
    /**
     * Argument 3, read only.
     *
     * Pawn: `pAssister`
     */
    get assister(): Entity;
    /**
     * Argument 4, read only.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * Argument 5.
     *
     * Pawn: `killerWeaponName[]`
     */
    get killerWeaponName(): string;
    set killerWeaponName(value: string);
    /**
     * The extras the death message carries, any of `"Position"`, `"Assistant"`, `"KillRarity"`.
     *
     * Pawn: `DeathMessageFlags:iDeathMessageFlags`
     */
    get flags(): DeathMessageFlag[];
    set flags(values: DeathMessageFlag[]);
    /**
     * The things that made the kill rare, e.g. `"Headshot"`, `"NoScope"`, `"Penetrated"`, `"InAir"`.
     *
     * Pawn: `KillRarity:iRarityOfKill`
     */
    get rarity(): KillRarity[];
    set rarity(values: KillRarity[]);
}
/**
 * Called when server sends resources list and location.
 *
 * Pawn: `RH_SV_SendResources` (const client)
 */
export declare class SendResourcesEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
}
/**
 * A player's chat message goes out to the players and to the server console. Assign `event.text` to change what they read, or call `preventDefault()` so nobody gets it.
 *
 * Pawn: `RG_SendSayMessage` (const pPlayer, const szCmd[], bool:teamonly, const szText[], const pszFormat[], const pszConsoleFormat[], bool:bSenderDead, const placeName[], bool:consoleUsesPlaceName)
 */
export declare class SendSayMessageEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who wrote the message.
     *
     * Pawn: `pPlayer`
     */
    get player(): Player;
    /**
     * The command the message came with, `"say"` or `"say_team"`.
     *
     * Pawn: `szCmd[]`
     */
    get cmd(): string;
    set cmd(value: string);
    /**
     * `true` when only the player's team gets the message.
     *
     * Pawn: `bool:teamonly`
     */
    get teamonly(): boolean;
    set teamonly(value: boolean);
    /**
     * The message as the player wrote it. Assign to change it.
     *
     * Pawn: `szText[]`
     */
    get text(): string;
    set text(value: string);
    /**
     * The chat's format that puts the name, the place and the message together, e.g. `"#Cstrike_Chat_All"`.
     *
     * Pawn: `pszFormat[]`
     */
    get format(): string;
    set format(value: string);
    /**
     * The format of the line the server console prints for the message.
     *
     * Pawn: `pszConsoleFormat[]`
     */
    get consoleFormat(): string;
    set consoleFormat(value: string);
    /**
     * `true` when the player who wrote the message is dead.
     *
     * Pawn: `bool:bSenderDead`
     */
    get senderDead(): boolean;
    set senderDead(value: boolean);
    /**
     * The name of the place on the map where the player is, e.g. `"BombsiteA"`.
     *
     * Pawn: `placeName[]`
     */
    get placeName(): string;
    set placeName(value: string);
    /**
     * `true` when the console's line carries the place's name too.
     *
     * Pawn: `bool:consoleUsesPlaceName`
     */
    get consoleUsesPlaceName(): boolean;
    set consoleUsesPlaceName(value: boolean);
}
/**
 * Called whenever game sends an animation to his current holder (player)
 *
 * Pawn: `RG_CBasePlayerWeapon_SendWeaponAnim` (const this, iAnim, skiplocal), `Ham_CS_Weapon_SendWeaponAnim`
 */
export declare class SendWeaponAnimEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Argument 2.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `skiplocal`
     */
    get skiplocal(): number;
    set skiplocal(value: number);
}
/**
 * Pawn: `RG_CSGameRules_ServerDeactivate` ()
 */
export declare class ServerDeactivateEvent extends HookEvent {
    private readonly kind;
}
/**
 * Pawn: `RG_CBasePlayer_SetAnimation` (const this, PLAYER_ANIM:playerAnim)
 */
export declare class SetAnimationEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `PLAYER_ANIM:playerAnim`
     */
    get playerAnim(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_SetClientUserInfoModel` (const this, infobuffer[], szNewModel[])
 */
export declare class SetClientUserInfoModelEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `infobuffer[]`
     */
    get infobuffer(): string;
    set infobuffer(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `szNewModel[]`
     */
    get newModel(): string;
    set newModel(value: string);
}
/**
 * Pawn: `RG_CBasePlayer_SetClientUserInfoName` (const this, infobuffer[], szNewName[])
 */
export declare class SetClientUserInfoNameEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `infobuffer[]`
     */
    get infobuffer(): string;
    set infobuffer(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `szNewName[]`
     */
    get newName(): string;
    set newName(value: string);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player dies to pack up the appropriate weapons and ammo items, and creates a weaponbox that falls to floor with sets specify the model or when a player drop the item.
 *
 * Pawn: `RG_CWeaponBox_SetModel` (const this, const szModelName[])
 */
export declare class SetModelEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weaponBox(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `szModelName[]`
     */
    get modelName(): string;
    set modelName(value: string);
}
/**
 * Usually called after the engine call with the same name.
 *
 * Pawn: `Ham_SetObjectCollisionBox`
 */
export declare class SetObjectCollisionBoxEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Called when a player's set protection.
 *
 * Pawn: `RG_CBasePlayer_SetSpawnProtection` (const this, Float:time)
 */
export declare class SetSpawnProtectionEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
}
/**
 * Sets the toggle state of the entity.
 *
 * Pawn: `Ham_SetToggleState`
 */
export declare class SetToggleStateEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `state`
     */
    get state(): number;
    set state(value: number);
}
/**
 * Whether or not the player should fade on death.
 *
 * Pawn: `Ham_Player_ShouldFadeOnDeath`
 */
export declare class ShouldFadeOnDeathEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the weapon should idle.
 *
 * Pawn: `Ham_Weapon_ShouldWeaponIdle`
 */
export declare class ShouldWeaponIdleEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * The game shows a player a menu.
 *
 * Pawn: `RG_ShowMenu` (const index, const bitsSlots, const iDisplayTime, const iNeedMore, pszText[])
 */
export declare class ShowMenuEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `bitsSlots`
     */
    get slots(): number;
    set slots(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `iDisplayTime`
     */
    get displayTime(): number;
    set displayTime(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `iNeedMore`
     */
    get needMore(): number;
    set needMore(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `pszText[]`
     */
    get text(): string;
    set text(value: string);
}
/**
 * The game shows a player a VGUI menu (team select).
 *
 * Pawn: `RG_ShowVGUIMenu` (const index, VGUIMenu:menuType, const bitsSlots, szOldMenu[])
 */
export declare class ShowVguiMenuEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The menu shown, e.g. `"team"`, `"classT"`, `"classCT"`, `"buy"`, `"buyPistol"`.
     *
     * Pawn: `VGUIMenu:menuType`
     */
    get menu(): VguiMenu;
    set menu(value: VguiMenu);
    /**
     * Argument 3.
     *
     * Pawn: `bitsSlots`
     */
    get slots(): number;
    set slots(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `szOldMenu[]`
     */
    get oldMenu(): string;
    set oldMenu(value: string);
}
/**
 * An entity spawns - a player at the start of his life, a weapon, anything the map or a plugin makes. Without `classname` it is a player's; `{ classname: "weaponbox" }` hears that class's.
 *
 * Pawn: `RG_CBasePlayer_Spawn` (const this), `Ham_Spawn`
 */
export declare class SpawnEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player who spawns; for another class, `event.entity`.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
}
/**
 * Pawn: `RG_SpawnHeadGib` (pevVictim)
 */
export declare class SpawnHeadGibEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pevVictim`
     */
    get victim(): Player;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CGib * (Entity index of gib))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_SpawnRandomGibs` (pevVictim, cGibs, human)
 */
export declare class SpawnRandomGibsEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `pevVictim`
     */
    get victim(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `cGibs`
     */
    get gibs(): number;
    set gibs(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `human`
     */
    get human(): number;
    set human(value: number);
}
/**
 * A dead player's camera starts.
 *
 * Pawn: `RG_CBasePlayer_StartDeathCam` (const this)
 */
export declare class StartDeathCamEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * The player goes into observer mode.
 *
 * Pawn: `RG_CBasePlayer_StartObserver` (const this, Float:vecPosition[3], Float:vecViewAngle[3])
 */
export declare class StartObserverEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `Float:vecPosition[3]`
     */
    get position(): Vector;
    /**
     * Argument 3, read only.
     *
     * Pawn: `Float:vecViewAngle[3]`
     */
    get viewAngle(): Vector;
}
/**
 * Not entirely sure what this does.
 *
 * Pawn: `Ham_StartSneaking`
 */
export declare class StartSneakingEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * A sound is about to play. Assign `event.sample` to change it, or call `preventDefault()` to keep it silent.
 *
 * Pawn: `RH_SV_StartSound` (const recipients, const entity, const channel, const sample[], const volume, Float:attenuation, const fFlags, const pitch)
 */
export declare class StartSoundEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `recipients`
     */
    get recipients(): number;
    set recipients(value: number);
    /**
     * Argument 2, read only.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
    /**
     * Argument 3.
     *
     * Pawn: `channel`
     */
    get channel(): number;
    set channel(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `sample[]`
     */
    get sample(): string;
    set sample(value: string);
    /**
     * Argument 5.
     *
     * Pawn: `volume`
     */
    get volume(): number;
    set volume(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `Float:attenuation`
     */
    get attenuation(): number;
    set attenuation(value: number);
    /**
     * Argument 7.
     *
     * Pawn: `fFlags`
     */
    get flags(): number;
    set flags(value: number);
    /**
     * Argument 8.
     *
     * Pawn: `pitch`
     */
    get pitch(): number;
    set pitch(value: number);
}
/**
 * Not entirely sure what this does.
 *
 * Pawn: `Ham_StopSneaking`
 */
export declare class StopSneakingEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things.
 *
 * Pawn: `RG_CBasePlayer_SwitchTeam` (const this)
 */
export declare class SwitchTeamEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * A player is about to take damage. Assign `event.damage` to change how much, or call `preventDefault()` to take none.
 *
 * Pawn: `RG_CBasePlayer_TakeDamage` (const this, pevInflictor, pevAttacker, Float:flDamage, bitsDamageType), `Ham_TakeDamage`
 */
export declare class TakeDamageEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The player who is hurt.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The source of the damage: a weapon, a grenade, the world.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * The player who does the damage.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * The damage, before armour. Assign to change it.
     *
     * Pawn: `Float:flDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * The kinds of damage, e.g. `"Fall"`, `"Bullet"`, `"Burn"`.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A hurt player is pushed back and slowed down by the hit, after the damage. Assign `event.knockbackForce` or `event.velModifier` to change how much, or call `preventDefault()` for neither.
 *
 * Pawn: `RG_CBasePlayer_TakeDamageImpulse` (const this, attacker, Float:flKnockbackForce, Float:flVelModifier)
 */
export declare class TakeDamageImpulseEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who is hurt.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The player who did the damage.
     *
     * Pawn: `attacker`
     */
    get attacker(): Player;
    /**
     * The force that pushes the player away from the attacker. Assign to change it.
     *
     * Pawn: `Float:flKnockbackForce`
     */
    get knockbackForce(): number;
    set knockbackForce(value: number);
    /**
     * The share of speed the player keeps while slowed by the hit, e.g. `0.5` for half. Assign to change it.
     *
     * Pawn: `Float:flVelModifier`
     */
    get velModifier(): number;
    set velModifier(value: number);
}
/**
 * Pawn: `RG_CBasePlayer_TakeHealth` (const this, Float:flHealth, bitsDamageType), `Ham_TakeHealth`
 */
export declare class TakeHealthEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `Float:flHealth`
     */
    get health(): number;
    set health(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called each time player tries to join a team to ensure availability
 *
 * Pawn: `RG_CSGameRules_TeamFull` (team_id)
 */
export declare class TeamFullEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `team_id`
     */
    get team_id(): number;
    set team_id(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Get the entity's team id.
 *
 * Pawn: `Ham_TeamId`
 */
export declare class TeamIdEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (String)
     */
    get result(): string;
}
/**
 * Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar)
 *
 * Pawn: `RG_CSGameRules_TeamStacked` (newTeam_id, curTeam_id)
 */
export declare class TeamStackedEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `newTeam_id`
     */
    get newTeam_id(): number;
    set newTeam_id(value: number);
    /**
     * Argument 2.
     *
     * Pawn: `curTeam_id`
     */
    get curTeam_id(): number;
    set curTeam_id(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * An entity of one class thinks - when its `nextThink` comes: `{ classname: "info_target" }`.
 *
 * Pawn: `Ham_Think`
 */
export declare class ThinkEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The entity the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * A player threw a flashbang. In a post listener `event.result` is the grenade.
 *
 * Pawn: `RG_ThrowFlashbang` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time)
 */
export declare class ThrowFlashbangEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who threw the grenade.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * Argument 3, read only.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * Argument 4.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of flashbang))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A player throws a grenade.
 *
 * Pawn: `RG_CBasePlayer_ThrowGrenade` (const this, const grenade, Float:vecSrc[3], Float:vecThrow[3], Float:time, const usEvent)
 */
export declare class ThrowGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who threw the grenade.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `grenade`
     */
    get grenade(): number;
    set grenade(value: number);
    /**
     * Argument 3, read only.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * The grenade's velocity, a Vector. Read only.
     *
     * Pawn: `Float:vecThrow[3]`
     */
    get velocity(): Vector;
    /**
     * Argument 5.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `usEvent`
     */
    get usEvent(): number;
    set usEvent(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of grenade))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A player threw an HE grenade. In a post listener `event.result` is the grenade.
 *
 * Pawn: `RG_ThrowHeGrenade` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time, const team, const usEvent)
 */
export declare class ThrowHeGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who threw the grenade.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The point the grenade is thrown from, a Vector. Read only.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * The grenade's velocity, a Vector. Read only.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * Argument 4.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `team`
     */
    get team(): number;
    set team(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `usEvent`
     */
    get usEvent(): number;
    set usEvent(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of hegrenade))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * A player threw a smoke grenade. In a post listener `event.result` is the grenade.
 *
 * Pawn: `RG_ThrowSmokeGrenade` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time, const usEvent)
 */
export declare class ThrowSmokeGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * The player who threw the grenade.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * The point the grenade is thrown from, a Vector. Read only.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * The grenade's velocity, a Vector. Read only.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * Argument 4.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `usEvent`
     */
    get usEvent(): number;
    set usEvent(value: number);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of smokegrenade))
     */
    get result(): Entity;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Returns the toggle state of the entity.
 *
 * Pawn: `Ham_GetToggleState`
 */
export declare class ToggleStateEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): number;
    /**
     * Blocks the game's function; it answers 0.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Whether or not the player is touching a weapon on the ground.
 *
 * Pawn: `Ham_CS_Player_OnTouchingWeapon`
 */
export declare class TouchingWeaponEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2.
     *
     * Pawn: `weapon`
     */
    get weapon(): Weapon;
    set weapon(value: Weapon);
}
/**
 * A shot or a knife hit a player, before the damage. `preventDefault()` makes it miss.
 *
 * Pawn: `RG_CBasePlayer_TraceAttack` (const this, pevAttacker, Float:flDamage, Float:vecDir[3], tracehandle, bitsDamageType), `Ham_TraceAttack`
 */
export declare class TraceAttackEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * Argument 3.
     *
     * Pawn: `Float:flDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * The shot's direction, a Vector. Read only.
     *
     * Pawn: `Float:vecDir[3]`
     */
    get dir(): Vector;
    /**
     * Argument 5.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /** The entity the event is about, whatever its class - the one `classname` names; for a player, `event.player`. */
    get entity(): Entity;
}
/**
 * Traces where blood should appear.
 *
 * Pawn: `Ham_TraceBleed`
 */
export declare class TraceBleedEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `Float:damage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `Float:direction[3]`
     */
    get direction(): Vector;
    set direction(value: Vector);
    /**
     * Argument 4.
     *
     * Pawn: `trace`
     */
    get trace(): number;
    set trace(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `damageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Pawn: `RG_RadiusFlash_TraceLine` (const index, inflictor, attacker, Float:vecSrc[3], Float:vecSpot[3], tracehandle)
 */
export declare class TraceLineEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Argument 2, read only.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
    /**
     * Argument 3, read only.
     *
     * Pawn: `attacker`
     */
    get attacker(): Player;
    /**
     * Argument 4, read only.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Argument 5, read only.
     *
     * Pawn: `Float:vecSpot[3]`
     */
    get spot(): Vector;
    /**
     * Argument 6.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
}
/**
 * Called whenever player tries to unduck
 *
 * Pawn: `RG_PM_UnDuck` (const playerIndex)
 */
export declare class UnDuckEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_UpdateClientData` (const this), `Ham_Player_UpdateClientData`
 */
export declare class UpdateClientDataEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Updates the HUD info about this item.
 *
 * Pawn: `Ham_Item_UpdateItemInfo`
 */
export declare class UpdateItemInfoEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Used in Half-Life to update a monster's owner.
 *
 * Pawn: `Ham_UpdateOwner`
 */
export declare class UpdateOwnerEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * The game updates a player's status bar: the name and health of the player under the crosshair, at the bottom of the screen. `preventDefault()` leaves it as it is.
 *
 * Pawn: `RG_CBasePlayer_UpdateStatusBar` (const this)
 */
export declare class UpdateStatusBarEvent extends HookEvent {
    private readonly kind;
    /**
     * The player whose status bar it is.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * An entity of one class is used - a button pressed, a door opened. `preventDefault()` keeps it as it is.
 *
 * Pawn: `Ham_Use`
 */
export declare class UseEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The entity the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * The entity that passes the use on, e.g. a button to its door.
     *
     * Pawn: `caller`
     */
    get caller(): Entity;
    set caller(value: Entity);
    /**
     * The entity that started it, e.g. the player who pressed the button.
     *
     * Pawn: `activator`
     */
    get activator(): Entity;
    set activator(value: Entity);
    /**
     * The way it is used, one of `"off"`, `"on"`, `"set"` or `"toggle"`.
     *
     * Pawn: `useType`
     */
    get useType(): UseType;
    set useType(value: UseType);
    /**
     * A number the use carries, for `"set"`.
     *
     * Pawn: `Float:value`
     */
    get value(): number;
    set value(value: number);
}
/**
 * Unsure.
 *
 * Pawn: `Ham_Weapon_UseDecrement`
 */
export declare class UseDecrementEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a player press use and if a suitable candidate is not found.
 *
 * Pawn: `RG_CBasePlayer_UseEmpty` (const this)
 */
export declare class UseEmptyEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Returns true if a line can be traced from the caller's eyes to the target.
 *
 * Pawn: `Ham_FVisible`
 */
export declare class VisibleEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
    /**
     * Argument 2.
     *
     * Pawn: `other`
     */
    get other(): Entity;
    set other(value: Entity);
    /**
     * The game's answer, read in a post hook. To answer yourself, return a value from the handler.
     *
     * Pawn: `GetHookChainReturn` (Integer)
     */
    get result(): boolean;
    /**
     * Blocks the game's function; it answers false.
     *
     * Pawn: `HC_SUPERCEDE`, `HAM_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CGib_WaitTillLand` (const this)
 */
export declare class WaitTillLandEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get gib(): Entity;
}
/**
 * Called on every frame after a player jumps on water for a short period of time
 *
 * Pawn: `RG_PM_WaterJump` (const playerIndex)
 */
export declare class WaterJumpEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * A weapon of one class idles, playing its idle animation.
 *
 * Pawn: `Ham_Weapon_WeaponIdle`
 */
export declare class WeaponIdleEvent extends HookEvent {
    private readonly kind;
    private static readonly ham;
    /**
     * The weapon the event is about - one of the class `classname` names.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Receiver is player index or 0 when update will be sended to all.
 *
 * Pawn: `RH_SV_WriteFullClientUpdate` (const client, buffer, const receiver)
 */
export declare class WriteFullClientUpdateEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
    /**
     * Argument 2.
     *
     * Pawn: `buffer`
     */
    get buffer(): number;
    set buffer(value: number);
    /**
     * Argument 3, read only.
     *
     * Pawn: `receiver`
     */
    get receiver(): Player;
}
/**
 * Every game event, by the name game.addEventListener takes - the event
 * it hands the listener. What an editor completes; the compiler reads it
 * through the same patch as ServerEventMap (runtime/patches).
 */
export interface GameEventMap {
    /**
     * Usually called to activate some objects.
     *
     * Pawn: `Ham_Activate`
     */
    activate: ActivateEvent;
    /** Pawn: `RH_SV_ActivateServer` */
    activateServer: ActivateServerEvent;
    /**
     * A player's money changes. Assign `event.amount` to change how much.
     *
     * Pawn: `RG_CBasePlayer_AddAccount`
     */
    addAccount: AddAccountEvent;
    /**
     * Unsure.
     *
     * Pawn: `Ham_Item_AddDuplicate`
     */
    addDuplicate: AddDuplicateEvent;
    /**
     * Called inside TraceAttack to store entity damage to multidamage data
     *
     * Pawn: `RG_AddMultiDamage`
     */
    addMultiDamage: AddMultiDamageEvent;
    /** Pawn: `RG_CBasePlayer_AddPlayerItem`, `Ham_AddPlayerItem` */
    addPlayerItem: AddPlayerItemEvent;
    /** Pawn: `RG_CBasePlayer_AddPoints`, `Ham_AddPoints` */
    addPoints: AddPointsEvent;
    /** Pawn: `RG_CBasePlayer_AddPointsToTeam`, `Ham_AddPointsToTeam` */
    addPointsToTeam: AddPointsToTeamEvent;
    /**
     * A file is added to what clients download.
     *
     * Pawn: `RH_SV_AddResource`
     */
    addResource: AddResourceEvent;
    /**
     * A weapon of one class goes to a player - picked up or given. Return `false` to refuse it.
     *
     * Pawn: `Ham_Item_AddToPlayer`
     */
    addToPlayer: AddToPlayerEvent;
    /**
     * Unsure.
     *
     * Pawn: `Ham_Weapon_AddWeapon`
     */
    addWeapon: AddWeaponEvent;
    /**
     * Called whenever player is on air (not touching floor)
     *
     * Pawn: `RG_PM_AirAccelerate`
     */
    airAccelerate: AirAccelerateEvent;
    /** Pawn: `RG_PM_AirMove` */
    airMove: AirMoveEvent;
    /**
     * Called when an entity is created.
     *
     * Pawn: `RH_ED_Alloc`
     */
    alloc: AllocEvent;
    /**
     * Called before adding an entity to the physents of a player.
     *
     * Pawn: `RH_SV_AllowPhysent`
     */
    allowPhysent: AllowPhysentEvent;
    /**
     * Called after game finished a bullet tracing for applying damage cached on multidamage data
     *
     * Pawn: `RG_ApplyMultiDamage`
     */
    applyMultiDamage: ApplyMultiDamageEvent;
    /**
     * Called when an entity starts being attached to (normally invisible and "following") a player.
     *
     * Pawn: `Ham_Item_AttachToPlayer`
     */
    attachToPlayer: AttachToPlayerEvent;
    /**
     * Returns a vector that tells the autoaim direction.
     *
     * Pawn: `Ham_CS_Player_GetAutoaimVector`
     */
    autoaimVector: AutoaimVectorEvent;
    /** Pawn: `RG_CSGameRules_BalanceTeams` */
    balanceTeams: BalanceTeamsEvent;
    /**
     * Called when monster dies and prepares its entity to become a corpse.
     *
     * Pawn: `Ham_BecomeDead`
     */
    becomeDead: BecomeDeadEvent;
    /**
     * Normally called whenever a barnacle grabs the entity.
     *
     * Pawn: `Ham_FBecomeProne`
     */
    becomeProne: BecomeProneEvent;
    /**
     * This functions searches the link list whose head is the caller's m_pLink field.
     *
     * Pawn: `Ham_BestVisibleEnemy`
     */
    bestVisibleEnemy: BestVisibleEnemyEvent;
    /** Pawn: `RG_CBasePlayer_Blind`, `Ham_CS_Player_Blind` */
    blind: BlindEvent;
    /**
     * A moving entity of one class - a door, a train - is blocked by another in its way.
     *
     * Pawn: `Ham_Blocked`
     */
    blocked: BlockedEvent;
    /**
     * Normally returns the blood color of the entity.
     *
     * Pawn: `Ham_BloodColor`
     */
    bloodColor: BloodColorEvent;
    /**
     * Position to shoot at.
     *
     * Pawn: `Ham_BodyTarget`
     */
    bodyTarget: BodyTargetEvent;
    /** Pawn: `RG_CGib_BounceGibTouch` */
    bounceGibTouch: BounceGibTouchEvent;
    /**
     * The player buys ammo.
     *
     * Pawn: `RG_BuyGunAmmo`
     */
    buyGunAmmo: BuyGunAmmoEvent;
    /**
     * Called when player buys an item from buy menu (Nightvision, Kevlar, etc.)
     *
     * Pawn: `RG_BuyItem`
     */
    buyItem: BuyItemEvent;
    /**
     * A player buys a weapon. In a post listener `event.result` is the weapon.
     *
     * Pawn: `RG_BuyWeaponByWeaponID`
     */
    buyWeaponByWeaponId: BuyWeaponByWeaponIdEvent;
    /** Pawn: `RG_CBasePlayerWeapon_CanDeploy`, `Ham_Item_CanDeploy` */
    canDeploy: CanDeployEvent;
    /**
     * Whether or not the player can drop the specified item.
     *
     * Pawn: `Ham_CS_Item_CanDrop`
     */
    canDrop: CanDropEvent;
    /**
     * The player is touching a CBasePlayerItem, do I give it to him?
     *
     * Pawn: `RG_CSGameRules_CanHavePlayerItem`
     */
    canHavePlayerItem: CanHavePlayerItemEvent;
    /**
     * Whether or not the entity can be holstered.
     *
     * Pawn: `Ham_Item_CanHolster`
     */
    canHolster: CanHolsterEvent;
    /**
     * The game asks if one player hears another on voice. Return `true` or `false` to decide.
     *
     * Pawn: `RG_CSGameRules_CanPlayerHearPlayer`
     */
    canPlayerHearPlayer: CanPlayerHearPlayerEvent;
    /**
     * The game asks if a player may move to a team. Return `true` or `false` to decide.
     *
     * Pawn: `RG_CBasePlayer_CanSwitchTeam`
     */
    canSwitchTeam: CanSwitchTeamEvent;
    /**
     * Returns the center of the entity.
     *
     * Pawn: `Ham_Center`
     */
    center: CenterEvent;
    /** Pawn: `RG_CSGameRules_ChangeLevel` */
    changeLevel: ChangeLevelEvent;
    /**
     * Turns a monster towards its ideal_yaw.
     *
     * Pawn: `Ham_ChangeYaw`
     */
    changeYaw: ChangeYawEvent;
    /** Pawn: `RG_CSGameRules_CheckMapConditions` */
    checkMapConditions: CheckMapConditionsEvent;
    /**
     * Called every client frame to check time based damage
     *
     * Pawn: `RG_CBasePlayer_CheckTimeBasedDamage`
     */
    checkTimeBasedDamage: CheckTimeBasedDamageEvent;
    /**
     * Called when a player's userinfo is being checked.
     *
     * Pawn: `RH_SV_CheckUserInfo`
     */
    checkUserInfo: CheckUserInfoEvent;
    /**
     * Called when a player jumps on water for the first time
     *
     * Pawn: `RG_PM_CheckWaterJump`
     */
    checkWaterJump: CheckWaterJumpEvent;
    /**
     * The game checks if a side has won. `preventDefault()` stops it from ending the round.
     *
     * Pawn: `RG_CSGameRules_CheckWinConditions`
     */
    checkWinConditions: CheckWinConditionsEvent;
    /**
     * Typically called when an entity dies to notify any children entities about the death.
     *
     * Pawn: `Ham_DeathNotice`
     */
    childDeathNotice: ChildDeathNoticeEvent;
    /** Pawn: `RG_HandleMenu_ChooseAppearance` */
    chooseAppearance: ChooseAppearanceEvent;
    /**
     * A player picked an item in the team menu. `preventDefault()` ignores the pick.
     *
     * Pawn: `RG_HandleMenu_ChooseTeam`
     */
    chooseTeam: ChooseTeamEvent;
    /** Pawn: `RG_CBasePlayer_Classify`, `Ham_Classify` */
    classify: ClassifyEvent;
    /**
     * Recreate all the map entities from the map data (preserving their indices),
     *
     * Pawn: `RG_CSGameRules_CleanUpMap`
     */
    cleanUpMap: CleanUpMapEvent;
    /**
     * Called when game clears multidamage data (before TraceAttack)
     *
     * Pawn: `RG_ClearMultiDamage`
     */
    clearMultiDamage: ClearMultiDamageEvent;
    /**
     * Called after processing a client connection request.
     *
     * Pawn: `RH_ClientConnected`
     */
    clientConnected: ClientConnectedEvent;
    /**
     * Called when message is being printed to client console.
     *
     * Pawn: `RH_SV_ClientPrintf`
     */
    clientPrintf: ClientPrintfEvent;
    /**
     * The player has changed userinfo; can change it now.
     *
     * Pawn: `RG_CSGameRules_ClientUserInfoChanged`
     */
    clientUserInfoChanged: ClientUserInfoChangedEvent;
    /**
     * Called when processing a 'connect' client connectionless packet.
     *
     * Pawn: `RH_SV_ConnectClient`
     */
    connectClient: ConnectClientEvent;
    /**
     * Called when a player drops a weapon (usually manual drop or death)
     *
     * Pawn: `RG_CreateWeaponBox`
     */
    createWeaponBox: CreateWeaponBoxEvent;
    /**
     * Returns the damage decal of the entity for the damage type.
     *
     * Pawn: `Ham_DamageDecal`
     */
    damageDecal: DamageDecalEvent;
    /**
     * What do I do with player's weapons when he's killed?
     *
     * Pawn: `RG_CSGameRules_DeadPlayerWeapons`
     */
    deadPlayerWeapons: DeadPlayerWeaponsEvent;
    /**
     * Determines the best type of death animation to play.
     *
     * Pawn: `Ham_GetDeathActivity`
     */
    deathActivity: DeathActivityEvent;
    /**
     * Call this from within a GameRules class to report an obituary.
     *
     * Pawn: `RG_CSGameRules_DeathNotice`
     */
    deathNotice: DeathNoticeEvent;
    /**
     * Called when a client emits a "death sound" after death.
     *
     * Pawn: `RG_CBasePlayer_DeathSound`
     */
    deathSound: DeathSoundEvent;
    /**
     * A weapon is being taken out. Assign `event.viewModel` / `weaponModel` to change what is shown.
     *
     * Pawn: `RG_CBasePlayerWeapon_DefaultDeploy`
     */
    defaultDeploy: DefaultDeployEvent;
    /** Pawn: `RG_CBasePlayerWeapon_DefaultReload` */
    defaultReload: DefaultReloadEvent;
    /** Pawn: `RG_CBasePlayerWeapon_DefaultShotgunReload` */
    defaultShotgunReload: DefaultShotgunReloadEvent;
    /**
     * Called when a player has ended to defuses the bomb or when the previous defuser has taken off or been killed.
     *
     * Pawn: `RG_CGrenade_DefuseBombEnd`
     */
    defuseBombEnd: DefuseBombEndEvent;
    /**
     * Called when a player goes to start defuse the bomb.
     *
     * Pawn: `RG_CGrenade_DefuseBombStart`
     */
    defuseBombStart: DefuseBombStartEvent;
    /**
     * Unsure, I believe this is the delay between activation for an entity.
     *
     * Pawn: `Ham_GetDelay`
     */
    delay: DelayEvent;
    /**
     * A weapon of one class is drawn. Return `false` to refuse it.
     *
     * Pawn: `Ham_Item_Deploy`
     */
    deploy: DeployEvent;
    /** Pawn: `RH_Cvar_DirectSet` */
    directSet: DirectSetEvent;
    /**
     * VIP player got to the point of rescue.
     *
     * Pawn: `RG_CBasePlayer_Disappear`
     */
    disappear: DisappearEvent;
    /**
     * A weapon of one class is dropped.
     *
     * Pawn: `Ham_Item_Drop`
     */
    drop: DropEvent;
    /** Pawn: `RH_SV_DropClient` */
    dropClient: DropClientEvent;
    /**
     * Called when a idle player is removed from server.
     *
     * Pawn: `RG_CBasePlayer_DropIdlePlayer`
     */
    dropIdlePlayer: DropIdlePlayerEvent;
    /**
     * A player drops a weapon. In a post listener `event.result` is the weapon box on the ground.
     *
     * Pawn: `RG_CBasePlayer_DropPlayerItem`
     */
    dropPlayerItem: DropPlayerItemEvent;
    /**
     * Called when a player throws the shield on the ground.
     *
     * Pawn: `RG_CBasePlayer_DropShield`
     */
    dropShield: DropShieldEvent;
    /**
     * A player ducks.
     *
     * Pawn: `RG_CBasePlayer_Duck`, `Ham_Player_Duck`
     */
    duck: DuckEvent;
    /**
     * Returns the ear position of the entity.
     *
     * Pawn: `Ham_EarPosition`
     */
    earPosition: EarPositionEvent;
    /**
     * Called when client it's in the scoreboard
     *
     * Pawn: `RH_SV_EmitPings`
     */
    emitPings: EmitPingsEvent;
    /**
     * Called when game selects a spawn point (info_player_start/deathmatch) to position the player
     *
     * Pawn: `RG_CBasePlayer_EntSelectSpawnPoint`
     */
    entSelectSpawnPoint: EntSelectSpawnPointEvent;
    /**
     * Called when a command is being sent to server.
     *
     * Pawn: `RH_ExecuteServerStringCmd`
     */
    executeServerStringCmd: ExecuteServerStringCmdEvent;
    /**
     * Called when a C4 goes to explodes.
     *
     * Pawn: `RG_CGrenade_ExplodeBomb`
     */
    explodeBomb: ExplodeBombEvent;
    /**
     * Called when a flashbang detonates.
     *
     * Pawn: `RG_CGrenade_ExplodeFlashbang`
     */
    explodeFlashbang: ExplodeFlashbangEvent;
    /**
     * Called when a hegrenade detonates.
     *
     * Pawn: `RG_CGrenade_ExplodeHeGrenade`
     */
    explodeHeGrenade: ExplodeHeGrenadeEvent;
    /**
     * A smoke grenade is going off.
     *
     * Pawn: `RG_CGrenade_ExplodeSmokeGrenade`
     */
    explodeSmokeGrenade: ExplodeSmokeGrenadeEvent;
    /**
     * Gets ammo from the target weapon.
     *
     * Pawn: `Ham_Weapon_ExtractAmmo`
     */
    extractAmmo: ExtractAmmoEvent;
    /**
     * Gets clip ammo from the target weapon.
     *
     * Pawn: `Ham_Weapon_ExtractClipAmmo`
     */
    extractClipAmmo: ExtractClipAmmoEvent;
    /**
     * Returns the eye position of the entity.
     *
     * Pawn: `Ham_EyePosition`
     */
    eyePosition: EyePositionEvent;
    /**
     * Slowly fades a entity out, then removes it.
     *
     * Pawn: `Ham_FadeMonster`
     */
    fadeMonster: FadeMonsterEvent;
    /** Pawn: `RG_CBaseEntity_FireBuckshots` */
    fireBuckshots: FireBuckshotsEvent;
    /** Pawn: `RG_CBaseEntity_FireBullets` */
    fireBullets: FireBulletsEvent;
    /** Pawn: `RG_CBaseEntity_FireBullets3` */
    fireBullets3: FireBullets3Event;
    /**
     * The game works out how much a fall hurts. In a post listener `event.result` is that number; return a number to replace it.
     *
     * Pawn: `RG_CSGameRules_FlPlayerFallDamage`
     */
    flPlayerFallDamage: FlPlayerFallDamageEvent;
    /**
     * Is this player allowed to respawn now?
     *
     * Pawn: `RG_CSGameRules_FPlayerCanRespawn`
     */
    fPlayerCanRespawn: FPlayerCanRespawnEvent;
    /**
     * Can this player take damage from this attacker?
     *
     * Pawn: `RG_CSGameRules_FPlayerCanTakeDamage`
     */
    fPlayerCanTakeDamage: FPlayerCanTakeDamageEvent;
    /**
     * Called when an entity is removed (freed from server).
     *
     * Pawn: `RH_ED_Free`
     */
    free: FreeEvent;
    /**
     * Should the player switch to this weapon?
     *
     * Pawn: `RG_CSGameRules_FShouldSwitchWeapon`
     */
    fShouldSwitchWeapon: FShouldSwitchWeaponEvent;
    /**
     * The game rules' think: every frame, the round's clock and win conditions checked.
     *
     * Pawn: `RG_CSGameRules_Think`
     */
    gameThink: GameThinkEvent;
    /** Pawn: `RH_GetEntityInit` */
    getEntityInit: GetEntityInitEvent;
    /** Pawn: `RG_GetForceCamera` */
    getForceCamera: GetForceCameraEvent;
    /**
     * Called when a player enters the game.
     *
     * Pawn: `RG_CBasePlayer_GetIntoGame`
     */
    getIntoGame: GetIntoGameEvent;
    /**
     * I can't use this weapon anymore, get me the next best one.
     *
     * Pawn: `RG_CSGameRules_GetNextBestWeapon`
     */
    getNextBestWeapon: GetNextBestWeaponEvent;
    /**
     * Place this player on his spawnspot and face him in the proper direction.
     *
     * Pawn: `RG_CSGameRules_GetPlayerSpawnSpot`
     */
    getPlayerSpawnSpot: GetPlayerSpawnSpotEvent;
    /**
     * Create some gore and get rid of a monster's model.
     *
     * Pawn: `Ham_GibMonster`
     */
    gibMonster: GibMonsterEvent;
    /** Pawn: `RG_CGib_Spawn` */
    gibSpawn: GibSpawnEvent;
    /** Pawn: `RG_CBasePlayer_GiveAmmo`, `Ham_GiveAmmo` */
    giveAmmo: GiveAmmoEvent;
    /** Pawn: `RG_CSGameRules_GiveC4` */
    giveC4: GiveC4Event;
    /**
     * The game hands a spawned player the default weapons. `preventDefault()` gives nothing.
     *
     * Pawn: `RG_CBasePlayer_GiveDefaultItems`
     */
    giveDefaultItems: GiveDefaultItemsEvent;
    /** Pawn: `RG_CBasePlayer_GiveNamedItem` */
    giveNamedItem: GiveNamedItemEvent;
    /** Pawn: `RG_CBasePlayer_GiveShield` */
    giveShield: GiveShieldEvent;
    /** Pawn: `RG_CSGameRules_GoToIntermission` */
    goToIntermission: GoToIntermissionEvent;
    /**
     * Returns a vector that tells the gun position.
     *
     * Pawn: `Ham_Player_GetGunPosition`
     */
    gunPosition: GunPositionEvent;
    /**
     * Returns if monster has alien gibs.
     *
     * Pawn: `Ham_HasAlienGibs`
     */
    hasAlienGibs: HasAlienGibsEvent;
    /**
     * Returns if monster has human gibs.
     *
     * Pawn: `Ham_HasHumanGibs`
     */
    hasHumanGibs: HasHumanGibsEvent;
    /**
     * The game asks if an item is forbidden to a player. Return `true` to forbid it.
     *
     * Pawn: `RG_CBasePlayer_HasRestrictItem`
     */
    hasRestrictItem: HasRestrictItemEvent;
    /**
     * Whether or not the target is the same as the one passed.
     *
     * Pawn: `Ham_HasTarget`
     */
    hasTarget: HasTargetEvent;
    /**
     * The game shows a player a hint.
     *
     * Pawn: `RG_CBasePlayer_HintMessageEx`
     */
    hintMessageEx: HintMessageExEvent;
    /**
     * A weapon of one class is put away.
     *
     * Pawn: `Ham_Item_Holster`
     */
    holster: HolsterEvent;
    /**
     * Returns the illumination of the entity.
     *
     * Pawn: `Ham_Illumination`
     */
    illumination: IlluminationEvent;
    /**
     * A player sends an impulse: `100` is the flashlight, `201` the spray.
     *
     * Pawn: `RG_CBasePlayer_ImpulseCommands`, `Ham_Player_ImpulseCommands`
     */
    impulseCommands: ImpulseCommandsEvent;
    /**
     * Returns true if the passed ent is in the caller's forward view cone.
     *
     * Pawn: `Ham_FInViewCone`
     */
    inViewCone: InViewConeEvent;
    /**
     * Whether or not the entity is alive.
     *
     * Pawn: `Ham_IsAlive`
     */
    isAlive: IsAliveEvent;
    /**
     * Whether or not the player is a bot.
     *
     * Pawn: `Ham_CS_Player_IsBot`
     */
    isBot: IsBotEvent;
    /**
     * Whether or not the entity uses a BSP model.
     *
     * Pawn: `Ham_IsBSPModel`
     */
    isBspModel: IsBspModelEvent;
    /**
     * Whether or not the entity is in the world.
     *
     * Pawn: `Ham_IsInWorld`
     */
    isInWorld: IsInWorldEvent;
    /**
     * Whether or not the entity is moving.
     *
     * Pawn: `Ham_IsMoving`
     */
    isMoving: IsMovingEvent;
    /**
     * Whether or not the entity is a net client.
     *
     * Pawn: `Ham_IsNetClient`
     */
    isNetClient: IsNetClientEvent;
    /**
     * Called when a player hit to entity.
     *
     * Pawn: `RG_IsPenetrableEntity`
     */
    isPenetrableEntity: IsPenetrableEntityEvent;
    /**
     * Whether or not the entity is a player.
     *
     * Pawn: `Ham_IsPlayer`
     */
    isPlayer: IsPlayerEvent;
    /**
     * Whether or not the entity is sneaking.
     *
     * Pawn: `Ham_IsSneaking`
     */
    isSneaking: IsSneakingEvent;
    /**
     * Returns whether an entity is activated.
     *
     * Pawn: `Ham_IsTriggered`
     */
    isTriggered: IsTriggeredEvent;
    /**
     * Whether or not the weapon is usable (has ammo, etc.)
     *
     * Pawn: `Ham_Weapon_IsUsable`
     */
    isUsable: IsUsableEvent;
    /**
     * -
     *
     * Pawn: `Ham_CS_Item_IsWeapon`
     */
    isWeapon: IsWeaponEvent;
    /**
     * Called every client frame (PlayerPostThink) for the player's active weapon
     *
     * Pawn: `RG_CBasePlayerWeapon_ItemPostFrame`, `Ham_Item_PostFrame`
     */
    itemPostFrame: ItemPostFrameEvent;
    /**
     * A weapon of one class is thought over in its owner's hands, every frame before his move.
     *
     * Pawn: `Ham_Item_PreFrame`
     */
    itemPreFrame: ItemPreFrameEvent;
    /**
     * Returns the item slot for the item.
     *
     * Pawn: `Ham_Item_ItemSlot`
     */
    itemSlot: ItemSlotEvent;
    /**
     * Updates item data for the client.
     *
     * Pawn: `Ham_Item_UpdateClientData`
     */
    itemUpdateClientData: ItemUpdateClientDataEvent;
    /**
     * Called when a client "thinks for the join status".
     *
     * Pawn: `RG_CBasePlayer_JoiningThink`
     */
    joiningThink: JoiningThinkEvent;
    /**
     * A player jumps.
     *
     * Pawn: `RG_CBasePlayer_Jump`, `Ham_Player_Jump`
     */
    jump: JumpEvent;
    /**
     * Called whenever player fires a weapon and shakes player screen (punchangles altering)
     *
     * Pawn: `RG_CBasePlayerWeapon_KickBack`
     */
    kickBack: KickBackEvent;
    /**
     * Normally called when an item gets deleted.
     *
     * Pawn: `Ham_Item_Kill`
     */
    kill: KillEvent;
    /**
     * An entity dies - a player, or with `classname` a breakable, a hostage. `preventDefault()` keeps it alive.
     *
     * Pawn: `RG_CBasePlayer_Killed`, `Ham_Killed`
     */
    killed: KilledEvent;
    /**
     * Called when a player is on a ladder.
     *
     * Pawn: `RG_PM_LadderMove`
     */
    ladderMove: LadderMoveEvent;
    /**
     * Function to find enemies or food by sight.
     *
     * Pawn: `Ham_Look`
     */
    look: LookEvent;
    /**
     * Makes a random player the bomber.
     *
     * Pawn: `RG_CBasePlayer_MakeBomber`
     */
    makeBomber: MakeBomberEvent;
    /**
     * Makes a random player the VIP.
     *
     * Pawn: `RG_CBasePlayer_MakeVIP`
     */
    makeVip: MakeVipEvent;
    /**
     * Gets the maximum speed for whenever a player has the item deployed.
     *
     * Pawn: `Ham_CS_Item_GetMaxSpeed`
     */
    maxSpeed: MaxSpeedEvent;
    /**
     * Called when monster has died.
     *
     * Pawn: `Ham_MonsterInitDead`
     */
    monsterInitDead: MonsterInitDeadEvent;
    /** Pawn: `RG_PM_Move` */
    move: MoveEvent;
    /**
     * Returns the next target of this.
     *
     * Pawn: `Ham_GetNextTarget`
     */
    nextTarget: NextTargetEvent;
    /** Pawn: `RG_CBasePlayer_ObjectCaps`, `Ham_ObjectCaps` */
    objectCaps: ObjectCapsEvent;
    /**
     * Called when a client attempt to find the next observer.
     *
     * Pawn: `RG_CBasePlayer_Observer_FindNextPlayer`
     */
    observerFindNextPlayer: ObserverFindNextPlayerEvent;
    /** Pawn: `RG_CBasePlayer_Observer_IsValidTarget` */
    observerIsValidTarget: ObserverIsValidTargetEvent;
    /**
     * Called when a client attempt to change the observer mode.
     *
     * Pawn: `RG_CBasePlayer_Observer_SetMode`
     */
    observerSetMode: ObserverSetModeEvent;
    /** Pawn: `RG_CBasePlayer_Observer_Think` */
    observerThink: ObserverThinkEvent;
    /**
     * Not entirely sure.
     *
     * Pawn: `Ham_OnControls`
     */
    onControls: OnControlsEvent;
    /**
     * The game tells the bots something happened.
     *
     * Pawn: `RG_CBotManager_OnEvent`
     */
    onEvent: OnEventEvent;
    /**
     * The freeze time at the start of the round is over.
     *
     * Pawn: `RG_CSGameRules_OnRoundFreezeEnd`
     */
    onRoundFreezeEnd: OnRoundFreezeEndEvent;
    /**
     * Called on spawn, the attempt to equip a player.
     *
     * Pawn: `RG_CBasePlayer_OnSpawnEquip`
     */
    onSpawnEquip: OnSpawnEquipEvent;
    /**
     * Unsure.
     *
     * Pawn: `Ham_OverrideReset`
     */
    overrideReset: OverrideResetEvent;
    /**
     * Called when a client emits a "pain sound" after received damage.
     *
     * Pawn: `RG_CBasePlayer_Pain`
     */
    pain: PainEvent;
    /**
     * Called when monster is about to emit pain sound.
     *
     * Pawn: `Ham_PainSound`
     */
    painSound: PainSoundEvent;
    /**
     * Called when a player plant's the bomb on the ground.
     *
     * Pawn: `RG_PlantBomb`
     */
    plantBomb: PlantBombEvent;
    /**
     * Plays the weapon's empty sound.
     *
     * Pawn: `Ham_Weapon_PlayEmptySound`
     */
    playEmptySound: PlayEmptySoundEvent;
    /**
     * A flashbang is blinding a player. `preventDefault()` keeps the player's eyes clear.
     *
     * Pawn: `RG_PlayerBlind`
     */
    playerBlind: PlayerBlindEvent;
    /** Pawn: `RG_CBasePlayer_PlayerDeathThink` */
    playerDeathThink: PlayerDeathThinkEvent;
    /**
     * Called each time player gets a weapon linked to his inventory
     *
     * Pawn: `RG_CSGameRules_PlayerGotWeapon`
     */
    playerGotWeapon: PlayerGotWeaponEvent;
    /**
     * A player was killed.
     *
     * Pawn: `RG_CSGameRules_PlayerKilled`
     */
    playerKilled: PlayerKilledEvent;
    /**
     * A player spawned.
     *
     * Pawn: `RG_CSGameRules_PlayerSpawn`
     */
    playerSpawn: PlayerSpawnEvent;
    /**
     * Called whenever player emits an step sound
     *
     * Pawn: `RG_PM_PlayStepSound`
     */
    playStepSound: PlayStepSoundEvent;
    /**
     * Called on every frame to check player ducking
     *
     * Pawn: `RG_PM_Duck`
     */
    pmDuck: PmDuckEvent;
    /**
     * Called on every frame while player presses jump button
     *
     * Pawn: `RG_PM_Jump`
     */
    pmJump: PmJumpEvent;
    /**
     * Returns true if the passed ent is in the caller's forward view cone.
     *
     * Pawn: `Ham_FVecInViewCone`
     */
    pointInViewCone: PointInViewConeEvent;
    /**
     * Returns true if a line can be traced from the caller's eyes to given vector.
     *
     * Pawn: `Ham_FVecVisible`
     */
    pointVisible: PointVisibleEvent;
    /** Pawn: `RG_CBasePlayer_PostThink`, `Ham_Player_PostThink` */
    postThink: PostThinkEvent;
    /** Pawn: `RG_CBasePlayer_Precache`, `Ham_Precache` */
    precache: PrecacheEvent;
    /**
     * Called when a generic resource is being added to generic precache list.
     *
     * Pawn: `RH_PF_precache_generic_I`
     */
    precacheGenericI: PrecacheGenericIEvent;
    /**
     * Called when a model is being added to model precache list.
     *
     * Pawn: `RH_PF_precache_model_I`
     */
    precacheModelI: PrecacheModelIEvent;
    /**
     * Called when a sound is being added to sound precache list.
     *
     * Pawn: `RH_PF_precache_sound_I`
     */
    precacheSoundI: PrecacheSoundIEvent;
    /**
     * A player's frame, before he moves: every frame for every player, hundreds of times a second. Keep the listener tiny.
     *
     * Pawn: `RG_CBasePlayer_PreThink`, `Ham_Player_PreThink`
     */
    preThink: PreThinkEvent;
    /**
     * Returns the ammo index of the item.
     *
     * Pawn: `Ham_Item_PrimaryAmmoIndex`
     */
    primaryAmmoIndex: PrimaryAmmoIndexEvent;
    /**
     * A weapon of one class fires its primary attack - a shot, a knife's slash: `{ classname: "weapon_knife" }`. `preventDefault()` stops it.
     *
     * Pawn: `Ham_Weapon_PrimaryAttack`
     */
    primaryAttack: PrimaryAttackEvent;
    /**
     * Called when a message is being sent to the server's console.
     *
     * Pawn: `RH_Con_Printf`
     */
    printf: PrintfEvent;
    /**
     * A radio message is sent. `preventDefault()` silences it.
     *
     * Pawn: `RG_CBasePlayer_Radio`
     */
    radio: RadioEvent;
    /**
     * Whether or not the entity can reflect gauss shots..
     *
     * Pawn: `Ham_ReflectGauss`
     */
    reflectGauss: ReflectGaussEvent;
    /**
     * Checks relation ship between two monsters.
     *
     * Pawn: `Ham_IRelationship`
     */
    relationship: RelationshipEvent;
    /**
     * A weapon of one class reloads. `preventDefault()` stops it.
     *
     * Pawn: `Ham_Weapon_Reload`
     */
    reload: ReloadEvent;
    /** Pawn: `RG_CBasePlayer_RemoveAllItems` */
    removeAllItems: RemoveAllItemsEvent;
    /** Pawn: `RG_CSGameRules_RemoveGuns` */
    removeGuns: RemoveGunsEvent;
    /** Pawn: `RG_CBasePlayer_RemovePlayerItem`, `Ham_RemovePlayerItem` */
    removePlayerItem: RemovePlayerItemEvent;
    /**
     * Called when a player's remove protection.
     *
     * Pawn: `RG_CBasePlayer_RemoveSpawnProtection`
     */
    removeSpawnProtection: RemoveSpawnProtectionEvent;
    /**
     * Prints debug information about monster to console. (state, activity, and other)
     *
     * Pawn: `Ham_ReportAIState`
     */
    reportAiState: ReportAiStateEvent;
    /**
     * Sets the weapon so that it can play empty sound again.
     *
     * Pawn: `Ham_Weapon_ResetEmptySound`
     */
    resetEmptySound: ResetEmptySoundEvent;
    /**
     * The game resets a player's speed, on spawn and on every weapon switch. `preventDefault()` keeps the speed you set.
     *
     * Pawn: `RG_CBasePlayer_ResetMaxSpeed`, `Ham_CS_Player_ResetMaxSpeed`
     */
    resetMaxSpeed: ResetMaxSpeedEvent;
    /** Pawn: `RG_CBaseAnimating_ResetSequenceInfo` */
    resetSequenceInfo: ResetSequenceInfoEvent;
    /**
     * Normally called when a map-based item respawns, such as a health kit or something.
     *
     * Pawn: `Ham_Respawn`
     */
    respawn: RespawnEvent;
    /**
     * This is called on a map reset for most map based entities.
     *
     * Pawn: `Ham_CS_Restart`
     */
    restart: RestartEvent;
    /**
     * A new round is starting.
     *
     * Pawn: `RG_CSGameRules_RestartRound`
     */
    restartRound: RestartRoundEvent;
    /**
     * There is no more ammo for this gun, so switch to the next best one.
     *
     * Pawn: `Ham_Weapon_RetireWeapon`
     */
    retireWeapon: RetireWeaponEvent;
    /**
     * The round is ending.
     *
     * Pawn: `RG_RoundEnd`
     */
    roundEnd: RoundEndEvent;
    /** Pawn: `RG_CBasePlayer_RoundRespawn`, `Ham_CS_RoundRespawn` */
    roundRespawn: RoundRespawnEvent;
    /**
     * Returns the secondary ammo index of the item.
     *
     * Pawn: `Ham_Item_SecondaryAmmoIndex`
     */
    secondaryAmmoIndex: SecondaryAmmoIndexEvent;
    /**
     * A weapon of one class fires its secondary attack - a knife's stab, a scope. `preventDefault()` stops it.
     *
     * Pawn: `Ham_Weapon_SecondaryAttack`
     */
    secondaryAttack: SecondaryAttackEvent;
    /**
     * The game tells everyone who killed whom.
     *
     * Pawn: `RG_CSGameRules_SendDeathMessage`
     */
    sendDeathMessage: SendDeathMessageEvent;
    /**
     * Called when server sends resources list and location.
     *
     * Pawn: `RH_SV_SendResources`
     */
    sendResources: SendResourcesEvent;
    /**
     * A player's chat message goes out to the players and to the server console. Assign `event.text` to change what they read, or call `preventDefault()` so nobody gets it.
     *
     * Pawn: `RG_SendSayMessage`
     */
    sendSayMessage: SendSayMessageEvent;
    /**
     * Called whenever game sends an animation to his current holder (player)
     *
     * Pawn: `RG_CBasePlayerWeapon_SendWeaponAnim`, `Ham_CS_Weapon_SendWeaponAnim`
     */
    sendWeaponAnim: SendWeaponAnimEvent;
    /** Pawn: `RG_CSGameRules_ServerDeactivate` */
    serverDeactivate: ServerDeactivateEvent;
    /** Pawn: `RG_CBasePlayer_SetAnimation` */
    setAnimation: SetAnimationEvent;
    /** Pawn: `RG_CBasePlayer_SetClientUserInfoModel` */
    setClientUserInfoModel: SetClientUserInfoModelEvent;
    /** Pawn: `RG_CBasePlayer_SetClientUserInfoName` */
    setClientUserInfoName: SetClientUserInfoNameEvent;
    /**
     * Called when a player dies to pack up the appropriate weapons and ammo items, and creates a weaponbox that falls to floor with sets specify the model or when a player drop the item.
     *
     * Pawn: `RG_CWeaponBox_SetModel`
     */
    setModel: SetModelEvent;
    /**
     * Usually called after the engine call with the same name.
     *
     * Pawn: `Ham_SetObjectCollisionBox`
     */
    setObjectCollisionBox: SetObjectCollisionBoxEvent;
    /**
     * Called when a player's set protection.
     *
     * Pawn: `RG_CBasePlayer_SetSpawnProtection`
     */
    setSpawnProtection: SetSpawnProtectionEvent;
    /**
     * Sets the toggle state of the entity.
     *
     * Pawn: `Ham_SetToggleState`
     */
    setToggleState: SetToggleStateEvent;
    /**
     * Whether or not the player should fade on death.
     *
     * Pawn: `Ham_Player_ShouldFadeOnDeath`
     */
    shouldFadeOnDeath: ShouldFadeOnDeathEvent;
    /**
     * Whether or not the weapon should idle.
     *
     * Pawn: `Ham_Weapon_ShouldWeaponIdle`
     */
    shouldWeaponIdle: ShouldWeaponIdleEvent;
    /**
     * The game shows a player a menu.
     *
     * Pawn: `RG_ShowMenu`
     */
    showMenu: ShowMenuEvent;
    /**
     * The game shows a player a VGUI menu (team select).
     *
     * Pawn: `RG_ShowVGUIMenu`
     */
    showVguiMenu: ShowVguiMenuEvent;
    /**
     * An entity spawns - a player at the start of his life, a weapon, anything the map or a plugin makes. Without `classname` it is a player's; `{ classname: "weaponbox" }` hears that class's.
     *
     * Pawn: `RG_CBasePlayer_Spawn`, `Ham_Spawn`
     */
    spawn: SpawnEvent;
    /** Pawn: `RG_SpawnHeadGib` */
    spawnHeadGib: SpawnHeadGibEvent;
    /** Pawn: `RG_SpawnRandomGibs` */
    spawnRandomGibs: SpawnRandomGibsEvent;
    /**
     * A dead player's camera starts.
     *
     * Pawn: `RG_CBasePlayer_StartDeathCam`
     */
    startDeathCam: StartDeathCamEvent;
    /**
     * The player goes into observer mode.
     *
     * Pawn: `RG_CBasePlayer_StartObserver`
     */
    startObserver: StartObserverEvent;
    /**
     * Not entirely sure what this does.
     *
     * Pawn: `Ham_StartSneaking`
     */
    startSneaking: StartSneakingEvent;
    /**
     * A sound is about to play. Assign `event.sample` to change it, or call `preventDefault()` to keep it silent.
     *
     * Pawn: `RH_SV_StartSound`
     */
    startSound: StartSoundEvent;
    /**
     * Not entirely sure what this does.
     *
     * Pawn: `Ham_StopSneaking`
     */
    stopSneaking: StopSneakingEvent;
    /**
     * Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things.
     *
     * Pawn: `RG_CBasePlayer_SwitchTeam`
     */
    switchTeam: SwitchTeamEvent;
    /**
     * A player is about to take damage. Assign `event.damage` to change how much, or call `preventDefault()` to take none.
     *
     * Pawn: `RG_CBasePlayer_TakeDamage`, `Ham_TakeDamage`
     */
    takeDamage: TakeDamageEvent;
    /**
     * A hurt player is pushed back and slowed down by the hit, after the damage. Assign `event.knockbackForce` or `event.velModifier` to change how much, or call `preventDefault()` for neither.
     *
     * Pawn: `RG_CBasePlayer_TakeDamageImpulse`
     */
    takeDamageImpulse: TakeDamageImpulseEvent;
    /** Pawn: `RG_CBasePlayer_TakeHealth`, `Ham_TakeHealth` */
    takeHealth: TakeHealthEvent;
    /**
     * Called each time player tries to join a team to ensure availability
     *
     * Pawn: `RG_CSGameRules_TeamFull`
     */
    teamFull: TeamFullEvent;
    /**
     * Get the entity's team id.
     *
     * Pawn: `Ham_TeamId`
     */
    teamId: TeamIdEvent;
    /**
     * Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar)
     *
     * Pawn: `RG_CSGameRules_TeamStacked`
     */
    teamStacked: TeamStackedEvent;
    /**
     * An entity of one class thinks - when its `nextThink` comes: `{ classname: "info_target" }`.
     *
     * Pawn: `Ham_Think`
     */
    think: ThinkEvent;
    /**
     * A player threw a flashbang. In a post listener `event.result` is the grenade.
     *
     * Pawn: `RG_ThrowFlashbang`
     */
    throwFlashbang: ThrowFlashbangEvent;
    /**
     * A player throws a grenade.
     *
     * Pawn: `RG_CBasePlayer_ThrowGrenade`
     */
    throwGrenade: ThrowGrenadeEvent;
    /**
     * A player threw an HE grenade. In a post listener `event.result` is the grenade.
     *
     * Pawn: `RG_ThrowHeGrenade`
     */
    throwHeGrenade: ThrowHeGrenadeEvent;
    /**
     * A player threw a smoke grenade. In a post listener `event.result` is the grenade.
     *
     * Pawn: `RG_ThrowSmokeGrenade`
     */
    throwSmokeGrenade: ThrowSmokeGrenadeEvent;
    /**
     * Returns the toggle state of the entity.
     *
     * Pawn: `Ham_GetToggleState`
     */
    toggleState: ToggleStateEvent;
    /**
     * Whether or not the player is touching a weapon on the ground.
     *
     * Pawn: `Ham_CS_Player_OnTouchingWeapon`
     */
    touchingWeapon: TouchingWeaponEvent;
    /**
     * A shot or a knife hit a player, before the damage. `preventDefault()` makes it miss.
     *
     * Pawn: `RG_CBasePlayer_TraceAttack`, `Ham_TraceAttack`
     */
    traceAttack: TraceAttackEvent;
    /**
     * Traces where blood should appear.
     *
     * Pawn: `Ham_TraceBleed`
     */
    traceBleed: TraceBleedEvent;
    /** Pawn: `RG_RadiusFlash_TraceLine` */
    traceLine: TraceLineEvent;
    /**
     * Called whenever player tries to unduck
     *
     * Pawn: `RG_PM_UnDuck`
     */
    unDuck: UnDuckEvent;
    /** Pawn: `RG_CBasePlayer_UpdateClientData`, `Ham_Player_UpdateClientData` */
    updateClientData: UpdateClientDataEvent;
    /**
     * Updates the HUD info about this item.
     *
     * Pawn: `Ham_Item_UpdateItemInfo`
     */
    updateItemInfo: UpdateItemInfoEvent;
    /**
     * Used in Half-Life to update a monster's owner.
     *
     * Pawn: `Ham_UpdateOwner`
     */
    updateOwner: UpdateOwnerEvent;
    /**
     * The game updates a player's status bar: the name and health of the player under the crosshair, at the bottom of the screen. `preventDefault()` leaves it as it is.
     *
     * Pawn: `RG_CBasePlayer_UpdateStatusBar`
     */
    updateStatusBar: UpdateStatusBarEvent;
    /**
     * An entity of one class is used - a button pressed, a door opened. `preventDefault()` keeps it as it is.
     *
     * Pawn: `Ham_Use`
     */
    use: UseEvent;
    /**
     * Unsure.
     *
     * Pawn: `Ham_Weapon_UseDecrement`
     */
    useDecrement: UseDecrementEvent;
    /**
     * Called when a player press use and if a suitable candidate is not found.
     *
     * Pawn: `RG_CBasePlayer_UseEmpty`
     */
    useEmpty: UseEmptyEvent;
    /**
     * Returns true if a line can be traced from the caller's eyes to the target.
     *
     * Pawn: `Ham_FVisible`
     */
    visible: VisibleEvent;
    /** Pawn: `RG_CGib_WaitTillLand` */
    waitTillLand: WaitTillLandEvent;
    /**
     * Called on every frame after a player jumps on water for a short period of time
     *
     * Pawn: `RG_PM_WaterJump`
     */
    waterJump: WaterJumpEvent;
    /**
     * A weapon of one class idles, playing its idle animation.
     *
     * Pawn: `Ham_Weapon_WeaponIdle`
     */
    weaponIdle: WeaponIdleEvent;
    /**
     * Receiver is player index or 0 when update will be sended to all.
     *
     * Pawn: `RH_SV_WriteFullClientUpdate`
     */
    writeFullClientUpdate: WriteFullClientUpdateEvent;
    /**
     * An entity touched another: `event.toucher` moved into `event.touched`. Pass the classes it is about as the third argument - `{ toucher: "player", touched: "player" }` - so only those touches reach the plugin; `event.preventDefault()` blocks the touch.
     *
     * Pawn: `register_touch`
     */
    touch: TouchEvent;
}
/**
 * What a listener may return for each event: the game's answer type, or
 * void for one that answers nothing. Only the editor reads this - it is the
 * constraint on a listener's return type.
 */
export interface GameAnswerMap {
    activate: void;
    activateServer: void;
    addAccount: void;
    addDuplicate: boolean;
    addMultiDamage: void;
    addPlayerItem: number;
    addPoints: void;
    addPointsToTeam: void;
    addResource: void;
    addToPlayer: boolean;
    addWeapon: boolean;
    airAccelerate: void;
    airMove: void;
    alloc: Entity;
    allowPhysent: boolean;
    applyMultiDamage: void;
    attachToPlayer: void;
    autoaimVector: Vector;
    balanceTeams: void;
    becomeDead: void;
    becomeProne: boolean;
    bestVisibleEnemy: Entity;
    blind: void;
    blocked: void;
    bloodColor: number;
    bodyTarget: Vector;
    bounceGibTouch: void;
    buyGunAmmo: boolean;
    buyItem: void;
    buyWeaponByWeaponId: Entity;
    canDeploy: number;
    canDrop: boolean;
    canHavePlayerItem: number;
    canHolster: boolean;
    canPlayerHearPlayer: boolean;
    canSwitchTeam: boolean;
    center: Vector;
    changeLevel: void;
    changeYaw: number;
    checkMapConditions: void;
    checkTimeBasedDamage: void;
    checkUserInfo: number;
    checkWaterJump: void;
    checkWinConditions: void;
    childDeathNotice: void;
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
    damageDecal: number;
    deadPlayerWeapons: number;
    deathActivity: number;
    deathNotice: void;
    deathSound: void;
    defaultDeploy: number;
    defaultReload: number;
    defaultShotgunReload: boolean;
    defuseBombEnd: void;
    defuseBombStart: void;
    delay: number;
    deploy: boolean;
    directSet: void;
    disappear: void;
    drop: void;
    dropClient: void;
    dropIdlePlayer: void;
    dropPlayerItem: Entity;
    dropShield: Entity;
    duck: void;
    earPosition: Vector;
    emitPings: void;
    entSelectSpawnPoint: Entity;
    executeServerStringCmd: void;
    explodeBomb: void;
    explodeFlashbang: void;
    explodeHeGrenade: void;
    explodeSmokeGrenade: void;
    extractAmmo: number;
    extractClipAmmo: number;
    eyePosition: Vector;
    fadeMonster: void;
    fireBuckshots: void;
    fireBullets: void;
    fireBullets3: void;
    flPlayerFallDamage: number;
    fPlayerCanRespawn: number;
    fPlayerCanTakeDamage: number;
    free: void;
    fShouldSwitchWeapon: number;
    gameThink: void;
    getEntityInit: void;
    getForceCamera: number;
    getIntoGame: boolean;
    getNextBestWeapon: number;
    getPlayerSpawnSpot: Entity;
    gibMonster: void;
    gibSpawn: void;
    giveAmmo: number;
    giveC4: Player;
    giveDefaultItems: void;
    giveNamedItem: Entity;
    giveShield: void;
    goToIntermission: void;
    gunPosition: Vector;
    hasAlienGibs: boolean;
    hasHumanGibs: boolean;
    hasRestrictItem: boolean;
    hasTarget: boolean;
    hintMessageEx: boolean;
    holster: void;
    illumination: number;
    impulseCommands: void;
    inViewCone: boolean;
    isAlive: boolean;
    isBot: boolean;
    isBspModel: boolean;
    isInWorld: boolean;
    isMoving: boolean;
    isNetClient: boolean;
    isPenetrableEntity: boolean;
    isPlayer: boolean;
    isSneaking: boolean;
    isTriggered: boolean;
    isUsable: boolean;
    isWeapon: boolean;
    itemPostFrame: void;
    itemPreFrame: void;
    itemSlot: number;
    itemUpdateClientData: number;
    joiningThink: void;
    jump: void;
    kickBack: void;
    kill: void;
    killed: void;
    ladderMove: void;
    look: void;
    makeBomber: boolean;
    makeVip: void;
    maxSpeed: number;
    monsterInitDead: void;
    move: void;
    nextTarget: Entity;
    objectCaps: number;
    observerFindNextPlayer: void;
    observerIsValidTarget: Player;
    observerSetMode: void;
    observerThink: void;
    onControls: boolean;
    onEvent: void;
    onRoundFreezeEnd: void;
    onSpawnEquip: void;
    overrideReset: void;
    pain: void;
    painSound: void;
    plantBomb: Entity;
    playEmptySound: boolean;
    playerBlind: void;
    playerDeathThink: void;
    playerGotWeapon: void;
    playerKilled: void;
    playerSpawn: void;
    playStepSound: void;
    pmDuck: void;
    pmJump: void;
    pointInViewCone: boolean;
    pointVisible: boolean;
    postThink: void;
    precache: void;
    precacheGenericI: number;
    precacheModelI: number;
    precacheSoundI: number;
    preThink: void;
    primaryAmmoIndex: number;
    primaryAttack: void;
    printf: void;
    radio: void;
    reflectGauss: boolean;
    relationship: number;
    reload: void;
    removeAllItems: void;
    removeGuns: void;
    removePlayerItem: number;
    removeSpawnProtection: void;
    reportAiState: void;
    resetEmptySound: void;
    resetMaxSpeed: void;
    resetSequenceInfo: void;
    respawn: Entity;
    restart: void;
    restartRound: void;
    retireWeapon: void;
    roundEnd: boolean;
    roundRespawn: void;
    secondaryAmmoIndex: number;
    secondaryAttack: void;
    sendDeathMessage: void;
    sendResources: void;
    sendSayMessage: void;
    sendWeaponAnim: void;
    serverDeactivate: void;
    setAnimation: void;
    setClientUserInfoModel: void;
    setClientUserInfoName: boolean;
    setModel: void;
    setObjectCollisionBox: void;
    setSpawnProtection: void;
    setToggleState: void;
    shouldFadeOnDeath: boolean;
    shouldWeaponIdle: boolean;
    showMenu: void;
    showVguiMenu: void;
    spawn: void;
    spawnHeadGib: Entity;
    spawnRandomGibs: void;
    startDeathCam: void;
    startObserver: void;
    startSneaking: void;
    startSound: void;
    stopSneaking: void;
    switchTeam: void;
    takeDamage: number;
    takeDamageImpulse: void;
    takeHealth: number;
    teamFull: boolean;
    teamId: string;
    teamStacked: boolean;
    think: void;
    throwFlashbang: Entity;
    throwGrenade: Entity;
    throwHeGrenade: Entity;
    throwSmokeGrenade: Entity;
    toggleState: number;
    touchingWeapon: void;
    traceAttack: void;
    traceBleed: void;
    traceLine: void;
    unDuck: void;
    updateClientData: void;
    updateItemInfo: void;
    updateOwner: void;
    updateStatusBar: void;
    use: void;
    useDecrement: boolean;
    useEmpty: void;
    visible: boolean;
    waitTillLand: void;
    waterJump: void;
    weaponIdle: void;
    writeFullClientUpdate: void;
    touch: void;
}
/**
 * Adds a listener for the event E - game.addEventListener's hood. `classname`
 * picks the class an event of Ham Sandwich's is listened for on; "" is the
 * reapi chain's own.
 */
export declare function addGameListener<E, R>(listener: (event: E) => R, post: bool, classname: string): void;
/** Takes a listener off again - game.removeEventListener's hood. */
export declare function removeGameListener<E, R>(listener: (event: E) => R, post: bool, classname: string): void;
