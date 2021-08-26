<template>
  <slot v-bind="{ editor }" />
  <editor-content
    ref="editorEl"
    :editor="editor"
    class="prose dark:text-gray-100 max-w-none prose-indigo"
  />
  <note-bubble-menu v-if="editor" v-bind="{ editor }" />
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3';
import { useRouter } from 'vue-router';
import lowlight from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import tiptap from '@/lib/tiptap';
import CodeBlockComponent from '@/lib/tiptap/exts/CodeBlockComponent.vue';
import NoteBubbleMenu from './NoteBubbleMenu.vue';
import '@/assets/css/one-dark.css';
import '@/assets/css/one-light.css';

export default {
  components: {
    EditorContent,
    NoteBubbleMenu,
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
    const router = useRouter();

    const editor = ref(null);
    const editorEl = ref(null);

    function handleClick(view, pos, { target, ctrlKey, cmdKey }) {
      const closestAnchor = target.closest('a');
      const isTiptapURL = closestAnchor?.hasAttribute('tiptap-url');

      const isMentionURL = target.hasAttribute('data-mention');

      if (isTiptapURL && (ctrlKey || cmdKey)) {
        if (closestAnchor.href.startsWith('note://')) {
          const noteId = closestAnchor.href.slice(7);

          router.push({
            params: { id: noteId },
            query: { linked: true },
          });
        } else {
          window.open(target.href, '_blank', 'noopener');
        }
      } else if (isMentionURL) {
        router.push(`/?label=${encodeURIComponent(target.dataset.id)}`);
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
        editorProps: {
          handleClick,
        },
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

      editorEl.value.rootEl.style.fontSize =
        (localStorage.getItem('font-size') || '16') + 'px';
      editor.value.on('update', () => {
        const data = editor.value.getJSON();

        emit('update', data);
        emit('update:modelValue', data);
      });
      console.log(editor);
    });
    onBeforeUnmount(() => {
      editor.value.destroy();
    });

    return {
      editor,
      editorEl,
    };
  },
};
</script>
<style src="@/assets/css/editor.css"></style>
