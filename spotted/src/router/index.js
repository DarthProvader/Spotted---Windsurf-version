import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

let authReady = false

// route guard
const requireAuth = (to, from, next) => {
  if (!authReady) {
    // Wait for auth to initialize
    onAuthStateChanged(auth, (user) => {
      authReady = true
      if (!user) {
        next({ name: 'login' })
      } else {
        next()
      }
    })
  } else {
    // Auth is ready, check current user
    if (!auth.currentUser) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
}

const requireNoAuth = (to, from, next) => {
  if (!authReady) {
    // Wait for auth to initialize
    onAuthStateChanged(auth, (user) => {
      authReady = true
      if (user) {
        next({ name: 'garage' })
      } else {
        next()
      }
    })
  } else {
    // Auth is ready, check current user
    if (auth.currentUser) {
      next({ name: 'garage' })
    } else {
      next()
    }
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    beforeEnter: requireNoAuth
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue'),
    beforeEnter: requireNoAuth
  },
  {
    path: '/garage',
    name: 'garage',
    component: () => import('../views/Garage.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/add-spot',
    name: 'add-spot',
    component: () => import('../views/AddSpot.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
