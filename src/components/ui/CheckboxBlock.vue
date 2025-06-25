<template>
  <label class="checkbox" :class="{ 'checkbox--radio': radio }">
    <div class="checkbox__container">
      <input
        class="checkbox__input"
        :type="radio ? 'radio' : 'checkbox'"
        :name="name.toString()"
        :checked="checked"
        hidden
        @change="onChange"
      />
      <span class="checkbox__icon"></span>
      <span v-if="$slots.default" class="checkbox__label">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script setup lang="ts">
interface Props {
  value?: boolean | string | number
  checked?: boolean
  name?: string | number
  label?: string
  radio?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: false,
  checked: false,
  name: '',
  label: '',
  radio: false,
})

const emit = defineEmits<{
  (e: 'change', value: boolean | string | number): void
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', props.radio ? props.value : target.checked)
}
</script>
<style lang="scss">
.checkbox {
  display: inline-flex;
  cursor: pointer;

  &__container {
    display: inline-flex;
    gap: $rate-s;
    align-items: center;
  }

  &__label {
    font-size: $fs;
  }

  &__icon {
    border-radius: $rate-s;
    border: 1px solid $grey;
    width: $rate-l;
    height: $rate-l;
    border-radius: $rate-s;
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    transition: border-color $transition;
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: -7px;
      left: 1px;
      width: $rate;
      height: $rate-l;
      border-left: 2px solid $green;
      border-bottom: 2px solid $green;
      transform: rotate(-45deg);
      opacity: 0;
      transition: opacity $transition;
    }
  }

  &__input {
    display: none;
    &:checked ~ .checkbox__icon::before {
      opacity: 1;
    }
  }

  &--radio &__icon {
    border-radius: 50%;
  }

  &:hover &__icon {
    border-color: $dark-grey;
  }
}
</style>
