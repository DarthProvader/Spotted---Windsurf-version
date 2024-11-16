<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">My Garage</h1>
        <router-link
          to="/add-spot"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
        >
          Add New Spot
        </router-link>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-6 p-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label for="makeFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Make</label>
            <select
              id="makeFilter"
              v-model="filters.make"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
              <option value="">All Makes</option>
              <option v-for="make in uniqueMakes" :key="make" :value="make">{{ make }}</option>
            </select>
          </div>

          <div>
            <label for="yearFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
            <select
              id="yearFilter"
              v-model="filters.year"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
              <option value="">All Years</option>
              <option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>

          <div>
            <label for="colorFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
            <select
              id="colorFilter"
              v-model="filters.color"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
              <option value="">All Colors</option>
              <option v-for="color in uniqueColors" :key="color" :value="color">{{ color }}</option>
            </select>
          </div>

          <div>
            <label for="sortBy" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
            <select
              id="sortBy"
              v-model="sortBy"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm"
            >
              <option value="createdAt">Date Added</option>
              <option value="make">Make</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isPending" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Loading your garage...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredSpots.length" class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No spots found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding a new spot.</p>
        <div class="mt-6">
          <router-link
            to="/add-spot"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
          >
            Add New Spot
          </router-link>
        </div>
      </div>

      <!-- Spots Grid -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="spot in filteredSpots"
          :key="spot.id"
          class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <!-- Image with Navigation -->
          <div class="relative aspect-w-16 aspect-h-9">
            <img
              :src="spot.imageUrls[currentImageIndexes[spot.id]]"
              :alt="`${spot.make} ${spot.model}`"
              class="w-full h-48 object-cover"
            >
            <div v-if="spot.imageUrls.length > 1" class="absolute inset-0">
              <button
                @click.stop="prevImage(spot)"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all"
                :class="{ 'opacity-50 cursor-not-allowed': currentImageIndexes[spot.id] === 0 }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                @click.stop="nextImage(spot)"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all"
                :class="{ 'opacity-50 cursor-not-allowed': currentImageIndexes[spot.id] === spot.imageUrls.length - 1 }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                {{ currentImageIndexes[spot.id] + 1 }} / {{ spot.imageUrls.length }}
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ spot.year }} {{ spot.make }} {{ spot.model }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ spot.location }}
            </p>
            <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span class="inline-block h-4 w-4 rounded-full mr-2" :style="{ backgroundColor: spot.color }"></span>
              {{ spot.color }}
            </div>
          </div>

          <!-- Actions -->
          <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <button
              @click="selectedSpot = spot"
              class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Spot Detail Modal -->
    <div
      v-if="selectedSpot"
      class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center p-4"
      @click="selectedSpot = null"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ selectedSpot.year }} {{ selectedSpot.make }} {{ selectedSpot.model }}
          </h2>
        </div>

        <!-- Modal Content -->
        <div class="px-6 py-4">
          <!-- Images -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <img
              v-for="(url, index) in selectedSpot.imageUrls"
              :key="index"
              :src="url"
              :alt="`${selectedSpot.make} ${selectedSpot.model} - Image ${index + 1}`"
              class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              @click="openImagePreview(url)"
            >
          </div>

          <!-- Details -->
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedSpot.location }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Color</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                <span
                  class="inline-block h-4 w-4 rounded-full mr-2"
                  :style="{ backgroundColor: selectedSpot.color }"
                ></span>
                {{ selectedSpot.color }}
              </dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ selectedSpot.notes || 'No notes' }}</dd>
            </div>
          </dl>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
          <button
            @click="handleDelete(selectedSpot)"
            class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 text-sm font-medium"
          >
            Delete Spot
          </button>
          <button
            @click="selectedSpot = null"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
      @click="closeImagePreview"
    >
      <div class="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
        <img
          :src="selectedImage"
          class="max-w-full max-h-[85vh] object-contain"
          @click.stop
        >
        <button
          @click="closeImagePreview"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import useSpots from '../composables/useSpots'

const { spots, error, isPending, getUserSpots, deleteSpot } = useSpots()
const selectedSpot = ref(null)
const selectedImage = ref(null)
const filters = ref({
  make: '',
  year: '',
  color: ''
})
const sortBy = ref('createdAt')

// Add current image index tracking for each spot
const currentImageIndexes = ref({})

// Initialize current image index when spots are loaded
onMounted(async () => {
  await getUserSpots()
  spots.value.forEach(spot => {
    currentImageIndexes.value[spot.id] = 0
  })
})

// Navigation methods
const nextImage = (spot) => {
  if (currentImageIndexes.value[spot.id] < spot.imageUrls.length - 1) {
    currentImageIndexes.value[spot.id]++
  }
}

const prevImage = (spot) => {
  if (currentImageIndexes.value[spot.id] > 0) {
    currentImageIndexes.value[spot.id]--
  }
}

const openImagePreview = (imageUrl) => {
  selectedImage.value = imageUrl
}

const closeImagePreview = () => {
  selectedImage.value = null
}

// Get unique values for filters
const uniqueMakes = computed(() => {
  return [...new Set(spots.value.map(spot => spot.make))].sort()
})

const uniqueYears = computed(() => {
  return [...new Set(spots.value.map(spot => spot.year))].sort((a, b) => b - a)
})

const uniqueColors = computed(() => {
  return [...new Set(spots.value.map(spot => spot.color))].sort()
})

// Apply filters and sorting
const filteredSpots = computed(() => {
  let filtered = [...spots.value]

  // Apply filters
  if (filters.value.make) {
    filtered = filtered.filter(spot => spot.make === filters.value.make)
  }
  if (filters.value.year) {
    filtered = filtered.filter(spot => spot.year === parseInt(filters.value.year))
  }
  if (filters.value.color) {
    filtered = filtered.filter(spot => spot.color === filters.value.color)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    if (sortBy.value === 'createdAt') {
      return b.createdAt - a.createdAt
    }
    if (sortBy.value === 'make') {
      return a.make.localeCompare(b.make)
    }
    if (sortBy.value === 'year') {
      return b.year - a.year
    }
    return 0
  })

  return filtered
})

// Delete spot
const handleDelete = async (spot) => {
  if (confirm('Are you sure you want to delete this spot?')) {
    await deleteSpot(spot.id, spot.imageUrls)
    selectedSpot.value = null
  }
}
</script>
