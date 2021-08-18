<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="
      bg-white
      dark:bg-gray-800
      transform
      rounded-lg
      transition-transform
      ui-card
    "
    :class="{ 'hover:shadow-xl hover:-translate-y-1': hover }"
  >
    <slot name="image"></slot>
    <div class="p-4">
      <slot></slot>
    </div>
  </component>
</template>
<script>
export default {
  props: {
    hover: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
};
</script>
