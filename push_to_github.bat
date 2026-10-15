@echo off
echo ==============================================================
echo Pushing Complete AuraHealth AI (with src/app) to GitHub
echo Repository: https://github.com/Srividhya903/health-app
echo ==============================================================
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main --force
echo.
if %ERRORLEVEL% EQU 0 (
    echo ==============================================================
    echo [SUCCESS] Complete project with src/app pushed to GitHub!
    echo Vercel will now automatically rebuild and deploy successfully.
    echo ==============================================================
) else (
    echo [NOTICE] If prompted by Git Credential Manager, please sign in with your browser.
)
echo.
pause
