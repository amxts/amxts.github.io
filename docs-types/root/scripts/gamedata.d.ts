export interface GamedataMember {
    className: string;
    name: string;
}
/**
 * The game rules' members the gamedata does not have: ReGameDLL's own, and
 * the voice manager's (the gamedata has m_VoiceGameMgr whole). They are
 * reapi's alone.
 */
export declare const REAPI_ONLY_MEMBERS: Set<string>;
/**
 * Where the gamedata has `reapi`, a member of reapi's class `owner`
 * (CBasePlayer, CBasePlayerWeapon, CSGameRules ...); null for a member it
 * does not have.
 */
export declare function gamedataMember(reapi: string, owner: string): GamedataMember | null;
