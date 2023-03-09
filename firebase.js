// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrnKDBr96YoatOdbjMm4paXHj2nD1B3_c",
  authDomain: "task-db-1d231.firebaseapp.com",
  projectId: "task-db-1d231",
  storageBucket: "task-db-1d231.appspot.com",
  messagingSenderId: "873977622251",
  appId: "1:873977622251:web:d6810f71c9c33a3a1798ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
