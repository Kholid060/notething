<template>
	<aside class="w-12 border-r fixed text-center flex flex-col items-center h-full left-0 top-0 z-40 bg-gray-50 dark:bg-gray-900 py-6">
		<button
      class="transition py-3 w-full text-white dark:bg-secondary bg-primary"
    >
			<v-remixicon name="riFileAddLine" />
    </button>
    <router-link
      v-for="nav in navs"
      :key="nav.name"
      :to="nav.path"
      active-class="text-primary dark:text-primary"
      class="transition hoverable py-3 w-full"
    >
			<v-remixicon :name="nav.icon" />
    </router-link>
    <div class="flex-grow"></div>
    <button
      class="transition hoverable py-3 w-full"
    >
      <v-remixicon name="riMoonClearLine" />
    </button>
    <button
      class="transition hoverable py-3 w-full"
    >
      <v-remixicon name="riSettings3Line" />
    </button>
	</aside>
</template>
<script setup>
const navs = [
  { name: 'Notes', path: '/', icon: 'riBookletLine' },
  { name: 'Labels', path: '/labels', icon: 'riPriceTag3Line' },
  { name: 'Archive', path: '/archive', icon: 'riArchiveLine' },
];
</script>
