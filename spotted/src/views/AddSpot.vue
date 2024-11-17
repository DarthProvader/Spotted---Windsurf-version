<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Spot</h2>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              @click="activeTab = 'manual'"
              :class="[
                activeTab === 'manual'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Manual Upload
            </button>
            <button
              @click="activeTab = 'ai'"
              :class="[
                activeTab === 'ai'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              AI Recognition
            </button>
          </nav>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Manual Upload Tab -->
          <div v-if="activeTab === 'manual'">
            <!-- Existing form fields -->
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
              </div>
            </div>
          </div>

          <!-- AI Recognition Tab -->
          <div v-if="activeTab === 'ai'" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Upload Car Photo</label>
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
                      for="ai-file-upload"
                      class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:focus-within:ring-offset-gray-800"
                    >
                      <span>Upload a photo</span>
                      <input
                        id="ai-file-upload"
                        type="file"
                        accept="image/*"
                        class="sr-only"
                        @change="handleAIImageUpload"
                      >
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <!-- AI Image Preview -->
            <div v-if="aiImageFile" class="relative">
              <img
                :src="aiImagePreviewUrl"
                alt="Preview"
                class="w-full max-h-96 object-contain rounded-lg"
              >
              <button
                @click.prevent="removeAIImage"
                class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                v-if="!aiRecognitionResult"
                @click.prevent="recognizeAICar"
                :disabled="isRecognizing"
                class="absolute bottom-4 right-4 bg-indigo-600 text-white rounded-md px-4 py-2 text-sm hover:bg-indigo-700 flex items-center space-x-2"
              >
                <svg v-if="!isRecognizing" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isRecognizing ? 'Analyzing...' : 'Recognize Car' }}</span>
              </button>
            </div>

            <!-- AI Recognition Results -->
            <div v-if="aiRecognitionResult" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recognition Results</h3>
              <div class="space-y-2">
                <p class="text-sm text-gray-600 dark:text-gray-300">Make: {{ aiRecognitionResult.make }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Model: {{ aiRecognitionResult.model }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Year: {{ aiRecognitionResult.year }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Color: {{ aiRecognitionResult.color }}</p>
              </div>
              <div class="flex space-x-4 pt-4">
                <button
                  @click.prevent="applyAIResult"
                  class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to Garage
                </button>
                <button
                  @click.prevent="cancelAIRecognition"
                  class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Try Another Photo
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button (only show for manual tab) -->
          <div v-if="activeTab === 'manual'" class="flex justify-end">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
            >
              Add to Garage
            </button>
          </div>
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
const { addSpot } = useSpots()
const { recognizeCar, error: openAIError, isPending: isOpenAIPending, recognitionResult: aiRecognitionResult } = useOpenAI()

// Form data
const make = ref('')
const model = ref('')
const year = ref('')
const color = ref('')
const location = ref('')
const notes = ref('')
const imageFiles = ref([])
const imagePreviewUrls = ref([])

// AI Recognition data
const activeTab = ref('manual')
const aiImageFile = ref(null)
const aiImagePreviewUrl = ref('')
const isRecognizing = ref(false)

// Manual upload methods
const createImagePreview = (file) => {
  return URL.createObjectURL(file)
}

const handleImageChange = (e) => {
  const files = Array.from(e.target.files)
  imageFiles.value = [...imageFiles.value, ...files]
  const newPreviews = files.map(createImagePreview)
  imagePreviewUrls.value = [...imagePreviewUrls.value, ...newPreviews]
}

const removeImage = (index) => {
  URL.revokeObjectURL(imagePreviewUrls.value[index])
  imageFiles.value.splice(index, 1)
  imagePreviewUrls.value.splice(index, 1)
}

// AI Recognition methods
const handleAIImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    aiImageFile.value = file
    aiImagePreviewUrl.value = URL.createObjectURL(file)
  }
}

const removeAIImage = () => {
  if (aiImagePreviewUrl.value) {
    URL.revokeObjectURL(aiImagePreviewUrl.value)
  }
  aiImageFile.value = null
  aiImagePreviewUrl.value = ''
  aiRecognitionResult = null
}

const recognizeAICar = async () => {
  if (!aiImageFile.value) return

  isRecognizing.value = true
  try {
    const { error, result } = await recognizeCar(aiImageFile.value)
    if (error) {
      throw new Error(error)
    }
    aiRecognitionResult = result
  } catch (error) {
    console.error('Error recognizing car:', error)
    // TODO: Add error handling UI
  } finally {
    isRecognizing.value = false
  }
}

const applyAIResult = async () => {
  if (!aiRecognitionResult) return

  try {
    // Create a new spot with the recognized data
    const formData = new FormData()
    formData.append('make', aiRecognitionResult.make)
    formData.append('model', aiRecognitionResult.model)
    formData.append('year', aiRecognitionResult.year)
    formData.append('color', aiRecognitionResult.color)
    formData.append('image', aiImageFile.value)

    await addSpot(formData)
    
    // Reset form and navigate to garage
    removeAIImage()
    router.push('/garage')
  } catch (error) {
    console.error('Error adding spot:', error)
    // TODO: Add error handling UI
  }
}

const cancelAIRecognition = () => {
  aiRecognitionResult = null
}

// Manual form submission
const handleSubmit = async () => {
  try {
    const formData = new FormData()
    formData.append('make', make.value)
    formData.append('model', model.value)
    formData.append('year', year.value)
    formData.append('color', color.value)
    formData.append('location', location.value)
    formData.append('notes', notes.value)
    
    imageFiles.value.forEach(file => {
      formData.append('images', file)
    })

    await addSpot(formData)
    router.push('/garage')
  } catch (error) {
    console.error('Error adding spot:', error)
    // TODO: Add error handling UI
  }
}

// Clean up object URLs when component is destroyed
onBeforeUnmount(() => {
  imagePreviewUrls.value.forEach(url => URL.revokeObjectURL(url))
  if (aiImagePreviewUrl.value) {
    URL.revokeObjectURL(aiImagePreviewUrl.value)
  }
})
</script>