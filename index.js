'use strict';

// index.js (main process)
// - GUI (renderer process)
// - GUI (renderer process)

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1080, height: 800
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', function(){
    createMainWindow();
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createMainWindow();
    }
});
