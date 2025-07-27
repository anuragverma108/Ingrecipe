# IngrecipeAI - HTML/CSS/JS Version

A modern, responsive web application that provides personalized recipe recommendations based on user health data, preferences, and available ingredients. Built with vanilla HTML, CSS, JavaScript and Firebase for authentication and database management.

## 🚀 Features

- **Personalized Recipe Recommendations**: AI-powered suggestions based on BMI, health goals, and dietary preferences
- **Firebase Authentication**: Secure user registration and login system
- **User Profiles**: Store and manage user preferences and health data
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Mobile-Friendly**: Optimized for all device sizes
- **Real-time Database**: Firebase Firestore for data persistence
- **External AI API**: Integration with on-demand.io for recipe generation

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **API**: On-demand.io AI API
- **Styling**: Custom CSS with Font Awesome icons
- **Fonts**: Google Fonts (Poppins)

## 📁 Project Structure

```
IngrecipeAI/
├── index.html              # Main landing page
├── styles/
│   └── main.css           # Main stylesheet
├── js/
│   ├── config.js          # Firebase and API configuration
│   ├── auth.js            # Authentication module
│   └── app.js             # Main application logic
├── README.md              # This file
└── .gitignore            # Git ignore file
```

## ⚡ Getting Started

### 1. Prerequisites

- A modern web browser
- Firebase project (free tier available)
- On-demand.io API key

### 2. Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication**:
   - In Firebase Console, go to Authentication
   - Click "Get started"
   - Enable "Email/Password" provider

3. **Enable Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" for development

4. **Get Firebase Config**:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click "Add app" → Web app
   - Copy the config object

### 3. API Setup

1. **Get On-demand.io API Key**:
   - Sign up at [on-demand.io](https://on-demand.io)
   - Get your API key from the dashboard

### 4. Configuration

1. **Update Firebase Config** (`js/config.js`):
   ```javascript
   const firebaseConfig = {
       apiKey: "your-actual-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "your-sender-id",
       appId: "your-app-id"
   };
   ```

2. **Update API Config** (`js/config.js`):
   ```javascript
   const API_CONFIG = {
       baseUrl: 'https://api.on-demand.io/chat/v1',
       apiKey: 'your-actual-on-demand-api-key',
       plugins: ["plugin-1712327325", "plugin-1713962163"],
       endpointId: "predefined-openai-gpt4o"
   };
   ```

### 5. Run the Application

1. **Local Development**:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx http-server
   
   # Using PHP (if installed)
   php -S localhost:8000
   ```

2. **Open Browser**:
   - Navigate to `http://localhost:8000`
   - The application should load and be fully functional

## 🔧 Configuration Details

### Firebase Security Rules

For Firestore, use these security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Environment Variables

For production, consider using environment variables:

```javascript
// Example with environment variables
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // ... other config
};
```

## 🎨 Customization

### Styling

The application uses a modern color scheme:
- Primary: `#ff6b35` (Orange)
- Secondary: `#f7931e` (Light Orange)
- Background: `#f8f9fa` (Light Gray)
- Text: `#333` (Dark Gray)

### Adding New Features

1. **New Recipe Types**: Modify the form in `js/app.js`
2. **Additional Health Metrics**: Update the BMI calculation and form fields
3. **Custom Styling**: Edit `styles/main.css`
4. **Database Schema**: Update user profile structure in `js/auth.js`

## 🔒 Security Considerations

- API keys are exposed in client-side code (consider using a backend proxy for production)
- Firebase security rules should be properly configured
- Input validation is implemented on the client side
- Consider implementing rate limiting for API calls

## 🚀 Deployment

### Static Hosting

The application can be deployed to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **GitHub Pages**: Push to a GitHub repository

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy**:
   ```bash
   firebase deploy
   ```

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **Firebase not initializing**:
   - Check your Firebase config
   - Ensure Firebase SDK is loaded
   - Check browser console for errors

2. **API calls failing**:
   - Verify your API key is correct
   - Check network tab for request/response
   - Ensure CORS is properly configured

3. **Authentication not working**:
   - Verify Firebase Auth is enabled
   - Check Firestore rules
   - Ensure email/password provider is enabled

### Debug Mode

Enable debug mode in `js/config.js`:
```javascript
const APP_CONFIG = {
    debug: true
};
```

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Create an issue on GitHub
- Check the troubleshooting section
- Review Firebase documentation
- Contact the maintainer

---

**Note**: This is a client-side application. For production use, consider implementing a backend service to handle API calls securely and manage rate limiting. 