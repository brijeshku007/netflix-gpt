import { API_OPTIONS } from "../constants";

// Check if TMDB API is accessible
export const checkTMDBHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      "https://api.themoviedb.org/3/configuration",
      {
        ...API_OPTIONS,
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      return { status: 'healthy', message: 'TMDB API is accessible' };
    } else {
      return { 
        status: 'error', 
        message: `TMDB API returned ${response.status}: ${response.statusText}` 
      };
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return { status: 'timeout', message: 'TMDB API request timed out' };
    }
    return { 
      status: 'error', 
      message: `TMDB API connection failed: ${error.message}` 
    };
  }
};

// Check environment variables
export const checkEnvironmentConfig = () => {
  const issues = [];
  
  if (!process.env.REACT_APP_TMDB_KEY) {
    issues.push('REACT_APP_TMDB_KEY environment variable is missing');
  }
  
  if (!process.env.REACT_APP_GEMINI_API_KEY) {
    issues.push('REACT_APP_GEMINI_API_KEY environment variable is missing');
  }

  return {
    status: issues.length === 0 ? 'healthy' : 'warning',
    issues: issues
  };
};

// Comprehensive health check
export const performHealthCheck = async () => {
  console.log('🔍 Performing API health check...');
  
  const envCheck = checkEnvironmentConfig();
  console.log('Environment check:', envCheck);
  
  const tmdbCheck = await checkTMDBHealth();
  console.log('TMDB API check:', tmdbCheck);
  
  return {
    environment: envCheck,
    tmdb: tmdbCheck,
    overall: envCheck.status === 'healthy' && tmdbCheck.status === 'healthy' ? 'healthy' : 'issues'
  };
};