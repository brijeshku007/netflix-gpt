// Simple script to check if .env file is being loaded
require('dotenv').config();

console.log('🔍 Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('');

const requiredVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_FIREBASE_MEASUREMENT_ID',
  'REACT_APP_GEMINI_API_KEY',
  'REACT_APP_TMDB_KEY'
];

let allSet = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅ Set' : '❌ Missing';
  const preview = value ? `(${value.substring(0, 10)}...)` : '';
  
  console.log(`${varName}: ${status} ${preview}`);
  
  if (!value) {
    allSet = false;
  }
});

console.log('');
if (allSet) {
  console.log('🎉 All environment variables are set!');
} else {
  console.log('⚠️ Some environment variables are missing.');
  console.log('💡 Make sure your .env file is in the project root.');
}