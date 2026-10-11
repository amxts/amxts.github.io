/**
 * What the project's own files - in `root`, outside node_modules and .amxts
 * - write that TypeScript takes and the build does not: each the node it is
 * about and what to write instead.
 *
 * @param {ts.Program} program
 * @param {string} [root] the project's folder
 * @returns {{ node: ts.Node, message: string }[]} the problems, in the files' order
 */
export function buildProblems(program: ts.Program, root?: string): {
    node: ts.Node;
    message: string;
}[];
import ts from 'typescript';
