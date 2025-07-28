// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN", 
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID",
    measurementId: "YOUR_FIREBASE_MEASUREMENT_ID"
};

// API Configuration
const API_CONFIG = {
    baseUrl: "YOUR_API_BASE_URL",
    apiKey: "YOUR_API_KEY", 
    plugins: ["YOUR_PLUGIN_1", "YOUR_PLUGIN_2"],
    endpointId: "YOUR_ENDPOINT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

// Make configurations globally available
window.firebaseConfig = firebaseConfig;
window.API_CONFIG = API_CONFIG;
window.auth = auth;
window.db = db;
window.analytics = analytics;
