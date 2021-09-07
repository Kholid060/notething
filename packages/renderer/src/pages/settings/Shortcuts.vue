<template>
  <div class="general space-y-8 w-full max-w-xl">
    <section v-for="shortcut in shortcuts" :key="shortcut.title">
      <p class="mb-2">{{ shortcut.title }}</p>
      <ui-list class="rounded-lg">
        <ui-list-item v-for="item in shortcut.items" :key="item.name">
          <p class="flex-1">{{ item.name }}</p>
          <kbd v-for="key in item.keys" :key="key" class="mr-1">{{ key }}</kbd>
        </ui-list-item>
      </ui-list>
    </section>
  </div>
</template>
<script setup>
const shortcuts = [
  {
    title: 'General shortcuts',
    items: [
      { name: 'Create new note', keys: ['Ctrl', 'N'] },
      { name: 'Toggle command prompt', keys: ['Ctrl', 'P'] },
      { name: 'Toggle dark theme', keys: ['Ctrl', 'Shift', 'L'] },
    ],
  },
  {
    title: 'Navigates shortcuts',
    items: [
      { name: 'To edited note', keys: ['Ctrl', 'Shift', 'W'] },
      { name: 'To notes', keys: ['Ctrl', 'Shift', 'N'] },
      { name: 'To archived notes', keys: ['Ctrl', 'Shift', 'A'] },
      { name: 'To settings', keys: ['Ctrl', ','] },
    ],
  },
  {
    title: 'Editor shortcuts',
    items: [
      { name: 'Bold', keys: ['Ctrl', 'B'] },
      { name: 'Italic', keys: ['Ctrl', 'I'] },
      { name: 'Underline', keys: ['Ctrl', 'U'] },
      { name: 'Link', keys: ['Ctrl', 'K'] },
      { name: 'Strikethrough', keys: ['Ctrl', 'Shift', 'X'] },
      { name: 'Highlight', keys: ['Ctrl', 'Shift', 'E'] },
      { name: 'Inline code', keys: ['Ctrl', 'E'] },
      { name: 'Headings (1-6)', keys: ['Ctrl', 'Alt', '(1-6)'] },
      { name: 'Ordered list', keys: ['Ctrl', 'Shift', '7'] },
      { name: 'Bullet list', keys: ['Ctrl', 'Shift', '8'] },
      { name: 'Blockquote', keys: ['Ctrl', 'Shift', 'B'] },
      { name: 'Block code', keys: ['Ctrl', 'Alt', 'C'] },
      { name: 'Previous note', keys: ['Alt', 'Arrow left'] },
    ],
  },
];
</script>
<style scoped>
section p.flex-1 {
  @apply dark:text-gray-200 text-gray-600;
}
section .ui-list {
  @apply bg-gray-800 bg-opacity-5 dark:bg-gray-200 dark:bg-opacity-5;
}
</style>
