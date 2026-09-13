<#
.SYNOPSIS
  Launch the GAIMER (O3DE fork) Editor against the GaimerSandbox project, forcing the RTX 5080.
.DESCRIPTION
  This machine is hybrid-GPU (AMD Radeon iGPU + NVIDIA RTX 5080). O3DE's RHISystem picks the FIRST
  AMD-or-NVIDIA adapter (Gems/Atom/RHI/Code/Source/RHI/RHISystem.cpp:166), which is the iGPU, so an
  unmodified launch renders on the iGPU. The engine's own `forceAdapter` command-line value (line 144)
  selects the 5080. Keeping that in this separable GAIMER script means no O3DE core edit and no Windows
  setting (golden rule). See GAIMER/docs/PHASE2_PLAN.md "M0 Results".
.PARAMETER Project   Project path. Default: GAIMER\Projects\GaimerSandbox in this repo.
.PARAMETER Adapter   Substring of the adapter name to force (lowercase-contains match). Default: nvidia.
.PARAMETER Smoke     Also run GAIMER\scripts\editor_smoke_check.py via --runpython (writes <project>\user\gaimer_editor_smoke.json).
.PARAMETER ExtraArgs Additional Editor arguments, passed through verbatim.
.EXAMPLE
  .\GAIMER\scripts\launch_editor.ps1
  .\GAIMER\scripts\launch_editor.ps1 -Smoke
#>
param(
    [string]$Project = "",
    [string]$Adapter = "nvidia",
    [switch]$Smoke,
    [string[]]$ExtraArgs = @()
)
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path          # GAIMER\scripts -> repo root
if (-not $Project) { $Project = Join-Path $repo 'GAIMER\Projects\GaimerSandbox' }
$editor = Join-Path $repo 'build\windows\bin\profile\Editor.exe'
if (-not (Test-Path $editor)) { throw "Editor not built at: $editor" }
if (-not (Test-Path (Join-Path $Project 'project.json'))) { throw "Not a project (no project.json): $Project" }

$edArgs = @("--project-path", "`"$Project`"", "--forceAdapter=$Adapter", "--skipWelcomeScreenDialog")
if ($Smoke) { $edArgs += @("--runpython", "`"$(Join-Path $PSScriptRoot 'editor_smoke_check.py')`"") }
$edArgs += $ExtraArgs

Write-Host "Launching: $editor $($edArgs -join ' ')"
$p = Start-Process -FilePath $editor -ArgumentList $edArgs -PassThru
Write-Host "Editor PID $($p.Id). Verify GPU: nvidia-smi should list Editor.exe as C+G; nvwgf2umx.dll should be loaded."
