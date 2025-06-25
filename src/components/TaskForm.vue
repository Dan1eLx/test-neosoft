<template>
  <div class="task-form">
    <div class="task-form__row">
      <InputBlock
        label="Имя задачи"
        placeholder="Введите имя"
        :error="String(v$.title?.$errors[0]?.$message || '')"
        name="name"
        type="text"
        v-model="form.title"
        @blur="v$.title.$touch()"
      />
    </div>
    <div class="task-form__row">
      <ButtonBlock :type="['green', 'big']" @click="submitForm">Добавить задачу</ButtonBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import InputBlock from './ui/InputBlock.vue'
import ButtonBlock from './ui/ButtonBlock.vue'
import type { Task } from '@/types/todos'

const emit = defineEmits<{
  (e: 'submit', formData: Pick<Task, 'title'>, callback: () => void): void
}>()

const form = ref<Pick<Task, 'title'>>({ title: '' })

const rules = {
  title: { required: helpers.withMessage('Поле обязательное для заполнения', required) },
}

const v$ = useVuelidate(rules, form)
const reset = (): void => {
  form.value = { title: '' }
  v$.value.$reset()
}
const submitForm = async (): Promise<void> => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  emit('submit', form.value, reset)
}
</script>
<style lang="scss">
.task-form {
  display: flex;
  align-items: flex-end;
  gap: $rate;
}
</style>
