---
title: Xen
seo:
  title: Xen - плагины для CS 1.6 на TypeScript
description: Плагины AMX Mod X для Counter-Strike 1.6 на TypeScript. Xen компилирует плагин в машинный код и запускает его внутри AMX Mod X рядом с Pawn-плагинами.
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
  color: neutral
  variant: subtle
  ---
  AMX Mod X · Counter-Strike 1.6
  :::

#title
Плагины для CS 1.6 на [TypeScript]{.text-primary}.

#description
Пишите плагин так же, как любой код на TypeScript: привычные типы, классы, `Map`, `async`/`await`, события. Xen компилирует его в WebAssembly, затем заранее в машинный код и запускает внутри модуля AMX Mod X - рядом с вашими Pawn-плагинами.

#links
  :::u-button
  ---
  to: /ru/docs/getting-started
  size: xl
  ---
  Начать
  :::

  :::u-button
  ---
  to: /ru/modules
  size: xl
  color: neutral
  variant: subtle
  ---
  Модули
  :::

#default
  :::hero-code
  ```ts [say-hp.ts]
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

  ```ts [say-hp.test.ts]
  import { expect, test } from "bun:test";
  import { loadPlugin } from "../src/testing";

  test("/hp tells the player's health", async () => {
    const server = await loadPlugin("as/say-hp.ts");
    const player = server.join("Alice", { health: 100 });

    player.say("/hp");
    expect(player.chat).toContain("Alice, your HP: 100");
  });
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
TypeScript, а не новый язык

#description
Плагин - обычный TypeScript. Всё, что нужно AssemblyScript и Pawn - ячейки, битовые представления дробных, строковые буферы, - спрятано под капот: в фасад и сгенерированные нативы.

#features
  :::u-page-feature
  ---
  icon: i-lucide-braces
  to: /ru/docs/entities
  ---
  #title
  Привычные типы

  #description
  Классы, массивы, `Map`, шаблонные строки, `number` и `string`. Здоровье игрока задаётся как `player.health = 100`, без поиска нужного натива.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-list-checks
  to: /ru/docs/hooks
  ---
  #title
  Редактор знает игру

  #description
  Каждое поле reapi, член игрока и хукчейн приходят со своим настоящим типом. Имена событий подсказываются, а опечатка ломает сборку до того, как попадёт на сервер.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-hourglass
  to: /ru/docs/async
  ---
  #title
  async и await

  #description
  Настоящий `Promise`: `await sleep(1000)`, `await fetch(url)`, `.then` и `.catch`. Остаток функции выполняется в одном из следующих кадров, а сервер тем временем занят остальным.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-radio
  to: /ru/docs/hooks
  ---
  #title
  События как в DOM

  #description
  `server.addEventListener("putinserver", ...)` для событий AMX Mod X, `game.addEventListener("takeDamage", ...)` для хукчейнов reapi, `event.preventDefault()`, чтобы заблокировать.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-refresh-cw
  to: /ru/docs/getting-started
  ---
  #title
  Сохранил и играешь

  #description
  `bun run dev` пересобирает плагины, которых коснулось сохранение, выкладывает их и перезагружает запущенный сервер через rcon. Без amxxpc, без смены карты, никого не выкидывает.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-flask-conical
  to: /ru/docs/testing
  ---
  #title
  Тесты без сервера

  #description
  `bun test` загружает настоящий скомпилированный код плагина в поддельный сервер на TypeScript: игроки заходят, пишут команды, а таймеры идут, когда это скажет тест.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
---
orientation: horizontal
---
#headline
Под капотом

#title
Заранее скомпилирован, работает внутри AMX Mod X

#description
Xen ничего не переводит в Pawn. Плагин компилируется в WebAssembly компилятором AssemblyScript, затем в машинный код i386 утилитой `wamrc` из WAMR, и модуль `xen_amxx` загружает результат. Натив ищется по имени, поэтому доступен любой натив любого загруженного модуля - и любого другого плагина.

#features
  :::u-page-feature
  ---
  icon: i-lucide-cpu
  ---
  #title
  Машинный код, а не интерпретатор

  #description
  На горячем пути настоящего плагина та же логика работает примерно в три раза быстрее, чем версия на Pawn.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-plug
  ---
  #title
  Любой натив, с типами

  #description
  Генератор читает `.inc`-файлы и описывает каждый натив с его сигнатурой: reapi, hamsandwich и cstrike доступны, как только есть их инклуд.
  :::

#default
  :::prose-pre
  ---
  code: |
    CS 1.6 server
    └── AMX Mod X
        ├── xen_amxx.dll ── WAMR ── your .aot plugins
        │        │
        │        └── resolves natives by name in ↓
        └── xen_host.amxx (generated, holds no logic)
  ---

  ```text
  CS 1.6 server
  └── AMX Mod X
      ├── xen_amxx.dll ── WAMR ── your .aot plugins
      │        │
      │        └── resolves natives by name in ↓
      └── xen_host.amxx (generated, holds no logic)
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
---
orientation: horizontal
reverse: true
---
#headline
Pawn продолжает работать

#title
Pawn-плагины вызывают TypeScript

#description
Каждая `export function` плагина - это натив AMX Mod X с настоящими типами, а сборка пишет `.inc`, который подключает Pawn-плагин. Так menu-core и universal-config заменяют свои оригиналы на Pawn: скомпилированные `.amxx` работают с ними без изменений.

#links
  :::u-button
  ---
  to: /ru/docs/natives
  color: neutral
  variant: subtle
  trailing-icon: i-lucide-arrow-right
  ---
  Нативы
  :::

#default
  :::prose-pre
  ---
  filename: my-plugin.ts
  code: |
    /** A value from a config file, or false when the key is not there. */
    export function cfg_get_value(file: string, section: string, key: string) {
      return lookup(file, section, key);   // string | null
    }
  ---

  ```ts [my-plugin.ts]
  /** A value from a config file, or false when the key is not there. */
  export function cfg_get_value(file: string, section: string, key: string) {
    return lookup(file, section, key);   // string | null
  }
  ```
  :::

  :::prose-pre
  ---
  filename: dist-wasm/my_plugin.inc
  code: |
    /** A value from a config file, or false when the key is not there. */
    native bool:cfg_get_value(const file[], const section[], const key[], out[], len);
  ---

  ```c [dist-wasm/my_plugin.inc]
  /** A value from a config file, or false when the key is not there. */
  native bool:cfg_get_value(const file[], const section[], const key[], out[], len);
  ```
  :::
::

::u-page-section{class="dark:bg-linear-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Первый плагин
      to: '/ru/docs/getting-started'
      trailingIcon: i-lucide-arrow-right
    - label: Модули
      to: '/ru/modules'
      variant: subtle
  title: Меню, конфиги и HTTP - это модули
  description: menu-core, universal-config и http поставляются с фреймворком, а каждый пакет на npm с ключевым словом xen-module попадает в каталог.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
