/**
 * `windows`, `win32`, `linux`, any case; null for anything else.
 * @param {string | undefined | null} value
 * @returns {System | null}
 */
export function parseSystem(value: string | undefined | null): System | null;
/**
 * What a server's files say it runs. `amxtsDir` is AMXTS_SERVER: the server's
 * addons/amxts, so hlds sits three folders up. Null when nothing there says.
 * @param {string} amxtsDir
 * @returns {{ system: System, reason: string } | null}
 */
export function detectServerSystem(amxtsDir: string): {
    system: System;
    reason: string;
} | null;
/**
 * @typedef {object} ServerSystem
 * @property {System} system
 * @property {'flag' | 'env' | 'server' | 'host'} from how it was decided
 * @property {string} [reason] what in the server's folder said so, when that decided it
 */
/**
 * The system a build compiles for; see the top of this file.
 * @param {string[]} [argv]
 * @param {Record<string, string | undefined>} [env]
 * @returns {ServerSystem}
 */
export function serverSystem(argv?: string[], env?: Record<string, string | undefined>): ServerSystem;
/**
 * The server's system as the build reports it: "Linux (hlds_linux)".
 * @param {ServerSystem} found
 */
export function describeSystem(found: ServerSystem): string;
/** @typedef {'windows' | 'linux'} System */
/** @type {readonly System[]} */
export const SYSTEMS: readonly System[];
/** The system this machine runs. @type {System} */
export const HOST_SYSTEM: System;
/** How a person writes it. @type {Record<System, string>} */
export const SYSTEM_NAME: Record<System, string>;
/** wamrc's --target-abi: the object format the machine code is written in. @type {Record<System, string>} */
export const TARGET_ABI: Record<System, string>;
/** The amxts module's file, as AMX Mod X on that system looks it up for `amxts_amxx` in modules.ini. @type {Record<System, string>} */
export const MODULE_FILE: Record<System, string>;
export type ServerSystem = {
    system: System;
    /**
     * how it was decided
     */
    from: "flag" | "env" | "server" | "host";
    /**
     * what in the server's folder said so, when that decided it
     */
    reason?: string | undefined;
};
export type System = "windows" | "linux";
