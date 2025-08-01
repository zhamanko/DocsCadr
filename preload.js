import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    getDocxTemplate: (filename) => ipcRenderer.invoke('get-docx-template', filename),
    readFile: (filename) => ipcRenderer.invoke('read-file', filename),
    saveFile: (data) => ipcRenderer.invoke('save-file', data),
    deleteFile: (filename) => ipcRenderer.invoke('delete-file', filename),
});