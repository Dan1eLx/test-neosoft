<template>
  <div class="task">
    <div class="task__container">
      <div class="task__name">{{ title }}</div>
      <div class="task__status" :class="{ 'task__status--complete': completed }">
        {{ completed ? 'Выполненная' : 'Активная' }}
      </div>

      <CheckboxBlock
        :name="id"
        :checked="completed"
        @change="emit('update', { id, completed: $event as boolean })"
      />
      <ButtonBlock @click="emit('delete', { id })"> Удалить </ButtonBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckboxBlock from './ui/CheckboxBlock.vue'
import ButtonBlock from './ui/ButtonBlock.vue'
import type { Task } from '@/types/todos'

defineProps<Task>()

const emit = defineEmits<{
  (e: 'update', payload: { id: Task['id']; completed: boolean }): void
  (e: 'delete', payload: { id: Task['id'] }): void
}>()
</script>
<style lang="scss">
.task {
  background: $white;
  border-radius: $rate-s;
  border: 1px solid $dark-grey;
  padding: $rate-s $rate;

  &__container {
    display: flex;
    align-items: center;
    gap: $rate;
    justify-content: flex-end;
  }

  &__name {
    font-size: $fs;
    color: $black;
    flex-grow: 1;
  }

  &__date {
    font-size: $fs-s;
    font-weight: $fw-bold;
    color: $dark-grey;
  }

  &__status {
    font-size: $fs;
    font-weight: $fw-bold;
    color: $red;
    width: 150px;

    &--complete {
      color: $green;
    }
  }
}
</style>
