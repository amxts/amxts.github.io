---
title: "http — fetch"
navigation:
  title: "http"
---

`fetch` for plugins, over the [easy_http](https://github.com/Next21Team/AmxxEasyHttp)
AMX Mod X module, which the server has to run. Import it from
`~/modules/http`; on first use it checks that easy_http is loaded and, if it
is not, writes one clear line to the log instead of failing on a missing
native.

`fetch` returns a promise: see [Async and promises](/docs/async) for `await`
and cancelling.

```ts twoslash
import { handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, MenuShowOptions, MenuItemOptions, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
import { fetch } from "~/modules/http";

const response = await fetch("https://example.com/api/stats");   // in an async function
if (response.ok) console.log(response.text);

fetch("https://example.com/api/stats")
	.then((response) => {
		if (!response.ok) return console.log(`HTTP ${response.status}`);
		console.log(response.text);
	})
	.catch((error) => console.log(`no answer: ${error.message}`));

fetch("https://example.com/api/report", {
	method: "POST",
	body: `{"map":"${server.map}"}`,
	headers: [["Content-Type", "application/json"]],
});
```

- `response.status` is the HTTP code, `response.ok` a 2xx one, and
  `response.text` the whole body, however long.
- `.catch` gets what never became a response: no connection, a bad URL, a
  timeout, or no easy_http on the server. A 404 is a response, as in the
  browser — check `response.ok`.
- `method` is `"GET"` (the default), `"POST"`, `"PUT"`, `"PATCH"` or
  `"DELETE"` — what easy_http has. `headers` are pairs, like the Fetch
  standard's `HeadersInit`.
- `signal` cancels the request — `ezhttp_cancel_request` — and the promise
  rejects with an Error named `AbortError` (`TimeoutError` for
  `AbortSignal.timeout(ms)`). In an async command handler or player event
  the player leaving cancels it too, with no `signal` written.
- The answer arrives on a later server frame, never inside `fetch` itself.

`fetch` returns a real `Promise<Response>`: `await` it in an async function,
or give it `.then` and `.catch`. A `.then` callback, like every callback
here, must not use the locals around it — AssemblyScript has no closures — so
with `.then` keep what it needs at the top of the file; `await` does not have
that problem:

```ts twoslash
import { handled, outcome, floatCell, rounded, cellFloat, ret, publicFor, nativeFn, arg, argText, argc, caller, setArg, setArgText, argString, cellsToString, stringToCells, cells, out, text, arrayOf, cell, putCell, noOrigin, hasModule, readText, playerIds, paint, print, cmd, cmdWide, setTimeout, sleep, setInterval, clearTimeout, clearInterval, hook, ham, plugin, defineModule, createCellArray, destroyCellArray, cellArrayRows, pushCellArrayRow, cellsText, textCells, showMenu, Handler, WideHandler, Float, CellArray, CellBuffer, TEXT_MAX, Team, WeaponName, ItemName, PlayerFilter, ModuleName, KillOptions, Player, CommandHandler, CommandOptions, ServerCommandHandler, HudOptions, HudEffect, HudLine, FadeDirection, FadeOptions, ShakeOptions, StatusIconState, Screen, CvarChangeEvent, CvarListener, Cvar, Server, server, Game, RoundWinner, EndRoundOptions, game, Variant, VariantName, Flag, Entity, Weapon, WeaponKind, weaponKindOf, Target, swapTeam, cvar, SleepOptions, Call, PluginInfo, ModuleOptions, ForwardStop, NoArgument, Forward, Storage, EntityFilter, PawnFunction, PawnCall, MenuShowOptions, MenuItemOptions, addServerListener, removeServerListener, PluginInitEvent, PluginPauseEvent, PluginUnpauseEvent, ServerChangelevelEvent, PluginCfgEvent, PluginEndEvent, PluginLogEvent, PluginPrecacheEvent, ClientInfochangedEvent, ClientConnectEvent, ClientConnectexEvent, ClientAuthorizedEvent, ClientDisconnectEvent, ClientDisconnectedEvent, ClientRemoveEvent, ClientCommandEvent, ClientPutinserverEvent, InconsistentFileEvent, PluginModulesEvent, OnConfigsExecutedEvent, OnAutoConfigsBufferedEvent, CS_InternalCommandEvent, CS_OnBuyAttemptEvent, CS_OnBuyEvent, PfnTouchEvent, ServerFrameEvent, ClientKillEvent, Client_PreThinkEvent, Client_PostThinkEvent, ClientImpulseEvent, ClientCmdStartEvent, PfnThinkEvent, PfnPlaybackeventEvent, PfnKeyvalueEvent, PfnSpawnEvent, ServerEventMap, flagList, FlagFamily, FlagStore, EntvarFlags, MemberFlags, FlagList, HideHud, HIDE_HUD, Button, BUTTON, Effect, EFFECT, EntityFlag, ENTITY_FLAG, Damage, DAMAGE, Access, ACCESS, addGameListener, removeGameListener, HookEvent, HookEntry, RewardReason, ResourceType, TeamChoice, ItemRestriction, BotEvent, RoundEndReason, DeathMessageFlag, KillRarity, VguiMenu, ActivateServerEvent, AddAccountEvent, AddMultiDamageEvent, AddPlayerItemEvent, AddPointsEvent, AddPointsToTeamEvent, AddResourceEvent, AirAccelerateEvent, AirMoveEvent, AllocEvent, AllowPhysentEvent, ApplyMultiDamageEvent, BalanceTeamsEvent, BasePlayerDuckEvent, BasePlayerJumpEvent, BasePlayerSpawnEvent, BlindEvent, BounceGibTouchEvent, BuyGunAmmoEvent, BuyItemEvent, BuyWeaponByWeaponIdEvent, CanDeployEvent, CanHavePlayerItemEvent, CanPlayerHearPlayerEvent, CanSwitchTeamEvent, ChangeLevelEvent, CheckMapConditionsEvent, CheckTimeBasedDamageEvent, CheckUserInfoEvent, CheckWaterJumpEvent, CheckWinConditionsEvent, ChooseAppearanceEvent, ChooseTeamEvent, ClassifyEvent, CleanUpMapEvent, ClearMultiDamageEvent, ClientConnectedEvent, ClientPrintfEvent, ClientUserInfoChangedEvent, ConnectClientEvent, CreateWeaponBoxEvent, DeadPlayerWeaponsEvent, DeathNoticeEvent, DeathSoundEvent, DefaultDeployEvent, DefaultReloadEvent, DefaultShotgunReloadEvent, DefuseBombEndEvent, DefuseBombStartEvent, DirectSetEvent, DisappearEvent, DropClientEvent, DropIdlePlayerEvent, DropPlayerItemEvent, DropShieldEvent, EmitPingsEvent, EntSelectSpawnPointEvent, ExecuteServerStringCmdEvent, ExplodeBombEvent, ExplodeFlashbangEvent, ExplodeHeGrenadeEvent, ExplodeSmokeGrenadeEvent, FPlayerCanRespawnEvent, FPlayerCanTakeDamageEvent, FShouldSwitchWeaponEvent, FireBuckshotsEvent, FireBulletsEvent, FireBullets3Event, FlPlayerFallDamageEvent, FreeEvent, GetEntityInitEvent, GetForceCameraEvent, GetIntoGameEvent, GetNextBestWeaponEvent, GetPlayerSpawnSpotEvent, GibSpawnEvent, GiveAmmoEvent, GiveC4Event, GiveDefaultItemsEvent, GiveNamedItemEvent, GiveShieldEvent, GoToIntermissionEvent, HasRestrictItemEvent, HintMessageExEvent, ImpulseCommandsEvent, IsPenetrableEntityEvent, ItemPostFrameEvent, JoiningThinkEvent, KickBackEvent, KilledEvent, LadderMoveEvent, MakeBomberEvent, MakeVipEvent, MoveEvent, ObjectCapsEvent, ObserverFindNextPlayerEvent, ObserverIsValidTargetEvent, ObserverSetModeEvent, ObserverThinkEvent, OnEventEvent, OnRoundFreezeEndEvent, OnSpawnEquipEvent, PainEvent, PlantBombEvent, PlayStepSoundEvent, PlayerBlindEvent, PlayerDeathThinkEvent, PlayerGotWeaponEvent, PlayerKilledEvent, PlayerSpawnEvent, PmDuckEvent, PmJumpEvent, PostThinkEvent, PreThinkEvent, PrecacheEvent, PrecacheGenericIEvent, PrecacheModelIEvent, PrecacheSoundIEvent, PrintfEvent, RadioEvent, RemoveAllItemsEvent, RemoveGunsEvent, RemovePlayerItemEvent, RemoveSpawnProtectionEvent, ResetMaxSpeedEvent, ResetSequenceInfoEvent, RestartRoundEvent, RoundEndEvent, RoundRespawnEvent, SendDeathMessageEvent, SendResourcesEvent, SendWeaponAnimEvent, ServerDeactivateEvent, SetAnimationEvent, SetClientUserInfoModelEvent, SetClientUserInfoNameEvent, SetModelEvent, SetSpawnProtectionEvent, ShowMenuEvent, ShowVguiMenuEvent, SpawnHeadGibEvent, SpawnRandomGibsEvent, StartDeathCamEvent, StartObserverEvent, StartSoundEvent, SwitchTeamEvent, TakeDamageEvent, TakeHealthEvent, TeamFullEvent, TeamStackedEvent, ThinkEvent, ThrowFlashbangEvent, ThrowGrenadeEvent, ThrowHeGrenadeEvent, ThrowSmokeGrenadeEvent, TraceAttackEvent, TraceLineEvent, UnDuckEvent, UpdateClientDataEvent, UseEmptyEvent, WaitTillLandEvent, WaterJumpEvent, WriteFullClientUpdateEvent, GameEventMap, GameAnswerMap, Vector } from "~/facade";
// ---cut---
server.addCommand("/weather", async (player) => {
	const response = await fetch("https://wttr.in/?format=3");
	print(player, response.text);
});
```

Without easy_http, `fetch` writes `fetch(<url>): the easy_http module is not
loaded — add it to modules.ini` to the log and calls `.catch`.
