'use strict';


// index.js (main process)
// - GUI (renderer process)
// - GUI (renderer process)

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;
const fortune = require(__dirname + '/node_modules/fortune-teller/lib/fortune.js');

let mainWindow;
let settingsWindow;

let menuTemplate = [{
    label: 'MyApp',
    // if Mac, top of menu is application name
    // if dev env, it is Electron
    submenu: [
        {
            label: 'About this app',
            accelerator: 'CmdOrCtrl+Shift+A',
            click: function() { showAboutDialog(); }
        },
        { type: 'separator' },
        {
            label: 'Preferences',
            accelerator: 'CmdOrCtrl+,',
            click: function() { showSettingsWindow(); }
        },
        {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: function() { app.quit(); }
        }
    ]
}];

let menu = Menu.buildFromTemplate(menuTemplate);

ipcMain.on('settings_changed', function(event, color) {
    mainWindow.webContents.send('set_bgcolor', color);
});
ipcMain.on('get_fortune', function(event) {
    event.returnValue = fortune.fortune();
});

function showAboutDialog() {
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        message: 'About This App',
        detail: 'This is awesome app!!!'
    });
}

function showSettingsWindow() {
    settingsWindow = new BrowserWindow({
        width: 480, height: 320
    });
    settingsWindow.loadURL('file://' + __dirname + '/settings.html');
    // settingsWindow.webContents.openDevTools();
    settingsWindow.show();
    settingsWindow.on('closed', function() {
        settingsWindow = null;
    });

}

function createMainWindow() {
    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({
        width: 1080, height: 800
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.webContents.openDevTools();
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
