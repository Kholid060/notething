<template>
  <div
    class="
      bg-opacity-90
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
      h-12
      sticky
      top-0
    "
  >
    <div class="w-full py-1 h-full flex items-center justify-between w-full">
      <!-- <input
        type="number"
        class="
          hoverable
          appearance-none
          h-full
          bg-transparent
          px-2 rounded-lg
          w-20
          text-center
        "
        value="16"
        min="1"
        title="Font size"
      /> -->
      <button
        :class="
          editor.isActive('paragraph')
            ? 'text-primary dark:text-secondary'
            : 'hover:text-gray-800 dark:hover:text-white'
        "
        title="Paragraph (Ctrl+alt+0)"
        class="transition h-full hoverable px-2 rounded-lg"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <v-remixicon name="riParagraph" />
      </button>
      <button
        v-for="heading in [1, 2]"
        :key="heading"
        :class="
          editor.isActive('heading', { level: heading })
            ? 'text-primary dark:text-secondary'
            : 'hover:text-gray-800 dark:hover:text-white'
        "
        :title="`Heading ${heading} (Ctrl+alt+${heading})`"
        class="transition h-full hoverable px-2 rounded-lg"
        @click="editor.chain().focus().toggleHeading({ level: heading }).run()"
      >
        <v-remixicon :name="`riH${heading}`" />
      </button>
      <hr class="border-r mx-4" style="height: 65%" />
      <button
        v-for="action in textFormatting"
        :key="action.name"
        :class="
          editor.isActive(action.activeState)
            ? 'text-primary dark:text-secondary'
            : 'hover:text-gray-800 dark:hover:text-white'
        "
        :title="action.title"
        class="transition h-full hoverable px-2 rounded-lg"
        @click="action.handler"
      >
        <v-remixicon :name="action.icon" />
      </button>
      <hr class="border-r mx-4" style="height: 65%" />
      <button
        v-for="action in lists"
        :key="action.name"
        :class="
          editor.isActive(action.activeState)
            ? 'text-primary dark:text-secondary'
            : 'hover:text-gray-800 dark:hover:text-white'
        "
        :title="action.title"
        class="transition h-full hoverable px-2 rounded-lg"
        @click="action.handler"
      >
        <v-remixicon :name="action.icon" />
      </button>
      <hr class="border-r mx-4" style="height: 65%" />
      <button
        title="Image"
        class="transition h-full hoverable px-2 rounded-lg"
        @click="insertImage"
      >
        <v-remixicon name="riImageLine" />
      </button>
      <button
        :class="
          editor.isActive('link')
            ? 'text-primary dark:text-secondary'
            : 'hover:text-gray-800 dark:hover:text-white'
        "
        title="Link"
        class="transition h-full hoverable px-2 rounded-lg"
        @click="editor.chain().focus().toggleLink({ href: '' }).run()"
      >
        <v-remixicon name="riLink" />
      </button>
      <button
        v-if="editor.isActive('link')"
        title="Remove link"
        class="transition h-full hoverable px-2 rounded-lg"
        @click="
          editor.chain().focus().extendMarkRange('link').unsetLink().run()
        "
      >
        <v-remixicon name="riLinkUnlinkM" />
      </button>
      <!-- <button class="hoverable px-2 rounded-lg h-full mr-1">
        <v-remixicon name="riFullscreenLine" />
      </button>
      <button class="hoverable px-2 rounded-lg h-full">
        <v-remixicon name="riNodeTree" />
      </button> -->
    </div>
  </div>
</template>
<script>
import { useStorage } from '@/composable/storage';

export default {
  props: {
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
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

    const storage = useStorage();

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

            console.log(dataDir, `assets:${fileName}`);
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

    return {
      lists,
      headings,
      insertImage,
      textFormatting,
    };
  },
};
</script>
<style scoped>
input[type='number'] {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
}
</style>
