"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var mainWindow;
var developMode = false;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 180,
        width: 370,
        alwaysOnTop: !developMode,
        skipTaskbar: !developMode,
        resizable: developMode,
        minimizable: developMode,
        maximizable: developMode,
        autoHideMenuBar: true
    });
    electron_1.globalShortcut.register('f5', function () {
        mainWindow.reload();
    });
    electron_1.globalShortcut.register('CommandOrControl+R', function () {
        mainWindow.reload();
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    var menu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Indstillinger',
                    click: function () {
                        mainWindow.webContents.send("menu", { type: "indstillinger" });
                    }
                },
                {
                    label: 'DevTools',
                    click: function () {
                        mainWindow.maximize();
                        mainWindow.webContents.openDevTools();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    click: function () {
                        electron_1.app.quit();
                    }
                }
            ]
        }
    ]);
    electron_1.Menu.setApplicationMenu(menu);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=main.js.map