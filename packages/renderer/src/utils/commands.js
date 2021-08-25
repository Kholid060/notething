import emitter from 'tiny-emitter/instance';
import { useTheme } from '../composable/theme';

const theme = useTheme();

const commands = [
  {
    id: 'new-note',
    title: 'Create new note',
    shortcut: ['Ctrl', 'N'],
    handler: () => emitter.emit('new-note'),
  },
  {
    id: 'Preference',
    title: 'Preferences',
    shortcut: ['Ctrl', ','],
    handler: () => emitter.emit('open-prefrence'),
  },
  {
    id: 'dark-theme',
    title: 'Apply dark theme',
    handler: () => theme.setTheme('dark'),
  },
  {
    id: 'light-theme',
    title: 'Apply light theme',
    handler: () => theme.setTheme('light'),
  },
];

export default commands;
