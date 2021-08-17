<template>
  <slot v-bind="{ editor }" />
  <editor-content
    class="prose dark:text-gray-200 max-w-none prose-indigo"
    :editor="editor"
  />
  <bubble-menu
    v-if="editor"
    v-bind="{ editor, shouldShow: bubbleMenuShouldShow }"
    class="bg-white px-4 py-2 rounded-lg border"
  >
    <input
      :value="currentLinkVal"
      type="url"
      placeholder="URL"
      class="w-40 mr-2"
      @keyup.enter="updateCurrentLink"
      @input="currentLinkVal = $event.target.value"
    />
    <button @click="updateCurrentLink">Save</button>
  </bubble-menu>
</template>

<script>
import { onMounted, onBeforeUnmount, shallowRef } from 'vue';
import {
  Editor,
  EditorContent,
  VueNodeViewRenderer,
  BubbleMenu,
} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Code from '@tiptap/extension-code';
import lowlight from 'lowlight';
import CodeBlockComponent from './exts/CodeBlockComponent.vue';
import '@/assets/css/one-dark.css';
import '@/assets/css/one-light.css';

export default {
  components: {
    BubbleMenu,
    EditorContent,
  },
  setup() {
    const editor = shallowRef(null);
    const currentLinkVal = shallowRef('');

    function bubbleMenuShouldShow() {
      const isLinkActive = editor.value.isActive('link');

      if (isLinkActive) {
        currentLinkVal.value = editor.value.getAttributes('link')?.href ?? '';
      }

      return isLinkActive;
    }
    function updateCurrentLink() {
      editor.value
        .chain()
        .focus()
        .setLink({ href: currentLinkVal.value })
        .run();
    }
    function linkClickHandler({ target, shiftKey }) {
      const isTiptapURL = target.hasAttribute('tiptap-url');

      if (isTiptapURL && shiftKey) {
        window.open(target.href, '_blank', 'noopener');
      }
    }

    onMounted(() => {
      editor.value = new Editor({
        content:
          '<p>I’m running tiptap with Vue.js. 🎉</p><a href="https://google.com">aaaa</a>',
        autofocus: true,
        extensions: [
          StarterKit,
          Highlight,
          Typography,
          Underline,
          Image,
          Code.configure({ HTMLAttributes: { class: 'inline-code' } }),
          Link.configure({
            openOnClick: false,
            HTMLAttributes: {
              target: '_blank',
              rel: 'noopener noreferrer nofollow',
              'tiptap-url': 'true',
              title: 'Shift+Click to open URL',
            },
          }),
          CodeBlockLowlight.extend({
            addNodeView() {
              return VueNodeViewRenderer(CodeBlockComponent);
            },
          }).configure({ lowlight }),
        ],
      });

      window.addEventListener('click', linkClickHandler);
      console.log({ a: editor.value });
    });
    onBeforeUnmount(() => {
      editor.value.destroy();
      window.removeEventListener('click', linkClickHandler);
    });

    return {
      editor,
      currentLinkVal,
      updateCurrentLink,
      bubbleMenuShouldShow,
    };
  },
};
</script>
<style lang="postcss">
.ProseMirror pre,
.ProseMirror .inline-code {
  @apply bg-black bg-opacity-5 rounded-lg dark:bg-gray-200 dark:bg-opacity-5;
}

.ProseMirror {
  &-selectednode {
    @apply ring-2 ring-primary transition;
  }
  & > :first-child {
    margin-top: 0;
  }
  &:focus {
    outline: none;
  }
  .inline-code {
    @apply py-0.5 px-1 rounded;
  }
  img {
    @apply rounded;
  }
  pre,
  code {
    font-family: 'JetBrains Mono', monospace;
    tab-size: 2;
    color: inherit;
  }
  mark {
    background-color: theme('colors.yellow.200');
  }
}
</style>
