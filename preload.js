import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    getDocxTemplate: (filename) => ipcRenderer.invoke('get-docx-template', filename),
    getJournalDocx: (filename) => ipcRenderer.invoke('get-journal-docx', filename),
    saveJournalDocx: (data) => ipcRenderer.invoke('save-journal-docx', data),
    readFile: (filename) => ipcRenderer.invoke('read-file', filename),
    saveFile: (data) => ipcRenderer.invoke('save-file', data),
    deleteFile: (filename) => ipcRenderer.invoke('delete-file', filename),
});