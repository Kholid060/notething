<template>
  <ui-card class="hover:ring-2 group transition flex flex-col">
    <router-link
      :to="`/note/${note.id}`"
      class="font-semibold text-lg block line-clamp"
    >
      {{ note.title }}
    </router-link>
    <router-link
      :to="`/note/${note.id}`"
      class="text-gray-600 block dark:text-gray-100 flex-1 mt-1"
      style="min-height: 64px"
    >
      {{ truncateContent(note.content) || 'No content' }}
    </router-link>
    <div class="flex z-10 items-center mt-4 text-gray-600 dark:text-gray-200">
      <button
        class="hover:text-gray-900 mr-2 dark:hover:text-white transition"
        @click="$emit('update', { isBookmarked: !note.isBookmarked })"
      >
        <v-remixicon
          :name="note.isBookmarked ? 'riBookmarkFill' : 'riBookmarkLine'"
        />
      </button>
      <button
        class="
          hover:text-gray-900
          mr-2
          dark:hover:text-white
          transition
          invisible
          group-hover:visible
        "
        @click="$emit('update', { isArchived: !note.isArchived })"
      >
        <v-remixicon name="riArchiveLine" />
      </button>
      <button
        class="
          hover:text-red-500
          dark:hover:text-red-400
          transition
          invisible
          group-hover:visible
        "
        @click="$emit('delete', note.id)"
      >
        <v-remixicon name="riDeleteBin6Line" />
      </button>
      <div class="flex-grow"></div>
      <p class="text-overflow">{{ formatDate(note.date) }}</p>
    </div>
  </ui-card>
</template>
<script setup>
/* eslint-disable no-undef */
import dayjs from '@/lib/dayjs';

defineProps({
  note: {
    type: Object,
    default: () => ({}),
  },
});
defineEmits(['update', 'delete']);

function truncateContent(content) {
  const truncated = content.slice(0, 160);

  return truncated + (content.length > 160 ? '...' : '');
}
function formatDate(date) {
  return dayjs(date).fromNow();
}
</script>