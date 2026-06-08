import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGWIQqoasoLvV3ZroovHQNpxT-AI-M7NQ",
  authDomain: "soulfm-website.firebaseapp.com",
  projectId: "soulfm-website",
  storageBucket: "soulfm-website.firebasestorage.app",
  messagingSenderId: "758120799298",
  appId: "1:758120799298:web:fbe1d7ecbc6d76a21b21db",
  measurementId: "G-102YC4WX4N"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);