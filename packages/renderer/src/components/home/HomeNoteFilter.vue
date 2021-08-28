<template>
  <div class="flex items-center mb-6 space-x-4">
    <ui-input
      :model-value="query"
      autofocus
      class="flex-1"
      prepend-icon="riSearch2Line"
      placeholder="Search..."
      @change="$emit('update:query', $event.toLocaleLowerCase())"
    />
    <ui-popover padding="p-0">
      <template #trigger>
        <ui-button class="w-52 text-left">
          <v-remixicon
            :name="label ? 'riCloseLine' : 'riPriceTag3Line'"
            class="mr-1 -ml-1"
            @click.stop="$emit('update:label', '')"
          />
          <p class="mr-4 text-overflow flex-1">{{ label || 'Select label' }}</p>
          <v-remixicon size="28" name="riArrowDropDownLine" class="-mr-2" />
        </ui-button>
      </template>
      <ui-list
        class="space-y-1 w-60 p-4 overflow-auto"
        style="max-height: calc(100vh - 14rem)"
      >
        <ui-list-item
          v-for="item in labels"
          :key="item"
          :active="item === label"
          class="cursor-pointer group"
          @click="$emit('update:label', item)"
        >
          <span class="flex-1 text-overflow mr-2">{{ item }}</span>
          <v-remixicon
            name="riDeleteBin6Line"
            class="group-hover:visible invisible"
            @click.stop="$emit('delete:label', item)"
          />
        </ui-list-item>
      </ui-list>
    </ui-popover>
    <ui-popover>
      <template #trigger>
        <ui-button>
          <v-remixicon
            :name="sortOrder === 'asc' ? 'riSortAsc' : 'riSortDesc'"
            class="mr-2"
          />
          <p class="mr-4">{{ sorts[sortBy] }}</p>
          <v-remixicon size="28" name="riArrowDropDownLine" class="-mr-2" />
        </ui-button>
      </template>
      <ui-list class="space-y-1 w-48">
        <ui-list-item
          v-for="(name, id) in sorts"
          :key="id"
          :active="id === sortBy"
          class="cursor-pointer"
          @click="$emit('sort', id)"
        >
          <span class="flex-1">{{ name }}</span>
          <v-remixicon
            v-show="id === sortBy"
            :rotate="sortOrder === 'asc' ? 180 : 0"
            name="riArrowDownLine"
          />
        </ui-list-item>
      </ui-list>
    </ui-popover>
  </div>
</template>
<script>
export default {
  props: {
    sortOrder: {
      type: String,
      default: 'asc',
    },
    sortBy: {
      type: String,
      default: 'createdAt',
    },
    query: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labels: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:query', 'update:label', 'sort', 'delete:label'],
  setup() {
    const sorts = {
      title: 'Alphabetical',
      createdAt: 'Created date',
      updatedAt: 'Last updated',
    };

    return {
      sorts,
    };
  },
};
</script>
