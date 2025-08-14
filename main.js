import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


import dotenv from 'dotenv';
dotenv.config();

import pkg from 'electron-updater';
const { autoUpdater } = pkg;

console.log('GH_TOKEN:', process.env.GH_TOKEN);


let serverProcess = null;
const isDev = !app.isPackaged;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDataDir = path.join(app.getPath('userData'));
const tempDir = path.join(app.getPath('temp'));

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  win.maximize();
  if (isDev) {
    win.loadURL('http://localhost:5173/');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

function initAutoUpdater() {
  autoUpdater.autoDownload = true;

  autoUpdater.on('checking-for-update', () => {
    console.log('🔍 Перевірка оновлень...');
  });

  autoUpdater.on('update-available', (info) => {
    console.log('🔄 Доступне оновлення:', info.version);
  });

  autoUpdater.on('update-not-available', () => {
    console.log('✅ Оновлень немає');
  });

  autoUpdater.on('error', (err) => {
    console.error('❌ Помилка оновлення:', err);
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('📥 Оновлення завантажено. Перезапуск...');
    autoUpdater.quitAndInstall();
  });

  autoUpdater.checkForUpdates();
}

function startBackend() {
  const dbPath = path.join(app.getPath('userData'), 'DocsCadr.sqlite');
  process.env.TEMP_DIR = tempDir;
  process.env.USER_DATA_PATH = userDataDir;
  process.env.DB_PATH = dbPath;

  import('./server/db.js').then(() => {
    console.log('Database module loaded successfully');
  });

  serverProcess = spawn('node', [path.join(__dirname, 'server', 'server.js')]);
  serverProcess.stdout.on('data', (data) => console.log(`Backend: ${data}`));
  serverProcess.stderr.on('data', (data) => console.error(`Backend error: ${data}`));
}

app.whenReady().then(() => {
  ensureDir(userDataDir);
  ensureDir(tempDir);
  startBackend();
  createWindow();

  if (app.isPackaged) {
    initAutoUpdater();
  }
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
