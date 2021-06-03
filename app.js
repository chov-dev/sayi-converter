const { app, BrowserWindow } = require("electron");
const {ipcMain} = require("electron")

let win;

function createWindow() {
    win = new BrowserWindow({width:600, height:925, frame : false, center:true,     webPreferences: {
        nodeIntegration: true,contextIsolation: false,
    }});
    win.loadURL(`file://${__dirname}/index.html`);
    win.on("closed", () => { win = null; });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") { app.quit();
} });

app.on("activate", () => { if (win === null) { createWindow();
} });


ipcMain.on('close-me', (evt, arg) => {
    app.quit()
  })