const fs = require('fs');
const path = require('path');

// Read the template file
const templatePath = path.join(__dirname, 'js', 'config.template.js');
const outputPath = path.join(__dirname, 'js', 'config.js');

let template = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders with environment variables
const replacements = {
    'YOUR_FIREBASE_API_KEY': process.env.FIREBASE_API_KEY || '',
    'YOUR_FIREBASE_AUTH_DOMAIN': process.env.FIREBASE_AUTH_DOMAIN || '',
    'YOUR_FIREBASE_PROJECT_ID': process.env.FIREBASE_PROJECT_ID || '',
    'YOUR_FIREBASE_STORAGE_BUCKET': process.env.FIREBASE_STORAGE_BUCKET || '',
    'YOUR_FIREBASE_MESSAGING_SENDER_ID': process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    'YOUR_FIREBASE_APP_ID': process.env.FIREBASE_APP_ID || '',
    'YOUR_FIREBASE_MEASUREMENT_ID': process.env.FIREBASE_MEASUREMENT_ID || '',
    'YOUR_API_BASE_URL': process.env.API_BASE_URL || '',
    'YOUR_API_KEY': process.env.API_KEY || '',
    'YOUR_PLUGIN_1': process.env.API_PLUGINS ? process.env.API_PLUGINS.split(',')[0] || '' : '',
    'YOUR_PLUGIN_2': process.env.API_PLUGINS ? process.env.API_PLUGINS.split(',')[1] || '' : '',
    'YOUR_ENDPOINT_ID': process.env.ENDPOINT_ID || ''
};

// Replace all placeholders
for (const [placeholder, value] of Object.entries(replacements)) {
    template = template.replace(new RegExp(placeholder, 'g'), value);
}

// Handle plugins array properly
if (process.env.API_PLUGINS) {
    const plugins = process.env.API_PLUGINS.split(',').map(p => `"${p.trim()}"`).join(', ');
    template = template.replace('["YOUR_PLUGIN_1", "YOUR_PLUGIN_2"]', `[${plugins}]`);
} else {
    template = template.replace('["YOUR_PLUGIN_1", "YOUR_PLUGIN_2"]', '[]');
}

// Write the output file
fs.writeFileSync(outputPath, template);

console.log('✅ Configuration file generated successfully!');
console.log('📁 Output:', outputPath);

// Verify all required environment variables are set
const requiredVars = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN', 
    'FIREBASE_PROJECT_ID',
    'API_BASE_URL',
    'API_KEY',
    'ENDPOINT_ID'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.warn('⚠️  Warning: Missing environment variables:');
    missingVars.forEach(varName => console.warn(`   - ${varName}`));
} else {
    console.log('✅ All required environment variables are set!');
}
