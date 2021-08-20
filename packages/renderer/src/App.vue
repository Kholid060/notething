<template>
  <app-sidebar />
  <main class="pl-16">
    <router-view />
  </main>
</template>
<script>
import { useTheme } from './composable/theme';
import { useStore } from './store';
import AppSidebar from './components/app/AppSidebar.vue';

export default {
  components: { AppSidebar },
  setup() {
    const theme = useTheme();
    const store = useStore();

    theme.loadTheme();
    store.retrieve();
  },
};
</script>
