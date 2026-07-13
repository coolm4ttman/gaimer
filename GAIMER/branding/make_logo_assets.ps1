# Builds GAIMER shell assets from the supplied logo art (gaimer_logo_source.png).
# Source art is transparent-background "[mascot] GAIMER AI" in an orange->pink gradient.
# Produces: black splash bg, an SVG-wrapped logo for the Editor splash, and mascot-tile
# icons (.ico + SVGs) for the Editor / Project Manager. Re-run to regenerate.
param([string]$Dir = $PSScriptRoot)
Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $Dir 'gaimer_logo_source.png'
$src = New-Object System.Drawing.Bitmap($srcPath)

# --- content + mascot bounding boxes (alpha scan via LockBits) ---
$w = $src.Width; $h = $src.Height
$rect = New-Object System.Drawing.Rectangle(0,0,$w,$h)
$d = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $d.Stride; $buf = New-Object byte[] ($stride*$h)
[System.Runtime.InteropServices.Marshal]::Copy($d.Scan0, $buf, 0, $buf.Length)
$src.UnlockBits($d)
$minX=$w; $minY=$h; $maxX=-1; $maxY=-1; $mMaxX=-1
$leftLimit=[int]($w*0.35)
for ($y=0; $y -lt $h; $y++) { $row=$y*$stride
  for ($x=0; $x -lt $w; $x++) {
    if ($buf[$row+$x*4+3] -gt 24) {
      if ($x -lt $minX){$minX=$x}; if ($x -gt $maxX){$maxX=$x}
      if ($y -lt $minY){$minY=$y}; if ($y -gt $maxY){$maxY=$y}
      if ($x -lt $leftLimit -and $x -gt $mMaxX){$mMaxX=$x}
    }
  }
}
$cw=$maxX-$minX+1; $ch=$maxY-$minY+1
$mW=$mMaxX-$minX+1; $mH=$ch   # mascot occupies full content height on the left

function Crop([System.Drawing.Bitmap]$bmp,[int]$x,[int]$y,[int]$cw,[int]$ch) {
  $out = New-Object System.Drawing.Bitmap($cw,$ch,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), $x,$y,$cw,$ch, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); return $out
}

# trimmed full logo + mascot crop
$logo = Crop $src $minX $minY $cw $ch
$logoTrim = Join-Path $Dir 'gaimer_logo_trimmed.png'
$logo.Save($logoTrim, [System.Drawing.Imaging.ImageFormat]::Png)
$mascot = Crop $src $minX $minY $mW $ch
$mascot.Save((Join-Path $Dir 'gaimer_mascot.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()

# --- 1. solid black splash background (2788x1530) ---
$sw=2788; $sh=1530
$bg = New-Object System.Drawing.Bitmap($sw,$sh)
$g = [System.Drawing.Graphics]::FromImage($bg)
$g.Clear([System.Drawing.Color]::Black)
$bg.Save((Join-Path $Dir 'splashscreen_background.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bg.Dispose()

# --- 2. logo as SVG wrapping the trimmed PNG (shows over black splash) ---
$b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($logoTrim))
$logoSvg = @"
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 $cw $ch">
  <image width="$cw" height="$ch" xlink:href="data:image/png;base64,$b64"/>
</svg>
"@
[System.IO.File]::WriteAllText((Join-Path $Dir 'gaimer_logo.svg'), $logoSvg)

# --- 3. mascot-on-black rounded tile -> icons + PM SVGs ---
$mascotBmp = New-Object System.Drawing.Bitmap((Join-Path $Dir 'gaimer_mascot.png'))
function New-Tile([int]$size) {
  $b = New-Object System.Drawing.Bitmap($size,$size,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($b)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.Clear([System.Drawing.Color]::Transparent)
  $rad=[int]($size*0.20); $dd=$rad*2
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc(0,0,$dd,$dd,180,90); $path.AddArc(($size-$dd),0,$dd,$dd,270,90)
  $path.AddArc(($size-$dd),($size-$dd),$dd,$dd,0,90); $path.AddArc(0,($size-$dd),$dd,$dd,90,90); $path.CloseFigure()
  $g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,8,8,10))), $path)
  # fit mascot with padding, centered
  $pad=$size*0.16; $avail=$size-2*$pad
  $scale=[Math]::Min($avail/$mascotBmp.Width, $avail/$mascotBmp.Height)
  $dw=$mascotBmp.Width*$scale; $dh=$mascotBmp.Height*$scale
  $dx=($size-$dw)/2; $dy=($size-$dh)/2
  $g.DrawImage($mascotBmp, (New-Object System.Drawing.RectangleF($dx,$dy,$dw,$dh)))
  $g.Dispose(); return $b
}

function Save-Ico([string]$file,[int[]]$sizes) {
  $frames=@()
  foreach ($s in $sizes) { $bmp=New-Tile $s; $ms=New-Object System.IO.MemoryStream
    $bmp.Save($ms,[System.Drawing.Imaging.ImageFormat]::Png); $frames+=,@{size=$s;bytes=$ms.ToArray()}; $bmp.Dispose(); $ms.Dispose() }
  $fs=New-Object System.IO.FileStream($file,[System.IO.FileMode]::Create); $bw=New-Object System.IO.BinaryWriter($fs)
  $bw.Write([UInt16]0); $bw.Write([UInt16]1); $bw.Write([UInt16]$frames.Count)
  $off=6+16*$frames.Count
  foreach ($f in $frames){ $dim=if($f.size -ge 256){0}else{$f.size}
    $bw.Write([byte]$dim);$bw.Write([byte]$dim);$bw.Write([byte]0);$bw.Write([byte]0)
    $bw.Write([UInt16]1);$bw.Write([UInt16]32);$bw.Write([UInt32]$f.bytes.Length);$bw.Write([UInt32]$off); $off+=$f.bytes.Length }
  foreach ($f in $frames){ $bw.Write($f.bytes) }
  $bw.Flush();$bw.Close();$fs.Close()
}

Save-Ico (Join-Path $Dir 'gaimer_editor.ico') @(256,128,64,48,32,16)
Save-Ico (Join-Path $Dir 'gaimer_pm.ico')     @(256,128,64,48,32,16)

# PM SVGs wrap a tile PNG at the right viewBox
function Write-TileSvg([int]$tile,[int]$vbW,[int]$vbH,[string]$out) {
  $t=New-Tile $tile; $ms=New-Object System.IO.MemoryStream; $t.Save($ms,[System.Drawing.Imaging.ImageFormat]::Png)
  $b=[Convert]::ToBase64String($ms.ToArray()); $ms.Dispose(); $t.Dispose()
  $x=($vbW-$vbH)/2.0   # center square tile horizontally if viewBox wider than tall
  if ($x -lt 0) { $x = 0 }
  $svg=@"
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 $vbW $vbH">
  <image x="$x" y="0" width="$vbH" height="$vbH" xlink:href="data:image/png;base64,$b"/>
</svg>
"@
  [System.IO.File]::WriteAllText($out, $svg)
}
Write-TileSvg 256 256 256 (Join-Path $Dir 'gaimer_mark_256.svg')
Write-TileSvg 64   38  32 (Join-Path $Dir 'gaimer_mark_38x32.svg')
Write-TileSvg 64   32  32 (Join-Path $Dir 'gaimer_mark_32x32.svg')

$mascotBmp.Dispose(); $logo.Dispose(); $mascot.Dispose()
Write-Output ("Done. Content {0}x{1}, mascot {2}x{1}. Wrote logo + black splash + mascot icons to $Dir" -f $cw,$ch,$mW)
