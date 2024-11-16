import { ref } from 'vue'
import { auth } from '../firebase/config'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'

const user = ref(auth.currentUser)
const error = ref(null)
const isPending = ref(false)

// Listen for auth changes
onAuthStateChanged(auth, (_user) => {
    user.value = _user
})

export const useAuth = () => {
    const signup = async (email, password) => {
        error.value = null
        isPending.value = true
        
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (!response) throw new Error('Could not sign up')
            error.value = null
            isPending.value = false
            return response
        } catch (err) {
            error.value = err.message
            isPending.value = false
        }
    }

    const login = async (email, password) => {
        error.value = null
        isPending.value = true
        
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            if (!response) throw new Error('Could not log in')
            error.value = null
            isPending.value = false
            return response
        } catch (err) {
            error.value = err.message
            isPending.value = false
        }
    }

    const googleLogin = async () => {
        error.value = null
        isPending.value = true
        const provider = new GoogleAuthProvider()
        
        try {
            const response = await signInWithPopup(auth, provider)
            if (!response) throw new Error('Could not log in with Google')
            error.value = null
            isPending.value = false
            return response
        } catch (err) {
            error.value = err.message
            isPending.value = false
        }
    }

    const logout = async () => {
        error.value = null
        isPending.value = true
        
        try {
            await signOut(auth)
            isPending.value = false
        } catch (err) {
            error.value = err.message
            isPending.value = false
        }
    }

    return { 
        user, 
        error, 
        isPending, 
        signup, 
        login, 
        googleLogin, 
        logout 
    }
}

// For backward compatibility
export default useAuth
