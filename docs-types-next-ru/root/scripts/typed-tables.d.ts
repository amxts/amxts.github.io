import type { ImportReader } from './typed-configs';
/** The entry, by its place in the tree, as the files' imports have it once rewritten (scripts/project.ts). */
export declare const DATABASE_ENTRY = "~/sql";
export interface TypedTables {
    text: string;
    problems: string[];
}
/** `steamId` as the database names it: `steam_id`. */
export declare function snakeCase(name: string): string;
/**
 * The file with its tables' classes written and its queries' calls
 * rewritten; what could not be read, at its place.
 */
export declare function typedTables(path: string, display: string, text: string, imports: ImportReader): TypedTables;
