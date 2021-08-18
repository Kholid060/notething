<template>
  <div class="inline-block input-ui">
    <label class="relative">
      <span v-if="label" class="text-sm text-gray-200 mb-1 ml-1">
        {{ label }}
      </span>
      <div class="flex items-center">
        <slot name="prepend">
          <v-remixicon
            v-if="prependIcon"
            class="ml-2 text-gray-300 absolute left-0"
            :name="prependIcon"
          ></v-remixicon>
        </slot>
        <input
          class="
            py-[0.4rem]
            px-4
            rounded-lg
            w-full
            border-2
            bg-transparent
            focus:border-primary
            dark:focus:border-secondary
            transition
          "
          :class="{
            'opacity-75 pointer-events-none': disabled,
            'pl-10': prependIcon || $slots.prepend,
          }"
          v-bind="{ readonly: disabled || readonly || null, placeholder, type }"
          :value="modelValue"
          @input="emitValue($event.target.value)"
        />
      </div>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    function emitValue(value) {
      emit('update:modelValue', value);
      emit('change', value);
    }

    return {
      emitValue,
    };
  },
};
</script>
