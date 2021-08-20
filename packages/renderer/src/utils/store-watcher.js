import { useNoteStore } from '../store/note';
import { debounce } from './helper';

export default function () {
  const noteStore = useNoteStore();

  noteStore.$subscribe(
    debounce((mutation, state) => {
      console.log(mutation, state, 'anu');
    }, 200)
  );
}
