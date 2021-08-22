<template>
  <ui-input
    v-model.lowercase="query"
    placeholder="Search headings"
    autofocus
    class="mb-4"
  />
  <ui-list
    class="w-64 space-y-1 overflow-auto"
    style="max-height: calc(100vh - 10rem)"
  >
    <ui-list-item
      v-for="heading in filteredHeadings"
      :key="heading.text"
      :class="paddings[heading.tag]"
      class="cursor-pointer"
      @click="
        heading.el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      "
    >
      <p class="text-overflow">{{ heading.text }}</p>
    </ui-list-item>
  </ui-list>
</template>
<script setup>
import { shallowRef, computed } from 'vue';

const paddings = {
  H1: 'pl-4',
  H2: 'pl-8',
  H3: 'pl-12',
  H4: 'pl-16',
};

/* eslint-disable-next-line */
const props = defineProps({
  headings: {
    type: Array,
    default: () => [],
  },
});

const query = shallowRef('');

const filteredHeadings = computed(() =>
  props.headings.filter(({ text }) =>
    text.toLocaleLowerCase().includes(query.value)
  )
);
</script>
