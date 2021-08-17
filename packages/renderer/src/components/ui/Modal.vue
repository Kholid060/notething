<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
              "
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                <slot name="title"></slot>
              </DialogTitle>
              <slot></slot>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref, watch } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'update:modelValue'],
  setup(props, { emit }) {
    const isOpen = ref(false);

    watch(
      () => props.modelValue,
      (value) => {
        if (isOpen.value === value) return;

        isOpen.value = value;
      },
      { immediate: true }
    );

    return {
      isOpen,
      closeModal() {
        isOpen.value = false;

        emit('close', false);
        emit('update:modelValue', false);
      },
    };
  },
};
</script>
