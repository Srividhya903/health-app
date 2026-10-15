@echo off
echo ==============================================
echo Pushing AuraHealth AI to GitHub: Srividhya903/health-app
echo ==============================================
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] All files pushed successfully to https://github.com/Srividhya903/health-app
) else (
    echo [NOTICE] If prompted by Git Credential Manager, please sign in with your browser.
)
echo.
pause
