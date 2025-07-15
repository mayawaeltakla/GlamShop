// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB75zLjSdqQgg28g_V4DF6GBvC5o8sVyeE",
  authDomain: "mayaproject-f4c66.firebaseapp.com",
  projectId: "mayaproject-f4c66",
  storageBucket: "mayaproject-f4c66.appspot.com", // ✅ تعديل بسيط
  messagingSenderId: "346879050253",
  appId: "1:346879050253:web:bea75fe8444a80a72acb44",
  measurementId: "G-LDLKN7EHQS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };