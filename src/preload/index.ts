import { contextBridge, ipcRenderer } from 'electron';
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload';
import { IPC } from '@/renderer/src/shared/constants/ipc';
import { FetchAllDocumentsResponse } from '@/renderer/src/shared/types/ipc';

declare global {
  export interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
