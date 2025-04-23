<template>
  <div class="poll border border-gray-300 rounded-lg p-4 my-4">


    <form @submit.prevent="handleSubmit">
      <div v-for="(answer, index) in poll.answers" :key="index">
        <label class="flex items-center space-x-2">
          <input
            type="radio"
            :name="poll.id"
            :value="index"
            v-model="selectedAnswer"
            class="form-radio text-blue-600"
          />
          <span>{{ answer.text }}</span>
        </label>
      </div>
      <button
        :disabled="selectedAnswer === null"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Answer
      </button>
    </form>

    <div class="result mt-4 bg-gray-100 p-2">
      <h4 class="font-semibold">Partial results:</h4>
      <ul>
        <li
          v-for="(answer, index) in poll.answers"
          :key="index"
        >
          {{ answer.text }} - {{ answer.votes }} votes
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePollStore } from '../stores/usePollStore'
import type { Poll } from '../types'

const props = defineProps<{
  poll: Poll,
  index: number
}>()

const pollStore = usePollStore()
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)

function handleSubmit() {
  if (selectedAnswer.value !== null) {
    pollStore.submitAnswer(props.poll.id, selectedAnswer.value)
    showResult.value = true
  }
}
</script>