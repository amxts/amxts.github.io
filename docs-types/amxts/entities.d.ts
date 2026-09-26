/// <reference path="../as-types.d.ts" />
import { Player } from "./facade";
import { Vector } from "./vector";
import { EntityFlag, Effect, Button, HideHud, Damage } from "./flags";
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
     * The entity's class name, e.g. "player", "weaponbox", "grenade", "func_door".
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
     * The entity's velocity, units per second: a running player moves at about 250.
     *
     * Pawn: `pev->velocity`
     */
    get velocity(): Vector;
    set velocity(value: number[]);
    /**
     * The extra velocity the entity gets from what it stands in — a conveyor, a trigger_push, a water current — on top of its own. Units per second.
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
     * The entity's rotation: pitch, yaw, roll in degrees. For a player it follows where he looks; to turn his view, set it together with fixAngle.
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
     * The end point of a predicted projectile; sent to the client with startTime and impactTime.
     *
     * Pawn: `pev->endpos`
     */
    get endPos(): Vector;
    set endPos(value: number[]);
    /**
     * The start point of a predicted projectile; sent to the client with endPos.
     *
     * Pawn: `pev->startpos`
     */
    get startPos(): Vector;
    set startPos(value: number[]);
    /**
     * The game time a predicted projectile reaches endPos.
     *
     * Pawn: `pev->impacttime`
     */
    get impactTime(): number;
    set impactTime(value: number);
    /**
     * The game time a predicted projectile left startPos.
     *
     * Pawn: `pev->starttime`
     */
    get startTime(): number;
    set startTime(value: number);
    /**
     * The player's view snap: 1 turns his view to angles on the next frame, 2 turns it by the yaw of angularVelocity; the engine then resets it to 0.
     *
     * Pawn: `pev->fixangle`
     */
    get fixAngle(): number;
    set fixAngle(value: number);
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
     * The yaw a monster turns to, in degrees; a momentary_rot_button keeps its position here instead.
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
     * The index of the entity's precached model; 0 draws nothing.
     *
     * Pawn: `pev->modelindex`
     */
    get modelIndex(): number;
    set modelIndex(value: number);
    /**
     * The entity's model path, e.g. "models/w_c4.mdl"; a map brush has its number, e.g. "*12". Writing it changes only the text; the native entity_set_model also sets modelIndex and the size.
     *
     * Pawn: `pev->model`
     */
    get model(): string;
    set model(value: string);
    /**
     * The player's first-person weapon model, the one he sees himself, e.g. "models/v_knife.mdl".
     *
     * Pawn: `pev->viewmodel`
     */
    get viewModel(): number;
    set viewModel(value: number);
    /**
     * The weapon model other players see in the player's hands, e.g. "models/p_knife.mdl".
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
     * The low corner of the entity's bounding box, relative to origin: (-16, -16, -36) for a standing player. Set it with the native entity_set_size, so size and absMin follow.
     *
     * Pawn: `pev->mins`
     */
    get mins(): Vector;
    set mins(value: number[]);
    /**
     * The high corner of the entity's bounding box, relative to origin: (16, 16, 36) for a standing player. Set it with the native entity_set_size, so size and absMax follow.
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
     * The local clock of a door, platform or train: it runs only while the entity moves, and its nextThink counts in it.
     *
     * Pawn: `pev->ltime`
     */
    get localTime(): number;
    set localTime(value: number);
    /**
     * The game time the entity's think runs next; 0 or less means never. A door, platform or train counts it in localTime.
     *
     * Pawn: `pev->nextthink`
     */
    get nextThink(): number;
    set nextThink(value: number);
    /**
     * The entity's kind of movement: 0 stands still, 3 walks (a player), 5 flies without gravity, 6 falls, 8 passes through walls (noclip), 10 bounces, 12 sticks to aimEntity.
     *
     * Pawn: `pev->movetype`, `MOVETYPE_*`
     */
    get moveType(): number;
    set moveType(value: number);
    /**
     * The entity's solidity: 0 passes through everything, 1 only registers touches, 2 collides as a box, 3 collides as a player's box, 4 collides as a map brush.
     *
     * Pawn: `pev->solid`, `SOLID_*`
     */
    get solid(): number;
    set solid(value: number);
    /**
     * The number of the skin the model is drawn with, from 0. A map brush keeps its contents here instead: -3 water, -16 a ladder.
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
     * The entity's visual effects, for example: "NoDraw" hides it, "DimLight" and "BrightLight" light up around it, "MuzzleFlash" flashes once.
     *
     * Pawn: `pev->effects`
     */
    get effects(): Effect[];
    set effects(values: Effect[]);
    /**
     * The entity's gravity multiplier: 1 is normal, 0.5 is half. 0 also counts as normal.
     *
     * Pawn: `pev->gravity`
     */
    get gravity(): number;
    set gravity(value: number);
    /**
     * The entity's friction multiplier on the ground, 1 is normal. For a bouncing entity (moveType 10) it is how little it bounces: 0 bounces back at full speed.
     *
     * Pawn: `pev->friction`
     */
    get friction(): number;
    set friction(value: number);
    /**
     * The light level where the player stands, 0 (dark) to 255, as his client reports it every frame.
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
     * The number of the player's legs animation, played on top of sequence; 0 for none.
     *
     * Pawn: `pev->gaitsequence`
     */
    get gaitSequence(): number;
    set gaitSequence(value: number);
    /**
     * The playback position in the animation, 0 to 255 over the whole sequence; for a sprite, the frame number.
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
     * The animation playback rate: 1 is normal speed, 0 freezes it, negative plays backwards.
     *
     * Pawn: `pev->framerate`
     */
    get frameRate(): number;
    set frameRate(value: number);
    /**
     * The sprite's draw scale: 1 is its normal size.
     *
     * Pawn: `pev->scale`
     */
    get scale(): number;
    set scale(value: number);
    /**
     * The entity's render mode: 0 normal, 1 colour (renderColor), 2 translucent, 3 glow (sprites), 4 translucent with cut-out textures, 5 additive (brightens what is behind). In modes 1 to 5 renderAmount is the opacity, 0 to 255.
     *
     * Pawn: `pev->rendermode`, `kRender*`
     */
    get renderMode(): number;
    set renderMode(value: number);
    /**
     * The entity's opacity in a transparent renderMode, 0 (invisible) to 255; with the glow shell (renderFx 19), the shell's thickness.
     *
     * Pawn: `pev->renderamt`
     */
    get renderAmount(): number;
    set renderAmount(value: number);
    /**
     * The entity's render colour for renderMode and renderFx, red, green, blue from 0 to 255: the colour of the glow shell (renderFx 19).
     *
     * Pawn: `pev->rendercolor`
     */
    get renderColor(): Vector;
    set renderColor(value: number[]);
    /**
     * The entity's render effect: 0 none, 19 a coloured glow shell around the model (colour renderColor, thickness renderAmount); 1 to 13 pulse, fade, strobe and flicker, 16 a hologram.
     *
     * Pawn: `pev->renderfx`, `kRenderFx*`
     */
    get renderFx(): number;
    set renderFx(value: number);
    /**
     * The player's weapons as bits: 1 << the weapon's id; the top bit is the suit the HUD needs. Writing it does not give or take weapons.
     *
     * Pawn: `pev->weapons`
     */
    get weapons(): number;
    set weapons(value: number);
    /**
     * The entity's vulnerability: 0 cannot be hurt (god mode), 1 can be hurt, 2 can be hurt and aim assist targets it.
     *
     * Pawn: `pev->takedamage`, `DAMAGE_*`
     */
    get takeDamage(): number;
    set takeDamage(value: number);
    /**
     * The entity's stage of dying: 0 alive, 1 dying (falling), 2 dead, 3 waiting to respawn.
     *
     * Pawn: `pev->deadflag`, `DEAD_*`
     */
    get deadFlag(): number;
    set deadFlag(value: number);
    /**
     * The player's eye position relative to origin: (0, 0, 17) standing, (0, 0, 12) ducked.
     *
     * Pawn: `pev->view_ofs`
     */
    get viewOffset(): Vector;
    set viewOffset(value: number[]);
    /**
     * The buttons the player holds this frame, e.g. "Attack", "Jump", "Duck", "Use".
     *
     * Pawn: `pev->button`
     */
    get buttons(): Button[];
    set buttons(values: Button[]);
    /**
     * The player's impulse command: 100 is the flashlight, 201 the spray. The game clears it once it has handled it.
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
     * The entity that last hurt the player: the shooter for a bullet, a grenade, a trigger_hurt.
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
     * The entity this one follows when its moveType is 12 (follow): it moves along with it.
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
     * The ground under the entity: the world (0) or another entity it stands on.
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
     * The entity's state flags, for example "OnGround", "Ducking", "InWater", "Frozen", "FakeClient" for a bot, "KillMe" to be removed.
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
     * The entity's maximum health: healing stops at it. A player gets his spawn health here, 100.
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
     * The Half-Life armour type. CS does not use the field.
     *
     * Pawn: `pev->armortype`
     */
    get armorType(): number;
    set armorType(value: number);
    /**
     * The entity's armour points, 0 to 100 in a normal game. The kind of armour is in kevlar.
     *
     * Pawn: `pev->armorvalue`
     */
    get armorValue(): number;
    set armorValue(value: number);
    /**
     * The entity's depth in water: 0 out, 1 feet, 2 waist, 3 head under.
     *
     * Pawn: `pev->waterlevel`
     */
    get waterLevel(): number;
    set waterLevel(value: number);
    /**
     * The contents the entity is in: -1 empty, -3 water, -4 slime, -5 lava.
     *
     * Pawn: `pev->watertype`, `CONTENTS_*`
     */
    get waterType(): number;
    set waterType(value: number);
    /**
     * The entity's target: the targetName of the entities it fires when it triggers, like a button's door.
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
     * The entity's text, like a game_text's or env_message's; in worldspawn, the map's title.
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
     * The damage the player's armour absorbed since the HUD was last told; zeroed with damageTaken.
     *
     * Pawn: `pev->dmg_save`
     */
    get damageSaved(): number;
    set damageSaved(value: number);
    /**
     * The damage the entity deals: a grenade's blast, a trigger_hurt's hit, a door that crushes.
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
     * The game time of the player's next pain from drowning or a trigger_hurt; no new pain until then.
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
     * A mark of a glass func_breakable: 1 lets the client stick decals to it. Players in CS do not use it.
     *
     * Pawn: `pev->playerclass`
     */
    get playerClass(): number;
    set playerClass(value: number);
    /**
     * The player's top running speed, units per second: 250 with a knife, 221 with an AK-47. The game resets it when he switches weapons.
     *
     * Pawn: `pev->maxspeed`
     */
    get maxSpeed(): number;
    set maxSpeed(value: number);
    /**
     * The player's field of view in degrees, 90 is normal. The game keeps its own copy for the zoom and writes it back here when the zoom changes.
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
     * The player's ducking mark: 1 while he is going down into a duck, before he is fully crouched.
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
     * The player's duck in progress, in milliseconds: the engine starts it at 1000 and counts down.
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
     * The player's shield state: 0 while the shield is up and takes hits, 1 while it is not.
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
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the game keeps the spectator mode here: 0 none, 1 locked chase, 2 free chase, 3 free roaming, 4 first person, 5 free overview, 6 chase overview.
     *
     * Pawn: `pev->iuser1`, `OBS_*`
     */
    get iuser1(): number;
    set iuser1(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the game keeps here the index of the player he spectates (0 when roaming).
     *
     * Pawn: `pev->iuser2`
     */
    get iuser2(): number;
    set iuser2(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the field is taken: the death camera keeps the killer's index here, and ReGameDLL reads movement locks from its bits (16 no ducking, 32 no ladders, 64 no jumping, 128 no double duck).
     *
     * Pawn: `pev->iuser3`
     */
    get iuser3(): number;
    set iuser3(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the game overwrites the field every frame: 1 while he stands on a vehicle, 0 otherwise.
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
     * A free field on any entity but a player: a plugin keeps its own value here. On a player the field is the slowdown after a jump, in milliseconds: set to about 1316 on a jump and counted down.
     *
     * Pawn: `pev->fuser2`
     */
    get fuser2(): number;
    set fuser2(value: number);
    /**
     * A free field on any entity but a player: a plugin keeps its own value here. On a player ReGameDLL multiplies his movement by the field while +speed is held (0 is off); in noclip and spectating it is the acceleration.
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
}
/** A player's members - CBaseEntity up to CBasePlayer - on top of its entvars. */
export declare class PlayerFields extends Entity {
    /**
     * The player's Half-Life ammo counter; the game does not use it.
     *
     * Pawn: `CBaseEntity::currentammo`
     */
    get currentammo(): number;
    set currentammo(value: number);
    /**
     * The player's limit of buckshot ammo, as Half-Life meant it; the game does not use it.
     *
     * Pawn: `CBaseEntity::maxammo_buckshot`
     */
    get maxammoBuckshot(): number;
    set maxammoBuckshot(value: number);
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
    get maxammo9mm(): number;
    set maxammo9mm(value: number);
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
    get maxammo556nato(): number;
    set maxammo556nato(value: number);
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
    get maxammo556natobox(): number;
    set maxammo556natobox(value: number);
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
    get maxammo762nato(): number;
    set maxammo762nato(value: number);
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
    get maxammo45acp(): number;
    set maxammo45acp(value: number);
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
    get maxammo50ae(): number;
    set maxammo50ae(value: number);
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
    get maxammo338mag(): number;
    set maxammo338mag(value: number);
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
    get maxammo57mm(): number;
    set maxammo57mm(value: number);
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
    get maxammo357sig(): number;
    set maxammo357sig(value: number);
    /**
     * A copy of the player's reserve .357 SIG ammo (P228): the game refreshes it whenever the real ammo changes, and writing it gives no ammo.
     *
     * Pawn: `CBaseEntity::ammo_357sig`
     */
    get ammo357sig(): number;
    set ammo357sig(value: number);
    /**
     * The game time a grenade's pin was pulled (0 when not); a player has the field but does not use it.
     *
     * Pawn: `CBaseEntity::m_flStartThrow`
     */
    get startThrow(): number;
    set startThrow(value: number);
    /**
     * The game time the attack button was let go on a grenade (-1 before the pin is pulled); unused on a player.
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
     * The player's "left" flag: true once he has left the server (or the bot was kicked), until someone takes the slot.
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
     * The "finished" flag of the current animation: true once it has played to its end.
     *
     * Pawn: `CBaseAnimating::m_fSequenceFinished`
     */
    get sequenceFinished(): number;
    set sequenceFinished(value: number);
    /**
     * The "loops" flag of the current animation: true if it loops.
     *
     * Pawn: `CBaseAnimating::m_fSequenceLoops`
     */
    get sequenceLoops(): number;
    set sequenceLoops(value: number);
    /**
     * The model's current activity (idle, run, walk, ...); the game sets it with the player's animation.
     *
     * Pawn: `CBaseMonster::m_Activity`, `ACT_*`
     */
    get activity(): number;
    set activity(value: number);
    /**
     * The model's next activity, the one it should switch to.
     *
     * Pawn: `CBaseMonster::m_IdealActivity`, `ACT_*`
     */
    get idealActivity(): number;
    set idealActivity(value: number);
    /**
     * The body part the last bullet hit: 0 generic, 1 head, 2 chest, 3 stomach, 4 left arm, 5 right arm, 6 left leg, 7 right leg, 8 shield.
     *
     * Pawn: `CBaseMonster::m_LastHitGroup`, `HITGROUP_*`
     */
    get lastHitGroup(): number;
    set lastHitGroup(value: number);
    /**
     * The kinds of damage the player took since the HUD was last told, e.g. "Fall", "Bullet", "Burn"; the game clears all but the lasting ones after the damage indicator is sent.
     *
     * Pawn: `CBaseMonster::m_bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /**
     * A monster's (a hostage's) AI state: idle, alert, combat, dead.
     *
     * Pawn: `CBaseMonster::m_MonsterState`
     */
    get monsterState(): number;
    set monsterState(value: number);
    /**
     * The AI state a monster (a hostage) should move to.
     *
     * Pawn: `CBaseMonster::m_IdealMonsterState`
     */
    get idealMonsterState(): number;
    set idealMonsterState(value: number);
    /**
     * A monster's AI conditions this think, as bits: sees an enemy, is hurt, hears a sound.
     *
     * Pawn: `CBaseMonster::m_afConditions`
     */
    get conditions(): number;
    set conditions(value: number);
    /**
     * A monster's AI memory, as bits kept between thinks.
     *
     * Pawn: `CBaseMonster::m_afMemory`
     */
    get memory(): number;
    set memory(value: number);
    /**
     * The player's delay before any weapon can be used, in seconds; it counts down to 0 by itself. The game sets it while he switches weapons or reloads.
     *
     * Pawn: `CBaseMonster::m_flNextAttack`
     */
    get nextAttack(): number;
    set nextAttack(value: number);
    /**
     * A monster's target: the entity it moves to or follows, like the player a hostage follows.
     *
     * Pawn: `CBaseMonster::m_hTargetEnt`
     */
    get targetEnt(): number;
    set targetEnt(value: number);
    /**
     * A monster's field of view, as the cosine of half the cone: 0.5 sees 120 degrees wide.
     *
     * Pawn: `CBaseMonster::m_flFieldOfView`
     */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    /**
     * The colour of the entity's blood: 247 red, 195 yellow, -1 does not bleed.
     *
     * Pawn: `CBaseMonster::m_bloodColor`, `BLOOD_COLOR_*`, `DONT_BLEED`
     */
    get bloodColor(): number;
    set bloodColor(value: number);
    /**
     * The position of a monster's gun relative to its origin, where its shots come from.
     *
     * Pawn: `CBaseMonster::m_HackedGunPos`
     */
    get hackedGunPos(): Vector;
    set hackedGunPos(value: number[]);
    /**
     * The position where a monster last saw its enemy.
     *
     * Pawn: `CBaseMonster::m_vecEnemyLKP`
     */
    get enemyLkp(): Vector;
    set enemyLkp(value: number[]);
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
     * The spectator mode the player chose last, restored when he spectates again: 1 chase camera locked to the target's view, 2 free chase camera, 3 free look, 4 first person, 5 free overview map, 6 chase overview map.
     *
     * Pawn: `CBasePlayer::m_iObserverLastMode`, `OBS_*`
     */
    get observerLastMode(): number;
    set observerLastMode(value: number);
    /**
     * The game time when a hostage stops flinching from a hit; not used on a player.
     *
     * Pawn: `CBasePlayer::m_flFlinchTime`
     */
    get flinchTime(): number;
    set flinchTime(value: number);
    /**
     * `true` if the player's last hit was heavy (over 60 to the head, over 20 elsewhere), for the pain animation.
     *
     * Pawn: `CBasePlayer::m_bHighDamage`
     */
    get highDamage(): boolean;
    set highDamage(value: boolean);
    /**
     * The player's speed multiplier after a hit: below 1 he is slowed, and on the ground it climbs back to 1 by 0.01 a frame.
     *
     * Pawn: `CBasePlayer::m_flVelocityModifier`
     */
    get velocityModifier(): number;
    set velocityModifier(value: number);
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
     * The game time when the player's weapon throws out its next shell casing (AWP, Scout, shotguns); 0 for none.
     *
     * Pawn: `CBasePlayer::m_flEjectBrass`
     */
    get ejectBrass(): number;
    set ejectBrass(value: number);
    /**
     * The player's armour kind: 0 none, 1 vest, 2 vest and helmet.
     *
     * Pawn: `CBasePlayer::m_iKevlar`, `ARMOR_*`
     */
    get kevlar(): number;
    set kevlar(value: number);
    /**
     * `true` if the player survived the last round and keeps his equipment; with `false` he gets the default one at spawn.
     *
     * Pawn: `CBasePlayer::m_bNotKilled`
     */
    get notKilled(): boolean;
    set notKilled(value: boolean);
    /**
     * The player's money: 800 at the start. Writing it does not update the money on his HUD; `rg_add_account` does.
     *
     * Pawn: `CBasePlayer::m_iAccount`
     */
    get account(): number;
    set account(value: number);
    /**
     * `true` if the player carries a primary weapon (a rifle, a shotgun, a submachine gun).
     *
     * Pawn: `CBasePlayer::m_bHasPrimary`
     */
    get hasPrimary(): boolean;
    set hasPrimary(value: boolean);
    /**
     * The player's death throw timer; the game only ever sets it to 0.
     *
     * Pawn: `CBasePlayer::m_flDeathThrowTime`
     */
    get deathThrowTime(): number;
    set deathThrowTime(value: number);
    /**
     * The way the player's body is thrown when he dies: 0 not thrown, 1 forward, 2 backward, 3 by the hit, 4 by the bomb, 5 by a grenade.
     *
     * Pawn: `CBasePlayer::m_iThrowDirection`
     */
    get throwDirection(): number;
    set throwDirection(value: number);
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
     * The player's stage of joining: 0 in the game, 1 the MOTD is shown, 2 reading the MOTD, 3 the team menu is shown, 4 picking a team, 5 getting into the game.
     *
     * Pawn: `CBasePlayer::m_iJoiningState`, `JoinState`
     */
    get joiningState(): number;
    set joiningState(value: number);
    /**
     * The camera (trigger_camera) a player still choosing a team looks through.
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
     * The player's model, by number: 1 urban, 2 terror, 3 leet, 4 arctic, 5 gsg9, 6 gign, 7 sas, 8 guerilla, 9 vip, 10 militia, 11 spetsnaz.
     *
     * Pawn: `CBasePlayer::m_iModelName`, `MODEL_*`
     */
    get modelName(): number;
    set modelName(value: number);
    /**
     * The number of teammates the player has killed; with mp_autokick he is kicked at mp_max_teamkills.
     *
     * Pawn: `CBasePlayer::m_iTeamKills`
     */
    get teamKills(): number;
    set teamKills(value: number);
    /**
     * The chat the player hides (the ignoremsg command): 0 nobody's, 1 the enemy's, 2 everyone's.
     *
     * Pawn: `CBasePlayer::m_iIgnoreGlobalChat`, `IGNOREMSG_*`
     */
    get ignoreGlobalChat(): number;
    set ignoreGlobalChat(value: number);
    /**
     * `true` if the player owns night vision goggles.
     *
     * Pawn: `CBasePlayer::m_bHasNightVision`
     */
    get hasNightVision(): boolean;
    set hasNightVision(value: boolean);
    /**
     * `true` while the player's night vision is switched on.
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
     * The number of radio messages the player has left until he spawns again (mp_radio_maxinround, 60 by default); at 0 his radio is silent.
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
     * `true` if the player has a defuse kit.
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
     * The old-style menu the game has open for the player: 0 none, 1 and 2 the team menu, 3 the model menu, 4 to 10 the buy menus, 11 to 13 the radio menus.
     *
     * Pawn: `CBasePlayer::m_iMenu`, `Menu_*`
     */
    get menu(): number;
    set menu(value: number);
    /**
     * The player's chase target: set to 1 on spawn, never read by the game.
     *
     * Pawn: `CBasePlayer::m_iChaseTarget`
     */
    get chaseTarget(): number;
    set chaseTarget(value: number);
    /**
     * The player's camera switch: set to 0 on spawn, never read by the game.
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
     * The userid of the player this one voted to kick (the vote command); 0 for none.
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
     * `true` if the player killed a teammate; with mp_tkpunish he is punished when the next round starts.
     *
     * Pawn: `CBasePlayer::m_bJustKilledTeammate`
     */
    get justKilledTeammate(): boolean;
    set justKilledTeammate(value: boolean);
    /**
     * The number of hostages the player has killed; past mp_hostagepenalty the game kicks him.
     *
     * Pawn: `CBasePlayer::m_iHostagesKilled`
     */
    get hostagesKilled(): number;
    set hostagesKilled(value: number);
    /**
     * The number of the map the player voted for with votemap; 0 for none.
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
     * The game time when the player last hurt a teammate; the "teammate attack" message waits 0.6 seconds from it.
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
    get punishedForTk(): boolean;
    set punishedForTk(value: boolean);
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
     * The bomb site the player stands in, or 0.
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
     * The extra kinds of sound the player makes for monsters until stopExtraSoundTime.
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
     * The game time when the player's extraSoundTypes is cleared.
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
    get flashLightTime(): number;
    set flashLightTime(value: number);
    /**
     * The charge of the player's flashlight, 0 to 100.
     *
     * Pawn: `CBasePlayer::m_iFlashBattery`
     */
    get flashBattery(): number;
    set flashBattery(value: number);
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
     * The sound area (env_sound) whose room effect is on the player.
     *
     * Pawn: `CBasePlayer::m_pentSndLast`
     */
    get sndLast(): number;
    set sndLast(value: number);
    /**
     * The room effect (echo) of the player's sound area, 0 for none.
     *
     * Pawn: `CBasePlayer::m_flSndRoomtype`
     */
    get sndRoomtype(): number;
    set sndRoomtype(value: number);
    /**
     * The distance from the player to his sound area.
     *
     * Pawn: `CBasePlayer::m_flSndRange`
     */
    get sndRange(): number;
    set sndRange(value: number);
    /**
     * The player's "new ammo to send" flag from Half-Life. CS does not use the field.
     *
     * Pawn: `CBasePlayer::m_fNewAmmo`
     */
    get newAmmo(): number;
    set newAmmo(value: number);
    /**
     * The player's physics state, as bits: 1 on a ladder, 2 on a train, 8 ducking in progress, 16 using something, 32 a locked observer.
     *
     * Pawn: `CBasePlayer::m_afPhysicsFlags`, `PFLAG_*`
     */
    get physicsFlags(): number;
    set physicsFlags(value: number);
    /**
     * The game time when the kill command works for the player again, a second after the last one.
     *
     * Pawn: `CBasePlayer::m_fNextSuicideTime`
     */
    get nextSuicideTime(): number;
    set nextSuicideTime(value: number);
    /**
     * The player's idle timer from Half-Life; CS keeps it on the weapon (a Weapon's timeWeaponIdle) and does not use this one.
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
     * The game time of the next HEV suit phrase (Half-Life); 0 for none.
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
    get tbdPrev(): number;
    set tbdPrev(value: number);
    /**
     * The distance to the nearest radiation, for Half-Life's Geiger counter.
     *
     * Pawn: `CBasePlayer::m_flgeigerRange`
     */
    get flgeigerRange(): number;
    set flgeigerRange(value: number);
    /**
     * The game time of the next Geiger counter update (Half-Life).
     *
     * Pawn: `CBasePlayer::m_flgeigerDelay`
     */
    get flgeigerDelay(): number;
    set flgeigerDelay(value: number);
    /**
     * The Geiger counter reading last sent to the client (Half-Life).
     *
     * Pawn: `CBasePlayer::m_igeigerRangePrev`
     */
    get igeigerRangePrev(): number;
    set igeigerRangePrev(value: number);
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
    get idrowndmg(): number;
    set idrowndmg(value: number);
    /**
     * The part of the drowning damage already given back to the player.
     *
     * Pawn: `CBasePlayer::m_idrownrestored`
     */
    get idrownrestored(): number;
    set idrownrestored(value: number);
    /**
     * The kinds of damage last shown on the player's HUD, as bits; -1 makes the game send them again.
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
     * The train control on the player's HUD: 0 off, 1 to 5 the speed notch, plus bits for "changed" and "active".
     *
     * Pawn: `CBasePlayer::m_iTrain`, `TRAIN_*`
     */
    get train(): number;
    set train(value: number);
    /**
     * `false` when the player's weapon list has to be sent again.
     *
     * Pawn: `CBasePlayer::m_fWeapon`
     */
    get weapon(): boolean;
    set weapon(value: boolean);
    /**
     * The mounted gun (func_tank) the player is using.
     *
     * Pawn: `CBasePlayer::m_pTank`
     */
    get tank(): number;
    set tank(value: number);
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
    get longJump(): boolean;
    set longJump(value: boolean);
    /**
     * The game time from which the player counts as sneaking (Half-Life).
     *
     * Pawn: `CBasePlayer::m_tSneaking`
     */
    get sneaking(): number;
    set sneaking(value: number);
    /**
     * The player's update counter: set to 5 on reset, never read by the game.
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
    get clientHealth(): number;
    set clientHealth(value: number);
    /**
     * The armour last sent to the player's HUD; -1 makes the game send it again.
     *
     * Pawn: `CBasePlayer::m_iClientBattery`
     */
    get clientBattery(): number;
    set clientBattery(value: number);
    /**
     * The parts of the player's HUD that are hidden: `["Money", "Timer"]`; the game sends the change itself.
     *
     * Pawn: `CBasePlayer::m_iHideHUD`
     */
    get hideHud(): HideHud[];
    set hideHud(values: HideHud[]);
    /**
     * The hidden HUD parts last sent to the player; when they differ from hideHud, the game sends hideHud.
     *
     * Pawn: `CBasePlayer::m_iClientHideHUD`
     */
    get clientHideHud(): HideHud[];
    set clientHideHud(values: HideHud[]);
    /**
     * The field of view last sent to the player; when the game's own copy differs, the game sends that one.
     *
     * Pawn: `CBasePlayer::m_iClientFOV`
     */
    get clientFov(): number;
    set clientFov(value: number);
    /**
     * The number of times the player has spawned this round; with mp_forcerespawn off, a second spawn is refused.
     *
     * Pawn: `CBasePlayer::m_iNumSpawns`
     */
    get numSpawns(): number;
    set numSpawns(value: number);
    /**
     * An observer entity tied to the player; the game never creates one and only removes it when he disconnects.
     *
     * Pawn: `CBasePlayer::m_pObserver`
     */
    get observer(): number;
    set observer(value: number);
    /**
     * The weapon in the player's hands, or null. Read only.
     *
     * Pawn: `CBasePlayer::m_pActiveItem`
     */
    get activeItem(): Weapon | null;
    /**
     * The weapon the player's client was last told he holds. Read only.
     *
     * Pawn: `CBasePlayer::m_pClientActiveItem`
     */
    get clientActiveItem(): Weapon | null;
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
    get onTarget(): boolean;
    set onTarget(value: boolean);
    /**
     * The game time of the next update of the player's status bar (the name under the crosshair), every 0.2 seconds.
     *
     * Pawn: `CBasePlayer::m_flNextSBarUpdateTime`
     */
    get nextSBarUpdateTime(): number;
    set nextSBarUpdateTime(value: number);
    /**
     * The game time the status bar about the player under the crosshair stays until: 2 seconds after he leaves the crosshair.
     *
     * Pawn: `CBasePlayer::m_flStatusBarDisappearDelay`
     */
    get statusBarDisappearDelay(): number;
    set statusBarDisappearDelay(value: number);
    /**
     * The horizontal aim assist correction last sent to the player's client.
     *
     * Pawn: `CBasePlayer::m_lastx`
     */
    get lastx(): number;
    set lastx(value: number);
    /**
     * The vertical aim assist correction last sent to the player's client.
     *
     * Pawn: `CBasePlayer::m_lasty`
     */
    get lasty(): number;
    set lasty(value: number);
    /**
     * The number of frames in the player's own spray logo; -1 for none.
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
     * The index of the player's own model; the game sets modelIndex back to it, at spawn for one.
     *
     * Pawn: `CBasePlayer::m_modelIndexPlayer`
     */
    get modelIndexPlayer(): number;
    set modelIndexPlayer(value: number);
    /**
     * The legs' animation the game picked for the player this frame.
     *
     * Pawn: `CBasePlayer::m_iGaitsequence`
     */
    get gaitsequence(): number;
    set gaitsequence(value: number);
    /**
     * The playback position of the player's legs' animation, in frames.
     *
     * Pawn: `CBasePlayer::m_flGaitframe`
     */
    get gaitframe(): number;
    set gaitframe(value: number);
    /**
     * The direction the player's legs face, in degrees; it catches up with the body's.
     *
     * Pawn: `CBasePlayer::m_flGaityaw`
     */
    get gaityaw(): number;
    set gaityaw(value: number);
    /**
     * The player's position on the previous animation update, to estimate his speed.
     *
     * Pawn: `CBasePlayer::m_prevgaitorigin`
     */
    get prevgaitorigin(): Vector;
    set prevgaitorigin(value: number[]);
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
     * The player's _cl_autowepswitch setting: 0 never switch to a picked-up weapon, 1 always, 2 only when not firing.
     *
     * Pawn: `CBasePlayer::m_iAutoWepSwitch`
     */
    get autoWepSwitch(): number;
    set autoWepSwitch(value: number);
    /**
     * `true` if the player uses the graphical (VGUI) menus — his _vgui_menus setting.
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
     * The strength of the player's blindness, 0 to 255; 255 is fully blind.
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
     * The game time when the player's progress bar (defusing, planting) started; 0 for none.
     *
     * Pawn: `CBasePlayer::m_progressStart`
     */
    get progressStart(): number;
    set progressStart(value: number);
    /**
     * The game time when the player's progress bar fills.
     *
     * Pawn: `CBasePlayer::m_progressEnd`
     */
    get progressEnd(): number;
    set progressEnd(value: number);
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
     * A Condition Zero leftover (silent, calm, intense); the game does not use it.
     *
     * Pawn: `CBasePlayer::m_musicState`
     */
    get musicState(): number;
    set musicState(value: number);
    /**
     * The player's money last sent to the other players' scoreboards.
     *
     * Pawn: `CBasePlayer::m_iLastAccount`
     */
    get lastAccount(): number;
    set lastAccount(value: number);
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
    get nextAccountHealthUpdate(): number;
    set nextAccountHealthUpdate(value: number);
    /**
     * Every weapon the player carries: the first item of each of the six
     * slots (m_rgpPlayerItems), and the ones chained behind it (m_pNext) -
     * the grenades all share slot four.
     */
    get items(): Weapon[];
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
     * The player holding the weapon, or null if it lies on the ground. Read only.
     *
     * Pawn: `CBasePlayerItem::m_pPlayer`
     */
    get player(): Player | null;
    /**
     * The next weapon in the same inventory slot (grenades share one), or null. Read only.
     *
     * Pawn: `CBasePlayerItem::m_pNext`
     */
    get next(): Weapon | null;
    /**
     * The weapon's empty "click": 1 if it may play on the next attack.
     *
     * Pawn: `CBasePlayerWeapon::m_iPlayEmptySound` (reapi `m_Weapon_iPlayEmptySound`)
     */
    get playEmptySound(): number;
    set playEmptySound(value: number);
    /**
     * The weapon's "firing on empty" mark: 1 while the player holds attack with an empty clip.
     *
     * Pawn: `CBasePlayerWeapon::m_fFireOnEmpty` (reapi `m_Weapon_fFireOnEmpty`)
     */
    get fireOnEmpty(): number;
    set fireOnEmpty(value: number);
    /**
     * The time until the weapon can fire again, in seconds, counting down by itself: about 0.1 after an AK-47 shot, 1.45 after an AWP one.
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
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /**
     * The weapon's ammo kind — the slot of the player's ammo it takes from; -1 for none (a knife).
     *
     * Pawn: `CBasePlayerWeapon::m_iPrimaryAmmoType` (reapi `m_Weapon_iPrimaryAmmoType`)
     */
    get primaryAmmoType(): number;
    set primaryAmmoType(value: number);
    /**
     * The weapon's secondary ammo slot; CS weapons have none (-1).
     *
     * Pawn: `CBasePlayerWeapon::m_iSecondaryAmmoType` (reapi `m_Weapon_iSecondaryAmmoType`)
     */
    get secondaryAmmoType(): number;
    set secondaryAmmoType(value: number);
    /**
     * The rounds in the weapon's magazine: 30 in a full AK-47; -1 for the knife, which has none.
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
    get clientClip(): number;
    set clientClip(value: number);
    /**
     * The weapon's state (held or not) last sent to the player's HUD.
     *
     * Pawn: `CBasePlayerWeapon::m_iClientWeaponState` (reapi `m_Weapon_iClientWeaponState`)
     */
    get clientWeaponState(): number;
    set clientWeaponState(value: number);
    /**
     * The weapon's reload mark: 1 while it is reloading.
     *
     * Pawn: `CBasePlayerWeapon::m_fInReload` (reapi `m_Weapon_fInReload`)
     */
    get inReload(): number;
    set inReload(value: number);
    /**
     * The shotgun's shell-by-shell reload stage: 0 not reloading, 1 starting, 2 putting a shell in.
     *
     * Pawn: `CBasePlayerWeapon::m_fInSpecialReload` (reapi `m_Weapon_fInSpecialReload`)
     */
    get inSpecialReload(): number;
    set inSpecialReload(value: number);
    /**
     * The ammo the weapon gives when first picked up; 0 for one dropped by a player (only its clip).
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
     * The weapon's current inaccuracy: it grows as it fires and settles back; each weapon has its own range (0.2 for a fresh AK-47).
     *
     * Pawn: `CBasePlayerWeapon::m_flAccuracy` (reapi `m_Weapon_flAccuracy`)
     */
    get accuracy(): number;
    set accuracy(value: number);
    /**
     * The game time of a pistol's last shot, for its accuracy.
     *
     * Pawn: `CBasePlayerWeapon::m_flLastFire` (reapi `m_Weapon_flLastFire`)
     */
    get lastFire(): number;
    set lastFire(value: number);
    /**
     * The shots in the weapon's current burst; the recoil grows with it, and it drops back once the player stops firing.
     *
     * Pawn: `CBasePlayerWeapon::m_iShotsFired` (reapi `m_Weapon_iShotsFired`)
     */
    get shotsFired(): number;
    set shotsFired(value: number);
    /**
     * The game time of the next round in the Glock's burst; 0 when not bursting.
     *
     * Pawn: `CBasePlayerWeapon::m_flGlock18Shoot` (reapi `m_Weapon_flGlock18Shoot`)
     */
    get glock18Shoot(): number;
    set glock18Shoot(value: number);
    /**
     * The rounds the Glock has fired in the current burst.
     *
     * Pawn: `CBasePlayerWeapon::m_iGlock18ShotsFired` (reapi `m_Weapon_iGlock18ShotsFired`)
     */
    get glock18ShotsFired(): number;
    set glock18ShotsFired(value: number);
    /**
     * The game time of the next round in the FAMAS's burst; 0 when not bursting.
     *
     * Pawn: `CBasePlayerWeapon::m_flFamasShoot` (reapi `m_Weapon_flFamasShoot`)
     */
    get famasShoot(): number;
    set famasShoot(value: number);
    /**
     * The rounds the FAMAS has fired in the current burst.
     *
     * Pawn: `CBasePlayerWeapon::m_iFamasShotsFired` (reapi `m_Weapon_iFamasShotsFired`)
     */
    get famasShotsFired(): number;
    set famasShotsFired(value: number);
    /**
     * The spread of the FAMAS's burst, kept for its later rounds.
     *
     * Pawn: `CBasePlayerWeapon::m_fBurstSpread` (reapi `m_Weapon_fBurstSpread`)
     */
    get burstSpread(): number;
    set burstSpread(value: number);
    /**
     * The weapon's modes, as bits: 1 USP silencer on, 2 Glock burst mode, 4 M4A1 silencer on, 8 Elites firing the left gun, 16 FAMAS burst mode, 32 shield drawn.
     *
     * Pawn: `CBasePlayerWeapon::m_iWeaponState` (reapi `m_Weapon_iWeaponState`), `WPNSTATE_*`
     */
    get weaponState(): number;
    set weaponState(value: number);
    /**
     * The time until the shotgun's next shell goes in during its reload, in seconds, counting down.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextReload` (reapi `m_Weapon_flNextReload`)
     */
    get nextReload(): number;
    set nextReload(value: number);
    /**
     * The game time when shotsFired next goes down by one after the player stops firing.
     *
     * Pawn: `CBasePlayerWeapon::m_flDecreaseShotsFired` (reapi `m_Weapon_flDecreaseShotsFired`)
     */
    get decreaseShotsFired(): number;
    set decreaseShotsFired(value: number);
    /**
     * The Glock's firing event (precached).
     *
     * Pawn: `CBasePlayerWeapon::m_usFireGlock18` (reapi `m_Weapon_usFireGlock18`)
     */
    get fireGlock18(): number;
    set fireGlock18(value: number);
    /**
     * The FAMAS's firing event (precached).
     *
     * Pawn: `CBasePlayerWeapon::m_usFireFamas` (reapi `m_Weapon_usFireFamas`)
     */
    get fireFamas(): number;
    set fireFamas(value: number);
    /**
     * The delay between the weapon's last two shots, in seconds; the game uses it to keep the fire rate even.
     *
     * Pawn: `CBasePlayerWeapon::m_flPrevPrimaryAttack` (reapi `m_Weapon_flPrevPrimaryAttack`)
     */
    get prevPrimaryAttack(): number;
    set prevPrimaryAttack(value: number);
    /**
     * The game time of the weapon's last shot; 0 before the first one.
     *
     * Pawn: `CBasePlayerWeapon::m_flLastFireTime` (reapi `m_Weapon_flLastFireTime`)
     */
    get lastFireTime(): number;
    set lastFireTime(value: number);
}
