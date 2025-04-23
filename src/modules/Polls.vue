<template>
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-2xl shadow-md text-gray-900">
        <PollBuilder />
      </div>
  
      <div v-if="pollStore.polls.length" class="space-y-6">
        <div
          v-for="poll in pollStore.polls"
          :key="poll.id"
          class="space-y-4 bg-white p-6 rounded-2xl shadow-md text-gray-900"
        >
          <button
            @click="togglePoll(poll.id)"
            class="w-full text-left text-lg font-semibold flex justify-between items-center"
          >
            {{ poll.question }}
            <span class="text-sm text-blue-600">
              {{ expandedPolls[poll.id] ? 'Hide' : 'Show' }}
            </span>
          </button>
  
          <div v-if="expandedPolls[poll.id]">
            <Poll :index="1" :poll="poll" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import { usePollStore } from '../stores/usePollStore'
  
  import PollBuilder from '../components/PollBuilder.vue'
  import Poll from '../components/Poll.vue'
  
  const pollStore = usePollStore()
  
  const expandedPolls = reactive<Record<string, boolean>>({})
  function togglePoll(pollId: string) {
    expandedPolls[pollId] = !expandedPolls[pollId]
  }
  </script>
  