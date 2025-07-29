import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Шляхи до файлів
const userDataDir = path.join(app.getPath('userData'), 'DocsCadr');
const tempDir = path.join(app.getPath('temp'), 'DocsCadr');

function ensureDir(dir){
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
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
  ensureDir(userDataDir);
  ensureDir(tempDir);
  startBackend();
  createWindow();
}).catch(err => {
  console.error('Error:', err);
});

ipcMain.handle('read-file', (_, filename) => {
  const filePath = path.join(userDataDir, filename);
  if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf-8');
  throw new Error(`File not found: ${filePath}`);
});

ipcMain.handle('save-file', (_, { filename, content }) => {
  const filePath = path.join(userDataDir, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  return `File saved: ${filePath}`;
 });

 ipcMain.handle('delete-file', (_, filename) => {
  const filePath = path.join(userDataDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return `File deleted: ${filePath}`;
  }
  throw new Error(`File not found: ${filePath}`);
 });