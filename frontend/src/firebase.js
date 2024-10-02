// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gen-ai-project-64081.firebaseapp.com",
  projectId: "gen-ai-project-64081",
  storageBucket: "gen-ai-project-64081.appspot.com",
  messagingSenderId: "1078633178250",
  appId: "1:1078633178250:web:6cf7aeecbb4cdd45593973"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);