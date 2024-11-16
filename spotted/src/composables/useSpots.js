import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, addDoc, query, where, getDocs, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { useAuth } from './useAuth'

const { user } = useAuth()

const useSpots = () => {
  const error = ref(null)
  const isPending = ref(false)
  const spots = ref([])
  const spot = ref(null)

  const uploadImage = async (file) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      return data.path
    } catch (err) {
      console.error('Error uploading image:', err)
      throw new Error('Could not upload image')
    }
  }

  const addSpot = async (spotData, images) => {
    error.value = null
    isPending.value = true

    try {
      // Upload images first
      const imageUrls = await Promise.all(
        images.map(image => uploadImage(image))
      )

      // Add spot document
      const docRef = await addDoc(collection(db, 'spots'), {
        ...spotData,
        imageUrls,
        userId: user.value.uid,
        createdAt: new Date()
      })

      isPending.value = false
      return docRef
    } catch (err) {
      console.error('Error adding spot:', err)
      error.value = err.message || 'Could not add the spot'
      isPending.value = false
    }
  }

  const getUserSpots = async (sortBy = 'createdAt') => {
    error.value = null
    isPending.value = true

    try {
      const q = query(
        collection(db, 'spots'),
        where('userId', '==', user.value.uid),
        orderBy(sortBy, 'desc')
      )

      const querySnapshot = await getDocs(q)
      spots.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      isPending.value = false
    } catch (err) {
      console.error('Error getting spots:', err)
      error.value = 'Could not fetch spots'
      isPending.value = false
    }
  }

  const deleteSpot = async (spotId, imageUrls) => {
    error.value = null
    isPending.value = true

    try {
      // Delete images from local storage
      await Promise.all(
        imageUrls.map(async (url) => {
          // Remove the image from the public/images directory
          const response = await fetch('/api/delete-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
          })

          if (!response.ok) {
            throw new Error('Failed to delete image')
          }
        })
      )

      // Delete document
      await deleteDoc(doc(db, 'spots', spotId))
      
      // Remove from local state
      spots.value = spots.value.filter(s => s.id !== spotId)

      isPending.value = false
    } catch (err) {
      console.error('Error deleting spot:', err)
      error.value = 'Could not delete the spot'
      isPending.value = false
    }
  }

  return {
    error,
    isPending,
    spots,
    spot,
    addSpot,
    getUserSpots,
    deleteSpot
  }
}

export default useSpots
