<template>
  <div :class="{ 'inline-block': !block }" class="ui-select">
    <label v-if="label" :for="selectId" class="text-gray-200 text-sm ml-2">
      {{ label }}
    </label>
    <select
      :id="selectId"
      class="
        rounded-lg
        w-full
        block
        transition
        bg-gray-100 bg-opacity-5
        appearance-none
        focus:outline-none
        hover:bg-opacity-10
        px-4
        py-2
      "
      :value="modelValue"
      @change="emitValue"
    >
      <option v-if="placeholder" value="" disabled selected>
        {{ placeholder }}
      </option>
      <slot></slot>
    </select>
  </div>
</template>
<script>
import { useComponentId } from '@/composable/componentId';

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    block: Boolean,
    showDetail: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const selectId = useComponentId('select');

    function emitValue({ target }) {
      emit('update:modelValue', target.value);
      emit('change', target.value);
    }

    return {
      selectId,
      emitValue,
    };
  },
};
</script>
<style>
.ui-select__arrow {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}
.ui-select option,
.ui-select optgroup {
  background-color: theme('colors.gray.700');
}
</style>
