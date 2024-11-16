<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Garage</h1>
        <router-link
          to="/add-spot"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Spot
        </router-link>
      </div>

      <!-- Filters -->
      <div class="bg-white shadow rounded-lg mb-6 p-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label for="makeFilter" class="block text-sm font-medium text-gray-700">Make</label>
            <select
              id="makeFilter"
              v-model="filters.make"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Makes</option>
              <option v-for="make in uniqueMakes" :key="make" :value="make">{{ make }}</option>
            </select>
          </div>

          <div>
            <label for="yearFilter" class="block text-sm font-medium text-gray-700">Year</label>
            <select
              id="yearFilter"
              v-model="filters.year"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Years</option>
              <option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>

          <div>
            <label for="colorFilter" class="block text-sm font-medium text-gray-700">Color</label>
            <select
              id="colorFilter"
              v-model="filters.color"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Colors</option>
              <option v-for="color in uniqueColors" :key="color" :value="color">{{ color }}</option>
            </select>
          </div>

          <div>
            <label for="sortBy" class="block text-sm font-medium text-gray-700">Sort By</label>
            <select
              id="sortBy"
              v-model="sortBy"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
        <p class="mt-2 text-gray-600">Loading your garage...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">{{ error }}</p>
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
        <h3 class="mt-2 text-sm font-medium text-gray-900">No spots found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding a new spot.</p>
        <div class="mt-6">
          <router-link
            to="/add-spot"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          class="bg-white overflow-hidden shadow rounded-lg"
        >
          <!-- Image -->
          <div class="relative aspect-w-16 aspect-h-9">
            <img
              :src="spot.imageUrls[0]"
              :alt="`${spot.make} ${spot.model}`"
              class="w-full h-48 object-cover"
            >
          </div>

          <!-- Content -->
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ spot.year }} {{ spot.make }} {{ spot.model }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ spot.location }}
            </p>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <span class="inline-block h-4 w-4 rounded-full mr-2" :style="{ backgroundColor: spot.color }"></span>
              {{ spot.color }}
            </div>
          </div>

          <!-- Actions -->
          <div class="border-t border-gray-200 px-4 py-3">
            <button
              @click="selectedSpot = spot"
              class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
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
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4"
      @click="selectedSpot = null"
    >
      <div
        class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">
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
              class="w-full h-48 object-cover rounded-lg"
            >
          </div>

          <!-- Details -->
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500">Location</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ selectedSpot.location }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Color</dt>
              <dd class="mt-1 text-sm text-gray-900 flex items-center">
                <span
                  class="inline-block h-4 w-4 rounded-full mr-2"
                  :style="{ backgroundColor: selectedSpot.color }"
                ></span>
                {{ selectedSpot.color }}
              </dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Notes</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ selectedSpot.notes || 'No notes' }}</dd>
            </div>
          </dl>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            @click="handleDelete(selectedSpot)"
            class="text-red-600 hover:text-red-900 text-sm font-medium"
          >
            Delete Spot
          </button>
          <button
            @click="selectedSpot = null"
            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import useSpots from '../composables/useSpots'

const { spots, error, isPending, getUserSpots, deleteSpot } = useSpots()

// Filters and sorting
const filters = ref({
  make: '',
  year: '',
  color: ''
})
const sortBy = ref('createdAt')
const selectedSpot = ref(null)

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

// Load spots on mount
onMounted(async () => {
  await getUserSpots()
})
</script>
