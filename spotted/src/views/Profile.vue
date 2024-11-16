<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <!-- Profile Header -->
        <div class="relative h-48 bg-indigo-600 dark:bg-indigo-900">
          <div class="absolute -bottom-12 left-8">
            <div class="relative">
              <img
                :src="fullProfilePhotoUrl"
                alt="Profile photo"
                class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover bg-gray-100 dark:bg-gray-900"
              >
              <label
                class="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                title="Change profile photo"
              >
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleProfilePhotoChange"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            </div>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="px-8 pt-16 pb-8">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ displayName || email }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Member since {{ joinDate }}</p>
            </div>
            <button
              @click="isEditing = true"
              class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              Edit Profile
            </button>
          </div>

          <!-- Profile Stats -->
          <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalSpots }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Spots Added</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalLikes }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Likes Received</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalComments }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Comments</div>
            </div>
          </div>

          <!-- Edit Profile Modal -->
          <div v-if="isEditing" class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Edit Profile</h3>
              <form @submit.prevent="handleProfileUpdate">
                <div class="space-y-4">
                  <div>
                    <label for="displayName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                    <input
                      type="text"
                      id="displayName"
                      v-model="editForm.displayName"
                      class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                  </div>
                  <div>
                    <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea
                      id="bio"
                      v-model="editForm.bio"
                      rows="3"
                      class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    ></textarea>
                  </div>
                  <div>
                    <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <input
                      type="text"
                      id="location"
                      v-model="editForm.location"
                      class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                  </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="isEditing = false"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="isPending"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:opacity-50"
                  >
                    {{ isPending ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- User Bio and Details -->
          <div class="space-y-6">
            <div v-if="bio" class="prose">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">About</h3>
              <p class="text-gray-500 dark:text-gray-400">{{ bio }}</p>
            </div>
            <div v-if="location" class="flex items-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              {{ location }}
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-gray-600">
          <div v-for="activity in recentActivity" :key="activity.id" class="px-6 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img :src="activity.image" alt="" class="h-8 w-8 rounded-full">
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.description }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import useSpots from '../composables/useSpots'
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const { user } = useAuth()
const { spots } = useSpots()

// Profile state
const profilePhotoUrl = ref(user.value?.photoURL)
const displayName = ref(user.value?.displayName)
const email = computed(() => user.value?.email)
const bio = ref('')
const location = ref('')
const isEditing = ref(false)
const isPending = ref(false)

// Computed property for profile photo URL
const fullProfilePhotoUrl = computed(() => {
  return profilePhotoUrl.value ? profilePhotoUrl.value : '/images/default-avatar.png'
})

// Stats
const totalSpots = computed(() => spots.value.filter(spot => spot.userId === user.value?.uid).length)
const totalLikes = ref(0)
const totalComments = ref(0)

// Edit form
const editForm = ref({
  displayName: displayName.value || '',
  bio: bio.value,
  location: location.value
})

// Format join date
const joinDate = computed(() => {
  if (!user.value?.metadata?.creationTime) return ''
  return new Date(user.value.metadata.creationTime).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

// Mock recent activity data
const recentActivity = ref([
  {
    id: 1,
    image: '/images/default-avatar.png',
    description: 'Added a new spot in Maui',
    date: '2 hours ago'
  },
  {
    id: 2,
    image: '/images/default-avatar.png',
    description: 'Commented on a spot in Hood River',
    date: '1 day ago'
  }
])

// Handle profile photo change
const handleProfilePhotoChange = async (e) => {
  if (!e.target.files.length) return

  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image', file)

  try {
    isPending.value = true
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('Failed to upload image')

    const data = await response.json()
    
    // Update or create user profile
    const userRef = doc(db, 'users', user.value.uid)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        email: user.value.email,
        photoURL: data.path,
        displayName: user.value.displayName || '',
        bio: '',
        location: ''
      })
    } else {
      // Update existing document
      await updateDoc(userRef, {
        photoURL: data.path
      })
    }

    profilePhotoUrl.value = data.path
  } catch (error) {
    console.error('Error updating profile photo:', error)
  } finally {
    isPending.value = false
  }
}

// Handle profile update
const handleProfileUpdate = async () => {
  try {
    isPending.value = true
    const userRef = doc(db, 'users', user.value.uid)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        email: user.value.email,
        photoURL: profilePhotoUrl.value || '',
        displayName: editForm.value.displayName,
        bio: editForm.value.bio,
        location: editForm.value.location
      })
    } else {
      // Update existing document
      await updateDoc(userRef, {
        displayName: editForm.value.displayName,
        bio: editForm.value.bio,
        location: editForm.value.location
      })
    }

    // Update local state
    displayName.value = editForm.value.displayName
    bio.value = editForm.value.bio
    location.value = editForm.value.location
    isEditing.value = false
  } catch (error) {
    console.error('Error updating profile:', error)
  } finally {
    isPending.value = false
  }
}

// Load user profile data
onMounted(async () => {
  if (user.value?.uid) {
    try {
      const userRef = doc(db, 'users', user.value.uid)
      const userDoc = await getDoc(userRef)
      
      if (!userDoc.exists()) {
        // Create initial user document
        await setDoc(userRef, {
          email: user.value.email,
          photoURL: '',
          displayName: user.value.displayName || '',
          bio: '',
          location: ''
        })
      } else {
        const data = userDoc.data()
        profilePhotoUrl.value = data.photoURL
        displayName.value = data.displayName
        bio.value = data.bio
        location.value = data.location
        editForm.value = {
          displayName: data.displayName || '',
          bio: data.bio || '',
          location: data.location || ''
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }
})
</script>
