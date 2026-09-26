---
title: amxts
seo:
  title: amxts — CS 1.6 plugins in TypeScript
description: AMX Mod X plugins for Counter-Strike 1.6 in TypeScript. amxts compiles a plugin to native code and runs it inside AMX Mod X, next to your Pawn plugins.
---

::u-page-hero{class="dark:bg-linear-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#headline
  :::u-badge
  ---
  color: primary
  variant: subtle
  ---
  AMX Mod X · Counter-Strike 1.6
  :::

#title
CS 1.6 plugins in [TypeScript]{.text-primary}.

#description
Write a plugin the way you write any TypeScript: familiar types, classes, `Map`, `async`/`await`, events. amxts compiles it to WebAssembly and then ahead of time to machine code, and runs it inside an AMX Mod X module — next to your Pawn plugins.

#links
  :::u-button
  ---
  to: /docs/getting-started
  size: xl
  ---
  Get started
  :::

  :::u-button
  ---
  to: /modules
  size: xl
  color: neutral
  variant: subtle
  ---
  Explore modules
  :::

#default
  :::code-panel{height="26.5rem"}
  ```ts twoslash [say-hp.ts]
  import { Player, plugin, print, server } from "~/facade";

  plugin({
    name: "Say HP",
    version: "1.0.0",
    author: "Author",
    description: "An example",
  });

  server.addCommand("/hp", sayHp);
  server.addEventListener("putinserver", (event) => {
    print(0, `${event.player.name} joined`);
  });

  function sayHp(player: Player) {
    print(player, `${player.name}, your HP: ${player.health}`);

    if (player.health < 50) player.health = 100;
  }
  ```

  ```ts twoslash [say-hp.test.ts]
  import { expect, test } from "vitest"; // or "bun:test"
  import { loadPlugin } from "../src/testing";

  test("/hp heals a hurt player", async () => {
    const server = await loadPlugin("as/say-hp.ts");
    const player = server.join("Alice", { health: 40 });

    player.say("/hp");
    expect(player.chat).toContain("Alice, your HP: 40");
    expect(player.health).toBe(100);
  }, 60_000);
  ```

  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
TypeScript, not a new language

#description
A plugin is ordinary TypeScript. Everything AssemblyScript and Pawn need — cells, float bit patterns, string buffers — is kept under the hood, in the facade and the generated natives.

#features
  :::u-page-feature
  ---
  icon: i-lucide-braces
  to: /docs/entities
  ---
  #title
  Types you already know

  #description
  Classes, arrays, `Map`, template strings, `number` and `string`. Set a player's health with `player.health = 100` instead of looking up the right native.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list-checks
  to: /docs/hooks
  ---
  #title
  The editor knows the game

  #description
  Every reapi field, player member and hookchain comes with its real type. Event names autocomplete, and a typo fails before it reaches the server.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-hourglass
  to: /docs/async
  ---
  #title
  async and await

  #description
  A real `Promise`: `await sleep(1000)`, `await fetch(url)`, `.then` and `.catch`. The rest of the function runs on a later frame while the server gets on with everything else.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-radio
  to: /docs/hooks
  ---
  #title
  Events like the DOM

  #description
  `server.addEventListener("putinserver", ...)` for AMX Mod X events, `game.addEventListener("takeDamage", ...)` for reapi hookchains, `event.preventDefault()` to block one.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-refresh-cw
  to: /docs/getting-started
  ---
  #title
  Save and play

  #description
  Save a file and the running server rebuilds and reloads it. No amxxpc, no map change, nobody disconnected.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-flask-conical
  to: /docs/testing
  ---
  #title
  Tests without a server

  #description
  Test plugins with Vitest or bun test: a fake server runs the real compiled plugin. Players join, say commands, and timers advance when the test says so.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
---
orientation: horizontal
---
#headline
  :::u-badge
  ---
  color: primary
  variant: subtle
  ---
  Under the hood
  :::

#title
Compiled ahead of time, inside AMX Mod X

#description
amxts does not translate anything into Pawn. The plugin is compiled to WebAssembly by AssemblyScript, then to i386 machine code by WAMR's `wamrc`, and the `amxts_amxx` module loads the result. A native is looked up by name, so every native of every loaded module — and of any other plugin — is reachable.

#features
  :::u-page-feature
  ---
  icon: i-lucide-cpu
  ---
  #title
  Machine code, not an interpreter

  #description
  On the hot path of a real plugin, identical logic runs about three times faster than the Pawn version.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-plug
  ---
  #title
  Any native, typed

  #description
  The generator reads the `.inc` files and writes every native with its signature: reapi, hamsandwich and cstrike are there the moment their include is.
  :::

#default
  :architecture-diagram
::

::u-page-section{class="dark:bg-neutral-950"}
---
orientation: horizontal
reverse: true
---
#headline
  :::u-badge
  ---
  color: primary
  variant: subtle
  ---
  Pawn keeps working
  :::

#title
Pawn plugins can call TypeScript

#description
Every `export function` of a plugin is an AMX Mod X native with its real types, and the build writes the `.inc` a Pawn plugin includes. menu-core and config-core replace their Pawn originals (menu_core, universal_config) this way: compiled `.amxx` plugins work against them unchanged.

#links
  :::u-button
  ---
  to: /docs/natives
  color: neutral
  variant: subtle
  ---
  Read about natives
  :::

#default
  :::code-panel{height="6.5rem"}
  ```ts twoslash [my-plugin.ts]
  /** A value from a config file, or false when the key is not there. */
  export function cfg_get_value(file: string, section: string, key: string) {
    return lookup(file, section, key);   // string | null
  }
  ```

  ```pawn [dist-wasm/my_plugin.inc]
  /** A value from a config file, or false when the key is not there. */
  native bool:cfg_get_value(const file[], const section[], const key[], out[], len);
  ```
  :::
::

::u-page-section{class="dark:bg-linear-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Write your first plugin
      to: '/docs/getting-started'
    - label: Explore modules
      to: '/modules'
      variant: subtle
  title: Menus, configs and HTTP are modules
  description: menu-core, config-core and http ship with the framework, and every package on npm with the amxts-module keyword joins the catalog.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
