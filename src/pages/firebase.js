import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB90pptA5QX9tYTSV5TJZmVmIV_tvYPxpY",
  authDomain: "furia-chat-2.firebaseapp.com",
  projectId: "furia-chat-2",
  storageBucket: "furia-chat-2.firebasestorage.app",
  messagingSenderId: "295090249028",
  appId: "1:295090249028:web:b7aee9cbd2d2f4b4270b11"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messagesRef = collection(db, "messages");

export { messagesRef, addDoc, onSnapshot, query, orderBy, limit };