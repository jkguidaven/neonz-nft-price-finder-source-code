// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxp36CZvZQo1SOiNqmUDT9kMD0Upwzhwo",
  authDomain: "neonz-price-finder.firebaseapp.com",
  projectId: "neonz-price-finder",
  storageBucket: "neonz-price-finder.appspot.com",
  messagingSenderId: "470439090833",
  appId: "1:470439090833:web:b17316d9a710d3ece8fd30",
  measurementId: "G-CR00YNY7MH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
