import { initializeApp,getApps,getApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlkwG03DniPEeLFj1aJDbf7tTCpIS249s",
    authDomain: "prepwise-61f2a.firebaseapp.com",
    projectId: "prepwise-61f2a",
    storageBucket: "prepwise-61f2a.firebasestorage.app",
    messagingSenderId: "822377481472",
    appId: "1:822377481472:web:bf5399b52d042441e05fe5",
    measurementId: "G-HXNFZBMFZ9"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();
export const db = getFirestore(app)
export const auth = getAuth(app)