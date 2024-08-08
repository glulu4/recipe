// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase


// Import Firebase SDK functions
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, browserLocalPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyC-VAIGqIdeKBCyxdsL12TGedWkAznXYJQ",
    authDomain: "recipe-3f78e.firebaseapp.com",
    projectId: "recipe-3f78e",
    storageBucket: "recipe-3f78e.appspot.com",
    messagingSenderId: "108942318763",
    appId: "1:108942318763:web:accd00b31a3c4836af2bee"
    // apiKey: process.env.API_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    // storageBucket: process.env.STORAGE_BUCKET,
    // messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and set persistence
const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);

// Initialize Firebase Functions
const functions = getFunctions(app);

// Optionally initialize Firebase Analytics
const analytics = getAnalytics(app);

// Export the initialized Firebase app, functions, and other services
export { app, functions, httpsCallable, auth, analytics };
