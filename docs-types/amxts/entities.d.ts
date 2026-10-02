/// <reference path="../as-types.d.ts" />
import { ActionOptions, Player, RoundWinner, SoundOptions, UseType, WeaponName } from "./facade";
import { Vector } from "./vector";
import { EntityFlag, Effect, Button, HideHud, Damage, PhysicsFlag, WeaponState } from "./flags";
/** An entvar's cell: a whole number, or a Float's bits. */
declare function entvarCell(id: number, offset: i32): i32;
/** Writes an entvar's cell: a whole number, or a Float's bits. */
declare function setEntvarCell(id: number, offset: i32, cell: i32): void;
/** A member's cell: a whole number, a Float's bits, an entity's index; an array member's element. */
declare function memberCell(id: number, at: i32, element?: i32): i32;
declare function setMemberCell(id: number, at: i32, cell: i32, element?: i32): void;
export { entvarCell as __entvarCell, setEntvarCell as __setEntvarCell, memberCell as __memberCell, setMemberCell as __setMemberCell };
/**
 * An entity's render mode - `entity.renderMode`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `kRender*`
 */
export type RenderMode = "normal" | "color" | "texture" | "glow" | "alpha" | "additive" | "unknown";
/**
 * A render effect of an entity - `entity.renderFx`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `kRenderFx*`
 */
export type RenderFx = "none" | "pulseSlow" | "pulseFast" | "pulseSlowWide" | "pulseFastWide" | "fadeSlow" | "fadeFast" | "solidSlow" | "solidFast" | "strobeSlow" | "strobeFast" | "strobeFaster" | "flickerSlow" | "flickerFast" | "noDissipation" | "distort" | "hologram" | "deadPlayer" | "explode" | "glowShell" | "clampMinScale" | "lightMultiplier" | "unknown";
/**
 * An entity's kind of movement - `entity.moveType`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `MOVETYPE_*`
 */
export type MoveType = "none" | "walk" | "step" | "fly" | "toss" | "push" | "noclip" | "flyMissile" | "bounce" | "bounceMissile" | "follow" | "pushStep" | "unknown";
/**
 * An entity's solidity - `entity.solid`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `SOLID_*`
 */
export type Solid = "none" | "trigger" | "box" | "slideBox" | "bsp" | "unknown";
/**
 * An entity's vulnerability - `entity.takeDamage`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `DAMAGE_*`
 */
export type TakeDamage = "no" | "yes" | "aim" | "unknown";
/**
 * An entity's stage of dying - `entity.deadFlag`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `DEAD_*`
 */
export type DeadFlag = "alive" | "dying" | "dead" | "respawnable" | "discardBody" | "unknown";
/**
 * An entity's depth in water - `entity.waterLevel`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `pev->waterlevel`
 */
export type WaterLevel = "none" | "feet" | "waist" | "head" | "unknown";
/**
 * The contents of a point of the map: air, water, a wall - `entity.waterType`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `CONTENTS_*`
 */
export type Contents = "empty" | "solid" | "water" | "slime" | "lava" | "sky" | "origin" | "clip" | "current0" | "current90" | "current180" | "current270" | "currentUp" | "currentDown" | "translucent" | "ladder" | "unknown";
/**
 * A player's view snap - `player.fixAngle`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `pev->fixangle`
 */
export type FixAngle = "none" | "set" | "addYaw" | "unknown";
/**
 * A body part a bullet hits - `player.lastHitGroup`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `HITGROUP_*`
 */
export type HitGroup = "generic" | "head" | "chest" | "stomach" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg" | "shield" | "unknown";
/**
 * A player's armour kind - `player.kevlar`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `ARMOR_*`
 */
export type ArmorType = "none" | "vest" | "vestHelmet" | "unknown";
/**
 * A player's spectator mode - `player.observerMode`, `player.observerLastMode`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `OBS_*`
 */
export type ObserverMode = "none" | "chaseLocked" | "chaseFree" | "roaming" | "inEye" | "mapFree" | "mapChase" | "unknown";
/**
 * A player's stage of joining the game - `player.joiningState`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `JoinState`
 */
export type JoinState = "joined" | "showMotd" | "readingMotd" | "showTeamSelect" | "pickingTeam" | "getIntoGame" | "unknown";
/**
 * A player's model - `player.modelName`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `MODEL_*`
 */
export type PlayerModel = "unassigned" | "urban" | "terror" | "leet" | "arctic" | "gsg9" | "gign" | "sas" | "guerilla" | "vip" | "militia" | "spetsnaz" | "auto" | "unknown";
/**
 * The chat a player hides - `player.ignoreGlobalChat`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `IGNOREMSG_*`
 */
export type IgnoredChat = "none" | "enemy" | "all" | "unknown";
/**
 * An old-style menu of the game - `player.openMenu`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `Menu_*`
 */
export type GameMenu = "none" | "team" | "teamInGame" | "appearance" | "buy" | "buyPistol" | "buyRifle" | "buyMachineGun" | "buyShotgun" | "buySubMachineGun" | "buyItem" | "radio1" | "radio2" | "radio3" | "clientBuy" | "unknown";
/**
 * The way a dead player's body is thrown - `player.throwDirection`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `CS_THROW_*`
 */
export type ThrowDirection = "none" | "forward" | "backward" | "hitVelocity" | "bomb" | "grenade" | "hitVelocityMinusAir" | "unknown";
/**
 * The colour of an entity's blood - `player.bloodColor`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `BLOOD_COLOR_*`
 */
export type BloodColor = "none" | "red" | "yellow" | "unknown";
/**
 * A Condition Zero music state - `player.musicState`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `MusicState`
 */
export type MusicState = "silent" | "calm" | "intense" | "unknown";
/**
 * Whether the map has a VIP safety zone - `game.mapHasVipSafetyZone`.
 *
 * "unknown" - a number no name stands for (a Pawn plugin or a mod wrote it); writing "unknown" leaves the field as it is.
 *
 * Pawn: `MAP_HAVE_VIP_SAFETYZONE_*`
 */
export type VipSafetyZone = "notChecked" | "yes" | "no" | "unknown";
/**
 * Which entities `Entity.findAll` returns. Every field is optional, and an
 * entity has to match all that are given:
 * `Entity.findAll({ classname: "info_target", near: player.origin, radius: 200 })`.
 */
export interface EntityFilter {
    classname?: string;
    /** The model, as the entity has it: "models/w_c4.mdl". */
    model?: string;
    /** Whose it is: a grenade's thrower, a weapon's carrier - `{ owner: player }`. */
    owner?: Entity;
    /** Only those whose origin is within `radius` units of here. */
    near?: number[];
    radius?: number;
}
/** Any entity: its entvars, typed. */
export declare class Entity {
    id: number;
    constructor(id: number);
    /** A new entity of this class, or null if the engine could not make one. */
    static create(classname: string): Entity | null;
    /** Every entity that matches the filter; with no filter, every entity there is. */
    static findAll(filter?: EntityFilter): Entity[];
    /** The first entity that matches, or null. */
    static find(filter?: EntityFilter): Entity | null;
    private static matches;
    /**
     * Removes the entity at the end of this frame (FL_KILLME), not at once.
     * remove_entity frees the edict on the spot, and one freed from inside its
     * own touch or think, or while the engine is walking the entity list, is
     * still used by the engine after it is gone. FL_KILLME is how the game's
     * own entities ask to go: the engine frees them after the frame's physics,
     * where nothing is holding them.
     */
    remove(): void;
    /**
     * `true` while the entity is in the world: `false` once the engine has freed it (`remove()` has it freed at the end of the frame), for a player who has left, and for `0`, no entity. An id that came from an event or a hook may name an entity that is gone.
     *
     * Pawn: `is_valid_ent`, `is_entity`
     */
    get exists(): bool;
    /**
     * Sets the entity's bounding box, the corners relative to its `origin`: `box.setSize([-16, -16, 0], [16, 16, 72])`. `mins`, `maxs`, `size` and where it collides follow. A box whose `mins` is above its `maxs` on any axis is refused, with an error in the console.
     *
     * Pawn: `entity_set_size`
     */
    setSize(mins: number[], maxs: number[]): void;
    /**
     * Plays a sound from the entity, heard by everyone near and fading with distance: `player.emitSound("myplugin/hit.wav")`. The path is under `sound/`, as `server.precache` takes it; `options` set the channel, the volume, the attenuation and the pitch.
     *
     * Pawn: `emit_sound`, `rh_emit_sound2`
     */
    emitSound(sample: string, options?: SoundOptions): void;
    /**
     * The entity's class name, e.g. `"player"`, `"weaponbox"`, `"grenade"`, `"func_door"`.
     *
     * Pawn: `pev->classname`
     */
    get classname(): string;
    set classname(value: string);
    /**
     * The entity's global name, which a mapper gives it to carry its state across a level change (single-player maps).
     *
     * Pawn: `pev->globalname`
     */
    get globalName(): string;
    set globalName(value: string);
    /**
     * The entity's position in the world, in units. Assigning it moves the entity properly, so its collisions move with it.
     *
     * Pawn: `pev->origin`
     */
    get origin(): Vector;
    set origin(value: number[]);
    /**
     * The entity's saved position; what it holds depends on the entity (a breakable keeps its spawn point here).
     *
     * Pawn: `pev->oldorigin`
     */
    get oldOrigin(): Vector;
    set oldOrigin(value: number[]);
    /**
     * The entity's velocity, units per second: a running player moves at about `250`.
     *
     * Pawn: `pev->velocity`
     */
    get velocity(): Vector;
    set velocity(value: number[]);
    /**
     * The extra velocity the entity gets from what it stands in — a conveyor, a `trigger_push`, a water current — on top of its own. Units per second.
     *
     * Pawn: `pev->basevelocity`
     */
    get baseVelocity(): Vector;
    set baseVelocity(value: number[]);
    /**
     * The conveyor velocity the player's client uses to predict movement; the engine zeroes it every player frame.
     *
     * Pawn: `pev->clbasevelocity`
     */
    get clBaseVelocity(): Vector;
    set clBaseVelocity(value: number[]);
    /**
     * The direction a door, a platform or a button moves in, worked out from its angles when it spawns.
     *
     * Pawn: `pev->movedir`
     */
    get moveDir(): Vector;
    set moveDir(value: number[]);
    /**
     * The entity's rotation: pitch, yaw, roll in degrees. For a player it follows where he looks; to turn his view, set it together with `fixAngle`.
     *
     * Pawn: `pev->angles`
     */
    get angles(): Vector;
    set angles(value: number[]);
    /**
     * The entity's rotation speed, degrees per second on each axis.
     *
     * Pawn: `pev->avelocity`
     */
    get angularVelocity(): Vector;
    set angularVelocity(value: number[]);
    /**
     * The player's view kick from recoil or a hit, in degrees; the engine eases it back to zero by itself.
     *
     * Pawn: `pev->punchangle`
     */
    get punchAngle(): Vector;
    set punchAngle(value: number[]);
    /**
     * The player's view direction: pitch (down is positive), yaw, roll in degrees. Players only.
     *
     * Pawn: `pev->v_angle`
     */
    get viewAngle(): Vector;
    set viewAngle(value: number[]);
    /**
     * The end point of a predicted projectile; sent to the client with `startTime` and `impactTime`.
     *
     * Pawn: `pev->endpos`
     */
    get endPos(): Vector;
    set endPos(value: number[]);
    /**
     * The start point of a predicted projectile; sent to the client with `endPos`.
     *
     * Pawn: `pev->startpos`
     */
    get startPos(): Vector;
    set startPos(value: number[]);
    /**
     * The game time a predicted projectile reaches `endPos`.
     *
     * Pawn: `pev->impacttime`
     */
    get impactTime(): number;
    set impactTime(value: number);
    /**
     * The game time a predicted projectile left `startPos`.
     *
     * Pawn: `pev->starttime`
     */
    get startTime(): number;
    set startTime(value: number);
    /**
     * The player's view snap, one of: `"none"`; `"set"` - on the next frame the view turns to `angles`; `"addYaw"` - it turns by the yaw of `angularVelocity`. The engine then puts it back to `"none"`.
     *
     * Pawn: `pev->fixangle`
     */
    get fixAngle(): FixAngle;
    set fixAngle(value: FixAngle);
    /**
     * The pitch a monster turns to, in degrees. CS does not use the field.
     *
     * Pawn: `pev->idealpitch`
     */
    get idealPitch(): number;
    set idealPitch(value: number);
    /**
     * A monster's turn speed in pitch, degrees per second. CS does not use the field.
     *
     * Pawn: `pev->pitch_speed`
     */
    get pitchSpeed(): number;
    set pitchSpeed(value: number);
    /**
     * The yaw a monster turns to, in degrees; a `momentary_rot_button` keeps its position here instead.
     *
     * Pawn: `pev->ideal_yaw`
     */
    get idealYaw(): number;
    set idealYaw(value: number);
    /**
     * A monster's turn speed, degrees per second.
     *
     * Pawn: `pev->yaw_speed`
     */
    get yawSpeed(): number;
    set yawSpeed(value: number);
    /**
     * The index of the entity's precached model; `0` draws nothing.
     *
     * Pawn: `pev->modelindex`
     */
    get modelIndex(): number;
    set modelIndex(value: number);
    /**
     * The entity's model path, e.g. `"models/w_c4.mdl"`; a map brush has its number, e.g. `"*12"`. Writing it sets the model as the game does: `modelIndex` and the size follow. The model has to be precached (`server.precache`), or the server stops.
     *
     * Pawn: `pev->model`
     */
    get model(): string;
    set model(value: string);
    /**
     * The player's first-person weapon model, the one he sees himself, e.g. `"models/v_knife.mdl"`.
     *
     * Pawn: `pev->viewmodel`
     */
    get viewModel(): number;
    set viewModel(value: number);
    /**
     * The weapon model other players see in the player's hands, e.g. `"models/p_knife.mdl"`.
     *
     * Pawn: `pev->weaponmodel`
     */
    get weaponModel(): number;
    set weaponModel(value: number);
    /**
     * The low corner of the entity's bounding box in world coordinates; the engine recomputes it when the entity moves.
     *
     * Pawn: `pev->absmin`
     */
    get absMin(): Vector;
    set absMin(value: number[]);
    /**
     * The high corner of the entity's bounding box in world coordinates; the engine recomputes it when the entity moves.
     *
     * Pawn: `pev->absmax`
     */
    get absMax(): Vector;
    set absMax(value: number[]);
    /**
     * The low corner of the entity's bounding box, relative to `origin`: `(-16, -16, -36)` for a standing player. Set it with `setSize(mins, maxs)`, so `size` and `absMin` follow.
     *
     * Pawn: `pev->mins`
     */
    get mins(): Vector;
    set mins(value: number[]);
    /**
     * The high corner of the entity's bounding box, relative to `origin`: `(16, 16, 36)` for a standing player. Set it with `setSize(mins, maxs)`, so `size` and `absMax` follow.
     *
     * Pawn: `pev->maxs`
     */
    get maxs(): Vector;
    set maxs(value: number[]);
    /**
     * The dimensions of the entity's bounding box, maxs minus mins.
     *
     * Pawn: `pev->size`
     */
    get size(): Vector;
    set size(value: number[]);
    /**
     * The local clock of a door, platform or train: it runs only while the entity moves, and its `nextThink` counts in it.
     *
     * Pawn: `pev->ltime`
     */
    get localTime(): number;
    set localTime(value: number);
    /**
     * The game time the entity's think runs next; `0` or less means never. A door, platform or train counts it in `localTime`.
     *
     * Pawn: `pev->nextthink`
     */
    get nextThink(): number;
    set nextThink(value: number);
    /**
     * The entity's kind of movement, one of: `"none"` - stands still; `"walk"` - walks (a player); `"step"` - walks as a monster; `"fly"` - flies without gravity; `"toss"` - falls; `"push"` - moves and pushes others, through the world (doors, platforms); `"noclip"` - flies through walls; `"flyMissile"` - flies like `"fly"`, hitting monsters from further away; `"bounce"` - falls and bounces; `"bounceMissile"` - bounces without gravity; `"follow"` - sticks to `aimEntity`; `"pushStep"` - a map object that collides with the world.
     *
     * Pawn: `pev->movetype`, `MOVETYPE_*`
     */
    get moveType(): MoveType;
    set moveType(value: MoveType);
    /**
     * The entity's solidity, one of: `"none"` - passes through everything; `"trigger"` - only registers touches; `"box"` - collides as a box; `"slideBox"` - collides as a player's box; `"bsp"` - collides as a map brush.
     *
     * Pawn: `pev->solid`, `SOLID_*`
     */
    get solid(): Solid;
    set solid(value: Solid);
    /**
     * The number of the skin the model is drawn with, from `0`. A map brush keeps its contents here instead: `-3` water, `-16` a ladder.
     *
     * Pawn: `pev->skin`, `CONTENTS_*`
     */
    get skin(): number;
    set skin(value: number);
    /**
     * The model's body groups: which submodels are drawn, as one number.
     *
     * Pawn: `pev->body`
     */
    get body(): number;
    set body(value: number);
    /**
     * The entity's visual effects, for example: `"NoDraw"` hides it, `"DimLight"` and `"BrightLight"` light up around it, `"MuzzleFlash"` flashes once.
     *
     * Pawn: `pev->effects`
     */
    get effects(): Effect[];
    set effects(values: Effect[]);
    /**
     * The entity's gravity multiplier: `1` is normal, `0.5` is half. `0` also counts as normal.
     *
     * Pawn: `pev->gravity`
     */
    get gravity(): number;
    set gravity(value: number);
    /**
     * The entity's friction multiplier on the ground, `1` is normal. For a bouncing entity (`moveType` `"bounce"`) it is how little it bounces: `0` bounces back at full speed.
     *
     * Pawn: `pev->friction`
     */
    get friction(): number;
    set friction(value: number);
    /**
     * The light level where the player stands, `0` (dark) to `255`, as his client reports it every frame.
     *
     * Pawn: `pev->light_level`
     */
    get lightLevel(): number;
    set lightLevel(value: number);
    /**
     * The number of the animation sequence the model plays.
     *
     * Pawn: `pev->sequence`
     */
    get sequence(): number;
    set sequence(value: number);
    /**
     * The number of the player's legs animation, played on top of `sequence`; `0` for none.
     *
     * Pawn: `pev->gaitsequence`
     */
    get gaitSequence(): number;
    set gaitSequence(value: number);
    /**
     * The playback position in the animation, `0` to `255` over the whole sequence; for a sprite, the frame number.
     *
     * Pawn: `pev->frame`
     */
    get frame(): number;
    set frame(value: number);
    /**
     * The game time the current frame was set; the client animates from it.
     *
     * Pawn: `pev->animtime`
     */
    get animTime(): number;
    set animTime(value: number);
    /**
     * The animation playback rate: `1` is normal speed, `0` freezes it, negative plays backwards.
     *
     * Pawn: `pev->framerate`
     */
    get frameRate(): number;
    set frameRate(value: number);
    /**
     * The sprite's draw scale: `1` is its normal size.
     *
     * Pawn: `pev->scale`
     */
    get scale(): number;
    set scale(value: number);
    /**
     * The entity's render mode, one of: `"normal"` - drawn as it is; `"color"` - filled with `renderColor`; `"texture"` - translucent; `"glow"` - glows and shows through walls (for sprites); `"alpha"` - translucent, with cut-out textures; `"additive"` - its light adds to what is behind it. In every mode but `"normal"`, `renderAmount` is the opacity, `0` to `255`.
     *
     * Pawn: `pev->rendermode`, `kRender*`
     */
    get renderMode(): RenderMode;
    set renderMode(value: RenderMode);
    /**
     * The entity's opacity in a transparent `renderMode`, `0` (invisible) to `255`; with the glow shell (`renderFx` `"glowShell"`), the shell's thickness.
     *
     * Pawn: `pev->renderamt`
     */
    get renderAmount(): number;
    set renderAmount(value: number);
    /**
     * The entity's render colour for `renderMode` and `renderFx`, red, green, blue from `0` to `255`: the colour of the glow shell (`renderFx` `"glowShell"`).
     *
     * Pawn: `pev->rendercolor`
     */
    get renderColor(): Vector;
    set renderColor(value: number[]);
    /**
     * The entity's render effect, one of: `"none"`; `"glowShell"` - a coloured shell around the model (colour `renderColor`, thickness `renderAmount`); `"pulseSlow"`, `"pulseFast"`, `"pulseSlowWide"`, `"pulseFastWide"` - the opacity pulses; `"fadeSlow"`, `"fadeFast"` - fades out; `"solidSlow"`, `"solidFast"` - fades in; `"strobeSlow"`, `"strobeFast"`, `"strobeFaster"`, `"flickerSlow"`, `"flickerFast"` - blinks; `"hologram"` - a flickering hologram that fades with distance; `"distort"`, `"noDissipation"`, `"deadPlayer"`, `"explode"`, `"clampMinScale"`, `"lightMultiplier"` - for sprites, corpses and special effects.
     *
     * Pawn: `pev->renderfx`, `kRenderFx*`
     */
    get renderFx(): RenderFx;
    set renderFx(value: RenderFx);
    /**
     * The entity's health: a breakable breaks and a hostage dies when damage takes it to `0` or below, e.g. `box.health = 50`. A player's is his own property, a whole number that kills him at `0`.
     *
     * Pawn: `pev->health`
     */
    get health(): number;
    set health(value: number);
    /**
     * The player's weapons, as a list of weapon kinds, e.g. [`"knife"`, `"usp"`]. Writing it does not give or take weapons, and keeps the suit the HUD needs.
     *
     * Pawn: `pev->weapons`
     */
    get weapons(): WeaponKind[];
    set weapons(values: WeaponKind[]);
    /**
     * The entity's vulnerability, one of: `"no"` - cannot be hurt (god mode); `"yes"` - can be hurt; `"aim"` - can be hurt, and aim assist targets it.
     *
     * Pawn: `pev->takedamage`, `DAMAGE_*`
     */
    get takeDamage(): TakeDamage;
    set takeDamage(value: TakeDamage);
    /**
     * The entity's stage of dying, one of: `"alive"`; `"dying"` - playing the death animation or still falling; `"dead"` - lying still; `"respawnable"` - waiting to respawn; `"discardBody"` - the body can go.
     *
     * Pawn: `pev->deadflag`, `DEAD_*`
     */
    get deadFlag(): DeadFlag;
    set deadFlag(value: DeadFlag);
    /**
     * The player's eye position relative to `origin`: `(0, 0, 17)` standing, `(0, 0, 12)` ducked.
     *
     * Pawn: `pev->view_ofs`
     */
    get viewOffset(): Vector;
    set viewOffset(value: number[]);
    /**
     * The buttons the player holds this frame, e.g. `"Attack"`, `"Jump"`, `"Duck"`, `"Use"`.
     *
     * Pawn: `pev->button`
     */
    get buttons(): Button[];
    set buttons(values: Button[]);
    /**
     * The player's impulse command: `100` is the flashlight, `201` the spray. The game clears it once it has handled it.
     *
     * Pawn: `pev->impulse`
     */
    get impulse(): number;
    set impulse(value: number);
    /**
     * The next entity in a list the engine or the game is building, like the result of a search in a sphere.
     *
     * Pawn: `pev->chain`
     */
    get chain(): number;
    set chain(value: number);
    /**
     * The entity that last hurt the player: the shooter for a bullet, a grenade, a `trigger_hurt`.
     *
     * Pawn: `pev->dmg_inflictor`
     */
    get damageInflictor(): number;
    set damageInflictor(value: number);
    /**
     * A monster's enemy: the entity it is after.
     *
     * Pawn: `pev->enemy`
     */
    get enemy(): number;
    set enemy(value: number);
    /**
     * The entity this one follows when its `moveType` is `"follow"`: it moves along with it.
     *
     * Pawn: `pev->aiment`
     */
    get aimEntity(): number;
    set aimEntity(value: number);
    /**
     * The entity's owner: a grenade's thrower, a weapon's holder. An entity does not collide with its owner.
     *
     * Pawn: `pev->owner`
     */
    get owner(): number;
    set owner(value: number);
    /**
     * The ground under the entity: the world (`0`) or another entity it stands on.
     *
     * Pawn: `pev->groundentity`
     */
    get groundEntity(): number;
    set groundEntity(value: number);
    /**
     * The entity's spawn flags, the bits a mapper ticked in the map; what each means depends on the classname.
     *
     * Pawn: `pev->spawnflags`
     */
    get spawnFlags(): number;
    set spawnFlags(value: number);
    /**
     * The entity's state flags, for example `"OnGround"`, `"Ducking"`, `"InWater"`, `"Frozen"`, `"FakeClient"` for a bot, `"KillMe"` to be removed.
     *
     * Pawn: `pev->flags`
     */
    get flags(): EntityFlag[];
    set flags(values: EntityFlag[]);
    /**
     * The player's Half-Life colours, top in the low byte and bottom in the high one; for a player the engine sets it to his index.
     *
     * Pawn: `pev->colormap`
     */
    get colorMap(): number;
    set colorMap(value: number);
    /**
     * The entity's maximum health: healing stops at it. A player gets his spawn health here, `100`.
     *
     * Pawn: `pev->max_health`
     */
    get maxHealth(): number;
    set maxHealth(value: number);
    /**
     * The player's remaining jump out of water, in milliseconds.
     *
     * Pawn: `pev->teleport_time`
     */
    get teleportTime(): number;
    set teleportTime(value: number);
    /**
     * The entity's armour points, `0` to `100` in a normal game. The kind of armour is in `kevlar`.
     *
     * Pawn: `pev->armorvalue`
     */
    get armor(): number;
    set armor(value: number);
    /**
     * The entity's depth in water, one of: `"none"` - out of the water; `"feet"` - feet in; `"waist"` - in to the waist; `"head"` - the head under.
     *
     * Pawn: `pev->waterlevel`
     */
    get waterLevel(): WaterLevel;
    set waterLevel(value: WaterLevel);
    /**
     * The contents the entity is in, one of: `"empty"` when it is not in a liquid, `"water"`, `"slime"`, `"lava"`. The other names (`"solid"`, `"sky"`, `"ladder"`, `"current0"` to `"currentDown"`, ...) are what a point of the map holds, not a liquid.
     *
     * Pawn: `pev->watertype`, `CONTENTS_*`
     */
    get waterType(): Contents;
    set waterType(value: Contents);
    /**
     * The entity's target: the `targetName` of the entities it fires when it triggers, like a button's door.
     *
     * Pawn: `pev->target`
     */
    get target(): string;
    set target(value: string);
    /**
     * The entity's own name in the map, the one other entities' target points at.
     *
     * Pawn: `pev->targetname`
     */
    get targetName(): string;
    set targetName(value: string);
    /**
     * The player's name as the engine last set it; on a map entity the meaning depends on the classname.
     *
     * Pawn: `pev->netname`
     */
    get netName(): string;
    set netName(value: string);
    /**
     * The entity's text, like a `game_text`'s or `env_message`'s; in `worldspawn`, the map's title.
     *
     * Pawn: `pev->message`
     */
    get message(): string;
    set message(value: string);
    /**
     * The damage the player took since the HUD was last told; the game zeroes it after the damage indicator is sent.
     *
     * Pawn: `pev->dmg_take`
     */
    get damageTaken(): number;
    set damageTaken(value: number);
    /**
     * The damage the player's armour absorbed since the HUD was last told; zeroed with `damageTaken`.
     *
     * Pawn: `pev->dmg_save`
     */
    get damageSaved(): number;
    set damageSaved(value: number);
    /**
     * The damage the entity deals: a grenade's blast, a `trigger_hurt`'s hit, a door that crushes.
     *
     * Pawn: `pev->dmg`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * A game time mark for damage over time and for when a grenade blows up; the meaning depends on the entity.
     *
     * Pawn: `pev->dmgtime`
     */
    get damageTime(): number;
    set damageTime(value: number);
    /**
     * A sound the entity plays, as a file path: a door's moving sound.
     *
     * Pawn: `pev->noise`
     */
    get noise(): string;
    set noise(value: string);
    /**
     * A second sound the entity plays, as a file path: a door's stop sound.
     *
     * Pawn: `pev->noise1`
     */
    get noise1(): string;
    set noise1(value: string);
    /**
     * A third sound the entity plays, as a file path.
     *
     * Pawn: `pev->noise2`
     */
    get noise2(): string;
    set noise2(value: string);
    /**
     * A fourth sound the entity plays, as a file path.
     *
     * Pawn: `pev->noise3`
     */
    get noise3(): string;
    set noise3(value: string);
    /**
     * The speed of a door, platform or train, units per second.
     *
     * Pawn: `pev->speed`
     */
    get speed(): number;
    set speed(value: number);
    /**
     * The game time the player under water runs out of air and starts to drown; the game pushes it forward while his head is above water.
     *
     * Pawn: `pev->air_finished`
     */
    get airFinished(): number;
    set airFinished(value: number);
    /**
     * The game time of the player's next pain from drowning or a `trigger_hurt`; no new pain until then.
     *
     * Pawn: `pev->pain_finished`
     */
    get painFinished(): number;
    set painFinished(value: number);
    /**
     * The game time a training-map timer runs out; nothing else in CS reads it.
     *
     * Pawn: `pev->radsuit_finished`
     */
    get radsuitFinished(): number;
    set radsuitFinished(value: number);
    /**
     * The entity these fields belong to — the entity itself.
     *
     * Pawn: `pev->pContainingEntity`
     */
    get containingEntity(): number;
    set containingEntity(value: number);
    /**
     * A mark of a glass `func_breakable`: `1` lets the client stick decals to it. Players in CS do not use it.
     *
     * Pawn: `pev->playerclass`
     */
    get playerClass(): number;
    set playerClass(value: number);
    /**
     * The player's top running speed, units per second: `250` with a knife, `221` with an AK-47. The game resets it when he switches weapons.
     *
     * Pawn: `pev->maxspeed`
     */
    get maxSpeed(): number;
    set maxSpeed(value: number);
    /**
     * The entity's field of view in degrees. On a player `fov` is his own, which the game zooms by and writes here too.
     *
     * Pawn: `pev->fov`
     */
    get fov(): number;
    set fov(value: number);
    /**
     * The number of the first-person weapon animation last played.
     *
     * Pawn: `pev->weaponanim`
     */
    get weaponAnim(): number;
    set weaponAnim(value: number);
    /**
     * A player value sent to the client; CS itself does not set it.
     *
     * Pawn: `pev->pushmsec`
     */
    get pushMsec(): number;
    set pushMsec(value: number);
    /**
     * The player's ducking mark: `1` while he is going down into a duck, before he is fully crouched.
     *
     * Pawn: `pev->bInDuck`
     */
    get inDuck(): number;
    set inDuck(value: number);
    /**
     * The time until the player's next footstep sound, in milliseconds.
     *
     * Pawn: `pev->flTimeStepSound`
     */
    get timeStepSound(): number;
    set timeStepSound(value: number);
    /**
     * The time until the player's next swimming sound, in milliseconds.
     *
     * Pawn: `pev->flSwimTime`
     */
    get swimTime(): number;
    set swimTime(value: number);
    /**
     * The player's duck in progress, in milliseconds: the engine starts it at `1000` and counts down.
     *
     * Pawn: `pev->flDuckTime`
     */
    get duckTime(): number;
    set duckTime(value: number);
    /**
     * The foot of the player's next footstep sound; it flips every step.
     *
     * Pawn: `pev->iStepLeft`
     */
    get stepLeft(): number;
    set stepLeft(value: number);
    /**
     * The player's falling speed, units per second, positive downwards; fall damage is worked out from it on landing.
     *
     * Pawn: `pev->flFallVelocity`
     */
    get fallVelocity(): number;
    set fallVelocity(value: number);
    /**
     * The player's shield state: `0` while the shield is up and takes hits, `1` while it is not.
     *
     * Pawn: `pev->gamestate`
     */
    get gameState(): number;
    set gameState(value: number);
    /**
     * The buttons the player held the frame before: compare with buttons to see what he just pressed.
     *
     * Pawn: `pev->oldbuttons`
     */
    get oldButtons(): Button[];
    set oldButtons(values: Button[]);
    /**
     * The entity's group bits: once set, traces and what is sent to a player skip entities whose groups do not match.
     *
     * Pawn: `pev->groupinfo`
     */
    get groupInfo(): number;
    set groupInfo(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the game keeps the spectator mode here; read it by name as `observerMode`.
     *
     * Pawn: `pev->iuser1`
     */
    get iuser1(): number;
    set iuser1(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the game keeps here the index of the player he spectates (`0` when roaming).
     *
     * Pawn: `pev->iuser2`
     */
    get iuser2(): number;
    set iuser2(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the field is taken: the death camera keeps the killer's index here, and ReGameDLL reads movement locks from its bits (`16` no ducking, `32` no ladders, `64` no jumping, `128` no double duck).
     *
     * Pawn: `pev->iuser3`
     */
    get iuser3(): number;
    set iuser3(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the game overwrites the field every frame: `1` while he stands on a vehicle, `0` otherwise.
     *
     * Pawn: `pev->iuser4`
     */
    get iuser4(): number;
    set iuser4(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player ReGameDLL zeroes the field, along with fuser2 and fuser3, when it resets his stamina.
     *
     * Pawn: `pev->fuser1`
     */
    get fuser1(): number;
    set fuser1(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the field is the slowdown after a jump, in milliseconds: set to about `1316` on a jump and counted down.
     *
     * Pawn: `pev->fuser2`
     */
    get fuser2(): number;
    set fuser2(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player ReGameDLL multiplies his movement by the field while `+speed` is held (`0` is off); in `noclip` and spectating it is the acceleration.
     *
     * Pawn: `pev->fuser3`
     */
    get fuser3(): number;
    set fuser3(value: number);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->fuser4`
     */
    get fuser4(): number;
    set fuser4(value: number);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->vuser1`
     */
    get vuser1(): Vector;
    set vuser1(value: number[]);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->vuser2`
     */
    get vuser2(): Vector;
    set vuser2(value: number[]);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->vuser3`
     */
    get vuser3(): Vector;
    set vuser3(value: number[]);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->vuser4`
     */
    get vuser4(): Vector;
    set vuser4(value: number[]);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->euser1`
     */
    get euser1(): number;
    set euser1(value: number);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->euser2`
     */
    get euser2(): number;
    set euser2(value: number);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->euser3`
     */
    get euser3(): number;
    set euser3(value: number);
    /**
     * A free field: a plugin keeps its own value here; the game does not use it.
     *
     * Pawn: `pev->euser4`
     */
    get euser4(): number;
    set euser4(value: number);
    /**
     * Runs the entity's spawn, as the game does when it makes one: an entity made with `Entity.create` is set up by it.
     *
     * Pawn: `ExecuteHamB(Ham_Spawn, ...)`, `ExecuteHam`
     */
    spawn(options?: ActionOptions): void;
    /**
     * Activates the entity, as the game does once the map has loaded.
     *
     * Pawn: `ExecuteHamB(Ham_Activate, ...)`, `ExecuteHam`
     */
    activate(options?: ActionOptions): void;
    /**
     * Heals the entity as the game does, up to its maximum: `true` when it took any.
     *
     * Pawn: `ExecuteHamB(Ham_TakeHealth, ...)`, `ExecuteHam`
     */
    heal(health: number, damageType: Damage[], options?: ActionOptions): bool;
    /**
     * Kills the entity as the game does, with the killer it names; `gib` is `0` for the usual death, `1` never torn apart, `2` always.
     *
     * Pawn: `ExecuteHamB(Ham_Killed, ...)`, `ExecuteHam`
     */
    killed(attacker: Entity, gib: number, options?: ActionOptions): void;
    /**
     * Runs the entity's think now, without waiting for its `nextThink`.
     *
     * Pawn: `ExecuteHamB(Ham_Think, ...)`, `ExecuteHam`
     */
    think(options?: ActionOptions): void;
    /**
     * Uses the entity - a button pressed, a door opened - as `activator` would, through `caller`.
     *
     * Pawn: `ExecuteHamB(Ham_Use, ...)`, `ExecuteHam`
     */
    use(caller: Entity, activator: Entity, useType: UseType, value: number, options?: ActionOptions): void;
    /**
     * Tells a moving entity - a door, a train - that `other` is in its way.
     *
     * Pawn: `ExecuteHamB(Ham_Blocked, ...)`, `ExecuteHam`
     */
    blocked(other: Entity, options?: ActionOptions): void;
    /**
     * Puts the entity back as a new round finds it.
     *
     * Pawn: `ExecuteHamB(Ham_CS_Restart, ...)`, `ExecuteHam`
     */
    restart(options?: ActionOptions): void;
}
/** A player's members - CBaseEntity up to CBasePlayer - on top of its entvars. */
export declare class PlayerFields extends Entity {
    /**
     * The player's Half-Life ammo counter; the game does not use it.
     *
     * Pawn: `CBaseEntity::currentammo`
     */
    get currentAmmo(): number;
    set currentAmmo(value: number);
    /**
     * The player's limit of buckshot ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_buckshot`
     */
    get maxAmmoBuckshot(): number;
    set maxAmmoBuckshot(value: number);
    /**
     * A copy of the player's reserve buckshot ammo (M3, XM1014): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_buckshot`
     */
    get ammoBuckshot(): number;
    set ammoBuckshot(value: number);
    /**
     * The player's limit of 9mm ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_9mm`
     */
    get maxAmmo9mm(): number;
    set maxAmmo9mm(value: number);
    /**
     * A copy of the player's reserve 9mm ammo (Glock, Elites, MP5, TMP): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_9mm`
     */
    get ammo9mm(): number;
    set ammo9mm(value: number);
    /**
     * The player's limit of 5.56mm ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_556nato`
     */
    get maxAmmo556nato(): number;
    set maxAmmo556nato(value: number);
    /**
     * A copy of the player's reserve 5.56mm ammo (M4A1, FAMAS, Galil, AUG, SG552, SG550): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_556nato`
     */
    get ammo556nato(): number;
    set ammo556nato(value: number);
    /**
     * The player's limit of 5.56mm box ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_556natobox`
     */
    get maxAmmo556natobox(): number;
    set maxAmmo556natobox(value: number);
    /**
     * A copy of the player's reserve 5.56mm box ammo (M249): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_556natobox`
     */
    get ammo556natobox(): number;
    set ammo556natobox(value: number);
    /**
     * The player's limit of 7.62mm ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_762nato`
     */
    get maxAmmo762nato(): number;
    set maxAmmo762nato(value: number);
    /**
     * A copy of the player's reserve 7.62mm ammo (AK-47, Scout, G3SG1): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_762nato`
     */
    get ammo762nato(): number;
    set ammo762nato(value: number);
    /**
     * The player's limit of .45 ACP ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_45acp`
     */
    get maxAmmo45acp(): number;
    set maxAmmo45acp(value: number);
    /**
     * A copy of the player's reserve .45 ACP ammo (USP, MAC-10, UMP45): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_45acp`
     */
    get ammo45acp(): number;
    set ammo45acp(value: number);
    /**
     * The player's limit of .50 AE ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_50ae`
     */
    get maxAmmo50ae(): number;
    set maxAmmo50ae(value: number);
    /**
     * A copy of the player's reserve .50 AE ammo (Desert Eagle): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_50ae`
     */
    get ammo50ae(): number;
    set ammo50ae(value: number);
    /**
     * The player's limit of .338 Magnum ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_338mag`
     */
    get maxAmmo338mag(): number;
    set maxAmmo338mag(value: number);
    /**
     * A copy of the player's reserve .338 Magnum ammo (AWP): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_338mag`
     */
    get ammo338mag(): number;
    set ammo338mag(value: number);
    /**
     * The player's limit of 5.7mm ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_57mm`
     */
    get maxAmmo57mm(): number;
    set maxAmmo57mm(value: number);
    /**
     * A copy of the player's reserve 5.7mm ammo (P90, Five-seveN): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_57mm`
     */
    get ammo57mm(): number;
    set ammo57mm(value: number);
    /**
     * The player's limit of .357 SIG ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_357sig`
     */
    get maxAmmo357sig(): number;
    set maxAmmo357sig(value: number);
    /**
     * A copy of the player's reserve .357 SIG ammo (P228): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_357sig`
     */
    get ammo357sig(): number;
    set ammo357sig(value: number);
    /**
     * The game time a grenade's pin was pulled (`0` when not); a player has the field but does not use it.
     *
     * Pawn: `CBaseEntity::m_flStartThrow`
     */
    get startThrow(): number;
    set startThrow(value: number);
    /**
     * The game time the attack button was let go on a grenade (`-1` before the pin is pulled); unused on a player.
     *
     * Pawn: `CBaseEntity::m_flReleaseThrow`
     */
    get releaseThrow(): number;
    set releaseThrow(value: number);
    /**
     * A knife's swing counter, which picks the left or right slash animation; unused on a player.
     *
     * Pawn: `CBaseEntity::m_iSwing`
     */
    get swing(): number;
    set swing(value: number);
    /**
     * The player's `"left"` flag: `true` once he has left the server (or the bot was kicked), until someone takes the slot.
     *
     * Pawn: `CBaseEntity::has_disconnected`
     */
    get hasDisconnected(): boolean;
    set hasDisconnected(value: boolean);
    /**
     * The ground speed of the current animation: how fast it moves the model, units per second.
     *
     * Pawn: `CBaseAnimating::m_flGroundSpeed`
     */
    get groundSpeed(): number;
    set groundSpeed(value: number);
    /**
     * The game time the animation's events (footsteps, sounds) were last checked.
     *
     * Pawn: `CBaseAnimating::m_flLastEventCheck`
     */
    get lastEventCheck(): number;
    set lastEventCheck(value: number);
    /**
     * The `"finished"` flag of the current animation: `true` once it has played to its end.
     *
     * Pawn: `CBaseAnimating::m_fSequenceFinished`
     */
    get sequenceFinished(): number;
    set sequenceFinished(value: number);
    /**
     * The `"loops"` flag of the current animation: `true` if it loops.
     *
     * Pawn: `CBaseAnimating::m_fSequenceLoops`
     */
    get sequenceLoops(): number;
    set sequenceLoops(value: number);
    /**
     * The body part the last bullet hit, one of: `"generic"` - no particular part; `"head"`, `"chest"`, `"stomach"`, `"leftArm"`, `"rightArm"`, `"leftLeg"`, `"rightLeg"`; `"shield"`.
     *
     * Pawn: `CBaseMonster::m_LastHitGroup`, `HITGROUP_*`
     */
    get lastHitGroup(): HitGroup;
    set lastHitGroup(value: HitGroup);
    /**
     * The kinds of damage the player took since the HUD was last told, e.g. `"Fall"`, `"Bullet"`, `"Burn"`; the game clears all but the lasting ones after the damage indicator is sent.
     *
     * Pawn: `CBaseMonster::m_bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /**
     * The player's delay before any weapon can be used, in seconds; it counts down to `0` by itself. The game sets it while he switches weapons or reloads.
     *
     * Pawn: `CBaseMonster::m_flNextAttack`
     */
    get nextAttack(): number;
    set nextAttack(value: number);
    /**
     * A monster's field of view, as the cosine of half the cone: `0.5` sees 120 degrees wide.
     *
     * Pawn: `CBaseMonster::m_flFieldOfView`
     */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    /**
     * The colour of the entity's blood, one of: `"red"`; `"yellow"`; `"none"` - does not bleed.
     *
     * Pawn: `CBaseMonster::m_bloodColor`, `BLOOD_COLOR_*`, `DONT_BLEED`
     */
    get bloodColor(): BloodColor;
    set bloodColor(value: BloodColor);
    /**
     * The random seed of the player's current command; bullet spread is drawn from it, so the client can predict it.
     *
     * Pawn: `CBasePlayer::random_seed`
     */
    get randomSeed(): number;
    set randomSeed(value: number);
    /**
     * The player's bleeding event; the game does not use it.
     *
     * Pawn: `CBasePlayer::m_usPlayerBleed`
     */
    get playerBleed(): number;
    set playerBleed(value: number);
    /**
     * The player this spectator is watching.
     *
     * Pawn: `CBasePlayer::m_hObserverTarget`
     */
    get observerTarget(): number;
    set observerTarget(value: number);
    /**
     * The game time when the spectator's next button press is taken; presses are 0.2 seconds apart.
     *
     * Pawn: `CBasePlayer::m_flNextObserverInput`
     */
    get nextObserverInput(): number;
    set nextObserverInput(value: number);
    /**
     * The weapon of the watched player, as last shown to this spectator, by its number.
     *
     * Pawn: `CBasePlayer::m_iObserverWeapon`
     */
    get observerWeapon(): number;
    set observerWeapon(value: number);
    /**
     * The watched player's bomb state, as last shown to this spectator.
     *
     * Pawn: `CBasePlayer::m_iObserverC4State`
     */
    get observerC4State(): number;
    set observerC4State(value: number);
    /**
     * `true` if the watched player has a defuse kit, as last shown to this spectator.
     *
     * Pawn: `CBasePlayer::m_bObserverHasDefuser`
     */
    get observerHasDefuser(): boolean;
    set observerHasDefuser(value: boolean);
    /**
     * The spectator mode the player chose last, restored when he spectates again - the names `observerMode` has, one of: `"chaseLocked"`, `"chaseFree"`, `"roaming"`, `"inEye"`, `"mapFree"`, `"mapChase"`.
     *
     * Pawn: `CBasePlayer::m_iObserverLastMode`, `OBS_*`
     */
    get observerLastMode(): ObserverMode;
    set observerLastMode(value: ObserverMode);
    /**
     * The game time when a hostage stops flinching from a hit; not used on a player.
     *
     * Pawn: `CBasePlayer::m_flFlinchTime`
     */
    get flinchTime(): number;
    set flinchTime(value: number);
    /**
     * `true` if the player's last hit was heavy (over `60` to the head, over `20` elsewhere), for the pain animation.
     *
     * Pawn: `CBasePlayer::m_bHighDamage`
     */
    get highDamage(): boolean;
    set highDamage(value: boolean);
    /**
     * The player's speed multiplier after a hit: below `1` he is slowed, and on the ground it climbs back to `1` by `0.01` a frame.
     *
     * Pawn: `CBasePlayer::m_flVelocityModifier`
     */
    get slowdown(): number;
    set slowdown(value: number);
    /**
     * The player's zoom (field of view) to go back to after a sniper rifle reloads or fires.
     *
     * Pawn: `CBasePlayer::m_iLastZoom`
     */
    get lastZoom(): number;
    set lastZoom(value: number);
    /**
     * `true` if the player's zoom comes back after the shot.
     *
     * Pawn: `CBasePlayer::m_bResumeZoom`
     */
    get resumeZoom(): boolean;
    set resumeZoom(value: boolean);
    /**
     * The game time when the player's weapon throws out its next shell casing (AWP, Scout, shotguns); `0` for none.
     *
     * Pawn: `CBasePlayer::m_flEjectBrass`
     */
    get ejectBrass(): number;
    set ejectBrass(value: number);
    /**
     * The player's armour kind, one of: `"none"`; `"vest"`; `"vestHelmet"` - a vest and a helmet. Setting it shows the helmet on his HUD, or takes it off.
     *
     * Pawn: `CBasePlayer::m_iKevlar`, `ARMOR_*`
     */
    get kevlar(): ArmorType;
    set kevlar(value: ArmorType);
    /**
     * `true` if the player survived the last round and keeps his equipment; with `false` he gets the default one at spawn.
     *
     * Pawn: `CBasePlayer::m_bNotKilled`
     */
    get notKilled(): boolean;
    set notKilled(value: boolean);
    /**
     * The player's money: `800` at the start. Setting it shows the new amount on his HUD at once, flashing: `player.money += 500`.
     *
     * Pawn: `CBasePlayer::m_iAccount`
     */
    get money(): number;
    set money(value: number);
    /**
     * `true` if the player carries a primary weapon (a rifle, a shotgun, a submachine gun).
     *
     * Pawn: `CBasePlayer::m_bHasPrimary`
     */
    get hasPrimary(): boolean;
    set hasPrimary(value: boolean);
    /**
     * The player's death throw timer; the game only ever sets it to `0`.
     *
     * Pawn: `CBasePlayer::m_flDeathThrowTime`
     */
    get deathThrowTime(): number;
    set deathThrowTime(value: number);
    /**
     * The way the player's body is thrown when he dies, one of: `"none"` - not thrown; `"forward"`; `"backward"`; `"hitVelocity"` - away from the attacker and up; `"hitVelocityMinusAir"` - away from the attacker, without the lift; `"bomb"` - by the bomb's blast; `"grenade"` - by a grenade's blast.
     *
     * Pawn: `CBasePlayer::m_iThrowDirection`
     */
    get throwDirection(): ThrowDirection;
    set throwDirection(value: ThrowDirection);
    /**
     * The game time of the player's last chat message; a message within 0.66 seconds of it is ignored.
     *
     * Pawn: `CBasePlayer::m_flLastTalk`
     */
    get lastTalk(): number;
    set lastTalk(value: number);
    /**
     * `true` from the player's connecting until he first gets into the game.
     *
     * Pawn: `CBasePlayer::m_bJustConnected`
     */
    get justConnected(): boolean;
    set justConnected(value: boolean);
    /**
     * The player's context help flag: set to `true` on connect, never read by the game.
     *
     * Pawn: `CBasePlayer::m_bContextHelp`
     */
    get contextHelp(): boolean;
    set contextHelp(value: boolean);
    /**
     * The player's stage of joining, one of: `"joined"` - in the game; `"showMotd"` - the MOTD is shown; `"readingMotd"` - reading the MOTD; `"showTeamSelect"` - the team menu is shown; `"pickingTeam"` - picking a team; `"getIntoGame"` - getting into the game.
     *
     * Pawn: `CBasePlayer::m_iJoiningState`, `JoinState`
     */
    get joiningState(): JoinState;
    set joiningState(value: JoinState);
    /**
     * The camera (`trigger_camera`) a player still choosing a team looks through.
     *
     * Pawn: `CBasePlayer::m_pIntroCamera`
     */
    get introCamera(): number;
    set introCamera(value: number);
    /**
     * The game time when the player's intro view switches to the next camera (every 6 seconds).
     *
     * Pawn: `CBasePlayer::m_fIntroCamTime`
     */
    get introCamTime(): number;
    set introCamTime(value: number);
    /**
     * The game time when the player last moved or pressed a button; the kick for idling counts from it.
     *
     * Pawn: `CBasePlayer::m_fLastMovement`
     */
    get lastMovement(): number;
    set lastMovement(value: number);
    /**
     * `true` while the map's briefing is on the player's screen.
     *
     * Pawn: `CBasePlayer::m_bMissionBriefing`
     */
    get missionBriefing(): boolean;
    set missionBriefing(value: boolean);
    /**
     * `true` if the player has changed team during this round.
     *
     * Pawn: `CBasePlayer::m_bTeamChanged`
     */
    get teamChanged(): boolean;
    set teamChanged(value: boolean);
    /**
     * The player's model, one of: `"urban"`, `"gsg9"`, `"gign"`, `"sas"`, `"vip"`, `"spetsnaz"` - the counter-terrorists'; `"terror"`, `"leet"`, `"arctic"`, `"guerilla"`, `"militia"` - the terrorists'; `"unassigned"` before he picks one; `"auto"` - the game picks.
     *
     * Pawn: `CBasePlayer::m_iModelName`, `MODEL_*`
     */
    get modelName(): PlayerModel;
    set modelName(value: PlayerModel);
    /**
     * The number of teammates the player has killed; with `mp_autokick` he is kicked at `mp_max_teamkills`.
     *
     * Pawn: `CBasePlayer::m_iTeamKills`
     */
    get teamKills(): number;
    set teamKills(value: number);
    /**
     * The chat the player hides (the `ignoremsg` command), one of: `"none"` - nobody's; `"enemy"` - the enemy's; `"all"` - everyone's.
     *
     * Pawn: `CBasePlayer::m_iIgnoreGlobalChat`, `IGNOREMSG_*`
     */
    get ignoreGlobalChat(): IgnoredChat;
    set ignoreGlobalChat(value: IgnoredChat);
    /**
     * `true` if the player owns night vision goggles. Setting it gives or takes them, and his buy menu knows.
     *
     * Pawn: `CBasePlayer::m_bHasNightVision`
     */
    get hasNightVision(): boolean;
    set hasNightVision(value: boolean);
    /**
     * `true` while the player's night vision is switched on. Setting it switches his screen to night vision or back.
     *
     * Pawn: `CBasePlayer::m_bNightVisionOn`
     */
    get nightVisionOn(): boolean;
    set nightVisionOn(value: boolean);
    /**
     * The game time of the player's next idle check; checks are 5 seconds apart.
     *
     * Pawn: `CBasePlayer::m_flIdleCheckTime`
     */
    get idleCheckTime(): number;
    set idleCheckTime(value: number);
    /**
     * The game time when the player can use the radio again.
     *
     * Pawn: `CBasePlayer::m_flRadioTime`
     */
    get radioTime(): number;
    set radioTime(value: number);
    /**
     * The number of radio messages the player has left until he spawns again (`mp_radio_maxinround`, `60` by default); at `0` his radio is silent.
     *
     * Pawn: `CBasePlayer::m_iRadioMessages`
     */
    get radioMessages(): number;
    set radioMessages(value: number);
    /**
     * `true` if the player does not hear radio messages (the ignorerad command).
     *
     * Pawn: `CBasePlayer::m_bIgnoreRadio`
     */
    get ignoreRadio(): boolean;
    set ignoreRadio(value: boolean);
    /**
     * `true` while the player carries the bomb.
     *
     * Pawn: `CBasePlayer::m_bHasC4`
     */
    get hasC4(): boolean;
    set hasC4(value: boolean);
    /**
     * `true` if the player has a defuse kit. Setting it gives or takes the kit as the game does: on his model, its icon on his HUD and in his buy menu.
     *
     * Pawn: `CBasePlayer::m_bHasDefuser`
     */
    get hasDefuser(): boolean;
    set hasDefuser(value: boolean);
    /**
     * `true` if the bomb's explosion killed the player.
     *
     * Pawn: `CBasePlayer::m_bKilledByBomb`
     */
    get killedByBomb(): boolean;
    set killedByBomb(value: boolean);
    /**
     * The direction from an explosion to the player, saved on a blast hit to throw the body if he dies.
     *
     * Pawn: `CBasePlayer::m_vBlastVector`
     */
    get blastVector(): Vector;
    set blastVector(value: number[]);
    /**
     * `true` if a grenade killed the player.
     *
     * Pawn: `CBasePlayer::m_bKilledByGrenade`
     */
    get killedByGrenade(): boolean;
    set killedByGrenade(value: boolean);
    /**
     * The one-time hints the player has already been shown, one bit each.
     *
     * Pawn: `CBasePlayer::m_flDisplayHistory`
     */
    get displayHistory(): number;
    set displayHistory(value: number);
    /**
     * The old-style menu the game has open for the player, one of: `"none"`; `"team"` - the team menu, `"teamInGame"` - the same, once in the game; `"appearance"` - the model menu; `"buy"`, `"buyPistol"`, `"buyRifle"`, `"buyMachineGun"`, `"buyShotgun"`, `"buySubMachineGun"`, `"buyItem"` - the buy menus; `"radio1"`, `"radio2"`, `"radio3"` - the radio menus; `"clientBuy"` - the buy menu the client draws itself.
     *
     * Pawn: `CBasePlayer::m_iMenu`, `Menu_*`
     */
    get openMenu(): GameMenu;
    set openMenu(value: GameMenu);
    /**
     * The player's chase target: set to `1` on spawn, never read by the game.
     *
     * Pawn: `CBasePlayer::m_iChaseTarget`
     */
    get chaseTarget(): number;
    set chaseTarget(value: number);
    /**
     * The player's camera switch: set to `0` on spawn, never read by the game.
     *
     * Pawn: `CBasePlayer::m_fCamSwitch`
     */
    get camSwitch(): number;
    set camSwitch(value: number);
    /**
     * `true` if the player escaped (on an escape map) or, as the VIP, got out.
     *
     * Pawn: `CBasePlayer::m_bEscaped`
     */
    get escaped(): boolean;
    set escaped(value: boolean);
    /**
     * `true` if the player is the VIP on an as_ map.
     *
     * Pawn: `CBasePlayer::m_bIsVIP`
     */
    get isVip(): boolean;
    set isVip(value: boolean);
    /**
     * The game time when the player's position is next sent to his teammates' radar, once a second.
     *
     * Pawn: `CBasePlayer::m_tmNextRadarUpdate`
     */
    get nextRadarUpdate(): number;
    set nextRadarUpdate(value: number);
    /**
     * The player's position when his teammates' radar was last updated.
     *
     * Pawn: `CBasePlayer::m_vLastOrigin`
     */
    get lastOrigin(): Vector;
    set lastOrigin(value: number[]);
    /**
     * The `userid` of the player this one voted to kick (the `vote` command); `0` for none.
     *
     * Pawn: `CBasePlayer::m_iCurrentKickVote`
     */
    get currentKickVote(): number;
    set currentKickVote(value: number);
    /**
     * The game time when the player can vote again, 3 seconds after his last vote.
     *
     * Pawn: `CBasePlayer::m_flNextVoteTime`
     */
    get nextVoteTime(): number;
    set nextVoteTime(value: number);
    /**
     * `true` if the player killed a teammate; with `mp_tkpunish` he is punished when the next round starts.
     *
     * Pawn: `CBasePlayer::m_bJustKilledTeammate`
     */
    get justKilledTeammate(): boolean;
    set justKilledTeammate(value: boolean);
    /**
     * The number of hostages the player has killed; past `mp_hostagepenalty` the game kicks him.
     *
     * Pawn: `CBasePlayer::m_iHostagesKilled`
     */
    get hostagesKilled(): number;
    set hostagesKilled(value: number);
    /**
     * The number of the map the player voted for with `votemap`; `0` for none.
     *
     * Pawn: `CBasePlayer::m_iMapVote`
     */
    get mapVote(): number;
    set mapVote(value: number);
    /**
     * `false` while the player may not fire; the game sets it to `true` when freeze time ends.
     *
     * Pawn: `CBasePlayer::m_bCanShoot`
     */
    get canShoot(): boolean;
    set canShoot(value: boolean);
    /**
     * The game time of the player's last shot, for his footstep and shooting animations.
     *
     * Pawn: `CBasePlayer::m_flLastFired`
     */
    get lastFired(): number;
    set lastFired(value: number);
    /**
     * The game time when the player last hurt a teammate; the “teammate attack” message waits 0.6 seconds from it.
     *
     * Pawn: `CBasePlayer::m_flLastAttackedTeammate`
     */
    get lastAttackedTeammate(): number;
    set lastAttackedTeammate(value: number);
    /**
     * `true` if the player was killed by a headshot.
     *
     * Pawn: `CBasePlayer::m_bHeadshotKilled`
     */
    get headshotKilled(): boolean;
    set headshotKilled(value: boolean);
    /**
     * `true` if the player was punished for a team kill this round.
     *
     * Pawn: `CBasePlayer::m_bPunishedForTK`
     */
    get punishedForTeamKill(): boolean;
    set punishedForTeamKill(value: boolean);
    /**
     * `true` if the player gets no round bonus next round: the game marks so the living players of a team that let the round time run out.
     *
     * Pawn: `CBasePlayer::m_bReceivesNoMoneyNextRound`
     */
    get receivesNoMoneyNextRound(): boolean;
    set receivesNoMoneyNextRound(value: boolean);
    /**
     * The game time, in whole seconds, when the timeleft command answers the player again.
     *
     * Pawn: `CBasePlayer::m_iTimeCheckAllowed`
     */
    get timeCheckAllowed(): number;
    set timeCheckAllowed(value: number);
    /**
     * `true` if the player changed his name while dead; the new name is applied at his next spawn.
     *
     * Pawn: `CBasePlayer::m_bHasChangedName`
     */
    get hasChangedName(): boolean;
    set hasChangedName(value: boolean);
    /**
     * The name the player takes at his next respawn: a name he changed while dead waits here.
     *
     * Pawn: `CBasePlayer::m_szNewName`
     */
    get newName(): string;
    set newName(value: string);
    /**
     * `true` while the player defuses the bomb.
     *
     * Pawn: `CBasePlayer::m_bIsDefusing`
     */
    get isDefusing(): boolean;
    set isDefusing(value: boolean);
    /**
     * The game time when the player's zones (buy zone, bomb site, rescue zone) are next checked, every half second.
     *
     * Pawn: `CBasePlayer::m_tmHandleSignals`
     */
    get handleSignals(): number;
    set handleSignals(value: number);
    /**
     * The bomb site the player stands in, or `0`.
     *
     * Pawn: `CBasePlayer::m_pentCurBombTarget`
     */
    get curBombTarget(): number;
    set curBombTarget(value: number);
    /**
     * The player's slot in the list of sounds monsters (hostages) hear.
     *
     * Pawn: `CBasePlayer::m_iPlayerSound`
     */
    get playerSound(): number;
    set playerSound(value: number);
    /**
     * The player's loudness to monsters this frame: the louder of his body and his weapon.
     *
     * Pawn: `CBasePlayer::m_iTargetVolume`
     */
    get targetVolume(): number;
    set targetVolume(value: number);
    /**
     * The loudness of the player's last shot to monsters; it fades by itself.
     *
     * Pawn: `CBasePlayer::m_iWeaponVolume`
     */
    get weaponVolume(): number;
    set weaponVolume(value: number);
    /**
     * The extra kinds of sound the player makes for monsters until `stopExtraSoundTime`.
     *
     * Pawn: `CBasePlayer::m_iExtraSoundTypes`
     */
    get extraSoundTypes(): number;
    set extraSoundTypes(value: number);
    /**
     * The brightness of the player's last muzzle flash, adding to how visible he is; it fades by itself.
     *
     * Pawn: `CBasePlayer::m_iWeaponFlash`
     */
    get weaponFlash(): number;
    set weaponFlash(value: number);
    /**
     * The game time when the player's `extraSoundTypes` is cleared.
     *
     * Pawn: `CBasePlayer::m_flStopExtraSoundTime`
     */
    get stopExtraSoundTime(): number;
    set stopExtraSoundTime(value: number);
    /**
     * The game time when the player's flashlight battery next drains (while on) or charges (while off) by one.
     *
     * Pawn: `CBasePlayer::m_flFlashLightTime`
     */
    get flashlightTime(): number;
    set flashlightTime(value: number);
    /**
     * The charge of the player's flashlight, `0` to `100`. Setting it shows the new charge on his HUD.
     *
     * Pawn: `CBasePlayer::m_iFlashBattery`
     */
    get flashlightBattery(): number;
    set flashlightBattery(value: number);
    /**
     * The buttons the player held the frame before: `["Jump"]`.
     *
     * Pawn: `CBasePlayer::m_afButtonLast`
     */
    get buttonLast(): Button[];
    set buttonLast(values: Button[]);
    /**
     * The buttons the player pressed this frame: `["Jump"]`.
     *
     * Pawn: `CBasePlayer::m_afButtonPressed`
     */
    get buttonPressed(): Button[];
    set buttonPressed(values: Button[]);
    /**
     * The buttons the player let go this frame: `["Jump"]`.
     *
     * Pawn: `CBasePlayer::m_afButtonReleased`
     */
    get buttonReleased(): Button[];
    set buttonReleased(values: Button[]);
    /**
     * The sound area (`env_sound`) whose room effect is on the player.
     *
     * Pawn: `CBasePlayer::m_pentSndLast`
     */
    get lastSoundEntity(): number;
    set lastSoundEntity(value: number);
    /**
     * The room effect (echo) of the player's sound area, `0` for none.
     *
     * Pawn: `CBasePlayer::m_flSndRoomtype`
     */
    get roomType(): number;
    set roomType(value: number);
    /**
     * The distance from the player to his sound area.
     *
     * Pawn: `CBasePlayer::m_flSndRange`
     */
    get soundRange(): number;
    set soundRange(value: number);
    /**
     * The player's “new ammo to send” flag from Half-Life. CS does not use the field.
     *
     * Pawn: `CBasePlayer::m_fNewAmmo`
     */
    get newAmmo(): number;
    set newAmmo(value: number);
    /**
     * The player's physics state, a list of any of: `"OnLadder"`, `"OnTrain"`, `"OnBarnacle"`, `"Ducking"` - crouching down right now, `"Using"` - holding an object's use key, `"Observer"` - a spectator locked in place.
     *
     * Pawn: `CBasePlayer::m_afPhysicsFlags`, `PFLAG_*`
     */
    get physicsFlags(): PhysicsFlag[];
    set physicsFlags(values: PhysicsFlag[]);
    /**
     * The game time when the kill command works for the player again, a second after the last one.
     *
     * Pawn: `CBasePlayer::m_fNextSuicideTime`
     */
    get nextSuicideTime(): number;
    set nextSuicideTime(value: number);
    /**
     * The player's idle timer from Half-Life; CS keeps it on the weapon (a Weapon's `nextIdle`) and does not use this one.
     *
     * Pawn: `CBasePlayer::m_flTimeWeaponIdle`
     */
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /**
     * The player's wall-jump timer from Half-Life. CS does not use the field.
     *
     * Pawn: `CBasePlayer::m_flWallJumpTime`
     */
    get wallJumpTime(): number;
    set wallJumpTime(value: number);
    /**
     * The game time of the next HEV suit phrase (Half-Life); `0` for none.
     *
     * Pawn: `CBasePlayer::m_flSuitUpdate`
     */
    get suitUpdate(): number;
    set suitUpdate(value: number);
    /**
     * The next place in the HEV suit's phrase queue (Half-Life).
     *
     * Pawn: `CBasePlayer::m_iSuitPlayNext`
     */
    get suitPlayNext(): number;
    set suitPlayNext(value: number);
    /**
     * The damage the player took from the last hit.
     *
     * Pawn: `CBasePlayer::m_lastDamageAmount`
     */
    get lastDamageAmount(): number;
    set lastDamageAmount(value: number);
    /**
     * The game time when damage over time (poison, burn, drowning recovery) was last applied to the player.
     *
     * Pawn: `CBasePlayer::m_tbdPrev`
     */
    get timeBasedDamagePrev(): number;
    set timeBasedDamagePrev(value: number);
    /**
     * The distance to the nearest radiation, for Half-Life's Geiger counter.
     *
     * Pawn: `CBasePlayer::m_flgeigerRange`
     */
    get geigerRange(): number;
    set geigerRange(value: number);
    /**
     * The game time of the next Geiger counter update (Half-Life).
     *
     * Pawn: `CBasePlayer::m_flgeigerDelay`
     */
    get geigerDelay(): number;
    set geigerDelay(value: number);
    /**
     * The Geiger counter reading last sent to the client (Half-Life).
     *
     * Pawn: `CBasePlayer::m_igeigerRangePrev`
     */
    get geigerRangePrev(): number;
    set geigerRangePrev(value: number);
    /**
     * The name of the texture the player last stood on, which his footsteps sound by.
     *
     * Pawn: `CBasePlayer::m_szTextureName`
     */
    get textureName(): string;
    set textureName(value: string);
    /**
     * The type of texture under the player, for step sounds. CS does not use the field.
     *
     * Pawn: `CBasePlayer::m_chTextureType`
     */
    get textureType(): number;
    set textureType(value: number);
    /**
     * The health drowning has taken from the player; it is given back once he surfaces.
     *
     * Pawn: `CBasePlayer::m_idrowndmg`
     */
    get drownDamage(): number;
    set drownDamage(value: number);
    /**
     * The part of the drowning damage already given back to the player.
     *
     * Pawn: `CBasePlayer::m_idrownrestored`
     */
    get drownRestored(): number;
    set drownRestored(value: number);
    /**
     * The kinds of damage last shown on the player's HUD, as bits; `-1` makes the game send them again.
     *
     * Pawn: `CBasePlayer::m_bitsHUDDamage`, `DMG_*`
     */
    get hudDamage(): number;
    set hudDamage(value: number);
    /**
     * `true` when the player's HUD has to be reset on his next update (after a spawn).
     *
     * Pawn: `CBasePlayer::m_fInitHUD`
     */
    get initHud(): boolean;
    set initHud(value: boolean);
    /**
     * `true` once the player's HUD has been set up since he connected.
     *
     * Pawn: `CBasePlayer::m_fGameHUDInitialized`
     */
    get gameHudInitialized(): boolean;
    set gameHudInitialized(value: boolean);
    /**
     * The train control on the player's HUD: `0` off, `1` to `5` the speed notch, plus bits for `"changed"` and `"active"`.
     *
     * Pawn: `CBasePlayer::m_iTrain`, `TRAIN_*`
     */
    get trainControls(): number;
    set trainControls(value: number);
    /**
     * `false` when the player's weapon list has to be sent again.
     *
     * Pawn: `CBasePlayer::m_fWeapon`
     */
    get weaponHudValid(): boolean;
    set weaponHudValid(value: boolean);
    /**
     * The mounted gun (`func_tank`) the player is using.
     *
     * Pawn: `CBasePlayer::m_pTank`
     */
    get mountedGun(): number;
    set mountedGun(value: number);
    /**
     * The game time of the player's death.
     *
     * Pawn: `CBasePlayer::m_fDeadTime`
     */
    get deadTime(): number;
    set deadTime(value: number);
    /**
     * `true` if monsters do not hear the player.
     *
     * Pawn: `CBasePlayer::m_fNoPlayerSound`
     */
    get noPlayerSound(): boolean;
    set noPlayerSound(value: boolean);
    /**
     * `true` if the player has the long jump module from Half-Life.
     *
     * Pawn: `CBasePlayer::m_fLongJump`
     */
    get hasLongJump(): boolean;
    set hasLongJump(value: boolean);
    /**
     * The game time from which the player counts as sneaking (Half-Life).
     *
     * Pawn: `CBasePlayer::m_tSneaking`
     */
    get sneakingUntil(): number;
    set sneakingUntil(value: number);
    /**
     * The player's update counter: set to `5` on reset, never read by the game.
     *
     * Pawn: `CBasePlayer::m_iUpdateTime`
     */
    get updateTime(): number;
    set updateTime(value: number);
    /**
     * The health last sent to the player's HUD; when it differs from his health, the game sends the new one.
     *
     * Pawn: `CBasePlayer::m_iClientHealth`
     */
    get healthSent(): number;
    set healthSent(value: number);
    /**
     * The armour last sent to the player's HUD; `-1` makes the game send it again.
     *
     * Pawn: `CBasePlayer::m_iClientBattery`
     */
    get batterySent(): number;
    set batterySent(value: number);
    /**
     * The parts of the player's HUD that are hidden: `["Money", "Timer"]`; the game sends the change itself.
     *
     * Pawn: `CBasePlayer::m_iHideHUD`
     */
    get hideHud(): HideHud[];
    set hideHud(values: HideHud[]);
    /**
     * The hidden HUD parts last sent to the player; when they differ from `hideHud`, the game sends `hideHud`.
     *
     * Pawn: `CBasePlayer::m_iClientHideHUD`
     */
    get hideHudSent(): HideHud[];
    set hideHudSent(values: HideHud[]);
    /**
     * The player's field of view in degrees: `90` is normal, `40` and `10` through a sniper scope. Setting it widens or narrows his view - `110` shows more - until the game sets it again: at spawn, when he draws a weapon, when he zooms.
     *
     * Pawn: `CBasePlayer::m_iFOV`
     */
    get fov(): number;
    set fov(value: number);
    /**
     * The field of view last sent to the player; when the game's own copy differs, the game sends that one.
     *
     * Pawn: `CBasePlayer::m_iClientFOV`
     */
    get fovSent(): number;
    set fovSent(value: number);
    /**
     * The number of times the player has spawned this round; with `mp_forcerespawn` off, a second spawn is refused.
     *
     * Pawn: `CBasePlayer::m_iNumSpawns`
     */
    get spawnCount(): number;
    set spawnCount(value: number);
    /**
     * An observer entity tied to the player; the game never creates one and only removes it when he disconnects.
     *
     * Pawn: `CBasePlayer::m_pObserver`
     */
    get observer(): number;
    set observer(value: number);
    /**
     * The weapon in the player's hands, or `null`. Read only.
     *
     * Pawn: `CBasePlayer::m_pActiveItem`
     */
    get activeItem(): Weapon | null;
    /**
     * The weapon the player's client was last told he holds. Read only.
     *
     * Pawn: `CBasePlayer::m_pClientActiveItem`
     */
    get activeItemSent(): Weapon | null;
    /**
     * The weapon the player held before this one — the one lastinv switches to. Read only.
     *
     * Pawn: `CBasePlayer::m_pLastItem`
     */
    get lastItem(): Weapon | null;
    /**
     * The player's aim assist correction, in degrees.
     *
     * Pawn: `CBasePlayer::m_vecAutoAim`
     */
    get autoAim(): Vector;
    set autoAim(value: number[]);
    /**
     * `true` while the player's aim assist has a target under the crosshair.
     *
     * Pawn: `CBasePlayer::m_fOnTarget`
     */
    get aimingAtTarget(): boolean;
    set aimingAtTarget(value: boolean);
    /**
     * The game time of the next update of the player's status bar (the name under the crosshair), every 0.2 seconds.
     *
     * Pawn: `CBasePlayer::m_flNextSBarUpdateTime`
     */
    get nextStatusBarUpdate(): number;
    set nextStatusBarUpdate(value: number);
    /**
     * The game time the status bar about the player under the crosshair stays until: 2 seconds after he leaves the crosshair.
     *
     * Pawn: `CBasePlayer::m_flStatusBarDisappearDelay`
     */
    get statusBarDisappearDelay(): number;
    set statusBarDisappearDelay(value: number);
    /**
     * The status bar text the game last sent the player - the line that names whom he aims at, as a format his client fills in.
     *
     * Pawn: `CBasePlayer::m_SbarString0`
     */
    get statusBarText(): string;
    set statusBarText(value: string);
    /**
     * The horizontal aim assist correction last sent to the player's client.
     *
     * Pawn: `CBasePlayer::m_lastx`
     */
    get lastX(): number;
    set lastX(value: number);
    /**
     * The vertical aim assist correction last sent to the player's client.
     *
     * Pawn: `CBasePlayer::m_lasty`
     */
    get lastY(): number;
    set lastY(value: number);
    /**
     * The number of frames in the player's own spray logo; `-1` for none.
     *
     * Pawn: `CBasePlayer::m_nCustomSprayFrames`
     */
    get customSprayFrames(): number;
    set customSprayFrames(value: number);
    /**
     * The game time when the player can spray again (decalfrequency).
     *
     * Pawn: `CBasePlayer::m_flNextDecalTime`
     */
    get nextDecalTime(): number;
    set nextDecalTime(value: number);
    /**
     * The index of the player's own model; the game sets `modelIndex` back to it, at spawn for one.
     *
     * Pawn: `CBasePlayer::m_modelIndexPlayer`
     */
    get modelIndexPlayer(): number;
    set modelIndexPlayer(value: number);
    /**
     * The animation set the player's model holds his weapon with, e.g. `"knife"`, `"rifle"`, `"c4"`.
     *
     * Pawn: `CBasePlayer::m_szAnimExtention`
     */
    get animExtension(): string;
    set animExtension(value: string);
    /**
     * The legs' animation the game picked for the player this frame.
     *
     * Pawn: `CBasePlayer::m_iGaitsequence`
     */
    get playerGaitSequence(): number;
    set playerGaitSequence(value: number);
    /**
     * The playback position of the player's legs' animation, in frames.
     *
     * Pawn: `CBasePlayer::m_flGaitframe`
     */
    get gaitFrame(): number;
    set gaitFrame(value: number);
    /**
     * The direction the player's legs face, in degrees; it catches up with the body's.
     *
     * Pawn: `CBasePlayer::m_flGaityaw`
     */
    get gaitYaw(): number;
    set gaitYaw(value: number);
    /**
     * The player's position on the previous animation update, to estimate his speed.
     *
     * Pawn: `CBasePlayer::m_prevgaitorigin`
     */
    get prevGaitOrigin(): Vector;
    set prevGaitOrigin(value: number[]);
    /**
     * The upper body's tilt the game worked out for the player's model.
     *
     * Pawn: `CBasePlayer::m_flPitch`
     */
    get pitch(): number;
    set pitch(value: number);
    /**
     * The turn of the player's upper body against the legs, in degrees.
     *
     * Pawn: `CBasePlayer::m_flYaw`
     */
    get yaw(): number;
    set yaw(value: number);
    /**
     * The distance the player moved since the previous animation update, for the legs' animation.
     *
     * Pawn: `CBasePlayer::m_flGaitMovement`
     */
    get gaitMovement(): number;
    set gaitMovement(value: number);
    /**
     * The player's `_cl_autowepswitch` setting: `0` never switch to a picked-up weapon, `1` always, `2` only when not firing.
     *
     * Pawn: `CBasePlayer::m_iAutoWepSwitch`
     */
    get autoSwitchWeapon(): number;
    set autoSwitchWeapon(value: number);
    /**
     * `true` if the player uses the graphical (VGUI) menus — his `_vgui_menus` setting.
     *
     * Pawn: `CBasePlayer::m_bVGUIMenus`
     */
    get vguiMenus(): boolean;
    set vguiMenus(value: boolean);
    /**
     * `true` if the player wants hints — his _ah setting.
     *
     * Pawn: `CBasePlayer::m_bShowHints`
     */
    get showHints(): boolean;
    set showHints(value: boolean);
    /**
     * `true` while the player holds his shield up.
     *
     * Pawn: `CBasePlayer::m_bShieldDrawn`
     */
    get shieldDrawn(): boolean;
    set shieldDrawn(value: boolean);
    /**
     * `true` if the player has a tactical shield.
     *
     * Pawn: `CBasePlayer::m_bOwnsShield`
     */
    get ownsShield(): boolean;
    set ownsShield(value: boolean);
    /**
     * `true` if the spectator was following a player before he switched to free look.
     *
     * Pawn: `CBasePlayer::m_bWasFollowing`
     */
    get wasFollowing(): boolean;
    set wasFollowing(value: boolean);
    /**
     * The game time when the spectator can switch to the next player again.
     *
     * Pawn: `CBasePlayer::m_flNextFollowTime`
     */
    get nextFollowTime(): number;
    set nextFollowTime(value: number);
    /**
     * The speed at which the player's legs turn after the body, for his animation.
     *
     * Pawn: `CBasePlayer::m_flYawModifier`
     */
    get yawModifier(): number;
    set yawModifier(value: number);
    /**
     * The game time when the player's flashbang blindness ends. Writing it does not blind the screen — that is `player.screen.fade`.
     *
     * Pawn: `CBasePlayer::m_blindUntilTime`
     */
    get blindUntilTime(): number;
    set blindUntilTime(value: number);
    /**
     * The game time when the player was blinded.
     *
     * Pawn: `CBasePlayer::m_blindStartTime`
     */
    get blindStartTime(): number;
    set blindStartTime(value: number);
    /**
     * The time the player's blindness stays full, in seconds.
     *
     * Pawn: `CBasePlayer::m_blindHoldTime`
     */
    get blindHoldTime(): number;
    set blindHoldTime(value: number);
    /**
     * The time the player's blindness takes to fade, in seconds.
     *
     * Pawn: `CBasePlayer::m_blindFadeTime`
     */
    get blindFadeTime(): number;
    set blindFadeTime(value: number);
    /**
     * The strength of the player's blindness, `0` to `255`; `255` is fully blind.
     *
     * Pawn: `CBasePlayer::m_blindAlpha`
     */
    get blindAlpha(): number;
    set blindAlpha(value: number);
    /**
     * The game time from which a bot may follow teammates on its own.
     *
     * Pawn: `CBasePlayer::m_allowAutoFollowTime`
     */
    get allowAutoFollowTime(): number;
    set allowAutoFollowTime(value: number);
    /**
     * The player's autobuy list: the items his client sent for `autobuy`.
     *
     * Pawn: `CBasePlayer::m_autoBuyString`
     */
    get autoBuyString(): string;
    set autoBuyString(value: string);
    /**
     * The player's rebuy list: the items his client sent for `rebuy`.
     *
     * Pawn: `CBasePlayer::m_rebuyString`
     */
    get rebuyString(): string;
    set rebuyString(value: string);
    /**
     * `true` while the rebuy command is buying the player's last equipment.
     *
     * Pawn: `CBasePlayer::m_bIsInRebuy`
     */
    get isInRebuy(): boolean;
    set isInRebuy(value: boolean);
    /**
     * The game time of the last update of the player's location name (the place on the map).
     *
     * Pawn: `CBasePlayer::m_flLastUpdateTime`
     */
    get lastUpdateTime(): number;
    set lastUpdateTime(value: number);
    /**
     * The name of the place on the map the player was last in, which the radio and team chat name, e.g. `"BombsiteA"`.
     *
     * Pawn: `CBasePlayer::m_lastLocation`
     */
    get lastLocation(): string;
    set lastLocation(value: string);
    /**
     * The game time when the player's progress bar (defusing, planting) started; `0` for none.
     *
     * Pawn: `CBasePlayer::m_progressStart`
     */
    get progressBarStart(): number;
    set progressBarStart(value: number);
    /**
     * The game time when the player's progress bar fills.
     *
     * Pawn: `CBasePlayer::m_progressEnd`
     */
    get progressBarEnd(): number;
    set progressBarEnd(value: number);
    /**
     * `true` if the spectator's chase camera follows the target's view rather than turning freely.
     *
     * Pawn: `CBasePlayer::m_bObserverAutoDirector`
     */
    get observerAutoDirector(): boolean;
    set observerAutoDirector(value: boolean);
    /**
     * `true` if the spectator may change his view mode; `false` right after death.
     *
     * Pawn: `CBasePlayer::m_canSwitchObserverModes`
     */
    get canSwitchObserverModes(): boolean;
    set canSwitchObserverModes(value: boolean);
    /**
     * A Condition Zero leftover; the game does not use it.
     *
     * Pawn: `CBasePlayer::m_heartBeatTime`
     */
    get heartBeatTime(): number;
    set heartBeatTime(value: number);
    /**
     * A Condition Zero leftover; the game does not use it.
     *
     * Pawn: `CBasePlayer::m_intenseTimestamp`
     */
    get intenseTimestamp(): number;
    set intenseTimestamp(value: number);
    /**
     * A Condition Zero leftover; the game does not use it.
     *
     * Pawn: `CBasePlayer::m_silentTimestamp`
     */
    get silentTimestamp(): number;
    set silentTimestamp(value: number);
    /**
     * A Condition Zero leftover, one of: `"silent"`, `"calm"`, `"intense"`; the game does not use it.
     *
     * Pawn: `CBasePlayer::m_musicState`
     */
    get musicState(): MusicState;
    set musicState(value: MusicState);
    /**
     * The player's money last sent to the other players' scoreboards.
     *
     * Pawn: `CBasePlayer::m_iLastAccount`
     */
    get lastSentMoney(): number;
    set lastSentMoney(value: number);
    /**
     * The player's health last sent to the other players' scoreboards.
     *
     * Pawn: `CBasePlayer::m_iLastClientHealth`
     */
    get lastClientHealth(): number;
    set lastClientHealth(value: number);
    /**
     * The game time when the player's money and health are next sent to the scoreboards, even unchanged; every 5 seconds.
     *
     * Pawn: `CBasePlayer::m_tmNextAccountHealthUpdate`
     */
    get nextScoreboardUpdate(): number;
    set nextScoreboardUpdate(value: number);
    /**
     * The player's spectator mode, one of: `"none"` - not spectating; `"chaseLocked"` - a camera behind the target that turns with him; `"chaseFree"` - a camera behind the target that turns freely; `"roaming"` - flies freely; `"inEye"` - first person, through the target's eyes; `"mapFree"` - the overview map, moving freely; `"mapChase"` - the overview map, following the target. Setting a mode switches his camera as the game does when he picks it: onto someone he may watch, `"roaming"` when there is nobody; the target is iuser2. Setting `"none"` only clears the field: the game ends spectating when he spawns.
     *
     * Pawn: `pev->iuser1`, `OBS_*`, `rg_set_observer_mode`
     */
    get observerMode(): ObserverMode;
    set observerMode(value: ObserverMode);
    /**
     * Adds points to the player's score, as a kill does; `allowNegative` lets the score go below `0`.
     *
     * Pawn: `ExecuteHamB(Ham_AddPoints, ...)`, `ExecuteHam`
     */
    addFrags(points: number, allowNegative: boolean, options?: ActionOptions): void;
    /**
     * Adds points to the scores of the player's team, as the game does for an objective.
     *
     * Pawn: `ExecuteHamB(Ham_AddPointsToTeam, ...)`, `ExecuteHam`
     */
    addTeamScore(points: number, allowNegative: boolean, options?: ActionOptions): void;
    /**
     * Puts a weapon entity into the player's inventory; `true` when it went in. To give a weapon by name, `player.give`.
     *
     * Pawn: `ExecuteHamB(Ham_AddPlayerItem, ...)`, `ExecuteHam`
     */
    addItem(item: Weapon, options?: ActionOptions): bool;
    /**
     * Takes a weapon entity out of the player's inventory, leaving the entity; `true` when it was there.
     *
     * Pawn: `ExecuteHamB(Ham_RemovePlayerItem, ...)`, `ExecuteHam`
     */
    removeItem(item: Weapon, options?: ActionOptions): bool;
    /**
     * Gives the player ammo of a kind by the game's name, e.g. `"buckshot"`, up to `max`; returns the ammo's index, `-1` when none went in.
     *
     * Pawn: `ExecuteHamB(Ham_GiveAmmo, ...)`, `ExecuteHam`
     */
    giveAmmo(amount: number, name: string, max: number, options?: ActionOptions): number;
    /**
     * Runs the game's jump for the player, as when he presses jump.
     *
     * Pawn: `ExecuteHamB(Ham_Player_Jump, ...)`, `ExecuteHam`
     */
    jump(options?: ActionOptions): void;
    /**
     * Runs the game's duck for the player, as when he holds duck.
     *
     * Pawn: `ExecuteHamB(Ham_Player_Duck, ...)`, `ExecuteHam`
     */
    duck(options?: ActionOptions): void;
    /**
     * Every weapon the player carries: the first item of each of the six
     * slots (m_rgpPlayerItems), and the ones chained behind it (m_pNext) -
     * the grenades all share slot four.
     */
    get items(): Weapon[];
}
/**
 * The game rules' members, the fields of `game`: `game.freezePeriod`,
 * `game.ctWins`. The facade's Game extends this.
 */
export declare class GameFields {
    /**
     * `true` during the freeze time at a round's start, while players cannot move or shoot. Writing `false` ends it for the game's own checks.
     *
     * Pawn: `CSGameRules::m_bFreezePeriod`
     */
    get isFreezeTime(): boolean;
    set isFreezeTime(value: boolean);
    /**
     * `true` while the bomb lies on the ground, dropped by its carrier.
     *
     * Pawn: `CSGameRules::m_bBombDropped`
     */
    get bombDropped(): boolean;
    set bombDropped(value: boolean);
    /**
     * The game's name in the server browser, e.g. `"Counter-Strike"`.
     *
     * Pawn: `CSGameRules::m_GameDesc`
     */
    get gameName(): string;
    set gameName(value: string);
    /**
     * The number of player slots, as the game's voice code counts them.
     *
     * Pawn: `CSGameRules::m_nMaxPlayers`
     */
    get maxPlayers(): number;
    set maxPlayers(value: number);
    /**
     * The seconds between the game's updates of who hears whom on the voice chat.
     *
     * Pawn: `CSGameRules::m_UpdateInterval`
     */
    get updateInterval(): number;
    set updateInterval(value: number);
    /**
     * The game time the next round starts at, after a round's end or a restart; `0` when none is due.
     *
     * Pawn: `CSGameRules::m_flRestartRoundTime`
     */
    get newRoundTime(): number;
    set newRoundTime(value: number);
    /**
     * The game time of the game's next check whether a side has won; `0` when none is due.
     *
     * Pawn: `CSGameRules::m_flCheckWinConditions`
     */
    get checkWinConditionsTime(): number;
    set checkWinConditionsTime(value: number);
    /**
     * The game time the round's play began: the end of the freeze time.
     *
     * Pawn: `CSGameRules::m_fRoundStartTime`
     */
    get roundStartTime(): number;
    set roundStartTime(value: number);
    /**
     * The round's length in seconds; during the freeze time, the freeze time's.
     *
     * Pawn: `CSGameRules::m_iRoundTime`
     */
    get roundTime(): number;
    set roundTime(value: number);
    /**
     * The round's length in seconds, from `mp_roundtime`.
     *
     * Pawn: `CSGameRules::m_iRoundTimeSecs`
     */
    get roundTimeSecs(): number;
    set roundTimeSecs(value: number);
    /**
     * The freeze time's length in seconds, from `mp_freezetime`.
     *
     * Pawn: `CSGameRules::m_iIntroRoundTime`
     */
    get freezeTime(): number;
    set freezeTime(value: number);
    /**
     * The game time the round started, the freeze time included.
     *
     * Pawn: `CSGameRules::m_fRoundStartTimeReal`
     */
    get freezeStartTime(): number;
    set freezeStartTime(value: number);
    /**
     * The money every terrorist is paid when the next round starts, for how this one went.
     *
     * Pawn: `CSGameRules::m_iAccountTerrorist`
     */
    get terroristRoundBonus(): number;
    set terroristRoundBonus(value: number);
    /**
     * The money every counter-terrorist is paid when the next round starts, for how this one went.
     *
     * Pawn: `CSGameRules::m_iAccountCT`
     */
    get ctRoundBonus(): number;
    set ctRoundBonus(value: number);
    /**
     * The number of terrorists, counted when a round ends.
     *
     * Pawn: `CSGameRules::m_iNumTerrorist`
     */
    get terroristCount(): number;
    set terroristCount(value: number);
    /**
     * The number of counter-terrorists, counted when a round ends.
     *
     * Pawn: `CSGameRules::m_iNumCT`
     */
    get ctCount(): number;
    set ctCount(value: number);
    /**
     * The number of terrorists who can spawn in the next round, counted when a round ends.
     *
     * Pawn: `CSGameRules::m_iNumSpawnableTerrorist`
     */
    get spawnableTerrorists(): number;
    set spawnableTerrorists(value: number);
    /**
     * The number of counter-terrorists who can spawn in the next round, counted when a round ends.
     *
     * Pawn: `CSGameRules::m_iNumSpawnableCT`
     */
    get spawnableCts(): number;
    set spawnableCts(value: number);
    /**
     * The number of the map's terrorist spawn points.
     *
     * Pawn: `CSGameRules::m_iSpawnPointCount_Terrorist`
     */
    get spawnPointCountTerrorist(): number;
    set spawnPointCountTerrorist(value: number);
    /**
     * The number of the map's counter-terrorist spawn points.
     *
     * Pawn: `CSGameRules::m_iSpawnPointCount_CT`
     */
    get spawnPointCountCt(): number;
    set spawnPointCountCt(value: number);
    /**
     * The number of hostages rescued this round.
     *
     * Pawn: `CSGameRules::m_iHostagesRescued`
     */
    get hostagesRescued(): number;
    set hostagesRescued(value: number);
    /**
     * The number of hostages a counter-terrorist has led away this round.
     *
     * Pawn: `CSGameRules::m_iHostagesTouched`
     */
    get hostagesTouched(): number;
    set hostagesTouched(value: number);
    /**
     * The last round's winner, one of `"CT"`, `"TERRORIST"`, `"draw"`, or `"none"` while the round goes on.
     *
     * Pawn: `CSGameRules::m_iRoundWinStatus`
     */
    get roundWinner(): RoundWinner;
    set roundWinner(value: RoundWinner);
    /**
     * The counter-terrorists' score: the rounds they have won. Writing it changes the score, and the scoreboard shows it at once.
     *
     * Pawn: `CSGameRules::m_iNumCTWins`, `rg_update_teamscores`
     */
    get ctWins(): number;
    set ctWins(value: number);
    /**
     * The terrorists' score: the rounds they have won. Writing it changes the score, and the scoreboard shows it at once.
     *
     * Pawn: `CSGameRules::m_iNumTerroristWins`, `rg_update_teamscores`
     */
    get terroristWins(): number;
    set terroristWins(value: number);
    /**
     * `true` once the bomb has blown a target up this round.
     *
     * Pawn: `CSGameRules::m_bTargetBombed`
     */
    get targetBombed(): boolean;
    set targetBombed(value: boolean);
    /**
     * `true` once the bomb has been defused this round.
     *
     * Pawn: `CSGameRules::m_bBombDefused`
     */
    get bombDefused(): boolean;
    set bombDefused(value: boolean);
    /**
     * `true` when the map has a bomb site.
     *
     * Pawn: `CSGameRules::m_bMapHasBombTarget`
     */
    get mapHasBombTarget(): boolean;
    set mapHasBombTarget(value: boolean);
    /**
     * `true` when the map has a bomb zone a planter must stand in.
     *
     * Pawn: `CSGameRules::m_bMapHasBombZone`
     */
    get mapHasBombZone(): boolean;
    set mapHasBombZone(value: boolean);
    /**
     * `true` when the map has buy zones of its own.
     *
     * Pawn: `CSGameRules::m_bMapHasBuyZone`
     */
    get mapHasBuyZone(): boolean;
    set mapHasBuyZone(value: boolean);
    /**
     * `true` when the map has a hostage rescue zone.
     *
     * Pawn: `CSGameRules::m_bMapHasRescueZone`
     */
    get mapHasRescueZone(): boolean;
    set mapHasRescueZone(value: boolean);
    /**
     * `true` when the map has an escape zone for the terrorists.
     *
     * Pawn: `CSGameRules::m_bMapHasEscapeZone`
     */
    get mapHasEscapeZone(): boolean;
    set mapHasEscapeZone(value: boolean);
    /**
     * Whether the map has a VIP safety zone, one of `"yes"`, `"no"`, or `"notChecked"` until the game has looked.
     *
     * Pawn: `CSGameRules::m_bMapHasVIPSafetyZone`
     */
    get mapHasVipSafetyZone(): VipSafetyZone;
    set mapHasVipSafetyZone(value: VipSafetyZone);
    /**
     * `true` when the map has spectator cameras.
     *
     * Pawn: `CSGameRules::m_bMapHasCameras`
     */
    get mapHasCameras(): boolean;
    set mapHasCameras(value: boolean);
    /**
     * The bomb's timer in seconds, from `mp_c4timer`.
     *
     * Pawn: `CSGameRules::m_iC4Timer`
     */
    get bombTimer(): number;
    set bombTimer(value: number);
    /**
     * The terrorist who got the bomb this round, or `null`. Read only.
     *
     * Pawn: `CSGameRules::m_iC4Guy`
     */
    get bomber(): Player | null;
    /**
     * The money the side that loses a round is paid; it grows with each loss in a row.
     *
     * Pawn: `CSGameRules::m_iLoserBonus`
     */
    get loserBonus(): number;
    set loserBonus(value: number);
    /**
     * The number of rounds the counter-terrorists have lost in a row.
     *
     * Pawn: `CSGameRules::m_iNumConsecutiveCTLoses`
     */
    get ctLossStreak(): number;
    set ctLossStreak(value: number);
    /**
     * The number of rounds the terrorists have lost in a row.
     *
     * Pawn: `CSGameRules::m_iNumConsecutiveTerroristLoses`
     */
    get terroristLossStreak(): number;
    set terroristLossStreak(value: number);
    /**
     * The seconds a player may stand idle before he is kicked, with `mp_autokick` on.
     *
     * Pawn: `CSGameRules::m_fMaxIdlePeriod`
     */
    get maxIdlePeriod(): number;
    set maxIdlePeriod(value: number);
    /**
     * The most one side may outnumber the other by, from `mp_limitteams`.
     *
     * Pawn: `CSGameRules::m_iLimitTeams`
     */
    get limitTeams(): number;
    set limitTeams(value: number);
    /**
     * `true` once the game has looked the map over for its bomb sites, buy zones and hostages.
     *
     * Pawn: `CSGameRules::m_bLevelInitialized`
     */
    get mapInitialized(): boolean;
    set mapInitialized(value: boolean);
    /**
     * `true` from a round's end until the next round starts.
     *
     * Pawn: `CSGameRules::m_bRoundTerminating`
     */
    get roundEnding(): boolean;
    set roundEnding(value: boolean);
    /**
     * `true` when the next restart resets everything, the scores too, as `sv_restart` does.
     *
     * Pawn: `CSGameRules::m_bCompleteReset`
     */
    get completeReset(): boolean;
    set completeReset(value: boolean);
    /**
     * The share of terrorists, `0` to `1`, who must escape for them to win on an escape map.
     *
     * Pawn: `CSGameRules::m_flRequiredEscapeRatio`
     */
    get requiredEscapeRatio(): number;
    set requiredEscapeRatio(value: number);
    /**
     * The number of terrorists who can escape, on an escape map.
     *
     * Pawn: `CSGameRules::m_iNumEscapers`
     */
    get numEscapers(): number;
    set numEscapers(value: number);
    /**
     * The number of terrorists who have escaped this round.
     *
     * Pawn: `CSGameRules::m_iHaveEscaped`
     */
    get haveEscaped(): number;
    set haveEscaped(value: number);
    /**
     * `true` while the counter-terrorists may not buy.
     *
     * Pawn: `CSGameRules::m_bCTCantBuy`
     */
    get ctsCantBuy(): boolean;
    set ctsCantBuy(value: boolean);
    /**
     * `true` while the terrorists may not buy.
     *
     * Pawn: `CSGameRules::m_bTCantBuy`
     */
    get terroristsCantBuy(): boolean;
    set terroristsCantBuy(value: boolean);
    /**
     * The bomb's blast radius, in units, as the map sets it.
     *
     * Pawn: `CSGameRules::m_flBombRadius`
     */
    get bombRadius(): number;
    set bombRadius(value: number);
    /**
     * The number of rounds in a row the same player has been the VIP.
     *
     * Pawn: `CSGameRules::m_iConsecutiveVIP`
     */
    get consecutiveVip(): number;
    set consecutiveVip(value: number);
    /**
     * The number of guns the game has counted lying on the map.
     *
     * Pawn: `CSGameRules::m_iTotalGunCount`
     */
    get totalGunCount(): number;
    set totalGunCount(value: number);
    /**
     * The number of grenades the game has counted lying on the map.
     *
     * Pawn: `CSGameRules::m_iTotalGrenadeCount`
     */
    get totalGrenadeCount(): number;
    set totalGrenadeCount(value: number);
    /**
     * The number of armour pieces the game has counted lying on the map.
     *
     * Pawn: `CSGameRules::m_iTotalArmourCount`
     */
    get totalArmourCount(): number;
    set totalArmourCount(value: number);
    /**
     * The number of rounds in a row one side has outnumbered the other by more than two; the game balances the sides after enough of them.
     *
     * Pawn: `CSGameRules::m_iUnBalancedRounds`
     */
    get unbalancedRounds(): number;
    set unbalancedRounds(value: number);
    /**
     * The number of escape rounds played in a row; the sides swap after 8.
     *
     * Pawn: `CSGameRules::m_iNumEscapeRounds`
     */
    get numEscapeRounds(): number;
    set numEscapeRounds(value: number);
    /**
     * The number of the map the last map vote picked.
     *
     * Pawn: `CSGameRules::m_iLastPick`
     */
    get lastPick(): number;
    set lastPick(value: number);
    /**
     * The map's time limit, from `mp_timelimit`.
     *
     * Pawn: `CSGameRules::m_iMaxMapTime`
     */
    get maxMapTime(): number;
    set maxMapTime(value: number);
    /**
     * The number of rounds the map lasts, from `mp_maxrounds`; `0` for no limit.
     *
     * Pawn: `CSGameRules::m_iMaxRounds`
     */
    get maxRounds(): number;
    set maxRounds(value: number);
    /**
     * The number of rounds played on the map.
     *
     * Pawn: `CSGameRules::m_iTotalRoundsPlayed`
     */
    get totalRoundsPlayed(): number;
    set totalRoundsPlayed(value: number);
    /**
     * The number of rounds a side must win to end the map, from `mp_winlimit`; `0` for no limit.
     *
     * Pawn: `CSGameRules::m_iMaxRoundsWon`
     */
    get maxRoundsWon(): number;
    set maxRoundsWon(value: number);
    /**
     * The value of `allow_spectators` the game remembers to notice when it changes.
     *
     * Pawn: `CSGameRules::m_iStoredSpectValue`
     */
    get storedSpectValue(): number;
    set storedSpectValue(value: number);
    /**
     * The value of `mp_forcecamera` the game remembers to notice when it changes.
     *
     * Pawn: `CSGameRules::m_flForceCameraValue`
     */
    get forceCamera(): number;
    set forceCamera(value: number);
    /**
     * The value of `mp_forcechasecam` the game remembers to notice when it changes.
     *
     * Pawn: `CSGameRules::m_flForceChaseCamValue`
     */
    get forceChaseCam(): number;
    set forceChaseCam(value: number);
    /**
     * The value of `mp_fadetoblack` the game remembers to notice when it changes.
     *
     * Pawn: `CSGameRules::m_flFadeToBlackValue`
     */
    get fadeToBlack(): number;
    set fadeToBlack(value: number);
    /**
     * The VIP on an assassination map, a player `id`; `0` for none.
     *
     * Pawn: `CSGameRules::m_pVIP`
     */
    get vip(): number;
    set vip(value: number);
    /**
     * The game time the intermission at the map's end is over and the next map loads.
     *
     * Pawn: `CSGameRules::m_flIntermissionEndTime`
     */
    get intermissionEndTime(): number;
    set intermissionEndTime(value: number);
    /**
     * The game time the intermission at the map's end began.
     *
     * Pawn: `CSGameRules::m_flIntermissionStartTime`
     */
    get intermissionStartTime(): number;
    set intermissionStartTime(value: number);
    /**
     * `true` once a player has pressed a button to end the intermission early.
     *
     * Pawn: `CSGameRules::m_iEndIntermissionButtonHit`
     */
    get intermissionSkipped(): boolean;
    set intermissionSkipped(value: boolean);
    /**
     * The game time of the game's next periodic check of its limits and cvars.
     *
     * Pawn: `CSGameRules::m_tmNextPeriodicThink`
     */
    get nextPeriodicThink(): number;
    set nextPeriodicThink(value: number);
    /**
     * `true` once the game has begun: both sides have had players. Until then a round ends with “Game Commencing”.
     *
     * Pawn: `CSGameRules::m_bGameStarted`
     */
    get gameStarted(): boolean;
    set gameStarted(value: boolean);
    /**
     * `true` when the next round starts without respawning the players.
     *
     * Pawn: `CSGameRules::m_bSkipSpawn`
     */
    get skipSpawn(): boolean;
    set skipSpawn(value: boolean);
    /**
     * `true` while a joining player is not shown the team menu.
     *
     * Pawn: `CSGameRules::m_bSkipShowMenu`
     */
    get skipShowMenu(): boolean;
    set skipShowMenu(value: boolean);
    /**
     * `true` while the game waits for players because a side is empty.
     *
     * Pawn: `CSGameRules::m_bNeededPlayers`
     */
    get neededPlayers(): boolean;
    set neededPlayers(value: boolean);
    /**
     * The share of terrorists, `0` to `1`, who have escaped this round.
     *
     * Pawn: `CSGameRules::m_flEscapeRatio`
     */
    get escapeRatio(): number;
    set escapeRatio(value: number);
    /**
     * The game time the map ends by `mp_timelimit`; `0` for no limit.
     *
     * Pawn: `CSGameRules::m_flTimeLimit`
     */
    get timeLimit(): number;
    set timeLimit(value: number);
    /**
     * The game time the game began, after “Game Commencing”.
     *
     * Pawn: `CSGameRules::m_flGameStartTime`
     */
    get gameStartTime(): number;
    set gameStartTime(value: number);
    /**
     * `true` when the sides were balanced at this round's start.
     *
     * Pawn: `CSGameRules::m_bTeamBalanced`
     */
    get teamBalanced(): boolean;
    set teamBalanced(value: boolean);
}
/** What a weapon is, by the name CS gives it without the WEAPON_ prefix. */
export type WeaponKind = "none" | "p228" | "glock" | "scout" | "hegrenade" | "xm1014" | "c4" | "mac10" | "aug" | "smokegrenade" | "elite" | "fiveseven" | "ump45" | "sg550" | "galil" | "famas" | "usp" | "glock18" | "awp" | "mp5n" | "m249" | "m3" | "m4a1" | "tmp" | "g3sg1" | "flashbang" | "deagle" | "sg552" | "ak47" | "knife" | "p90" | "shieldgun";
/** m_iId as a name; an id this does not know reads as "none". */
export declare function weaponKindOf(id: number): WeaponKind;
/** A weapon: its entvars, and the members of CBasePlayerItem and CBasePlayerWeapon. */
export declare class Weapon extends Entity {
    /** m_iId - which weapon this is: `weapon.kind == "knife"`. */
    get kind(): WeaponKind;
    /** m_iId as the number WEAPON_* constants hold. */
    get kindId(): number;
    /**
     * The weapon's class name, e.g. `"weapon_ak47"`: the name `player.give`, `setAmmo`, `getAmmo` and `switchWeapon` take - `player.give(weapon.classname)`.
     *
     * Pawn: `pev->classname`, `get_weaponname`
     */
    get classname(): WeaponName;
    set classname(value: WeaponName);
    /**
     * The player holding the weapon, or `null` if it lies on the ground. Read only.
     *
     * Pawn: `CBasePlayerItem::m_pPlayer`
     */
    get player(): Player | null;
    /**
     * The next weapon in the same inventory slot (grenades share one), or `null`. Read only.
     *
     * Pawn: `CBasePlayerItem::m_pNext`
     */
    get next(): Weapon | null;
    /**
     * The weapon's empty “click”: `1` if it may play on the next attack.
     *
     * Pawn: `CBasePlayerWeapon::m_iPlayEmptySound` (reapi `m_Weapon_iPlayEmptySound`)
     */
    get playEmptySound(): number;
    set playEmptySound(value: number);
    /**
     * The weapon's “firing on empty” mark: `1` while the player holds attack with an empty clip.
     *
     * Pawn: `CBasePlayerWeapon::m_fFireOnEmpty` (reapi `m_Weapon_fFireOnEmpty`)
     */
    get fireOnEmpty(): number;
    set fireOnEmpty(value: number);
    /**
     * The time until the weapon can fire again, in seconds, counting down by itself: about `0.1` after an AK-47 shot, `1.45` after an AWP one.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextPrimaryAttack` (reapi `m_Weapon_flNextPrimaryAttack`)
     */
    get nextPrimaryAttack(): number;
    set nextPrimaryAttack(value: number);
    /**
     * The time until the weapon's secondary attack (zoom, silencer, burst mode) works again, in seconds, counting down by itself.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextSecondaryAttack` (reapi `m_Weapon_flNextSecondaryAttack`)
     */
    get nextSecondaryAttack(): number;
    set nextSecondaryAttack(value: number);
    /**
     * The time until the weapon plays its idle animation, in seconds, counting down by itself.
     *
     * Pawn: `CBasePlayerWeapon::m_flTimeWeaponIdle` (reapi `m_Weapon_flTimeWeaponIdle`)
     */
    get nextIdle(): number;
    set nextIdle(value: number);
    /**
     * The weapon's ammo kind — the slot of the player's ammo it takes from; `-1` for none (a knife).
     *
     * Pawn: `CBasePlayerWeapon::m_iPrimaryAmmoType` (reapi `m_Weapon_iPrimaryAmmoType`)
     */
    get ammoType(): number;
    set ammoType(value: number);
    /**
     * The weapon's secondary ammo slot; CS weapons have none (`-1`).
     *
     * Pawn: `CBasePlayerWeapon::m_iSecondaryAmmoType` (reapi `m_Weapon_iSecondaryAmmoType`)
     */
    get secondaryAmmoType(): number;
    set secondaryAmmoType(value: number);
    /**
     * The rounds in the weapon's magazine: `30` in a full AK-47; `-1` for the knife, which has none.
     *
     * Pawn: `CBasePlayerWeapon::m_iClip` (reapi `m_Weapon_iClip`)
     */
    get clip(): number;
    set clip(value: number);
    /**
     * The clip last sent to the player's HUD; when it differs from clip, the game sends the new one.
     *
     * Pawn: `CBasePlayerWeapon::m_iClientClip` (reapi `m_Weapon_iClientClip`)
     */
    get clipSent(): number;
    set clipSent(value: number);
    /**
     * The weapon's state (held or not) last sent to the player's HUD.
     *
     * Pawn: `CBasePlayerWeapon::m_iClientWeaponState` (reapi `m_Weapon_iClientWeaponState`)
     */
    get clientWeaponState(): number;
    set clientWeaponState(value: number);
    /**
     * The weapon's reload mark: `1` while it is reloading.
     *
     * Pawn: `CBasePlayerWeapon::m_fInReload` (reapi `m_Weapon_fInReload`)
     */
    get isReloading(): number;
    set isReloading(value: number);
    /**
     * The shotgun's shell-by-shell reload stage: `0` not reloading, `1` starting, `2` putting a shell in.
     *
     * Pawn: `CBasePlayerWeapon::m_fInSpecialReload` (reapi `m_Weapon_fInSpecialReload`)
     */
    get shotgunReloadStage(): number;
    set shotgunReloadStage(value: number);
    /**
     * The ammo the weapon gives when first picked up; `0` for one dropped by a player (only its clip).
     *
     * Pawn: `CBasePlayerWeapon::m_iDefaultAmmo` (reapi `m_Weapon_iDefaultAmmo`)
     */
    get defaultAmmo(): number;
    set defaultAmmo(value: number);
    /**
     * The shell casing model the weapon throws out (precached).
     *
     * Pawn: `CBasePlayerWeapon::m_iShellId` (reapi `m_Weapon_iShellId`)
     */
    get shellId(): number;
    set shellId(value: number);
    /**
     * `true` from a shot until the attack button is let go; this way tapping the button does not keep single-shot accuracy.
     *
     * Pawn: `CBasePlayerWeapon::m_bDelayFire` (reapi `m_Weapon_bDelayFire`)
     */
    get delayFire(): boolean;
    set delayFire(value: boolean);
    /**
     * The side the weapon's recoil pulls to next, left or right; it flips from time to time.
     *
     * Pawn: `CBasePlayerWeapon::m_iDirection` (reapi `m_Weapon_iDirection`)
     */
    get direction(): number;
    set direction(value: number);
    /**
     * The weapon's flag meant for a second silencer. CS does not use the field.
     *
     * Pawn: `CBasePlayerWeapon::m_bSecondarySilencerOn` (reapi `m_Weapon_bSecondarySilencerOn`)
     */
    get secondarySilencerOn(): boolean;
    set secondarySilencerOn(value: boolean);
    /**
     * The weapon's current inaccuracy: it grows as it fires and settles back; each weapon has its own range (`0.2` for a fresh AK-47).
     *
     * Pawn: `CBasePlayerWeapon::m_flAccuracy` (reapi `m_Weapon_flAccuracy`)
     */
    get accuracy(): number;
    set accuracy(value: number);
    /**
     * The shots in the weapon's current burst; the recoil grows with it, and it drops back once the player stops firing.
     *
     * Pawn: `CBasePlayerWeapon::m_iShotsFired` (reapi `m_Weapon_iShotsFired`)
     */
    get shotsFired(): number;
    set shotsFired(value: number);
    /**
     * The game time of the next round in the Glock's burst; `0` when not bursting.
     *
     * Pawn: `CBasePlayerWeapon::m_flGlock18Shoot` (reapi `m_Weapon_flGlock18Shoot`)
     */
    get glockNextBurstShot(): number;
    set glockNextBurstShot(value: number);
    /**
     * The rounds the Glock has fired in the current burst.
     *
     * Pawn: `CBasePlayerWeapon::m_iGlock18ShotsFired` (reapi `m_Weapon_iGlock18ShotsFired`)
     */
    get glockBurstShots(): number;
    set glockBurstShots(value: number);
    /**
     * The game time of the next round in the FAMAS's burst; `0` when not bursting.
     *
     * Pawn: `CBasePlayerWeapon::m_flFamasShoot` (reapi `m_Weapon_flFamasShoot`)
     */
    get famasNextBurstShot(): number;
    set famasNextBurstShot(value: number);
    /**
     * The rounds the FAMAS has fired in the current burst.
     *
     * Pawn: `CBasePlayerWeapon::m_iFamasShotsFired` (reapi `m_Weapon_iFamasShotsFired`)
     */
    get famasBurstShots(): number;
    set famasBurstShots(value: number);
    /**
     * The spread of the FAMAS's burst, kept for its later rounds.
     *
     * Pawn: `CBasePlayerWeapon::m_fBurstSpread` (reapi `m_Weapon_fBurstSpread`)
     */
    get burstSpread(): number;
    set burstSpread(value: number);
    /**
     * The weapon's modes, a list of any of: `"UspSilenced"` - the USP's silencer is on, `"Glock18Burst"` - the Glock fires bursts, `"M4a1Silenced"` - the M4A1's silencer is on, `"EliteLeft"` - the Elites fire the left gun next, `"FamasBurst"` - the FAMAS fires bursts, `"ShieldDrawn"` - the shield is up.
     *
     * Pawn: `CBasePlayerWeapon::m_iWeaponState` (reapi `m_Weapon_iWeaponState`), `WPNSTATE_*`
     */
    get weaponState(): WeaponState[];
    set weaponState(values: WeaponState[]);
    /**
     * The time until the shotgun's next shell goes in during its reload, in seconds, counting down.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextReload` (reapi `m_Weapon_flNextReload`)
     */
    get nextReload(): number;
    set nextReload(value: number);
    /**
     * The game time when `shotsFired` next goes down by one after the player stops firing.
     *
     * Pawn: `CBasePlayerWeapon::m_flDecreaseShotsFired` (reapi `m_Weapon_flDecreaseShotsFired`)
     */
    get recoilResetTime(): number;
    set recoilResetTime(value: number);
    /**
     * The delay between the weapon's last two shots, in seconds; the game uses it to keep the fire rate even.
     *
     * Pawn: `CBasePlayerWeapon::m_flPrevPrimaryAttack` (reapi `m_Weapon_flPrevPrimaryAttack`)
     */
    get prevPrimaryAttack(): number;
    set prevPrimaryAttack(value: number);
    /**
     * The game time of the weapon's last shot; `0` before the first one.
     *
     * Pawn: `CBasePlayerWeapon::m_flLastFireTime` (reapi `m_Weapon_flLastFireTime`)
     */
    get lastFireTime(): number;
    set lastFireTime(value: number);
    /**
     * Gives the weapon to the player, as picking it up does; `true` when he took it.
     *
     * Pawn: `ExecuteHamB(Ham_Item_AddToPlayer, ...)`, `ExecuteHam`
     */
    addToPlayer(player: Player, options?: ActionOptions): bool;
    /**
     * Draws the weapon in its owner's hands, as switching to it does - the model and the animation shown again: `knife.deploy()`. `true` when it was drawn.
     *
     * Pawn: `ExecuteHamB(Ham_Item_Deploy, ...)`, `ExecuteHam`
     */
    deploy(options?: ActionOptions): bool;
    /**
     * Puts the weapon away, as switching from it does.
     *
     * Pawn: `ExecuteHamB(Ham_Item_Holster, ...)`, `ExecuteHam`
     */
    holster(options?: ActionOptions): void;
    /**
     * Drops the weapon out of its owner's inventory.
     *
     * Pawn: `ExecuteHamB(Ham_Item_Drop, ...)`, `ExecuteHam`
     */
    drop(options?: ActionOptions): void;
    /**
     * Attaches the weapon to the player as his, without the pick-up.
     *
     * Pawn: `ExecuteHamB(Ham_Item_AttachToPlayer, ...)`, `ExecuteHam`
     */
    attachToPlayer(player: Player, options?: ActionOptions): void;
    /**
     * Moves this weapon's ammo into `target`, as picking up a second one of a kind does; the ammo moved.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_ExtractAmmo, ...)`, `ExecuteHam`
     */
    extractAmmo(target: Weapon, options?: ActionOptions): number;
    /**
     * Moves the ammo in this weapon's clip into `target`; the ammo moved.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_ExtractClipAmmo, ...)`, `ExecuteHam`
     */
    extractClipAmmo(target: Weapon, options?: ActionOptions): number;
    /**
     * Lets the empty click sound again on the next try.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_ResetEmptySound, ...)`, `ExecuteHam`
     */
    resetEmptySound(options?: ActionOptions): void;
    /**
     * Fires the weapon's primary attack - a shot, a knife's slash - as the left click does.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_PrimaryAttack, ...)`, `ExecuteHam`
     */
    primaryAttack(options?: ActionOptions): void;
    /**
     * Fires the weapon's secondary attack - a knife's stab, a scope - as the right click does: `knife.secondaryAttack()`.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_SecondaryAttack, ...)`, `ExecuteHam`
     */
    secondaryAttack(options?: ActionOptions): void;
    /**
     * Reloads the weapon, as the reload key does.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_Reload, ...)`, `ExecuteHam`
     */
    reload(options?: ActionOptions): void;
    /**
     * Runs the weapon's idle, which plays its idle animation.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_WeaponIdle, ...)`, `ExecuteHam`
     */
    weaponIdle(options?: ActionOptions): void;
    /**
     * Retires the weapon - one out of ammo - and switches its owner to his next best.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_RetireWeapon, ...)`, `ExecuteHam`
     */
    retireWeapon(options?: ActionOptions): void;
    /**
     * Plays one of the weapon's view-model animations by its number; `skipLocal` leaves out a client that predicts it himself.
     *
     * Pawn: `ExecuteHamB(Ham_CS_Weapon_SendWeaponAnim, ...)`, `ExecuteHam`
     */
    sendWeaponAnim(anim: number, skipLocal: boolean, options?: ActionOptions): void;
}
