<script setup lang="ts">
import { ref } from 'vue'

const checklistItems = ref([
  { task: 'Book flight tickets', completed: false },
  { task: 'Reserve hotel accommodations', completed: false },
  { task: 'Get travel insurance', completed: false },
  { task: 'Prepare travel documents (passport, visa)', completed: false },
  { task: 'Pack travel essentials', completed: false },
  { task: 'Set up mobile data plan for travel', completed: false },
  { task: 'Exchange currency', completed: false },
])

function toggleCompletion(index: number) {
  checklistItems.value[index].completed = !checklistItems.value[index].completed
}
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Trip Checklist</h1>
    <ul class="space-y-4">
      <li 
        v-for="(item, index) in checklistItems" 
        :key="index" 
        class="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
      >
        <span :class="{ 'line-through text-gray-500': item.completed }">
          {{ item.task }}
        </span>
        <button 
          @click="toggleCompletion(index)" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ item.completed ? 'Undo' : 'Complete' }}
        </button>
      </li>
    </ul>
  </div>
</template>