@echo off
setlocal enabledelayedexpansion

:: Minify anime-effects.js
(
  echo // Minified version of anime-effects.js
  type "js\anime-effects.js" | findstr /v "^//" | findstr /v "^$" | findstr /v "^[[:space:]]*//"
) > "js\anime-effects.min.js"

:: Minify main.js
(
  echo // Minified version of main.js
  type "js\main.js" | findstr /v "^//" | findstr /v "^$" | findstr /v "^[[:space:]]*//"
) > "js\main.min.js"

echo Minification complete!
