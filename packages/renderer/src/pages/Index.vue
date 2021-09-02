<template>
  <div class="container py-5">
    <h1 class="text-3xl mb-8 font-bold">Notes</h1>
    <home-note-filter
      v-model:query="state.query"
      v-model:label="state.activeLabel"
      v-bind="{
        sortOrder: state.sortOrder,
        sortBy: state.sortBy,
        labels: labelStore.data,
      }"
      @sort="setActiveSort"
      @delete:label="deleteLabel"
    />
    <div
      v-if="noteStore.notes.length !== 0"
      class="
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
      "
    >
      <template
        v-for="name in $route.query.archived
          ? ['archived']
          : ['bookmarked', 'all']"
        :key="name"
      >
        <p
          v-if="notes[name].length !== 0"
          class="col-span-full text-gray-600 dark:text-gray-200 capitalize"
          :class="{ 'mt-2': name === 'all' }"
        >
          {{ name }}
        </p>
        <home-note-card
          v-for="note in notes[name]"
          :key="note.id"
          v-bind="{ note }"
          @update:label="state.activeLabel = $event"
          @delete="noteStore.delete(note.id)"
          @update="noteStore.update(note.id, $event)"
        />
      </template>
    </div>
    <div v-else class="text-center">
      <img src="../assets/svg/Notes_Outline.svg" class="mx-auto" />
      <h1 class="text-xl">It looks like you don't have a note</h1>
      <p class="max-w-md mx-auto dark:text-gray-300 text-gray-600 mt-2">
        To create a new note, you can press <kbd>Ctrl</kbd> + <kbd>N</kbd> or
        click the <kbd>+</kbd> button on top left
      </p>
    </div>
  </div>
</template>
<script>
import { computed, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HomeNoteCard from '@/components/home/HomeNoteCard.vue';
import HomeNoteFilter from '@/components/home/HomeNoteFilter.vue';
import { useNoteStore } from '@/store/note';
import { useLabelStore } from '@/store/label';
import { sortArray, extractNoteText } from '@/utils/helper';

export default {
  components: { HomeNoteCard, HomeNoteFilter },
  setup() {
    const route = useRoute();
    const noteStore = useNoteStore();
    const labelStore = useLabelStore();

    const state = reactive({
      notes: [],
      query: '',
      activeLabel: '',
      sortBy: 'createdAt',
      sortOrder: 'asc',
    });

    const sortedNotes = computed(() =>
      sortArray({
        data: state.notes,
        order: state.sortOrder,
        key: state.sortBy,
      })
    );
    const notes = computed(() => filterNotes(sortedNotes.value));

    function filterNotes(notes) {
      const filteredNotes = {
        all: [],
        archived: [],
        bookmarked: [],
      };

      notes.forEach((note) => {
        const { title, content, isArchived, isBookmarked, labels } = note;
        const labelFilter = state.activeLabel
          ? labels.includes(state.activeLabel)
          : true;

        const isMatch = state.query.startsWith('#')
          ? labels.some((label) =>
              label.toLocaleLowerCase().includes(state.query.substr(1))
            )
          : title.toLocaleLowerCase().includes(state.query) ||
            content.includes(state.query);

        if (isMatch && labelFilter) {
          if (isArchived) return filteredNotes.archived.push(note);

          isBookmarked
            ? filteredNotes.bookmarked.push(note)
            : filteredNotes.all.push(note);
        }
      });

      return filteredNotes;
    }
    function extractNoteContent(note) {
      const text = extractNoteText(note.content.content).toLocaleLowerCase();

      return { ...note, content: text };
    }
    function setActiveSort(id) {
      if (state.sortBy === id)
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';

      state.sortBy = id;
    }
    function deleteLabel(id) {
      labelStore.delete(id).then(() => {
        if (state.activeLabel === id) state.activeLabel = '';
      });
    }

    watch(
      () => noteStore.data,
      () => {
        state.notes = noteStore.notes.map(extractNoteContent);
      },
      { immediate: true, deep: true }
    );
    watch(
      () => route.query.label,
      (label) => {
        if (label) {
          state.activeLabel = decodeURIComponent(label);
        }
      },
      { immediate: true }
    );
    watch(
      () => [state.sortBy, state.sortOrder],
      ([sortBy, sortOrder]) => {
        localStorage.setItem(
          'sort-notes',
          JSON.stringify({ sortBy, sortOrder })
        );
      }
    );

    onMounted(() => {
      const sortState = JSON.parse(localStorage.getItem('sort-notes'));

      if (sortState) {
        Object.assign(state, sortState);
      }
    });

    return {
      notes,
      state,
      noteStore,
      labelStore,
      deleteLabel,
      setActiveSort,
    };
  },
};
</script>
