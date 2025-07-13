import { app, BrowserWindow } from 'electron';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.maximize();
    win.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow)