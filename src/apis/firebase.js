import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAhmwPYFdDalZ6QlQ2pqiR4coZxNTbjhv0",
  authDomain: "news-shoot.firebaseapp.com",
  projectId: "news-shoot",
  storageBucket: "news-shoot.appspot.com",
  messagingSenderId: "51666484486",
  appId: "1:51666484486:web:b1c0d65faf94603e89f287"
};

export const app = initializeApp(firebaseConfig);