import type { System } from '../src/system.mjs';
export type { ServerSystem, System } from '../src/system.mjs';
export { describeSystem, detectServerSystem, HOST_SYSTEM, MODULE_FILE, parseSystem, serverSystem, SYSTEM_NAME, SYSTEMS, TARGET_ABI } from '../src/system.mjs';
/** An executable's file name on that system. */
export declare function executable(name: string, system?: System): string;
/**
 * wamrc as the core has it for this machine: AMXTS_WAMRC, else the one built
 * in runtime/deps/wamr (a multi-config build puts it in Release/, a Makefile
 * build beside it), else the one the Linux toolchain built in runtime/build/linux.
 * Either one compiles for either system.
 */
export declare function wamrcPath(env?: NodeJS.ProcessEnv): string;
/** Where the amxts module of a system is built: CMake's Release folder on Windows, runtime/build/linux from the Linux toolchain. */
export declare function modulePath(system: System): string;
/** AMX Mod X's Pawn compiler in amxmodx/base, for this machine. */
export declare function amxxpcPath(): string;
