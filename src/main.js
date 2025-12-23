const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const filePath = __dirname + "/data/config.json";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.maximize();
    win.loadFile('src/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('get-settings-data', () => {
    const jsonFile = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonFile);
})

ipcMain.on('updated-settings', (event, data) =>{
    try{
        const folderPath = path.dirname(filePath);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch(error){
        console.error(error);
    }

})