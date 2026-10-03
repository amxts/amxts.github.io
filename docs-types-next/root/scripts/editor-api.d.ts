import type { Lang } from './apply-docs';
import type { Project } from './project';
/** What .amxts/tsconfig.json takes from the copy. */
export interface EditorApi {
    /** Module names and the copied files they are, absolute. */
    paths: Record<string, string>;
    /** The copied core's folder, whose `.d.ts` files declare the globals. */
    core: string;
    /** Whether the copy was written now rather than found up to date. */
    written: boolean;
}
/**
 * Writes the editor's copy of the API for `lang` under `dir`, or removes it
 * for English; what the tsconfig maps to it, null for none.
 */
export declare function editorApi(project: Project, lang: Lang, dir: string): Promise<EditorApi | null>;
