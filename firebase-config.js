/* ===== Firebase Config — Omkar Kirana Store ===== */
const firebaseConfig = {
  apiKey: "AIzaSyDeo4SW4XkC-EFO6EzwWGcJNc0Goav5O34",
  authDomain: "omkar-kirana-store.firebaseapp.com",
  projectId: "omkar-kirana-store",
  storageBucket: "omkar-kirana-store.firebasestorage.app",
  messagingSenderId: "996160396591",
  appId: "1:996160396591:web:33456ae47b3cf99a0dd5da",
  measurementId: "G-NFWVWLKMD7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = (typeof firebase.auth === "function") ? firebase.auth() : null;
