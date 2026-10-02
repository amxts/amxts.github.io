/// <reference path="../as-types.d.ts" />
import { Player, Resource } from "./facade";
import { Entity, RenderMode } from "./entities";
/** Игроки, которые видят эффект, — второй аргумент каждой функции `effects`; если его нет — все. Эффект отправляется так, как игра отправляет свои: игрок, чьё соединение его потеряло, его не увидит. */
export interface EffectRecipients {
    /**
     * Только игроки, которым видна эта точка, например `{ near: grenade.origin }`.
     *
     * Pawn: `MSG_PVS`
     */
    near?: number[];
    /**
     * Только этот игрок, например `{ to: player }`.
     *
     * Pawn: `MSG_ONE_UNRELIABLE`
     */
    to?: Player;
}
/** Настройки `effects.gunshot`, `effects.sparks`, `effects.tarExplosion`, `effects.lavaSplash` и `effects.teleport`. */
export interface PointEffectOptions {
    /** Точка, где возникает эффект. */
    at: number[];
}
/** Настройки `effects.tracer` и `effects.showLine`. */
export interface SegmentEffectOptions {
    /** Точка, откуда начинается эффект. */
    start: number[];
    /** Точка, где эффект заканчивается. */
    end: number[];
}
/** Настройки `effects.killBeams`. */
export interface EntityEffectOptions {
    /** Сущность, чьи лучи исчезают. */
    entity: Entity;
}
/** Настройки `effects.killPlayerAttachments`. */
export interface PlayerEffectOptions {
    /** Игрок, чьи прикреплённые модели исчезают. */
    player: Player;
}
/** Настройки `effects.beamPoints`. */
export interface BeamPointsOptions {
    /** Точка, откуда идёт луч. */
    start: number[];
    /** Точка, где кончается луч. */
    end: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Толщина луча, от `0` до `255`: `10` — одна единица. */
    width: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
    /** Яркость, от `0` до `255`; по умолчанию `255`. */
    alpha?: number;
    /** Дрожание луча, от `0` до `255`: `100` — одна единица; по умолчанию `0` — прямой луч. */
    noise?: number;
    /** Кадр спрайта, с которого начинается луч; по умолчанию `0`. */
    frame?: number;
    /** Частота кадров спрайта, в десятых долях кадра в секунду; по умолчанию `0`. */
    frameRate?: number;
    /** Скорость, с которой спрайт бежит вдоль луча, в десятых долях единицы в секунду; по умолчанию `0`. */
    speed?: number;
}
/** Настройки `effects.beamEntityPoint`. */
export interface BeamEntityPointOptions {
    /** Сущность, от которой идёт луч; луч следует за ней, когда она движется. */
    start: Entity;
    /** Точка, где кончается луч. */
    end: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Толщина луча, от `0` до `255`: `10` — одна единица. */
    width: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
    /** Яркость, от `0` до `255`; по умолчанию `255`. */
    alpha?: number;
    /** Дрожание луча, от `0` до `255`: `100` — одна единица; по умолчанию `0` — прямой луч. */
    noise?: number;
    /** Кадр спрайта, с которого начинается луч; по умолчанию `0`. */
    frame?: number;
    /** Частота кадров спрайта, в десятых долях кадра в секунду; по умолчанию `0`. */
    frameRate?: number;
    /** Скорость, с которой спрайт бежит вдоль луча, в десятых долях единицы в секунду; по умолчанию `0`. */
    speed?: number;
}
/** Настройки `effects.beamEntities` и `effects.beamRing`. */
export interface BeamEntitiesOptions {
    /** Сущность, от которой идёт луч; луч следует за ней, когда она движется. */
    start: Entity;
    /** Сущность, в которую упирается луч; луч следует за ней, когда она движется. */
    end: Entity;
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Толщина луча, от `0` до `255`: `10` — одна единица. */
    width: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
    /** Яркость, от `0` до `255`; по умолчанию `255`. */
    alpha?: number;
    /** Дрожание луча, от `0` до `255`: `100` — одна единица; по умолчанию `0` — прямой луч. */
    noise?: number;
    /** Кадр спрайта, с которого начинается луч; по умолчанию `0`. */
    frame?: number;
    /** Частота кадров спрайта, в десятых долях кадра в секунду; по умолчанию `0`. */
    frameRate?: number;
    /** Скорость, с которой спрайт бежит вдоль луча, в десятых долях единицы в секунду; по умолчанию `0`. */
    speed?: number;
}
/** Настройки `effects.beamCylinder`, `effects.beamDisk` и `effects.beamTorus`. */
export interface BeamCircleOptions {
    /** Центр круга. */
    at: number[];
    /** Радиус круга к концу его жизни, в единицах. */
    radius: number;
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Толщина луча, от `0` до `255`: `10` — одна единица. */
    width: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
    /** Яркость, от `0` до `255`; по умолчанию `255`. */
    alpha?: number;
    /** Дрожание луча, от `0` до `255`: `100` — одна единица; по умолчанию `0` — прямой луч. */
    noise?: number;
    /** Кадр спрайта, с которого начинается луч; по умолчанию `0`. */
    frame?: number;
    /** Частота кадров спрайта, в десятых долях кадра в секунду; по умолчанию `0`. */
    frameRate?: number;
    /** Скорость, с которой спрайт бежит вдоль луча, в десятых долях единицы в секунду; по умолчанию `0`. */
    speed?: number;
}
/** Настройки `effects.beamFollow`. */
export interface BeamFollowOptions {
    /** Сущность, за которой тянется след, — граната, игрок. */
    entity: Entity;
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Время жизни каждого куска следа, в секундах, до `25.5`. */
    life: number;
    /** Толщина луча, от `0` до `255`: `10` — одна единица. */
    width: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
    /** Яркость, от `0` до `255`; по умолчанию `255`. */
    alpha?: number;
}
/** Настройки `effects.beamSprite`. */
export interface BeamSpriteOptions {
    /** Точка, откуда идёт луч. */
    start: number[];
    /** Точка, где кончается луч и стоит концевой спрайт. */
    end: number[];
    /** Спрайт луча, как его вернул `server.precache`. */
    sprite: Resource;
    /** Спрайт на конце луча, как его вернул `server.precache`. */
    endSprite: Resource;
}
/** Настройки `effects.lightning`. */
export interface LightningOptions {
    /** Точка, откуда бьёт молния. */
    start: number[];
    /** Точка, куда бьёт молния. */
    end: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Толщина луча, от `0` до `255`: `10` — одна единица. */
    width: number;
    /** Дрожание луча, от `0` до `255`: `100` — одна единица; по умолчанию `0` — прямой луч. */
    noise?: number;
}
/** Настройки `effects.explosion`. */
export interface ExplosionOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Спрайт взрыва, например `sprites/zerogxplode.spr`, как его вернул `server.precache`. */
    sprite: Resource;
    /** Размер спрайта, от `0` до `255`: `10` — его собственный размер; по умолчанию `10`. */
    scale?: number;
    /** Кадров спрайта в секунду; по умолчанию `15`. */
    frameRate?: number;
    /** Рисуется ли спрайт светящимся, поверх того, что за ним; по умолчанию `true`, `false` — непрозрачным. */
    additive?: boolean;
    /** Освещает ли взрыв мир вокруг; по умолчанию `true`. */
    lights?: boolean;
    /** Слышен ли взрыв; по умолчанию `true`. */
    sound?: boolean;
    /** Разбрасывает ли взрыв частицы; по умолчанию `true`. */
    particles?: boolean;
}
/** Настройки `effects.smoke`. */
export interface SmokeOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Размер спрайта, от `0` до `255`: `10` — его собственный размер; по умолчанию `10`. */
    scale?: number;
    /** Кадров спрайта в секунду; по умолчанию `10`. */
    frameRate?: number;
}
/** Настройки `effects.particleExplosion`. */
export interface ParticleExplosionOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Первый цвет палитры игры, который берут частицы, от `0` до `255`; по умолчанию `0`. */
    palette?: number;
    /** Число цветов палитры, начиная с него, которые берут частицы; по умолчанию `16`. */
    colors?: number;
}
/** Настройки `effects.implosion`. */
export interface ImplosionOptions {
    /** Точка, куда слетаются трассеры. */
    at: number[];
    /** Расстояние, с которого летят трассеры, в единицах, до `255`. */
    radius: number;
    /** Число трассеров, от `0` до `255`. */
    count: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
}
/** Настройки `effects.spriteTrail`. */
export interface SpriteTrailOptions {
    /** Точка, откуда начинается эффект. */
    start: number[];
    /** Точка, где эффект заканчивается. */
    end: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Число спрайтов, от `0` до `255`. */
    count: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Размер спрайта, от `0` до `255`: `10` — его собственный размер; по умолчанию `10`. */
    scale?: number;
    /** Скорость спрайтов вдоль линии, от `0` до `255`: `1` — десять единиц в секунду; по умолчанию `10`. */
    speed?: number;
    /** Разброс скоростей спрайтов, от `0` до `255`: `1` — десять единиц в секунду; по умолчанию `10`. */
    randomness?: number;
}
/** Настройки `effects.sprite`. */
export interface SpriteOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Размер спрайта, от `0` до `255`: `10` — его собственный размер; по умолчанию `10`. */
    scale?: number;
    /** Яркость, от `0` до `255`; по умолчанию `255`. */
    alpha?: number;
}
/** Настройки `effects.glowSprite`. */
export interface GlowSpriteOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Размер спрайта, от `0` до `255`: `10` — его собственный размер; по умолчанию `10`. */
    scale?: number;
    /** Яркость, от `0` до `255`; по умолчанию `255`. */
    alpha?: number;
}
/** Настройки `effects.streakSplash`. */
export interface StreakSplashOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Направление, куда летят брызги, — вектор; его длина не важна. */
    direction: number[];
    /** Число трассеров, до `32767`. */
    count: number;
    /** Скорость трассеров, в единицах в секунду. */
    speed: number;
    /** Разброс скоростей трассеров, в единицах в секунду; по умолчанию `0`. */
    randomness?: number;
    /** Цвет трассеров в палитре игры, от `0` до `255`; по умолчанию `5` — жёлтые искры. */
    palette?: number;
}
/** Настройки `effects.dynamicLight`. */
export interface DynamicLightOptions {
    /** Точка, откуда светит свет. */
    at: number[];
    /** Радиус света, в единицах, до `2550`. */
    radius: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
    /** Скорость, с которой свет сжимается, в единицах в секунду; по умолчанию `0` — не сжимается. */
    decay?: number;
}
/** Настройки `effects.entityLight`. */
export interface EntityLightOptions {
    /** Сущность, за которой следует свет. */
    entity: Entity;
    /** Точка, где свет появляется. */
    at: number[];
    /** Радиус света, в единицах. */
    radius: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
    /** Скорость, с которой свет сжимается, в единицах в секунду; по умолчанию `0` — не сжимается. */
    decay?: number;
}
/** Настройки `effects.line`. */
export interface LineOptions {
    /** Точка, откуда начинается эффект. */
    start: number[];
    /** Точка, где эффект заканчивается. */
    end: number[];
    /** Время жизни эффекта, в секундах. */
    life: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
}
/** Настройки `effects.box`. */
export interface BoxOptions {
    /** Нижний угол коробки. */
    mins: number[];
    /** Верхний угол коробки. */
    maxs: number[];
    /** Время жизни эффекта, в секундах. */
    life: number;
    /** Цвет в шестнадцатеричной записи CSS, например `"#0096ff"` или `"#09f"`; по умолчанию белый. */
    color?: string;
}
/** Настройки `effects.largeFunnel`. */
export interface LargeFunnelOptions {
    /** Низ воронки. */
    at: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** `true` — спрайты вылетают из воронки, а не влетают в неё. */
    reverse?: boolean;
}
/** Настройки `effects.blood` и `effects.bloodStream`. */
export interface BloodOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Направление, куда летят брызги, — вектор; его длина не важна. */
    direction: number[];
    /** Скорость брызг, от `0` до `255`. */
    speed: number;
    /** Цвет крови в палитре игры, от `0` до `255`: `247` (по умолчанию) — красный, `195` — жёлтый. */
    palette?: number;
}
/** Настройки `effects.fizz`. */
export interface FizzOptions {
    /** Сущность, в которой поднимаются пузыри, — браш, например вода. */
    entity: Entity;
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Плотность пузырей, от `0` до `255`. */
    density: number;
}
/** Звук, с которым отскакивает модель, одно из `"none"`, `"shell"` или `"shotgunShell"`. */
export type BounceSound = "none" | "shell" | "shotgunShell";
/** Настройки `effects.model`. */
export interface ModelOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Начальная скорость, в единицах в секунду. */
    velocity: number[];
    /** Модель, которая рисуется, — `.mdl` или спрайт, — как её вернул `server.precache`. */
    model: Resource;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Начальный поворот модели вокруг вертикали, в градусах; по умолчанию `0`. */
    yaw?: number;
    /** Звук при отскоке, одно из `"none"` (по умолчанию), `"shell"` или `"shotgunShell"`. */
    sound?: BounceSound;
}
/** Настройки `effects.explodeModel`. */
export interface ExplodeModelOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Скорость осколков, в единицах в секунду. */
    speed: number;
    /** Модель, которая рисуется, — `.mdl` или спрайт, — как её вернул `server.precache`. */
    model: Resource;
    /** Число осколков, до `32767`. */
    count: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
}
/** Материал разбитой вещи — звук её осколков: одно из `"none"`, `"glass"`, `"metal"`, `"flesh"`, `"wood"` или `"concrete"`. */
export type BreakMaterial = "none" | "glass" | "metal" | "flesh" | "wood" | "concrete";
/** Настройки `effects.breakModel`. */
export interface BreakModelOptions {
    /** Центр коробки, из которой летят осколки. */
    at: number[];
    /** Размер коробки по каждой оси, в единицах. */
    size: number[];
    /** Начальная скорость, в единицах в секунду. */
    velocity: number[];
    /** Модель, которая рисуется, — `.mdl` или спрайт, — как её вернул `server.precache`. */
    model: Resource;
    /** Число частиц, от `0` до `255`. */
    count: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Разброс скоростей осколков, от `0` до `255`: `1` — десять единиц в секунду; по умолчанию `0`. */
    randomness?: number;
    /** Материал, которым звучат осколки, одно из `"none"` (по умолчанию), `"glass"`, `"metal"`, `"flesh"`, `"wood"` или `"concrete"`. */
    material?: BreakMaterial;
    /** `true` — за осколками тянется дым. */
    smoke?: boolean;
    /** `true` — осколки полупрозрачные. */
    transparent?: boolean;
}
/** Настройки `effects.spriteSpray`. */
export interface SpriteSprayOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Начальная скорость, в единицах в секунду. */
    velocity: number[];
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Число частиц, от `0` до `255`. */
    count: number;
    /** Скорость спрайтов, от `0` до `255`. */
    speed: number;
    /** Разброс направлений спрайтов, от `0` до `255`; по умолчанию `0`. */
    noise?: number;
}
/** Настройки `effects.armorRicochet`. */
export interface ArmorRicochetOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Размер спрайта, от `0` до `255`: `10` — его собственный размер; по умолчанию `10`. */
    scale?: number;
}
/** Настройки `effects.bubbles` и `effects.bubbleTrail`. */
export interface BubblesOptions {
    /** Один угол коробки или один конец линии, где появляются пузыри. */
    start: number[];
    /** Другой угол коробки или другой конец линии. */
    end: number[];
    /** Высота, до которой поднимаются пузыри, в единицах. */
    height: number;
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Число пузырей, от `0` до `255`. */
    count: number;
    /** Скорость пузырей, в единицах в секунду. */
    speed: number;
}
/** Настройки `effects.bloodSprite`. */
export interface BloodSpriteOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Спрайт падающих капель, например `sprites/bloodspray.spr`, как его вернул `server.precache`. */
    spray: Resource;
    /** Спрайт пятна, которое держится мгновение, например `sprites/blood.spr`, как его вернул `server.precache`. */
    drop: Resource;
    /** Размер спрайта, от `0` до `255`: `10` — его собственный размер; по умолчанию `10`. */
    scale?: number;
    /** Цвет крови в палитре игры, от `0` до `255`: `247` (по умолчанию) — красный, `195` — жёлтый. */
    palette?: number;
}
/** Настройки `effects.projectile`. */
export interface ProjectileOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Начальная скорость, в единицах в секунду. */
    velocity: number[];
    /** Модель, которая рисуется, — `.mdl` или спрайт, — как её вернул `server.precache`. */
    model: Resource;
    /** Время жизни снаряда, в целых секундах, до `255`. */
    life: number;
    /** Игрок, сквозь которого снаряд пролетает; если не задан, снаряд попадает в любого. */
    owner?: Player;
}
/** Настройки `effects.spray`. */
export interface SprayOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Направление, куда летят брызги, — вектор; его длина не важна. */
    direction: number[];
    /** Модель, которая рисуется, — `.mdl` или спрайт, — как её вернул `server.precache`. */
    model: Resource;
    /** Число частиц, от `0` до `255`. */
    count: number;
    /** Скорость частиц, от `0` до `255`. */
    speed: number;
    /** Разброс направлений частиц, от `0` до `255`; по умолчанию `0`. */
    noise?: number;
    /** Режим отрисовки частиц, как `renderMode` сущности; по умолчанию `"normal"`. */
    renderMode?: RenderMode;
}
/** Настройки `effects.playerSprites`. */
export interface PlayerSpritesOptions {
    /** Игрок, из которого вылетают спрайты. */
    player: Player;
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Число спрайтов, от `0` до `255`. */
    count: number;
    /** Разброс размеров спрайтов, в процентах; по умолчанию `0` — все одинаковые. */
    variance?: number;
}
/** Настройки `effects.particleBurst`. */
export interface ParticleBurstOptions {
    /** Точка, где возникает эффект. */
    at: number[];
    /** Радиус вспышки, в единицах. */
    radius: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Цвет частиц в палитре игры, от `0` до `255`; по умолчанию `0`. */
    palette?: number;
}
/** Доля спрайтов огненного поля, уплывающих вверх, одно из `"none"`, `"some"` (половина) или `"all"`. */
export type FireRise = "none" | "some" | "all";
/** Вид спрайтов огненного поля, одно из `"opaque"`, `"alpha"` (полупрозрачные) или `"additive"` (светящиеся). */
export type FireBlend = "opaque" | "alpha" | "additive";
/** Настройки `effects.fireField`. */
export interface FireFieldOptions {
    /** Центр поля. */
    at: number[];
    /** Половина стороны квадрата, который заполняет огонь, в единицах. */
    radius: number;
    /** Спрайт, который рисуется, — как его вернул `server.precache`. */
    sprite: Resource;
    /** Число спрайтов, от `0` до `255`. */
    count: number;
    /** Время жизни эффекта, в секундах, до `25.5`. */
    life: number;
    /** Доля спрайтов, уплывающих вверх, одно из `"none"` (по умолчанию), `"some"` или `"all"`. */
    rise?: FireRise;
    /** Вид спрайтов, одно из `"opaque"` (по умолчанию), `"alpha"` или `"additive"`. */
    blend?: FireBlend;
    /** `true` — спрайты играют по 15 кадров в секунду; иначе — один раз за время жизни. */
    loop?: boolean;
    /** `true` — все спрайты начинают с одной высоты: плоское поле, а не куб. */
    flat?: boolean;
}
/** Настройки `effects.playerAttachment`. */
export interface PlayerAttachmentOptions {
    /** Игрок, к которому прикреплена модель. */
    player: Player;
    /** Модель, которая рисуется, — `.mdl` или спрайт, — как её вернул `server.precache`. */
    model: Resource;
    /** Время жизни эффекта, в секундах. */
    life: number;
    /** Высота модели над точкой игрока, в единицах; по умолчанию `0`. */
    offset?: number;
}
/**
 * Временные эффекты — лучи, взрывы, спрайты, искры, свет, кровь, — которые игра рисует на мгновение и забывает. Функция на эффект; настройки — его аргументы, второй аргумент — кто его видит:
 *
 * ```ts
 * const shock = server.precache("sprites/shockwave.spr");
 *
 * effects.beamCylinder({ at: here, radius: 385, sprite: shock, life: 0.4, width: 60, color: "#0096ff", alpha: 200 }, { near: here });
 * effects.sparks({ at: here });                          // все
 * effects.beamFollow({ entity: grenade, sprite: shock, life: 1, width: 5 }, { to: player });
 * ```
 *
 * Время — в секундах, цвет — шестнадцатеричная запись CSS, спрайт или модель — то, что вернул `server.precache`. Эффект, чей файл не прекэширован, не отправляется, а в консоли появляется строка.
 *
 * Pawn: `message_begin(..., SVC_TEMPENTITY)`, `TE_*`
 */
export declare namespace effects {
    /**
     * Луч между двумя точками.
     *
     * Pawn: `TE_BEAMPOINTS`
     */
    function beamPoints(options: BeamPointsOptions, to?: EffectRecipients): void;
    /**
     * Луч от сущности к точке; его начало следует за сущностью.
     *
     * Pawn: `TE_BEAMENTPOINT`
     */
    function beamEntityPoint(options: BeamEntityPointOptions, to?: EffectRecipients): void;
    /**
     * Луч между двумя сущностями, следующий за обеими.
     *
     * Pawn: `TE_BEAMENTS`
     */
    function beamEntities(options: BeamEntitiesOptions, to?: EffectRecipients): void;
    /**
     * Кольцо луча между двумя сущностями: они — его диаметр.
     *
     * Pawn: `TE_BEAMRING`
     */
    function beamRing(options: BeamEntitiesOptions, to?: EffectRecipients): void;
    /**
     * Цилиндр из луча, который растёт от точки до `radius` за время жизни, — ударная волна по земле:
     *
     * ```ts
     * effects.beamCylinder({ at: here, radius: 385, sprite: shock, life: 0.4, width: 60, color: "#0096ff", alpha: 200 }, { near: here });
     * ```
     *
     * Pawn: `TE_BEAMCYLINDER`
     */
    function beamCylinder(options: BeamCircleOptions, to?: EffectRecipients): void;
    /**
     * Диск из луча, который растёт от точки до `radius` за время жизни.
     *
     * Pawn: `TE_BEAMDISK`
     */
    function beamDisk(options: BeamCircleOptions, to?: EffectRecipients): void;
    /**
     * Кольцо из луча, повёрнутое к зрителю, которое растёт от точки до `radius` за время жизни.
     *
     * Pawn: `TE_BEAMTORUS`
     */
    function beamTorus(options: BeamCircleOptions, to?: EffectRecipients): void;
    /**
     * След за движущейся сущностью — гранатой, игроком, — пока она не остановится:
     *
     * ```ts
     * effects.beamFollow({ entity: grenade, sprite: trail, life: 1, width: 5, color: "#0096ff", alpha: 200 });
     * ```
     *
     * Pawn: `TE_BEAMFOLLOW`
     */
    function beamFollow(options: BeamFollowOptions, to?: EffectRecipients): void;
    /**
     * Луч между двумя точками со спрайтом на конце.
     *
     * Pawn: `TE_BEAMSPRITE`
     */
    function beamSprite(options: BeamSpriteOptions, to?: EffectRecipients): void;
    /**
     * Молния между двумя точками: луч с меньшим числом настроек.
     *
     * Pawn: `TE_LIGHTNING`
     */
    function lightning(options: LightningOptions, to?: EffectRecipients): void;
    /**
     * Убирает все лучи, прикреплённые к сущности.
     *
     * Pawn: `TE_KILLBEAM`
     */
    function killBeams(options: EntityEffectOptions, to?: EffectRecipients): void;
    /**
     * Взрыв: спрайт, два источника света, разлетающиеся частицы и звук; медленно поднимается.
     *
     * Pawn: `TE_EXPLOSION`
     */
    function explosion(options: ExplosionOptions, to?: EffectRecipients): void;
    /**
     * Вспышка тёмных частиц со звуком.
     *
     * Pawn: `TE_TAREXPLOSION`
     */
    function tarExplosion(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * Вспышка частиц цветов палитры игры, со звуком.
     *
     * Pawn: `TE_EXPLOSION2`
     */
    function particleExplosion(options: ParticleExplosionOptions, to?: EffectRecipients): void;
    /**
     * Клуб дыма: полупрозрачный спрайт, который поднимается.
     *
     * Pawn: `TE_SMOKE`
     */
    function smoke(options: SmokeOptions, to?: EffectRecipients): void;
    /**
     * Трассеры, слетающиеся в точку.
     *
     * Pawn: `TE_IMPLOSION`
     */
    function implosion(options: ImplosionOptions, to?: EffectRecipients): void;
    /**
     * Попадание пули: частицы и звук рикошета.
     *
     * Pawn: `TE_GUNSHOT`
     */
    function gunshot(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * Искры, падающие из точки.
     *
     * Pawn: `TE_SPARKS`
     */
    function sparks(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * Пуля от брони: быстрая искра и звук рикошета.
     *
     * Pawn: `TE_ARMOR_RICOCHET`
     */
    function armorRicochet(options: ArmorRicochetOptions, to?: EffectRecipients): void;
    /**
     * Всплеск частиц, как от лавы.
     *
     * Pawn: `TE_LAVASPLASH`
     */
    function lavaSplash(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * Всплеск частиц, как у телепорта.
     *
     * Pawn: `TE_TELEPORT`
     */
    function teleport(options: PointEffectOptions, to?: EffectRecipients): void;
    /**
     * Трассер, летящий от точки к точке.
     *
     * Pawn: `TE_TRACER`
     */
    function tracer(options: SegmentEffectOptions, to?: EffectRecipients): void;
    /**
     * Линия частиц между двумя точками, которая держится 30 секунд.
     *
     * Pawn: `TE_SHOWLINE`
     */
    function showLine(options: SegmentEffectOptions, to?: EffectRecipients): void;
    /**
     * Сноп трассеров в заданном направлении.
     *
     * Pawn: `TE_STREAK_SPLASH`
     */
    function streakSplash(options: StreakSplashOptions, to?: EffectRecipients): void;
    /**
     * Светящийся спрайт, который проигрывается один раз.
     *
     * Pawn: `TE_SPRITE`
     */
    function sprite(options: SpriteOptions, to?: EffectRecipients): void;
    /**
     * Светящийся спрайт, который держится какое-то время.
     *
     * Pawn: `TE_GLOWSPRITE`
     */
    function glowSprite(options: GlowSpriteOptions, to?: EffectRecipients): void;
    /**
     * Линия светящихся спрайтов, которые разлетаются, падают и гаснут.
     *
     * Pawn: `TE_SPRITETRAIL`
     */
    function spriteTrail(options: SpriteTrailOptions, to?: EffectRecipients): void;
    /**
     * Брызги полупрозрачных спрайтов.
     *
     * Pawn: `TE_SPRITE_SPRAY`
     */
    function spriteSpray(options: SpriteSprayOptions, to?: EffectRecipients): void;
    /**
     * Воронка спрайтов, слетающихся в точку или вылетающих из неё.
     *
     * Pawn: `TE_LARGEFUNNEL`
     */
    function largeFunnel(options: LargeFunnelOptions, to?: EffectRecipients): void;
    /**
     * Пузыри, поднимающиеся внутри браш-сущности, например воды.
     *
     * Pawn: `TE_FIZZ`
     */
    function fizz(options: FizzOptions, to?: EffectRecipients): void;
    /**
     * Пузыри, поднимающиеся из коробки.
     *
     * Pawn: `TE_BUBBLES`
     */
    function bubbles(options: BubblesOptions, to?: EffectRecipients): void;
    /**
     * Пузыри, поднимающиеся с линии.
     *
     * Pawn: `TE_BUBBLETRAIL`
     */
    function bubbleTrail(options: BubblesOptions, to?: EffectRecipients): void;
    /**
     * Свет, который освещает мир вокруг точки.
     *
     * Pawn: `TE_DLIGHT`
     */
    function dynamicLight(options: DynamicLightOptions, to?: EffectRecipients): void;
    /**
     * Свет на сущности, который освещает только сущности, не мир.
     *
     * Pawn: `TE_ELIGHT`
     */
    function entityLight(options: EntityLightOptions, to?: EffectRecipients): void;
    /**
     * Цветная линия между двумя точками.
     *
     * Pawn: `TE_LINE`
     */
    function line(options: LineOptions, to?: EffectRecipients): void;
    /**
     * Рёбра коробки, цветные.
     *
     * Pawn: `TE_BOX`
     */
    function box(options: BoxOptions, to?: EffectRecipients): void;
    /**
     * Брызги частиц крови.
     *
     * Pawn: `TE_BLOOD`
     */
    function blood(options: BloodOptions, to?: EffectRecipients): void;
    /**
     * Струя частиц крови.
     *
     * Pawn: `TE_BLOODSTREAM`
     */
    function bloodStream(options: BloodOptions, to?: EffectRecipients): void;
    /**
     * Кровь, как её рисует игра при попадании: падающие капли и пятно, которое держится мгновение.
     *
     * Pawn: `TE_BLOODSPRITE`
     */
    function bloodSprite(options: BloodSpriteOptions, to?: EffectRecipients): void;
    /**
     * Модель, брошенная из точки, которая отскакивает, — гильза из оружия.
     *
     * Pawn: `TE_MODEL`
     */
    function model(options: ModelOptions, to?: EffectRecipients): void;
    /**
     * Осколки модели, разлетающиеся из точки во все стороны.
     *
     * Pawn: `TE_EXPLODEMODEL`
     */
    function explodeModel(options: ExplodeModelOptions, to?: EffectRecipients): void;
    /**
     * Осколки, вылетающие из коробки, — что-то разбилось:
     *
     * ```ts
     * effects.breakModel({ at: box.origin, size: [16, 16, 16], velocity: [0, 0, 50], model: gibs, count: 8, life: 2, material: "glass" });
     * ```
     *
     * Pawn: `TE_BREAKMODEL`
     */
    function breakModel(options: BreakModelOptions, to?: EffectRecipients): void;
    /**
     * Модель, летящая как гвоздь, которая попадает в игроков.
     *
     * Pawn: `TE_PROJECTILE`
     */
    function projectile(options: ProjectileOptions, to?: EffectRecipients): void;
    /**
     * Россыпь моделей или спрайтов, брошенная в заданном направлении.
     *
     * Pawn: `TE_SPRAY`
     */
    function spray(options: SprayOptions, to?: EffectRecipients): void;
    /**
     * Спрайты, вылетающие из тела игрока.
     *
     * Pawn: `TE_PLAYERSPRITES`
     */
    function playerSprites(options: PlayerSpritesOptions, to?: EffectRecipients): void;
    /**
     * Вспышка частиц одного цвета палитры игры.
     *
     * Pawn: `TE_PARTICLEBURST`
     */
    function particleBurst(options: ParticleBurstOptions, to?: EffectRecipients): void;
    /**
     * Поле огненных спрайтов, заполняющее квадрат.
     *
     * Pawn: `TE_FIREFIELD`
     */
    function fireField(options: FireFieldOptions, to?: EffectRecipients): void;
    /**
     * Модель над игроком, которая ходит вместе с ним.
     *
     * Pawn: `TE_PLAYERATTACHMENT`
     */
    function playerAttachment(options: PlayerAttachmentOptions, to?: EffectRecipients): void;
    /**
     * Убирает все модели, прикреплённые к игроку.
     *
     * Pawn: `TE_KILLPLAYERATTACHMENTS`
     */
    function killPlayerAttachments(options: PlayerEffectOptions, to?: EffectRecipients): void;
}
