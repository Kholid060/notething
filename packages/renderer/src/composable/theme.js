import { ref } from 'vue';

const currentTheme = ref('');

function setTheme(name) {
  const rootElement = document.documentElement;

  if (name === 'dark' && !rootElement.classList.contains('dark')) {
    rootElement.classList.add('dark');
    currentTheme.value = 'dark';
  } else if (name === 'light') {
    rootElement.classList.remove('dark');
    currentTheme.value = 'value';
  } else if (name === 'system') {
    localStorage.removeItem('theme');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(isDark ? 'dark' : 'light');
  }

  localStorage.theme = name;
}

function loadTheme() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = localStorage.getItem('theme') || 'system';

  if (localStorage.theme === 'dark' || (theme === 'system' && isDark)) {
    currentTheme.value = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    currentTheme.value = 'light';
    document.documentElement.classList.remove('dark');
  }
}

export function useTheme() {
  return {
    setTheme,
    loadTheme,
    currentTheme,
  };
}
