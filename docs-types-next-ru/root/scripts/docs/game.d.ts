import type { Text } from './events';
export interface GameDoc {
    summary: Text;
    fields?: Record<string, Text>;
}
export declare const GAME: Record<string, GameDoc>;
