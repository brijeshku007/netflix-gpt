// Configuration validation utility
export const validateEnvironmentConfig = () => {
  const requiredEnvVars = [
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

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
    console.error('❌ Configuration Error:', errorMessage);
    
    if (process.env.NODE_ENV === 'development') {
      console.error('💡 Make sure you have a .env file with all required variables');
    } else {
      console.error('💡 Make sure all environment variables are set in your deployment platform');
    }
    
    return {
      isValid: false,
      missingVars,
      errorMessage
    };
  }

  // All environment variables are configured
  return {
    isValid: true,
    missingVars: [],
    errorMessage: null
  };
};

// Check if API keys are properly formatted
export const validateApiKeys = () => {
  const issues = [];

  // Validate TMDB key format (should be a JWT token)
  const tmdbKey = process.env.REACT_APP_TMDB_KEY;
  if (tmdbKey && !tmdbKey.startsWith('eyJ')) {
    issues.push('TMDB key should be a Bearer token (JWT format starting with "eyJ")');
  }

  // Validate Gemini API key format
  const geminiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (geminiKey && !geminiKey.startsWith('AIza')) {
    issues.push('Gemini API key should start with "AIza"');
  }

  // Validate Firebase API key format
  const firebaseKey = process.env.REACT_APP_FIREBASE_API_KEY;
  if (firebaseKey && !firebaseKey.startsWith('AIza')) {
    issues.push('Firebase API key should start with "AIza"');
  }

  if (issues.length > 0) {
    console.warn('⚠️ API Key Format Issues:', issues);
    return {
      isValid: false,
      issues
    };
  }

  // All API keys are properly formatted
  return {
    isValid: true,
    issues: []
  };
};

// Comprehensive configuration check
export const performConfigCheck = () => {
  const envCheck = validateEnvironmentConfig();
  const keyCheck = validateApiKeys();
  
  return {
    environment: envCheck,
    apiKeys: keyCheck,
    overall: envCheck.isValid && keyCheck.isValid
  };
};