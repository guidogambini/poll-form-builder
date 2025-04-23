<template>
  <div class="form-viewer border border-gray-300 p-4 mt-8 rounded-lg">
    <form @submit.prevent="submit">
      <div v-for="question in form.questions" :key="question.id" class="question mb-4">
        <label :for="question.id" class="block text-lg font-medium mb-2">{{ question.text }}</label>

        <!-- Short answer -->
        <input
          v-if="question.type === 'short'"
          type="text"
          :id="question.id"
          v-model="answers[question.id]"
          class="w-full p-2 border border-gray-300 rounded"
        />

        <!-- Long answer -->
        <textarea
          v-else-if="question.type === 'long'"
          :id="question.id"
          v-model="answers[question.id]"
          class="w-full p-2 border border-gray-300 rounded"
        ></textarea>

        <!-- Number -->
        <input
          v-else-if="question.type === 'number'"
          type="number"
          :id="question.id"
          v-model.number="answers[question.id]"
          class="w-full p-2 border border-gray-300 rounded"
        />

        <!-- Radio options -->
        <div v-else-if="question.type === 'radio'" class="radio-group flex flex-col gap-1 mt-2">
          <label
            v-for="option in question.options || []"
            :key="option"
            class="radio-option flex items-center gap-2"
          >
            <input
              type="radio"
              :name="question.id"
              :value="option"
              v-model="answers[question.id]"
              class="form-radio text-blue-600"
            />
            {{ option }}
          </label>
        </div>
      </div>

      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Answer
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Form } from '../types'
import { useFormStore } from '../stores/useFormStore'

const props = defineProps<{ form: Form }>()

const formStore = useFormStore()
const answers = ref<{ [questionId: string]: string | number }>({})

const submit = () => {
  formStore.submitResponse(props.form.id, answers.value)
  answers.value = {}
}
</script>