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
      p-4
    "
    :class="{ 'hover:shadow-xl hover:-translate-y-1': hover }"
  >
    <slot></slot>
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
