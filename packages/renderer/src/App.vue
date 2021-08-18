<template>
  <app-sidebar />
  <main class="pl-16">
    <router-view />
  </main>
</template>
<script>
import { useRouter } from 'vue-router';
import { useTheme } from '@/composable/theme';
import AppSidebar from './components/app/AppSidebar.vue';

export default {
  components: { AppSidebar },
  setup() {
    const router = useRouter();
    const theme = useTheme();

    router.replace('/note/anu');
    theme.loadTheme();
  },
};
</script>
