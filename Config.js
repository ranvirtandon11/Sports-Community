import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRil0E7X96ZpR83zYoCwPq5qEhwLz2pik",
  authDomain: "playmate-8302d.firebaseapp.com",
  projectId: "playmate-8302d",
  storageBucket: "playmate-8302d.appspot.com",
  messagingSenderId: "636770051230",
  appId: "1:636770051230:web:34c81079e5e94b51c7878f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app);
export const storage = getStorage(app);

export const usersRef = collection(db,'users');