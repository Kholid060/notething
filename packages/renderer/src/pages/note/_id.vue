<template>
  <div class="max-w-3xl mx-auto relative">
    <note-editor v-slot="{ editor }">
      <note-menu v-if="editor" v-bind="{ editor }" class="mb-6" />
      <input
        class="text-4xl block font-bold bg-transparent mb-4"
        placeholder="Untitled note"
      />
    </note-editor>
  </div>
</template>
<script>
import NoteEditor from '../../components/note/NoteEditor.vue';
import NoteMenu from '../../components/note/NoteMenu.vue';

export default {
  components: { NoteEditor, NoteMenu },
  setup() {},
};
</script>
