import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    win.webContents.openDevTools();
    win.loadURL('http://localhost:5173');
  // або: win.loadFile('dist/index.html') у продакшн
}

function startBackend() {
  const serverProcess = spawn('node', [path.join(__dirname, 'server', 'server.js')]);

  serverProcess.stdout.on('data', (data) => console.log(`Backend: ${data}`));
  serverProcess.stderr.on('data', (data) => console.error(`Backend error: ${data}`));
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
}).catch(err => {
  console.error('Error:', err);
});
