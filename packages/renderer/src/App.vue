<template>
  <aside class="w-12 border-r fixed h-full left-0 top-0 z-40"></aside>
  <main class="pl-12">
    <router-view />
  </main>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();

    router.replace('/note/anu');
  },
};
</script>
