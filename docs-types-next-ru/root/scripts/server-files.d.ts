export interface ServerFile {
    /** Under addons/amxts. */
    path: string;
    text: string;
    /** The author's: written only while missing. */
    keep: boolean;
}
/** plugins.ini naming `plugins`: the module's own names none, a kit's its example. */
export declare function pluginList(plugins?: string[]): ServerFile;
