import { defineStore } from 'pinia';
import { useNoteStore } from './note';

export const useStore = defineStore('main', {
  state: () => ({
    inFocusMode: false,
  }),
  actions: {
    retrieve() {
      return new Promise((resolve) => {
        const noteStore = useNoteStore();

        const promises = Promise.allSettled([noteStore.retrieve()]);

        promises.then((values) => {
          const result = [];

          values.forEach(({ value, status }) => {
            if (status === 'fulfilled') result.push(value);
          });

          resolve(result);
        });
      });
    },
  },
});
