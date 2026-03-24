$headers = Get-ChildItem "public\KantoGameData\data\headers\*.asm"
$objects = Get-ChildItem "public\KantoGameData\data\objects\*.asm"

# Build border block lookup from objects
$borderBlocks = @{}
foreach ($f in $objects) {
    $content = Get-Content $f.FullName -Raw
    $baseName = $f.BaseName
    if ($content -match 'db \$([0-9a-fA-F]+)\s*;\s*border block') {
        $borderBlocks[$baseName] = [Convert]::ToInt32($matches[1], 16)
    }
}

# Extract header info with border blocks
foreach ($f in $headers) {
    $content = Get-Content $f.FullName -Raw
    if ($content -match 'map_header\s+(\w+),\s*(\w+),\s*(\w+)') {
        $blkName = $matches[1]
        $mapKey = $matches[2]
        $tileset = $matches[3]
        $bb = if ($borderBlocks.ContainsKey($blkName)) { $borderBlocks[$blkName] } else { -1 }
        Write-Output "$mapKey|$blkName|$tileset|$bb"
    }
}

