import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Form, Question } from '../types'

export type Response = {
  formId: string
  answers: { [questionId: string]: string | number }
}

export const useFormStore = defineStore('form', () => {
  const forms = ref<Form[]>([])
  const responses = ref<Response[]>([])

  function createForm(title: string, questions: Question[]) {
    forms.value.push({
      id: crypto.randomUUID(),
      title,
      questions,
      responses: []
    })
  }

  function submitResponse(formId: string, answers: { [questionId: string]: string | number }) {
    responses.value.push({ formId, answers })
  }

  function getResponsesForForm(formId: string) {
    return responses.value.filter(r => r.formId === formId)
  }

  return { forms, responses, createForm, submitResponse, getResponsesForForm }
})
