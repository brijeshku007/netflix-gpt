
export const DEFAULT_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYaO6lWOo30L2AqIVF76Mx8WS-8OrnlUJw7w&s";

// Validate TMDB API key
if (!process.env.REACT_APP_TMDB_KEY && process.env.NODE_ENV === 'production') {
  console.error('❌ REACT_APP_TMDB_KEY environment variable is required for production');
}

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
  },
};

export const BACKGROUND_URL =
  "https://qqcdnpictest.mxplay.com/pic/7bea3be776bc8679c9c3c402e75cd49e/en/16x9/1600x900/test_pic1729829796657.jpg";

export const IMAGE_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hi", name: "हिन्दी" },
  { identifier: "es", name: "Español" },
];

export const SUPPORTED_MOVIES = [
  { identifier: "shows", name: "Shows" },
  { identifier: "en", name: "English" },
  { identifier: "hi", name: "Hindi" },
  { identifier: "es", name: "Spanish" },
  { identifier: "bh", name: "Bhojpuri" },
  { identifier: "mr", name: "Marathi" },
];

export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
