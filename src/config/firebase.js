// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjwyQLO0IzeEa7k7dQjqpNG68RfyBIp0E",
  authDomain: "roomie-finance.firebaseapp.com",
  projectId: "roomie-finance",
  storageBucket: "roomie-finance.appspot.com",
  messagingSenderId: "598840567589",
  appId: "1:598840567589:web:12d2f0d7686120478fdccc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth variable has the information of currend user logged in
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

