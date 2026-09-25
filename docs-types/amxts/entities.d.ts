/// <reference path="../as-types.d.ts" />
import { Player } from "./facade";
import { Vector } from "./vector";
import { EntityFlag, Effect, Button, HideHud, Damage } from "./flags";
/**
 * Which entities `Entity.findAll` returns. Every field is optional, and an
 * entity has to match all that are given:
 * `Entity.findAll({ classname: "info_target", near: player.origin, radius: 200 })`.
 */
export declare class EntityFilter {
    classname?: string;
    /** The model, as the entity has it: "models/w_c4.mdl". */
    model?: string;
    /** Whose it is: a grenade's thrower, a weapon's carrier - `{ owner: player }`. */
    owner?: Entity | null;
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
    /** What kind of entity this is: "player", "weaponbox", "grenade", "func_door". `pev->classname`, a string. */
    get classname(): string;
    set classname(value: string);
    /** The global name a mapper gives an entity to carry its state across a level change (single-player maps). `pev->globalname`, a string. */
    get globalName(): string;
    set globalName(value: string);
    /** Where the entity is, in world units. Assigning it moves the entity properly (SET_ORIGIN), so collisions follow. `pev->origin`, a vector. */
    get origin(): Vector;
    set origin(value: number[]);
    /** A saved position; what it holds depends on the entity (a breakable keeps its spawn point here). `pev->oldorigin`, a vector. */
    get oldOrigin(): Vector;
    set oldOrigin(value: number[]);
    /** Speed and direction of motion, units per second: a running player moves at about 250. `pev->velocity`, a vector. */
    get velocity(): Vector;
    set velocity(value: number[]);
    /** Extra velocity from what the entity stands in — a conveyor, a trigger_push, a water current — added to its own. Units per second. `pev->basevelocity`, a vector. */
    get baseVelocity(): Vector;
    set baseVelocity(value: number[]);
    /** The conveyor velocity the client uses to predict movement; the engine zeroes it every player frame. `pev->clbasevelocity`, a vector. */
    get clBaseVelocity(): Vector;
    set clBaseVelocity(value: number[]);
    /** The direction a door, a platform or a button moves in, worked out from its angles when it spawns. `pev->movedir`, a vector. */
    get moveDir(): Vector;
    set moveDir(value: number[]);
    /** How the model is turned: pitch, yaw, roll in degrees. For a player it follows where he looks; to turn his view, set it together with fixAngle. `pev->angles`, a vector. */
    get angles(): Vector;
    set angles(value: number[]);
    /** How fast the entity turns, degrees per second on each axis. `pev->avelocity`, a vector. */
    get angularVelocity(): Vector;
    set angularVelocity(value: number[]);
    /** The view kick from recoil or a hit, in degrees; the engine decays it back to zero by itself. `pev->punchangle`, a vector. */
    get punchAngle(): Vector;
    set punchAngle(value: number[]);
    /** Where the player looks: pitch (down is positive), yaw, roll in degrees. Players only. `pev->v_angle`, a vector. */
    get viewAngle(): Vector;
    set viewAngle(value: number[]);
    /** Where a predicted projectile ends up; sent to the client with starttime and impacttime. `pev->endpos`, a vector. */
    get endPos(): Vector;
    set endPos(value: number[]);
    /** Where a predicted projectile starts; sent to the client with endpos. `pev->startpos`, a vector. */
    get startPos(): Vector;
    set startPos(value: number[]);
    /** Game time a predicted projectile reaches endpos. `pev->impacttime`, a float. */
    get impactTime(): number;
    set impactTime(value: number);
    /** Game time a predicted projectile left startpos. `pev->starttime`, a float. */
    get startTime(): number;
    set startTime(value: number);
    /** Set to 1 to snap the player's view to his angles on the next frame, 2 to turn it by the yaw of angularVelocity; the engine then resets it to 0. `pev->fixangle`, an int. */
    get fixAngle(): number;
    set fixAngle(value: number);
    /** The pitch a monster turns to, in degrees. CS does not use it. `pev->idealpitch`, a float. */
    get idealPitch(): number;
    set idealPitch(value: number);
    /** How fast a monster turns its pitch, degrees per second. CS does not use it. `pev->pitch_speed`, a float. */
    get pitchSpeed(): number;
    set pitchSpeed(value: number);
    /** The yaw a monster turns to, in degrees; a momentary_rot_button keeps its position here instead. `pev->ideal_yaw`, a float. */
    get idealYaw(): number;
    set idealYaw(value: number);
    /** How fast a monster turns, degrees per second. `pev->yaw_speed`, a float. */
    get yawSpeed(): number;
    set yawSpeed(value: number);
    /** The index of the entity's precached model; 0 draws nothing. `pev->modelindex`, an int. */
    get modelIndex(): number;
    set modelIndex(value: number);
    /** The model's path: "models/w_c4.mdl", or "*12" for a map brush. Writing only changes the string — entity_set_model also sets modelIndex and the size. `pev->model`, a string. */
    get model(): string;
    set model(value: string);
    /** The first-person weapon model the player sees: "models/v_knife.mdl". `pev->viewmodel`, an int. */
    get viewModel(): number;
    set viewModel(value: number);
    /** The weapon model other players see in his hands: "models/p_knife.mdl". `pev->weaponmodel`, an int. */
    get weaponModel(): number;
    set weaponModel(value: number);
    /** The low corner of the bounding box in world coordinates; the engine computes it when the entity moves. `pev->absmin`, a vector. */
    get absMin(): Vector;
    set absMin(value: number[]);
    /** The high corner of the bounding box in world coordinates; the engine computes it when the entity moves. `pev->absmax`, a vector. */
    get absMax(): Vector;
    set absMax(value: number[]);
    /** The low corner of the bounding box, relative to origin: (-16, -16, -36) for a standing player. Set it with entity_set_size so size and absMin follow. `pev->mins`, a vector. */
    get mins(): Vector;
    set mins(value: number[]);
    /** The high corner of the bounding box, relative to origin: (16, 16, 36) for a standing player. Set it with entity_set_size so size and absMax follow. `pev->maxs`, a vector. */
    get maxs(): Vector;
    set maxs(value: number[]);
    /** The bounding box's dimensions, maxs — mins. `pev->size`, a vector. */
    get size(): Vector;
    set size(value: number[]);
    /** The local clock of a door, platform or train (MOVETYPE_PUSH): it runs only while the entity moves, and its nextThink counts in it. `pev->ltime`, a float. */
    get localTime(): number;
    set localTime(value: number);
    /** Game time the entity's think runs next; 0 or less means never. A MOVETYPE_PUSH entity counts it in localTime. `pev->nextthink`, a float. */
    get nextThink(): number;
    set nextThink(value: number);
    /** How the entity moves: MOVETYPE_WALK for a player, MOVETYPE_NONE stands still, MOVETYPE_TOSS falls, MOVETYPE_BOUNCE bounces, MOVETYPE_FLY ignores gravity, MOVETYPE_NOCLIP passes through walls, MOVETYPE_FOLLOW sticks to aimEntity. `pev->movetype`, an int. */
    get moveType(): number;
    set moveType(value: number);
    /** What the entity collides with: SOLID_NOT nothing, SOLID_TRIGGER only touches, SOLID_BBOX its box, SOLID_SLIDEBOX a player's box, SOLID_BSP a map brush. `pev->solid`, an int. */
    get solid(): number;
    set solid(value: number);
    /** Which skin of a studio model is drawn, from 0. A map brush keeps its contents here instead (CONTENTS_WATER, CONTENTS_LADDER). `pev->skin`, an int. */
    get skin(): number;
    set skin(value: number);
    /** Which submodels of a studio model are drawn — the body groups as one number. `pev->body`, an int. */
    get body(): number;
    set body(value: number);
    /** Visual effects on the entity: "NoDraw" hides it, "DimLight" and "BrightLight" light up around it, "MuzzleFlash" flashes once. `pev->effects`, a bit mask. */
    get effects(): Effect[];
    set effects(values: Effect[]);
    /** Gravity multiplier: 1 is normal, 0.5 is half. 0 also counts as normal. `pev->gravity`, a float. */
    get gravity(): number;
    set gravity(value: number);
    /** Friction multiplier on the ground, 1 is normal. For a MOVETYPE_BOUNCE entity it is how little it bounces: 0 bounces back at full speed. `pev->friction`, a float. */
    get friction(): number;
    set friction(value: number);
    /** How lit the spot the player stands in is, 0 (dark) to 255, as his client reports it every frame. `pev->light_level`, an int. */
    get lightLevel(): number;
    set lightLevel(value: number);
    /** The animation sequence the model plays, by its number in the model. `pev->sequence`, an int. */
    get sequence(): number;
    set sequence(value: number);
    /** The legs' animation of a player, played on top of sequence; 0 for none. `pev->gaitsequence`, an int. */
    get gaitSequence(): number;
    set gaitSequence(value: number);
    /** Playback position in the animation, 0 to 255 over the whole sequence; for a sprite, the frame number. `pev->frame`, a float. */
    get frame(): number;
    set frame(value: number);
    /** Game time the current frame was set; the client animates from it. `pev->animtime`, a float. */
    get animTime(): number;
    set animTime(value: number);
    /** Animation playback rate: 1 is normal speed, 0 freezes it, negative plays backwards. `pev->framerate`, a float. */
    get frameRate(): number;
    set frameRate(value: number);
    /** Draw scale of a sprite: 1 is its normal size. `pev->scale`, a float. */
    get scale(): number;
    set scale(value: number);
    /** How the entity is drawn: kRenderNormal, kRenderTransColor, kRenderTransTexture, kRenderGlow, kRenderTransAlpha, kRenderTransAdd. With a transparent mode renderAmount is the opacity. `pev->rendermode`, an int. */
    get renderMode(): number;
    set renderMode(value: number);
    /** Opacity in a transparent renderMode, 0 (invisible) to 255; with kRenderFxGlowShell, the shell's thickness. `pev->renderamt`, a float. */
    get renderAmount(): number;
    set renderAmount(value: number);
    /** Colour for renderMode and renderFx, red, green, blue from 0 to 255: the glow of kRenderFxGlowShell. `pev->rendercolor`, a vector. */
    get renderColor(): Vector;
    set renderColor(value: number[]);
    /** A render effect: kRenderFxGlowShell draws a coloured shell around the model, kRenderFxPulseSlow, kRenderFxHologram and the rest. `pev->renderfx`, an int. */
    get renderFx(): number;
    set renderFx(value: number);
    /** Which weapons the player has, as bits: 1 << the weapon's id; the top bit is the suit the HUD needs. Writing it does not give or take weapons. `pev->weapons`, an int. */
    get weapons(): number;
    set weapons(value: number);
    /** Whether the entity can be hurt: 0 never (god mode), 1 yes, 2 yes and aim assist targets it. `pev->takedamage`, a float. */
    get takeDamage(): number;
    set takeDamage(value: number);
    /** Where in dying the entity is: DEAD_NO alive, DEAD_DYING falling, DEAD_DEAD dead, DEAD_RESPAWNABLE waiting to respawn. `pev->deadflag`, an int. */
    get deadFlag(): number;
    set deadFlag(value: number);
    /** The eyes' position relative to origin: (0, 0, 17) standing, (0, 0, 12) ducked. `pev->view_ofs`, a vector. */
    get viewOffset(): Vector;
    set viewOffset(value: number[]);
    /** The buttons the player holds this frame: "Attack", "Jump", "Duck", "Use", ... `pev->button`, a bit mask. */
    get buttons(): Button[];
    set buttons(values: Button[]);
    /** The impulse command the player sent: 100 is the flashlight, 201 the spray. The game clears it once it has handled it. `pev->impulse`, an int. */
    get impulse(): number;
    set impulse(value: number);
    /** The next entity in a list the engine or the game is building, like the result of a search in a sphere. `pev->chain`, an entity index. */
    get chain(): number;
    set chain(value: number);
    /** What last hurt the player: the shooter for a bullet, a grenade, a trigger_hurt. `pev->dmg_inflictor`, an entity index. */
    get damageInflictor(): number;
    set damageInflictor(value: number);
    /** The entity a monster is after — its enemy. `pev->enemy`, an entity index. */
    get enemy(): number;
    set enemy(value: number);
    /** The entity this one is attached to with MOVETYPE_FOLLOW — it moves along with it. `pev->aiment`, an entity index. */
    get aimEntity(): number;
    set aimEntity(value: number);
    /** Whose entity this is: a grenade's thrower, a weapon's holder. An entity does not collide with its owner. `pev->owner`, an entity index. */
    get owner(): number;
    set owner(value: number);
    /** What the entity stands on: the world (0) or another entity. `pev->groundentity`, an entity index. */
    get groundEntity(): number;
    set groundEntity(value: number);
    /** The bits a mapper ticked for the entity in the map; what each means depends on the classname. `pev->spawnflags`, an int. */
    get spawnFlags(): number;
    set spawnFlags(value: number);
    /** The entity's state flags: "OnGround", "Ducking", "InWater", "Frozen", "FakeClient" for a bot, "KillMe" to be removed. `pev->flags`, a bit mask. */
    get flags(): EntityFlag[];
    set flags(values: EntityFlag[]);
    /** Half-Life player colours, top in the low byte and bottom in the high one; for a player the engine sets it to his index. `pev->colormap`, an int. */
    get colorMap(): number;
    set colorMap(value: number);
    /** The most health the entity can have: healing stops at it. A player gets his spawn health here, 100. `pev->max_health`, a float. */
    get maxHealth(): number;
    set maxHealth(value: number);
    /** On a player, what is left of a jump out of water, in milliseconds. `pev->teleport_time`, a float. */
    get teleportTime(): number;
    set teleportTime(value: number);
    /** The Half-Life armour type. CS does not use it. `pev->armortype`, a float. */
    get armorType(): number;
    set armorType(value: number);
    /** Armour points, 0 to 100 in a normal game. Which armour it is lives in kevlar. `pev->armorvalue`, a float. */
    get armorValue(): number;
    set armorValue(value: number);
    /** How deep in water the entity is: 0 out, 1 feet, 2 waist, 3 head under. `pev->waterlevel`, an int. */
    get waterLevel(): number;
    set waterLevel(value: number);
    /** What the entity is in: CONTENTS_EMPTY (-1), CONTENTS_WATER (-3), CONTENTS_SLIME (-4), CONTENTS_LAVA (-5). `pev->watertype`, an int. */
    get waterType(): number;
    set waterType(value: number);
    /** The targetName of the entities this one fires when it triggers: a button's door. `pev->target`, a string. */
    get target(): string;
    set target(value: string);
    /** The entity's own name in the map, the one other entities' target points at. `pev->targetname`, a string. */
    get targetName(): string;
    set targetName(value: string);
    /** For a player, his name as the engine last set it; on a map entity its meaning depends on the classname. `pev->netname`, a string. */
    get netName(): string;
    set netName(value: string);
    /** Text an entity shows, like a game_text's or env_message's; in worldspawn, the map's title. `pev->message`, a string. */
    get message(): string;
    set message(value: string);
    /** Damage the player took since the HUD was last told; the game zeroes it after the damage indicator is sent. `pev->dmg_take`, a float. */
    get damageTaken(): number;
    set damageTaken(value: number);
    /** Damage armour absorbed since the HUD was last told; zeroed with damageTaken. `pev->dmg_save`, a float. */
    get damageSaved(): number;
    set damageSaved(value: number);
    /** How much damage the entity deals: a grenade's blast, a trigger_hurt's hit, a door that crushes. `pev->dmg`, a float. */
    get damage(): number;
    set damage(value: number);
    /** Game time mark entities use for damage over time and for when a grenade blows; the meaning depends on the entity. `pev->dmgtime`, a float. */
    get damageTime(): number;
    set damageTime(value: number);
    /** A sound path an entity plays, like a door's moving sound. `pev->noise`, a string. */
    get noise(): string;
    set noise(value: string);
    /** A second sound path an entity plays, like a door's stop sound. `pev->noise1`, a string. */
    get noise1(): string;
    set noise1(value: string);
    /** A third sound path an entity plays. `pev->noise2`, a string. */
    get noise2(): string;
    set noise2(value: string);
    /** A fourth sound path an entity plays. `pev->noise3`, a string. */
    get noise3(): string;
    set noise3(value: string);
    /** How fast a door, platform or train moves, units per second. `pev->speed`, a float. */
    get speed(): number;
    set speed(value: number);
    /** Game time the player under water runs out of air and starts to drown; the game pushes it forward while his head is above water. `pev->air_finished`, a float. */
    get airFinished(): number;
    set airFinished(value: number);
    /** Game time of the next drowning or trigger_hurt pain; until then no new one. `pev->pain_finished`, a float. */
    get painFinished(): number;
    set painFinished(value: number);
    /** Game time a timer the training map uses runs out; nothing else reads it in CS. `pev->radsuit_finished`, a float. */
    get radsuitFinished(): number;
    set radsuitFinished(value: number);
    /** The entity itself: the edict these fields belong to. `pev->pContainingEntity`, an entity index. */
    get containingEntity(): number;
    set containingEntity(value: number);
    /** Unused on players in CS; a glass func_breakable marks itself with 1 so the client lets decals stick to it. `pev->playerclass`, an int. */
    get playerClass(): number;
    set playerClass(value: number);
    /** The fastest the player can run, units per second: 250 with a knife, 221 with an AK-47. The game resets it when he switches weapons. `pev->maxspeed`, a float. */
    get maxSpeed(): number;
    set maxSpeed(value: number);
    /** The player's field of view in degrees, 90 is normal. The game keeps its own copy for the zoom and writes it back here when the zoom changes. `pev->fov`, a float. */
    get fov(): number;
    set fov(value: number);
    /** The first-person weapon animation last played, by its number in the view model. `pev->weaponanim`, an int. */
    get weaponAnim(): number;
    set weaponAnim(value: number);
    /** Sent to the client with the player's data; CS itself does not set it. `pev->pushmsec`, an int. */
    get pushMsec(): number;
    set pushMsec(value: number);
    /** 1 while the player is going down into a duck, before he is fully crouched. `pev->bInDuck`, an int. */
    get inDuck(): number;
    set inDuck(value: number);
    /** Milliseconds until the player's next footstep sound. `pev->flTimeStepSound`, an int. */
    get timeStepSound(): number;
    set timeStepSound(value: number);
    /** Milliseconds until the player's next swimming sound. `pev->flSwimTime`, an int. */
    get swimTime(): number;
    set swimTime(value: number);
    /** The duck in progress, in milliseconds: the engine starts it at 1000 and counts down. `pev->flDuckTime`, an int. */
    get duckTime(): number;
    set duckTime(value: number);
    /** Which foot the next footstep sound is for; it flips every step. `pev->iStepLeft`, an int. */
    get stepLeft(): number;
    set stepLeft(value: number);
    /** How fast the player is falling, units per second, positive downwards; fall damage is worked out from it on landing. `pev->flFallVelocity`, a float. */
    get fallVelocity(): number;
    set fallVelocity(value: number);
    /** On a player, whether his shield takes hits: 0 while it is up, 1 while it is not. `pev->gamestate`, an int. */
    get gameState(): number;
    set gameState(value: number);
    /** The buttons the player held the frame before: compare with buttons to see what he just pressed. `pev->oldbuttons`, a bit mask. */
    get oldButtons(): Button[];
    set oldButtons(values: Button[]);
    /** Group bits: once set, traces and what is sent to a player skip entities whose groups do not match. `pev->groupinfo`, an int. */
    get groupInfo(): number;
    set groupInfo(value: number);
    /** Free for plugins to store their own value on an entity that is not a player. On a player it is his observer mode, and the game sets it: 0 none, OBS_CHASE_LOCKED, OBS_CHASE_FREE, OBS_ROAMING, OBS_IN_EYE, OBS_MAP_FREE, OBS_MAP_CHASE. `pev->iuser1`, an int. */
    get iuser1(): number;
    set iuser1(value: number);
    /** Free for plugins to store their own value on an entity that is not a player. On a player it is the index of the player he spectates (0 when roaming), and the game sets it. `pev->iuser2`, an int. */
    get iuser2(): number;
    set iuser2(value: number);
    /** Free for plugins to store their own value on an entity that is not a player. On a player it is taken: the death camera keeps the killer's index there, and ReGameDLL reads movement locks from its bits (16 no ducking, 32 no ladders, 64 no jumping, 128 no double duck). `pev->iuser3`, an int. */
    get iuser3(): number;
    set iuser3(value: number);
    /** Free for plugins to store their own value on an entity that is not a player. On a player the game overwrites it every frame: 1 while he stands on a vehicle, 0 otherwise. `pev->iuser4`, an int. */
    get iuser4(): number;
    set iuser4(value: number);
    /** Free for plugins to store their own value on an entity that is not a player. On a player ReGameDLL zeroes it along with fuser2 and fuser3 when it resets his stamina. `pev->fuser1`, a float. */
    get fuser1(): number;
    set fuser1(value: number);
    /** Free for plugins to store their own value on an entity that is not a player. On a player it is the slowdown after a jump, in milliseconds: set to about 1316 on a jump and counted down. `pev->fuser2`, a float. */
    get fuser2(): number;
    set fuser2(value: number);
    /** Free for plugins to store their own value on an entity that is not a player. On a player ReGameDLL multiplies his movement by it while +speed is held (0 is off); in noclip and spectating it is the acceleration. `pev->fuser3`, a float. */
    get fuser3(): number;
    set fuser3(value: number);
    /** Free for plugins to store their own value; the game does not use it. `pev->fuser4`, a float. */
    get fuser4(): number;
    set fuser4(value: number);
    /** Free for plugins to store their own value; the game does not use it. `pev->vuser1`, a vector. */
    get vuser1(): Vector;
    set vuser1(value: number[]);
    /** Free for plugins to store their own value; the game does not use it. `pev->vuser2`, a vector. */
    get vuser2(): Vector;
    set vuser2(value: number[]);
    /** Free for plugins to store their own value; the game does not use it. `pev->vuser3`, a vector. */
    get vuser3(): Vector;
    set vuser3(value: number[]);
    /** Free for plugins to store their own value; the game does not use it. `pev->vuser4`, a vector. */
    get vuser4(): Vector;
    set vuser4(value: number[]);
    /** Free for plugins to store their own value; the game does not use it. `pev->euser1`, an entity index. */
    get euser1(): number;
    set euser1(value: number);
    /** Free for plugins to store their own value; the game does not use it. `pev->euser2`, an entity index. */
    get euser2(): number;
    set euser2(value: number);
    /** Free for plugins to store their own value; the game does not use it. `pev->euser3`, an entity index. */
    get euser3(): number;
    set euser3(value: number);
    /** Free for plugins to store their own value; the game does not use it. `pev->euser4`, an entity index. */
    get euser4(): number;
    set euser4(value: number);
}
/** A player's members - CBaseEntity up to CBasePlayer - on top of its entvars. */
export declare class PlayerFields extends Entity {
    /** Half-Life's ammo counter; ReGameDLL does not use it. `CBaseEntity::currentammo`, a float. */
    get currentammo(): number;
    set currentammo(value: number);
    /** Meant for the most buckshot ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_buckshot`, an int. */
    get maxammoBuckshot(): number;
    set maxammoBuckshot(value: number);
    /** A copy of the player's reserve buckshot ammo (M3, XM1014), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_buckshot`, an int. */
    get ammoBuckshot(): number;
    set ammoBuckshot(value: number);
    /** Meant for the most 9mm ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_9mm`, an int. */
    get maxammo9mm(): number;
    set maxammo9mm(value: number);
    /** A copy of the player's reserve 9mm ammo (Glock, Elites, MP5, TMP), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_9mm`, an int. */
    get ammo9mm(): number;
    set ammo9mm(value: number);
    /** Meant for the most 5.56mm ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_556nato`, an int. */
    get maxammo556nato(): number;
    set maxammo556nato(value: number);
    /** A copy of the player's reserve 5.56mm ammo (M4A1, FAMAS, Galil, AUG, SG552, SG550), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_556nato`, an int. */
    get ammo556nato(): number;
    set ammo556nato(value: number);
    /** Meant for the most 5.56mm box ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_556natobox`, an int. */
    get maxammo556natobox(): number;
    set maxammo556natobox(value: number);
    /** A copy of the player's reserve 5.56mm box ammo (M249), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_556natobox`, an int. */
    get ammo556natobox(): number;
    set ammo556natobox(value: number);
    /** Meant for the most 7.62mm ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_762nato`, an int. */
    get maxammo762nato(): number;
    set maxammo762nato(value: number);
    /** A copy of the player's reserve 7.62mm ammo (AK-47, Scout, G3SG1), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_762nato`, an int. */
    get ammo762nato(): number;
    set ammo762nato(value: number);
    /** Meant for the most .45 ACP ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_45acp`, an int. */
    get maxammo45acp(): number;
    set maxammo45acp(value: number);
    /** A copy of the player's reserve .45 ACP ammo (USP, MAC-10, UMP45), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_45acp`, an int. */
    get ammo45acp(): number;
    set ammo45acp(value: number);
    /** Meant for the most .50 AE ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_50ae`, an int. */
    get maxammo50ae(): number;
    set maxammo50ae(value: number);
    /** A copy of the player's reserve .50 AE ammo (Desert Eagle), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_50ae`, an int. */
    get ammo50ae(): number;
    set ammo50ae(value: number);
    /** Meant for the most .338 Magnum ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_338mag`, an int. */
    get maxammo338mag(): number;
    set maxammo338mag(value: number);
    /** A copy of the player's reserve .338 Magnum ammo (AWP), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_338mag`, an int. */
    get ammo338mag(): number;
    set ammo338mag(value: number);
    /** Meant for the most 5.7mm ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_57mm`, an int. */
    get maxammo57mm(): number;
    set maxammo57mm(value: number);
    /** A copy of the player's reserve 5.7mm ammo (P90, Five-seveN), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_57mm`, an int. */
    get ammo57mm(): number;
    set ammo57mm(value: number);
    /** Meant for the most .357 SIG ammo a player can carry; ReGameDLL does not use it. `CBaseEntity::maxammo_357sig`, an int. */
    get maxammo357sig(): number;
    set maxammo357sig(value: number);
    /** A copy of the player's reserve .357 SIG ammo (P228), refreshed from his real ammo whenever it changes; writing it gives no ammo. `CBaseEntity::ammo_357sig`, an int. */
    get ammo357sig(): number;
    set ammo357sig(value: number);
    /** On a grenade weapon, game time its pin was pulled (0 when not); a player has the field but does not use it. `CBaseEntity::m_flStartThrow`, a float. */
    get startThrow(): number;
    set startThrow(value: number);
    /** On a grenade weapon, game time the attack button was let go (-1 before the pin is pulled); unused on a player. `CBaseEntity::m_flReleaseThrow`, a float. */
    get releaseThrow(): number;
    set releaseThrow(value: number);
    /** On a knife, a counter of its swings that picks the left or right slash animation; unused on a player. `CBaseEntity::m_iSwing`, an int. */
    get swing(): number;
    set swing(value: number);
    /** True once the player has left the server (or the bot was kicked), until someone takes the slot. `CBaseEntity::has_disconnected`, a bool. */
    get hasDisconnected(): boolean;
    set hasDisconnected(value: boolean);
    /** How fast the current animation moves the model along the ground, units per second. `CBaseAnimating::m_flGroundSpeed`, a float. */
    get groundSpeed(): number;
    set groundSpeed(value: number);
    /** Game time the animation's events (footsteps, sounds) were last checked. `CBaseAnimating::m_flLastEventCheck`, a float. */
    get lastEventCheck(): number;
    set lastEventCheck(value: number);
    /** True once the current animation has played to its end. `CBaseAnimating::m_fSequenceFinished`, an int. */
    get sequenceFinished(): number;
    set sequenceFinished(value: number);
    /** True if the current animation loops. `CBaseAnimating::m_fSequenceLoops`, an int. */
    get sequenceLoops(): number;
    set sequenceLoops(value: number);
    /** The activity the model is animating now (ACT_IDLE, ACT_RUN, ACT_WALK, ...); the game sets it with the player's animation. `CBaseMonster::m_Activity`, an int. */
    get activity(): number;
    set activity(value: number);
    /** The activity the model should switch to (ACT_*). `CBaseMonster::m_IdealActivity`, an int. */
    get idealActivity(): number;
    set idealActivity(value: number);
    /** Where the last bullet hit: HITGROUP_HEAD (1), HITGROUP_CHEST, HITGROUP_STOMACH, the arms, the legs, HITGROUP_SHIELD; 0 is HITGROUP_GENERIC. `CBaseMonster::m_LastHitGroup`, an int. */
    get lastHitGroup(): number;
    set lastHitGroup(value: number);
    /** The kinds of damage taken since the HUD was last told: "Fall", "Bullet", "Burn", ...; the game clears all but the lasting ones after the damage indicator is sent. `CBaseMonster::m_bitsDamageType`, a bit mask. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /** The AI state of a monster (a hostage): idle, alert, combat, dead. `CBaseMonster::m_MonsterState`, an int. */
    get monsterState(): number;
    set monsterState(value: number);
    /** The AI state a monster (a hostage) should move to. `CBaseMonster::m_IdealMonsterState`, an int. */
    get idealMonsterState(): number;
    set idealMonsterState(value: number);
    /** Bits of what a monster's AI perceives this think: sees an enemy, is hurt, hears a sound. `CBaseMonster::m_afConditions`, an int. */
    get conditions(): number;
    set conditions(value: number);
    /** Bits a monster's AI remembers between thinks. `CBaseMonster::m_afMemory`, an int. */
    get memory(): number;
    set memory(value: number);
    /** Seconds until the player can use any weapon, counting down to 0 by itself: the game sets it while he switches or reloads. `CBaseMonster::m_flNextAttack`, a float. */
    get nextAttack(): number;
    set nextAttack(value: number);
    /** The entity a monster moves to or follows: the player a hostage follows. `CBaseMonster::m_hTargetEnt`, an entity index. */
    get targetEnt(): number;
    set targetEnt(value: number);
    /** A monster's field of view as the cosine of half the cone: 0.5 sees 120 degrees wide. `CBaseMonster::m_flFieldOfView`, a float. */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    /** The colour of the blood the entity bleeds: BLOOD_COLOR_RED (247), BLOOD_COLOR_YELLOW, DONT_BLEED (-1). `CBaseMonster::m_bloodColor`, an int. */
    get bloodColor(): number;
    set bloodColor(value: number);
    /** Where a monster's gun is, relative to its origin, for its shots. `CBaseMonster::m_HackedGunPos`, a vector. */
    get hackedGunPos(): Vector;
    set hackedGunPos(value: number[]);
    /** Where a monster last saw its enemy. `CBaseMonster::m_vecEnemyLKP`, a vector. */
    get enemyLkp(): Vector;
    set enemyLkp(value: number[]);
    /** The random seed of the player's current command; bullet spread is drawn from it so the client can predict it. `CBasePlayer::random_seed`, an int. */
    get randomSeed(): number;
    set randomSeed(value: number);
    /** A handle of the player's bleeding event; ReGameDLL does not use it. `CBasePlayer::m_usPlayerBleed`, an int. */
    get playerBleed(): number;
    set playerBleed(value: number);
    /** The player this one spectates, when he is a spectator. `CBasePlayer::m_hObserverTarget`, an entity index. */
    get observerTarget(): number;
    set observerTarget(value: number);
    /** Game time a spectator's next button is taken; the game spaces them 0.2 seconds apart. `CBasePlayer::m_flNextObserverInput`, a float. */
    get nextObserverInput(): number;
    set nextObserverInput(value: number);
    /** The id of the spectated player's weapon last shown to this spectator. `CBasePlayer::m_iObserverWeapon`, an int. */
    get observerWeapon(): number;
    set observerWeapon(value: number);
    /** The spectated player's bomb state last shown to this spectator. `CBasePlayer::m_iObserverC4State`, an int. */
    get observerC4State(): number;
    set observerC4State(value: number);
    /** Whether the spectated player has a defuse kit, as last shown to this spectator. `CBasePlayer::m_bObserverHasDefuser`, a bool. */
    get observerHasDefuser(): boolean;
    set observerHasDefuser(value: boolean);
    /** The spectator mode the player last chose (OBS_*), restored when he spectates again. `CBasePlayer::m_iObserverLastMode`, an int. */
    get observerLastMode(): number;
    set observerLastMode(value: number);
    /** Game time a hostage stops flinching from a hit; unused on a player. `CBasePlayer::m_flFlinchTime`, a float. */
    get flinchTime(): number;
    set flinchTime(value: number);
    /** True if the last hit was heavy (over 60 to the head, over 20 elsewhere), for the pain animation. `CBasePlayer::m_bHighDamage`, a bool. */
    get highDamage(): boolean;
    set highDamage(value: boolean);
    /** Speed multiplier after a hit: below 1 the player is slowed, and it climbs back to 1 by 0.01 each frame on the ground. `CBasePlayer::m_flVelocityModifier`, a float. */
    get velocityModifier(): number;
    set velocityModifier(value: number);
    /** The zoom FOV to go back to after a sniper rifle reloads or fires. `CBasePlayer::m_iLastZoom`, an int. */
    get lastZoom(): number;
    set lastZoom(value: number);
    /** True if the zoom comes back after the shot. `CBasePlayer::m_bResumeZoom`, a bool. */
    get resumeZoom(): boolean;
    set resumeZoom(value: boolean);
    /** Game time the next shell casing is thrown out (AWP, Scout, shotguns); 0 for none. `CBasePlayer::m_flEjectBrass`, a float. */
    get ejectBrass(): number;
    set ejectBrass(value: number);
    /** What armour the player wears: ARMOR_NONE (0), ARMOR_KEVLAR (vest), ARMOR_VESTHELM (vest and helmet). `CBasePlayer::m_iKevlar`, an int. */
    get kevlar(): number;
    set kevlar(value: number);
    /** True if the player survived the last round and keeps his equipment; false gets him the default one at spawn. `CBasePlayer::m_bNotKilled`, a bool. */
    get notKilled(): boolean;
    set notKilled(value: boolean);
    /** The player's money. Writing it does not update his HUD; rg_add_account does. `CBasePlayer::m_iAccount`, an int. */
    get account(): number;
    set account(value: number);
    /** True if the player carries a primary weapon (a rifle, a shotgun, a submachine gun). `CBasePlayer::m_bHasPrimary`, a bool. */
    get hasPrimary(): boolean;
    set hasPrimary(value: boolean);
    /** Only ever zeroed by ReGameDLL. `CBasePlayer::m_flDeathThrowTime`, a float. */
    get deathThrowTime(): number;
    set deathThrowTime(value: number);
    /** How the body is thrown when the player dies: 0 none, then forward, backward, by the hit, by the bomb, by a grenade. `CBasePlayer::m_iThrowDirection`, an int. */
    get throwDirection(): number;
    set throwDirection(value: number);
    /** Game time the player last said something in chat; the game ignores a message within 0.66 seconds of it. `CBasePlayer::m_flLastTalk`, a float. */
    get lastTalk(): number;
    set lastTalk(value: number);
    /** True from connecting until the player first gets into the game. `CBasePlayer::m_bJustConnected`, a bool. */
    get justConnected(): boolean;
    set justConnected(value: boolean);
    /** Set to true on connect; ReGameDLL does not read it. `CBasePlayer::m_bContextHelp`, a bool. */
    get contextHelp(): boolean;
    set contextHelp(value: boolean);
    /** Where the player is in joining: 0 joined, then showing and reading the MOTD, showing the team menu, picking a team, getting into the game. `CBasePlayer::m_iJoiningState`, an int. */
    get joiningState(): number;
    set joiningState(value: number);
    /** The trigger_camera a player still choosing a team looks through. `CBasePlayer::m_pIntroCamera`, an entity index. */
    get introCamera(): number;
    set introCamera(value: number);
    /** Game time the intro view switches to the next camera (every 6 seconds). `CBasePlayer::m_fIntroCamTime`, a float. */
    get introCamTime(): number;
    set introCamTime(value: number);
    /** Game time the player last moved or pressed a button; the idle kick counts from it. `CBasePlayer::m_fLastMovement`, a float. */
    get lastMovement(): number;
    set lastMovement(value: number);
    /** True while the map's briefing is on the player's screen. `CBasePlayer::m_bMissionBriefing`, a bool. */
    get missionBriefing(): boolean;
    set missionBriefing(value: boolean);
    /** True if the player has changed team during this round. `CBasePlayer::m_bTeamChanged`, a bool. */
    get teamChanged(): boolean;
    set teamChanged(value: boolean);
    /** Which player model he has, as the game's ModelName number: 1 urban, then terror, leet, arctic, gsg9, gign, sas, guerilla, vip, ... `CBasePlayer::m_iModelName`, an int. */
    get modelName(): number;
    set modelName(value: number);
    /** How many teammates the player has killed; with mp_autokick he is kicked at mp_max_teamkills. `CBasePlayer::m_iTeamKills`, an int. */
    get teamKills(): number;
    set teamKills(value: number);
    /** Whose chat the player hides (the ignoremsg command): 0 nobody, 1 the enemy, 2 everyone. `CBasePlayer::m_iIgnoreGlobalChat`, an int. */
    get ignoreGlobalChat(): number;
    set ignoreGlobalChat(value: number);
    /** True if the player owns night vision goggles. `CBasePlayer::m_bHasNightVision`, a bool. */
    get hasNightVision(): boolean;
    set hasNightVision(value: boolean);
    /** True while his night vision is switched on. `CBasePlayer::m_bNightVisionOn`, a bool. */
    get nightVisionOn(): boolean;
    set nightVisionOn(value: boolean);
    /** Game time of the next idle check, every 5 seconds. `CBasePlayer::m_flIdleCheckTime`, a float. */
    get idleCheckTime(): number;
    set idleCheckTime(value: number);
    /** Game time the player can use the radio again. `CBasePlayer::m_flRadioTime`, a float. */
    get radioTime(): number;
    set radioTime(value: number);
    /** How many radio messages the player has left until he spawns again (mp_radio_maxinround, 60 by default); at 0 his radio is silent. `CBasePlayer::m_iRadioMessages`, an int. */
    get radioMessages(): number;
    set radioMessages(value: number);
    /** True if the player does not hear radio messages (ignorerad). `CBasePlayer::m_bIgnoreRadio`, a bool. */
    get ignoreRadio(): boolean;
    set ignoreRadio(value: boolean);
    /** True while the player carries the bomb. `CBasePlayer::m_bHasC4`, a bool. */
    get hasC4(): boolean;
    set hasC4(value: boolean);
    /** True if the player has a defuse kit. `CBasePlayer::m_bHasDefuser`, a bool. */
    get hasDefuser(): boolean;
    set hasDefuser(value: boolean);
    /** True if the bomb's explosion killed the player. `CBasePlayer::m_bKilledByBomb`, a bool. */
    get killedByBomb(): boolean;
    set killedByBomb(value: boolean);
    /** From the explosion to the player, saved on a blast hit to throw the body on death. `CBasePlayer::m_vBlastVector`, a vector. */
    get blastVector(): Vector;
    set blastVector(value: number[]);
    /** True if a grenade killed the player. `CBasePlayer::m_bKilledByGrenade`, a bool. */
    get killedByGrenade(): boolean;
    set killedByGrenade(value: boolean);
    /** Bits of which one-time hints the player has already been shown (despite the name, an int). `CBasePlayer::m_flDisplayHistory`, an int. */
    get displayHistory(): number;
    set displayHistory(value: number);
    /** Which old-style menu the game has open for the player: 0 none, then the team menu, the model menu, the buy menus, ... `CBasePlayer::m_iMenu`, an int. */
    get menu(): number;
    set menu(value: number);
    /** Set to 1 on spawn; ReGameDLL does not read it. `CBasePlayer::m_iChaseTarget`, an int. */
    get chaseTarget(): number;
    set chaseTarget(value: number);
    /** Zeroed on spawn; ReGameDLL does not read it. `CBasePlayer::m_fCamSwitch`, a float. */
    get camSwitch(): number;
    set camSwitch(value: number);
    /** True if the player escaped (an escape map) or the VIP got out. `CBasePlayer::m_bEscaped`, a bool. */
    get escaped(): boolean;
    set escaped(value: boolean);
    /** True if the player is the VIP on an as_ map. `CBasePlayer::m_bIsVIP`, a bool. */
    get isVip(): boolean;
    set isVip(value: boolean);
    /** Game time his position is next sent to his teammates' radar, once a second. `CBasePlayer::m_tmNextRadarUpdate`, a float. */
    get nextRadarUpdate(): number;
    set nextRadarUpdate(value: number);
    /** Where the player was when his teammates' radar was last updated. `CBasePlayer::m_vLastOrigin`, a vector. */
    get lastOrigin(): Vector;
    set lastOrigin(value: number[]);
    /** The userid of the player this one voted to kick (vote), 0 for none. `CBasePlayer::m_iCurrentKickVote`, an int. */
    get currentKickVote(): number;
    set currentKickVote(value: number);
    /** Game time the player can vote again, 3 seconds after the last vote. `CBasePlayer::m_flNextVoteTime`, a float. */
    get nextVoteTime(): number;
    set nextVoteTime(value: number);
    /** True if the player killed a teammate; with mp_tkpunish he is punished when the next round starts. `CBasePlayer::m_bJustKilledTeammate`, a bool. */
    get justKilledTeammate(): boolean;
    set justKilledTeammate(value: boolean);
    /** How many hostages the player has killed; the game kicks him past mp_hostagepenalty. `CBasePlayer::m_iHostagesKilled`, an int. */
    get hostagesKilled(): number;
    set hostagesKilled(value: number);
    /** The number of the map the player voted for with votemap; 0 for none. `CBasePlayer::m_iMapVote`, an int. */
    get mapVote(): number;
    set mapVote(value: number);
    /** False while the player may not fire; the game sets it to true when freeze time ends. `CBasePlayer::m_bCanShoot`, a bool. */
    get canShoot(): boolean;
    set canShoot(value: boolean);
    /** Game time the player last fired, for his footstep and shooting animations. `CBasePlayer::m_flLastFired`, a float. */
    get lastFired(): number;
    set lastFired(value: number);
    /** Game time the player last hurt a teammate; the "teammate attack" message waits 0.6 seconds from it. `CBasePlayer::m_flLastAttackedTeammate`, a float. */
    get lastAttackedTeammate(): number;
    set lastAttackedTeammate(value: number);
    /** True if the player was killed by a headshot. `CBasePlayer::m_bHeadshotKilled`, a bool. */
    get headshotKilled(): boolean;
    set headshotKilled(value: boolean);
    /** True if the player was punished for a team kill this round. `CBasePlayer::m_bPunishedForTK`, a bool. */
    get punishedForTk(): boolean;
    set punishedForTk(value: boolean);
    /** True if the player gets no round bonus next round: the game marks the living players of a team that let the round time run out. `CBasePlayer::m_bReceivesNoMoneyNextRound`, a bool. */
    get receivesNoMoneyNextRound(): boolean;
    set receivesNoMoneyNextRound(value: boolean);
    /** Game time, in whole seconds, the timeleft command answers the player again. `CBasePlayer::m_iTimeCheckAllowed`, an int. */
    get timeCheckAllowed(): number;
    set timeCheckAllowed(value: number);
    /** True if the player changed his name while dead; the new name is applied at his next spawn. `CBasePlayer::m_bHasChangedName`, a bool. */
    get hasChangedName(): boolean;
    set hasChangedName(value: boolean);
    /** True while the player defuses the bomb. `CBasePlayer::m_bIsDefusing`, a bool. */
    get isDefusing(): boolean;
    set isDefusing(value: boolean);
    /** Game time the player's zone signals (buy zone, bomb site, rescue zone) are next checked, every half second. `CBasePlayer::m_tmHandleSignals`, a float. */
    get handleSignals(): number;
    set handleSignals(value: number);
    /** The bomb site the player stands in, or 0. `CBasePlayer::m_pentCurBombTarget`, an entity index. */
    get curBombTarget(): number;
    set curBombTarget(value: number);
    /** The player's slot in the list of sounds monsters (hostages) hear. `CBasePlayer::m_iPlayerSound`, an int. */
    get playerSound(): number;
    set playerSound(value: number);
    /** How loud the player is to monsters this frame, the louder of his body and his weapon. `CBasePlayer::m_iTargetVolume`, an int. */
    get targetVolume(): number;
    set targetVolume(value: number);
    /** How loud his last shot was to monsters; it fades by itself. `CBasePlayer::m_iWeaponVolume`, an int. */
    get weaponVolume(): number;
    set weaponVolume(value: number);
    /** Extra kinds of sound the player makes for monsters until stopExtraSoundTime. `CBasePlayer::m_iExtraSoundTypes`, an int. */
    get extraSoundTypes(): number;
    set extraSoundTypes(value: number);
    /** How bright his last muzzle flash was, adding to how visible he is; it fades by itself. `CBasePlayer::m_iWeaponFlash`, an int. */
    get weaponFlash(): number;
    set weaponFlash(value: number);
    /** Game time extraSoundTypes is cleared. `CBasePlayer::m_flStopExtraSoundTime`, a float. */
    get stopExtraSoundTime(): number;
    set stopExtraSoundTime(value: number);
    /** Game time the flashlight's battery next drains (while on) or charges (while off) by one. `CBasePlayer::m_flFlashLightTime`, a float. */
    get flashLightTime(): number;
    set flashLightTime(value: number);
    /** The flashlight's charge, 0 to 100. `CBasePlayer::m_iFlashBattery`, an int. */
    get flashBattery(): number;
    set flashBattery(value: number);
    /** The buttons the player held the frame before, as IN_* bits (a number, not the names buttons has). `CBasePlayer::m_afButtonLast`, an int. */
    get buttonLast(): number;
    set buttonLast(value: number);
    /** The buttons the player pressed this frame, as IN_* bits. `CBasePlayer::m_afButtonPressed`, an int. */
    get buttonPressed(): number;
    set buttonPressed(value: number);
    /** The buttons the player let go this frame, as IN_* bits. `CBasePlayer::m_afButtonReleased`, an int. */
    get buttonReleased(): number;
    set buttonReleased(value: number);
    /** The env_sound whose room effect is on the player. `CBasePlayer::m_pentSndLast`, an entity index. */
    get sndLast(): number;
    set sndLast(value: number);
    /** The room effect (echo) of that env_sound, 0 for none. `CBasePlayer::m_flSndRoomtype`, a float. */
    get sndRoomtype(): number;
    set sndRoomtype(value: number);
    /** How far the player is from that env_sound. `CBasePlayer::m_flSndRange`, a float. */
    get sndRange(): number;
    set sndRange(value: number);
    /** Half-Life's "new ammo to send" flag. CS does not use it. `CBasePlayer::m_fNewAmmo`, an int. */
    get newAmmo(): number;
    set newAmmo(value: number);
    /** Bits of the player's physics state: 1 on a ladder, 2 on a train, 8 ducking in progress, 16 using something, 32 a locked observer. `CBasePlayer::m_afPhysicsFlags`, an int. */
    get physicsFlags(): number;
    set physicsFlags(value: number);
    /** Game time the kill command works again, a second after the last one. `CBasePlayer::m_fNextSuicideTime`, a float. */
    get nextSuicideTime(): number;
    set nextSuicideTime(value: number);
    /** Half-Life's player-level idle timer; CS keeps it on the weapon (a Weapon's timeWeaponIdle) and does not use this one. `CBasePlayer::m_flTimeWeaponIdle`, a float. */
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /** Half-Life's wall-jump timer. CS does not use it. `CBasePlayer::m_flWallJumpTime`, a float. */
    get wallJumpTime(): number;
    set wallJumpTime(value: number);
    /** Game time the next HEV suit sentence plays (Half-Life); 0 for none. `CBasePlayer::m_flSuitUpdate`, a float. */
    get suitUpdate(): number;
    set suitUpdate(value: number);
    /** The next slot in the HEV suit's sentence queue (Half-Life). `CBasePlayer::m_iSuitPlayNext`, an int. */
    get suitPlayNext(): number;
    set suitPlayNext(value: number);
    /** How much damage the player took from the last hit. `CBasePlayer::m_lastDamageAmount`, an int. */
    get lastDamageAmount(): number;
    set lastDamageAmount(value: number);
    /** Game time damage over time (poison, burn, drowning recovery) was last applied. `CBasePlayer::m_tbdPrev`, a float. */
    get tbdPrev(): number;
    set tbdPrev(value: number);
    /** Half-Life's Geiger counter: distance to the nearest radiation. `CBasePlayer::m_flgeigerRange`, a float. */
    get flgeigerRange(): number;
    set flgeigerRange(value: number);
    /** Game time the Geiger counter is next updated (Half-Life). `CBasePlayer::m_flgeigerDelay`, a float. */
    get flgeigerDelay(): number;
    set flgeigerDelay(value: number);
    /** The Geiger counter range last sent to the client (Half-Life). `CBasePlayer::m_igeigerRangePrev`, an int. */
    get igeigerRangePrev(): number;
    set igeigerRangePrev(value: number);
    /** The texture type under the player, for step sounds. CS does not use it. `CBasePlayer::m_chTextureType`, an int. */
    get textureType(): number;
    set textureType(value: number);
    /** How much health drowning has taken; it is given back once he surfaces. `CBasePlayer::m_idrowndmg`, an int. */
    get idrowndmg(): number;
    set idrowndmg(value: number);
    /** How much of that drowning damage has been given back. `CBasePlayer::m_idrownrestored`, an int. */
    get idrownrestored(): number;
    set idrownrestored(value: number);
    /** The damage bits last sent to the HUD; -1 forces a resend. `CBasePlayer::m_bitsHUDDamage`, an int. */
    get hudDamage(): number;
    set hudDamage(value: number);
    /** True when the player's HUD has to be reset on his next update (after a spawn). `CBasePlayer::m_fInitHUD`, a bool. */
    get initHud(): boolean;
    set initHud(value: boolean);
    /** True once the player's HUD has been set up since he connected. `CBasePlayer::m_fGameHUDInitialized`, a bool. */
    get gameHudInitialized(): boolean;
    set gameHudInitialized(value: boolean);
    /** The train control shown on the player's HUD: 0 off, 1 to 5 the speed notch, plus bits for "changed" and "active". `CBasePlayer::m_iTrain`, an int. */
    get train(): number;
    set train(value: number);
    /** False when the player's weapon list has to be sent again. `CBasePlayer::m_fWeapon`, a bool. */
    get weapon(): boolean;
    set weapon(value: boolean);
    /** The func_tank (a mounted gun) the player is using. `CBasePlayer::m_pTank`, an entity index. */
    get tank(): number;
    set tank(value: number);
    /** Game time the player died. `CBasePlayer::m_fDeadTime`, a float. */
    get deadTime(): number;
    set deadTime(value: number);
    /** True if monsters do not hear the player. `CBasePlayer::m_fNoPlayerSound`, a bool. */
    get noPlayerSound(): boolean;
    set noPlayerSound(value: boolean);
    /** True if the player has the Half-Life long jump module. `CBasePlayer::m_fLongJump`, a bool. */
    get longJump(): boolean;
    set longJump(value: boolean);
    /** Game time from which the player counts as sneaking (Half-Life). `CBasePlayer::m_tSneaking`, a float. */
    get sneaking(): number;
    set sneaking(value: number);
    /** Set to 5 on reset; ReGameDLL does not read it. `CBasePlayer::m_iUpdateTime`, an int. */
    get updateTime(): number;
    set updateTime(value: number);
    /** The health last sent to the player's HUD; when it differs from his health, the game sends the new one. `CBasePlayer::m_iClientHealth`, an int. */
    get clientHealth(): number;
    set clientHealth(value: number);
    /** The armour last sent to the player's HUD; -1 forces a resend. `CBasePlayer::m_iClientBattery`, an int. */
    get clientBattery(): number;
    set clientBattery(value: number);
    /** Which parts of the HUD are hidden: "Money", "Timer", "Crosshair", "Flashlight", ...; the game sends the change itself. `CBasePlayer::m_iHideHUD`, a bit mask. */
    get hideHud(): HideHud[];
    set hideHud(values: HideHud[]);
    /** The hidden HUD parts last sent to the player; when it differs from hideHud, the game sends hideHud. `CBasePlayer::m_iClientHideHUD`, a bit mask. */
    get clientHideHud(): HideHud[];
    set clientHideHud(values: HideHud[]);
    /** The field of view last sent to the player; when the game's own copy differs, it sends that one. `CBasePlayer::m_iClientFOV`, an int. */
    get clientFov(): number;
    set clientFov(value: number);
    /** How many times the player has spawned this round; with mp_forcerespawn off, a second spawn is refused. `CBasePlayer::m_iNumSpawns`, an int. */
    get numSpawns(): number;
    set numSpawns(value: number);
    /** An observer entity tied to the player; ReGameDLL never creates one and only removes it when he disconnects. `CBasePlayer::m_pObserver`, an entity index. */
    get observer(): number;
    set observer(value: number);
    /** The weapon in the player's hands, or null. `CBasePlayer::m_pActiveItem`, a pointer. Read only. */
    get activeItem(): Weapon | null;
    /** The weapon the player's client was last told he holds. `CBasePlayer::m_pClientActiveItem`, a pointer. Read only. */
    get clientActiveItem(): Weapon | null;
    /** The weapon the player held before this one — where lastinv switches to. `CBasePlayer::m_pLastItem`, a pointer. Read only. */
    get lastItem(): Weapon | null;
    /** The aim assist correction, in degrees. `CBasePlayer::m_vecAutoAim`, a vector. */
    get autoAim(): Vector;
    set autoAim(value: number[]);
    /** True while aim assist has a target under the crosshair. `CBasePlayer::m_fOnTarget`, a bool. */
    get onTarget(): boolean;
    set onTarget(value: boolean);
    /** Game time the status bar (who is under the crosshair) is next updated, every 0.2 seconds. `CBasePlayer::m_flNextSBarUpdateTime`, a float. */
    get nextSBarUpdateTime(): number;
    set nextSBarUpdateTime(value: number);
    /** Game time the status bar about the player under the crosshair is kept until, 2 seconds after he left it. `CBasePlayer::m_flStatusBarDisappearDelay`, a float. */
    get statusBarDisappearDelay(): number;
    set statusBarDisappearDelay(value: number);
    /** The horizontal aim assist correction last sent to the client. `CBasePlayer::m_lastx`, an int. */
    get lastx(): number;
    set lastx(value: number);
    /** The vertical aim assist correction last sent to the client. `CBasePlayer::m_lasty`, an int. */
    get lasty(): number;
    set lasty(value: number);
    /** How many frames the player's custom spray logo has; -1 for none. `CBasePlayer::m_nCustomSprayFrames`, an int. */
    get customSprayFrames(): number;
    set customSprayFrames(value: number);
    /** Game time the player can spray again (decalfrequency). `CBasePlayer::m_flNextDecalTime`, a float. */
    get nextDecalTime(): number;
    set nextDecalTime(value: number);
    /** The index of the player's own model; the game sets modelIndex back to it, at spawn for one. `CBasePlayer::m_modelIndexPlayer`, an int. */
    get modelIndexPlayer(): number;
    set modelIndexPlayer(value: number);
    /** The legs' animation the game picked for the player this frame. `CBasePlayer::m_iGaitsequence`, an int. */
    get gaitsequence(): number;
    set gaitsequence(value: number);
    /** Playback position of the legs' animation, in frames. `CBasePlayer::m_flGaitframe`, a float. */
    get gaitframe(): number;
    set gaitframe(value: number);
    /** The direction the legs face, in degrees; it catches up with the body's. `CBasePlayer::m_flGaityaw`, a float. */
    get gaityaw(): number;
    set gaityaw(value: number);
    /** Where the player was on the previous animation update, to estimate his speed. `CBasePlayer::m_prevgaitorigin`, a vector. */
    get prevgaitorigin(): Vector;
    set prevgaitorigin(value: number[]);
    /** The upper body's pitch blend the game worked out for the player's model. `CBasePlayer::m_flPitch`, a float. */
    get pitch(): number;
    set pitch(value: number);
    /** The upper body's turn against the legs, in degrees. `CBasePlayer::m_flYaw`, a float. */
    get yaw(): number;
    set yaw(value: number);
    /** How far the player moved since the previous animation update, for the legs' animation. `CBasePlayer::m_flGaitMovement`, a float. */
    get gaitMovement(): number;
    set gaitMovement(value: number);
    /** The player's _cl_autowepswitch: 0 never switch to a picked-up weapon, 1 always, 2 only when not firing. `CBasePlayer::m_iAutoWepSwitch`, an int. */
    get autoWepSwitch(): number;
    set autoWepSwitch(value: number);
    /** True if the player uses the graphical (VGUI) menus — his _vgui_menus setting. `CBasePlayer::m_bVGUIMenus`, a bool. */
    get vguiMenus(): boolean;
    set vguiMenus(value: boolean);
    /** True if the player wants hints — his _ah setting. `CBasePlayer::m_bShowHints`, a bool. */
    get showHints(): boolean;
    set showHints(value: boolean);
    /** True while the player holds his shield up. `CBasePlayer::m_bShieldDrawn`, a bool. */
    get shieldDrawn(): boolean;
    set shieldDrawn(value: boolean);
    /** True if the player has a tactical shield. `CBasePlayer::m_bOwnsShield`, a bool. */
    get ownsShield(): boolean;
    set ownsShield(value: boolean);
    /** True if the spectator was following a player before he switched to roaming. `CBasePlayer::m_bWasFollowing`, a bool. */
    get wasFollowing(): boolean;
    set wasFollowing(value: boolean);
    /** Game time the spectator can switch to the next player again. `CBasePlayer::m_flNextFollowTime`, a float. */
    get nextFollowTime(): number;
    set nextFollowTime(value: number);
    /** How fast the legs turn after the body, for the player's animation. `CBasePlayer::m_flYawModifier`, a float. */
    get yawModifier(): number;
    set yawModifier(value: number);
    /** Game time a flashbang's blindness ends. Writing it does not blind the screen — that is a ScreenFade message. `CBasePlayer::m_blindUntilTime`, a float. */
    get blindUntilTime(): number;
    set blindUntilTime(value: number);
    /** Game time the player was blinded. `CBasePlayer::m_blindStartTime`, a float. */
    get blindStartTime(): number;
    set blindStartTime(value: number);
    /** How long the blindness stays full, seconds. `CBasePlayer::m_blindHoldTime`, a float. */
    get blindHoldTime(): number;
    set blindHoldTime(value: number);
    /** How long the blindness takes to fade, seconds. `CBasePlayer::m_blindFadeTime`, a float. */
    get blindFadeTime(): number;
    set blindFadeTime(value: number);
    /** How white the blindness is, 0 to 255; 255 is fully blind. `CBasePlayer::m_blindAlpha`, an int. */
    get blindAlpha(): number;
    set blindAlpha(value: number);
    /** Game time from which a bot may follow teammates on its own. `CBasePlayer::m_allowAutoFollowTime`, a float. */
    get allowAutoFollowTime(): number;
    set allowAutoFollowTime(value: number);
    /** True while the rebuy command is buying the player's last equipment. `CBasePlayer::m_bIsInRebuy`, a bool. */
    get isInRebuy(): boolean;
    set isInRebuy(value: boolean);
    /** Game time the player's location name (the place on the map) was last updated. `CBasePlayer::m_flLastUpdateTime`, a float. */
    get lastUpdateTime(): number;
    set lastUpdateTime(value: number);
    /** Game time the player's progress bar (defusing, planting) started; 0 for none. `CBasePlayer::m_progressStart`, a float. */
    get progressStart(): number;
    set progressStart(value: number);
    /** Game time the player's progress bar fills. `CBasePlayer::m_progressEnd`, a float. */
    get progressEnd(): number;
    set progressEnd(value: number);
    /** True if the spectator's chase camera locks to the target's view (OBS_CHASE_LOCKED) rather than turning freely. `CBasePlayer::m_bObserverAutoDirector`, a bool. */
    get observerAutoDirector(): boolean;
    set observerAutoDirector(value: boolean);
    /** True if the spectator may change his view mode; false right after death. `CBasePlayer::m_canSwitchObserverModes`, a bool. */
    get canSwitchObserverModes(): boolean;
    set canSwitchObserverModes(value: boolean);
    /** A Condition Zero leftover; ReGameDLL does not use it. `CBasePlayer::m_heartBeatTime`, a float. */
    get heartBeatTime(): number;
    set heartBeatTime(value: number);
    /** A Condition Zero leftover; ReGameDLL does not use it. `CBasePlayer::m_intenseTimestamp`, a float. */
    get intenseTimestamp(): number;
    set intenseTimestamp(value: number);
    /** A Condition Zero leftover; ReGameDLL does not use it. `CBasePlayer::m_silentTimestamp`, a float. */
    get silentTimestamp(): number;
    set silentTimestamp(value: number);
    /** A Condition Zero leftover (silent, calm, intense); ReGameDLL does not use it. `CBasePlayer::m_musicState`, an int. */
    get musicState(): number;
    set musicState(value: number);
    /** The player's money last sent to the other players' scoreboards. `CBasePlayer::m_iLastAccount`, an int. */
    get lastAccount(): number;
    set lastAccount(value: number);
    /** The player's health last sent to the other players' scoreboards. `CBasePlayer::m_iLastClientHealth`, an int. */
    get lastClientHealth(): number;
    set lastClientHealth(value: number);
    /** Game time his money and health are next sent to the scoreboards even if unchanged, every 5 seconds. `CBasePlayer::m_tmNextAccountHealthUpdate`, a float. */
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
    /** The player holding the weapon, or null if it lies on the ground. `CBasePlayerItem::m_pPlayer`, a pointer. Read only. */
    get player(): Player | null;
    /** The next weapon in the same inventory slot (grenades share one), or null. `CBasePlayerItem::m_pNext`, a pointer. Read only. */
    get next(): Weapon | null;
    /** 1 if the "click" of an empty weapon may play on the next attack. `CBasePlayerWeapon::m_iPlayEmptySound` (reapi `m_Weapon_iPlayEmptySound`), an int. */
    get playEmptySound(): number;
    set playEmptySound(value: number);
    /** 1 while the player holds attack with an empty clip. `CBasePlayerWeapon::m_fFireOnEmpty` (reapi `m_Weapon_fFireOnEmpty`), an int. */
    get fireOnEmpty(): number;
    set fireOnEmpty(value: number);
    /** Seconds until the weapon can fire again, counting down by itself: about 0.1 after an AK-47 shot, 1.45 after an AWP one. `CBasePlayerWeapon::m_flNextPrimaryAttack` (reapi `m_Weapon_flNextPrimaryAttack`), a float. */
    get nextPrimaryAttack(): number;
    set nextPrimaryAttack(value: number);
    /** Seconds until the secondary attack (zoom, silencer, burst mode) works again, counting down by itself. `CBasePlayerWeapon::m_flNextSecondaryAttack` (reapi `m_Weapon_flNextSecondaryAttack`), a float. */
    get nextSecondaryAttack(): number;
    set nextSecondaryAttack(value: number);
    /** Seconds until the weapon plays its idle animation, counting down by itself. `CBasePlayerWeapon::m_flTimeWeaponIdle` (reapi `m_Weapon_flTimeWeaponIdle`), a float. */
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /** Which ammo the weapon uses — the slot of the player's ammo it takes from; -1 for none (a knife). `CBasePlayerWeapon::m_iPrimaryAmmoType` (reapi `m_Weapon_iPrimaryAmmoType`), an int. */
    get primaryAmmoType(): number;
    set primaryAmmoType(value: number);
    /** The secondary ammo slot; CS weapons have none (-1). `CBasePlayerWeapon::m_iSecondaryAmmoType` (reapi `m_Weapon_iSecondaryAmmoType`), an int. */
    get secondaryAmmoType(): number;
    set secondaryAmmoType(value: number);
    /** Rounds in the magazine: 30 in a full AK-47; -1 for the knife, which has none. `CBasePlayerWeapon::m_iClip` (reapi `m_Weapon_iClip`), an int. */
    get clip(): number;
    set clip(value: number);
    /** The clip last sent to the player's HUD; the game sends clip when it differs. `CBasePlayerWeapon::m_iClientClip` (reapi `m_Weapon_iClientClip`), an int. */
    get clientClip(): number;
    set clientClip(value: number);
    /** The weapon state (held or not) last sent to the player's HUD. `CBasePlayerWeapon::m_iClientWeaponState` (reapi `m_Weapon_iClientWeaponState`), an int. */
    get clientWeaponState(): number;
    set clientWeaponState(value: number);
    /** 1 while the weapon is reloading. `CBasePlayerWeapon::m_fInReload` (reapi `m_Weapon_fInReload`), an int. */
    get inReload(): number;
    set inReload(value: number);
    /** The shotgun's shell-by-shell reload stage: 0 not reloading, 1 starting, 2 putting a shell in. `CBasePlayerWeapon::m_fInSpecialReload` (reapi `m_Weapon_fInSpecialReload`), an int. */
    get inSpecialReload(): number;
    set inSpecialReload(value: number);
    /** The ammo the weapon gives when first picked up; 0 for one dropped by a player (only its clip). `CBasePlayerWeapon::m_iDefaultAmmo` (reapi `m_Weapon_iDefaultAmmo`), an int. */
    get defaultAmmo(): number;
    set defaultAmmo(value: number);
    /** The precached shell casing model the weapon throws out. `CBasePlayerWeapon::m_iShellId` (reapi `m_Weapon_iShellId`), an int. */
    get shellId(): number;
    set shellId(value: number);
    /** True from a shot until the attack button is let go; the game uses it so tapping the button does not keep single-shot accuracy. `CBasePlayerWeapon::m_bDelayFire` (reapi `m_Weapon_bDelayFire`), a bool. */
    get delayFire(): boolean;
    set delayFire(value: boolean);
    /** Which way the recoil pulls sideways next, left or right; it flips from time to time. `CBasePlayerWeapon::m_iDirection` (reapi `m_Weapon_iDirection`), an int. */
    get direction(): number;
    set direction(value: number);
    /** Meant for a second silencer. CS does not use it. `CBasePlayerWeapon::m_bSecondarySilencerOn` (reapi `m_Weapon_bSecondarySilencerOn`), a bool. */
    get secondarySilencerOn(): boolean;
    set secondarySilencerOn(value: boolean);
    /** The weapon's current inaccuracy: it grows as it fires and settles back; each weapon has its own range (0.2 for a fresh AK-47). `CBasePlayerWeapon::m_flAccuracy` (reapi `m_Weapon_flAccuracy`), a float. */
    get accuracy(): number;
    set accuracy(value: number);
    /** Game time a pistol last fired, for its accuracy. `CBasePlayerWeapon::m_flLastFire` (reapi `m_Weapon_flLastFire`), a float. */
    get lastFire(): number;
    set lastFire(value: number);
    /** Shots in the current burst; the recoil grows with it and it drops back once the player stops firing. `CBasePlayerWeapon::m_iShotsFired` (reapi `m_Weapon_iShotsFired`), an int. */
    get shotsFired(): number;
    set shotsFired(value: number);
    /** Game time the Glock's burst fires its next round; 0 when not bursting. `CBasePlayerWeapon::m_flGlock18Shoot` (reapi `m_Weapon_flGlock18Shoot`), a float. */
    get glock18Shoot(): number;
    set glock18Shoot(value: number);
    /** Rounds the Glock has fired in the current burst. `CBasePlayerWeapon::m_iGlock18ShotsFired` (reapi `m_Weapon_iGlock18ShotsFired`), an int. */
    get glock18ShotsFired(): number;
    set glock18ShotsFired(value: number);
    /** Game time the FAMAS's burst fires its next round; 0 when not bursting. `CBasePlayerWeapon::m_flFamasShoot` (reapi `m_Weapon_flFamasShoot`), a float. */
    get famasShoot(): number;
    set famasShoot(value: number);
    /** Rounds the FAMAS has fired in the current burst. `CBasePlayerWeapon::m_iFamasShotsFired` (reapi `m_Weapon_iFamasShotsFired`), an int. */
    get famasShotsFired(): number;
    set famasShotsFired(value: number);
    /** The spread of the FAMAS's burst, kept for its later rounds. `CBasePlayerWeapon::m_fBurstSpread` (reapi `m_Weapon_fBurstSpread`), a float. */
    get burstSpread(): number;
    set burstSpread(value: number);
    /** Weapon mode bits: WPNSTATE_USP_SILENCED, WPNSTATE_M4A1_SILENCED, WPNSTATE_GLOCK18_BURST_MODE, WPNSTATE_FAMAS_BURST_MODE, WPNSTATE_ELITE_LEFT, WPNSTATE_SHIELD_DRAWN. `CBasePlayerWeapon::m_iWeaponState` (reapi `m_Weapon_iWeaponState`), an int. */
    get weaponState(): number;
    set weaponState(value: number);
    /** Seconds until a shotgun's next shell goes in during its reload, counting down. `CBasePlayerWeapon::m_flNextReload` (reapi `m_Weapon_flNextReload`), a float. */
    get nextReload(): number;
    set nextReload(value: number);
    /** Game time shotsFired next goes down by one after the player stops firing. `CBasePlayerWeapon::m_flDecreaseShotsFired` (reapi `m_Weapon_flDecreaseShotsFired`), a float. */
    get decreaseShotsFired(): number;
    set decreaseShotsFired(value: number);
    /** The handle of the precached Glock firing event. `CBasePlayerWeapon::m_usFireGlock18` (reapi `m_Weapon_usFireGlock18`), an int. */
    get fireGlock18(): number;
    set fireGlock18(value: number);
    /** The handle of the precached FAMAS firing event. `CBasePlayerWeapon::m_usFireFamas` (reapi `m_Weapon_usFireFamas`), an int. */
    get fireFamas(): number;
    set fireFamas(value: number);
    /** The delay between the last two shots, seconds; the game uses it to keep the fire rate even. `CBasePlayerWeapon::m_flPrevPrimaryAttack` (reapi `m_Weapon_flPrevPrimaryAttack`), a float. */
    get prevPrimaryAttack(): number;
    set prevPrimaryAttack(value: number);
    /** Game time the weapon last fired; 0 before the first shot. `CBasePlayerWeapon::m_flLastFireTime` (reapi `m_Weapon_flLastFireTime`), a float. */
    get lastFireTime(): number;
    set lastFireTime(value: number);
}
