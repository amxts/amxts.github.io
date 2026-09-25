/// <reference path="../as-types.d.ts" />
/** A family's names and the bit each stands for, in the same order. */
export declare class FlagFamily {
    names: string[];
    bits: i32[];
    constructor(names: string[], bits: i32[]);
    bitOf(name: string): i32;
    /** The names set in a mask. */
    namesOf(mask: i32): string[];
    /** A list of names as the mask Pawn wants. */
    maskOf<T>(names: T[]): i32;
}
/**
 * Where a mask lives: an entvar, a member, a hookchain argument.
 *
 * A FlagList cannot capture the entity and field it came from - a closure that
 * captures is AS100 - so what it holds is one of these, and `push` goes back
 * through it.
 */
export declare abstract class FlagStore {
    abstract read(): i32;
    abstract write(mask: i32): void;
}
/** A mask in an entvar - var_flags, var_effects, var_button. */
export declare class EntvarFlags extends FlagStore {
    private entity;
    private field;
    constructor(entity: i32, field: i32);
    read(): i32;
    write(mask: i32): void;
}
/** A mask in a game member - m_iHideHUD. */
export declare class MemberFlags extends FlagStore {
    private entity;
    private field;
    constructor(entity: i32, field: i32);
    read(): i32;
    write(mask: i32): void;
}
/**
 * The flags a mask holds, as an array of names.
 *
 * `push` sets the bit where the mask lives as well, so
 * `player.hideHud.push("Money")` hides the money. Everything else is a plain
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
export type HideHud = "Weapons" | "Flashlight" | "All" | "Health" | "Timer" | "Money" | "Crosshair" | "ObserverCrosshair";
/** The HideHud names and their bits, for the hood. */
export declare const HIDE_HUD: FlagFamily;
/** Buttons a player holds - var_button, var_oldbuttons. */
export type Button = "Attack" | "Jump" | "Duck" | "Forward" | "Back" | "Use" | "Cancel" | "Left" | "Right" | "MoveLeft" | "MoveRight" | "Attack2" | "Run" | "Reload" | "Alt1" | "Score";
/** The Button names and their bits, for the hood. */
export declare const BUTTON: FlagFamily;
/** Visual effects on an entity - var_effects. */
export type Effect = "BrightField" | "MuzzleFlash" | "BrightLight" | "DimLight" | "InvLight" | "NoInterp" | "Light" | "NoDraw" | "ForceVisibility" | "OwnerVisibility" | "OwnerNoVisibility" | "NoSlerp" | "FollowKeepRender";
/** The Effect names and their bits, for the hood. */
export declare const EFFECT: FlagFamily;
/** Engine flags of an entity - var_flags. */
export type EntityFlag = "Fly" | "Swim" | "Conveyor" | "Client" | "InWater" | "Monster" | "GodMode" | "NoTarget" | "SkipLocalHost" | "OnGround" | "PartialGround" | "WaterJump" | "Frozen" | "FakeClient" | "Ducking" | "Float" | "Graphed" | "ImmuneWater" | "ImmuneSlime" | "ImmuneLava" | "Proxy" | "AlwaysThink" | "BaseVelocity" | "MonsterClip" | "OnTrain" | "WorldBrush" | "Spectator" | "CustomEntity" | "KillMe" | "Dormant";
/** The EntityFlag names and their bits, for the hood. */
export declare const ENTITY_FLAG: FlagFamily;
/** Kinds of damage - the damage type a hook receives. */
export type Damage = "Crush" | "Bullet" | "Slash" | "Burn" | "Freeze" | "Fall" | "Blast" | "Club" | "Shock" | "Sonic" | "EnergyBeam" | "NeverGib" | "AlwaysGib" | "Drown" | "Paralyze" | "NerveGas" | "Poison" | "Radiation" | "DrownRecover" | "Acid" | "SlowBurn" | "SlowFreeze" | "Mortar" | "Grenade";
/** The Damage names and their bits, for the hood. */
export declare const DAMAGE: FlagFamily;
/** What an admin may do - get_user_flags, users.ini letters. */
export type Access = "Immunity" | "Reservation" | "Kick" | "Ban" | "Slay" | "Map" | "Cvar" | "Cfg" | "Chat" | "Vote" | "Password" | "Rcon" | "LevelA" | "LevelB" | "LevelC" | "LevelD" | "LevelE" | "LevelF" | "LevelG" | "LevelH" | "Menu" | "BanTemp" | "Admin" | "User";
/** The Access names and their bits, for the hood. */
export declare const ACCESS: FlagFamily;
