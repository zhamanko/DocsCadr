import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    readFile: (filename) => ipcRenderer.invoke('read-file', filename),
    saveFile: (data) => ipcRenderer.invoke('save-file', data),
    deleteFile: (filename) => ipcRenderer.invoke('delete-file', filename),
});