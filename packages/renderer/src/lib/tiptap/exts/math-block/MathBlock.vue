<template>
  <node-view-wrapper>
    <p
      ref="contentRef"
      :class="{ 'dark:text-purple-400 text-purple-500': selected }"
    ></p>
    <div v-if="selected" class="bg-input transition rounded-lg p-2">
      <textarea
        v-focus
        :value="node.attrs.content"
        type="textarea"
        placeholder="Text here..."
        class="w-full bg-transparent mb-2"
        @input="updateContent"
        @keydown="handleKeydown"
      />
      <div class="flex border-t justify-between pt-2">
        <img src="@/assets/svg/katex.svg" width="48" style="margin: 0" />
        <p
          v-if="isContentChange"
          class="text-sm text-gray-600 dark:text-gray-300"
          style="margin: 0"
        >
          Press <strong>Ctrl</strong>+<strong>Enter</strong> to exit from math
          block
        </p>
      </div>
    </div>
  </node-view-wrapper>
</template>
<script>
import { onMounted, ref } from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import katex from 'katex';

export default {
  components: {
    NodeViewWrapper,
  },
  directives: {
    focus: (el, { value = true }) => {
      if (value) el.focus();
    },
  },
  props: nodeViewProps,
  setup(props) {
    const contentRef = ref(null);
    const isContentChange = ref(false);

    function renderContent() {
      katex.render(props.node.attrs.content || 'Empty', contentRef.value, {
        throwOnError: false,
        displayMode: true,
      });
    }
    function updateContent({ target: { value } }) {
      isContentChange.value = true;
      props.updateAttributes({ content: value });
      renderContent();
    }
    function handleKeydown(event) {
      const { ctrlKey, metaKey, key } = event;

      const isDelete =
        !isContentChange.value && ['Backspace', 'Delete'].includes(key);
      const isModEnter = (ctrlKey || metaKey) && key === 'Enter';
      const isNotEdited =
        props.editor.isActive('mathBlock') &&
        !isContentChange.value &&
        ['ArrowUp', 'ArrowDown'].includes(key);

      if (isModEnter || isNotEdited) {
        props.editor.commands.focus();
        isContentChange.value = false;
      } else if (isDelete) {
        event.preventDefault();
        props.deleteNode();
        props.editor.commands.focus();
      }
    }

    onMounted(() => {
      props.updateAttributes({ init: 'true' });
      renderContent();
    });

    return {
      contentRef,
      handleKeydown,
      updateContent,
      isContentChange,
    };
  },
};
</script>
