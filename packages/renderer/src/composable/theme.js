import { ref } from 'vue';

const currentTheme = ref('');

function setTheme(name, isSystem) {
  const rootElement = document.documentElement;

  if (name === 'dark' && !rootElement.classList.contains('dark')) {
    rootElement.classList.add('dark');
  } else if (name === 'light') {
    rootElement.classList.remove('dark');
  } else if (name === 'system') {
    localStorage.removeItem('theme');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(isDark ? 'dark' : 'light', true);
  }

  currentTheme.value = isSystem ? 'system' : name;
  localStorage.theme = name;
}

function loadTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = localStorage.getItem('theme') || 'system';

  if (localStorage.theme === 'dark' || (theme === 'system' && isDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  currentTheme.value = theme;
}

export function useTheme() {
  return {
    setTheme,
    loadTheme,
    currentTheme,
  };
}
