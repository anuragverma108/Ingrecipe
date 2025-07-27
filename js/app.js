// Main Application Module
class IngrecipeAI {
    constructor() {
        this.currentPage = 'home';
        this.recipeForm = null;
        this.resultsPage = null;
        this.init();
    }

    init() {
        this.initNavigation();
        this.initEventListeners();
        this.setupRouting();
    }

    initNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    initEventListeners() {
        // Get Started button
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                this.showRecipeForm();
            });
        }

        // Learn More button
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    setupRouting() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRouteChange();
        });

        // Handle initial route
        this.handleRouteChange();
    }

    handleRouteChange() {
        // Get the path from either pathname or hash for compatibility with file:// protocol
        const path = window.location.pathname || window.location.hash;
        
        console.log('Current path:', path);
        
        if (path.includes('recipe-form')) {
            this.showRecipeForm();
        } else if (path.includes('results')) {
            // Handle results page if needed
        } else {
            this.showHomePage();
        }
    }

    showHomePage() {
        this.currentPage = 'home';
        document.body.className = '';
        try {
            // Use empty string for home page to avoid issues with file:// protocol
            window.history.pushState({}, '', '');
        } catch (error) {
            console.error('Error updating URL:', error);
            // Continue even if pushState fails
        }
    }

    showRecipeForm() {
        console.log('[DEBUG] Showing recipe form');
        this.currentPage = 'recipe-form';
        this.createRecipeForm();
        // Use a relative path instead of absolute path to avoid issues with local file system
        try {
            window.history.pushState({}, '', 'recipe-form');
        } catch (error) {
            console.error('Error updating URL:', error);
            // Continue even if pushState fails
        }
        console.log('[DEBUG] Recipe form should be displayed now');
    }

    createRecipeForm() {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });

        // Create recipe form
        const formHTML = `
            <div class="recipe-form-container">
                <div class="container">
                    <div class="form-header">
                        <h1>🍽️ Get Your Personalized Recipe</h1>
                        <p>Tell us about your preferences and we'll create the perfect recipe for you!</p>
                    </div>
                    
                    <form id="recipeForm" class="recipe-form">
                        <div class="form-grid">
                            <!-- Basic Information -->
                            <div class="form-section">
                                <h3><i class="fas fa-info-circle"></i> Basic Information</h3>
                                
                                <div class="form-group">
                                    <label for="ingredients">Available Ingredients</label>
                                    <input type="text" id="ingredients" name="ingredients" 
                                           placeholder="e.g., chicken, rice, tomatoes, onions" required>
                                    <small>Separate ingredients with commas</small>
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="mealType">Meal Type</label>
                                        <select id="mealType" name="mealType" required>
                                            <option value="">Select meal type</option>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                            <option value="Snack">Snack</option>
                                            <option value="Post-workout">Post-workout</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="cookingTime">Cooking Time</label>
                                        <select id="cookingTime" name="cookingTime">
                                            <option value="">Any time</option>
                                            <option value="Quick (15-30 min)">Quick (15-30 min)</option>
                                            <option value="Medium (30-60 min)">Medium (30-60 min)</option>
                                            <option value="Long (60+ min)">Long (60+ min)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Health Profile -->
                            <div class="form-section">
                                <h3><i class="fas fa-heart"></i> Health Profile</h3>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="height">Height (cm)</label>
                                        <input type="number" id="height" name="height" 
                                               placeholder="170" min="100" max="250" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="weight">Weight (kg)</label>
                                        <input type="number" id="weight" name="weight" 
                                               placeholder="70" min="30" max="200" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="goal">Health Goal</label>
                                    <select id="goal" name="goal" required>
                                        <option value="">Select your goal</option>
                                        <option value="Lose weight">Lose weight 🏃‍♂️</option>
                                        <option value="Maintain weight">Maintain weight ⚖️</option>
                                        <option value="Gain muscle">Gain muscle 🏋️‍♂️</option>
                                        <option value="Eat healthier">Eat healthier 🥗</option>
                                        <option value="Boost energy">Boost energy ⚡</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="activityLevel">Activity Level</label>
                                    <select id="activityLevel" name="activityLevel" required>
                                        <option value="">Select activity level</option>
                                        <option value="Sedentary">Sedentary (little or no exercise)</option>
                                        <option value="Lightly active">Lightly active (light exercise 1-3 days/week)</option>
                                        <option value="Active">Active (moderate exercise 3-5 days/week)</option>
                                        <option value="Very active">Very active (hard exercise 6-7 days/week)</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Dietary Preferences -->
                            <div class="form-section">
                                <h3><i class="fas fa-leaf"></i> Dietary Preferences</h3>
                                
                                <div class="form-group">
                                    <label for="dietaryPreference">Dietary Preference</label>
                                    <select id="dietaryPreference" name="dietaryPreference" required>
                                        <option value="">Select preference</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                                        <option value="Gluten-Free">Gluten-Free</option>
                                        <option value="Keto">Keto</option>
                                        <option value="Paleo">Paleo</option>
                                        <option value="Low-Carb">Low-Carb</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="cuisine">Cuisine Preference</label>
                                    <select id="cuisine" name="cuisine" required>
                                        <option value="">Select cuisine</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Mediterranean">Mediterranean</option>
                                        <option value="American">American</option>
                                        <option value="Thai">Thai</option>
                                        <option value="Japanese">Japanese</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label>Allergies/Intolerances</label>
                                    <div class="checkbox-grid">
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="allergies" value="Nuts">
                                            <span>Nuts</span>
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="allergies" value="Dairy">
                                            <span>Dairy</span>
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="allergies" value="Gluten">
                                            <span>Gluten</span>
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="allergies" value="Eggs">
                                            <span>Eggs</span>
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="allergies" value="Soy">
                                            <span>Soy</span>
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="allergies" value="Shellfish">
                                            <span>Shellfish</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn btn-outline" onclick="window.history.back()">
                                <i class="fas fa-arrow-left"></i>
                                Back
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-magic"></i>
                                Generate Recipes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Replace page content
        document.body.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-brand">
                        <i class="fas fa-utensils"></i>
                        <span>IngrecipeAI</span>
                    </div>
                    <div class="nav-menu">
                        <a href="index.html" class="nav-link">Home</a>
                        <button id="loginBtn" class="btn btn-outline">Login</button>
                        <button id="signupBtn" class="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </nav>
            ${formHTML}
            
            <!-- Loading Spinner -->
            <div id="loadingSpinner" class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;

        // Reinitialize auth
        try {
            if (window.authManager) {
                console.log('Reinitializing existing AuthManager UI');
                window.authManager.initUI();
            } else {
                // If authManager doesn't exist, create it
                console.log('Creating new AuthManager');
                // Use setTimeout to ensure DOM is ready before initializing AuthManager
                setTimeout(() => {
                    try {
                        window.authManager = new AuthManager();
                    } catch (error) {
                        console.error('Error creating AuthManager:', error);
                    }
                }, 100);
            }
        } catch (error) {
            console.error('Error handling AuthManager initialization:', error);
        }

        // Add form event listener
        const form = document.getElementById('recipeForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleRecipeSubmit(e));
        }

        // Add form styles
        this.addFormStyles();
    }

    addFormStyles() {
        const formStyles = `
            .recipe-form-container {
                padding: 120px 0 80px;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
                min-height: 100vh;
            }

            .form-header {
                text-align: center;
                margin-bottom: 3rem;
            }

            .form-header h1 {
                font-size: 2.5rem;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 1rem;
            }

            .form-header p {
                font-size: 1.1rem;
                color: #cccccc;
            }

            .recipe-form {
                background: #2a2a2a;
                border-radius: 20px;
                padding: 3rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                max-width: 800px;
                margin: 0 auto;
                border: 1px solid #333;
            }

            .form-grid {
                display: grid;
                gap: 2rem;
            }

            .form-section {
                border: 1px solid #333;
                border-radius: 15px;
                padding: 2rem;
                background: #1a1a1a;
            }

            .form-section h3 {
                font-size: 1.3rem;
                font-weight: 600;
                color: #ffffff;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .form-group {
                margin-bottom: 1.5rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #333;
            }

            .form-group input,
            .form-group select {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #333;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
                background: #1a1a1a;
                color: #ffffff;
            }

            .form-group input:focus,
            .form-group select:focus {
                outline: none;
                border-color: #00d4ff;
            }

            .form-group small {
                display: block;
                margin-top: 0.25rem;
                color: #cccccc;
                font-size: 0.9rem;
            }

            .checkbox-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1rem;
            }

            .checkbox-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
            }

            .checkbox-item input[type="checkbox"] {
                width: auto;
                margin: 0;
            }

            .form-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid #333;
            }

            @media (max-width: 768px) {
                .recipe-form {
                    padding: 2rem;
                    margin: 0 1rem;
                }

                .form-row {
                    grid-template-columns: 1fr;
                }

                .checkbox-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .form-actions {
                    flex-direction: column;
                    gap: 1rem;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = formStyles;
        document.head.appendChild(styleSheet);
    }

    async handleRecipeSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Get allergies as array
        data.allergies = formData.getAll('allergies');
        
        // Validate required fields
        if (!data.ingredients || !data.height || !data.weight || !data.goal || !data.dietaryPreference || !data.cuisine || !data.activityLevel) {
            this.showError('Please fill in all required fields.');
            return;
        }

        try {
            this.showLoading();
            const recipes = await this.getRecipes(data);
            this.showResults(recipes, data);
        } catch (error) {
            console.error('Error getting recipes:', error);
            this.showError('Failed to generate recipes. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

 async getRecipes(userData) {
    try {
        // Calculate BMI
        const height = parseFloat(userData.height) / 100; // Convert to meters
        const weight = parseFloat(userData.weight);
        const bmi = weight / (height * height);
        const bmiCategory = this.getBMICategory(bmi);

        // Create prompt
        const allergiesStr = userData.allergies.length > 0 ? userData.allergies.join(', ') : 'None';
        const prompt = `
            User's BMI is ${bmi.toFixed(1)} (${bmiCategory}). 
            Goal: ${userData.goal}. 
            Dietary preference: ${userData.dietaryPreference}. 
            Cuisine: ${userData.cuisine}. 
            Activity level: ${userData.activityLevel}. 
            Allergies: ${allergiesStr}. 
            Suggest three ${userData.cuisine}-style recipes based on the user's health, goal, and preferences. 
            Ingredients: ${userData.ingredients}, Meal: ${userData.mealType}, Time: ${userData.cookingTime}.
        `;

        console.log('[DEBUG] User data:', userData);
        console.log('[DEBUG] Calculated BMI:', bmi.toFixed(1), bmiCategory);
        console.log('[DEBUG] Generated prompt:', prompt);

        // Check if API configuration is available
        if (!window.API_CONFIG) {
            console.error('[ERROR] API configuration not found');
            throw new Error('API configuration not found');
        }

        // Call API
        const apiKey = window.API_CONFIG.apiKey;
        const externalUserId = Math.random().toString(36).substring(7);
        console.log('[DEBUG] Creating session with API:', `${window.API_CONFIG.baseUrl}/sessions`);
        console.log('[DEBUG] API Key:', apiKey);
        console.log('[DEBUG] External User ID:', externalUserId);

        // Create session
        let sessionId;
        try {
            const sessionResponse = await fetch(`${window.API_CONFIG.baseUrl}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey
                },
                body: JSON.stringify({
                    pluginIds: [],
                    externalUserId: externalUserId
                })
            });

            if (!sessionResponse.ok) {
                const errorText = await sessionResponse.text();
                console.error('[ERROR] Session creation failed:', sessionResponse.status, errorText);
                throw new Error(`Failed to create session: ${sessionResponse.status} ${errorText}`);
            }

            const sessionData = await sessionResponse.json();
            console.log('[DEBUG] Session response:', sessionData);
            if (!sessionData.data || !sessionData.data.id) {
                console.error('[ERROR] Invalid session data:', sessionData);
                throw new Error('Failed to create session: Invalid response data');
            }

            sessionId = sessionData.data.id;
        } catch (error) {
            console.error('[ERROR] Session creation error:', error);
            throw new Error(`Failed to create session: ${error.message}`);
        }

        // Submit query
        console.log('[DEBUG] Submitting query to API:', `${window.API_CONFIG.baseUrl}/sessions/${sessionId}/query`);
        const queryPayload = {
            endpointId: window.API_CONFIG.endpointId,
            query: prompt,
            pluginIds: window.API_CONFIG.plugins,
            responseMode: "sync",
            modelConfigs: {
                fulfillmentPrompt: `
                        Considering the user's BMI (${bmi.toFixed(1)}, ${bmiCategory}), goal (${userData.goal}), 
                        dietary preference (${userData.dietaryPreference}), cuisine (${userData.cuisine}), 
                        activity level (${userData.activityLevel}), and allergies (${allergiesStr}), 
                        suggest three ${userData.cuisine}-style recipes that align with their health goals. 
                        Ensure the recipes are well-balanced, keeping in mind calorie intake and nutritional requirements. 
                        Provide the recipes in JSON format with fields: name, preparation_time (with unit), 
                        macros (with unit) (calories, protein, carbohydrates, fats), ingredients, and instructions.
                    `
            }
        };
        console.log('[DEBUG] Query payload:', queryPayload);

        try {
            const queryResponse = await fetch(`${window.API_CONFIG.baseUrl}/sessions/${sessionId}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey
                },
                body: JSON.stringify(queryPayload)
            });

            if (!queryResponse.ok) {
                const errorText = await queryResponse.text();
                console.error('[ERROR] Query failed:', queryResponse.status, errorText);
                throw new Error(`Failed to get recipe response: ${queryResponse.status} ${errorText}`);
            }

            const queryData = await queryResponse.json();
            console.log('[DEBUG] Query response:', queryData);
            if (!queryData.data || !queryData.data.answer) {
                console.error('[ERROR] Invalid query data:', queryData);
                throw new Error('Failed to get recipe response: Invalid response data');
            }

            // Extract JSON from response
            const answerText = queryData.data.answer;
            console.log('[DEBUG] Raw answer text:', answerText);
            const jsonMatch = answerText.match(/\[\s*\{[\s\S]*?\}\s*\]/s);

            if (!jsonMatch) {
                console.error('[ERROR] No recipe data found in response.');
                console.log('[DEBUG] Response content:', answerText);
                throw new Error('No recipe data found in response');
            }

            try {
                const recipes = JSON.parse(jsonMatch[0]);
                console.log('[DEBUG] Parsed recipes:', recipes);
                return recipes;
            } catch (jsonError) {
                console.error('[ERROR] JSON parsing error:', jsonError);
                console.log('[DEBUG] JSON string that failed to parse:', jsonMatch[0]);
                throw new Error(`Failed to parse recipe JSON: ${jsonError.message}`);
            }

        } catch (queryError) {
            console.error('[ERROR] Query process error:', queryError);
            throw new Error(`Failed during recipe query process: ${queryError.message}`);
        }

    } catch (outerError) {
        console.error('[ERROR] Unexpected error in getRecipes:', outerError);
        throw outerError;
    }
}


    getBMICategory(bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal weight";
        if (bmi < 30) return "Overweight";
        return "Obese";
    }

    showResults(recipes, userData) {
        // Store recipes in a global variable for access by saveRecipe function
        window.currentRecipes = recipes;
        
        const height = parseFloat(userData.height) / 100;
        const weight = parseFloat(userData.weight);
        const bmi = weight / (height * height);
        const bmiCategory = this.getBMICategory(bmi);

        const resultsHTML = `
            <div class="results-container">
                <div class="container">
                    <div class="results-header">
                        <h1>🍽️ Your Personalized Recipes</h1>
                        <p>Based on your health profile and preferences</p>
                    </div>

                    <div class="user-summary">
                        <div class="summary-card">
                            <div class="summary-icon">🩺</div>
                            <div class="summary-content">
                                <h3>Your Health Profile</h3>
                                <div class="summary-details">
                                    <p><strong>BMI:</strong> ${bmi.toFixed(1)} (${bmiCategory})</p>
                                    <p><strong>Goal:</strong> ${userData.goal}</p>
                                    <p><strong>Dietary Preference:</strong> ${userData.dietaryPreference}</p>
                                    <p><strong>Cuisine:</strong> ${userData.cuisine}</p>
                                    <p><strong>Activity Level:</strong> ${userData.activityLevel}</p>
                                    <p><strong>Allergies:</strong> ${userData.allergies.length > 0 ? userData.allergies.join(', ') : 'None'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="recipes-grid">
                        ${recipes.map((recipe, index) => `
                            <div class="recipe-card">
                                <div class="recipe-header">
                                    <h3>${recipe.name}</h3>
                                    <div class="recipe-time">
                                        <i class="fas fa-clock"></i>
                                        ${recipe.preparation_time}
                                    </div>
                                </div>
                                
                                <div class="recipe-macros">
                                    <div class="macro-item">
                                        <i class="fas fa-fire"></i>
                                        <span>${recipe.macros.calories}</span>
                                    </div>
                                    <div class="macro-item">
                                        <i class="fas fa-dumbbell"></i>
                                        <span>${recipe.macros.protein}</span>
                                    </div>
                                    <div class="macro-item">
                                        <i class="fas fa-bread-slice"></i>
                                        <span>${recipe.macros.carbohydrates}</span>
                                    </div>
                                    <div class="macro-item">
                                        <i class="fas fa-oil-can"></i>
                                        <span>${recipe.macros.fats}</span>
                                    </div>
                                </div>

                                <div class="recipe-ingredients">
                                    <h4><i class="fas fa-list"></i> Ingredients</h4>
                                    <ul>
                                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                                    </ul>
                                </div>

                                <div class="recipe-instructions">
                                    <h4><i class="fas fa-utensils"></i> Instructions</h4>
                                    <ol>
                                        ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                                    </ol>
                                </div>

                                <div class="recipe-actions">
                                    <button class="btn btn-outline" onclick="window.print()">
                                        <i class="fas fa-print"></i>
                                        Print Recipe
                                    </button>
                                    <button class="btn btn-primary" onclick="saveRecipe(${index})">
                                        <i class="fas fa-heart"></i>
                                        Save Recipe
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="results-actions">
                        <button class="btn btn-outline" onclick="window.location.reload()">
                            <i class="fas fa-redo"></i>
                            Generate New Recipes
                        </button>
                        <button class="btn btn-primary" onclick="window.location.href='/'">
                            <i class="fas fa-home"></i>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Replace page content
        document.body.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-brand">
                        <i class="fas fa-utensils"></i>
                        <span>IngrecipeAI</span>
                    </div>
                    <div class="nav-menu">
                        <a href="/" class="nav-link">Home</a>
                        <button id="loginBtn" class="btn btn-outline">Login</button>
                        <button id="signupBtn" class="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </nav>
            ${resultsHTML}
            
            <!-- Loading Spinner -->
            <div id="loadingSpinner" class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;

        // Reinitialize auth
        if (window.authManager) {
            window.authManager.initUI();
        } else {
            // If authManager doesn't exist, create it
            window.authManager = new AuthManager();
        }

        // Add results styles
        this.addResultsStyles();
    }

    addResultsStyles() {
        const resultsStyles = `
            .results-container {
                padding: 120px 0 80px;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
                min-height: 100vh;
            }

            .results-header {
                text-align: center;
                margin-bottom: 3rem;
            }

            .results-header h1 {
                font-size: 2.5rem;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 1rem;
            }

            .results-header p {
                font-size: 1.1rem;
                color: #cccccc;
            }

            .user-summary {
                margin-bottom: 3rem;
            }

            .summary-card {
                background: #2a2a2a;
                border-radius: 15px;
                padding: 2rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: center;
                gap: 2rem;
                max-width: 600px;
                margin: 0 auto;
                border: 1px solid #333;
            }

            .summary-icon {
                font-size: 3rem;
                color: #ff6b35;
            }

            .summary-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: #ffffff;
                margin-bottom: 1rem;
            }

            .summary-details p {
                margin-bottom: 0.5rem;
                color: #cccccc;
            }

            .recipes-grid {
                display: grid;
                gap: 2rem;
                margin-bottom: 3rem;
            }

            .recipe-card {
                background: #2a2a2a;
                border-radius: 15px;
                padding: 2rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease;
                border: 1px solid #333;
            }

            .recipe-card:hover {
                transform: translateY(-5px);
            }

            .recipe-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #eee;
            }

            .recipe-header h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: #ffffff;
                margin: 0;
            }

            .recipe-time {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #cccccc;
                font-weight: 500;
            }

            .recipe-macros {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1rem;
                margin-bottom: 2rem;
                padding: 1rem;
                background: #1a1a1a;
                border-radius: 10px;
                border: 1px solid #333;
            }

            .macro-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 0.5rem;
            }

            .macro-item i {
                font-size: 1.2rem;
                color: #00d4ff;
            }

            .macro-item span {
                font-weight: 600;
                color: #ffffff;
                font-size: 0.9rem;
            }

            .recipe-ingredients,
            .recipe-instructions {
                margin-bottom: 2rem;
            }

            .recipe-ingredients h4,
            .recipe-instructions h4 {
                font-size: 1.2rem;
                font-weight: 600;
                color: #333;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .recipe-ingredients ul,
            .recipe-instructions ol {
                padding-left: 1.5rem;
            }

            .recipe-ingredients li,
            .recipe-instructions li {
                margin-bottom: 0.5rem;
                color: #666;
                line-height: 1.6;
            }

            .recipe-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                padding-top: 1.5rem;
                border-top: 1px solid #eee;
            }

            .results-actions {
                display: flex;
                justify-content: center;
                gap: 1rem;
            }

            @media (max-width: 768px) {
                .summary-card {
                    flex-direction: column;
                    text-align: center;
                }

                .recipe-macros {
                    grid-template-columns: repeat(2, 1fr);
                }

                .recipe-actions {
                    flex-direction: column;
                }

                .results-actions {
                    flex-direction: column;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = resultsStyles;
        document.head.appendChild(styleSheet);
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'flex';
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'none';
    }

    showError(message) {
        if (window.authManager) {
            window.authManager.showError(message);
        } else {
            alert(message);
        }
    }
}

// Save recipe function (for global access)
window.saveRecipe = function(recipeIndex) {
    try {
        // Check if auth manager is initialized
        if (!window.authManager) {
            console.error('[ERROR] Auth manager not initialized');
            alert('Authentication system is not available. Please try again later.');
            return;
        }
        
        // Check if user is logged in
        if (window.authManager.currentUser) {
            // Get the recipe data from the current results
            const recipeData = window.currentRecipes && window.currentRecipes[recipeIndex];
            
            if (!recipeData) {
                console.error('[ERROR] Recipe data not found for index:', recipeIndex);
                window.authManager.showError('Recipe data not found. Please try again.');
                return;
            }
            
            // Save to Firebase
            console.log('[DEBUG] Saving recipe:', recipeIndex, recipeData);
            
            // Get reference to user's saved recipes collection
            const userId = window.authManager.currentUser.uid;
            const db = window.db;
            
            if (!db) {
                console.error('[ERROR] Firestore not initialized');
                window.authManager.showError('Database not available. Please try again later.');
                return;
            }
            
            // Add recipe to user's saved recipes collection
            db.collection('users').doc(userId).collection('savedRecipes')
                .add({
                    ...recipeData,
                    savedAt: new Date(),
                })
                .then(() => {
                    console.log('[DEBUG] Recipe saved successfully');
                    window.authManager.showSuccess('Recipe saved successfully!');
                })
                .catch((error) => {
                    console.error('[ERROR] Firestore save error:', error);
                    window.authManager.showError('Failed to save recipe: ' + error.message);
                });
        } else {
            // Show login prompt
            console.log('[DEBUG] User not logged in, showing auth modal');
            window.authManager.showAuthModal('login');
        }
    } catch (error) {
        console.error('[ERROR] Error saving recipe:', error);
        if (window.authManager && window.authManager.showError) {
            window.authManager.showError('Failed to save recipe: ' + error.message);
        } else {
            alert('Failed to save recipe. Please try again.');
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new IngrecipeAI();
});