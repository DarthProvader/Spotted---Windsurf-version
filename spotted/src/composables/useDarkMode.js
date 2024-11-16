import { ref, onMounted, watch } from 'vue'

export default function useDarkMode() {
  const isDark = ref(false)

  // Check for saved theme preference or system preference
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateTheme()
  })

  // Update theme when isDark changes
  watch(isDark, () => {
    updateTheme()
  })

  // Update document classes and save preference
  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Toggle theme
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleDarkMode
  }
}
