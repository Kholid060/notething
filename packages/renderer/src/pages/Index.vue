<template>
  <div class="container py-5">
    <h1 class="text-3xl mb-4 font-bold">Notes</h1>
    <div class="flex items-center mb-8">
      <ui-input
        v-model.lowercase="state.query"
        autofocus
        class="flex-1 mr-4"
        prepend-icon="riSearch2Line"
        placeholder="Search..."
      />
      <ui-select class="w-32">
        <option>halo?</option>
        <option>halo?</option>
        <option>halo?</option>
      </ui-select>
    </div>
    <div
      ref="macyContainer"
      class="
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
      "
    >
      <home-note-card
        v-for="note in notes.all"
        :key="note.id"
        v-bind="{ note }"
        @delete="noteStore.delete(note.id)"
        @update="noteStore.update(note.id, $event)"
      />
    </div>
  </div>
</template>
<script>
import { computed, reactive, watch } from 'vue';
import { generateHTML } from '@tiptap/core';
import HomeNoteCard from '@/components/home/HomeNoteCard.vue';
import { useNoteStore } from '@/store/note';
import { extensions } from '@/lib/tiptap';

export default {
  components: { HomeNoteCard },
  setup() {
    const sorts = [{ name: 'Title', id: 'title' }];

    const noteStore = useNoteStore();

    const state = reactive({
      notes: [],
      query: '',
      sortBy: 'createdAt',
      sortType: 'asc',
    });

    const notes = computed(() => filterNotes(state.notes));

    function filterNotes(notes) {
      const filteredNotes = {
        all: [],
        bookmarked: [],
      };

      notes.forEach((note) => {
        const { title, content, isArchived, isBookmarked } = note;
        const isMatch =
          (title.toLocaleLowerCase().includes(state.query) ||
            content.includes(state.query)) &&
          !isArchived;

        if (isMatch) {
          isBookmarked
            ? filteredNotes.bookmarked.push(note)
            : filteredNotes.all.push(note);
        }
      });

      return filteredNotes;
    }
    function extractNoteContent(note) {
      const html = generateHTML(note.content, extensions);
      const textStr = html.replace(/(<([^>]+)>)/gi, ' ').toLocaleLowerCase();

      return { ...note, content: textStr };
    }

    watch(
      () => noteStore.data,
      () => {
        state.notes = noteStore.notes.map(extractNoteContent);
      },
      { immediate: true, deep: true }
    );

    return {
      notes,
      state,
      sorts,
      noteStore,
    };
  },
};
</script>
