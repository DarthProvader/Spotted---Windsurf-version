<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div class="absolute inset-0">
            <img
              class="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
              alt="Classic car on street"
            >
            <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-600 mix-blend-multiply"></div>
          </div>
          <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span class="block text-white">Welcome to Spotted</span>
              <span class="block text-indigo-200">Your Personal Car Spotting Journal</span>
            </h1>
            <p class="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
              Document and share your automotive discoveries. From classic beauties to modern supercars,
              capture every special moment in your car spotting journey.
            </p>
            <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <router-link
                  to="/register"
                  class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                >
                  Get Started
                </router-link>
                <router-link
                  to="/login"
                  class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                >
                  Sign In
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature section -->
    <div class="relative bg-gray-100 py-16 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-base font-semibold uppercase tracking-wider text-indigo-600">Features</h2>
        <p class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Everything you need to document your spots
        </p>
        <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Capture, organize, and share your automotive discoveries with our comprehensive set of features.
        </p>
        <div class="mt-12">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature 1 -->
            <div class="pt-6">
              <div class="flow-root rounded-lg bg-white px-6 pb-8">
                <div class="-mt-6">
                  <div class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Photo Upload</h3>
                  <p class="mt-5 text-base text-gray-500">
                    Capture multiple angles of each spot with our multi-image upload feature. Show off every detail of your discoveries.
                  </p>
                </div>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="pt-6">
              <div class="flow-root rounded-lg bg-white px-6 pb-8">
                <div class="-mt-6">
                  <div class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Organized Collection</h3>
                  <p class="mt-5 text-base text-gray-500">
                    Keep your spots organized with detailed information including make, model, year, location, and personal notes.
                  </p>
                </div>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="pt-6">
              <div class="flow-root rounded-lg bg-white px-6 pb-8">
                <div class="-mt-6">
                  <div class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">Filter & Sort</h3>
                  <p class="mt-5 text-base text-gray-500">
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
