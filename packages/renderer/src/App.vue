<template>
  <app-sidebar />
  <main class="pl-12">
    <router-view />
  </main>
</template>
<script>
import { useRouter } from 'vue-router';
import AppSidebar from './components/app/AppSidebar.vue';

export default {
  components: { AppSidebar },
  setup() {
    const router = useRouter();

    // router.replace('/note/anu');
  },
};
</script>
