<template>
  <div class="lists">
    <transition-group class="lists__container" tag="div" name="slide-fade">
      <TaskBlock
        v-for="item of items"
        :key="item.id"
        v-bind="item"
        @update="emit('update', $event)"
        @delete="emit('delete', $event)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import TaskBlock from './TaskBlock.vue'
import type { Task } from '@/types/todos'

interface Props {
  items: Task[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update', payload: Pick<Task, 'id' | 'completed'>): void
  (e: 'delete', payload: Pick<Task, 'id'>): void
}>()
</script>
<style lang="scss">
.lists {
  &__container {
    display: grid;
    gap: $rate;
    overflow: hidden;
  }
}
.slide-fade-enter-active {
  transition: all $transition;
}

.slide-fade-leave-active {
  transition: all $transition;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20%);

  opacity: 0;
}
</style>
