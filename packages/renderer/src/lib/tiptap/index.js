import { Editor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Code from '@tiptap/extension-code';
import LabelSuggestion from './exts/label-suggestion';
import MathInline from './exts/math-inline';
import MathBlock from './exts/math-block';
import LinkNote from './exts/link-note';

export const extensions = [
  StarterKit,
  Highlight,
  Typography,
  Underline,
  Image,
  LinkNote,
  LabelSuggestion,
  MathInline,
  MathBlock,
  Code.configure({ HTMLAttributes: { class: 'inline-code' } }),
  Link.extend({
    addKeyboardShortcuts() {
      return {
        'Mod-k': () => this.editor.chain().focus().toggleLink().run(),
      };
    },
  }).configure({
    openOnClick: false,
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
      'tiptap-url': 'true',
      title: 'Ctrl+Click to open URL',
    },
  }),
];

export default function ({ extensions: optsExts, ...opts }) {
  const instance = new Editor({
    ...opts,
    extensions: [...extensions, ...(optsExts || [])],
  });

  return instance;
}
