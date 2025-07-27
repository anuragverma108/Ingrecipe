// Authentication Module
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.auth = window.auth;
        this.db = window.db;
        this.init();
    }

    init() {
        try {
            console.log('Initializing AuthManager...');
            console.log('Firebase auth available:', !!this.auth);
            console.log('Firebase db available:', !!this.db);
            
            // Check if we're running in a supported environment
            if (location.protocol === 'file:') {
                console.log('Running from local file system - some Firebase Auth features will be limited');
                // Set up a minimal auth state for local development
                this.currentUser = null;
                this.updateUI();
                // Initialize UI elements even in local mode
                this.initUI();
                return;
            }
            
            // Listen for auth state changes
            if (this.auth) {
                this.auth.onAuthStateChanged((user) => {
                    console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
                    this.currentUser = user;
                    this.updateUI();
                    if (user) {
                        this.loadUserProfile(user.uid);
                    }
                });

                // Handle redirect results
                this.handleRedirectResult();
            } else {
                console.log('Firebase auth not available - running in limited mode');
            }

            // Initialize UI elements
            this.initUI();
            
            console.log('AuthManager initialized successfully');
        } catch (error) {
            console.error('Error initializing AuthManager:', error);
        }
    }

    async handleRedirectResult() {
        try {
            // Check if we're running in a supported environment for Firebase Auth
            if (location.protocol === 'file:') {
                console.log('Running from local file system - Firebase Auth redirect operations not supported');
                return; // Skip redirect result handling when running from file://
            }
            
            const result = await this.auth.getRedirectResult();
            if (result.user) {
                console.log('Redirect login successful:', result.user);
                if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
                    await this.createUserProfile(result.user);
                }
                this.showSuccess('Google login successful!');
            }
        } catch (error) {
            console.error('Redirect result error:', error);
            // Only show error if it's not the expected environment limitation
            if (error.code !== 'auth/operation-not-supported-in-this-environment') {
                this.showError(this.getErrorMessage(error));
            }
        }
    }

    initUI() {
        // Get UI elements
        this.loginBtn = document.getElementById('loginBtn');
        this.signupBtn = document.getElementById('signupBtn');
        this.authModal = document.getElementById('authModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.authForm = document.getElementById('authForm');
        this.switchAuthBtn = document.getElementById('switchAuthBtn');
        this.switchText = document.getElementById('switchText');
        this.modalClose = document.querySelector('.modal-close');

        console.log('UI Elements found:');
        console.log('- Login button:', !!this.loginBtn);
        console.log('- Signup button:', !!this.signupBtn);
        console.log('- Auth modal:', !!this.authModal);
        console.log('- Auth form:', !!this.authForm);
        console.log('- Modal title:', !!this.modalTitle);
        console.log('- Switch button:', !!this.switchAuthBtn);
        console.log('- Switch text:', !!this.switchText);
        console.log('- Modal close:', !!this.modalClose);

        // Add event listeners only if elements exist
        if (this.loginBtn) {
            this.loginBtn.addEventListener('click', () => this.showAuthModal('login'));
        }
        if (this.signupBtn) {
            this.signupBtn.addEventListener('click', () => this.showAuthModal('signup'));
        }
        if (this.authForm) {
            this.authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
        }
        if (this.switchAuthBtn) {
            this.switchAuthBtn.addEventListener('click', () => this.switchAuthMode());
        }
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.hideAuthModal());
        }
        if (this.authModal) {
            this.authModal.addEventListener('click', (e) => {
                if (e.target === this.authModal) this.hideAuthModal();
            });
        }
        
        // Google login button
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                console.log('Google login button clicked');
                this.handleGoogleLogin();
            });
        } else {
            console.error('Google login button not found');
        }
    }

    showAuthModal(mode) {
        this.authMode = mode;
        if (!this.authModal) {
            console.error('Auth modal not found');
            return;
        }
        
        this.authModal.style.display = 'block';
        
        if (mode === 'login') {
            if (this.modalTitle) this.modalTitle.textContent = 'Login';
            if (this.switchText) this.switchText.textContent = "Don't have an account?";
            if (this.switchAuthBtn) this.switchAuthBtn.textContent = 'Sign Up';
        } else {
            if (this.modalTitle) this.modalTitle.textContent = 'Sign Up';
            if (this.switchText) this.switchText.textContent = 'Already have an account?';
            if (this.switchAuthBtn) this.switchAuthBtn.textContent = 'Login';
        }
    }

    hideAuthModal() {
        if (this.authModal) this.authModal.style.display = 'none';
        if (this.authForm) this.authForm.reset();
    }

    switchAuthMode() {
        this.authMode = this.authMode === 'login' ? 'signup' : 'login';
        this.showAuthModal(this.authMode);
    }

    async handleAuthSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Auth submit - Mode:', this.authMode);
        console.log('Email:', email);
        console.log('Password length:', password.length);

        try {
            this.showLoading();
            
            if (this.authMode === 'login') {
                console.log('Attempting login...');
                await this.login(email, password);
            } else {
                console.log('Attempting signup...');
                await this.signup(email, password);
            }
            
            this.hideAuthModal();
            this.showSuccess('Authentication successful!');
        } catch (error) {
            console.error('Authentication error:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            this.showError(this.getErrorMessage(error));
        } finally {
            this.hideLoading();
        }
    }

    async handleGoogleLogin() {
        try {
            console.log('Starting Google login...');
            this.showLoading();
            
            // Check if Firebase is properly initialized
            if (!firebase.auth) {
                throw new Error('Firebase Auth not initialized');
            }
            
            await this.loginWithGoogle();
            this.hideAuthModal();
            this.showSuccess('Google login successful!');
        } catch (error) {
            console.error('Google login failed:', error);
            // Try redirect method if popup fails
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
                try {
                    console.log('Trying redirect method...');
                    await this.loginWithGoogleRedirect();
                } catch (redirectError) {
                    console.error('Redirect method failed:', redirectError);
                    this.showError(this.getErrorMessage(redirectError));
                }
            } else {
                this.showError(this.getErrorMessage(error));
            }
        } finally {
            this.hideLoading();
        }
    }

    async loginWithGoogleRedirect() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            await this.auth.signInWithRedirect(provider);
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            console.log('Login successful:', userCredential.user);
        } catch (error) {
            throw error;
        }
    }

    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            // Add custom parameters for better UX
            provider.addScope('email');
            provider.addScope('profile');
            
            const result = await this.auth.signInWithPopup(provider);
            console.log('Google login successful:', result.user);
            
            // Check if this is a new user
            if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
                await this.createUserProfile(result.user);
            }
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    }

    async signup(email, password) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            console.log('Signup successful:', userCredential.user);
            
            // Create user profile in Firestore
            await this.createUserProfile(userCredential.user);
        } catch (error) {
            throw error;
        }
    }

    async createUserProfile(user) {
        try {
            const userProfile = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                profile: {
                    name: user.displayName || '',
                    height: 0,
                    weight: 0,
                    bmi: 0,
                    goals: [],
                    dietaryPreferences: [],
                    allergies: [],
                    activityLevel: '',
                    cuisinePreferences: []
                },
                preferences: {
                    mealTypes: [],
                    cookingTime: '',
                    skillLevel: 'beginner'
                },
                history: {
                    recipesViewed: [],
                    recipesSaved: [],
                    lastActive: firebase.firestore.FieldValue.serverTimestamp()
                }
            };

            await this.db.collection('users').doc(user.uid).set(userProfile);
            console.log('User profile created successfully');
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    }

    async loadUserProfile(uid) {
        try {
            const doc = await this.db.collection('users').doc(uid).get();
            if (doc.exists) {
                const userData = doc.data();
                window.currentUserProfile = userData;
                console.log('User profile loaded:', userData);
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    async updateUserProfile(updates) {
        if (!this.currentUser) return;

        try {
            await this.db.collection('users').doc(this.currentUser.uid).update({
                ...updates,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('User profile updated successfully');
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.auth.signOut();
            this.showSuccess('Logged out successfully!');
        } catch (error) {
            this.showError('Error logging out');
            console.error('Logout error:', error);
        }
    }

    updateUI() {
        if (this.currentUser) {
            // User is logged in
            if (this.loginBtn) this.loginBtn.style.display = 'none';
            if (this.signupBtn) this.signupBtn.style.display = 'none';
            
            // Create user menu
            if (!document.getElementById('userMenu')) {
                const userMenu = document.createElement('div');
                userMenu.id = 'userMenu';
                userMenu.className = 'user-menu';
                
                // Get user display name and photo
                const displayName = this.currentUser.displayName || this.currentUser.email.split('@')[0];
                const photoURL = this.currentUser.photoURL || '';
                
                userMenu.innerHTML = `
                    <div class="user-info">
                        ${photoURL ? `<img src="${photoURL}" alt="Profile" class="user-avatar">` : ''}
                        <span class="user-name">${displayName}</span>
                    </div>
                    <button class="btn btn-outline" id="profileBtn">
                        <i class="fas fa-user"></i>
                        Profile
                    </button>
                    <button class="btn btn-outline" id="logoutBtn">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                `;
                
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) {
                    navMenu.appendChild(userMenu);
                    
                    // Add event listeners
                    const profileBtn = document.getElementById('profileBtn');
                    const logoutBtn = document.getElementById('logoutBtn');
                    
                    if (profileBtn) profileBtn.addEventListener('click', () => this.showProfile());
                    if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
                } else {
                    console.error('Nav menu not found, cannot append user menu');
                }
            }
        } else {
            // User is logged out
            if (this.loginBtn) this.loginBtn.style.display = 'inline-flex';
            if (this.signupBtn) this.signupBtn.style.display = 'inline-flex';
            
            // Remove user menu
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.remove();
            }
        }
    }

    showProfile() {
        // Navigate to profile page or show profile modal
        console.log('Show profile');
        // You can implement profile page navigation here
    }

    getErrorMessage(error) {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email address.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/popup-closed-by-user':
                return 'Google sign-in was cancelled.';
            case 'auth/popup-blocked':
                return 'Google sign-in popup was blocked. Please allow popups for this site.';
            case 'auth/account-exists-with-different-credential':
                return 'An account already exists with the same email address but different sign-in credentials.';
            case 'auth/operation-not-allowed':
                return 'Google sign-in is not enabled. Please contact support.';
            default:
                console.error('Auth error:', error);
                return 'An error occurred. Please try again.';
        }
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'flex';
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'none';
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize Auth Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing AuthManager...');
    try {
        window.authManager = new AuthManager();
        console.log('AuthManager created successfully');
    } catch (error) {
        console.error('Error creating AuthManager:', error);
    }
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 4000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: #28a745;
    }
    
    .notification-error {
        background: #dc3545;
    }
    
    .notification-info {
        background: #17a2b8;
    }
    
    .user-menu {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ffffff;
    }
    
    .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .user-name {
        font-weight: 500;
        font-size: 0.9rem;
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);