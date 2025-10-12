import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to get user-specific localStorage key
const getUserWatchlistKey = (userId) => {
  return userId ? `watchlist_${userId}` : "watchlist_guest";
};

// Helper function to get current user's watchlist from localStorage
const getCurrentUserWatchlist = (userId) => {
  const key = getUserWatchlistKey(userId);
  return JSON.parse(localStorage.getItem(key)) || [];
};

// Helper function to save current user's watchlist to localStorage
const saveCurrentUserWatchlist = (userId, movies) => {
  const key = getUserWatchlistKey(userId);
  localStorage.setItem(key, JSON.stringify(movies));
};

// Simulate async operations for consistent API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Async thunk to load watchlist (localStorage only)
export const loadUserWatchlist = createAsyncThunk(
  "watchlist/loadUserWatchlist",
  async (userId) => {
    await delay(100); // Simulate network delay for smooth UX
    return getCurrentUserWatchlist(userId);
  }
);

// Async thunk to add movie (localStorage only)
export const addMovieWithSync = createAsyncThunk(
  "watchlist/addMovieWithSync",
  async ({ userId, movie }, { getState }) => {
    const state = getState();
    const existingMovie = state.watchlist.movies.find((m) => m.id === movie.id);

    if (existingMovie) {
      return { movie: null, success: false }; // Already exists
    }

    await delay(50); // Simulate network delay

    // Update localStorage
    const updatedMovies = [...state.watchlist.movies, movie];
    saveCurrentUserWatchlist(userId, updatedMovies);

    return { movie, success: true };
  }
);

// Async thunk to remove movie (localStorage only)
export const removeMovieWithSync = createAsyncThunk(
  "watchlist/removeMovieWithSync",
  async ({ userId, movieId }, { getState }) => {
    const state = getState();
    const movieToRemove = state.watchlist.movies.find((m) => m.id === movieId);

    if (!movieToRemove) {
      return { movieId: null, success: false };
    }

    await delay(50); // Simulate network delay

    // Update localStorage
    const updatedMovies = state.watchlist.movies.filter(
      (movie) => movie.id !== movieId
    );
    saveCurrentUserWatchlist(userId, updatedMovies);

    return { movieId, success: true };
  }
);

// Async thunk to clear watchlist (localStorage only)
export const clearWatchlistWithSync = createAsyncThunk(
  "watchlist/clearWatchlistWithSync",
  async (userId) => {
    await delay(50); // Simulate network delay

    // Clear localStorage
    const key = getUserWatchlistKey(userId);
    localStorage.removeItem(key);

    return { success: true };
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [],
    currentUserId: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Set user ID
    setWatchlistUser: (state, action) => {
      state.currentUserId = action.payload;
    },

    // Clear user watchlist on logout
    clearWatchlistUser: (state) => {
      state.currentUserId = null;
      state.movies = [];
      state.loading = false;
      state.error = null;
    },

    // Sync watchlist from real-time listener
    syncWatchlistFromFirestore: (state, action) => {
      state.movies = action.payload;
    },

    // Legacy actions for backward compatibility (localStorage only)
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      const existingMovie = state.movies.find((m) => m.id === movie.id);

      if (!existingMovie) {
        state.movies.push(movie);
        saveCurrentUserWatchlist(state.currentUserId, state.movies);
      }
    },
    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
      saveCurrentUserWatchlist(state.currentUserId, state.movies);
    },
    clearWatchlist: (state) => {
      state.movies = [];
      const key = getUserWatchlistKey(state.currentUserId);
      localStorage.removeItem(key);
    },
  },
  extraReducers: (builder) => {
    builder
      // Load watchlist
      .addCase(loadUserWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(loadUserWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        // Fallback to localStorage
        state.movies = getCurrentUserWatchlist(state.currentUserId);
      })

      // Add movie
      .addCase(addMovieWithSync.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.movie) {
          const existingMovie = state.movies.find(
            (m) => m.id === action.payload.movie.id
          );
          if (!existingMovie) {
            state.movies.push(action.payload.movie);
          }
        }
      })

      // Remove movie
      .addCase(removeMovieWithSync.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.movieId) {
          state.movies = state.movies.filter(
            (movie) => movie.id !== action.payload.movieId
          );
        }
      })

      // Clear watchlist
      .addCase(clearWatchlistWithSync.fulfilled, (state) => {
        state.movies = [];
      });
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
  setWatchlistUser,
  clearWatchlistUser,
  syncWatchlistFromFirestore,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
