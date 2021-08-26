<template>
  <div class="container py-6">
    <h1 class="text-3xl mb-10 font-bold">Settings</h1>
    <div class="flex">
      <ui-list
        class="w-64 space-y-1 mr-6 rounded-lg dark:text-gray-200 text-gray-600"
      >
        <router-link
          v-for="(item, id) in settings"
          v-slot="{ isExactActive }"
          :key="id"
          :to="item.path"
          class="block"
        >
          <ui-list-item :active="isExactActive" class="cursor-pointer">
            <v-remixicon :name="item.icon" class="mr-2 -ml-1" />
            {{ item.name }}
          </ui-list-item>
        </router-link>
      </ui-list>
      <router-view />
    </div>
  </div>
</template>
<script setup>
const settings = {
  Settings: {
    name: 'General',
    icon: 'riWindowLine',
    path: '/settings',
    description: '',
  },
  'Settings-Shortcuts': {
    name: 'Shortcuts',
    icon: 'riKeyboardLine',
    path: '/shortcuts',
    description: '',
  },
  'Settings-About': {
    name: 'About',
    icon: 'riInformationLine',
    path: '/about',
    description: '',
  },
};
</script>
