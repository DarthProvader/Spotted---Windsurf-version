<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-6 py-8">
        <h2 class="text-2xl font-bold mb-6">Add New Spot</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Make and Model -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="make" class="block text-sm font-medium text-gray-700">Make</label>
              <input
                type="text"
                id="make"
                v-model="make"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label for="model" class="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                id="model"
                v-model="model"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
          </div>

          <!-- Year and Color -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                id="year"
                v-model="year"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label for="color" class="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                id="color"
                v-model="color"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              v-model="location"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
          </div>

          <!-- Notes -->
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              v-model="notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Photos</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      class="sr-only"
                      @change="handleImageChange"
                    >
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <!-- Image Previews -->
          <div v-if="imageFiles.length" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div v-for="(file, index) in imageFiles" :key="index" class="relative">
              <img
                :src="imagePreviewUrls[index]"
                alt="Preview"
                class="h-24 w-full object-cover rounded-lg"
              >
              <button
                @click.prevent="removeImage(index)"
                class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isPending"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ isPending ? 'Adding spot...' : 'Add spot' }}
            </button>
          </div>

          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import useSpots from '../composables/useSpots'

const router = useRouter()
const { addSpot, error, isPending } = useSpots()

// Form fields
const make = ref('')
const model = ref('')
const year = ref(new Date().getFullYear())
const color = ref('')
const location = ref('')
const notes = ref('')
const imageFiles = ref([])
const imagePreviewUrls = ref([])

const createImagePreview = (file) => {
  const url = URL.createObjectURL(file)
  imagePreviewUrls.value.push(url)
  return url
}

const handleImageChange = (e) => {
  const files = Array.from(e.target.files)
  files.forEach(file => {
    imageFiles.value.push(file)
    createImagePreview(file)
  })
}

const removeImage = (index) => {
  // Revoke the object URL to free up memory
  URL.revokeObjectURL(imagePreviewUrls.value[index])
  
  // Remove the file and preview URL
  imageFiles.value = imageFiles.value.filter((_, i) => i !== index)
  imagePreviewUrls.value = imagePreviewUrls.value.filter((_, i) => i !== index)
}

const handleSubmit = async () => {
  const spotData = {
    make: make.value,
    model: model.value,
    year: year.value,
    color: color.value,
    location: location.value,
    notes: notes.value
  }

  const response = await addSpot(spotData, imageFiles.value)
  
  if (!error.value) {
    // Clean up object URLs
    imagePreviewUrls.value.forEach(url => URL.revokeObjectURL(url))
    router.push('/garage')
  }
}

// Clean up object URLs when component is destroyed
onBeforeUnmount(() => {
  imagePreviewUrls.value.forEach(url => URL.revokeObjectURL(url))
})
</script>
