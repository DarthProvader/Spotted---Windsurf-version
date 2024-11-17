<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="inline-block"
  >
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" :style="{ 'stop-color': startColor, 'stop-opacity': 1 }" />
        <stop offset="100%" :style="{ 'stop-color': endColor, 'stop-opacity': 1 }" />
      </linearGradient>
    </defs>
    <path
      fill="url(#logoGrad)"
      d="M22 13.5V21H2V13.5C2 13.5 7.5 16 12 16C16.5 16 22 13.5 22 13.5ZM12 3C16.5 3 22 5.5 22 5.5V11.5C22 11.5 16.5 14 12 14C7.5 14 2 11.5 2 11.5V5.5C2 5.5 7.5 3 12 3ZM12 5C9.5 5 7.5 6.5 7.5 6.5V9.5C7.5 9.5 9.5 11 12 11C14.5 11 16.5 9.5 16.5 9.5V6.5C16.5 6.5 14.5 5 12 5Z"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  startColor: {
    type: String,
    default: '#4F46E5' // indigo-600
  },
  endColor: {
    type: String,
    default: '#818CF8' // indigo-400
  }
})
</script>
