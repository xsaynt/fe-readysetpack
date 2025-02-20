<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { addChecklistItem, deleteChecklistItem, getChecklistItems } from './service/apiService'

interface ChecklistItem {
  task: string
  completed: boolean
}

const checklistItems = ref<ChecklistItem[]>([])
const newTask = ref('')

const addTask = async () => {
  if (newTask.value.trim()) {
    try {
      const response = await addChecklistItem({ task: newTask.value.trim() })

      console.log('Backend response:', JSON.stringify(response.data, null, 2))

      if (
        response.data &&
        response.data.checklist &&
        Array.isArray(response.data.checklist.items)
      ) {
        checklistItems.value = response.data.checklist.items
      } else {
        console.error('Invalid checklist structure:', response.data)
      }

      newTask.value = ''
    } catch (err) {
      console.error('Error adding task: ', err)
    }
  }
}

const removeTask = async (index: number) => {
  const removedTask = checklistItems.value[index].task
  try {
    const response = await deleteChecklistItem({ task: removedTask })

    if (response.data.checklist) {
      checklistItems.value = response.data.checklist.items
    } else {
      console.error('Failed to delete task from the backend.')
    }
  } catch (err) {
    console.error('Error removing task:', err)
  }
}

const fetchChecklistItems = async () => {
  try {
    const response = await getChecklistItems()

    console.log('Fetched checklist data:', response.data)

    if (response.data.checklist.items && Array.isArray(response.data.checklist.items)) {
      checklistItems.value = response.data.checklist.items
    } else {
      checklistItems.value = []
    }
  } catch (err) {
    console.error('Error fetching checklist items:', err)
    checklistItems.value = []
  }
}

onMounted(fetchChecklistItems)
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
        @click="addTask()"
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
