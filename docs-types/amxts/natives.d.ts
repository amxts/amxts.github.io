/// <reference path="../as-types.d.ts" />
/** add(anydest[], anylen, const anysrc[], anymax) */
export declare function add(src: string, max?: number): string;
/** AddTranslation(const anylang[], TransKeykey, const anyphrase[]) */
export declare function AddTranslation(lang: number[], key: number, phrase: string): number;
/** admins_flush() */
export declare function admins_flush(): number;
/** admins_lookup(anynum, AdminPropProperty, anyBuffer[], anyBufferSize) */
export declare function admins_lookup(num: number, Property: number, Buffer?: string, BufferSize?: number): number;
/** admins_num() */
export declare function admins_num(): number;
/** admins_push(const anyAuthData[], const anyPassword[], anyAccess, anyFlags) */
export declare function admins_push(AuthData: string, Password: string, Access: number, Flags: number): number;
/** amxclient_cmd(anyindex, const anycommand[], const anyarg1[], const anyarg2[]) */
export declare function amxclient_cmd(index: number, command: string, arg1?: string, arg2?: string): number;
/** angle_vector(const Floatvector[], anyFRU, Floatret[]) */
export declare function angle_vector(vector: number[], FRU: number, ret: number[]): number;
/** argparse(const anytext[], anypos, anyargbuffer[], anymaxlen) */
export declare function argparse(text: string, pos: number): string;
/** ArrayClear(Arraywhich) */
export declare function ArrayClear(which: number): number;
/** ArrayClone(Arraywhich) */
export declare function ArrayClone(which: number): number;
/** ArrayCreate(anycellsize, anyreserved) */
export declare function ArrayCreate(cellsize?: number, reserved?: number): number;
/** ArrayDeleteItem(Arraywhich, anyitem) */
export declare function ArrayDeleteItem(which: number, item: number): number;
/** ArrayDestroy(Arraywhich) */
export declare function ArrayDestroy(which: number): number;
/** ArrayFindString(Arraywhich, const anyitem[]) */
export declare function ArrayFindString(which: number, item: string): number;
/** ArrayFindValue(Arraywhich, anyitem) */
export declare function ArrayFindValue(which: number, item: number): number;
/** which, item, output: pointer, size */
export declare function ArrayGetArray(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ArrayGetCell(Arraywhich, anyitem, anyblock, boolasChar) */
export declare function ArrayGetCell(which: number, item: number, block?: number, asChar?: boolean): number;
/** ArrayGetString(Arraywhich, anyitem, anyoutput[], anysize) */
export declare function ArrayGetString(which: number, item: number): string;
/** ArrayGetStringHandle(Arraywhich, anyitem) */
export declare function ArrayGetStringHandle(which: number, item: number): number;
/** ArrayInsertArrayAfter(Arraywhich, anyitem, const anyinput[]) */
export declare function ArrayInsertArrayAfter(which: number, item: number, input: string): number;
/** ArrayInsertArrayBefore(Arraywhich, anyitem, const anyinput[]) */
export declare function ArrayInsertArrayBefore(which: number, item: number, input: string): number;
/** ArrayInsertCellAfter(Arraywhich, anyitem, anyinput) */
export declare function ArrayInsertCellAfter(which: number, item: number, input: number): number;
/** ArrayInsertCellBefore(Arraywhich, anyitem, const anyinput) */
export declare function ArrayInsertCellBefore(which: number, item: number, input: number): number;
/** ArrayInsertStringAfter(Arraywhich, anyitem, const anyinput[]) */
export declare function ArrayInsertStringAfter(which: number, item: number, input: string): number;
/** ArrayInsertStringBefore(Arraywhich, anyitem, const anyinput[]) */
export declare function ArrayInsertStringBefore(which: number, item: number, input: string): number;
/** which, input: pointer, size */
export declare function ArrayPushArray(a0: i32, a1: i32, a2: i32): i32;
/** ArrayPushCell(Arraywhich, anyinput) */
export declare function ArrayPushCell(which: number, input: number): number;
/** ArrayPushString(Arraywhich, const anyinput[]) */
export declare function ArrayPushString(which: number, input: string): number;
/** ArrayResize(Arraywhich, anynewsize) */
export declare function ArrayResize(which: number, newsize: number): boolean;
/** array: pointer, value, size */
export declare function arrayset(a0: i32, a1: i32, a2: i32): i32;
/** which, item, input: pointer, size */
export declare function ArraySetArray(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ArraySetCell(Arraywhich, anyitem, anyinput, anyblock, boolasChar) */
export declare function ArraySetCell(which: number, item: number, input: number, block?: number, asChar?: boolean): number;
/** ArraySetString(Arraywhich, anyitem, const anyinput[]) */
export declare function ArraySetString(which: number, item: number, input: string): number;
/** ArraySize(Arraywhich) */
export declare function ArraySize(which: number): number;
/** ArraySort(Arrayarray, const anycomparefunc[], anydata[], anydata_size) */
export declare function ArraySort(array: number, comparefunc: string, data?: string, data_size?: number): number;
/** ArraySortEx(Arrayarray, const anycomparefunc[], anydata[], anydata_size) */
export declare function ArraySortEx(array: number, comparefunc: string, data?: string, data_size?: number): number;
/** ArraySwap(Arraywhich, anyitem1, anyitem2) */
export declare function ArraySwap(which: number, item1: number, item2: number): number;
/** attach_view(anyiIndex, anyiTargetIndex) */
export declare function attach_view(iIndex: number, iTargetIndex: number): number;
/** AutoExecConfig(boolautoCreate, const anyname[], const anyfolder[]) */
export declare function AutoExecConfig(autoCreate?: boolean, name?: string, folder?: string): number;
/** bind_pcvar_float(anypcvar, Floatvar) */
export declare function bind_pcvar_float(pcvar: number, var_: number): number;
/** bind_pcvar_num(anypcvar, anyvar) */
export declare function bind_pcvar_num(pcvar: number, var_: number): number;
/** pcvar, var: pointer, varlen */
export declare function bind_pcvar_string(a0: i32, a1: i32, a2: i32): i32;
/** call_think(anyentity) */
export declare function call_think(entity: number): number;
/** callfunc_begin(const anyfunc[], const anyplugin[]) */
export declare function callfunc_begin(func: string, plugin?: string): number;
/** callfunc_begin_i(anyfunc, anyplugin) */
export declare function callfunc_begin_i(func: number, plugin?: number): number;
/** callfunc_end() */
export declare function callfunc_end(): number;
/** callfunc_push_array(const anyVALUE[], anyarray_size, boolcopyback) */
export declare function callfunc_push_array(VALUE: string, array_size: number, copyback?: boolean): number;
/** callfunc_push_float(Floatvalue) */
export declare function callfunc_push_float(value: number): number;
/** value: pointer */
export declare function callfunc_push_floatrf(a0: i32): i32;
/** callfunc_push_int(anyvalue) */
export declare function callfunc_push_int(value: number): number;
/** value: pointer */
export declare function callfunc_push_intrf(a0: i32): i32;
/** callfunc_push_str(const anyVALUE[], boolcopyback) */
export declare function callfunc_push_str(VALUE: string, copyback?: boolean): number;
/** cfg_create_section(ConfigFilecfg, const anysectionName[]) */
export declare function cfg_create_section(cfg: number, sectionName: string): number;
/** cfg_delete_key(ConfigSectionsection, const anykey[]) */
export declare function cfg_delete_key(section: number, key: string): boolean;
/** cfg_get_array_size(ConfigSectionsection, const anykey[]) */
export declare function cfg_get_array_size(section: number, key: string): number;
/** cfg_get_bool(ConfigSectionsection, const anykey[], anyindex) */
export declare function cfg_get_bool(section: number, key: string, index?: number): boolean;
/** cfg_get_float(ConfigSectionsection, const anykey[], anyindex) */
export declare function cfg_get_float(section: number, key: string, index?: number): number;
/** cfg_get_float_array(ConfigSectionsection, const anykey[], anyindex) */
export declare function cfg_get_float_array(section: number, key: string, index?: number): number;
/** cfg_get_int(ConfigSectionsection, const anykey[], anyindex) */
export declare function cfg_get_int(section: number, key: string, index?: number): number;
/** cfg_get_section(ConfigFilecfg, const anysectionName[]) */
export declare function cfg_get_section(cfg: number, sectionName: string): number;
/** cfg_get_section_data(ConfigSectionsection) */
export declare function cfg_get_section_data(section: number): number;
/** cfg_get_section_name(anyindex, anyname[], anylen) */
export declare function cfg_get_section_name(index: number): string;
/** cfg_get_sections_count() */
export declare function cfg_get_sections_count(): number;
/** cfg_get_top_level_keys(ConfigSectionsection) */
export declare function cfg_get_top_level_keys(section: number): number;
/** cfg_get_value(ConfigSectionsection, const anykey[], anyvalue[], anylen, anyindex) */
export declare function cfg_get_value(section: number, key: string, index?: number): string;
/** cfg_get_value_array(ConfigSectionsection, const anykey[], anyindex) */
export declare function cfg_get_value_array(section: number, key: string, index?: number): number;
/** cfg_get_value_array_by_path(ConfigSectionsection, const anypath[], anyindex, anylineIndex) */
export declare function cfg_get_value_array_by_path(section: number, path: string, index?: number, lineIndex?: number): number;
/** cfg_get_value_by_path(ConfigSectionsection, const anypath[], anyvalue[], anylen, anyindex, anylineIndex) */
export declare function cfg_get_value_by_path(section: number, path: string, index?: number, lineIndex?: number): string;
/** cfg_has_key(ConfigSectionsection, const anykey[]) */
export declare function cfg_has_key(section: number, key: string): boolean;
/** cfg_load_file(const anyfileName[]) */
export declare function cfg_load_file(fileName: string): number;
/** cfg_save_config(ConfigFilecfg, const anyfileName[]) */
export declare function cfg_save_config(cfg: number, fileName?: string): boolean;
/** cfg_set_base_dir(const anydir[]) */
export declare function cfg_set_base_dir(dir: string): number;
/** cfg_set_bool(ConfigSectionsection, const anykey[], boolvalue, anyindex) */
export declare function cfg_set_bool(section: number, key: string, value: boolean, index?: number): boolean;
/** cfg_set_entry_content_type(ConfigSectionsection, const anykey[], ContentTypecontentType) */
export declare function cfg_set_entry_content_type(section: number, key: string, contentType: number): boolean;
/** cfg_set_entry_type(ConfigSectionsection, const anykey[], EntryTypeentryType) */
export declare function cfg_set_entry_type(section: number, key: string, entryType: number): boolean;
/** cfg_set_float(ConfigSectionsection, const anykey[], Floatvalue, anyindex) */
export declare function cfg_set_float(section: number, key: string, value: number, index?: number): boolean;
/** cfg_set_int(ConfigSectionsection, const anykey[], anyvalue, anyindex) */
export declare function cfg_set_int(section: number, key: string, value: number, index?: number): boolean;
/** cfg_set_row_comment(ConfigSectionsection, const anykey[], anyrow, const anycomment[]) */
export declare function cfg_set_row_comment(section: number, key: string, row: number, comment: string): boolean;
/** cfg_set_value(ConfigSectionsection, const anykey[], const anyvalue[], anyindex, anylineIndex) */
export declare function cfg_set_value(section: number, key: string, value: string, index?: number, lineIndex?: number): boolean;
/** cfg_write_file(ConfigFilecfg, const anyfileName[], const anysectionName[]) */
export declare function cfg_write_file(cfg: number, fileName: string, sectionName: string): boolean;
/** change_task(anyid, FloatnewTime, anyoutside) */
export declare function change_task(id?: number, newTime?: number, outside?: number): number;
/** CheckVisibilityInOrigin(const anyent, Floatorigin[], CheckVisibilityTypetype) */
export declare function CheckVisibilityInOrigin(ent: number, origin: number[], type_?: number): number;
/** clamp(anyvalue, anymin, anymax) */
export declare function clamp(value: number, min: number, max: number): number;
/** ClearSyncHud(anytarget, anysyncObj) */
export declare function ClearSyncHud(target: number, syncObj: number): number;
/** close_dir(anydirh) */
export declare function close_dir(dirh: number): number;
/** CloseGameConfigFile(GameConfighandle) */
export declare function CloseGameConfigFile(handle: number): number;
/** contain(const anysource[], const anystring[]) */
export declare function contain(source: string, string_: string): number;
/** containi(const anysource[], const anystring[]) */
export declare function containi(source: string, string_: string): number;
/** copy(anydest[], anylen, const anysrc[]) */
export declare function copy(src: string): string;
/** szClassName: pointer, sizea, szKeyName: pointer, sizeb, szValue: pointer, sizec */
export declare function copy_keyvalue(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32): i32;
/** copyc(anydest[], anylen, const anysrc[], anych) */
export declare function copyc(src: string, ch: number): string;
/** create_cvar(const anyname[], const anystring[], anyflags, const anydescription[], boolhas_min, Floatmin_val, boolhas_max, Floatmax_val) */
export declare function create_cvar(name: string, string_: string, flags?: number, description?: string, has_min?: boolean, min_val?: number, has_max?: boolean, max_val?: number): number;
/** create_entity(const anyszClassname[]) */
export declare function create_entity(szClassname: string): number;
/** CreateDataPack() */
export declare function CreateDataPack(): number;
/** CreateHamItemInfo() */
export declare function CreateHamItemInfo(): number;
/** CreateLangKey(const anykey[]) */
export declare function CreateLangKey(key: string): number;
/** CreateStack(anyblocksize) */
export declare function CreateStack(blocksize?: number): number;
/** cs_create_entity(const anyclassname[]) */
export declare function cs_create_entity(classname: string): number;
/** cs_find_ent_by_class(anystart_index, const anyclassname[]) */
export declare function cs_find_ent_by_class(start_index: number, classname: string): number;
/** cs_find_ent_by_owner(anystart_index, const anyclassname[], anyowner) */
export declare function cs_find_ent_by_owner(start_index: number, classname: string, owner: number): number;
/** index, count: pointer */
export declare function cs_get_armoury_type(a0: i32, a1: i32): i32;
/** cs_get_c4_defusing(anyc4index) */
export declare function cs_get_c4_defusing(c4index: number): boolean;
/** cs_get_c4_explode_time(anyindex) */
export declare function cs_get_c4_explode_time(index: number): number;
/** cs_get_hostage_foll(anyindex) */
export declare function cs_get_hostage_foll(index: number): number;
/** cs_get_hostage_id(anyindex) */
export declare function cs_get_hostage_id(index: number): number;
/** cs_get_hostage_lastuse(anyindex) */
export declare function cs_get_hostage_lastuse(index: number): number;
/** cs_get_hostage_nextuse(anyindex) */
export declare function cs_get_hostage_nextuse(index: number): number;
/** itemid, name: pointer, name_maxlen, altname: pointer, altname_maxlen */
export declare function cs_get_item_alias(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** cs_get_item_id(const anyname[], CsWeaponClassTypeclassid) */
export declare function cs_get_item_id(name: string, classid?: number): number;
/** cs_get_no_knives() */
export declare function cs_get_no_knives(): number;
/** cs_get_translated_item_alias(const anyalias[], anyitemname[], anymaxlength) */
export declare function cs_get_translated_item_alias(alias: string): string;
/** cs_get_user_armor(anyindex, CsArmorTypearmortype) */
export declare function cs_get_user_armor(index: number, armortype?: number): number;
/** cs_get_user_bpammo(anyindex, anyweapon) */
export declare function cs_get_user_bpammo(index: number, weapon: number): number;
/** cs_get_user_buyzone(anyindex) */
export declare function cs_get_user_buyzone(index: number): number;
/** cs_get_user_deaths(anyindex) */
export declare function cs_get_user_deaths(index: number): number;
/** cs_get_user_defuse(anyindex) */
export declare function cs_get_user_defuse(index: number): number;
/** cs_get_user_driving(anyindex) */
export declare function cs_get_user_driving(index: number): number;
/** cs_get_user_hasprim(anyindex) */
export declare function cs_get_user_hasprim(index: number): number;
/** cs_get_user_hostagekills(anyindex) */
export declare function cs_get_user_hostagekills(index: number): number;
/** cs_get_user_lastactivity(anyindex) */
export declare function cs_get_user_lastactivity(index: number): number;
/** cs_get_user_mapzones(anyindex) */
export declare function cs_get_user_mapzones(index: number): number;
/** cs_get_user_model(anyindex, anymodel[], anylen) */
export declare function cs_get_user_model(index: number): string;
/** cs_get_user_money(anyindex) */
export declare function cs_get_user_money(index: number): number;
/** cs_get_user_nvg(anyindex) */
export declare function cs_get_user_nvg(index: number): number;
/** cs_get_user_plant(anyindex) */
export declare function cs_get_user_plant(index: number): number;
/** cs_get_user_shield(anyindex) */
export declare function cs_get_user_shield(index: number): number;
/** cs_get_user_stationary(anyindex) */
export declare function cs_get_user_stationary(index: number): number;
/** cs_get_user_submodel(anyindex) */
export declare function cs_get_user_submodel(index: number): number;
/** cs_get_user_team(anyindex, anymodel) */
export declare function cs_get_user_team(index: number, model?: number): number;
/** cs_get_user_tked(anyindex) */
export declare function cs_get_user_tked(index: number): number;
/** cs_get_user_vip(anyindex) */
export declare function cs_get_user_vip(index: number): number;
/** cs_get_user_weapon(anyplayerIndex, anyclip, anyammo) */
export declare function cs_get_user_weapon(playerIndex: number, clip?: number, ammo?: number): number;
/** cs_get_user_weapon_entity(anyplayerIndex) */
export declare function cs_get_user_weapon_entity(playerIndex: number): number;
/** cs_get_user_zoom(anyindex) */
export declare function cs_get_user_zoom(index: number): number;
/** cs_get_weapon_ammo(anyindex) */
export declare function cs_get_weapon_ammo(index: number): number;
/** cs_get_weapon_burst(anyindex) */
export declare function cs_get_weapon_burst(index: number): number;
/** cs_get_weapon_id(anyindex) */
export declare function cs_get_weapon_id(index: number): number;
/** cs_get_weapon_info(anyweapon_id, CsWeaponInfotype) */
export declare function cs_get_weapon_info(weapon_id: number, type_: number): number;
/** cs_get_weapon_silen(anyindex) */
export declare function cs_get_weapon_silen(index: number): number;
/** cs_get_weaponbox_item(anyweaponboxIndex) */
export declare function cs_get_weaponbox_item(weaponboxIndex: number): number;
/** cs_reset_user_model(anyindex) */
export declare function cs_reset_user_model(index: number): number;
/** cs_set_armoury_type(anyindex, anytype, anycount) */
export declare function cs_set_armoury_type(index: number, type_: number, count?: number): number;
/** cs_set_c4_defusing(anyc4index, booldefusing) */
export declare function cs_set_c4_defusing(c4index: number, defusing: boolean): number;
/** cs_set_c4_explode_time(anyindex, Floatvalue) */
export declare function cs_set_c4_explode_time(index: number, value: number): number;
/** cs_set_ent_class(anyindex, const anyclassname[]) */
export declare function cs_set_ent_class(index: number, classname: string): number;
/** cs_set_hostage_foll(anyindex, anyfollowedindex) */
export declare function cs_set_hostage_foll(index: number, followedindex?: number): number;
/** cs_set_hostage_lastuse(anyindex, Floatvalue) */
export declare function cs_set_hostage_lastuse(index: number, value: number): number;
/** cs_set_hostage_nextuse(anyindex, Floatvalue) */
export declare function cs_set_hostage_nextuse(index: number, value: number): number;
/** cs_set_no_knives(anynoknives) */
export declare function cs_set_no_knives(noknives?: number): number;
/** cs_set_user_armor(anyindex, anyarmorvalue, CsArmorTypearmortype) */
export declare function cs_set_user_armor(index: number, armorvalue: number, armortype: number): number;
/** cs_set_user_bpammo(anyindex, anyweapon, anyamount) */
export declare function cs_set_user_bpammo(index: number, weapon: number, amount: number): number;
/** cs_set_user_deaths(anyindex, anynewdeaths, boolscoreboard) */
export declare function cs_set_user_deaths(index: number, newdeaths: number, scoreboard?: boolean): number;
/** cs_set_user_defuse(anyindex, anydefusekit, anyr, anyg, anyb, anyicon[], anyflash) */
export declare function cs_set_user_defuse(index: number, defusekit?: number, r?: number, g?: number, b?: number, icon?: string, flash?: number): number;
/** cs_set_user_hostagekills(anyindex, anyvalue) */
export declare function cs_set_user_hostagekills(index: number, value: number): number;
/** cs_set_user_lastactivity(anyindex, Floatvalue) */
export declare function cs_set_user_lastactivity(index: number, value: number): number;
/** cs_set_user_model(anyindex, const anymodel[], boolupdate_index) */
export declare function cs_set_user_model(index: number, model: string, update_index?: boolean): number;
/** cs_set_user_money(anyindex, anymoney, anyflash) */
export declare function cs_set_user_money(index: number, money: number, flash?: number): number;
/** cs_set_user_nvg(anyindex, anynvgoggles) */
export declare function cs_set_user_nvg(index: number, nvgoggles?: number): number;
/** cs_set_user_plant(anyindex, anyplant, anyshowbombicon) */
export declare function cs_set_user_plant(index: number, plant?: number, showbombicon?: number): number;
/** cs_set_user_submodel(anyindex, anyvalue) */
export declare function cs_set_user_submodel(index: number, value: number): number;
/** cs_set_user_team(anyindex, anyteam, anymodel, boolsend_teaminfo) */
export declare function cs_set_user_team(index: number, team: number, model?: number, send_teaminfo?: boolean): number;
/** cs_set_user_tked(anyindex, anytk, anysubtract) */
export declare function cs_set_user_tked(index: number, tk?: number, subtract?: number): number;
/** cs_set_user_vip(anyindex, anyvip, anymodel, anyscoreboard) */
export declare function cs_set_user_vip(index: number, vip?: number, model?: number, scoreboard?: number): number;
/** cs_set_user_zoom(anyindex, anytype, anymode) */
export declare function cs_set_user_zoom(index: number, type_: number, mode: number): number;
/** cs_set_weapon_ammo(anyindex, anynewammo) */
export declare function cs_set_weapon_ammo(index: number, newammo: number): number;
/** cs_set_weapon_burst(anyindex, anyburstmode) */
export declare function cs_set_weapon_burst(index: number, burstmode?: number): number;
/** cs_set_weapon_silen(anyindex, anysilence, anydraw_animation) */
export declare function cs_set_weapon_silen(index: number, silence?: number, draw_animation?: number): number;
/** cs_user_spawn(anyplayer) */
export declare function cs_user_spawn(player: number): number;
/** cvar_exists(const anycvar[]) */
export declare function cvar_exists(cvar: string): number;
/** date(anyyear, anymonth, anyday) */
export declare function date(year?: number, month?: number, day?: number): number;
/** dbg_fmt_error(anybuffer[], anymaxLength) */
export declare function dbg_fmt_error(): string;
/** dbg_trace_begin() */
export declare function dbg_trace_begin(): number;
/** trace, line: pointer, function: pointer, maxLength1, file: pointer, maxLength2 */
export declare function dbg_trace_info(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32): i32;
/** dbg_trace_next(anytrace) */
export declare function dbg_trace_next(trace: number): number;
/** delete_file(const anyfile[], booluse_valve_fs, const anyvalve_path_id[]) */
export declare function delete_file(file: string, use_valve_fs?: boolean, valve_path_id?: string): number;
/** DestroyDataPack(DataPackpack) */
export declare function DestroyDataPack(pack: number): number;
/** DestroyForward(anyforward_handle) */
export declare function DestroyForward(forward_handle: number): number;
/** DestroyStack(Stackhandle) */
export declare function DestroyStack(handle: number): number;
/** dir_exists(const anydir[], booluse_valve_fs) */
export declare function dir_exists(dir: string, use_valve_fs?: boolean): number;
/** disable_cvar_hook(cvarhookhandle) */
export declare function disable_cvar_hook(handle: number): number;
/** disable_event(anyhandle) */
export declare function disable_event(handle: number): number;
/** disable_logevent(anyhandle) */
export declare function disable_logevent(handle: number): number;
/** DisableHamForward(HamHookfwd) */
export declare function DisableHamForward(fwd: number): number;
/** DisableHookChain(HookChainhook) */
export declare function DisableHookChain(hook: number): boolean;
/** DisableHookMessage(const MessageHookhandle) */
export declare function DisableHookMessage(handle: number): boolean;
/** DispatchSpawn(anyiIndex) */
export declare function DispatchSpawn(iIndex: number): number;
/** drop_to_floor(anyentity) */
export declare function drop_to_floor(entity: number): number;
/** emessage_begin(anydest, anymsg_type, const anyorigin[], anyplayer) */
export declare function emessage_begin(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** emessage_begin_f(anydest, anymsg_type, const Floatorigin[], anyplayer) */
export declare function emessage_begin_f(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** emessage_end() */
export declare function emessage_end(): number;
/** emit_sound(anyindex, anychannel, const anysample[], Floatvol, Floatatt, anyflags, anypitch) */
export declare function emit_sound(index: number, channel: number, sample: string, vol: number, att: number, flags: number, pitch: number): number;
/** enable_cvar_hook(cvarhookhandle) */
export declare function enable_cvar_hook(handle: number): number;
/** enable_event(anyhandle) */
export declare function enable_event(handle: number): number;
/** enable_logevent(anyhandle) */
export declare function enable_logevent(handle: number): number;
/** EnableHamForward(HamHookfwd) */
export declare function EnableHamForward(fwd: number): number;
/** EnableHookChain(HookChainhook) */
export declare function EnableHookChain(hook: number): boolean;
/** EnableHookMessage(const MessageHookhandle) */
export declare function EnableHookMessage(handle: number): boolean;
/** eng_get_string(any_string, any_returnString[], any_len) */
export declare function eng_get_string(_string: number): string;
/** engclient_cmd(anyindex, const anycommand[], const anyarg1[], const anyarg2[]) */
export declare function engclient_cmd(index: number, command: string, arg1?: string, arg2?: string): number;
/** engine_changelevel(const anymap[]) */
export declare function engine_changelevel(map: string): number;
/** engset_view(const anyindex, const anyviewEntity) */
export declare function engset_view(index: number, viewEntity: number): number;
/** entity_count() */
export declare function entity_count(): number;
/** entity_get_byte(anyiIndex, anyiKey) */
export declare function entity_get_byte(iIndex: number, iKey: number): number;
/** entity_get_edict(anyiIndex, anyiKey) */
export declare function entity_get_edict(iIndex: number, iKey: number): number;
/** entity_get_edict2(anyiIndex, anyiKey) */
export declare function entity_get_edict2(iIndex: number, iKey: number): number;
/** entity_get_float(anyiIndex, anyiKey) */
export declare function entity_get_float(iIndex: number, iKey: number): number;
/** entity_get_int(anyiIndex, anyiKey) */
export declare function entity_get_int(iIndex: number, iKey: number): number;
/** entity_get_string(anyiIndex, anyiKey, anyszReturn[], anyiRetLen) */
export declare function entity_get_string(iIndex: number, iKey: number): string;
/** entity_get_vector(anyiIndex, anyiKey, FloatvRetVector[]) */
export declare function entity_get_vector(iIndex: number, iKey: number, vRetVector: number[]): number;
/** entity_intersects(anyentity, anyother) */
export declare function entity_intersects(entity: number, other: number): boolean;
/** entity_range(anyida, anyidb) */
export declare function entity_range(ida: number, idb: number): number;
/** entity_set_byte(anyiIndex, anyiKey, anyiVal) */
export declare function entity_set_byte(iIndex: number, iKey: number, iVal: number): number;
/** entity_set_edict(anyiIndex, anyiKey, anyiNewIndex) */
export declare function entity_set_edict(iIndex: number, iKey: number, iNewIndex: number): number;
/** entity_set_float(anyiIndex, anyiKey, FloatiVal) */
export declare function entity_set_float(iIndex: number, iKey: number, iVal: number): number;
/** entity_set_int(anyiIndex, anyiKey, anyiVal) */
export declare function entity_set_int(iIndex: number, iKey: number, iVal: number): number;
/** entity_set_model(anyiIndex, const anyszModel[]) */
export declare function entity_set_model(iIndex: number, szModel: string): number;
/** entity_set_origin(anyiIndex, const FloatfNewOrigin[]) */
export declare function entity_set_origin(iIndex: number, fNewOrigin: number[]): number;
/** entity_set_size(anyindex, const Floatmins[], const Floatmaxs[]) */
export declare function entity_set_size(index: number, mins: number[], maxs: number[]): number;
/** entity_set_string(anyiIndex, anyiKey, const anyszNewVal[]) */
export declare function entity_set_string(iIndex: number, iKey: number, szNewVal: string): number;
/** entity_set_vector(anyiIndex, anyiKey, const FloatvNewVector[]) */
export declare function entity_set_vector(iIndex: number, iKey: number, vNewVector: number[]): number;
/** equal(const anya[], const anyb[], anyc) */
export declare function equal(a: string, b: string, c?: number): number;
/** equali(const anya[], const anyb[], anyc) */
export declare function equali(a: string, b: string, c?: number): number;
/** ewrite_angle(anyx) */
export declare function ewrite_angle(x: number): number;
/** ewrite_angle_f(Floatx) */
export declare function ewrite_angle_f(x: number): number;
/** ewrite_byte(anyx) */
export declare function ewrite_byte(x: number): number;
/** ewrite_char(anyx) */
export declare function ewrite_char(x: number): number;
/** ewrite_coord(anyx) */
export declare function ewrite_coord(x: number): number;
/** ewrite_coord_f(Floatx) */
export declare function ewrite_coord_f(x: number): number;
/** ewrite_entity(anyx) */
export declare function ewrite_entity(x: number): number;
/** ewrite_long(anyx) */
export declare function ewrite_long(x: number): number;
/** ewrite_short(anyx) */
export declare function ewrite_short(x: number): number;
/** ewrite_string(const anyx[]) */
export declare function ewrite_string(x: string): number;
/** ezhttp_cancel_request(EzHttpRequestrequest_id) */
export declare function ezhttp_cancel_request(request_id: number): number;
/** ezhttp_create_options() */
export declare function ezhttp_create_options(): number;
/** ezhttp_create_queue() */
export declare function ezhttp_create_queue(): number;
/** ezhttp_delete(const anyurl[], const anyon_complete[], EzHttpOptionsoptions_id) */
export declare function ezhttp_delete(url: string, on_complete: string, options_id: number): number;
/** ezhttp_ftp_download(const anyuser[], const anypassword[], const anyhost[], const anyremote_file[], const anylocal_file[], const anyon_complete[], EzHttpFtpSecuritysecurity, EzHttpOptionsoptions_id) */
export declare function ezhttp_ftp_download(user: string, password: string, host: string, remote_file: string, local_file: string, on_complete: string, security: number, options_id: number): number;
/** ezhttp_ftp_download2(const anyuri[], const anylocal_file[], const anyon_complete[], EzHttpFtpSecuritysecurity, EzHttpOptionsoptions_id) */
export declare function ezhttp_ftp_download2(uri: string, local_file: string, on_complete: string, security: number, options_id: number): number;
/** ezhttp_ftp_upload(const anyuser[], const anypassword[], const anyhost[], const anyremote_file[], const anylocal_file[], const anyon_complete[], EzHttpFtpSecuritysecurity, EzHttpOptionsoptions_id) */
export declare function ezhttp_ftp_upload(user: string, password: string, host: string, remote_file: string, local_file: string, on_complete: string, security: number, options_id: number): number;
/** ezhttp_ftp_upload2(const anyuri[], const anylocal_file[], const anyon_complete[], EzHttpFtpSecuritysecurity, EzHttpOptionsoptions_id) */
export declare function ezhttp_ftp_upload2(uri: string, local_file: string, on_complete: string, security: number, options_id: number): number;
/** ezhttp_get(const anyurl[], const anyon_complete[], EzHttpOptionsoptions_id) */
export declare function ezhttp_get(url: string, on_complete: string, options_id: number): number;
/** ezhttp_get_cookies(EzHttpRequestrequest_id, const anykey[], anyvalue[], anymax_len) */
export declare function ezhttp_get_cookies(request_id: number, key: string): string;
/** ezhttp_get_cookies_count(EzHttpRequestrequest_id) */
export declare function ezhttp_get_cookies_count(request_id: number): number;
/** ezhttp_get_data(EzHttpRequestrequest_id, anybuffer[], anymax_len) */
export declare function ezhttp_get_data(request_id: number): string;
/** ezhttp_get_downloaded_bytes(EzHttpRequestrequest_id) */
export declare function ezhttp_get_downloaded_bytes(request_id: number): number;
/** ezhttp_get_elapsed(EzHttpRequestrequest_id) */
export declare function ezhttp_get_elapsed(request_id: number): number;
/** ezhttp_get_error_code(EzHttpRequestrequest_id) */
export declare function ezhttp_get_error_code(request_id: number): number;
/** ezhttp_get_error_message(EzHttpRequestrequest_id, anybuffer[], anymax_len) */
export declare function ezhttp_get_error_message(request_id: number): string;
/** ezhttp_get_headers(EzHttpRequestrequest_id, const anykey[], anyvalue[], anymax_len) */
export declare function ezhttp_get_headers(request_id: number, key: string): string;
/** ezhttp_get_headers_count(EzHttpRequestrequest_id) */
export declare function ezhttp_get_headers_count(request_id: number): number;
/** ezhttp_get_http_code(EzHttpRequestrequest_id) */
export declare function ezhttp_get_http_code(request_id: number): number;
/** ezhttp_get_redirect_count(EzHttpRequestrequest_id) */
export declare function ezhttp_get_redirect_count(request_id: number): number;
/** ezhttp_get_uploaded_bytes(EzHttpRequestrequest_id) */
export declare function ezhttp_get_uploaded_bytes(request_id: number): number;
/** ezhttp_get_url(EzHttpRequestrequest_id, anybuffer[], anymax_len) */
export declare function ezhttp_get_url(request_id: number): string;
/** request_id, data: pointer */
export declare function ezhttp_get_user_data(a0: i32, a1: i32): i32;
/** ezhttp_is_request_exists(EzHttpRequestrequest_id) */
export declare function ezhttp_is_request_exists(request_id: number): number;
/** ezhttp_option_add_form_payload(EzHttpOptionsoptions_id, const anykey[], const anyvalue[]) */
export declare function ezhttp_option_add_form_payload(options_id: number, key: string, value: string): number;
/** ezhttp_option_add_url_parameter(EzHttpOptionsoptions_id, const anykey[], const anyvalue[]) */
export declare function ezhttp_option_add_url_parameter(options_id: number, key: string, value: string): number;
/** ezhttp_option_append_body(EzHttpOptionsoptions_id, const anybody[]) */
export declare function ezhttp_option_append_body(options_id: number, body: string): number;
/** ezhttp_option_set_auth(EzHttpOptionsoptions_id, const anyuser[], const anypassword[]) */
export declare function ezhttp_option_set_auth(options_id: number, user: string, password: string): number;
/** ezhttp_option_set_body(EzHttpOptionsoptions_id, const anybody[]) */
export declare function ezhttp_option_set_body(options_id: number, body: string): number;
/** ezhttp_option_set_body_from_json(EzHttpOptionsoptions_id, EzJSONjson, boolpretty) */
export declare function ezhttp_option_set_body_from_json(options_id: number, json: number, pretty?: boolean): boolean;
/** ezhttp_option_set_connect_timeout(EzHttpOptionsoptions_id, anytimeout_ms) */
export declare function ezhttp_option_set_connect_timeout(options_id: number, timeout_ms: number): number;
/** ezhttp_option_set_cookie(EzHttpOptionsoptions_id, const anykey[], const anyvalue[]) */
export declare function ezhttp_option_set_cookie(options_id: number, key: string, value: string): number;
/** ezhttp_option_set_header(EzHttpOptionsoptions_id, const anykey[], const anyvalue[]) */
export declare function ezhttp_option_set_header(options_id: number, key: string, value: string): number;
/** ezhttp_option_set_plugin_end_behaviour(EzHttpOptionsoptions_id, EzHttpPluginEndBehaviourplugin_end_behaviour) */
export declare function ezhttp_option_set_plugin_end_behaviour(options_id: number, plugin_end_behaviour: number): number;
/** ezhttp_option_set_proxy(EzHttpOptionsoptions_id, const anyproxy_url[]) */
export declare function ezhttp_option_set_proxy(options_id: number, proxy_url: string): number;
/** ezhttp_option_set_proxy_auth(EzHttpOptionsoptions_id, const anyuser[], const anypassword[]) */
export declare function ezhttp_option_set_proxy_auth(options_id: number, user: string, password: string): number;
/** ezhttp_option_set_queue(EzHttpOptionsoptions_id, EzHttpQueueend_map_behaviour) */
export declare function ezhttp_option_set_queue(options_id: number, end_map_behaviour: number): number;
/** ezhttp_option_set_timeout(EzHttpOptionsoptions_id, anytimeout_ms) */
export declare function ezhttp_option_set_timeout(options_id: number, timeout_ms: number): number;
/** ezhttp_option_set_user_agent(EzHttpOptionsoptions_id, const anyuser_agent[]) */
export declare function ezhttp_option_set_user_agent(options_id: number, user_agent: string): number;
/** options_id, data: pointer, len */
export declare function ezhttp_option_set_user_data(a0: i32, a1: i32, a2: i32): i32;
/** ezhttp_parse_json_response(EzHttpRequestrequest_id, boolwith_comments) */
export declare function ezhttp_parse_json_response(request_id: number, with_comments?: boolean): number;
/** ezhttp_patch(const anyurl[], const anyon_complete[], EzHttpOptionsoptions_id) */
export declare function ezhttp_patch(url: string, on_complete: string, options_id: number): number;
/** ezhttp_post(const anyurl[], const anyon_complete[], EzHttpOptionsoptions_id) */
export declare function ezhttp_post(url: string, on_complete: string, options_id: number): number;
/** ezhttp_put(const anyurl[], const anyon_complete[], EzHttpOptionsoptions_id) */
export declare function ezhttp_put(url: string, on_complete: string, options_id: number): number;
/** ezhttp_request_progress(EzHttpRequestrequest_id, anyprogress[]) */
export declare function ezhttp_request_progress(request_id: number, progress: number[]): number;
/** ezhttp_save_data_to_file(EzHttpRequestrequest_id, const anyfile_path[]) */
export declare function ezhttp_save_data_to_file(request_id: number, file_path: string): number;
/** ezhttp_save_data_to_file2(EzHttpRequestrequest_id, anyfile_handle) */
export declare function ezhttp_save_data_to_file2(request_id: number, file_handle: number): number;
/** ezjson_array_append_bool(EzJSONarray, boolboolean) */
export declare function ezjson_array_append_bool(array: number, boolean_: boolean): boolean;
/** ezjson_array_append_null(EzJSONarray) */
export declare function ezjson_array_append_null(array: number): boolean;
/** ezjson_array_append_number(EzJSONarray, anynumber) */
export declare function ezjson_array_append_number(array: number, number_: number): boolean;
/** ezjson_array_append_real(EzJSONarray, Floatnumber) */
export declare function ezjson_array_append_real(array: number, number_: number): boolean;
/** ezjson_array_append_string(EzJSONarray, const anystring[]) */
export declare function ezjson_array_append_string(array: number, string_: string): boolean;
/** ezjson_array_append_value(EzJSONarray, const EzJSONvalue) */
export declare function ezjson_array_append_value(array: number, value: number): boolean;
/** ezjson_array_clear(EzJSONarray) */
export declare function ezjson_array_clear(array: number): boolean;
/** ezjson_array_get_bool(const EzJSONarray, anyindex) */
export declare function ezjson_array_get_bool(array: number, index: number): boolean;
/** ezjson_array_get_count(const EzJSONarray) */
export declare function ezjson_array_get_count(array: number): number;
/** ezjson_array_get_number(const EzJSONarray, anyindex) */
export declare function ezjson_array_get_number(array: number, index: number): number;
/** ezjson_array_get_real(const EzJSONarray, anyindex) */
export declare function ezjson_array_get_real(array: number, index: number): number;
/** array, index, buffer: pointer, maxlen */
export declare function ezjson_array_get_string(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ezjson_array_get_value(const EzJSONarray, anyindex) */
export declare function ezjson_array_get_value(array: number, index: number): number;
/** ezjson_array_remove(EzJSONarray, anyindex) */
export declare function ezjson_array_remove(array: number, index: number): boolean;
/** ezjson_array_replace_bool(EzJSONarray, anyindex, boolboolean) */
export declare function ezjson_array_replace_bool(array: number, index: number, boolean_: boolean): boolean;
/** ezjson_array_replace_null(EzJSONarray, anyindex) */
export declare function ezjson_array_replace_null(array: number, index: number): boolean;
/** ezjson_array_replace_number(EzJSONarray, anyindex, anynumber) */
export declare function ezjson_array_replace_number(array: number, index: number, number_: number): boolean;
/** ezjson_array_replace_real(EzJSONarray, anyindex, Floatnumber) */
export declare function ezjson_array_replace_real(array: number, index: number, number_: number): boolean;
/** ezjson_array_replace_string(EzJSONarray, anyindex, const anystring[]) */
export declare function ezjson_array_replace_string(array: number, index: number, string_: string): boolean;
/** ezjson_array_replace_value(EzJSONarray, anyindex, const EzJSONvalue) */
export declare function ezjson_array_replace_value(array: number, index: number, value: number): boolean;
/** ezjson_deep_copy(const EzJSONvalue) */
export declare function ezjson_deep_copy(value: number): number;
/** ezjson_equals(const EzJSONvalue1, const EzJSONvalue2) */
export declare function ezjson_equals(value1: number, value2: number): boolean;
/** ezjson_free(EzJSONhandle) */
export declare function ezjson_free(handle: number): boolean;
/** ezjson_get_bool(const EzJSONvalue) */
export declare function ezjson_get_bool(value: number): boolean;
/** ezjson_get_number(const EzJSONvalue) */
export declare function ezjson_get_number(value: number): number;
/** ezjson_get_parent(const EzJSONvalue) */
export declare function ezjson_get_parent(value: number): number;
/** ezjson_get_real(const EzJSONvalue) */
export declare function ezjson_get_real(value: number): number;
/** ezjson_get_string(const EzJSONvalue, anybuffer[], anymaxlen) */
export declare function ezjson_get_string(value: number): string;
/** ezjson_get_type(const EzJSONvalue) */
export declare function ezjson_get_type(value: number): number;
/** ezjson_init_array() */
export declare function ezjson_init_array(): number;
/** ezjson_init_bool(boolvalue) */
export declare function ezjson_init_bool(value: boolean): number;
/** ezjson_init_null() */
export declare function ezjson_init_null(): number;
/** ezjson_init_number(anyvalue) */
export declare function ezjson_init_number(value: number): number;
/** ezjson_init_object() */
export declare function ezjson_init_object(): number;
/** ezjson_init_real(Floatvalue) */
export declare function ezjson_init_real(value: number): number;
/** ezjson_init_string(const anyvalue[]) */
export declare function ezjson_init_string(value: string): number;
/** ezjson_object_clear(EzJSONobject) */
export declare function ezjson_object_clear(object: number): boolean;
/** ezjson_object_get_bool(const EzJSONobject, const anyname[], booldot_not) */
export declare function ezjson_object_get_bool(object: number, name: string, dot_not?: boolean): boolean;
/** ezjson_object_get_count(const EzJSONobject) */
export declare function ezjson_object_get_count(object: number): number;
/** ezjson_object_get_name(const EzJSONobject, anyindex, anybuffer[], anymaxlen) */
export declare function ezjson_object_get_name(object: number, index: number): string;
/** ezjson_object_get_number(const EzJSONobject, const anyname[], booldot_not) */
export declare function ezjson_object_get_number(object: number, name: string, dot_not?: boolean): number;
/** ezjson_object_get_real(const EzJSONobject, const anyname[], booldot_not) */
export declare function ezjson_object_get_real(object: number, name: string, dot_not?: boolean): number;
/** ezjson_object_get_string(const EzJSONobject, const anyname[], anybuffer[], anymaxlen, booldot_not) */
export declare function ezjson_object_get_string(object: number, name: string, dot_not?: boolean): string;
/** ezjson_object_get_value(const EzJSONobject, const anyname[], booldot_not) */
export declare function ezjson_object_get_value(object: number, name: string, dot_not?: boolean): number;
/** ezjson_object_get_value_at(const EzJSONobject, anyindex) */
export declare function ezjson_object_get_value_at(object: number, index: number): number;
/** ezjson_object_has_value(const EzJSONobject, const anyname[], EzJSONTypetype, booldot_not) */
export declare function ezjson_object_has_value(object: number, name: string, type_?: number, dot_not?: boolean): boolean;
/** ezjson_object_remove(EzJSONobject, const anyname[], booldot_not) */
export declare function ezjson_object_remove(object: number, name: string, dot_not?: boolean): boolean;
/** ezjson_object_set_bool(EzJSONobject, const anyname[], boolboolean, booldot_not) */
export declare function ezjson_object_set_bool(object: number, name: string, boolean_: boolean, dot_not?: boolean): boolean;
/** ezjson_object_set_null(EzJSONobject, const anyname[], booldot_not) */
export declare function ezjson_object_set_null(object: number, name: string, dot_not?: boolean): boolean;
/** object, name: pointer, number, dot_not */
export declare function ezjson_object_set_number(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** object, name: pointer, number, dot_not */
export declare function ezjson_object_set_real(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ezjson_object_set_string(EzJSONobject, const anyname[], const anystring[], booldot_not) */
export declare function ezjson_object_set_string(object: number, name: string, string_: string, dot_not?: boolean): boolean;
/** ezjson_object_set_value(EzJSONobject, const anyname[], const EzJSONvalue, booldot_not) */
export declare function ezjson_object_set_value(object: number, name: string, value: number, dot_not?: boolean): boolean;
/** ezjson_parse(const anystring[], boolis_file, boolwith_comments) */
export declare function ezjson_parse(string_: string, is_file?: boolean, with_comments?: boolean): number;
/** ezjson_serial_size(const EzJSONvalue, boolpretty, boolnull_byte) */
export declare function ezjson_serial_size(value: number, pretty?: boolean, null_byte?: boolean): number;
/** ezjson_serial_to_file(const EzJSONvalue, const anyfile[], boolpretty) */
export declare function ezjson_serial_to_file(value: number, file: string, pretty?: boolean): boolean;
/** ezjson_serial_to_string(const EzJSONvalue, anybuffer[], anymaxlen, boolpretty) */
export declare function ezjson_serial_to_string(value: number, pretty?: boolean): string;
/** ezjson_validate(const EzJSONschema, const EzJSONvalue) */
export declare function ezjson_validate(schema: number, value: number): boolean;
/** fake_touch(anyentTouched, anyentToucher) */
export declare function fake_touch(entTouched: number, entToucher: number): number;
/** FClassnameIs(const anyentityIndex, const anyclassName[]) */
export declare function FClassnameIs(entityIndex: number, className: string): boolean;
/** fclose(anyfile) */
export declare function fclose(file: number): number;
/** feof(anyfile) */
export declare function feof(file: number): number;
/** fflush(anyfile) */
export declare function fflush(file: number): number;
/** fgetc(anyfile) */
export declare function fgetc(file: number): number;
/** fgets(anyfile, anybuffer[], anymaxlength) */
export declare function fgets(file: number): string;
/** file_exists(const anyfile[], booluse_valve_fs) */
export declare function file_exists(file: string, use_valve_fs?: boolean): number;
/** file_size(const anyfile[], anyflag, booluse_valve_fs, const anyvalve_path_id[]) */
export declare function file_size(file: string, flag?: number, use_valve_fs?: boolean, valve_path_id?: string): number;
/** FileReadInt16(anyfile, anydata) */
export declare function FileReadInt16(file: number, data: number): boolean;
/** FileReadInt32(anyfile, anydata) */
export declare function FileReadInt32(file: number, data: number): boolean;
/** FileReadInt8(anyfile, anydata) */
export declare function FileReadInt8(file: number, data: number): boolean;
/** FileReadUint16(anyfile, anydata) */
export declare function FileReadUint16(file: number, data: number): boolean;
/** FileReadUint8(anyfile, anydata) */
export declare function FileReadUint8(file: number, data: number): boolean;
/** FileWriteInt16(anyfile, anydata) */
export declare function FileWriteInt16(file: number, data: number): boolean;
/** FileWriteInt32(anyfile, anydata) */
export declare function FileWriteInt32(file: number, data: number): boolean;
/** FileWriteInt8(anyfile, anydata) */
export declare function FileWriteInt8(file: number, data: number): boolean;
/** find_ent_by_class(anyiIndex, const anyszClass[]) */
export declare function find_ent_by_class(iIndex: number, szClass: string): number;
/** find_ent_by_model(anyiIndex, const anyszClass[], const anyszModel[]) */
export declare function find_ent_by_model(iIndex: number, szClass: string, szModel: string): number;
/** find_ent_by_owner(anyiIndex, const anyszClass[], anyiOwner, anyiJghgType) */
export declare function find_ent_by_owner(iIndex: number, szClass: string, iOwner: number, iJghgType?: number): number;
/** find_ent_by_target(anyiIndex, const anyszClass[]) */
export declare function find_ent_by_target(iIndex: number, szClass: string): number;
/** find_ent_by_tname(anyiIndex, const anyszClass[]) */
export declare function find_ent_by_tname(iIndex: number, szClass: string): number;
/** find_ent_in_sphere(anystart_from_ent, const Floatorigin[], Floatradius) */
export declare function find_ent_in_sphere(start_from_ent: number, origin: number[], radius: number): number;
/** find_plugin_byfile(const anyfilename[], anyignoreCase) */
export declare function find_plugin_byfile(filename: string, ignoreCase?: number): number;
/** aroundent, _lookforclassname: pointer, radius, entlist: pointer, maxents, origin: pointer */
export declare function find_sphere_class(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32): i32;
/** float(anyvalue) */
export declare function float_(value: number): number;
/** float_to_str(Floatfl, anystring[], anylen) */
export declare function float_to_str(fl: number): string;
/** floatabs(Floatvalue) */
export declare function floatabs(value: number): number;
/** floatacos(Floatangle, anglemoderadix) */
export declare function floatacos(angle: number, radix: number): number;
/** floatadd(Floatdividend, Floatdivisor) */
export declare function floatadd(dividend: number, divisor: number): number;
/** floatasin(Floatangle, anglemoderadix) */
export declare function floatasin(angle: number, radix: number): number;
/** floatatan(Floatangle, anglemoderadix) */
export declare function floatatan(angle: number, radix: number): number;
/** floatatan2(Floatx, Floaty, anglemoderadix) */
export declare function floatatan2(x: number, y: number, radix: number): number;
/** floatcmp(FloatfOne, FloatfTwo) */
export declare function floatcmp(fOne: number, fTwo: number): number;
/** floatcos(Floatvalue, anglemodemode) */
export declare function floatcos(value: number, mode?: number): number;
/** floatcosh(Floatangle, anglemodemode) */
export declare function floatcosh(angle: number, mode?: number): number;
/** floatdiv(Floatdividend, Floatdivisor) */
export declare function floatdiv(dividend: number, divisor: number): number;
/** floatfract(Floatvalue) */
export declare function floatfract(value: number): number;
/** floatlog(Floatvalue, Floatbase) */
export declare function floatlog(value: number, base?: number): number;
/** floatmul(Floatoper1, Floatoper2) */
export declare function floatmul(oper1: number, oper2: number): number;
/** floatpower(Floatvalue, Floatexponent) */
export declare function floatpower(value: number, exponent: number): number;
/** floatround(Floatvalue, floatround_methodmethod) */
export declare function floatround(value: number, method?: number): number;
/** floatsin(Floatvalue, anglemodemode) */
export declare function floatsin(value: number, mode?: number): number;
/** floatsinh(Floatangle, anglemodemode) */
export declare function floatsinh(angle: number, mode?: number): number;
/** floatsqroot(Floatvalue) */
export declare function floatsqroot(value: number): number;
/** floatstr(const anystring[]) */
export declare function floatstr(string_: string): number;
/** floatsub(Floatoper1, Floatoper2) */
export declare function floatsub(oper1: number, oper2: number): number;
/** floattan(Floatvalue, anglemodemode) */
export declare function floattan(value: number, mode?: number): number;
/** floattanh(Floatangle, anglemodemode) */
export declare function floattanh(angle: number, mode?: number): number;
/** fopen(const anyfilename[], const anymode[], booluse_valve_fs, const anyvalve_path_id[]) */
export declare function fopen(filename: string, mode: string, use_valve_fs?: boolean, valve_path_id?: string): number;
/** force_unmodified(anyforce_type, const anymins[], const anymaxs[], const anyfilename[]) */
export declare function force_unmodified(force_type: number, mins: number[], maxs: number[], filename: string): number;
/** force_use(anyentUsed, anyentUser) */
export declare function force_use(entUsed: number, entUser: number): number;
/** format_args(anyoutput[], anylen, anypos) */
export declare function format_args(pos?: number): string;
/** format_time(anyoutput[], anylen, const anyformat[], anytime) */
export declare function format_time(format: string, time?: number): string;
/** fputc(anyfile, anydata) */
export declare function fputc(file: number, data: number): number;
/** fputs(anyfile, const anytext[], boolnull_term) */
export declare function fputs(file: number, text: string, null_term?: boolean): number;
/** fread(anyfile, anydata, anymode) */
export declare function fread(file: number, data: number, mode: number): number;
/** file, data: pointer, blocks, mode */
export declare function fread_blocks(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** file, stream: pointer, blocksize, blocks */
export declare function fread_raw(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** FreeHamItemInfo(anyitemInfo_handle) */
export declare function FreeHamItemInfo(itemInfo_handle: number): number;
/** fseek(anyfile, anyposition, anystart) */
export declare function fseek(file: number, position: number, start: number): number;
/** ftell(anyfile) */
export declare function ftell(file: number): number;
/** funcidx(const anyname[]) */
export declare function funcidx(name: string): number;
/** fungetc(anyfile, anydata) */
export declare function fungetc(file: number, data: number): number;
/** fwrite(anyfile, anydata, anymode) */
export declare function fwrite(file: number, data: number, mode: number): number;
/** fwrite_blocks(anyfile, const anydata[], anyblocks, anymode) */
export declare function fwrite_blocks(file: number, data: string, blocks: number, mode: number): number;
/** fwrite_raw(anyfile, const anystream[], anyblocks, anymode) */
export declare function fwrite_raw(file: number, stream: string, blocks: number, mode: number): number;
/** GameConfGetAddress(GameConfighandle, const anyname[]) */
export declare function GameConfGetAddress(handle: number, name: string): number;
/** GameConfGetClassOffset(GameConfighandle, const anyclassname[], const anykey[]) */
export declare function GameConfGetClassOffset(handle: number, classname: string, key: string): number;
/** GameConfGetKeyValue(GameConfighandle, const anykey[], anybuffer[], anymaxlen) */
export declare function GameConfGetKeyValue(handle: number, key: string): string;
/** GameConfGetOffset(GameConfighandle, const anykey[]) */
export declare function GameConfGetOffset(handle: number, key: string): number;
/** get_addr_val(anyaddr) */
export declare function get_addr_val(addr: number): number;
/** get_amxx_verstring(anybuffer[], anylength) */
export declare function get_amxx_verstring(): string;
/** param, dest: pointer, size */
export declare function get_array(a0: i32, a1: i32, a2: i32): i32;
/** get_array_f(anyparam, Floatdest[], anysize) */
export declare function get_array_f(param: number, dest: number[], size: number): number;
/** get_char_bytes(const anysource[]) */
export declare function get_char_bytes(source: string): number;
/** index, command: pointer, len1, flags: pointer, info: pointer, len2, flag, info_ml: pointer */
export declare function get_clcmd(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_clcmdsnum(anyflag) */
export declare function get_clcmdsnum(flag: number): number;
/** get_client_listen(anyreceiver, anysender) */
export declare function get_client_listen(receiver: number, sender: number): number;
/** index, cmd: pointer, len1, flags: pointer, info: pointer, len2, flag, id, info_ml: pointer */
export declare function get_concmd(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32, a8: i32): i32;
/** get_concmd_plid(anycid, anyflag_mask, anyid_type) */
export declare function get_concmd_plid(cid: number, flag_mask: number, id_type: number): number;
/** get_concmdsnum(anyflag, anyid) */
export declare function get_concmdsnum(flag: number, id?: number): number;
/** get_cvar_flags(const anycvar[]) */
export declare function get_cvar_flags(cvar: string): number;
/** get_cvar_float(const anycvarname[]) */
export declare function get_cvar_float(cvarname: string): number;
/** get_cvar_num(const anycvarname[]) */
export declare function get_cvar_num(cvarname: string): number;
/** get_cvar_pointer(const anycvar[]) */
export declare function get_cvar_pointer(cvar: string): number;
/** get_cvar_string(const anycvarname[], anyoutput[], anyiLen) */
export declare function get_cvar_string(cvarname: string): string;
/** get_decal_index(const anyszDecalName[]) */
export declare function get_decal_index(szDecalName: string): number;
/** get_distance(const anyorigin1[], const anyorigin2[]) */
export declare function get_distance(origin1: number[], origin2: number[]): number;
/** get_distance_f(const FloatOrigin1[], const FloatOrigin2[]) */
export declare function get_distance_f(Origin1: number[], Origin2: number[]): number;
/** get_flags(anyflags, anyoutput[], anylen) */
export declare function get_flags(flags: number): string;
/** get_float_byref(anyparam) */
export declare function get_float_byref(param: number): number;
/** get_func_id(const anyfuncName[], anypluginId) */
export declare function get_func_id(funcName: string, pluginId?: number): number;
/** get_gametime() */
export declare function get_gametime(): number;
/** get_global_edict(anyvariable) */
export declare function get_global_edict(variable: number): number;
/** get_global_edict2(anyvariable) */
export declare function get_global_edict2(variable: number): number;
/** get_global_float(anyvariable) */
export declare function get_global_float(variable: number): number;
/** get_global_int(anyvariable) */
export declare function get_global_int(variable: number): number;
/** get_global_string(anyvariable, anystring[], anymaxlen) */
export declare function get_global_string(variable: number): string;
/** get_global_vector(anyvariable, Floatvector[]) */
export declare function get_global_vector(variable: number, vector: number[]): number;
/** get_grenade_id(anyid, anymodel[], anylen, anygrenadeid) */
export declare function get_grenade_id(id: number, grenadeid?: number): string;
/** get_info_keybuffer(anyid, anybuffer[], anylength) */
export declare function get_info_keybuffer(id: number): string;
/** pbuffer, key: pointer, value: pointer, maxlen */
export declare function get_key_value(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** pbuffer, output: pointer, maxlen */
export declare function get_key_value_buffer(a0: i32, a1: i32, a2: i32): i32;
/** get_keyvalue(anyentity, const anyszKey[], anyvalue[], anymaxLength) */
export declare function get_keyvalue(entity: number, szKey: string): string;
/** get_lang(anyid, anyname[]) */
export declare function get_lang(id: number, name: number[]): number;
/** get_langsnum() */
export declare function get_langsnum(): number;
/** get_localinfo(const anyinfo[], anyoutput[], anylen) */
export declare function get_localinfo(info: string): string;
/** get_mapname(anyname[], anylen) */
export declare function get_mapname(): string;
/** get_maxplayers() */
export declare function get_maxplayers(): number;
/** get_modname(anyname[], anylen) */
export declare function get_modname(): string;
/** id, name: pointer, nameLen, author: pointer, authorLen, version: pointer, versionLen, status: pointer */
export declare function get_module(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_modulesnum() */
export declare function get_modulesnum(): number;
/** get_msg_arg_float(anyargn) */
export declare function get_msg_arg_float(argn: number): number;
/** get_msg_arg_int(anyargn) */
export declare function get_msg_arg_int(argn: number): number;
/** get_msg_arg_string(anyargn, anyszReturn[], anyiLength) */
export declare function get_msg_arg_string(argn: number): string;
/** get_msg_args() */
export declare function get_msg_args(): number;
/** get_msg_argtype(anyargn) */
export declare function get_msg_argtype(argn: number): number;
/** get_msg_block(anyiMessage) */
export declare function get_msg_block(iMessage: number): number;
/** get_msg_origin(const Float_Origin[]) */
export declare function get_msg_origin(_Origin: number[]): number;
/** get_param(anyparam) */
export declare function get_param(param: number): number;
/** get_param_byref(anyparam) */
export declare function get_param_byref(param: number): number;
/** get_param_f(anyparam) */
export declare function get_param_f(param: number): number;
/** get_pcvar_bool(anypcvar) */
export declare function get_pcvar_bool(pcvar: number): boolean;
/** pcvar, type, value: pointer */
export declare function get_pcvar_bounds(a0: i32, a1: i32, a2: i32): i32;
/** get_pcvar_flags(anypcvar) */
export declare function get_pcvar_flags(pcvar: number): number;
/** get_pcvar_float(anypcvar) */
export declare function get_pcvar_float(pcvar: number): number;
/** get_pcvar_num(anypcvar) */
export declare function get_pcvar_num(pcvar: number): number;
/** get_pcvar_string(anypcvar, anystring[], anymaxlen) */
export declare function get_pcvar_string(pcvar: number): string;
/** get_pdata_cbase(anyid, anyoffset, anylinuxdiff, anymacdiff) */
export declare function get_pdata_cbase(id: number, offset: number, linuxdiff?: number, macdiff?: number): number;
/** get_pdata_cbase_safe(anyid, anyoffset, anylinuxdiff, anymacdiff) */
export declare function get_pdata_cbase_safe(id: number, offset: number, linuxdiff?: number, macdiff?: number): number;
/** players: pointer, num: pointer, flags: pointer, team: pointer */
export declare function get_players(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** get_playersnum(anyflag) */
export declare function get_playersnum(flag?: number): number;
/** get_plugin(anyindex, anyfilename[], anylen1, anyname[], anylen2, anyversion[], anylen3, anyauthor[], anylen4, anystatus[], anylen5, anyurl[], anylen6, anydesc[], anylen7) */
export declare function get_plugin(index: number, filename?: string, len1?: number, name?: string, len2?: number, version?: string, len3?: number, author?: string, len4?: number, status?: string, len5?: number, url?: string, len6?: number, desc?: string, len7?: number): number;
/** num, name: pointer, namelen, flags: pointer, plugin_id: pointer, pcvar_handle: pointer, description: pointer, desc_len */
export declare function get_plugins_cvar(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_plugins_cvarsnum() */
export declare function get_plugins_cvarsnum(): number;
/** get_pluginsnum() */
export declare function get_pluginsnum(): number;
/** get_rebuy(const RebuyHandlerebuyhandle, RebuyStructmember) */
export declare function get_rebuy(rebuyhandle: number, member: number): number;
/** get_speak(anyiIndex) */
export declare function get_speak(iIndex: number): number;
/** index, server_cmd: pointer, len1, flags: pointer, info: pointer, len2, flag, info_ml: pointer */
export declare function get_srvcmd(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32, a7: i32): i32;
/** get_srvcmdsnum(anyflag) */
export declare function get_srvcmdsnum(flag: number): number;
/** get_string(anyparam, anydest[], anymaxlen) */
export declare function get_string(param: number): string;
/** get_systime(anyoffset) */
export declare function get_systime(offset?: number): number;
/** get_time(const anyformat[], anyoutput[], anylen) */
export declare function get_time(format: string): string;
/** get_timeleft() */
export declare function get_timeleft(): number;
/** get_user_aiming(anyindex, anyid, anybody, anydist) */
export declare function get_user_aiming(index: number, id: number, body?: number, dist?: number): number;
/** get_user_ammo(anyindex, anyweapon, anyclip, anyammo) */
export declare function get_user_ammo(index: number, weapon: number, clip: number, ammo: number): number;
/** get_user_armor(anyindex) */
export declare function get_user_armor(index: number): number;
/** get_user_authid(anyindex, anyauthid[], anylen) */
export declare function get_user_authid(index: number): string;
/** get_user_deaths(anyindex) */
export declare function get_user_deaths(index: number): number;
/** get_user_flags(anyindex, anyid) */
export declare function get_user_flags(index: number, id?: number): number;
/** get_user_footsteps(anyindex) */
export declare function get_user_footsteps(index: number): number;
/** get_user_frags(anyindex) */
export declare function get_user_frags(index: number): number;
/** get_user_godmode(anyindex) */
export declare function get_user_godmode(index: number): number;
/** get_user_gravity(anyindex) */
export declare function get_user_gravity(index: number): number;
/** get_user_health(anyindex) */
export declare function get_user_health(index: number): number;
/** get_user_hitzones(anyindex, anytarget) */
export declare function get_user_hitzones(index: number, target: number): number;
/** get_user_index(const anyname[]) */
export declare function get_user_index(name: string): number;
/** get_user_info(anyindex, const anyinfo[], anyoutput[], anylen) */
export declare function get_user_info(index: number, info: string): string;
/** get_user_ip(anyindex, anyip[], anylen, anywithout_port) */
export declare function get_user_ip(index: number, without_port?: number): string;
/** get_user_maxspeed(anyindex) */
export declare function get_user_maxspeed(index: number): number;
/** get_user_menu(anyindex, anyid, anykeys) */
export declare function get_user_menu(index: number, id: number, keys: number): number;
/** get_user_msgid(const anyname[]) */
export declare function get_user_msgid(name: string): number;
/** get_user_msgname(anymsgid, anyname[], anylen) */
export declare function get_user_msgname(msgid: number): string;
/** get_user_name(anyindex, anyname[], anylen) */
export declare function get_user_name(index: number): string;
/** get_user_noclip(anyindex) */
export declare function get_user_noclip(index: number): number;
/** get_user_origin(anyindex, anyorigin[], anymode) */
export declare function get_user_origin(index: number, origin: number[], mode?: number): number;
/** get_user_ping(anyindex, anyping, anyloss) */
export declare function get_user_ping(index: number, ping: number, loss: number): number;
/** get_user_rendering(anyindex, anyfx, anyr, anyg, anyb, anyrender, anyamount) */
export declare function get_user_rendering(index: number, fx?: number, r?: number, g?: number, b?: number, render?: number, amount?: number): number;
/** get_user_team(anyindex, anyteam[], anylen) */
export declare function get_user_team(index: number, team?: string, len?: number): number;
/** get_user_time(anyindex, anyflag) */
export declare function get_user_time(index: number, flag?: number): number;
/** get_user_userid(anyindex) */
export declare function get_user_userid(index: number): number;
/** get_user_weapon(anyindex, anyclip, anyammo) */
export declare function get_user_weapon(index: number, clip?: number, ammo?: number): number;
/** index, weapons: pointer, num: pointer */
export declare function get_user_weapons(a0: i32, a1: i32, a2: i32): i32;
/** get_vaultdata(const anykey[], anydata[], anylen) */
export declare function get_vaultdata(key: string, data?: string, len?: number): number;
/** get_viewent(const anyindex) */
export declare function get_viewent(index: number): number;
/** get_weaponid(const anyname[]) */
export declare function get_weaponid(name: string): number;
/** get_weaponname(anyid, anyweapon[], anylen) */
export declare function get_weaponname(id: number): string;
/** get_xvar_float(anyid) */
export declare function get_xvar_float(id: number): number;
/** get_xvar_id(const anyname[]) */
export declare function get_xvar_id(name: string): number;
/** get_xvar_num(anyid) */
export declare function get_xvar_num(id: number): number;
/** getarg(anyarg, anyindex) */
export declare function getarg(arg: number, index?: number): number;
/** GetAttachment(const anyentity, const anyattachment, FloatvecOrigin[], FloatvecAngles[]) */
export declare function GetAttachment(entity: number, attachment: number, vecOrigin: number[], vecAngles?: number[]): number;
/** GetBodygroup(const anyentity, const anygroup) */
export declare function GetBodygroup(entity: number, group: number): number;
/** GetBonePosition(const anyentity, const anybone, FloatvecOrigin[], FloatvecAngles[]) */
export declare function GetBonePosition(entity: number, bone: number, vecOrigin: number[], vecAngles?: number[]): number;
/** GetCurrentHookChainHandle() */
export declare function GetCurrentHookChainHandle(): number;
/** GetFileTime(const anyfile[], FileTimeTypetmode) */
export declare function GetFileTime(file: string, tmode: number): number;
/** GetGrenadeType(const anyentityIndex) */
export declare function GetGrenadeType(entityIndex: number): number;
/** output: pointer */
export declare function GetHamReturnEntity(a0: i32): i32;
/** output: pointer */
export declare function GetHamReturnFloat(a0: i32): i32;
/** output: pointer */
export declare function GetHamReturnInteger(a0: i32): i32;
/** GetHamReturnStatus() */
export declare function GetHamReturnStatus(): number;
/** GetHamReturnString(anyoutput[], anysize) */
export declare function GetHamReturnString(): string;
/** GetHamReturnVector(Floatoutput[]) */
export declare function GetHamReturnVector(output: number[]): number;
/** GetLangTransKey(const anykey[]) */
export declare function GetLangTransKey(key: string): number;
/** GetMessageArgsNum() */
export declare function GetMessageArgsNum(): number;
/** GetMessageArgType(const anynumber) */
export declare function GetMessageArgType(number_: number): number;
/** GetMessageBlock(const anymsgid) */
export declare function GetMessageBlock(msgid: number): number;
/** output: pointer */
export declare function GetOrigHamReturnEntity(a0: i32): i32;
/** output: pointer */
export declare function GetOrigHamReturnFloat(a0: i32): i32;
/** output: pointer */
export declare function GetOrigHamReturnInteger(a0: i32): i32;
/** GetOrigHamReturnString(anyoutput[], anysize) */
export declare function GetOrigHamReturnString(): string;
/** GetOrigHamReturnVector(Floatoutput[]) */
export declare function GetOrigHamReturnVector(output: number[]): number;
/** GetPackPosition(DataPackpack) */
export declare function GetPackPosition(pack: number): number;
/** GetSequenceInfo(const anyentity, anypiFlags, FloatpflFrameRate, FloatpflGroundSpeed) */
export declare function GetSequenceInfo(entity: number, piFlags: number, pflFrameRate: number, pflGroundSpeed: number): boolean;
/** give_item(anyindex, const anyitem[]) */
export declare function give_item(index: number, item: string): number;
/** halflife_time() */
export declare function halflife_time(): number;
/** has_map_ent_class(const anyclassname[]) */
export declare function has_map_ent_class(classname: string): boolean;
/** has_rechecker() */
export declare function has_rechecker(): boolean;
/** has_reunion() */
export declare function has_reunion(): boolean;
/** has_vtc() */
export declare function has_vtc(): boolean;
/** hash_file(const anyfileName[], const HashTypetype, anyoutput[], const anyoutputSize) */
export declare function hash_file(fileName: string, type_: number): string;
/** hash_string(const anystring[], const HashTypetype, anyoutput[], const anyoutputSize) */
export declare function hash_string(string_: string, type_: number): string;
/** heapspace() */
export declare function heapspace(): number;
/** hook_cvar_change(anypcvar, const anycallback[]) */
export declare function hook_cvar_change(pcvar: number, callback: string): number;
/** INI_CreateParser() */
export declare function INI_CreateParser(): number;
/** INI_DestroyParser(INIParserhandle) */
export declare function INI_DestroyParser(handle: number): number;
/** INI_ParseFile(INIParserhandle, const anyfile[], anyline, anycol, anydata) */
export declare function INI_ParseFile(handle: number, file: string, line?: number, col?: number, data?: number): boolean;
/** INI_SetParseEnd(INIParserhandle, const anyfunc[]) */
export declare function INI_SetParseEnd(handle: number, func: string): number;
/** INI_SetParseStart(INIParserhandle, const anyfunc[]) */
export declare function INI_SetParseStart(handle: number, func: string): number;
/** INI_SetRawLine(INIParserhandle, const anyfunc[]) */
export declare function INI_SetRawLine(handle: number, func: string): number;
/** INI_SetReaders(INIParsersmc, const anykvFunc[], const anynsFunc[]) */
export declare function INI_SetReaders(smc: number, kvFunc: string, nsFunc?: string): number;
/** int3() */
export declare function int3(): number;
/** is_amd64_server() */
export declare function is_amd64_server(): number;
/** is_char_lower(anych) */
export declare function is_char_lower(ch: number): boolean;
/** is_char_mb(anych) */
export declare function is_char_mb(ch: number): number;
/** is_char_upper(anych) */
export declare function is_char_upper(ch: number): boolean;
/** is_dedicated_server() */
export declare function is_dedicated_server(): number;
/** is_entity(const anyentityIndex) */
export declare function is_entity(entityIndex: number): boolean;
/** is_in_viewcone(anyentity, const Floatorigin[], anyuse3d) */
export declare function is_in_viewcone(entity: number, origin: number[], use3d?: number): number;
/** is_jit_enabled() */
export declare function is_jit_enabled(): number;
/** is_linux_server() */
export declare function is_linux_server(): number;
/** is_map_valid(const anymapname[]) */
export declare function is_map_valid(mapname: string): number;
/** is_module_loaded(const anyname[]) */
export declare function is_module_loaded(name: string): number;
/** is_plugin_loaded(const anyname[], boolusefilename) */
export declare function is_plugin_loaded(name: string, usefilename?: boolean): number;
/** is_regamedll() */
export declare function is_regamedll(): boolean;
/** is_rehlds() */
export declare function is_rehlds(): boolean;
/** input: pointer, input_size, flags, output_size: pointer */
export declare function is_string_category(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** is_user_alive(anyindex) */
export declare function is_user_alive(index: number): number;
/** is_user_authorized(anyindex) */
export declare function is_user_authorized(index: number): number;
/** is_user_bot(anyindex) */
export declare function is_user_bot(index: number): number;
/** is_user_connected(anyindex) */
export declare function is_user_connected(index: number): number;
/** is_user_connecting(anyindex) */
export declare function is_user_connecting(index: number): number;
/** is_user_hltv(anyindex) */
export declare function is_user_hltv(index: number): number;
/** is_valid_ent(anyiIndex) */
export declare function is_valid_ent(iIndex: number): number;
/** is_visible(anyentity, anytarget) */
export declare function is_visible(entity: number, target: number): number;
/** isalnum(anych) */
export declare function isalnum(ch: number): number;
/** isalpha(anych) */
export declare function isalpha(ch: number): number;
/** isdigit(anych) */
export declare function isdigit(ch: number): number;
/** IsHamValid(Hamfunction) */
export declare function IsHamValid(function_: number): boolean;
/** IsMessageDataModified(MsgDataTypetype, const anynumber) */
export declare function IsMessageDataModified(type_?: number, number_?: number): boolean;
/** IsPackEnded(DataPackpack) */
export declare function IsPackEnded(pack: number): boolean;
/** IsReapiHookOriginalWasCalled(ReAPIFuncfunction_id) */
export declare function IsReapiHookOriginalWasCalled(function_id: number): boolean;
/** isspace(anych) */
export declare function isspace(ch: number): number;
/** IsStackEmpty(Stackhandle) */
export declare function IsStackEmpty(handle: number): boolean;
/** lang_exists(const anyname[]) */
export declare function lang_exists(name: string): number;
/** LibraryExists(const anylibrary[], LibTypetype) */
export declare function LibraryExists(library: string, type_: number): number;
/** file: pointer, buffer: pointer, maxlength, length: pointer */
export declare function LoadFileForMe(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** LoadGameConfigFile(const anyfile[]) */
export declare function LoadGameConfigFile(file: string): number;
/** LookupLangKey(anyOutput[], anyOutputSize, const anyKey[], const anyid) */
export declare function LookupLangKey(Key: string, id: number): string;
/** max(anyvalue1, anyvalue2) */
export declare function max(value1: number, value2: number): number;
/** mb_strtolower(anystring[], anymaxlength) */
export declare function mb_strtolower(): string;
/** mb_strtotitle(anystring[], anymaxlength) */
export declare function mb_strtotitle(): string;
/** mb_strtoupper(anystring[], anymaxlength) */
export declare function mb_strtoupper(): string;
/** mb_ucfirst(anystring[], anymaxlength) */
export declare function mb_ucfirst(): string;
/** mc_add_fixed_menu_item(const anysection[], anyslot, const anyname[], const anyplaceholder[], const anyaction[], const anycondition[], const anyrestriction[], anyemptyBefore, anyemptyAfter) */
export declare function mc_add_fixed_menu_item(section: string, slot: number, name: string, placeholder?: string, action?: string, condition?: string, restriction?: string, emptyBefore?: number, emptyAfter?: number): number;
/** mc_add_list_text(ArrayaItems, const anytext[], boolcentered) */
export declare function mc_add_list_text(aItems: number, text: string, centered?: boolean): number;
/** mc_add_menu_item(const anysection[], const anyname[], const anyplaceholder[], const anycondition[], const anyaction[], const anyrestriction[], const anyrestrictMsg[], anyiPosition, anyemptyBefore, anyemptyAfter) */
export declare function mc_add_menu_item(section: string, name: string, placeholder?: string, condition?: string, action?: string, restriction?: string, restrictMsg?: string, iPosition?: number, emptyBefore?: number, emptyAfter?: number): number;
/** mc_cancel_menu_timer(const anysection[]) */
export declare function mc_cancel_menu_timer(section: string): number;
/** mc_clear_menu_items(const anysection[]) */
export declare function mc_clear_menu_items(section: string): number;
/** mc_create_menu(const anysection[], const anytitle[]) */
export declare function mc_create_menu(section: string, title: string): number;
/** mc_get_active_menu(anyid) */
export declare function mc_get_active_menu(id: number): number;
/** mc_get_menu_property_string(anymenuIdx, anyproperty, anyvalue[], anylen) */
export declare function mc_get_menu_property_string(menuIdx: number, property: number): string;
/** mc_hide_menu(anyid) */
export declare function mc_hide_menu(id: number): number;
/** mc_is_menu_locked(anyid) */
export declare function mc_is_menu_locked(id: number): boolean;
/** mc_lock_menu(anyid, boollock) */
export declare function mc_lock_menu(id: number, lock?: boolean): number;
/** mc_notify_condition_changed(const anycondition[]) */
export declare function mc_notify_condition_changed(condition: string): number;
/** mc_refresh_menu(const anysections[]) */
export declare function mc_refresh_menu(sections: string): number;
/** mc_register_action(const anyname[], const anycallback[], boolisCritical) */
export declare function mc_register_action(name: string, callback: string, isCritical?: boolean): number;
/** mc_register_action_condition(const anymenuSection[], const anyactionName[], const anycallback[]) */
export declare function mc_register_action_condition(menuSection: string, actionName: string, callback: string): number;
/** mc_register_condition(const anyname[], const anycallback[]) */
export declare function mc_register_condition(name: string, callback: string): number;
/** mc_register_condition_filter(const anycondition[], const anycallback[]) */
export declare function mc_register_condition_filter(condition: string, callback: string): number;
/** mc_register_list_data_source(const anymenuName[], const anycallback[]) */
export declare function mc_register_list_data_source(menuName: string, callback: string): number;
/** mc_register_menu(const anysection[]) */
export declare function mc_register_menu(section: string): number;
/** mc_register_menu_close_callback(const anycallback[]) */
export declare function mc_register_menu_close_callback(callback: string): number;
/** mc_register_menu_open_callback(const anycallback[]) */
export declare function mc_register_menu_open_callback(callback: string): number;
/** mc_register_placeholder(const anyname[], const anycallback[]) */
export declare function mc_register_placeholder(name: string, callback: string): number;
/** mc_register_restriction(const anyname[], const anycallback[], const anymessage[]) */
export declare function mc_register_restriction(name: string, callback: string, message?: string): number;
/** mc_register_show_filter(const anycallback[]) */
export declare function mc_register_show_filter(callback: string): number;
/** mc_set_menu_page(anyid, anypage) */
export declare function mc_set_menu_page(id: number, page: number): number;
/** mc_set_menu_property(const anysection[], anyproperty, anyvalue) */
export declare function mc_set_menu_property(section: string, property: number, value: number): number;
/** mc_set_menu_property_string(const anysection[], anyproperty, const anyvalue[]) */
export declare function mc_set_menu_property_string(section: string, property: number, value: string): number;
/** mc_set_menu_timer(const anysection[], anytime) */
export declare function mc_set_menu_timer(section: string, time: number): number;
/** mc_show_menu(anyid, const anysection[], anytime, anytargetId, boolresetHistory, boolforceOpen, boolignoreHistory) */
export declare function mc_show_menu(id: number, section: string, time?: number, targetId?: number, resetHistory?: boolean, forceOpen?: boolean, ignoreHistory?: boolean): number;
/** md5(const anyszString[], anymd5buffer[]) */
export declare function md5(szString: string, md5buffer: number[]): number;
/** md5_file(const anyfile[], anymd5buffer[]) */
export declare function md5_file(file: string, md5buffer: number[]): number;
/** menu_addblank(anymenu, anyslot) */
export declare function menu_addblank(menu: number, slot?: number): number;
/** menu_addblank2(anymenu) */
export declare function menu_addblank2(menu: number): number;
/** menu_additem(anymenu, const anyname[], const anyinfo[], anypaccess, anycallback) */
export declare function menu_additem(menu: number, name: string, info?: string, paccess?: number, callback?: number): number;
/** menu_addtext(anymenu, const anytext[], anyslot) */
export declare function menu_addtext(menu: number, text: string, slot?: number): number;
/** menu_addtext2(anymenu, const anytext[]) */
export declare function menu_addtext2(menu: number, text: string): number;
/** menu_cancel(anyplayer) */
export declare function menu_cancel(player: number): number;
/** menu_create(const anytitle[], const anyhandler[], boolml) */
export declare function menu_create(title: string, handler: string, ml?: boolean): number;
/** menu_destroy(anymenu) */
export declare function menu_destroy(menu: number): number;
/** menu_display(anyid, anymenu, anypage, anytime) */
export declare function menu_display(id: number, menu: number, page?: number, time?: number): number;
/** menu_find_id(anymenu, anypage, anykey) */
export declare function menu_find_id(menu: number, page: number, key: number): number;
/** menu_item_getinfo(anymenu, anyitem, anyaccess, anyinfo[], anyinfolen, anyname[], anynamelen, anycallback) */
export declare function menu_item_getinfo(menu: number, item: number, access?: number, info?: string, infolen?: number, name?: string, namelen?: number, callback?: number): number;
/** menu_item_setaccess(anymenu, anyitem, anyaccess) */
export declare function menu_item_setaccess(menu: number, item: number, access?: number): number;
/** menu_item_setcall(anymenu, anyitem, anycallback) */
export declare function menu_item_setcall(menu: number, item: number, callback?: number): number;
/** menu_item_setcmd(anymenu, anyitem, const anyinfo[]) */
export declare function menu_item_setcmd(menu: number, item: number, info: string): number;
/** menu_item_setname(anymenu, anyitem, const anyname[]) */
export declare function menu_item_setname(menu: number, item: number, name: string): number;
/** menu_items(anymenu) */
export declare function menu_items(menu: number): number;
/** menu_makecallback(const anyfunction[]) */
export declare function menu_makecallback(function_: string): number;
/** menu_pages(anymenu) */
export declare function menu_pages(menu: number): number;
/** message_begin(anydest, anymsg_type, const anyorigin[], anyplayer) */
export declare function message_begin(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** message_begin_f(anydest, anymsg_type, const Floatorigin[], anyplayer) */
export declare function message_begin_f(dest: number, msg_type: number, origin?: number[], player?: number): number;
/** message_end() */
export declare function message_end(): number;
/** min(anyvalue1, anyvalue2) */
export declare function min(value1: number, value2: number): number;
/** mkdir(const anydirname[], anymode, booluse_valve_fs, const anyvalve_path_id[]) */
export declare function mkdir(dirname: string, mode: number, use_valve_fs?: boolean, valve_path_id?: string): number;
/** module_exists(const anylogtag[]) */
export declare function module_exists(logtag: string): number;
/** next_file(anydirh, anybuffer[], anylength, FileTypetype) */
export declare function next_file(dirh: number, type_?: number): string;
/** next_hudchannel(anyplayer) */
export declare function next_hudchannel(player: number): number;
/** num_to_str(anynum, anystring[], anylen) */
export declare function num_to_str(num: number): string;
/** num_to_word(anynum, anyoutput[], anylen) */
export declare function num_to_word(num: number): string;
/** numargs() */
export declare function numargs(): number;
/** nvault_close(anyvault) */
export declare function nvault_close(vault: number): number;
/** nvault_lookup(anyvault, const anykey[], anyvalue[], anymaxlen, anytimestamp) */
export declare function nvault_lookup(vault: number, key: string, timestamp: number): string;
/** nvault_open(const anyname[]) */
export declare function nvault_open(name: string): number;
/** nvault_prune(anyvault, anystart, anyend) */
export declare function nvault_prune(vault: number, start: number, end: number): number;
/** nvault_pset(anyvault, const anykey[], const anyvalue[]) */
export declare function nvault_pset(vault: number, key: string, value: string): number;
/** nvault_remove(anyvault, const anykey[]) */
export declare function nvault_remove(vault: number, key: string): number;
/** nvault_set(anyvault, const anykey[], const anyvalue[]) */
export declare function nvault_set(vault: number, key: string, value: string): number;
/** nvault_touch(anyvault, const anykey[], anytimestamp) */
export declare function nvault_touch(vault: number, key: string, timestamp?: number): number;
/** open_dir(const anydir[], anyfirstfile[], anylength, FileTypetype, booluse_valve_fs, const anyvalve_path_id[]) */
export declare function open_dir(dir: string, type_?: number, use_valve_fs?: boolean, valve_path_id?: string): string;
/** param_convert(anynum) */
export declare function param_convert(num: number): number;
/** parse_loguser(const anytext[], anyname[], anynlen, anyuserid, anyauthid[], anyalen, anyteam[], anytlen) */
export declare function parse_loguser(text: string, userid?: number, authid?: string, alen?: number, team?: string, tlen?: number): string;
/** parse_time(const anyinput[], const anyformat[], anytime) */
export declare function parse_time(input: string, format: string, time?: number): number;
/** pause(const anyflag[], const anyparam1[], const anyparam2[]) */
export declare function pause(flag: string, param1?: string, param2?: string): number;
/** playback_event(anyflags, anyinvoker, anyeventindex, Floatdelay, const Floatorigin[], const Floatangles[], Floatfparam1, Floatfparam2, anyiparam1, anyiparam2, anybparam1, anybparam2) */
export declare function playback_event(flags: number, invoker: number, eventindex: number, delay: number, origin: number[], angles: number[], fparam1: number, fparam2: number, iparam1: number, iparam2: number, bparam1: number, bparam2: number): number;
/** player_menu_info(anyid, anymenu, anynewmenu, anymenupage) */
export declare function player_menu_info(id: number, menu: number, newmenu: number, menupage?: number): number;
/** plugin_flags(anyhdr, anyplid) */
export declare function plugin_flags(hdr?: number, plid?: number): number;
/** point_contents(const FloatfCheckAt[]) */
export declare function point_contents(fCheckAt: number[]): number;
/** handle, buffer: pointer, size */
export declare function PopStackArray(a0: i32, a1: i32, a2: i32): i32;
/** handle, value: pointer, block, asChar */
export declare function PopStackCell(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** handle, buffer: pointer, maxlength, written: pointer */
export declare function PopStackString(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** power(anyvalue, anyexponent) */
export declare function power(value: number, exponent: number): number;
/** precache_generic(const anyszFile[]) */
export declare function precache_generic(szFile: string): number;
/** precache_model(const anyname[]) */
export declare function precache_model(name: string): number;
/** precache_sound(const anyname[]) */
export declare function precache_sound(name: string): number;
/** array: pointer, size, copyback */
export declare function PrepareArray(a0: i32, a1: i32, a2: i32): i32;
/** handle, values: pointer, size */
export declare function PushStackArray(a0: i32, a1: i32, a2: i32): i32;
/** PushStackCell(Stackhandle, anyvalue) */
export declare function PushStackCell(handle: number, value: number): number;
/** PushStackString(Stackhandle, const anyvalue[]) */
export declare function PushStackString(handle: number, value: string): number;
/** query_client_cvar(anyid, const anycvar[], const anyresultFunc[], anyparamlen, const anyparams[]) */
export declare function query_client_cvar(id: number, cvar: string, resultFunc: string, paramlen?: number, params?: string): number;
/** radius_damage(const FloatfExplodeAt[], anyiDamageMultiplier, anyiRadiusMultiplier) */
export declare function radius_damage(fExplodeAt: number[], iDamageMultiplier: number, iRadiusMultiplier: number): number;
/** random(anymax) */
export declare function random(max: number): number;
/** random_float(Floata, Floatb) */
export declare function random_float(a: number, b: number): number;
/** random_num(anya, anyb) */
export declare function random_num(a: number, b: number): number;
/** read_argc() */
export declare function read_argc(): number;
/** read_args(anyoutput[], anylen) */
export declare function read_args(): string;
/** read_argv(anyid, anyoutput[], anylen) */
export declare function read_argv(id: number): string;
/** read_argv_float(anyid) */
export declare function read_argv_float(id: number): number;
/** read_argv_int(anyid) */
export declare function read_argv_int(id: number): number;
/** read_datanum() */
export declare function read_datanum(): number;
/** read_datatype() */
export declare function read_datatype(): number;
/** dirname: pointer, pos, output: pointer, len, outlen: pointer */
export declare function read_dir(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** read_file(const anyfile[], anyline, anytext[], anylen, anytxtlen) */
export declare function read_file(file: string, line: number, txtlen?: number): string;
/** read_flags(const anyflags[]) */
export declare function read_flags(flags: string): number;
/** read_logargc() */
export declare function read_logargc(): number;
/** read_logargv(anyid, anyoutput[], anylen) */
export declare function read_logargv(id: number): string;
/** read_logdata(anyoutput[], anylen) */
export declare function read_logdata(): string;
/** ReadPackCell(DataPackpack) */
export declare function ReadPackCell(pack: number): number;
/** ReadPackFloat(DataPackpack) */
export declare function ReadPackFloat(pack: number): number;
/** ReadPackString(DataPackpack, anybuffer[], anymaxlen) */
export declare function ReadPackString(pack: number): string;
/** register_clcmd(const anyclient_cmd[], const anyfunction[], anyflags, const anyinfo[], anyFlagManager, boolinfo_ml) */
export declare function register_clcmd(client_cmd: string, function_: string, flags?: number, info?: string, FlagManager?: number, info_ml?: boolean): number;
/** register_concmd(const anycmd[], const anyfunction[], anyflags, const anyinfo[], anyFlagManager, boolinfo_ml) */
export declare function register_concmd(cmd: string, function_: string, flags?: number, info?: string, FlagManager?: number, info_ml?: boolean): number;
/** register_cvar(const anyname[], const anystring[], anyflags, Floatfvalue) */
export declare function register_cvar(name: string, string_: string, flags?: number, fvalue?: number): number;
/** register_dictionary(const anyfilename[]) */
export declare function register_dictionary(filename: string): number;
/** register_impulse(anyimpulse, const anyfunction[]) */
export declare function register_impulse(impulse: number, function_: string): number;
/** register_library(const anylibrary[]) */
export declare function register_library(library: string): number;
/** register_menucmd(anymenuid, anykeys, const anyfunction[]) */
export declare function register_menucmd(menuid: number, keys: number, function_: string): number;
/** register_menuid(const anymenu[], anyoutside) */
export declare function register_menuid(menu: string, outside?: number): number;
/** register_message(anyiMsgId, const anyszFunction[]) */
export declare function register_message(iMsgId: number, szFunction: string): number;
/** register_native(const anyname[], const anyhandler[], anystyle) */
export declare function register_native(name: string, handler: string, style?: number): number;
/** register_plugin(const anyplugin_name[], const anyversion[], const anyauthor[], const anyurl[], const anydescription[]) */
export declare function register_plugin(plugin_name: string, version: string, author: string, url?: string, description?: string): number;
/** register_srvcmd(const anyserver_cmd[], const anyfunction[], anyflags, const anyinfo[], boolinfo_ml) */
export declare function register_srvcmd(server_cmd: string, function_: string, flags?: number, info?: string, info_ml?: boolean): number;
/** register_think(const anyClassname[], const anyfunction[]) */
export declare function register_think(Classname: string, function_: string): number;
/** register_touch(const anyTouched[], const anyToucher[], const anyfunction[]) */
export declare function register_touch(Touched: string, Toucher: string, function_: string): number;
/** RegisterHam(Hamfunction, const anyEntityClass[], const anyCallback[], anyPost, boolspecialbot) */
export declare function RegisterHam(function_: number, EntityClass: string, Callback: string, Post?: number, specialbot?: boolean): number;
/** RegisterHamFromEntity(Hamfunction, anyEntityId, const anyCallback[], anyPost) */
export declare function RegisterHamFromEntity(function_: number, EntityId: number, Callback: string, Post?: number): number;
/** RegisterHookChain(ReAPIFuncfunction_id, const anycallback[], anypost) */
export declare function RegisterHookChain(function_id: number, callback: string, post?: number): number;
/** RegisterMessage(const anymsg_id, const anycallback[], anypost) */
export declare function RegisterMessage(msg_id: number, callback: string, post?: number): number;
/** remove_cvar_flags(const anycvar[], anyflags) */
export declare function remove_cvar_flags(cvar: string, flags?: number): number;
/** remove_entity(anyiIndex) */
export declare function remove_entity(iIndex: number): number;
/** text: pointer */
export declare function remove_quotes(a0: i32): i32;
/** remove_task(anyid, anyoutside) */
export declare function remove_task(id?: number, outside?: number): number;
/** remove_user_flags(anyindex, anyflags, anyid) */
export declare function remove_user_flags(index: number, flags?: number, id?: number): number;
/** remove_vaultdata(const anykey[]) */
export declare function remove_vaultdata(key: string): number;
/** rename_file(const anyoldname[], const anynewname[], anyrelative) */
export declare function rename_file(oldname: string, newname: string, relative?: number): number;
/** replace(anytext[], anylen, const anywhat[], const anywith[]) */
export declare function replace(what: string, with_: string): string;
/** replace_string(anytext[], anymaxlength, const anysearch[], const anyreplace[], boolcaseSensitive) */
export declare function replace_string(search: string, replace: string, caseSensitive?: boolean): string;
/** text: pointer, maxlength, search: pointer, replace: pointer, searchLen, replaceLen, caseSensitive */
export declare function replace_stringex(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** RequestFrame(const anycallback[], anydata) */
export declare function RequestFrame(callback: string, data?: number): number;
/** require_module(const anymodule[]) */
export declare function require_module(module_: string): number;
/** resemiclip_get_user_mask(anyid) */
export declare function resemiclip_get_user_mask(id: number): number;
/** resemiclip_set_user_mask(anyid, anymask) */
export declare function resemiclip_set_user_mask(id: number, mask: number): number;
/** resemiclip_take_control(booltake) */
export declare function resemiclip_take_control(take: boolean): number;
/** ResetModifiedMessageData(MsgDataTypetype, const anynumber) */
export declare function ResetModifiedMessageData(type_?: number, number_?: number): boolean;
/** ResetPack(DataPackpack, boolclear) */
export declare function ResetPack(pack: number, clear?: boolean): number;
/** rg_add_account(const anyindex, anyamount, AccountSettypeSet, const boolbTrackChange) */
export declare function rg_add_account(index: number, amount: number, typeSet?: number, bTrackChange?: boolean): number;
/** rg_add_ammo_registry(const anyszAmmoname[]) */
export declare function rg_add_ammo_registry(szAmmoname: string): number;
/** rg_balance_teams() */
export declare function rg_balance_teams(): number;
/** rg_check_win_conditions() */
export declare function rg_check_win_conditions(): number;
/** rg_create_entity(const anyclassname[], const booluseHashTable) */
export declare function rg_create_entity(classname: string, useHashTable?: boolean): number;
/** rg_create_weaponbox(const anypItem, const anypPlayerOwner, const anymodelName[], Floatorigin[], Floatangles[], Floatvelocity[], FloatlifeTime, boolpackAmmo) */
export declare function rg_create_weaponbox(pItem: number, pPlayerOwner: number, modelName: string, origin: number[], angles: number[], velocity: number[], lifeTime: number, packAmmo: boolean): number;
/** rg_death_notice(const anypVictim, const anypKiller, const anypevInflictor) */
export declare function rg_death_notice(pVictim: number, pKiller: number, pevInflictor: number): number;
/** rg_decal_trace(const anyptr, DecaldecalNumber) */
export declare function rg_decal_trace(ptr: number, decalNumber: number): number;
/** rg_disappear(const anyplayer) */
export declare function rg_disappear(player: number): number;
/** rg_dmg_radius(FloatvecSrc[], const anyinflictor, const anyattacker, const FloatflDamage, const FloatflRadius, const anyiClassIgnore, const anybitsDamageType) */
export declare function rg_dmg_radius(vecSrc: number[], inflictor: number, attacker: number, flDamage: number, flRadius: number, iClassIgnore: number, bitsDamageType: number): number;
/** rg_drop_item(const anyindex, const anyitem_name[]) */
export declare function rg_drop_item(index: number, item_name: string): number;
/** rg_drop_items_by_slot(const anyindex, const InventorySlotTypeslot) */
export declare function rg_drop_items_by_slot(index: number, slot: number): number;
/** rg_emit_texture_sound(const anyptr, FloatvecSrc[], FloatvecEnd[], BulletiBulletType) */
export declare function rg_emit_texture_sound(ptr: number, vecSrc: number[], vecEnd: number[], iBulletType: number): number;
/** rg_find_ent_by_class(anystart_index, const anyclassname[], const booluseHashTable) */
export declare function rg_find_ent_by_class(start_index: number, classname: string, useHashTable?: boolean): number;
/** rg_find_ent_by_owner(anystart_index, const anyclassname[], anyowner) */
export declare function rg_find_ent_by_owner(start_index: number, classname: string, owner: number): boolean;
/** rg_find_weapon_bpack_by_name(const anyindex, const anyweapon[]) */
export declare function rg_find_weapon_bpack_by_name(index: number, weapon: string): number;
/** rg_fire_buckshots(const anyinflictor, const anyattacker, const anyshots, FloatvecSrc[], FloatvecDirShooting[], FloatvecSpread[], const FloatflDistance, const anyiTracerFreq, const anyiDamage) */
export declare function rg_fire_buckshots(inflictor: number, attacker: number, shots: number, vecSrc: number[], vecDirShooting: number[], vecSpread: number[], flDistance: number, iTracerFreq: number, iDamage: number): number;
/** rg_fire_bullets(const anyinflictor, const anyattacker, const anyshots, FloatvecSrc[], FloatvecDirShooting[], FloatvecSpread[], const FloatflDistance, const BulletiBulletType, const anyiTracerFreq, const anyiDamage) */
export declare function rg_fire_bullets(inflictor: number, attacker: number, shots: number, vecSrc: number[], vecDirShooting: number[], vecSpread: number[], flDistance: number, iBulletType: number, iTracerFreq: number, iDamage: number): number;
/** rg_get_account_rules(const RewardRulesrules_index) */
export declare function rg_get_account_rules(rules_index: number): number;
/** rg_get_can_hear_player(const anylistener, const anysender) */
export declare function rg_get_can_hear_player(listener: number, sender: number): boolean;
/** rg_get_join_team_priority() */
export declare function rg_get_join_team_priority(): number;
/** rg_get_user_ammo(const anyindex, WeaponIdTypeweapon) */
export declare function rg_get_user_ammo(index: number, weapon: number): number;
/** rg_get_user_armor(const anyindex, ArmorTypearmortype) */
export declare function rg_get_user_armor(index: number, armortype?: number): number;
/** rg_get_user_bpammo(const anyindex, WeaponIdTypeweapon) */
export declare function rg_get_user_bpammo(index: number, weapon: number): number;
/** rg_get_user_footsteps(const anyindex) */
export declare function rg_get_user_footsteps(index: number): number;
/** rg_get_weaponbox_id(const anyentity) */
export declare function rg_get_weaponbox_id(entity: number): number;
/** rg_give_custom_item(const anyindex, const anypszName[], GiveTypetype, const anyuid) */
export declare function rg_give_custom_item(index: number, pszName: string, type_?: number, uid?: number): number;
/** rg_give_default_items(const anyindex) */
export declare function rg_give_default_items(index: number): number;
/** rg_give_defusekit(const anyindex, const boolbDefusekit, const Floatcolor[], const anyicon[], const boolbFlash) */
export declare function rg_give_defusekit(index: number, bDefusekit?: boolean, color?: number[], icon?: string, bFlash?: boolean): number;
/** rg_give_item(const anyindex, const anypszName[], GiveTypetype) */
export declare function rg_give_item(index: number, pszName: string, type_?: number): number;
/** rg_give_shield(const anyindex, const boolbDeploy) */
export declare function rg_give_shield(index: number, bDeploy?: boolean): number;
/** rg_has_item_by_name(const anyindex, const anyitem[]) */
export declare function rg_has_item_by_name(index: number, item: string): boolean;
/** rg_hint_message(const anyindex, const anymessage[], Floatduration, boolbDisplayIfPlayerDead, boolbOverride) */
export declare function rg_hint_message(index: number, message: string, duration?: number, bDisplayIfPlayerDead?: boolean, bOverride?: boolean): boolean;
/** num_alive_terrorist: pointer, num_alive_ct: pointer, num_dead_terrorist: pointer, num_dead_ct: pointer */
export declare function rg_initialize_player_counts(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** rg_instant_reload_weapons(const anyindex, const anyweapon) */
export declare function rg_instant_reload_weapons(index: number, weapon?: number): number;
/** rg_internal_cmd(const anyindex, const anycmd[], const anyarg[]) */
export declare function rg_internal_cmd(index: number, cmd: string, arg?: string): number;
/** rg_is_bomb_planted() */
export declare function rg_is_bomb_planted(): boolean;
/** rg_is_player_can_respawn(const anyindex) */
export declare function rg_is_player_can_respawn(index: number): boolean;
/** rg_is_player_can_takedamage(const anyindex, const anyattacker) */
export declare function rg_is_player_can_takedamage(index: number, attacker: number): boolean;
/** rg_join_team(const anyindex, const TeamNameteam) */
export declare function rg_join_team(index: number, team: number): number;
/** rg_multidmg_add(const anyinflictor, const anyvictim, const FloatflDamage, const anybitsDamageType) */
export declare function rg_multidmg_add(inflictor: number, victim: number, flDamage: number, bitsDamageType: number): number;
/** rg_multidmg_apply(const anyinflictor, const anyattacker) */
export declare function rg_multidmg_apply(inflictor: number, attacker: number): number;
/** rg_multidmg_clear() */
export declare function rg_multidmg_clear(): number;
/** rg_plant_bomb(const anyindex, FloatvecOrigin[], FloatvecAngles[]) */
export declare function rg_plant_bomb(index: number, vecOrigin: number[], vecAngles?: number[]): number;
/** rg_player_relationship(const anyplayer, const anytarget) */
export declare function rg_player_relationship(player: number, target: number): number;
/** rg_remove_all_items(const anyindex, const boolremoveSuit) */
export declare function rg_remove_all_items(index: number, removeSuit?: boolean): number;
/** rg_remove_entity(const anypEntity) */
export declare function rg_remove_entity(pEntity: number): number;
/** rg_remove_item(const anyindex, const anyitem_name[], const boolremoveAmmo) */
export declare function rg_remove_item(index: number, item_name: string, removeAmmo?: boolean): number;
/** rg_remove_items_by_slot(const anyindex, const InventorySlotTypeslot, const boolremoveAmmo) */
export declare function rg_remove_items_by_slot(index: number, slot: number, removeAmmo?: boolean): number;
/** rg_reset_can_hear_player(const anyindex) */
export declare function rg_reset_can_hear_player(index: number): number;
/** rg_reset_maxspeed(const anyindex) */
export declare function rg_reset_maxspeed(index: number): number;
/** rg_reset_user_model(const anyindex, const boolupdate_index) */
export declare function rg_reset_user_model(index: number, update_index?: boolean): number;
/** rg_restart_round() */
export declare function rg_restart_round(): number;
/** rg_round_end(const FloattmDelay, const WinStatusst, const ScenarioEventEndRoundevent, const anymessage[], const anysentence[], const booltrigger) */
export declare function rg_round_end(tmDelay: number, st: number, event?: number, message?: string, sentence?: string, trigger?: boolean): number;
/** rg_round_respawn(const anyindex) */
export declare function rg_round_respawn(index: number): number;
/** rg_send_audio(const anyindex, const anysample[], const anypitch) */
export declare function rg_send_audio(index: number, sample: string, pitch?: number): number;
/** rg_send_bartime(const anyindex, const anyduration, const boolobserver) */
export declare function rg_send_bartime(index: number, duration: number, observer?: boolean): number;
/** rg_send_bartime2(const anyindex, const anyduration, const FloatstartPercent, const boolobserver) */
export declare function rg_send_bartime2(index: number, duration: number, startPercent: number, observer?: boolean): number;
/** rg_send_death_message(const anypKiller, const anypVictim, const anypAssister, const anypevInflictor, const anykillerWeaponName[], const DeathMessageFlagsiDeathMessageFlags, const KillRarityiRarityOfKill) */
export declare function rg_send_death_message(pKiller: number, pVictim: number, pAssister: number, pevInflictor: number, killerWeaponName: string, iDeathMessageFlags: number, iRarityOfKill: number): number;
/** rg_set_account_rules(const RewardRulesrules_index, const anyamount) */
export declare function rg_set_account_rules(rules_index: number, amount: number): number;
/** rg_set_animation(const anyindex, PLAYER_ANIMplayerAnim) */
export declare function rg_set_animation(index: number, playerAnim: number): number;
/** rg_set_can_hear_player(const anylistener, const anysender, const boolcan_hear) */
export declare function rg_set_can_hear_player(listener: number, sender: number, can_hear: boolean): number;
/** rg_set_observer_mode(const anyplayer, const anymode) */
export declare function rg_set_observer_mode(player: number, mode: number): number;
/** rg_set_user_ammo(const anyindex, WeaponIdTypeweapon, anyamount) */
export declare function rg_set_user_ammo(index: number, weapon: number, amount: number): number;
/** rg_set_user_armor(const anyindex, anyarmorvalue, ArmorTypearmortype) */
export declare function rg_set_user_armor(index: number, armorvalue: number, armortype: number): number;
/** rg_set_user_bpammo(const anyindex, WeaponIdTypeweapon, anyamount) */
export declare function rg_set_user_bpammo(index: number, weapon: number, amount: number): number;
/** rg_set_user_footsteps(const anyindex, boolsilent) */
export declare function rg_set_user_footsteps(index: number, silent?: boolean): number;
/** rg_set_user_model(const anyindex, const anymodel[], const boolupdate_index) */
export declare function rg_set_user_model(index: number, model: string, update_index?: boolean): number;
/** rg_set_user_team(const anyindex, TeamNameteam, ModelNamemodel, const boolsend_teaminfo, const boolcheck_win_conditions) */
export declare function rg_set_user_team(index: number, team: number, model?: number, send_teaminfo?: boolean, check_win_conditions?: boolean): number;
/** rg_spawn_grenade(WeaponIdTypeweaponId, anypevOwner, FloatvecSrc[], FloatvecThrow[], Floattime, TeamNameiTeam, anyusEvent) */
export declare function rg_spawn_grenade(weaponId: number, pevOwner: number, vecSrc: number[], vecThrow: number[], time: number, iTeam: number, usEvent?: number): number;
/** rg_spawn_head_gib(const anyindex) */
export declare function rg_spawn_head_gib(index: number): number;
/** rg_spawn_random_gibs(const anyindex, const anycGibs, const boolbHuman) */
export declare function rg_spawn_random_gibs(index: number, cGibs: number, bHuman?: boolean): number;
/** rg_swap_all_players() */
export declare function rg_swap_all_players(): number;
/** rg_switch_best_weapon(const anyplayer, const anycurrentWeapon) */
export declare function rg_switch_best_weapon(player: number, currentWeapon?: number): number;
/** rg_switch_team(const anyindex) */
export declare function rg_switch_team(index: number): number;
/** rg_switch_weapon(const anyindex, const anyweapon) */
export declare function rg_switch_weapon(index: number, weapon: number): number;
/** rg_transfer_c4(const anyindex, const anyreceiver) */
export declare function rg_transfer_c4(index: number, receiver?: number): number;
/** rg_update_teamscores(const anyiCtsWins, const anyiTsWins, const boolbAdd) */
export declare function rg_update_teamscores(iCtsWins?: number, iTsWins?: number, bAdd?: boolean): number;
/** rg_weapon_deploy(const anyentity, const anyszViewModel[], const anyszWeaponModel[], anyiAnim, const anyszAnimExt[], anyskiplocal) */
export declare function rg_weapon_deploy(entity: number, szViewModel: string, szWeaponModel: string, iAnim: number, szAnimExt: string, skiplocal?: number): number;
/** rg_weapon_kickback(const anyentity, Floatup_base, Floatlateral_base, Floatup_modifier, Floatlateral_modifier, Floatup_max, Floatlateral_max, anydirection_change) */
export declare function rg_weapon_kickback(entity: number, up_base: number, lateral_base: number, up_modifier: number, lateral_modifier: number, up_max: number, lateral_max: number, direction_change: number): number;
/** rg_weapon_reload(const anyentity, anyiClipSize, anyiAnim, FloatfDelay) */
export declare function rg_weapon_reload(entity: number, iClipSize: number, iAnim: number, fDelay: number): number;
/** rg_weapon_send_animation(const anyentity, anyiAnim, anyskiplocal) */
export declare function rg_weapon_send_animation(entity: number, iAnim: number, skiplocal?: number): number;
/** rg_weapon_shotgun_reload(const anyentity, anyiAnim, anyiStartAnim, FloatfDelay, FloatfStartDelay, const anypszReloadSound1[], const anypszReloadSound2[]) */
export declare function rg_weapon_shotgun_reload(entity: number, iAnim: number, iStartAnim: number, fDelay: number, fStartDelay: number, pszReloadSound1?: string, pszReloadSound2?: string): number;
/** rh_drop_client(const anyindex, const anymessage[]) */
export declare function rh_drop_client(index: number, message?: string): number;
/** rh_emit_sound2(const anyentity, const anyrecipient, const anychannel, const anysample[], Floatvol, Floatattn, const anyflags, const anypitch, anyemitFlags, const Floatorigin[]) */
export declare function rh_emit_sound2(entity: number, recipient: number, channel: number, sample: string, vol?: number, attn?: number, flags?: number, pitch?: number, emitFlags?: number, origin?: number[]): boolean;
/** rh_get_client_connect_time(const anyindex) */
export declare function rh_get_client_connect_time(index: number): number;
/** rh_get_mapname(anyoutput[], anylen, MapNameTypetype) */
export declare function rh_get_mapname(type_?: number): string;
/** rh_get_net_from(anyoutput[], anylen) */
export declare function rh_get_net_from(): string;
/** rh_get_realtime() */
export declare function rh_get_realtime(): number;
/** rh_is_entity_fullpacked(const anyhost, const anyentity, const anyframe) */
export declare function rh_is_entity_fullpacked(host: number, entity: number, frame?: number): boolean;
/** rh_reset_mapname() */
export declare function rh_reset_mapname(): number;
/** rh_set_mapname(const anymapname[]) */
export declare function rh_set_mapname(mapname: string): number;
/** rh_update_user_info(const anyindex) */
export declare function rh_update_user_info(index: number): number;
/** rmdir(const anypath[]) */
export declare function rmdir(path: string): number;
/** server_exec() */
export declare function server_exec(): number;
/** set_addr_val(anyaddr, anyval) */
export declare function set_addr_val(addr: number, val: number): number;
/** param, source: pointer, size */
export declare function set_array(a0: i32, a1: i32, a2: i32): i32;
/** set_array_f(anyparam, const Floatsource[], anysize) */
export declare function set_array_f(param: number, source: number[], size: number): number;
/** set_client_listen(anyreceiver, anysender, anylisten) */
export declare function set_client_listen(receiver: number, sender: number, listen: number): number;
/** set_cvar_flags(const anycvar[], anyflags) */
export declare function set_cvar_flags(cvar: string, flags: number): number;
/** set_cvar_float(const anycvar[], Floatvalue) */
export declare function set_cvar_float(cvar: string, value: number): number;
/** set_cvar_num(const anycvarname[], anyvalue) */
export declare function set_cvar_num(cvarname: string, value: number): number;
/** set_cvar_string(const anycvar[], const anyvalue[]) */
export declare function set_cvar_string(cvar: string, value: string): number;
/** set_dhudmessage(anyred, anygreen, anyblue, Floatx, Floaty, anyeffects, Floatfxtime, Floatholdtime, Floatfadeintime, Floatfadeouttime) */
export declare function set_dhudmessage(red?: number, green?: number, blue?: number, x?: number, y?: number, effects?: number, fxtime?: number, holdtime?: number, fadeintime?: number, fadeouttime?: number): number;
/** set_ent_rendering(anyindex, anyfx, anyr, anyg, anyb, anyrender, anyamount) */
export declare function set_ent_rendering(index: number, fx?: number, r?: number, g?: number, b?: number, render?: number, amount?: number): number;
/** set_error_filter(const anyhandler[]) */
export declare function set_error_filter(handler: string): number;
/** set_float_byref(anyparam, Floatvalue) */
export declare function set_float_byref(param: number, value: number): number;
/** set_hudmessage(anyred, anygreen, anyblue, Floatx, Floaty, anyeffects, Floatfxtime, Floatholdtime, Floatfadeintime, Floatfadeouttime, anychannel, anyalpha1, anycolor2[]) */
export declare function set_hudmessage(red?: number, green?: number, blue?: number, x?: number, y?: number, effects?: number, fxtime?: number, holdtime?: number, fadeintime?: number, fadeouttime?: number, channel?: number, alpha1?: number, color2?: number[]): number;
/** set_key_value(const anypbuffer, const anykey[], const anyvalue[]) */
export declare function set_key_value(pbuffer: number, key: string, value: string): number;
/** pbuffer, value: pointer, maxlen */
export declare function set_key_value_buffer(a0: i32, a1: i32, a2: i32): i32;
/** set_lights(const anyLighting[]) */
export declare function set_lights(Lighting: string): number;
/** set_localinfo(const anyinfo[], const anyvalue[]) */
export declare function set_localinfo(info: string, value: string): number;
/** set_module_filter(const anyhandler[]) */
export declare function set_module_filter(handler: string): number;
/** set_msg_arg_float(anyargn, anyargtype, FloatfValue) */
export declare function set_msg_arg_float(argn: number, argtype: number, fValue: number): number;
/** set_msg_arg_int(anyargn, anyargtype, anyiValue) */
export declare function set_msg_arg_int(argn: number, argtype: number, iValue: number): number;
/** set_msg_arg_string(anyargn, const anyszString[]) */
export declare function set_msg_arg_string(argn: number, szString: string): number;
/** set_msg_block(anyiMessage, anyiMessageFlags) */
export declare function set_msg_block(iMessage: number, iMessageFlags: number): number;
/** set_native_filter(const anyhandler[]) */
export declare function set_native_filter(handler: string): number;
/** set_param_byref(anyparam, anyvalue) */
export declare function set_param_byref(param: number, value: number): number;
/** set_pcvar_bool(anypcvar, boolnum) */
export declare function set_pcvar_bool(pcvar: number, num: boolean): number;
/** set_pcvar_bounds(anypcvar, CvarBoundstype, boolset, Floatvalue) */
export declare function set_pcvar_bounds(pcvar: number, type_: number, set_: boolean, value?: number): number;
/** set_pcvar_flags(anypcvar, anyflags) */
export declare function set_pcvar_flags(pcvar: number, flags: number): number;
/** set_pcvar_float(anypcvar, Floatnum) */
export declare function set_pcvar_float(pcvar: number, num: number): number;
/** set_pcvar_num(anypcvar, anynum) */
export declare function set_pcvar_num(pcvar: number, num: number): number;
/** set_pcvar_string(anypcvar, const anystring[]) */
export declare function set_pcvar_string(pcvar: number, string_: string): number;
/** set_pdata_cbase(anyid, anyoffset, anyvalue, anylinuxdiff, anymacdiff) */
export declare function set_pdata_cbase(id: number, offset: number, value: number, linuxdiff?: number, macdiff?: number): number;
/** set_rebuy(const RebuyHandlerebuyhandle, const RebuyStructmember, anyvalue) */
export declare function set_rebuy(rebuyhandle: number, member: number, value: number): number;
/** set_speak(anyiIndex, anyiSpeakFlags) */
export declare function set_speak(iIndex: number, iSpeakFlags: number): number;
/** set_string(anyparam, anydest[], anymaxlen) */
export declare function set_string(param: number): string;
/** time, function: pointer, id, parameter: pointer, len, flags: pointer, repeat */
export declare function set_task(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** set_user_armor(anyindex, anyarmor) */
export declare function set_user_armor(index: number, armor: number): number;
/** set_user_flags(anyindex, anyflags, anyid) */
export declare function set_user_flags(index: number, flags?: number, id?: number): number;
/** set_user_footsteps(anyid, anyset) */
export declare function set_user_footsteps(id: number, set_?: number): number;
/** set_user_frags(anyindex, anyfrags) */
export declare function set_user_frags(index: number, frags: number): number;
/** set_user_godmode(anyindex, anygodmode) */
export declare function set_user_godmode(index: number, godmode?: number): number;
/** set_user_gravity(anyindex, Floatgravity) */
export declare function set_user_gravity(index: number, gravity?: number): number;
/** set_user_health(anyindex, anyhealth) */
export declare function set_user_health(index: number, health: number): number;
/** set_user_hitzones(anyindex, anytarget, anybody) */
export declare function set_user_hitzones(index: number, target: number, body: number): number;
/** set_user_info(anyindex, const anyinfo[], const anyvalue[]) */
export declare function set_user_info(index: number, info: string, value: string): number;
/** set_user_maxspeed(anyindex, Floatspeed) */
export declare function set_user_maxspeed(index: number, speed?: number): number;
/** set_user_noclip(anyindex, anynoclip) */
export declare function set_user_noclip(index: number, noclip?: number): number;
/** set_user_origin(anyindex, const anyorigin[]) */
export declare function set_user_origin(index: number, origin: number[]): number;
/** set_user_rendering(anyindex, anyfx, anyr, anyg, anyb, anyrender, anyamount) */
export declare function set_user_rendering(index: number, fx?: number, r?: number, g?: number, b?: number, render?: number, amount?: number): number;
/** set_vaultdata(const anykey[], const anydata[]) */
export declare function set_vaultdata(key: string, data?: string): number;
/** set_view(anyiIndex, anyViewType) */
export declare function set_view(iIndex: number, ViewType: number): number;
/** set_xvar_float(anyid, Floatvalue) */
export declare function set_xvar_float(id: number, value?: number): number;
/** set_xvar_num(anyid, anyvalue) */
export declare function set_xvar_num(id: number, value?: number): number;
/** setarg(anyarg, anyindex, anyvalue) */
export declare function setarg(arg: number, index: number, value: number): number;
/** ent, callback: pointer, params: pointer, len */
export declare function SetBlocked(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** SetBodygroup(const anyentity, const anygroup, const anyvalue) */
export declare function SetBodygroup(entity: number, group: number, value: number): number;
/** setc(anysrc[], anylen, anych) */
export declare function setc(ch: number): string;
/** SetFilePermissions(const anypath[], anymode) */
export declare function SetFilePermissions(path: string, mode: number): boolean;
/** SetGlobalTransTarget(anyclient) */
export declare function SetGlobalTransTarget(client: number): number;
/** SetHamParamEntity(anywhich, anyvalue) */
export declare function SetHamParamEntity(which: number, value: number): number;
/** SetHamParamEntity2(anywhich, anyvalue) */
export declare function SetHamParamEntity2(which: number, value: number): number;
/** SetHamParamFloat(anywhich, Floatvalue) */
export declare function SetHamParamFloat(which: number, value: number): number;
/** SetHamParamInteger(anywhich, anyvalue) */
export declare function SetHamParamInteger(which: number, value: number): number;
/** SetHamParamItemInfo(anywhich, anyiteminfo_handle) */
export declare function SetHamParamItemInfo(which: number, iteminfo_handle: number): number;
/** SetHamParamString(anywhich, const anyoutput[]) */
export declare function SetHamParamString(which: number, output: string): number;
/** SetHamParamTraceResult(anywhich, anytr_handle) */
export declare function SetHamParamTraceResult(which: number, tr_handle: number): number;
/** SetHamParamVector(anywhich, const Floatvalue[]) */
export declare function SetHamParamVector(which: number, value: number[]): number;
/** SetHamReturnEntity(anyvalue) */
export declare function SetHamReturnEntity(value: number): number;
/** SetHamReturnFloat(Floatvalue) */
export declare function SetHamReturnFloat(value: number): number;
/** SetHamReturnInteger(anyvalue) */
export declare function SetHamReturnInteger(value: number): number;
/** SetHamReturnString(const anyvalue[]) */
export declare function SetHamReturnString(value: string): number;
/** SetHamReturnVector(const Floatvalue[]) */
export declare function SetHamReturnVector(value: number[]): number;
/** SetMessageBlock(const anymsgid, MsgBlockTypetype) */
export declare function SetMessageBlock(msgid: number, type_: number): boolean;
/** ent, callback: pointer, params: pointer, len */
export declare function SetMoveDone(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** SetPackPosition(DataPackpack, DataPackPosposition) */
export declare function SetPackPosition(pack: number, position: number): number;
/** ent, callback: pointer, params: pointer, len */
export declare function SetThink(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ent, callback: pointer, params: pointer, len */
export declare function SetTouch(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** ent, callback: pointer, params: pointer, len */
export declare function SetUse(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** show_menu(anyindex, anykeys, const anymenu[], anytime, const anytitle[]) */
export declare function show_menu(index: number, keys: number, menu: string, time?: number, title?: string): number;
/** show_motd(anyplayer, const anymessage[], const anyheader[]) */
export declare function show_motd(player: number, message: string, header?: string): number;
/** SMC_CreateParser() */
export declare function SMC_CreateParser(): number;
/** SMC_DestroyParser(SMCParserhandle) */
export declare function SMC_DestroyParser(handle: number): number;
/** error, buffer: pointer, buf_max */
export declare function SMC_GetErrorString(a0: i32, a1: i32, a2: i32): i32;
/** SMC_ParseFile(SMCParserhandle, const anyfile[], anyline, anycol, anydata) */
export declare function SMC_ParseFile(handle: number, file: string, line?: number, col?: number, data?: number): number;
/** SMC_SetParseEnd(SMCParserhandle, const anyfunc[]) */
export declare function SMC_SetParseEnd(handle: number, func: string): number;
/** SMC_SetParseStart(SMCParserhandle, const anyfunc[]) */
export declare function SMC_SetParseStart(handle: number, func: string): number;
/** SMC_SetRawLine(SMCParserhandle, const anyfunc[]) */
export declare function SMC_SetRawLine(handle: number, func: string): number;
/** SMC_SetReaders(SMCParsersmc, const anykvFunc[], const anynsFunc[], const anyesFunc[]) */
export declare function SMC_SetReaders(smc: number, kvFunc: string, nsFunc?: string, esFunc?: string): number;
/** SortADTArray(Arrayarray, SortMethodorder, SortTypetype) */
export declare function SortADTArray(array: number, order: number, type_: number): number;
/** array: pointer, array_size, comparefunc: pointer, data: pointer, data_size */
export declare function SortCustom1D(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** array: pointer, array_size, comparefunc: pointer, data: pointer, data_size */
export declare function SortCustom2D(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** SortFloats(Floatarray[], anyarray_size, SortMethodorder) */
export declare function SortFloats(array: number[], array_size: number, order?: number): number;
/** array: pointer, array_size, order */
export declare function SortIntegers(a0: i32, a1: i32, a2: i32): i32;
/** SortStrings(anyarray[], anynum_strings, SortMethodorder) */
export declare function SortStrings(order?: number): string;
/** spawn(anyindex) */
export declare function spawn(index: number): number;
/** split_string(const anysource[], const anysplit[], anypart[], anypartLen) */
export declare function split_string(source: string, split: string): string;
/** sqroot(anyvalue) */
export declare function sqroot(value: number): number;
/** str_to_float(const anystring[]) */
export declare function str_to_float(string_: string): number;
/** str_to_num(const anystring[]) */
export declare function str_to_num(string_: string): number;
/** dest: pointer, source: pointer, maxlength */
export declare function strcat(a0: i32, a1: i32, a2: i32): i32;
/** strcmp(const anystring1[], const anystring2[], boolignorecase) */
export declare function strcmp(string1: string, string2: string, ignorecase?: boolean): number;
/** strfind(const anystring[], const anysub[], boolignorecase, anypos) */
export declare function strfind(string_: string, sub: string, ignorecase?: boolean, pos?: number): number;
/** strip_user_weapons(anyindex) */
export declare function strip_user_weapons(index: number): number;
/** strlen(const anystring[]) */
export declare function strlen(string_: string): number;
/** string1: pointer, string2: pointer, num, ignorecase */
export declare function strncmp(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** strtof(const anystring[], anyendPos) */
export declare function strtof(string_: string, endPos?: number): number;
/** text: pointer, Left: pointer, leftLen, Right: pointer, rightLen, token, trimSpaces */
export declare function strtok(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** text: pointer, left: pointer, llen, right: pointer, rlen, token, trim */
export declare function strtok2(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32, a5: i32, a6: i32): i32;
/** strtol(const anystring[], anyendPos, anybase) */
export declare function strtol(string_: string, endPos?: number, base?: number): number;
/** string: pointer */
export declare function strtolower(a0: i32): i32;
/** string: pointer */
export declare function strtoupper(a0: i32): i32;
/** swapchars(anyc) */
export declare function swapchars(c: number): number;
/** task_exists(anyid, anyoutside) */
export declare function task_exists(id?: number, outside?: number): number;
/** tickcount(anygranularity) */
export declare function tickcount(granularity?: number): number;
/** time(anyhour, anyminute, anysecond) */
export declare function time(hour?: number, minute?: number, second?: number): number;
/** tolower(anyc) */
export declare function tolower(c: number): number;
/** toupper(anyc) */
export declare function toupper(c: number): number;
/** trace_forward(const Floatstart[], const Floatangle[], Floatgive, anyignoreEnt, FloathitX, FloathitY, FloatshortestDistance, FloatshortestDistLow, FloatshortestDistHigh) */
export declare function trace_forward(start: number[], angle: number[], give: number, ignoreEnt: number, hitX: number, hitY: number, shortestDistance: number, shortestDistLow: number, shortestDistHigh: number): number;
/** trace_hull(const Floatorigin[], anyhull, anyignoredent, anyignoremonsters, const Floatend[]) */
export declare function trace_hull(origin: number[], hull: number, ignoredent: number, ignoremonsters: number, end: number[]): number;
/** trace_line(anyiIgnoreEnt, const FloatfStart[], const FloatfEnd[], FloatvReturn[]) */
export declare function trace_line(iIgnoreEnt: number, fStart: number[], fEnd: number[], vReturn: number[]): number;
/** trace_normal(anyiIgnoreEnt, const FloatfStart[], const FloatfEnd[], FloatvReturn[]) */
export declare function trace_normal(iIgnoreEnt: number, fStart: number[], fEnd: number[], vReturn: number[]): number;
/** TrieClear(Triehandle) */
export declare function TrieClear(handle: number): number;
/** TrieCreate() */
export declare function TrieCreate(): number;
/** TrieDeleteKey(Triehandle, const anykey[]) */
export declare function TrieDeleteKey(handle: number, key: string): boolean;
/** TrieDestroy(Triehandle) */
export declare function TrieDestroy(handle: number): number;
/** handle, key: pointer, output: pointer, outputsize, size: pointer */
export declare function TrieGetArray(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** handle, key: pointer, value: pointer */
export declare function TrieGetCell(a0: i32, a1: i32, a2: i32): i32;
/** TrieGetSize(Triehandle) */
export declare function TrieGetSize(handle: number): number;
/** handle, key: pointer, output: pointer, outputsize, size: pointer */
export declare function TrieGetString(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** TrieIterCreate(Triehandle) */
export declare function TrieIterCreate(handle: number): number;
/** TrieIterDestroy(TrieIterhandle) */
export declare function TrieIterDestroy(handle: number): number;
/** TrieIterEnded(TrieIterhandle) */
export declare function TrieIterEnded(handle: number): boolean;
/** handle, array: pointer, outputsize, size: pointer */
export declare function TrieIterGetArray(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** handle, value: pointer */
export declare function TrieIterGetCell(a0: i32, a1: i32): i32;
/** handle, key: pointer, outputsize */
export declare function TrieIterGetKey(a0: i32, a1: i32, a2: i32): i32;
/** TrieIterGetSize(TrieIterhandle) */
export declare function TrieIterGetSize(handle: number): number;
/** handle, buffer: pointer, outputsize, size: pointer */
export declare function TrieIterGetString(a0: i32, a1: i32, a2: i32, a3: i32): i32;
/** TrieIterNext(TrieIterhandle) */
export declare function TrieIterNext(handle: number): number;
/** TrieKeyExists(Triehandle, const anykey[]) */
export declare function TrieKeyExists(handle: number, key: string): boolean;
/** handle, key: pointer, buffer: pointer, size, replace */
export declare function TrieSetArray(a0: i32, a1: i32, a2: i32, a3: i32, a4: i32): i32;
/** TrieSetCell(Triehandle, const anykey[], anyvalue, boolreplace) */
export declare function TrieSetCell(handle: number, key: string, value: number, replace?: boolean): number;
/** TrieSetString(Triehandle, const anykey[], const anyvalue[], boolreplace) */
export declare function TrieSetString(handle: number, key: string, value: string, replace?: boolean): number;
/** TrieSnapshotCreate(Triehandle) */
export declare function TrieSnapshotCreate(handle: number): number;
/** TrieSnapshotDestroy(Snapshothandle) */
export declare function TrieSnapshotDestroy(handle: number): number;
/** TrieSnapshotGetKey(Snapshothandle, anyindex, anybuffer[], anymaxlength) */
export declare function TrieSnapshotGetKey(handle: number, index: number): string;
/** TrieSnapshotKeyBufferSize(Snapshothandle, anyindex) */
export declare function TrieSnapshotKeyBufferSize(handle: number, index: number): number;
/** TrieSnapshotLength(Snapshothandle) */
export declare function TrieSnapshotLength(handle: number): number;
/** text: pointer */
export declare function trim(a0: i32): i32;
/** string: pointer */
export declare function ucfirst(a0: i32): i32;
/** unlink(const anyfilename[], booluse_valve_fs, const anyvalve_path_id[]) */
export declare function unlink(filename: string, use_valve_fs?: boolean, valve_path_id?: string): number;
/** unpause(const anyflag[], const anyparam1[], const anyparam2[]) */
export declare function unpause(flag: string, param1?: string, param2?: string): number;
/** unregister_impulse(anyregisterid) */
export declare function unregister_impulse(registerid: number): number;
/** unregister_message(anyiMsgId, anyregisteredmsg) */
export declare function unregister_message(iMsgId: number, registeredmsg: number): number;
/** unregister_think(anyregisterid) */
export declare function unregister_think(registerid: number): number;
/** unregister_touch(anyregisterid) */
export declare function unregister_touch(registerid: number): number;
/** UnregisterMessage(const MessageHookhandle) */
export declare function UnregisterMessage(handle: number): boolean;
/** user_has_weapon(anyindex, anyweapon, anysetweapon) */
export declare function user_has_weapon(index: number, weapon: number, setweapon?: number): number;
/** user_kill(anyindex, anyflag) */
export declare function user_kill(index: number, flag?: number): number;
/** user_slap(anyindex, anypower, anyrnddir) */
export declare function user_slap(index: number, power: number, rnddir?: number): number;
/** vaultdata_exists(const anykey[]) */
export declare function vaultdata_exists(key: string): number;
/** vector_distance(const FloatvVector[], const FloatvVector2[]) */
export declare function vector_distance(vVector: number[], vVector2: number[]): number;
/** vector_length(const FloatvVector[]) */
export declare function vector_length(vVector: number[]): number;
/** vector_to_angle(const FloatfVector[], FloatvReturn[]) */
export declare function vector_to_angle(fVector: number[], vReturn: number[]): number;
/** velocity_by_aim(anyiIndex, anyiVelocity, FloatvRetValue[]) */
export declare function velocity_by_aim(iIndex: number, iVelocity: number, vRetValue: number[]): number;
/** vformat(anybuffer[], anylen, const anyfmt[], anyvararg) */
export declare function vformat(fmt: string, vararg: number): string;
/** write_angle(anyx) */
export declare function write_angle(x: number): number;
/** write_angle_f(Floatx) */
export declare function write_angle_f(x: number): number;
/** write_byte(anyx) */
export declare function write_byte(x: number): number;
/** write_char(anyx) */
export declare function write_char(x: number): number;
/** write_coord(anyx) */
export declare function write_coord(x: number): number;
/** write_coord_f(Floatx) */
export declare function write_coord_f(x: number): number;
/** write_entity(anyx) */
export declare function write_entity(x: number): number;
/** write_file(const anyfile[], const anytext[], anyline) */
export declare function write_file(file: string, text: string, line?: number): number;
/** write_long(anyx) */
export declare function write_long(x: number): number;
/** write_short(anyx) */
export declare function write_short(x: number): number;
/** write_string(const anyx[]) */
export declare function write_string(x: string): number;
/** WritePackCell(DataPackpack, anycell) */
export declare function WritePackCell(pack: number, cell: number): number;
/** WritePackFloat(DataPackpack, Floatval) */
export declare function WritePackFloat(pack: number, val: number): number;
/** WritePackString(DataPackpack, const anystr[]) */
export declare function WritePackString(pack: number, str: string): number;
/** xvar_exists(const anyname[]) */
export declare function xvar_exists(name: string): number;
/** abort(error, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_abort: i32;
/** abort(anyerror, const anyfmt[], ...) */
export declare function abort(error: number, fmt: string): number;
/** client_cmd(index, command, ...) - the dispatcher's id for it */
export declare const NATIVE_client_cmd: i32;
/** client_cmd(anyindex, const anycommand[], ...) */
export declare function client_cmd(index: number, command: string, ...args: number[]): number;
/** client_print(index, type, message, ...) - the dispatcher's id for it */
export declare const NATIVE_client_print: i32;
/** client_print(anyindex, anytype, const anymessage[], ...) */
export declare function client_print(index: number, type_: number, message: string): number;
/** client_print_color(index, sender, message, ...) - the dispatcher's id for it */
export declare const NATIVE_client_print_color: i32;
/** client_print_color(anyindex, anysender, const anymessage[], ...) */
export declare function client_print_color(index: number, sender: number, message: string): number;
/** console_cmd(id, cmd, ...) - the dispatcher's id for it */
export declare const NATIVE_console_cmd: i32;
/** console_cmd(anyid, const anycmd[], ...) */
export declare function console_cmd(id: number, cmd: string, ...args: number[]): number;
/** console_print(id, message, ...) - the dispatcher's id for it */
export declare const NATIVE_console_print: i32;
/** console_print(anyid, const anymessage[], ...) */
export declare function console_print(id: number, message: string): number;
/** CreateHudSyncObj(num, ...) - the dispatcher's id for it */
export declare const NATIVE_CreateHudSyncObj: i32;
/** CreateHudSyncObj(anynum, ...) */
export declare function CreateHudSyncObj(num?: number, ...args: number[]): number;
/** CreateMultiForward(name, stop_type, ...) - the dispatcher's id for it */
export declare const NATIVE_CreateMultiForward: i32;
/** CreateMultiForward(const anyname[], anystop_type, ...) */
export declare function CreateMultiForward(name: string, stop_type: number, ...args: number[]): number;
/** CreateOneForward(plugin_id, name, ...) - the dispatcher's id for it */
export declare const NATIVE_CreateOneForward: i32;
/** CreateOneForward(anyplugin_id, const anyname[], ...) */
export declare function CreateOneForward(plugin_id: number, name: string, ...args: number[]): number;
/** DispatchKeyValue(...) - the dispatcher's id for it */
export declare const NATIVE_DispatchKeyValue: i32;
/** DispatchKeyValue(...) */
export declare function DispatchKeyValue(...args: number[]): number;
/** elog_message(message, ...) - the dispatcher's id for it */
export declare const NATIVE_elog_message: i32;
/** elog_message(const anymessage[], ...) */
export declare function elog_message(message: string): number;
/** engclient_print(player, type, message, ...) - the dispatcher's id for it */
export declare const NATIVE_engclient_print: i32;
/** engclient_print(anyplayer, anytype, const anymessage[], ...) */
export declare function engclient_print(player: number, type_: number, message: string): number;
/** ExecuteForward(forward_handle, ret, ...) - the dispatcher's id for it */
export declare const NATIVE_ExecuteForward: i32;
/** ExecuteForward(anyforward_handle, &anyret, ...) */
export declare function ExecuteForward(forward_handle: number, ...args: number[]): number;
/** ExecuteHam(function, this, ...) - the dispatcher's id for it */
export declare const NATIVE_ExecuteHam: i32;
/** ExecuteHam(Hamfunction, anythis, ...) */
export declare function ExecuteHam(function_: number, this_: number, ...args: number[]): number;
/** ExecuteHamB(function, this, ...) - the dispatcher's id for it */
export declare const NATIVE_ExecuteHamB: i32;
/** ExecuteHamB(Hamfunction, anythis, ...) */
export declare function ExecuteHamB(function_: number, this_: number, ...args: number[]): number;
/** filesize(filename, ...) - the dispatcher's id for it */
export declare const NATIVE_filesize: i32;
/** filesize(const anyfilename[], ...) */
export declare function filesize(filename: string, ...args: number[]): number;
/** find_player(flags, ...) - the dispatcher's id for it */
export declare const NATIVE_find_player: i32;
/** find_player(const anyflags[], ...) */
export declare function find_player(flags: string, ...args: number[]): number;
/** find_player_ex(flags, ...) - the dispatcher's id for it */
export declare const NATIVE_find_player_ex: i32;
/** find_player_ex(FindPlayerFlagsflags, ...) */
export declare function find_player_ex(flags: number, ...args: number[]): number;
/** format(output, len, format, ...) - the dispatcher's id for it */
export declare const NATIVE_format: i32;
/** formatex(output, len, format, ...) - the dispatcher's id for it */
export declare const NATIVE_formatex: i32;
/** fprintf(file, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_fprintf: i32;
/** fprintf(anyfile, const anyfmt[], ...) */
export declare function fprintf(file: number, fmt: string): number;
/** get_entvar(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_entvar: i32;
/** get_entvar(const anyindex, const EntVarsvar, ...) */
export declare function get_entvar(index: number, var_: number, ...args: number[]): number;
/** get_member(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_member: i32;
/** get_member(const anyindex, anymember, ...) */
export declare function get_member(index: number, member: number, ...args: number[]): number;
/** get_member_game(member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_member_game: i32;
/** get_member_game(CSGameRules_Membersmember, ...) */
export declare function get_member_game(member: number, ...args: number[]): number;
/** get_member_s(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_get_member_s: i32;
/** get_member_s(const anyindex, anymember, ...) */
export declare function get_member_s(index: number, member: number, ...args: number[]): number;
/** get_movevar(var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_movevar: i32;
/** get_movevar(const MoveVarsvar, ...) */
export declare function get_movevar(var_: number, ...args: number[]): number;
/** get_netadr(adr, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_netadr: i32;
/** get_netadr(const anyadr, const NetAdrVarsvar, ...) */
export declare function get_netadr(adr: number, var_: number, ...args: number[]): number;
/** get_netchan(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_netchan: i32;
/** get_netchan(const anyindex, const NetChanvar, ...) */
export declare function get_netchan(index: number, var_: number, ...args: number[]): number;
/** get_pmove(var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_pmove: i32;
/** get_pmove(const PlayerMovevar, ...) */
export declare function get_pmove(var_: number, ...args: number[]): number;
/** get_pmtrace(tracehandle, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_pmtrace: i32;
/** get_pmtrace(const anytracehandle, const PMTracevar, ...) */
export declare function get_pmtrace(tracehandle: number, var_: number, ...args: number[]): number;
/** get_ucmd(ucmd, var, ...) - the dispatcher's id for it */
export declare const NATIVE_get_ucmd: i32;
/** get_ucmd(const anyucmd, const UCmdvar, ...) */
export declare function get_ucmd(ucmd: number, var_: number, ...args: number[]): number;
/** get_user_attacker(index, ...) - the dispatcher's id for it */
export declare const NATIVE_get_user_attacker: i32;
/** get_user_attacker(anyindex, ...) */
export declare function get_user_attacker(index: number, ...args: number[]): number;
/** get_usercmd(type, ...) - the dispatcher's id for it */
export declare const NATIVE_get_usercmd: i32;
/** get_usercmd(anytype, ...) */
export declare function get_usercmd(type_: number, ...args: number[]): number;
/** get_var_addr(...) - the dispatcher's id for it */
export declare const NATIVE_get_var_addr: i32;
/** get_var_addr(...) */
export declare function get_var_addr(...args: number[]): number;
/** GetHamItemInfo(iteminfo_handle, type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetHamItemInfo: i32;
/** GetHamItemInfo(anyiteminfo_handle, HamItemInfotype, ...) */
export declare function GetHamItemInfo(iteminfo_handle: number, type_: number, ...args: number[]): number;
/** GetHookChainReturn(type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetHookChainReturn: i32;
/** GetHookChainReturn(ATypetype, ...) */
export declare function GetHookChainReturn(type_: number, ...args: number[]): number;
/** GetMessageData(type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetMessageData: i32;
/** GetMessageData(const MsgDataTypetype, ...) */
export declare function GetMessageData(type_: number, ...args: number[]): number;
/** GetMessageOrigData(type, ...) - the dispatcher's id for it */
export declare const NATIVE_GetMessageOrigData: i32;
/** GetMessageOrigData(const MsgDataTypetype, ...) */
export declare function GetMessageOrigData(type_: number, ...args: number[]): number;
/** log_amx(string, ...) - the dispatcher's id for it */
export declare const NATIVE_log_amx: i32;
/** log_amx(const anystring[], ...) */
export declare function log_amx(string_: string): number;
/** log_error(error, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_log_error: i32;
/** log_error(anyerror, const anyfmt[], ...) */
export declare function log_error(error: number, fmt: string): number;
/** log_message(message, ...) - the dispatcher's id for it */
export declare const NATIVE_log_message: i32;
/** log_message(const anymessage[], ...) */
export declare function log_message(message: string): number;
/** log_to_file(file, message, ...) - the dispatcher's id for it */
export declare const NATIVE_log_to_file: i32;
/** log_to_file(const anyfile[], const anymessage[], ...) */
export declare function log_to_file(file: string, message: string): number;
/** menu_setprop(menu, prop, ...) - the dispatcher's id for it */
export declare const NATIVE_menu_setprop: i32;
/** menu_setprop(anymenu, anyprop, ...) */
export declare function menu_setprop(menu: number, prop: number, ...args: number[]): number;
/** nvault_get(vault, key, ...) - the dispatcher's id for it */
export declare const NATIVE_nvault_get: i32;
/** nvault_get(anyvault, const anykey[], ...) */
export declare function nvault_get(vault: number, key: string, ...args: number[]): number;
/** parse(text, ...) - the dispatcher's id for it */
export declare const NATIVE_parse: i32;
/** parse(const anytext[], ...) */
export declare function parse(text: string): number;
/** precache_event(type, Name, ...) - the dispatcher's id for it */
export declare const NATIVE_precache_event: i32;
/** precache_event(anytype, const anyName[], ...) */
export declare function precache_event(type_: number, Name: string, ...args: number[]): number;
/** read_data(value, ...) - the dispatcher's id for it */
export declare const NATIVE_read_data: i32;
/** read_data(anyvalue, ...) */
export declare function read_data(value: number, ...args: number[]): number;
/** register_event(event, function, flags, cond, ...) - the dispatcher's id for it */
export declare const NATIVE_register_event: i32;
/** register_event(const anyevent[], const anyfunction[], const anyflags[], const anycond[], ...) */
export declare function register_event(event: string, function_: string, flags: string, cond?: string, ...args: number[]): number;
/** register_event_ex(event, function, flags, cond, ...) - the dispatcher's id for it */
export declare const NATIVE_register_event_ex: i32;
/** register_event_ex(const anyevent[], const anyfunction[], RegisterEventFlagsflags, const anycond[], ...) */
export declare function register_event_ex(event: string, function_: string, flags: number, cond?: string, ...args: number[]): number;
/** register_logevent(function, argsnum, ...) - the dispatcher's id for it */
export declare const NATIVE_register_logevent: i32;
/** register_logevent(const anyfunction[], anyargsnum, ...) */
export declare function register_logevent(function_: string, argsnum: number, ...args: number[]): number;
/** rg_get_global_iteminfo(weapon_id, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_get_global_iteminfo: i32;
/** rg_get_global_iteminfo(const WeaponIdTypeweapon_id, ItemInfotype, ...) */
export declare function rg_get_global_iteminfo(weapon_id: number, type_: number, ...args: number[]): number;
/** rg_get_iteminfo(ent, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_get_iteminfo: i32;
/** rg_get_iteminfo(const anyent, ItemInfotype, ...) */
export declare function rg_get_iteminfo(ent: number, type_: number, ...args: number[]): number;
/** rg_get_weapon_info(...) - the dispatcher's id for it */
export declare const NATIVE_rg_get_weapon_info: i32;
/** rg_get_weapon_info(...) */
export declare function rg_get_weapon_info(...args: number[]): number;
/** rg_set_global_iteminfo(weapon_id, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_set_global_iteminfo: i32;
/** rg_set_global_iteminfo(const WeaponIdTypeweapon_id, ItemInfotype, ...) */
export declare function rg_set_global_iteminfo(weapon_id: number, type_: number, ...args: number[]): number;
/** rg_set_iteminfo(entity, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_set_iteminfo: i32;
/** rg_set_iteminfo(const anyentity, ItemInfotype, ...) */
export declare function rg_set_iteminfo(entity: number, type_: number, ...args: number[]): number;
/** rg_set_weapon_info(weapon_id, type, ...) - the dispatcher's id for it */
export declare const NATIVE_rg_set_weapon_info: i32;
/** rg_set_weapon_info(const WeaponIdTypeweapon_id, WpnInfotype, ...) */
export declare function rg_set_weapon_info(weapon_id: number, type_: number, ...args: number[]): number;
/** server_cmd(command, ...) - the dispatcher's id for it */
export declare const NATIVE_server_cmd: i32;
/** server_cmd(const anycommand[], ...) */
export declare function server_cmd(command: string, ...args: number[]): number;
/** server_print(message, ...) - the dispatcher's id for it */
export declare const NATIVE_server_print: i32;
/** server_print(const anymessage[], ...) */
export declare function server_print(message: string): number;
/** set_entvar(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_entvar: i32;
/** set_entvar(const anyindex, const EntVarsvar, ...) */
export declare function set_entvar(index: number, var_: number, ...args: number[]): number;
/** set_fail_state(fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_set_fail_state: i32;
/** set_fail_state(const anyfmt[], ...) */
export declare function set_fail_state(fmt: string): number;
/** set_member(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_member: i32;
/** set_member(const anyindex, anymember, ...) */
export declare function set_member(index: number, member: number, ...args: number[]): number;
/** set_member_game(member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_member_game: i32;
/** set_member_game(CSGameRules_Membersmember, ...) */
export declare function set_member_game(member: number, ...args: number[]): number;
/** set_member_s(index, member, ...) - the dispatcher's id for it */
export declare const NATIVE_set_member_s: i32;
/** set_member_s(const anyindex, anymember, ...) */
export declare function set_member_s(index: number, member: number, ...args: number[]): number;
/** set_movevar(var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_movevar: i32;
/** set_movevar(const MoveVarsvar, ...) */
export declare function set_movevar(var_: number, ...args: number[]): number;
/** set_netadr(adr, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_netadr: i32;
/** set_netadr(const anyadr, const NetAdrVarsvar, ...) */
export declare function set_netadr(adr: number, var_: number, ...args: number[]): number;
/** set_netchan(index, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_netchan: i32;
/** set_netchan(const anyindex, const NetChanvar, ...) */
export declare function set_netchan(index: number, var_: number, ...args: number[]): number;
/** set_pmove(var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_pmove: i32;
/** set_pmove(const PlayerMovevar, ...) */
export declare function set_pmove(var_: number, ...args: number[]): number;
/** set_pmtrace(tracehandle, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_pmtrace: i32;
/** set_pmtrace(const anytracehandle, const PMTracevar, ...) */
export declare function set_pmtrace(tracehandle: number, var_: number, ...args: number[]): number;
/** set_ucmd(ucmd, var, ...) - the dispatcher's id for it */
export declare const NATIVE_set_ucmd: i32;
/** set_ucmd(const anyucmd, const UCmdvar, ...) */
export declare function set_ucmd(ucmd: number, var_: number, ...args: number[]): number;
/** set_usercmd(type, ...) - the dispatcher's id for it */
export declare const NATIVE_set_usercmd: i32;
/** set_usercmd(anytype, ...) */
export declare function set_usercmd(type_: number, ...args: number[]): number;
/** SetHamItemInfo(iteminfo_handle, type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetHamItemInfo: i32;
/** SetHamItemInfo(anyiteminfo_handle, HamItemInfotype, ...) */
export declare function SetHamItemInfo(iteminfo_handle: number, type_: number, ...args: number[]): number;
/** SetHookChainArg(number, type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetHookChainArg: i32;
/** SetHookChainArg(anynumber, ATypetype, ...) */
export declare function SetHookChainArg(number_: number, type_: number, ...args: number[]): number;
/** SetHookChainReturn(type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetHookChainReturn: i32;
/** SetHookChainReturn(ATypetype, ...) */
export declare function SetHookChainReturn(type_: number, ...args: number[]): number;
/** SetMessageData(type, ...) - the dispatcher's id for it */
export declare const NATIVE_SetMessageData: i32;
/** SetMessageData(const MsgDataTypetype, ...) */
export declare function SetMessageData(type_: number, ...args: number[]): boolean;
/** show_dhudmessage(index, message, ...) - the dispatcher's id for it */
export declare const NATIVE_show_dhudmessage: i32;
/** show_dhudmessage(anyindex, const anymessage[], ...) */
export declare function show_dhudmessage(index: number, message: string): number;
/** show_hudmessage(index, message, ...) - the dispatcher's id for it */
export declare const NATIVE_show_hudmessage: i32;
/** show_hudmessage(anyindex, const anymessage[], ...) */
export declare function show_hudmessage(index: number, message: string): number;
/** ShowSyncHudMsg(target, syncObj, fmt, ...) - the dispatcher's id for it */
export declare const NATIVE_ShowSyncHudMsg: i32;
/** ShowSyncHudMsg(anytarget, anysyncObj, const anyfmt[], ...) */
export declare function ShowSyncHudMsg(target: number, syncObj: number, fmt: string): number;
/** traceresult(type, ...) - the dispatcher's id for it */
export declare const NATIVE_traceresult: i32;
/** traceresult(anytype, ...) */
export declare function traceresult(type_: number, ...args: number[]): number;
/** vdformat(buffer, len, fmt_arg, vararg, ...) - the dispatcher's id for it */
export declare const NATIVE_vdformat: i32;
