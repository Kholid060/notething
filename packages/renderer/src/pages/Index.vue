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
      <ui-popover>
        <template #trigger>
          <ui-button>
            <p class="mr-4">{{ sorts[state.sortBy] }}</p>
            <v-remixicon size="26" name="riArrowDropDownLine" class="-mr-2" />
          </ui-button>
        </template>
        <ui-list class="space-y-1 w-48">
          <ui-list-item
            v-for="(name, id) in sorts"
            :key="id"
            :active="id === state.sortBy"
            class="cursor-pointer"
            @click="setActiveSort(id)"
          >
            <span class="flex-1">{{ name }}</span>
            <v-remixicon
              v-show="id === state.sortBy"
              :rotate="state.sortOrder === 'asc' ? 180 : 0"
              name="riArrowDownLine"
            />
          </ui-list-item>
        </ui-list>
      </ui-popover>
    </div>
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
          class="col-span-full text-gray-600 dark:text-gray-200 capitalize"
          :class="{ 'mt-2': name === 'all' }"
        >
          {{ name }}
        </p>
        <home-note-card
          v-for="note in notes[name]"
          :key="note.id"
          v-bind="{ note }"
          @delete="noteStore.delete(note.id)"
          @update="noteStore.update(note.id, $event)"
        />
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, watch } from 'vue';
import { generateHTML } from '@tiptap/core';
import HomeNoteCard from '@/components/home/HomeNoteCard.vue';
import { useNoteStore } from '@/store/note';
import { sortArray } from '@/utils/helper';
import { extensions } from '@/lib/tiptap';

export default {
  components: { HomeNoteCard },
  setup() {
    const sorts = {
      title: 'Alphabetical',
      createdAt: 'Created date',
      updatedAt: 'Last updated',
    };

    const noteStore = useNoteStore();

    const state = reactive({
      notes: [],
      query: '',
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
        const { title, content, isArchived, isBookmarked } = note;
        const isMatch =
          title.toLocaleLowerCase().includes(state.query) ||
          content.includes(state.query);

        if (isMatch) {
          if (isArchived) return filteredNotes.archived.push(note);

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
    function setActiveSort(id) {
      if (state.sortBy === id)
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';

      state.sortBy = id;
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
      setActiveSort,
    };
  },
};
</script>
