// Per-game FAQs for the game pages.
// PLACEHOLDER: answers describe intended product behaviour and each game's modding scene; confirm before launch.
export const gameFaqs: Record<string, [string, string][]> = {
  'gta-v': [
    ['Can I get banned for using mods in GTA V?', 'Gaimer builds mods for story mode only. Never load them into GTA Online, where Rockstar bans modified game clients.'],
    ['Do I need to know C# to mod GTA V?', 'No. Describe what you want and Gaimer writes the C# for you. The code is always yours to read and change if you want to learn.'],
    ['Which modding tools does Gaimer use for GTA V?', 'Gaimer works with Script Hook V, ScriptHookVDotNet and OpenIV, the same tools the GTA V modding community already relies on.'],
    ['What happens when Rockstar patches the game?', 'Patches can break Script Hook V until it’s updated. Gaimer tells you when your game version and tools don’t match, and your backups stay safe.'],
    ['Can I share the mods I build?', 'Yes. Gaimer packages your mod with install notes so you can share it with friends or upload it to your favourite mod site.'],
  ],
  minecraft: [
    ['Which loaders does Gaimer support for Minecraft?', 'Fabric, Forge and NeoForge. Pick one when you start a project and Gaimer sets up the mappings, metadata and version targets.'],
    ['Do I need to know Java to mod Minecraft?', 'No. Describe your blocks, mobs or dimensions and Gaimer writes the Java and data files. You can open and edit the code at any time.'],
    ['Can I use my mod on a multiplayer server?', 'Yes. Gaimer exports a standard mod jar, so it runs anywhere the same loader and Minecraft version are installed, including your own server.'],
    ['Does Gaimer work with Bedrock Edition?', 'Gaimer focuses on Java Edition, where loaders like Fabric and Forge make full mods possible.'],
    ['Will my world be safe while I test?', 'Gaimer backs up your world before testing new content, so you can roll back with one click if something goes wrong.'],
  ],
  skyrim: [
    ['Does Gaimer work with Skyrim Special and Anniversary Edition?', 'Yes. Gaimer checks your game version and matches SKSE and your mods to it before anything is installed.'],
    ['Will new mods conflict with my load order?', 'Gaimer reads every plugin you have installed and checks new records against them, so conflicts are caught before you load in.'],
    ['Do I need the Creation Kit or Papyrus experience?', 'No. Gaimer writes the Papyrus scripts and plugin records for you, and explains what it changed if you want to learn.'],
    ['Are my saves safe?', 'Gaimer backs up your saves before testing any change, so a broken script never costs you a playthrough.'],
    ['Can I share the mods I build?', 'Yes. Gaimer packages your mod as a ready-to-install plugin with notes, so you can share it or upload it to a mod site.'],
  ],
  'cyberpunk-2077': [
    ['Which modding tools does Gaimer use for Cyberpunk 2077?', 'Gaimer works with REDmod, Cyber Engine Tweaks and redscript, the tools the Night City modding community already uses.'],
    ['Do I need to know redscript or Lua?', 'No. Describe the perk, quickhack or tweak you want and Gaimer writes the code. You can read and edit it whenever you like.'],
    ['What happens when CD PROJEKT RED patches the game?', 'Gaimer checks your game version against your tools and mods, and flags anything a patch has broken before you launch.'],
    ['Are my saves safe?', 'Gaimer backs up your saves before testing any change, so you can roll back if a mod doesn’t behave.'],
    ['Can I share the mods I build?', 'Yes. Gaimer packs your mod’s archives and scripts with install notes, ready to share or upload.'],
  ],
  'elden-ring': [
    ['Can I get banned for using mods in Elden Ring?', 'Gaimer mods are for offline play. Launch the game offline when they’re installed, as online play with modified files can lead to a ban.'],
    ['Which modding tools does Gaimer use for Elden Ring?', 'Gaimer edits the game’s params and scripts and loads your mod through ModEngine 2, so your original files stay untouched.'],
    ['Do I need to know how params work?', 'No. Describe the change you want and Gaimer finds the right params and scripts, then explains what it edited.'],
    ['Are my saves safe?', 'Gaimer backs up your saves before testing any change, and keeps modded and unmodded saves apart.'],
    ['Can I share the mods I build?', 'Yes. Gaimer packages your mod for ModEngine 2 with install notes, ready to share with friends or upload.'],
  ],
  'red-dead-redemption-2': [
    ['Can I get banned for using mods in Red Dead Redemption 2?', 'Gaimer builds mods for story mode only. Never load them into Red Dead Online, where modified game clients can be banned.'],
    ['Which modding tools does Gaimer use for Red Dead 2?', 'Gaimer works with ScriptHookRDR2 and Lenny’s Mod Loader, the tools the Red Dead modding community already relies on.'],
    ['Do I need to know how to code?', 'No. Describe the mechanic, job or rebalance you want and Gaimer writes the script. The code is always yours to read and edit.'],
    ['What happens when Rockstar patches the game?', 'Gaimer checks your game version against your tools and tells you when something needs updating, with your backups kept safe.'],
    ['Can I share the mods I build?', 'Yes. Gaimer packages your mod for Lenny’s Mod Loader with install notes, ready to share or upload.'],
  ],
}
