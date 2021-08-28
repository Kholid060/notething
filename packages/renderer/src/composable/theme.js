import { ref } from 'vue';

const currentTheme = ref('');

function isDark() {
  if (currentTheme.value === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return currentTheme.value === 'dark';
}

function setTheme(name, isSystem) {
  const rootElement = document.documentElement;

  if (name === 'dark' && !rootElement.classList.contains('dark')) {
    rootElement.classList.add('dark');
  } else if (name === 'light') {
    rootElement.classList.remove('dark');
  } else if (name === 'system') {
    localStorage.removeItem('theme');

    setTheme(isDark() ? 'dark' : 'light', true);
  }

  currentTheme.value = isSystem ? 'system' : name;
  localStorage.theme = name;
}

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'system';

  if (localStorage.theme === 'dark' || (theme === 'system' && isDark())) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  currentTheme.value = theme;
}

export function useTheme() {
  return {
    isDark,
    setTheme,
    loadTheme,
    currentTheme,
  };
}
