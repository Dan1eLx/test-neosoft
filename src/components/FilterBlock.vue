<template>
  <div class="filter">
    <div class="filter__container">
      <div v-for="item in items" :key="item.value" class="filter__item">
        <CheckboxBlock
          name="filter"
          radio
          :checked="item.value === value"
          :value="item.value"
          @change="emit('change', $event as string)"
        >
          {{ item.label }}
        </CheckboxBlock>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckboxBlock from './ui/CheckboxBlock.vue'
import type { Filter } from '@/types/todos'

interface Props {
  items: Filter[]
  value: string
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'change', value: string): void
}>()
</script>
<style lang="scss">
.filter {
  &__container {
    display: flex;
    gap: $rate;
  }
}
</style>
