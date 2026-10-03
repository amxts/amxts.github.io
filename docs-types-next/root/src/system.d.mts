/**
 * The files of a system's GitHub Release that a server runs: the name each is
 * attached under, and where it goes under the game folder (cstrike). A `tool`
 * is the compiler for `.ts` plugins written on the server, which a server has
 * only when its kit put it there.
 * @param {System} system
 * @returns {{ asset: string, path: string, tool: boolean }[]} the module first, then the tools
 */
export function serverFiles(system: System): {
    asset: string;
    path: string;
    tool: boolean;
}[];
/** A system's release manifest, attached beside its files: the version, and each file's size and sha256. */
export function manifestName(system: any): string;
/** The server image of a version. */
export function serverImage(version: any): string;
/**
 * The amxts release a module file is of, read from the ABI string it
 * carries - the file is read, not loaded, so a module a running server holds
 * is read as well. Null when there is no file or no such string.
 * @param {string} file
 * @returns {string | null} the version: `0.2.0`
 */
export function moduleVersion(file: string): string | null;
/**
 * `windows`, `win32`, `linux`, any case; null for anything else.
 * @param {string | undefined | null} value
 * @returns {System | null} the system, or null
 */
export function parseSystem(value: string | undefined | null): System | null;
/**
 * The server's addons/amxts folder, from what AMXTS_SERVER holds: that
 * folder itself, or the hlds folder, cstrike or cstrike/addons above it. A
 * path that is not there yet is taken as addons/amxts, as it is written -
 * dev builds, and deploys once it is - and so is a folder named amxts, or
 * one holding the module's plugins.ini. Throws, naming where it looked, for
 * a folder that is none of them.
 * @param {string} path
 * @returns {string} the folder; '' for ''
 */
export function serverFolder(path: string): string;
/**
 * What a server's files say it runs. `amxtsDir` is AMXTS_SERVER: the server's
 * addons/amxts, so hlds sits three folders up. Null when nothing there says.
 * @param {string} amxtsDir
 * @returns {{ system: System, reason: string } | null} the system and the file that said so, or null
 */
export function detectServerSystem(amxtsDir: string): {
    system: System;
    reason: string;
} | null;
/**
 * @typedef {object} ServerSystem
 * @property {System} system Windows or Linux
 * @property {'flag' | 'env' | 'server' | 'host'} from how it was decided
 * @property {string} [reason] what in the server's folder said so, when that decided it
 */
/**
 * The system a build compiles for; see the top of this file.
 * @param {string[]} [argv]
 * @param {Record<string, string | undefined>} [env]
 * @returns {ServerSystem} the system and how it was decided
 */
export function serverSystem(argv?: string[], env?: Record<string, string | undefined>): ServerSystem;
/**
 * The server's system as the build reports it: "Linux (hlds_linux)".
 * @param {ServerSystem} found
 */
export function describeSystem(found: ServerSystem): string;
/**
 * An executable's file name on that system.
 * @param {string} name
 * @param {System} [system]
 */
export function executable(name: string, system?: System): string;
/**
 * wamrc as the core has it for this machine: AMXTS_WAMRC, else the one of
 * its package for this system (an installed core), else the one built in
 * runtime/deps/wamr (a multi-config build puts it in Release/, a Makefile
 * build beside it), else the one `bun run build:linux` made in
 * runtime/build/linux. Either system's wamrc compiles for either system.
 * A checkout links the package's folder, which has no wamrc of its own.
 * @param {Record<string, string | undefined>} [env]
 * @returns {string} its path, which may not exist
 */
export function wamrcPath(env?: Record<string, string | undefined>): string;
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
/** The package that carries wamrc for this machine: the core's optional dependency for its system. */
export const WAMRC_PACKAGE: string;
export type ServerSystem = {
    /**
     * Windows or Linux
     */
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
