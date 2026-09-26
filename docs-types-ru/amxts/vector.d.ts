/// <reference path="../as-types.d.ts" />
/** Три числа, x y z, и вся математика над ними, которая нужна плагину. */
export declare class Vector extends Array<number> {
    constructor(x?: number, y?: number, z?: number);
    /** Первое число, `vector[0]`. */
    get x(): number;
    set x(value: number);
    /** Второе число, `vector[1]`. */
    get y(): number;
    set y(value: number);
    /** Третье число, `vector[2]`. */
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
    /** То же направление, длиной в единицу; нулевой вектор так и остаётся нулевым. */
    normalize(): Vector;
}
