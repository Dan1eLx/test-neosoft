<template>
  <button class="button" :class="computedType" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
type Type = 'green' | 'big' | ''
interface Props {
  type?: Type | Type[]
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
})

const computedType = computed(() => {
  if (Array.isArray(props.type)) {
    const arr = []
    let i = 0
    for (i = 0; i < props.type.length; i++) {
      arr.push(`button--${props.type[i]}`)
    }

    return arr
  } else if (props.type) {
    return [`button--${props.type}`]
  } else {
    return ''
  }
})
</script>
<style lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: $rate-s;
  background: $white;
  color: $red;
  border: 1px solid $red;
  padding: 0 $rate;
  height: $rate-l;
  font-size: $fs-s;
  font-weight: $fw-bold;
  text-transform: uppercase;
  transition:
    color $transition,
    background-color $transition;
  cursor: pointer;
  outline: none;

  &:hover {
    color: $white;
    background: $red;
  }

  &--green {
    background: $white;
    color: $green;
    border: 1px solid $green;
    &:hover {
      color: $white;
      background: $green;
    }
  }

  &--big {
    height: $rate-xl;
  }
}
</style>
