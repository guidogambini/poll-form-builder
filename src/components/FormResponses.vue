<template>
  <div v-if="responses.length > 0" class="form-responses mt-8 border border-gray-300 rounded-lg p-4">
    <h2 class="text-xl font-semibold">Responses</h2>

<table class="w-full mt-4 border-collapse">
  <thead>
    <tr>
      <th
        v-for="question in form.questions"
        :key="question.id"
        class="border border-gray-300 p-2 text-left"
      >
        {{ question.text }}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(response, index) in responses" :key="index">
      <td
        v-for="question in form.questions"
        :key="question.id"
        class="border border-gray-300 p-2 text-left"
      >
        {{ response.answers[question.id] ?? '-' }}
      </td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useFormStore } from '../stores/useFormStore'
import type { Form } from '../types'

const props = defineProps<{ form: Form }>()
const formStore = useFormStore()

const responses = computed(() =>
  formStore.getResponsesForForm(props.form.id)
)
</script>
