/**
 * The official modules this core is developed with, from folders on this
 * machine: its package.json's `file:` links, by package name. Until the
 * modules are on npm, `--local` takes them from here.
 *
 * @returns {Record<string, string>} the package's name and its folder
 */
export function localModules(): Record<string, string>;
/**
 * @typedef {object} Task
 * @property {'bun' | 'node'} runtime what runs it
 * @property {string[]} args its arguments, the script first; the project is the current folder
 */
/**
 * How to run one of the core's tasks in the current folder:
 *
 * - `prepare` writes .amxts/tsconfig.json;
 * - `build` builds the plugins and the modules (`--deploy`, `--watch`, and
 *   `--docker`: for the Docker server that mounts the project - no deploy,
 *   Linux only, its console shown);
 * - `check` checks a module package before it is published;
 * - `upgrade` rewrites the project's code to this core's API, listing each change;
 * - `typecheck` runs TypeScript over the project, after `prepare`.
 *
 * A failure is printed by the task itself and ends it with a non-zero code.
 *
 * @param {string} name
 * @param {string[]} [args]
 * @returns {Task} what runs it, and its arguments
 */
export function task(name: string, args?: string[]): Task;
/**
 * The third-party includes this core's API is generated from, as
 * includes/sources.json pins them, by id: `reapi`, `resemiclip`,
 * each `{ name, version, license, home, url, sha256, include? }` - `url` gives
 * a file whose sha256 is `sha256`; for a .zip, `include` is the folder in it
 * whose .inc files are the includes. The command fetches ReAPI's for a
 * project without a server by these.
 *
 * @returns {Record<string, { name: string, version: string, license: string, home: string, url: string, sha256: string, include?: string }>} the sources
 */
export function includeSources(): Record<string, {
    name: string;
    version: string;
    license: string;
    home: string;
    url: string;
    sha256: string;
    include?: string;
}>;
/**
 * The Bun a `bun` task runs on: the binary of the `bun` package the core
 * depends on, so a project needs no Bun of its own. It is looked for in the
 * platform package (`@oven/bun-<os>-<arch>`), which every package manager
 * installs as an optional dependency without running a script, then where
 * `bun`'s own postinstall puts it (`bun/bin/bun.exe`, a placeholder until
 * then). Null when neither is there - the command then takes a Bun on PATH.
 *
 * @returns {string | null} the binary's path
 */
export function bunBinary(): string | null;
/** The TypeScript the core builds with: the command reads amxts.config.ts with its parser. */
export function typescript(): any;
/**
 * The patched compilers the build runs: the version each patch is for, and
 * whether its build is there.
 */
export function toolchain(): {
    assemblyscript: {
        version: string | null;
        built: boolean;
    };
    wamr: {
        version: string | null;
        wamrc: boolean;
    };
};
/** The core's folder: the package this file ships in. */
export const coreDir: string;
/** The core's version. */
export const version: string;
/**
 * The version of this contract. It goes up when a task, an export or what one
 * returns changes in a way an older command would misread; the command says
 * which of the two to update when they differ.
 */
export const cliApi: 4;
/** Whether the core runs from a checkout (a .git folder beside it) rather than from npm. */
export const fromSource: boolean;
export type Task = {
    /**
     * what runs it
     */
    runtime: "bun" | "node";
    /**
     * its arguments, the script first; the project is the current folder
     */
    args: string[];
};
export { describeSystem, serverSystem } from "./system.mjs";
