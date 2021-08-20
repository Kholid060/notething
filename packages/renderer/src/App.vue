<template>
  <app-sidebar />
  <main class="pl-16">
    <router-view />
  </main>
</template>
<script>
import { useRouter } from 'vue-router';
import { useTheme } from './composable/theme';
import { useStore } from './store';
import AppSidebar from './components/app/AppSidebar.vue';

export default {
  components: { AppSidebar },
  setup() {
    const theme = useTheme();
    const store = useStore();
    const router = useRouter();

    theme.loadTheme();
    store.retrieve();

    const lastNoteEdit = localStorage.getItem('lastNoteEdit');

    if (lastNoteEdit) {
      router.push(`/note/${lastNoteEdit}`);
    }
  },
};
</script>
