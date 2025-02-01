// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl2pnhU4-5MsnbK3GofxJwFkFJ2XhyR9U",
  authDomain: "atlas-phone-d155f.firebaseapp.com",
  projectId: "atlas-phone-d155f",
  storageBucket: "atlas-phone-d155f.firebasestorage.app",
  messagingSenderId: "185260657687",
  appId: "1:185260657687:web:070510e0a6d23fa5396052",
  measurementId: "G-1L114FWV49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
