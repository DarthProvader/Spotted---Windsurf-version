<template>
  <div
    class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center p-4"
    @click="$emit('close')"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ spot.year }} {{ spot.make }} {{ spot.model }}
        </h2>
      </div>

      <!-- Modal Content -->
      <div class="px-6 py-4">
        <!-- Images -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <img
            v-for="(url, index) in spot.imageUrls"
            :key="index"
            :src="getImageUrl(url)"
            :alt="`${spot.make} ${spot.model} - Image ${index + 1}`"
            class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            @click="openImagePreview(url)"
          >
        </div>

        <!-- Details -->
        <dl v-if="!isEditing" class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Make</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ spot.make }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Model</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ spot.model }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Year</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ spot.year }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Color</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
              <span class="inline-block h-4 w-4 rounded-full mr-2" :style="{ backgroundColor: spot.color }"></span>
              {{ spot.color }}
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ spot.location }}</dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ spot.notes || 'No notes added' }}</dd>
          </div>
        </dl>

        <!-- Edit Form -->
        <form v-else @submit.prevent="saveEdit" class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <label for="make" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Make</label>
            <input
              type="text"
              id="make"
              v-model="editForm.make"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
          </div>
          <div class="sm:col-span-1">
            <label for="model" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
            <input
              type="text"
              id="model"
              v-model="editForm.model"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
          </div>
          <div class="sm:col-span-1">
            <label for="year" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
            <input
              type="number"
              id="year"
              v-model="editForm.year"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
          </div>
          <div class="sm:col-span-1">
            <label for="color" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
            <input
              type="text"
              id="color"
              v-model="editForm.color"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
          </div>
          <div class="sm:col-span-2">
            <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input
              type="text"
              id="location"
              v-model="editForm.location"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
          </div>
          <div class="sm:col-span-2">
            <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
            <textarea
              id="notes"
              v-model="editForm.notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            ></textarea>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <div>
          <button
            v-if="!isEditing"
            @click="startEdit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 mr-2"
          >
            Edit Spot
          </button>
          <button
            v-if="!isEditing"
            @click="$emit('delete', spot)"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
          >
            Delete Spot
          </button>
          <template v-else>
            <button
              type="button"
              @click="saveEdit"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              @click="cancelEdit"
              class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              Cancel
            </button>
          </template>
        </div>
        <button
          type="button"
          @click="$emit('close')"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <div
      v-if="previewImage"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      @click="closeImagePreview"
    >
      <div class="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
        <img
          :src="previewImage"
          class="max-w-full max-h-[85vh] object-contain"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  spot: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update', 'delete'])

const isEditing = ref(false)
const previewImage = ref(null)
const editForm = ref({})

// Helper function to get image URL
const getImageUrl = (url) => {
  return `/images/${url.split('/').pop()}`
}

const startEdit = () => {
  editForm.value = { ...props.spot }
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  editForm.value = {}
}

const saveEdit = async () => {
  emit('update', editForm.value)
  isEditing.value = false
}

const openImagePreview = (url) => {
  previewImage.value = getImageUrl(url)
}

const closeImagePreview = () => {
  previewImage.value = null
}
</script>
