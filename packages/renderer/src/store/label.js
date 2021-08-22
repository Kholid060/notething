import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { useStorage } from '../composable/storage';

const storage = useStorage();

export const useLabelStore = defineStore('label', {
  state: () => ({
    data: {},
  }),
  getters: {
    labels: (state) => Object.values(state.data),
    getByIds: (state) => (ids) => ids.map((id) => state.data[id]),
  },
  actions: {
    retrieve() {
      return new Promise((resolve) => {
        storage.get('labels', {}).then((data) => {
          this.data = data;

          resolve(data);
        });
      });
    },
    add(name) {
      return new Promise((resolve) => {
        const id = nanoid();

        this.data[id] = { id, name };

        storage.set('labels', this.data).then(() => resolve(this.data[id]));
      });
    },
  },
});
