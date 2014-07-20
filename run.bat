@echo off

echo Installing npm packages
call npm install

echo Installing bower dependencies
call bower install

echo Preparing distribution
call grunt

echo Opening in browser
start .\dist\index.html

echo Opening tests
start .\test\index.html
