// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "--insert--",
  authDomain: "--insert--",
  projectId: "--insert--",
  storageBucket: "--insert--",
  messagingSenderId: "--insert--",
  appId: "--insert--",
  measurementId: "--insert--"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app