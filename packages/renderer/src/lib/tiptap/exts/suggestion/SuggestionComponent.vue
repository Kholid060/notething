<template>
  <ui-card class="border" padding="p-2" small>
    <ui-list class="max-w-xl cursor-pointer space-y-1" style="min-width: 150px">
      <ui-list-item
        v-for="(item, index) in items"
        :key="index"
        :active="index === selectedIndex"
        small
        class="item w-full text-overflow"
        @click="selectItem(index)"
      >
        {{ item.name }}
      </ui-list-item>
      <ui-list-item
        v-if="query.length !== 0"
        :active="items.length === selectedIndex"
        small
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
  labelStore.labels
    .filter((item) =>
      item.name.toLowerCase().startsWith(props.query.toLowerCase())
    )
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
    props.command({ id: item.name, labelId: item.id });
  } else if (props.query !== '') {
    addLabel();
  }
}
function addLabel() {
  labelStore.add(props.query.slice(0, 50)).then(({ id, name }) => {
    props.command({ id: name, labelId: id });
  });
}

watch(
  () => labelStore.labels,
  () => {
    selectedIndex.value = 0;
  }
);

defineExpose({ onKeyDown });
</script>
