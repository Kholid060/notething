<template>
  <div v-if="note" class="max-w-3xl mx-auto relative">
    <note-menu v-if="editor" v-bind="{ editor }" class="mb-6" />
    <input
      :value="note.title"
      class="text-4xl block font-bold bg-transparent w-full mb-6"
      placeholder="Untitled note"
      @input="updateNote({ title: $event.target.value })"
    />
    <note-editor
      :id="$route.params.id"
      :model-value="note.content"
      @update="updateNote({ content: $event })"
      @init="editor = $event"
    />
  </div>
</template>
<script>
import { shallowRef, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useNoteStore } from '@/store/note';
import { useStorage } from '@/composable/storage';
import { debounce } from '@/utils/helper';
import NoteEditor from '@/components/note/NoteEditor.vue';
import NoteMenu from '@/components/note/NoteMenu.vue';

export default {
  components: { NoteEditor, NoteMenu },
  setup() {
    const router = useRouter();
    const storage = useStorage();
    const noteStore = useNoteStore();

    const editor = shallowRef(null);
    const note = computed(() =>
      noteStore.getById(router.currentRoute.value.params.id)
    );

    const updateNote = debounce((data) => {
      Object.assign(data, { updatedAt: Date.now() });

      noteStore.update(note.value.id, data);
    }, 250);

    watch(
      () => router.currentRoute.value.params.id,
      (noteId) => {
        if (!noteId) return;

        storage.get(`notes.${noteId}`).then((data) => {
          if (!data) {
            router.push('/');
          } else {
            document.title = `${data.title.slice(0, 260)} - App Name`;
            localStorage.setItem('lastNoteEdit', noteId);
          }
        });
      },
      { immediate: true }
    );

    return {
      note,
      editor,
      updateNote,
    };
  },
};
</script>
