import { ipcMain } from 'electron';
import { randomUUID } from 'node:crypto';

import { IPC } from '@/renderer/shared/constants/ipc';
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '@/renderer/shared/types/ipc';

import { store } from './store';

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get<string, Document>(`documents.${id}`);

    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID();

    const document: Document = {
      id,
      title: 'Untitled',
    };

    store.set(`documents.${id}`, document);

    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    });
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // @ts-expect-error (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`);
  },
);
