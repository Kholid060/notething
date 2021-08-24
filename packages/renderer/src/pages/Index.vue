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
  </div>
</template>
<script>
import { computed, reactive, watch } from 'vue';
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

        const isMatch =
          title.toLocaleLowerCase().includes(state.query) ||
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
