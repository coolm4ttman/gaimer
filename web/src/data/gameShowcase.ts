// Per-game content for the four feature boxes on each game page (same format as the home page). Each game is modded
// differently, so every box names that game's real toolchain: the language GAIMER writes, how it tests the change,
// the files it produces and how the finished mod is installed.
// PLACEHOLDER: only GTA V (via FiveM) is live in GAIMER today; the other games describe the intended workflow.

export interface GameShowcase {
  project: string
  testIn: string // composer button label, e.g. "Test in Minecraft"
  ask: {
    body: string
    earlier: string
    earlierResult: string
    request: string
    question: string
    hint: string
    options: string[]
  }
  test: {
    title: string
    body: string
    badge: string
    phases: [string, string][]
    log: [string, string][]
    passed: string[]
  }
  code: {
    title: string
    body: string
    lang: 'lua' | 'java' | 'papyrus' | 'redscript' | 'csv' | 'cpp'
    files: string[]
    active: number
    snippet: string
  }
  ship: {
    title: string
    body: string
    output: string
    contents: string[]
    install: string[]
  }
}

export const gameShowcase: Record<string, GameShowcase> = {
  'gta-v': {
    project: 'Taxi Side Job',
    testIn: 'Test in GTA',
    ask: {
      body: 'Describe a job, mechanic or mission in plain English. GAIMER asks about anything unclear, then writes a native FiveM resource in Lua.',
      earlier: 'Add a taxi side job with fares across Los Santos.',
      earlierResult: 'Press E in any taxi to start a shift. Fares spawn around the city and pay on drop-off.',
      request: 'Add tips and a star rating for each ride.',
      question: 'How should tips work?',
      hint: 'I can scale tips by how fast and how smoothly you drive.',
      options: ['Speed only', 'Smooth driving', 'Both'],
    },
    test: {
      title: 'Tested on a real FiveM server first',
      body: 'Every change runs on a licensed FiveM test server before you see it. If something breaks, GAIMER fixes it and tests again.',
      badge: 'Tested on FiveM',
      phases: [
        ['Writing the Lua resource', '0:22'],
        ['Starting a FiveM test server', '0:12'],
        ['Driving a test fare', '0:41'],
      ],
      log: [
        ['[HARNESS]', 'taxi_job started'],
        ['[GAIMER]', 'shift started · vehicle=taxi'],
        ['[GAIMER]', 'fare picked up · Vespucci'],
        ['[GAIMER]', 'drop-off · paid $86 + $14 tip'],
        ['[GAIMER]', 'rating saved · 5 stars'],
      ],
      passed: ['Resource loads', 'Fare loop', 'Tips + rating', 'No script errors'],
    },
    code: {
      title: 'Edit the world or the Lua',
      body: 'Open the scene in the GTA world editor to move pickups and markers, or read the Lua GAIMER wrote. Both stay in sync.',
      lang: 'lua',
      files: ['fxmanifest.lua', 'client.lua', 'server.lua', 'config.lua'],
      active: 2,
      snippet: `-- Pay the fare plus a tip for smooth driving
RegisterNetEvent('taxi:dropoff', function(fare, smooth)
  local src = source
  local tip = math.floor(fare * (smooth and 0.2 or 0.05))
  exports.money:add(src, fare + tip)
  TriggerClientEvent('taxi:rate', src, smooth and 5 or 3)
end)`,
    },
    ship: {
      title: 'Export a resource for any server',
      body: 'Every change is a saved version you can undo. Export the exact resource that passed and drop it into your server.',
      output: 'taxi_job.zip',
      contents: ['fxmanifest.lua', 'client.lua', 'server.lua', 'config.lua'],
      install: ['Copy taxi_job into resources/', 'Add ensure taxi_job to server.cfg', 'Restart the server'],
    },
  },
  minecraft: {
    project: 'Torch Thief',
    testIn: 'Test in Minecraft',
    ask: {
      body: 'Describe a block, mob or mechanic. GAIMER asks what it needs to know, then writes a Fabric mod in Java with its models and lang files.',
      earlier: 'Create a mob that steals torches at night.',
      earlierResult: 'Torch Thieves spawn after dark, grab the nearest torch and run. Kill one to get your torches back.',
      request: 'Make them avoid lit areas.',
      question: 'How bright is too bright?',
      hint: 'I can make them flee above a light level you choose.',
      options: ['Light 7+', 'Light 10+', 'Only torchlight'],
    },
    test: {
      title: 'Tested in a real Minecraft client',
      body: 'GAIMER builds your mod with Gradle, launches a Fabric dev client and runs game tests in a fresh world before you load it.',
      badge: 'Tested on Fabric 1.21',
      phases: [
        ['Writing Java and assets', '0:28'],
        ['Building with Gradle', '0:19'],
        ['Running game tests', '0:34'],
      ],
      log: [
        ['[Gradle]', 'BUILD SUCCESSFUL in 18s'],
        ['[Fabric]', 'Loading 1 mod: torchthief 1.0.0'],
        ['[GameTest]', 'thief_spawns_at_night passed'],
        ['[GameTest]', 'thief_steals_torch passed'],
        ['[GameTest]', 'thief_flees_light_10 passed'],
      ],
      passed: ['Compiles', 'Mod loads', 'Spawn rules', 'Light check'],
    },
    code: {
      title: 'Real Java you can open',
      body: 'GAIMER registers the entity, writes its AI goals and adds the model, loot table and lang entries. Read or change any of it.',
      lang: 'java',
      files: ['fabric.mod.json', 'TorchThiefEntity.java', 'FleeLightGoal.java', 'en_us.json'],
      active: 2,
      snippet: `public class FleeLightGoal extends Goal {
  private final TorchThiefEntity thief;

  @Override
  public boolean canStart() {
    // Run from anything brighter than light level 10
    return thief.getWorld().getLightLevel(thief.getBlockPos()) >= 10;
  }
}`,
    },
    ship: {
      title: 'One jar, ready for any Fabric install',
      body: 'Every change is a saved version. Export a standard mod jar that runs anywhere with the same loader and Minecraft version.',
      output: 'torchthief-1.0.0.jar',
      contents: ['fabric.mod.json', 'com/torchthief/*.class', 'assets/torchthief/', 'data/torchthief/loot_tables/'],
      install: ['Install Fabric Loader 1.21', 'Drop the jar into .minecraft/mods', 'Works on your own server too'],
    },
  },
  skyrim: {
    project: 'Dragon Loot',
    testIn: 'Test in Skyrim',
    ask: {
      body: 'Describe a quest, perk or loot change. GAIMER asks first, then writes Papyrus scripts and the plugin records to go with them.',
      earlier: 'Make dragons drop legendary loot.',
      earlierResult: 'Every dragon now carries a legendary item from a new loot list, scaled to your level.',
      request: 'Make the loot rarer on lower difficulties.',
      question: 'How should difficulty change it?',
      hint: 'I can scale the drop chance by your difficulty setting.',
      options: ['Novice 10%', 'Legendary 50%', 'Scale evenly'],
    },
    test: {
      title: 'Checked against your load order, then tested',
      body: 'GAIMER compiles the scripts, checks the new records against every plugin you run, then loads a test save with SKSE.',
      badge: 'Tested in Skyrim SE',
      phases: [
        ['Compiling Papyrus', '0:09'],
        ['Checking 214 plugins', '0:06'],
        ['Loading a test save', '0:44'],
      ],
      log: [
        ['[Compiler]', 'DragonLoot.psc → DragonLoot.pex'],
        ['[LoadOrder]', '0 conflicts · DragonLoot.esp slot FE 001'],
        ['[SKSE]', 'Skyrim 1.6.1170 · SKSE 2.2.6'],
        ['[Papyrus]', 'OnDeath · dragon at Whiterun'],
        ['[Papyrus]', 'Dropped Dragonbone Greatsword (roll 0.31)'],
      ],
      passed: ['Scripts compile', 'No conflicts', 'Loot list', 'Save safe'],
    },
    code: {
      title: 'Papyrus and records, written for you',
      body: 'GAIMER writes the Papyrus, adds the leveled lists and quest records to an ESP, and explains every change it made.',
      lang: 'papyrus',
      files: ['DragonLoot.esp', 'DragonLoot.psc', 'DragonLootQuest.psc', 'LItemDragonLegendary'],
      active: 1,
      snippet: `Scriptname DragonLoot extends ReferenceAlias

LeveledItem Property LegendaryLoot Auto
GlobalVariable Property GameDifficulty Auto

Event OnDeath(Actor akKiller)
  ; Higher difficulty, better odds
  Float chance = 0.1 + GameDifficulty.GetValue() * 0.08
  If Utility.RandomFloat() < chance
    GetReference().AddItem(LegendaryLoot)
  EndIf
EndEvent`,
    },
    ship: {
      title: 'Packaged for your mod manager',
      body: 'Every change is a saved version, and your saves are backed up before each test. Export a ready-to-install archive.',
      output: 'DragonLoot.7z',
      contents: ['DragonLoot.esp', 'Scripts/DragonLoot.pex', 'Scripts/Source/DragonLoot.psc', 'README.txt'],
      install: ['Install with Mod Organizer 2 or Vortex', 'Enable DragonLoot.esp', 'Needs SKSE'],
    },
  },
  'cyberpunk-2077': {
    project: 'Netrunner Perks',
    testIn: 'Test in Cyberpunk',
    ask: {
      body: 'Describe a perk, quickhack or cyberware. GAIMER asks first, then writes redscript and TweakXL records for Night City.',
      earlier: 'Add a cyberware that slows time when you dodge.',
      earlierResult: 'Reflex Weave slows time to 30% for two seconds after a perfect dodge, with a 20 second cooldown.',
      request: 'Add a netrunner perk that refunds RAM on kills.',
      question: 'How much RAM should it refund?',
      hint: 'I can refund a flat amount or a share of the quickhack’s cost.',
      options: ['2 RAM', '25% of cost', 'Full cost'],
    },
    test: {
      title: 'Compiled and hot-reloaded into your game',
      body: 'GAIMER compiles the redscript, validates the tweaks, then hot-reloads them into your running game so you can try them straight away.',
      badge: 'Tested on 2.2',
      phases: [
        ['Writing redscript and tweaks', '0:24'],
        ['Compiling scripts', '0:05'],
        ['Hot-reloading into the game', '0:08'],
      ],
      log: [
        ['[redscript]', 'compiled 3 files · 0 errors'],
        ['[TweakXL]', 'loaded NetrunnerPerks.yaml'],
        ['[RHT]', 'hot reload complete'],
        ['[GAIMER]', 'kill with Short Circuit · RAM +3'],
        ['[GAIMER]', 'perk shown in Intelligence tree'],
      ],
      passed: ['Compiles', 'Tweaks valid', 'Hot reload', 'Perk works'],
    },
    code: {
      title: 'redscript and tweaks you can read',
      body: 'Game logic goes in redscript, stats and perk records in TweakXL YAML. GAIMER keeps them matched to your game version.',
      lang: 'redscript',
      files: ['NetrunnerPerks.reds', 'RamRefund.reds', 'NetrunnerPerks.yaml', 'en-us.json'],
      active: 1,
      snippet: `@wrapMethod(PlayerPuppet)
protected cb func OnTargetKilled(evt: ref<TargetKilledEvent>) -> Bool {
  // Refund a quarter of the quickhack's RAM cost
  if HasPerk(this, n"RamRefund") && evt.byQuickhack {
    RestoreMemory(this, evt.hackCost * 0.25);
  }
  return wrappedMethod(evt);
}`,
    },
    ship: {
      title: 'Archived in the folders the game expects',
      body: 'Every change is a saved version you can undo. Export an archive laid out exactly how Cyberpunk mods install.',
      output: 'NetrunnerPerks.zip',
      contents: ['r6/scripts/NetrunnerPerks/*.reds', 'r6/tweaks/NetrunnerPerks.yaml', 'archive/pc/mod/', 'README.txt'],
      install: ['Extract into the game folder', 'Needs redscript and TweakXL', 'Or install with Vortex'],
    },
  },
  'elden-ring': {
    project: 'Co-op Rebalance',
    testIn: 'Test in Elden Ring',
    ask: {
      body: 'Describe a rebalance or a new rule. GAIMER asks first, then edits the game’s params and events to match.',
      earlier: 'Scale enemies to the size of my co-op party.',
      earlierResult: 'Enemy health now scales by 1.4× per extra player, and damage by 1.15×.',
      request: 'Make every boss drop a unique talisman.',
      question: 'Which talismans should drop?',
      hint: 'I can add new talismans or reuse ones from the base game.',
      options: ['New ones', 'Base game', 'Mix of both'],
    },
    test: {
      title: 'Tested offline, so your save stays safe',
      body: 'GAIMER checks every param it changed, backs up your save, then launches the game offline through ModEngine 2 to try it.',
      badge: 'Tested offline',
      phases: [
        ['Editing params', '0:14'],
        ['Backing up your save', '0:02'],
        ['Launching with ModEngine 2', '0:36'],
      ],
      log: [
        ['[Params]', 'ItemLotParam_enemy · 24 rows changed'],
        ['[Params]', 'EquipParamAccessory · 24 rows added'],
        ['[Save]', 'ER0000.sl2 backed up'],
        ['[ME2]', 'regulation.bin loaded · online off'],
        ['[GAIMER]', 'Margit defeated · dropped Talisman of the Omen'],
      ],
      passed: ['Params valid', 'Save backed up', 'Boss drops', 'Offline only'],
    },
    code: {
      title: 'Param changes, side by side',
      body: 'Elden Ring mods are mostly param edits. GAIMER shows every row it changed, old value next to new, so nothing is a mystery.',
      lang: 'csv',
      files: ['regulation.bin', 'ItemLotParam_enemy', 'EquipParamAccessory', 'config_eldenring.toml'],
      active: 1,
      snippet: `; ItemLotParam_enemy · boss drops
ID,       Name,                  lotItemId01, lotItemBasePoint01
10000000, Margit the Fell Omen,  1500,        1000
10010000, Godrick the Grafted,   1510,        1000
10020000, Rennala,               1520,        1000
; 1500+ are new talismans in EquipParamAccessory`,
    },
    ship: {
      title: 'A mod folder for ModEngine 2',
      body: 'Every change is a saved version you can undo. Export a folder that ModEngine 2 loads, with online play kept off.',
      output: 'coop-rebalance.zip',
      contents: ['mod/regulation.bin', 'mod/msg/engus/item.msgbnd.dcx', 'config_eldenring.toml', 'README.txt'],
      install: ['Extract next to ModEngine 2', 'Launch with launchmod_eldenring.bat', 'Offline only, never online'],
    },
  },
  // RDR2 uses RedM, Cfx.re's sister project to FiveM: the same Lua resources, fxmanifest and server workflow as GTA V.
  'red-dead-redemption-2': {
    project: 'Bounty Boards',
    testIn: 'Test in RDR2',
    ask: {
      body: 'Describe how the frontier should play. GAIMER asks first, then writes a native RedM resource in Lua, the same way it builds GTA V mods.',
      earlier: 'Rebalance horse stamina and bonding.',
      earlierResult: 'Horses now lose stamina 30% slower, and bonding levels up twice as fast.',
      request: 'Add a bounty board in every town.',
      question: 'What should bounties pay?',
      hint: 'I can scale rewards by distance or by how dangerous the target is.',
      options: ['By distance', 'By danger', 'Both'],
    },
    test: {
      title: 'Tested on a real RedM server first',
      body: 'Every change runs on a RedM test server before you see it. If something breaks, GAIMER fixes it and tests again.',
      badge: 'Tested on RedM',
      phases: [
        ['Writing the Lua resource', '0:21'],
        ['Starting a RedM test server', '0:13'],
        ['Taking a test bounty', '0:39'],
      ],
      log: [
        ['[HARNESS]', 'bounty_boards started'],
        ['[GAIMER]', 'boards placed · 9 towns'],
        ['[GAIMER]', 'bounty taken · Valentine'],
        ['[GAIMER]', 'target delivered · paid $85'],
        ['[GAIMER]', 'no script errors'],
      ],
      passed: ['Resource loads', 'Boards placed', 'Rewards', 'No script errors'],
    },
    code: {
      title: 'Edit the world or the Lua',
      body: 'Place boards and markers in the world, or read the Lua GAIMER wrote against RDR2’s natives. Both stay in sync.',
      lang: 'lua',
      files: ['fxmanifest.lua', 'client.lua', 'server.lua', 'config.lua'],
      active: 2,
      snippet: `-- Pay more for dangerous targets far from town
local function rewardFor(bounty)
  local miles = #(bounty.town - bounty.target) / 1609.0
  local base = 25 + math.floor(miles * 12)
  return bounty.dangerous and base * 2 or base
end`,
    },
    ship: {
      title: 'Export a resource for any RedM server',
      body: 'Every change is a saved version you can undo. Export the exact resource that passed and drop it into your server.',
      output: 'bounty_boards.zip',
      contents: ['fxmanifest.lua', 'client.lua', 'server.lua', 'config.lua'],
      install: ['Copy bounty_boards into resources/', 'Add ensure bounty_boards to server.cfg', 'Restart the server'],
    },
  },
}
