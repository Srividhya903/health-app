@echo off
SET GIT="C:\Program Files\Git\bin\git.exe"

%GIT% add -A
%GIT% commit -m "chore: update README and finalize project for Vercel deployment"
%GIT% push origin main

echo.
echo ==========================================
echo Push complete! Check GitHub for results.
echo ==========================================
pause
