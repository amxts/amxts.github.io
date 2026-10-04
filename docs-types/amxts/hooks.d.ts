/// <reference path="../as-types.d.ts" />
import { Player, RoundWinner, Team, TouchEvent, UseType, Vector } from "./facade";
import { Entity, HitGroup, Weapon, WeaponKind } from "./entities";
import { Damage } from "./flags";
/** What every game event can do. */
export declare class HookEvent {
    /** @hidden Ham Sandwich delivered the event rather than reapi: the arguments and the answer go back its way. */
    __ham: bool;
    /**
     * @hidden A stock hook's backend made the event, on a server without reapi
     * (as/hlds.ts): a field is what the backend gave, 0 or empty where it gave
     * nothing, and what a listener asks of the game - blocking it, answering,
     * a field written - waits for the backend, which gives the game what it can.
     */
    __hlds: bool;
    /** @hidden What the listeners asked of the game, on a stock hook's event. */
    __prevented: bool;
    __answered: bool;
    __answerCell: i32;
    __changed: bool;
    private written;
    private writtenText;
    private writtenVector;
    /** An argument as the handler sees it now: its own write, or what came in. */
    protected __cell(index: i32): i32;
    protected __text(index: i32): string;
    protected __vector(index: i32): Vector;
    /** @hidden A field's value from a stock hook's backend, by the argument's place; -1 is the game's answer. */
    __give(index: i32, cell: i32): void;
    /** @hidden */
    __giveText(index: i32, value: string): void;
    /** @hidden */
    __giveVector(index: i32, value: Vector): void;
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
 * An item a player can have: a weapon by its kind, or equipment such as "kevlar", "defusekit", "nvg".
 *
 * Pawn: `ItemID`
 */
export type ItemKind = "none" | "shieldgun" | "p228" | "glock" | "scout" | "hegrenade" | "xm1014" | "c4" | "mac10" | "aug" | "smokegrenade" | "elite" | "fiveseven" | "ump45" | "sg550" | "galil" | "famas" | "usp" | "glock18" | "awp" | "mp5n" | "m249" | "m3" | "m4a1" | "tmp" | "g3sg1" | "flashbang" | "deagle" | "sg552" | "ak47" | "knife" | "p90" | "nvg" | "defusekit" | "kevlar" | "assault" | "longjump" | "sodacan" | "healthkit" | "antidote" | "battery";
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
export type DeathMessageFlag = "position" | "assistant" | "killRarity";
/**
 * The things that made a kill rare: a headshot, through smoke, in the air, ...
 *
 * Pawn: `KillRarity`
 */
export type KillRarity = "headshot" | "killerBlind" | "noScope" | "penetrated" | "throughSmoke" | "assistedFlash" | "dominationBegan" | "domination" | "revenge" | "inAir";
/**
 * An animation the game plays on a player's model: walking, jumping, attacking, reloading, ... "unknown" - a number the include does not name.
 *
 * Pawn: `PLAYER_ANIM`
 */
export type PlayerAnimation = "idle" | "walk" | "jump" | "superJump" | "die" | "attack1" | "attack2" | "flinch" | "largeFlinch" | "reload" | "holdBomb" | "unknown";
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Pawn: `RG_CBasePlayer_AddPoints` (const this, score, bAllowNegativeScore), `Ham_AddPoints`
 */
export declare class AddFragsEvent extends HookEvent {
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
 * Pawn: `RG_CBasePlayer_AddPlayerItem` (const this, const pItem), `Ham_AddPlayerItem`
 */
export declare class AddItemEvent extends HookEvent {
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
 * A player's money changes. Assign `event.amount` to change how much. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `amount` is how much his money moved since the game last sent it to him, and `reason` reads as `"none"`.
 *
 * Pawn: `RG_CBasePlayer_AddAccount` (const this, amount, RewardType:type, bool:bTrackChange)
 */
export declare class AddMoneyEvent extends HookEvent {
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
 * Called inside TraceAttack to store entity damage to multidamage data. Without ReAPI (plain HLDS) nothing hears it.
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
 * A file is added to what clients download. Without ReAPI (plain HLDS) nothing hears it.
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
    get file(): string;
    set file(value: string);
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
 * Pawn: `RG_CBasePlayer_AddPointsToTeam` (const this, score, bAllowNegativeScore), `Ham_AddPointsToTeam`
 */
export declare class AddTeamScoreEvent extends HookEvent {
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
 * Called whenever player is on air (not touching floor). Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_PM_AirAccelerate` (Float:wishdir[3], Float:wishspeed, Float:accel, const playerIndex)
 */
export declare class AirAccelerateEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `Float:wishdir[3]`
     */
    get direction(): Vector;
    set direction(value: Vector);
    /**
     * Argument 2.
     *
     * Pawn: `Float:wishspeed`
     */
    get speed(): number;
    set speed(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `Float:accel`
     */
    get acceleration(): number;
    set acceleration(value: number);
    /**
     * Argument 4, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Called after game finished a bullet tracing for applying damage cached on multidamage data. Without ReAPI (plain HLDS) nothing hears it.
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_BalanceTeams` ()
 */
export declare class BalanceTeamsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Makes a random player the bomber. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; returning an answer does nothing.
 *
 * Pawn: `RG_CBasePlayer_MakeBomber` (const this)
 */
export declare class BecomeBomberEvent extends HookEvent {
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
 * Makes a random player the VIP. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
 *
 * Pawn: `RG_CBasePlayer_MakeVIP` (const this)
 */
export declare class BecomeVipEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `this`
     */
    get player(): Player;
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
 * The player buys ammo. Without ReAPI (plain HLDS): heard through cstrike's `CS_OnBuy`: `preventDefault()` stops the purchase; `weapon` reads as the world, `blinkMoney` as `true`; returning an answer does nothing.
 *
 * Pawn: `RG_BuyGunAmmo` (const index, const weapon_entity, const bool:blinkMoney)
 */
export declare class BuyAmmoEvent extends HookEvent {
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
     * Pawn: `weapon_entity`
     */
    get weapon(): Weapon;
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
 * Called when player buys an item from buy menu (Nightvision, Kevlar, etc.). Without ReAPI (plain HLDS): heard through cstrike's `CS_OnBuy`: `preventDefault()` stops the purchase; heard for the equipment menu's items; returning an answer does nothing.
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
 * A player buys a weapon. In a post listener `event.result` is the weapon. Without ReAPI (plain HLDS): heard through cstrike's `CS_OnBuy`: `preventDefault()` stops the purchase; `event.result` reads as `null`; returning an answer does nothing.
 *
 * Pawn: `RG_BuyWeaponByWeaponID` (const index, const WeaponIdType:weaponID)
 */
export declare class BuyWeaponEvent extends HookEvent {
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
 * The player is touching a CBasePlayerItem, do I give it to him? Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_CanHavePlayerItem` (const index, const item)
 */
export declare class CanHaveItemEvent extends HookEvent {
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
 * The game asks if one player hears another on voice. Return `true` or `false` to decide. Without ReAPI (plain HLDS): asked as the game tells the engine who hears whom, with `sv_alltalk` on too, and for a player who muted the other: the answer overrides both.
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
 * Is this player allowed to respawn now? Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_FPlayerCanRespawn` (const index)
 */
export declare class CanRespawnEvent extends HookEvent {
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
 * Called when a player hit to entity. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_IsPenetrableEntity` (Float:vecSrc[3], Float:vecEnd[3], index, entity)
 */
export declare class CanShootThroughEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * Argument 2.
     *
     * Pawn: `Float:vecEnd[3]`
     */
    get end(): Vector;
    set end(value: Vector);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_Observer_IsValidTarget` (const this, iPlayerIndex, bool:bSameTeam)
 */
export declare class CanSpectateEvent extends HookEvent {
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
 * The game asks if a player may move to a team. Return `true` or `false` to decide. Without ReAPI (plain HLDS) nothing hears it.
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
 * Can this player take damage from this attacker? Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_FPlayerCanTakeDamage` (const index, const attacker)
 */
export declare class CanTakeDamageEvent extends HookEvent {
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
 * Without ReAPI (plain HLDS): `preventDefault()` does nothing.
 *
 * Pawn: `RG_CSGameRules_ChangeLevel` ()
 */
export declare class ChangeLevelEvent extends HookEvent {
    private readonly kind;
}
/**
 * Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_SetClientUserInfoModel` (const this, infobuffer[], szNewModel[])
 */
export declare class ChangeModelEvent extends HookEvent {
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
    get info(): string;
    set info(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `szNewModel[]`
     */
    get newModel(): string;
    set newModel(value: string);
}
/**
 * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `info` reads as `""`; returning an answer does nothing.
 *
 * Pawn: `RG_CBasePlayer_SetClientUserInfoName` (const this, infobuffer[], szNewName[])
 */
export declare class ChangeNameEvent extends HookEvent {
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
    get info(): string;
    set info(value: string);
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
 * A player's chat message goes out to the players and to the server console. Assign `event.text` to change what they read, or call `preventDefault()` so nobody gets it. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_SendSayMessage` (const pPlayer, const szCmd[], bool:teamonly, const szText[], const pszFormat[], const pszConsoleFormat[], bool:bSenderDead, const placeName[], bool:consoleUsesPlaceName)
 */
export declare class ChatMessageEvent extends HookEvent {
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
    get command(): string;
    set command(value: string);
    /**
     * `true` when only the player's team gets the message.
     *
     * Pawn: `bool:teamonly`
     */
    get teamOnly(): boolean;
    set teamOnly(value: boolean);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_CheckMapConditions` ()
 */
export declare class CheckMapConditionsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called every client frame to check time based damage. Without ReAPI (plain HLDS) nothing hears it.
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
 * Called when a player's userinfo is being checked. Without ReAPI (plain HLDS) nothing hears it.
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
    get address(): number;
    set address(value: number);
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
 * Called when a player jumps on water for the first time. Without ReAPI (plain HLDS) nothing hears it.
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
 * The game checks if a side has won. `preventDefault()` stops it from ending the round. Without ReAPI (plain HLDS) nothing hears it.
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
 * Without ReAPI (plain HLDS): heard from the player's command: `preventDefault()` stops it; a model the game picks itself is not heard.
 *
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
 * A player picked an item in the team menu. `preventDefault()` ignores the pick. Without ReAPI (plain HLDS): heard from the player's command: `preventDefault()` stops it; returning an answer does nothing, and a team the game picks itself is not heard.
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
 * Called when game clears multidamage data (before TraceAttack). Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_ClearMultiDamage` ()
 */
export declare class ClearMultiDamageEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called after processing a client connection request. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
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
 * Called when processing a 'connect' client connectionless packet. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; heard once the player is let in.
 *
 * Pawn: `RH_SV_ConnectClient` ()
 */
export declare class ConnectClientEvent extends HookEvent {
    private readonly kind;
}
/**
 * Called when message is being printed to client console. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RH_SV_ClientPrintf` (const string[])
 */
export declare class ConsoleMessageEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get text(): string;
    set text(value: string);
}
/**
 * Called when a player drops a weapon (usually manual drop or death). Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CreateWeaponBox` (const weaponent, const owner, modelName[], Float:origin[3], Float:angles[3], Float:velocity[3], Float:lifeTime, bool:packAmmo)
 */
export declare class CreateWeaponBoxEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `weaponent`
     */
    get weapon(): Weapon;
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
     * Argument 4.
     *
     * Pawn: `Float:origin[3]`
     */
    get origin(): Vector;
    set origin(value: Vector);
    /**
     * Argument 5.
     *
     * Pawn: `Float:angles[3]`
     */
    get angles(): Vector;
    set angles(value: Vector);
    /**
     * Argument 6.
     *
     * Pawn: `Float:velocity[3]`
     */
    get velocity(): Vector;
    set velocity(value: Vector);
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
 * Call this from within a GameRules class to report an obituary. Without ReAPI (plain HLDS): heard as its death message is sent: `preventDefault()` does nothing, and `inflictor` reads as the world.
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
 * A weapon is being taken out. Assign `event.viewModel` / `weaponModel` to change what is shown. Without ReAPI (plain HLDS) nothing hears it.
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
    get animation(): number;
    set animation(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `szAnimExt[]`
     */
    get animationExtension(): string;
    set animationExtension(value: string);
    /**
     * Argument 6.
     *
     * Pawn: `skiplocal`
     */
    get skipLocal(): number;
    set skipLocal(value: number);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
    get animation(): number;
    set animation(value: number);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
    get animation(): number;
    set animation(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `iStartAnim`
     */
    get startAnimation(): number;
    set startAnimation(value: number);
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
 * Called when a player has ended to defuses the bomb or when the previous defuser has taken off or been killed. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; heard only when the bomb is defused, not when a defuse stops halfway.
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
 * Called when a player goes to start defuse the bomb. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
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
 * VIP player got to the point of rescue. Without ReAPI (plain HLDS) nothing hears it.
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
 * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `crash` reads as `false`, and `reason` is the one AMX Mod X was told.
 *
 * Pawn: `RH_SV_DropClient` (const client, bool:crash, const fmt[])
 */
export declare class DisconnectClientEvent extends HookEvent {
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
    get reason(): string;
    set reason(value: string);
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
 * Called when a idle player is removed from server. Without ReAPI (plain HLDS) nothing hears it.
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
 * A player drops a weapon. In a post listener `event.result` is the weapon box on the ground. Without ReAPI (plain HLDS): heard from the player's `drop` command: `preventDefault()` stops it; `event.result` reads as `null`, and a drop the game makes itself is not heard.
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
 * Called when a player throws the shield on the ground. Without ReAPI (plain HLDS) nothing hears it.
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
 * What do I do with player's weapons when he's killed? Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_DeadPlayerWeapons` (const index)
 */
export declare class DropWeaponsOnDeathEvent extends HookEvent {
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
 * Called on every frame to check player ducking. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_PM_Duck` (const playerIndex)
 */
export declare class DuckMovementEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
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
 * Called when a C4 goes to explodes. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `trace` and `damageType` read as 0.
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
    get trace(): number;
    set trace(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Called when a flashbang detonates. Without ReAPI (plain HLDS) nothing hears it.
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
    get trace(): number;
    set trace(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Called when a hegrenade detonates. Without ReAPI (plain HLDS) nothing hears it.
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
    get trace(): number;
    set trace(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * A smoke grenade is going off. Without ReAPI (plain HLDS) nothing hears it.
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
 * The game works out how much a fall hurts. In a post listener `event.result` is that number; return a number to replace it. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_FlPlayerFallDamage` (const index)
 */
export declare class FallDamageEvent extends HookEvent {
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
     * Argument 3.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * Argument 4.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get direction(): Vector;
    set direction(value: Vector);
    /**
     * Argument 5.
     *
     * Pawn: `Float:vecSpread[3]`
     */
    get spread(): Vector;
    set spread(value: Vector);
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
 * The game tells the bots something happened. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBotManager_OnEvent` (GameEventType:event, const pEntity, const pOther)
 */
export declare class GameEventEvent extends HookEvent {
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
 * The game rules' think: every frame, the round's clock and win conditions checked. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
 *
 * Pawn: `RG_CSGameRules_Think` ()
 */
export declare class GameThinkEvent extends HookEvent {
    private readonly kind;
}
/**
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Called when a player enters the game. Without ReAPI (plain HLDS) nothing hears it.
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
 * I can't use this weapon anymore, get me the next best one. Without ReAPI (plain HLDS) nothing hears it.
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
 * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
 *
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
 * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; returning an answer does nothing.
 *
 * Pawn: `RG_CSGameRules_GiveC4` ()
 */
export declare class GiveBombEvent extends HookEvent {
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
 * The game hands a spawned player the default weapons. `preventDefault()` gives nothing. Without ReAPI (plain HLDS) nothing hears it.
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_GiveNamedItem` (const this, const pszName[])
 */
export declare class GiveItemEvent extends HookEvent {
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Pawn: `RG_CBasePlayer_TakeHealth` (const this, Float:flHealth, bitsDamageType), `Ham_TakeHealth`
 */
export declare class HealEvent extends HookEvent {
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
 * The game shows a player a hint. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_HintMessageEx` (const this, const message[], Float:duration, bool:bDisplayIfPlayerDead, bool:bOverride)
 */
export declare class HintMessageEvent extends HookEvent {
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
export declare class ImpulseEvent extends HookEvent {
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
 * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
 *
 * Pawn: `RG_CSGameRules_GoToIntermission` ()
 */
export declare class IntermissionEvent extends HookEvent {
    private readonly kind;
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
 * The game asks if an item is forbidden to a player. Return `true` to forbid it. Without ReAPI (plain HLDS): asked only for `"buying"`, through cstrike's `CS_OnBuyAttempt`: answering `true` forbids the purchase, `false` lets the game go on.
 *
 * Pawn: `RG_CBasePlayer_HasRestrictItem` (const this, ItemID:item, ItemRestType:type)
 */
export declare class ItemRestrictedEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The item asked about, by its kind, e.g. `"awp"`, `"hegrenade"`, `"kevlar"`, `"defusekit"`.
     *
     * Pawn: `ItemID:item`
     */
    get item(): ItemKind;
    set item(value: ItemKind);
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
 * Called when a client "thinks for the join status". Without ReAPI (plain HLDS) nothing hears it.
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
 * Called on every frame while player presses jump button. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_PM_Jump` (const playerIndex)
 */
export declare class JumpMovementEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1, read only.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
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
 * Called when a player is on a ladder. Without ReAPI (plain HLDS) nothing hears it.
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
 * Recreate all the map entities from the map data (preserving their indices),. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
 *
 * Pawn: `RG_CSGameRules_CleanUpMap` ()
 */
export declare class MapResetEvent extends HookEvent {
    private readonly kind;
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * A new round is starting. Without ReAPI (plain HLDS): heard as the round restarts - the listeners before the game when it announces the round, the ones after it once its players have respawned - but `preventDefault()` does nothing.
 *
 * Pawn: `RG_CSGameRules_RestartRound` ()
 */
export declare class NewRoundEvent extends HookEvent {
    private readonly kind;
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
 * Called when a client attempt to change the observer mode. Without ReAPI (plain HLDS) nothing hears it.
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * A player cries out in pain after a hit.
 *
 * Pawn: `RG_CBasePlayer_Pain` (const this, HitBoxGroup:lastHitGroup, bool:hasArmour)
 */
export declare class PainEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The body part the hit struck, e.g. `"head"`, `"chest"`, `"leftLeg"`.
     *
     * Pawn: `HitBoxGroup:lastHitGroup`
     */
    get lastHitGroup(): HitGroup;
    set lastHitGroup(value: HitGroup);
    /**
     * `true` when the player wears armour: the game picks the sound by it.
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
 * Called when a player plant's the bomb on the ground. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the bomb gets its model; returning an answer does nothing.
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
     * Argument 2.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * Argument 3.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    set velocity(value: Vector);
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
 * A flashbang is blinding a player. `preventDefault()` keeps the player's eyes clear. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `inflictor` and `attacker` read as the world, `color` as zero.
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
     * The flash's colour, [r, g, b] as a Vector.
     *
     * Pawn: `Float:color[3]`
     */
    get color(): Vector;
    set color(value: Vector);
}
/**
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Called each time player gets a weapon linked to his inventory. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
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
 * A player was killed. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
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
 * A player spawned. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
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
 * Called whenever player emits an step sound. Without ReAPI (plain HLDS) nothing hears it.
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
    get volume(): number;
    set volume(value: number);
    /**
     * Argument 3, read only.
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
 * Called when a generic resource is being added to generic precache list. Without ReAPI (plain HLDS): `preventDefault()` skips the precache, which answers 0; returning an answer or changing `file` does nothing.
 *
 * Pawn: `RH_PF_precache_generic_I` (const string[])
 */
export declare class PrecacheFileEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get file(): string;
    set file(value: string);
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
 * Called when a model is being added to model precache list. Without ReAPI (plain HLDS): `preventDefault()` skips the precache, which answers 0; returning an answer or changing `file` does nothing.
 *
 * Pawn: `RH_PF_precache_model_I` (const string[])
 */
export declare class PrecacheModelEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get file(): string;
    set file(value: string);
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
 * Called when a sound is being added to sound precache list. Without ReAPI (plain HLDS): `preventDefault()` skips the precache, which answers 0; returning an answer or changing `file` does nothing.
 *
 * Pawn: `RH_PF_precache_sound_I` (const string[])
 */
export declare class PrecacheSoundEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `string[]`
     */
    get file(): string;
    set file(value: string);
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
 * Called when a message is being sent to the server's console. Without ReAPI (plain HLDS) nothing hears it.
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
    get text(): string;
    set text(value: string);
}
/**
 * A radio message is sent. `preventDefault()` silences it. Without ReAPI (plain HLDS) nothing hears it.
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
    get sound(): string;
    set sound(value: string);
    /**
     * Argument 3.
     *
     * Pawn: `msg_verbose[]`
     */
    get text(): string;
    set text(value: string);
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
 * Called whenever player fires a weapon and shakes player screen (punchangles altering). Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayerWeapon_KickBack` (const this, Float:up_base, Float:lateral_base, Float:up_modifier, Float:lateral_modifier, Float:p_max, Float:lateral_max, direction_change)
 */
export declare class RecoilEvent extends HookEvent {
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
    get upBase(): number;
    set upBase(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `Float:lateral_base`
     */
    get lateralBase(): number;
    set lateralBase(value: number);
    /**
     * Argument 4.
     *
     * Pawn: `Float:up_modifier`
     */
    get upModifier(): number;
    set upModifier(value: number);
    /**
     * Argument 5.
     *
     * Pawn: `Float:lateral_modifier`
     */
    get lateralModifier(): number;
    set lateralModifier(value: number);
    /**
     * Argument 6.
     *
     * Pawn: `Float:p_max`
     */
    get upMax(): number;
    set upMax(value: number);
    /**
     * Argument 7.
     *
     * Pawn: `Float:lateral_max`
     */
    get lateralMax(): number;
    set lateralMax(value: number);
    /**
     * Argument 8.
     *
     * Pawn: `direction_change`
     */
    get directionChange(): number;
    set directionChange(value: number);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_RemoveGuns` ()
 */
export declare class RemoveGunsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Pawn: `RG_CBasePlayer_RemovePlayerItem` (const this, const pItem), `Ham_RemovePlayerItem`
 */
export declare class RemoveItemEvent extends HookEvent {
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
 * Called when a player's remove protection. Without ReAPI (plain HLDS) nothing hears it.
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * The round is ending. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; returning an answer does nothing; `delay` is the original game's 5 seconds, 3 for `"gameCommence"`, unless `game.endRound` set it.
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
 * The freeze time at the start of the round is over. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
 *
 * Pawn: `RG_CSGameRules_OnRoundFreezeEnd` ()
 */
export declare class RoundStartEvent extends HookEvent {
    private readonly kind;
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
 * Called when game selects a spawn point (info_player_start/deathmatch) to position the player. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_EntSelectSpawnPoint` (const this)
 */
export declare class SelectSpawnPointEvent extends HookEvent {
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
 * The game tells everyone who killed whom. Without ReAPI (plain HLDS): `preventDefault()` stops the message; `assister` and `inflictor` read as the world, `flags` as empty, `rarity` has `"headshot"` alone; changing a field does nothing.
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
     * The extras the death message carries, any of `"position"`, `"assistant"`, `"killRarity"`.
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
    get animation(): number;
    set animation(value: number);
    /**
     * Argument 3.
     *
     * Pawn: `skiplocal`
     */
    get skipLocal(): number;
    set skipLocal(value: number);
}
/**
 * Called when a command is being sent to server. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RH_ExecuteServerStringCmd` (const cmd[], source, id)
 */
export declare class ServerCommandEvent extends HookEvent {
    private readonly kind;
    /**
     * Argument 1.
     *
     * Pawn: `cmd[]`
     */
    get command(): string;
    set command(value: string);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_ServerDeactivate` ()
 */
export declare class ServerDeactivateEvent extends HookEvent {
    private readonly kind;
}
/**
 * The game sets the animation a player's model plays: walking, jumping, attacking, reloading. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_SetAnimation` (const this, PLAYER_ANIM:playerAnim)
 */
export declare class SetAnimationEvent extends HookEvent {
    private readonly kind;
    /**
     * The player the event is about.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * The animation, e.g. `"jump"`, `"attack1"`, `"reload"`.
     *
     * Pawn: `PLAYER_ANIM:playerAnim`
     */
    get animation(): PlayerAnimation;
    set animation(value: PlayerAnimation);
}
/**
 * Called when a player dies to pack up the appropriate weapons and ammo items, and creates a weaponbox that falls to floor with sets specify the model or when a player drop the item. Without ReAPI (plain HLDS): `preventDefault()` keeps the model off; changing `modelName` does nothing.
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
 * Called when a player's set protection. Without ReAPI (plain HLDS) nothing hears it.
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
 * A gun fires a shot: the game traces the bullet, through walls as its penetration allows, and deals its damage. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBaseEntity_FireBullets3` (pEntity, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread, Float:flDistance, iPenetration, iBulletType, iDamage, Float:flRangeModifier, pevAttacker, bool:bPistol, shared_rand)
 */
export declare class ShootEvent extends HookEvent {
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
     * Pawn: `Float:vecSrc[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * Argument 3.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get direction(): Vector;
    set direction(value: Vector);
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
    get randomSeed(): number;
    set randomSeed(value: number);
}
/**
 * A shotgun fires: the game traces each pellet and deals its damage. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBaseEntity_FireBuckshots` (pEntity, cShots, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread[3], Float:flDistance, iTracerFreq, iDamage, pevAttacker)
 */
export declare class ShootBuckshotEvent extends HookEvent {
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
     * Argument 3.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * Argument 4.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get direction(): Vector;
    set direction(value: Vector);
    /**
     * Argument 5.
     *
     * Pawn: `Float:vecSpread[3]`
     */
    get spread(): Vector;
    set spread(value: Vector);
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
 * Should the player switch to this weapon? Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_FShouldSwitchWeapon` (const index, const weapon)
 */
export declare class ShouldSwitchWeaponEvent extends HookEvent {
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
 * The game shows a player a menu. Without ReAPI (plain HLDS) nothing hears it.
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
 * The game shows a player a VGUI menu (team select). Without ReAPI (plain HLDS): heard as the menu is sent, to a player with VGUI menus on (not a bot): `preventDefault()` stops it; `oldMenu` reads as `""`, and changing a field does nothing.
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
 * Called on spawn, the attempt to equip a player. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_OnSpawnEquip` (const this, bool:addDefault, bool:equipGame)
 */
export declare class SpawnEquipEvent extends HookEvent {
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Place this player on his spawnspot and face him in the proper direction. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CSGameRules_GetPlayerSpawnSpot` (const index)
 */
export declare class SpawnSpotEvent extends HookEvent {
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
 * Called when a client attempt to find the next observer. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_Observer_FindNextPlayer` (const this, bool bReverse, name[])
 */
export declare class SpectateNextEvent extends HookEvent {
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
    get reverse(): boolean;
    set reverse(value: boolean);
    /**
     * Argument 3.
     *
     * Pawn: `name[]`
     */
    get name(): string;
    set name(value: string);
}
/**
 * A dead player's camera starts. Without ReAPI (plain HLDS) nothing hears it.
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
 * A sound is about to play. Assign `event.sample` to change it, or call `preventDefault()` to keep it silent. Without ReAPI (plain HLDS): heard for the sounds the game plays through the engine's `EmitSound`: `preventDefault()` stops it; `recipients` reads as 0, and changing a field does nothing.
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
    get sound(): string;
    set sound(value: string);
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
 * The player goes into observer mode. Without ReAPI (plain HLDS) nothing hears it.
 *
 * Pawn: `RG_CBasePlayer_StartObserver` (const this, Float:vecPosition[3], Float:vecViewAngle[3])
 */
export declare class StartSpectatingEvent extends HookEvent {
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
     * Pawn: `Float:vecPosition[3]`
     */
    get position(): Vector;
    set position(value: Vector);
    /**
     * Argument 3.
     *
     * Pawn: `Float:vecViewAngle[3]`
     */
    get viewAngle(): Vector;
    set viewAngle(value: Vector);
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
 * Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things. Without ReAPI (plain HLDS) nothing hears it.
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
     * The kinds of damage, e.g. `"fall"`, `"bullet"`, `"burn"`.
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
 * A hurt player is pushed back and slowed down by the hit, after the damage. Assign `event.knockbackForce` or `event.velocityModifier` to change how much, or call `preventDefault()` for neither. Without ReAPI (plain HLDS) nothing hears it.
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
    get velocityModifier(): number;
    set velocityModifier(value: number);
}
/**
 * Called each time player tries to join a team to ensure availability. Without ReAPI (plain HLDS) nothing hears it.
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
    get team(): number;
    set team(value: number);
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
 * Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar). Without ReAPI (plain HLDS) nothing hears it.
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
    get newTeam(): number;
    set newTeam(value: number);
    /**
     * Argument 2.
     *
     * Pawn: `curTeam_id`
     */
    get currentTeam(): number;
    set currentTeam(value: number);
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
 * A player threw a flashbang. In a post listener `event.result` is the grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model.
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
     * Argument 2.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * Argument 3.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    set velocity(value: Vector);
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
 * A player throws a grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model, and `eventIndex` reads as 0.
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
     * Argument 3.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * The grenade's velocity, a Vector.
     *
     * Pawn: `Float:vecThrow[3]`
     */
    get velocity(): Vector;
    set velocity(value: Vector);
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
    get eventIndex(): number;
    set eventIndex(value: number);
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
 * A player threw an HE grenade. In a post listener `event.result` is the grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model, and `eventIndex` reads as 0.
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
     * The point the grenade is thrown from, a Vector.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * The grenade's velocity, a Vector.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    set velocity(value: Vector);
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
    get eventIndex(): number;
    set eventIndex(value: number);
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
 * A player threw a smoke grenade. In a post listener `event.result` is the grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model, and `eventIndex` reads as 0.
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
     * The point the grenade is thrown from, a Vector.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * The grenade's velocity, a Vector.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    set velocity(value: Vector);
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
    get eventIndex(): number;
    set eventIndex(value: number);
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
     * The shot's direction, a Vector.
     *
     * Pawn: `Float:vecDir[3]`
     */
    get direction(): Vector;
    set direction(value: Vector);
    /**
     * Argument 5.
     *
     * Pawn: `tracehandle`
     */
    get trace(): number;
    set trace(value: number);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
     * Argument 4.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get start(): Vector;
    set start(value: Vector);
    /**
     * Argument 5.
     *
     * Pawn: `Float:vecSpot[3]`
     */
    get end(): Vector;
    set end(value: Vector);
    /**
     * Argument 6.
     *
     * Pawn: `tracehandle`
     */
    get trace(): number;
    set trace(value: number);
}
/**
 * Called whenever player tries to unduck. Without ReAPI (plain HLDS) nothing hears it.
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
 * The game updates a player's status bar: the name and health of the player under the crosshair, at the bottom of the screen. `preventDefault()` leaves it as it is. Without ReAPI (plain HLDS) nothing hears it.
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
 * Called when a player press use and if a suitable candidate is not found. Without ReAPI (plain HLDS) nothing hears it.
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
 * The player has changed userinfo; can change it now. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `info` reads as `""`.
 *
 * Pawn: `RG_CSGameRules_ClientUserInfoChanged` (const index, infobuffer[])
 */
export declare class UserInfoChangeEvent extends HookEvent {
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
    get info(): string;
    set info(value: string);
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
 * Without ReAPI (plain HLDS) nothing hears it.
 *
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
 * Called on every frame after a player jumps on water for a short period of time. Without ReAPI (plain HLDS) nothing hears it.
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
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RH_SV_ActivateServer`
     */
    activateServer: ActivateServerEvent;
    /** Pawn: `RG_CBasePlayer_AddPoints`, `Ham_AddPoints` */
    addFrags: AddFragsEvent;
    /** Pawn: `RG_CBasePlayer_AddPlayerItem`, `Ham_AddPlayerItem` */
    addItem: AddItemEvent;
    /**
     * A player's money changes. Assign `event.amount` to change how much. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `amount` is how much his money moved since the game last sent it to him, and `reason` reads as `"none"`.
     *
     * Pawn: `RG_CBasePlayer_AddAccount`
     */
    addMoney: AddMoneyEvent;
    /**
     * Called inside TraceAttack to store entity damage to multidamage data. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_AddMultiDamage`
     */
    addMultiDamage: AddMultiDamageEvent;
    /**
     * A file is added to what clients download. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RH_SV_AddResource`
     */
    addResource: AddResourceEvent;
    /** Pawn: `RG_CBasePlayer_AddPointsToTeam`, `Ham_AddPointsToTeam` */
    addTeamScore: AddTeamScoreEvent;
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
     * Called whenever player is on air (not touching floor). Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_PM_AirAccelerate`
     */
    airAccelerate: AirAccelerateEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_PM_AirMove`
     */
    airMove: AirMoveEvent;
    /**
     * Called after game finished a bullet tracing for applying damage cached on multidamage data. Without ReAPI (plain HLDS) nothing hears it.
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
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_BalanceTeams`
     */
    balanceTeams: BalanceTeamsEvent;
    /**
     * Makes a random player the bomber. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; returning an answer does nothing.
     *
     * Pawn: `RG_CBasePlayer_MakeBomber`
     */
    becomeBomber: BecomeBomberEvent;
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
     * Makes a random player the VIP. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CBasePlayer_MakeVIP`
     */
    becomeVip: BecomeVipEvent;
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
     * The player buys ammo. Without ReAPI (plain HLDS): heard through cstrike's `CS_OnBuy`: `preventDefault()` stops the purchase; `weapon` reads as the world, `blinkMoney` as `true`; returning an answer does nothing.
     *
     * Pawn: `RG_BuyGunAmmo`
     */
    buyAmmo: BuyAmmoEvent;
    /**
     * Called when player buys an item from buy menu (Nightvision, Kevlar, etc.). Without ReAPI (plain HLDS): heard through cstrike's `CS_OnBuy`: `preventDefault()` stops the purchase; heard for the equipment menu's items; returning an answer does nothing.
     *
     * Pawn: `RG_BuyItem`
     */
    buyItem: BuyItemEvent;
    /**
     * A player buys a weapon. In a post listener `event.result` is the weapon. Without ReAPI (plain HLDS): heard through cstrike's `CS_OnBuy`: `preventDefault()` stops the purchase; `event.result` reads as `null`; returning an answer does nothing.
     *
     * Pawn: `RG_BuyWeaponByWeaponID`
     */
    buyWeapon: BuyWeaponEvent;
    /** Pawn: `RG_CBasePlayerWeapon_CanDeploy`, `Ham_Item_CanDeploy` */
    canDeploy: CanDeployEvent;
    /**
     * Whether or not the player can drop the specified item.
     *
     * Pawn: `Ham_CS_Item_CanDrop`
     */
    canDrop: CanDropEvent;
    /**
     * The player is touching a CBasePlayerItem, do I give it to him? Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_CanHavePlayerItem`
     */
    canHaveItem: CanHaveItemEvent;
    /**
     * Whether or not the entity can be holstered.
     *
     * Pawn: `Ham_Item_CanHolster`
     */
    canHolster: CanHolsterEvent;
    /**
     * The game asks if one player hears another on voice. Return `true` or `false` to decide. Without ReAPI (plain HLDS): asked as the game tells the engine who hears whom, with `sv_alltalk` on too, and for a player who muted the other: the answer overrides both.
     *
     * Pawn: `RG_CSGameRules_CanPlayerHearPlayer`
     */
    canPlayerHearPlayer: CanPlayerHearPlayerEvent;
    /**
     * Is this player allowed to respawn now? Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_FPlayerCanRespawn`
     */
    canRespawn: CanRespawnEvent;
    /**
     * Called when a player hit to entity. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_IsPenetrableEntity`
     */
    canShootThrough: CanShootThroughEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_Observer_IsValidTarget`
     */
    canSpectate: CanSpectateEvent;
    /**
     * The game asks if a player may move to a team. Return `true` or `false` to decide. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_CanSwitchTeam`
     */
    canSwitchTeam: CanSwitchTeamEvent;
    /**
     * Can this player take damage from this attacker? Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_FPlayerCanTakeDamage`
     */
    canTakeDamage: CanTakeDamageEvent;
    /**
     * Returns the center of the entity.
     *
     * Pawn: `Ham_Center`
     */
    center: CenterEvent;
    /**
     * Without ReAPI (plain HLDS): `preventDefault()` does nothing.
     *
     * Pawn: `RG_CSGameRules_ChangeLevel`
     */
    changeLevel: ChangeLevelEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_SetClientUserInfoModel`
     */
    changeModel: ChangeModelEvent;
    /**
     * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `info` reads as `""`; returning an answer does nothing.
     *
     * Pawn: `RG_CBasePlayer_SetClientUserInfoName`
     */
    changeName: ChangeNameEvent;
    /**
     * Turns a monster towards its ideal_yaw.
     *
     * Pawn: `Ham_ChangeYaw`
     */
    changeYaw: ChangeYawEvent;
    /**
     * A player's chat message goes out to the players and to the server console. Assign `event.text` to change what they read, or call `preventDefault()` so nobody gets it. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_SendSayMessage`
     */
    chatMessage: ChatMessageEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_CheckMapConditions`
     */
    checkMapConditions: CheckMapConditionsEvent;
    /**
     * Called every client frame to check time based damage. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_CheckTimeBasedDamage`
     */
    checkTimeBasedDamage: CheckTimeBasedDamageEvent;
    /**
     * Called when a player's userinfo is being checked. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RH_SV_CheckUserInfo`
     */
    checkUserInfo: CheckUserInfoEvent;
    /**
     * Called when a player jumps on water for the first time. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_PM_CheckWaterJump`
     */
    checkWaterJump: CheckWaterJumpEvent;
    /**
     * The game checks if a side has won. `preventDefault()` stops it from ending the round. Without ReAPI (plain HLDS) nothing hears it.
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
    /**
     * Without ReAPI (plain HLDS): heard from the player's command: `preventDefault()` stops it; a model the game picks itself is not heard.
     *
     * Pawn: `RG_HandleMenu_ChooseAppearance`
     */
    chooseAppearance: ChooseAppearanceEvent;
    /**
     * A player picked an item in the team menu. `preventDefault()` ignores the pick. Without ReAPI (plain HLDS): heard from the player's command: `preventDefault()` stops it; returning an answer does nothing, and a team the game picks itself is not heard.
     *
     * Pawn: `RG_HandleMenu_ChooseTeam`
     */
    chooseTeam: ChooseTeamEvent;
    /** Pawn: `RG_CBasePlayer_Classify`, `Ham_Classify` */
    classify: ClassifyEvent;
    /**
     * Called when game clears multidamage data (before TraceAttack). Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_ClearMultiDamage`
     */
    clearMultiDamage: ClearMultiDamageEvent;
    /**
     * Called after processing a client connection request. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RH_ClientConnected`
     */
    clientConnected: ClientConnectedEvent;
    /**
     * Called when processing a 'connect' client connectionless packet. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; heard once the player is let in.
     *
     * Pawn: `RH_SV_ConnectClient`
     */
    connectClient: ConnectClientEvent;
    /**
     * Called when message is being printed to client console. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RH_SV_ClientPrintf`
     */
    consoleMessage: ConsoleMessageEvent;
    /**
     * Called when a player drops a weapon (usually manual drop or death). Without ReAPI (plain HLDS) nothing hears it.
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
     * Determines the best type of death animation to play.
     *
     * Pawn: `Ham_GetDeathActivity`
     */
    deathActivity: DeathActivityEvent;
    /**
     * Call this from within a GameRules class to report an obituary. Without ReAPI (plain HLDS): heard as its death message is sent: `preventDefault()` does nothing, and `inflictor` reads as the world.
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
     * A weapon is being taken out. Assign `event.viewModel` / `weaponModel` to change what is shown. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayerWeapon_DefaultDeploy`
     */
    defaultDeploy: DefaultDeployEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayerWeapon_DefaultReload`
     */
    defaultReload: DefaultReloadEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayerWeapon_DefaultShotgunReload`
     */
    defaultShotgunReload: DefaultShotgunReloadEvent;
    /**
     * Called when a player has ended to defuses the bomb or when the previous defuser has taken off or been killed. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; heard only when the bomb is defused, not when a defuse stops halfway.
     *
     * Pawn: `RG_CGrenade_DefuseBombEnd`
     */
    defuseBombEnd: DefuseBombEndEvent;
    /**
     * Called when a player goes to start defuse the bomb. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
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
    /**
     * VIP player got to the point of rescue. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_Disappear`
     */
    disappear: DisappearEvent;
    /**
     * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `crash` reads as `false`, and `reason` is the one AMX Mod X was told.
     *
     * Pawn: `RH_SV_DropClient`
     */
    disconnectClient: DisconnectClientEvent;
    /**
     * A weapon of one class is dropped.
     *
     * Pawn: `Ham_Item_Drop`
     */
    drop: DropEvent;
    /**
     * Called when a idle player is removed from server. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_DropIdlePlayer`
     */
    dropIdlePlayer: DropIdlePlayerEvent;
    /**
     * A player drops a weapon. In a post listener `event.result` is the weapon box on the ground. Without ReAPI (plain HLDS): heard from the player's `drop` command: `preventDefault()` stops it; `event.result` reads as `null`, and a drop the game makes itself is not heard.
     *
     * Pawn: `RG_CBasePlayer_DropPlayerItem`
     */
    dropPlayerItem: DropPlayerItemEvent;
    /**
     * Called when a player throws the shield on the ground. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_DropShield`
     */
    dropShield: DropShieldEvent;
    /**
     * What do I do with player's weapons when he's killed? Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_DeadPlayerWeapons`
     */
    dropWeaponsOnDeath: DropWeaponsOnDeathEvent;
    /**
     * A player ducks.
     *
     * Pawn: `RG_CBasePlayer_Duck`, `Ham_Player_Duck`
     */
    duck: DuckEvent;
    /**
     * Called on every frame to check player ducking. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_PM_Duck`
     */
    duckMovement: DuckMovementEvent;
    /**
     * Returns the ear position of the entity.
     *
     * Pawn: `Ham_EarPosition`
     */
    earPosition: EarPositionEvent;
    /**
     * Called when a C4 goes to explodes. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `trace` and `damageType` read as 0.
     *
     * Pawn: `RG_CGrenade_ExplodeBomb`
     */
    explodeBomb: ExplodeBombEvent;
    /**
     * Called when a flashbang detonates. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CGrenade_ExplodeFlashbang`
     */
    explodeFlashbang: ExplodeFlashbangEvent;
    /**
     * Called when a hegrenade detonates. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CGrenade_ExplodeHeGrenade`
     */
    explodeHeGrenade: ExplodeHeGrenadeEvent;
    /**
     * A smoke grenade is going off. Without ReAPI (plain HLDS) nothing hears it.
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
    /**
     * The game works out how much a fall hurts. In a post listener `event.result` is that number; return a number to replace it. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_FlPlayerFallDamage`
     */
    fallDamage: FallDamageEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBaseEntity_FireBullets`
     */
    fireBullets: FireBulletsEvent;
    /**
     * The game tells the bots something happened. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBotManager_OnEvent`
     */
    gameEvent: GameEventEvent;
    /**
     * The game rules' think: every frame, the round's clock and win conditions checked. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CSGameRules_Think`
     */
    gameThink: GameThinkEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_GetForceCamera`
     */
    getForceCamera: GetForceCameraEvent;
    /**
     * Called when a player enters the game. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_GetIntoGame`
     */
    getIntoGame: GetIntoGameEvent;
    /**
     * I can't use this weapon anymore, get me the next best one. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_GetNextBestWeapon`
     */
    getNextBestWeapon: GetNextBestWeaponEvent;
    /**
     * Create some gore and get rid of a monster's model.
     *
     * Pawn: `Ham_GibMonster`
     */
    gibMonster: GibMonsterEvent;
    /**
     * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CGib_Spawn`
     */
    gibSpawn: GibSpawnEvent;
    /** Pawn: `RG_CBasePlayer_GiveAmmo`, `Ham_GiveAmmo` */
    giveAmmo: GiveAmmoEvent;
    /**
     * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; returning an answer does nothing.
     *
     * Pawn: `RG_CSGameRules_GiveC4`
     */
    giveBomb: GiveBombEvent;
    /**
     * The game hands a spawned player the default weapons. `preventDefault()` gives nothing. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_GiveDefaultItems`
     */
    giveDefaultItems: GiveDefaultItemsEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_GiveNamedItem`
     */
    giveItem: GiveItemEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_GiveShield`
     */
    giveShield: GiveShieldEvent;
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
     * Whether or not the target is the same as the one passed.
     *
     * Pawn: `Ham_HasTarget`
     */
    hasTarget: HasTargetEvent;
    /** Pawn: `RG_CBasePlayer_TakeHealth`, `Ham_TakeHealth` */
    heal: HealEvent;
    /**
     * The game shows a player a hint. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_HintMessageEx`
     */
    hintMessage: HintMessageEvent;
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
    impulse: ImpulseEvent;
    /**
     * Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CSGameRules_GoToIntermission`
     */
    intermission: IntermissionEvent;
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
     * The game asks if an item is forbidden to a player. Return `true` to forbid it. Without ReAPI (plain HLDS): asked only for `"buying"`, through cstrike's `CS_OnBuyAttempt`: answering `true` forbids the purchase, `false` lets the game go on.
     *
     * Pawn: `RG_CBasePlayer_HasRestrictItem`
     */
    itemRestricted: ItemRestrictedEvent;
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
     * Called when a client "thinks for the join status". Without ReAPI (plain HLDS) nothing hears it.
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
     * Called on every frame while player presses jump button. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_PM_Jump`
     */
    jumpMovement: JumpMovementEvent;
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
     * Called when a player is on a ladder. Without ReAPI (plain HLDS) nothing hears it.
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
     * Recreate all the map entities from the map data (preserving their indices),. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CSGameRules_CleanUpMap`
     */
    mapReset: MapResetEvent;
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
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_PM_Move`
     */
    move: MoveEvent;
    /**
     * A new round is starting. Without ReAPI (plain HLDS): heard as the round restarts - the listeners before the game when it announces the round, the ones after it once its players have respawned - but `preventDefault()` does nothing.
     *
     * Pawn: `RG_CSGameRules_RestartRound`
     */
    newRound: NewRoundEvent;
    /**
     * Returns the next target of this.
     *
     * Pawn: `Ham_GetNextTarget`
     */
    nextTarget: NextTargetEvent;
    /**
     * Called when a client attempt to change the observer mode. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_Observer_SetMode`
     */
    observerSetMode: ObserverSetModeEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_Observer_Think`
     */
    observerThink: ObserverThinkEvent;
    /**
     * A player cries out in pain after a hit.
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
     * Called when a player plant's the bomb on the ground. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the bomb gets its model; returning an answer does nothing.
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
     * A flashbang is blinding a player. `preventDefault()` keeps the player's eyes clear. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `inflictor` and `attacker` read as the world, `color` as zero.
     *
     * Pawn: `RG_PlayerBlind`
     */
    playerBlind: PlayerBlindEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_PlayerDeathThink`
     */
    playerDeathThink: PlayerDeathThinkEvent;
    /**
     * Called each time player gets a weapon linked to his inventory. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CSGameRules_PlayerGotWeapon`
     */
    playerGotWeapon: PlayerGotWeaponEvent;
    /**
     * A player was killed. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CSGameRules_PlayerKilled`
     */
    playerKilled: PlayerKilledEvent;
    /**
     * A player spawned. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CSGameRules_PlayerSpawn`
     */
    playerSpawn: PlayerSpawnEvent;
    /**
     * Called whenever player emits an step sound. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_PM_PlayStepSound`
     */
    playStepSound: PlayStepSoundEvent;
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
     * Called when a generic resource is being added to generic precache list. Without ReAPI (plain HLDS): `preventDefault()` skips the precache, which answers 0; returning an answer or changing `file` does nothing.
     *
     * Pawn: `RH_PF_precache_generic_I`
     */
    precacheFile: PrecacheFileEvent;
    /**
     * Called when a model is being added to model precache list. Without ReAPI (plain HLDS): `preventDefault()` skips the precache, which answers 0; returning an answer or changing `file` does nothing.
     *
     * Pawn: `RH_PF_precache_model_I`
     */
    precacheModel: PrecacheModelEvent;
    /**
     * Called when a sound is being added to sound precache list. Without ReAPI (plain HLDS): `preventDefault()` skips the precache, which answers 0; returning an answer or changing `file` does nothing.
     *
     * Pawn: `RH_PF_precache_sound_I`
     */
    precacheSound: PrecacheSoundEvent;
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
     * Called when a message is being sent to the server's console. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RH_Con_Printf`
     */
    printf: PrintfEvent;
    /**
     * A radio message is sent. `preventDefault()` silences it. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_Radio`
     */
    radio: RadioEvent;
    /**
     * Called whenever player fires a weapon and shakes player screen (punchangles altering). Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayerWeapon_KickBack`
     */
    recoil: RecoilEvent;
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
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_RemoveAllItems`
     */
    removeAllItems: RemoveAllItemsEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_RemoveGuns`
     */
    removeGuns: RemoveGunsEvent;
    /** Pawn: `RG_CBasePlayer_RemovePlayerItem`, `Ham_RemovePlayerItem` */
    removeItem: RemoveItemEvent;
    /**
     * Called when a player's remove protection. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_RemoveSpawnProtection`
     */
    removeSpawnProtection: RemoveSpawnProtectionEvent;
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
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBaseAnimating_ResetSequenceInfo`
     */
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
     * There is no more ammo for this gun, so switch to the next best one.
     *
     * Pawn: `Ham_Weapon_RetireWeapon`
     */
    retireWeapon: RetireWeaponEvent;
    /**
     * The round is ending. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; returning an answer does nothing; `delay` is the original game's 5 seconds, 3 for `"gameCommence"`, unless `game.endRound` set it.
     *
     * Pawn: `RG_RoundEnd`
     */
    roundEnd: RoundEndEvent;
    /** Pawn: `RG_CBasePlayer_RoundRespawn`, `Ham_CS_RoundRespawn` */
    roundRespawn: RoundRespawnEvent;
    /**
     * The freeze time at the start of the round is over. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing.
     *
     * Pawn: `RG_CSGameRules_OnRoundFreezeEnd`
     */
    roundStart: RoundStartEvent;
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
     * Called when game selects a spawn point (info_player_start/deathmatch) to position the player. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_EntSelectSpawnPoint`
     */
    selectSpawnPoint: SelectSpawnPointEvent;
    /**
     * The game tells everyone who killed whom. Without ReAPI (plain HLDS): `preventDefault()` stops the message; `assister` and `inflictor` read as the world, `flags` as empty, `rarity` has `"headshot"` alone; changing a field does nothing.
     *
     * Pawn: `RG_CSGameRules_SendDeathMessage`
     */
    sendDeathMessage: SendDeathMessageEvent;
    /**
     * Called whenever game sends an animation to his current holder (player)
     *
     * Pawn: `RG_CBasePlayerWeapon_SendWeaponAnim`, `Ham_CS_Weapon_SendWeaponAnim`
     */
    sendWeaponAnim: SendWeaponAnimEvent;
    /**
     * Called when a command is being sent to server. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RH_ExecuteServerStringCmd`
     */
    serverCommand: ServerCommandEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_ServerDeactivate`
     */
    serverDeactivate: ServerDeactivateEvent;
    /**
     * The game sets the animation a player's model plays: walking, jumping, attacking, reloading. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_SetAnimation`
     */
    setAnimation: SetAnimationEvent;
    /**
     * Called when a player dies to pack up the appropriate weapons and ammo items, and creates a weaponbox that falls to floor with sets specify the model or when a player drop the item. Without ReAPI (plain HLDS): `preventDefault()` keeps the model off; changing `modelName` does nothing.
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
     * Called when a player's set protection. Without ReAPI (plain HLDS) nothing hears it.
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
     * A gun fires a shot: the game traces the bullet, through walls as its penetration allows, and deals its damage. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBaseEntity_FireBullets3`
     */
    shoot: ShootEvent;
    /**
     * A shotgun fires: the game traces each pellet and deals its damage. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBaseEntity_FireBuckshots`
     */
    shootBuckshot: ShootBuckshotEvent;
    /**
     * Whether or not the player should fade on death.
     *
     * Pawn: `Ham_Player_ShouldFadeOnDeath`
     */
    shouldFadeOnDeath: ShouldFadeOnDeathEvent;
    /**
     * Should the player switch to this weapon? Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_FShouldSwitchWeapon`
     */
    shouldSwitchWeapon: ShouldSwitchWeaponEvent;
    /**
     * Whether or not the weapon should idle.
     *
     * Pawn: `Ham_Weapon_ShouldWeaponIdle`
     */
    shouldWeaponIdle: ShouldWeaponIdleEvent;
    /**
     * The game shows a player a menu. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_ShowMenu`
     */
    showMenu: ShowMenuEvent;
    /**
     * The game shows a player a VGUI menu (team select). Without ReAPI (plain HLDS): heard as the menu is sent, to a player with VGUI menus on (not a bot): `preventDefault()` stops it; `oldMenu` reads as `""`, and changing a field does nothing.
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
    /**
     * Called on spawn, the attempt to equip a player. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_OnSpawnEquip`
     */
    spawnEquip: SpawnEquipEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_SpawnHeadGib`
     */
    spawnHeadGib: SpawnHeadGibEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_SpawnRandomGibs`
     */
    spawnRandomGibs: SpawnRandomGibsEvent;
    /**
     * Place this player on his spawnspot and face him in the proper direction. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CSGameRules_GetPlayerSpawnSpot`
     */
    spawnSpot: SpawnSpotEvent;
    /**
     * Called when a client attempt to find the next observer. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_Observer_FindNextPlayer`
     */
    spectateNext: SpectateNextEvent;
    /**
     * A dead player's camera starts. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_StartDeathCam`
     */
    startDeathCam: StartDeathCamEvent;
    /**
     * Not entirely sure what this does.
     *
     * Pawn: `Ham_StartSneaking`
     */
    startSneaking: StartSneakingEvent;
    /**
     * A sound is about to play. Assign `event.sample` to change it, or call `preventDefault()` to keep it silent. Without ReAPI (plain HLDS): heard for the sounds the game plays through the engine's `EmitSound`: `preventDefault()` stops it; `recipients` reads as 0, and changing a field does nothing.
     *
     * Pawn: `RH_SV_StartSound`
     */
    startSound: StartSoundEvent;
    /**
     * The player goes into observer mode. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_StartObserver`
     */
    startSpectating: StartSpectatingEvent;
    /**
     * Not entirely sure what this does.
     *
     * Pawn: `Ham_StopSneaking`
     */
    stopSneaking: StopSneakingEvent;
    /**
     * Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things. Without ReAPI (plain HLDS) nothing hears it.
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
     * A hurt player is pushed back and slowed down by the hit, after the damage. Assign `event.knockbackForce` or `event.velocityModifier` to change how much, or call `preventDefault()` for neither. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_TakeDamageImpulse`
     */
    takeDamageImpulse: TakeDamageImpulseEvent;
    /**
     * Called each time player tries to join a team to ensure availability. Without ReAPI (plain HLDS) nothing hears it.
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
     * Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar). Without ReAPI (plain HLDS) nothing hears it.
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
     * A player threw a flashbang. In a post listener `event.result` is the grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model.
     *
     * Pawn: `RG_ThrowFlashbang`
     */
    throwFlashbang: ThrowFlashbangEvent;
    /**
     * A player throws a grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model, and `eventIndex` reads as 0.
     *
     * Pawn: `RG_CBasePlayer_ThrowGrenade`
     */
    throwGrenade: ThrowGrenadeEvent;
    /**
     * A player threw an HE grenade. In a post listener `event.result` is the grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model, and `eventIndex` reads as 0.
     *
     * Pawn: `RG_ThrowHeGrenade`
     */
    throwHeGrenade: ThrowHeGrenadeEvent;
    /**
     * A player threw a smoke grenade. In a post listener `event.result` is the grenade. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; it is heard as the grenade gets its model, and `eventIndex` reads as 0.
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
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_RadiusFlash_TraceLine`
     */
    traceLine: TraceLineEvent;
    /**
     * Called whenever player tries to unduck. Without ReAPI (plain HLDS) nothing hears it.
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
     * The game updates a player's status bar: the name and health of the player under the crosshair, at the bottom of the screen. `preventDefault()` leaves it as it is. Without ReAPI (plain HLDS) nothing hears it.
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
     * Called when a player press use and if a suitable candidate is not found. Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CBasePlayer_UseEmpty`
     */
    useEmpty: UseEmptyEvent;
    /**
     * The player has changed userinfo; can change it now. Without ReAPI (plain HLDS): heard after the game has acted, so `preventDefault()` and changing a field do nothing; `info` reads as `""`.
     *
     * Pawn: `RG_CSGameRules_ClientUserInfoChanged`
     */
    userInfoChange: UserInfoChangeEvent;
    /**
     * Returns true if a line can be traced from the caller's eyes to the target.
     *
     * Pawn: `Ham_FVisible`
     */
    visible: VisibleEvent;
    /**
     * Without ReAPI (plain HLDS) nothing hears it.
     *
     * Pawn: `RG_CGib_WaitTillLand`
     */
    waitTillLand: WaitTillLandEvent;
    /**
     * Called on every frame after a player jumps on water for a short period of time. Without ReAPI (plain HLDS) nothing hears it.
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
    addFrags: void;
    addItem: number;
    addMoney: void;
    addMultiDamage: void;
    addResource: void;
    addTeamScore: void;
    addToPlayer: boolean;
    addWeapon: boolean;
    airAccelerate: void;
    airMove: void;
    applyMultiDamage: void;
    attachToPlayer: void;
    autoaimVector: Vector;
    balanceTeams: void;
    becomeBomber: boolean;
    becomeDead: void;
    becomeProne: boolean;
    becomeVip: void;
    bestVisibleEnemy: Entity;
    blind: void;
    blocked: void;
    bloodColor: number;
    bodyTarget: Vector;
    bounceGibTouch: void;
    buyAmmo: boolean;
    buyItem: void;
    buyWeapon: Entity;
    canDeploy: number;
    canDrop: boolean;
    canHaveItem: number;
    canHolster: boolean;
    canPlayerHearPlayer: boolean;
    canRespawn: number;
    canShootThrough: boolean;
    canSpectate: Player;
    canSwitchTeam: boolean;
    canTakeDamage: number;
    center: Vector;
    changeLevel: void;
    changeModel: void;
    changeName: boolean;
    changeYaw: number;
    chatMessage: void;
    checkMapConditions: void;
    checkTimeBasedDamage: void;
    checkUserInfo: number;
    checkWaterJump: void;
    checkWinConditions: void;
    childDeathNotice: void;
    chooseAppearance: void;
    chooseTeam: number;
    classify: number;
    clearMultiDamage: void;
    clientConnected: void;
    connectClient: void;
    consoleMessage: void;
    createWeaponBox: Entity;
    damageDecal: number;
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
    disappear: void;
    disconnectClient: void;
    drop: void;
    dropIdlePlayer: void;
    dropPlayerItem: Entity;
    dropShield: Entity;
    dropWeaponsOnDeath: number;
    duck: void;
    duckMovement: void;
    earPosition: Vector;
    explodeBomb: void;
    explodeFlashbang: void;
    explodeHeGrenade: void;
    explodeSmokeGrenade: void;
    extractAmmo: number;
    extractClipAmmo: number;
    eyePosition: Vector;
    fadeMonster: void;
    fallDamage: number;
    fireBullets: void;
    gameEvent: void;
    gameThink: void;
    getForceCamera: number;
    getIntoGame: boolean;
    getNextBestWeapon: number;
    gibMonster: void;
    gibSpawn: void;
    giveAmmo: number;
    giveBomb: Player;
    giveDefaultItems: void;
    giveItem: Entity;
    giveShield: void;
    gunPosition: Vector;
    hasAlienGibs: boolean;
    hasHumanGibs: boolean;
    hasTarget: boolean;
    heal: number;
    hintMessage: boolean;
    holster: void;
    illumination: number;
    impulse: void;
    intermission: void;
    inViewCone: boolean;
    isAlive: boolean;
    isBot: boolean;
    isBspModel: boolean;
    isInWorld: boolean;
    isMoving: boolean;
    isNetClient: boolean;
    isPlayer: boolean;
    isSneaking: boolean;
    isTriggered: boolean;
    isUsable: boolean;
    isWeapon: boolean;
    itemPostFrame: void;
    itemPreFrame: void;
    itemRestricted: boolean;
    itemSlot: number;
    itemUpdateClientData: number;
    joiningThink: void;
    jump: void;
    jumpMovement: void;
    kill: void;
    killed: void;
    ladderMove: void;
    look: void;
    mapReset: void;
    maxSpeed: number;
    monsterInitDead: void;
    move: void;
    newRound: void;
    nextTarget: Entity;
    observerSetMode: void;
    observerThink: void;
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
    pointInViewCone: boolean;
    pointVisible: boolean;
    postThink: void;
    precache: void;
    precacheFile: number;
    precacheModel: number;
    precacheSound: number;
    preThink: void;
    primaryAmmoIndex: number;
    primaryAttack: void;
    printf: void;
    radio: void;
    recoil: void;
    reflectGauss: boolean;
    relationship: number;
    reload: void;
    removeAllItems: void;
    removeGuns: void;
    removeItem: number;
    removeSpawnProtection: void;
    resetEmptySound: void;
    resetMaxSpeed: void;
    resetSequenceInfo: void;
    respawn: Entity;
    restart: void;
    retireWeapon: void;
    roundEnd: boolean;
    roundRespawn: void;
    roundStart: void;
    secondaryAmmoIndex: number;
    secondaryAttack: void;
    selectSpawnPoint: Entity;
    sendDeathMessage: void;
    sendWeaponAnim: void;
    serverCommand: void;
    serverDeactivate: void;
    setAnimation: void;
    setModel: void;
    setObjectCollisionBox: void;
    setSpawnProtection: void;
    setToggleState: void;
    shoot: void;
    shootBuckshot: void;
    shouldFadeOnDeath: boolean;
    shouldSwitchWeapon: number;
    shouldWeaponIdle: boolean;
    showMenu: void;
    showVguiMenu: void;
    spawn: void;
    spawnEquip: void;
    spawnHeadGib: Entity;
    spawnRandomGibs: void;
    spawnSpot: Entity;
    spectateNext: void;
    startDeathCam: void;
    startSneaking: void;
    startSound: void;
    startSpectating: void;
    stopSneaking: void;
    switchTeam: void;
    takeDamage: number;
    takeDamageImpulse: void;
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
    updateStatusBar: void;
    use: void;
    useEmpty: void;
    userInfoChange: void;
    visible: boolean;
    waitTillLand: void;
    waterJump: void;
    weaponIdle: void;
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
