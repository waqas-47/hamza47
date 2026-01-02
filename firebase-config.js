// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAntKQQ8XJIjgVfzDb_1xLLwvXjzBbeysY",
  authDomain: "fir-chat-app-ce542.firebaseapp.com",
  projectId: "fir-chat-app-ce542",
  storageBucket: "fir-chat-app-ce542.firebasestorage.app",
  messagingSenderId: "728205037236",
  appId: "1:728205037236:web:51e26329f0265fb2c951e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
