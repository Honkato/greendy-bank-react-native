// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {singInWithEmailAndPassword, signOut, getAuth } from "firebase/auth"
import {getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDDSO7TyU7gQNiAEBm9A7ZudZpKQP3oZjM",
  authDomain: "fastBank-rai.firebaseapp.com",
  projectId: "fastBank-rai",
  storageBucket: "fastBank-rai.appspot.com",
  messagingSenderId: "339887329065",
  appId: "1:339887329065:web:c2098bb0e2f5229a13b138",
  measurementId: "G-4WKJ73P11X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const logout = ()=>{signOut(auth)};
export {auth, db, storage, logout}