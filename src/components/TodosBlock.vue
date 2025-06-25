<template>
  <div class="todos" :class="{ 'is-loading': isLoadingTodos }">
    <div class="todos__row">
      <FilterBlock :items="filters" :value="filter" @change="changeFilter" />
      <TaskForm @submit="createTask" />
    </div>
    <div class="todos__body">
      <ListsBlock :items="todos" @update="updateTask" @delete="deleteTask" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import FilterBlock from './FilterBlock.vue'
import ListsBlock from './ListsBlock.vue'
import TaskForm from './TaskForm.vue'
import type { Task, Filter } from '@/types/todos'

const store = useStore()

const filters: Filter[] = [
  { value: 'any', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

const todos = computed(() => store.getters.getTodos)
const filter = computed(() => store.getters.getFilter)
const isLoadingTodos = computed(() => store.getters.getIsLoadingTodos)

const getTodos = () => store.dispatch('onGetTodos', {})
const createTask = async (task: Pick<Task, 'title'>, callback?: () => void) => {
  const response = await store.dispatch('onCreateTask', { params: task })
  if (response.status === 200 || response.status === 201) {
    callback?.()
  }
}
const updateTask = (task: Pick<Task, 'id' | 'completed'>) =>
  store.dispatch('onUpdateTask', { params: task })
const deleteTask = (task: Pick<Task, 'id'>) => store.dispatch('onDeleteTask', { params: task })

const setFilter = (value: string) => store.commit('setFilter', value)

const changeFilter = (value: string) => {
  setFilter(value)
  getTodos()
}

onMounted(() => {
  getTodos()
})
</script>
<style lang="scss">
.todos {
  position: relative;
  display: grid;
  gap: $rate-xl;
  padding: $rate-l;

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: $rate;
  }
}
</style>
