import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCN9zYWNlZKp1Cv4TfSmm0mBAUllk8YI3k',
  authDomain: 'fantasticrealms-fbp.firebaseapp.com',
  projectId: 'fantasticrealms-fbp',
  storageBucket: 'fantasticrealms-fbp.appspot.com',
  messagingSenderId: '211234519091',
  appId: '1:211234519091:web:c1ee13c43dba99ab74cb46',
  measurementId: "G-H7ME5E41GT",
};

export const app = initializeApp(firebaseConfig);
