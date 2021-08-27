<template>
  <div v-if="note" class="max-w-3xl mx-auto relative">
    <button
      v-if="$route.query.linked && !store.inFocusMode"
      class="left-0 ml-24 mt-4 fixed group"
      @click="$router.back()"
    >
      <v-remixicon
        name="riArrowDownLine"
        class="
          mr-2
          -ml-1
          group-hover:-translate-x-1
          transform
          transition
          rotate-90
        "
      />
      <span>Previous note</span>
    </button>
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
import { useRouter, onBeforeRouteLeave, useRoute } from 'vue-router';
import { useNoteStore } from '@/store/note';
import { useLabelStore } from '@/store/label';
import { useStore } from '@/store';
import { useStorage } from '@/composable/storage';
import { debounce } from '@/utils/helper';
import NoteEditor from '@/components/note/NoteEditor.vue';
import NoteMenu from '@/components/note/NoteMenu.vue';

export default {
  components: { NoteEditor, NoteMenu },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const storage = useStorage();
    const noteStore = useNoteStore();
    const labelStore = useLabelStore();

    const editor = shallowRef(null);

    const note = computed(() => noteStore.getById(route.params.id));

    const updateNote = debounce((data) => {
      Object.assign(data, { updatedAt: Date.now() });

      noteStore.update(note.value.id, data);
    }, 250);

    watch(
      () => route.params.id,
      (noteId) => {
        if (!noteId) return;

        storage.get(`notes.${noteId}`).then((data) => {
          if (!data || data.id === '') {
            router.push('/');
          } else {
            document.title = `${data.title.slice(0, 260)} - App Name`;
            localStorage.setItem('lastNoteEdit', noteId);
          }
        });
      },
      { immediate: true }
    );

    onBeforeRouteLeave(() => {
      const labels = new Set();
      const labelEls =
        editor.value?.options.element.querySelectorAll('[data-mention]') ?? [];

      Array.from(labelEls).forEach((el) => {
        const labelId = el.dataset.id;

        if (labelStore.data.includes(labelId)) labels.add(labelId);
      });

      noteStore.update(route.params.id, {
        labels: [...labels],
      });
    });

    return {
      note,
      store,
      editor,
      updateNote,
    };
  },
};
</script>
