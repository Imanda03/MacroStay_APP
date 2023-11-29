// Import the functions you need from the SDKs you need
import {getAuth} from "@firebase/auth"
import {getFirestore} from "@firebase/firestore"
import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB13Q1sSlQP3iRFkC3qhwrQhTQ7Ar-Tt3g",
  authDomain: "macrostay.firebaseapp.com",
  projectId: "macrostay",
  storageBucket: "macrostay.appspot.com",
  messagingSenderId: "963943351958",
  appId: "1:963943351958:web:9503c4a95de93c8f9ea4b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth, db};

