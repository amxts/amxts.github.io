/**
 * The running containers that mount this folder as /project, by name. Null
 * when docker does not answer.
 */
export declare function projectContainers(projectDir: string): string[] | null;
/**
 * Prints the amxts lines of each container's console from now on, for as
 * long as this process runs. With more than one, each line says whose.
 */
export declare function followConsoles(names: string[]): void;
/** The command that starts the server for this project. */
export declare function runCommand(projectDir: string): string;
