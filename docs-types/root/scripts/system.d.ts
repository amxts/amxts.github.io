import type { System } from '../src/system.mjs';
export type { ServerSystem, System } from '../src/system.mjs';
export { describeSystem, detectServerSystem, executable, HOST_SYSTEM, manifestName, MODULE_FILE, moduleVersion, parseSystem, serverFiles, serverFolder, serverImage, serverSystem, SYSTEM_NAME, SYSTEMS, TARGET_ABI, WAMRC_PACKAGE, wamrcPath } from '../src/system.mjs';
/** Where the amxts module of a system is built: CMake's Release folder on Windows, runtime/build/linux from the Linux toolchain. */
export declare function modulePath(system: System): string;
/**
 * The API a plugin imports, and the declarations an editor reads with it
 * (the globals of amxts.d.ts, promise.types.d.ts): every file at the top of
 * as/. A server kit carries them beside its plugins.
 */
export declare function apiFiles(): string[];
/** AMX Mod X's Pawn compiler in amxmodx/base, for this machine. */
export declare function amxxpcPath(): string;
