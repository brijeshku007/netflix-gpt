# 📁 Project Folder Structure

This project follows industry-standard React application architecture for better maintainability, scalability, and developer experience.

## 🏗️ Structure Overview

```
src/
├── 📁 components/           # Reusable UI components
│   ├── 📁 ui/              # Basic UI components (buttons, inputs, modals)
│   ├── 📁 layout/          # Layout components (header, footer, navigation)
│   └── 📁 common/          # Common shared components (error boundaries, routing)
├── 📁 pages/               # Page-level components (route components)
├── 📁 features/            # Feature-based modules
│   ├── 📁 auth/           # Authentication related components
│   ├── 📁 movies/         # Movie-related components
│   ├── 📁 search/         # Search functionality components
│   └── 📁 watchlist/      # Watchlist feature components
├── 📁 hooks/               # Custom React hooks
├── 📁 services/            # API calls and external services
├── 📁 store/               # Redux store configuration and slices
├── 📁 utils/               # Utility functions and helpers
├── 📁 constants/           # Application constants and configurations
└── 📁 assets/              # Static assets (images, fonts, etc.)
```

## 📂 Detailed Structure

### `/src/components/`

Reusable UI components organized by type:

#### `/ui/` - Basic UI Components

- `Toast.jsx` - Notification component
- `Loading.jsx` - Loading spinner component
- `DropDown.jsx` - Dropdown selector component

#### `/layout/` - Layout Components

- `Header.jsx` - Application header with navigation
- `Footer.jsx` - Application footer

#### `/common/` - Common Components

- `Body.jsx` - Main routing component
- `Error.jsx` - Error page component
- `ErrorBoundary.jsx` - Error boundary wrapper

### `/src/pages/`

Page-level components that represent different routes:

- `Browse.jsx` - Main movie browsing page
- `Login.jsx` - Authentication page
- `Profile.jsx` - User profile management
- `ForgotPassword.jsx` - Password reset page
- `EmailVerification.jsx` - Email verification page
- `SearchMovie.jsx` - Movie search page
- `Watchlist.jsx` - User's watchlist page
- `MovieDetails.jsx` - Individual movie details page

### `/src/features/`

Feature-based organization for better modularity:

#### `/auth/` - Authentication Feature

- `AuthWrapper.jsx` - Authentication state management

#### `/movies/` - Movies Feature

- `MovieCard.jsx` - Individual movie card component
- `MovieList.jsx` - List of movies component
- `MainContainer.jsx` - Main hero section container
- `SecondaryContainer.jsx` - Secondary content container
- `VideoTitle.jsx` - Video title overlay
- `VideoBackground.jsx` - Video background component

#### `/search/` - Search Feature

- `GptSearch.jsx` - AI-powered search interface
- `GPTSearchBar.jsx` - Search input component
- `GPTSuggestion.jsx` - Search suggestions component

### `/src/hooks/`

Custom React hooks for reusable logic:

- `useNowPlayingMovies.js` - Fetch now playing movies
- `usePopularMovies.js` - Fetch popular movies
- `useTopRatedMovies.js` - Fetch top rated movies
- `useUpcomingMovies.js` - Fetch upcoming movies
- `useTrailer.js` - Fetch movie trailers

### `/src/services/`

External service integrations:

- `firebase.js` - Firebase configuration and auth
- `openAi.js` - OpenAI/Gemini API integration
- `customEmailService.js` - Email service configuration
- `watchlistFirebase.js` - Watchlist Firebase operations

### `/src/store/`

Redux store configuration and state slices:

- `appStore.js` - Main store configuration
- `userSlice.js` - User state management
- `movieSlice.js` - Movies state management
- `gptSlice.js` - GPT/Search state management
- `watchlistSlice.js` - Watchlist state management
- `configSlice.js` - App configuration state

### `/src/constants/`

Application constants and configurations:

- `constants.js` - API URLs, app constants
- `languageConstant.js` - Multi-language support

### `/src/utils/`

Utility functions and helpers:

- `validates.js` - Form validation utilities
- `testGemini.js` - API testing utilities
- `directApiTest.js` - Direct API testing
- `listModels.js` - AI model listing

## 🎯 Benefits of This Structure

### 1. **Scalability**

- Easy to add new features without affecting existing code
- Clear separation of concerns
- Modular architecture supports team development

### 2. **Maintainability**

- Easy to locate and modify specific functionality
- Consistent file organization
- Clear import/export patterns

### 3. **Reusability**

- Components are organized by their purpose and reusability
- Shared components are easily accessible
- Custom hooks promote logic reuse

### 4. **Developer Experience**

- Intuitive folder structure
- Easy navigation and file discovery
- Consistent naming conventions

### 5. **Testing**

- Easy to write unit tests for isolated components
- Feature-based testing organization
- Clear separation of business logic

## 📋 Import Patterns

### Barrel Exports (index.js files)

Each folder contains an `index.js` file for clean imports:

```javascript
// Instead of multiple imports
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Use barrel exports
import { Header, Footer } from "../components/layout";
```

### Feature-based Imports

```javascript
// Movies feature
import { MovieCard, MovieList } from "../features/movies";

// Search feature
import { GptSearch, GPTSearchBar } from "../features/search";

// Auth feature
import { AuthWrapper } from "../features/auth";
```

### Service Imports

```javascript
// Services
import { auth } from "../services";
import { store } from "../store";
```

## 🚀 Getting Started

1. **Adding New Components**: Place them in the appropriate feature folder or create a new feature if needed
2. **Adding New Pages**: Add to `/src/pages/` and update the routing in `Body.jsx`
3. **Adding New Hooks**: Place in `/src/hooks/` and export from `index.js`
4. **Adding New Services**: Place in `/src/services/` and export from `index.js`

This structure follows React community best practices and scales well for enterprise applications.
