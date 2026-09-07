@echo off
title RyzeLog Production Platform
echo ====================================================
echo   Starting RyzeLog - Full Production Trading Platform
echo ====================================================

:: Set local tools PATH if needed
set PATH=%~dp0..\tools\node;%~dp0..\tools\git\cmd;%PATH%

start "" http://localhost:8000
python "%~dp0server\server.py"
pause
