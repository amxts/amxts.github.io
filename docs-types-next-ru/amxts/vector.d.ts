/// <reference path="../as-types.d.ts" />
/** Три числа, x y z, и вся математика над ними, которая нужна плагину. */
export declare class Vector extends Array<number> {
    private room0;
    private room1;
    private room2;
    constructor(x?: number, y?: number, z?: number);
    /** Координата x, `vector[0]`. */
    get x(): number;
    set x(value: number);
    /** Координата y, `vector[1]`. */
    get y(): number;
    set y(value: number);
    /** Координата z, `vector[2]`. */
    get z(): number;
    set z(value: number);
    /** Новый вектор: этот плюс `other`, число к числу. */
    add(other: number[]): Vector;
    /** Новый вектор: этот минус `other` — путь от `other` до этой точки. */
    subtract(other: number[]): Vector;
    /** Новый вектор, где каждое число умножено на `factor`. */
    scale(factor: number): Vector;
    /** Скалярное произведение с `other`; ноль, если векторы перпендикулярны. */
    dot(other: number[]): number;
    /** Длина вектора: расстояние от начала координат карты до этой точки. */
    magnitude(): number;
    /** Расстояние от этой точки до `other`, в игровых единицах. */
    distanceTo(other: number[]): number;
    /** Новый вектор того же направления, длиной в единицу; нулевой вектор так и остаётся нулевым. */
    normalize(): Vector;
    /**
     * Направление, куда смотрят углы, длиной в единицу:
     * `Vector.fromAngles(player.viewAngle).scale(500)` — толчок туда, куда смотрит
     * игрок.
     *
     * Pawn: `angle_vector(..., ANGLEVECTOR_FORWARD, ...)`, `velocity_by_aim`
     */
    static fromAngles(angles: number[]): Vector;
    /**
     * Три направления углов, каждое длиной в единицу: куда они смотрят, вправо от
     * них и вверх — `const { forward, right } = Vector.directions(player.viewAngle)`.
     *
     * Pawn: `angle_vector`, `engfunc(EngFunc_MakeVectors, ...)`
     */
    static directions(angles: number[]): Directions;
    /**
     * Углы, которые смотрят вдоль этого вектора, как их держит взгляд игрока, —
     * наклон ниже горизонта положительный: `player.viewAngle =
     * target.subtract(player.eyes).toAngles()`. `Vector.fromAngles` превращает их
     * обратно.
     *
     * Pawn: `vector_to_angle`, `engfunc(EngFunc_VecToAngles, ...)`
     */
    toAngles(): Vector;
}
/** Три направления углов: вперёд, вправо и вверх — `Vector.directions`. */
export interface Directions {
    /** Направление, куда они смотрят. */
    forward: Vector;
    /** Вправо от них. */
    right: Vector;
    /** Вверх от них. */
    up: Vector;
}
