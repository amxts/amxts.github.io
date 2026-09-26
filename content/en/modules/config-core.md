---
title: "Config Core"
description: "INI configs: sections, typed values, paths into blocks"
---

Read an INI file into memory, get typed values out of it, change them and write the file back — with its comments and blank lines where they were.

## Features

- **Typed values.** Text, integers, numbers, booleans, lists of words or numbers.
- **Paths into blocks.** `HUD/HIDE_TIME` reaches a key inside a `HUD = { ... }` block, as deep as blocks nest.
- **Writes back what it read.** Comments and blank lines survive a save; a missing file loads empty, ready to be filled.
- **Creates what is missing.** Setting a key adds it, the rows up to it and the blocks on its path.
- **One instance per server.** Every plugin, TypeScript or Pawn, sees the same loaded files and the same base folder.
- **No Pawn limits.** Keys and values of any length, any number of entries, blocks and files.

## Installation

```bash
npm install @amxts/config-core
```

Add it to your project's `amxts.config.ts`:

```ts twoslash
import { hostIndex, handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, accessOf, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Client, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, TimerHandler, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
export default defineConfig({
	modules: ["@amxts/config-core"],
	configs: {
		baseDir: "myserver",   // names are read from configs/myserver/
	},
});
```

| Option | Default | What it does |
| --- | --- | --- |
| `baseDir` | `""` | The folder under `configs/` that file names are read from; `""` is `configs/` itself. |

A module that reads its files through Config Core, such as [Menu Core](https://github.com/amxts/menu-core), brings it along — there is nothing to add for it.

## Usage

```ts twoslash
import { hostIndex, handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, accessOf, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Client, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, TimerHandler, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
import * as ini from "@amxts/config-core";

const config = ini.load("settings");               // configs/myserver/settings.ini
const main = ini.section(config, "MAIN");

if (main) {
	const prefix = ini.getValue(main, "CHAT_PREFIX");   // string | null
	const hideTime = ini.getInt(main, "HUD/HIDE_TIME");  // a key inside the HUD block
	const roundTime = ini.getNumber(main, "ROUND_TIME");
	const maps = ini.getWords(main, "MAPS");             // string[] | null

	ini.set(main, "CHAT_PREFIX", "[HNS]");
	ini.setNumber(main, "ROUND_TIME", 2.5);
	ini.save(config, "settings");
}
```

- Keys are found case-insensitively; a key with `/` is a path into blocks.
- `index` picks a value in a line of several: in `HIDE_TIME = 255 50 50` the values are 0, 1 and 2.
- `line` picks a row of a block: `ini.getValueByPath(main, "CVARS", 1, 3)` is value 1 of row 3.
- A number reads the way `parseFloat` reads it (`1e5` is 100000) and is written as the number it is (`2.5`).

### API

| Function | What it does |
| --- | --- |
| `load(name)` | Loads a file, `.ini` added; a missing file loads empty. |
| `section(config, name)` · `createSection(config, name)` | A section by name, or `null`; a new one. |
| `getValue` · `getInt` · `getNumber` · `getBoolean` | One value of a key, typed. |
| `getWords` · `getNumbers` · `getValues` · `getValueByPath` | A line of several values, a block row, a value by path. |
| `set` · `setInt` · `setNumber` · `setBoolean` | Changes a value, creating what is missing; `false` where it cannot (a path through a plain value). |
| `has` · `keys` · `entries` · `size` · `remove` | What a section holds. |
| `save(config, name)` | Writes the file back, comments included. |

## File format

```ini
; a comment stays where it is
[MAIN]
CHAT_PREFIX = [MYPLUGIN]
ROUND_TIME = 2.5
MAPS = de_dust2 de_inferno de_nuke

HUD = {
	HIDE_TIME = 255 50 50
}

CVARS = {
	"mp_timelimit" "30"
	"mp_freezetime" "3"
}
```

- `[SECTION]` starts a section; a name may repeat, `section()` gives the last one.
- `key = value` is a line; several values are separated by spaces, quoted when they contain one.
- `key = { ... }` is a block: rows of values, or `key = value` lines of its own, nested as deep as needed.

## Pawn plugins

Existing Pawn plugins keep working: Config Core serves the 28 `cfg_*` natives of the original `universal_config.amxx` with the same signatures, and Pawn plugins keep `#include <universal_config>`. Replace `universal_config.amxx` with it in `plugins.ini`. Details and the differences from the original: [PAWN.md](https://github.com/amxts/config-core/blob/main/PAWN.md).
