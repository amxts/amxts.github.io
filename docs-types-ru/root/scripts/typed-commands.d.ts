import type { ImportReader } from './typed-configs';
interface Usage {
    name: string;
    args: {
        name: string;
        optional: boolean;
    }[];
}
/** A usage's command name and arguments, in order: `"/kick <target> [reason]"`; a chat phrase, `"say rules"`, has none. Text: what is wrong with it. */
export declare function parseUsage(usage: string): Usage | string;
export interface TypedCommands {
    text: string;
    problems: string[];
}
/** The file with its commands' calls made the generated functions'; what does not build, with its place. */
export declare function typedCommands(path: string, display: string, text: string, imports: ImportReader): TypedCommands;
export {};
