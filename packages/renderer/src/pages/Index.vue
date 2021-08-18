<template>
  <div class="container py-5">
    <h1 class="text-3xl mb-4 font-bold">Notes</h1>
    <div class="flex items-center mb-8">
      <ui-input
        autofocus
        class="flex-1 mr-4"
        prepend-icon="riSearch2Line"
        placeholder="Search..."
      />
      <ui-select class="w-32">
        <option>halo?</option>
        <option>halo?</option>
        <option>halo?</option>
      </ui-select>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <ui-card v-for="i in 10" :key="i" class="hover:ring-2 hover:ring-primary transition">
        <p class="font-semibold text-lg">Halo</p>
        <p class="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </ui-card>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const sorts = [{ name: 'name', id: 'name' }];
  },
};
</script>
