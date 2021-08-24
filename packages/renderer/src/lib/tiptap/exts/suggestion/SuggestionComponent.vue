<template>
  <ui-card
    class="border max-w-xs"
    padding="p-2"
    style="max-width: 16rem; min-width: 6rem"
  >
    <ui-list class="cursor-pointer space-y-1">
      <p
        v-if="labelStore.data.length === 0 && query.length === 0"
        class="text-center"
      >
        No label
      </p>
      <template v-else>
        <ui-list-item
          v-for="(item, index) in items"
          :key="index"
          :active="index === selectedIndex"
          class="label-item w-full text-overflow"
          @click="selectItem(index)"
        >
          {{ item }}
        </ui-list-item>
      </template>
      <ui-list-item
        v-if="query.length !== 0"
        :active="items.length === selectedIndex"
        class="text-overflow w-full"
        @click="addLabel"
      >
        <v-remixicon name="riAddLine" class="mr-2" />
        Add "<strong class="text-overflow"> {{ query.slice(0, 50) }} </strong>"
      </ui-list-item>
    </ui-list>
  </ui-card>
</template>

<script setup>
/* eslint-disable no-undef */
import { watch, ref, computed } from 'vue';
import { useLabelStore } from '@/store/label';

const labelStore = useLabelStore();

const props = defineProps({
  command: {
    type: Function,
    required: true,
  },
  query: {
    type: String,
    default: '',
  },
});

const selectedIndex = ref(0);

const items = computed(() =>
  labelStore.data
    .filter((item) => item.toLowerCase().startsWith(props.query.toLowerCase()))
    .slice(0, 7)
);

function onKeyDown({ event }) {
  if (event.key === 'ArrowUp') {
    upHandler();
    return true;
  }

  if (event.key === 'ArrowDown') {
    downHandler();
    return true;
  }

  if (event.key === 'Enter') {
    enterHandler();
    return true;
  }

  return false;
}
function upHandler() {
  selectedIndex.value =
    (selectedIndex.value + items.value.length - 1) % items.value.length;
}
function downHandler() {
  selectedIndex.value = (selectedIndex.value + 1) % (items.value.length + 1);
}
function enterHandler() {
  selectItem(selectedIndex.value);
}
function selectItem(index) {
  const item = items.value[index];

  if (item) {
    props.command({ id: item });
  } else if (props.query !== '') {
    addLabel();
  }
}
function addLabel() {
  labelStore.add(props.query).then((name) => {
    props.command({ id: name });
  });
}

watch(
  () => labelStore.data,
  () => {
    selectedIndex.value = 0;
  }
);

defineExpose({ onKeyDown });
</script>
