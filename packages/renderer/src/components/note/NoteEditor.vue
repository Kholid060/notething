<template>
  <slot v-bind="{ editor }" />
  <editor-content
    class="prose dark:text-gray-100 max-w-none prose-indigo"
    :editor="editor"
  />
  <bubble-menu
    v-if="editor"
    v-bind="{ editor, shouldShow: bubbleMenuShouldShow }"
    class="
      bg-white
      dark:bg-gray-800
      px-4
      py-2
      rounded-lg
      border
      shadow-xl
      flex
      items-center
    "
  >
    <button
      class="mr-2 text-gray-600 dark:text-gray-200"
      title="Remove link"
      @click="editor.chain().focus().unsetLink().run()"
    >
      <v-remixicon name="riLinkUnlinkM" />
    </button>
    <input
      v-model="currentLinkVal"
      type="url"
      placeholder="URL"
      class="w-40 bg-transparent"
      @keyup.enter="updateCurrentLink"
    />
    <hr class="h-6 border-r mx-4" />
    <button @click="updateCurrentLink">Save</button>
  </bubble-menu>
</template>

<script>
import { onMounted, onBeforeUnmount, shallowRef, watch } from 'vue';
import { EditorContent, VueNodeViewRenderer, BubbleMenu } from '@tiptap/vue-3';
import lowlight from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeBlockComponent from './exts/CodeBlockComponent.vue';
import Placeholder from '@tiptap/extension-placeholder';
import tiptap from '@/lib/tiptap';
import '@/assets/css/one-dark.css';
import '@/assets/css/one-light.css';

export default {
  components: {
    BubbleMenu,
    EditorContent,
  },
  props: {
    modelValue: {
      type: [String, Object],
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  emits: ['init', 'update', 'update:modelValue'],
  setup(props, { emit }) {
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
        .extendMarkRange('link')
        .setLink({ href: currentLinkVal.value })
        .run();
    }
    function linkClickHandler({ target, shiftKey }) {
      const isTiptapURL = target.hasAttribute('tiptap-url');

      if (isTiptapURL && shiftKey) {
        window.open(target.href, '_blank', 'noopener');
      }
    }

    watch(
      () => props.id,
      () => {
        editor.value.commands.setContent(props.modelValue);
        editor.value.commands.focus();
      }
    );

    onMounted(() => {
      editor.value = tiptap({
        content: props.modelValue,
        autofocus: true,
        extensions: [
          Placeholder,
          CodeBlockLowlight.extend({
            addNodeView() {
              return VueNodeViewRenderer(CodeBlockComponent);
            },
          }).configure({ lowlight }),
        ],
      });

      emit('init', editor.value);

      editor.value.on('update', () => {
        const data = editor.value.getJSON();

        emit('update', data);
        emit('update:modelValue', data);
      });

      window.addEventListener('click', linkClickHandler);
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
<style src="@/assets/css/editor.css"></style>
