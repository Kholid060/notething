import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { noteData } from '@/utils/dummy-data';

export const useNoteStore = defineStore('note', {
  state: () => ({
    data: {
      anu: {
        id: 'anu',
        title: 'halo',
        content: noteData,
        labels: [],
        createdAt: Date.now(),
        isBookmarked: false,
        isArchived: false,
      },
    },
  }),
  getters: {
    notes: (state) => Object.values(state.data),
    getById: (state) => (id) => state.data[id],
  },
  actions: {
    add(note = {}) {
      return new Promise((resolve) => {
        const id = nanoid();

        this.data[id] = {
          id,
          title: 'Untitled note',
          content: { type: 'doc', content: [] },
          labels: [],
          createdAt: Date.now(),
          isBookmarked: false,
          isArchived: false,
          ...note,
        };

        resolve(this.data[id]);
        console.log(this.data[id]);
      });
    },
  },
});
