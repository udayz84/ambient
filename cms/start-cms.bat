@echo off
set "NODE_PATH=%~dp0node-v20.11.1-win-x64\node.exe"
if not exist "%NODE_PATH%" (
  echo Error: Node 20 not found.
  exit /b 1
)

echo Using Node 20 at %NODE_PATH%
"%NODE_PATH%" node_modules\@strapi\strapi\bin\strapi.js develop
