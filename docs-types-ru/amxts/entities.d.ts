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
    /** Какая это сущность: "player", "weaponbox", "grenade", "func_door". `pev->classname`, строка. */
    get classname(): string;
    set classname(value: string);
    /** Глобальное имя, по которому сущность переносит состояние между уровнями (одиночные карты). `pev->globalname`, строка. */
    get globalName(): string;
    set globalName(value: string);
    /** Где сущность, в единицах мира. Присваивание перемещает её правильно (SET_ORIGIN), и столкновения следуют за ней. `pev->origin`, вектор. */
    get origin(): Vector;
    set origin(value: number[]);
    /** Сохранённая позиция; что в ней, зависит от сущности (разбиваемая хранит здесь точку появления). `pev->oldorigin`, вектор. */
    get oldOrigin(): Vector;
    set oldOrigin(value: number[]);
    /** Скорость и направление движения, единиц в секунду: бегущий игрок — около 250. `pev->velocity`, вектор. */
    get velocity(): Vector;
    set velocity(value: number[]);
    /** Добавочная скорость от того, в чём стоит сущность, — конвейер, trigger_push, течение. Единиц в секунду. `pev->basevelocity`, вектор. */
    get baseVelocity(): Vector;
    set baseVelocity(value: number[]);
    /** Скорость конвейера для предсказания движения на клиенте; движок обнуляет её каждый кадр игрока. `pev->clbasevelocity`, вектор. */
    get clBaseVelocity(): Vector;
    set clBaseVelocity(value: number[]);
    /** Направление, в котором едет дверь, платформа или кнопка; вычисляется из углов при появлении. `pev->movedir`, вектор. */
    get moveDir(): Vector;
    set moveDir(value: number[]);
    /** Как повёрнута модель: тангаж, рысканье, крен в градусах. У игрока следует за взглядом; чтобы развернуть взгляд, поставьте вместе с fixAngle. `pev->angles`, вектор. */
    get angles(): Vector;
    set angles(value: number[]);
    /** Скорость вращения, градусов в секунду по каждой оси. `pev->avelocity`, вектор. */
    get angularVelocity(): Vector;
    set angularVelocity(value: number[]);
    /** Толчок взгляда от отдачи или попадания, в градусах; движок сам гасит его до нуля. `pev->punchangle`, вектор. */
    get punchAngle(): Vector;
    set punchAngle(value: number[]);
    /** Куда смотрит игрок: тангаж (вниз — положительный), рысканье, крен в градусах. Только у игроков. `pev->v_angle`, вектор. */
    get viewAngle(): Vector;
    set viewAngle(value: number[]);
    /** Где окажется предсказываемый снаряд; уходит клиенту вместе со starttime и impacttime. `pev->endpos`, вектор. */
    get endPos(): Vector;
    set endPos(value: number[]);
    /** Откуда летит предсказываемый снаряд; уходит клиенту вместе с endpos. `pev->startpos`, вектор. */
    get startPos(): Vector;
    set startPos(value: number[]);
    /** Игровое время, когда предсказываемый снаряд долетит до endpos. `pev->impacttime`, дробное. */
    get impactTime(): number;
    set impactTime(value: number);
    /** Игровое время, когда предсказываемый снаряд вылетел из startpos. `pev->starttime`, дробное. */
    get startTime(): number;
    set startTime(value: number);
    /** 1 — на следующем кадре развернуть взгляд игрока по его angles, 2 — повернуть взгляд на рысканье из angularVelocity; потом движок сбрасывает в 0. `pev->fixangle`, целое. */
    get fixAngle(): number;
    set fixAngle(value: number);
    /** Тангаж, к которому поворачивается монстр, в градусах. CS его не использует. `pev->idealpitch`, дробное. */
    get idealPitch(): number;
    set idealPitch(value: number);
    /** Скорость поворота монстра по тангажу, градусов в секунду. CS его не использует. `pev->pitch_speed`, дробное. */
    get pitchSpeed(): number;
    set pitchSpeed(value: number);
    /** Рысканье, к которому поворачивается монстр, в градусах; momentary_rot_button хранит здесь своё положение. `pev->ideal_yaw`, дробное. */
    get idealYaw(): number;
    set idealYaw(value: number);
    /** Скорость поворота монстра, градусов в секунду. `pev->yaw_speed`, дробное. */
    get yawSpeed(): number;
    set yawSpeed(value: number);
    /** Номер подгруженной модели сущности; 0 — не рисуется. `pev->modelindex`, целое. */
    get modelIndex(): number;
    set modelIndex(value: number);
    /** Путь к модели: "models/w_c4.mdl" или "*12" у браша карты. Запись меняет только строку — entity_set_model ставит ещё modelIndex и размер. `pev->model`, строка. */
    get model(): string;
    set model(value: string);
    /** Модель оружия от первого лица, которую видит сам игрок: "models/v_knife.mdl". `pev->viewmodel`, целое. */
    get viewModel(): number;
    set viewModel(value: number);
    /** Модель оружия в руках, которую видят другие: "models/p_knife.mdl". `pev->weaponmodel`, целое. */
    get weaponModel(): number;
    set weaponModel(value: number);
    /** Нижний угол габаритов в координатах мира; движок пересчитывает его при перемещении. `pev->absmin`, вектор. */
    get absMin(): Vector;
    set absMin(value: number[]);
    /** Верхний угол габаритов в координатах мира; движок пересчитывает его при перемещении. `pev->absmax`, вектор. */
    get absMax(): Vector;
    set absMax(value: number[]);
    /** Нижний угол габаритов относительно origin: (-16, -16, -36) у стоящего игрока. Ставится через entity_set_size, чтобы size и absMin пересчитались. `pev->mins`, вектор. */
    get mins(): Vector;
    set mins(value: number[]);
    /** Верхний угол габаритов относительно origin: (16, 16, 36) у стоящего игрока. Ставится через entity_set_size, чтобы size и absMax пересчитались. `pev->maxs`, вектор. */
    get maxs(): Vector;
    set maxs(value: number[]);
    /** Размеры габаритов, maxs — mins. `pev->size`, вектор. */
    get size(): Vector;
    set size(value: number[]);
    /** Собственные часы двери, платформы или поезда (MOVETYPE_PUSH): идут, только пока сущность движется, и её nextThink отсчитывается по ним. `pev->ltime`, дробное. */
    get localTime(): number;
    set localTime(value: number);
    /** Игровое время следующего think сущности; 0 и меньше — никогда. У MOVETYPE_PUSH отсчитывается по localTime. `pev->nextthink`, дробное. */
    get nextThink(): number;
    set nextThink(value: number);
    /** Как движется сущность: MOVETYPE_WALK у игрока, MOVETYPE_NONE стоит на месте, MOVETYPE_TOSS падает, MOVETYPE_BOUNCE отскакивает, MOVETYPE_FLY без гравитации, MOVETYPE_NOCLIP сквозь стены, MOVETYPE_FOLLOW держится за aimEntity. `pev->movetype`, целое. */
    get moveType(): number;
    set moveType(value: number);
    /** С чем сталкивается сущность: SOLID_NOT ни с чем, SOLID_TRIGGER только касание, SOLID_BBOX коробка, SOLID_SLIDEBOX коробка игрока, SOLID_BSP браш карты. `pev->solid`, целое. */
    get solid(): number;
    set solid(value: number);
    /** Какой скин модели рисуется, с 0. Браш карты хранит здесь своё содержимое (CONTENTS_WATER, CONTENTS_LADDER). `pev->skin`, целое. */
    get skin(): number;
    set skin(value: number);
    /** Какие подмодели модели рисуются — группы тела одним числом. `pev->body`, целое. */
    get body(): number;
    set body(value: number);
    /** Визуальные эффекты: "NoDraw" прячет сущность, "DimLight" и "BrightLight" освещают вокруг, "MuzzleFlash" — одна вспышка. `pev->effects`, битовая маска. */
    get effects(): Effect[];
    set effects(values: Effect[]);
    /** Множитель гравитации: 1 — обычная, 0.5 — половина. 0 тоже считается обычной. `pev->gravity`, дробное. */
    get gravity(): number;
    set gravity(value: number);
    /** Множитель трения о землю, 1 — обычное. У MOVETYPE_BOUNCE — насколько слабо отскакивает: 0 — отскок на полной скорости. `pev->friction`, дробное. */
    get friction(): number;
    set friction(value: number);
    /** Насколько освещено место, где стоит игрок, от 0 (темно) до 255; клиент присылает каждый кадр. `pev->light_level`, целое. */
    get lightLevel(): number;
    set lightLevel(value: number);
    /** Анимация, которую играет модель, — её номер в модели. `pev->sequence`, целое. */
    get sequence(): number;
    set sequence(value: number);
    /** Анимация ног игрока поверх sequence; 0 — нет. `pev->gaitsequence`, целое. */
    get gaitSequence(): number;
    set gaitSequence(value: number);
    /** Позиция в анимации, от 0 до 255 на всю последовательность; у спрайта — номер кадра. `pev->frame`, дробное. */
    get frame(): number;
    set frame(value: number);
    /** Игровое время, когда выставлен текущий кадр; клиент анимирует от него. `pev->animtime`, дробное. */
    get animTime(): number;
    set animTime(value: number);
    /** Скорость анимации: 1 — обычная, 0 — стоп, отрицательная — назад. `pev->framerate`, дробное. */
    get frameRate(): number;
    set frameRate(value: number);
    /** Масштаб спрайта при отрисовке: 1 — обычный размер. `pev->scale`, дробное. */
    get scale(): number;
    set scale(value: number);
    /** Как рисуется сущность: kRenderNormal, kRenderTransColor, kRenderTransTexture, kRenderGlow, kRenderTransAlpha, kRenderTransAdd. В прозрачных режимах renderAmount — непрозрачность. `pev->rendermode`, целое. */
    get renderMode(): number;
    set renderMode(value: number);
    /** Непрозрачность в прозрачном renderMode, от 0 (невидим) до 255; с kRenderFxGlowShell — толщина свечения. `pev->renderamt`, дробное. */
    get renderAmount(): number;
    set renderAmount(value: number);
    /** Цвет для renderMode и renderFx, красный, зелёный, синий от 0 до 255: цвет свечения kRenderFxGlowShell. `pev->rendercolor`, вектор. */
    get renderColor(): Vector;
    set renderColor(value: number[]);
    /** Эффект отрисовки: kRenderFxGlowShell — цветное свечение вокруг модели, kRenderFxPulseSlow, kRenderFxHologram и другие. `pev->renderfx`, целое. */
    get renderFx(): number;
    set renderFx(value: number);
    /** Какое оружие есть у игрока, битами: 1 << номер оружия; старший бит — костюм, без которого нет HUD. Запись оружия не даёт и не отбирает. `pev->weapons`, целое. */
    get weapons(): number;
    set weapons(value: number);
    /** Можно ли ранить: 0 — нет (бессмертие), 1 — да, 2 — да, и на него работает автоприцел. `pev->takedamage`, дробное. */
    get takeDamage(): number;
    set takeDamage(value: number);
    /** Стадия смерти: DEAD_NO жив, DEAD_DYING падает, DEAD_DEAD мёртв, DEAD_RESPAWNABLE ждёт возрождения. `pev->deadflag`, целое. */
    get deadFlag(): number;
    set deadFlag(value: number);
    /** Положение глаз относительно origin: (0, 0, 17) стоя, (0, 0, 12) присев. `pev->view_ofs`, вектор. */
    get viewOffset(): Vector;
    set viewOffset(value: number[]);
    /** Кнопки, которые игрок держит в этом кадре: "Attack", "Jump", "Duck", "Use", ... `pev->button`, битовая маска. */
    get buttons(): Button[];
    set buttons(values: Button[]);
    /** Команда impulse от игрока: 100 — фонарик, 201 — спрей. Игра обнуляет её, когда обработает. `pev->impulse`, целое. */
    get impulse(): number;
    set impulse(value: number);
    /** Следующая сущность в списке, который строит движок или игра, — например, результат поиска в сфере. `pev->chain`, номер сущности. */
    get chain(): number;
    set chain(value: number);
    /** Что последним ранило игрока: стрелявший — для пули, граната, trigger_hurt. `pev->dmg_inflictor`, номер сущности. */
    get damageInflictor(): number;
    set damageInflictor(value: number);
    /** Сущность, за которой охотится монстр, — его враг. `pev->enemy`, номер сущности. */
    get enemy(): number;
    set enemy(value: number);
    /** Сущность, к которой эта прикреплена через MOVETYPE_FOLLOW, — двигается вместе с ней. `pev->aiment`, номер сущности. */
    get aimEntity(): number;
    set aimEntity(value: number);
    /** Чья это сущность: бросивший гранату, держащий оружие. Сущность не сталкивается со своим владельцем. `pev->owner`, номер сущности. */
    get owner(): number;
    set owner(value: number);
    /** На чём стоит сущность: мир (0) или другая сущность. `pev->groundentity`, номер сущности. */
    get groundEntity(): number;
    set groundEntity(value: number);
    /** Биты, которые маппер отметил у сущности на карте; значение каждого зависит от classname. `pev->spawnflags`, целое. */
    get spawnFlags(): number;
    set spawnFlags(value: number);
    /** Флаги состояния: "OnGround", "Ducking", "InWater", "Frozen", "FakeClient" у бота, "KillMe" — на удаление. `pev->flags`, битовая маска. */
    get flags(): EntityFlag[];
    set flags(values: EntityFlag[]);
    /** Цвета игрока Half-Life: верх в младшем байте, низ в старшем; игроку движок ставит сюда его номер. `pev->colormap`, целое. */
    get colorMap(): number;
    set colorMap(value: number);
    /** Сколько здоровья может быть у сущности максимум: лечение на нём останавливается. Игроку сюда ставится здоровье при появлении, 100. `pev->max_health`, дробное. */
    get maxHealth(): number;
    set maxHealth(value: number);
    /** У игрока — сколько осталось прыжка из воды, в миллисекундах. `pev->teleport_time`, дробное. */
    get teleportTime(): number;
    set teleportTime(value: number);
    /** Тип брони Half-Life. CS его не использует. `pev->armortype`, дробное. */
    get armorType(): number;
    set armorType(value: number);
    /** Очки брони, от 0 до 100 в обычной игре. Какая это броня — в kevlar. `pev->armorvalue`, дробное. */
    get armorValue(): number;
    set armorValue(value: number);
    /** Насколько глубоко в воде: 0 — не в воде, 1 — ноги, 2 — по пояс, 3 — с головой. `pev->waterlevel`, целое. */
    get waterLevel(): number;
    set waterLevel(value: number);
    /** В чём находится сущность: CONTENTS_EMPTY (-1), CONTENTS_WATER (-3), CONTENTS_SLIME (-4), CONTENTS_LAVA (-5). `pev->watertype`, целое. */
    get waterType(): number;
    set waterType(value: number);
    /** targetName сущностей, которые эта запускает при срабатывании: дверь у кнопки. `pev->target`, строка. */
    get target(): string;
    set target(value: string);
    /** Собственное имя сущности на карте, на которое указывает target других. `pev->targetname`, строка. */
    get targetName(): string;
    set targetName(value: string);
    /** У игрока — его имя, как его последним записал движок; у сущности карты смысл зависит от classname. `pev->netname`, строка. */
    get netName(): string;
    set netName(value: string);
    /** Текст, который показывает сущность, — у game_text или env_message; у worldspawn — название карты. `pev->message`, строка. */
    get message(): string;
    set message(value: string);
    /** Урон, полученный с последнего обновления HUD; игра обнуляет его, отправив индикатор урона. `pev->dmg_take`, дробное. */
    get damageTaken(): number;
    set damageTaken(value: number);
    /** Урон, поглощённый бронёй с последнего обновления HUD; обнуляется вместе с damageTaken. `pev->dmg_save`, дробное. */
    get damageSaved(): number;
    set damageSaved(value: number);
    /** Сколько урона наносит сущность: взрыв гранаты, удар trigger_hurt, дверь, которая давит. `pev->dmg`, дробное. */
    get damage(): number;
    set damage(value: number);
    /** Отметка игрового времени для урона во времени и для взрыва гранаты; смысл зависит от сущности. `pev->dmgtime`, дробное. */
    get damageTime(): number;
    set damageTime(value: number);
    /** Путь к звуку, который играет сущность, — например, звук движущейся двери. `pev->noise`, строка. */
    get noise(): string;
    set noise(value: string);
    /** Второй путь к звуку сущности, например, звук остановки двери. `pev->noise1`, строка. */
    get noise1(): string;
    set noise1(value: string);
    /** Третий путь к звуку сущности. `pev->noise2`, строка. */
    get noise2(): string;
    set noise2(value: string);
    /** Четвёртый путь к звуку сущности. `pev->noise3`, строка. */
    get noise3(): string;
    set noise3(value: string);
    /** Скорость двери, платформы или поезда, единиц в секунду. `pev->speed`, дробное. */
    get speed(): number;
    set speed(value: number);
    /** Игровое время, когда у игрока под водой кончится воздух и он начнёт тонуть; пока голова над водой, игра отодвигает его. `pev->air_finished`, дробное. */
    get airFinished(): number;
    set airFinished(value: number);
    /** Игровое время следующей боли от утопления или trigger_hurt; до него новой нет. `pev->pain_finished`, дробное. */
    get painFinished(): number;
    set painFinished(value: number);
    /** Игровое время, когда истечёт таймер карты-тренировки; больше в CS его никто не читает. `pev->radsuit_finished`, дробное. */
    get radsuitFinished(): number;
    set radsuitFinished(value: number);
    /** Сама сущность: edict, которому принадлежат эти поля. `pev->pContainingEntity`, номер сущности. */
    get containingEntity(): number;
    set containingEntity(value: number);
    /** У игроков в CS не используется; стеклянный func_breakable ставит себе 1, чтобы клиент рисовал на нём декали. `pev->playerclass`, целое. */
    get playerClass(): number;
    set playerClass(value: number);
    /** Предельная скорость бега игрока, единиц в секунду: 250 с ножом, 221 с AK-47. Игра сбрасывает её при смене оружия. `pev->maxspeed`, дробное. */
    get maxSpeed(): number;
    set maxSpeed(value: number);
    /** Поле зрения игрока в градусах, 90 — обычное. Игра держит свою копию для прицела и пишет её сюда при смене зума. `pev->fov`, дробное. */
    get fov(): number;
    set fov(value: number);
    /** Последняя сыгранная анимация оружия от первого лица — номер в модели. `pev->weaponanim`, целое. */
    get weaponAnim(): number;
    set weaponAnim(value: number);
    /** Уходит клиенту с данными игрока; сама CS его не ставит. `pev->pushmsec`, целое. */
    get pushMsec(): number;
    set pushMsec(value: number);
    /** 1, пока игрок приседает и ещё не сел полностью. `pev->bInDuck`, целое. */
    get inDuck(): number;
    set inDuck(value: number);
    /** Миллисекунд до следующего звука шага игрока. `pev->flTimeStepSound`, целое. */
    get timeStepSound(): number;
    set timeStepSound(value: number);
    /** Миллисекунд до следующего звука плавания игрока. `pev->flSwimTime`, целое. */
    get swimTime(): number;
    set swimTime(value: number);
    /** Приседание в процессе, в миллисекундах: движок начинает с 1000 и отсчитывает вниз. `pev->flDuckTime`, целое. */
    get duckTime(): number;
    set duckTime(value: number);
    /** Для какой ноги следующий звук шага; меняется с каждым шагом. `pev->iStepLeft`, целое. */
    get stepLeft(): number;
    set stepLeft(value: number);
    /** С какой скоростью падает игрок, единиц в секунду, вниз положительная; по ней при приземлении считается урон. `pev->flFallVelocity`, дробное. */
    get fallVelocity(): number;
    set fallVelocity(value: number);
    /** У игрока — принимает ли щит попадания: 0 — щит поднят, 1 — нет. `pev->gamestate`, целое. */
    get gameState(): number;
    set gameState(value: number);
    /** Кнопки, которые игрок держал в прошлом кадре: сравните с buttons, чтобы понять, что он только что нажал. `pev->oldbuttons`, битовая маска. */
    get oldButtons(): Button[];
    set oldButtons(values: Button[]);
    /** Биты групп: если заданы, трассировки и то, что отправляется игроку, пропускают сущности из других групп. `pev->groupinfo`, целое. */
    get groupInfo(): number;
    set groupInfo(value: number);
    /** Свободное поле: плагин хранит здесь своё значение на любой сущности, кроме игрока. У игрока это режим наблюдателя, и его ставит игра: 0 — нет, OBS_CHASE_LOCKED, OBS_CHASE_FREE, OBS_ROAMING, OBS_IN_EYE, OBS_MAP_FREE, OBS_MAP_CHASE. `pev->iuser1`, целое. */
    get iuser1(): number;
    set iuser1(value: number);
    /** Свободное поле: плагин хранит здесь своё значение на любой сущности, кроме игрока. У игрока это номер того, за кем он наблюдает (0 в свободном полёте), и его ставит игра. `pev->iuser2`, целое. */
    get iuser2(): number;
    set iuser2(value: number);
    /** Свободное поле: плагин хранит здесь своё значение на любой сущности, кроме игрока. У игрока занято: камера смерти держит здесь номер убийцы, а ReGameDLL читает из его битов запреты движения (16 — не приседать, 32 — не лазить по лестницам, 64 — не прыгать, 128 — без двойного приседания). `pev->iuser3`, целое. */
    get iuser3(): number;
    set iuser3(value: number);
    /** Свободное поле: плагин хранит здесь своё значение на любой сущности, кроме игрока. У игрока игра перезаписывает его каждый кадр: 1, пока он стоит на транспорте, иначе 0. `pev->iuser4`, целое. */
    get iuser4(): number;
    set iuser4(value: number);
    /** Свободное поле: плагин хранит здесь своё значение на любой сущности, кроме игрока. У игрока ReGameDLL обнуляет его вместе с fuser2 и fuser3, когда сбрасывает выносливость. `pev->fuser1`, дробное. */
    get fuser1(): number;
    set fuser1(value: number);
    /** Свободное поле: плагин хранит здесь своё значение на любой сущности, кроме игрока. У игрока это замедление после прыжка, в миллисекундах: при прыжке ставится около 1316 и отсчитывается вниз. `pev->fuser2`, дробное. */
    get fuser2(): number;
    set fuser2(value: number);
    /** Свободное поле: плагин хранит здесь своё значение на любой сущности, кроме игрока. У игрока ReGameDLL умножает на него движение, пока зажат +speed (0 — выключено); в noclip и наблюдении это ускорение. `pev->fuser3`, дробное. */
    get fuser3(): number;
    set fuser3(value: number);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->fuser4`, дробное. */
    get fuser4(): number;
    set fuser4(value: number);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->vuser1`, вектор. */
    get vuser1(): Vector;
    set vuser1(value: number[]);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->vuser2`, вектор. */
    get vuser2(): Vector;
    set vuser2(value: number[]);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->vuser3`, вектор. */
    get vuser3(): Vector;
    set vuser3(value: number[]);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->vuser4`, вектор. */
    get vuser4(): Vector;
    set vuser4(value: number[]);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->euser1`, номер сущности. */
    get euser1(): number;
    set euser1(value: number);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->euser2`, номер сущности. */
    get euser2(): number;
    set euser2(value: number);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->euser3`, номер сущности. */
    get euser3(): number;
    set euser3(value: number);
    /** Свободное поле: плагин хранит здесь своё значение, игра его не трогает. `pev->euser4`, номер сущности. */
    get euser4(): number;
    set euser4(value: number);
}
/** A player's members - CBaseEntity up to CBasePlayer - on top of its entvars. */
export declare class PlayerFields extends Entity {
    /** Счётчик патронов Half-Life; ReGameDLL его не использует. `CBaseEntity::currentammo`, дробное. */
    get currentammo(): number;
    set currentammo(value: number);
    /** Задумано как предел патронов buckshot у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_buckshot`, целое. */
    get maxammoBuckshot(): number;
    set maxammoBuckshot(value: number);
    /** Копия запаса патронов buckshot у игрока (M3, XM1014), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_buckshot`, целое. */
    get ammoBuckshot(): number;
    set ammoBuckshot(value: number);
    /** Задумано как предел патронов 9mm у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_9mm`, целое. */
    get maxammo9mm(): number;
    set maxammo9mm(value: number);
    /** Копия запаса патронов 9mm у игрока (Glock, Elites, MP5, TMP), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_9mm`, целое. */
    get ammo9mm(): number;
    set ammo9mm(value: number);
    /** Задумано как предел патронов 5.56mm у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_556nato`, целое. */
    get maxammo556nato(): number;
    set maxammo556nato(value: number);
    /** Копия запаса патронов 5.56mm у игрока (M4A1, FAMAS, Galil, AUG, SG552, SG550), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_556nato`, целое. */
    get ammo556nato(): number;
    set ammo556nato(value: number);
    /** Задумано как предел патронов 5.56mm box у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_556natobox`, целое. */
    get maxammo556natobox(): number;
    set maxammo556natobox(value: number);
    /** Копия запаса патронов 5.56mm box у игрока (M249), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_556natobox`, целое. */
    get ammo556natobox(): number;
    set ammo556natobox(value: number);
    /** Задумано как предел патронов 7.62mm у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_762nato`, целое. */
    get maxammo762nato(): number;
    set maxammo762nato(value: number);
    /** Копия запаса патронов 7.62mm у игрока (AK-47, Scout, G3SG1), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_762nato`, целое. */
    get ammo762nato(): number;
    set ammo762nato(value: number);
    /** Задумано как предел патронов .45 ACP у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_45acp`, целое. */
    get maxammo45acp(): number;
    set maxammo45acp(value: number);
    /** Копия запаса патронов .45 ACP у игрока (USP, MAC-10, UMP45), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_45acp`, целое. */
    get ammo45acp(): number;
    set ammo45acp(value: number);
    /** Задумано как предел патронов .50 AE у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_50ae`, целое. */
    get maxammo50ae(): number;
    set maxammo50ae(value: number);
    /** Копия запаса патронов .50 AE у игрока (Desert Eagle), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_50ae`, целое. */
    get ammo50ae(): number;
    set ammo50ae(value: number);
    /** Задумано как предел патронов .338 Magnum у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_338mag`, целое. */
    get maxammo338mag(): number;
    set maxammo338mag(value: number);
    /** Копия запаса патронов .338 Magnum у игрока (AWP), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_338mag`, целое. */
    get ammo338mag(): number;
    set ammo338mag(value: number);
    /** Задумано как предел патронов 5.7mm у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_57mm`, целое. */
    get maxammo57mm(): number;
    set maxammo57mm(value: number);
    /** Копия запаса патронов 5.7mm у игрока (P90, Five-seveN), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_57mm`, целое. */
    get ammo57mm(): number;
    set ammo57mm(value: number);
    /** Задумано как предел патронов .357 SIG у игрока; ReGameDLL его не использует. `CBaseEntity::maxammo_357sig`, целое. */
    get maxammo357sig(): number;
    set maxammo357sig(value: number);
    /** Копия запаса патронов .357 SIG у игрока (P228), обновляется из настоящего запаса при каждом изменении; запись патронов не даёт. `CBaseEntity::ammo_357sig`, целое. */
    get ammo357sig(): number;
    set ammo357sig(value: number);
    /** У гранаты — игровое время, когда выдернута чека (0 — не выдернута); у игрока поле есть, но не используется. `CBaseEntity::m_flStartThrow`, дробное. */
    get startThrow(): number;
    set startThrow(value: number);
    /** У гранаты — игровое время, когда отпущена кнопка атаки (-1, пока чека не выдернута); у игрока не используется. `CBaseEntity::m_flReleaseThrow`, дробное. */
    get releaseThrow(): number;
    set releaseThrow(value: number);
    /** У ножа — счётчик взмахов, по которому выбирается анимация удара слева или справа; у игрока не используется. `CBaseEntity::m_iSwing`, целое. */
    get swing(): number;
    set swing(value: number);
    /** Истина, когда игрок ушёл с сервера (или бота выгнали), пока слот не займёт кто-то другой. `CBaseEntity::has_disconnected`, логическое. */
    get hasDisconnected(): boolean;
    set hasDisconnected(value: boolean);
    /** С какой скоростью текущая анимация двигает модель по земле, единиц в секунду. `CBaseAnimating::m_flGroundSpeed`, дробное. */
    get groundSpeed(): number;
    set groundSpeed(value: number);
    /** Игровое время последней проверки событий анимации (шаги, звуки). `CBaseAnimating::m_flLastEventCheck`, дробное. */
    get lastEventCheck(): number;
    set lastEventCheck(value: number);
    /** Истина, когда текущая анимация доиграла до конца. `CBaseAnimating::m_fSequenceFinished`, целое. */
    get sequenceFinished(): number;
    set sequenceFinished(value: number);
    /** Истина, если текущая анимация зациклена. `CBaseAnimating::m_fSequenceLoops`, целое. */
    get sequenceLoops(): number;
    set sequenceLoops(value: number);
    /** Действие, которое сейчас анимирует модель (ACT_IDLE, ACT_RUN, ACT_WALK, ...); игра ставит его вместе с анимацией игрока. `CBaseMonster::m_Activity`, целое. */
    get activity(): number;
    set activity(value: number);
    /** Действие, на которое модель должна переключиться (ACT_*). `CBaseMonster::m_IdealActivity`, целое. */
    get idealActivity(): number;
    set idealActivity(value: number);
    /** Куда попала последняя пуля: HITGROUP_HEAD (1), HITGROUP_CHEST, HITGROUP_STOMACH, руки, ноги, HITGROUP_SHIELD; 0 — HITGROUP_GENERIC. `CBaseMonster::m_LastHitGroup`, целое. */
    get lastHitGroup(): number;
    set lastHitGroup(value: number);
    /** Виды урона с последнего обновления HUD: "Fall", "Bullet", "Burn", ...; отправив индикатор урона, игра оставляет только длительные. `CBaseMonster::m_bitsDamageType`, битовая маска. */
    get damageType(): Damage[];
    set damageType(values: Damage[]);
    /** Состояние ИИ монстра (заложника): покой, тревога, бой, смерть. `CBaseMonster::m_MonsterState`, целое. */
    get monsterState(): number;
    set monsterState(value: number);
    /** Состояние ИИ, в которое монстр (заложник) должен перейти. `CBaseMonster::m_IdealMonsterState`, целое. */
    get idealMonsterState(): number;
    set idealMonsterState(value: number);
    /** Биты того, что ИИ монстра замечает в этом think: видит врага, ранен, слышит звук. `CBaseMonster::m_afConditions`, целое. */
    get conditions(): number;
    set conditions(value: number);
    /** Биты, которые ИИ монстра помнит между think. `CBaseMonster::m_afMemory`, целое. */
    get memory(): number;
    set memory(value: number);
    /** Секунд до того, как игрок сможет пользоваться любым оружием; сам отсчитывается до 0. Игра ставит его при смене оружия и перезарядке. `CBaseMonster::m_flNextAttack`, дробное. */
    get nextAttack(): number;
    set nextAttack(value: number);
    /** Сущность, к которой идёт или за которой следует монстр: игрок, за которым идёт заложник. `CBaseMonster::m_hTargetEnt`, номер сущности. */
    get targetEnt(): number;
    set targetEnt(value: number);
    /** Поле зрения монстра как косинус половины конуса: 0.5 — обзор 120 градусов. `CBaseMonster::m_flFieldOfView`, дробное. */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    /** Цвет крови сущности: BLOOD_COLOR_RED (247), BLOOD_COLOR_YELLOW, DONT_BLEED (-1) — не кровоточит. `CBaseMonster::m_bloodColor`, целое. */
    get bloodColor(): number;
    set bloodColor(value: number);
    /** Где у монстра оружие относительно origin — откуда он стреляет. `CBaseMonster::m_HackedGunPos`, вектор. */
    get hackedGunPos(): Vector;
    set hackedGunPos(value: number[]);
    /** Где монстр последний раз видел врага. `CBaseMonster::m_vecEnemyLKP`, вектор. */
    get enemyLkp(): Vector;
    set enemyLkp(value: number[]);
    /** Случайное зерно текущей команды игрока; из него берётся разброс пуль, чтобы клиент мог его предсказать. `CBasePlayer::random_seed`, целое. */
    get randomSeed(): number;
    set randomSeed(value: number);
    /** Номер события кровотечения игрока; ReGameDLL его не использует. `CBasePlayer::m_usPlayerBleed`, целое. */
    get playerBleed(): number;
    set playerBleed(value: number);
    /** Игрок, за которым он наблюдает, если он зритель. `CBasePlayer::m_hObserverTarget`, номер сущности. */
    get observerTarget(): number;
    set observerTarget(value: number);
    /** Игровое время, когда примется следующая кнопка зрителя; игра разносит их на 0.2 секунды. `CBasePlayer::m_flNextObserverInput`, дробное. */
    get nextObserverInput(): number;
    set nextObserverInput(value: number);
    /** Номер оружия наблюдаемого игрока, последний раз показанный зрителю. `CBasePlayer::m_iObserverWeapon`, целое. */
    get observerWeapon(): number;
    set observerWeapon(value: number);
    /** Состояние бомбы у наблюдаемого игрока, последний раз показанное зрителю. `CBasePlayer::m_iObserverC4State`, целое. */
    get observerC4State(): number;
    set observerC4State(value: number);
    /** Есть ли у наблюдаемого игрока набор сапёра, как последний раз показано зрителю. `CBasePlayer::m_bObserverHasDefuser`, логическое. */
    get observerHasDefuser(): boolean;
    set observerHasDefuser(value: boolean);
    /** Режим наблюдения, который игрок выбрал последним (OBS_*); восстанавливается при следующем наблюдении. `CBasePlayer::m_iObserverLastMode`, целое. */
    get observerLastMode(): number;
    set observerLastMode(value: number);
    /** Игровое время, когда заложник перестанет вздрагивать от удара; у игрока не используется. `CBasePlayer::m_flFlinchTime`, дробное. */
    get flinchTime(): number;
    set flinchTime(value: number);
    /** Истина, если последнее попадание было сильным (больше 60 в голову, больше 20 в другое место), — для анимации боли. `CBasePlayer::m_bHighDamage`, логическое. */
    get highDamage(): boolean;
    set highDamage(value: boolean);
    /** Множитель скорости после попадания: меньше 1 — игрок замедлен, на земле он возвращается к 1 по 0.01 за кадр. `CBasePlayer::m_flVelocityModifier`, дробное. */
    get velocityModifier(): number;
    set velocityModifier(value: number);
    /** Зум (FOV), к которому вернуться после перезарядки или выстрела снайперской винтовки. `CBasePlayer::m_iLastZoom`, целое. */
    get lastZoom(): number;
    set lastZoom(value: number);
    /** Истина, если зум вернётся после выстрела. `CBasePlayer::m_bResumeZoom`, логическое. */
    get resumeZoom(): boolean;
    set resumeZoom(value: boolean);
    /** Игровое время, когда вылетит следующая гильза (AWP, Scout, дробовики); 0 — нет. `CBasePlayer::m_flEjectBrass`, дробное. */
    get ejectBrass(): number;
    set ejectBrass(value: number);
    /** Какая броня на игроке: ARMOR_NONE (0), ARMOR_KEVLAR (жилет), ARMOR_VESTHELM (жилет и шлем). `CBasePlayer::m_iKevlar`, целое. */
    get kevlar(): number;
    set kevlar(value: number);
    /** Истина, если игрок пережил прошлый раунд и сохраняет снаряжение; ложь — при появлении получит стандартное. `CBasePlayer::m_bNotKilled`, логическое. */
    get notKilled(): boolean;
    set notKilled(value: boolean);
    /** Деньги игрока. Запись не обновляет HUD; rg_add_account обновляет. `CBasePlayer::m_iAccount`, целое. */
    get account(): number;
    set account(value: number);
    /** Истина, если у игрока есть основное оружие (винтовка, дробовик, пистолет-пулемёт). `CBasePlayer::m_bHasPrimary`, логическое. */
    get hasPrimary(): boolean;
    set hasPrimary(value: boolean);
    /** ReGameDLL его только обнуляет. `CBasePlayer::m_flDeathThrowTime`, дробное. */
    get deathThrowTime(): number;
    set deathThrowTime(value: number);
    /** Куда отбросит тело при смерти: 0 — никуда, далее вперёд, назад, от попадания, от бомбы, от гранаты. `CBasePlayer::m_iThrowDirection`, целое. */
    get throwDirection(): number;
    set throwDirection(value: number);
    /** Игровое время последнего сообщения игрока в чат; сообщение раньше 0.66 секунды после него игра игнорирует. `CBasePlayer::m_flLastTalk`, дробное. */
    get lastTalk(): number;
    set lastTalk(value: number);
    /** Истина с подключения до первого входа в игру. `CBasePlayer::m_bJustConnected`, логическое. */
    get justConnected(): boolean;
    set justConnected(value: boolean);
    /** Ставится в истину при подключении; ReGameDLL его не читает. `CBasePlayer::m_bContextHelp`, логическое. */
    get contextHelp(): boolean;
    set contextHelp(value: boolean);
    /** Стадия входа в игру: 0 — вошёл, далее показ и чтение MOTD, показ меню команды, выбор команды, вход в игру. `CBasePlayer::m_iJoiningState`, целое. */
    get joiningState(): number;
    set joiningState(value: number);
    /** trigger_camera, через которую смотрит игрок, пока выбирает команду. `CBasePlayer::m_pIntroCamera`, номер сущности. */
    get introCamera(): number;
    set introCamera(value: number);
    /** Игровое время, когда вступительный вид переключится на следующую камеру (каждые 6 секунд). `CBasePlayer::m_fIntroCamTime`, дробное. */
    get introCamTime(): number;
    set introCamTime(value: number);
    /** Игровое время, когда игрок последний раз двигался или жал кнопку; от него считается кик за бездействие. `CBasePlayer::m_fLastMovement`, дробное. */
    get lastMovement(): number;
    set lastMovement(value: number);
    /** Истина, пока у игрока на экране брифинг карты. `CBasePlayer::m_bMissionBriefing`, логическое. */
    get missionBriefing(): boolean;
    set missionBriefing(value: boolean);
    /** Истина, если игрок сменил команду в этом раунде. `CBasePlayer::m_bTeamChanged`, логическое. */
    get teamChanged(): boolean;
    set teamChanged(value: boolean);
    /** Какая у игрока модель — номер ModelName: 1 urban, далее terror, leet, arctic, gsg9, gign, sas, guerilla, vip, ... `CBasePlayer::m_iModelName`, целое. */
    get modelName(): number;
    set modelName(value: number);
    /** Сколько союзников убил игрок; при mp_autokick его выгоняют на mp_max_teamkills. `CBasePlayer::m_iTeamKills`, целое. */
    get teamKills(): number;
    set teamKills(value: number);
    /** Чей чат игрок скрывает (команда ignoremsg): 0 — ничей, 1 — врагов, 2 — всех. `CBasePlayer::m_iIgnoreGlobalChat`, целое. */
    get ignoreGlobalChat(): number;
    set ignoreGlobalChat(value: number);
    /** Истина, если у игрока есть прибор ночного видения. `CBasePlayer::m_bHasNightVision`, логическое. */
    get hasNightVision(): boolean;
    set hasNightVision(value: boolean);
    /** Истина, пока прибор ночного видения включён. `CBasePlayer::m_bNightVisionOn`, логическое. */
    get nightVisionOn(): boolean;
    set nightVisionOn(value: boolean);
    /** Игровое время следующей проверки бездействия, каждые 5 секунд. `CBasePlayer::m_flIdleCheckTime`, дробное. */
    get idleCheckTime(): number;
    set idleCheckTime(value: number);
    /** Игровое время, когда игрок снова сможет пользоваться радио. `CBasePlayer::m_flRadioTime`, дробное. */
    get radioTime(): number;
    set radioTime(value: number);
    /** Сколько радиосообщений осталось у игрока до следующего появления (mp_radio_maxinround, по умолчанию 60); на 0 его радио молчит. `CBasePlayer::m_iRadioMessages`, целое. */
    get radioMessages(): number;
    set radioMessages(value: number);
    /** Истина, если игрок не слышит радио (ignorerad). `CBasePlayer::m_bIgnoreRadio`, логическое. */
    get ignoreRadio(): boolean;
    set ignoreRadio(value: boolean);
    /** Истина, пока игрок несёт бомбу. `CBasePlayer::m_bHasC4`, логическое. */
    get hasC4(): boolean;
    set hasC4(value: boolean);
    /** Истина, если у игрока есть набор сапёра. `CBasePlayer::m_bHasDefuser`, логическое. */
    get hasDefuser(): boolean;
    set hasDefuser(value: boolean);
    /** Истина, если игрока убил взрыв бомбы. `CBasePlayer::m_bKilledByBomb`, логическое. */
    get killedByBomb(): boolean;
    set killedByBomb(value: boolean);
    /** От взрыва к игроку; запоминается при попадании взрывом, чтобы отбросить тело при смерти. `CBasePlayer::m_vBlastVector`, вектор. */
    get blastVector(): Vector;
    set blastVector(value: number[]);
    /** Истина, если игрока убила граната. `CBasePlayer::m_bKilledByGrenade`, логическое. */
    get killedByGrenade(): boolean;
    set killedByGrenade(value: boolean);
    /** Биты уже показанных игроку разовых подсказок (несмотря на имя, целое). `CBasePlayer::m_flDisplayHistory`, целое. */
    get displayHistory(): number;
    set displayHistory(value: number);
    /** Какое старое меню игра открыла игроку: 0 — никакое, далее меню команды, модели, закупки, ... `CBasePlayer::m_iMenu`, целое. */
    get menu(): number;
    set menu(value: number);
    /** Ставится в 1 при появлении; ReGameDLL его не читает. `CBasePlayer::m_iChaseTarget`, целое. */
    get chaseTarget(): number;
    set chaseTarget(value: number);
    /** Обнуляется при появлении; ReGameDLL его не читает. `CBasePlayer::m_fCamSwitch`, дробное. */
    get camSwitch(): number;
    set camSwitch(value: number);
    /** Истина, если игрок сбежал (карта побега) или VIP спасся. `CBasePlayer::m_bEscaped`, логическое. */
    get escaped(): boolean;
    set escaped(value: boolean);
    /** Истина, если игрок — VIP на карте as_. `CBasePlayer::m_bIsVIP`, логическое. */
    get isVip(): boolean;
    set isVip(value: boolean);
    /** Игровое время, когда его позиция снова уйдёт на радар союзников, раз в секунду. `CBasePlayer::m_tmNextRadarUpdate`, дробное. */
    get nextRadarUpdate(): number;
    set nextRadarUpdate(value: number);
    /** Где был игрок при последнем обновлении радара союзников. `CBasePlayer::m_vLastOrigin`, вектор. */
    get lastOrigin(): Vector;
    set lastOrigin(value: number[]);
    /** userid игрока, за кик которого он проголосовал (vote), 0 — ни за кого. `CBasePlayer::m_iCurrentKickVote`, целое. */
    get currentKickVote(): number;
    set currentKickVote(value: number);
    /** Игровое время, когда игрок снова сможет голосовать, через 3 секунды после прошлого голоса. `CBasePlayer::m_flNextVoteTime`, дробное. */
    get nextVoteTime(): number;
    set nextVoteTime(value: number);
    /** Истина, если игрок убил союзника; при mp_tkpunish его накажут в начале следующего раунда. `CBasePlayer::m_bJustKilledTeammate`, логическое. */
    get justKilledTeammate(): boolean;
    set justKilledTeammate(value: boolean);
    /** Сколько заложников убил игрок; сверх mp_hostagepenalty игра его выгоняет. `CBasePlayer::m_iHostagesKilled`, целое. */
    get hostagesKilled(): number;
    set hostagesKilled(value: number);
    /** Номер карты, за которую игрок проголосовал через votemap; 0 — ни за какую. `CBasePlayer::m_iMapVote`, целое. */
    get mapVote(): number;
    set mapVote(value: number);
    /** Ложь, пока игроку нельзя стрелять; когда кончается заморозка, игра ставит истину. `CBasePlayer::m_bCanShoot`, логическое. */
    get canShoot(): boolean;
    set canShoot(value: boolean);
    /** Игровое время последнего выстрела игрока — для анимаций шагов и стрельбы. `CBasePlayer::m_flLastFired`, дробное. */
    get lastFired(): number;
    set lastFired(value: number);
    /** Игровое время, когда игрок последний раз ранил союзника; сообщение об атаке союзника ждёт 0.6 секунды от него. `CBasePlayer::m_flLastAttackedTeammate`, дробное. */
    get lastAttackedTeammate(): number;
    set lastAttackedTeammate(value: number);
    /** Истина, если игрока убили в голову. `CBasePlayer::m_bHeadshotKilled`, логическое. */
    get headshotKilled(): boolean;
    set headshotKilled(value: boolean);
    /** Истина, если игрок наказан за убийство союзника в этом раунде. `CBasePlayer::m_bPunishedForTK`, логическое. */
    get punishedForTk(): boolean;
    set punishedForTk(value: boolean);
    /** Истина, если игрок не получит бонус в следующем раунде: игра отмечает так живых игроков команды, у которой истекло время раунда. `CBasePlayer::m_bReceivesNoMoneyNextRound`, логическое. */
    get receivesNoMoneyNextRound(): boolean;
    set receivesNoMoneyNextRound(value: boolean);
    /** Игровое время в целых секундах, когда команда timeleft снова ответит игроку. `CBasePlayer::m_iTimeCheckAllowed`, целое. */
    get timeCheckAllowed(): number;
    set timeCheckAllowed(value: number);
    /** Истина, если игрок сменил имя, будучи мёртвым; новое имя применится при следующем появлении. `CBasePlayer::m_bHasChangedName`, логическое. */
    get hasChangedName(): boolean;
    set hasChangedName(value: boolean);
    /** Истина, пока игрок обезвреживает бомбу. `CBasePlayer::m_bIsDefusing`, логическое. */
    get isDefusing(): boolean;
    set isDefusing(value: boolean);
    /** Игровое время следующей проверки зон игрока (зона закупки, точка бомбы, зона спасения), раз в полсекунды. `CBasePlayer::m_tmHandleSignals`, дробное. */
    get handleSignals(): number;
    set handleSignals(value: number);
    /** Точка закладки бомбы, в которой стоит игрок, или 0. `CBasePlayer::m_pentCurBombTarget`, номер сущности. */
    get curBombTarget(): number;
    set curBombTarget(value: number);
    /** Место игрока в списке звуков, которые слышат монстры (заложники). `CBasePlayer::m_iPlayerSound`, целое. */
    get playerSound(): number;
    set playerSound(value: number);
    /** Насколько громок игрок для монстров в этом кадре — громче из шагов и оружия. `CBasePlayer::m_iTargetVolume`, целое. */
    get targetVolume(): number;
    set targetVolume(value: number);
    /** Насколько громким для монстров был его последний выстрел; затихает сам. `CBasePlayer::m_iWeaponVolume`, целое. */
    get weaponVolume(): number;
    set weaponVolume(value: number);
    /** Дополнительные виды звука, которые игрок издаёт для монстров до stopExtraSoundTime. `CBasePlayer::m_iExtraSoundTypes`, целое. */
    get extraSoundTypes(): number;
    set extraSoundTypes(value: number);
    /** Яркость его последней вспышки выстрела — добавляется к его заметности; гаснет сама. `CBasePlayer::m_iWeaponFlash`, целое. */
    get weaponFlash(): number;
    set weaponFlash(value: number);
    /** Игровое время, когда extraSoundTypes сбросится. `CBasePlayer::m_flStopExtraSoundTime`, дробное. */
    get stopExtraSoundTime(): number;
    set stopExtraSoundTime(value: number);
    /** Игровое время, когда батарея фонарика в следующий раз разрядится (включён) или зарядится (выключен) на единицу. `CBasePlayer::m_flFlashLightTime`, дробное. */
    get flashLightTime(): number;
    set flashLightTime(value: number);
    /** Заряд фонарика, от 0 до 100. `CBasePlayer::m_iFlashBattery`, целое. */
    get flashBattery(): number;
    set flashBattery(value: number);
    /** Кнопки, которые игрок держал в прошлом кадре, битами IN_* (число, а не имена, как у buttons). `CBasePlayer::m_afButtonLast`, целое. */
    get buttonLast(): number;
    set buttonLast(value: number);
    /** Кнопки, которые игрок нажал в этом кадре, битами IN_*. `CBasePlayer::m_afButtonPressed`, целое. */
    get buttonPressed(): number;
    set buttonPressed(value: number);
    /** Кнопки, которые игрок отпустил в этом кадре, битами IN_*. `CBasePlayer::m_afButtonReleased`, целое. */
    get buttonReleased(): number;
    set buttonReleased(value: number);
    /** env_sound, чей эффект помещения сейчас действует на игрока. `CBasePlayer::m_pentSndLast`, номер сущности. */
    get sndLast(): number;
    set sndLast(value: number);
    /** Эффект помещения (эхо) этого env_sound, 0 — нет. `CBasePlayer::m_flSndRoomtype`, дробное. */
    get sndRoomtype(): number;
    set sndRoomtype(value: number);
    /** Насколько игрок далеко от этого env_sound. `CBasePlayer::m_flSndRange`, дробное. */
    get sndRange(): number;
    set sndRange(value: number);
    /** Флаг Half-Life «есть новые патроны для отправки». CS его не использует. `CBasePlayer::m_fNewAmmo`, целое. */
    get newAmmo(): number;
    set newAmmo(value: number);
    /** Биты физического состояния игрока: 1 — на лестнице, 2 — на поезде, 8 — приседает, 16 — что-то использует, 32 — закреплённый наблюдатель. `CBasePlayer::m_afPhysicsFlags`, целое. */
    get physicsFlags(): number;
    set physicsFlags(value: number);
    /** Игровое время, когда команда kill снова сработает, через секунду после прошлой. `CBasePlayer::m_fNextSuicideTime`, дробное. */
    get nextSuicideTime(): number;
    set nextSuicideTime(value: number);
    /** Таймер покоя на уровне игрока из Half-Life; CS держит его у оружия (timeWeaponIdle у Weapon), а этот не использует. `CBasePlayer::m_flTimeWeaponIdle`, дробное. */
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /** Таймер прыжка от стены из Half-Life. CS его не использует. `CBasePlayer::m_flWallJumpTime`, дробное. */
    get wallJumpTime(): number;
    set wallJumpTime(value: number);
    /** Игровое время следующей фразы костюма HEV (Half-Life); 0 — нет. `CBasePlayer::m_flSuitUpdate`, дробное. */
    get suitUpdate(): number;
    set suitUpdate(value: number);
    /** Следующее место в очереди фраз костюма HEV (Half-Life). `CBasePlayer::m_iSuitPlayNext`, целое. */
    get suitPlayNext(): number;
    set suitPlayNext(value: number);
    /** Сколько урона игрок получил последним попаданием. `CBasePlayer::m_lastDamageAmount`, целое. */
    get lastDamageAmount(): number;
    set lastDamageAmount(value: number);
    /** Игровое время, когда последний раз применялся урон во времени (яд, огонь, восстановление после утопления). `CBasePlayer::m_tbdPrev`, дробное. */
    get tbdPrev(): number;
    set tbdPrev(value: number);
    /** Счётчик Гейгера Half-Life: расстояние до ближайшей радиации. `CBasePlayer::m_flgeigerRange`, дробное. */
    get flgeigerRange(): number;
    set flgeigerRange(value: number);
    /** Игровое время следующего обновления счётчика Гейгера (Half-Life). `CBasePlayer::m_flgeigerDelay`, дробное. */
    get flgeigerDelay(): number;
    set flgeigerDelay(value: number);
    /** Показание счётчика Гейгера, последним отправленное клиенту (Half-Life). `CBasePlayer::m_igeigerRangePrev`, целое. */
    get igeigerRangePrev(): number;
    set igeigerRangePrev(value: number);
    /** Тип текстуры под игроком, для звука шагов. CS его не использует. `CBasePlayer::m_chTextureType`, целое. */
    get textureType(): number;
    set textureType(value: number);
    /** Сколько здоровья отняло утопление; вернётся, когда игрок вынырнет. `CBasePlayer::m_idrowndmg`, целое. */
    get idrowndmg(): number;
    set idrowndmg(value: number);
    /** Сколько из урона от утопления уже возвращено. `CBasePlayer::m_idrownrestored`, целое. */
    get idrownrestored(): number;
    set idrownrestored(value: number);
    /** Биты урона, последними отправленные в HUD; -1 — отправить заново. `CBasePlayer::m_bitsHUDDamage`, целое. */
    get hudDamage(): number;
    set hudDamage(value: number);
    /** Истина, когда HUD игрока нужно сбросить при следующем обновлении (после появления). `CBasePlayer::m_fInitHUD`, логическое. */
    get initHud(): boolean;
    set initHud(value: boolean);
    /** Истина, когда HUD игрока настроен с момента подключения. `CBasePlayer::m_fGameHUDInitialized`, логическое. */
    get gameHudInitialized(): boolean;
    set gameHudInitialized(value: boolean);
    /** Управление поездом на HUD игрока: 0 — нет, от 1 до 5 — положение рычага, плюс биты «изменилось» и «активно». `CBasePlayer::m_iTrain`, целое. */
    get train(): number;
    set train(value: number);
    /** Ложь, когда список оружия игрока нужно отправить заново. `CBasePlayer::m_fWeapon`, логическое. */
    get weapon(): boolean;
    set weapon(value: boolean);
    /** func_tank (стационарное оружие), которым пользуется игрок. `CBasePlayer::m_pTank`, номер сущности. */
    get tank(): number;
    set tank(value: number);
    /** Игровое время смерти игрока. `CBasePlayer::m_fDeadTime`, дробное. */
    get deadTime(): number;
    set deadTime(value: number);
    /** Истина, если монстры не слышат игрока. `CBasePlayer::m_fNoPlayerSound`, логическое. */
    get noPlayerSound(): boolean;
    set noPlayerSound(value: boolean);
    /** Истина, если у игрока модуль длинного прыжка из Half-Life. `CBasePlayer::m_fLongJump`, логическое. */
    get longJump(): boolean;
    set longJump(value: boolean);
    /** Игровое время, с которого игрок считается крадущимся (Half-Life). `CBasePlayer::m_tSneaking`, дробное. */
    get sneaking(): number;
    set sneaking(value: number);
    /** Ставится в 5 при сбросе; ReGameDLL его не читает. `CBasePlayer::m_iUpdateTime`, целое. */
    get updateTime(): number;
    set updateTime(value: number);
    /** Здоровье, последним отправленное в HUD игрока; если отличается от настоящего, игра отправит новое. `CBasePlayer::m_iClientHealth`, целое. */
    get clientHealth(): number;
    set clientHealth(value: number);
    /** Броня, последней отправленная в HUD игрока; -1 — отправить заново. `CBasePlayer::m_iClientBattery`, целое. */
    get clientBattery(): number;
    set clientBattery(value: number);
    /** Какие части HUD скрыты: "Money", "Timer", "Crosshair", "Flashlight", ...; изменение игра отправляет сама. `CBasePlayer::m_iHideHUD`, битовая маска. */
    get hideHud(): HideHud[];
    set hideHud(values: HideHud[]);
    /** Скрытые части HUD, последними отправленные игроку; если отличается от hideHud, игра отправит hideHud. `CBasePlayer::m_iClientHideHUD`, битовая маска. */
    get clientHideHud(): HideHud[];
    set clientHideHud(values: HideHud[]);
    /** Поле зрения, последним отправленное игроку; если своя копия игры отличается, отправит её. `CBasePlayer::m_iClientFOV`, целое. */
    get clientFov(): number;
    set clientFov(value: number);
    /** Сколько раз игрок появлялся в этом раунде; без mp_forcerespawn второй раз не пустят. `CBasePlayer::m_iNumSpawns`, целое. */
    get numSpawns(): number;
    set numSpawns(value: number);
    /** Сущность наблюдателя, привязанная к игроку; ReGameDLL её не создаёт и только удаляет при отключении игрока. `CBasePlayer::m_pObserver`, номер сущности. */
    get observer(): number;
    set observer(value: number);
    /** Оружие в руках игрока или null. `CBasePlayer::m_pActiveItem`, указатель. Только чтение. */
    get activeItem(): Weapon | null;
    /** Оружие, о котором клиенту игрока последним сообщили, что оно в руках. `CBasePlayer::m_pClientActiveItem`, указатель. Только чтение. */
    get clientActiveItem(): Weapon | null;
    /** Оружие, которое игрок держал до текущего, — на него переключает lastinv. `CBasePlayer::m_pLastItem`, указатель. Только чтение. */
    get lastItem(): Weapon | null;
    /** Поправка автоприцела, в градусах. `CBasePlayer::m_vecAutoAim`, вектор. */
    get autoAim(): Vector;
    set autoAim(value: number[]);
    /** Истина, пока у автоприцела есть цель под прицелом. `CBasePlayer::m_fOnTarget`, логическое. */
    get onTarget(): boolean;
    set onTarget(value: boolean);
    /** Игровое время следующего обновления строки статуса (кто под прицелом), каждые 0.2 секунды. `CBasePlayer::m_flNextSBarUpdateTime`, дробное. */
    get nextSBarUpdateTime(): number;
    set nextSBarUpdateTime(value: number);
    /** Игровое время, до которого держится строка статуса об игроке под прицелом, — 2 секунды после того, как он ушёл. `CBasePlayer::m_flStatusBarDisappearDelay`, дробное. */
    get statusBarDisappearDelay(): number;
    set statusBarDisappearDelay(value: number);
    /** Горизонтальная поправка автоприцела, последней отправленная клиенту. `CBasePlayer::m_lastx`, целое. */
    get lastx(): number;
    set lastx(value: number);
    /** Вертикальная поправка автоприцела, последней отправленная клиенту. `CBasePlayer::m_lasty`, целое. */
    get lasty(): number;
    set lasty(value: number);
    /** Сколько кадров в своём спрей-логотипе игрока; -1 — логотипа нет. `CBasePlayer::m_nCustomSprayFrames`, целое. */
    get customSprayFrames(): number;
    set customSprayFrames(value: number);
    /** Игровое время, когда игрок снова сможет нанести спрей (decalfrequency). `CBasePlayer::m_flNextDecalTime`, дробное. */
    get nextDecalTime(): number;
    set nextDecalTime(value: number);
    /** Номер собственной модели игрока; игра возвращает к нему modelIndex, например при появлении. `CBasePlayer::m_modelIndexPlayer`, целое. */
    get modelIndexPlayer(): number;
    set modelIndexPlayer(value: number);
    /** Анимация ног, которую игра выбрала игроку в этом кадре. `CBasePlayer::m_iGaitsequence`, целое. */
    get gaitsequence(): number;
    set gaitsequence(value: number);
    /** Позиция в анимации ног, в кадрах. `CBasePlayer::m_flGaitframe`, дробное. */
    get gaitframe(): number;
    set gaitframe(value: number);
    /** Куда смотрят ноги, в градусах; догоняет направление тела. `CBasePlayer::m_flGaityaw`, дробное. */
    get gaityaw(): number;
    set gaityaw(value: number);
    /** Где был игрок при прошлом обновлении анимации — чтобы оценить его скорость. `CBasePlayer::m_prevgaitorigin`, вектор. */
    get prevgaitorigin(): Vector;
    set prevgaitorigin(value: number[]);
    /** Наклон верхней части тела, который игра вычислила для модели игрока. `CBasePlayer::m_flPitch`, дробное. */
    get pitch(): number;
    set pitch(value: number);
    /** Поворот верхней части тела относительно ног, в градусах. `CBasePlayer::m_flYaw`, дробное. */
    get yaw(): number;
    set yaw(value: number);
    /** Насколько игрок сдвинулся с прошлого обновления анимации — для анимации ног. `CBasePlayer::m_flGaitMovement`, дробное. */
    get gaitMovement(): number;
    set gaitMovement(value: number);
    /** _cl_autowepswitch игрока: 0 — не переключаться на подобранное оружие, 1 — всегда, 2 — если не стреляет. `CBasePlayer::m_iAutoWepSwitch`, целое. */
    get autoWepSwitch(): number;
    set autoWepSwitch(value: number);
    /** Истина, если игрок пользуется графическими (VGUI) меню, — его настройка _vgui_menus. `CBasePlayer::m_bVGUIMenus`, логическое. */
    get vguiMenus(): boolean;
    set vguiMenus(value: boolean);
    /** Истина, если игрок хочет подсказки, — его настройка _ah. `CBasePlayer::m_bShowHints`, логическое. */
    get showHints(): boolean;
    set showHints(value: boolean);
    /** Истина, пока игрок держит щит поднятым. `CBasePlayer::m_bShieldDrawn`, логическое. */
    get shieldDrawn(): boolean;
    set shieldDrawn(value: boolean);
    /** Истина, если у игрока есть тактический щит. `CBasePlayer::m_bOwnsShield`, логическое. */
    get ownsShield(): boolean;
    set ownsShield(value: boolean);
    /** Истина, если зритель следил за игроком, прежде чем перешёл в свободный полёт. `CBasePlayer::m_bWasFollowing`, логическое. */
    get wasFollowing(): boolean;
    set wasFollowing(value: boolean);
    /** Игровое время, когда зритель снова сможет переключиться на следующего игрока. `CBasePlayer::m_flNextFollowTime`, дробное. */
    get nextFollowTime(): number;
    set nextFollowTime(value: number);
    /** Насколько быстро ноги поворачивают за телом — для анимации игрока. `CBasePlayer::m_flYawModifier`, дробное. */
    get yawModifier(): number;
    set yawModifier(value: number);
    /** Игровое время конца ослепления флешкой. Запись не ослепляет экран — это делает сообщение ScreenFade. `CBasePlayer::m_blindUntilTime`, дробное. */
    get blindUntilTime(): number;
    set blindUntilTime(value: number);
    /** Игровое время, когда игрока ослепило. `CBasePlayer::m_blindStartTime`, дробное. */
    get blindStartTime(): number;
    set blindStartTime(value: number);
    /** Сколько секунд ослепление держится полным. `CBasePlayer::m_blindHoldTime`, дробное. */
    get blindHoldTime(): number;
    set blindHoldTime(value: number);
    /** За сколько секунд ослепление проходит. `CBasePlayer::m_blindFadeTime`, дробное. */
    get blindFadeTime(): number;
    set blindFadeTime(value: number);
    /** Насколько бело ослепление, от 0 до 255; 255 — полностью слеп. `CBasePlayer::m_blindAlpha`, целое. */
    get blindAlpha(): number;
    set blindAlpha(value: number);
    /** Игровое время, с которого бот может сам пойти за союзниками. `CBasePlayer::m_allowAutoFollowTime`, дробное. */
    get allowAutoFollowTime(): number;
    set allowAutoFollowTime(value: number);
    /** Истина, пока команда rebuy закупает прошлое снаряжение игрока. `CBasePlayer::m_bIsInRebuy`, логическое. */
    get isInRebuy(): boolean;
    set isInRebuy(value: boolean);
    /** Игровое время последнего обновления названия места игрока на карте. `CBasePlayer::m_flLastUpdateTime`, дробное. */
    get lastUpdateTime(): number;
    set lastUpdateTime(value: number);
    /** Игровое время начала полосы прогресса игрока (разминирование, закладка); 0 — нет. `CBasePlayer::m_progressStart`, дробное. */
    get progressStart(): number;
    set progressStart(value: number);
    /** Игровое время, когда полоса прогресса игрока заполнится. `CBasePlayer::m_progressEnd`, дробное. */
    get progressEnd(): number;
    set progressEnd(value: number);
    /** Истина, если камера преследования зрителя закреплена за взглядом цели (OBS_CHASE_LOCKED), а не вращается свободно. `CBasePlayer::m_bObserverAutoDirector`, логическое. */
    get observerAutoDirector(): boolean;
    set observerAutoDirector(value: boolean);
    /** Истина, если зритель может менять режим обзора; сразу после смерти — ложь. `CBasePlayer::m_canSwitchObserverModes`, логическое. */
    get canSwitchObserverModes(): boolean;
    set canSwitchObserverModes(value: boolean);
    /** Остаток Condition Zero; ReGameDLL его не использует. `CBasePlayer::m_heartBeatTime`, дробное. */
    get heartBeatTime(): number;
    set heartBeatTime(value: number);
    /** Остаток Condition Zero; ReGameDLL его не использует. `CBasePlayer::m_intenseTimestamp`, дробное. */
    get intenseTimestamp(): number;
    set intenseTimestamp(value: number);
    /** Остаток Condition Zero; ReGameDLL его не использует. `CBasePlayer::m_silentTimestamp`, дробное. */
    get silentTimestamp(): number;
    set silentTimestamp(value: number);
    /** Остаток Condition Zero (тишина, спокойно, напряжённо); ReGameDLL его не использует. `CBasePlayer::m_musicState`, целое. */
    get musicState(): number;
    set musicState(value: number);
    /** Деньги игрока, последними отправленные в таблицы счёта других игроков. `CBasePlayer::m_iLastAccount`, целое. */
    get lastAccount(): number;
    set lastAccount(value: number);
    /** Здоровье игрока, последним отправленное в таблицы счёта других игроков. `CBasePlayer::m_iLastClientHealth`, целое. */
    get lastClientHealth(): number;
    set lastClientHealth(value: number);
    /** Игровое время, когда его деньги и здоровье снова уйдут в таблицы счёта, даже без изменений, — раз в 5 секунд. `CBasePlayer::m_tmNextAccountHealthUpdate`, дробное. */
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
    /** Игрок, у которого оружие, или null, если оно лежит на земле. `CBasePlayerItem::m_pPlayer`, указатель. Только чтение. */
    get player(): Player | null;
    /** Следующее оружие в том же слоте инвентаря (гранаты делят один), или null. `CBasePlayerItem::m_pNext`, указатель. Только чтение. */
    get next(): Weapon | null;
    /** 1, если при следующей атаке может прозвучать щелчок пустого оружия. `CBasePlayerWeapon::m_iPlayEmptySound` (reapi `m_Weapon_iPlayEmptySound`), целое. */
    get playEmptySound(): number;
    set playEmptySound(value: number);
    /** 1, пока игрок жмёт атаку с пустым магазином. `CBasePlayerWeapon::m_fFireOnEmpty` (reapi `m_Weapon_fFireOnEmpty`), целое. */
    get fireOnEmpty(): number;
    set fireOnEmpty(value: number);
    /** Секунд до следующего выстрела; отсчитывается сам: около 0.1 после выстрела AK-47, 1.45 после AWP. `CBasePlayerWeapon::m_flNextPrimaryAttack` (reapi `m_Weapon_flNextPrimaryAttack`), дробное. */
    get nextPrimaryAttack(): number;
    set nextPrimaryAttack(value: number);
    /** Секунд до следующей вторичной атаки (зум, глушитель, режим очереди); отсчитывается сам. `CBasePlayerWeapon::m_flNextSecondaryAttack` (reapi `m_Weapon_flNextSecondaryAttack`), дробное. */
    get nextSecondaryAttack(): number;
    set nextSecondaryAttack(value: number);
    /** Секунд до анимации покоя оружия; отсчитывается сам. `CBasePlayerWeapon::m_flTimeWeaponIdle` (reapi `m_Weapon_flTimeWeaponIdle`), дробное. */
    get timeWeaponIdle(): number;
    set timeWeaponIdle(value: number);
    /** Какие патроны у оружия — номер запаса патронов игрока, из которого оно берёт; -1 — никаких (нож). `CBasePlayerWeapon::m_iPrimaryAmmoType` (reapi `m_Weapon_iPrimaryAmmoType`), целое. */
    get primaryAmmoType(): number;
    set primaryAmmoType(value: number);
    /** Номер запаса вторичных патронов; у оружия CS их нет (-1). `CBasePlayerWeapon::m_iSecondaryAmmoType` (reapi `m_Weapon_iSecondaryAmmoType`), целое. */
    get secondaryAmmoType(): number;
    set secondaryAmmoType(value: number);
    /** Патронов в магазине: 30 у полного AK-47; -1 у ножа, у которого магазина нет. `CBasePlayerWeapon::m_iClip` (reapi `m_Weapon_iClip`), целое. */
    get clip(): number;
    set clip(value: number);
    /** Магазин, последним отправленный в HUD игрока; если отличается от clip, игра отправит новый. `CBasePlayerWeapon::m_iClientClip` (reapi `m_Weapon_iClientClip`), целое. */
    get clientClip(): number;
    set clientClip(value: number);
    /** Состояние оружия (в руках или нет), последним отправленное в HUD игрока. `CBasePlayerWeapon::m_iClientWeaponState` (reapi `m_Weapon_iClientWeaponState`), целое. */
    get clientWeaponState(): number;
    set clientWeaponState(value: number);
    /** 1, пока оружие перезаряжается. `CBasePlayerWeapon::m_fInReload` (reapi `m_Weapon_fInReload`), целое. */
    get inReload(): number;
    set inReload(value: number);
    /** Стадия поштучной перезарядки дробовика: 0 — не перезаряжается, 1 — начало, 2 — вставляет патрон. `CBasePlayerWeapon::m_fInSpecialReload` (reapi `m_Weapon_fInSpecialReload`), целое. */
    get inSpecialReload(): number;
    set inSpecialReload(value: number);
    /** Сколько патронов даёт оружие при первом подборе; 0 у выброшенного игроком (только магазин). `CBasePlayerWeapon::m_iDefaultAmmo` (reapi `m_Weapon_iDefaultAmmo`), целое. */
    get defaultAmmo(): number;
    set defaultAmmo(value: number);
    /** Подгруженная модель гильзы, которую выбрасывает оружие. `CBasePlayerWeapon::m_iShellId` (reapi `m_Weapon_iShellId`), целое. */
    get shellId(): number;
    set shellId(value: number);
    /** Истина от выстрела до того, как отпустят кнопку атаки; по нему игра не даёт частыми нажатиями сохранять точность одиночного выстрела. `CBasePlayerWeapon::m_bDelayFire` (reapi `m_Weapon_bDelayFire`), логическое. */
    get delayFire(): boolean;
    set delayFire(value: boolean);
    /** Куда отдача уведёт вбок в следующий раз, влево или вправо; время от времени меняется. `CBasePlayerWeapon::m_iDirection` (reapi `m_Weapon_iDirection`), целое. */
    get direction(): number;
    set direction(value: number);
    /** Задумано для второго глушителя. CS его не использует. `CBasePlayerWeapon::m_bSecondarySilencerOn` (reapi `m_Weapon_bSecondarySilencerOn`), логическое. */
    get secondarySilencerOn(): boolean;
    set secondarySilencerOn(value: boolean);
    /** Текущий разброс оружия: растёт при стрельбе и возвращается; у каждого оружия свои пределы (0.2 у свежего AK-47). `CBasePlayerWeapon::m_flAccuracy` (reapi `m_Weapon_flAccuracy`), дробное. */
    get accuracy(): number;
    set accuracy(value: number);
    /** Игровое время последнего выстрела пистолета — для его точности. `CBasePlayerWeapon::m_flLastFire` (reapi `m_Weapon_flLastFire`), дробное. */
    get lastFire(): number;
    set lastFire(value: number);
    /** Выстрелов в текущей очереди; с ним растёт отдача, и он сбрасывается, когда игрок перестаёт стрелять. `CBasePlayerWeapon::m_iShotsFired` (reapi `m_Weapon_iShotsFired`), целое. */
    get shotsFired(): number;
    set shotsFired(value: number);
    /** Игровое время следующего патрона очереди Glock; 0 — очереди нет. `CBasePlayerWeapon::m_flGlock18Shoot` (reapi `m_Weapon_flGlock18Shoot`), дробное. */
    get glock18Shoot(): number;
    set glock18Shoot(value: number);
    /** Сколько патронов Glock выпустил в текущей очереди. `CBasePlayerWeapon::m_iGlock18ShotsFired` (reapi `m_Weapon_iGlock18ShotsFired`), целое. */
    get glock18ShotsFired(): number;
    set glock18ShotsFired(value: number);
    /** Игровое время следующего патрона очереди FAMAS; 0 — очереди нет. `CBasePlayerWeapon::m_flFamasShoot` (reapi `m_Weapon_flFamasShoot`), дробное. */
    get famasShoot(): number;
    set famasShoot(value: number);
    /** Сколько патронов FAMAS выпустил в текущей очереди. `CBasePlayerWeapon::m_iFamasShotsFired` (reapi `m_Weapon_iFamasShotsFired`), целое. */
    get famasShotsFired(): number;
    set famasShotsFired(value: number);
    /** Разброс очереди FAMAS, сохранённый для её следующих патронов. `CBasePlayerWeapon::m_fBurstSpread` (reapi `m_Weapon_fBurstSpread`), дробное. */
    get burstSpread(): number;
    set burstSpread(value: number);
    /** Биты режима оружия: WPNSTATE_USP_SILENCED, WPNSTATE_M4A1_SILENCED, WPNSTATE_GLOCK18_BURST_MODE, WPNSTATE_FAMAS_BURST_MODE, WPNSTATE_ELITE_LEFT, WPNSTATE_SHIELD_DRAWN. `CBasePlayerWeapon::m_iWeaponState` (reapi `m_Weapon_iWeaponState`), целое. */
    get weaponState(): number;
    set weaponState(value: number);
    /** Секунд до следующего патрона при перезарядке дробовика; отсчитывается вниз. `CBasePlayerWeapon::m_flNextReload` (reapi `m_Weapon_flNextReload`), дробное. */
    get nextReload(): number;
    set nextReload(value: number);
    /** Игровое время, когда shotsFired уменьшится на единицу после того, как игрок перестал стрелять. `CBasePlayerWeapon::m_flDecreaseShotsFired` (reapi `m_Weapon_flDecreaseShotsFired`), дробное. */
    get decreaseShotsFired(): number;
    set decreaseShotsFired(value: number);
    /** Номер подгруженного события выстрела Glock. `CBasePlayerWeapon::m_usFireGlock18` (reapi `m_Weapon_usFireGlock18`), целое. */
    get fireGlock18(): number;
    set fireGlock18(value: number);
    /** Номер подгруженного события выстрела FAMAS. `CBasePlayerWeapon::m_usFireFamas` (reapi `m_Weapon_usFireFamas`), целое. */
    get fireFamas(): number;
    set fireFamas(value: number);
    /** Задержка между двумя последними выстрелами, в секундах; по ней игра выравнивает темп стрельбы. `CBasePlayerWeapon::m_flPrevPrimaryAttack` (reapi `m_Weapon_flPrevPrimaryAttack`), дробное. */
    get prevPrimaryAttack(): number;
    set prevPrimaryAttack(value: number);
    /** Игровое время последнего выстрела оружия; 0 до первого выстрела. `CBasePlayerWeapon::m_flLastFireTime` (reapi `m_Weapon_flLastFireTime`), дробное. */
    get lastFireTime(): number;
    set lastFireTime(value: number);
}
