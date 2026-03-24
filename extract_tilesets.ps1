$files = Get-ChildItem "public\KantoGameData\data\headers\*.asm"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    if ($content -match 'map_header\s+\w+,\s*(\w+),\s*(\w+)') {
        Write-Output "$($matches[1])=$($matches[2])"
    }
}

