import Store from 'electron-store';

interface StoreType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documents: Record<string, any>;
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
  },
});

console.log(store.path);
