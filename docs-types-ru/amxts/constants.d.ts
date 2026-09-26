/// <reference path="../as-types.d.ts" />
export declare const Invalid_Array: i32;
/** CVAR flags for create_cvar() and register_cvar(). */
export declare const FCVAR_NONE: i32;
export declare const FCVAR_ARCHIVE: i32;
export declare const FCVAR_USERINFO: i32;
export declare const FCVAR_SERVER: i32;
export declare const FCVAR_EXTDLL: i32;
export declare const FCVAR_CLIENTDLL: i32;
export declare const FCVAR_PROTECTED: i32;
export declare const FCVAR_SPONLY: i32;
export declare const FCVAR_PRINTABLEONLY: i32;
export declare const FCVAR_UNLOGGED: i32;
export declare const FCVAR_NOEXTRAWHITEPACE: i32;
export declare const CvarBound_Upper: i32;
export declare const CvarBound_Lower: i32;
export declare const floatround_round: i32;
export declare const floatround_floor: i32;
export declare const floatround_ceil: i32;
export declare const floatround_tozero: i32;
export declare const radian: i32;
export declare const degrees: i32;
export declare const grades: i32;
export declare const MAX_REGION_RANGE: i32;
export declare const ht_engine: i32;
export declare const ht_gamedll: i32;
export declare const ht_animating: i32;
export declare const ht_player: i32;
export declare const ht_gamerules: i32;
export declare const ht_rechecker: i32;
export declare const ht_grenade: i32;
export declare const ht_weaponbox: i32;
export declare const ht_weapon: i32;
export declare const ht_gib: i32;
export declare const ht_cbaseentity: i32;
export declare const ht_botmanager: i32;
export declare const mt_gamerules: i32;
export declare const mt_base: i32;
export declare const mt_animating: i32;
export declare const mt_basemonster: i32;
export declare const mt_player: i32;
export declare const mt_entvars: i32;
export declare const mt_playermove: i32;
export declare const mt_movevars: i32;
export declare const mt_usercmd: i32;
export declare const mt_pmtrace: i32;
export declare const mt_csplayer: i32;
export declare const mt_baseitem: i32;
export declare const mt_baseweapon: i32;
export declare const mt_weaponbox: i32;
export declare const mt_armoury: i32;
export declare const mt_grenade: i32;
export declare const mt_p228: i32;
export declare const mt_scout: i32;
export declare const mt_hegrenade: i32;
export declare const mt_xm1014: i32;
export declare const mt_c4: i32;
export declare const mt_mac10: i32;
export declare const mt_aug: i32;
export declare const mt_smokegrenade: i32;
export declare const mt_elite: i32;
export declare const mt_fiveseven: i32;
export declare const mt_ump45: i32;
export declare const mt_sg550: i32;
export declare const mt_galil: i32;
export declare const mt_famas: i32;
export declare const mt_usp: i32;
export declare const mt_glock18: i32;
export declare const mt_awp: i32;
export declare const mt_mp5n: i32;
export declare const mt_m249: i32;
export declare const mt_m3: i32;
export declare const mt_m4a1: i32;
export declare const mt_tmp: i32;
export declare const mt_g3sg1: i32;
export declare const mt_deagle: i32;
export declare const mt_sg552: i32;
export declare const mt_ak47: i32;
export declare const mt_knife: i32;
export declare const mt_p90: i32;
export declare const mt_shield: i32;
export declare const mt_rebuystruct: i32;
export declare const mt_mapinfo: i32;
export declare const mt_csplayerweapon: i32;
export declare const mt_gib: i32;
export declare const mt_netadr: i32;
export declare const mt_csentity: i32;
export declare const mt_netchan: i32;
export declare const HC_CONTINUE: i32;
export declare const HC_SUPERCEDE: i32;
export declare const HC_BREAK: i32;
export declare const HC_BYPASS: i32;
export declare const ATYPE_INTEGER: i32;
export declare const ATYPE_FLOAT: i32;
export declare const ATYPE_STRING: i32;
export declare const ATYPE_CLASSPTR: i32;
export declare const ATYPE_EDICT: i32;
export declare const ATYPE_EVARS: i32;
export declare const ATYPE_BOOL: i32;
export declare const ATYPE_VECTOR: i32;
export declare const ATYPE_TRACE: i32;
export declare const INVALID_HOOKCHAIN: i32;
export declare const EZH_OK: i32;
export declare const EZH_CONNECTION_FAILURE: i32;
export declare const EZH_EMPTY_RESPONSE: i32;
export declare const EZH_HOST_RESOLUTION_FAILURE: i32;
export declare const EZH_INTERNAL_ERROR: i32;
export declare const EZH_INVALID_URL_FORMAT: i32;
export declare const EZH_NETWORK_RECEIVE_ERROR: i32;
export declare const EZH_NETWORK_SEND_FAILURE: i32;
export declare const EZH_OPERATION_TIMEDOUT: i32;
export declare const EZH_PROXY_RESOLUTION_FAILURE: i32;
export declare const EZH_SSL_CONNECT_ERROR: i32;
export declare const EZH_SSL_LOCAL_CERTIFICATE_ERROR: i32;
export declare const EZH_SSL_REMOTE_CERTIFICATE_ERROR: i32;
export declare const EZH_SSL_CACERT_ERROR: i32;
export declare const EZH_GENERIC_SSL_ERROR: i32;
export declare const EZH_UNSUPPORTED_PROTOCOL: i32;
export declare const EZH_REQUEST_CANCELLED: i32;
export declare const EZH_TOO_MANY_REDIRECTS: i32;
export declare const EZH_UNKNOWN_ERROR: i32;
export declare const EZH_DownloadNow: i32;
export declare const EZH_DownloadTotal: i32;
export declare const EZH_UploadNow: i32;
export declare const EZH_UploadTotal: i32;
export declare const EZH_UNSECURE: i32;
export declare const EZH_SECURE_EXPLICIT: i32;
export declare const EZH_CANCEL_REQUEST: i32;
export declare const EZH_FORGET_REQUEST: i32;
export declare const EzJSONError: i32;
export declare const EzJSONNull: i32;
export declare const EzJSONString: i32;
export declare const EzJSONNumber: i32;
export declare const EzJSONObject: i32;
export declare const EzJSONArray: i32;
export declare const EzJSONBoolean: i32;
export declare const EzInvalid_JSON: i32;
export declare const RESEMICLIP_DISABLED: i32;
export declare const RESEMICLIP_ALL: i32;
export declare const CFG_FILE_INVALID: i32;
export declare const CFG_SECTION_INVALID: i32;
export declare const CFG_ENTRY_SIMPLE: i32;
export declare const CFG_ENTRY_BRACKET: i32;
export declare const CFG_CONTENT_SIMPLE: i32;
export declare const CFG_CONTENT_STRINGS: i32;
export declare const CFG_CONTENT_ENTRIES: i32;
/** Menu Core System — public API include */
export declare const MP_LOCKED: i32;
export declare const MP_GLOBAL_TIMER: i32;
export declare const MP_TIMER_DURATION: i32;
export declare const MP_HIDE_BACK: i32;
export declare const MP_HIDE_EXIT: i32;
export declare const MP_SECTION: i32;
export declare const MP_ON_TIMEOUT: i32;
export declare const MP_ACTIVE_ON: i32;
export declare const MP_FILTER: i32;
export declare const TEAM_FOR_RED: string;
export declare const TEAM_FOR_BLUE: string;
export declare const TEAM_FOR_GREY: string;
/** Calculate the distance between geographical coordinates, latitude and longitude. */
export declare const SYSTEM_METRIC: i32;
export declare const SYSTEM_IMPERIAL: i32;
export declare const CONTINENT_UNKNOWN: i32;
export declare const CONTINENT_AFRICA: i32;
export declare const CONTINENT_ANTARCTICA: i32;
export declare const CONTINENT_ASIA: i32;
export declare const CONTINENT_EUROPE: i32;
export declare const CONTINENT_NORTH_AMERICA: i32;
export declare const CONTINENT_OCEANIA: i32;
export declare const CONTINENT_SOUTH_AMERICA: i32;
export declare const CA_TYPE_NONE: i32;
export declare const CA_TYPE_DPROTO: i32;
export declare const CA_TYPE_STEAM: i32;
export declare const CA_TYPE_STEAMEMU: i32;
export declare const CA_TYPE_REVEMU: i32;
export declare const CA_TYPE_OLDREVEMU: i32;
export declare const CA_TYPE_HLTV: i32;
export declare const CA_TYPE_SC2009: i32;
export declare const CA_TYPE_AVSMP: i32;
export declare const CA_TYPE_SXEI: i32;
export declare const CA_TYPE_REVEMU2013: i32;
export declare const CA_TYPE_SSE3: i32;
export declare const RES_TYPE_NONE: i32;
export declare const RES_TYPE_EXISTS: i32;
export declare const RES_TYPE_MISSING: i32;
export declare const RES_TYPE_IGNORE: i32;
export declare const RES_TYPE_HASH_ANY: i32;
export declare const RC_FileConsistencyProcess: i32;
export declare const RC_FileConsistencyFinal: i32;
export declare const RC_CmdExec: i32;
/** Internal AMXX buffer size for string retrieval. */
export declare const MAX_STRING_LENGTH: i32;
/** The maximum buffer size required to store a map's name. */
export declare const MAX_MAPNAME_LENGTH: i32;
/** Defines and constants related to the maximum number of clients. */
export declare const MAX_PLAYERS: i32;
/** The maximum buffer size required to store a client's name. */
export declare const MAX_NAME_LENGTH: i32;
/** The maximum buffer size required to store a client's IP address without a port. */
export declare const MAX_IP_LENGTH: i32;
/** The maximum buffer size required to store a client's IP address with a port. */
export declare const MAX_IP_WITH_PORT_LENGTH: i32;
/** The maximum buffer size required to store a client's AuthID. */
export declare const MAX_AUTHID_LENGTH: i32;
/** The maximum buffer size required to store a resource path. */
export declare const MAX_RESOURCE_PATH_LENGTH: i32;
/** The maximum buffer size that can be displayed in a MOTD. */
export declare const MAX_MOTD_LENGTH: i32;
/** The maximum size accepted by the user info buffer. */
export declare const MAX_USER_INFO_LENGTH: i32;
/** The maximum buffer size that can be displayed in a menu. */
export declare const MAX_MENU_LENGTH: i32;
/** Admin level constants */
export declare const ADMIN_ALL: i32;
export declare const ADMIN_IMMUNITY: i32;
export declare const ADMIN_RESERVATION: i32;
export declare const ADMIN_KICK: i32;
export declare const ADMIN_BAN: i32;
export declare const ADMIN_SLAY: i32;
export declare const ADMIN_MAP: i32;
export declare const ADMIN_CVAR: i32;
export declare const ADMIN_CFG: i32;
export declare const ADMIN_CHAT: i32;
export declare const ADMIN_VOTE: i32;
export declare const ADMIN_PASSWORD: i32;
export declare const ADMIN_RCON: i32;
export declare const ADMIN_LEVEL_A: i32;
export declare const ADMIN_LEVEL_B: i32;
export declare const ADMIN_LEVEL_C: i32;
export declare const ADMIN_LEVEL_D: i32;
export declare const ADMIN_LEVEL_E: i32;
export declare const ADMIN_LEVEL_F: i32;
export declare const ADMIN_LEVEL_G: i32;
export declare const ADMIN_LEVEL_H: i32;
export declare const ADMIN_MENU: i32;
export declare const ADMIN_BAN_TEMP: i32;
export declare const ADMIN_ADMIN: i32;
export declare const ADMIN_USER: i32;
/** Admin authentication behavior flags */
export declare const FLAG_KICK: i32;
export declare const FLAG_TAG: i32;
export declare const FLAG_AUTHID: i32;
export declare const FLAG_IP: i32;
export declare const FLAG_NOPASS: i32;
export declare const FLAG_CASE_SENSITIVE: i32;
/** Return codes */
export declare const PLUGIN_CONTINUE: i32;
export declare const PLUGIN_HANDLED: i32;
export declare const PLUGIN_HANDLED_MAIN: i32;
/** HI weapon constants */
export declare const HIW_BERETTA: i32;
export declare const HIW_SPAS12: i32;
export declare const HIW_M4A1: i32;
export declare const HIW_MP5A4: i32;
export declare const HIW_MP5SD5: i32;
export declare const HIW_AK47: i32;
export declare const HIW_AKS74U: i32;
export declare const HIW_GLOCK: i32;
export declare const HIW_M11: i32;
export declare const HIW_M11SD: i32;
export declare const HIW_PSG1: i32;
export declare const HIW_ZASTAVA: i32;
export declare const HIW_M16A2: i32;
export declare const HIW_REMINGTON: i32;
export declare const HIW_NATOGREN: i32;
export declare const HIW_TANGOGREN: i32;
export declare const HIW_FLASHBANG: i32;
/** Parts of body for hits */
export declare const HIT_GENERIC: i32;
export declare const HIT_HEAD: i32;
export declare const HIT_CHEST: i32;
export declare const HIT_STOMACH: i32;
export declare const HIT_LEFTARM: i32;
export declare const HIT_RIGHTARM: i32;
export declare const HIT_LEFTLEG: i32;
export declare const HIT_RIGHTLEG: i32;
export declare const HIT_SHIELD: i32;
export declare const MAX_BODYHITS: i32;
/** Channels */
export declare const CHAN_AUTO: i32;
export declare const CHAN_WEAPON: i32;
export declare const CHAN_VOICE: i32;
export declare const CHAN_ITEM: i32;
export declare const CHAN_BODY: i32;
export declare const CHAN_STREAM: i32;
export declare const CHAN_STATIC: i32;
export declare const CHAN_NETWORKVOICE_BASE: i32;
export declare const CHAN_NETWORKVOICE_END: i32;
/** Pitch values */
export declare const PITCH_NORM: i32;
export declare const PITCH_LOW: i32;
export declare const PITCH_HIGH: i32;
/** Sound behavior constants */
export declare const SND_SPAWNING: i32;
export declare const SND_STOP: i32;
export declare const SND_CHANGE_VOL: i32;
export declare const SND_CHANGE_PITCH: i32;
/** Menu keys */
export declare const MENU_KEY_1: i32;
export declare const MENU_KEY_2: i32;
export declare const MENU_KEY_3: i32;
export declare const MENU_KEY_4: i32;
export declare const MENU_KEY_5: i32;
export declare const MENU_KEY_6: i32;
export declare const MENU_KEY_7: i32;
export declare const MENU_KEY_8: i32;
export declare const MENU_KEY_9: i32;
export declare const MENU_KEY_0: i32;
/** Language constants */
export declare const LANG_SERVER: i32;
export declare const LANG_PLAYER: i32;
/** Invalid plugin id */
export declare const INVALID_PLUGIN_ID: i32;
/** Menu and menu item status codes */
export declare const MENU_TIMEOUT: i32;
export declare const MENU_EXIT: i32;
export declare const MENU_BACK: i32;
export declare const MENU_MORE: i32;
export declare const ITEM_IGNORE: i32;
export declare const ITEM_ENABLED: i32;
export declare const ITEM_DISABLED: i32;
/** AMX error codes */
export declare const AMX_ERR_NATIVE: i32;
export declare const AMX_ERR_MEMACCESS: i32;
export declare const AMX_ERR_NONE: i32;
export declare const AMX_ERR_BOUNDS: i32;
export declare const AMX_ERR_STACKERR: i32;
export declare const AMX_ERR_STACKLOW: i32;
export declare const AMX_ERR_HEAPLOW: i32;
export declare const AMX_ERR_DIVIDE: i32;
export declare const AMX_ERR_NOTFOUND: i32;
export declare const AMX_ERR_PARAMS: i32;
export declare const AMX_ERR_GENERAL: i32;
/** Generic invalid handle value */
export declare const INVALID_HANDLE: i32;
/** Stop types for plugin forwards */
export declare const ET_IGNORE: i32;
export declare const ET_STOP: i32;
export declare const ET_STOP2: i32;
export declare const ET_CONTINUE: i32;
/** Parameter types for plugin forwards */
export declare const FP_CELL: i32;
export declare const FP_FLOAT: i32;
export declare const FP_STRING: i32;
export declare const FP_ARRAY: i32;
export declare const FP_VAL_BYREF: i32;
export declare const print_notify: i32;
export declare const print_console: i32;
export declare const print_chat: i32;
export declare const print_center: i32;
export declare const print_radio: i32;
export declare const print_team_default: i32;
export declare const print_team_grey: i32;
export declare const print_team_red: i32;
export declare const print_team_blue: i32;
export declare const engprint_console: i32;
export declare const engprint_center: i32;
export declare const engprint_chat: i32;
export declare const kRenderNormal: i32;
export declare const kRenderTransColor: i32;
export declare const kRenderTransTexture: i32;
export declare const kRenderGlow: i32;
export declare const kRenderTransAlpha: i32;
export declare const kRenderTransAdd: i32;
export declare const kRenderFxNone: i32;
export declare const kRenderFxPulseSlow: i32;
export declare const kRenderFxPulseFast: i32;
export declare const kRenderFxPulseSlowWide: i32;
export declare const kRenderFxPulseFastWide: i32;
export declare const kRenderFxFadeSlow: i32;
export declare const kRenderFxFadeFast: i32;
export declare const kRenderFxSolidSlow: i32;
export declare const kRenderFxSolidFast: i32;
export declare const kRenderFxStrobeSlow: i32;
export declare const kRenderFxStrobeFast: i32;
export declare const kRenderFxStrobeFaster: i32;
export declare const kRenderFxFlickerSlow: i32;
export declare const kRenderFxFlickerFast: i32;
export declare const kRenderFxNoDissipation: i32;
export declare const kRenderFxDistort: i32;
export declare const kRenderFxHologram: i32;
export declare const kRenderFxDeadPlayer: i32;
export declare const kRenderFxExplode: i32;
export declare const kRenderFxGlowShell: i32;
export declare const kRenderFxClampMinScale: i32;
export declare const kRenderFxLightMultiplier: i32;
export declare const force_exactfile: i32;
export declare const force_model_samebounds: i32;
export declare const force_model_specifybounds: i32;
export declare const module_none: i32;
export declare const module_query: i32;
export declare const module_badload: i32;
export declare const module_loaded: i32;
export declare const module_noinfo: i32;
export declare const module_noquery: i32;
export declare const module_noattach: i32;
export declare const module_old: i32;
export declare const LibType_Library: i32;
export declare const LibType_Class: i32;
export declare const AdminProp_Auth: i32;
export declare const AdminProp_Password: i32;
export declare const AdminProp_Access: i32;
export declare const AdminProp_Flags: i32;
export declare const Hash_Crc32: i32;
export declare const Hash_Md5: i32;
export declare const Hash_Sha1: i32;
export declare const Hash_Sha256: i32;
export declare const Hash_Sha3_224: i32;
export declare const Hash_Sha3_256: i32;
export declare const Hash_Sha3_384: i32;
export declare const Hash_Sha3_512: i32;
export declare const Hash_Keccak_224: i32;
export declare const Hash_Keccak_256: i32;
export declare const Hash_Keccak_384: i32;
export declare const Hash_Keccak_512: i32;
export declare const SetTask_Once: i32;
export declare const SetTask_RepeatTimes: i32;
export declare const SetTask_Repeat: i32;
export declare const SetTask_AfterMapStart: i32;
export declare const SetTask_BeforeMapChange: i32;
export declare const RegisterEvent_None: i32;
export declare const RegisterEvent_Global: i32;
export declare const RegisterEvent_Single: i32;
export declare const RegisterEvent_OnceForMultiple: i32;
export declare const RegisterEvent_OnlyDead: i32;
export declare const RegisterEvent_OnlyAlive: i32;
export declare const RegisterEvent_OnlyHuman: i32;
export declare const RegisterEvent_OnlyBots: i32;
export declare const GetPlayers_None: i32;
export declare const GetPlayers_ExcludeDead: i32;
export declare const GetPlayers_ExcludeAlive: i32;
export declare const GetPlayers_ExcludeBots: i32;
export declare const GetPlayers_ExcludeHuman: i32;
export declare const GetPlayers_MatchTeam: i32;
export declare const GetPlayers_MatchNameSubstring: i32;
export declare const GetPlayers_CaseInsensitive: i32;
export declare const GetPlayers_ExcludeHLTV: i32;
export declare const GetPlayers_IncludeConnecting: i32;
export declare const FindPlayer_None: i32;
export declare const FindPlayer_MatchName: i32;
export declare const FindPlayer_MatchNameSubstring: i32;
export declare const FindPlayer_MatchAuthId: i32;
export declare const FindPlayer_MatchIP: i32;
export declare const FindPlayer_MatchTeam: i32;
export declare const FindPlayer_ExcludeDead: i32;
export declare const FindPlayer_ExcludeAlive: i32;
export declare const FindPlayer_ExcludeBots: i32;
export declare const FindPlayer_ExcludeHuman: i32;
export declare const FindPlayer_LastMatched: i32;
export declare const FindPlayer_MatchUserId: i32;
export declare const FindPlayer_CaseInsensitive: i32;
export declare const FindPlayer_IncludeConnecting: i32;
export declare const STATSX_KILLS: i32;
export declare const STATSX_DEATHS: i32;
export declare const STATSX_HEADSHOTS: i32;
export declare const STATSX_TEAMKILLS: i32;
export declare const STATSX_SHOTS: i32;
export declare const STATSX_HITS: i32;
export declare const STATSX_DAMAGE: i32;
export declare const STATSX_RANK: i32;
export declare const STATSX_MAX_STATS: i32;
export declare const Origin_Client: i32;
export declare const Origin_Eyes: i32;
export declare const Origin_AimEndClient: i32;
export declare const Origin_AimEndEyes: i32;
export declare const Origin_CS_LastBullet: i32;
/** Maximum path length. */
export declare const PLATFORM_MAX_PATH: i32;
/** File position modes for use with fseek(). */
export declare const SEEK_SET: i32;
export declare const SEEK_CUR: i32;
export declare const SEEK_END: i32;
/** Options for use with file_size() flag parameter. */
export declare const FSOPT_BYTES_COUNT: i32;
export declare const FSOPT_LINES_COUNT: i32;
export declare const FSOPT_END_WITH_LF: i32;
/** Data block modes for use with fread*() and fwrite*(). */
export declare const BLOCK_INT: i32;
export declare const BLOCK_SHORT: i32;
export declare const BLOCK_CHAR: i32;
export declare const BLOCK_BYTE: i32;
export declare const FileType_Unknown: i32;
export declare const FileType_Directory: i32;
export declare const FileType_File: i32;
export declare const FileTime_LastAccess: i32;
export declare const FileTime_Created: i32;
export declare const FileTime_LastChange: i32;
export declare const TransKey_Bad: i32;
/** Used for angle_vector() */
export declare const ANGLEVECTOR_FORWARD: i32;
export declare const ANGLEVECTOR_RIGHT: i32;
export declare const ANGLEVECTOR_UP: i32;
export declare const Sort_Ascending: i32;
export declare const Sort_Descending: i32;
export declare const Sort_Random: i32;
export declare const Sort_Integer: i32;
export declare const Sort_Float: i32;
export declare const Sort_String: i32;
export declare const Invalid_Stack: i32;
export declare const Invalid_Trie: i32;
export declare const Invalid_TrieIter: i32;
export declare const Invalid_Snapshot: i32;
export declare const Invalid_DataPack: i32;
/** Menu will have an exit option (default) */
export declare const MEXIT_ALL: i32;
/** Menu will have an exit option, even when pagination is disabled. */
export declare const MEXIT_FORCE: i32;
/** Menu will not have an exit option */
export declare const MEXIT_NEVER: i32;
/** Number of items per page (param1 = number, 0=no paginating, 7=default) */
export declare const MPROP_PERPAGE: i32;
/** Name of the back button (param1 = string) */
export declare const MPROP_BACKNAME: i32;
/** Name of the next button (param1 = string) */
export declare const MPROP_NEXTNAME: i32;
/** Name of the exit button (param1 = string) */
export declare const MPROP_EXITNAME: i32;
/** Menu title text (param1 = string) */
export declare const MPROP_TITLE: i32;
/** Exit functionality (param1 = number, see MEXIT constants) */
export declare const MPROP_EXIT: i32;
/** Sets whether colors are not auto (param1 = number, 0=default) */
export declare const MPROP_NOCOLORS: i32;
/** Color indicator to use for numbers (param1 = string, "\r"=default) */
export declare const MPROP_NUMBER_COLOR: i32;
/** Function to be called on Back and Next (param1 = string) */
export declare const MPROP_PAGE_CALLBACK: i32;
/** Whether to show the page number in menu title (param1 = bool, true = default) */
export declare const MPROP_SHOWPAGE: i32;
/** @deprecated */
export declare const MEXIT_NORMAL: i32;
export declare const MENUPAD_NONE: i32;
export declare const MENUPAD_PAGE: i32;
export declare const MPROP_ORDER: i32;
export declare const MPROP_PADMENU: i32;
export declare const Invalid_SMCParser: i32;
export declare const SMCParse_Continue: i32;
export declare const SMCParse_Halt: i32;
export declare const SMCParse_HaltFail: i32;
export declare const SMCError_Okay: i32;
export declare const SMCError_StreamOpen: i32;
export declare const SMCError_StreamError: i32;
export declare const SMCError_Custom: i32;
export declare const SMCError_InvalidSection1: i32;
export declare const SMCError_InvalidSection2: i32;
export declare const SMCError_InvalidSection3: i32;
export declare const SMCError_InvalidSection4: i32;
export declare const SMCError_InvalidSection5: i32;
export declare const SMCError_InvalidTokens: i32;
export declare const SMCError_TokenOverflow: i32;
export declare const SMCError_InvalidProperty1: i32;
export declare const Invalid_INIParser: i32;
export declare const Invalid_GameConfig: i32;
export declare const NULLENT: i32;
export declare const MAX_WEAPONS: i32;
export declare const MAX_CLIENTS: i32;
export declare const MAX_ITEM_TYPES: i32;
export declare const MAX_EDICT_BITS: i32;
export declare const MAX_EDICTS: i32;
/** get_entvar(entity, var_button) or get_entvar(entity, var_oldbuttons) values */
export declare const IN_ATTACK: i32;
export declare const IN_JUMP: i32;
export declare const IN_DUCK: i32;
export declare const IN_FORWARD: i32;
export declare const IN_BACK: i32;
export declare const IN_USE: i32;
export declare const IN_CANCEL: i32;
export declare const IN_LEFT: i32;
export declare const IN_RIGHT: i32;
export declare const IN_MOVELEFT: i32;
export declare const IN_MOVERIGHT: i32;
export declare const IN_ATTACK2: i32;
export declare const IN_RUN: i32;
export declare const IN_RELOAD: i32;
export declare const IN_ALT1: i32;
export declare const IN_SCORE: i32;
/** get_entvar(entity, var_flags) values */
export declare const FL_FLY: i32;
export declare const FL_SWIM: i32;
export declare const FL_CONVEYOR: i32;
export declare const FL_CLIENT: i32;
export declare const FL_INWATER: i32;
export declare const FL_MONSTER: i32;
export declare const FL_GODMODE: i32;
export declare const FL_NOTARGET: i32;
export declare const FL_SKIPLOCALHOST: i32;
export declare const FL_ONGROUND: i32;
export declare const FL_PARTIALGROUND: i32;
export declare const FL_WATERJUMP: i32;
export declare const FL_FROZEN: i32;
export declare const FL_FAKECLIENT: i32;
export declare const FL_DUCKING: i32;
export declare const FL_FLOAT: i32;
export declare const FL_GRAPHED: i32;
export declare const FL_IMMUNE_WATER: i32;
export declare const FL_IMMUNE_SLIME: i32;
export declare const FL_IMMUNE_LAVA: i32;
export declare const FL_PROXY: i32;
export declare const FL_ALWAYSTHINK: i32;
export declare const FL_BASEVELOCITY: i32;
export declare const FL_MONSTERCLIP: i32;
export declare const FL_ONTRAIN: i32;
export declare const FL_WORLDBRUSH: i32;
export declare const FL_SPECTATOR: i32;
export declare const FL_CUSTOMENTITY: i32;
export declare const FL_KILLME: i32;
export declare const FL_DORMANT: i32;
/** global_get(glb_trace_flags) values */
export declare const FTRACE_BULLET: i32;
export declare const FTRACE_FLASH: i32;
export declare const FTRACE_KNIFE: i32;
/** get_entvar(entity, var_movetype) values */
export declare const MOVETYPE_NONE: i32;
export declare const MOVETYPE_WALK: i32;
export declare const MOVETYPE_STEP: i32;
export declare const MOVETYPE_FLY: i32;
export declare const MOVETYPE_TOSS: i32;
export declare const MOVETYPE_PUSH: i32;
export declare const MOVETYPE_NOCLIP: i32;
export declare const MOVETYPE_FLYMISSILE: i32;
export declare const MOVETYPE_BOUNCE: i32;
export declare const MOVETYPE_BOUNCEMISSILE: i32;
export declare const MOVETYPE_FOLLOW: i32;
export declare const MOVETYPE_PUSHSTEP: i32;
/** get_entvar(entity, var_solid) values */
export declare const SOLID_NOT: i32;
export declare const SOLID_TRIGGER: i32;
export declare const SOLID_BBOX: i32;
export declare const SOLID_SLIDEBOX: i32;
export declare const SOLID_BSP: i32;
/** get_entvar(entity, var_deadflag) values */
export declare const DEAD_NO: i32;
export declare const DEAD_DYING: i32;
export declare const DEAD_DEAD: i32;
export declare const DEAD_RESPAWNABLE: i32;
export declare const DEAD_DISCARDBODY: i32;
/** get_entvar(entity, var_effects) values */
export declare const EF_BRIGHTFIELD: i32;
export declare const EF_MUZZLEFLASH: i32;
export declare const EF_BRIGHTLIGHT: i32;
export declare const EF_DIMLIGHT: i32;
export declare const EF_INVLIGHT: i32;
export declare const EF_NOINTERP: i32;
export declare const EF_LIGHT: i32;
export declare const EF_NODRAW: i32;
export declare const EF_FORCEVISIBILITY: i32;
export declare const EF_OWNER_VISIBILITY: i32;
export declare const EF_OWNER_NO_VISIBILITY: i32;
export declare const EF_NOSLERP: i32;
export declare const EF_FOLLOWKEEPRENDER: i32;
/** Temp entity bounce sound types */
export declare const TE_BOUNCE_NULL: i32;
export declare const TE_BOUNCE_SHELL: i32;
export declare const TE_BOUNCE_SHOTSHELL: i32;
/** Spectating camera mode constants */
export declare const OBS_NONE: i32;
export declare const OBS_CHASE_LOCKED: i32;
export declare const OBS_CHASE_FREE: i32;
export declare const OBS_ROAMING: i32;
export declare const OBS_IN_EYE: i32;
export declare const OBS_MAP_FREE: i32;
export declare const OBS_MAP_CHASE: i32;
/** Custom constants iuser3 */
export declare const PLAYER_CAN_SHOOT: i32;
export declare const PLAYER_FREEZE_TIME_OVER: i32;
export declare const PLAYER_IN_BOMB_ZONE: i32;
export declare const PLAYER_HOLDING_SHIELD: i32;
export declare const PLAYER_PREVENT_DUCK: i32;
export declare const PLAYER_PREVENT_CLIMB: i32;
export declare const PLAYER_PREVENT_JUMP: i32;
/** Instant damage values for use with the 3rd parameter of the "Damage" client */
export declare const DMG_GENERIC: i32;
export declare const DMG_CRUSH: i32;
export declare const DMG_BULLET: i32;
export declare const DMG_SLASH: i32;
export declare const DMG_BURN: i32;
export declare const DMG_FREEZE: i32;
export declare const DMG_FALL: i32;
export declare const DMG_BLAST: i32;
export declare const DMG_CLUB: i32;
export declare const DMG_SHOCK: i32;
export declare const DMG_SONIC: i32;
export declare const DMG_ENERGYBEAM: i32;
export declare const DMG_NEVERGIB: i32;
export declare const DMG_ALWAYSGIB: i32;
export declare const DMG_DROWN: i32;
export declare const DMG_PARALYZE: i32;
export declare const DMG_NERVEGAS: i32;
export declare const DMG_POISON: i32;
export declare const DMG_RADIATION: i32;
export declare const DMG_DROWNRECOVER: i32;
export declare const DMG_ACID: i32;
export declare const DMG_SLOWBURN: i32;
export declare const DMG_SLOWFREEZE: i32;
export declare const DMG_MORTAR: i32;
export declare const DMG_GRENADE: i32;
export declare const DMG_GIB_CORPSE: i32;
export declare const DMG_SHOWNHUD: i32;
/** When calling KILLED(), a value that governs gib behavior is expected to be */
export declare const GIB_NORMAL: i32;
export declare const GIB_NEVER: i32;
export declare const GIB_ALWAYS: i32;
/** Player physics flags bits */
export declare const PFLAG_ONLADDER: i32;
export declare const PFLAG_ONSWING: i32;
export declare const PFLAG_ONTRAIN: i32;
export declare const PFLAG_ONBARNACLE: i32;
export declare const PFLAG_DUCKING: i32;
export declare const PFLAG_USING: i32;
export declare const PFLAG_OBSERVER: i32;
/** Player HUD */
export declare const HIDEHUD_WEAPONS: i32;
export declare const HIDEHUD_FLASHLIGHT: i32;
export declare const HIDEHUD_ALL: i32;
export declare const HIDEHUD_HEALTH: i32;
export declare const HIDEHUD_TIMER: i32;
export declare const HIDEHUD_MONEY: i32;
export declare const HIDEHUD_CROSSHAIR: i32;
export declare const HIDEHUD_OBSERVER_CROSSHAIR: i32;
/** Item's flags */
export declare const ITEM_FLAG_SELECTONEMPTY: i32;
export declare const ITEM_FLAG_NOAUTORELOAD: i32;
export declare const ITEM_FLAG_NOAUTOSWITCHEMPTY: i32;
export declare const ITEM_FLAG_LIMITINWORLD: i32;
export declare const ITEM_FLAG_EXHAUSTIBLE: i32;
export declare const ITEM_FLAG_NOFIREUNDERWATER: i32;
/** func_train */
export declare const SF_TRAIN_WAIT_RETRIGGER: i32;
export declare const SF_TRAIN_START_ON: i32;
export declare const SF_TRAIN_PASSABLE: i32;
/** func_button */
export declare const SF_BUTTON_DONTMOVE: i32;
export declare const SF_BUTTON_TOGGLE: i32;
export declare const SF_BUTTON_SPARK_IF_OFF: i32;
export declare const SF_BUTTON_TOUCH_ONLY: i32;
/** func_rot_button */
export declare const SF_ROTBUTTON_NOTSOLID: i32;
export declare const SF_ROTBUTTON_BACKWARDS: i32;
/** env_global */
export declare const SF_GLOBAL_SET: i32;
/** multisource */
export declare const MAX_MS_TARGETS: i32;
export declare const SF_MULTI_INIT: i32;
/** func_door, func_water, func_door_rotating, momementary_door */
export declare const SF_DOOR_START_OPEN: i32;
export declare const SF_DOOR_PASSABLE: i32;
export declare const SF_DOOR_NO_AUTO_RETURN: i32;
export declare const SF_DOOR_USE_ONLY: i32;
export declare const SF_DOOR_TOUCH_ONLY_CLIENTS: i32;
/** gibshooter */
export declare const SF_GIBSHOOTER_REPEATABLE: i32;
/** env_funnel */
export declare const SF_FUNNEL_REVERSE: i32;
/** env_explosion */
export declare const SF_ENVEXPLOSION_NODAMAGE: i32;
export declare const SF_ENVEXPLOSION_REPEATABLE: i32;
export declare const SF_ENVEXPLOSION_NOFIREBALL: i32;
export declare const SF_ENVEXPLOSION_NOSMOKE: i32;
export declare const SF_ENVEXPLOSION_NODECAL: i32;
export declare const SF_ENVEXPLOSION_NOSPARKS: i32;
/** game_player_equip */
export declare const MAX_EQUIP: i32;
/** trigger_push */
export declare const SF_TRIGGER_PUSH_ONCE: i32;
export declare const SF_TRIGGER_PUSH_START_OFF: i32;
/** trigger_hurt */
export declare const SF_TRIGGER_HURT_TARGETONCE: i32;
export declare const SF_TRIGGER_HURT_START_OFF: i32;
export declare const SF_TRIGGER_HURT_NO_CLIENTS: i32;
export declare const SF_TRIGGER_HURT_CLIENTONLYFIRE: i32;
export declare const SF_TRIGGER_HURT_CLIENTONLYTOUCH: i32;
/** env_render */
export declare const SF_RENDER_MASKFX: i32;
export declare const SF_RENDER_MASKAMT: i32;
export declare const SF_RENDER_MASKMODE: i32;
export declare const SF_RENDER_MASKCOLOR: i32;
/** trigger_camera */
export declare const SF_CAMERA_PLAYER_POSITION: i32;
export declare const SF_CAMERA_PLAYER_TARGET: i32;
export declare const SF_CAMERA_PLAYER_TAKECONTROL: i32;
/** func_rotating */
export declare const SF_BRUSH_ROTATE_START_ON: i32;
export declare const SF_BRUSH_ROTATE_BACKWARDS: i32;
export declare const SF_BRUSH_ROTATE_Z_AXIS: i32;
export declare const SF_BRUSH_ROTATE_X_AXIS: i32;
export declare const SF_BRUSH_ACCDCC: i32;
export declare const SF_BRUSH_HURT: i32;
export declare const SF_BRUSH_ROTATE_NOT_SOLID: i32;
export declare const SF_BRUSH_ROTATE_SMALLRADIUS: i32;
export declare const SF_BRUSH_ROTATE_MEDIUMRADIUS: i32;
export declare const SF_BRUSH_ROTATE_LARGERADIUS: i32;
/** triggers */
export declare const SF_TRIGGER_ALLOWMONSTERS: i32;
export declare const SF_TRIGGER_NOCLIENTS: i32;
export declare const SF_TRIGGER_PUSHABLES: i32;
export declare const SF_TRIGGER_NORESET: i32;
/** func_breakable */
export declare const SF_BREAK_TRIGGER_ONLY: i32;
export declare const SF_BREAK_TOUCH: i32;
export declare const SF_BREAK_PRESSURE: i32;
export declare const SF_BREAK_CROWBAR: i32;
/** func_pushable (also func_breakable, so don't collide with those flags) */
export declare const SF_PUSH_BREAKABLE: i32;
/** light_spawn */
export declare const SF_LIGHT_START_OFF: i32;
/** info_decal */
export declare const SF_DECAL_NOTINDEATHMATCH: i32;
/** Set this bit on guns and stuff that should never respawn */
export declare const SF_NORESPAWN: i32;
/** PlaybackEvent flags */
export declare const FEV_NOTHOST: i32;
export declare const FEV_RELIABLE: i32;
export declare const FEV_GLOBAL: i32;
export declare const FEV_UPDATE: i32;
export declare const FEV_HOSTONLY: i32;
export declare const FEV_SERVER: i32;
export declare const FEV_CLIENT: i32;
/** All monsters need this data */
export declare const DONT_BLEED: i32;
export declare const BLOOD_COLOR_RED: i32;
export declare const BLOOD_COLOR_YELLOW: i32;
export declare const BLOOD_COLOR_GREEN: i32;
/** For SetUse */
export declare const USE_OFF: i32;
export declare const USE_ON: i32;
export declare const USE_SET: i32;
export declare const USE_TOGGLE: i32;
/** For CBasePlayer:m_iWeaponVolume */
export declare const LOUD_GUN_VOLUME: i32;
export declare const NORMAL_GUN_VOLUME: i32;
export declare const QUIET_GUN_VOLUME: i32;
export declare const BIG_EXPLOSION_VOLUME: i32;
export declare const NORMAL_EXPLOSION_VOLUME: i32;
export declare const SMALL_EXPLOSION_VOLUME: i32;
/** For CBasePlayer:m_iWeaponFlash */
export declare const BRIGHT_GUN_FLASH: i32;
export declare const NORMAL_GUN_FLASH: i32;
export declare const DIM_GUN_FLASH: i32;
/** Player zoom constants */
export declare const DEFAULT_LARGE_AWP_ZOOM: i32;
export declare const DEFAULT_LARGE_OTHER_SNIPERS_ZOOM: i32;
export declare const DEFAULT_SMALL_SNIPERS_ZOOM: i32;
export declare const DEFAULT_AUG_SG552_ZOOM: i32;
export declare const DEFAULT_NO_ZOOM: i32;
/** Scoreboard attribute constants */
export declare const SCORE_STATUS_NONE: i32;
export declare const SCORE_STATUS_DEAD: i32;
export declare const SCORE_STATUS_BOMB: i32;
export declare const SCORE_STATUS_VIP: i32;
export declare const SCORE_STATUS_DEFKIT: i32;
export declare const IGNOREMSG_NONE: i32;
export declare const IGNOREMSG_ENEMY: i32;
export declare const IGNOREMSG_TEAM: i32;
export declare const HITGROUP_GENERIC: i32;
export declare const HITGROUP_HEAD: i32;
export declare const HITGROUP_CHEST: i32;
export declare const HITGROUP_STOMACH: i32;
export declare const HITGROUP_LEFTARM: i32;
export declare const HITGROUP_RIGHTARM: i32;
export declare const HITGROUP_LEFTLEG: i32;
export declare const HITGROUP_RIGHTLEG: i32;
export declare const HITGROUP_SHIELD: i32;
export declare const ARMOR_NONE: i32;
export declare const ARMOR_KEVLAR: i32;
export declare const ARMOR_VESTHELM: i32;
export declare const ARMOURY_MP5NAVY: i32;
export declare const ARMOURY_TMP: i32;
export declare const ARMOURY_P90: i32;
export declare const ARMOURY_MAC10: i32;
export declare const ARMOURY_AK47: i32;
export declare const ARMOURY_SG552: i32;
export declare const ARMOURY_M4A1: i32;
export declare const ARMOURY_AUG: i32;
export declare const ARMOURY_SCOUT: i32;
export declare const ARMOURY_G3SG1: i32;
export declare const ARMOURY_AWP: i32;
export declare const ARMOURY_M3: i32;
export declare const ARMOURY_XM1014: i32;
export declare const ARMOURY_M249: i32;
export declare const ARMOURY_FLASHBANG: i32;
export declare const ARMOURY_HEGRENADE: i32;
export declare const ARMOURY_KEVLAR: i32;
export declare const ARMOURY_ASSAULT: i32;
export declare const ARMOURY_SMOKEGRENADE: i32;
export declare const ARMOURY_SHIELD: i32;
export declare const ARMOURY_FAMAS: i32;
export declare const ARMOURY_SG550: i32;
export declare const ARMOURY_GALIL: i32;
export declare const ARMOURY_UMP45: i32;
export declare const ARMOURY_GLOCK18: i32;
export declare const ARMOURY_USP: i32;
export declare const ARMOURY_ELITE: i32;
export declare const ARMOURY_FIVESEVEN: i32;
export declare const ARMOURY_P228: i32;
export declare const ARMOURY_DEAGLE: i32;
export declare const RT_NONE: i32;
export declare const RT_ROUND_BONUS: i32;
export declare const RT_PLAYER_RESET: i32;
export declare const RT_PLAYER_JOIN: i32;
export declare const RT_PLAYER_SPEC_JOIN: i32;
export declare const RT_PLAYER_BOUGHT_SOMETHING: i32;
export declare const RT_HOSTAGE_TOOK: i32;
export declare const RT_HOSTAGE_RESCUED: i32;
export declare const RT_HOSTAGE_DAMAGED: i32;
export declare const RT_HOSTAGE_KILLED: i32;
export declare const RT_TEAMMATES_KILLED: i32;
export declare const RT_ENEMY_KILLED: i32;
export declare const RT_INTO_GAME: i32;
export declare const RT_VIP_KILLED: i32;
export declare const RT_VIP_RESCUED_MYSELF: i32;
export declare const TEAM_UNASSIGNED: i32;
export declare const TEAM_TERRORIST: i32;
export declare const TEAM_CT: i32;
export declare const TEAM_SPECTATOR: i32;
export declare const MODEL_UNASSIGNED: i32;
export declare const MODEL_CT_URBAN: i32;
export declare const MODEL_T_TERROR: i32;
export declare const MODEL_T_LEET: i32;
export declare const MODEL_T_ARCTIC: i32;
export declare const MODEL_CT_GSG9: i32;
export declare const MODEL_CT_GIGN: i32;
export declare const MODEL_CT_SAS: i32;
export declare const MODEL_T_GUERILLA: i32;
export declare const MODEL_CT_VIP: i32;
export declare const MODEL_T_MILITIA: i32;
export declare const MODEL_CT_SPETSNAZ: i32;
export declare const MODEL_AUTO: i32;
export declare const GR_NONE: i32;
export declare const GR_WEAPON_RESPAWN_YES: i32;
export declare const GR_WEAPON_RESPAWN_NO: i32;
export declare const GR_AMMO_RESPAWN_YES: i32;
export declare const GR_AMMO_RESPAWN_NO: i32;
export declare const GR_ITEM_RESPAWN_YES: i32;
export declare const GR_ITEM_RESPAWN_NO: i32;
export declare const GR_PLR_DROP_GUN_ALL: i32;
export declare const GR_PLR_DROP_GUN_ACTIVE: i32;
export declare const GR_PLR_DROP_GUN_NO: i32;
export declare const GR_PLR_DROP_AMMO_ALL: i32;
export declare const GR_PLR_DROP_AMMO_ACTIVE: i32;
export declare const GR_PLR_DROP_AMMO_NO: i32;
export declare const WEAPON_NONE: i32;
export declare const WEAPON_P228: i32;
export declare const WEAPON_GLOCK: i32;
export declare const WEAPON_SCOUT: i32;
export declare const WEAPON_HEGRENADE: i32;
export declare const WEAPON_XM1014: i32;
export declare const WEAPON_C4: i32;
export declare const WEAPON_MAC10: i32;
export declare const WEAPON_AUG: i32;
export declare const WEAPON_SMOKEGRENADE: i32;
export declare const WEAPON_ELITE: i32;
export declare const WEAPON_FIVESEVEN: i32;
export declare const WEAPON_UMP45: i32;
export declare const WEAPON_SG550: i32;
export declare const WEAPON_GALIL: i32;
export declare const WEAPON_FAMAS: i32;
export declare const WEAPON_USP: i32;
export declare const WEAPON_GLOCK18: i32;
export declare const WEAPON_AWP: i32;
export declare const WEAPON_MP5N: i32;
export declare const WEAPON_M249: i32;
export declare const WEAPON_M3: i32;
export declare const WEAPON_M4A1: i32;
export declare const WEAPON_TMP: i32;
export declare const WEAPON_G3SG1: i32;
export declare const WEAPON_FLASHBANG: i32;
export declare const WEAPON_DEAGLE: i32;
export declare const WEAPON_SG552: i32;
export declare const WEAPON_AK47: i32;
export declare const WEAPON_KNIFE: i32;
export declare const WEAPON_P90: i32;
export declare const WEAPON_SHIELDGUN: i32;
export declare const ITDB_PARALYZE: i32;
export declare const ITDB_NERVEGAS: i32;
export declare const ITDB_POISON: i32;
export declare const ITDB_RADIATION: i32;
export declare const ITDB_DROWNRECOVER: i32;
export declare const ITDB_ACID: i32;
export declare const ITDB_SLOWBURN: i32;
export declare const ITDB_SLOWFREEZE: i32;
export declare const ACT_INVALID: i32;
export declare const ACT_RESET: i32;
export declare const ACT_IDLE: i32;
export declare const ACT_GUARD: i32;
export declare const ACT_WALK: i32;
export declare const ACT_RUN: i32;
export declare const ACT_FLY: i32;
export declare const ACT_SWIM: i32;
export declare const ACT_HOP: i32;
export declare const ACT_LEAP: i32;
export declare const ACT_FALL: i32;
export declare const ACT_LAND: i32;
export declare const ACT_STRAFE_LEFT: i32;
export declare const ACT_STRAFE_RIGHT: i32;
export declare const ACT_ROLL_LEFT: i32;
export declare const ACT_ROLL_RIGHT: i32;
export declare const ACT_TURN_LEFT: i32;
export declare const ACT_TURN_RIGHT: i32;
export declare const ACT_CROUCH: i32;
export declare const ACT_CROUCHIDLE: i32;
export declare const ACT_STAND: i32;
export declare const ACT_USE: i32;
export declare const ACT_SIGNAL1: i32;
export declare const ACT_SIGNAL2: i32;
export declare const ACT_SIGNAL3: i32;
export declare const ACT_TWITCH: i32;
export declare const ACT_COWER: i32;
export declare const ACT_SMALL_FLINCH: i32;
export declare const ACT_BIG_FLINCH: i32;
export declare const ACT_RANGE_ATTACK1: i32;
export declare const ACT_RANGE_ATTACK2: i32;
export declare const ACT_MELEE_ATTACK1: i32;
export declare const ACT_MELEE_ATTACK2: i32;
export declare const ACT_RELOAD: i32;
export declare const ACT_ARM: i32;
export declare const ACT_DISARM: i32;
export declare const ACT_EAT: i32;
export declare const ACT_DIESIMPLE: i32;
export declare const ACT_DIEBACKWARD: i32;
export declare const ACT_DIEFORWARD: i32;
export declare const ACT_DIEVIOLENT: i32;
export declare const ACT_BARNACLE_HIT: i32;
export declare const ACT_BARNACLE_PULL: i32;
export declare const ACT_BARNACLE_CHOMP: i32;
export declare const ACT_BARNACLE_CHEW: i32;
export declare const ACT_SLEEP: i32;
export declare const ACT_INSPECT_FLOOR: i32;
export declare const ACT_INSPECT_WALL: i32;
export declare const ACT_IDLE_ANGRY: i32;
export declare const ACT_WALK_HURT: i32;
export declare const ACT_RUN_HURT: i32;
export declare const ACT_HOVER: i32;
export declare const ACT_GLIDE: i32;
export declare const ACT_FLY_LEFT: i32;
export declare const ACT_FLY_RIGHT: i32;
export declare const ACT_DETECT_SCENT: i32;
export declare const ACT_SNIFF: i32;
export declare const ACT_BITE: i32;
export declare const ACT_THREAT_DISPLAY: i32;
export declare const ACT_FEAR_DISPLAY: i32;
export declare const ACT_EXCITED: i32;
export declare const ACT_SPECIAL_ATTACK1: i32;
export declare const ACT_SPECIAL_ATTACK2: i32;
export declare const ACT_COMBAT_IDLE: i32;
export declare const ACT_WALK_SCARED: i32;
export declare const ACT_RUN_SCARED: i32;
export declare const ACT_VICTORY_DANCE: i32;
export declare const ACT_DIE_HEADSHOT: i32;
export declare const ACT_DIE_CHESTSHOT: i32;
export declare const ACT_DIE_GUTSHOT: i32;
export declare const ACT_DIE_BACKSHOT: i32;
export declare const ACT_FLINCH_HEAD: i32;
export declare const ACT_FLINCH_CHEST: i32;
export declare const ACT_FLINCH_STOMACH: i32;
export declare const ACT_FLINCH_LEFTARM: i32;
export declare const ACT_FLINCH_RIGHTARM: i32;
export declare const ACT_FLINCH_LEFTLEG: i32;
export declare const ACT_FLINCH_RIGHTLEG: i32;
export declare const ACT_FLINCH: i32;
export declare const ACT_LARGE_FLINCH: i32;
export declare const ACT_HOLDBOMB: i32;
export declare const ACT_IDLE_FIDGET: i32;
export declare const ACT_IDLE_SCARED: i32;
export declare const ACT_IDLE_SCARED_FIDGET: i32;
export declare const ACT_FOLLOW_IDLE: i32;
export declare const ACT_FOLLOW_IDLE_FIDGET: i32;
export declare const ACT_FOLLOW_IDLE_SCARED: i32;
export declare const ACT_FOLLOW_IDLE_SCARED_FIDGET: i32;
export declare const ACT_CROUCH_IDLE: i32;
export declare const ACT_CROUCH_IDLE_FIDGET: i32;
export declare const ACT_CROUCH_IDLE_SCARED: i32;
export declare const ACT_CROUCH_IDLE_SCARED_FIDGET: i32;
export declare const ACT_CROUCH_WALK: i32;
export declare const ACT_CROUCH_WALK_SCARED: i32;
export declare const ACT_CROUCH_DIE: i32;
export declare const ACT_WALK_BACK: i32;
export declare const ACT_IDLE_SNEAKY: i32;
export declare const ACT_IDLE_SNEAKY_FIDGET: i32;
export declare const ACT_WALK_SNEAKY: i32;
export declare const ACT_WAVE: i32;
export declare const ACT_YES: i32;
export declare const ACT_NO: i32;
export declare const WINSTATUS_NONE: i32;
export declare const WINSTATUS_CTS: i32;
export declare const WINSTATUS_TERRORISTS: i32;
export declare const WINSTATUS_DRAW: i32;
export declare const ROUND_NONE: i32;
export declare const ROUND_TARGET_BOMB: i32;
export declare const ROUND_VIP_ESCAPED: i32;
export declare const ROUND_VIP_ASSASSINATED: i32;
export declare const ROUND_TERRORISTS_ESCAPED: i32;
export declare const ROUND_CTS_PREVENT_ESCAPE: i32;
export declare const ROUND_ESCAPING_TERRORISTS_NEUTRALIZED: i32;
export declare const ROUND_BOMB_DEFUSED: i32;
export declare const ROUND_CTS_WIN: i32;
export declare const ROUND_TERRORISTS_WIN: i32;
export declare const ROUND_END_DRAW: i32;
export declare const ROUND_ALL_HOSTAGES_RESCUED: i32;
export declare const ROUND_TARGET_SAVED: i32;
export declare const ROUND_HOSTAGE_NOT_RESCUED: i32;
export declare const ROUND_TERRORISTS_NOT_ESCAPED: i32;
export declare const ROUND_VIP_NOT_ESCAPED: i32;
export declare const ROUND_GAME_COMMENCE: i32;
export declare const ROUND_GAME_RESTART: i32;
export declare const ROUND_GAME_OVER: i32;
export declare const PLAYER_IDLE: i32;
export declare const PLAYER_WALK: i32;
export declare const PLAYER_JUMP: i32;
export declare const PLAYER_SUPERJUMP: i32;
export declare const PLAYER_DIE: i32;
export declare const PLAYER_ATTACK1: i32;
export declare const PLAYER_ATTACK2: i32;
export declare const PLAYER_FLINCH: i32;
export declare const PLAYER_LARGE_FLINCH: i32;
export declare const PLAYER_RELOAD: i32;
export declare const PLAYER_HOLDBOMB: i32;
export declare const JOINED: i32;
export declare const SHOWLTEXT: i32;
export declare const READINGLTEXT: i32;
export declare const SHOWTEAMSELECT: i32;
export declare const PICKINGTEAM: i32;
export declare const GETINTOGAME: i32;
export declare const Menu_OFF: i32;
export declare const Menu_ChooseTeam: i32;
export declare const Menu_IGChooseTeam: i32;
export declare const Menu_ChooseAppearance: i32;
export declare const Menu_Buy: i32;
export declare const Menu_BuyPistol: i32;
export declare const Menu_BuyRifle: i32;
export declare const Menu_BuyMachineGun: i32;
export declare const Menu_BuyShotgun: i32;
export declare const Menu_BuySubMachineGun: i32;
export declare const Menu_BuyItem: i32;
export declare const Menu_Radio1: i32;
export declare const Menu_Radio2: i32;
export declare const Menu_Radio3: i32;
export declare const Menu_ClientBuy: i32;
export declare const CMD_SAY: i32;
export declare const CMD_SAYTEAM: i32;
export declare const CMD_FULLUPDATE: i32;
export declare const CMD_VOTE: i32;
export declare const CMD_VOTEMAP: i32;
export declare const CMD_LISTMAPS: i32;
export declare const CMD_LISTPLAYERS: i32;
export declare const CMD_NIGHTVISION: i32;
export declare const COMMANDS_TO_TRACK: i32;
export declare const NONE_SLOT: i32;
export declare const PRIMARY_WEAPON_SLOT: i32;
export declare const PISTOL_SLOT: i32;
export declare const KNIFE_SLOT: i32;
export declare const GRENADE_SLOT: i32;
export declare const C4_SLOT: i32;
export declare const SHIELDREN_IDLE: i32;
export declare const SHIELDREN_UP: i32;
export declare const SHIELDREN_DOWN: i32;
export declare const SHIELDGUN_IDLE: i32;
export declare const SHIELDGUN_SHOOT1: i32;
export declare const SHIELDGUN_SHOOT2: i32;
export declare const SHIELDGUN_SHOOT_EMPTY: i32;
export declare const SHIELDGUN_RELOAD: i32;
export declare const SHIELDGUN_DRAW: i32;
export declare const SHIELDGUN_DRAWN_IDLE: i32;
export declare const SHIELDGUN_UP: i32;
export declare const SHIELDGUN_DOWN: i32;
export declare const SIGNAL_BUY: i32;
export declare const SIGNAL_BOMB: i32;
export declare const SIGNAL_RESCUE: i32;
export declare const SIGNAL_ESCAPE: i32;
export declare const SIGNAL_VIPSAFETY: i32;
export declare const WPNSTATE_USP_SILENCED: i32;
export declare const WPNSTATE_GLOCK18_BURST_MODE: i32;
export declare const WPNSTATE_M4A1_SILENCED: i32;
export declare const WPNSTATE_ELITE_LEFT: i32;
export declare const WPNSTATE_FAMAS_BURST_MODE: i32;
export declare const WPNSTATE_SHIELD_DRAWN: i32;
export declare const BULLET_NONE: i32;
export declare const BULLET_PLAYER_9MM: i32;
export declare const BULLET_PLAYER_MP5: i32;
export declare const BULLET_PLAYER_357: i32;
export declare const BULLET_PLAYER_BUCKSHOT: i32;
export declare const BULLET_PLAYER_CROWBAR: i32;
export declare const BULLET_MONSTER_9MM: i32;
export declare const BULLET_MONSTER_MP5: i32;
export declare const BULLET_MONSTER_12MM: i32;
export declare const BULLET_PLAYER_45ACP: i32;
export declare const BULLET_PLAYER_338MAG: i32;
export declare const BULLET_PLAYER_762MM: i32;
export declare const BULLET_PLAYER_556MM: i32;
export declare const BULLET_PLAYER_50AE: i32;
export declare const BULLET_PLAYER_57MM: i32;
export declare const BULLET_PLAYER_357SIG: i32;
export declare const RR_CTS_WIN: i32;
export declare const RR_TERRORISTS_WIN: i32;
export declare const RR_TARGET_BOMB: i32;
export declare const RR_VIP_ESCAPED: i32;
export declare const RR_VIP_ASSASSINATED: i32;
export declare const RR_TERRORISTS_ESCAPED: i32;
export declare const RR_CTS_PREVENT_ESCAPE: i32;
export declare const RR_ESCAPING_TERRORISTS_NEUTRALIZED: i32;
export declare const RR_BOMB_DEFUSED: i32;
export declare const RR_BOMB_PLANTED: i32;
export declare const RR_BOMB_EXPLODED: i32;
export declare const RR_ALL_HOSTAGES_RESCUED: i32;
export declare const RR_TARGET_BOMB_SAVED: i32;
export declare const RR_HOSTAGE_NOT_RESCUED: i32;
export declare const RR_VIP_NOT_ESCAPED: i32;
export declare const RR_LOSER_BONUS_DEFAULT: i32;
export declare const RR_LOSER_BONUS_MIN: i32;
export declare const RR_LOSER_BONUS_MAX: i32;
export declare const RR_LOSER_BONUS_ADD: i32;
export declare const RR_RESCUED_HOSTAGE: i32;
export declare const RR_TOOK_HOSTAGE_ACC: i32;
export declare const RR_TOOK_HOSTAGE: i32;
export declare const RR_END: i32;
export declare const ITEM_TYPE_BUYING: i32;
export declare const ITEM_TYPE_TOUCHED: i32;
export declare const ITEM_TYPE_EQUIPPED: i32;
export declare const ITEM_NONE: i32;
export declare const ITEM_SHIELDGUN: i32;
export declare const ITEM_P228: i32;
export declare const ITEM_GLOCK: i32;
export declare const ITEM_SCOUT: i32;
export declare const ITEM_HEGRENADE: i32;
export declare const ITEM_XM1014: i32;
export declare const ITEM_C4: i32;
export declare const ITEM_MAC10: i32;
export declare const ITEM_AUG: i32;
export declare const ITEM_SMOKEGRENADE: i32;
export declare const ITEM_ELITE: i32;
export declare const ITEM_FIVESEVEN: i32;
export declare const ITEM_UMP45: i32;
export declare const ITEM_SG550: i32;
export declare const ITEM_GALIL: i32;
export declare const ITEM_FAMAS: i32;
export declare const ITEM_USP: i32;
export declare const ITEM_GLOCK18: i32;
export declare const ITEM_AWP: i32;
export declare const ITEM_MP5N: i32;
export declare const ITEM_M249: i32;
export declare const ITEM_M3: i32;
export declare const ITEM_M4A1: i32;
export declare const ITEM_TMP: i32;
export declare const ITEM_G3SG1: i32;
export declare const ITEM_FLASHBANG: i32;
export declare const ITEM_DEAGLE: i32;
export declare const ITEM_SG552: i32;
export declare const ITEM_AK47: i32;
export declare const ITEM_KNIFE: i32;
export declare const ITEM_P90: i32;
export declare const ITEM_NVG: i32;
export declare const ITEM_DEFUSEKIT: i32;
export declare const ITEM_KEVLAR: i32;
export declare const ITEM_ASSAULT: i32;
export declare const ITEM_LONGJUMP: i32;
export declare const ITEM_SODACAN: i32;
export declare const ITEM_HEALTHKIT: i32;
export declare const ITEM_ANTIDOTE: i32;
export declare const ITEM_BATTERY: i32;
export declare const BUYING_EVERYONE: i32;
export declare const BUYING_ONLY_CTS: i32;
export declare const BUYING_ONLY_TERRORISTS: i32;
export declare const BUYING_NO_ONE: i32;
export declare const EVENT_INVALID: i32;
export declare const EVENT_WEAPON_FIRED: i32;
export declare const EVENT_WEAPON_FIRED_ON_EMPTY: i32;
export declare const EVENT_WEAPON_RELOADED: i32;
export declare const EVENT_HE_GRENADE_EXPLODED: i32;
export declare const EVENT_FLASHBANG_GRENADE_EXPLODED: i32;
export declare const EVENT_SMOKE_GRENADE_EXPLODED: i32;
export declare const EVENT_GRENADE_BOUNCED: i32;
export declare const EVENT_BEING_SHOT_AT: i32;
export declare const EVENT_PLAYER_BLINDED_BY_FLASHBANG: i32;
export declare const EVENT_PLAYER_FOOTSTEP: i32;
export declare const EVENT_PLAYER_JUMPED: i32;
export declare const EVENT_PLAYER_DIED: i32;
export declare const EVENT_PLAYER_LANDED_FROM_HEIGHT: i32;
export declare const EVENT_PLAYER_TOOK_DAMAGE: i32;
export declare const EVENT_HOSTAGE_DAMAGED: i32;
export declare const EVENT_HOSTAGE_KILLED: i32;
export declare const EVENT_DOOR: i32;
export declare const EVENT_BREAK_GLASS: i32;
export declare const EVENT_BREAK_WOOD: i32;
export declare const EVENT_BREAK_METAL: i32;
export declare const EVENT_BREAK_FLESH: i32;
export declare const EVENT_BREAK_CONCRETE: i32;
export declare const EVENT_BOMB_PLANTED: i32;
export declare const EVENT_BOMB_DROPPED: i32;
export declare const EVENT_BOMB_PICKED_UP: i32;
export declare const EVENT_BOMB_BEEP: i32;
export declare const EVENT_BOMB_DEFUSING: i32;
export declare const EVENT_BOMB_DEFUSE_ABORTED: i32;
export declare const EVENT_BOMB_DEFUSED: i32;
export declare const EVENT_BOMB_EXPLODED: i32;
export declare const EVENT_HOSTAGE_USED: i32;
export declare const EVENT_HOSTAGE_RESCUED: i32;
export declare const EVENT_ALL_HOSTAGES_RESCUED: i32;
export declare const EVENT_VIP_ESCAPED: i32;
export declare const EVENT_VIP_ASSASSINATED: i32;
export declare const EVENT_TERRORISTS_WIN: i32;
export declare const EVENT_CTS_WIN: i32;
export declare const EVENT_ROUND_DRAW: i32;
export declare const EVENT_ROUND_WIN: i32;
export declare const EVENT_ROUND_LOSS: i32;
export declare const EVENT_ROUND_START: i32;
export declare const EVENT_PLAYER_SPAWNED: i32;
export declare const EVENT_CLIENT_CORPSE_SPAWNED: i32;
export declare const EVENT_BUY_TIME_START: i32;
export declare const EVENT_PLAYER_LEFT_BUY_ZONE: i32;
export declare const EVENT_DEATH_CAMERA_START: i32;
export declare const EVENT_KILL_ALL: i32;
export declare const EVENT_ROUND_TIME: i32;
export declare const EVENT_DIE: i32;
export declare const EVENT_KILL: i32;
export declare const EVENT_HEADSHOT: i32;
export declare const EVENT_KILL_FLASHBANGED: i32;
export declare const EVENT_TUTOR_BUY_MENU_OPENNED: i32;
export declare const EVENT_TUTOR_AUTOBUY: i32;
export declare const EVENT_PLAYER_BOUGHT_SOMETHING: i32;
export declare const EVENT_TUTOR_NOT_BUYING_ANYTHING: i32;
export declare const EVENT_TUTOR_NEED_TO_BUY_PRIMARY_WEAPON: i32;
export declare const EVENT_TUTOR_NEED_TO_BUY_PRIMARY_AMMO: i32;
export declare const EVENT_TUTOR_NEED_TO_BUY_SECONDARY_AMMO: i32;
export declare const EVENT_TUTOR_NEED_TO_BUY_ARMOR: i32;
export declare const EVENT_TUTOR_NEED_TO_BUY_DEFUSE_KIT: i32;
export declare const EVENT_TUTOR_NEED_TO_BUY_GRENADE: i32;
export declare const EVENT_CAREER_TASK_DONE: i32;
export declare const EVENT_START_RADIO_1: i32;
export declare const EVENT_RADIO_COVER_ME: i32;
export declare const EVENT_RADIO_YOU_TAKE_THE_POINT: i32;
export declare const EVENT_RADIO_HOLD_THIS_POSITION: i32;
export declare const EVENT_RADIO_REGROUP_TEAM: i32;
export declare const EVENT_RADIO_FOLLOW_ME: i32;
export declare const EVENT_RADIO_TAKING_FIRE: i32;
export declare const EVENT_START_RADIO_2: i32;
export declare const EVENT_RADIO_GO_GO_GO: i32;
export declare const EVENT_RADIO_TEAM_FALL_BACK: i32;
export declare const EVENT_RADIO_STICK_TOGETHER_TEAM: i32;
export declare const EVENT_RADIO_GET_IN_POSITION_AND_WAIT: i32;
export declare const EVENT_RADIO_STORM_THE_FRONT: i32;
export declare const EVENT_RADIO_REPORT_IN_TEAM: i32;
export declare const EVENT_START_RADIO_3: i32;
export declare const EVENT_RADIO_AFFIRMATIVE: i32;
export declare const EVENT_RADIO_ENEMY_SPOTTED: i32;
export declare const EVENT_RADIO_NEED_BACKUP: i32;
export declare const EVENT_RADIO_SECTOR_CLEAR: i32;
export declare const EVENT_RADIO_IN_POSITION: i32;
export declare const EVENT_RADIO_REPORTING_IN: i32;
export declare const EVENT_RADIO_GET_OUT_OF_THERE: i32;
export declare const EVENT_RADIO_NEGATIVE: i32;
export declare const EVENT_RADIO_ENEMY_DOWN: i32;
export declare const EVENT_END_RADIO: i32;
export declare const EVENT_NEW_MATCH: i32;
export declare const EVENT_PLAYER_CHANGED_TEAM: i32;
export declare const EVENT_BULLET_IMPACT: i32;
export declare const EVENT_GAME_COMMENCE: i32;
export declare const EVENT_WEAPON_ZOOMED: i32;
export declare const EVENT_HOSTAGE_CALLED_FOR_HELP: i32;
export declare const NUM_GAME_EVENTS: i32;
export declare const WEAPON_SECONDARY_ATTACK_NONE: i32;
export declare const WEAPON_SECONDARY_ATTACK_SET: i32;
export declare const WEAPON_SECONDARY_ATTACK_BLOCK: i32;
export declare const DECAL_GUNSHOT1: i32;
export declare const DECAL_GUNSHOT2: i32;
export declare const DECAL_GUNSHOT3: i32;
export declare const DECAL_GUNSHOT4: i32;
export declare const DECAL_GUNSHOT5: i32;
export declare const DECAL_LAMBDA1: i32;
export declare const DECAL_LAMBDA2: i32;
export declare const DECAL_LAMBDA3: i32;
export declare const DECAL_LAMBDA4: i32;
export declare const DECAL_LAMBDA5: i32;
export declare const DECAL_LAMBDA6: i32;
export declare const DECAL_SCORCH1: i32;
export declare const DECAL_SCORCH2: i32;
export declare const DECAL_BLOOD1: i32;
export declare const DECAL_BLOOD2: i32;
export declare const DECAL_BLOOD3: i32;
export declare const DECAL_BLOOD4: i32;
export declare const DECAL_BLOOD5: i32;
export declare const DECAL_BLOOD6: i32;
export declare const DECAL_YBLOOD1: i32;
export declare const DECAL_YBLOOD2: i32;
export declare const DECAL_YBLOOD3: i32;
export declare const DECAL_YBLOOD4: i32;
export declare const DECAL_YBLOOD5: i32;
export declare const DECAL_YBLOOD6: i32;
export declare const DECAL_GLASSBREAK1: i32;
export declare const DECAL_GLASSBREAK2: i32;
export declare const DECAL_GLASSBREAK3: i32;
export declare const DECAL_BIGSHOT1: i32;
export declare const DECAL_BIGSHOT2: i32;
export declare const DECAL_BIGSHOT3: i32;
export declare const DECAL_BIGSHOT4: i32;
export declare const DECAL_BIGSHOT5: i32;
export declare const DECAL_SPIT1: i32;
export declare const DECAL_SPIT2: i32;
export declare const DECAL_BPROOF1: i32;
export declare const DECAL_GARGSTOMP1: i32;
export declare const DECAL_SMALLSCORCH1: i32;
export declare const DECAL_SMALLSCORCH2: i32;
export declare const DECAL_SMALLSCORCH3: i32;
export declare const DECAL_MOMMABIRTH: i32;
export declare const DECAL_MOMMASPLAT: i32;
export declare const GR_NOTTEAMMATE: i32;
export declare const GR_TEAMMATE: i32;
export declare const GR_ENEMY: i32;
export declare const GR_ALLY: i32;
export declare const GR_NEUTRAL: i32;
export declare const REAPI_VERSION: i32;
export declare const REAPI_VERSION_MAJOR: i32;
export declare const REAPI_VERSION_MINOR: i32;
export declare const INVALID_MESSAGEHOOK: i32;
/** Ham return types. */
export declare const HAM_IGNORED: i32;
export declare const HAM_HANDLED: i32;
export declare const HAM_OVERRIDE: i32;
export declare const HAM_SUPERCEDE: i32;
/** Description:		This is typically called whenever an entity is created. */
export declare const Ham_Spawn: i32;
/** Description:		This is typically called on map change. */
export declare const Ham_Precache: i32;
/** Description:		Typically this is similar to an engine keyvalue call. */
export declare const Ham_Keyvalue: i32;
/** Description:		Returns flags for how an entity can be used. */
export declare const Ham_ObjectCaps: i32;
/** Description:		Usually called to activate some objects. */
export declare const Ham_Activate: i32;
/** Description:		Usually called after the engine call with the same name. */
export declare const Ham_SetObjectCollisionBox: i32;
/** Description:		Returns an integer number that corresponds with what type of entity this is. */
export declare const Ham_Classify: i32;
/** Description:		Typically called when an entity dies to notify any children entities about the death. */
export declare const Ham_DeathNotice: i32;
/** Description:		Usually called whenever an entity gets attacked by a hitscan (such as a gun) weapon. */
export declare const Ham_TraceAttack: i32;
/** Description:		Usually called whenever an entity takes any kind of damage. */
export declare const Ham_TakeDamage: i32;
/** Description:		Usually called whenever an entity gets a form of a heal. */
export declare const Ham_TakeHealth: i32;
/** Description:		Normally called whenever an entity dies. */
export declare const Ham_Killed: i32;
/** Description:		Normally returns the blood color of the entity. */
export declare const Ham_BloodColor: i32;
/** Description:		Traces where blood should appear. */
export declare const Ham_TraceBleed: i32;
/** Description:		Returns whether an entity is activated. */
export declare const Ham_IsTriggered: i32;
/** Description:		Returns the id of the entity if its class is derived off of CBaseMonster, -1 otherwise. */
export declare const Ham_MyMonsterPointer: i32;
/** Description:		Returns the id of the entity if its class is derived off of CBaseSquadMonster, -1 otherwise. */
export declare const Ham_MySquadMonsterPointer: i32;
/** Description:		Returns the toggle state of the entity. */
export declare const Ham_GetToggleState: i32;
/** Description:		Typically adds points to the entity. */
export declare const Ham_AddPoints: i32;
/** Description:		Typically adds points to everybody on the entity's team. */
export declare const Ham_AddPointsToTeam: i32;
/** Description:		Adds an item to the player's inventory. */
export declare const Ham_AddPlayerItem: i32;
/** Description:		Removes an item to the player's inventory. */
export declare const Ham_RemovePlayerItem: i32;
/** Description:		Gives ammo to the entity. */
export declare const Ham_GiveAmmo: i32;
/** Description:		Unsure, I believe this is the delay between activation for an entity. */
export declare const Ham_GetDelay: i32;
/** Description:		Whether or not the entity is moving. */
export declare const Ham_IsMoving: i32;
/** Description:		Unsure. */
export declare const Ham_OverrideReset: i32;
/** Description:		Returns the damage decal of the entity for the damage type. */
export declare const Ham_DamageDecal: i32;
/** Description:		Sets the toggle state of the entity. */
export declare const Ham_SetToggleState: i32;
/** Description:		Not entirely sure what this does. */
export declare const Ham_StartSneaking: i32;
/** Description:		Not entirely sure what this does. */
export declare const Ham_StopSneaking: i32;
/** Description:		Not entirely sure. */
export declare const Ham_OnControls: i32;
/** Description:		Whether or not the entity is sneaking. */
export declare const Ham_IsSneaking: i32;
/** Description:		Whether or not the entity is alive. */
export declare const Ham_IsAlive: i32;
/** Description:		Whether or not the entity uses a BSP model. */
export declare const Ham_IsBSPModel: i32;
/** Description:		Whether or not the entity can reflect gauss shots.. */
export declare const Ham_ReflectGauss: i32;
/** Description:		Whether or not the target is the same as the one passed. */
export declare const Ham_HasTarget: i32;
/** Description:		Whether or not the entity is in the world. */
export declare const Ham_IsInWorld: i32;
/** Description:		Whether or not the entity is a player. */
export declare const Ham_IsPlayer: i32;
/** Description:		Whether or not the entity is a net client. */
export declare const Ham_IsNetClient: i32;
/** Description:		Get the entity's team id. */
export declare const Ham_TeamId: i32;
/** Description:		Returns the next target of this. */
export declare const Ham_GetNextTarget: i32;
/** Description:		Called whenever an entity thinks. */
export declare const Ham_Think: i32;
/** Description:		Called whenever two entities touch. */
export declare const Ham_Touch: i32;
/** Description:		Called whenver one entity uses another. */
export declare const Ham_Use: i32;
/** Description:		Normally called whenever one entity blocks another from moving. */
export declare const Ham_Blocked: i32;
/** Description:		Normally called when a map-based item respawns, such as a health kit or something. */
export declare const Ham_Respawn: i32;
/** Description:		Used in Half-Life to update a monster's owner. */
export declare const Ham_UpdateOwner: i32;
/** Description:		Normally called whenever a barnacle grabs the entity. */
export declare const Ham_FBecomeProne: i32;
/** Description:		Returns the center of the entity. */
export declare const Ham_Center: i32;
/** Description:		Returns the eye position of the entity. */
export declare const Ham_EyePosition: i32;
/** Description:		Returns the ear position of the entity. */
export declare const Ham_EarPosition: i32;
/** Description:		Position to shoot at. */
export declare const Ham_BodyTarget: i32;
/** Description:		Returns the illumination of the entity. */
export declare const Ham_Illumination: i32;
/** Description:		Returns true if a line can be traced from the caller's eyes to the target. */
export declare const Ham_FVisible: i32;
/** Description:		Returns true if a line can be traced from the caller's eyes to given vector. */
export declare const Ham_FVecVisible: i32;
/** Description:		Typically called every frame when a player has jump held. */
export declare const Ham_Player_Jump: i32;
/** Description:		Typically called every frame when a player has duck held. */
export declare const Ham_Player_Duck: i32;
/** Description:		Typically called every frame during PlayerPreThink engine call. */
export declare const Ham_Player_PreThink: i32;
/** Description:		Typically called every frame during PlayerPostThink engine call. */
export declare const Ham_Player_PostThink: i32;
/** Description:		Returns a vector that tells the gun position. */
export declare const Ham_Player_GetGunPosition: i32;
/** Description:		Whether or not the player should fade on death. */
export declare const Ham_Player_ShouldFadeOnDeath: i32;
/** Description:		Called whenever an impulse command is executed. */
export declare const Ham_Player_ImpulseCommands: i32;
/** Description:		Updates the client's data for hud changes (such as ammo).  Usually called every frame. */
export declare const Ham_Player_UpdateClientData: i32;
/** Description:		Adds the item to the player. */
export declare const Ham_Item_AddToPlayer: i32;
/** Description:		Unsure. */
export declare const Ham_Item_AddDuplicate: i32;
/** Description:		Whether or not this entity can be deployed. */
export declare const Ham_Item_CanDeploy: i32;
/** Description:		Deploys the entity (usually a weapon). */
export declare const Ham_Item_Deploy: i32;
/** Description:		Whether or not the entity can be holstered. */
export declare const Ham_Item_CanHolster: i32;
/** Description:		Whether or not the entity (usually weapon) can be holstered. */
export declare const Ham_Item_Holster: i32;
/** Description:		Updates the HUD info about this item. */
export declare const Ham_Item_UpdateItemInfo: i32;
/** Description:		Called each frame for an item, normally only on active items. */
export declare const Ham_Item_PreFrame: i32;
/** Description:		Called each frame for an item, normally only on active items. */
export declare const Ham_Item_PostFrame: i32;
/** Description:		Called when an item gets dropped, normally on death only. */
export declare const Ham_Item_Drop: i32;
/** Description:		Normally called when an item gets deleted. */
export declare const Ham_Item_Kill: i32;
/** Description:		Called when an entity starts being attached to (normally invisible and "following") a player. */
export declare const Ham_Item_AttachToPlayer: i32;
/** Description:		Returns the ammo index of the item. */
export declare const Ham_Item_PrimaryAmmoIndex: i32;
/** Description:		Returns the secondary ammo index of the item. */
export declare const Ham_Item_SecondaryAmmoIndex: i32;
/** Description:		Updates item data for the client. */
export declare const Ham_Item_UpdateClientData: i32;
/** Description:		Returns the entity index if the item is a weapon, -1 otherwise. */
export declare const Ham_Item_GetWeaponPtr: i32;
/** Description:		Returns the item slot for the item. */
export declare const Ham_Item_ItemSlot: i32;
/** Description:		Gets ammo from the target weapon. */
export declare const Ham_Weapon_ExtractAmmo: i32;
/** Description:		Gets clip ammo from the target weapon. */
export declare const Ham_Weapon_ExtractClipAmmo: i32;
/** Description:		Unsure. */
export declare const Ham_Weapon_AddWeapon: i32;
/** Description:		Plays the weapon's empty sound. */
export declare const Ham_Weapon_PlayEmptySound: i32;
/** Description:		Sets the weapon so that it can play empty sound again. */
export declare const Ham_Weapon_ResetEmptySound: i32;
/** Description:		Sends an animation event for the weapon. */
export declare const Ham_Weapon_SendWeaponAnim: i32;
/** Description:		Whether or not the weapon is usable (has ammo, etc.) */
export declare const Ham_Weapon_IsUsable: i32;
/** Description:		Called when the main attack of a weapon is triggered. */
export declare const Ham_Weapon_PrimaryAttack: i32;
/** Description:		Called when the secondary attack of a weapon is triggered. */
export declare const Ham_Weapon_SecondaryAttack: i32;
/** Description:		Called when the weapon is reloaded. */
export declare const Ham_Weapon_Reload: i32;
/** Description:		Displays the idle animation for the weapon. */
export declare const Ham_Weapon_WeaponIdle: i32;
/** Description:		There is no more ammo for this gun, so switch to the next best one. */
export declare const Ham_Weapon_RetireWeapon: i32;
/** Description:		Whether or not the weapon should idle. */
export declare const Ham_Weapon_ShouldWeaponIdle: i32;
/** Description:		Unsure. */
export declare const Ham_Weapon_UseDecrement: i32;
/** Description:		- */
export declare const Ham_TS_BreakableRespawn: i32;
/** Description:		- */
export declare const Ham_TS_CanUsedThroughWalls: i32;
/** Description:		Unsure - this was removed in TS 3.0 (and thus is deprecated). */
export declare const Ham_TS_RespawnWait: i32;
/** Description:		This is called on a map reset for most map based entities. */
export declare const Ham_CS_Restart: i32;
/** Description:		Respawn function for players/bots only! Do not use this on non player/bot entities! */
export declare const Ham_CS_RoundRespawn: i32;
/** Description:		Whether or not the player can drop the specified item. */
export declare const Ham_CS_Item_CanDrop: i32;
/** Description:		Gets the maximum speed for whenever a player has the item deployed. */
export declare const Ham_CS_Item_GetMaxSpeed: i32;
/** Description:		I assume this spawns players at the start of a new round. */
export declare const Ham_DOD_RoundRespawn: i32;
/** Description:		I assume this spawns entities (like func_breakables) at the start of a new round. */
export declare const Ham_DOD_RoundRespawnEnt: i32;
/** Description:		Unsure. */
export declare const Ham_DOD_RoundStore: i32;
/** Description:		Unsure. */
export declare const Ham_DOD_AreaSetIndex: i32;
/** Description:		Unsure. */
export declare const Ham_DOD_AreaSendStatus: i32;
/** Description:		Unsure. */
export declare const Ham_DOD_GetState: i32;
/** Description:		Unsure. */
export declare const Ham_DOD_GetStateEnt: i32;
/** Description:		Whether or not a player can drop this item. */
export declare const Ham_DOD_Item_CanDrop: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_EngineerUse: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_Finished: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_EmpExplode: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_CalcEmpDmgRad: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_TakeEmpBlast: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_EmpRemove: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_TakeConcussionBlast: i32;
/** Description:		Unsure. */
export declare const Ham_TFC_Concuss: i32;
/** Description:		Unsure. */
export declare const Ham_ESF_IsEnvModel: i32;
/** Description:		Unsure. */
export declare const Ham_ESF_TakeDamage2: i32;
/** Description:		Returns how many points each entity is worth. */
export declare const Ham_NS_GetPointValue: i32;
/** Description:		Unsure.  Probably awards this with the killing of idvictim. */
export declare const Ham_NS_AwardKill: i32;
/** Description:		Unsure, probably whenever an entity resets after a new round. */
export declare const Ham_NS_ResetEntity: i32;
/** Description:		Unsure. */
export declare const Ham_NS_UpdateOnRemove: i32;
/** Description:		Unsure. */
export declare const Ham_TS_GiveSlowMul: i32;
/** Description:		Unsure.  The second paramater is actually a char. */
export declare const Ham_TS_GoSlow: i32;
/** Description:		Probably returns true if the user is in slow mo. */
export declare const Ham_TS_InSlow: i32;
/** Description:		Returns true if the entity is an objective. */
export declare const Ham_TS_IsObjective: i32;
/** Description:		Unsure. */
export declare const Ham_TS_EnableObjective: i32;
/** Description:		Probably called when the engine call to OnEntFreePrivateData is called (the entity destructor.) */
export declare const Ham_TS_OnFreeEntPrivateData: i32;
/** Description:		Probably called when the engine call to ShouldCollide is called. */
export declare const Ham_TS_ShouldCollide: i32;
/** Description:		Turns a monster towards its ideal_yaw. */
export declare const Ham_ChangeYaw: i32;
/** Description:		Returns if monster has human gibs. */
export declare const Ham_HasHumanGibs: i32;
/** Description:		Returns if monster has alien gibs. */
export declare const Ham_HasAlienGibs: i32;
/** Description:		Slowly fades a entity out, then removes it. */
export declare const Ham_FadeMonster: i32;
/** Description:		Create some gore and get rid of a monster's model. */
export declare const Ham_GibMonster: i32;
/** Description:		Called when monster dies and prepares its entity to become a corpse. */
export declare const Ham_BecomeDead: i32;
/** Description:		Checks relation ship between two monsters. */
export declare const Ham_IRelationship: i32;
/** Description:		Called when monster is about to emit pain sound. */
export declare const Ham_PainSound: i32;
/** Description:		Prints debug information about monster to console. (state, activity, and other) */
export declare const Ham_ReportAIState: i32;
/** Description:		Called when monster has died. */
export declare const Ham_MonsterInitDead: i32;
/** Description:		Function to find enemies or food by sight. */
export declare const Ham_Look: i32;
/** Description:		This functions searches the link list whose head is the caller's m_pLink field. */
export declare const Ham_BestVisibleEnemy: i32;
/** Description:		Returns true if the passed ent is in the caller's forward view cone. */
export declare const Ham_FInViewCone: i32;
/** Description:		Returns true if the passed ent is in the caller's forward view cone. */
export declare const Ham_FVecInViewCone: i32;
/** Description:		Determines the best type of death animation to play. */
export declare const Ham_GetDeathActivity: i32;
/** Description:		Runs core AI functions. */
export declare const Ham_RunAI: i32;
/** Description:		Calls out to core AI functions and handles this monster's specific animation events. */
export declare const Ham_MonsterThink: i32;
/** Description:		After a monster is spawned, it needs to be dropped into the world, checked for mobility problems */
export declare const Ham_MonsterInit: i32;
/** Description:		Check validity of a straight move through space. */
export declare const Ham_CheckLocalMove: i32;
/** Description:		Takes a single step towards the next ROUTE location. */
export declare const Ham_Move: i32;
/** Description:		- */
export declare const Ham_MoveExecute: i32;
/** Description:		- */
export declare const Ham_ShouldAdvanceRoute: i32;
/** Description:		- */
export declare const Ham_GetStoppedActivity: i32;
/** Description:		- */
export declare const Ham_Stop: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_CheckRangeAttack1: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_CheckRangeAttack2: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_CheckMeleeAttack1: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_CheckMeleeAttack2: i32;
/** Description:		- */
export declare const Ham_ScheduleChange: i32;
/** Description:		Determines whether or not the monster can play the scripted sequence or AI sequence that is */
export declare const Ham_CanPlaySequence: i32;
/** Description:		- */
export declare const Ham_CanPlaySentence2: i32;
/** Description:		- */
export declare const Ham_PlaySentence: i32;
/** Description:		- */
export declare const Ham_PlayScriptedSentence: i32;
/** Description:		- */
export declare const Ham_SentenceStop: i32;
/** Description:		Surveys the Conditions information available and finds the best new state for a monster. */
export declare const Ham_GetIdealState: i32;
/** Description:		- */
export declare const Ham_SetActivity: i32;
/** Description:		Part of the condition collection process gets and stores data and conditions */
export declare const Ham_CheckEnemy: i32;
/** Description:		Tries to overcome local obstacles by triangulating a path around them. */
export declare const Ham_FTriangulate: i32;
/** Description:		Allows each sequence to have a different turn rate associated with it. */
export declare const Ham_SetYawSpeed: i32;
/** Description:		Tries to build a route as close to the target as possible, even if there isn't a path to the final point. */
export declare const Ham_BuildNearestRoute: i32;
/** Description:		Tries to find a nearby node that will hide the caller from its enemy. */
export declare const Ham_FindCover: i32;
/** Description:		Default cover radius. */
export declare const Ham_CoverRadius: i32;
/** Description:		Prequalifies a monster to do more fine checking of potential attacks. */
export declare const Ham_FCanCheckAttacks: i32;
/** Description:		- */
export declare const Ham_CheckAmmo: i32;
/** Description:		Before a set of conditions is allowed to interrupt a monster's schedule, this function removes */
export declare const Ham_IgnoreConditions: i32;
/** Description:		Tells use whether or not the monster cares about the type of Hint Node given. */
export declare const Ham_FValidateHintType: i32;
/** Description:		- */
export declare const Ham_FCanActiveIdle: i32;
/** Description:		Returns a bit mask indicating which types of sounds this monster regards. */
export declare const Ham_ISoundMask: i32;
/** Description:		- */
export declare const Ham_HearingSensitivity: i32;
/** Description:		Called by Barnacle victims when the barnacle pulls their head into its mouth. */
export declare const Ham_BarnacleVictimBitten: i32;
/** Description:		Called by barnacle victims when the host barnacle is killed. */
export declare const Ham_BarnacleVictimReleased: i32;
/** Description:		Runs after conditions are collected and before scheduling code is run. */
export declare const Ham_PrescheduleThink: i32;
/** Description:		Plays death sounds. */
export declare const Ham_DeathSound: i32;
/** Description:		Plays alert sounds. */
export declare const Ham_AlertSound: i32;
/** Description:		Plays idle sounds. */
export declare const Ham_IdleSound: i32;
/** Description:		This should stop a monster following a target. */
export declare const Ham_StopFollowing: i32;
/** Description:		Sends an animation event for the weapon. skiplocal is 1 if client is predicting weapon animations. */
export declare const Ham_CS_Weapon_SendWeaponAnim: i32;
/** Description:		Resets the player's max speed. */
export declare const Ham_CS_Player_ResetMaxSpeed: i32;
/** Description:		Whether or not the player is a bot. */
export declare const Ham_CS_Player_IsBot: i32;
/** Description:		Returns a vector that tells the autoaim direction. */
export declare const Ham_CS_Player_GetAutoaimVector: i32;
/** Description:		Whether or not the player is being flashing. (flashbang grenade explosion) */
export declare const Ham_CS_Player_Blind: i32;
/** Description:		Whether or not the player is touching a weapon on the ground. */
export declare const Ham_CS_Player_OnTouchingWeapon: i32;
/** Description:		- */
export declare const Ham_DOD_SetScriptReset: i32;
/** Description:		- */
export declare const Ham_DOD_Item_SpawnDeploy: i32;
/** Description:		- */
export declare const Ham_DOD_Item_SetDmgTime: i32;
/** Description:		- */
export declare const Ham_DOD_Item_DropGren: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_IsUseable: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_Aim: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_flAim: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_RemoveStamina: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_ChangeFOV: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_ZoomOut: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_ZoomIn: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_GetFOV: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_PlayerIsWaterSniping: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_UpdateZoomSpeed: i32;
/** Description:		- */
export declare const Ham_DOD_Weapon_Special: i32;
/** Description:		Get the item name. */
export declare const Ham_TFC_DB_GetItemName: i32;
/** Description:		This entity is exploding, or otherwise needs to inflict damage upon entities within a certain range. */
export declare const Ham_TFC_RadiusDamage: i32;
/** Description:		This entity is exploding, or otherwise needs to inflict damage upon entities within a certain range. */
export declare const Ham_TFC_RadiusDamage2: i32;
/** Description:		- */
export declare const Ham_ESF_IsFighter: i32;
/** Description:		- */
export declare const Ham_ESF_IsBuddy: i32;
/** Description:		- */
export declare const Ham_ESF_EmitSound: i32;
/** Description:		- */
export declare const Ham_ESF_EmitNullSound: i32;
/** Description:		- */
export declare const Ham_ESF_IncreaseStrength: i32;
/** Description:		- */
export declare const Ham_ESF_IncreasePL: i32;
/** Description:		- */
export declare const Ham_ESF_SetPowerLevel: i32;
/** Description:		- */
export declare const Ham_ESF_SetMaxPowerLevel: i32;
/** Description:		- */
export declare const Ham_ESF_StopAniTrigger: i32;
/** Description:		- */
export declare const Ham_ESF_StopFly: i32;
/** Description:		- */
export declare const Ham_ESF_HideWeapon: i32;
/** Description:		- */
export declare const Ham_ESF_ClientRemoveWeapon: i32;
/** Description:		- */
export declare const Ham_ESF_SendClientsCustomModel: i32;
/** Description:		- */
export declare const Ham_ESF_CanTurbo: i32;
/** Description:		- */
export declare const Ham_ESF_CanPrimaryFire: i32;
/** Description:		- */
export declare const Ham_ESF_CanSecondaryFire: i32;
/** Description:		- */
export declare const Ham_ESF_CanStopFly: i32;
/** Description:		- */
export declare const Ham_ESF_CanBlock: i32;
/** Description:		- */
export declare const Ham_ESF_CanRaiseKi: i32;
/** Description:		- */
export declare const Ham_ESF_CanRaiseStamina: i32;
/** Description:		- */
export declare const Ham_ESF_CanTeleport: i32;
/** Description:		- */
export declare const Ham_ESF_CanStartFly: i32;
/** Description:		- */
export declare const Ham_ESF_CanStartPowerup: i32;
/** Description:		- */
export declare const Ham_ESF_CanJump: i32;
/** Description:		- */
export declare const Ham_ESF_CanWallJump: i32;
/** Description:		- */
export declare const Ham_ESF_IsSuperJump: i32;
/** Description:		- */
export declare const Ham_ESF_IsMoveBack: i32;
/** Description:		- */
export declare const Ham_ESF_CheckWallJump: i32;
/** Description:		- */
export declare const Ham_ESF_EnableWallJump: i32;
/** Description:		- */
export declare const Ham_ESF_DisableWallJump: i32;
/** Description:		- */
export declare const Ham_ESF_ResetWallJumpVars: i32;
/** Description:		- */
export declare const Ham_ESF_GetWallJumpAnim: i32;
/** Description:		- */
export declare const Ham_ESF_GetWallJumpAnim2: i32;
/** Description:		- */
export declare const Ham_ESF_SetWallJumpAnimation: i32;
/** Description:		- */
export declare const Ham_ESF_SetFlyMoveType: i32;
/** Description:		- */
export declare const Ham_ESF_IsFlyMoveType: i32;
/** Description:		- */
export declare const Ham_ESF_IsWalkMoveType: i32;
/** Description:		- */
export declare const Ham_ESF_SetWalkMoveType: i32;
/** Description:		- */
export declare const Ham_ESF_DrawChargeBar: i32;
/** Description:		- */
export declare const Ham_ESF_StartBlock: i32;
/** Description:		- */
export declare const Ham_ESF_StopBlock: i32;
/** Description:		- */
export declare const Ham_ESF_StartFly: i32;
/** Description:		- */
export declare const Ham_ESF_GetMaxSpeed: i32;
/** Description:		- */
export declare const Ham_ESF_SetAnimation: i32;
/** Description:		- */
export declare const Ham_ESF_PlayAnimation: i32;
/** Description:		- */
export declare const Ham_ESF_GetMoveForward: i32;
/** Description:		- */
export declare const Ham_ESF_GetMoveRight: i32;
/** Description:		- */
export declare const Ham_ESF_GetMoveUp: i32;
/** Description:		- */
export declare const Ham_ESF_AddBlindFX: i32;
/** Description:		- */
export declare const Ham_ESF_RemoveBlindFX: i32;
/** Description:		- */
export declare const Ham_ESF_DisablePSBar: i32;
/** Description:		- */
export declare const Ham_ESF_AddBeamBoxCrosshair: i32;
/** Description:		- */
export declare const Ham_ESF_RemoveBeamBoxCrosshair: i32;
/** Description:		- */
export declare const Ham_ESF_DrawPSWinBonus: i32;
/** Description:		- */
export declare const Ham_ESF_DrawPSBar: i32;
/** Description:		- */
export declare const Ham_ESF_LockCrosshair: i32;
/** Description:		- */
export declare const Ham_ESF_UnLockCrosshair: i32;
/** Description:		- */
export declare const Ham_ESF_RotateCrosshair: i32;
/** Description:		- */
export declare const Ham_ESF_UnRotateCrosshair: i32;
/** Description:		- */
export declare const Ham_ESF_WaterMove: i32;
/** Description:		- */
export declare const Ham_ESF_CheckTimeBasedDamage: i32;
/** Description:		- */
export declare const Ham_ESF_DoesSecondaryAttack: i32;
/** Description:		- */
export declare const Ham_ESF_DoesPrimaryAttack: i32;
/** Description:		- */
export declare const Ham_ESF_RemoveSpecialModes: i32;
/** Description:		- */
export declare const Ham_ESF_StopTurbo: i32;
/** Description:		- */
export declare const Ham_ESF_TakeBean: i32;
/** Description:		- */
export declare const Ham_ESF_GetPowerLevel: i32;
/** Description:		- */
export declare const Ham_ESF_RemoveAllOtherWeapons: i32;
/** Description:		- */
export declare const Ham_ESF_StopSwoop: i32;
/** Description:		- */
export declare const Ham_ESF_SetDeathAnimation: i32;
/** Description:		- */
export declare const Ham_ESF_SetModel: i32;
/** Description:		- */
export declare const Ham_ESF_AddAttacks: i32;
/** Description:		- */
export declare const Ham_ESF_EmitClassSound: i32;
/** Description:		- */
export declare const Ham_ESF_CheckLightning: i32;
/** Description:		- */
export declare const Ham_ESF_FreezeControls: i32;
/** Description:		- */
export declare const Ham_ESF_UnFreezeControls: i32;
/** Description:		- */
export declare const Ham_ESF_UpdateKi: i32;
/** Description:		- */
export declare const Ham_ESF_UpdateHealth: i32;
/** Description:		- */
export declare const Ham_ESF_GetTeleportDir: i32;
/** Description:		Unsure. */
export declare const Ham_ESF_Weapon_HolsterWhenMeleed: i32;
/** Description:		- */
export declare const Ham_NS_SetBoneController: i32;
/** Description:		- */
export declare const Ham_NS_SaveDataForReset: i32;
/** Description:		- */
export declare const Ham_NS_GetHull: i32;
/** Description:		- */
export declare const Ham_NS_GetMaxWalkSpeed: i32;
/** Description:		- */
export declare const Ham_NS_SetTeamID: i32;
/** Description:		- */
export declare const Ham_NS_GetEffectivePlayerClass: i32;
/** Description:		- */
export declare const Ham_NS_GetAuthenticationMask: i32;
/** Description:		- */
export declare const Ham_NS_EffectivePlayerClassChanged: i32;
/** Description:		- */
export declare const Ham_NS_NeedsTeamUpdate: i32;
/** Description:		- */
export declare const Ham_NS_SendTeamUpdate: i32;
/** Description:		- */
export declare const Ham_NS_SendWeaponUpdate: i32;
/** Description:		- */
export declare const Ham_NS_InitPlayerFromSpawn: i32;
/** Description:		- */
export declare const Ham_NS_PackDeadPlayerItems: i32;
/** Description:		Gets sequence name based on index. */
export declare const Ham_NS_GetAnimationForActivity: i32;
/** Description:		- */
export declare const Ham_NS_StartObserver: i32;
/** Description:		- */
export declare const Ham_NS_StopObserver: i32;
/** Description:		- */
export declare const Ham_NS_GetAdrenalineFactor: i32;
/** Description:		- */
export declare const Ham_NS_GiveNamedItem: i32;
/** Description:		- */
export declare const Ham_NS_Suicide: i32;
/** Description:		- */
export declare const Ham_NS_GetCanUseWeapon: i32;
/** Description:		- */
export declare const Ham_NS_Weapon_GetWeaponPrimeTime: i32;
/** Description:		- */
export declare const Ham_NS_Weapon_PrimeWeapon: i32;
/** Description:		- */
export declare const Ham_NS_Weapon_GetIsWeaponPrimed: i32;
/** Description:		- */
export declare const Ham_NS_Weapon_GetIsWeaponPriming: i32;
/** Description:		- */
export declare const Ham_NS_Weapon_DefaultDeploy: i32;
/** Description:		- */
export declare const Ham_NS_Weapon_DefaultReload: i32;
/** Description:		- */
export declare const Ham_NS_Weapon_GetDeployTime: i32;
/** Description:		Returns the type of group (i.e, "houndeye", or "human military" */
export declare const Ham_SC_GetClassification: i32;
/** Description:		Whether entity is a monter. */
export declare const Ham_SC_IsMonster: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_IsPhysX: i32;
/** Description:		Whether this is a point entity. */
export declare const Ham_SC_IsPointEntity: i32;
/** Description:		Whether entity is a machine. */
export declare const Ham_SC_IsMachine: i32;
/** Description:		Removes the entity and all its content in critical situation. */
export declare const Ham_SC_CriticalRemove: i32;
/** Description:		Updates global tables that need to know about entities being removed. */
export declare const Ham_SC_UpdateOnRemove: i32;
/** Description:		Returns true if a line can be traced from the caller's eyes to the target vector. */
export declare const Ham_SC_FVisible: i32;
/** Description:		Returns true if a line can be traced from the given point to the target point. */
export declare const Ham_SC_FVisibleFromPos: i32;
/** Description:		Returns true if passed in entity is facing current entity. */
export declare const Ham_SC_IsFacing: i32;
/** Description:		Gets points without killing an entity. */
export declare const Ham_SC_GetPointsForDamage: i32;
/** Description:		Gets points for making some damage. */
export declare const Ham_SC_GetDamagePoints: i32;
/** Description:		Constructor. */
export declare const Ham_SC_OnCreate: i32;
/** Description:		Desctructor. */
export declare const Ham_SC_OnDestroy: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_IsValidEntity: i32;
/** Description:		Checks if this monster should fade out. */
export declare const Ham_SC_ShouldFadeOnDeath: i32;
/** Description:		Sets up a friendly monster. */
export declare const Ham_SC_SetupFriendly: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_ReviveThink: i32;
/** Description:		Revives a monster. */
export declare const Ham_SC_Revive: i32;
/** Description:		Final bit of initization before a monster is turned over to the AI. */
export declare const Ham_SC_StartMonster: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_SC_CheckRangeAttack1_Move: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_SC_CheckRangeAttack2_Move: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_SC_CheckMeleeAttack1_Move: i32;
/** Description:		Surveys conditions and set appropriate conditions bits for attack types. */
export declare const Ham_SC_CheckMeleeAttack2_Move: i32;
/** Description:		Checks tank usage. */
export declare const Ham_SC_CheckTankUsage: i32;
/** Description:		Sets a monster's gait activity. */
export declare const Ham_SC_SetGaitActivity: i32;
/** Description:		Tries to overcome local obstacles by triangulating a path around them. */
export declare const Ham_SC_FTriangulate: i32;
/** Description:		Tries to overcome local obstacles by triangulating a path around them. */
export declare const Ham_SC_FTriangulateExtension: i32;
/** Description:		Tries to find a nearby node that will hide the caller from its enemy. */
export declare const Ham_SC_FindCoverGrenade: i32;
/** Description:		Tries to find a nearby node that will hide the caller from its enemy. */
export declare const Ham_SC_FindCoverDistance: i32;
/** Description:		Tries to find a nearby node that will hide the caller from its enemy. */
export declare const Ham_SC_FindAttackPoint: i32;
/** Description:		Determines whether or not the chosen cover location is a good one to move to. */
export declare const Ham_SC_FValidateCover: i32;
/** Description:		Checks for possibility of friendly fire. */
export declare const Ham_SC_NoFriendlyFire1: i32;
/** Description:		Checks for possibility of friendly fire. */
export declare const Ham_SC_NoFriendlyFire2: i32;
/** Description:		Checks for possibility of friendly fire. */
export declare const Ham_SC_NoFriendlyFire3: i32;
/** Description:		Checks for possibility of friendly fire from the calling monster's origin to toPos. */
export declare const Ham_SC_NoFriendlyFireToPos: i32;
/** Description:		Same as FVisible but from gun position. */
export declare const Ham_SC_FVisibleGunPos: i32;
/** Description:		Checks for monsters in this generic cone. */
export declare const Ham_SC_FInBulletCone: i32;
/** Description:		- */
export declare const Ham_SC_CallGibMonster: i32;
/** Description:		- */
export declare const Ham_SC_CheckTimeBasedDamage: i32;
/** Description:		- */
export declare const Ham_SC_IsMoving: i32;
/** Description:		- */
export declare const Ham_SC_IsPlayerFollowing: i32;
/** Description:		- */
export declare const Ham_SC_StartPlayerFollowing: i32;
/** Description:		- */
export declare const Ham_SC_StopPlayerFollowing: i32;
/** Description:		- */
export declare const Ham_SC_UseSound: i32;
/** Description:		- */
export declare const Ham_SC_UnUseSound: i32;
/** Description:		- */
export declare const Ham_SC_RideMonster: i32;
/** Description:		- */
export declare const Ham_SC_CheckAndApplyGenericAttacks: i32;
/** Description:		- */
export declare const Ham_SC_CheckScared: i32;
/** Description:		- */
export declare const Ham_SC_CheckCreatureDanger: i32;
/** Description:		- */
export declare const Ham_SC_CheckFallDamage: i32;
/** Description:		- */
export declare const Ham_SC_CheckRevival: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_MedicCallSound: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_Player_MenuInputPerformed: i32;
/** Description:		- */
export declare const Ham_SC_Player_IsMenuInputDone: i32;
/** Description:		- */
export declare const Ham_SC_Player_SpecialSpawn: i32;
/** Description:		- */
export declare const Ham_SC_Player_IsValidInfoEntity: i32;
/** Description:		- */
export declare const Ham_SC_Player_LevelEnd: i32;
/** Description:		- */
export declare const Ham_SC_Player_VoteStarted: i32;
/** Description:		- */
export declare const Ham_SC_Player_CanStartNextVote: i32;
/** Description:		- */
export declare const Ham_SC_Player_Vote: i32;
/** Description:		- */
export declare const Ham_SC_Player_HasVoted: i32;
/** Description:		- */
export declare const Ham_SC_Player_ResetVote: i32;
/** Description:		- */
export declare const Ham_SC_Player_LastVoteInput: i32;
/** Description:		- */
export declare const Ham_SC_Player_InitVote: i32;
/** Description:		- */
export declare const Ham_SC_Player_TimeToStartNextVote: i32;
/** Description:		- */
export declare const Ham_SC_Player_ResetView: i32;
/** Description:		- */
export declare const Ham_SC_Player_GetLogFrequency: i32;
/** Description:		- */
export declare const Ham_SC_Player_LogPlayerStats: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_Player_DisableCollisionWithPlayer: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_Player_EnableCollisionWithPlayer: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_Player_CanTouchPlayer: i32;
/** Description:		(!) This function is no more available in the mod. */
export declare const Ham_SC_Item_Materialize: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_BulletAccuracy: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_TertiaryAttack: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_BurstSupplement: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_GetP_Model: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_GetW_Model: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_GetV_Model: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_PrecacheCustomModels: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_IsMultiplayer: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_FRunfuncs: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_SetFOV: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_FCanRun: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_CustomDecrement: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_SetV_Model: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_SetP_Model: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_ChangeWeaponSkin: i32;
/** Description:		Normally called whenever an entity dies. */
export declare const Ham_TFC_Killed: i32;
/** Description:		Returns whether an entity is activated. */
export declare const Ham_TFC_IsTriggered: i32;
/** Description:		Sends an animation event for the weapon. skiplocal is 1 if client is predicting weapon animations. */
export declare const Ham_TFC_Weapon_SendWeaponAnim: i32;
/** Description:		Gets next attack delay. */
export declare const Ham_TFC_Weapon_GetNextAttackDelay: i32;
/** Description:		Usually called whenever an entity gets a form of a heal. */
export declare const Ham_SC_TakeHealth: i32;
/** Description:		Usually called whenever an entity gets a form of armor. */
export declare const Ham_SC_TakeArmor: i32;
/** Description:		Gives ammo to the entity. */
export declare const Ham_SC_GiveAmmo: i32;
/** Description:		Determines if we should ignore damage. */
export declare const Ham_SC_CheckAttacker: i32;
/** Description:		Determines if a player is connected. */
export declare const Ham_SC_Player_IsConnected: i32;
/** Description:		Sends an animation event for the weapon. skiplocal is 1 if client is predicting weapon animations. */
export declare const Ham_DOD_Weapon_SendWeaponAnim: i32;
/** Description:		- */
export declare const Ham_CS_Item_IsWeapon: i32;
/** Description:		Returns the id of the entity if its class is derived off of CBaseSquadTalkMonster, -1 otherwise. */
export declare const Ham_OPF_MySquadTalkMonsterPointer: i32;
/** Description:		- */
export declare const Ham_OPF_WeaponTimeBase: i32;
/** Description:		Called when the alternate attack of a weapon is triggered. */
export declare const Ham_TS_Weapon_AlternateAttack: i32;
/** Description:		Gets item infos. */
export declare const Ham_Item_GetItemInfo: i32;
/** Description:		Performs checks that must occur before Spawn itself is called. Always call baseclass version first. */
export declare const Ham_SC_PreSpawn: i32;
/** Description:		Performs checks that must occur after Spawn itself is called. Always call baseclass version first. */
export declare const Ham_SC_PostSpawn: i32;
/** Description:		- */
export declare const Ham_SC_OnKeyValueUpdate: i32;
/** Description:		- */
export declare const Ham_SC_SetClassification: i32;
/** Description:		Returns whether an entity is activated. */
export declare const Ham_SC_IsTriggered: i32;
/** Description:		Returns the id of the entity if its class is derived off of ICustomEntity, -1 otherwise. */
export declare const Ham_SC_MyCustomPointer: i32;
/** Description:		Returns the id of the entity if its class is derived off of CBasePlayerItem, -1 otherwise. */
export declare const Ham_SC_MyItemPointer: i32;
/** Description:		Typically adds points to the entity. */
export declare const Ham_SC_AddPoints: i32;
/** Description:		Typically adds points to everybody on the entity's team. */
export declare const Ham_SC_AddPointsToTeam: i32;
/** Description:		Removes an item to the player's inventory. */
export declare const Ham_SC_RemovePlayerItem: i32;
/** Description:		Not entirely sure. */
export declare const Ham_SC_OnControls: i32;
/** Description:		Whether or not the entity is sneaking. */
export declare const Ham_SC_IsSneaking: i32;
/** Description:		Whether or not the entity is alive. */
export declare const Ham_SC_IsAlive: i32;
/** Description:		Whether or not the entity uses a BSP model. */
export declare const Ham_SC_IsBSPModel: i32;
/** Description:		Whether or not the entity can reflect gauss shots. */
export declare const Ham_SC_ReflectGauss: i32;
/** Description:		Whether or not the target is the same as the one passed. */
export declare const Ham_SC_HasTarget: i32;
/** Description:		Whether or not the entity is in the world. */
export declare const Ham_SC_IsInWorld: i32;
/** Description:		Whether or not the entity is a player. */
export declare const Ham_Sc_IsPlayer: i32;
/** Description:		Whether or not the entity is a net client. */
export declare const Ham_SC_IsNetClient: i32;
/** Description:		Whether or not the entity is a brush entity breakable. */
export declare const Ham_SC_IsBreakable: i32;
/** Description:		- */
export declare const Ham_SC_SUB_UseTargets: i32;
/** Description:		- */
export declare const Ham_SC_IsLockedByMaster: i32;
/** Description:		Normally called whenever a barnacle grabs the entity. */
export declare const Ham_SC_FBecomeProne: i32;
/** Description:		Returns true if a line can be traced from the caller's eyes to given vector. */
export declare const Ham_SC_FVecVisible: i32;
/** Description:		Sets the player ally state */
export declare const Ham_SC_SetPlayerAlly: i32;
/** Description:		Callback after trigger_setorigin has moved the entity. */
export declare const Ham_SC_OnSetOriginByMap: i32;
/** Description:		Return true if you want to be revivable. */
export declare const Ham_SC_IsRevivable: i32;
/** Description:		- */
export declare const Ham_SC_BeginRevive: i32;
/** Description:		- */
export declare const Ham_SC_EndRevive: i32;
/** Description:		Determines whether or not the monster can play the scripted sequence or AI sequence that is */
export declare const Ham_SC_CanPlaySequence: i32;
/** Description:		- */
export declare const Ham_SC_CanPlaySentence2: i32;
/** Description:		- */
export declare const Ham_SC_PlayScriptedSentence: i32;
/** Description:		Adds the item to the player. */
export declare const Ham_SC_Item_AddToPlayer: i32;
/** Description:		Returns true if you want your duplicate removed from world. */
export declare const Ham_SC_Item_AddDuplicate: i32;
/** Description:		- */
export declare const Ham_SC_Item_AddAmmoFromItem: i32;
/** Description:		- */
export declare const Ham_SC_Item_GetPickupSound: i32;
/** Description:		- */
export declare const Ham_SC_Item_CanCollect: i32;
/** Description:		- */
export declare const Ham_SC_Item_Collect: i32;
/** Description:		Gets item infos. */
export declare const Ham_SC_Item_GetItemInfo: i32;
/** Description:		Whether or not this entity can be deployed. */
export declare const Ham_SC_Item_CanDeploy: i32;
/** Description:		Deploys the entity (usually a weapon). */
export declare const Ham_SC_Item_Deploy: i32;
/** Description:		Whether or not the entity can be holstered. */
export declare const Ham_SC_Item_CanHolster: i32;
/** Description:		Called each frame by the player PreThink if inactive. */
export declare const Ham_SC_Item_InactiveItemPreFrame: i32;
/** Description:		Called each frame by the player PostThink if inactive. */
export declare const Ham_SC_Item_InactiveItemPostFrame: i32;
/** Description:		- */
export declare const Ham_SC_Item_DetachFromPlayer: i32;
/** Description:		Updates item data for the client. */
export declare const Ham_SC_Item_UpdateClientData: i32;
/** Description:		- */
export declare const Ham_SC_Item_GetRespawnTime: i32;
/** Description:		- */
export declare const Ham_SC_Item_CanHaveDuplicates: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_ExtractAmmoFromItem: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_AddWeapon: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_GetAmmo1Drop: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_GetAmmo2Drop: i32;
/** Description:		Plays the weapon's empty sound. */
export declare const Ham_SC_Weapon_PlayEmptySound: i32;
/** Description:		Whether or not the weapon is usable (has ammo, etc.) */
export declare const Ham_SC_Weapon_IsUsable: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_FinishReload: i32;
/** Description:		- */
export declare const Ham_SC_Weapon_ShouldReload: i32;
/** Description:		Whether or not the weapon should idle. */
export declare const Ham_SC_Weapon_ShouldWeaponIdle: i32;
/** Description:		Unsure. */
export declare const Ham_SC_Weapon_UseDecrement: i32;
/** Description:		- */
export declare const Ham_SC_Player_EnteredObserver: i32;
/** Description:		- */
export declare const Ham_SC_Player_LeftObserver: i32;
/** Description:		- */
export declare const Ham_SC_Player_IsObserver: i32;
/** DONT USE ME LOL */
export declare const HAM_LAST_ENTRY_DONT_USE_ME_LOL: i32;
export declare const HAM_OK: i32;
export declare const HAM_INVALID_FUNC: i32;
export declare const HAM_FUNC_NOT_CONFIGURED: i32;
export declare const HAM_FUNC_NOT_AVAILABLE: i32;
export declare const HAM_ERR_END: i32;
export declare const Ham_ItemInfo_iSlot: i32;
export declare const Ham_ItemInfo_iPosition: i32;
export declare const Ham_ItemInfo_pszAmmo1: i32;
export declare const Ham_ItemInfo_iMaxAmmo1: i32;
export declare const Ham_ItemInfo_pszAmmo2: i32;
export declare const Ham_ItemInfo_iMaxAmmo2: i32;
export declare const Ham_ItemInfo_pszName: i32;
export declare const Ham_ItemInfo_iMaxClip: i32;
export declare const Ham_ItemInfo_iId: i32;
export declare const Ham_ItemInfo_iFlags: i32;
export declare const Ham_ItemInfo_iWeight: i32;
/** IDs of weapons in CS */
export declare const CSW_NONE: i32;
export declare const CSW_P228: i32;
export declare const CSW_GLOCK: i32;
export declare const CSW_SCOUT: i32;
export declare const CSW_HEGRENADE: i32;
export declare const CSW_XM1014: i32;
export declare const CSW_C4: i32;
export declare const CSW_MAC10: i32;
export declare const CSW_AUG: i32;
export declare const CSW_SMOKEGRENADE: i32;
export declare const CSW_ELITE: i32;
export declare const CSW_FIVESEVEN: i32;
export declare const CSW_UMP45: i32;
export declare const CSW_SG550: i32;
export declare const CSW_GALI: i32;
export declare const CSW_GALIL: i32;
export declare const CSW_FAMAS: i32;
export declare const CSW_USP: i32;
export declare const CSW_GLOCK18: i32;
export declare const CSW_AWP: i32;
export declare const CSW_MP5NAVY: i32;
export declare const CSW_M249: i32;
export declare const CSW_M3: i32;
export declare const CSW_M4A1: i32;
export declare const CSW_TMP: i32;
export declare const CSW_G3SG1: i32;
export declare const CSW_FLASHBANG: i32;
export declare const CSW_DEAGLE: i32;
export declare const CSW_SG552: i32;
export declare const CSW_AK47: i32;
export declare const CSW_KNIFE: i32;
export declare const CSW_P90: i32;
export declare const CSW_VEST: i32;
export declare const CSW_VESTHELM: i32;
export declare const CSW_SHIELDGUN: i32;
export declare const CSW_LAST_WEAPON: i32;
/** Map zone flags returned by cs_get_user_mapzones(). */
export declare const CS_MAPZONE_BUY: i32;
export declare const CS_MAPZONE_BOMBTARGET: i32;
export declare const CS_MAPZONE_HOSTAGE_RESCUE: i32;
export declare const CS_MAPZONE_ESCAPE: i32;
export declare const CS_MAPZONE_VIP_SAFETY: i32;
/** Constants used for the CS_OnBuy() and CS_OnBuyAttempt() forwards. */
export declare const CSI_NONE: i32;
export declare const CSI_P228: i32;
export declare const CSI_GLOCK: i32;
export declare const CSI_SCOUT: i32;
export declare const CSI_HEGRENADE: i32;
export declare const CSI_XM1014: i32;
export declare const CSI_C4: i32;
export declare const CSI_MAC10: i32;
export declare const CSI_AUG: i32;
export declare const CSI_SMOKEGRENADE: i32;
export declare const CSI_ELITE: i32;
export declare const CSI_FIVESEVEN: i32;
export declare const CSI_UMP45: i32;
export declare const CSI_SG550: i32;
export declare const CSI_GALIL: i32;
export declare const CSI_FAMAS: i32;
export declare const CSI_USP: i32;
export declare const CSI_GLOCK18: i32;
export declare const CSI_AWP: i32;
export declare const CSI_MP5NAVY: i32;
export declare const CSI_M249: i32;
export declare const CSI_M3: i32;
export declare const CSI_M4A1: i32;
export declare const CSI_TMP: i32;
export declare const CSI_G3SG1: i32;
export declare const CSI_FLASHBANG: i32;
export declare const CSI_DEAGLE: i32;
export declare const CSI_SG552: i32;
export declare const CSI_AK47: i32;
export declare const CSI_KNIFE: i32;
export declare const CSI_P90: i32;
export declare const CSI_SHIELDGUN: i32;
export declare const CSI_VEST: i32;
export declare const CSI_VESTHELM: i32;
export declare const CSI_DEFUSER: i32;
export declare const CSI_NVGS: i32;
export declare const CSI_SHIELD: i32;
export declare const CSI_PRIAMMO: i32;
export declare const CSI_SECAMMO: i32;
export declare const CSI_MAX_COUNT: i32;
export declare const CSI_LAST_WEAPON: i32;
export declare const CS_PLAYER_MIN_BOUNCE_SPEED: i32;
/** Hint message flags for use with m_flDisplayHistory. */
export declare const CS_HINT_ROUND_STARTED: i32;
export declare const CS_HINT_HOSTAGE_SEEN_FAR: i32;
export declare const CS_HINT_HOSTAGE_SEEN_NEAR: i32;
export declare const CS_HINT_HOSTAGE_USED: i32;
export declare const CS_HINT_HOSTAGE_INJURED: i32;
export declare const CS_HINT_HOSTAGE_KILLED: i32;
export declare const CS_HINT_FRIEND_SEEN: i32;
export declare const CS_HINT_ENEMY_SEEN: i32;
export declare const CS_HINT_FRIEND_INJURED: i32;
export declare const CS_HINT_FRIEND_KILLED: i32;
export declare const CS_HINT_ENEMY_KILLED: i32;
export declare const CS_HINT_BOMB_RETRIEVED: i32;
export declare const CS_HINT_AMMO_EXHAUSTED: i32;
export declare const CS_HINT_IN_TARGET_ZONE: i32;
export declare const CS_HINT_IN_RESCUE_ZONE: i32;
export declare const CS_HINT_IN_ESCAPE_ZONE: i32;
export declare const CS_HINT_IN_VIPSAFETY_ZONE: i32;
export declare const CS_HINT_NIGHTVISION: i32;
export declare const CS_HINT_HOSTAGE_CTMOVE: i32;
/** Constants for use with m_iIgnoreGlobalChat (ignoremsg client's command) */
export declare const CS_IGNOREMSG_NONE: i32;
export declare const CS_IGNOREMSG_ENEMY: i32;
export declare const CS_IGNOREMSG_TEAM: i32;
/** Constants associated with mp_playerid server cvar. */
export declare const CS_PLAYERID_EVERYONE: i32;
export declare const CS_PLAYERID_TEAMONLY: i32;
export declare const CS_PLAYERID_OFF: i32;
/** Maximum range a status bar can be displayed. */
export declare const CS_MAX_ID_RANGE: i32;
export declare const CS_MAX_SPECTATOR_ID_RANGE: i32;
/** Maximum buffer length of a status bar message. */
export declare const CS_SBAR_STRING_SIZE: i32;
/** Constants associated to CS_SBAR_ID_TARGETTYPE. */
export declare const CS_SBAR_TARGETTYPE_TEAMMATE: i32;
export declare const CS_SBAR_TARGETTYPE_ENEMY: i32;
export declare const CS_SBAR_TARGETTYPE_HOSTAGE: i32;
/** Weapon slot types. */
export declare const CS_WEAPONSLOT_PRIMARY: i32;
export declare const CS_WEAPONSLOT_SECONDARY: i32;
export declare const CS_WEAPONSLOT_KNIFE: i32;
export declare const CS_WEAPONSLOT_GRENADE: i32;
export declare const CS_WEAPONSLOT_C4: i32;
/** Weapon state for use with m_iWeaponState. */
export declare const CS_WPNSTATE_USP_SILENCED: i32;
export declare const CS_WPNSTATE_GLOCK18_BURST_MODE: i32;
export declare const CS_WPNSTATE_M4A1_SILENCED: i32;
export declare const CS_WPNSTATE_ELITE_LEFT: i32;
export declare const CS_WPNSTATE_FAMAS_BURST_MODE: i32;
export declare const CS_WPNSTATE_SHIELD_DRAWN: i32;
/** Internal commands, for use with m_flLastCommandTime. */
export declare const CS_CMD_SAY: i32;
export declare const CS_CMD_SAYTEAM: i32;
export declare const CS_CMD_FULLUPDATE: i32;
export declare const CS_CMD_VOTE: i32;
export declare const CS_CMD_VOTEMAP: i32;
export declare const CS_CMD_LISTMAPS: i32;
export declare const CS_CMD_LISTPLAYERS: i32;
export declare const CS_CMD_NIGHTVISION: i32;
/** Signal state for use with m_signals. */
export declare const CS_SIGNAL_BUY: i32;
export declare const CS_SIGNAL_BOMB: i32;
export declare const CS_SIGNAL_RESCUE: i32;
export declare const CS_SIGNAL_ESCAPE: i32;
export declare const CS_SIGNAL_VIPSAFETY: i32;
export declare const CS_NORESET: i32;
export declare const CS_DONTCHANGE: i32;
export declare const CS_UNASSIGNED: i32;
export declare const CS_CT_URBAN: i32;
export declare const CS_T_TERROR: i32;
export declare const CS_T_LEET: i32;
export declare const CS_T_ARCTIC: i32;
export declare const CS_CT_GSG9: i32;
export declare const CS_CT_GIGN: i32;
export declare const CS_CT_SAS: i32;
export declare const CS_T_GUERILLA: i32;
export declare const CS_CT_VIP: i32;
export declare const CZ_T_MILITIA: i32;
export declare const CZ_CT_SPETSNAZ: i32;
export declare const CS_TEAM_UNASSIGNED: i32;
export declare const CS_TEAM_T: i32;
export declare const CS_TEAM_CT: i32;
export declare const CS_TEAM_SPECTATOR: i32;
export declare const CS_ARMOR_NONE: i32;
export declare const CS_ARMOR_KEVLAR: i32;
export declare const CS_ARMOR_VESTHELM: i32;
export declare const CS_RESET_ZOOM: i32;
export declare const CS_SET_NO_ZOOM: i32;
export declare const CS_SET_FIRST_ZOOM: i32;
export declare const CS_SET_SECOND_ZOOM: i32;
export declare const CS_SET_AUGSG552_ZOOM: i32;
export declare const CS_PLAYER_IDLE: i32;
export declare const CS_PLAYER_WALK: i32;
export declare const CS_PLAYER_JUMP: i32;
export declare const CS_PLAYER_SUPERJUMP: i32;
export declare const CS_PLAYER_DIE: i32;
export declare const CS_PLAYER_ATTACK1: i32;
export declare const CS_PLAYER_ATTACK2: i32;
export declare const CS_PLAYER_FLINCH: i32;
export declare const CS_PLAYER_LARGE_FLINCH: i32;
export declare const CS_PLAYER_RELOAD: i32;
export declare const CS_PLAYER_HOLDBOMB: i32;
export declare const CS_Menu_OFF: i32;
export declare const CS_Menu_ChooseTeam: i32;
export declare const CS_Menu_IGChooseTeam: i32;
export declare const CS_Menu_ChooseAppearance: i32;
export declare const CS_Menu_Buy: i32;
export declare const CS_Menu_BuyPistol: i32;
export declare const CS_Menu_BuyRifle: i32;
export declare const CS_Menu_BuyMachineGun: i32;
export declare const CS_Menu_BuyShotgun: i32;
export declare const CS_Menu_BuySubMachineGun: i32;
export declare const CS_Menu_BuyItem: i32;
export declare const CS_Menu_Radio1: i32;
export declare const CS_Menu_Radio2: i32;
export declare const CS_Menu_Radio3: i32;
export declare const CS_Menu_ClientBuy: i32;
export declare const CS_STATE_JOINED: i32;
export declare const CS_STATE_SHOW_LTEXT: i32;
export declare const CS_STATE_READING_LTEXT: i32;
export declare const CS_STATE_SHOW_TEAM_SELECT: i32;
export declare const CS_STATE_PICKING_TEAM: i32;
export declare const CS_STATE_GET_INTO_GAME: i32;
export declare const CS_THROW_NONE: i32;
export declare const CS_THROW_FORWARD: i32;
export declare const CS_THROW_BACKWARD: i32;
export declare const CS_THROW_HITVEL: i32;
export declare const CS_THROW_BOMB: i32;
export declare const CS_THROW_GRENADE: i32;
export declare const CS_THROW_HITVEL_MINUS_AIRVEL: i32;
export declare const CS_SBAR_ID_TARGETTYPE: i32;
export declare const CS_SBAR_ID_TARGETNAME: i32;
export declare const CS_SBAR_ID_TARGETHEALTH: i32;
export declare const CS_WEAPONCLASS_NONE: i32;
export declare const CS_WEAPONCLASS_KNIFE: i32;
export declare const CS_WEAPONCLASS_PISTOL: i32;
export declare const CS_WEAPONCLASS_GRENADE: i32;
export declare const CS_WEAPONCLASS_SUBMACHINEGUN: i32;
export declare const CS_WEAPONCLASS_SHOTGUN: i32;
export declare const CS_WEAPONCLASS_MACHINEGUN: i32;
export declare const CS_WEAPONCLASS_RIFLE: i32;
export declare const CS_WEAPONCLASS_SNIPERRIFLE: i32;
export declare const CS_AUTOBUYCLASS_PRIMARY: i32;
export declare const CS_AUTOBUYCLASS_SECONDARY: i32;
export declare const CS_AUTOBUYCLASS_AMMO: i32;
export declare const CS_AUTOBUYCLASS_ARMOR: i32;
export declare const CS_AUTOBUYCLASS_DEFUSER: i32;
export declare const CS_AUTOBUYCLASS_PISTOL: i32;
export declare const CS_AUTOBUYCLASS_SMG: i32;
export declare const CS_AUTOBUYCLASS_RIFLE: i32;
export declare const CS_AUTOBUYCLASS_SNIPERRIFLE: i32;
export declare const CS_AUTOBUYCLASS_SHOTGUN: i32;
export declare const CS_AUTOBUYCLASS_MACHINEGUN: i32;
export declare const CS_AUTOBUYCLASS_GRENADE: i32;
export declare const CS_AUTOBUYCLASS_NIGHTVISION: i32;
export declare const CS_AUTOBUYCLASS_SHIELD: i32;
export declare const CS_AMMO_BUCKSHOT: i32;
export declare const CS_AMMO_9MM: i32;
export declare const CS_AMMO_556NATO: i32;
export declare const CS_AMMO_556NATOBOX: i32;
export declare const CS_AMMO_762NATO: i32;
export declare const CS_AMMO_45ACP: i32;
export declare const CS_AMMO_50AE: i32;
export declare const CS_AMMO_338MAGNUM: i32;
export declare const CS_AMMO_57MM: i32;
export declare const CS_AMMO_357SIG: i32;
export declare const CS_WEAPONINFO_COST: i32;
export declare const CS_WEAPONINFO_CLIP_COST: i32;
export declare const CS_WEAPONINFO_BUY_CLIP_SIZE: i32;
export declare const CS_WEAPONINFO_GUN_CLIP_SIZE: i32;
export declare const CS_WEAPONINFO_MAX_ROUNDS: i32;
export declare const CS_WEAPONINFO_AMMO_TYPE: i32;
export declare const CS_AK47_PRICE: i32;
export declare const CS_AWP_PRICE: i32;
export declare const CS_DEAGLE_PRICE: i32;
export declare const CS_G3SG1_PRICE: i32;
export declare const CS_SG550_PRICE: i32;
export declare const CS_GLOCK18_PRICE: i32;
export declare const CS_M249_PRICE: i32;
export declare const CS_M3_PRICE: i32;
export declare const CS_M4A1_PRICE: i32;
export declare const CS_AUG_PRICE: i32;
export declare const CS_MP5NAVY_PRICE: i32;
export declare const CS_P228_PRICE: i32;
export declare const CS_P90_PRICE: i32;
export declare const CS_UMP45_PRICE: i32;
export declare const CS_MAC10_PRICE: i32;
export declare const CS_SCOUT_PRICE: i32;
export declare const CS_SG552_PRICE: i32;
export declare const CS_TMP_PRICE: i32;
export declare const CS_USP_PRICE: i32;
export declare const CS_ELITE_PRICE: i32;
export declare const CS_FIVESEVEN_PRICE: i32;
export declare const CS_XM1014_PRICE: i32;
export declare const CS_GALIL_PRICE: i32;
export declare const CS_FAMAS_PRICE: i32;
export declare const CS_SHIELDGUN_PRICE: i32;
export declare const CS_ASSAULTSUIT_PRICE: i32;
export declare const CS_FLASHBANG_PRICE: i32;
export declare const CS_HEGRENADE_PRICE: i32;
export declare const CS_SMOKEGRENADE_PRICE: i32;
export declare const CS_KEVLAR_PRICE: i32;
export declare const CS_HELMET_PRICE: i32;
export declare const CS_NVG_PRICE: i32;
export declare const CS_DEFUSEKIT_PRICE: i32;
export declare const CS_AMMO_338MAG_PRICE: i32;
export declare const CS_AMMO_357SIG_PRICE: i32;
export declare const CS_AMMO_45ACP_PRICE: i32;
export declare const CS_AMMO_50AE_PRICE: i32;
export declare const CS_AMMO_556NATO_PRICE: i32;
export declare const CS_AMMO_57MM_PRICE: i32;
export declare const CS_AMMO_762NATO_PRICE: i32;
export declare const CS_AMMO_9MM_PRICE: i32;
export declare const CS_AMMO_BUCKSHOT_PRICE: i32;
/** Flags for the [set|get]_speak() natives. */
export declare const SPEAK_NORMAL: i32;
export declare const SPEAK_MUTED: i32;
export declare const SPEAK_ALL: i32;
export declare const SPEAK_LISTENALL: i32;
/** View types for the set_view() native. */
export declare const CAMERA_NONE: i32;
export declare const CAMERA_3RDPERSON: i32;
export declare const CAMERA_UPLEFT: i32;
export declare const CAMERA_TOPDOWN: i32;
export declare const EV_INT_gamestate: i32;
export declare const EV_INT_oldbuttons: i32;
export declare const EV_INT_groupinfo: i32;
export declare const EV_INT_iuser1: i32;
export declare const EV_INT_iuser2: i32;
export declare const EV_INT_iuser3: i32;
export declare const EV_INT_iuser4: i32;
export declare const EV_INT_weaponanim: i32;
export declare const EV_INT_pushmsec: i32;
export declare const EV_INT_bInDuck: i32;
export declare const EV_INT_flTimeStepSound: i32;
export declare const EV_INT_flSwimTime: i32;
export declare const EV_INT_flDuckTime: i32;
export declare const EV_INT_iStepLeft: i32;
export declare const EV_INT_movetype: i32;
export declare const EV_INT_solid: i32;
export declare const EV_INT_skin: i32;
export declare const EV_INT_body: i32;
export declare const EV_INT_effects: i32;
export declare const EV_INT_light_level: i32;
export declare const EV_INT_sequence: i32;
export declare const EV_INT_gaitsequence: i32;
export declare const EV_INT_modelindex: i32;
export declare const EV_INT_playerclass: i32;
export declare const EV_INT_waterlevel: i32;
export declare const EV_INT_watertype: i32;
export declare const EV_INT_spawnflags: i32;
export declare const EV_INT_flags: i32;
export declare const EV_INT_colormap: i32;
export declare const EV_INT_team: i32;
export declare const EV_INT_fixangle: i32;
export declare const EV_INT_weapons: i32;
export declare const EV_INT_rendermode: i32;
export declare const EV_INT_renderfx: i32;
export declare const EV_INT_button: i32;
export declare const EV_INT_impulse: i32;
export declare const EV_INT_deadflag: i32;
export declare const EV_FL_impacttime: i32;
export declare const EV_FL_starttime: i32;
export declare const EV_FL_idealpitch: i32;
export declare const EV_FL_pitch_speed: i32;
export declare const EV_FL_ideal_yaw: i32;
export declare const EV_FL_yaw_speed: i32;
export declare const EV_FL_ltime: i32;
export declare const EV_FL_nextthink: i32;
export declare const EV_FL_gravity: i32;
export declare const EV_FL_friction: i32;
export declare const EV_FL_frame: i32;
export declare const EV_FL_animtime: i32;
export declare const EV_FL_framerate: i32;
export declare const EV_FL_health: i32;
export declare const EV_FL_frags: i32;
export declare const EV_FL_takedamage: i32;
export declare const EV_FL_max_health: i32;
export declare const EV_FL_teleport_time: i32;
export declare const EV_FL_armortype: i32;
export declare const EV_FL_armorvalue: i32;
export declare const EV_FL_dmg_take: i32;
export declare const EV_FL_dmg_save: i32;
export declare const EV_FL_dmg: i32;
export declare const EV_FL_dmgtime: i32;
export declare const EV_FL_speed: i32;
export declare const EV_FL_air_finished: i32;
export declare const EV_FL_pain_finished: i32;
export declare const EV_FL_radsuit_finished: i32;
export declare const EV_FL_scale: i32;
export declare const EV_FL_renderamt: i32;
export declare const EV_FL_maxspeed: i32;
export declare const EV_FL_fov: i32;
export declare const EV_FL_flFallVelocity: i32;
export declare const EV_FL_fuser1: i32;
export declare const EV_FL_fuser2: i32;
export declare const EV_FL_fuser3: i32;
export declare const EV_FL_fuser4: i32;
export declare const EV_VEC_origin: i32;
export declare const EV_VEC_oldorigin: i32;
export declare const EV_VEC_velocity: i32;
export declare const EV_VEC_basevelocity: i32;
export declare const EV_VEC_clbasevelocity: i32;
export declare const EV_VEC_movedir: i32;
export declare const EV_VEC_angles: i32;
export declare const EV_VEC_avelocity: i32;
export declare const EV_VEC_punchangle: i32;
export declare const EV_VEC_v_angle: i32;
export declare const EV_VEC_endpos: i32;
export declare const EV_VEC_startpos: i32;
export declare const EV_VEC_absmin: i32;
export declare const EV_VEC_absmax: i32;
export declare const EV_VEC_mins: i32;
export declare const EV_VEC_maxs: i32;
export declare const EV_VEC_size: i32;
export declare const EV_VEC_rendercolor: i32;
export declare const EV_VEC_view_ofs: i32;
export declare const EV_VEC_vuser1: i32;
export declare const EV_VEC_vuser2: i32;
export declare const EV_VEC_vuser3: i32;
export declare const EV_VEC_vuser4: i32;
export declare const EV_ENT_chain: i32;
export declare const EV_ENT_dmg_inflictor: i32;
export declare const EV_ENT_enemy: i32;
export declare const EV_ENT_aiment: i32;
export declare const EV_ENT_owner: i32;
export declare const EV_ENT_groundentity: i32;
export declare const EV_ENT_pContainingEntity: i32;
export declare const EV_ENT_euser1: i32;
export declare const EV_ENT_euser2: i32;
export declare const EV_ENT_euser3: i32;
export declare const EV_ENT_euser4: i32;
export declare const EV_SZ_classname: i32;
export declare const EV_SZ_globalname: i32;
export declare const EV_SZ_model: i32;
export declare const EV_SZ_target: i32;
export declare const EV_SZ_targetname: i32;
export declare const EV_SZ_netname: i32;
export declare const EV_SZ_message: i32;
export declare const EV_SZ_noise: i32;
export declare const EV_SZ_noise1: i32;
export declare const EV_SZ_noise2: i32;
export declare const EV_SZ_noise3: i32;
export declare const EV_SZ_viewmodel: i32;
export declare const EV_SZ_weaponmodel: i32;
export declare const EV_BYTE_controller1: i32;
export declare const EV_BYTE_controller2: i32;
export declare const EV_BYTE_controller3: i32;
export declare const EV_BYTE_controller4: i32;
export declare const EV_BYTE_blending1: i32;
export declare const EV_BYTE_blending2: i32;
export declare const GL_trace_ent: i32;
export declare const GL_coop: i32;
export declare const GL_deathmatch: i32;
export declare const GL_force_retouch: i32;
export declare const GL_found_secrets: i32;
export declare const GL_frametime: i32;
export declare const GL_serverflags: i32;
export declare const GL_teamplay: i32;
export declare const GL_time: i32;
export declare const GL_trace_allsolid: i32;
export declare const GL_trace_fraction: i32;
export declare const GL_trace_inopen: i32;
export declare const GL_trace_inwater: i32;
export declare const GL_trace_plane_dist: i32;
export declare const GL_trace_startsolid: i32;
export declare const GL_cdAudioTrack: i32;
export declare const GL_maxClients: i32;
export declare const GL_maxEntities: i32;
export declare const GL_msg_entity: i32;
export declare const GL_trace_flags: i32;
export declare const GL_trace_hitgroup: i32;
export declare const GL_pStringBase: i32;
export declare const GL_mapname: i32;
export declare const GL_startspot: i32;
export declare const GL_trace_endpos: i32;
export declare const GL_trace_plane_normal: i32;
export declare const GL_v_forward: i32;
export declare const GL_v_right: i32;
export declare const GL_v_up: i32;
export declare const GL_vecLandmarkOffset: i32;
export declare const GL_pSaveData: i32;
export declare const usercmd_float_start: i32;
export declare const usercmd_forwardmove: i32;
export declare const usercmd_sidemove: i32;
export declare const usercmd_upmove: i32;
export declare const usercmd_float_end: i32;
export declare const usercmd_int_start: i32;
export declare const usercmd_lerp_msec: i32;
export declare const usercmd_msec: i32;
export declare const usercmd_lightlevel: i32;
export declare const usercmd_buttons: i32;
export declare const usercmd_impulse: i32;
export declare const usercmd_weaponselect: i32;
export declare const usercmd_impact_index: i32;
export declare const usercmd_int_end: i32;
export declare const usercmd_vec_start: i32;
export declare const usercmd_viewangles: i32;
export declare const usercmd_impact_position: i32;
export declare const usercmd_vec_end: i32;
export declare const TR_AllSolid: i32;
export declare const TR_StartSolid: i32;
export declare const TR_InOpen: i32;
export declare const TR_InWater: i32;
export declare const TR_Fraction: i32;
export declare const TR_EndPos: i32;
export declare const TR_PlaneDist: i32;
export declare const TR_PlaneNormal: i32;
export declare const TR_Hit: i32;
export declare const TR_Hitgroup: i32;
export declare const BIT_CONNECTED: i32;
export declare const BIT_ALIVE: i32;
export declare const BIT_FLASHLIGHT: i32;
export declare const BIT_HIDE_TIMER: i32;
export declare const BIT_USER_SEMICLIP: i32;
export declare const BIT_KNIFE_ACCESS: i32;
export declare const BIT_KNIFE_REDIRECT: i32;
export declare const BIT_PROTECTION: i32;
export declare const BIT_SEMICLIP_BLOCK: i32;
export declare const BIT_GHOST: i32;
export declare const BIT_MAX: i32;
export declare const SC_DEFAULT: i32;
export declare const SC_FORCE_ON: i32;
export declare const SC_FORCE_OFF: i32;
export declare const MODE_NONE: i32;
export declare const MODE_NORMAL: i32;
export declare const MODE_DM: i32;
export declare const MODE_SOLO: i32;
export declare const TASK_FREEZE_TIMER: i32;
export declare const TASK_REGEN: i32;
export declare const TASK_RESTART_GAME: i32;
export declare const TASK_RESPAWN: i32;
export declare const TASK_ROUND_TIMER: i32;
export declare const TASK_WELCOME: i32;
export declare const TASK_CHECK_ROUND: i32;
export declare const TASK_PROTECTION: i32;
export declare const TASK_PROTECTION_HUD: i32;
export declare const TASK_MARIO_HUD: i32;
export declare const TASK_MESSAGES: i32;
export declare const TASK_LOAD_SETTINGS: i32;
export declare const AMXX_VERSION_TAG: string;
export declare const AMXX_VERSION_CSET: string;
export declare const AMXX_VERSION_MAJOR: string;
export declare const AMXX_VERSION_MAJOR_NUM: i32;
export declare const AMXX_VERSION_MINOR: string;
export declare const AMXX_VERSION_MINOR_NUM: i32;
export declare const AMXX_VERSION_RELEASE: string;
export declare const AMXX_VERSION_LOCAL_REV_NUM: i32;
export declare const AMXX_VERSION_LOCAL_REV: string;
export declare const AMXX_VERSION_NUM: i32;
/** Buffer size used by fmt(). */
export declare const MAX_FMT_LENGTH: i32;
/** Below are the trim flags for strtok2 */
export declare const LTRIM_LEFT: i32;
export declare const RTRIM_LEFT: i32;
export declare const LTRIM_RIGHT: i32;
export declare const RTRIM_RIGHT: i32;
export declare const TRIM_INNER: i32;
export declare const TRIM_OUTER: i32;
export declare const TRIM_FULL: i32;
/** Destination types for message_begin() */
export declare const MSG_PVS: i32;
export declare const MSG_PAS: i32;
export declare const MSG_PVS_R: i32;
export declare const MSG_PAS_R: i32;
export declare const MSG_ONE_UNRELIABLE: i32;
/** Hardcoded message types for message_begin() */
export declare const SVC_BAD: i32;
export declare const SVC_NOP: i32;
export declare const SVC_DISCONNECT: i32;
export declare const SVC_EVENT: i32;
export declare const SVC_VERSION: i32;
export declare const SVC_SETVIEW: i32;
export declare const SVC_SOUND: i32;
export declare const SVC_TIME: i32;
export declare const SVC_PRINT: i32;
export declare const SVC_STUFFTEXT: i32;
export declare const SVC_SETANGLE: i32;
export declare const SVC_SERVERINFO: i32;
export declare const SVC_LIGHTSTYLE: i32;
export declare const SVC_UPDATEUSERINFO: i32;
export declare const SVC_DELTADESCRIPTION: i32;
export declare const SVC_CLIENTDATA: i32;
export declare const SVC_STOPSOUND: i32;
export declare const SVC_PINGS: i32;
export declare const SVC_PARTICLE: i32;
export declare const SVC_DAMAGE: i32;
export declare const SVC_SPAWNSTATIC: i32;
export declare const SVC_EVENT_RELIABLE: i32;
export declare const SVC_SPAWNBASELINE: i32;
export declare const SVC_TEMPENTITY: i32;
export declare const SVC_SETPAUSE: i32;
export declare const SVC_SIGNONNUM: i32;
export declare const SVC_CENTERPRINT: i32;
export declare const SVC_KILLEDMONSTER: i32;
export declare const SVC_FOUNDSECRET: i32;
export declare const SVC_SPAWNSTATICSOUND: i32;
export declare const SVC_INTERMISSION: i32;
export declare const SVC_FINALE: i32;
export declare const SVC_CDTRACK: i32;
export declare const SVC_RESTORE: i32;
export declare const SVC_CUTSCENE: i32;
export declare const SVC_WEAPONANIM: i32;
export declare const SVC_DECALNAME: i32;
export declare const SVC_ROOMTYPE: i32;
export declare const SVC_ADDANGLE: i32;
export declare const SVC_NEWUSERMSG: i32;
export declare const SVC_PACKETENTITIES: i32;
export declare const SVC_DELTAPACKETENTITIES: i32;
export declare const SVC_CHOKE: i32;
export declare const SVC_RESOURCELIST: i32;
export declare const SVC_NEWMOVEVARS: i32;
export declare const SVC_RESOURCEREQUEST: i32;
export declare const SVC_CUSTOMIZATION: i32;
export declare const SVC_CROSSHAIRANGLE: i32;
export declare const SVC_SOUNDFADE: i32;
export declare const SVC_FILETXFERFAILED: i32;
export declare const SVC_HLTV: i32;
export declare const SVC_DIRECTOR: i32;
export declare const SVC_VOICEINIT: i32;
export declare const SVC_VOICEDATA: i32;
export declare const SVC_SENDEXTRAINFO: i32;
export declare const SVC_TIMESCALE: i32;
export declare const SVC_RESOURCELOCATION: i32;
export declare const SVC_SENDCVARVALUE: i32;
export declare const SVC_SENDCVARVALUE2: i32;
/** Flags for set_msg_block() */
export declare const BLOCK_NOT: i32;
export declare const BLOCK_ONCE: i32;
export declare const BLOCK_SET: i32;
/** Beam effect between a point and an entity */
export declare const TE_BEAMENTPOINT: i32;
/** Flags for the TE_EXPLOSION effect, controlling its performance and aesthetic */
export declare const TE_EXPLFLAG_NONE: i32;
export declare const TE_EXPLFLAG_NOADDITIVE: i32;
export declare const TE_EXPLFLAG_NODLIGHTS: i32;
export declare const TE_EXPLFLAG_NOSOUND: i32;
export declare const TE_EXPLFLAG_NOPARTICLES: i32;
/** Quake1 colormaped (base palette) particle explosion with sound */
export declare const TE_EXPLOSION2: i32;
/** Decal from the .BSP file */
export declare const TE_BSPDECAL: i32;
/** Tracers moving toward a point */
export declare const TE_IMPLOSION: i32;
/** Line of moving glow sprites with gravity, fadeout, and collisions */
export declare const TE_SPRITETRAIL: i32;
/** Additive sprite, plays 1 cycle */
export declare const TE_SPRITE: i32;
/** A beam with a sprite at the end */
export declare const TE_BEAMSPRITE: i32;
/** Screen aligned beam ring, expands to max radius over lifetime */
export declare const TE_BEAMTORUS: i32;
/** Disk that expands to max radius over lifetime */
export declare const TE_BEAMDISK: i32;
/** Cylinder that expands to max radius over lifetime */
export declare const TE_BEAMCYLINDER: i32;
/** Create a line of decaying beam segments until entity stops moving */
export declare const TE_BEAMFOLLOW: i32;
/** TE_GLOWSPRITE */
export declare const TE_GLOWSPRITE: i32;
/** Connect a beam ring to two entities */
export declare const TE_BEAMRING: i32;
/** Oriented shower of tracers */
export declare const TE_STREAK_SPLASH: i32;
/** Dynamic light, effect world, minor entity effect */
export declare const TE_DLIGHT: i32;
/** Point entity light, no world effect */
export declare const TE_ELIGHT: i32;
/** TE_TEXTMESSAGE */
export declare const TE_TEXTMESSAGE: i32;
/** TE_LINE */
export declare const TE_LINE: i32;
/** TE_BOX */
export declare const TE_BOX: i32;
/** Kill all beams attached to entity */
export declare const TE_KILLBEAM: i32;
/** TE_LARGEFUNNEL */
export declare const TE_LARGEFUNNEL: i32;
/** Particle spray */
export declare const TE_BLOOD: i32;
/** Decal applied to a brush entity (not the world) */
export declare const TE_DECAL: i32;
/** Create alpha sprites inside of entity, float upwards */
export declare const TE_FIZZ: i32;
/** Create a moving model that bounces and makes a sound when it hits */
export declare const TE_MODEL: i32;
/** Spherical shower of models, picks from set */
export declare const TE_EXPLODEMODEL: i32;
/** Box of models or sprites */
export declare const TE_BREAKMODEL: i32;
/** Decal and ricochet sound */
export declare const TE_GUNSHOTDECAL: i32;
/** Spray of alpha sprites */
export declare const TE_SPRITE_SPRAY: i32;
/** Quick spark sprite, client ricochet sound. */
export declare const TE_ARMOR_RICOCHET: i32;
/** TE_PLAYERDECAL */
export declare const TE_PLAYERDECAL: i32;
/** Create alpha sprites inside of box, float upwards */
export declare const TE_BUBBLES: i32;
/** Create alpha sprites along a line, float upwards */
export declare const TE_BUBBLETRAIL: i32;
/** Spray of opaque sprite1's that fall, single sprite2 for 1..2 secs (this is a high-priority tent) */
export declare const TE_BLOODSPRITE: i32;
/** Decal applied to the world brush */
export declare const TE_WORLDDECAL: i32;
/** Decal (with texture index > 256) applied to world brush */
export declare const TE_WORLDDECALHIGH: i32;
/** Same as TE_DECAL, but the texture index was greater than 256 */
export declare const TE_DECALHIGH: i32;
/** Makes a projectile (like a nail) (this is a high-priority tent) */
export declare const TE_PROJECTILE: i32;
/** Throws a shower of sprites or models */
export declare const TE_SPRAY: i32;
/** Sprites emit from a player's bounding box (ONLY use for players!) */
export declare const TE_PLAYERSPRITES: i32;
/** Very similar to lavasplash */
export declare const TE_PARTICLEBURST: i32;
/** Makes a field of fire */
export declare const TE_FIREFIELD: i32;
/** Flags for the TE_FIREFIELD effect, controlling its performance and aesthetic */
export declare const TEFIRE_FLAG_ALLFLOAT: i32;
export declare const TEFIRE_FLAG_SOMEFLOAT: i32;
export declare const TEFIRE_FLAG_LOOP: i32;
export declare const TEFIRE_FLAG_ALPHA: i32;
export declare const TEFIRE_FLAG_PLANAR: i32;
/** Attaches a TENT to a player (this is a high-priority tent) */
export declare const TE_PLAYERATTACHMENT: i32;
/** Will expire all TENTS attached to a player. */
export declare const TE_KILLPLAYERATTACHMENTS: i32;
/** Much more compact shotgun message */
export declare const TE_MULTIGUNSHOT: i32;
/** Larger message than the standard tracer, but allows some customization. */
export declare const TE_USERTRACER: i32;
/** From hltv.h from the HLSDK, these are used in conjunction with SVC_DIRECTOR */
export declare const DRC_CMD_NONE: i32;
export declare const DRC_CMD_START: i32;
export declare const DRC_CMD_EVENT: i32;
export declare const DRC_CMD_MODE: i32;
export declare const DRC_CMD_CAMERA: i32;
export declare const DRC_CMD_TIMESCALE: i32;
export declare const DRC_CMD_MESSAGE: i32;
export declare const DRC_CMD_SOUND: i32;
export declare const DRC_CMD_STATUS: i32;
export declare const DRC_CMD_BANNER: i32;
export declare const DRC_CMD_SHAKE: i32;
export declare const DRC_CMD_STUFFTEXT: i32;
export declare const DRC_CMD_LAST: i32;
export declare const DRC_FLAG_SIDE: i32;
export declare const DRC_FLAG_DRAMATIC: i32;
export declare const DRC_FLAG_SLOWMOTION: i32;
export declare const DRC_FLAG_FACEPLAYER: i32;
export declare const DRC_FLAG_INTRO: i32;
export declare const DRC_FLAG_FINAL: i32;
export declare const DRC_FLAG_NO_RANDOM: i32;
export declare const MAX_DIRECTOR_CMD_PARAMETERS: i32;
export declare const MAX_DIRECTOR_CMD_STRING: i32;
export declare const ARG_BYTE: i32;
export declare const ARG_CHAR: i32;
export declare const ARG_SHORT: i32;
export declare const ARG_LONG: i32;
export declare const ARG_ANGLE: i32;
export declare const ARG_COORD: i32;
export declare const ARG_STRING: i32;
export declare const ARG_ENTITY: i32;
/** rh_emit_sound2 flags */
export declare const SND_EMIT2_NOPAS: i32;
export declare const SND_EMIT2_INVOKER: i32;
export declare const MNT_TRUE: i32;
export declare const MNT_SET: i32;
export declare const VisibilityInPVS: i32;
export declare const VisibilityInPAS: i32;
export declare const t_sound: i32;
export declare const t_skin: i32;
export declare const t_model: i32;
export declare const t_decal: i32;
export declare const t_generic: i32;
export declare const t_eventscript: i32;
export declare const t_world: i32;
export declare const rt_unk: i32;
export declare const rt_max: i32;
export declare const RH_SV_StartSound: i32;
export declare const RH_SV_DropClient: i32;
export declare const RH_SV_ActivateServer: i32;
export declare const RH_Cvar_DirectSet: i32;
export declare const RH_SV_WriteFullClientUpdate: i32;
export declare const RH_GetEntityInit: i32;
export declare const RH_ClientConnected: i32;
export declare const RH_SV_ConnectClient: i32;
export declare const RH_SV_EmitPings: i32;
export declare const RH_ED_Alloc: i32;
export declare const RH_ED_Free: i32;
export declare const RH_Con_Printf: i32;
export declare const RH_SV_CheckUserInfo: i32;
export declare const RH_PF_precache_generic_I: i32;
export declare const RH_PF_precache_model_I: i32;
export declare const RH_PF_precache_sound_I: i32;
export declare const RH_EV_Precache: i32;
export declare const RH_SV_AddResource: i32;
export declare const RH_SV_ClientPrintf: i32;
export declare const RH_SV_AllowPhysent: i32;
export declare const RH_ExecuteServerStringCmd: i32;
export declare const RH_SV_SendResources: i32;
export declare const var_classname: i32;
export declare const var_globalname: i32;
export declare const var_origin: i32;
export declare const var_oldorigin: i32;
export declare const var_velocity: i32;
export declare const var_basevelocity: i32;
export declare const var_clbasevelocity: i32;
export declare const var_movedir: i32;
export declare const var_angles: i32;
export declare const var_avelocity: i32;
export declare const var_punchangle: i32;
export declare const var_v_angle: i32;
export declare const var_endpos: i32;
export declare const var_startpos: i32;
export declare const var_impacttime: i32;
export declare const var_starttime: i32;
export declare const var_fixangle: i32;
export declare const var_idealpitch: i32;
export declare const var_pitch_speed: i32;
export declare const var_ideal_yaw: i32;
export declare const var_yaw_speed: i32;
export declare const var_modelindex: i32;
export declare const var_model: i32;
export declare const var_viewmodel: i32;
export declare const var_weaponmodel: i32;
export declare const var_absmin: i32;
export declare const var_absmax: i32;
export declare const var_mins: i32;
export declare const var_maxs: i32;
export declare const var_size: i32;
export declare const var_ltime: i32;
export declare const var_nextthink: i32;
export declare const var_movetype: i32;
export declare const var_solid: i32;
export declare const var_skin: i32;
export declare const var_body: i32;
export declare const var_effects: i32;
export declare const var_gravity: i32;
export declare const var_friction: i32;
export declare const var_light_level: i32;
export declare const var_sequence: i32;
export declare const var_gaitsequence: i32;
export declare const var_frame: i32;
export declare const var_animtime: i32;
export declare const var_framerate: i32;
export declare const var_controller: i32;
export declare const var_blending: i32;
export declare const var_scale: i32;
export declare const var_rendermode: i32;
export declare const var_renderamt: i32;
export declare const var_rendercolor: i32;
export declare const var_renderfx: i32;
export declare const var_health: i32;
export declare const var_frags: i32;
export declare const var_weapons: i32;
export declare const var_takedamage: i32;
export declare const var_deadflag: i32;
export declare const var_view_ofs: i32;
export declare const var_button: i32;
export declare const var_impulse: i32;
export declare const var_chain: i32;
export declare const var_dmg_inflictor: i32;
export declare const var_enemy: i32;
export declare const var_aiment: i32;
export declare const var_owner: i32;
export declare const var_groundentity: i32;
export declare const var_spawnflags: i32;
export declare const var_flags: i32;
export declare const var_colormap: i32;
export declare const var_team: i32;
export declare const var_max_health: i32;
export declare const var_teleport_time: i32;
export declare const var_armortype: i32;
export declare const var_armorvalue: i32;
export declare const var_waterlevel: i32;
export declare const var_watertype: i32;
export declare const var_target: i32;
export declare const var_targetname: i32;
export declare const var_netname: i32;
export declare const var_message: i32;
export declare const var_dmg_take: i32;
export declare const var_dmg_save: i32;
export declare const var_dmg: i32;
export declare const var_dmgtime: i32;
export declare const var_noise: i32;
export declare const var_noise1: i32;
export declare const var_noise2: i32;
export declare const var_noise3: i32;
export declare const var_speed: i32;
export declare const var_air_finished: i32;
export declare const var_pain_finished: i32;
export declare const var_radsuit_finished: i32;
export declare const var_pContainingEntity: i32;
export declare const var_playerclass: i32;
export declare const var_maxspeed: i32;
export declare const var_fov: i32;
export declare const var_weaponanim: i32;
export declare const var_pushmsec: i32;
export declare const var_bInDuck: i32;
export declare const var_flTimeStepSound: i32;
export declare const var_flSwimTime: i32;
export declare const var_flDuckTime: i32;
export declare const var_iStepLeft: i32;
export declare const var_flFallVelocity: i32;
export declare const var_gamestate: i32;
export declare const var_oldbuttons: i32;
export declare const var_groupinfo: i32;
export declare const var_iuser1: i32;
export declare const var_iuser2: i32;
export declare const var_iuser3: i32;
export declare const var_iuser4: i32;
export declare const var_fuser1: i32;
export declare const var_fuser2: i32;
export declare const var_fuser3: i32;
export declare const var_fuser4: i32;
export declare const var_vuser1: i32;
export declare const var_vuser2: i32;
export declare const var_vuser3: i32;
export declare const var_vuser4: i32;
export declare const var_euser1: i32;
export declare const var_euser2: i32;
export declare const var_euser3: i32;
export declare const var_euser4: i32;
export declare const ucmd_lerp_msec: i32;
export declare const ucmd_msec: i32;
export declare const ucmd_viewangles: i32;
export declare const ucmd_forwardmove: i32;
export declare const ucmd_sidemove: i32;
export declare const ucmd_upmove: i32;
export declare const ucmd_lightlevel: i32;
export declare const ucmd_buttons: i32;
export declare const ucmd_impulse: i32;
export declare const ucmd_weaponselect: i32;
export declare const ucmd_impact_index: i32;
export declare const ucmd_impact_position: i32;
export declare const NA_NULL: i32;
export declare const NA_LOOPBACK: i32;
export declare const NA_BROADCAST: i32;
export declare const NA_IP: i32;
export declare const NA_IPX: i32;
export declare const NA_BROADCAST_IPX: i32;
export declare const netadr_type: i32;
export declare const netadr_ip: i32;
export declare const netadr_port: i32;
export declare const NS_CLIENT: i32;
export declare const NS_SERVER: i32;
export declare const NS_MULTICAST: i32;
export declare const net_sock: i32;
export declare const net_remote_address: i32;
export declare const net_player_slot: i32;
export declare const net_last_received: i32;
export declare const net_connect_time: i32;
export declare const net_rate: i32;
export declare const net_cleartime: i32;
export declare const net_incoming_sequence: i32;
export declare const net_incoming_acknowledged: i32;
export declare const net_incoming_reliable_acknowledged: i32;
export declare const net_incoming_reliable_sequence: i32;
export declare const net_outgoing_sequence: i32;
export declare const net_reliable_sequence: i32;
export declare const net_last_reliable_sequence: i32;
export declare const ArgByte: i32;
export declare const ArgChar: i32;
export declare const ArgShort: i32;
export declare const ArgLong: i32;
export declare const ArgAngle: i32;
export declare const ArgCoord: i32;
export declare const ArgString: i32;
export declare const ArgEntity: i32;
export declare const MsgAny: i32;
export declare const MsgDest: i32;
export declare const MsgMsgId: i32;
export declare const MsgOrigin: i32;
export declare const MsgTargetId: i32;
export declare const MsgArg: i32;
export declare const MSG_BLOCK_NOT: i32;
export declare const MSG_BLOCK_ONCE: i32;
export declare const MSG_BLOCK_SET: i32;
export declare const US_Signal: i32;
export declare const US_State: i32;
export declare const AS_SET: i32;
export declare const AS_ADD: i32;
export declare const WI_ID: i32;
export declare const WI_COST: i32;
export declare const WI_CLIP_COST: i32;
export declare const WI_BUY_CLIP_SIZE: i32;
export declare const WI_GUN_CLIP_SIZE: i32;
export declare const WI_MAX_ROUNDS: i32;
export declare const WI_AMMO_TYPE: i32;
export declare const WI_AMMO_NAME: i32;
export declare const WI_NAME: i32;
export declare const WI_SLOT: i32;
export declare const ItemInfo_iSlot: i32;
export declare const ItemInfo_iPosition: i32;
export declare const ItemInfo_pszAmmo1: i32;
export declare const ItemInfo_iMaxAmmo1: i32;
export declare const ItemInfo_pszAmmo2: i32;
export declare const ItemInfo_iMaxAmmo2: i32;
export declare const ItemInfo_pszName: i32;
export declare const ItemInfo_iMaxClip: i32;
export declare const ItemInfo_iId: i32;
export declare const ItemInfo_iFlags: i32;
export declare const ItemInfo_iWeight: i32;
export declare const GT_APPEND: i32;
export declare const GT_REPLACE: i32;
export declare const GT_DROP_AND_REPLACE: i32;
export declare const MenuChoose_T: i32;
export declare const MenuChoose_CT: i32;
export declare const MenuChoose_VIP: i32;
export declare const MenuChoose_AutoSelect: i32;
export declare const MenuChoose_Spec: i32;
export declare const VGUI_Menu_Team: i32;
export declare const VGUI_Menu_MapBriefing: i32;
export declare const VGUI_Menu_Class_T: i32;
export declare const VGUI_Menu_Class_CT: i32;
export declare const VGUI_Menu_Buy: i32;
export declare const VGUI_Menu_Buy_Pistol: i32;
export declare const VGUI_Menu_Buy_ShotGun: i32;
export declare const VGUI_Menu_Buy_Rifle: i32;
export declare const VGUI_Menu_Buy_SubMachineGun: i32;
export declare const VGUI_Menu_Buy_MachineGun: i32;
export declare const VGUI_Menu_Buy_Item: i32;
export declare const RG_GetForceCamera: i32;
export declare const RG_PlayerBlind: i32;
export declare const RG_RadiusFlash_TraceLine: i32;
export declare const RG_RoundEnd: i32;
export declare const RG_PM_Move: i32;
export declare const RG_PM_AirMove: i32;
export declare const RG_HandleMenu_ChooseAppearance: i32;
export declare const RG_HandleMenu_ChooseTeam: i32;
export declare const RG_ShowMenu: i32;
export declare const RG_ShowVGUIMenu: i32;
export declare const RG_BuyGunAmmo: i32;
export declare const RG_BuyWeaponByWeaponID: i32;
export declare const RG_ThrowHeGrenade: i32;
export declare const RG_ThrowFlashbang: i32;
export declare const RG_ThrowSmokeGrenade: i32;
export declare const RG_PlantBomb: i32;
export declare const RG_IsPenetrableEntity: i32;
export declare const RG_SpawnHeadGib: i32;
export declare const RG_SpawnRandomGibs: i32;
export declare const RG_CreateWeaponBox: i32;
export declare const RG_PM_LadderMove: i32;
export declare const RG_PM_WaterJump: i32;
export declare const RG_PM_CheckWaterJump: i32;
export declare const RG_PM_Jump: i32;
export declare const RG_PM_Duck: i32;
export declare const RG_PM_UnDuck: i32;
export declare const RG_PM_PlayStepSound: i32;
export declare const RG_PM_AirAccelerate: i32;
export declare const RG_ClearMultiDamage: i32;
export declare const RG_AddMultiDamage: i32;
export declare const RG_ApplyMultiDamage: i32;
export declare const RG_BuyItem: i32;
export declare const RG_CBaseAnimating_ResetSequenceInfo: i32;
export declare const RG_CGrenade_DefuseBombStart: i32;
export declare const RG_CGrenade_DefuseBombEnd: i32;
export declare const RG_CGrenade_ExplodeHeGrenade: i32;
export declare const RG_CGrenade_ExplodeFlashbang: i32;
export declare const RG_CGrenade_ExplodeSmokeGrenade: i32;
export declare const RG_CGrenade_ExplodeBomb: i32;
export declare const RG_CWeaponBox_SetModel: i32;
export declare const RG_CBasePlayer_Spawn: i32;
export declare const RG_CBasePlayer_Precache: i32;
export declare const RG_CBasePlayer_ObjectCaps: i32;
export declare const RG_CBasePlayer_Classify: i32;
export declare const RG_CBasePlayer_TraceAttack: i32;
export declare const RG_CBasePlayer_TakeDamage: i32;
export declare const RG_CBasePlayer_TakeHealth: i32;
export declare const RG_CBasePlayer_Killed: i32;
export declare const RG_CBasePlayer_AddPoints: i32;
export declare const RG_CBasePlayer_AddPointsToTeam: i32;
export declare const RG_CBasePlayer_AddPlayerItem: i32;
export declare const RG_CBasePlayer_RemovePlayerItem: i32;
export declare const RG_CBasePlayer_GiveAmmo: i32;
export declare const RG_CBasePlayer_ResetMaxSpeed: i32;
export declare const RG_CBasePlayer_Jump: i32;
export declare const RG_CBasePlayer_Duck: i32;
export declare const RG_CBasePlayer_PreThink: i32;
export declare const RG_CBasePlayer_PostThink: i32;
export declare const RG_CBasePlayer_UpdateClientData: i32;
export declare const RG_CBasePlayer_ImpulseCommands: i32;
export declare const RG_CBasePlayer_RoundRespawn: i32;
export declare const RG_CBasePlayer_Blind: i32;
export declare const RG_CBasePlayer_SetClientUserInfoModel: i32;
export declare const RG_CBasePlayer_SetClientUserInfoName: i32;
export declare const RG_CBasePlayer_Observer_IsValidTarget: i32;
export declare const RG_CBasePlayer_SetAnimation: i32;
export declare const RG_CBasePlayer_GiveDefaultItems: i32;
export declare const RG_CBasePlayer_GiveNamedItem: i32;
export declare const RG_CBasePlayer_AddAccount: i32;
export declare const RG_CBasePlayer_GiveShield: i32;
export declare const RG_CBasePlayer_DropPlayerItem: i32;
export declare const RG_CBasePlayer_HasRestrictItem: i32;
export declare const RG_CBasePlayer_DropShield: i32;
export declare const RG_CBasePlayer_OnSpawnEquip: i32;
export declare const RG_CBasePlayer_Radio: i32;
export declare const RG_CBasePlayer_Disappear: i32;
export declare const RG_CBasePlayer_MakeVIP: i32;
export declare const RG_CBasePlayer_MakeBomber: i32;
export declare const RG_CBasePlayer_StartObserver: i32;
export declare const RG_CBasePlayer_GetIntoGame: i32;
export declare const RG_CBasePlayer_StartDeathCam: i32;
export declare const RG_CBasePlayer_SwitchTeam: i32;
export declare const RG_CBasePlayer_CanSwitchTeam: i32;
export declare const RG_CBasePlayer_ThrowGrenade: i32;
export declare const RG_CBasePlayer_SetSpawnProtection: i32;
export declare const RG_CBasePlayer_RemoveSpawnProtection: i32;
export declare const RG_CBasePlayer_HintMessageEx: i32;
export declare const RG_CBasePlayer_UseEmpty: i32;
export declare const RG_CBasePlayer_DropIdlePlayer: i32;
export declare const RG_CBasePlayer_Observer_SetMode: i32;
export declare const RG_CBasePlayer_Observer_FindNextPlayer: i32;
export declare const RG_CBasePlayer_Pain: i32;
export declare const RG_CBasePlayer_DeathSound: i32;
export declare const RG_CBasePlayer_JoiningThink: i32;
export declare const RG_CBasePlayer_CheckTimeBasedDamage: i32;
export declare const RG_CBasePlayer_EntSelectSpawnPoint: i32;
export declare const RG_CBasePlayer_PlayerDeathThink: i32;
export declare const RG_CBasePlayer_Observer_Think: i32;
export declare const RG_CBasePlayer_RemoveAllItems: i32;
export declare const RG_CBasePlayerWeapon_CanDeploy: i32;
export declare const RG_CBasePlayerWeapon_DefaultDeploy: i32;
export declare const RG_CBasePlayerWeapon_DefaultReload: i32;
export declare const RG_CBasePlayerWeapon_DefaultShotgunReload: i32;
export declare const RG_CBasePlayerWeapon_ItemPostFrame: i32;
export declare const RG_CBasePlayerWeapon_KickBack: i32;
export declare const RG_CBasePlayerWeapon_SendWeaponAnim: i32;
export declare const RG_CGib_Spawn: i32;
export declare const RG_CGib_BounceGibTouch: i32;
export declare const RG_CGib_WaitTillLand: i32;
export declare const RG_CBaseEntity_FireBullets: i32;
export declare const RG_CBaseEntity_FireBuckshots: i32;
export declare const RG_CBaseEntity_FireBullets3: i32;
export declare const RG_CBotManager_OnEvent: i32;
export declare const RG_CSGameRules_FShouldSwitchWeapon: i32;
export declare const RG_CSGameRules_GetNextBestWeapon: i32;
export declare const RG_CSGameRules_FlPlayerFallDamage: i32;
export declare const RG_CSGameRules_FPlayerCanTakeDamage: i32;
export declare const RG_CSGameRules_PlayerSpawn: i32;
export declare const RG_CSGameRules_FPlayerCanRespawn: i32;
export declare const RG_CSGameRules_GetPlayerSpawnSpot: i32;
export declare const RG_CSGameRules_ClientUserInfoChanged: i32;
export declare const RG_CSGameRules_PlayerKilled: i32;
export declare const RG_CSGameRules_DeathNotice: i32;
export declare const RG_CSGameRules_CanHavePlayerItem: i32;
export declare const RG_CSGameRules_DeadPlayerWeapons: i32;
export declare const RG_CSGameRules_ServerDeactivate: i32;
export declare const RG_CSGameRules_CheckMapConditions: i32;
export declare const RG_CSGameRules_CleanUpMap: i32;
export declare const RG_CSGameRules_RestartRound: i32;
export declare const RG_CSGameRules_CheckWinConditions: i32;
export declare const RG_CSGameRules_RemoveGuns: i32;
export declare const RG_CSGameRules_GiveC4: i32;
export declare const RG_CSGameRules_ChangeLevel: i32;
export declare const RG_CSGameRules_GoToIntermission: i32;
export declare const RG_CSGameRules_BalanceTeams: i32;
export declare const RG_CSGameRules_OnRoundFreezeEnd: i32;
export declare const RG_CSGameRules_CanPlayerHearPlayer: i32;
export declare const RG_CSGameRules_Think: i32;
export declare const RG_CSGameRules_TeamFull: i32;
export declare const RG_CSGameRules_TeamStacked: i32;
export declare const RG_CSGameRules_PlayerGotWeapon: i32;
export declare const RG_CSGameRules_SendDeathMessage: i32;
export declare const m_bFreezePeriod: i32;
export declare const m_bBombDropped: i32;
export declare const m_GameDesc: i32;
export declare const m_msgPlayerVoiceMask: i32;
export declare const m_msgRequestState: i32;
export declare const m_nMaxPlayers: i32;
export declare const m_UpdateInterval: i32;
export declare const m_flRestartRoundTime: i32;
export declare const m_flCheckWinConditions: i32;
export declare const m_fRoundStartTime: i32;
export declare const m_iRoundTime: i32;
export declare const m_iRoundTimeSecs: i32;
export declare const m_iIntroRoundTime: i32;
export declare const m_fRoundStartTimeReal: i32;
export declare const m_iAccountTerrorist: i32;
export declare const m_iAccountCT: i32;
export declare const m_iNumTerrorist: i32;
export declare const m_iNumCT: i32;
export declare const m_iNumSpawnableTerrorist: i32;
export declare const m_iNumSpawnableCT: i32;
export declare const m_iSpawnPointCount_Terrorist: i32;
export declare const m_iSpawnPointCount_CT: i32;
export declare const m_iHostagesRescued: i32;
export declare const m_iHostagesTouched: i32;
export declare const m_iRoundWinStatus: i32;
export declare const m_iNumCTWins: i32;
export declare const m_iNumTerroristWins: i32;
export declare const m_bTargetBombed: i32;
export declare const m_bBombDefused: i32;
export declare const m_bMapHasBombTarget: i32;
export declare const m_bMapHasBombZone: i32;
export declare const m_bMapHasBuyZone: i32;
export declare const m_bMapHasRescueZone: i32;
export declare const m_bMapHasEscapeZone: i32;
export declare const m_bMapHasVIPSafetyZone: i32;
export declare const m_bMapHasCameras: i32;
export declare const m_iC4Timer: i32;
export declare const m_iC4Guy: i32;
export declare const m_iLoserBonus: i32;
export declare const m_iNumConsecutiveCTLoses: i32;
export declare const m_iNumConsecutiveTerroristLoses: i32;
export declare const m_fMaxIdlePeriod: i32;
export declare const m_iLimitTeams: i32;
export declare const m_bLevelInitialized: i32;
export declare const m_bRoundTerminating: i32;
export declare const m_bCompleteReset: i32;
export declare const m_flRequiredEscapeRatio: i32;
export declare const m_iNumEscapers: i32;
export declare const m_iHaveEscaped: i32;
export declare const m_bCTCantBuy: i32;
export declare const m_bTCantBuy: i32;
export declare const m_flBombRadius: i32;
export declare const m_iConsecutiveVIP: i32;
export declare const m_iTotalGunCount: i32;
export declare const m_iTotalGrenadeCount: i32;
export declare const m_iTotalArmourCount: i32;
export declare const m_iUnBalancedRounds: i32;
export declare const m_iNumEscapeRounds: i32;
export declare const m_iMapVotes: i32;
export declare const m_iLastPick: i32;
export declare const m_iMaxMapTime: i32;
export declare const m_iMaxRounds: i32;
export declare const m_iTotalRoundsPlayed: i32;
export declare const m_iMaxRoundsWon: i32;
export declare const m_iStoredSpectValue: i32;
export declare const m_flForceCameraValue: i32;
export declare const m_flForceChaseCamValue: i32;
export declare const m_flFadeToBlackValue: i32;
export declare const m_pVIP: i32;
export declare const m_pVIPQueue: i32;
export declare const m_flIntermissionEndTime: i32;
export declare const m_flIntermissionStartTime: i32;
export declare const m_iEndIntermissionButtonHit: i32;
export declare const m_tmNextPeriodicThink: i32;
export declare const m_bGameStarted: i32;
export declare const m_bInCareerGame: i32;
export declare const m_fCareerRoundMenuTime: i32;
export declare const m_iCareerMatchWins: i32;
export declare const m_iRoundWinDifference: i32;
export declare const m_fCareerMatchMenuTime: i32;
export declare const m_bSkipSpawn: i32;
export declare const m_bSkipShowMenu: i32;
export declare const m_bNeededPlayers: i32;
export declare const m_flEscapeRatio: i32;
export declare const m_flTimeLimit: i32;
export declare const m_flGameStartTime: i32;
export declare const m_bTeamBalanced: i32;
export declare const currentammo: i32;
export declare const maxammo_buckshot: i32;
export declare const ammo_buckshot: i32;
export declare const maxammo_9mm: i32;
export declare const ammo_9mm: i32;
export declare const maxammo_556nato: i32;
export declare const ammo_556nato: i32;
export declare const maxammo_556natobox: i32;
export declare const ammo_556natobox: i32;
export declare const maxammo_762nato: i32;
export declare const ammo_762nato: i32;
export declare const maxammo_45acp: i32;
export declare const ammo_45acp: i32;
export declare const maxammo_50ae: i32;
export declare const ammo_50ae: i32;
export declare const maxammo_338mag: i32;
export declare const ammo_338mag: i32;
export declare const maxammo_57mm: i32;
export declare const ammo_57mm: i32;
export declare const maxammo_357sig: i32;
export declare const ammo_357sig: i32;
export declare const m_flStartThrow: i32;
export declare const m_flReleaseThrow: i32;
export declare const m_iSwing: i32;
export declare const has_disconnected: i32;
export declare const m_flFrameRate: i32;
export declare const m_flGroundSpeed: i32;
export declare const m_flLastEventCheck: i32;
export declare const m_fSequenceFinished: i32;
export declare const m_fSequenceLoops: i32;
export declare const m_Activity: i32;
export declare const m_IdealActivity: i32;
export declare const m_LastHitGroup: i32;
export declare const m_bitsDamageType: i32;
export declare const m_rgbTimeBasedDamage: i32;
export declare const m_MonsterState: i32;
export declare const m_IdealMonsterState: i32;
export declare const m_afConditions: i32;
export declare const m_afMemory: i32;
export declare const m_flNextAttack: i32;
export declare const m_hEnemy: i32;
export declare const m_hTargetEnt: i32;
export declare const m_flFieldOfView: i32;
export declare const m_bloodColor: i32;
export declare const m_HackedGunPos: i32;
export declare const m_vecEnemyLKP: i32;
export declare const random_seed: i32;
export declare const m_usPlayerBleed: i32;
export declare const m_hObserverTarget: i32;
export declare const m_flNextObserverInput: i32;
export declare const m_iObserverWeapon: i32;
export declare const m_iObserverC4State: i32;
export declare const m_bObserverHasDefuser: i32;
export declare const m_iObserverLastMode: i32;
export declare const m_flFlinchTime: i32;
export declare const m_flAnimTime: i32;
export declare const m_bHighDamage: i32;
export declare const m_flVelocityModifier: i32;
export declare const m_iLastZoom: i32;
export declare const m_bResumeZoom: i32;
export declare const m_flEjectBrass: i32;
export declare const m_iKevlar: i32;
export declare const m_bNotKilled: i32;
export declare const m_iTeam: i32;
export declare const m_iAccount: i32;
export declare const m_bHasPrimary: i32;
export declare const m_flDeathThrowTime: i32;
export declare const m_iThrowDirection: i32;
export declare const m_flLastTalk: i32;
export declare const m_bJustConnected: i32;
export declare const m_bContextHelp: i32;
export declare const m_iJoiningState: i32;
export declare const m_pIntroCamera: i32;
export declare const m_fIntroCamTime: i32;
export declare const m_fLastMovement: i32;
export declare const m_bMissionBriefing: i32;
export declare const m_bTeamChanged: i32;
export declare const m_iModelName: i32;
export declare const m_iTeamKills: i32;
export declare const m_iIgnoreGlobalChat: i32;
export declare const m_bHasNightVision: i32;
export declare const m_bNightVisionOn: i32;
export declare const m_vRecentPath: i32;
export declare const m_flIdleCheckTime: i32;
export declare const m_flRadioTime: i32;
export declare const m_iRadioMessages: i32;
export declare const m_bIgnoreRadio: i32;
export declare const m_bHasC4: i32;
export declare const m_bHasDefuser: i32;
export declare const m_bKilledByBomb: i32;
export declare const m_vBlastVector: i32;
export declare const m_bKilledByGrenade: i32;
export declare const m_flDisplayHistory: i32;
export declare const m_iMenu: i32;
export declare const m_iChaseTarget: i32;
export declare const m_pChaseTarget: i32;
export declare const m_fCamSwitch: i32;
export declare const m_bEscaped: i32;
export declare const m_bIsVIP: i32;
export declare const m_tmNextRadarUpdate: i32;
export declare const m_vLastOrigin: i32;
export declare const m_iCurrentKickVote: i32;
export declare const m_flNextVoteTime: i32;
export declare const m_bJustKilledTeammate: i32;
export declare const m_iHostagesKilled: i32;
export declare const m_iMapVote: i32;
export declare const m_bCanShoot: i32;
export declare const m_flLastFired: i32;
export declare const m_flLastAttackedTeammate: i32;
export declare const m_bHeadshotKilled: i32;
export declare const m_bPunishedForTK: i32;
export declare const m_bReceivesNoMoneyNextRound: i32;
export declare const m_iTimeCheckAllowed: i32;
export declare const m_bHasChangedName: i32;
export declare const m_szNewName: i32;
export declare const m_bIsDefusing: i32;
export declare const m_tmHandleSignals: i32;
export declare const m_signals: i32;
export declare const m_pentCurBombTarget: i32;
export declare const m_iPlayerSound: i32;
export declare const m_iTargetVolume: i32;
export declare const m_iWeaponVolume: i32;
export declare const m_iExtraSoundTypes: i32;
export declare const m_iWeaponFlash: i32;
export declare const m_flStopExtraSoundTime: i32;
export declare const m_flFlashLightTime: i32;
export declare const m_iFlashBattery: i32;
export declare const m_afButtonLast: i32;
export declare const m_afButtonPressed: i32;
export declare const m_afButtonReleased: i32;
export declare const m_pentSndLast: i32;
export declare const m_flSndRoomtype: i32;
export declare const m_flSndRange: i32;
export declare const m_flFallVelocity: i32;
export declare const m_rgItems: i32;
export declare const m_fNewAmmo: i32;
export declare const m_afPhysicsFlags: i32;
export declare const m_fNextSuicideTime: i32;
export declare const m_flTimeStepSound: i32;
export declare const m_flTimeWeaponIdle: i32;
export declare const m_flSwimTime: i32;
export declare const m_flDuckTime: i32;
export declare const m_flWallJumpTime: i32;
export declare const m_flSuitUpdate: i32;
export declare const m_rgSuitPlayList: i32;
export declare const m_iSuitPlayNext: i32;
export declare const m_rgiSuitNoRepeat: i32;
export declare const m_rgflSuitNoRepeatTime: i32;
export declare const m_lastDamageAmount: i32;
export declare const m_tbdPrev: i32;
export declare const m_flgeigerRange: i32;
export declare const m_flgeigerDelay: i32;
export declare const m_igeigerRangePrev: i32;
export declare const m_iStepLeft: i32;
export declare const m_szTextureName: i32;
export declare const m_chTextureType: i32;
export declare const m_idrowndmg: i32;
export declare const m_idrownrestored: i32;
export declare const m_bitsHUDDamage: i32;
export declare const m_fInitHUD: i32;
export declare const m_fGameHUDInitialized: i32;
export declare const m_iTrain: i32;
export declare const m_fWeapon: i32;
export declare const m_pTank: i32;
export declare const m_fDeadTime: i32;
export declare const m_fNoPlayerSound: i32;
export declare const m_fLongJump: i32;
export declare const m_tSneaking: i32;
export declare const m_iUpdateTime: i32;
export declare const m_iClientHealth: i32;
export declare const m_iClientBattery: i32;
export declare const m_iHideHUD: i32;
export declare const m_iClientHideHUD: i32;
export declare const m_iFOV: i32;
export declare const m_iClientFOV: i32;
export declare const m_iNumSpawns: i32;
export declare const m_pObserver: i32;
export declare const m_rgpPlayerItems: i32;
export declare const m_pActiveItem: i32;
export declare const m_pClientActiveItem: i32;
export declare const m_pLastItem: i32;
export declare const m_rgAmmo: i32;
export declare const m_rgAmmoLast: i32;
export declare const m_vecAutoAim: i32;
export declare const m_fOnTarget: i32;
export declare const m_iDeaths: i32;
export declare const m_izSBarState: i32;
export declare const m_flNextSBarUpdateTime: i32;
export declare const m_flStatusBarDisappearDelay: i32;
export declare const m_SbarString0: i32;
export declare const m_lastx: i32;
export declare const m_lasty: i32;
export declare const m_nCustomSprayFrames: i32;
export declare const m_flNextDecalTime: i32;
export declare const m_szTeamName: i32;
export declare const m_modelIndexPlayer: i32;
export declare const m_szAnimExtention: i32;
export declare const m_iGaitsequence: i32;
export declare const m_flGaitframe: i32;
export declare const m_flGaityaw: i32;
export declare const m_prevgaitorigin: i32;
export declare const m_flPitch: i32;
export declare const m_flYaw: i32;
export declare const m_flGaitMovement: i32;
export declare const m_iAutoWepSwitch: i32;
export declare const m_bVGUIMenus: i32;
export declare const m_bShowHints: i32;
export declare const m_bShieldDrawn: i32;
export declare const m_bOwnsShield: i32;
export declare const m_bWasFollowing: i32;
export declare const m_flNextFollowTime: i32;
export declare const m_flYawModifier: i32;
export declare const m_blindUntilTime: i32;
export declare const m_blindStartTime: i32;
export declare const m_blindHoldTime: i32;
export declare const m_blindFadeTime: i32;
export declare const m_blindAlpha: i32;
export declare const m_allowAutoFollowTime: i32;
export declare const m_autoBuyString: i32;
export declare const m_rebuyString: i32;
export declare const m_rebuyStruct: i32;
export declare const m_bIsInRebuy: i32;
export declare const m_flLastUpdateTime: i32;
export declare const m_lastLocation: i32;
export declare const m_progressStart: i32;
export declare const m_progressEnd: i32;
export declare const m_bObserverAutoDirector: i32;
export declare const m_canSwitchObserverModes: i32;
export declare const m_heartBeatTime: i32;
export declare const m_intenseTimestamp: i32;
export declare const m_silentTimestamp: i32;
export declare const m_musicState: i32;
export declare const m_flLastCommandTime: i32;
export declare const m_iLastAccount: i32;
export declare const m_iLastClientHealth: i32;
export declare const m_tmNextAccountHealthUpdate: i32;
export declare const m_primaryWeapon: i32;
export declare const m_primaryAmmo: i32;
export declare const m_secondaryWeapon: i32;
export declare const m_secondaryAmmo: i32;
export declare const m_heGrenade: i32;
export declare const m_flashbang: i32;
export declare const m_smokeGrenade: i32;
export declare const m_defuser: i32;
export declare const m_nightVision: i32;
export declare const m_armor: i32;
export declare const pm_player_index: i32;
export declare const pm_server: i32;
export declare const pm_multiplayer: i32;
export declare const pm_time: i32;
export declare const pm_frametime: i32;
export declare const pm_forward: i32;
export declare const pm_right: i32;
export declare const pm_up: i32;
export declare const pm_origin: i32;
export declare const pm_angles: i32;
export declare const pm_oldangles: i32;
export declare const pm_velocity: i32;
export declare const pm_movedir: i32;
export declare const pm_basevelocity: i32;
export declare const pm_view_ofs: i32;
export declare const pm_flDuckTime: i32;
export declare const pm_bInDuck: i32;
export declare const pm_flTimeStepSound: i32;
export declare const pm_iStepLeft: i32;
export declare const pm_flFallVelocity: i32;
export declare const pm_punchangle: i32;
export declare const pm_flSwimTime: i32;
export declare const pm_flNextPrimaryAttack: i32;
export declare const pm_effects: i32;
export declare const pm_flags: i32;
export declare const pm_usehull: i32;
export declare const pm_gravity: i32;
export declare const pm_friction: i32;
export declare const pm_oldbuttons: i32;
export declare const pm_waterjumptime: i32;
export declare const pm_dead: i32;
export declare const pm_deadflag: i32;
export declare const pm_spectator: i32;
export declare const pm_movetype: i32;
export declare const pm_onground: i32;
export declare const pm_waterlevel: i32;
export declare const pm_watertype: i32;
export declare const pm_oldwaterlevel: i32;
export declare const pm_sztexturename: i32;
export declare const pm_chtexturetype: i32;
export declare const pm_maxspeed: i32;
export declare const pm_clientmaxspeed: i32;
export declare const pm_iuser1: i32;
export declare const pm_iuser2: i32;
export declare const pm_iuser3: i32;
export declare const pm_iuser4: i32;
export declare const pm_fuser1: i32;
export declare const pm_fuser2: i32;
export declare const pm_fuser3: i32;
export declare const pm_fuser4: i32;
export declare const pm_vuser1: i32;
export declare const pm_vuser2: i32;
export declare const pm_vuser3: i32;
export declare const pm_vuser4: i32;
export declare const pm_numphysent: i32;
export declare const pm_cmd: i32;
export declare const pm_numtouch: i32;
export declare const pm_physinfo: i32;
export declare const pm_player_mins: i32;
export declare const pm_player_maxs: i32;
export declare const mv_gravity: i32;
export declare const mv_stopspeed: i32;
export declare const mv_maxspeed: i32;
export declare const mv_spectatormaxspeed: i32;
export declare const mv_accelerate: i32;
export declare const mv_airaccelerate: i32;
export declare const mv_wateraccelerate: i32;
export declare const mv_friction: i32;
export declare const mv_edgefriction: i32;
export declare const mv_waterfriction: i32;
export declare const mv_entgravity: i32;
export declare const mv_bounce: i32;
export declare const mv_stepsize: i32;
export declare const mv_maxvelocity: i32;
export declare const mv_zmax: i32;
export declare const mv_waveHeight: i32;
export declare const mv_footsteps: i32;
export declare const mv_skyName: i32;
export declare const mv_rollangle: i32;
export declare const mv_rollspeed: i32;
export declare const mv_skycolor_r: i32;
export declare const mv_skycolor_g: i32;
export declare const mv_skycolor_b: i32;
export declare const mv_skyvec_x: i32;
export declare const mv_skyvec_y: i32;
export declare const mv_skyvec_z: i32;
export declare const pmt_allsolid: i32;
export declare const pmt_startsolid: i32;
export declare const pmt_inopen: i32;
export declare const pmt_inwater: i32;
export declare const pmt_fraction: i32;
export declare const pmt_endpos: i32;
export declare const pmt_ent: i32;
export declare const pmt_deltavelocity: i32;
export declare const pmt_hitgroup: i32;
export declare const m_szModel: i32;
export declare const m_bForceShowMenu: i32;
export declare const m_flRespawnPending: i32;
export declare const m_flSpawnProtectionEndTime: i32;
export declare const m_vecOldvAngle: i32;
export declare const m_iWeaponInfiniteAmmo: i32;
export declare const m_iWeaponInfiniteIds: i32;
export declare const m_bCanShootOverride: i32;
export declare const m_bGameForcingRespawn: i32;
export declare const m_bAutoBunnyHopping: i32;
export declare const m_bMegaBunnyJumping: i32;
export declare const m_bPlantC4Anywhere: i32;
export declare const m_bSpawnProtectionEffects: i32;
export declare const m_flJumpHeight: i32;
export declare const m_flLongJumpHeight: i32;
export declare const m_flLongJumpForce: i32;
export declare const m_flDuckSpeedMultiplier: i32;
export declare const m_iNumKilledByUnanswered: i32;
export declare const m_bPlayerDominated: i32;
export declare const m_pPlayer: i32;
export declare const m_pNext: i32;
export declare const m_iId: i32;
export declare const m_Weapon_iPlayEmptySound: i32;
export declare const m_Weapon_fFireOnEmpty: i32;
export declare const m_Weapon_flNextPrimaryAttack: i32;
export declare const m_Weapon_flNextSecondaryAttack: i32;
export declare const m_Weapon_flTimeWeaponIdle: i32;
export declare const m_Weapon_iPrimaryAmmoType: i32;
export declare const m_Weapon_iSecondaryAmmoType: i32;
export declare const m_Weapon_iClip: i32;
export declare const m_Weapon_iClientClip: i32;
export declare const m_Weapon_iClientWeaponState: i32;
export declare const m_Weapon_fInReload: i32;
export declare const m_Weapon_fInSpecialReload: i32;
export declare const m_Weapon_iDefaultAmmo: i32;
export declare const m_Weapon_iShellId: i32;
export declare const m_Weapon_fMaxSpeed: i32;
export declare const m_Weapon_bDelayFire: i32;
export declare const m_Weapon_iDirection: i32;
export declare const m_Weapon_bSecondarySilencerOn: i32;
export declare const m_Weapon_flAccuracy: i32;
export declare const m_Weapon_flLastFire: i32;
export declare const m_Weapon_iShotsFired: i32;
export declare const m_Weapon_flGlock18Shoot: i32;
export declare const m_Weapon_iGlock18ShotsFired: i32;
export declare const m_Weapon_flFamasShoot: i32;
export declare const m_Weapon_iFamasShotsFired: i32;
export declare const m_Weapon_fBurstSpread: i32;
export declare const m_Weapon_iWeaponState: i32;
export declare const m_Weapon_flNextReload: i32;
export declare const m_Weapon_flDecreaseShotsFired: i32;
export declare const m_Weapon_usFireGlock18: i32;
export declare const m_Weapon_usFireFamas: i32;
export declare const m_Weapon_flPrevPrimaryAttack: i32;
export declare const m_Weapon_flLastFireTime: i32;
export declare const m_WeaponBox_rgpPlayerItems: i32;
export declare const m_WeaponBox_rgiszAmmo: i32;
export declare const m_WeaponBox_rgAmmo: i32;
export declare const m_WeaponBox_cAmmoTypes: i32;
export declare const m_WeaponBox_bIsBomb: i32;
export declare const m_Armoury_iItem: i32;
export declare const m_Armoury_iCount: i32;
export declare const m_Armoury_iInitialCount: i32;
export declare const m_Armoury_bAlreadyCounted: i32;
export declare const m_Grenade_bStartDefuse: i32;
export declare const m_Grenade_bIsC4: i32;
export declare const m_Grenade_pBombDefuser: i32;
export declare const m_Grenade_flDefuseCountDown: i32;
export declare const m_Grenade_flC4Blow: i32;
export declare const m_Grenade_flNextFreqInterval: i32;
export declare const m_Grenade_flNextBeep: i32;
export declare const m_Grenade_flNextFreq: i32;
export declare const m_Grenade_sBeepName: i32;
export declare const m_Grenade_fAttenu: i32;
export declare const m_Grenade_flNextBlink: i32;
export declare const m_Grenade_fNextDefuse: i32;
export declare const m_Grenade_bJustBlew: i32;
export declare const m_Grenade_iTeam: i32;
export declare const m_Grenade_iCurWave: i32;
export declare const m_Grenade_pentCurBombTarget: i32;
export declare const m_Grenade_SGSmoke: i32;
export declare const m_Grenade_angle: i32;
export declare const m_Grenade_usEvent: i32;
export declare const m_Grenade_bLightSmoke: i32;
export declare const m_Grenade_bDetonated: i32;
export declare const m_Grenade_vSmokeDetonate: i32;
export declare const m_Grenade_iBounceCount: i32;
export declare const m_Grenade_fRegisteredSound: i32;
export declare const m_P228_iShell: i32;
export declare const m_P228_usFire: i32;
export declare const m_SCOUT_iShell: i32;
export declare const m_SCOUT_usFire: i32;
export declare const m_HEGrenade_usCreate: i32;
export declare const m_XM1014_iShell: i32;
export declare const m_XM1014_flPumpTime: i32;
export declare const m_XM1014_usFire: i32;
export declare const m_C4_bStartedArming: i32;
export declare const m_C4_bBombPlacedAnimation: i32;
export declare const m_C4_fArmedTime: i32;
export declare const m_C4_bHasShield: i32;
export declare const m_MAC10_iShell: i32;
export declare const m_MAC10_iShellOn: i32;
export declare const m_MAC10_usFire: i32;
export declare const m_AUG_iShell: i32;
export declare const m_AUG_iShellOn: i32;
export declare const m_AUG_usFire: i32;
export declare const m_SmokeGrenade_usCreate: i32;
export declare const m_ELITE_iShell: i32;
export declare const m_ELITE_usFire_LEFT: i32;
export declare const m_ELITE_usFire_RIGHT: i32;
export declare const m_FiveSeven_iShell: i32;
export declare const m_FiveSeven_usFire: i32;
export declare const m_UMP45_iShell: i32;
export declare const m_UMP45_iShellOn: i32;
export declare const m_UMP45_usFire: i32;
export declare const m_SG550_iShell: i32;
export declare const m_SG550_usFire: i32;
export declare const m_Galil_iShell: i32;
export declare const m_Galil_iShellOn: i32;
export declare const m_Galil_usFire: i32;
export declare const m_Famas_iShell: i32;
export declare const m_Famas_iShellOn: i32;
export declare const m_Famas_flBaseDamageBurst: i32;
export declare const m_USP_iShell: i32;
export declare const m_USP_usFire: i32;
export declare const m_USP_flBaseDamageSil: i32;
export declare const m_GLOCK18_iShell: i32;
export declare const m_GLOCK18_bBurstFire: i32;
export declare const m_AWP_iShell: i32;
export declare const m_AWP_usFire: i32;
export declare const m_MP5N_iShell: i32;
export declare const m_MP5N_iShellOn: i32;
export declare const m_MP5N_usFire: i32;
export declare const m_M249_iShell: i32;
export declare const m_M249_iShellOn: i32;
export declare const m_M249_usFire: i32;
export declare const m_M3_iShell: i32;
export declare const m_M3_flPumpTime: i32;
export declare const m_M3_usFire: i32;
export declare const m_M4A1_iShell: i32;
export declare const m_M4A1_iShellOn: i32;
export declare const m_M4A1_usFire: i32;
export declare const m_M4A1_flBaseDamageSil: i32;
export declare const m_TMP_iShell: i32;
export declare const m_TMP_iShellOn: i32;
export declare const m_TMP_usFire: i32;
export declare const m_G3SG1_iShell: i32;
export declare const m_G3SG1_usFire: i32;
export declare const m_DEAGLE_iShell: i32;
export declare const m_DEAGLE_usFire: i32;
export declare const m_SG552_iShell: i32;
export declare const m_SG552_iShellOn: i32;
export declare const m_SG552_usFire: i32;
export declare const m_AK47_iShell: i32;
export declare const m_AK47_iShellOn: i32;
export declare const m_AK47_usFire: i32;
export declare const m_Knife_trHit: i32;
export declare const m_Knife_usKnife: i32;
export declare const m_Knife_flStabBaseDamage: i32;
export declare const m_Knife_flSwingBaseDamage: i32;
export declare const m_Knife_flSwingBaseDamage_Fast: i32;
export declare const m_Knife_flStabDistance: i32;
export declare const m_Knife_flSwingDistance: i32;
export declare const m_Knife_flBackStabMultiplier: i32;
export declare const m_P90_iShell: i32;
export declare const m_P90_iShellOn: i32;
export declare const m_P90_usFire: i32;
export declare const m_Shield_hEntToIgnoreTouchesFrom: i32;
export declare const m_Shield_flTimeToIgnoreTouches: i32;
export declare const m_MapInfo_iBuyingStatus: i32;
export declare const m_MapInfo_flBombRadius: i32;
export declare const m_Weapon_iStateSecondaryAttack: i32;
export declare const m_Weapon_flBaseDamage: i32;
export declare const m_Gib_bloodColor: i32;
export declare const m_Gib_cBloodDecals: i32;
export declare const m_Gib_material: i32;
export declare const m_Gib_lifeTime: i32;
export declare const m_ucDmgPenetrationLevel: i32;
export declare const m_pevLastInflictor: i32;
/** engfunc(EngFunc_WalkMove, entity, Float:yaw, Float:dist, iMode) iMode values */
export declare const WALKMOVE_NORMAL: i32;
export declare const WALKMOVE_WORLDONLY: i32;
export declare const WALKMOVE_CHECKONLY: i32;
/** engfunc(EngFunc_MoveToOrigin, entity, Float:goal[3], Float:distance, moveType) moveType values */
export declare const MOVE_NORMAL: i32;
export declare const MOVE_STRAFE: i32;
/** engfunc(EngFunc_PointContents, Float:origin) return values */
export declare const CONTENTS_EMPTY: i32;
export declare const CONTENTS_SOLID: i32;
export declare const CONTENTS_WATER: i32;
export declare const CONTENTS_SLIME: i32;
export declare const CONTENTS_LAVA: i32;
export declare const CONTENTS_SKY: i32;
export declare const CONTENTS_ORIGIN: i32;
export declare const CONTENTS_CLIP: i32;
export declare const CONTENTS_CURRENT_0: i32;
export declare const CONTENTS_CURRENT_90: i32;
export declare const CONTENTS_CURRENT_180: i32;
export declare const CONTENTS_CURRENT_270: i32;
export declare const CONTENTS_CURRENT_UP: i32;
export declare const CONTENTS_CURRENT_DOWN: i32;
export declare const CONTENTS_TRANSLUCENT: i32;
export declare const CONTENTS_LADDER: i32;
export declare const CONTENT_FLYFIELD: i32;
export declare const CONTENT_GRAVITY_FLYFIELD: i32;
export declare const CONTENT_FOG: i32;
export declare const GIB_TRY_HEALTH: i32;
/** Valid constants for fNoMonsters parameter of EngFunc_TraceLine, */
export declare const DONT_IGNORE_MONSTERS: i32;
export declare const IGNORE_MONSTERS: i32;
export declare const IGNORE_MISSILE: i32;
/** The hullnumber paramater of EngFunc_TraceHull, EngFunc_TraceModel and */
export declare const HULL_POINT: i32;
export declare const HULL_HUMAN: i32;
export declare const HULL_LARGE: i32;
export declare const HULL_HEAD: i32;
/** global_get(glb_trace_flags) */
export declare const FTRACE_SIMPLEBOX: i32;
/** Used with get/set_es(es_handle, ES_eFlags, ...) (entity_state data structure) */
export declare const EFLAG_SLERP: i32;
/** func_door, func_water, func_door_rotating, momementary_door */
export declare const SF_DOOR_ROTATE_Y: i32;
export declare const SF_DOOR_ROTATE_BACKWARDS: i32;
export declare const SF_DOOR_ONEWAY: i32;
export declare const SF_DOOR_ROTATE_Z: i32;
export declare const SF_DOOR_ROTATE_X: i32;
export declare const SF_DOOR_NOMONSTERS: i32;
/** func_rotating */
export declare const SF_BRUSH_ROTATE_Y_AXIS: i32;
export declare const SF_BRUSH_ROTATE_INSTANT: i32;
export declare const SF_PENDULUM_AUTO_RETURN: i32;
export declare const SF_PENDULUM_PASSABLE: i32;
export declare const SF_TRIG_PUSH_ONCE: i32;
export declare const SPAWNFLAG_NOMESSAGE: i32;
export declare const SPAWNFLAG_NOTOUCH: i32;
export declare const SPAWNFLAG_DROIDONLY: i32;
export declare const SPAWNFLAG_USEONLY: i32;
/** Monster Spawnflags */
export declare const SF_MONSTER_WAIT_TILL_SEEN: i32;
export declare const SF_MONSTER_GAG: i32;
export declare const SF_MONSTER_HITMONSTERCLIP: i32;
export declare const SF_MONSTER_PRISONER: i32;
export declare const SF_MONSTER_WAIT_FOR_SCRIPT: i32;
export declare const SF_MONSTER_PREDISASTER: i32;
export declare const SF_MONSTER_FADECORPSE: i32;
export declare const SF_MONSTER_TURRET_AUTOACTIVATE: i32;
export declare const SF_MONSTER_TURRET_STARTINACTIVE: i32;
export declare const SF_MONSTER_WAIT_UNTIL_PROVOKED: i32;
/** Valve Mod Weapon Constants */
export declare const HLI_HEALTHKIT: i32;
export declare const HLI_ANTIDOTE: i32;
export declare const HLI_SECURITY: i32;
export declare const HLI_BATTERY: i32;
export declare const HLW_NONE: i32;
export declare const HLW_CROWBAR: i32;
export declare const HLW_GLOCK: i32;
export declare const HLW_PYTHON: i32;
export declare const HLW_MP5: i32;
export declare const HLW_CHAINGUN: i32;
export declare const HLW_CROSSBOW: i32;
export declare const HLW_SHOTGUN: i32;
export declare const HLW_RPG: i32;
export declare const HLW_GAUSS: i32;
export declare const HLW_EGON: i32;
export declare const HLW_HORNETGUN: i32;
export declare const HLW_HANDGRENADE: i32;
export declare const HLW_TRIPMINE: i32;
export declare const HLW_SATCHEL: i32;
export declare const HLW_SNARK: i32;
export declare const HLW_SUIT: i32;
export declare const HLW_ALLWEAPONS: i32;
/** Entity classification */
export declare const CLASS_NONE: i32;
export declare const CLASS_MACHINE: i32;
export declare const CLASS_PLAYER: i32;
export declare const CLASS_HUMAN_PASSIVE: i32;
export declare const CLASS_HUMAN_MILITARY: i32;
export declare const CLASS_ALIEN_MILITARY: i32;
export declare const CLASS_ALIEN_PASSIVE: i32;
export declare const CLASS_ALIEN_MONSTER: i32;
export declare const CLASS_ALIEN_PREY: i32;
export declare const CLASS_ALIEN_PREDATOR: i32;
export declare const CLASS_INSECT: i32;
export declare const CLASS_PLAYER_ALLY: i32;
export declare const CLASS_PLAYER_BIOWEAPON: i32;
export declare const CLASS_ALIEN_BIOWEAPON: i32;
export declare const CLASS_VEHICLE: i32;
export declare const CLASS_BARNACLE: i32;
/** Entities that toggle (buttons/triggers/doors) need this */
export declare const TS_AT_TOP: i32;
export declare const TS_AT_BOTTOM: i32;
export declare const TS_GOING_UP: i32;
export declare const TS_GOING_DOWN: i32;
export declare const m_Weapon_bHasSecondaryAttack: i32;
export declare namespace Flag {
    const all: i32;
    const immunity: i32;
    const reservation: i32;
    const kick: i32;
    const ban: i32;
    const slay: i32;
    const map: i32;
    const cvar: i32;
    const cfg: i32;
    const chat: i32;
    const vote: i32;
    const password: i32;
    const rcon: i32;
    const levelA: i32;
    const levelB: i32;
    const levelC: i32;
    const levelD: i32;
    const levelE: i32;
    const levelF: i32;
    const levelG: i32;
    const levelH: i32;
    const menu: i32;
    const banTemp: i32;
    const admin: i32;
    const user: i32;
}
/**
 * Every name a command's flag argument accepts.
 *
 * A union of string literals, so an editor completes it and a misspelling
 * fails the build. AssemblyScript needs runtime/patches for that; the numbers
 * above are the same flags for anything that wants one.
 */
export type FlagName = "ALL" | "IMMUNITY" | "RESERVATION" | "KICK" | "BAN" | "SLAY" | "MAP" | "CVAR" | "CFG" | "CHAT" | "VOTE" | "PASSWORD" | "RCON" | "LEVEL_A" | "LEVEL_B" | "LEVEL_C" | "LEVEL_D" | "LEVEL_E" | "LEVEL_F" | "LEVEL_G" | "LEVEL_H" | "MENU" | "BAN_TEMP" | "ADMIN" | "USER";
/** The bit a flag name stands for. */
export declare function flagOf(name: string): i32;
/**
 * Every reapi hookchain, by a name an editor can complete.
 *
 * The numbers are reapi's own, computed from its includes, and they move
 * between releases - take the includes from the release your server runs.
 */
export type HookName = "activate_server" | "add_account" | "add_multi_damage" | "add_player_item" | "add_points" | "add_points_to_team" | "add_resource" | "air_accelerate" | "air_move" | "alloc" | "allow_physent" | "apply_multi_damage" | "balance_teams" | "base_player_duck" | "base_player_jump" | "base_player_spawn" | "blind" | "bounce_gib_touch" | "buy_gun_ammo" | "buy_item" | "buy_weapon_by_weapon_id" | "can_deploy" | "can_have_player_item" | "can_player_hear_player" | "can_switch_team" | "change_level" | "check_map_conditions" | "check_time_based_damage" | "check_user_info" | "check_water_jump" | "check_win_conditions" | "choose_appearance" | "choose_team" | "classify" | "clean_up_map" | "clear_multi_damage" | "client_connected" | "client_printf" | "client_user_info_changed" | "connect_client" | "create_weapon_box" | "dead_player_weapons" | "death_notice" | "death_sound" | "default_deploy" | "default_reload" | "default_shotgun_reload" | "defuse_bomb_end" | "defuse_bomb_start" | "direct_set" | "disappear" | "drop_client" | "drop_idle_player" | "drop_player_item" | "drop_shield" | "emit_pings" | "ent_select_spawn_point" | "execute_server_string_cmd" | "explode_bomb" | "explode_flashbang" | "explode_he_grenade" | "explode_smoke_grenade" | "f_player_can_respawn" | "f_player_can_take_damage" | "f_should_switch_weapon" | "fire_buckshots" | "fire_bullets" | "fire_bullets3" | "fl_player_fall_damage" | "free" | "get_entity_init" | "get_force_camera" | "get_into_game" | "get_next_best_weapon" | "get_player_spawn_spot" | "gib_spawn" | "give_ammo" | "give_c4" | "give_default_items" | "give_named_item" | "give_shield" | "go_to_intermission" | "has_restrict_item" | "hint_message_ex" | "impulse_commands" | "is_penetrable_entity" | "item_post_frame" | "joining_think" | "kick_back" | "killed" | "ladder_move" | "make_bomber" | "make_vip" | "move" | "object_caps" | "observer_find_next_player" | "observer_is_valid_target" | "observer_set_mode" | "observer_think" | "on_event" | "on_round_freeze_end" | "on_spawn_equip" | "pain" | "plant_bomb" | "play_step_sound" | "player_blind" | "player_death_think" | "player_got_weapon" | "player_killed" | "player_spawn" | "pm_duck" | "pm_jump" | "post_think" | "pre_think" | "precache" | "precache_generic_i" | "precache_model_i" | "precache_sound_i" | "printf" | "radio" | "remove_all_items" | "remove_guns" | "remove_player_item" | "remove_spawn_protection" | "reset_max_speed" | "reset_sequence_info" | "restart_round" | "round_end" | "round_respawn" | "send_death_message" | "send_resources" | "send_weapon_anim" | "server_deactivate" | "set_animation" | "set_client_user_info_model" | "set_client_user_info_name" | "set_model" | "set_spawn_protection" | "show_menu" | "show_vgui_menu" | "spawn_head_gib" | "spawn_random_gibs" | "start_death_cam" | "start_observer" | "start_sound" | "switch_team" | "take_damage" | "take_health" | "team_full" | "team_stacked" | "think" | "throw_flashbang" | "throw_grenade" | "throw_he_grenade" | "throw_smoke_grenade" | "trace_attack" | "trace_line" | "un_duck" | "update_client_data" | "use_empty" | "wait_till_land" | "water_jump" | "write_full_client_update";
export declare function hookIdOf(name: string): i32;
/** The same for Ham Sandwich. */
export type HamName = "activate" | "add_attacks" | "add_beam_box_crosshair" | "add_blind_fx" | "add_duplicate" | "add_player_item" | "add_points_add_points" | "add_points_to_team_add_points_to_team" | "add_to_player" | "add_weapon" | "alert_sound" | "area_send_status" | "area_set_index" | "attach_to_player" | "award_kill" | "barnacle_victim_bitten" | "barnacle_victim_released" | "become_dead" | "begin_revive" | "best_visible_enemy" | "blocked" | "blood_color" | "body_target" | "breakable_respawn" | "build_nearest_route" | "calc_emp_dmg_rad" | "call_gib_monster" | "can_block" | "can_deploy" | "can_holster" | "can_jump" | "can_play_sentence2_can_play_sentence2" | "can_play_sequence_can_play_sequence" | "can_primary_fire" | "can_raise_ki" | "can_raise_stamina" | "can_secondary_fire" | "can_start_fly" | "can_start_powerup" | "can_stop_fly" | "can_teleport" | "can_turbo" | "can_used_through_walls" | "can_wall_jump" | "center" | "change_yaw" | "check_ammo" | "check_and_apply_generic_attacks" | "check_attacker" | "check_creature_danger" | "check_enemy" | "check_fall_damage" | "check_lightning" | "check_local_move" | "check_melee_attack1" | "check_melee_attack1_move" | "check_melee_attack2" | "check_melee_attack2_move" | "check_range_attack1" | "check_range_attack1_move" | "check_range_attack2" | "check_range_attack2_move" | "check_revival" | "check_scared" | "check_tank_usage" | "check_wall_jump" | "classify" | "client_remove_weapon" | "concuss" | "cover_radius" | "critical_remove" | "damage_decal" | "db_get_item_name" | "death_notice" | "death_sound" | "deploy" | "disable_ps_bar" | "disable_wall_jump" | "dod_item_can_drop" | "dod_round_respawn" | "dod_weapon_send_weapon_anim" | "does_primary_attack" | "does_secondary_attack" | "draw_charge_bar" | "draw_ps_bar" | "draw_ps_win_bonus" | "drop" | "duck" | "ear_position" | "effective_player_class_changed" | "emit_class_sound" | "emit_null_sound" | "emit_sound" | "emp_explode" | "emp_remove" | "enable_objective" | "enable_wall_jump" | "end_revive" | "engineer_use" | "esf_check_time_based_damage" | "extract_ammo" | "extract_clip_ammo" | "eye_position" | "f_become_prone_f_become_prone" | "f_can_active_idle" | "f_can_check_attacks" | "f_in_bullet_cone" | "f_in_view_cone" | "f_triangulate_extension" | "f_triangulate_f_triangulate" | "f_validate_cover" | "f_validate_hint_type" | "f_vec_in_view_cone" | "f_vec_visible_f_vec_visible" | "f_visible_f_visible" | "f_visible_from_pos" | "f_visible_gun_pos" | "fade_monster" | "find_attack_point" | "find_cover" | "find_cover_distance" | "find_cover_grenade" | "finished" | "freeze_controls" | "get_adrenaline_factor" | "get_animation_for_activity" | "get_authentication_mask" | "get_can_use_weapon" | "get_classification" | "get_damage_points" | "get_death_activity" | "get_delay" | "get_effective_player_class" | "get_gun_position" | "get_hull" | "get_ideal_state" | "get_item_info" | "get_max_speed" | "get_max_walk_speed" | "get_move_forward" | "get_move_right" | "get_move_up" | "get_next_target" | "get_point_value" | "get_points_for_damage" | "get_power_level" | "get_state" | "get_state_ent" | "get_stopped_activity" | "get_teleport_dir" | "get_toggle_state" | "get_wall_jump_anim" | "get_wall_jump_anim2" | "get_weapon_ptr" | "gib_monster" | "give_ammo_give_ammo" | "give_named_item" | "give_slow_mul" | "go_slow" | "has_alien_gibs" | "has_human_gibs" | "has_target_has_target" | "hearing_sensitivity" | "hide_weapon" | "holster" | "i_flags" | "i_id" | "i_max_ammo1" | "i_max_ammo2" | "i_max_clip" | "i_position" | "i_relationship" | "i_slot" | "i_sound_mask" | "i_weight" | "idle_sound" | "ignore_conditions" | "illumination" | "impulse_commands" | "in_slow" | "increase_pl" | "increase_strength" | "init_player_from_spawn" | "is_alive_is_alive" | "is_breakable" | "is_bsp_model_is_bsp_model" | "is_buddy" | "is_env_model" | "is_facing" | "is_fighter" | "is_fly_move_type" | "is_in_world_is_in_world" | "is_locked_by_master" | "is_machine" | "is_monster" | "is_move_back" | "is_moving_is_moving" | "is_net_client_is_net_client" | "is_objective" | "is_phys_x" | "is_player_following" | "is_player_is_player" | "is_point_entity" | "is_revivable" | "is_sneaking_is_sneaking" | "is_super_jump" | "is_triggered_is_triggered" | "is_usable" | "is_valid_entity" | "is_walk_move_type" | "item_add_ammo_from_item" | "item_add_duplicate" | "item_add_to_player" | "item_can_collect" | "item_can_deploy" | "item_can_have_duplicates" | "item_can_holster" | "item_collect" | "item_deploy" | "item_detach_from_player" | "item_drop_gren" | "item_get_item_info" | "item_get_max_speed" | "item_get_pickup_sound" | "item_get_respawn_time" | "item_inactive_item_post_frame" | "item_inactive_item_pre_frame" | "item_is_weapon" | "item_materialize" | "item_set_dmg_time" | "item_slot" | "item_spawn_deploy" | "item_update_client_data" | "jump" | "keyvalue" | "kill" | "killed_killed" | "lock_crosshair" | "look" | "medic_call_sound" | "monster_init" | "monster_init_dead" | "monster_think" | "move" | "move_execute" | "my_custom_pointer" | "my_item_pointer" | "my_monster_pointer" | "my_squad_monster_pointer" | "my_squad_talk_monster_pointer" | "needs_team_update" | "no_friendly_fire1" | "no_friendly_fire2" | "no_friendly_fire3" | "no_friendly_fire_to_pos" | "ns_update_on_remove" | "object_caps" | "on_controls_on_controls" | "on_create" | "on_destroy" | "on_free_ent_private_data" | "on_key_value_update" | "on_set_origin_by_map" | "override_reset" | "pack_dead_player_items" | "pain_sound" | "play_animation" | "play_empty_sound" | "play_scripted_sentence_play_scripted_sentence" | "play_sentence" | "player_blind" | "player_can_start_next_vote" | "player_can_touch_player" | "player_disable_collision_with_player" | "player_enable_collision_with_player" | "player_entered_observer" | "player_get_autoaim_vector" | "player_get_log_frequency" | "player_has_voted" | "player_init_vote" | "player_is_bot" | "player_is_connected" | "player_is_menu_input_done" | "player_is_observer" | "player_is_valid_info_entity" | "player_last_vote_input" | "player_left_observer" | "player_level_end" | "player_log_player_stats" | "player_menu_input_performed" | "player_on_touching_weapon" | "player_reset_max_speed" | "player_reset_view" | "player_reset_vote" | "player_should_fade_on_death" | "player_special_spawn" | "player_time_to_start_next_vote" | "player_update_client_data" | "player_vote" | "player_vote_started" | "post_frame" | "post_spawn" | "post_think" | "pre_frame" | "pre_spawn" | "pre_think" | "precache" | "preschedule_think" | "primary_ammo_index" | "primary_attack" | "psz_ammo1" | "psz_ammo2" | "psz_name" | "radius_damage" | "radius_damage2" | "reflect_gauss_reflect_gauss" | "reload" | "remove_all_other_weapons" | "remove_beam_box_crosshair" | "remove_blind_fx" | "remove_player_item_remove_player_item" | "remove_special_modes" | "report_ai_state" | "reset_empty_sound" | "reset_entity" | "reset_wall_jump_vars" | "respawn" | "respawn_wait" | "restart" | "retire_weapon" | "revive" | "revive_think" | "ride_monster" | "rotate_crosshair" | "round_respawn_ent" | "round_store" | "run_ai" | "s_item_can_drop" | "s_round_respawn" | "s_weapon_send_weapon_anim" | "save_data_for_reset" | "sc_add_points" | "sc_add_points_to_team" | "sc_can_play_sentence2" | "sc_can_play_sequence" | "sc_check_time_based_damage" | "sc_f_become_prone" | "sc_f_triangulate" | "sc_f_vec_visible" | "sc_f_visible" | "sc_give_ammo" | "sc_has_target" | "sc_is_alive" | "sc_is_bsp_model" | "sc_is_in_world" | "sc_is_moving" | "sc_is_net_client" | "sc_is_player" | "sc_is_sneaking" | "sc_is_triggered" | "sc_on_controls" | "sc_play_scripted_sentence" | "sc_reflect_gauss" | "sc_remove_player_item" | "sc_should_fade_on_death" | "sc_take_health" | "sc_update_on_remove" | "schedule_change" | "secondary_ammo_index" | "secondary_attack" | "send_clients_custom_model" | "send_team_update" | "send_weapon_anim" | "send_weapon_update" | "sentence_stop" | "set_activity" | "set_animation" | "set_bone_controller" | "set_classification" | "set_death_animation" | "set_fly_move_type" | "set_gait_activity" | "set_max_power_level" | "set_model" | "set_object_collision_box" | "set_player_ally" | "set_power_level" | "set_script_reset" | "set_team_id" | "set_toggle_state" | "set_walk_move_type" | "set_wall_jump_animation" | "set_yaw_speed" | "setup_friendly" | "should_advance_route" | "should_collide" | "should_weapon_idle" | "spawn" | "start_block" | "start_fly" | "start_monster" | "start_observer" | "start_player_following" | "start_sneaking" | "stop" | "stop_ani_trigger" | "stop_block" | "stop_fly" | "stop_following" | "stop_observer" | "stop_player_following" | "stop_sneaking" | "stop_swoop" | "stop_turbo" | "sub_use_targets" | "suicide" | "take_armor" | "take_bean" | "take_concussion_blast" | "take_damage" | "take_damage2" | "take_emp_blast" | "take_health_take_health" | "team_id" | "tfc_is_triggered" | "tfc_killed" | "tfc_weapon_send_weapon_anim" | "think" | "touch" | "trace_attack" | "trace_bleed" | "un_freeze_controls" | "un_lock_crosshair" | "un_rotate_crosshair" | "un_use_sound" | "update_health" | "update_item_info" | "update_ki" | "update_owner" | "use" | "use_decrement" | "use_sound" | "water_move" | "weapon_add_weapon" | "weapon_aim" | "weapon_alternate_attack" | "weapon_bullet_accuracy" | "weapon_burst_supplement" | "weapon_change_fov" | "weapon_change_weapon_skin" | "weapon_custom_decrement" | "weapon_default_deploy" | "weapon_default_reload" | "weapon_extract_ammo_from_item" | "weapon_f_can_run" | "weapon_f_runfuncs" | "weapon_finish_reload" | "weapon_fl_aim" | "weapon_get_ammo1_drop" | "weapon_get_ammo2_drop" | "weapon_get_deploy_time" | "weapon_get_fov" | "weapon_get_is_weapon_primed" | "weapon_get_is_weapon_priming" | "weapon_get_next_attack_delay" | "weapon_get_p_model" | "weapon_get_v_model" | "weapon_get_w_model" | "weapon_get_weapon_prime_time" | "weapon_holster_when_meleed" | "weapon_idle" | "weapon_is_multiplayer" | "weapon_is_usable" | "weapon_is_useable" | "weapon_play_empty_sound" | "weapon_player_is_water_sniping" | "weapon_precache_custom_models" | "weapon_prime_weapon" | "weapon_remove_stamina" | "weapon_set_fov" | "weapon_set_p_model" | "weapon_set_v_model" | "weapon_should_reload" | "weapon_should_weapon_idle" | "weapon_special" | "weapon_tertiary_attack" | "weapon_time_base" | "weapon_update_zoom_speed" | "weapon_use_decrement" | "weapon_zoom_in" | "weapon_zoom_out";
export declare function hamIdOf(name: string): i32;
