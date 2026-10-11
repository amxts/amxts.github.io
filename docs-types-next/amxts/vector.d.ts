/// <reference path="../as-types.d.ts" />
/** Three numbers, x y z, with the math a plugin needs on them. */
export declare class Vector extends Array<number> {
    private room0;
    private room1;
    private room2;
    constructor(x?: number, y?: number, z?: number);
    /** The x coordinate, `vector[0]`. */
    get x(): number;
    set x(value: number);
    /** The y coordinate, `vector[1]`. */
    get y(): number;
    set y(value: number);
    /** The z coordinate, `vector[2]`. */
    get z(): number;
    set z(value: number);
    /** A new vector: this one plus `other`, number by number. */
    add(other: number[]): Vector;
    /** A new vector: this one minus `other`, the way from `other` to this point. */
    subtract(other: number[]): Vector;
    /** A new vector with every number multiplied by `factor`. */
    scale(factor: number): Vector;
    /** The dot product with `other`; zero when the two are at right angles. */
    dot(other: number[]): number;
    /** The vector's length: the distance from the map's origin to this point. */
    magnitude(): number;
    /** The distance from this point to `other`, in game units. */
    distanceTo(other: number[]): number;
    /** A new vector in the same direction, one unit long; a zero vector stays zero. */
    normalize(): Vector;
    /**
     * The direction angles look in, one unit long:
     * `Vector.fromAngles(player.viewAngle).scale(500)` is a push the way the
     * player looks.
     *
     * Pawn: `angle_vector(..., ANGLEVECTOR_FORWARD, ...)`, `velocity_by_aim`
     */
    static fromAngles(angles: number[]): Vector;
    /**
     * The three directions of angles, one unit long each: where they look,
     * to their right and above them - `const { forward, right } =
     * Vector.directions(player.viewAngle)`.
     *
     * Pawn: `angle_vector`, `engfunc(EngFunc_MakeVectors, ...)`
     */
    static directions(angles: number[]): Directions;
    /**
     * The angles that look along this vector, as a player's view holds them -
     * a pitch below the horizon positive: `player.viewAngle =
     * target.subtract(player.eyes).toAngles()`. `Vector.fromAngles` turns
     * them back.
     *
     * Pawn: `vector_to_angle`, `engfunc(EngFunc_VecToAngles, ...)`
     */
    toAngles(): Vector;
}
/** The three directions of angles: ahead, to the right and up - `Vector.directions`. */
export interface Directions {
    /** The direction they look in. */
    forward: Vector;
    /** To their right. */
    right: Vector;
    /** Above them. */
    up: Vector;
}
