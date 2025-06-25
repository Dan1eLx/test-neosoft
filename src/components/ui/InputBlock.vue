<template>
  <div class="input" :class="{ 'is-error': error }">
    <div v-if="label" class="input__label">{{ label }}</div>
    <input class="input__input" v-bind="inputAttrs" @input="handleInput" @blur="handleBlur" />
    <div v-if="error" class="input__error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface Props {
  label?: string
  error?: string
  modelValue?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  error: '',
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const attrs = useAttrs()

const inputAttrs = computed(() => ({
  ...attrs,
  class: undefined,
  style: undefined,
  value: props.modelValue,
}))

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = () => {
  emit('blur')
}
</script>
<style lang="scss">
.input {
  position: relative;
  &__label {
    font-size: $fs-s;
    margin-bottom: $rate-s;
  }

  &__input {
    border-radius: $rate-s;
    border: 1px solid $grey;
    padding: $rate-s $rate;
    height: $rate-xl;
    background: $white;
    font-size: $fs;
    transition: border-color $transition;
    &:focus,
    &:active {
      border-color: $green;
      outline: none;
    }
  }
  &__error {
    position: absolute;
    bottom: -$rate-l;
    color: $red;
    font-size: $fs-s;
  }

  &.is-error &__input {
    border-color: $red;
  }
}
</style>
