// Firebase Configuration
// INSTRUCTIONS: Replace the values below with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > Your apps > Web app config

const firebaseConfig = {
  apiKey: "AIzaSyCilFNCnfEPDCfE4aVYBcv-afCJN2dKegg",
  authDomain: "pawamor-forms.firebaseapp.com",
  projectId: "pawamor-forms",
  storageBucket: "pawamor-forms.firebasestorage.app",
  messagingSenderId: "881127856295",
  appId: "1:881127856295:web:5bc8352de2934bc22ee382",
  measurementId: "G-M5E4PE2YL4",
};

// Initialize Firebase
// This code will run automatically when the file is loaded
let db;
try {
  const app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}

// Export for use in other files
window.firebaseDB = db;
