// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOBPbY6pQPzdRBbK-BOjULiQEVFg3LuMo",
    authDomain: "growthify-d97a9.firebaseapp.com",
    projectId: "growthify-d97a9",
    storageBucket: "growthify-d97a9.firebasestorage.app",
    messagingSenderId: "1043362894886",
    appId: "1:1043362894886:web:dfd5000b9a010b229b02e7",
    measurementId: "G-H0LRCT7QT3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;