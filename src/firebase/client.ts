import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCByg5M2h7dleV13j8A3VC2XpCgG_Ckrpo",
  authDomain: "astro-firebase-ftw.firebaseapp.com",
  projectId: "astro-firebase-ftw",
  storageBucket: "astro-firebase-ftw.appspot.com",
  messagingSenderId: "166766126682",
  appId: "1:166766126682:web:dd188a0b6bb1df87f71a63",
  measurementId: "G-F46JRB3NH3"
};

export const app = initializeApp(firebaseConfig);
