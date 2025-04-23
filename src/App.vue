<template>
  <div class="p-8 min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white font-pixel">
    <div class="mb-6 flex gap-4">
      <button
        :class="[
          'px-4 py-2 rounded-full font-bold',
          activeTab === 'polls' ? 'bg-yellow-300 text-black' : 'bg-white/10 hover:bg-white/20'
        ]"
        @click="activeTab = 'polls'"
      >
        Polls
      </button>
      <button
        :class="[
          'px-4 py-2 rounded-full font-bold',
          activeTab === 'forms' ? 'bg-yellow-300 text-black' : 'bg-white/10 hover:bg-white/20'
        ]"
        @click="activeTab = 'forms'"
      >
        Forms
      </button>
    </div>
    <Polls v-if="activeTab === 'polls'" />
    <Forms v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Polls from './modules/Polls.vue'
import Forms from './modules/Forms.vue'

const activeTab = ref<'polls' | 'forms'>('polls')
</script>
