@echo off
cd /d "%~dp0"
setlocal EnableDelayedExpansion

REM List of tokens to remove
set "tokens=HGSS RBGY RGBY RBY RB GSC GS FRLG"

for /R %%F in (*) do (
    set "filename=%%~nxF"
    set "name=%%~nF"
    set "ext=%%~xF"
    set "newname=!name!"

    REM Replace "Pokémon" with "Pokemon"
    set "newname=!newname:Pokémon=Pokemon!"

    REM Remove tokens
    for %%T in (%tokens%) do (
        set "newname=!newname:%%T=!"
    )

    REM Cleanup double spaces/underscores/hyphens (optional)
    :cleanup
      set "prev=!newname!"
      set "newname=!newname:  = !"
      set "newname=!newname:__=_!"
      set "newname=!newname:--=-!"
    if not "!newname!"=="!prev!" goto cleanup

    REM If name changed, rename. Use ren, not copy
    if /I not "!name!"=="!newname!" (
        echo Renaming: "%%~nxF" → "!newname!!ext!"
        ren "%%~fF" "!newname!!ext!"
    )
)

endlocal
echo Done.
pause
