import type { System } from '../src/system.mjs';
export type { ServerSystem, System } from '../src/system.mjs';
export { describeSystem, detectServerSystem, executable, HOST_SYSTEM, MODULE_FILE, parseSystem, serverSystem, SYSTEM_NAME, SYSTEMS, TARGET_ABI, wamrcPath } from '../src/system.mjs';
/** Where the amxts module of a system is built: CMake's Release folder on Windows, runtime/build/linux from the Linux toolchain. */
export declare function modulePath(system: System): string;
/** AMX Mod X's Pawn compiler in amxmodx/base, for this machine. */
export declare function amxxpcPath(): string;
