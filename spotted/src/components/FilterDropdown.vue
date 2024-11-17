<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
    >
      <span>Filters</span>
      <!-- Chevron icon -->
      <svg
        class="ml-2 -mr-1 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        :class="{ 'transform rotate-180': isOpen }"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dropdown panel -->
    <div
      v-show="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-screen sm:w-96 max-w-[calc(100vw-2rem)] rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
      :class="{
        'left-0 sm:left-auto': window?.value?.innerWidth < 640
      }"
    >
      <div class="p-4 sm:p-6 space-y-6">
        <div>
          <label for="makeFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Make</label>
          <select
            id="makeFilter"
            v-model="modelValue.make"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm px-4 py-2.5"
          >
            <option value="">All Makes</option>
            <option v-for="make in makes" :key="make" :value="make">{{ make }}</option>
          </select>
        </div>

        <div>
          <label for="yearFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
          <select
            id="yearFilter"
            v-model="modelValue.year"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm px-4 py-2.5"
          >
            <option value="">All Years</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>

        <div>
          <label for="colorFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
          <select
            id="colorFilter"
            v-model="modelValue.color"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm px-4 py-2.5"
          >
            <option value="">All Colors</option>
            <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
          </select>
        </div>

        <div>
          <label for="sortBy" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
          <select
            id="sortBy"
            v-model="sortValue"
            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm px-4 py-2.5"
          >
            <option value="createdAt">Date Added</option>
            <option value="make">Make</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  makes: {
    type: Array,
    default: () => []
  },
  years: {
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => []
  },
  sort: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'update:sort'])
const isOpen = ref(false)
const window = ref(null)

// Track window width
onMounted(() => {
  window.value = globalThis.window
  const handleResize = () => {
    window.value = globalThis.window
  }
  globalThis.window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    globalThis.window.removeEventListener('resize', handleResize)
  })
})

// Close dropdown when clicking outside
const dropdownRef = ref(null)
onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

const sortValue = computed({
  get() {
    return props.sort
  },
  set(value) {
    emit('update:sort', value)
  }
})
</script>
