/// <reference path="../as-types.d.ts" />
/** A family's names and the bit each stands for, in the same order. */
export declare class FlagFamily {
    names: string[];
    bits: i32[];
    constructor(names: string[], bits: i32[]);
    bitOf(name: string): i32;
    /** The names set in a mask. */
    namesOf(mask: i32): string[];
    /** Every bit the family names, as one mask. */
    get all(): i32;
    /** A list of names as the mask Pawn wants. */
    maskOf<T>(names: T[]): i32;
}
/**
 * Where a mask lives: an entvar, a member, a hookchain argument.
 *
 * A FlagList holds the entity and field it came from as one of these, and
 * `push` goes back through it.
 */
export declare abstract class FlagStore {
    abstract read(): i32;
    abstract write(mask: i32): void;
}
/** A mask in an entvar - var_flags, var_effects, var_button - at its offset in entvars_t. */
export declare class EntvarFlags extends FlagStore {
    private entity;
    private offset;
    constructor(entity: i32, offset: i32);
    read(): i32;
    write(mask: i32): void;
}
/** A mask in a game member - m_iHideHUD - by its place in entities.ts's member table. */
export declare class MemberFlags extends FlagStore {
    private entity;
    private member;
    constructor(entity: i32, member: i32);
    read(): i32;
    write(mask: i32): void;
}
/**
 * The flags a mask holds, as an array of names.
 *
 * `push` sets the bit where the mask lives as well, so
 * `player.hideHud.push("money")` hides the money. Everything else is a plain
 * array: `includes`, `filter`, `length`, a for loop. To take flags away,
 * assign the array back - `player.hideHud = player.hideHud.filter(...)`.
 */
export declare class FlagList<T> extends Array<T> {
    store: FlagStore | null;
    family: FlagFamily | null;
    push(value: T): i32;
}
/** The names set in the mask `store` holds now, as a list that writes back. */
export declare function flagList<T>(store: FlagStore, family: FlagFamily): FlagList<T>;
/** Parts of the HUD a player does not see - m_iHideHUD. */
export type HideHud = "weapons" | "flashlight" | "all" | "health" | "timer" | "money" | "crosshair" | "observerCrosshair";
/** The HideHud names and their bits, for the hood. */
export declare const HIDE_HUD: FlagFamily;
/** Buttons a player holds - var_button, var_oldbuttons. */
export type Button = "attack" | "jump" | "duck" | "forward" | "back" | "use" | "cancel" | "left" | "right" | "moveLeft" | "moveRight" | "attack2" | "run" | "reload" | "alt1" | "score";
/** The Button names and their bits, for the hood. */
export declare const BUTTON: FlagFamily;
/** Visual effects on an entity - var_effects. */
export type Effect = "brightField" | "muzzleFlash" | "brightLight" | "dimLight" | "invLight" | "noInterp" | "light" | "noDraw" | "forceVisibility" | "ownerVisibility" | "ownerNoVisibility" | "noSlerp" | "followKeepRender";
/** The Effect names and their bits, for the hood. */
export declare const EFFECT: FlagFamily;
/** Engine flags of an entity - var_flags. */
export type EntityFlag = "fly" | "swim" | "conveyor" | "client" | "inWater" | "monster" | "godMode" | "noTarget" | "skipLocalHost" | "onGround" | "partialGround" | "waterJump" | "frozen" | "fakeClient" | "ducking" | "float" | "graphed" | "immuneWater" | "immuneSlime" | "immuneLava" | "proxy" | "alwaysThink" | "baseVelocity" | "monsterClip" | "onTrain" | "worldBrush" | "spectator" | "customEntity" | "killMe" | "dormant";
/** The EntityFlag names and their bits, for the hood. */
export declare const ENTITY_FLAG: FlagFamily;
/** Kinds of damage - the damage type a hook receives. */
export type Damage = "crush" | "bullet" | "slash" | "burn" | "freeze" | "fall" | "blast" | "club" | "shock" | "sonic" | "energyBeam" | "neverGib" | "alwaysGib" | "drown" | "paralyze" | "nerveGas" | "poison" | "radiation" | "drownRecover" | "acid" | "slowBurn" | "slowFreeze" | "mortar" | "grenade";
/** The Damage names and their bits, for the hood. */
export declare const DAMAGE: FlagFamily;
/** What an admin may do - get_user_flags, users.ini letters. */
export type Access = "immunity" | "reservation" | "kick" | "ban" | "slay" | "map" | "cvar" | "cfg" | "chat" | "vote" | "password" | "rcon" | "levelA" | "levelB" | "levelC" | "levelD" | "levelE" | "levelF" | "levelG" | "levelH" | "menu" | "banTemp" | "admin" | "user";
/** The Access names and their bits, for the hood. */
export declare const ACCESS: FlagFamily;
/** What the scoreboard shows beside a player - the ScoreAttrib message: dead, the bomb, the VIP, a defuse kit. */
export type ScoreStatus = "dead" | "bomb" | "vip" | "defuseKit";
/** The ScoreStatus names and their bits, for the hood. */
export declare const SCORE_STATUS: FlagFamily;
/** Modes a weapon is in - m_iWeaponState: a silencer on, burst fire, the shield drawn. */
export type WeaponState = "uspSilenced" | "glock18Burst" | "m4a1Silenced" | "eliteLeft" | "famasBurst" | "shieldDrawn";
/** The WeaponState names and their bits, for the hood. */
export declare const WEAPON_STATE: FlagFamily;
/** The physics state of a player - m_afPhysicsFlags: on a ladder, on a train, ducking. */
export type PhysicsFlag = "onLadder" | "onTrain" | "onBarnacle" | "ducking" | "using" | "observer";
/** The PhysicsFlag names and their bits, for the hood. */
export declare const PHYSICS_FLAG: FlagFamily;
