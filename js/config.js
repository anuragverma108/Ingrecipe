// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZTw_lJmlFtDN3lMO9TMLLeJ85KigdJmo",
    authDomain: "ingrecipe-db1cc.firebaseapp.com", 
    projectId: "ingrecipe-db1cc",
    storageBucket: "ingrecipe-db1cc.firebasestorage.app",
    messagingSenderId: "232315097053",
    appId: "1:232315097053:web:a2a9b4a027dcb95eff3034",
    measurementId: "G-V8YRYG7WS6"
};

// API Configuration
const API_CONFIG = {
    baseUrl: "https://api.on-demand.io/chat/v1",
    apiKey: "EqNkOpH1tAd6srOyswTKQcYmCoDodzev", 
    plugins: ["plugin-1712327325", "plugin-1713962163"],
    endpointId: "predefined-openai-gpt4.1-nano"
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
