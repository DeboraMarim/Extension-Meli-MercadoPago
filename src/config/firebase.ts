import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA1Pg_ys3S3l5qELQ3Iq9ehiyZOyGCyhQc",
  authDomain: "plugin-chrome-meli.firebaseapp.com",
  projectId: "plugin-chrome-meli",
  storageBucket: "plugin-chrome-meli.appspot.com",
  messagingSenderId: "958368706023",
  appId: "1:958368706023:web:117bf6834d3053e8f52142",
  measurementId: "G-ESY64DRQNH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
