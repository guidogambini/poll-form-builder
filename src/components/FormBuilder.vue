<template>
  <div class="form-builder border border-gray-300 p-4 mt-8 rounded-lg">
    <h2 class="text-xl font-semibold">Create new form here:</h2>

    <label class="block text-lg font-medium mt-4">
      Form Title
      <input
        v-model="formTitle"
        placeholder="e.g. Contact Form"
        required
        class="mt-2 p-2 border border-gray-300 rounded w-full"
      />
    </label>

    <div v-for="(question, index) in questions" :key="question.id" class="question-block my-4">
      <label class="block text-lg font-medium">
        Question:
        <input
          v-model="question.text"
          placeholder="e.g. What is your name?"
          class="mt-2 p-2 border border-gray-300 rounded w-full"
        />
      </label>

      <label class="block text-lg font-medium mt-2">
        Type:
        <select
          v-model="question.type"
          class="mt-2 p-2 border border-gray-300 rounded w-full"
        >
          <option value="short">Short Answer</option>
          <option value="long">Long Answer</option>
          <option value="number">Number</option>
          <option value="radio">Single Choice</option>
        </select>
      </label>

      <!-- Options for radio -->
      <div v-if="question.type === 'radio'" class="radio-options ml-4 mt-2">
        <div v-for="(_, optIndex) in question.options" :key="optIndex" class="radio-option flex items-center gap-2 mb-2">
          <input
            v-model="question.options![optIndex]"
            placeholder="Option"
            class="p-2 border border-gray-300 rounded w-full"
          />
          <button
            type="button"
            @click="removeOption(index, optIndex)"
            class="text-red-500"
          >
            ✕
          </button>
        </div>
        <button
          type="button"
          @click="addOption(index)"
          class="text-blue-500"
        >
          + option
        </button>
      </div>

      <button
        type="button"
        @click="removeQuestion(index)"
        class="mt-2 text-red-500"
      >
        Remove Question
      </button>

      <hr class="my-4" />
    </div>

    <button
      type="button"
      @click="addQuestion"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Question
    </button>

    <button
      type="button"
      @click="submitForm"
      :disabled="!canSubmit"
      class="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300 hover:bg-green-600"
    >
      Create Form
    </button>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFormStore } from '../stores/useFormStore'
import type { Question } from '../types'

const formStore = useFormStore()

const formTitle = ref('')
const questions = ref<Question[]>([])

const addQuestion = () => {
  questions.value.push({
    id: crypto.randomUUID(),
    text: '',
    type: 'short',
    options: []
  })
}

const removeQuestion = (index: number) => {
  questions.value.splice(index, 1)
}

const addOption = (questionIndex: number) => {
  if (!questions.value[questionIndex].options) {
    questions.value[questionIndex].options = []
  }
  questions.value[questionIndex].options!.push('')
}

const removeOption = (questionIndex: number, optIndex: number) => {
  questions.value[questionIndex].options!.splice(optIndex, 1)
}

const canSubmit = computed(() =>
  formTitle.value.trim() !== '' &&
  questions.value.length > 0 &&
  questions.value.every(q => q.text.trim() !== '')
)

const submitForm = () => {
  formStore.createForm(formTitle.value, JSON.parse(JSON.stringify(questions.value)))
  formTitle.value = ''
  questions.value = []
}
</script>
