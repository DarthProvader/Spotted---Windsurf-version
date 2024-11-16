<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
          alt="Classic car on street"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Welcome to Spotted
        </h1>
        <p class="mt-6 text-xl text-gray-300 max-w-3xl">
          Document and share your automotive discoveries. From classic beauties to modern supercars,
          capture every special moment in your car spotting journey.
        </p>
        <div class="mt-10">
          <router-link
            to="/register"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
          >
            Get Started
          </router-link>
          <router-link
            to="/login"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
          >
            Sign In
          </router-link>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to document your spots
          </h2>
          <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Capture, organize, and share your automotive discoveries with our comprehensive set of features.
          </p>
        </div>

        <div class="mt-16">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature 1 -->
            <div class="pt-6">
              <div class="flow-root bg-gray-50 dark:bg-gray-700 rounded-lg px-6 pb-8">
                <div class="-mt-6">
                  <div>
                    <span class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </span>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Photo Upload</h3>
                  <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                    Capture multiple angles of each spot with our multi-image upload feature. Show off every detail of your discoveries.
                  </p>
                </div>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="pt-6">
              <div class="flow-root bg-gray-50 dark:bg-gray-700 rounded-lg px-6 pb-8">
                <div class="-mt-6">
                  <div>
                    <span class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Organized Collection</h3>
                  <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                    Keep your spots organized with detailed information including make, model, year, location, and personal notes.
                  </p>
                </div>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="pt-6">
              <div class="flow-root bg-gray-50 dark:bg-gray-700 rounded-lg px-6 pb-8">
                <div class="-mt-6">
                  <div>
                    <span class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </span>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Filter & Sort</h3>
                  <p class="mt-5 text-base text-gray-500 dark:text-gray-400">
                    Easily find specific spots with powerful filtering and sorting options. Search by make, model, year, or location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

const router = useRouter()
const { user } = useAuth()

// Redirect to garage if already logged in
if (user?.value) {
  router.push('/garage')
}
</script>
