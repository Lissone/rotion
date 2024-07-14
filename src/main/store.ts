import Store from 'electron-store';

import { Document } from '@/renderer/shared/types/ipc';

interface StoreType {
  readonly documents: Record<string, Document>;
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
  },
});
