
import { initializeApp } from "firebase/app";
import { getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS-ZZUZleDX6R62GvQwKDxXK9U5UE8lWs",
  authDomain: "edtech-b7d5f.firebaseapp.com",
  projectId: "edtech-b7d5f",
  storageBucket: "edtech-b7d5f.appspot.com",
  messagingSenderId: "301639228652",
  appId: "1:301639228652:web:49bafde3002e2eebbe19c9",
  measurementId: "G-LKR92CHWP7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db,provider, signInWithPopup };
