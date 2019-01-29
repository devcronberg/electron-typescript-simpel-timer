import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";

const developMode = false;

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 180,
    width: 370,
    alwaysOnTop: !developMode,
    skipTaskbar: !developMode,
    resizable: developMode,
    minimizable: developMode,
    maximizable: developMode,
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  const menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {
          label: "Indstillinger",
          accelerator: "CmdOrCtrl+I",
          click() {
            mainWindow.webContents.send("menu", { type: "indstillinger" });
          }
        },
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click() {
            mainWindow.reload();
          }
        },
        {
          label: "DevTools",
          accelerator: "CmdOrCtrl+D",
          click() {
            mainWindow.maximize();
            mainWindow.webContents.openDevTools();
          }
        },
        { type: "separator" },
        {
          label: "Exit",
          accelerator: "CmdOrCtrl+X",
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
