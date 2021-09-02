<template>
  <app-command-prompt />
  <app-sidebar v-if="!store.inFocusMode" />
  <main v-if="retrieved" :class="{ 'pl-16': !store.inFocusMode }">
    <router-view />
  </main>
  <ui-dialog />
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from './composable/theme';
import { useStore } from './store';
import AppSidebar from './components/app/AppSidebar.vue';
import AppCommandPrompt from './components/app/AppCommandPrompt.vue';

export default {
  components: { AppSidebar, AppCommandPrompt },
  setup() {
    const theme = useTheme();
    const store = useStore();
    const router = useRouter();

    const retrieved = ref(false);

    theme.loadTheme();
    store.retrieve().then(() => (retrieved.value = true));

    const lastNoteEdit = localStorage.getItem('lastNoteEdit');

    if (lastNoteEdit) {
      router.push(`/note/${lastNoteEdit}`);
    }

    return {
      store,
      retrieved,
    };
  },
};
</script>
