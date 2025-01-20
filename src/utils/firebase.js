import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBoasHPc2avZl3sdLPRRsoOKqRNIuNzlBo",
    authDomain: "realakmovies.firebaseapp.com",
    projectId: "realakmovies",
    storageBucket: "realakmovies.firebasestorage.app",
    messagingSenderId: "586973223797",
    appId: "1:586973223797:web:002310947248a35605113c",
    measurementId: "G-FBQ73G1PB8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
