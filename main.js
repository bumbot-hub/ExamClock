const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

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

    win.loadFile('index.html');
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



const filePath = __dirname + "/data/config.json"

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
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    } catch(error){
        console.error(error);
    }

})