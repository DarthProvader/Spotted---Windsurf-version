<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
