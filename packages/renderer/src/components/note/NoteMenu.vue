<template>
  <div
    class="
      text-gray-600
      dark:text-gray-300
      bg-gray-50
      dark:bg-gray-900 dark:text-gray-50
      overflow-x-auto
      border-b
      z-20
      top-0
      w-full
      left-0
      py-1
      sticky
      top-0
    "
    :class="{ 'opacity-0 hover:opacity-100 transition': store.inFocusMode }"
  >
    <div class="w-full h-full flex items-center justify-between w-full">
      <!-- <input
        type="number"
        class="
          hoverable
          appearance-none
          h-full
          bg-transparent
          h-8 px-1 rounded-lg
          w-20
          text-center
        "
        value="16"
        min="1"
        title="Font size"
      /> -->
      <button
        :class="{ 'is-active': editor.isActive('paragraph') }"
        title="Paragraph (Ctrl+alt+0)"
        class="transition hoverable h-8 px-1 rounded-lg"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <v-remixicon name="riParagraph" />
      </button>
      <button
        v-for="heading in [1, 2]"
        :key="heading"
        :class="{ 'is-active': editor.isActive('heading', { level: heading }) }"
        :title="`Heading ${heading} (Ctrl+alt+${heading})`"
        class="transition hoverable h-8 px-1 rounded-lg"
        @click="editor.chain().focus().toggleHeading({ level: heading }).run()"
      >
        <v-remixicon :name="`riH${heading}`" />
      </button>
      <hr class="border-r mx-2 h-6" />
      <button
        v-for="action in textFormatting"
        :key="action.name"
        :class="{ 'is-active': editor.isActive(action.activeState) }"
        :title="action.title"
        class="transition hoverable h-8 px-1 rounded-lg"
        @click="action.handler"
      >
        <v-remixicon :name="action.icon" />
      </button>
      <hr class="border-r mx-2 h-6" />
      <button
        v-for="action in lists"
        :key="action.name"
        :class="{ 'is-active': editor.isActive(action.activeState) }"
        :title="action.title"
        class="transition hoverable h-8 px-1 rounded-lg"
        @click="action.handler"
      >
        <v-remixicon :name="action.icon" />
      </button>
      <hr class="border-r mx-2 h-6" />
      <button
        title="Image"
        class="transition hoverable h-8 px-1 rounded-lg"
        @click="insertImage"
      >
        <v-remixicon name="riImageLine" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive('link') }"
        title="Link"
        class="transition hoverable h-8 px-1 rounded-lg"
        @click="editor.chain().focus().toggleLink({ href: '' }).run()"
      >
        <v-remixicon name="riLink" />
      </button>
      <hr class="border-r mx-2 h-6" />
      <button
        :class="{ 'is-active': store.inFocusMode }"
        class="hoverable h-8 px-1 rounded-lg h-full"
        title="Focus mode"
        @click="toggleFocusMode"
      >
        <v-remixicon name="riFocus3Line" />
      </button>
      <ui-popover @show="getHeadingsTree">
        <template #trigger>
          <button
            :class="{ 'is-active': tree }"
            class="hoverable h-8 px-1 rounded-lg h-full"
            title="Headings tree"
          >
            <v-remixicon name="riNodeTree" />
          </button>
        </template>
        <note-menu-headings-tree :headings="headingsTree" />
      </ui-popover>
    </div>
  </div>
</template>
<script>
import { shallowRef } from 'vue';
import { useStorage } from '@/composable/storage';
import { useStore } from '@/store';
import NoteMenuHeadingsTree from './NoteMenuHeadingsTree.vue';

export default {
  components: { NoteMenuHeadingsTree },
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
    tree: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:tree'],
  setup(props) {
    const headings = [
      { name: 'Paragraphs', id: 'paragraph' },
      { name: 'Header 1', id: 1 },
      { name: 'Header 2', id: 2 },
      { name: 'Header 3', id: 3 },
      { name: 'Header 4', id: 4 },
      { name: 'Header 5', id: 5 },
      { name: 'Header 6', id: 6 },
    ];
    const lists = [
      {
        name: 'ordered-list',
        title: 'Bold (Ctrl+Shift+7)',
        icon: 'riListOrdered',
        activeState: 'orderedList',
        handler: () => props.editor.chain().focus().toggleOrderedList().run(),
      },
      {
        name: 'bullet-list',
        title: 'Bullet list (Ctrl+Shift+8)',
        icon: 'riListUnordered',
        activeState: 'bulletList',
        handler: () => props.editor.chain().focus().toggleBulletList().run(),
      },
      {
        name: 'blockquote',
        title: 'Blockquote (Ctrl+Shift+B)',
        icon: 'riDoubleQuotesR',
        activeState: 'blockquote',
        handler: () => props.editor.chain().focus().toggleBlockquote().run(),
      },
      {
        name: 'code-block',
        title: 'Code Block (Ctrl+Alt+C)',
        icon: 'riCodeBoxLine',
        activeState: 'codeBlock',
        handler: () => props.editor.chain().focus().toggleCodeBlock().run(),
      },
    ];
    const textFormatting = [
      {
        name: 'bold',
        title: 'Bold (Ctrl+B)',
        icon: 'riBold',
        activeState: 'bold',
        handler: () => props.editor.chain().focus().toggleBold().run(),
      },
      {
        name: 'italic',
        title: 'Italic (Ctrl+I)',
        icon: 'riItalic',
        activeState: 'italic',
        handler: () => props.editor.chain().focus().toggleItalic().run(),
      },
      {
        name: 'underline',
        title: 'Underline (Ctrl+U)',
        icon: 'riUnderline',
        activeState: 'underline',
        handler: () => props.editor.chain().focus().toggleUnderline().run(),
      },
      {
        name: 'strikethrough',
        title: 'Strikethrough (Ctrl+Shift+X)',
        icon: 'riStrikethrough2',
        activeState: 'strike',
        handler: () => props.editor.chain().focus().toggleStrike().run(),
      },
      {
        name: 'inline-code',
        title: 'Inline Block (Ctrl+E)',
        icon: 'riCodeLine',
        activeState: 'code',
        handler: () => props.editor.chain().focus().toggleCode().run(),
      },
      {
        name: 'highlight',
        title: 'Highlight (Ctrl+Shift+H)',
        icon: 'riMarkPenLine',
        activeState: 'highlight',
        handler: () => props.editor.chain().focus().toggleHighlight().run(),
      },
    ];

    const store = useStore();
    const storage = useStorage();

    const headingsTree = shallowRef([]);

    function getHeadingsTree() {
      const editorEl = props.editor.options.element;
      const headingEls = editorEl.querySelectorAll('h1, h2, h3, h4');
      const headingsArr = Array.from(headingEls).map((heading) => ({
        el: heading,
        tag: heading.tagName,
        top: heading.offsetTop,
        text: heading.innerText.slice(0, 120),
      }));

      headingsTree.value = headingsArr;
    }
    function insertImage() {
      const { ipcRenderer, path } = window.electron;

      ipcRenderer
        .callMain('helper:open-dialog', {
          properties: ['openFile'],
          filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
        })
        .then(async ({ canceled, filePaths }) => {
          if (canceled || filePaths.length === 0) return;

          try {
            const dataDir = await storage.get('dataDir', '', 'preference');
            const fileName = path.basename(filePaths[0]);

            await ipcRenderer.callMain('helper:copy-file', {
              path: filePaths[0],
              dest: path.join(dataDir, 'notes-assets', fileName),
            });

            props.editor
              .chain()
              .focus()
              .setImage({ src: `assets://${fileName}` })
              .run();
          } catch (error) {
            console.error(error);
          }
        });
    }
    function toggleFocusMode() {
      store.inFocusMode = !store.inFocusMode;

      if (store.inFocusMode) {
        document.documentElement.requestFullscreen();
        props.editor.commands.focus();
      } else {
        document.exitFullscreen();
      }
    }

    return {
      store,
      lists,
      headings,
      insertImage,
      headingsTree,
      getHeadingsTree,
      textFormatting,
      toggleFocusMode,
    };
  },
};
</script>
<style scoped>
button {
  @apply hover:text-gray-800 dark:hover:text-white;
}
button.is-active {
  @apply text-primary dark:text-secondary hover:text-primary dark:hover:text-secondary;
}

input[type='number'] {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
}
</style>
