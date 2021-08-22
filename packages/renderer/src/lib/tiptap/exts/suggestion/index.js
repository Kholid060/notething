import { VueRenderer } from '@tiptap/vue-3';
import Mention from '@tiptap/extension-mention';
import tippy from '@/lib/tippy';
import SuggestionComponent from './SuggestionComponent.vue';

export default Mention.extend({
  addAttributes() {
    return {
      ...this.parent(),
      labelId: {
        default: '',
      },
    };
  },
}).configure({
  HTMLAttributes: {
    class: 'mention',
  },
  suggestion: {
    char: '#',
    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new VueRenderer(SuggestionComponent, {
            props,
            editor: props.editor,
          });

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },
        onUpdate(props) {
          component.updateProps(props);

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },
        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide();

            return true;
          }

          return component.ref?.onKeyDown(props);
        },
        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});
