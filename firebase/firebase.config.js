// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAHJAZFlfOP0yxkQWIKdSnFiVcn2Z2ply8",
    authDomain: "events-app-d3543.firebaseapp.com",
    projectId: "events-app-d3543",
    storageBucket: "events-app-d3543.appspot.com",
    messagingSenderId: "929566943508",
    appId: "1:929566943508:web:643ab693e0789d6812fa01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;

