<template>
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-2xl shadow-md text-gray-900">
        <FormBuilder />
      </div>
  
      <div v-if="formStore.forms.length" class="space-y-6">
        <div
          v-for="form in formStore.forms"
          :key="form.id"
          class="space-y-4 bg-white p-6 rounded-2xl shadow-md text-gray-900"
        >
          <button
            @click="toggleForm(form.id)"
            class="w-full text-left text-lg font-semibold flex justify-between items-center"
          >
            {{ form.title }}
            <span class="text-sm text-blue-600">
              {{ expandedForms[form.id] ? 'Hide' : 'Show' }}
            </span>
          </button>
  
          <div v-if="expandedForms[form.id]" class="space-y-6">
            <div>
              <FormViewer :form="form" />
            </div>
            <div>
              <FormResponses
                :form="form"
                :responses="formStore.getResponsesForForm(form.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import { useFormStore } from '../stores/useFormStore'
  
  import FormBuilder from '../components/FormBuilder.vue'
  import FormViewer from '../components/FormViewer.vue'
  import FormResponses from '../components/FormResponses.vue'
  
  const formStore = useFormStore()
  
  const expandedForms = reactive<Record<string, boolean>>({})
  function toggleForm(formId: string) {
    expandedForms[formId] = !expandedForms[formId]
  }
  </script>
  