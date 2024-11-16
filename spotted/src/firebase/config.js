import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYZryxekDZA4wbx69osjdw-ezQeC6o4dY",
  authDomain: "spotted-40ecf.firebaseapp.com",
  projectId: "spotted-40ecf",
  storageBucket: "spotted-40ecf.firebasestorage.app",
  messagingSenderId: "127231866464",
  appId: "1:127231866464:web:872a0b9a2ba5ddb395b505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
