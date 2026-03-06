@echo off
color 0A
echo ===================================================
echo     INICIANDO O SISTEMA OXENTE PASTEL
echo ===================================================
echo.
echo Por favor, NAO feche esta janela negra! 
echo Ela e o "motor" que faz o site funcionar.
echo.
echo O seu navegador ira abrir automaticamente em instantes...
echo.
echo Para desligar o sistema depois, basta fechar esta janela.
echo ===================================================
echo.

:: Tenta instalar o pacote "serve" silenciosamente e roda na porta 3100
start http://localhost:3100
call npx -y serve . --listen 3100 --no-clipboard

pause
