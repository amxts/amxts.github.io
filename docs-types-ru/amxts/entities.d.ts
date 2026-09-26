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
     * Класс сущности, например "player", "weaponbox", "grenade", "func_door".
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
     * Скорость сущности с направлением, единиц в секунду: бегущий игрок — около 250.
     *
     * Pawn: `pev->velocity`
     */
    get velocity(): Vector;
    set velocity(value: number[]);
    /**
     * Добавочная скорость сущности от того, в чём она стоит, — конвейер, trigger_push, течение. Единиц в секунду.
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
     * Поворот сущности: тангаж, рысканье, крен в градусах. У игрока следует за взглядом; чтобы развернуть взгляд, поставьте его вместе с fixAngle.
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
     * Конечная точка предсказываемого снаряда; уходит клиенту вместе со startTime и impactTime.
     *
     * Pawn: `pev->endpos`
     */
    get endPos(): Vector;
    set endPos(value: number[]);
    /**
     * Начальная точка предсказываемого снаряда; уходит клиенту вместе с endPos.
     *
     * Pawn: `pev->startpos`
     */
    get startPos(): Vector;
    set startPos(value: number[]);
    /**
     * Игровое время, когда предсказываемый снаряд долетит до endPos.
     *
     * Pawn: `pev->impacttime`
     */
    get impactTime(): number;
    set impactTime(value: number);
    /**
     * Игровое время, когда предсказываемый снаряд вылетел из startPos.
     *
     * Pawn: `pev->starttime`
     */
    get startTime(): number;
    set startTime(value: number);
    /**
     * Разворот взгляда игрока: 1 — на следующем кадре повернуть взгляд по angles, 2 — повернуть его на рысканье из angularVelocity; потом движок сбрасывает поле в 0.
     *
     * Pawn: `pev->fixangle`
     */
    get fixAngle(): number;
    set fixAngle(value: number);
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
     * Рысканье, к которому поворачивается монстр, в градусах; momentary_rot_button хранит здесь своё положение.
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
     * Номер подгруженной модели сущности; 0 — сущность не рисуется.
     *
     * Pawn: `pev->modelindex`
     */
    get modelIndex(): number;
    set modelIndex(value: number);
    /**
     * Путь к модели сущности, например "models/w_c4.mdl"; у браша карты — его номер, например "*12". Запись меняет только текст; натив entity_set_model ставит ещё modelIndex и размер.
     *
     * Pawn: `pev->model`
     */
    get model(): string;
    set model(value: string);
    /**
     * Модель оружия от первого лица, которую видит сам игрок, например "models/v_knife.mdl".
     *
     * Pawn: `pev->viewmodel`
     */
    get viewModel(): number;
    set viewModel(value: number);
    /**
     * Модель оружия в руках игрока, которую видят другие, например "models/p_knife.mdl".
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
     * Нижний угол габаритов сущности относительно origin: (-16, -16, -36) у стоящего игрока. Ставится нативом entity_set_size, чтобы size и absMin пересчитались.
     *
     * Pawn: `pev->mins`
     */
    get mins(): Vector;
    set mins(value: number[]);
    /**
     * Верхний угол габаритов сущности относительно origin: (16, 16, 36) у стоящего игрока. Ставится нативом entity_set_size, чтобы size и absMax пересчитались.
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
     * Собственные часы двери, платформы или поезда: идут, только пока сущность движется, и её nextThink отсчитывается по ним.
     *
     * Pawn: `pev->ltime`
     */
    get localTime(): number;
    set localTime(value: number);
    /**
     * Игровое время следующего think сущности; 0 и меньше — никогда. У двери, платформы и поезда отсчитывается по localTime.
     *
     * Pawn: `pev->nextthink`
     */
    get nextThink(): number;
    set nextThink(value: number);
    /**
     * Способ движения сущности: 0 — стоит на месте, 3 — ходит (игрок), 5 — летает без гравитации, 6 — падает, 8 — проходит сквозь стены (noclip), 10 — отскакивает, 12 — держится за aimEntity.
     *
     * Pawn: `pev->movetype`, `MOVETYPE_*`
     */
    get moveType(): number;
    set moveType(value: number);
    /**
     * Твёрдость сущности: 0 — проходит сквозь всё, 1 — только касается, 2 — сталкивается как коробка, 3 — как коробка игрока, 4 — как браш карты.
     *
     * Pawn: `pev->solid`, `SOLID_*`
     */
    get solid(): number;
    set solid(value: number);
    /**
     * Номер скина, которым рисуется модель, с 0. Браш карты хранит здесь своё содержимое: -3 — вода, -16 — лестница.
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
     * Визуальные эффекты сущности, например: "NoDraw" прячет её, "DimLight" и "BrightLight" освещают вокруг, "MuzzleFlash" — одна вспышка.
     *
     * Pawn: `pev->effects`
     */
    get effects(): Effect[];
    set effects(values: Effect[]);
    /**
     * Множитель гравитации сущности: 1 — обычная, 0.5 — половина. 0 тоже считается обычной.
     *
     * Pawn: `pev->gravity`
     */
    get gravity(): number;
    set gravity(value: number);
    /**
     * Множитель трения сущности о землю, 1 — обычное. У отскакивающей сущности (moveType 10) — насколько слабо она отскакивает: 0 — отскок на полной скорости.
     *
     * Pawn: `pev->friction`
     */
    get friction(): number;
    set friction(value: number);
    /**
     * Освещённость места, где стоит игрок, от 0 (темно) до 255; клиент присылает её каждый кадр.
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
     * Номер анимации ног игрока поверх sequence; 0 — нет.
     *
     * Pawn: `pev->gaitsequence`
     */
    get gaitSequence(): number;
    set gaitSequence(value: number);
    /**
     * Позиция в анимации, от 0 до 255 на всю последовательность; у спрайта — номер кадра.
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
     * Скорость анимации: 1 — обычная, 0 — стоп, отрицательная — назад.
     *
     * Pawn: `pev->framerate`
     */
    get frameRate(): number;
    set frameRate(value: number);
    /**
     * Масштаб спрайта: 1 — обычный размер.
     *
     * Pawn: `pev->scale`
     */
    get scale(): number;
    set scale(value: number);
    /**
     * Режим отрисовки сущности: 0 — обычный, 1 — цветом (renderColor), 2 — полупрозрачный, 3 — свечение (спрайты), 4 — полупрозрачный с вырезанными текстурами, 5 — сложение (подсвечивает то, что позади). В режимах 1–5 renderAmount — непрозрачность, от 0 до 255.
     *
     * Pawn: `pev->rendermode`, `kRender*`
     */
    get renderMode(): number;
    set renderMode(value: number);
    /**
     * Непрозрачность сущности в прозрачном renderMode, от 0 (невидима) до 255; со светящейся оболочкой (renderFx 19) — толщина оболочки.
     *
     * Pawn: `pev->renderamt`
     */
    get renderAmount(): number;
    set renderAmount(value: number);
    /**
     * Цвет отрисовки сущности для renderMode и renderFx — красный, зелёный, синий от 0 до 255: цвет светящейся оболочки (renderFx 19).
     *
     * Pawn: `pev->rendercolor`
     */
    get renderColor(): Vector;
    set renderColor(value: number[]);
    /**
     * Эффект отрисовки сущности: 0 — нет, 19 — цветная светящаяся оболочка вокруг модели (цвет — renderColor, толщина — renderAmount); 1–13 — пульсация, затухание, мигание и мерцание, 16 — голограмма.
     *
     * Pawn: `pev->renderfx`, `kRenderFx*`
     */
    get renderFx(): number;
    set renderFx(value: number);
    /**
     * Оружие игрока битами: 1 << номер оружия; старший бит — костюм, без которого нет HUD. Запись оружия не даёт и не отбирает.
     *
     * Pawn: `pev->weapons`
     */
    get weapons(): number;
    set weapons(value: number);
    /**
     * Уязвимость сущности: 0 — неуязвима (бессмертие), 1 — уязвима, 2 — уязвима, и на неё работает автоприцел.
     *
     * Pawn: `pev->takedamage`, `DAMAGE_*`
     */
    get takeDamage(): number;
    set takeDamage(value: number);
    /**
     * Стадия смерти сущности: 0 — жива, 1 — умирает (падает), 2 — мертва, 3 — ждёт возрождения.
     *
     * Pawn: `pev->deadflag`, `DEAD_*`
     */
    get deadFlag(): number;
    set deadFlag(value: number);
    /**
     * Положение глаз игрока относительно origin: (0, 0, 17) стоя, (0, 0, 12) присев.
     *
     * Pawn: `pev->view_ofs`
     */
    get viewOffset(): Vector;
    set viewOffset(value: number[]);
    /**
     * Кнопки, которые игрок держит в этом кадре, например "Attack", "Jump", "Duck", "Use".
     *
     * Pawn: `pev->button`
     */
    get buttons(): Button[];
    set buttons(values: Button[]);
    /**
     * Команда impulse игрока: 100 — фонарик, 201 — спрей. Игра обнуляет её, когда обработает.
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
     * Сущность, которая последней ранила игрока: стрелявший — для пули, граната, trigger_hurt.
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
     * Сущность, за которой следует эта при moveType 12 (следование): двигается вместе с ней.
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
     * Опора сущности: мир (0) или другая сущность, на которой она стоит.
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
     * Флаги состояния сущности, например "OnGround", "Ducking", "InWater", "Frozen", "FakeClient" у бота, "KillMe" — на удаление.
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
     * Максимальное здоровье сущности: лечение на нём останавливается. Игроку сюда ставится здоровье при появлении, 100.
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
     * Тип брони Half-Life. В CS не используется.
     *
     * Pawn: `pev->armortype`
     */
    get armorType(): number;
    set armorType(value: number);
    /**
     * Очки брони сущности, от 0 до 100 в обычной игре. Вид брони — в kevlar.
     *
     * Pawn: `pev->armorvalue`
     */
    get armorValue(): number;
    set armorValue(value: number);
    /**
     * Глубина погружения сущности: 0 — не в воде, 1 — ноги в воде, 2 — по пояс, 3 — с головой.
     *
     * Pawn: `pev->waterlevel`
     */
    get waterLevel(): number;
    set waterLevel(value: number);
    /**
     * Среда, в которой находится сущность: -1 — пусто, -3 — вода, -4 — слизь, -5 — лава.
     *
     * Pawn: `pev->watertype`, `CONTENTS_*`
     */
    get waterType(): number;
    set waterType(value: number);
    /**
     * Цель сущности: targetName сущностей, которые она запускает при срабатывании, — например, дверь у кнопки.
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
     * Текст сущности — у game_text или env_message; у worldspawn — название карты.
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
     * Урон, поглощённый бронёй игрока с последнего обновления HUD; обнуляется вместе с damageTaken.
     *
     * Pawn: `pev->dmg_save`
     */
    get damageSaved(): number;
    set damageSaved(value: number);
    /**
     * Урон, который наносит сущность: взрыв гранаты, удар trigger_hurt, дверь, которая давит.
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
     * Игровое время следующей боли игрока от утопления или trigger_hurt; до него новой нет.
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
     * Отметка стеклянного func_breakable: с 1 клиент рисует на нём декали. У игроков в CS не используется.
     *
     * Pawn: `pev->playerclass`
     */
    get playerClass(): number;
    set playerClass(value: number);
    /**
     * Предельная скорость бега игрока, единиц в секунду: 250 с ножом, 221 с AK-47. Игра сбрасывает её при смене оружия.
     *
     * Pawn: `pev->maxspeed`
     */
    get maxSpeed(): number;
    set maxSpeed(value: number);
    /**
     * Поле зрения игрока в градусах, 90 — обычное. Игра держит свою копию для прицела и пишет её сюда при смене зума.
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
     * Отметка приседания игрока: 1, пока он приседает и ещё не сел полностью.
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
     * Приседание игрока в процессе, в миллисекундах: движок начинает с 1000 и отсчитывает вниз.
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
     * Состояние щита игрока: 0 — щит поднят и принимает попадания, 1 — нет.
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
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока здесь режим наблюдения, его ставит игра: 0 — нет, 1 — камера за игроком без поворота, 2 — свободная камера за игроком, 3 — свободный полёт, 4 — от первого лица, 5 — свободная карта, 6 — карта за игроком.
     *
     * Pawn: `pev->iuser1`, `OBS_*`
     */
    get iuser1(): number;
    set iuser1(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока здесь номер того, за кем он наблюдает (0 в свободном полёте); его ставит игра.
     *
     * Pawn: `pev->iuser2`
     */
    get iuser2(): number;
    set iuser2(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока поле занято: камера смерти держит здесь номер убийцы, а ReGameDLL читает из его битов запреты движения (16 — не приседать, 32 — не лазить по лестницам, 64 — не прыгать, 128 — без двойного приседания).
     *
     * Pawn: `pev->iuser3`
     */
    get iuser3(): number;
    set iuser3(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока игра перезаписывает поле каждый кадр: 1, пока он стоит на транспорте, иначе 0.
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
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока здесь замедление после прыжка, в миллисекундах: при прыжке ставится около 1316 и отсчитывается вниз.
     *
     * Pawn: `pev->fuser2`
     */
    get fuser2(): number;
    set fuser2(value: number);
    /**
     * Свободное поле на любой сущности, кроме игрока: плагин хранит здесь своё значение. У игрока ReGameDLL умножает на поле движение, пока зажат +speed (0 — выключено); в noclip и наблюдении это ускорение.
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
}
/** A player's members - CBaseEntity up to CBasePlayer - on top of its entvars. */
export declare class PlayerFields extends Entity {
    /**
     * Счётчик патронов игрока из Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::currentammo`
     */
    get currentammo(): number;
    set currentammo(value: number);
    /**
     * Предел патронов buckshot у игрока, как его задумал Half-Life; игра его не использует.
     *
     * Pawn: `CBaseEntity::maxammo_buckshot`
     */
    get maxammoBuckshot(): number;
    set maxammoBuckshot(value: number);
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
    get maxammo9mm(): number;
    set maxammo9mm(value: number);
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
    get maxammo556nato(): number;
    set maxammo556nato(value: number);
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
    get maxammo556natobox(): number;
    set maxammo556natobox(value: number);
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
    get maxammo762nato(): number;
    set maxammo762nato(value: number);
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
    get maxammo45acp(): number;
    set maxammo45acp(value: number);
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
    get maxammo50ae(): number;
    set maxammo50ae(value: number);
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
    get maxammo338mag(): number;
    set maxammo338mag(value: number);
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
    get maxammo57mm(): number;
    set maxammo57mm(value: number);
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
    get maxammo357sig(): number;
    set maxammo357sig(value: number);
    /**
     * Копия запаса патронов .357 SIG у игрока (P228): игра обновляет её при каждом изменении настоящего запаса, запись патронов не даёт.
     *
     * Pawn: `CBaseEntity::ammo_357sig`
     */
    get ammo357sig(): number;
    set ammo357sig(value: number);
    /**
     * Игровое время, когда у гранаты выдернута чека (0 — не выдернута); у игрока поле есть, но не используется.
     *
     * Pawn: `CBaseEntity::m_flStartThrow`
     */
    get startThrow(): number;
    set startThrow(value: number);
    /**
     * Игровое время, когда у гранаты отпущена кнопка атаки (-1, пока чека не выдернута); у игрока не используется.
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
     * Отметка ухода игрока: true, когда он ушёл с сервера (или бота выгнали), пока слот не займёт кто-то другой.
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
     * Флаг конца текущей анимации: true, когда она доиграла до конца.
     *
     * Pawn: `CBaseAnimating::m_fSequenceFinished`
     */
    get sequenceFinished(): number;
    set sequenceFinished(value: number);
    /**
     * Флаг зацикленности текущей анимации: true, если она зациклена.
     *
     * Pawn: `CBaseAnimating::m_fSequenceLoops`
     */
    get sequenceLoops(): number;
    set sequenceLoops(value: number);
    /**
     * Текущее действие модели (стоит, бежит, идёт, ...); игра ставит его вместе с анимацией игрока.
     *
     * Pawn: `CBaseMonster::m_Activity`, `ACT_*`
     */
    get activity(): number;
    set activity(value: number);
    /**
     * Следующее действие модели — на которое она должна переключиться.
     *
     * Pawn: `CBaseMonster::m_IdealActivity`, `ACT_*`
     */
    get idealActivity(): number;
    set idealActivity(value: number);
    /**
     * Часть тела, куда попала последняя пуля: 0 — без уточнения, 1 — голова, 2 — грудь, 3 — живот, 4 — левая рука, 5 — правая рука, 6 — левая нога, 7 — правая нога, 8 — щит.
     *
     * Pawn: `CBaseMonster::m_LastHitGroup`, `HITGROUP_*`
     */
    get lastHitGroup(): number;
    set lastHitGroup(value: number);
    /**
     * Виды урона, полученного игроком с последнего обновления HUD, например "Fall", "Bullet", "Burn"; отправив индикатор урона, игра оставляет только длительные.
     *
     * Pawn: `CBaseMonster::m_bitsDamageType`
     */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /**
     * Состояние ИИ монстра (заложника): покой, тревога, бой, смерть.
     *
     * Pawn: `CBaseMonster::m_MonsterState`
     */
    get monsterState(): number;
    set monsterState(value: number);
    /**
     * Состояние ИИ, в которое монстр (заложник) должен перейти.
     *
     * Pawn: `CBaseMonster::m_IdealMonsterState`
     */
    get idealMonsterState(): number;
    set idealMonsterState(value: number);
    /**
     * Условия ИИ монстра в этом think, битами: видит врага, ранен, слышит звук.
     *
     * Pawn: `CBaseMonster::m_afConditions`
     */
    get conditions(): number;
    set conditions(value: number);
    /**
     * Память ИИ монстра — биты, которые хранятся между think.
     *
     * Pawn: `CBaseMonster::m_afMemory`
     */
    get memory(): number;
    set memory(value: number);
    /**
     * Задержка игрока до использования любого оружия, в секундах; сама отсчитывается до 0. Игра ставит её при смене оружия и перезарядке.
     *
     * Pawn: `CBaseMonster::m_flNextAttack`
     */
    get nextAttack(): number;
    set nextAttack(value: number);
    /**
     * Цель монстра: сущность, к которой он идёт или за которой следует, — например, игрок, за которым идёт заложник.
     *
     * Pawn: `CBaseMonster::m_hTargetEnt`
     */
    get targetEnt(): number;
    set targetEnt(value: number);
    /**
     * Поле зрения монстра как косинус половины конуса: 0.5 — обзор 120 градусов.
     *
     * Pawn: `CBaseMonster::m_flFieldOfView`
     */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    /**
     * Цвет крови сущности: 247 — красная, 195 — жёлтая, -1 — не кровоточит.
     *
     * Pawn: `CBaseMonster::m_bloodColor`, `BLOOD_COLOR_*`, `DONT_BLEED`
     */
    get bloodColor(): number;
    set bloodColor(value: number);
    /**
     * Положение оружия монстра относительно origin — откуда он стреляет.
     *
     * Pawn: `CBaseMonster::m_HackedGunPos`
     */
    get hackedGunPos(): Vector;
    set hackedGunPos(value: number[]);
    /**
     * Место, где монстр последний раз видел врага.
     *
     * Pawn: `CBaseMonster::m_vecEnemyLKP`
     */
    get enemyLkp(): Vector;
    set enemyLkp(value: number[]);
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
     * Режим наблюдения, который игрок выбрал последним; восстанавливается, когда он снова наблюдает: 1 — камера за целью, по её взгляду, 2 — свободная камера за целью, 3 — свободный полёт, 4 — от первого лица, 5 — карта свободно, 6 — карта за целью.
     *
     * Pawn: `CBasePlayer::m_iObserverLastMode`, `OBS_*`
     */
    get observerLastMode(): number;
    set observerLastMode(value: number);
    /**
     * Игровое время, когда заложник перестанет вздрагивать от удара; у игрока не используется.
     *
     * Pawn: `CBasePlayer::m_flFlinchTime`
     */
    get flinchTime(): number;
    set flinchTime(value: number);
    /**
     * `true`, если последнее попадание в игрока было сильным (больше 60 в голову, больше 20 в другое место), — для анимации боли.
     *
     * Pawn: `CBasePlayer::m_bHighDamage`
     */
    get highDamage(): boolean;
    set highDamage(value: boolean);
    /**
     * Множитель скорости игрока после попадания: меньше 1 — игрок замедлен; на земле множитель возвращается к 1 по 0.01 за кадр.
     *
     * Pawn: `CBasePlayer::m_flVelocityModifier`
     */
    get velocityModifier(): number;
    set velocityModifier(value: number);
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
     * Игровое время, когда из оружия игрока вылетит следующая гильза (AWP, Scout, дробовики); 0 — не вылетит.
     *
     * Pawn: `CBasePlayer::m_flEjectBrass`
     */
    get ejectBrass(): number;
    set ejectBrass(value: number);
    /**
     * Вид брони игрока: 0 — нет, 1 — жилет, 2 — жилет и шлем.
     *
     * Pawn: `CBasePlayer::m_iKevlar`, `ARMOR_*`
     */
    get kevlar(): number;
    set kevlar(value: number);
    /**
     * `true`, если игрок пережил прошлый раунд и сохраняет снаряжение; при `false` он появится со стандартным.
     *
     * Pawn: `CBasePlayer::m_bNotKilled`
     */
    get notKilled(): boolean;
    set notKilled(value: boolean);
    /**
     * Деньги игрока: 800 в начале. Запись не обновляет деньги на его HUD, а `rg_add_account` обновляет.
     *
     * Pawn: `CBasePlayer::m_iAccount`
     */
    get account(): number;
    set account(value: number);
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
     * Направление, куда отбросит тело игрока при смерти: 0 — никуда, 1 — вперёд, 2 — назад, 3 — от попадания, 4 — от бомбы, 5 — от гранаты.
     *
     * Pawn: `CBasePlayer::m_iThrowDirection`
     */
    get throwDirection(): number;
    set throwDirection(value: number);
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
     * Стадия входа игрока в игру: 0 — в игре, 1 — показан MOTD, 2 — читает MOTD, 3 — показано меню команды, 4 — выбирает команду, 5 — входит в игру.
     *
     * Pawn: `CBasePlayer::m_iJoiningState`, `JoinState`
     */
    get joiningState(): number;
    set joiningState(value: number);
    /**
     * Камера (trigger_camera), через которую смотрит игрок, пока выбирает команду.
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
     * Модель игрока, номером: 1 — urban, 2 — terror, 3 — leet, 4 — arctic, 5 — gsg9, 6 — gign, 7 — sas, 8 — guerilla, 9 — vip, 10 — militia, 11 — spetsnaz.
     *
     * Pawn: `CBasePlayer::m_iModelName`, `MODEL_*`
     */
    get modelName(): number;
    set modelName(value: number);
    /**
     * Число союзников, убитых игроком; при mp_autokick его выгоняют, когда оно доходит до mp_max_teamkills.
     *
     * Pawn: `CBasePlayer::m_iTeamKills`
     */
    get teamKills(): number;
    set teamKills(value: number);
    /**
     * Чат, который игрок скрывает (команда ignoremsg): 0 — ничей, 1 — врагов, 2 — всех.
     *
     * Pawn: `CBasePlayer::m_iIgnoreGlobalChat`, `IGNOREMSG_*`
     */
    get ignoreGlobalChat(): number;
    set ignoreGlobalChat(value: number);
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
     * Число радиосообщений, оставшихся у игрока до следующего появления (mp_radio_maxinround, по умолчанию 60); на 0 его радио молчит.
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
     * Старое меню, которое игра открыла игроку: 0 — никакое, 1 и 2 — меню команды, 3 — меню модели, с 4 по 10 — меню закупки, с 11 по 13 — меню радио.
     *
     * Pawn: `CBasePlayer::m_iMenu`, `Menu_*`
     */
    get menu(): number;
    set menu(value: number);
    /**
     * Цель слежения игрока: ставится в 1 при появлении, игра её не читает.
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
     * userid игрока, за кик которого проголосовал этот (команда vote); 0 — ни за кого.
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
     * `true`, если игрок убил союзника; при mp_tkpunish его накажут в начале следующего раунда.
     *
     * Pawn: `CBasePlayer::m_bJustKilledTeammate`
     */
    get justKilledTeammate(): boolean;
    set justKilledTeammate(value: boolean);
    /**
     * Число заложников, убитых игроком; сверх mp_hostagepenalty игра его выгоняет.
     *
     * Pawn: `CBasePlayer::m_iHostagesKilled`
     */
    get hostagesKilled(): number;
    set hostagesKilled(value: number);
    /**
     * Номер карты, за которую игрок проголосовал через votemap; 0 — ни за какую.
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
    get punishedForTk(): boolean;
    set punishedForTk(value: boolean);
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
     * Точка закладки бомбы, в которой стоит игрок, или 0.
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
     * Дополнительные виды звука, которые игрок издаёт для монстров до stopExtraSoundTime.
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
     * Игровое время, когда extraSoundTypes игрока сбросится.
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
    get flashLightTime(): number;
    set flashLightTime(value: number);
    /**
     * Заряд фонарика игрока, от 0 до 100.
     *
     * Pawn: `CBasePlayer::m_iFlashBattery`
     */
    get flashBattery(): number;
    set flashBattery(value: number);
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
     * Звуковая область (env_sound), чей эффект помещения сейчас действует на игрока.
     *
     * Pawn: `CBasePlayer::m_pentSndLast`
     */
    get sndLast(): number;
    set sndLast(value: number);
    /**
     * Эффект помещения (эхо) звуковой области игрока, 0 — нет.
     *
     * Pawn: `CBasePlayer::m_flSndRoomtype`
     */
    get sndRoomtype(): number;
    set sndRoomtype(value: number);
    /**
     * Расстояние от игрока до его звуковой области.
     *
     * Pawn: `CBasePlayer::m_flSndRange`
     */
    get sndRange(): number;
    set sndRange(value: number);
    /**
     * Флаг игрока «есть новые патроны для отправки» из Half-Life. В CS не используется.
     *
     * Pawn: `CBasePlayer::m_fNewAmmo`
     */
    get newAmmo(): number;
    set newAmmo(value: number);
    /**
     * Физическое состояние игрока, битами: 1 — на лестнице, 2 — на поезде, 8 — приседает, 16 — что-то использует, 32 — закреплённый наблюдатель.
     *
     * Pawn: `CBasePlayer::m_afPhysicsFlags`, `PFLAG_*`
     */
    get physicsFlags(): number;
    set physicsFlags(value: number);
    /**
     * Игровое время, когда команда kill снова сработает для игрока, — через секунду после прошлой.
     *
     * Pawn: `CBasePlayer::m_fNextSuicideTime`
     */
    get nextSuicideTime(): number;
    set nextSuicideTime(value: number);
    /**
     * Таймер покоя игрока из Half-Life; CS держит его у оружия (timeWeaponIdle у Weapon), а этот не использует.
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
     * Игровое время следующей фразы костюма HEV (Half-Life); 0 — нет.
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
    get tbdPrev(): number;
    set tbdPrev(value: number);
    /**
     * Расстояние до ближайшей радиации — для счётчика Гейгера из Half-Life.
     *
     * Pawn: `CBasePlayer::m_flgeigerRange`
     */
    get flgeigerRange(): number;
    set flgeigerRange(value: number);
    /**
     * Игровое время следующего обновления счётчика Гейгера (Half-Life).
     *
     * Pawn: `CBasePlayer::m_flgeigerDelay`
     */
    get flgeigerDelay(): number;
    set flgeigerDelay(value: number);
    /**
     * Показание счётчика Гейгера, последним отправленное клиенту (Half-Life).
     *
     * Pawn: `CBasePlayer::m_igeigerRangePrev`
     */
    get igeigerRangePrev(): number;
    set igeigerRangePrev(value: number);
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
    get idrowndmg(): number;
    set idrowndmg(value: number);
    /**
     * Часть урона от утопления, уже возвращённая игроку.
     *
     * Pawn: `CBasePlayer::m_idrownrestored`
     */
    get idrownrestored(): number;
    set idrownrestored(value: number);
    /**
     * Виды урона, последними показанные на HUD игрока, битами; -1 — игра отправит их заново.
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
     * Управление поездом на HUD игрока: 0 — нет, от 1 до 5 — положение рычага, плюс биты «изменилось» и «активно».
     *
     * Pawn: `CBasePlayer::m_iTrain`, `TRAIN_*`
     */
    get train(): number;
    set train(value: number);
    /**
     * `false`, когда список оружия игрока нужно отправить заново.
     *
     * Pawn: `CBasePlayer::m_fWeapon`
     */
    get weapon(): boolean;
    set weapon(value: boolean);
    /**
     * Стационарное оружие (func_tank), которым пользуется игрок.
     *
     * Pawn: `CBasePlayer::m_pTank`
     */
    get tank(): number;
    set tank(value: number);
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
    get longJump(): boolean;
    set longJump(value: boolean);
    /**
     * Игровое время, с которого игрок считается крадущимся (Half-Life).
     *
     * Pawn: `CBasePlayer::m_tSneaking`
     */
    get sneaking(): number;
    set sneaking(value: number);
    /**
     * Счётчик обновления игрока: ставится в 5 при сбросе, игра его не читает.
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
    get clientHealth(): number;
    set clientHealth(value: number);
    /**
     * Броня, последней отправленная в HUD игрока; -1 — игра отправит её заново.
     *
     * Pawn: `CBasePlayer::m_iClientBattery`
     */
    get clientBattery(): number;
    set clientBattery(value: number);
    /**
     * Скрытые части HUD игрока: `["Money", "Timer"]`; изменение игра отправляет сама.
     *
     * Pawn: `CBasePlayer::m_iHideHUD`
     */
    get hideHud(): HideHud[];
    set hideHud(values: HideHud[]);
    /**
     * Скрытые части HUD, последними отправленные игроку; если они отличаются от hideHud, игра отправит hideHud.
     *
     * Pawn: `CBasePlayer::m_iClientHideHUD`
     */
    get clientHideHud(): HideHud[];
    set clientHideHud(values: HideHud[]);
    /**
     * Поле зрения, последним отправленное игроку; если своя копия игры отличается, игра отправит её.
     *
     * Pawn: `CBasePlayer::m_iClientFOV`
     */
    get clientFov(): number;
    set clientFov(value: number);
    /**
     * Число появлений игрока в этом раунде; без mp_forcerespawn второй раз его не пустят.
     *
     * Pawn: `CBasePlayer::m_iNumSpawns`
     */
    get numSpawns(): number;
    set numSpawns(value: number);
    /**
     * Сущность наблюдателя, привязанная к игроку; игра её не создаёт и только удаляет, когда игрок отключается.
     *
     * Pawn: `CBasePlayer::m_pObserver`
     */
    get observer(): number;
    set observer(value: number);
    /**
     * Оружие в руках игрока или null. Только чтение.
     *
     * Pawn: `CBasePlayer::m_pActiveItem`
     */
    get activeItem(): Weapon | null;
    /**
     * Оружие, которое, по последнему сообщению клиенту игрока, у него в руках. Только чтение.
     *
     * Pawn: `CBasePlayer::m_pClientActiveItem`
     */
    get clientActiveItem(): Weapon | null;
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
    get onTarget(): boolean;
    set onTarget(value: boolean);
    /**
     * Игровое время следующего обновления строки статуса игрока (имя под прицелом); раз в 0.2 секунды.
     *
     * Pawn: `CBasePlayer::m_flNextSBarUpdateTime`
     */
    get nextSBarUpdateTime(): number;
    set nextSBarUpdateTime(value: number);
    /**
     * Игровое время, до которого держится строка статуса об игроке под прицелом, — 2 секунды после того, как он ушёл из прицела.
     *
     * Pawn: `CBasePlayer::m_flStatusBarDisappearDelay`
     */
    get statusBarDisappearDelay(): number;
    set statusBarDisappearDelay(value: number);
    /**
     * Горизонтальная поправка автоприцела, последней отправленная клиенту игрока.
     *
     * Pawn: `CBasePlayer::m_lastx`
     */
    get lastx(): number;
    set lastx(value: number);
    /**
     * Вертикальная поправка автоприцела, последней отправленная клиенту игрока.
     *
     * Pawn: `CBasePlayer::m_lasty`
     */
    get lasty(): number;
    set lasty(value: number);
    /**
     * Число кадров в собственном спрей-логотипе игрока; -1 — логотипа нет.
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
     * Номер собственной модели игрока; игра возвращает к нему modelIndex, например при появлении.
     *
     * Pawn: `CBasePlayer::m_modelIndexPlayer`
     */
    get modelIndexPlayer(): number;
    set modelIndexPlayer(value: number);
    /**
     * Анимация ног, которую игра выбрала игроку в этом кадре.
     *
     * Pawn: `CBasePlayer::m_iGaitsequence`
     */
    get gaitsequence(): number;
    set gaitsequence(value: number);
    /**
     * Позиция в анимации ног игрока, в кадрах.
     *
     * Pawn: `CBasePlayer::m_flGaitframe`
     */
    get gaitframe(): number;
    set gaitframe(value: number);
    /**
     * Направление ног игрока, в градусах; догоняет направление тела.
     *
     * Pawn: `CBasePlayer::m_flGaityaw`
     */
    get gaityaw(): number;
    set gaityaw(value: number);
    /**
     * Позиция игрока при прошлом обновлении анимации — чтобы оценить его скорость.
     *
     * Pawn: `CBasePlayer::m_prevgaitorigin`
     */
    get prevgaitorigin(): Vector;
    set prevgaitorigin(value: number[]);
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
     * Настройка _cl_autowepswitch игрока: 0 — не переключаться на подобранное оружие, 1 — всегда, 2 — если не стреляет.
     *
     * Pawn: `CBasePlayer::m_iAutoWepSwitch`
     */
    get autoWepSwitch(): number;
    set autoWepSwitch(value: number);
    /**
     * `true`, если игрок пользуется графическими (VGUI) меню, — его настройка _vgui_menus.
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
     * Сила ослепления игрока, от 0 до 255; 255 — полностью слеп.
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
     * Игровое время начала полосы прогресса игрока (разминирование, закладка); 0 — нет.
     *
     * Pawn: `CBasePlayer::m_progressStart`
     */
    get progressStart(): number;
    set progressStart(value: number);
    /**
     * Игровое время, когда полоса прогресса игрока заполнится.
     *
     * Pawn: `CBasePlayer::m_progressEnd`
     */
    get progressEnd(): number;
    set progressEnd(value: number);
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
     * Остаток Condition Zero (тишина, спокойно, напряжённо); игра его не использует.
     *
     * Pawn: `CBasePlayer::m_musicState`
     */
    get musicState(): number;
    set musicState(value: number);
    /**
     * Деньги игрока, последними отправленные в таблицы счёта других игроков.
     *
     * Pawn: `CBasePlayer::m_iLastAccount`
     */
    get lastAccount(): number;
    set lastAccount(value: number);
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
     * Игрок, у которого оружие, или null, если оно лежит на земле. Только чтение.
     *
     * Pawn: `CBasePlayerItem::m_pPlayer`
     */
    get player(): Player | null;
    /**
     * Следующее оружие в том же слоте инвентаря (гранаты делят один), или null. Только чтение.
     *
     * Pawn: `CBasePlayerItem::m_pNext`
     */
    get next(): Weapon | null;
    /**
     * Щелчок пустого оружия: 1, если он может прозвучать при следующей атаке.
     *
     * Pawn: `CBasePlayerWeapon::m_iPlayEmptySound` (reapi `m_Weapon_iPlayEmptySound`)
     */
    get playEmptySound(): number;
    set playEmptySound(value: number);
    /**
     * Отметка «стрельба впустую»: 1, пока игрок жмёт атаку с пустым магазином.
     *
     * Pawn: `CBasePlayerWeapon::m_fFireOnEmpty` (reapi `m_Weapon_fFireOnEmpty`)
     */
    get fireOnEmpty(): number;
    set fireOnEmpty(value: number);
    /**
     * Время до следующего выстрела оружия, в секундах; отсчитывается само: около 0.1 после выстрела AK-47, 1.45 после AWP.
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
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /**
     * Вид патронов оружия — номер запаса патронов игрока, из которого оно берёт; -1 — никаких (нож).
     *
     * Pawn: `CBasePlayerWeapon::m_iPrimaryAmmoType` (reapi `m_Weapon_iPrimaryAmmoType`)
     */
    get primaryAmmoType(): number;
    set primaryAmmoType(value: number);
    /**
     * Номер запаса вторичных патронов оружия; у оружия CS их нет (-1).
     *
     * Pawn: `CBasePlayerWeapon::m_iSecondaryAmmoType` (reapi `m_Weapon_iSecondaryAmmoType`)
     */
    get secondaryAmmoType(): number;
    set secondaryAmmoType(value: number);
    /**
     * Патроны в магазине оружия: 30 у полного AK-47; -1 у ножа, у которого магазина нет.
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
    get clientClip(): number;
    set clientClip(value: number);
    /**
     * Состояние оружия (в руках или нет), последним отправленное в HUD игрока.
     *
     * Pawn: `CBasePlayerWeapon::m_iClientWeaponState` (reapi `m_Weapon_iClientWeaponState`)
     */
    get clientWeaponState(): number;
    set clientWeaponState(value: number);
    /**
     * Отметка перезарядки оружия: 1, пока оно перезаряжается.
     *
     * Pawn: `CBasePlayerWeapon::m_fInReload` (reapi `m_Weapon_fInReload`)
     */
    get inReload(): number;
    set inReload(value: number);
    /**
     * Стадия поштучной перезарядки дробовика: 0 — не перезаряжается, 1 — начало, 2 — вставляет патрон.
     *
     * Pawn: `CBasePlayerWeapon::m_fInSpecialReload` (reapi `m_Weapon_fInSpecialReload`)
     */
    get inSpecialReload(): number;
    set inSpecialReload(value: number);
    /**
     * Патроны, которые оружие даёт при первом подборе; 0 у выброшенного игроком (только магазин).
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
     * Текущий разброс оружия: растёт при стрельбе и возвращается; у каждого оружия свои пределы (0.2 у свежего AK-47).
     *
     * Pawn: `CBasePlayerWeapon::m_flAccuracy` (reapi `m_Weapon_flAccuracy`)
     */
    get accuracy(): number;
    set accuracy(value: number);
    /**
     * Игровое время последнего выстрела пистолета — для его точности.
     *
     * Pawn: `CBasePlayerWeapon::m_flLastFire` (reapi `m_Weapon_flLastFire`)
     */
    get lastFire(): number;
    set lastFire(value: number);
    /**
     * Выстрелы в текущей очереди оружия; с ними растёт отдача, и счёт сбрасывается, когда игрок перестаёт стрелять.
     *
     * Pawn: `CBasePlayerWeapon::m_iShotsFired` (reapi `m_Weapon_iShotsFired`)
     */
    get shotsFired(): number;
    set shotsFired(value: number);
    /**
     * Игровое время следующего патрона очереди Glock; 0 — очереди нет.
     *
     * Pawn: `CBasePlayerWeapon::m_flGlock18Shoot` (reapi `m_Weapon_flGlock18Shoot`)
     */
    get glock18Shoot(): number;
    set glock18Shoot(value: number);
    /**
     * Патроны, которые Glock выпустил в текущей очереди.
     *
     * Pawn: `CBasePlayerWeapon::m_iGlock18ShotsFired` (reapi `m_Weapon_iGlock18ShotsFired`)
     */
    get glock18ShotsFired(): number;
    set glock18ShotsFired(value: number);
    /**
     * Игровое время следующего патрона очереди FAMAS; 0 — очереди нет.
     *
     * Pawn: `CBasePlayerWeapon::m_flFamasShoot` (reapi `m_Weapon_flFamasShoot`)
     */
    get famasShoot(): number;
    set famasShoot(value: number);
    /**
     * Патроны, которые FAMAS выпустил в текущей очереди.
     *
     * Pawn: `CBasePlayerWeapon::m_iFamasShotsFired` (reapi `m_Weapon_iFamasShotsFired`)
     */
    get famasShotsFired(): number;
    set famasShotsFired(value: number);
    /**
     * Разброс очереди FAMAS, сохранённый для её следующих патронов.
     *
     * Pawn: `CBasePlayerWeapon::m_fBurstSpread` (reapi `m_Weapon_fBurstSpread`)
     */
    get burstSpread(): number;
    set burstSpread(value: number);
    /**
     * Режимы оружия, битами: 1 — глушитель на USP, 2 — очередь у Glock, 4 — глушитель на M4A1, 8 — Elites стреляют левым, 16 — очередь у FAMAS, 32 — щит поднят.
     *
     * Pawn: `CBasePlayerWeapon::m_iWeaponState` (reapi `m_Weapon_iWeaponState`), `WPNSTATE_*`
     */
    get weaponState(): number;
    set weaponState(value: number);
    /**
     * Время до следующего патрона при перезарядке дробовика, в секундах; отсчитывается вниз.
     *
     * Pawn: `CBasePlayerWeapon::m_flNextReload` (reapi `m_Weapon_flNextReload`)
     */
    get nextReload(): number;
    set nextReload(value: number);
    /**
     * Игровое время, когда shotsFired уменьшится на единицу после того, как игрок перестал стрелять.
     *
     * Pawn: `CBasePlayerWeapon::m_flDecreaseShotsFired` (reapi `m_Weapon_flDecreaseShotsFired`)
     */
    get decreaseShotsFired(): number;
    set decreaseShotsFired(value: number);
    /**
     * Событие выстрела Glock (подгруженное).
     *
     * Pawn: `CBasePlayerWeapon::m_usFireGlock18` (reapi `m_Weapon_usFireGlock18`)
     */
    get fireGlock18(): number;
    set fireGlock18(value: number);
    /**
     * Событие выстрела FAMAS (подгруженное).
     *
     * Pawn: `CBasePlayerWeapon::m_usFireFamas` (reapi `m_Weapon_usFireFamas`)
     */
    get fireFamas(): number;
    set fireFamas(value: number);
    /**
     * Задержка между двумя последними выстрелами оружия, в секундах; по ней игра выравнивает темп стрельбы.
     *
     * Pawn: `CBasePlayerWeapon::m_flPrevPrimaryAttack` (reapi `m_Weapon_flPrevPrimaryAttack`)
     */
    get prevPrimaryAttack(): number;
    set prevPrimaryAttack(value: number);
    /**
     * Игровое время последнего выстрела оружия; 0 до первого выстрела.
     *
     * Pawn: `CBasePlayerWeapon::m_flLastFireTime` (reapi `m_Weapon_flLastFireTime`)
     */
    get lastFireTime(): number;
    set lastFireTime(value: number);
}
