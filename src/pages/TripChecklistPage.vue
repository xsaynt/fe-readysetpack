<script setup lang="ts">
import { ref } from 'vue'

interface ChecklistItem {
  task: string
  completed: boolean
}

const checklistItems = ref<ChecklistItem[]>([])

const newTask = ref('')

function addTask() {
  if (newTask.value.trim()) {
    checklistItems.value.push({ task: newTask.value.trim(), completed: false })
    newTask.value = ''
  }
}

function toggleCompletion(index: number) {
  checklistItems.value[index].completed = !checklistItems.value[index].completed
}

function removeTask(index: number) {
  checklistItems.value.splice(index, 1)
}
</script>

<template>
  <div class="p-6 bg-background dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-bold text-accent dark:text-secondary mb-4">Trip Checklist</h1>

    <div class="mb-6 flex items-center gap-2">
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a new task..."
        class="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="addTask"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Add to Checklist
      </button>
    </div>

    <ul class="space-y-4">
      <li
        v-for="(item, index) in checklistItems"
        :key="index"
        class="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
      >
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            :checked="item.completed"
            @change="toggleCompletion(index)"
            class="w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <span :class="{ 'line-through text-gray-500': item.completed }">
            {{ item.task }}
          </span>
        </div>

        <button
          @click="removeTask(index)"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
          aria-label="Remove task"
        >
          ✖
        </button>
      </li>
    </ul>
  </div>
</template>
