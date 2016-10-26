(function () {
    'use strict'

    const path = require('path')

    const {app, remote, BrowserWindow, ipcMain, autoUpdater} = require('electron');


    let tray = null
    let win = null
    let quitting = false

    const args = require('./args')
    const squirrel = require('./squirrel')

    const cmd = args.parseArguments(app, process.argv.slice(1)).squirrelCommand
    if (process.platform === 'win32' && squirrel.handleCommand(app, cmd)) {
        return
    }


    const createWindow = () => {
        let params = {
            resizable: true,
            autoHideMenuBar: true,
            webPreferences: {
                webSecurity: false,
                allowDisplayingInsecureContent: true,
                allowRunningInsecureContent: true,
            }
        };
        let win = new BrowserWindow(params);

        win.loadURL("https://reymundoramos.com");

        win.on('close', (evt) => {
            if (quitting) {
                return
            }

            evt.preventDefault()
            win.hide()
        })

        win.on('closed', () => {
            tray = null
            win = null
        })
    }

    app.on('before-quit', () => {
        quitting = true
    }).on('window-all-closed', () => {
        app.quit()
    }).on('ready', () => {
        createWindow()
    })
})();
