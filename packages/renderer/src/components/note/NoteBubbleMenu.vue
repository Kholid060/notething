<template>
  <bubble-menu
    v-show="editor.isActive('image') || editor.isActive('link')"
    v-bind="{ editor, shouldShow: () => true }"
    class="bg-white dark:bg-gray-800 rounded-lg max-w-xs border shadow-xl"
  >
    <component
      :is="
        editor.isActive('link')
          ? 'note-bubble-menu-link'
          : 'note-bubble-menu-image'
      "
      v-bind="{ editor }"
    />
  </bubble-menu>
</template>
<script>
import { BubbleMenu } from '@tiptap/vue-3';
import NoteBubbleMenuLink from './NoteBubbleMenuLink.vue';
import NoteBubbleMenuImage from './NoteBubbleMenuImage.vue';

export default {
  components: { BubbleMenu, NoteBubbleMenuLink, NoteBubbleMenuImage },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
