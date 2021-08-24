<template>
  <bubble-menu
    v-bind="{ editor, shouldShow: bubbleMenuShouldShow }"
    class="bg-white dark:bg-gray-800 rounded-lg max-w-xs border shadow-xl"
  >
    <expand-transition>
      <ui-list
        v-if="currentLinkVal.startsWith('@')"
        class="p-2 space-y-1 border-b"
      >
        <ui-list-item
          v-for="(note, index) in notes"
          :key="note.id"
          :active="index === selectedNoteIndex"
          class="cursor-pointer line-clamp leading-tight"
          @click="updateCurrentLink(note.id)"
        >
          <p class="text-overflow w-full">
            {{ note.title || 'Untitled note' }}
          </p>
        </ui-list-item>
      </ui-list>
    </expand-transition>
    <div class="flex items-center p-2 space-x-2">
      <input
        v-model="currentLinkVal"
        type="url"
        placeholder="URL or type @ to link a note"
        class="flex-1 bg-transparent"
        @keydown="keydownHandler"
        @keyup.enter="updateCurrentLink"
      />
      <button
        icon
        class="text-gray-600 dark:text-gray-200"
        title="Remove link"
        @click="editor.chain().focus().unsetLink().run()"
      >
        <v-remixicon name="riLinkUnlinkM" />
      </button>
      <button
        icon
        class="text-gray-600 -mr-1 dark:text-gray-200"
        @click="updateCurrentLink"
      >
        <v-remixicon name="riSave3Line" />
      </button>
    </div>
  </bubble-menu>
</template>
<script>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { BubbleMenu } from '@tiptap/vue-3';
import { useNoteStore } from '@/store/note';

export default {
  components: { BubbleMenu },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute();
    const noteStore = useNoteStore();

    const selectedNoteIndex = ref(0);
    const currentLinkVal = ref('');

    const notes = computed(() => {
      if (!currentLinkVal.value.startsWith('@')) return [];

      const query = currentLinkVal.value.substr(1).toLocaleLowerCase();

      return noteStore.notes
        .filter(
          (note) =>
            note.id !== route.params.id &&
            (note.title.toLocaleLowerCase().includes(query) ||
              note.id.toLocaleLowerCase().includes(query))
        )
        .slice(0, 6);
    });

    function updateCurrentLink(id) {
      let value = currentLinkVal.value;

      if (currentLinkVal.value.startsWith('@') || typeof id === 'string') {
        const noteId =
          typeof id === 'string' ? id : notes.value[selectedNoteIndex.value].id;

        value = `note://${noteId}`;
      }

      props.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: value })
        .run();
    }
    function bubbleMenuShouldShow() {
      const isLinkActive = props.editor.isActive('link');

      if (isLinkActive) {
        currentLinkVal.value = (
          props.editor.getAttributes('link')?.href ?? ''
        ).replace('note://', '@');
      }

      return isLinkActive;
    }
    function keydownHandler(event) {
      if (!currentLinkVal.value.startsWith('@')) return;

      const notesLength = notes.value.length;

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        selectedNoteIndex.value =
          (selectedNoteIndex.value + notesLength - 1) % notesLength;
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();

        selectedNoteIndex.value = (selectedNoteIndex.value + 1) % notesLength;
      }
    }

    watch(currentLinkVal, (value) => {
      if (value.startsWith('@')) selectedNoteIndex.value = 0;
    });

    return {
      notes,
      keydownHandler,
      currentLinkVal,
      selectedNoteIndex,
      updateCurrentLink,
      bubbleMenuShouldShow,
    };
  },
};
</script>
