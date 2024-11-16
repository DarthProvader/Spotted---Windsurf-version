<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import useDarkMode from './composables/useDarkMode'

// Initialize dark mode
useDarkMode()
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
