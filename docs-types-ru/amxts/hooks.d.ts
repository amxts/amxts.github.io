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
     * Блокирует функцию игры, которую перехватывает цепочка. Если цепочка ждёт ответа, верните его из обработчика; это — блокировка без ответа.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
    /**
     * Останавливает цепочку: не выполняются ни хуки после этого, ни функция игры. Нужно редко — обычно подходит preventDefault().
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
 * Pawn: `RH_SV_ActivateServer` (const runPhysics)
 */
export declare class ActivateServerEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `runPhysics`
     */
    get runPhysics(): number;
    set runPhysics(value: number);
}
/**
 * У игрока меняются деньги. Присвойте event.amount, чтобы изменить сумму.
 *
 * Pawn: `RG_CBasePlayer_AddAccount` (const this, amount, RewardType:type, bool:bTrackChange)
 */
export declare class AddAccountEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `amount`
     */
    get amount(): number;
    set amount(value: number);
    /**
     * Причина начисления, например "roundBonus", "enemyKilled", "playerBoughtSomething", "hostageRescued".
     *
     * Pawn: `RewardType:type`
     */
    get reason(): RewardReason;
    set reason(value: RewardReason);
    /**
     * Аргумент 4.
     *
     * Pawn: `bool:bTrackChange`
     */
    get trackChange(): boolean;
    set trackChange(value: boolean);
}
/**
 * Called inside TraceAttack to store entity damage to multidamage data
 *
 * Pawn: `RG_AddMultiDamage` (const pevInflictor, const pEntity, Float:flDamage, bitsDamageType)
 */
export declare class AddMultiDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Аргумент 3.
     *
     * Pawn: `Float:flDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Pawn: `RG_CBasePlayer_AddPlayerItem` (const this, const pItem)
 */
export declare class AddPlayerItemEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pItem`
     */
    get item(): Weapon;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_AddPoints` (const this, score, bAllowNegativeScore)
 */
export declare class AddPointsEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `score`
     */
    get score(): number;
    set score(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bAllowNegativeScore`
     */
    get allowNegativeScore(): number;
    set allowNegativeScore(value: number);
}
/**
 * Pawn: `RG_CBasePlayer_AddPointsToTeam` (const this, score, bAllowNegativeScore)
 */
export declare class AddPointsToTeamEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `score`
     */
    get score(): number;
    set score(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bAllowNegativeScore`
     */
    get allowNegativeScore(): number;
    set allowNegativeScore(value: number);
}
/**
 * Файл добавляется в то, что скачивают клиенты.
 *
 * Pawn: `RH_SV_AddResource` (ResourceType_t:type, const filename[], size, flags, index)
 */
export declare class AddResourceEvent extends HookEvent {
    private readonly kind;
    /**
     * Вид файла, например "sound", "model", "decal", "generic".
     *
     * Pawn: `ResourceType_t:type`
     */
    get resourceType(): ResourceType;
    set resourceType(value: ResourceType);
    /**
     * Аргумент 2.
     *
     * Pawn: `filename[]`
     */
    get filename(): string;
    set filename(value: string);
    /**
     * Аргумент 3.
     *
     * Pawn: `size`
     */
    get size(): number;
    set size(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `flags`
     */
    get flags(): number;
    set flags(value: number);
    /**
     * Номер ресурса в списке.
     *
     * Pawn: `index`
     */
    get resourceIndex(): number;
    set resourceIndex(value: number);
}
/**
 * Called whenever player is on air (not touching floor)
 *
 * Pawn: `RG_PM_AirAccelerate` (Float:wishdir[3], Float:wishspeed, Float:accel, const playerIndex)
 */
export declare class AirAccelerateEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `Float:wishdir[3]`
     */
    get wishdir(): Vector;
    /**
     * Аргумент 2.
     *
     * Pawn: `Float:wishspeed`
     */
    get wishspeed(): number;
    set wishspeed(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `Float:accel`
     */
    get accel(): number;
    set accel(value: number);
    /**
     * Аргумент 4, только чтение.
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
     * Аргумент 1, только чтение.
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
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (Edict * (Entity index))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
}
/**
 * Pawn: `RG_CSGameRules_BalanceTeams` ()
 */
export declare class BalanceTeamsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Pawn: `RG_CBasePlayer_Duck` (const this)
 */
export declare class BasePlayerDuckEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_Jump` (const this)
 */
export declare class BasePlayerJumpEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_Spawn` (const this)
 */
export declare class BasePlayerSpawnEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_Blind` (const this, Float:flUntilTime, Float:flHoldTime, Float:flFadeTime, iAlpha)
 */
export declare class BlindEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `Float:flUntilTime`
     */
    get untilTime(): number;
    set untilTime(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `Float:flHoldTime`
     */
    get holdTime(): number;
    set holdTime(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:flFadeTime`
     */
    get fadeTime(): number;
    set fadeTime(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `iAlpha`
     */
    get alpha(): number;
    set alpha(value: number);
}
/**
 * Pawn: `RG_CGib_BounceGibTouch` (const this, pOther)
 */
export declare class BounceGibTouchEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get gib(): Entity;
    /**
     * Аргумент 2, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `weapon_entity`
     */
    get weapon_entity(): number;
    set weapon_entity(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bool:blinkMoney`
     */
    get blinkMoney(): boolean;
    set blinkMoney(value: boolean);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `pPlayer`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `iSlot`
     */
    get slot(): number;
    set slot(value: number);
}
/**
 * Игрок покупает оружие. В post-обработчике event.result — само оружие.
 *
 * Pawn: `RG_BuyWeaponByWeaponID` (const index, const WeaponIdType:weaponID)
 */
export declare class BuyWeaponByWeaponIdEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Покупаемое оружие, как его называет weapon.kind, например "ak47" или "awp".
     *
     * Pawn: `WeaponIdType:weaponID`
     */
    get weapon(): WeaponKind;
    set weapon(value: WeaponKind);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of weapon))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayerWeapon_CanDeploy` (const this)
 */
export declare class CanDeployEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `item`
     */
    get item(): Weapon;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игра спрашивает, слышит ли один игрок другого в голосовом чате. Верните true или false, чтобы решить.
 *
 * Pawn: `RG_CSGameRules_CanPlayerHearPlayer` (const listener, const sender)
 */
export declare class CanPlayerHearPlayerEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, который слушает.
     *
     * Pawn: `listener`
     */
    get listener(): Player;
    /**
     * Игрок, который говорит.
     *
     * Pawn: `sender`
     */
    get sender(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игра спрашивает, можно ли игроку перейти в команду. Верните true или false, чтобы решить.
 *
 * Pawn: `RG_CBasePlayer_CanSwitchTeam` (const this, TeamName:teamToSwap)
 */
export declare class CanSwitchTeamEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Команда, в которую перейдёт игрок.
     *
     * Pawn: `TeamName:teamToSwap`
     */
    get team(): Team;
    set team(value: Team);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CSGameRules_ChangeLevel` ()
 */
export declare class ChangeLevelEvent extends HookEvent {
    private readonly kind;
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
     * Аргумент 1, только чтение.
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
     * Аргумент 1.
     *
     * Pawn: `adr`
     */
    get adr(): number;
    set adr(value: number);
    /**
     * Аргумент 2.
     *
     * Pawn: `buffer`
     */
    get buffer(): number;
    set buffer(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bool:reconnect`
     */
    get reconnect(): boolean;
    set reconnect(value: boolean);
    /**
     * Аргумент 4.
     *
     * Pawn: `reconnectSlot`
     */
    get reconnectSlot(): number;
    set reconnectSlot(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `name[]`
     */
    get name(): string;
    set name(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Игра проверяет, не победила ли какая-то сторона. preventDefault() не даст ей закончить раунд.
 *
 * Pawn: `RG_CSGameRules_CheckWinConditions` ()
 */
export declare class CheckWinConditionsEvent extends HookEvent {
    private readonly kind;
}
/**
 * Pawn: `RG_HandleMenu_ChooseAppearance` (const index, const slot)
 */
export declare class ChooseAppearanceEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `slot`
     */
    get slot(): number;
    set slot(value: number);
}
/**
 * Игрок выбрал пункт в меню команд. preventDefault() — и выбор не засчитается.
 *
 * Pawn: `RG_HandleMenu_ChooseTeam` (const index, const MenuChooseTeam:slot)
 */
export declare class ChooseTeamEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Выбор игрока, одно из "TERRORIST", "CT", "VIP", "auto" или "SPECTATOR". Присвойте, чтобы изменить.
     *
     * Pawn: `MenuChooseTeam:slot`
     */
    get choice(): TeamChoice;
    set choice(value: TeamChoice);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_Classify` (const this)
 */
export declare class ClassifyEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1.
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
     * Аргумент 1.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2.
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
     * Аргумент 1.
     *
     * Pawn: `weaponent`
     */
    get weaponent(): number;
    set weaponent(value: number);
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `owner`
     */
    get owner(): Entity;
    /**
     * Аргумент 3.
     *
     * Pawn: `modelName[]`
     */
    get modelName(): string;
    set modelName(value: string);
    /**
     * Аргумент 4, только чтение.
     *
     * Pawn: `Float:origin[3]`
     */
    get origin(): Vector;
    /**
     * Аргумент 5, только чтение.
     *
     * Pawn: `Float:angles[3]`
     */
    get angles(): Vector;
    /**
     * Аргумент 6, только чтение.
     *
     * Pawn: `Float:velocity[3]`
     */
    get velocity(): Vector;
    /**
     * Аргумент 7.
     *
     * Pawn: `Float:lifeTime`
     */
    get lifeTime(): number;
    set lifeTime(value: number);
    /**
     * Аргумент 8.
     *
     * Pawn: `bool:packAmmo`
     */
    get packAmmo(): boolean;
    set packAmmo(value: boolean);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CWeaponBox * (Entity index of weaponbox))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `victim`
     */
    get victim(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `killer`
     */
    get killer(): Player;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
}
/**
 * Called when a client emits a "death sound" after death.
 *
 * Pawn: `RG_CBasePlayer_DeathSound` (const this, lastHitGroup, bool:hasArmour)
 */
export declare class DeathSoundEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `lastHitGroup`
     */
    get lastHitGroup(): number;
    set lastHitGroup(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bool:hasArmour`
     */
    get hasArmour(): boolean;
    set hasArmour(value: boolean);
}
/**
 * Оружие достают. Присвойте event.viewModel / weaponModel, чтобы поменять модель.
 *
 * Pawn: `RG_CBasePlayerWeapon_DefaultDeploy` (const this, szViewModel[], szWeaponModel[], iAnim, szAnimExt[], skiplocal)
 */
export declare class DefaultDeployEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Аргумент 2.
     *
     * Pawn: `szViewModel[]`
     */
    get viewModel(): string;
    set viewModel(value: string);
    /**
     * Аргумент 3.
     *
     * Pawn: `szWeaponModel[]`
     */
    get weaponModel(): string;
    set weaponModel(value: string);
    /**
     * Аргумент 4.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `szAnimExt[]`
     */
    get animExt(): string;
    set animExt(value: string);
    /**
     * Аргумент 6.
     *
     * Pawn: `skiplocal`
     */
    get skiplocal(): number;
    set skiplocal(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayerWeapon_DefaultReload` (const this, iClipSize, iAnim, Float:fDelay)
 */
export declare class DefaultReloadEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Аргумент 2.
     *
     * Pawn: `iClipSize`
     */
    get clipSize(): number;
    set clipSize(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:fDelay`
     */
    get delay(): number;
    set delay(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayerWeapon_DefaultShotgunReload` (const this, iAnim, iStartAnim, Float:fDelay, Float:fStartDelay, const pszReloadSound1[], const pszReloadSound2[])
 */
export declare class DefaultShotgunReloadEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Аргумент 2.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `iStartAnim`
     */
    get startAnim(): number;
    set startAnim(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:fDelay`
     */
    get delay(): number;
    set delay(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `Float:fStartDelay`
     */
    get startDelay(): number;
    set startDelay(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `pszReloadSound1[]`
     */
    get reloadSound1(): string;
    set reloadSound1(value: string);
    /**
     * Аргумент 7.
     *
     * Pawn: `pszReloadSound2[]`
     */
    get reloadSound2(): string;
    set reloadSound2(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `player`
     */
    get player(): Player;
    /**
     * Аргумент 3.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `player`
     */
    get player(): Player;
}
/**
 * Pawn: `RH_Cvar_DirectSet` (pcvar, const value[])
 */
export declare class DirectSetEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `pcvar`
     */
    get pcvar(): number;
    set pcvar(value: number);
    /**
     * Аргумент 2.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RH_SV_DropClient` (const client, bool:crash, const fmt[])
 */
export declare class DropClientEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
    /**
     * Аргумент 2.
     *
     * Pawn: `bool:crash`
     */
    get crash(): boolean;
    set crash(value: boolean);
    /**
     * Аргумент 3.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `reason[]`
     */
    get reason(): string;
    set reason(value: string);
}
/**
 * Игрок выбрасывает оружие. В post-обработчике event.result — коробка с оружием на земле.
 *
 * Pawn: `RG_CBasePlayer_DropPlayerItem` (const this, const pszItemName[])
 */
export declare class DropPlayerItemEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Имя класса оружия, например "weapon_ak47".
     *
     * Pawn: `pszItemName[]`
     */
    get itemName(): string;
    set itemName(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of item))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `bool:deploy`
     */
    get deploy(): boolean;
    set deploy(value: boolean);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of shield))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when client it's in the scoreboard
 *
 * Pawn: `RH_SV_EmitPings` (const client)
 */
export declare class EmitPingsEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (edict_t * (Entity index of selected spawn point))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1.
     *
     * Pawn: `cmd[]`
     */
    get cmd(): string;
    set cmd(value: string);
    /**
     * Аргумент 2.
     *
     * Pawn: `source`
     */
    get source(): number;
    set source(value: number);
    /**
     * Аргумент 3, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Аргумент 3.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Аргумент 3.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
}
/**
 * Дымовая граната взрывается.
 *
 * Pawn: `RG_CGrenade_ExplodeSmokeGrenade` (const this)
 */
export declare class ExplodeSmokeGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get grenade(): Entity;
}
/**
 * Is this player allowed to respawn now?
 *
 * Pawn: `RG_CSGameRules_FPlayerCanRespawn` (const index)
 */
export declare class FPlayerCanRespawnEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `attacker`
     */
    get attacker(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Should the player switch to this weapon?
 *
 * Pawn: `RG_CSGameRules_FShouldSwitchWeapon` (const index, const weapon)
 */
export declare class FShouldSwitchWeaponEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `weapon`
     */
    get weapon(): Weapon;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBaseEntity_FireBuckshots` (pEntity, cShots, Float:vecSrc[3], Float:vecDirShooting[3], Float:vecSpread[3], Float:flDistance, iTracerFreq, iDamage, pevAttacker)
 */
export declare class FireBuckshotsEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `cShots`
     */
    get shots(): number;
    set shots(value: number);
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Аргумент 4, только чтение.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get dirShooting(): Vector;
    /**
     * Аргумент 5, только чтение.
     *
     * Pawn: `Float:vecSpread[3]`
     */
    get spread(): Vector;
    /**
     * Аргумент 6.
     *
     * Pawn: `Float:flDistance`
     */
    get distance(): number;
    set distance(value: number);
    /**
     * Аргумент 7.
     *
     * Pawn: `iTracerFreq`
     */
    get tracerFreq(): number;
    set tracerFreq(value: number);
    /**
     * Аргумент 8.
     *
     * Pawn: `iDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Аргумент 9, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `cShots`
     */
    get shots(): number;
    set shots(value: number);
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Аргумент 4, только чтение.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get dirShooting(): Vector;
    /**
     * Аргумент 5, только чтение.
     *
     * Pawn: `Float:vecSpread[3]`
     */
    get spread(): Vector;
    /**
     * Аргумент 6.
     *
     * Pawn: `Float:flDistance`
     */
    get distance(): number;
    set distance(value: number);
    /**
     * Аргумент 7.
     *
     * Pawn: `iBulletType`
     */
    get bulletType(): number;
    set bulletType(value: number);
    /**
     * Аргумент 8.
     *
     * Pawn: `iTracerFreq`
     */
    get tracerFreq(): number;
    set tracerFreq(value: number);
    /**
     * Аргумент 9.
     *
     * Pawn: `iDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Аргумент 10, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `Float:vecDirShooting[3]`
     */
    get dirShooting(): Vector;
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:vecSpread`
     */
    get spread(): number;
    set spread(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `Float:flDistance`
     */
    get distance(): number;
    set distance(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `iPenetration`
     */
    get penetration(): number;
    set penetration(value: number);
    /**
     * Аргумент 7.
     *
     * Pawn: `iBulletType`
     */
    get bulletType(): number;
    set bulletType(value: number);
    /**
     * Аргумент 8.
     *
     * Pawn: `iDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Аргумент 9.
     *
     * Pawn: `Float:flRangeModifier`
     */
    get rangeModifier(): number;
    set rangeModifier(value: number);
    /**
     * Аргумент 10, только чтение.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * Аргумент 11.
     *
     * Pawn: `bool:bPistol`
     */
    get pistol(): boolean;
    set pistol(value: boolean);
    /**
     * Аргумент 12.
     *
     * Pawn: `shared_rand`
     */
    get shared_rand(): number;
    set shared_rand(value: number);
}
/**
 * Игра считает урон от падения. В post-обработчике event.result — это число; верните своё, чтобы заменить его.
 *
 * Pawn: `RG_CSGameRules_FlPlayerFallDamage` (const index)
 */
export declare class FlPlayerFallDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, который упал.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (float)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
}
/**
 * Pawn: `RH_GetEntityInit` (const classname[])
 */
export declare class GetEntityInitEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `pObserver`
     */
    get observer(): Entity;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `currentWeapon`
     */
    get currentWeapon(): number;
    set currentWeapon(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (edict_t * (Entity index of spawnspot))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CGib_Spawn` (const this, const szGibModel[])
 */
export declare class GibSpawnEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get gib(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `szGibModel[]`
     */
    get gibModel(): string;
    set gibModel(value: string);
}
/**
 * Pawn: `RG_CBasePlayer_GiveAmmo` (const this, iAmount, szName[], iMax)
 */
export declare class GiveAmmoEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `iAmount`
     */
    get amount(): number;
    set amount(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `szName[]`
     */
    get name(): string;
    set name(value: string);
    /**
     * Аргумент 4.
     *
     * Pawn: `iMax`
     */
    get max(): number;
    set max(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CSGameRules_GiveC4` ()
 */
export declare class GiveC4Event extends HookEvent {
    private readonly kind;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CBasePlayer * (Entity index of player))
     */
    get result(): Player;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игра выдаёт появившемуся игроку стандартное оружие. preventDefault() — и не выдаст ничего.
 *
 * Pawn: `RG_CBasePlayer_GiveDefaultItems` (const this)
 */
export declare class GiveDefaultItemsEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `pszName[]`
     */
    get name(): string;
    set name(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CBaseEntity * (Entity index of item))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_GiveShield` (const this, bool:bDeploy)
 */
export declare class GiveShieldEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
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
 * Игра спрашивает, запрещён ли игроку предмет. Верните true, чтобы запретить.
 *
 * Pawn: `RG_CBasePlayer_HasRestrictItem` (const this, ItemID:item, ItemRestType:type)
 */
export declare class HasRestrictItemEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `ItemID:item`
     */
    get item(): Weapon;
    /**
     * Способ, которым игрок получит предмет, — одно из "buying" (покупка), "touched" (подобрал) или "equipped" (выдан при спавне).
     *
     * Pawn: `ItemRestType:type`
     */
    get restriction(): ItemRestriction;
    set restriction(value: ItemRestriction);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игра показывает игроку подсказку.
 *
 * Pawn: `RG_CBasePlayer_HintMessageEx` (const this, const message[], Float:duration, bool:bDisplayIfPlayerDead, bool:bOverride)
 */
export declare class HintMessageExEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `message[]`
     */
    get message(): string;
    set message(value: string);
    /**
     * Аргумент 3.
     *
     * Pawn: `Float:duration`
     */
    get duration(): number;
    set duration(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `bool:bDisplayIfPlayerDead`
     */
    get displayIfPlayerDead(): boolean;
    set displayIfPlayerDead(value: boolean);
    /**
     * `true` — показать подсказку и игроку, который отключил подсказки.
     *
     * Pawn: `bool:bOverride`
     */
    get displayIfHintsOff(): boolean;
    set displayIfHintsOff(value: boolean);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игрок отправляет impulse: 100 — фонарик, 201 — спрей.
 *
 * Pawn: `RG_CBasePlayer_ImpulseCommands` (const this)
 */
export declare class ImpulseCommandsEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Called when a player hit to entity.
 *
 * Pawn: `RG_IsPenetrableEntity` (Float:vecSrc[3], Float:vecEnd[3], index, entity)
 */
export declare class IsPenetrableEntityEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `Float:vecEnd[3]`
     */
    get end(): Vector;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 4, только чтение.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called every client frame (PlayerPostThink) for the player's active weapon
 *
 * Pawn: `RG_CBasePlayerWeapon_ItemPostFrame` (const this)
 */
export declare class ItemPostFrameEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
}
/**
 * Called when a client "thinks for the join status".
 *
 * Pawn: `RG_CBasePlayer_JoiningThink` (const this)
 */
export declare class JoiningThinkEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Аргумент 2.
     *
     * Pawn: `Float:up_base`
     */
    get up_base(): number;
    set up_base(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `Float:lateral_base`
     */
    get lateral_base(): number;
    set lateral_base(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:up_modifier`
     */
    get up_modifier(): number;
    set up_modifier(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `Float:lateral_modifier`
     */
    get lateral_modifier(): number;
    set lateral_modifier(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `Float:p_max`
     */
    get p_max(): number;
    set p_max(value: number);
    /**
     * Аргумент 7.
     *
     * Pawn: `Float:lateral_max`
     */
    get lateral_max(): number;
    set lateral_max(value: number);
    /**
     * Аргумент 8.
     *
     * Pawn: `direction_change`
     */
    get direction_change(): number;
    set direction_change(value: number);
}
/**
 * Pawn: `RG_CBasePlayer_Killed` (const this, pevAttacker, iGib)
 */
export declare class KilledEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * Аргумент 3.
     *
     * Pawn: `iGib`
     */
    get gib(): number;
    set gib(value: number);
}
/**
 * Called when a player is on a ladder.
 *
 * Pawn: `RG_PM_LadderMove` (const pLadder, const playerIndex)
 */
export declare class LadderMoveEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `pLadder`
     */
    get ladder(): Entity;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Makes a random player the bomber.
 *
 * Pawn: `RG_CBasePlayer_MakeBomber` (const this)
 */
export declare class MakeBomberEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_PM_Move` (const playerIndex)
 */
export declare class MoveEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_ObjectCaps` (const this)
 */
export declare class ObjectCapsEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `bool bReverse`
     */
    get arg2(): number;
    set arg2(value: number);
    /**
     * Аргумент 3.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `iPlayerIndex`
     */
    get playerIndex(): number;
    set playerIndex(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bool:bSameTeam`
     */
    get sameTeam(): boolean;
    set sameTeam(value: boolean);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CBasePlayer *)
     */
    get result(): Player;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Игра сообщает ботам, что что-то произошло.
 *
 * Pawn: `RG_CBotManager_OnEvent` (GameEventType:event, const pEntity, const pOther)
 */
export declare class OnEventEvent extends HookEvent {
    private readonly kind;
    /**
     * Событие для ботов, например "weaponFired", "playerDied", "bombPlanted", "roundStart".
     *
     * Pawn: `GameEventType:event`
     */
    get gameEvent(): BotEvent;
    set gameEvent(value: BotEvent);
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pEntity`
     */
    get entity(): Entity;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `pOther`
     */
    get other(): Entity;
}
/**
 * Закончилось время заморозки в начале раунда.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `bool:addDefault`
     */
    get addDefault(): boolean;
    set addDefault(value: boolean);
    /**
     * Аргумент 3.
     *
     * Pawn: `bool:equipGame`
     */
    get equipGame(): boolean;
    set equipGame(value: boolean);
}
/**
 * Called when a client emits a "pain sound" after received damage.
 *
 * Pawn: `RG_CBasePlayer_Pain` (const this)
 */
export declare class PainEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Called when a player plant's the bomb on the ground.
 *
 * Pawn: `RG_PlantBomb` (const index, Float:vecStart[3], Float:vecVelocity[3])
 */
export declare class PlantBombEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of bomb))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called whenever player emits an step sound
 *
 * Pawn: `RG_PM_PlayStepSound` (step, Float:fvol, const playerIndex)
 */
export declare class PlayStepSoundEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `step`
     */
    get step(): number;
    set step(value: number);
    /**
     * Аргумент 2.
     *
     * Pawn: `Float:fvol`
     */
    get fvol(): number;
    set fvol(value: number);
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Флешка ослепляет игрока. preventDefault() — и он ничего не заметит.
 *
 * Pawn: `RG_PlayerBlind` (const index, const inflictor, const attacker, const Float:fadeTime, const Float:fadeHold, const alpha, Float:color[3])
 */
export declare class PlayerBlindEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, которого ослепляет.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `attacker`
     */
    get attacker(): Player;
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:fadeTime`
     */
    get fadeTime(): number;
    set fadeTime(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `Float:fadeHold`
     */
    get fadeHold(): number;
    set fadeHold(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `alpha`
     */
    get alpha(): number;
    set alpha(value: number);
    /**
     * Цвет вспышки, [r, g, b] как Vector. Только чтение.
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
     * Аргумент 1, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `pPlayer`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pWeapon`
     */
    get weapon(): Weapon;
}
/**
 * Игрока убили.
 *
 * Pawn: `RG_CSGameRules_PlayerKilled` (const victim, const killer, const inflictor)
 */
export declare class PlayerKilledEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, который погиб.
     *
     * Pawn: `victim`
     */
    get victim(): Player;
    /**
     * Игрок, который убил жертву.
     *
     * Pawn: `killer`
     */
    get killer(): Player;
    /**
     * Орудие убийства: оружие, граната, мир.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
}
/**
 * Игрок появился на карте (спавн).
 *
 * Pawn: `RG_CSGameRules_PlayerSpawn` (const index)
 */
export declare class PlayerSpawnEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `index`
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
     * Аргумент 1, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_PostThink` (const this)
 */
export declare class PostThinkEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Кадр игрока, до его движения: каждый кадр для каждого игрока, сотни раз в секунду. Обработчик должен быть очень лёгким.
 *
 * Pawn: `RG_CBasePlayer_PreThink` (const this)
 */
export declare class PreThinkEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_Precache` (const this)
 */
export declare class PrecacheEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Called when a generic resource is being added to generic precache list.
 *
 * Pawn: `RH_PF_precache_generic_I` (const string[])
 */
export declare class PrecacheGenericIEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called when a message is being sent to the server's console.
 *
 * Pawn: `RH_Con_Printf` (const string[])
 */
export declare class PrintfEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `string[]`
     */
    get string(): string;
    set string(value: string);
}
/**
 * Отправляется радиосообщение. preventDefault() заглушит его.
 *
 * Pawn: `RG_CBasePlayer_Radio` (const this, const msg_id[], const msg_verbose[], pitch, bool:showIcon)
 */
export declare class RadioEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `msg_id[]`
     */
    get msg_id(): string;
    set msg_id(value: string);
    /**
     * Аргумент 3.
     *
     * Pawn: `msg_verbose[]`
     */
    get msg_verbose(): string;
    set msg_verbose(value: string);
    /**
     * Аргумент 4.
     *
     * Pawn: `pitch`
     */
    get pitch(): number;
    set pitch(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `bool:showIcon`
     */
    get showIcon(): boolean;
    set showIcon(value: boolean);
}
/**
 * Pawn: `RG_CBasePlayer_RemoveAllItems` (const this, bool:removeSuit)
 */
export declare class RemoveAllItemsEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
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
 * Pawn: `RG_CBasePlayer_RemovePlayerItem` (const this, const pItem)
 */
export declare class RemovePlayerItemEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pItem`
     */
    get item(): Weapon;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Игра сбрасывает скорость игрока — при спавне и при каждой смене оружия. preventDefault() оставит скорость, которую вы задали.
 *
 * Pawn: `RG_CBasePlayer_ResetMaxSpeed` (const this)
 */
export declare class ResetMaxSpeedEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get entity(): Entity;
}
/**
 * Начинается новый раунд.
 *
 * Pawn: `RG_CSGameRules_RestartRound` ()
 */
export declare class RestartRoundEvent extends HookEvent {
    private readonly kind;
}
/**
 * Раунд заканчивается.
 *
 * Pawn: `RG_RoundEnd` (WinStatus:status, ScenarioEventEndRound:event, Float:tmDelay)
 */
export declare class RoundEndEvent extends HookEvent {
    private readonly kind;
    /**
     * Победитель раунда, одно из "TERRORIST", "CT", "draw" или "none", как у game.endRound. Присвойте, чтобы изменить.
     *
     * Pawn: `WinStatus:status`
     */
    get winner(): RoundWinner;
    set winner(value: RoundWinner);
    /**
     * Причина конца раунда, например "terroristsWin", "ctsWin", "bombDefused", "targetSaved", "gameRestart"; "unknown" — номер, которому у игры нет имени.
     *
     * Pawn: `ScenarioEventEndRound:event`
     */
    get reason(): RoundEndReason;
    set reason(value: RoundEndReason);
    /**
     * Секунды до следующего раунда.
     *
     * Pawn: `Float:tmDelay`
     */
    get delay(): number;
    set delay(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_RoundRespawn` (const this)
 */
export declare class RoundRespawnEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Игра сообщает всем, кто кого убил.
 *
 * Pawn: `RG_CSGameRules_SendDeathMessage` (const pKiller, const pVictim, const pAssister, const pevInflictor, const killerWeaponName[], const DeathMessageFlags:iDeathMessageFlags, const KillRarity:iRarityOfKill)
 */
export declare class SendDeathMessageEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `pKiller`
     */
    get killer(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pVictim`
     */
    get victim(): Player;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `pAssister`
     */
    get assister(): Entity;
    /**
     * Аргумент 4, только чтение.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * Аргумент 5.
     *
     * Pawn: `killerWeaponName[]`
     */
    get killerWeaponName(): string;
    set killerWeaponName(value: string);
    /**
     * Дополнения к сообщению о смерти, любые из "Position", "Assistant", "KillRarity".
     *
     * Pawn: `DeathMessageFlags:iDeathMessageFlags`
     */
    get flags(): DeathMessageFlag[];
    set flags(values: DeathMessageFlag[]);
    /**
     * Особенности убийства, например "Headshot", "NoScope", "Penetrated", "InAir".
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
     * Аргумент 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
}
/**
 * Called whenever game sends an animation to his current holder (player)
 *
 * Pawn: `RG_CBasePlayerWeapon_SendWeaponAnim` (const this, iAnim, skiplocal)
 */
export declare class SendWeaponAnimEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weapon(): Weapon;
    /**
     * Аргумент 2.
     *
     * Pawn: `iAnim`
     */
    get anim(): number;
    set anim(value: number);
    /**
     * Аргумент 3.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `infobuffer[]`
     */
    get infobuffer(): string;
    set infobuffer(value: string);
    /**
     * Аргумент 3.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `infobuffer[]`
     */
    get infobuffer(): string;
    set infobuffer(value: string);
    /**
     * Аргумент 3.
     *
     * Pawn: `szNewName[]`
     */
    get newName(): string;
    set newName(value: string);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get weaponBox(): Entity;
    /**
     * Аргумент 2.
     *
     * Pawn: `szModelName[]`
     */
    get modelName(): string;
    set modelName(value: string);
}
/**
 * Called when a player's set protection.
 *
 * Pawn: `RG_CBasePlayer_SetSpawnProtection` (const this, Float:time)
 */
export declare class SetSpawnProtectionEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
}
/**
 * Игра показывает игроку меню.
 *
 * Pawn: `RG_ShowMenu` (const index, const bitsSlots, const iDisplayTime, const iNeedMore, pszText[])
 */
export declare class ShowMenuEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `bitsSlots`
     */
    get slots(): number;
    set slots(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `iDisplayTime`
     */
    get displayTime(): number;
    set displayTime(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `iNeedMore`
     */
    get needMore(): number;
    set needMore(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `pszText[]`
     */
    get text(): string;
    set text(value: string);
}
/**
 * Игра показывает игроку VGUI-меню (выбор команды).
 *
 * Pawn: `RG_ShowVGUIMenu` (const index, VGUIMenu:menuType, const bitsSlots, szOldMenu[])
 */
export declare class ShowVguiMenuEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Показываемое меню, например "team", "classT", "classCT", "buy", "buyPistol".
     *
     * Pawn: `VGUIMenu:menuType`
     */
    get menu(): VguiMenu;
    set menu(value: VguiMenu);
    /**
     * Аргумент 3.
     *
     * Pawn: `bitsSlots`
     */
    get slots(): number;
    set slots(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `szOldMenu[]`
     */
    get oldMenu(): string;
    set oldMenu(value: string);
}
/**
 * Pawn: `RG_SpawnHeadGib` (pevVictim)
 */
export declare class SpawnHeadGibEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `pevVictim`
     */
    get victim(): Player;
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CGib * (Entity index of gib))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_SpawnRandomGibs` (pevVictim, cGibs, human)
 */
export declare class SpawnRandomGibsEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `pevVictim`
     */
    get victim(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `cGibs`
     */
    get gibs(): number;
    set gibs(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `human`
     */
    get human(): number;
    set human(value: number);
}
/**
 * Включается камера погибшего игрока.
 *
 * Pawn: `RG_CBasePlayer_StartDeathCam` (const this)
 */
export declare class StartDeathCamEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, о котором событие.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `Float:vecPosition[3]`
     */
    get position(): Vector;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `Float:vecViewAngle[3]`
     */
    get viewAngle(): Vector;
}
/**
 * Сейчас прозвучит звук. Присвойте event.sample, чтобы заменить его, или вызовите preventDefault(), чтобы заглушить.
 *
 * Pawn: `RH_SV_StartSound` (const recipients, const entity, const channel, const sample[], const volume, Float:attenuation, const fFlags, const pitch)
 */
export declare class StartSoundEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `recipients`
     */
    get recipients(): number;
    set recipients(value: number);
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `entity`
     */
    get entity(): Entity;
    /**
     * Аргумент 3.
     *
     * Pawn: `channel`
     */
    get channel(): number;
    set channel(value: number);
    /**
     * Аргумент 4.
     *
     * Pawn: `sample[]`
     */
    get sample(): string;
    set sample(value: string);
    /**
     * Аргумент 5.
     *
     * Pawn: `volume`
     */
    get volume(): number;
    set volume(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `Float:attenuation`
     */
    get attenuation(): number;
    set attenuation(value: number);
    /**
     * Аргумент 7.
     *
     * Pawn: `fFlags`
     */
    get flags(): number;
    set flags(value: number);
    /**
     * Аргумент 8.
     *
     * Pawn: `pitch`
     */
    get pitch(): number;
    set pitch(value: number);
}
/**
 * Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things.
 *
 * Pawn: `RG_CBasePlayer_SwitchTeam` (const this)
 */
export declare class SwitchTeamEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Игрок сейчас получит урон. Верните число — столько он и получит, или вызовите preventDefault(), чтобы урона не было.
 *
 * Pawn: `RG_CBasePlayer_TakeDamage` (const this, pevInflictor, pevAttacker, Float:flDamage, bitsDamageType)
 */
export declare class TakeDamageEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, которого ранят.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Источник урона: оружие, граната, мир.
     *
     * Pawn: `pevInflictor`
     */
    get inflictor(): Entity;
    /**
     * Игрок, который наносит урон.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * Урон до брони. Присвойте, чтобы изменить.
     *
     * Pawn: `Float:flDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Виды урона, например "Fall", "Bullet", "Burn".
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (int)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Pawn: `RG_CBasePlayer_TakeHealth` (const this, Float:flHealth, bitsDamageType)
 */
export declare class TakeHealthEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `Float:flHealth`
     */
    get health(): number;
    set health(value: number);
    /**
     * Аргумент 3.
     *
     * Pawn: `bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (BOOL)
     */
    get result(): number;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
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
     * Аргумент 1.
     *
     * Pawn: `team_id`
     */
    get team_id(): number;
    set team_id(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar)
 *
 * Pawn: `RG_CSGameRules_TeamStacked` (newTeam_id, curTeam_id)
 */
export declare class TeamStackedEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `newTeam_id`
     */
    get newTeam_id(): number;
    set newTeam_id(value: number);
    /**
     * Аргумент 2.
     *
     * Pawn: `curTeam_id`
     */
    get curTeam_id(): number;
    set curTeam_id(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (bool)
     */
    get result(): boolean;
    /**
     * Блокирует функцию игры; цепочка отвечает false.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Called every server frame to process game rules
 *
 * Pawn: `RG_CSGameRules_Think` ()
 */
export declare class ThinkEvent extends HookEvent {
    private readonly kind;
}
/**
 * Игрок бросил флешку. В post-обработчике event.result — сама граната.
 *
 * Pawn: `RG_ThrowFlashbang` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time)
 */
export declare class ThrowFlashbangEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, который бросил гранату.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of flashbang))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игрок бросает гранату.
 *
 * Pawn: `RG_CBasePlayer_ThrowGrenade` (const this, const grenade, Float:vecSrc[3], Float:vecThrow[3], Float:time, const usEvent)
 */
export declare class ThrowGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, который бросил гранату.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2.
     *
     * Pawn: `grenade`
     */
    get grenade(): number;
    set grenade(value: number);
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Скорость гранаты, Vector. Только чтение.
     *
     * Pawn: `Float:vecThrow[3]`
     */
    get velocity(): Vector;
    /**
     * Аргумент 5.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `usEvent`
     */
    get usEvent(): number;
    set usEvent(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of grenade))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игрок бросил осколочную гранату. В post-обработчике event.result — сама граната.
 *
 * Pawn: `RG_ThrowHeGrenade` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time, const team, const usEvent)
 */
export declare class ThrowHeGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, который бросил гранату.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Точка, откуда летит граната, Vector. Только чтение.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * Скорость гранаты, Vector. Только чтение.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `team`
     */
    get team(): number;
    set team(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `usEvent`
     */
    get usEvent(): number;
    set usEvent(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of hegrenade))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Игрок бросил дымовую гранату. В post-обработчике event.result — сама граната.
 *
 * Pawn: `RG_ThrowSmokeGrenade` (const index, Float:vecStart[3], Float:vecVelocity[3], Float:time, const usEvent)
 */
export declare class ThrowSmokeGrenadeEvent extends HookEvent {
    private readonly kind;
    /**
     * Игрок, который бросил гранату.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Точка, откуда летит граната, Vector. Только чтение.
     *
     * Pawn: `Float:vecStart[3]`
     */
    get start(): Vector;
    /**
     * Скорость гранаты, Vector. Только чтение.
     *
     * Pawn: `Float:vecVelocity[3]`
     */
    get velocity(): Vector;
    /**
     * Аргумент 4.
     *
     * Pawn: `Float:time`
     */
    get time(): number;
    set time(value: number);
    /**
     * Аргумент 5.
     *
     * Pawn: `usEvent`
     */
    get usEvent(): number;
    set usEvent(value: number);
    /**
     * Ответ игры, читается в post-хуке. Чтобы ответить самому, верните значение из обработчика.
     *
     * Pawn: `GetHookChainReturn` (CGrenade * (Entity index of smokegrenade))
     */
    get result(): Entity;
    /**
     * Блокирует функцию игры; цепочка отвечает 0.
     *
     * Pawn: `HC_SUPERCEDE`
     */
    preventDefault(): void;
}
/**
 * Выстрел или нож попал в игрока, ещё до урона. preventDefault() — и попадания не было.
 *
 * Pawn: `RG_CBasePlayer_TraceAttack` (const this, pevAttacker, Float:flDamage, Float:vecDir[3], tracehandle, bitsDamageType)
 */
export declare class TraceAttackEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `pevAttacker`
     */
    get attacker(): Player;
    /**
     * Аргумент 3.
     *
     * Pawn: `Float:flDamage`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Направление выстрела, Vector. Только чтение.
     *
     * Pawn: `Float:vecDir[3]`
     */
    get dir(): Vector;
    /**
     * Аргумент 5.
     *
     * Pawn: `tracehandle`
     */
    get tracehandle(): number;
    set tracehandle(value: number);
    /**
     * Аргумент 6.
     *
     * Pawn: `bitsDamageType`
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `index`
     */
    get player(): Player;
    /**
     * Аргумент 2, только чтение.
     *
     * Pawn: `inflictor`
     */
    get inflictor(): Entity;
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `attacker`
     */
    get attacker(): Player;
    /**
     * Аргумент 4, только чтение.
     *
     * Pawn: `Float:vecSrc[3]`
     */
    get src(): Vector;
    /**
     * Аргумент 5, только чтение.
     *
     * Pawn: `Float:vecSpot[3]`
     */
    get spot(): Vector;
    /**
     * Аргумент 6.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CBasePlayer_UpdateClientData` (const this)
 */
export declare class UpdateClientDataEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Called when a player press use and if a suitable candidate is not found.
 *
 * Pawn: `RG_CBasePlayer_UseEmpty` (const this)
 */
export declare class UseEmptyEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
     *
     * Pawn: `this`
     */
    get player(): Player;
}
/**
 * Pawn: `RG_CGib_WaitTillLand` (const this)
 */
export declare class WaitTillLandEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1, только чтение.
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
     * Аргумент 1, только чтение.
     *
     * Pawn: `playerIndex`
     */
    get player(): Player;
}
/**
 * Receiver is player index or 0 when update will be sended to all.
 *
 * Pawn: `RH_SV_WriteFullClientUpdate` (const client, buffer, const receiver)
 */
export declare class WriteFullClientUpdateEvent extends HookEvent {
    private readonly kind;
    /**
     * Аргумент 1.
     *
     * Pawn: `client`
     */
    get client(): number;
    set client(value: number);
    /**
     * Аргумент 2.
     *
     * Pawn: `buffer`
     */
    get buffer(): number;
    set buffer(value: number);
    /**
     * Аргумент 3, только чтение.
     *
     * Pawn: `receiver`
     */
    get receiver(): Player;
}
/**
 * Every reapi hookchain, by the name game.addEventListener takes - the event
 * it hands the listener. What an editor completes; the compiler reads it
 * through the same patch as ServerEventMap (runtime/patches).
 */
export interface GameEventMap {
    /** Pawn: `RH_SV_ActivateServer` */
    activateServer: ActivateServerEvent;
    /**
     * У игрока меняются деньги. Присвойте event.amount, чтобы изменить сумму.
     *
     * Pawn: `RG_CBasePlayer_AddAccount`
     */
    addAccount: AddAccountEvent;
    /**
     * Called inside TraceAttack to store entity damage to multidamage data
     *
     * Pawn: `RG_AddMultiDamage`
     */
    addMultiDamage: AddMultiDamageEvent;
    /** Pawn: `RG_CBasePlayer_AddPlayerItem` */
    addPlayerItem: AddPlayerItemEvent;
    /** Pawn: `RG_CBasePlayer_AddPoints` */
    addPoints: AddPointsEvent;
    /** Pawn: `RG_CBasePlayer_AddPointsToTeam` */
    addPointsToTeam: AddPointsToTeamEvent;
    /**
     * Файл добавляется в то, что скачивают клиенты.
     *
     * Pawn: `RH_SV_AddResource`
     */
    addResource: AddResourceEvent;
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
    /** Pawn: `RG_CSGameRules_BalanceTeams` */
    balanceTeams: BalanceTeamsEvent;
    /** Pawn: `RG_CBasePlayer_Duck` */
    basePlayerDuck: BasePlayerDuckEvent;
    /** Pawn: `RG_CBasePlayer_Jump` */
    basePlayerJump: BasePlayerJumpEvent;
    /** Pawn: `RG_CBasePlayer_Spawn` */
    basePlayerSpawn: BasePlayerSpawnEvent;
    /** Pawn: `RG_CBasePlayer_Blind` */
    blind: BlindEvent;
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
     * Игрок покупает оружие. В post-обработчике event.result — само оружие.
     *
     * Pawn: `RG_BuyWeaponByWeaponID`
     */
    buyWeaponByWeaponId: BuyWeaponByWeaponIdEvent;
    /** Pawn: `RG_CBasePlayerWeapon_CanDeploy` */
    canDeploy: CanDeployEvent;
    /**
     * The player is touching a CBasePlayerItem, do I give it to him?
     *
     * Pawn: `RG_CSGameRules_CanHavePlayerItem`
     */
    canHavePlayerItem: CanHavePlayerItemEvent;
    /**
     * Игра спрашивает, слышит ли один игрок другого в голосовом чате. Верните true или false, чтобы решить.
     *
     * Pawn: `RG_CSGameRules_CanPlayerHearPlayer`
     */
    canPlayerHearPlayer: CanPlayerHearPlayerEvent;
    /**
     * Игра спрашивает, можно ли игроку перейти в команду. Верните true или false, чтобы решить.
     *
     * Pawn: `RG_CBasePlayer_CanSwitchTeam`
     */
    canSwitchTeam: CanSwitchTeamEvent;
    /** Pawn: `RG_CSGameRules_ChangeLevel` */
    changeLevel: ChangeLevelEvent;
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
     * Игра проверяет, не победила ли какая-то сторона. preventDefault() не даст ей закончить раунд.
     *
     * Pawn: `RG_CSGameRules_CheckWinConditions`
     */
    checkWinConditions: CheckWinConditionsEvent;
    /** Pawn: `RG_HandleMenu_ChooseAppearance` */
    chooseAppearance: ChooseAppearanceEvent;
    /**
     * Игрок выбрал пункт в меню команд. preventDefault() — и выбор не засчитается.
     *
     * Pawn: `RG_HandleMenu_ChooseTeam`
     */
    chooseTeam: ChooseTeamEvent;
    /** Pawn: `RG_CBasePlayer_Classify` */
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
     * What do I do with player's weapons when he's killed?
     *
     * Pawn: `RG_CSGameRules_DeadPlayerWeapons`
     */
    deadPlayerWeapons: DeadPlayerWeaponsEvent;
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
     * Оружие достают. Присвойте event.viewModel / weaponModel, чтобы поменять модель.
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
    /** Pawn: `RH_Cvar_DirectSet` */
    directSet: DirectSetEvent;
    /**
     * VIP player got to the point of rescue.
     *
     * Pawn: `RG_CBasePlayer_Disappear`
     */
    disappear: DisappearEvent;
    /** Pawn: `RH_SV_DropClient` */
    dropClient: DropClientEvent;
    /**
     * Called when a idle player is removed from server.
     *
     * Pawn: `RG_CBasePlayer_DropIdlePlayer`
     */
    dropIdlePlayer: DropIdlePlayerEvent;
    /**
     * Игрок выбрасывает оружие. В post-обработчике event.result — коробка с оружием на земле.
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
     * Дымовая граната взрывается.
     *
     * Pawn: `RG_CGrenade_ExplodeSmokeGrenade`
     */
    explodeSmokeGrenade: ExplodeSmokeGrenadeEvent;
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
     * Should the player switch to this weapon?
     *
     * Pawn: `RG_CSGameRules_FShouldSwitchWeapon`
     */
    fShouldSwitchWeapon: FShouldSwitchWeaponEvent;
    /** Pawn: `RG_CBaseEntity_FireBuckshots` */
    fireBuckshots: FireBuckshotsEvent;
    /** Pawn: `RG_CBaseEntity_FireBullets` */
    fireBullets: FireBulletsEvent;
    /** Pawn: `RG_CBaseEntity_FireBullets3` */
    fireBullets3: FireBullets3Event;
    /**
     * Игра считает урон от падения. В post-обработчике event.result — это число; верните своё, чтобы заменить его.
     *
     * Pawn: `RG_CSGameRules_FlPlayerFallDamage`
     */
    flPlayerFallDamage: FlPlayerFallDamageEvent;
    /**
     * Called when an entity is removed (freed from server).
     *
     * Pawn: `RH_ED_Free`
     */
    free: FreeEvent;
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
    /** Pawn: `RG_CGib_Spawn` */
    gibSpawn: GibSpawnEvent;
    /** Pawn: `RG_CBasePlayer_GiveAmmo` */
    giveAmmo: GiveAmmoEvent;
    /** Pawn: `RG_CSGameRules_GiveC4` */
    giveC4: GiveC4Event;
    /**
     * Игра выдаёт появившемуся игроку стандартное оружие. preventDefault() — и не выдаст ничего.
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
     * Игра спрашивает, запрещён ли игроку предмет. Верните true, чтобы запретить.
     *
     * Pawn: `RG_CBasePlayer_HasRestrictItem`
     */
    hasRestrictItem: HasRestrictItemEvent;
    /**
     * Игра показывает игроку подсказку.
     *
     * Pawn: `RG_CBasePlayer_HintMessageEx`
     */
    hintMessageEx: HintMessageExEvent;
    /**
     * Игрок отправляет impulse: 100 — фонарик, 201 — спрей.
     *
     * Pawn: `RG_CBasePlayer_ImpulseCommands`
     */
    impulseCommands: ImpulseCommandsEvent;
    /**
     * Called when a player hit to entity.
     *
     * Pawn: `RG_IsPenetrableEntity`
     */
    isPenetrableEntity: IsPenetrableEntityEvent;
    /**
     * Called every client frame (PlayerPostThink) for the player's active weapon
     *
     * Pawn: `RG_CBasePlayerWeapon_ItemPostFrame`
     */
    itemPostFrame: ItemPostFrameEvent;
    /**
     * Called when a client "thinks for the join status".
     *
     * Pawn: `RG_CBasePlayer_JoiningThink`
     */
    joiningThink: JoiningThinkEvent;
    /**
     * Called whenever player fires a weapon and shakes player screen (punchangles altering)
     *
     * Pawn: `RG_CBasePlayerWeapon_KickBack`
     */
    kickBack: KickBackEvent;
    /** Pawn: `RG_CBasePlayer_Killed` */
    killed: KilledEvent;
    /**
     * Called when a player is on a ladder.
     *
     * Pawn: `RG_PM_LadderMove`
     */
    ladderMove: LadderMoveEvent;
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
    /** Pawn: `RG_PM_Move` */
    move: MoveEvent;
    /** Pawn: `RG_CBasePlayer_ObjectCaps` */
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
     * Игра сообщает ботам, что что-то произошло.
     *
     * Pawn: `RG_CBotManager_OnEvent`
     */
    onEvent: OnEventEvent;
    /**
     * Закончилось время заморозки в начале раунда.
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
     * Called when a client emits a "pain sound" after received damage.
     *
     * Pawn: `RG_CBasePlayer_Pain`
     */
    pain: PainEvent;
    /**
     * Called when a player plant's the bomb on the ground.
     *
     * Pawn: `RG_PlantBomb`
     */
    plantBomb: PlantBombEvent;
    /**
     * Called whenever player emits an step sound
     *
     * Pawn: `RG_PM_PlayStepSound`
     */
    playStepSound: PlayStepSoundEvent;
    /**
     * Флешка ослепляет игрока. preventDefault() — и он ничего не заметит.
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
     * Игрока убили.
     *
     * Pawn: `RG_CSGameRules_PlayerKilled`
     */
    playerKilled: PlayerKilledEvent;
    /**
     * Игрок появился на карте (спавн).
     *
     * Pawn: `RG_CSGameRules_PlayerSpawn`
     */
    playerSpawn: PlayerSpawnEvent;
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
    /** Pawn: `RG_CBasePlayer_PostThink` */
    postThink: PostThinkEvent;
    /**
     * Кадр игрока, до его движения: каждый кадр для каждого игрока, сотни раз в секунду. Обработчик должен быть очень лёгким.
     *
     * Pawn: `RG_CBasePlayer_PreThink`
     */
    preThink: PreThinkEvent;
    /** Pawn: `RG_CBasePlayer_Precache` */
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
     * Called when a message is being sent to the server's console.
     *
     * Pawn: `RH_Con_Printf`
     */
    printf: PrintfEvent;
    /**
     * Отправляется радиосообщение. preventDefault() заглушит его.
     *
     * Pawn: `RG_CBasePlayer_Radio`
     */
    radio: RadioEvent;
    /** Pawn: `RG_CBasePlayer_RemoveAllItems` */
    removeAllItems: RemoveAllItemsEvent;
    /** Pawn: `RG_CSGameRules_RemoveGuns` */
    removeGuns: RemoveGunsEvent;
    /** Pawn: `RG_CBasePlayer_RemovePlayerItem` */
    removePlayerItem: RemovePlayerItemEvent;
    /**
     * Called when a player's remove protection.
     *
     * Pawn: `RG_CBasePlayer_RemoveSpawnProtection`
     */
    removeSpawnProtection: RemoveSpawnProtectionEvent;
    /**
     * Игра сбрасывает скорость игрока — при спавне и при каждой смене оружия. preventDefault() оставит скорость, которую вы задали.
     *
     * Pawn: `RG_CBasePlayer_ResetMaxSpeed`
     */
    resetMaxSpeed: ResetMaxSpeedEvent;
    /** Pawn: `RG_CBaseAnimating_ResetSequenceInfo` */
    resetSequenceInfo: ResetSequenceInfoEvent;
    /**
     * Начинается новый раунд.
     *
     * Pawn: `RG_CSGameRules_RestartRound`
     */
    restartRound: RestartRoundEvent;
    /**
     * Раунд заканчивается.
     *
     * Pawn: `RG_RoundEnd`
     */
    roundEnd: RoundEndEvent;
    /** Pawn: `RG_CBasePlayer_RoundRespawn` */
    roundRespawn: RoundRespawnEvent;
    /**
     * Игра сообщает всем, кто кого убил.
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
     * Called whenever game sends an animation to his current holder (player)
     *
     * Pawn: `RG_CBasePlayerWeapon_SendWeaponAnim`
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
     * Called when a player's set protection.
     *
     * Pawn: `RG_CBasePlayer_SetSpawnProtection`
     */
    setSpawnProtection: SetSpawnProtectionEvent;
    /**
     * Игра показывает игроку меню.
     *
     * Pawn: `RG_ShowMenu`
     */
    showMenu: ShowMenuEvent;
    /**
     * Игра показывает игроку VGUI-меню (выбор команды).
     *
     * Pawn: `RG_ShowVGUIMenu`
     */
    showVguiMenu: ShowVguiMenuEvent;
    /** Pawn: `RG_SpawnHeadGib` */
    spawnHeadGib: SpawnHeadGibEvent;
    /** Pawn: `RG_SpawnRandomGibs` */
    spawnRandomGibs: SpawnRandomGibsEvent;
    /**
     * Включается камера погибшего игрока.
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
     * Сейчас прозвучит звук. Присвойте event.sample, чтобы заменить его, или вызовите preventDefault(), чтобы заглушить.
     *
     * Pawn: `RH_SV_StartSound`
     */
    startSound: StartSoundEvent;
    /**
     * Called when a player goes switch to opposite team after auto-teambalance or caused by 3rd-party things.
     *
     * Pawn: `RG_CBasePlayer_SwitchTeam`
     */
    switchTeam: SwitchTeamEvent;
    /**
     * Игрок сейчас получит урон. Верните число — столько он и получит, или вызовите preventDefault(), чтобы урона не было.
     *
     * Pawn: `RG_CBasePlayer_TakeDamage`
     */
    takeDamage: TakeDamageEvent;
    /** Pawn: `RG_CBasePlayer_TakeHealth` */
    takeHealth: TakeHealthEvent;
    /**
     * Called each time player tries to join a team to ensure availability
     *
     * Pawn: `RG_CSGameRules_TeamFull`
     */
    teamFull: TeamFullEvent;
    /**
     * Called each time player tries to join a team to ensure a fair distribution of players (based on mp_limitteams cvar)
     *
     * Pawn: `RG_CSGameRules_TeamStacked`
     */
    teamStacked: TeamStackedEvent;
    /**
     * Called every server frame to process game rules
     *
     * Pawn: `RG_CSGameRules_Think`
     */
    think: ThinkEvent;
    /**
     * Игрок бросил флешку. В post-обработчике event.result — сама граната.
     *
     * Pawn: `RG_ThrowFlashbang`
     */
    throwFlashbang: ThrowFlashbangEvent;
    /**
     * Игрок бросает гранату.
     *
     * Pawn: `RG_CBasePlayer_ThrowGrenade`
     */
    throwGrenade: ThrowGrenadeEvent;
    /**
     * Игрок бросил осколочную гранату. В post-обработчике event.result — сама граната.
     *
     * Pawn: `RG_ThrowHeGrenade`
     */
    throwHeGrenade: ThrowHeGrenadeEvent;
    /**
     * Игрок бросил дымовую гранату. В post-обработчике event.result — сама граната.
     *
     * Pawn: `RG_ThrowSmokeGrenade`
     */
    throwSmokeGrenade: ThrowSmokeGrenadeEvent;
    /**
     * Выстрел или нож попал в игрока, ещё до урона. preventDefault() — и попадания не было.
     *
     * Pawn: `RG_CBasePlayer_TraceAttack`
     */
    traceAttack: TraceAttackEvent;
    /** Pawn: `RG_RadiusFlash_TraceLine` */
    traceLine: TraceLineEvent;
    /**
     * Called whenever player tries to unduck
     *
     * Pawn: `RG_PM_UnDuck`
     */
    unDuck: UnDuckEvent;
    /** Pawn: `RG_CBasePlayer_UpdateClientData` */
    updateClientData: UpdateClientDataEvent;
    /**
     * Called when a player press use and if a suitable candidate is not found.
     *
     * Pawn: `RG_CBasePlayer_UseEmpty`
     */
    useEmpty: UseEmptyEvent;
    /** Pawn: `RG_CGib_WaitTillLand` */
    waitTillLand: WaitTillLandEvent;
    /**
     * Called on every frame after a player jumps on water for a short period of time
     *
     * Pawn: `RG_PM_WaterJump`
     */
    waterJump: WaterJumpEvent;
    /**
     * Receiver is player index or 0 when update will be sended to all.
     *
     * Pawn: `RH_SV_WriteFullClientUpdate`
     */
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
