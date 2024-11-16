<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Spot</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Make and Model -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="make" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Make</label>
              <input
                type="text"
                id="make"
                v-model="make"
                required
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label for="model" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Model</label>
              <input
                type="text"
                id="model"
                v-model="model"
                required
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
            </div>
          </div>

          <!-- Year and Color -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="year" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Year</label>
              <input
                type="number"
                id="year"
                v-model="year"
                required
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
            </div>
            <div>
              <label for="color" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Color</label>
              <input
                type="text"
                id="color"
                v-model="color"
                required
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              >
            </div>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
            <input
              type="text"
              id="location"
              v-model="location"
              required
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            >
          </div>

          <!-- Notes -->
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Notes</label>
            <textarea
              id="notes"
              v-model="notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Photos</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
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
                <div class="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:focus-within:ring-offset-gray-800"
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
                <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
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
              <button
                v-if="!recognitionResults[index]"
                @click.prevent="recognizeCar(index)"
                :disabled="isRecognizing"
                class="absolute bottom-0 right-0 mb-2 mr-2 bg-indigo-600 text-white rounded-md px-2 py-1 text-sm hover:bg-indigo-700 flex items-center space-x-1"
              >
                <svg v-if="!isRecognizing" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isRecognizing ? 'Analyzing...' : 'Recognize Car' }}</span>
              </button>
              <div v-else-if="recognitionResults[index]" class="absolute bottom-0 right-0 mb-2 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Recognition Results -->
          <div v-if="currentRecognitionResult" class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow px-6 py-8">
            <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Recognition Results</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Make: {{ currentRecognitionResult.make }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Model: {{ currentRecognitionResult.model }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Year: {{ currentRecognitionResult.year }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Color: {{ currentRecognitionResult.color }}</p>
            <button
              @click.prevent="applyRecognitionResult"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
            >
              Apply
            </button>
            <button
              @click.prevent="cancelRecognition"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-offset-gray-800"
            >
              Cancel
            </button>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isPending"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
            >
              {{ isPending ? 'Adding spot...' : 'Add spot' }}
            </button>
          </div>

          <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import useSpots from '../composables/useSpots'
import useOpenAI from '../composables/useOpenAI'

const router = useRouter()
const { addSpot, error, isPending } = useSpots()
const { recognizeCar: aiRecognizeCar, error: recognitionError, isPending: isRecognizing } = useOpenAI()

// Form fields
const make = ref('')
const model = ref('')
const year = ref(new Date().getFullYear())
const color = ref('')
const location = ref('')
const notes = ref('')
const imageFiles = ref([])
const imagePreviewUrls = ref([])
const recognitionResults = ref({})
const currentRecognitionResult = ref(null)

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
  URL.revokeObjectURL(imagePreviewUrls.value[index])
  imageFiles.value = imageFiles.value.filter((_, i) => i !== index)
  imagePreviewUrls.value = imagePreviewUrls.value.filter((_, i) => i !== index)
  delete recognitionResults.value[index]
  if (currentRecognitionResult.value?.index === index) {
    currentRecognitionResult.value = null
  }
}

const recognizeCar = async (index) => {
  try {
    const { result, error } = await aiRecognizeCar(imageFiles.value[index])
    if (error) {
      recognitionError.value = error
      return
    }
    
    recognitionResults.value[index] = result
    currentRecognitionResult.value = { ...result, index }
  } catch (err) {
    recognitionError.value = err.message
  }
}

const applyRecognitionResult = () => {
  if (currentRecognitionResult.value) {
    make.value = currentRecognitionResult.value.make
    model.value = currentRecognitionResult.value.model
    year.value = currentRecognitionResult.value.year
    color.value = currentRecognitionResult.value.color
    currentRecognitionResult.value = null
  }
}

const cancelRecognition = () => {
  currentRecognitionResult.value = null
}

const handleSubmit = async () => {
  const spotData = {
    make: make.value,
    model: model.value,
    year: year.value,
    color: color.value,
    location: location.value,
    notes: notes.value,
    images: imageFiles.value
  }

  await addSpot(spotData)
  if (!error.value) {
    router.push('/garage')
  }
}

// Clean up object URLs when component is destroyed
onBeforeUnmount(() => {
  imagePreviewUrls.value.forEach(url => URL.revokeObjectURL(url))
})
</script>
