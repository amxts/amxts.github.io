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
 * Режим отрисовки сущности — `entity.renderMode`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `kRender*`
 */
export type RenderMode = "normal" | "color" | "texture" | "glow" | "alpha" | "additive" | "unknown";
/**
 * Эффект отрисовки сущности — `entity.renderFx`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `kRenderFx*`
 */
export type RenderFx = "none" | "pulseSlow" | "pulseFast" | "pulseSlowWide" | "pulseFastWide" | "fadeSlow" | "fadeFast" | "solidSlow" | "solidFast" | "strobeSlow" | "strobeFast" | "strobeFaster" | "flickerSlow" | "flickerFast" | "noDissipation" | "distort" | "hologram" | "deadPlayer" | "explode" | "glowShell" | "clampMinScale" | "lightMultiplier" | "unknown";
/**
 * Способ движения сущности — `entity.moveType`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `MOVETYPE_*`
 */
export type MoveType = "none" | "walk" | "step" | "fly" | "toss" | "push" | "noclip" | "flyMissile" | "bounce" | "bounceMissile" | "follow" | "pushStep" | "unknown";
/**
 * Твёрдость сущности — `entity.solid`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `SOLID_*`
 */
export type Solid = "none" | "trigger" | "box" | "slideBox" | "bsp" | "unknown";
/**
 * Уязвимость сущности — `entity.takeDamage`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `DAMAGE_*`
 */
export type TakeDamage = "no" | "yes" | "aim" | "unknown";
/**
 * Стадия смерти сущности — `entity.deadFlag`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `DEAD_*`
 */
export type DeadFlag = "alive" | "dying" | "dead" | "respawnable" | "discardBody" | "unknown";
/**
 * Глубина погружения сущности — `entity.waterLevel`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `pev->waterlevel`
 */
export type WaterLevel = "none" | "feet" | "waist" | "head" | "unknown";
/**
 * Содержимое точки карты: воздух, вода, стена — `entity.waterType`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `CONTENTS_*`
 */
export type Contents = "empty" | "solid" | "water" | "slime" | "lava" | "sky" | "origin" | "clip" | "current0" | "current90" | "current180" | "current270" | "currentUp" | "currentDown" | "translucent" | "ladder" | "unknown";
/**
 * Разворот взгляда игрока — `player.fixAngle`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `pev->fixangle`
 */
export type FixAngle = "none" | "set" | "addYaw" | "unknown";
/**
 * Часть тела, куда попадает пуля, — `player.lastHitGroup`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `HITGROUP_*`
 */
export type HitGroup = "generic" | "head" | "chest" | "stomach" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg" | "shield" | "unknown";
/**
 * Вид брони игрока — `player.kevlar`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `ARMOR_*`
 */
export type ArmorType = "none" | "vest" | "vestHelmet" | "unknown";
/**
 * Режим наблюдения игрока — `player.observerMode`, `player.observerLastMode`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `OBS_*`
 */
export type ObserverMode = "none" | "chaseLocked" | "chaseFree" | "roaming" | "inEye" | "mapFree" | "mapChase" | "unknown";
/**
 * Стадия входа игрока в игру — `player.joiningState`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `JoinState`
 */
export type JoinState = "joined" | "showMotd" | "readingMotd" | "showTeamSelect" | "pickingTeam" | "getIntoGame" | "unknown";
/**
 * Модель игрока — `player.modelName`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `MODEL_*`
 */
export type PlayerModel = "unassigned" | "urban" | "terror" | "leet" | "arctic" | "gsg9" | "gign" | "sas" | "guerilla" | "vip" | "militia" | "spetsnaz" | "auto" | "unknown";
/**
 * Чат, который скрывает игрок, — `player.ignoreGlobalChat`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `IGNOREMSG_*`
 */
export type IgnoredChat = "none" | "enemy" | "all" | "unknown";
/**
 * Старое меню игры — `player.openMenu`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `Menu_*`
 */
export type GameMenu = "none" | "team" | "teamInGame" | "appearance" | "buy" | "buyPistol" | "buyRifle" | "buyMachineGun" | "buyShotgun" | "buySubMachineGun" | "buyItem" | "radio1" | "radio2" | "radio3" | "clientBuy" | "unknown";
/**
 * Направление, куда отбрасывает тело убитого игрока, — `player.throwDirection`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `CS_THROW_*`
 */
export type ThrowDirection = "none" | "forward" | "backward" | "hitVelocity" | "bomb" | "grenade" | "hitVelocityMinusAir" | "unknown";
/**
 * Цвет крови сущности — `player.bloodColor`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `BLOOD_COLOR_*`
 */
export type BloodColor = "none" | "red" | "yellow" | "unknown";
/**
 * Музыкальное состояние Condition Zero — `player.musicState`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
 *
 * Pawn: `MusicState`
 */
export type MusicState = "silent" | "calm" | "intense" | "unknown";
/**
 * Есть ли на карте зона спасения VIP — `game.mapHasVipSafetyZone`.
 *
 * "unknown" — число, которому нет имени (его записал Pawn-плагин или мод); запись "unknown" поле не меняет.
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
     * `true`, пока сущность есть в мире: `false`, когда движок её освободил (`remove()` освобождает её в конце кадра), для ушедшего игрока и для `0` — «нет сущности». Номер из события или хука может указывать на сущность, которой уже нет.
     *
     * Pawn: `is_valid_ent`, `is_entity`
     */
    get exists(): bool;
    /**
     * Задаёт габариты сущности, углы — относительно её `origin`: `box.setSize([-16, -16, 0], [16, 16, 72])`. `mins`, `maxs`, `size` и то, где она сталкивается, следуют за ними. Габариты, у которых `mins` хоть по одной оси больше `maxs`, не ставятся, а в консоль пишется ошибка.
     *
     * Pawn: `entity_set_size`
     */
    setSize(mins: number[], maxs: number[]): void;
    /**
     * Проигрывает звук от сущности: его слышат все рядом, и он затихает с расстоянием: `player.emitSound("myplugin/hit.wav")`. Путь — внутри `sound/`, как его принимает `server.precache`; `options` задают канал, громкость, затухание и высоту.
     *
     * Pawn: `emit_sound`, `rh_emit_sound2`
     */
    emitSound(sample: string, options?: SoundOptions): void;
    /**
     * Класс сущности, например `"player"`, `"weaponbox"`, `"grenade"`, `"func_door"`.
     *
     * Pawn: `pev->classname`
     */
    get classname(): string;
    set classname(value: string);
    /**
     * Глобальное имя сущности: по нему она переносит состояние между уровнями (одиночные карты).
     *
     * Pawn: `pev->globalname`
     */
    get globalName(): string;
    set globalName(value: string);
    /**
     * Положение сущности в мире, в единицах. Присваивание перемещает её правильно, и столкновения переезжают вместе с ней.
     *
     * Pawn: `pev->origin`
     */
    get origin(): Vector;
    set origin(value: number[]);
    /**
     * Сохранённая позиция сущности; что в ней, зависит от сущности (разбиваемая хранит здесь точку появления).
     *
     * Pawn: `pev->oldorigin`
     */
    get oldOrigin(): Vector;
    set oldOrigin(value: number[]);
    /**
     * Скорость сущности с направлением, единиц в секунду: бегущий игрок — около `250`.
     *
     * Pawn: `pev->velocity`
     */
    get velocity(): Vector;
    set velocity(value: number[]);
    /**
     * Добавочная скорость сущности от того, в чём она стоит, — конвейер, `trigger_push`, течение. Единиц в секунду.
     *
     * Pawn: `pev->basevelocity`
     */
    get baseVelocity(): Vector;
    set baseVelocity(value: number[]);
    /**
     * Скорость конвейера для предсказания движения на клиенте игрока; движок обнуляет её каждый кадр игрока.
     *
     * Pawn: `pev->clbasevelocity`
     */
    get clBaseVelocity(): Vector;
    set clBaseVelocity(value: number[]);
    /**
     * Направление движения двери, платформы или кнопки; вычисляется из углов при появлении.
     *
     * Pawn: `pev->movedir`
     */
    get moveDir(): Vector;
    set moveDir(value: number[]);
    /**
     * Поворот сущности: тангаж, рысканье, крен в градусах. У игрока следует за взглядом; чтобы развернуть взгляд, поставьте его вместе с `fixAngle`.
     *
     * Pawn: `pev->angles`
     */
    get angles(): Vector;
    set angles(value: number[]);
    /**
     * Скорость вращения сущности, градусов в секунду по каждой оси.
     *
     * Pawn: `pev->avelocity`
     */
    get angularVelocity(): Vector;
    set angularVelocity(value: number[]);
    /**
     * Толчок взгляда игрока от отдачи или попадания, в градусах; движок сам гасит его до нуля.
     *
     * Pawn: `pev->punchangle`
     */
    get punchAngle(): Vector;
    set punchAngle(value: number[]);
    /**
     * Направление взгляда игрока: тангаж (вниз — положительный), рысканье, крен в градусах. Только у игроков.
     *
     * Pawn: `pev->v_angle`
     */
    get viewAngle(): Vector;
    set viewAngle(value: number[]);
    /**
     * Конечная точка предсказываемого снаряда; уходит клиенту вместе со `startTime` и `impactTime`.
     *
     * Pawn: `pev->endpos`
     */
    get endPos(): Vector;
    set endPos(value: number[]);
    /**
     * Начальная точка предсказываемого снаряда; уходит клиенту вместе с `endPos`.
     *
     * Pawn: `pev->startpos`
     */
    get startPos(): Vector;
    set startPos(value: number[]);
    /**
     * Игровое время, когда предсказываемый снаряд долетит до `endPos`.
     *
     * Pawn: `pev->impacttime`
     */
    get impactTime(): number;
    set impactTime(value: number);
    /**
     * Игровое время, когда предсказываемый снаряд вылетел из `startPos`.
     *
     * Pawn: `pev->starttime`
     */
    get startTime(): number;
    set startTime(value: number);
    /**
     * Разворот взгляда игрока, одно из: `"none"` — нет; `"set"` — на следующем кадре взгляд повернётся по `angles`; `"addYaw"` — повернётся на рысканье из `angularVelocity`. Потом движок возвращает поле в `"none"`.
     *
     * Pawn: `pev->fixangle`
     */
    get fixAngle(): FixAngle;
    set fixAngle(value: FixAngle);
    /**
     * Тангаж, к которому поворачивается монстр, в градусах. В CS не используется.
     *
     * Pawn: `pev->idealpitch`
     */
    get idealPitch(): number;
    set idealPitch(value: number);
    /**
     * Скорость поворота монстра по тангажу, градусов в секунду. В CS не используется.
     *
     * Pawn: `pev->pitch_speed`
     */
    get pitchSpeed(): number;
    set pitchSpeed(value: number);
    /**
     * Рысканье, к которому поворачивается монстр, в градусах; `momentary_rot_button` хранит здесь своё положение.
     *
     * Pawn: `pev->ideal_yaw`
     */
    get idealYaw(): number;
    set idealYaw(value: number);
    /**
     * Скорость поворота монстра, градусов в секунду.
     *
     * Pawn: `pev->yaw_speed`
     */
    get yawSpeed(): number;
    set yawSpeed(value: number);
    /**
     * Номер подгруженной модели сущности; `0` — сущность не рисуется.
     *
     * Pawn: `pev->modelindex`
     */
    get modelIndex(): number;
    set modelIndex(value: number);
    /**
     * Путь к модели сущности, например `"models/w_c4.mdl"`; у браша карты — его номер, например `"*12"`. Запись ставит модель так, как это делает игра: `modelIndex` и размер следуют за ней. Модель должна быть прекэширована (`server.precache`), иначе сервер остановится.
     *
     * Pawn: `pev->model`
     */
    get model(): string;
    set model(value: string);
    /**
     * Модель оружия от первого лица, которую видит сам игрок, например `"models/v_knife.mdl"`.
     *
     * Pawn: `pev->viewmodel`
     */
    get viewModel(): number;
    set viewModel(value: number);
    /**
     * Модель оружия в руках игрока, которую видят другие, например `"models/p_knife.mdl"`.
     *
     * Pawn: `pev->weaponmodel`
     */
    get weaponModel(): number;
    set weaponModel(value: number);
    /**
     * Нижний угол габаритов сущности в координатах мира; движок пересчитывает его при перемещении.
     *
     * Pawn: `pev->absmin`
     */
    get absMin(): Vector;
    set absMin(value: number[]);
    /**
     * Верхний угол габаритов сущности в координатах мира; движок пересчитывает его при перемещении.
     *
     * Pawn: `pev->absmax`
     */
    get absMax(): Vector;
    set absMax(value: number[]);
    /**
     * Нижний угол габаритов сущности относительно `origin`: `(-16, -16, -36)` у стоящего игрока. Ставится через `setSize(mins, maxs)`, чтобы `size` и `absMin` пересчитались.
     *
     * Pawn: `pev->mins`
     */
    get mins(): Vector;
    set mins(value: number[]);
    /**
     * Верхний угол габаритов сущности относительно `origin`: `(16, 16, 36)` у стоящего игрока. Ставится через `setSize(mins, maxs)`, чтобы `size` и `absMax` пересчитались.
     *
     * Pawn: `pev->maxs`
     */
    get maxs(): Vector;
    set maxs(value: number[]);
    /**
     * Размеры габаритов сущности: maxs минус mins.
     *
     * Pawn: `pev->size`
     */
    get size(): Vector;
    set size(value: number[]);
    /**
     * Собственные часы двери, платформы или поезда: идут, только пока сущность движется, и её `nextThink` отсчитывается по ним.
     *
     * Pawn: `pev->ltime`
     */
    get localTime(): number;
    set localTime(value: number);
    /**
     * Игровое время следующего think сущности; `0` и меньше — никогда. У двери, платформы и поезда отсчитывается по `localTime`.
     *
     * Pawn: `pev->nextthink`
     */
    get nextThink(): number;
    set nextThink(value: number);
    /**
     * Способ движения сущности, одно из: `"none"` — стоит на месте; `"walk"` — ходит (игрок); `"step"` — ходит как монстр; `"fly"` — летает без гравитации; `"toss"` — падает; `"push"` — движется и толкает других, сквозь мир (двери, платформы); `"noclip"` — летает сквозь стены; `"flyMissile"` — летает как `"fly"`, задевая монстров издалека; `"bounce"` — падает и отскакивает; `"bounceMissile"` — отскакивает без гравитации; `"follow"` — держится за `aimEntity`; `"pushStep"` — объект карты, который сталкивается с миром.
     *
     * Pawn: `pev->movetype`, `MOVETYPE_*`
     */
    get moveType(): MoveType;
    set moveType(value: MoveType);
    /**
     * Твёрдость сущности, одно из: `"none"` — проходит сквозь всё; `"trigger"` — только касается; `"box"` — сталкивается как коробка; `"slideBox"` — как коробка игрока; `"bsp"` — как браш карты.
     *
     * Pawn: `pev->solid`, `SOLID_*`
     */
    get solid(): Solid;
    set solid(value: Solid);
    /**
     * Номер скина, которым рисуется модель, с `0`. Браш карты хранит здесь своё содержимое: `-3` — вода, `-16` — лестница.
     *
     * Pawn: `pev->skin`, `CONTENTS_*`
     */
    get skin(): number;
    set skin(value: number);
    /**
     * Группы тела модели: какие подмодели рисуются, одним числом.
     *
     * Pawn: `pev->body`
     */
    get body(): number;
    set body(value: number);
    /**
     * Визуальные эффекты сущности, например: `"NoDraw"` прячет её, `"DimLight"` и `"BrightLight"` освещают вокруг, `"MuzzleFlash"` — одна вспышка.
     *
     * Pawn: `pev->effects`
     */
    get effects(): Effect[];
    set effects(values: Effect[]);
    /**
     * Множитель гравитации сущности: `1` — обычная, `0.5` — половина. `0` тоже считается обычной.
     *
     * Pawn: `pev->gravity`
     */
    get gravity(): number;
    set gravity(value: number);
    /**
     * Множитель трения сущности о землю, `1` — обычное. У отскакивающей сущности (`moveType` `"bounce"`) — насколько слабо она отскакивает: `0` — отскок на полной скорости.
     *
     * Pawn: `pev->friction`
     */
    get friction(): number;
    set friction(value: number);
    /**
     * Освещённость места, где стоит игрок, от `0` (темно) до `255`; клиент присылает её каждый кадр.
     *
     * Pawn: `pev->light_level`
     */
    get lightLevel(): number;
    set lightLevel(value: number);
    /**
     * Номер анимации, которую играет модель.
     *
     * Pawn: `pev->sequence`
     */
    get sequence(): number;
    set sequence(value: number);
    /**
     * Номер анимации ног игрока поверх `sequence`; `0` — нет.
     *
     * Pawn: `pev->gaitsequence`
     */
    get gaitSequence(): number;
    set gaitSequence(value: number);
    /**
     * Позиция в анимации, от `0` до `255` на всю последовательность; у спрайта — номер кадра.
     *
     * Pawn: `pev->frame`
     */
    get frame(): number;
    set frame(value: number);
    /**
     * Игровое время, когда выставлен текущий кадр; клиент анимирует от него.
     *
     * Pawn: `pev->animtime`
     */
    get animTime(): number;
    set animTime(value: number);
    /**
     * Скорость анимации: `1` — обычная, `0` — стоп, отрицательная — назад.
     *
     * Pawn: `pev->framerate`
     */
    get frameRate(): number;
    set frameRate(value: number);
    /**
     * Масштаб спрайта: `1` — обычный размер.
     *
     * Pawn: `pev->scale`
     */
    get scale(): number;
    set scale(value: number);
    /**
     * Режим отрисовки сущности, одно из: `"normal"` — как есть; `"color"` — залита цветом `renderColor`; `"texture"` — полупрозрачная; `"glow"` — светится и видна сквозь стены (для спрайтов); `"alpha"` — полупрозрачная, с вырезанными частями текстур; `"additive"` — её свет складывается с тем, что позади. Во всех режимах, кроме `"normal"`, `renderAmount` — непрозрачность, от `0` до `255`.
     *
     * Pawn: `pev->rendermode`, `kRender*`
     */
    get renderMode(): RenderMode;
    set renderMode(value: RenderMode);
    /**
     * Непрозрачность сущности в прозрачном `renderMode`, от `0` (невидима) до `255`; со светящейся оболочкой (`renderFx` `"glowShell"`) — толщина оболочки.
     *
     * Pawn: `pev->renderamt`
     */
    get renderAmount(): number;
    set renderAmount(value: number);
    /**
     * Цвет отрисовки сущности для `renderMode` и `renderFx` — красный, зелёный, синий от `0` до `255`: цвет светящейся оболочки (`renderFx` `"glowShell"`).
     *
     * Pawn: `pev->rendercolor`
     */
    get renderColor(): Vector;
    set renderColor(value: number[]);
    /**
     * Эффект отрисовки сущности, одно из: `"none"` — нет; `"glowShell"` — цветная оболочка вокруг модели (цвет — `renderColor`, толщина — `renderAmount`); `"pulseSlow"`, `"pulseFast"`, `"pulseSlowWide"`, `"pulseFastWide"` — прозрачность пульсирует; `"fadeSlow"`, `"fadeFast"` — растворяется; `"solidSlow"`, `"solidFast"` — проявляется; `"strobeSlow"`, `"strobeFast"`, `"strobeFaster"`, `"flickerSlow"`, `"flickerFast"` — мигает; `"hologram"` — мерцающая голограмма, тает с расстоянием; `"distort"`, `"noDissipation"`, `"deadPlayer"`, `"explode"`, `"clampMinScale"`, `"lightMultiplier"` — для спрайтов, трупов и особых эффектов.
     *
     * Pawn: `pev->renderfx`, `kRenderFx*`
     */
    get renderFx(): RenderFx;
    set renderFx(value: RenderFx);
    /**
     * Здоровье сущности: разбиваемая ломается, а заложник умирает, когда урон доводит его до `0` или ниже, например `box.health = 50`. У игрока это его собственное свойство — целое число, при `0` он умирает.
     *
     * Pawn: `pev->health`
     */
    get health(): number;
    set health(value: number);
    /**
     * Оружие игрока, списком видов оружия, например [`"knife"`, `"usp"`]. Запись оружия не даёт и не отбирает и сохраняет костюм, без которого нет HUD.
     *
     * Pawn: `pev->weapons`
     */
    get weapons(): WeaponKind[];
    set weapons(values: WeaponKind[]);
    /**
     * Уязвимость сущности, одно из: `"no"` — неуязвима (бессмертие); `"yes"` — уязвима; `"aim"` — уязвима, и на неё работает автоприцел.
     *
     * Pawn: `pev->takedamage`, `DAMAGE_*`
     */
    get takeDamage(): TakeDamage;
    set takeDamage(value: TakeDamage);
    /**
     * Стадия смерти сущности, одно из: `"alive"` — жива; `"dying"` — умирает (анимация смерти или ещё падает); `"dead"` — мертва, лежит; `"respawnable"` — ждёт возрождения; `"discardBody"` — тело можно убрать.
     *
     * Pawn: `pev->deadflag`, `DEAD_*`
     */
    get deadFlag(): DeadFlag;
    set deadFlag(value: DeadFlag);
    /**
     * Положение глаз игрока относительно `origin`: `(0, 0, 17)` стоя, `(0, 0, 12)` присев.
     *
     * Pawn: `pev->view_ofs`
     */
    get viewOffset(): Vector;
    set viewOffset(value: number[]);
    /**
     * Кнопки, которые игрок держит в этом кадре, например `"Attack"`, `"Jump"`, `"Duck"`, `"Use"`.
     *
     * Pawn: `pev->button`
     */
    get buttons(): Button[];
    set buttons(values: Button[]);
    /**
     * Команда impulse игрока: `100` — фонарик, `201` — спрей. Игра обнуляет её, когда обработает.
     *
     * Pawn: `pev->impulse`
     */
    get impulse(): number;
    set impulse(value: number);
    /**
     * Следующая сущность в списке, который строит движок или игра, — например, результат поиска в сфере.
     *
     * Pawn: `pev->chain`
     */
    get chain(): number;
    set chain(value: number);
    /**
     * Сущность, которая последней ранила игрока: стрелявший — для пули, граната, `trigger_hurt`.
     *
     * Pawn: `pev->dmg_inflictor`
     */
    get damageInflictor(): number;
    set damageInflictor(value: number);
    /**
     * Враг монстра: сущность, за которой он охотится.
     *
     * Pawn: `pev->enemy`
     */
    get enemy(): number;
    set enemy(value: number);
    /**
     * Сущность, за которой следует эта при `moveType` `"follow"`: двигается вместе с ней.
     *
     * Pawn: `pev->aiment`
     */
    get aimEntity(): number;
    set aimEntity(value: number);
    /**
     * Владелец сущности: бросивший гранату, держащий оружие. Сущность не сталкивается со своим владельцем.
     *
     * Pawn: `pev->owner`
     */
    get owner(): number;
    set owner(value: number);
    /**
     * Опора сущности: мир (`0`) или другая сущность, на которой она стоит.
     *
     * Pawn: `pev->groundentity`
     */
    get groundEntity(): number;
    set groundEntity(value: number);
    /**
     * Флаги появления сущности — биты, которые маппер отметил на карте; значение каждого зависит от classname.
     *
     * Pawn: `pev->spawnflags`
     */
    get spawnFlags(): number;
    set spawnFlags(value: number);
    /**
     * Флаги состояния сущности, например `"OnGround"`, `"Ducking"`, `"InWater"`, `"Frozen"`, `"FakeClient"` у бота, `"KillMe"` — на удаление.
     *
     * Pawn: `pev->flags`
     */
    get flags(): EntityFlag[];
    set flags(values: EntityFlag[]);
    /**
     * Цвета игрока Half-Life: верх в младшем байте, низ в старшем; игроку движок ставит сюда его номер.
     *
     * Pawn: `pev->colormap`
     */
    get colorMap(): number;
    set colorMap(value: number);
    /**
     * Максимальное здоровье сущности: лечение на нём останавливается. Игроку сюда ставится здоровье при появлении, `100`.
     *
     * Pawn: `pev->max_health`
     */
    get maxHealth(): number;
    set maxHealth(value: number);
    /**
     * Остаток прыжка игрока из воды, в миллисекундах.
     *
     * Pawn: `pev->teleport_time`
     */
    get teleportTime(): number;
    set teleportTime(value: number);
    /**
     * Очки брони сущности, от `0` до `100` в обычной игре. Вид брони — в `kevlar`.
     *
     * Pawn: `pev->armorvalue`
     */
    get armor(): number;
    set armor(value: number);
    /**
     * Глубина погружения сущности, одно из: `"none"` — не в воде; `"feet"` — ноги в воде; `"waist"` — по пояс; `"head"` — с головой.
     *
     * Pawn: `pev->waterlevel`
     */
    get waterLevel(): WaterLevel;
    set waterLevel(value: WaterLevel);
    /**
     * Среда, в которой находится сущность, одно из: `"empty"`, когда она не в жидкости, `"water"`, `"slime"`, `"lava"`. Остальные имена (`"solid"`, `"sky"`, `"ladder"`, с `"current0"` по `"currentDown"`, ...) — то, что бывает в точке карты, а не жидкость.
     *
     * Pawn: `pev->watertype`, `CONTENTS_*`
     */
    get waterType(): Contents;
    set waterType(value: Contents);
    /**
     * Цель сущности: `targetName` сущностей, которые она запускает при срабатывании, — например, дверь у кнопки.
     *
     * Pawn: `pev->target`
     */
    get target(): string;
    set target(value: string);
    /**
     * Собственное имя сущности на карте, на которое указывает target других.
     *
     * Pawn: `pev->targetname`
     */
    get targetName(): string;
    set targetName(value: string);
    /**
     * Имя игрока, как его последним записал движок; у сущности карты смысл зависит от classname.
     *
     * Pawn: `pev->netname`
     */
    get netName(): string;
    set netName(value: string);
    /**
     * Текст сущности — у `game_text` или `env_message`; у `worldspawn` — название карты.
     *
     * Pawn: `pev->message`
     */
    get message(): string;
    set message(value: string);
    /**
     * Урон, полученный игроком с последнего обновления HUD; игра обнуляет его, отправив индикатор урона.
     *
     * Pawn: `pev->dmg_take`
     */
    get damageTaken(): number;
    set damageTaken(value: number);
    /**
     * Урон, поглощённый бронёй игрока с последнего обновления HUD; обнуляется вместе с `damageTaken`.
     *
     * Pawn: `pev->dmg_save`
     */
    get damageSaved(): number;
    set damageSaved(value: number);
    /**
     * Урон, который наносит сущность: взрыв гранаты, удар `trigger_hurt`, дверь, которая давит.
     *
     * Pawn: `pev->dmg`
     */
    get damage(): number;
    set damage(value: number);
    /**
     * Отметка игрового времени для урона во времени и для взрыва гранаты; смысл зависит от сущности.
     *
     * Pawn: `pev->dmgtime`
     */
    get damageTime(): number;
    set damageTime(value: number);
    /**
     * Звук сущности, путь к файлу: например, звук движущейся двери.
     *
     * Pawn: `pev->noise`
     */
    get noise(): string;
    set noise(value: string);
    /**
     * Второй звук сущности, путь к файлу: например, звук остановки двери.
     *
     * Pawn: `pev->noise1`
     */
    get noise1(): string;
    set noise1(value: string);
    /**
     * Третий звук сущности, путь к файлу.
     *
     * Pawn: `pev->noise2`
     */
    get noise2(): string;
    set noise2(value: string);
    /**
     * Четвёртый звук сущности, путь к файлу.
     *
     * Pawn: `pev->noise3`
     */
    get noise3(): string;
    set noise3(value: string);
    /**
     * Скорость двери, платформы или поезда, единиц в секунду.
     *
     * Pawn: `pev->speed`
     */
    get speed(): number;
    set speed(value: number);
    /**
     * Игровое время, когда у игрока под водой кончится воздух и он начнёт тонуть; пока голова над водой, игра отодвигает его.
     *
     * Pawn: `pev->air_finished`
     */
    get airFinished(): number;
    set airFinished(value: number);
    /**
     * Игровое время следующей боли игрока от утопления или `trigger_hurt`; до него новой нет.
     *
     * Pawn: `pev->pain_finished`
     */
    get painFinished(): number;
    set painFinished(value: number);
    /**
     * Игровое время, когда истечёт таймер карты-тренировки; больше в CS его никто не читает.
     *
     * Pawn: `pev->radsuit_finished`
     */
    get radsuitFinished(): number;
    set radsuitFinished(value: number);
    /**
     * Сущность, которой принадлежат эти поля, — она сама.
     *
     * Pawn: `pev->pContainingEntity`
     */
    get containingEntity(): number;
    set containingEntity(value: number);
    /**
     * Отметка стеклянного `func_breakable`: с `1` клиент рисует на нём декали. У игроков в CS не используется.
     *
     * Pawn: `pev->playerclass`
     */
    get playerClass(): number;
    set playerClass(value: number);
    /**
     * Предельная скорость бега игрока, единиц в секунду: `250` с ножом, `221` с AK-47. Игра сбрасывает её при смене оружия.
     *
     * Pawn: `pev->maxspeed`
     */
    get maxSpeed(): number;
    set maxSpeed(value: number);
    /**
     * Поле зрения сущности в градусах. У игрока `fov` — своё, по которому игра приближает прицел и которое пишет и сюда.
     *
     * Pawn: `pev->fov`
     */
    get fov(): number;
    set fov(value: number);
    /**
     * Номер последней сыгранной анимации оружия от первого лица.
     *
     * Pawn: `pev->weaponanim`
     */
    get weaponAnim(): number;
    set weaponAnim(value: number);
    /**
     * Значение игрока, которое уходит клиенту; сама CS его не ставит.
     *
     * Pawn: `pev->pushmsec`
     */
    get pushMsec(): number;
    set pushMsec(value: number);
    /**
     * Отметка приседания игрока: `1`, пока он приседает и ещё не сел полностью.
     *
     * Pawn: `pev->bInDuck`
     */
    get inDuck(): number;
    set inDuck(value: number);
    /**
     * Время до следующего звука шага игрока, в миллисекундах.
     *
     * Pawn: `pev->flTimeStepSound`
     */
    get timeStepSound(): number;
    set timeStepSound(value: number);
    /**
     * Время до следующего звука плавания игрока, в миллисекундах.
     *
     * Pawn: `pev->flSwimTime`
     */
    get swimTime(): number;
    set swimTime(value: number);
    /**
     * Приседание игрока в процессе, в миллисекундах: движок начинает с `1000` и отсчитывает вниз.
     *
     * Pawn: `pev->flDuckTime`
     */
    get duckTime(): number;
    set duckTime(value: number);
    /**
     * Нога для следующего звука шага игрока; меняется с каждым шагом.
     *
     * Pawn: `pev->iStepLeft`
     */
    get stepLeft(): number;
    set stepLeft(value: number);
    /**
     * Скорость падения игрока, единиц в секунду, вниз положительная; по ней при приземлении считается урон.
     *
     * Pawn: `pev->flFallVelocity`
     */
    get fallVelocity(): number;
    set fallVelocity(value: number);
    /**
     * Состояние щита игрока: `0` — щит поднят и принимает попадания, `1` — нет.
     *
     * Pawn: `pev->gamestate`
     */
    get gameState(): number;
    set gameState(value: number);
    /**
     * Кнопки, которые игрок держал в прошлом кадре: сравните с buttons, чтобы понять, что он только что нажал.
     *
     * Pawn: `pev->oldbuttons`
     */
    get oldButtons(): Button[];
    set oldButtons(values: Button[]);
    /**
     * Биты групп сущности: если заданы, трассировки и то, что отправляется игроку, пропускают сущности из других групп.
     *
     * Pawn: `pev->groupinfo`
     */
    get groupInfo(): number;
    set groupInfo(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока здесь режим наблюдения, его ставит игра; по имени он читается как `observerMode`.
     *
     * Pawn: `pev->iuser1`
     */
    get iuser1(): number;
    set iuser1(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока здесь номер того, за кем он наблюдает (`0` в свободном полёте); его ставит игра.
     *
     * Pawn: `pev->iuser2`
     */
    get iuser2(): number;
    set iuser2(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока поле занято: камера смерти держит здесь номер убийцы, а ReGameDLL читает из его битов запреты движения (`16` — не приседать, `32` — не лазить по лестницам, `64` — не прыгать, `128` — без двойного приседания).
     *
     * Pawn: `pev->iuser3`
     */
    get iuser3(): number;
    set iuser3(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока игра перезаписывает поле каждый кадр: `1`, пока он стоит на транспорте, иначе `0`.
     *
     * Pawn: `pev->iuser4`
     */
    get iuser4(): number;
    set iuser4(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока ReGameDLL обнуляет поле вместе с fuser2 и fuser3, когда сбрасывает выносливость.
     *
     * Pawn: `pev->fuser1`
     */
    get fuser1(): number;
    set fuser1(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока здесь замедление после прыжка, в миллисекундах: при прыжке ставится около `1316` и отсчитывается вниз.
     *
     * Pawn: `pev->fuser2`
     */
    get fuser2(): number;
    set fuser2(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока ReGameDLL умножает на поле движение, пока зажат `+speed` (`0` — выключено); в `noclip` и наблюдении это ускорение.
     *
     * Pawn: `pev->fuser3`
     */
    get fuser3(): number;
    set fuser3(value: number);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->fuser4`
     */
    get fuser4(): number;
    set fuser4(value: number);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->vuser1`
     */
    get vuser1(): Vector;
    set vuser1(value: number[]);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->vuser2`
     */
    get vuser2(): Vector;
    set vuser2(value: number[]);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->vuser3`
     */
    get vuser3(): Vector;
    set vuser3(value: number[]);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->vuser4`
     */
    get vuser4(): Vector;
    set vuser4(value: number[]);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->euser1`
     */
    get euser1(): number;
    set euser1(value: number);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->euser2`
     */
    get euser2(): number;
    set euser2(value: number);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->euser3`
     */
    get euser3(): number;
    set euser3(value: number);
    /**
     * Свободное поле: плагин хранит здесь своё значение, игра его не трогает.
     *
     * Pawn: `pev->euser4`
     */
    get euser4(): number;
    set euser4(value: number);
    /**
     * Выполняет появление сущности, как игра, когда её создаёт: сущность из `Entity.create` настраивается им.
     *
     * Pawn: `ExecuteHamB(Ham_Spawn, ...)`, `ExecuteHam`
     */
    spawn(options?: ActionOptions): void;
    /**
     * Активирует сущность, как игра после загрузки карты.
     *
     * Pawn: `ExecuteHamB(Ham_Activate, ...)`, `ExecuteHam`
     */
    activate(options?: ActionOptions): void;
    /**
     * Лечит сущность, как игра, не выше её максимума: `true`, если здоровье прибавилось.
     *
     * Pawn: `ExecuteHamB(Ham_TakeHealth, ...)`, `ExecuteHam`
     */
    heal(health: number, damageType: Damage[], options?: ActionOptions): bool;
    /**
     * Убивает сущность, как игра, с указанным убийцей; `gib` — `0` обычная смерть, `1` — никогда не разрывает, `2` — всегда.
     *
     * Pawn: `ExecuteHamB(Ham_Killed, ...)`, `ExecuteHam`
     */
    killed(attacker: Entity, gib: number, options?: ActionOptions): void;
    /**
     * Выполняет «мысль» сущности сейчас, не дожидаясь её `nextThink`.
     *
     * Pawn: `ExecuteHamB(Ham_Think, ...)`, `ExecuteHam`
     */
    think(options?: ActionOptions): void;
    /**
     * Использует сущность — нажимает кнопку, открывает дверь, — как это сделал бы `activator` через `caller`.
     *
     * Pawn: `ExecuteHamB(Ham_Use, ...)`, `ExecuteHam`
     */
    use(caller: Entity, activator: Entity, useType: UseType, value: number, options?: ActionOptions): void;
    /**
     * Сообщает движущейся сущности — двери, поезду, — что `other` стоит у неё на пути.
     *
     * Pawn: `ExecuteHamB(Ham_Blocked, ...)`, `ExecuteHam`
     */
    blocked(other: Entity, options?: ActionOptions): void;
    /**
     * Возвращает сущность в то состояние, в каком её застаёт новый раунд.
     *
     * Pawn: `ExecuteHamB(Ham_CS_Restart, ...)`, `ExecuteHam`
     */
    restart(options?: ActionOptions): void;
}
/** A player's members - CBaseEntity up to CBasePlayer - on top of its entvars. */
export declare class PlayerFields extends Entity {
    /**
     * Счётчик патронов игрока из Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::currentammo`
     */
    get currentAmmo(): number;
    set currentAmmo(value: number);
    /**
     * Предел патронов buckshot у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_buckshot`
     */
    get maxAmmoBuckshot(): number;
    set maxAmmoBuckshot(value: number);
    /**
     * Копия запаса патронов buckshot у игрока (M3, XM1014): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_buckshot`
     */
    get ammoBuckshot(): number;
    set ammoBuckshot(value: number);
    /**
     * Предел патронов 9mm у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_9mm`
     */
    get maxAmmo9mm(): number;
    set maxAmmo9mm(value: number);
    /**
     * Копия запаса патронов 9mm у игрока (Glock, Elites, MP5, TMP): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_9mm`
     */
    get ammo9mm(): number;
    set ammo9mm(value: number);
    /**
     * Предел патронов 5.56mm у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_556nato`
     */
    get maxAmmo556nato(): number;
    set maxAmmo556nato(value: number);
    /**
     * Копия запаса патронов 5.56mm у игрока (M4A1, FAMAS, Galil, AUG, SG552, SG550): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_556nato`
     */
    get ammo556nato(): number;
    set ammo556nato(value: number);
    /**
     * Предел патронов 5.56mm box у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_556natobox`
     */
    get maxAmmo556natobox(): number;
    set maxAmmo556natobox(value: number);
    /**
     * Копия запаса патронов 5.56mm box у игрока (M249): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_556natobox`
     */
    get ammo556natobox(): number;
    set ammo556natobox(value: number);
    /**
     * Предел патронов 7.62mm у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_762nato`
     */
    get maxAmmo762nato(): number;
    set maxAmmo762nato(value: number);
    /**
     * Копия запаса патронов 7.62mm у игрока (AK-47, Scout, G3SG1): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_762nato`
     */
    get ammo762nato(): number;
    set ammo762nato(value: number);
    /**
     * Предел патронов .45 ACP у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_45acp`
     */
    get maxAmmo45acp(): number;
    set maxAmmo45acp(value: number);
    /**
     * Копия запаса патронов .45 ACP у игрока (USP, MAC-10, UMP45): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_45acp`
     */
    get ammo45acp(): number;
    set ammo45acp(value: number);
    /**
     * Предел патронов .50 AE у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_50ae`
     */
    get maxAmmo50ae(): number;
    set maxAmmo50ae(value: number);
    /**
     * Копия запаса патронов .50 AE у игрока (Desert Eagle): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_50ae`
     */
    get ammo50ae(): number;
    set ammo50ae(value: number);
    /**
     * Предел патронов .338 Magnum у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_338mag`
     */
    get maxAmmo338mag(): number;
    set maxAmmo338mag(value: number);
    /**
     * Копия запаса патронов .338 Magnum у игрока (AWP): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_338mag`
     */
    get ammo338mag(): number;
    set ammo338mag(value: number);
    /**
     * Предел патронов 5.7mm у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_57mm`
     */
    get maxAmmo57mm(): number;
    set maxAmmo57mm(value: number);
    /**
     * Копия запаса патронов 5.7mm у игрока (P90, Five-seveN): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_57mm`
     */
    get ammo57mm(): number;
    set ammo57mm(value: number);
    /**
     * Предел патронов .357 SIG у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_357sig`
     */
    get maxAmmo357sig(): number;
    set maxAmmo357sig(value: number);
    /**
     * Копия запаса патронов .357 SIG у игрока (P228): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_357sig`
     */
    get ammo357sig(): number;
    set ammo357sig(value: number);
    /**
     * Игровое время, когда у гранаты выдернута чека (`0` — не выдернута); у игрока поле есть, но не используется.
     *
     * Pawn: `CBaseEntity::m_flStartThrow`
     */
    get startThrow(): number;
    set startThrow(value: number);
    /**
     * Игровое время, когда у гранаты отпущена кнопка атаки (`-1`, пока чека не выдернута); у игрока не используется.
     *
     * Pawn: `CBaseEntity::m_flReleaseThrow`
     */
    get releaseThrow(): number;
    set releaseThrow(value: number);
    /**
     * Счётчик взмахов ножа, по которому выбирается анимация удара слева или справа; у игрока не используется.
     *
     * Pawn: `CBaseEntity::m_iSwing`
     */
    get swing(): number;
    set swing(value: number);
    /**
     * Отметка ухода игрока: `true`, когда он ушёл с сервера (или бота выгнали), пока слот не займёт кто-то другой.
     *
     * Pawn: `CBaseEntity::has_disconnected`
     */
    get hasDisconnected(): boolean;
    set hasDisconnected(value: boolean);
    /**
     * Скорость текущей анимации по земле: насколько быстро она двигает модель, единиц в секунду.
     *
     * Pawn: `CBaseAnimating::m_flGroundSpeed`
     */
    get groundSpeed(): number;
    set groundSpeed(value: number);
    /**
     * Игровое время последней проверки событий анимации (шаги, звуки).
     *
     * Pawn: `CBaseAnimating::m_flLastEventCheck`
     */
    get lastEventCheck(): number;
    set lastEventCheck(value: number);
    /**
     * Флаг конца текущей анимации: `true`, когда она доиграла до конца.
     *
     * Pawn: `CBaseAnimating::m_fSequenceFinished`
     */
    get sequenceFinished(): number;
    set sequenceFinished(value: number);
    /**
     * Флаг зацикленности текущей анимации: `true`, если она зациклена.
     *
     * Pawn: `CBaseAnimating::m_fSequenceLoops`
     */
    get sequenceLoops(): number;
    set sequenceLoops(value: number);
    /**
     * Часть тела, куда попала последняя пуля, одно из: `"generic"` — без уточнения; `"head"`, `"chest"`, `"stomach"`, `"leftArm"`, `"rightArm"`, `"leftLeg"`, `"rightLeg"`; `"shield"` — щит.
     *
     * Pawn: `CBaseMonster::m_LastHitGroup`, `HITGROUP_*`
     */
    get lastHitGroup(): HitGroup;
    set lastHitGroup(value: HitGroup);
    /**
     * Виды урона, полученного игроком с последнего обновления HUD, например `"Fall"`, `"Bullet"`, `"Burn"`; отправив индикатор урона, игра оставляет только длительные.
     *
     * Pawn: `CBaseMonster::m_bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /**
     * Задержка игрока до использования любого оружия, в секундах; сама отсчитывается до `0`. Игра ставит её при смене оружия и перезарядке.
     *
     * Pawn: `CBaseMonster::m_flNextAttack`
     */
    get nextAttack(): number;
    set nextAttack(value: number);
    /**
     * Поле зрения монстра как косинус половины конуса: `0.5` — обзор 120 градусов.
     *
     * Pawn: `CBaseMonster::m_flFieldOfView`
     */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    /**
     * Цвет крови сущности, одно из: `"red"` — красная; `"yellow"` — жёлтая; `"none"` — не кровоточит.
     *
     * Pawn: `CBaseMonster::m_bloodColor`, `BLOOD_COLOR_*`, `DONT_BLEED`
     */
    get bloodColor(): BloodColor;
    set bloodColor(value: BloodColor);
    /**
     * Случайное зерно текущей команды игрока; из него берётся разброс пуль, чтобы клиент мог его предсказать.
     *
     * Pawn: `CBasePlayer::random_seed`
     */
    get randomSeed(): number;
    set randomSeed(value: number);
    /**
     * Событие кровотечения игрока; игра его не использует.
     *
     * Pawn: `CBasePlayer::m_usPlayerBleed`
     */
    get playerBleed(): number;
    set playerBleed(value: number);
    /**
     * Игрок, за которым наблюдает этот зритель.
     *
     * Pawn: `CBasePlayer::m_hObserverTarget`
     */
    get observerTarget(): number;
    set observerTarget(value: number);
    /**
     * Игровое время, когда зрителю засчитают следующее нажатие кнопки; нажатия идут не чаще раза в 0.2 секунды.
     *
     * Pawn: `CBasePlayer::m_flNextObserverInput`
     */
    get nextObserverInput(): number;
    set nextObserverInput(value: number);
    /**
     * Номер оружия наблюдаемого игрока, каким его последний раз показали зрителю.
     *
     * Pawn: `CBasePlayer::m_iObserverWeapon`
     */
    get observerWeapon(): number;
    set observerWeapon(value: number);
    /**
     * Состояние бомбы у наблюдаемого игрока, каким его последний раз показали зрителю.
     *
     * Pawn: `CBasePlayer::m_iObserverC4State`
     */
    get observerC4State(): number;
    set observerC4State(value: number);
    /**
     * `true`, если у наблюдаемого игрока есть набор сапёра, — как последний раз показали зрителю.
     *
     * Pawn: `CBasePlayer::m_bObserverHasDefuser`
     */
    get observerHasDefuser(): boolean;
    set observerHasDefuser(value: boolean);
    /**
     * Режим наблюдения, который игрок выбрал последним; восстанавливается, когда он снова наблюдает. Имена те же, что у `observerMode`, одно из: `"chaseLocked"`, `"chaseFree"`, `"roaming"`, `"inEye"`, `"mapFree"`, `"mapChase"`.
     *
     * Pawn: `CBasePlayer::m_iObserverLastMode`, `OBS_*`
     */
    get observerLastMode(): ObserverMode;
    set observerLastMode(value: ObserverMode);
    /**
     * Игровое время, когда заложник перестанет вздрагивать от удара; у игрока не используется.
     *
     * Pawn: `CBasePlayer::m_flFlinchTime`
     */
    get flinchTime(): number;
    set flinchTime(value: number);
    /**
     * `true`, если последнее попадание в игрока было сильным (больше `60` в голову, больше `20` в другое место), — для анимации боли.
     *
     * Pawn: `CBasePlayer::m_bHighDamage`
     */
    get highDamage(): boolean;
    set highDamage(value: boolean);
    /**
     * Множитель скорости игрока после попадания: меньше `1` — игрок замедлен; на земле множитель возвращается к `1` по `0.01` за кадр.
     *
     * Pawn: `CBasePlayer::m_flVelocityModifier`
     */
    get slowdown(): number;
    set slowdown(value: number);
    /**
     * Зум игрока (поле зрения), к которому вернуться после перезарядки или выстрела снайперской винтовки.
     *
     * Pawn: `CBasePlayer::m_iLastZoom`
     */
    get lastZoom(): number;
    set lastZoom(value: number);
    /**
     * `true`, если зум игрока вернётся после выстрела.
     *
     * Pawn: `CBasePlayer::m_bResumeZoom`
     */
    get resumeZoom(): boolean;
    set resumeZoom(value: boolean);
    /**
     * Игровое время, когда из оружия игрока вылетит следующая гильза (AWP, Scout, дробовики); `0` — не вылетит.
     *
     * Pawn: `CBasePlayer::m_flEjectBrass`
     */
    get ejectBrass(): number;
    set ejectBrass(value: number);
    /**
     * Вид брони игрока, одно из: `"none"` — нет; `"vest"` — жилет; `"vestHelmet"` — жилет и шлем.
     *
     * Pawn: `CBasePlayer::m_iKevlar`, `ARMOR_*`
     */
    get kevlar(): ArmorType;
    set kevlar(value: ArmorType);
    /**
     * `true`, если игрок пережил прошлый раунд и сохраняет снаряжение; при `false` он появится со стандартным.
     *
     * Pawn: `CBasePlayer::m_bNotKilled`
     */
    get notKilled(): boolean;
    set notKilled(value: boolean);
    /**
     * Деньги игрока: `800` в начале. Запись не обновляет деньги на его HUD, а `rg_add_account` обновляет.
     *
     * Pawn: `CBasePlayer::m_iAccount`
     */
    get money(): number;
    set money(value: number);
    /**
     * `true`, если у игрока есть основное оружие (винтовка, дробовик, пистолет-пулемёт).
     *
     * Pawn: `CBasePlayer::m_bHasPrimary`
     */
    get hasPrimary(): boolean;
    set hasPrimary(value: boolean);
    /**
     * Таймер отброса тела игрока при смерти; игра его только обнуляет.
     *
     * Pawn: `CBasePlayer::m_flDeathThrowTime`
     */
    get deathThrowTime(): number;
    set deathThrowTime(value: number);
    /**
     * Направление, куда отбросит тело игрока при смерти, одно из: `"none"` — никуда; `"forward"` — вперёд; `"backward"` — назад; `"hitVelocity"` — от атакующего и вверх; `"hitVelocityMinusAir"` — от атакующего, без подброса; `"bomb"` — взрывом бомбы; `"grenade"` — взрывом гранаты.
     *
     * Pawn: `CBasePlayer::m_iThrowDirection`
     */
    get throwDirection(): ThrowDirection;
    set throwDirection(value: ThrowDirection);
    /**
     * Игровое время последнего сообщения игрока в чат; сообщение раньше чем через 0.66 секунды после него игра пропускает.
     *
     * Pawn: `CBasePlayer::m_flLastTalk`
     */
    get lastTalk(): number;
    set lastTalk(value: number);
    /**
     * `true` с подключения игрока до его первого входа в игру.
     *
     * Pawn: `CBasePlayer::m_bJustConnected`
     */
    get justConnected(): boolean;
    set justConnected(value: boolean);
    /**
     * Флаг контекстной помощи игрока: ставится в `true` при подключении, игра его не читает.
     *
     * Pawn: `CBasePlayer::m_bContextHelp`
     */
    get contextHelp(): boolean;
    set contextHelp(value: boolean);
    /**
     * Стадия входа игрока в игру, одно из: `"joined"` — в игре; `"showMotd"` — показан MOTD; `"readingMotd"` — читает MOTD; `"showTeamSelect"` — показано меню команды; `"pickingTeam"` — выбирает команду; `"getIntoGame"` — входит в игру.
     *
     * Pawn: `CBasePlayer::m_iJoiningState`, `JoinState`
     */
    get joiningState(): JoinState;
    set joiningState(value: JoinState);
    /**
     * Камера (`trigger_camera`), через которую смотрит игрок, пока выбирает команду.
     *
     * Pawn: `CBasePlayer::m_pIntroCamera`
     */
    get introCamera(): number;
    set introCamera(value: number);
    /**
     * Игровое время, когда вступительный вид игрока переключится на следующую камеру (каждые 6 секунд).
     *
     * Pawn: `CBasePlayer::m_fIntroCamTime`
     */
    get introCamTime(): number;
    set introCamTime(value: number);
    /**
     * Игровое время, когда игрок последний раз двигался или нажимал кнопку; от него считается кик за бездействие.
     *
     * Pawn: `CBasePlayer::m_fLastMovement`
     */
    get lastMovement(): number;
    set lastMovement(value: number);
    /**
     * `true`, пока у игрока на экране брифинг карты.
     *
     * Pawn: `CBasePlayer::m_bMissionBriefing`
     */
    get missionBriefing(): boolean;
    set missionBriefing(value: boolean);
    /**
     * `true`, если игрок сменил команду в этом раунде.
     *
     * Pawn: `CBasePlayer::m_bTeamChanged`
     */
    get teamChanged(): boolean;
    set teamChanged(value: boolean);
    /**
     * Модель игрока, одно из: `"urban"`, `"gsg9"`, `"gign"`, `"sas"`, `"vip"`, `"spetsnaz"` — спецназа; `"terror"`, `"leet"`, `"arctic"`, `"guerilla"`, `"militia"` — террористов; `"unassigned"` — пока не выбрана; `"auto"` — выбирает игра.
     *
     * Pawn: `CBasePlayer::m_iModelName`, `MODEL_*`
     */
    get modelName(): PlayerModel;
    set modelName(value: PlayerModel);
    /**
     * Число союзников, убитых игроком; при `mp_autokick` его выгоняют, когда оно доходит до `mp_max_teamkills`.
     *
     * Pawn: `CBasePlayer::m_iTeamKills`
     */
    get teamKills(): number;
    set teamKills(value: number);
    /**
     * Чат, который игрок скрывает (команда `ignoremsg`), одно из: `"none"` — ничей; `"enemy"` — врагов; `"all"` — всех.
     *
     * Pawn: `CBasePlayer::m_iIgnoreGlobalChat`, `IGNOREMSG_*`
     */
    get ignoreGlobalChat(): IgnoredChat;
    set ignoreGlobalChat(value: IgnoredChat);
    /**
     * `true`, если у игрока есть прибор ночного видения.
     *
     * Pawn: `CBasePlayer::m_bHasNightVision`
     */
    get hasNightVision(): boolean;
    set hasNightVision(value: boolean);
    /**
     * `true`, пока прибор ночного видения игрока включён.
     *
     * Pawn: `CBasePlayer::m_bNightVisionOn`
     */
    get nightVisionOn(): boolean;
    set nightVisionOn(value: boolean);
    /**
     * Игровое время следующей проверки игрока на бездействие; проверки идут раз в 5 секунд.
     *
     * Pawn: `CBasePlayer::m_flIdleCheckTime`
     */
    get idleCheckTime(): number;
    set idleCheckTime(value: number);
    /**
     * Игровое время, когда игрок снова сможет пользоваться радио.
     *
     * Pawn: `CBasePlayer::m_flRadioTime`
     */
    get radioTime(): number;
    set radioTime(value: number);
    /**
     * Число радиосообщений, оставшихся у игрока до следующего появления (`mp_radio_maxinround`, по умолчанию `60`); на `0` его радио молчит.
     *
     * Pawn: `CBasePlayer::m_iRadioMessages`
     */
    get radioMessages(): number;
    set radioMessages(value: number);
    /**
     * `true`, если игрок не слышит радио (команда ignorerad).
     *
     * Pawn: `CBasePlayer::m_bIgnoreRadio`
     */
    get ignoreRadio(): boolean;
    set ignoreRadio(value: boolean);
    /**
     * `true`, пока игрок несёт бомбу.
     *
     * Pawn: `CBasePlayer::m_bHasC4`
     */
    get hasC4(): boolean;
    set hasC4(value: boolean);
    /**
     * `true`, если у игрока есть набор сапёра.
     *
     * Pawn: `CBasePlayer::m_bHasDefuser`
     */
    get hasDefuser(): boolean;
    set hasDefuser(value: boolean);
    /**
     * `true`, если игрока убил взрыв бомбы.
     *
     * Pawn: `CBasePlayer::m_bKilledByBomb`
     */
    get killedByBomb(): boolean;
    set killedByBomb(value: boolean);
    /**
     * Направление от взрыва к игроку; запоминается при попадании взрывом, чтобы отбросить тело, если игрок умрёт.
     *
     * Pawn: `CBasePlayer::m_vBlastVector`
     */
    get blastVector(): Vector;
    set blastVector(value: number[]);
    /**
     * `true`, если игрока убила граната.
     *
     * Pawn: `CBasePlayer::m_bKilledByGrenade`
     */
    get killedByGrenade(): boolean;
    set killedByGrenade(value: boolean);
    /**
     * Разовые подсказки, уже показанные игроку, по биту на каждую.
     *
     * Pawn: `CBasePlayer::m_flDisplayHistory`
     */
    get displayHistory(): number;
    set displayHistory(value: number);
    /**
     * Старое меню, которое игра открыла игроку, одно из: `"none"` — никакое; `"team"` — меню команды, `"teamInGame"` — оно же в игре; `"appearance"` — меню модели; `"buy"`, `"buyPistol"`, `"buyRifle"`, `"buyMachineGun"`, `"buyShotgun"`, `"buySubMachineGun"`, `"buyItem"` — меню закупки; `"radio1"`, `"radio2"`, `"radio3"` — меню радио; `"clientBuy"` — меню закупки, которое рисует сам клиент.
     *
     * Pawn: `CBasePlayer::m_iMenu`, `Menu_*`
     */
    get openMenu(): GameMenu;
    set openMenu(value: GameMenu);
    /**
     * Цель слежения игрока: ставится в `1` при появлении, игра её не читает.
     *
     * Pawn: `CBasePlayer::m_iChaseTarget`
     */
    get chaseTarget(): number;
    set chaseTarget(value: number);
    /**
     * Переключатель камеры игрока: обнуляется при появлении, игра его не читает.
     *
     * Pawn: `CBasePlayer::m_fCamSwitch`
     */
    get camSwitch(): number;
    set camSwitch(value: number);
    /**
     * `true`, если игрок сбежал (на карте побега) или, будучи VIP, спасся.
     *
     * Pawn: `CBasePlayer::m_bEscaped`
     */
    get escaped(): boolean;
    set escaped(value: boolean);
    /**
     * `true`, если игрок — VIP на карте as_.
     *
     * Pawn: `CBasePlayer::m_bIsVIP`
     */
    get isVip(): boolean;
    set isVip(value: boolean);
    /**
     * Игровое время, когда позиция игрока снова уйдёт на радар союзников; раз в секунду.
     *
     * Pawn: `CBasePlayer::m_tmNextRadarUpdate`
     */
    get nextRadarUpdate(): number;
    set nextRadarUpdate(value: number);
    /**
     * Позиция игрока при последнем обновлении радара союзников.
     *
     * Pawn: `CBasePlayer::m_vLastOrigin`
     */
    get lastOrigin(): Vector;
    set lastOrigin(value: number[]);
    /**
     * `userid` игрока, за кик которого проголосовал этот (команда `vote`); `0` — ни за кого.
     *
     * Pawn: `CBasePlayer::m_iCurrentKickVote`
     */
    get currentKickVote(): number;
    set currentKickVote(value: number);
    /**
     * Игровое время, когда игрок снова сможет голосовать, — через 3 секунды после прошлого голоса.
     *
     * Pawn: `CBasePlayer::m_flNextVoteTime`
     */
    get nextVoteTime(): number;
    set nextVoteTime(value: number);
    /**
     * `true`, если игрок убил союзника; при `mp_tkpunish` его накажут в начале следующего раунда.
     *
     * Pawn: `CBasePlayer::m_bJustKilledTeammate`
     */
    get justKilledTeammate(): boolean;
    set justKilledTeammate(value: boolean);
    /**
     * Число заложников, убитых игроком; сверх `mp_hostagepenalty` игра его выгоняет.
     *
     * Pawn: `CBasePlayer::m_iHostagesKilled`
     */
    get hostagesKilled(): number;
    set hostagesKilled(value: number);
    /**
     * Номер карты, за которую игрок проголосовал через `votemap`; `0` — ни за какую.
     *
     * Pawn: `CBasePlayer::m_iMapVote`
     */
    get mapVote(): number;
    set mapVote(value: number);
    /**
     * `false`, пока игроку нельзя стрелять; когда кончается заморозка, игра ставит `true`.
     *
     * Pawn: `CBasePlayer::m_bCanShoot`
     */
    get canShoot(): boolean;
    set canShoot(value: boolean);
    /**
     * Игровое время последнего выстрела игрока — для анимаций шагов и стрельбы.
     *
     * Pawn: `CBasePlayer::m_flLastFired`
     */
    get lastFired(): number;
    set lastFired(value: number);
    /**
     * Игровое время, когда игрок последний раз ранил союзника; сообщение об атаке союзника ждёт 0.6 секунды от него.
     *
     * Pawn: `CBasePlayer::m_flLastAttackedTeammate`
     */
    get lastAttackedTeammate(): number;
    set lastAttackedTeammate(value: number);
    /**
     * `true`, если игрока убили в голову.
     *
     * Pawn: `CBasePlayer::m_bHeadshotKilled`
     */
    get headshotKilled(): boolean;
    set headshotKilled(value: boolean);
    /**
     * `true`, если игрок наказан за убийство союзника в этом раунде.
     *
     * Pawn: `CBasePlayer::m_bPunishedForTK`
     */
    get punishedForTeamKill(): boolean;
    set punishedForTeamKill(value: boolean);
    /**
     * `true`, если игрок не получит бонус в следующем раунде: так игра отмечает живых игроков команды, у которой истекло время раунда.
     *
     * Pawn: `CBasePlayer::m_bReceivesNoMoneyNextRound`
     */
    get receivesNoMoneyNextRound(): boolean;
    set receivesNoMoneyNextRound(value: boolean);
    /**
     * Игровое время в целых секундах, когда команда timeleft снова ответит игроку.
     *
     * Pawn: `CBasePlayer::m_iTimeCheckAllowed`
     */
    get timeCheckAllowed(): number;
    set timeCheckAllowed(value: number);
    /**
     * `true`, если игрок сменил имя, будучи мёртвым; новое имя применится при следующем появлении.
     *
     * Pawn: `CBasePlayer::m_bHasChangedName`
     */
    get hasChangedName(): boolean;
    set hasChangedName(value: boolean);
    /**
     * Имя, которое игрок получит при следующем возрождении: имя, сменённое мёртвым, ждёт здесь.
     *
     * Pawn: `CBasePlayer::m_szNewName`
     */
    get newName(): string;
    set newName(value: string);
    /**
     * `true`, пока игрок обезвреживает бомбу.
     *
     * Pawn: `CBasePlayer::m_bIsDefusing`
     */
    get isDefusing(): boolean;
    set isDefusing(value: boolean);
    /**
     * Игровое время следующей проверки зон игрока (зона закупки, точка бомбы, зона спасения); раз в полсекунды.
     *
     * Pawn: `CBasePlayer::m_tmHandleSignals`
     */
    get handleSignals(): number;
    set handleSignals(value: number);
    /**
     * Точка закладки бомбы, в которой стоит игрок, или `0`.
     *
     * Pawn: `CBasePlayer::m_pentCurBombTarget`
     */
    get curBombTarget(): number;
    set curBombTarget(value: number);
    /**
     * Место игрока в списке звуков, которые слышат монстры (заложники).
     *
     * Pawn: `CBasePlayer::m_iPlayerSound`
     */
    get playerSound(): number;
    set playerSound(value: number);
    /**
     * Громкость игрока для монстров в этом кадре — громче из шагов и оружия.
     *
     * Pawn: `CBasePlayer::m_iTargetVolume`
     */
    get targetVolume(): number;
    set targetVolume(value: number);
    /**
     * Громкость последнего выстрела игрока для монстров; затихает сама.
     *
     * Pawn: `CBasePlayer::m_iWeaponVolume`
     */
    get weaponVolume(): number;
    set weaponVolume(value: number);
    /**
     * Дополнительные виды звука, которые игрок издаёт для монстров до `stopExtraSoundTime`.
     *
     * Pawn: `CBasePlayer::m_iExtraSoundTypes`
     */
    get extraSoundTypes(): number;
    set extraSoundTypes(value: number);
    /**
     * Яркость последней вспышки выстрела игрока — добавляется к его заметности; гаснет сама.
     *
     * Pawn: `CBasePlayer::m_iWeaponFlash`
     */
    get weaponFlash(): number;
    set weaponFlash(value: number);
    /**
     * Игровое время, когда `extraSoundTypes` игрока сбросится.
     *
     * Pawn: `CBasePlayer::m_flStopExtraSoundTime`
     */
    get stopExtraSoundTime(): number;
    set stopExtraSoundTime(value: number);
    /**
     * Игровое время, когда батарея фонарика игрока в следующий раз разрядится (включён) или зарядится (выключен) на единицу.
     *
     * Pawn: `CBasePlayer::m_flFlashLightTime`
     */
    get flashlightTime(): number;
    set flashlightTime(value: number);
    /**
     * Заряд фонарика игрока, от `0` до `100`.
     *
     * Pawn: `CBasePlayer::m_iFlashBattery`
     */
    get flashlightBattery(): number;
    set flashlightBattery(value: number);
    /**
     * Кнопки, которые игрок держал в прошлом кадре: `["Jump"]`.
     *
     * Pawn: `CBasePlayer::m_afButtonLast`
     */
    get buttonLast(): Button[];
    set buttonLast(values: Button[]);
    /**
     * Кнопки, которые игрок нажал в этом кадре: `["Jump"]`.
     *
     * Pawn: `CBasePlayer::m_afButtonPressed`
     */
    get buttonPressed(): Button[];
    set buttonPressed(values: Button[]);
    /**
     * Кнопки, которые игрок отпустил в этом кадре: `["Jump"]`.
     *
     * Pawn: `CBasePlayer::m_afButtonReleased`
     */
    get buttonReleased(): Button[];
    set buttonReleased(values: Button[]);
    /**
     * Звуковая область (`env_sound`), чей эффект помещения сейчас действует на игрока.
     *
     * Pawn: `CBasePlayer::m_pentSndLast`
     */
    get lastSoundEntity(): number;
    set lastSoundEntity(value: number);
    /**
     * Эффект помещения (эхо) звуковой области игрока, `0` — нет.
     *
     * Pawn: `CBasePlayer::m_flSndRoomtype`
     */
    get roomType(): number;
    set roomType(value: number);
    /**
     * Расстояние от игрока до его звуковой области.
     *
     * Pawn: `CBasePlayer::m_flSndRange`
     */
    get soundRange(): number;
    set soundRange(value: number);
    /**
     * Флаг игрока «есть новые патроны для отправки» из Half-Life. В CS не используется.
     *
     * Pawn: `CBasePlayer::m_fNewAmmo`
     */
    get newAmmo(): number;
    set newAmmo(value: number);
    /**
     * Физическое состояние игрока, список, любые из: `"OnLadder"` — на лестнице, `"OnTrain"` — на поезде, `"OnBarnacle"` — схвачен барнаклом, `"Ducking"` — приседает прямо сейчас, `"Using"` — держит клавишу использования на объекте, `"Observer"` — закреплённый наблюдатель.
     *
     * Pawn: `CBasePlayer::m_afPhysicsFlags`, `PFLAG_*`
     */
    get physicsFlags(): PhysicsFlag[];
    set physicsFlags(values: PhysicsFlag[]);
    /**
     * Игровое время, когда команда kill снова сработает для игрока, — через секунду после прошлой.
     *
     * Pawn: `CBasePlayer::m_fNextSuicideTime`
     */
    get nextSuicideTime(): number;
    set nextSuicideTime(value: number);
    /**
     * Таймер покоя игрока из Half-Life; CS держит его у оружия (`nextIdle` у Weapon), а этот не использует.
     *
     * Pawn: `CBasePlayer::m_flTimeWeaponIdle`
     */
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /**
     * Таймер прыжка от стены у игрока из Half-Life. В CS не используется.
     *
     * Pawn: `CBasePlayer::m_flWallJumpTime`
     */
    get wallJumpTime(): number;
    set wallJumpTime(value: number);
    /**
     * Игровое время следующей фразы костюма HEV (Half-Life); `0` — нет.
     *
     * Pawn: `CBasePlayer::m_flSuitUpdate`
     */
    get suitUpdate(): number;
    set suitUpdate(value: number);
    /**
     * Следующее место в очереди фраз костюма HEV (Half-Life).
     *
     * Pawn: `CBasePlayer::m_iSuitPlayNext`
     */
    get suitPlayNext(): number;
    set suitPlayNext(value: number);
    /**
     * Урон, который игрок получил последним попаданием.
     *
     * Pawn: `CBasePlayer::m_lastDamageAmount`
     */
    get lastDamageAmount(): number;
    set lastDamageAmount(value: number);
    /**
     * Игровое время, когда к игроку последний раз применялся урон во времени (яд, огонь, восстановление после утопления).
     *
     * Pawn: `CBasePlayer::m_tbdPrev`
     */
    get timeBasedDamagePrev(): number;
    set timeBasedDamagePrev(value: number);
    /**
     * Расстояние до ближайшей радиации — для счётчика Гейгера из Half-Life.
     *
     * Pawn: `CBasePlayer::m_flgeigerRange`
     */
    get geigerRange(): number;
    set geigerRange(value: number);
    /**
     * Игровое время следующего обновления счётчика Гейгера (Half-Life).
     *
     * Pawn: `CBasePlayer::m_flgeigerDelay`
     */
    get geigerDelay(): number;
    set geigerDelay(value: number);
    /**
     * Показание счётчика Гейгера, последним отправленное клиенту (Half-Life).
     *
     * Pawn: `CBasePlayer::m_igeigerRangePrev`
     */
    get geigerRangePrev(): number;
    set geigerRangePrev(value: number);
    /**
     * Имя текстуры, на которой игрок стоял последней; по ней звучат его шаги.
     *
     * Pawn: `CBasePlayer::m_szTextureName`
     */
    get textureName(): string;
    set textureName(value: string);
    /**
     * Тип текстуры под игроком — для звука шагов. В CS не используется.
     *
     * Pawn: `CBasePlayer::m_chTextureType`
     */
    get textureType(): number;
    set textureType(value: number);
    /**
     * Здоровье, которое отняло у игрока утопление; вернётся, когда игрок вынырнет.
     *
     * Pawn: `CBasePlayer::m_idrowndmg`
     */
    get drownDamage(): number;
    set drownDamage(value: number);
    /**
     * Часть урона от утопления, уже возвращённая игроку.
     *
     * Pawn: `CBasePlayer::m_idrownrestored`
     */
    get drownRestored(): number;
    set drownRestored(value: number);
    /**
     * Виды урона, последними показанные на HUD игрока, битами; `-1` — игра отправит их заново.
     *
     * Pawn: `CBasePlayer::m_bitsHUDDamage`, `DMG_*`
     */
    get hudDamage(): number;
    set hudDamage(value: number);
    /**
     * `true`, когда HUD игрока нужно сбросить при следующем обновлении (после появления).
     *
     * Pawn: `CBasePlayer::m_fInitHUD`
     */
    get initHud(): boolean;
    set initHud(value: boolean);
    /**
     * `true`, когда HUD игрока настроен с момента подключения.
     *
     * Pawn: `CBasePlayer::m_fGameHUDInitialized`
     */
    get gameHudInitialized(): boolean;
    set gameHudInitialized(value: boolean);
    /**
     * Управление поездом на HUD игрока: `0` — нет, от `1` до `5` — положение рычага, плюс биты «изменилось» и «активно».
     *
     * Pawn: `CBasePlayer::m_iTrain`, `TRAIN_*`
     */
    get trainControls(): number;
    set trainControls(value: number);
    /**
     * `false`, когда список оружия игрока нужно отправить заново.
     *
     * Pawn: `CBasePlayer::m_fWeapon`
     */
    get weaponHudValid(): boolean;
    set weaponHudValid(value: boolean);
    /**
     * Стационарное оружие (`func_tank`), которым пользуется игрок.
     *
     * Pawn: `CBasePlayer::m_pTank`
     */
    get mountedGun(): number;
    set mountedGun(value: number);
    /**
     * Игровое время смерти игрока.
     *
     * Pawn: `CBasePlayer::m_fDeadTime`
     */
    get deadTime(): number;
    set deadTime(value: number);
    /**
     * `true`, если монстры не слышат игрока.
     *
     * Pawn: `CBasePlayer::m_fNoPlayerSound`
     */
    get noPlayerSound(): boolean;
    set noPlayerSound(value: boolean);
    /**
     * `true`, если у игрока есть модуль длинного прыжка из Half-Life.
     *
     * Pawn: `CBasePlayer::m_fLongJump`
     */
    get hasLongJump(): boolean;
    set hasLongJump(value: boolean);
    /**
     * Игровое время, с которого игрок считается крадущимся (Half-Life).
     *
     * Pawn: `CBasePlayer::m_tSneaking`
     */
    get sneakingUntil(): number;
    set sneakingUntil(value: number);
    /**
     * Счётчик обновления игрока: ставится в `5` при сбросе, игра его не читает.
     *
     * Pawn: `CBasePlayer::m_iUpdateTime`
     */
    get updateTime(): number;
    set updateTime(value: number);
    /**
     * Здоровье, последним отправленное в HUD игрока; если оно отличается от настоящего, игра отправит новое.
     *
     * Pawn: `CBasePlayer::m_iClientHealth`
     */
    get healthSent(): number;
    set healthSent(value: number);
    /**
     * Броня, последней отправленная в HUD игрока; `-1` — игра отправит её заново.
     *
     * Pawn: `CBasePlayer::m_iClientBattery`
     */
    get batterySent(): number;
    set batterySent(value: number);
    /**
     * Скрытые части HUD игрока: `["Money", "Timer"]`; изменение игра отправляет сама.
     *
     * Pawn: `CBasePlayer::m_iHideHUD`
     */
    get hideHud(): HideHud[];
    set hideHud(values: HideHud[]);
    /**
     * Скрытые части HUD, последними отправленные игроку; если они отличаются от `hideHud`, игра отправит `hideHud`.
     *
     * Pawn: `CBasePlayer::m_iClientHideHUD`
     */
    get hideHudSent(): HideHud[];
    set hideHudSent(values: HideHud[]);
    /**
     * Поле зрения игрока в градусах: `90` — обычное, `40` и `10` — в снайперский прицел. Запись расширяет или сужает обзор — `110` показывает больше, — пока игра не поставит своё: при появлении, когда он достаёт оружие, когда приближает прицел.
     *
     * Pawn: `CBasePlayer::m_iFOV`
     */
    get fov(): number;
    set fov(value: number);
    /**
     * Поле зрения, последним отправленное игроку; если своя копия игры отличается, игра отправит её.
     *
     * Pawn: `CBasePlayer::m_iClientFOV`
     */
    get fovSent(): number;
    set fovSent(value: number);
    /**
     * Число появлений игрока в этом раунде; без `mp_forcerespawn` второй раз его не пустят.
     *
     * Pawn: `CBasePlayer::m_iNumSpawns`
     */
    get spawnCount(): number;
    set spawnCount(value: number);
    /**
     * Сущность наблюдателя, привязанная к игроку; игра её не создаёт и только удаляет, когда игрок отключается.
     *
     * Pawn: `CBasePlayer::m_pObserver`
     */
    get observer(): number;
    set observer(value: number);
    /**
     * Оружие в руках игрока или `null`. Только чтение.
     *
     * Pawn: `CBasePlayer::m_pActiveItem`
     */
    get activeItem(): Weapon | null;
    /**
     * Оружие, которое, по последнему сообщению клиенту игрока, у него в руках. Только чтение.
     *
     * Pawn: `CBasePlayer::m_pClientActiveItem`
     */
    get activeItemSent(): Weapon | null;
    /**
     * Оружие, которое игрок держал до текущего, — на него переключает lastinv. Только чтение.
     *
     * Pawn: `CBasePlayer::m_pLastItem`
     */
    get lastItem(): Weapon | null;
    /**
     * Поправка автоприцела игрока, в градусах.
     *
     * Pawn: `CBasePlayer::m_vecAutoAim`
     */
    get autoAim(): Vector;
    set autoAim(value: number[]);
    /**
     * `true`, пока у автоприцела игрока есть цель под прицелом.
     *
     * Pawn: `CBasePlayer::m_fOnTarget`
     */
    get aimingAtTarget(): boolean;
    set aimingAtTarget(value: boolean);
    /**
     * Игровое время следующего обновления строки статуса игрока (имя под прицелом); раз в 0.2 секунды.
     *
     * Pawn: `CBasePlayer::m_flNextSBarUpdateTime`
     */
    get nextStatusBarUpdate(): number;
    set nextStatusBarUpdate(value: number);
    /**
     * Игровое время, до которого держится строка статуса об игроке под прицелом, — 2 секунды после того, как он ушёл из прицела.
     *
     * Pawn: `CBasePlayer::m_flStatusBarDisappearDelay`
     */
    get statusBarDisappearDelay(): number;
    set statusBarDisappearDelay(value: number);
    /**
     * Текст строки состояния, который игра последним отправила игроку, — строка о том, в кого он целится, в виде формата, который заполняет его клиент.
     *
     * Pawn: `CBasePlayer::m_SbarString0`
     */
    get statusBarText(): string;
    set statusBarText(value: string);
    /**
     * Горизонтальная поправка автоприцела, последней отправленная клиенту игрока.
     *
     * Pawn: `CBasePlayer::m_lastx`
     */
    get lastX(): number;
    set lastX(value: number);
    /**
     * Вертикальная поправка автоприцела, последней отправленная клиенту игрока.
     *
     * Pawn: `CBasePlayer::m_lasty`
     */
    get lastY(): number;
    set lastY(value: number);
    /**
     * Число кадров в собственном спрей-логотипе игрока; `-1` — логотипа нет.
     *
     * Pawn: `CBasePlayer::m_nCustomSprayFrames`
     */
    get customSprayFrames(): number;
    set customSprayFrames(value: number);
    /**
     * Игровое время, когда игрок снова сможет нанести спрей (decalfrequency).
     *
     * Pawn: `CBasePlayer::m_flNextDecalTime`
     */
    get nextDecalTime(): number;
    set nextDecalTime(value: number);
    /**
     * Номер собственной модели игрока; игра возвращает к нему `modelIndex`, например при появлении.
     *
     * Pawn: `CBasePlayer::m_modelIndexPlayer`
     */
    get modelIndexPlayer(): number;
    set modelIndexPlayer(value: number);
    /**
     * Набор анимаций, с которым модель игрока держит оружие, например `"knife"`, `"rifle"`, `"c4"`.
     *
     * Pawn: `CBasePlayer::m_szAnimExtention`
     */
    get animExtension(): string;
    set animExtension(value: string);
    /**
     * Анимация ног, которую игра выбрала игроку в этом кадре.
     *
     * Pawn: `CBasePlayer::m_iGaitsequence`
     */
    get playerGaitSequence(): number;
    set playerGaitSequence(value: number);
    /**
     * Позиция в анимации ног игрока, в кадрах.
     *
     * Pawn: `CBasePlayer::m_flGaitframe`
     */
    get gaitFrame(): number;
    set gaitFrame(value: number);
    /**
     * Направление ног игрока, в градусах; догоняет направление тела.
     *
     * Pawn: `CBasePlayer::m_flGaityaw`
     */
    get gaitYaw(): number;
    set gaitYaw(value: number);
    /**
     * Позиция игрока при прошлом обновлении анимации — чтобы оценить его скорость.
     *
     * Pawn: `CBasePlayer::m_prevgaitorigin`
     */
    get prevGaitOrigin(): Vector;
    set prevGaitOrigin(value: number[]);
    /**
     * Наклон верхней части тела, который игра вычислила для модели игрока.
     *
     * Pawn: `CBasePlayer::m_flPitch`
     */
    get pitch(): number;
    set pitch(value: number);
    /**
     * Поворот верхней части тела игрока относительно ног, в градусах.
     *
     * Pawn: `CBasePlayer::m_flYaw`
     */
    get yaw(): number;
    set yaw(value: number);
    /**
     * Расстояние, на которое игрок сдвинулся с прошлого обновления анимации, — для анимации ног.
     *
     * Pawn: `CBasePlayer::m_flGaitMovement`
     */
    get gaitMovement(): number;
    set gaitMovement(value: number);
    /**
     * Настройка `_cl_autowepswitch` игрока: `0` — не переключаться на подобранное оружие, `1` — всегда, `2` — если не стреляет.
     *
     * Pawn: `CBasePlayer::m_iAutoWepSwitch`
     */
    get autoSwitchWeapon(): number;
    set autoSwitchWeapon(value: number);
    /**
     * `true`, если игрок пользуется графическими (VGUI) меню, — его настройка `_vgui_menus`.
     *
     * Pawn: `CBasePlayer::m_bVGUIMenus`
     */
    get vguiMenus(): boolean;
    set vguiMenus(value: boolean);
    /**
     * `true`, если игрок хочет подсказки, — его настройка _ah.
     *
     * Pawn: `CBasePlayer::m_bShowHints`
     */
    get showHints(): boolean;
    set showHints(value: boolean);
    /**
     * `true`, пока игрок держит щит поднятым.
     *
     * Pawn: `CBasePlayer::m_bShieldDrawn`
     */
    get shieldDrawn(): boolean;
    set shieldDrawn(value: boolean);
    /**
     * `true`, если у игрока есть тактический щит.
     *
     * Pawn: `CBasePlayer::m_bOwnsShield`
     */
    get ownsShield(): boolean;
    set ownsShield(value: boolean);
    /**
     * `true`, если зритель следил за игроком, прежде чем перешёл в свободный полёт.
     *
     * Pawn: `CBasePlayer::m_bWasFollowing`
     */
    get wasFollowing(): boolean;
    set wasFollowing(value: boolean);
    /**
     * Игровое время, когда зритель снова сможет переключиться на следующего игрока.
     *
     * Pawn: `CBasePlayer::m_flNextFollowTime`
     */
    get nextFollowTime(): number;
    set nextFollowTime(value: number);
    /**
     * Скорость, с которой ноги игрока поворачивают за телом, — для его анимации.
     *
     * Pawn: `CBasePlayer::m_flYawModifier`
     */
    get yawModifier(): number;
    set yawModifier(value: number);
    /**
     * Игровое время, когда кончится ослепление игрока флешкой. Запись не ослепляет экран — это делает `player.screen.fade`.
     *
     * Pawn: `CBasePlayer::m_blindUntilTime`
     */
    get blindUntilTime(): number;
    set blindUntilTime(value: number);
    /**
     * Игровое время, когда игрока ослепило.
     *
     * Pawn: `CBasePlayer::m_blindStartTime`
     */
    get blindStartTime(): number;
    set blindStartTime(value: number);
    /**
     * Время, которое ослепление игрока держится полным, в секундах.
     *
     * Pawn: `CBasePlayer::m_blindHoldTime`
     */
    get blindHoldTime(): number;
    set blindHoldTime(value: number);
    /**
     * Время, за которое ослепление игрока проходит, в секундах.
     *
     * Pawn: `CBasePlayer::m_blindFadeTime`
     */
    get blindFadeTime(): number;
    set blindFadeTime(value: number);
    /**
     * Сила ослепления игрока, от `0` до `255`; `255` — полностью слеп.
     *
     * Pawn: `CBasePlayer::m_blindAlpha`
     */
    get blindAlpha(): number;
    set blindAlpha(value: number);
    /**
     * Игровое время, с которого бот может сам пойти за союзниками.
     *
     * Pawn: `CBasePlayer::m_allowAutoFollowTime`
     */
    get allowAutoFollowTime(): number;
    set allowAutoFollowTime(value: number);
    /**
     * Список автозакупки игрока: предметы, которые его клиент прислал для `autobuy`.
     *
     * Pawn: `CBasePlayer::m_autoBuyString`
     */
    get autoBuyString(): string;
    set autoBuyString(value: string);
    /**
     * Список повторной закупки игрока: предметы, которые его клиент прислал для `rebuy`.
     *
     * Pawn: `CBasePlayer::m_rebuyString`
     */
    get rebuyString(): string;
    set rebuyString(value: string);
    /**
     * `true`, пока команда rebuy закупает прошлое снаряжение игрока.
     *
     * Pawn: `CBasePlayer::m_bIsInRebuy`
     */
    get isInRebuy(): boolean;
    set isInRebuy(value: boolean);
    /**
     * Игровое время последнего обновления названия места игрока на карте.
     *
     * Pawn: `CBasePlayer::m_flLastUpdateTime`
     */
    get lastUpdateTime(): number;
    set lastUpdateTime(value: number);
    /**
     * Название места на карте, где игрок был последним, — его называют радио и командный чат, например `"BombsiteA"`.
     *
     * Pawn: `CBasePlayer::m_lastLocation`
     */
    get lastLocation(): string;
    set lastLocation(value: string);
    /**
     * Игровое время начала полосы прогресса игрока (разминирование, закладка); `0` — нет.
     *
     * Pawn: `CBasePlayer::m_progressStart`
     */
    get progressBarStart(): number;
    set progressBarStart(value: number);
    /**
     * Игровое время, когда полоса прогресса игрока заполнится.
     *
     * Pawn: `CBasePlayer::m_progressEnd`
     */
    get progressBarEnd(): number;
    set progressBarEnd(value: number);
    /**
     * `true`, если камера зрителя следует за взглядом цели, а не вращается свободно.
     *
     * Pawn: `CBasePlayer::m_bObserverAutoDirector`
     */
    get observerAutoDirector(): boolean;
    set observerAutoDirector(value: boolean);
    /**
     * `true`, если зритель может менять режим обзора; сразу после смерти — `false`.
     *
     * Pawn: `CBasePlayer::m_canSwitchObserverModes`
     */
    get canSwitchObserverModes(): boolean;
    set canSwitchObserverModes(value: boolean);
    /**
     * Остаток Condition Zero; игра его не использует.
     *
     * Pawn: `CBasePlayer::m_heartBeatTime`
     */
    get heartBeatTime(): number;
    set heartBeatTime(value: number);
    /**
     * Остаток Condition Zero; игра его не использует.
     *
     * Pawn: `CBasePlayer::m_intenseTimestamp`
     */
    get intenseTimestamp(): number;
    set intenseTimestamp(value: number);
    /**
     * Остаток Condition Zero; игра его не использует.
     *
     * Pawn: `CBasePlayer::m_silentTimestamp`
     */
    get silentTimestamp(): number;
    set silentTimestamp(value: number);
    /**
     * Остаток Condition Zero, одно из: `"silent"`, `"calm"`, `"intense"`; игра его не использует.
     *
     * Pawn: `CBasePlayer::m_musicState`
     */
    get musicState(): MusicState;
    set musicState(value: MusicState);
    /**
     * Деньги игрока, последними отправленные в таблицы счёта других игроков.
     *
     * Pawn: `CBasePlayer::m_iLastAccount`
     */
    get lastSentMoney(): number;
    set lastSentMoney(value: number);
    /**
     * Здоровье игрока, последним отправленное в таблицы счёта других игроков.
     *
     * Pawn: `CBasePlayer::m_iLastClientHealth`
     */
    get lastClientHealth(): number;
    set lastClientHealth(value: number);
    /**
     * Игровое время, когда деньги и здоровье игрока снова уйдут в таблицы счёта, даже без изменений; раз в 5 секунд.
     *
     * Pawn: `CBasePlayer::m_tmNextAccountHealthUpdate`
     */
    get nextScoreboardUpdate(): number;
    set nextScoreboardUpdate(value: number);
    /**
     * Режим наблюдения игрока, одно из: `"none"` — не наблюдает; `"chaseLocked"` — камера за целью, поворачивается вместе с ней; `"chaseFree"` — камера за целью, поворачивается свободно; `"roaming"` — свободный полёт; `"inEye"` — от первого лица, глазами цели; `"mapFree"` — карта, свободно; `"mapChase"` — карта за целью. Запись режима переключает камеру так же, как игра, когда он выбирает режим сам: на того, за кем ему можно наблюдать, или `"roaming"`, если наблюдать не за кем; цель — iuser2. Запись `"none"` только очищает поле: наблюдение заканчивает игра, когда он появляется.
     *
     * Pawn: `pev->iuser1`, `OBS_*`, `rg_set_observer_mode`
     */
    get observerMode(): ObserverMode;
    set observerMode(value: ObserverMode);
    /**
     * Добавляет очки к счёту игрока, как убийство; `allowNegative` позволяет счёту уйти ниже `0`.
     *
     * Pawn: `ExecuteHamB(Ham_AddPoints, ...)`, `ExecuteHam`
     */
    addFrags(points: number, allowNegative: boolean, options?: ActionOptions): void;
    /**
     * Добавляет очки к счёту команды игрока, как игра за выполнение задачи.
     *
     * Pawn: `ExecuteHamB(Ham_AddPointsToTeam, ...)`, `ExecuteHam`
     */
    addTeamScore(points: number, allowNegative: boolean, options?: ActionOptions): void;
    /**
     * Кладёт оружие-сущность в инвентарь игрока; `true` — положено. Чтобы выдать оружие по имени — `player.give`.
     *
     * Pawn: `ExecuteHamB(Ham_AddPlayerItem, ...)`, `ExecuteHam`
     */
    addItem(item: Weapon, options?: ActionOptions): bool;
    /**
     * Убирает оружие-сущность из инвентаря игрока, не удаляя саму сущность; `true` — оно там было.
     *
     * Pawn: `ExecuteHamB(Ham_RemovePlayerItem, ...)`, `ExecuteHam`
     */
    removeItem(item: Weapon, options?: ActionOptions): bool;
    /**
     * Даёт игроку патроны по имени вида у игры, например `"buckshot"`, не больше `max`; возвращает индекс патронов, `-1` — не дано.
     *
     * Pawn: `ExecuteHamB(Ham_GiveAmmo, ...)`, `ExecuteHam`
     */
    giveAmmo(amount: number, name: string, max: number, options?: ActionOptions): number;
    /**
     * Выполняет прыжок игрока, как когда он нажимает прыжок.
     *
     * Pawn: `ExecuteHamB(Ham_Player_Jump, ...)`, `ExecuteHam`
     */
    jump(options?: ActionOptions): void;
    /**
     * Выполняет приседание игрока, как когда он держит присед.
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
     * `true` во время заморозки в начале раунда, пока игроки не могут ни двигаться, ни стрелять. Запись `false` заканчивает её для собственных проверок игры.
     *
     * Pawn: `CSGameRules::m_bFreezePeriod`
     */
    get isFreezeTime(): boolean;
    set isFreezeTime(value: boolean);
    /**
     * `true`, пока бомба лежит на земле, брошенная тем, кто её нёс.
     *
     * Pawn: `CSGameRules::m_bBombDropped`
     */
    get bombDropped(): boolean;
    set bombDropped(value: boolean);
    /**
     * Название игры в браузере серверов, например `"Counter-Strike"`.
     *
     * Pawn: `CSGameRules::m_GameDesc`
     */
    get gameName(): string;
    set gameName(value: string);
    /**
     * Число мест для игроков, как их считает голосовой код игры.
     *
     * Pawn: `CSGameRules::m_nMaxPlayers`
     */
    get maxPlayers(): number;
    set maxPlayers(value: number);
    /**
     * Секунды между обновлениями игры о том, кто кого слышит в голосовом чате.
     *
     * Pawn: `CSGameRules::m_UpdateInterval`
     */
    get updateInterval(): number;
    set updateInterval(value: number);
    /**
     * Игровое время, когда начнётся следующий раунд после конца раунда или рестарта; `0`, если ничего не ожидается.
     *
     * Pawn: `CSGameRules::m_flRestartRoundTime`
     */
    get newRoundTime(): number;
    set newRoundTime(value: number);
    /**
     * Игровое время следующей проверки игрой, не победила ли сторона; `0`, если проверка не ожидается.
     *
     * Pawn: `CSGameRules::m_flCheckWinConditions`
     */
    get checkWinConditionsTime(): number;
    set checkWinConditionsTime(value: number);
    /**
     * Игровое время, когда началась игра в раунде: конец заморозки.
     *
     * Pawn: `CSGameRules::m_fRoundStartTime`
     */
    get roundStartTime(): number;
    set roundStartTime(value: number);
    /**
     * Длина раунда в секундах; во время заморозки — длина заморозки.
     *
     * Pawn: `CSGameRules::m_iRoundTime`
     */
    get roundTime(): number;
    set roundTime(value: number);
    /**
     * Длина раунда в секундах, из `mp_roundtime`.
     *
     * Pawn: `CSGameRules::m_iRoundTimeSecs`
     */
    get roundTimeSecs(): number;
    set roundTimeSecs(value: number);
    /**
     * Длина заморозки в секундах, из `mp_freezetime`.
     *
     * Pawn: `CSGameRules::m_iIntroRoundTime`
     */
    get freezeTime(): number;
    set freezeTime(value: number);
    /**
     * Игровое время, когда начался раунд, вместе с заморозкой.
     *
     * Pawn: `CSGameRules::m_fRoundStartTimeReal`
     */
    get freezeStartTime(): number;
    set freezeStartTime(value: number);
    /**
     * Деньги, которые каждый террорист получит в начале следующего раунда за то, как прошёл этот.
     *
     * Pawn: `CSGameRules::m_iAccountTerrorist`
     */
    get terroristRoundBonus(): number;
    set terroristRoundBonus(value: number);
    /**
     * Деньги, которые каждый спецназовец получит в начале следующего раунда за то, как прошёл этот.
     *
     * Pawn: `CSGameRules::m_iAccountCT`
     */
    get ctRoundBonus(): number;
    set ctRoundBonus(value: number);
    /**
     * Число террористов, посчитанное в конце раунда.
     *
     * Pawn: `CSGameRules::m_iNumTerrorist`
     */
    get terroristCount(): number;
    set terroristCount(value: number);
    /**
     * Число спецназовцев, посчитанное в конце раунда.
     *
     * Pawn: `CSGameRules::m_iNumCT`
     */
    get ctCount(): number;
    set ctCount(value: number);
    /**
     * Число террористов, которые могут появиться в следующем раунде, посчитанное в конце раунда.
     *
     * Pawn: `CSGameRules::m_iNumSpawnableTerrorist`
     */
    get spawnableTerrorists(): number;
    set spawnableTerrorists(value: number);
    /**
     * Число спецназовцев, которые могут появиться в следующем раунде, посчитанное в конце раунда.
     *
     * Pawn: `CSGameRules::m_iNumSpawnableCT`
     */
    get spawnableCts(): number;
    set spawnableCts(value: number);
    /**
     * Число точек появления террористов на карте.
     *
     * Pawn: `CSGameRules::m_iSpawnPointCount_Terrorist`
     */
    get spawnPointCountTerrorist(): number;
    set spawnPointCountTerrorist(value: number);
    /**
     * Число точек появления спецназовцев на карте.
     *
     * Pawn: `CSGameRules::m_iSpawnPointCount_CT`
     */
    get spawnPointCountCt(): number;
    set spawnPointCountCt(value: number);
    /**
     * Число заложников, спасённых в этом раунде.
     *
     * Pawn: `CSGameRules::m_iHostagesRescued`
     */
    get hostagesRescued(): number;
    set hostagesRescued(value: number);
    /**
     * Число заложников, которых спецназовец повёл за собой в этом раунде.
     *
     * Pawn: `CSGameRules::m_iHostagesTouched`
     */
    get hostagesTouched(): number;
    set hostagesTouched(value: number);
    /**
     * Победитель последнего раунда, одно из `"CT"`, `"TERRORIST"`, `"draw"` или `"none"`, пока раунд идёт.
     *
     * Pawn: `CSGameRules::m_iRoundWinStatus`
     */
    get roundWinner(): RoundWinner;
    set roundWinner(value: RoundWinner);
    /**
     * Счёт спецназовцев: выигранные ими раунды. Запись меняет счёт, и таблица сразу его показывает.
     *
     * Pawn: `CSGameRules::m_iNumCTWins`, `rg_update_teamscores`
     */
    get ctWins(): number;
    set ctWins(value: number);
    /**
     * Счёт террористов: выигранные ими раунды. Запись меняет счёт, и таблица сразу его показывает.
     *
     * Pawn: `CSGameRules::m_iNumTerroristWins`, `rg_update_teamscores`
     */
    get terroristWins(): number;
    set terroristWins(value: number);
    /**
     * `true`, когда бомба в этом раунде взорвала цель.
     *
     * Pawn: `CSGameRules::m_bTargetBombed`
     */
    get targetBombed(): boolean;
    set targetBombed(value: boolean);
    /**
     * `true`, когда бомбу в этом раунде обезвредили.
     *
     * Pawn: `CSGameRules::m_bBombDefused`
     */
    get bombDefused(): boolean;
    set bombDefused(value: boolean);
    /**
     * `true`, если на карте есть место для закладки бомбы.
     *
     * Pawn: `CSGameRules::m_bMapHasBombTarget`
     */
    get mapHasBombTarget(): boolean;
    set mapHasBombTarget(value: boolean);
    /**
     * `true`, если на карте есть зона, в которой надо стоять, чтобы заложить бомбу.
     *
     * Pawn: `CSGameRules::m_bMapHasBombZone`
     */
    get mapHasBombZone(): boolean;
    set mapHasBombZone(value: boolean);
    /**
     * `true`, если на карте есть свои зоны закупки.
     *
     * Pawn: `CSGameRules::m_bMapHasBuyZone`
     */
    get mapHasBuyZone(): boolean;
    set mapHasBuyZone(value: boolean);
    /**
     * `true`, если на карте есть зона спасения заложников.
     *
     * Pawn: `CSGameRules::m_bMapHasRescueZone`
     */
    get mapHasRescueZone(): boolean;
    set mapHasRescueZone(value: boolean);
    /**
     * `true`, если на карте есть зона побега для террористов.
     *
     * Pawn: `CSGameRules::m_bMapHasEscapeZone`
     */
    get mapHasEscapeZone(): boolean;
    set mapHasEscapeZone(value: boolean);
    /**
     * Есть ли на карте зона спасения VIP, одно из: `"yes"`, `"no"` или `"notChecked"`, пока игра её не искала.
     *
     * Pawn: `CSGameRules::m_bMapHasVIPSafetyZone`
     */
    get mapHasVipSafetyZone(): VipSafetyZone;
    set mapHasVipSafetyZone(value: VipSafetyZone);
    /**
     * `true`, если на карте есть камеры для зрителей.
     *
     * Pawn: `CSGameRules::m_bMapHasCameras`
     */
    get mapHasCameras(): boolean;
    set mapHasCameras(value: boolean);
    /**
     * Таймер бомбы в секундах, из `mp_c4timer`.
     *
     * Pawn: `CSGameRules::m_iC4Timer`
     */
    get bombTimer(): number;
    set bombTimer(value: number);
    /**
     * Террорист, которому в этом раунде досталась бомба, или `null`. Только чтение.
     *
     * Pawn: `CSGameRules::m_iC4Guy`
     */
    get bomber(): Player | null;
    /**
     * Деньги, которые получает проигравшая раунд сторона; растут с каждым поражением подряд.
     *
     * Pawn: `CSGameRules::m_iLoserBonus`
     */
    get loserBonus(): number;
    set loserBonus(value: number);
    /**
     * Число раундов, проигранных спецназовцами подряд.
     *
     * Pawn: `CSGameRules::m_iNumConsecutiveCTLoses`
     */
    get ctLossStreak(): number;
    set ctLossStreak(value: number);
    /**
     * Число раундов, проигранных террористами подряд.
     *
     * Pawn: `CSGameRules::m_iNumConsecutiveTerroristLoses`
     */
    get terroristLossStreak(): number;
    set terroristLossStreak(value: number);
    /**
     * Секунды, которые игрок может стоять без дела, пока его не выкинет при включённом `mp_autokick`.
     *
     * Pawn: `CSGameRules::m_fMaxIdlePeriod`
     */
    get maxIdlePeriod(): number;
    set maxIdlePeriod(value: number);
    /**
     * Насколько одна сторона может превосходить другую числом, из `mp_limitteams`.
     *
     * Pawn: `CSGameRules::m_iLimitTeams`
     */
    get limitTeams(): number;
    set limitTeams(value: number);
    /**
     * `true`, когда игра осмотрела карту: места для бомбы, зоны закупки и заложников.
     *
     * Pawn: `CSGameRules::m_bLevelInitialized`
     */
    get mapInitialized(): boolean;
    set mapInitialized(value: boolean);
    /**
     * `true` с конца раунда до начала следующего.
     *
     * Pawn: `CSGameRules::m_bRoundTerminating`
     */
    get roundEnding(): boolean;
    set roundEnding(value: boolean);
    /**
     * `true`, если следующий рестарт сбросит всё, и счёт тоже, как это делает `sv_restart`.
     *
     * Pawn: `CSGameRules::m_bCompleteReset`
     */
    get completeReset(): boolean;
    set completeReset(value: boolean);
    /**
     * Доля террористов, от `0` до `1`, которым надо сбежать, чтобы они победили на карте побега.
     *
     * Pawn: `CSGameRules::m_flRequiredEscapeRatio`
     */
    get requiredEscapeRatio(): number;
    set requiredEscapeRatio(value: number);
    /**
     * Число террористов, которые могут сбежать, на карте побега.
     *
     * Pawn: `CSGameRules::m_iNumEscapers`
     */
    get numEscapers(): number;
    set numEscapers(value: number);
    /**
     * Число террористов, сбежавших в этом раунде.
     *
     * Pawn: `CSGameRules::m_iHaveEscaped`
     */
    get haveEscaped(): number;
    set haveEscaped(value: number);
    /**
     * `true`, пока спецназовцам нельзя покупать.
     *
     * Pawn: `CSGameRules::m_bCTCantBuy`
     */
    get ctsCantBuy(): boolean;
    set ctsCantBuy(value: boolean);
    /**
     * `true`, пока террористам нельзя покупать.
     *
     * Pawn: `CSGameRules::m_bTCantBuy`
     */
    get terroristsCantBuy(): boolean;
    set terroristsCantBuy(value: boolean);
    /**
     * Радиус взрыва бомбы в единицах, как его задаёт карта.
     *
     * Pawn: `CSGameRules::m_flBombRadius`
     */
    get bombRadius(): number;
    set bombRadius(value: number);
    /**
     * Число раундов подряд, в которых VIP был один и тот же игрок.
     *
     * Pawn: `CSGameRules::m_iConsecutiveVIP`
     */
    get consecutiveVip(): number;
    set consecutiveVip(value: number);
    /**
     * Число ружей, которые игра насчитала лежащими на карте.
     *
     * Pawn: `CSGameRules::m_iTotalGunCount`
     */
    get totalGunCount(): number;
    set totalGunCount(value: number);
    /**
     * Число гранат, которые игра насчитала лежащими на карте.
     *
     * Pawn: `CSGameRules::m_iTotalGrenadeCount`
     */
    get totalGrenadeCount(): number;
    set totalGrenadeCount(value: number);
    /**
     * Число бронежилетов, которые игра насчитала лежащими на карте.
     *
     * Pawn: `CSGameRules::m_iTotalArmourCount`
     */
    get totalArmourCount(): number;
    set totalArmourCount(value: number);
    /**
     * Число раундов подряд, в которых одна сторона превосходила другую больше чем на двоих; после нескольких таких игра уравнивает стороны.
     *
     * Pawn: `CSGameRules::m_iUnBalancedRounds`
     */
    get unbalancedRounds(): number;
    set unbalancedRounds(value: number);
    /**
     * Число раундов побега подряд; после 8 стороны меняются.
     *
     * Pawn: `CSGameRules::m_iNumEscapeRounds`
     */
    get numEscapeRounds(): number;
    set numEscapeRounds(value: number);
    /**
     * Номер карты, которую выбрало последнее голосование.
     *
     * Pawn: `CSGameRules::m_iLastPick`
     */
    get lastPick(): number;
    set lastPick(value: number);
    /**
     * Ограничение времени карты, из `mp_timelimit`.
     *
     * Pawn: `CSGameRules::m_iMaxMapTime`
     */
    get maxMapTime(): number;
    set maxMapTime(value: number);
    /**
     * Число раундов, которое длится карта, из `mp_maxrounds`; `0` — без ограничения.
     *
     * Pawn: `CSGameRules::m_iMaxRounds`
     */
    get maxRounds(): number;
    set maxRounds(value: number);
    /**
     * Число раундов, сыгранных на карте.
     *
     * Pawn: `CSGameRules::m_iTotalRoundsPlayed`
     */
    get totalRoundsPlayed(): number;
    set totalRoundsPlayed(value: number);
    /**
     * Число раундов, которые стороне надо выиграть, чтобы карта кончилась, из `mp_winlimit`; `0` — без ограничения.
     *
     * Pawn: `CSGameRules::m_iMaxRoundsWon`
     */
    get maxRoundsWon(): number;
    set maxRoundsWon(value: number);
    /**
     * Значение `allow_spectators`, которое игра помнит, чтобы заметить его изменение.
     *
     * Pawn: `CSGameRules::m_iStoredSpectValue`
     */
    get storedSpectValue(): number;
    set storedSpectValue(value: number);
    /**
     * Значение `mp_forcecamera`, которое игра помнит, чтобы заметить его изменение.
     *
     * Pawn: `CSGameRules::m_flForceCameraValue`
     */
    get forceCamera(): number;
    set forceCamera(value: number);
    /**
     * Значение `mp_forcechasecam`, которое игра помнит, чтобы заметить его изменение.
     *
     * Pawn: `CSGameRules::m_flForceChaseCamValue`
     */
    get forceChaseCam(): number;
    set forceChaseCam(value: number);
    /**
     * Значение `mp_fadetoblack`, которое игра помнит, чтобы заметить его изменение.
     *
     * Pawn: `CSGameRules::m_flFadeToBlackValue`
     */
    get fadeToBlack(): number;
    set fadeToBlack(value: number);
    /**
     * VIP на карте с убийством VIP — `id` игрока; `0`, если его нет.
     *
     * Pawn: `CSGameRules::m_pVIP`
     */
    get vip(): number;
    set vip(value: number);
    /**
     * Игровое время, когда закончится перерыв в конце карты и загрузится следующая.
     *
     * Pawn: `CSGameRules::m_flIntermissionEndTime`
     */
    get intermissionEndTime(): number;
    set intermissionEndTime(value: number);
    /**
     * Игровое время, когда начался перерыв в конце карты.
     *
     * Pawn: `CSGameRules::m_flIntermissionStartTime`
     */
    get intermissionStartTime(): number;
    set intermissionStartTime(value: number);
    /**
     * `true`, когда игрок нажал кнопку, чтобы закончить перерыв раньше.
     *
     * Pawn: `CSGameRules::m_iEndIntermissionButtonHit`
     */
    get intermissionSkipped(): boolean;
    set intermissionSkipped(value: boolean);
    /**
     * Игровое время следующей периодической проверки игрой её ограничений и кваров.
     *
     * Pawn: `CSGameRules::m_tmNextPeriodicThink`
     */
    get nextPeriodicThink(): number;
    set nextPeriodicThink(value: number);
    /**
     * `true`, когда игра началась: на обеих сторонах были игроки. До этого раунд кончается надписью «Game Commencing».
     *
     * Pawn: `CSGameRules::m_bGameStarted`
     */
    get gameStarted(): boolean;
    set gameStarted(value: boolean);
    /**
     * `true`, если следующий раунд начнётся, не возрождая игроков.
     *
     * Pawn: `CSGameRules::m_bSkipSpawn`
     */
    get skipSpawn(): boolean;
    set skipSpawn(value: boolean);
    /**
     * `true`, пока входящему игроку не показывается меню выбора команды.
     *
     * Pawn: `CSGameRules::m_bSkipShowMenu`
     */
    get skipShowMenu(): boolean;
    set skipShowMenu(value: boolean);
    /**
     * `true`, пока игра ждёт игроков, потому что одна из сторон пуста.
     *
     * Pawn: `CSGameRules::m_bNeededPlayers`
     */
    get neededPlayers(): boolean;
    set neededPlayers(value: boolean);
    /**
     * Доля террористов, от `0` до `1`, сбежавших в этом раунде.
     *
     * Pawn: `CSGameRules::m_flEscapeRatio`
     */
    get escapeRatio(): number;
    set escapeRatio(value: number);
    /**
     * Игровое время, когда карта кончится по `mp_timelimit`; `0` — без ограничения.
     *
     * Pawn: `CSGameRules::m_flTimeLimit`
     */
    get timeLimit(): number;
    set timeLimit(value: number);
    /**
     * Игровое время, когда началась игра, после «Game Commencing».
     *
     * Pawn: `CSGameRules::m_flGameStartTime`
     */
    get gameStartTime(): number;
    set gameStartTime(value: number);
    /**
     * `true`, если стороны уравнивались в начале этого раунда.
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
     * Класс оружия, например `"weapon_ak47"`: имя, которое принимают `player.give`, `setAmmo`, `getAmmo` и `switchWeapon`, — `player.give(weapon.classname)`.
     *
     * Pawn: `pev->classname`, `get_weaponname`
     */
    get classname(): WeaponName;
    set classname(value: WeaponName);
    /**
     * Игрок, у которого оружие, или `null`, если оно лежит на земле. Только чтение.
     *
     * Pawn: `CBasePlayerItem::m_pPlayer`
     */
    get player(): Player | null;
    /**
     * Следующее оружие в том же слоте инвентаря (гранаты делят один), или `null`. Только чтение.
     *
     * Pawn: `CBasePlayerItem::m_pNext`
     */
    get next(): Weapon | null;
    /**
     * Щелчок пустого оружия: `1`, если он может прозвучать при следующей атаке.
     *
     * Pawn: `CBasePlayerWeapon::m_iPlayEmptySound` (reapi `m_Weapon_iPlayEmptySound`)
     */
    get playEmptySound(): number;
    set playEmptySound(value: number);
    /**
     * Отметка «стрельба впустую»: `1`, пока игрок жмёт атаку с пустым магазином.
     *
     * Pawn: `CBasePlayerWeapon::m_fFireOnEmpty` (reapi `m_Weapon_fFireOnEmpty`)
     */
    get fireOnEmpty(): number;
    set fireOnEmpty(value: number);
    /**
     * Время до следующего выстрела оружия, в секундах; отсчитывается само: около `0.1` после выстрела AK-47, `1.45` после AWP.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextPrimaryAttack` (reapi `m_Weapon_flNextPrimaryAttack`)
     */
    get nextPrimaryAttack(): number;
    set nextPrimaryAttack(value: number);
    /**
     * Время до следующей вторичной атаки оружия (зум, глушитель, режим очереди), в секундах; отсчитывается само.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextSecondaryAttack` (reapi `m_Weapon_flNextSecondaryAttack`)
     */
    get nextSecondaryAttack(): number;
    set nextSecondaryAttack(value: number);
    /**
     * Время до анимации покоя оружия, в секундах; отсчитывается само.
     *
     * Pawn: `CBasePlayerWeapon::m_flTimeWeaponIdle` (reapi `m_Weapon_flTimeWeaponIdle`)
     */
    get nextIdle(): number;
    set nextIdle(value: number);
    /**
     * Вид патронов оружия — номер запаса патронов игрока, из которого оно берёт; `-1` — никаких (нож).
     *
     * Pawn: `CBasePlayerWeapon::m_iPrimaryAmmoType` (reapi `m_Weapon_iPrimaryAmmoType`)
     */
    get ammoType(): number;
    set ammoType(value: number);
    /**
     * Номер запаса вторичных патронов оружия; у оружия CS их нет (`-1`).
     *
     * Pawn: `CBasePlayerWeapon::m_iSecondaryAmmoType` (reapi `m_Weapon_iSecondaryAmmoType`)
     */
    get secondaryAmmoType(): number;
    set secondaryAmmoType(value: number);
    /**
     * Патроны в магазине оружия: `30` у полного AK-47; `-1` у ножа, у которого магазина нет.
     *
     * Pawn: `CBasePlayerWeapon::m_iClip` (reapi `m_Weapon_iClip`)
     */
    get clip(): number;
    set clip(value: number);
    /**
     * Магазин, последним отправленный в HUD игрока; если он отличается от clip, игра отправит новый.
     *
     * Pawn: `CBasePlayerWeapon::m_iClientClip` (reapi `m_Weapon_iClientClip`)
     */
    get clipSent(): number;
    set clipSent(value: number);
    /**
     * Состояние оружия (в руках или нет), последним отправленное в HUD игрока.
     *
     * Pawn: `CBasePlayerWeapon::m_iClientWeaponState` (reapi `m_Weapon_iClientWeaponState`)
     */
    get clientWeaponState(): number;
    set clientWeaponState(value: number);
    /**
     * Отметка перезарядки оружия: `1`, пока оно перезаряжается.
     *
     * Pawn: `CBasePlayerWeapon::m_fInReload` (reapi `m_Weapon_fInReload`)
     */
    get isReloading(): number;
    set isReloading(value: number);
    /**
     * Стадия поштучной перезарядки дробовика: `0` — не перезаряжается, `1` — начало, `2` — вставляет патрон.
     *
     * Pawn: `CBasePlayerWeapon::m_fInSpecialReload` (reapi `m_Weapon_fInSpecialReload`)
     */
    get shotgunReloadStage(): number;
    set shotgunReloadStage(value: number);
    /**
     * Патроны, которые оружие даёт при первом подборе; `0` у выброшенного игроком (только магазин).
     *
     * Pawn: `CBasePlayerWeapon::m_iDefaultAmmo` (reapi `m_Weapon_iDefaultAmmo`)
     */
    get defaultAmmo(): number;
    set defaultAmmo(value: number);
    /**
     * Модель гильзы, которую выбрасывает оружие (подгруженная).
     *
     * Pawn: `CBasePlayerWeapon::m_iShellId` (reapi `m_Weapon_iShellId`)
     */
    get shellId(): number;
    set shellId(value: number);
    /**
     * `true` от выстрела до того, как отпустят кнопку атаки; так частые нажатия не сохраняют точность одиночного выстрела.
     *
     * Pawn: `CBasePlayerWeapon::m_bDelayFire` (reapi `m_Weapon_bDelayFire`)
     */
    get delayFire(): boolean;
    set delayFire(value: boolean);
    /**
     * Сторона, в которую отдача оружия уведёт в следующий раз, — влево или вправо; время от времени меняется.
     *
     * Pawn: `CBasePlayerWeapon::m_iDirection` (reapi `m_Weapon_iDirection`)
     */
    get direction(): number;
    set direction(value: number);
    /**
     * Флаг оружия, задуманный для второго глушителя. В CS не используется.
     *
     * Pawn: `CBasePlayerWeapon::m_bSecondarySilencerOn` (reapi `m_Weapon_bSecondarySilencerOn`)
     */
    get secondarySilencerOn(): boolean;
    set secondarySilencerOn(value: boolean);
    /**
     * Текущий разброс оружия: растёт при стрельбе и возвращается; у каждого оружия свои пределы (`0.2` у свежего AK-47).
     *
     * Pawn: `CBasePlayerWeapon::m_flAccuracy` (reapi `m_Weapon_flAccuracy`)
     */
    get accuracy(): number;
    set accuracy(value: number);
    /**
     * Выстрелы в текущей очереди оружия; с ними растёт отдача, и счёт сбрасывается, когда игрок перестаёт стрелять.
     *
     * Pawn: `CBasePlayerWeapon::m_iShotsFired` (reapi `m_Weapon_iShotsFired`)
     */
    get shotsFired(): number;
    set shotsFired(value: number);
    /**
     * Игровое время следующего патрона очереди Glock; `0` — очереди нет.
     *
     * Pawn: `CBasePlayerWeapon::m_flGlock18Shoot` (reapi `m_Weapon_flGlock18Shoot`)
     */
    get glockNextBurstShot(): number;
    set glockNextBurstShot(value: number);
    /**
     * Патроны, которые Glock выпустил в текущей очереди.
     *
     * Pawn: `CBasePlayerWeapon::m_iGlock18ShotsFired` (reapi `m_Weapon_iGlock18ShotsFired`)
     */
    get glockBurstShots(): number;
    set glockBurstShots(value: number);
    /**
     * Игровое время следующего патрона очереди FAMAS; `0` — очереди нет.
     *
     * Pawn: `CBasePlayerWeapon::m_flFamasShoot` (reapi `m_Weapon_flFamasShoot`)
     */
    get famasNextBurstShot(): number;
    set famasNextBurstShot(value: number);
    /**
     * Патроны, которые FAMAS выпустил в текущей очереди.
     *
     * Pawn: `CBasePlayerWeapon::m_iFamasShotsFired` (reapi `m_Weapon_iFamasShotsFired`)
     */
    get famasBurstShots(): number;
    set famasBurstShots(value: number);
    /**
     * Разброс очереди FAMAS, сохранённый для её следующих патронов.
     *
     * Pawn: `CBasePlayerWeapon::m_fBurstSpread` (reapi `m_Weapon_fBurstSpread`)
     */
    get burstSpread(): number;
    set burstSpread(value: number);
    /**
     * Режимы оружия, список, любые из: `"UspSilenced"` — глушитель на USP, `"Glock18Burst"` — Glock стреляет очередями, `"M4a1Silenced"` — глушитель на M4A1, `"EliteLeft"` — Elites следующим стреляют из левого, `"FamasBurst"` — FAMAS стреляет очередями, `"ShieldDrawn"` — щит поднят.
     *
     * Pawn: `CBasePlayerWeapon::m_iWeaponState` (reapi `m_Weapon_iWeaponState`), `WPNSTATE_*`
     */
    get weaponState(): WeaponState[];
    set weaponState(values: WeaponState[]);
    /**
     * Время до следующего патрона при перезарядке дробовика, в секундах; отсчитывается вниз.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextReload` (reapi `m_Weapon_flNextReload`)
     */
    get nextReload(): number;
    set nextReload(value: number);
    /**
     * Игровое время, когда `shotsFired` уменьшится на единицу после того, как игрок перестал стрелять.
     *
     * Pawn: `CBasePlayerWeapon::m_flDecreaseShotsFired` (reapi `m_Weapon_flDecreaseShotsFired`)
     */
    get recoilResetTime(): number;
    set recoilResetTime(value: number);
    /**
     * Задержка между двумя последними выстрелами оружия, в секундах; по ней игра выравнивает темп стрельбы.
     *
     * Pawn: `CBasePlayerWeapon::m_flPrevPrimaryAttack` (reapi `m_Weapon_flPrevPrimaryAttack`)
     */
    get prevPrimaryAttack(): number;
    set prevPrimaryAttack(value: number);
    /**
     * Игровое время последнего выстрела оружия; `0` до первого выстрела.
     *
     * Pawn: `CBasePlayerWeapon::m_flLastFireTime` (reapi `m_Weapon_flLastFireTime`)
     */
    get lastFireTime(): number;
    set lastFireTime(value: number);
    /**
     * Отдаёт оружие игроку, как при подборе; `true` — он его взял.
     *
     * Pawn: `ExecuteHamB(Ham_Item_AddToPlayer, ...)`, `ExecuteHam`
     */
    addToPlayer(player: Player, options?: ActionOptions): bool;
    /**
     * Достаёт оружие в руки владельца, как при переключении на него, — модель и анимация показываются заново: `knife.deploy()`. `true` — достал.
     *
     * Pawn: `ExecuteHamB(Ham_Item_Deploy, ...)`, `ExecuteHam`
     */
    deploy(options?: ActionOptions): bool;
    /**
     * Убирает оружие, как при переключении с него.
     *
     * Pawn: `ExecuteHamB(Ham_Item_Holster, ...)`, `ExecuteHam`
     */
    holster(options?: ActionOptions): void;
    /**
     * Выбрасывает оружие из инвентаря владельца.
     *
     * Pawn: `ExecuteHamB(Ham_Item_Drop, ...)`, `ExecuteHam`
     */
    drop(options?: ActionOptions): void;
    /**
     * Прикрепляет оружие к игроку как его собственное, без подбора.
     *
     * Pawn: `ExecuteHamB(Ham_Item_AttachToPlayer, ...)`, `ExecuteHam`
     */
    attachToPlayer(player: Player, options?: ActionOptions): void;
    /**
     * Перекладывает патроны этого оружия в `target`, как при подборе второго такого же; возвращает переложенное.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_ExtractAmmo, ...)`, `ExecuteHam`
     */
    extractAmmo(target: Weapon, options?: ActionOptions): number;
    /**
     * Перекладывает патроны из обоймы этого оружия в `target`; возвращает переложенное.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_ExtractClipAmmo, ...)`, `ExecuteHam`
     */
    extractClipAmmo(target: Weapon, options?: ActionOptions): number;
    /**
     * Разрешает щелчку пустого оружия прозвучать снова при следующей попытке.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_ResetEmptySound, ...)`, `ExecuteHam`
     */
    resetEmptySound(options?: ActionOptions): void;
    /**
     * Выполняет основную атаку оружия — выстрел, удар ножом, — как левый клик.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_PrimaryAttack, ...)`, `ExecuteHam`
     */
    primaryAttack(options?: ActionOptions): void;
    /**
     * Выполняет вторую атаку оружия — укол ножом, прицел, — как правый клик: `knife.secondaryAttack()`.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_SecondaryAttack, ...)`, `ExecuteHam`
     */
    secondaryAttack(options?: ActionOptions): void;
    /**
     * Перезаряжает оружие, как клавиша перезарядки.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_Reload, ...)`, `ExecuteHam`
     */
    reload(options?: ActionOptions): void;
    /**
     * Выполняет бездействие оружия, которое проигрывает анимацию ожидания.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_WeaponIdle, ...)`, `ExecuteHam`
     */
    weaponIdle(options?: ActionOptions): void;
    /**
     * Убирает оружие — например, без патронов — и переключает владельца на следующее лучшее.
     *
     * Pawn: `ExecuteHamB(Ham_Weapon_RetireWeapon, ...)`, `ExecuteHam`
     */
    retireWeapon(options?: ActionOptions): void;
    /**
     * Проигрывает анимацию модели оружия от первого лица по номеру; `skipLocal` пропускает клиента, который предсказывает её сам.
     *
     * Pawn: `ExecuteHamB(Ham_CS_Weapon_SendWeaponAnim, ...)`, `ExecuteHam`
     */
    sendWeaponAnim(anim: number, skipLocal: boolean, options?: ActionOptions): void;
}
