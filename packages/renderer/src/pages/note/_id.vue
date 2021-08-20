<template>
  <div class="max-w-3xl mx-auto relative">
    <note-menu v-if="editor" v-bind="{ editor }" class="mb-6" />
    <input
      v-model="note.title"
      class="text-4xl block font-bold bg-transparent w-full mb-1"
      placeholder="Untitled note"
    />
    <p class="mb-6 text-gray-600 dark:text-gray-300 text-sm">
      Last edited: 14 minutes ago
    </p>
    <note-editor :id="note.id" v-model="note.content" @init="editor = $event" />
  </div>
</template>
<script>
import { shallowRef, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNoteStore } from '@/store/note';
import NoteEditor from '../../components/note/NoteEditor.vue';
import NoteMenu from '../../components/note/NoteMenu.vue';

export default {
  components: { NoteEditor, NoteMenu },
  setup() {
    const route = useRoute();
    const noteStore = useNoteStore();

    const editor = shallowRef(null);
    const note = computed(() => noteStore.getById(route.params.id));

    return {
      note,
      editor,
      noteStore,
    };
  },
};
</script>
