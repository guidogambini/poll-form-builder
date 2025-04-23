<template>
  <div class="form-wrapper border border-gray-300 p-4 ml-8 rounded-lg max-w-sm">
    <h2 class="text-xl font-semibold mb-4">Create new poll here:</h2>
    <form @submit.prevent="submitPoll">
      <label class="block text-lg font-medium my-4">
         Poll Question
        <input
          v-model="question"
          placeholder="e.g. What is your favorite video game?"
          required
          class="w-full p-2 mt-1 border border-gray-300 rounded"
        />
      </label>

      <div
  v-for="(option, index) in answers"
  :key="index"
  class="answer-option flex flex-wrap items-center gap-2 mb-2 w-full"
>
  <input
    v-model="option.text"
    :placeholder="`Answer ${index + 1}`"
    required
    class="flex-1 min-w-0 p-2 border border-gray-300 text-lg font-medium rounded"
  />
  <button
    type="button"
    @click="removeAnswer(index)"
    v-if="answers.length > 2"
    class="text-red-500 hover:text-red-700"
  >
    ✕
  </button>
</div>


      <button
        type="button"
        @click="addAnswer"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Option
      </button>
      <button
        type="submit"
        :disabled="!canSubmit"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300 hover:bg-green-600"
      >
        Create Poll
      </button>
    </form>
  </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue'
import { usePollStore } from '../stores/usePollStore'

const pollStore = usePollStore()

const question = ref('')
const answers = ref([{ text: '' }, { text: '' }])

const addAnswer = () => {
  answers.value.push({ text: '' })
}

const removeAnswer = (index: number) => {
  answers.value.splice(index, 1)
}

const canSubmit = computed(() =>
  question.value.trim() !== '' &&
  answers.value.every(a => a.text.trim() !== '')
)

const submitPoll = () => {
  if (!canSubmit.value) return

  pollStore.createPoll(question.value, answers.value.map((a) => ({
    text: a.text,
  })))

  // Reset
  question.value = ''
  answers.value = [{ text: '' }, { text: '' }]
}
</script>
