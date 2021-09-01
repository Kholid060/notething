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
      v-tooltip:right="'Add note (Ctrl+N)'"
      class="transition p-2 mb-4 text-primary bg-input rounded-lg"
      @click="addNote"
    >
      <v-remixicon name="riFileAddLine" />
    </button>
    <button
      v-tooltip:right="'Edited note (Ctrl+Shift+W)'"
      class="transition dark:hover:text-white hover:text-gray-800 p-2 mb-4"
      :class="{ 'text-primary': $route.name === 'Note' }"
      @click="openLastEdited"
    >
      <v-remixicon name="riFileEditLine" />
    </button>
    <router-link
      v-for="nav in navs"
      :key="nav.name"
      v-tooltip:right="`${nav.name} (${nav.shortcut})`"
      :to="nav.path"
      :class="{
        'text-primary dark:text-secondary': $route.fullPath === nav.path,
      }"
      class="transition dark:hover:text-white hover:text-gray-800 p-2 mb-4"
    >
      <v-remixicon :name="nav.icon" />
    </router-link>
    <div class="flex-grow"></div>
    <button
      v-tooltip:right="'Toggle dark theme (Ctrl+Shift+L)'"
      :class="[
        theme.isDark()
          ? 'text-primary dark:text-secondary'
          : 'dark:hover:text-white hover:text-gray-800',
      ]"
      class="transition p-2 mb-4"
      @click="theme.setTheme(theme.isDark() ? 'light' : 'dark')"
    >
      <v-remixicon name="riMoonClearLine" />
    </button>
    <router-link
      v-tooltip:right="'Settings (Ctrl+,)'"
      to="/settings"
      class="transition dark:hover:text-white hover:text-gray-800 p-2"
      active-class="text-primary dark:text-secondary"
    >
      <v-remixicon name="riSettings3Line" />
    </router-link>
  </aside>
</template>
<script>
import { onUnmounted } from 'vue';
import { useTheme } from '@/composable/theme';
import { useRouter } from 'vue-router';
import emitter from 'tiny-emitter/instance';
import Mousetrap from '@/lib/mousetrap';
import { useNoteStore } from '@/store/note';

export default {
  setup() {
    const theme = useTheme();
    const router = useRouter();
    const noteStore = useNoteStore();

    const navs = [
      {
        name: 'Notes',
        path: '/',
        icon: 'riBookletLine',
        shortcut: 'Ctrl+Shift+N',
      },
      {
        name: 'Archive',
        path: '/?archived=true',
        icon: 'riArchiveLine',
        shortcut: 'Ctrl+Shift+A',
      },
    ];
    const shortcuts = {
      'mod+n': addNote,
      'mod+,': openSettings,
      'mod+shift+w': openLastEdited,
      'mod+shift+n': () => router.push('/'),
      'mod+shift+a': () => router.push('/?archived=true'),
      'mod+shift+l': () => theme.setTheme(theme.isDark() ? 'light' : 'dark'),
    };

    emitter.on('new-note', addNote);
    emitter.on('open-settings', openSettings);

    Mousetrap.bind(Object.keys(shortcuts), (event, combo) => {
      shortcuts[combo]();
    });

    function openSettings() {
      router.push('/settings');
    }
    function openLastEdited() {
      const noteId = localStorage.getItem('lastNoteEdit');

      if (noteId) router.push(`/note/${noteId}`);
    }
    function addNote() {
      noteStore.add().then(({ id }) => {
        router.push(`/note/${id}`);
      });
    }

    onUnmounted(() => {
      emitter.off('new-note', addNote);
      emitter.off('open-settings', openSettings);
    });

    return {
      navs,
      theme,
      addNote,
      noteStore,
      openLastEdited,
    };
  },
};
</script>
