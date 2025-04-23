import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Poll } from '../types'  

export const usePollStore = defineStore('poll', () => {
  const polls = ref<Poll[]>([])

  // Getters
  const results = computed(() => {
    return polls.value.map(poll => ({
      question: poll.question,
      answers: poll.answers.map(answer => ({
        text: answer.text,
        votes: answer.votes
      }))
    }))
  })

  // Actions

  // Crear nueva encuesta
  function createPoll(question: string, answers: { text: string }[]) {
    const newPoll: Poll = {
      id: crypto.randomUUID(),
      question,
      answers: answers.map(ans => ({ ...ans, votes: 0 }))
    }
    polls.value.push(newPoll)
  }

  // Votar una respuesta
  function submitAnswer(pollId: string, answerIndex: number) {
    const poll = polls.value.find(p => p.id === pollId)
    if (poll && poll.answers[answerIndex]) {
      poll.answers[answerIndex].votes++
    }
  }

  return { polls, results, createPoll, submitAnswer }
})
