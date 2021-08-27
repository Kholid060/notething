<template>
  <node-view-wrapper>
    <p
      ref="contentRef"
      :class="{ 'dark:text-purple-400 text-purple-500': selected }"
    ></p>
    <textarea
      v-if="selected"
      v-autofocus="!node.attrs.init"
      :value="node.attrs.content"
      type="textarea"
      placholder="anu"
      class="bg-input transition rounded-lg w-full p-2"
      @input="updateContent"
      @keyup.ctrl.enter="editor.commands.focus()"
    />
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
  props: nodeViewProps,
  setup(props) {
    const contentRef = ref(null);

    function renderContent() {
      katex.render(props.node.attrs.content, contentRef.value, {
        throwOnError: false,
      });
    }
    function updateContent({ target: { value } }) {
      props.updateAttributes({ content: value });
      renderContent();
    }

    onMounted(() => {
      props.updateAttributes({ init: 'true' });
      renderContent();
    });

    return {
      contentRef,
      updateContent,
    };
  },
};
</script>
