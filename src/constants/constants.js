
export const LOGO =
  "https://assets-6.mxplay.com/static/mxoneweb/desktop/images/mx-sharekaro.png";
export const DEFAULT_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYaO6lWOo30L2AqIVF76Mx8WS-8OrnlUJw7w&s";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${
      process.env.REACT_APP_TMDB_KEY ||
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTc4MmUzZTQ4NTI1MjAyMTA0NzM2NzU1YzRmOTQ2ZSIsIm5iZiI6MTczMDQ0MjI2MS4zMzUyNzgsInN1YiI6IjY3MjQ3MjExMGRmNGU2NmQ0ZDkyNDc1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tl9z3URfdmqRtU8h47Fy5wSarJvhNVBPoYFkFnIBL0A"
    }`,
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

export const GEMINI_API_KEY =
  process.env.REACT_APP_GEMINI_API_KEY ||
  "AIzaSyD-dZyj0G3gvnsndMSu82vkVXaArGK2NgU";
