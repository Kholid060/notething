<template>
  <aside
    class="
      w-16
      text-gray-600
      dark:text-gray-200
      bg-white
      dark:bg-gray-800
      fixed
      text-center
      flex flex-col
      items-center
      h-full
      left-0
      top-0
      z-40
      py-4
    "
  >
    <button
      class="transition p-2 mb-4 text-primary bg-input rounded-lg"
      @click="addNote"
    >
      <v-remixicon name="riFileAddLine" />
    </button>
    <button
      class="transition dark:hover:text-white hover:text-gray-800 p-2 mb-4"
      :class="{ 'text-primary': $route.name === 'Note' }"
    >
      <v-remixicon name="riFileEditLine" />
    </button>
    <router-link
      v-for="nav in navs"
      :key="nav.name"
      :to="nav.path"
      active-class="text-primary dark:text-primary"
      class="transition dark:hover:text-white hover:text-gray-800 p-2 mb-4"
    >
      <v-remixicon :name="nav.icon" />
    </router-link>
    <div class="flex-grow"></div>
    <button
      :class="[
        theme.currentTheme.value === 'dark'
          ? 'text-primary dark:text-secondary'
          : 'dark:hover:text-white hover:text-gray-800',
      ]"
      class="transition p-2 mb-4"
      @click="
        theme.setTheme(theme.currentTheme.value === 'dark' ? 'light' : 'dark')
      "
    >
      <v-remixicon name="riMoonClearLine" />
    </button>
    <button class="transition dark:hover:text-white hover:text-gray-800 p-2">
      <v-remixicon name="riSettings3Line" />
    </button>
  </aside>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useNoteStore } from '@/store/note';
import { useTheme } from '@/composable/theme';

const theme = useTheme();
const router = useRouter();
const noteStore = useNoteStore();

const navs = [
  { name: 'Notes', path: '/', icon: 'riBookletLine' },
  { name: 'Labels', path: '/labels', icon: 'riPriceTag3Line' },
  { name: 'Archive', path: '/archive', icon: 'riArchiveLine' },
];

function addNote() {
  noteStore.add().then(({ id }) => {
    router.push(`/note/${id}`);
  });
}
</script>
