// Per-game FAQs for the game pages.
// PLACEHOLDER: answers describe intended product behaviour and each game's modding scene; confirm before launch.
export const gameFaqs: Record<string, [string, string][]> = {
  'gta-v': [
    ['What do I need installed?', 'A PC (Mac coming soon) with GTA V installed. GAIMER sets up FiveM and Script Hook V for you on first run.'],
    ['How does GAIMER mod GTA V?', 'Describe a mod and GAIMER writes it, tests it in a real game session and opens the scene in the visual editor so you can see it in GTA before you ship it.'],
    ['Do I need to know Lua or C#?', 'No. Describe what you want and GAIMER writes the code for you. You can open it at any time, and Pro lets you export it.'],
    ['Is every mod tested before I see it?', 'Yes. GAIMER runs each build in the game and fixes what fails before it hands the mod back to you.'],
    ['Can I use the mods on a server?', 'Yes. Export the tested project on Pro and add it to your own server, including FiveM servers.'],
  ],
  minecraft: [
    ['What do I need installed?', 'A PC (Mac coming soon) with Minecraft: Java Edition installed. GAIMER sets up Fabric, Forge or NeoForge for you on first run.'],
    ['Which loaders does GAIMER support for Minecraft?', 'Fabric, Forge and NeoForge. Pick one when you start a project and GAIMER sets up the mappings, metadata and version targets.'],
    ['Do I need to know Java to mod Minecraft?', 'No. Describe your blocks, mobs or dimensions and GAIMER writes the Java and data files. You can open and edit the code at any time.'],
    ['Can I use my mod on a multiplayer server?', 'Yes. GAIMER exports a standard mod jar, so it runs anywhere the same loader and Minecraft version are installed, including your own server.'],
    ['Does GAIMER work with Bedrock Edition?', 'GAIMER focuses on Java Edition, where loaders like Fabric and Forge make full mods possible.'],
    ['Will my world be safe while I test?', 'GAIMER backs up your world before testing new content, so you can roll back with one click if something goes wrong.'],
  ],
  skyrim: [
    ['What do I need installed?', 'A PC (Mac coming soon) with Skyrim installed. GAIMER sets up SKSE for you on first run.'],
    ['Does GAIMER work with Skyrim Special and Anniversary Edition?', 'Yes. GAIMER checks your game version and matches SKSE and your mods to it before anything is installed.'],
    ['Will new mods conflict with my load order?', 'GAIMER reads every plugin you have installed and checks new records against them, so conflicts are caught before you load in.'],
    ['Do I need the Creation Kit or Papyrus experience?', 'No. GAIMER writes the Papyrus scripts and plugin records for you, and explains what it changed if you want to learn.'],
    ['Are my saves safe?', 'GAIMER backs up your saves before testing any change, so a broken script never costs you a playthrough.'],
    ['Can I share the mods I build?', 'Yes. GAIMER packages your mod as a ready-to-install plugin with notes, so you can share it or upload it to a mod site.'],
  ],
  'cyberpunk-2077': [
    ['What do I need installed?', 'A PC (Mac coming soon) with Cyberpunk 2077 installed. GAIMER sets up REDmod, Cyber Engine Tweaks and redscript for you on first run.'],
    ['Which modding tools does GAIMER use for Cyberpunk 2077?', 'GAIMER works with REDmod, Cyber Engine Tweaks and redscript, the tools the Night City modding community already uses.'],
    ['Do I need to know redscript or Lua?', 'No. Describe the perk, quickhack or tweak you want and GAIMER writes the code. You can read and edit it whenever you like.'],
    ['What happens when CD PROJEKT RED patches the game?', 'GAIMER checks your game version against your tools and mods, and flags anything a patch has broken before you launch.'],
    ['Are my saves safe?', 'GAIMER backs up your saves before testing any change, so you can roll back if a mod doesn’t behave.'],
    ['Can I share the mods I build?', 'Yes. GAIMER packs your mod’s archives and scripts with install notes, ready to share or upload.'],
  ],
  'elden-ring': [
    ['What do I need installed?', 'A PC (Mac coming soon) with Elden Ring installed. GAIMER sets up ModEngine 2 for you on first run.'],
    ['Can I get banned for using mods in Elden Ring?', 'GAIMER mods are for offline play. Launch the game offline when they’re installed, as online play with modified files can lead to a ban.'],
    ['Which modding tools does GAIMER use for Elden Ring?', 'GAIMER edits the game’s params and scripts and loads your mod through ModEngine 2, so your original files stay untouched.'],
    ['Do I need to know how params work?', 'No. Describe the change you want and GAIMER finds the right params and scripts, then explains what it edited.'],
    ['Are my saves safe?', 'GAIMER backs up your saves before testing any change, and keeps modded and unmodded saves apart.'],
    ['Can I share the mods I build?', 'Yes. GAIMER packages your mod for ModEngine 2 with install notes, ready to share with friends or upload.'],
  ],
  'red-dead-redemption-2': [
    ['What do I need installed?', 'A PC (Mac coming soon) with Red Dead Redemption 2 installed. GAIMER sets up RedM for you on first run.'],
    ['Can I get banned for using mods in Red Dead Redemption 2?', 'GAIMER builds mods for story mode only. Never load them into Red Dead Online, where modified game clients can be banned.'],
    ['Which modding tools does GAIMER use for Red Dead 2?', 'RedM, the RDR2 sister project to FiveM. GAIMER builds Red Dead mods the same way it builds GTA V mods: native Lua resources, tested on a real server.'],
    ['Do I need to know how to code?', 'No. Describe the mechanic, job or rebalance you want and GAIMER writes the script. The code is always yours to read and edit.'],
    ['What happens when Rockstar patches the game?', 'GAIMER checks your game version against your tools and tells you when something needs updating, with your backups kept safe.'],
    ['Can I share the mods I build?', 'Yes. Export the tested resource on Pro and add it to any RedM server, or share it with friends.'],
  ],
}
