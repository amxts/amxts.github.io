/// <reference path="../as-types.d.ts" />
import { Player, Resource } from "./facade";
import { Entity, RenderMode } from "./entities";
/** The players who see an effect - the second argument of every `effects` function; everyone when it is left out. An effect is sent as the game sends its own: a player whose connection drops it misses it. */
export interface EffectRecipients {
    /**
     * Only the players who can see this point, e.g. `{ near: grenade.origin }`.
     *
     * Pawn: `MSG_PVS`
     */
    near?: number[];
    /**
     * Only this player, e.g. `{ to: player }`.
     *
     * Pawn: `MSG_ONE_UNRELIABLE`
     */
    to?: Player;
}
/** The options of `effects.gunshot`, `effects.sparks`, `effects.tarExplosion`, `effects.lavaSplash` and `effects.teleport`. */
export interface PointEffectOptions {
    /** The point the effect is at. */
    at: number[];
}
/** The options of `effects.tracer` and `effects.showLine`. */
export interface SegmentEffectOptions {
    /** The point the effect starts from. */
    start: number[];
    /** The point the effect ends at. */
    end: number[];
}
/** The options of `effects.killBeams`. */
export interface EntityEffectOptions {
    /** The entity whose beams go. */
    entity: Entity;
}
/** The options of `effects.killPlayerAttachments`. */
export interface PlayerEffectOptions {
    /** The player whose attached models go. */
    player: Player;
}
/** The options of `effects.beamPoints`. */
export interface BeamPointsOptions {
    /** The point the beam starts from. */
    start: number[];
    /** The point the beam ends at. */
    end: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The beam's width, `0` to `255`: `10` is one unit. */
    width: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
    /** The brightness, `0` to `255`; `255` by default. */
    alpha?: number;
    /** The beam's waver, `0` to `255`: `100` is one unit; `0` by default, a straight beam. */
    noise?: number;
    /** The sprite's frame the beam starts from; `0` by default. */
    frame?: number;
    /** The sprite's frame rate, in tenths of a frame a second; `0` by default. */
    frameRate?: number;
    /** The speed the sprite scrolls along the beam, in tenths of a unit a second; `0` by default. */
    speed?: number;
}
/** The options of `effects.beamEntityPoint`. */
export interface BeamEntityPointOptions {
    /** The entity the beam starts from; the beam follows it as it moves. */
    start: Entity;
    /** The point the beam ends at. */
    end: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The beam's width, `0` to `255`: `10` is one unit. */
    width: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
    /** The brightness, `0` to `255`; `255` by default. */
    alpha?: number;
    /** The beam's waver, `0` to `255`: `100` is one unit; `0` by default, a straight beam. */
    noise?: number;
    /** The sprite's frame the beam starts from; `0` by default. */
    frame?: number;
    /** The sprite's frame rate, in tenths of a frame a second; `0` by default. */
    frameRate?: number;
    /** The speed the sprite scrolls along the beam, in tenths of a unit a second; `0` by default. */
    speed?: number;
}
/** The options of `effects.beamEntities` and `effects.beamRing`. */
export interface BeamEntitiesOptions {
    /** The entity the beam starts from; the beam follows it as it moves. */
    start: Entity;
    /** The entity the beam ends at; the beam follows it as it moves. */
    end: Entity;
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The beam's width, `0` to `255`: `10` is one unit. */
    width: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
    /** The brightness, `0` to `255`; `255` by default. */
    alpha?: number;
    /** The beam's waver, `0` to `255`: `100` is one unit; `0` by default, a straight beam. */
    noise?: number;
    /** The sprite's frame the beam starts from; `0` by default. */
    frame?: number;
    /** The sprite's frame rate, in tenths of a frame a second; `0` by default. */
    frameRate?: number;
    /** The speed the sprite scrolls along the beam, in tenths of a unit a second; `0` by default. */
    speed?: number;
}
/** The options of `effects.beamCylinder`, `effects.beamDisk` and `effects.beamTorus`. */
export interface BeamCircleOptions {
    /** The circle's centre. */
    at: number[];
    /** The circle's radius at the end of its life, in units. */
    radius: number;
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The beam's width, `0` to `255`: `10` is one unit. */
    width: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
    /** The brightness, `0` to `255`; `255` by default. */
    alpha?: number;
    /** The beam's waver, `0` to `255`: `100` is one unit; `0` by default, a straight beam. */
    noise?: number;
    /** The sprite's frame the beam starts from; `0` by default. */
    frame?: number;
    /** The sprite's frame rate, in tenths of a frame a second; `0` by default. */
    frameRate?: number;
    /** The speed the sprite scrolls along the beam, in tenths of a unit a second; `0` by default. */
    speed?: number;
}
/** The options of `effects.beamFollow`. */
export interface BeamFollowOptions {
    /** The entity the trail follows - a grenade, a player. */
    entity: Entity;
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The lifetime of each piece of the trail, in seconds, up to `25.5`. */
    life: number;
    /** The beam's width, `0` to `255`: `10` is one unit. */
    width: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
    /** The brightness, `0` to `255`; `255` by default. */
    alpha?: number;
}
/** The options of `effects.beamSprite`. */
export interface BeamSpriteOptions {
    /** The point the beam starts from. */
    start: number[];
    /** The point the beam ends at, where the end sprite is. */
    end: number[];
    /** The beam's sprite, as `server.precache` returned it. */
    sprite: Resource;
    /** The sprite at the beam's end, as `server.precache` returned it. */
    endSprite: Resource;
}
/** The options of `effects.lightning`. */
export interface LightningOptions {
    /** The point the bolt starts from. */
    start: number[];
    /** The point the bolt ends at. */
    end: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The beam's width, `0` to `255`: `10` is one unit. */
    width: number;
    /** The beam's waver, `0` to `255`: `100` is one unit; `0` by default, a straight beam. */
    noise?: number;
}
/** The options of `effects.explosion`. */
export interface ExplosionOptions {
    /** The point the effect is at. */
    at: number[];
    /** The explosion's sprite, e.g. `sprites/zerogxplode.spr`, as `server.precache` returned it. */
    sprite: Resource;
    /** The sprite's size, `0` to `255`: `10` is its own size; `10` by default. */
    scale?: number;
    /** The sprite's frames a second; `15` by default. */
    frameRate?: number;
    /** Whether the sprite is drawn glowing, added to what is behind it; `true` by default, `false` draws it opaque. */
    additive?: boolean;
    /** Whether the explosion lights up the world around it; `true` by default. */
    lights?: boolean;
    /** Whether the explosion is heard; `true` by default. */
    sound?: boolean;
    /** Whether the explosion throws out particles; `true` by default. */
    particles?: boolean;
}
/** The options of `effects.smoke`. */
export interface SmokeOptions {
    /** The point the effect is at. */
    at: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The sprite's size, `0` to `255`: `10` is its own size; `10` by default. */
    scale?: number;
    /** The sprite's frames a second; `10` by default. */
    frameRate?: number;
}
/** The options of `effects.particleExplosion`. */
export interface ParticleExplosionOptions {
    /** The point the effect is at. */
    at: number[];
    /** The first colour of the game's palette the particles take, `0` to `255`; `0` by default. */
    palette?: number;
    /** The number of the palette's colours from there on the particles take; `16` by default. */
    colors?: number;
}
/** The options of `effects.implosion`. */
export interface ImplosionOptions {
    /** The point the tracers fly into. */
    at: number[];
    /** The distance the tracers start from, in units, up to `255`. */
    radius: number;
    /** The number of tracers, `0` to `255`. */
    count: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
}
/** The options of `effects.spriteTrail`. */
export interface SpriteTrailOptions {
    /** The point the effect starts from. */
    start: number[];
    /** The point the effect ends at. */
    end: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The number of sprites, `0` to `255`. */
    count: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The sprite's size, `0` to `255`: `10` is its own size; `10` by default. */
    scale?: number;
    /** The sprites' speed along the line, `0` to `255`: `1` is ten units a second; `10` by default. */
    speed?: number;
    /** The spread of the sprites' speeds, `0` to `255`: `1` is ten units a second; `10` by default. */
    randomness?: number;
}
/** The options of `effects.sprite`. */
export interface SpriteOptions {
    /** The point the effect is at. */
    at: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The sprite's size, `0` to `255`: `10` is its own size; `10` by default. */
    scale?: number;
    /** The brightness, `0` to `255`; `255` by default. */
    alpha?: number;
}
/** The options of `effects.glowSprite`. */
export interface GlowSpriteOptions {
    /** The point the effect is at. */
    at: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The sprite's size, `0` to `255`: `10` is its own size; `10` by default. */
    scale?: number;
    /** The brightness, `0` to `255`; `255` by default. */
    alpha?: number;
}
/** The options of `effects.streakSplash`. */
export interface StreakSplashOptions {
    /** The point the effect is at. */
    at: number[];
    /** The direction the spray goes, a vector: its length is not read. */
    direction: number[];
    /** The number of tracers, up to `32767`. */
    count: number;
    /** The tracers' speed, in units a second. */
    speed: number;
    /** The spread of the tracers' speeds, in units a second; `0` by default. */
    randomness?: number;
    /** The tracers' colour in the game's palette, `0` to `255`; `5` by default, yellow sparks. */
    palette?: number;
}
/** The options of `effects.dynamicLight`. */
export interface DynamicLightOptions {
    /** The point the light shines from. */
    at: number[];
    /** The light's reach, in units, up to `2550`. */
    radius: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
    /** The speed the light shrinks at, in units a second; `0` by default, not at all. */
    decay?: number;
}
/** The options of `effects.entityLight`. */
export interface EntityLightOptions {
    /** The entity the light follows. */
    entity: Entity;
    /** The point the light starts at. */
    at: number[];
    /** The light's reach, in units. */
    radius: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
    /** The speed the light shrinks at, in units a second; `0` by default, not at all. */
    decay?: number;
}
/** The options of `effects.line`. */
export interface LineOptions {
    /** The point the effect starts from. */
    start: number[];
    /** The point the effect ends at. */
    end: number[];
    /** The effect's lifetime, in seconds. */
    life: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
}
/** The options of `effects.box`. */
export interface BoxOptions {
    /** The box's lower corner. */
    mins: number[];
    /** The box's upper corner. */
    maxs: number[];
    /** The effect's lifetime, in seconds. */
    life: number;
    /** The colour in CSS hex, e.g. `"#0096ff"` or `"#09f"`; white by default. */
    color?: string;
}
/** The options of `effects.largeFunnel`. */
export interface LargeFunnelOptions {
    /** The funnel's bottom. */
    at: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** `true`: the sprites fly out of the funnel rather than into it. */
    reverse?: boolean;
}
/** The options of `effects.blood` and `effects.bloodStream`. */
export interface BloodOptions {
    /** The point the effect is at. */
    at: number[];
    /** The direction the spray goes, a vector: its length is not read. */
    direction: number[];
    /** The spray's speed, `0` to `255`. */
    speed: number;
    /** The blood's colour in the game's palette, `0` to `255`: `247` (the default) is red, `195` yellow. */
    palette?: number;
}
/** The options of `effects.fizz`. */
export interface FizzOptions {
    /** The entity the bubbles rise in - a brush, such as water. */
    entity: Entity;
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The bubbles' density, `0` to `255`. */
    density: number;
}
/** The sound a model makes as it bounces, one of `"none"`, `"shell"` or `"shotgunShell"`. */
export type BounceSound = "none" | "shell" | "shotgunShell";
/** The options of `effects.model`. */
export interface ModelOptions {
    /** The point the effect is at. */
    at: number[];
    /** The starting velocity, in units a second. */
    velocity: number[];
    /** The model to draw - a `.mdl` or a sprite - as `server.precache` returned it. */
    model: Resource;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The model's starting turn around the vertical, in degrees; `0` by default. */
    yaw?: number;
    /** The sound the model makes as it bounces, one of `"none"` (the default), `"shell"` or `"shotgunShell"`. */
    sound?: BounceSound;
}
/** The options of `effects.explodeModel`. */
export interface ExplodeModelOptions {
    /** The point the effect is at. */
    at: number[];
    /** The pieces' speed, in units a second. */
    speed: number;
    /** The model to draw - a `.mdl` or a sprite - as `server.precache` returned it. */
    model: Resource;
    /** The number of pieces, up to `32767`. */
    count: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
}
/** The material a broken thing was made of - the sound its pieces make: one of `"none"`, `"glass"`, `"metal"`, `"flesh"`, `"wood"` or `"concrete"`. */
export type BreakMaterial = "none" | "glass" | "metal" | "flesh" | "wood" | "concrete";
/** The options of `effects.breakModel`. */
export interface BreakModelOptions {
    /** The centre of the box the pieces fly out of. */
    at: number[];
    /** The box's size along each axis, in units. */
    size: number[];
    /** The starting velocity, in units a second. */
    velocity: number[];
    /** The model to draw - a `.mdl` or a sprite - as `server.precache` returned it. */
    model: Resource;
    /** The number of pieces, `0` to `255`. */
    count: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The spread of the pieces' speeds, `0` to `255`: `1` is ten units a second; `0` by default. */
    randomness?: number;
    /** The material the pieces sound as, one of `"none"` (the default), `"glass"`, `"metal"`, `"flesh"`, `"wood"` or `"concrete"`. */
    material?: BreakMaterial;
    /** `true`: the pieces trail smoke. */
    smoke?: boolean;
    /** `true`: the pieces are drawn see-through. */
    transparent?: boolean;
}
/** The options of `effects.spriteSpray`. */
export interface SpriteSprayOptions {
    /** The point the effect is at. */
    at: number[];
    /** The starting velocity, in units a second. */
    velocity: number[];
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The number of pieces, `0` to `255`. */
    count: number;
    /** The sprites' speed, `0` to `255`. */
    speed: number;
    /** The spread of the sprites' directions, `0` to `255`; `0` by default. */
    noise?: number;
}
/** The options of `effects.armorRicochet`. */
export interface ArmorRicochetOptions {
    /** The point the effect is at. */
    at: number[];
    /** The sprite's size, `0` to `255`: `10` is its own size; `10` by default. */
    scale?: number;
}
/** The options of `effects.bubbles` and `effects.bubbleTrail`. */
export interface BubblesOptions {
    /** One corner of the box, or one end of the line, the bubbles appear in. */
    start: number[];
    /** The other corner of the box, or the other end of the line. */
    end: number[];
    /** The height the bubbles rise to, in units. */
    height: number;
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The number of bubbles, `0` to `255`. */
    count: number;
    /** The bubbles' speed, in units a second. */
    speed: number;
}
/** The options of `effects.bloodSprite`. */
export interface BloodSpriteOptions {
    /** The point the effect is at. */
    at: number[];
    /** The sprite of the drops that fall, e.g. `sprites/bloodspray.spr`, as `server.precache` returned it. */
    spray: Resource;
    /** The sprite of the blot that stays a moment, e.g. `sprites/blood.spr`, as `server.precache` returned it. */
    drop: Resource;
    /** The sprite's size, `0` to `255`: `10` is its own size; `10` by default. */
    scale?: number;
    /** The blood's colour in the game's palette, `0` to `255`: `247` (the default) is red, `195` yellow. */
    palette?: number;
}
/** The options of `effects.projectile`. */
export interface ProjectileOptions {
    /** The point the effect is at. */
    at: number[];
    /** The starting velocity, in units a second. */
    velocity: number[];
    /** The model to draw - a `.mdl` or a sprite - as `server.precache` returned it. */
    model: Resource;
    /** The projectile's lifetime, in whole seconds, up to `255`. */
    life: number;
    /** The player the projectile passes through; left out, it hits anyone. */
    owner?: Player;
}
/** The options of `effects.spray`. */
export interface SprayOptions {
    /** The point the effect is at. */
    at: number[];
    /** The direction the spray goes, a vector: its length is not read. */
    direction: number[];
    /** The model to draw - a `.mdl` or a sprite - as `server.precache` returned it. */
    model: Resource;
    /** The number of pieces, `0` to `255`. */
    count: number;
    /** The pieces' speed, `0` to `255`. */
    speed: number;
    /** The spread of the pieces' directions, `0` to `255`; `0` by default. */
    noise?: number;
    /** The pieces' render mode, as an entity's `renderMode`; `"normal"` by default. */
    renderMode?: RenderMode;
}
/** The options of `effects.playerSprites`. */
export interface PlayerSpritesOptions {
    /** The player the sprites come out of. */
    player: Player;
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The number of sprites, `0` to `255`. */
    count: number;
    /** The spread of the sprites' sizes, in percent; `0` by default, all the same. */
    variance?: number;
}
/** The options of `effects.particleBurst`. */
export interface ParticleBurstOptions {
    /** The point the effect is at. */
    at: number[];
    /** The burst's radius, in units. */
    radius: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The particles' colour in the game's palette, `0` to `255`; `0` by default. */
    palette?: number;
}
/** The share of a fire field's sprites that drift upwards, one of `"none"`, `"some"` (half of them) or `"all"`. */
export type FireRise = "none" | "some" | "all";
/** The look of a fire field's sprites, one of `"opaque"`, `"alpha"` (half see-through) or `"additive"` (glowing). */
export type FireBlend = "opaque" | "alpha" | "additive";
/** The options of `effects.fireField`. */
export interface FireFieldOptions {
    /** The field's centre. */
    at: number[];
    /** Half the side of the square the fire fills, in units. */
    radius: number;
    /** The sprite to draw, as `server.precache` returned it. */
    sprite: Resource;
    /** The number of sprites, `0` to `255`. */
    count: number;
    /** The effect's lifetime, in seconds, up to `25.5`. */
    life: number;
    /** The share of the sprites that drift upwards, one of `"none"` (the default), `"some"` or `"all"`. */
    rise?: FireRise;
    /** The sprites' look, one of `"opaque"` (the default), `"alpha"` or `"additive"`. */
    blend?: FireBlend;
    /** `true`: the sprites play at 15 frames a second; otherwise once over their lifetime. */
    loop?: boolean;
    /** `true`: every sprite starts at the same height, a flat field rather than a cube. */
    flat?: boolean;
}
/** The options of `effects.playerAttachment`. */
export interface PlayerAttachmentOptions {
    /** The player the model is attached to. */
    player: Player;
    /** The model to draw - a `.mdl` or a sprite - as `server.precache` returned it. */
    model: Resource;
    /** The effect's lifetime, in seconds. */
    life: number;
    /** The model's height above the player's origin, in units; `0` by default. */
    offset?: number;
}
/**
 * Temporary effects - beams, explosions, sprites, sparks, lights, blood - the game draws for a moment and forgets. One function per effect; the options are its arguments, the second argument who sees it:
 *
 * ```ts
 * const shock = server.precache("sprites/shockwave.spr");
 *
 * effects.beamCylinder({ at: here, radius: 385, sprite: shock, life: 0.4, width: 60, color: "#0096ff", alpha: 200 }, { near: here });
 * effects.sparks({ at: here });                          // everyone
 * effects.beamFollow({ entity: grenade, sprite: shock, life: 1, width: 5 }, { to: player });
 * ```
 *
 * Times are in seconds, a colour is CSS hex, a sprite or a model is what `server.precache` returned. An effect whose file is not precached is not sent, with a line in the console.
 *
 * Pawn: `message_begin(..., SVC_TEMPENTITY)`, `TE_*`
 */
export declare namespace effects {
    /**
     * A beam between two points.
     *
     * Pawn: `TE_BEAMPOINTS`
     */
    function beamPoints(options: BeamPointsOptions, to?: EffectRecipients): void;
    /**
     * A beam from an entity to a point; its start follows the entity.
     *
     * Pawn: `TE_BEAMENTPOINT`
     */
    function beamEntityPoint(options: BeamEntityPointOptions, to?: EffectRecipients): void;
    /**
     * A beam between two entities, following both.
     *
     * Pawn: `TE_BEAMENTS`
     */
    function beamEntities(options: BeamEntitiesOptions, to?: EffectRecipients): void;
    /**
     * A ring of beam between two entities: they are its diameter.
     *
     * Pawn: `TE_BEAMRING`
     */
    function beamRing(options: BeamEntitiesOptions, to?: EffectRecipients): void;
    /**
     * A cylinder of beam that grows from a point to `radius` over its life - a shockwave on the ground:
     *
     * ```ts
     * effects.beamCylinder({ at: here, radius: 385, sprite: shock, life: 0.4, width: 60, color: "#0096ff", alpha: 200 }, { near: here });
     * ```
     *
     * Pawn: `TE_BEAMCYLINDER`
     */
    function beamCylinder(options: BeamCircleOptions, to?: EffectRecipients): void;
    /**
     * A disk of beam that grows from a point to `radius` over its life.
     *
     * Pawn: `TE_BEAMDISK`
     */
    function beamDisk(options: BeamCircleOptions, to?: EffectRecipients): void;
    /**
     * A ring of beam facing the viewer that grows from a point to `radius` over its life.
     *
     * Pawn: `TE_BEAMTORUS`
     */
    function beamTorus(options: BeamCircleOptions, to?: EffectRecipients): void;
    /**
     * A trail behind a moving entity - a grenade, a player - until it stops:
     *
     * ```ts
     * effects.beamFollow({ entity: grenade, sprite: trail, life: 1, width: 5, color: "#0096ff", alpha: 200 });
     * ```
     *
     * Pawn: `TE_BEAMFOLLOW`
     */
    function beamFollow(options: BeamFollowOptions, to?: EffectRecipients): void;
    /**
     * A beam between two points with a sprite at its end.
     *
     * Pawn: `TE_BEAMSPRITE`
     */
    function beamSprite(options: BeamSpriteOptions, to?: EffectRecipients): void;
    /**
     * A bolt between two points: a beam of fewer options.
     *
     * Pawn: `TE_LIGHTNING`
     */
    function lightning(options: LightningOptions, to?: EffectRecipients): void;
    /**
     * Takes away every beam attached to an entity.
     *
     * Pawn: `TE_KILLBEAM`
     */
    function killBeams(options: EntityEffectOptions, to?: EffectRecipients): void;
    /**
     * An explosion: a sprite, two lights, flying particles and the sound, rising slowly.
     *
     * Pawn: `TE_EXPLOSION`
     */
    function explosion(options: ExplosionOptions, to?: EffectRecipients): void;
    /**
     * A burst of dark particles with a sound.
     *
     * Pawn: `TE_TAREXPLOSION`
     */
    function tarExplosion(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * A burst of particles in colours of the game's palette, with a sound.
     *
     * Pawn: `TE_EXPLOSION2`
     */
    function particleExplosion(options: ParticleExplosionOptions, to?: EffectRecipients): void;
    /**
     * A puff of smoke: a see-through sprite rising.
     *
     * Pawn: `TE_SMOKE`
     */
    function smoke(options: SmokeOptions, to?: EffectRecipients): void;
    /**
     * Tracers flying into a point.
     *
     * Pawn: `TE_IMPLOSION`
     */
    function implosion(options: ImplosionOptions, to?: EffectRecipients): void;
    /**
     * A bullet's hit: particles and a ricochet's sound.
     *
     * Pawn: `TE_GUNSHOT`
     */
    function gunshot(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * Sparks falling from a point.
     *
     * Pawn: `TE_SPARKS`
     */
    function sparks(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * A bullet off armour: a quick spark and a ricochet's sound.
     *
     * Pawn: `TE_ARMOR_RICOCHET`
     */
    function armorRicochet(options: ArmorRicochetOptions, to?: EffectRecipients): void;
    /**
     * A splash of particles, as from lava.
     *
     * Pawn: `TE_LAVASPLASH`
     */
    function lavaSplash(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * A splash of particles, as at a teleport.
     *
     * Pawn: `TE_TELEPORT`
     */
    function teleport(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * A tracer flying from one point to another.
     *
     * Pawn: `TE_TRACER`
     */
    function tracer(options: SegmentEffectOptions, to?: EffectRecipients): void;
    /**
     * A line of particles between two points that stays 30 seconds.
     *
     * Pawn: `TE_SHOWLINE`
     */
    function showLine(options: SegmentEffectOptions, to?: EffectRecipients): void;
    /**
     * A shower of tracers in a direction.
     *
     * Pawn: `TE_STREAK_SPLASH`
     */
    function streakSplash(options: StreakSplashOptions, to?: EffectRecipients): void;
    /**
     * A glowing sprite that plays once.
     *
     * Pawn: `TE_SPRITE`
     */
    function sprite(options: SpriteOptions, to?: EffectRecipients): void;
    /**
     * A glowing sprite that stays a while.
     *
     * Pawn: `TE_GLOWSPRITE`
     */
    function glowSprite(options: GlowSpriteOptions, to?: EffectRecipients): void;
    /**
     * A line of glowing sprites that fly off it, fall and fade.
     *
     * Pawn: `TE_SPRITETRAIL`
     */
    function spriteTrail(options: SpriteTrailOptions, to?: EffectRecipients): void;
    /**
     * A spray of see-through sprites.
     *
     * Pawn: `TE_SPRITE_SPRAY`
     */
    function spriteSpray(options: SpriteSprayOptions, to?: EffectRecipients): void;
    /**
     * A funnel of sprites flying into a point, or out of it.
     *
     * Pawn: `TE_LARGEFUNNEL`
     */
    function largeFunnel(options: LargeFunnelOptions, to?: EffectRecipients): void;
    /**
     * Bubbles rising inside a brush entity, such as water.
     *
     * Pawn: `TE_FIZZ`
     */
    function fizz(options: FizzOptions, to?: EffectRecipients): void;
    /**
     * Bubbles rising from a box.
     *
     * Pawn: `TE_BUBBLES`
     */
    function bubbles(options: BubblesOptions, to?: EffectRecipients): void;
    /**
     * Bubbles rising from a line.
     *
     * Pawn: `TE_BUBBLETRAIL`
     */
    function bubbleTrail(options: BubblesOptions, to?: EffectRecipients): void;
    /**
     * A light that lights up the world around a point.
     *
     * Pawn: `TE_DLIGHT`
     */
    function dynamicLight(options: DynamicLightOptions, to?: EffectRecipients): void;
    /**
     * A light on an entity that lights up entities only, not the world.
     *
     * Pawn: `TE_ELIGHT`
     */
    function entityLight(options: EntityLightOptions, to?: EffectRecipients): void;
    /**
     * A coloured line between two points.
     *
     * Pawn: `TE_LINE`
     */
    function line(options: LineOptions, to?: EffectRecipients): void;
    /**
     * The edges of a box in colour.
     *
     * Pawn: `TE_BOX`
     */
    function box(options: BoxOptions, to?: EffectRecipients): void;
    /**
     * A spray of blood particles.
     *
     * Pawn: `TE_BLOOD`
     */
    function blood(options: BloodOptions, to?: EffectRecipients): void;
    /**
     * A stream of blood particles.
     *
     * Pawn: `TE_BLOODSTREAM`
     */
    function bloodStream(options: BloodOptions, to?: EffectRecipients): void;
    /**
     * Blood as the game draws a hit: drops that fall and a blot that stays a moment.
     *
     * Pawn: `TE_BLOODSPRITE`
     */
    function bloodSprite(options: BloodSpriteOptions, to?: EffectRecipients): void;
    /**
     * A model thrown from a point that bounces - a shell out of a gun.
     *
     * Pawn: `TE_MODEL`
     */
    function model(options: ModelOptions, to?: EffectRecipients): void;
    /**
     * Pieces of a model flying out of a point in every direction.
     *
     * Pawn: `TE_EXPLODEMODEL`
     */
    function explodeModel(options: ExplodeModelOptions, to?: EffectRecipients): void;
    /**
     * Pieces flying out of a box - something broken:
     *
     * ```ts
     * effects.breakModel({ at: box.origin, size: [16, 16, 16], velocity: [0, 0, 50], model: gibs, count: 8, life: 2, material: "glass" });
     * ```
     *
     * Pawn: `TE_BREAKMODEL`
     */
    function breakModel(options: BreakModelOptions, to?: EffectRecipients): void;
    /**
     * A model flying like a nail that hits players.
     *
     * Pawn: `TE_PROJECTILE`
     */
    function projectile(options: ProjectileOptions, to?: EffectRecipients): void;
    /**
     * A shower of models or sprites thrown in a direction.
     *
     * Pawn: `TE_SPRAY`
     */
    function spray(options: SprayOptions, to?: EffectRecipients): void;
    /**
     * Sprites flying out of a player's body.
     *
     * Pawn: `TE_PLAYERSPRITES`
     */
    function playerSprites(options: PlayerSpritesOptions, to?: EffectRecipients): void;
    /**
     * A burst of particles in one colour of the game's palette.
     *
     * Pawn: `TE_PARTICLEBURST`
     */
    function particleBurst(options: ParticleBurstOptions, to?: EffectRecipients): void;
    /**
     * A field of fire sprites filling a square.
     *
     * Pawn: `TE_FIREFIELD`
     */
    function fireField(options: FireFieldOptions, to?: EffectRecipients): void;
    /**
     * A model attached above a player that goes where he goes.
     *
     * Pawn: `TE_PLAYERATTACHMENT`
     */
    function playerAttachment(options: PlayerAttachmentOptions, to?: EffectRecipients): void;
    /**
     * Takes away every model attached to a player.
     *
     * Pawn: `TE_KILLPLAYERATTACHMENTS`
     */
    function killPlayerAttachments(options: PlayerEffectOptions, to?: EffectRecipients): void;
}
