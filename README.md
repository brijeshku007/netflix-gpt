# Netflix GPT - AI-Powered Movie Streaming Platform

A modern, responsive movie streaming platform built with React, featuring AI-powered movie recommendations using Google's Gemini API and real-time movie data from TMDB.
# Deployed Link
https://streammefast.netlify.app/
## 🚀 Features

### Core Features

- **User Authentication**: Secure login/signup with Firebase Authentication
- **Movie Browsing**: Browse now playing, popular, top-rated, and upcoming movies
- **AI Movie Search**: Intelligent movie recommendations using Google Gemini AI
- **Multi-language Support**: English, Hindi, and Spanish language options
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Data**: Live movie data from The Movie Database (TMDB)

### Technical Features

- **State Management**: Redux Toolkit for efficient state management
- **Custom Hooks**: Reusable hooks for API calls and data fetching
- **Error Boundaries**: Comprehensive error handling and user feedback
- **Loading States**: Skeleton screens and loading indicators
- **Environment Variables**: Secure API key management
- **Code Splitting**: Optimized bundle size and performance

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript ES6+
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth
- **AI Integration**: Google Generative AI (Gemini)
- **Movie Data**: The Movie Database (TMDB) API
- **Build Tool**: Create React App

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase project setup
- TMDB API account
- Google AI Studio account (for Gemini API)

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/netflix-gpt.git
   cd netflix-gpt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Copy `.env.example` to `.env`
   - Fill in your API keys and configuration:

   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # API Keys
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   REACT_APP_TMDB_KEY=your_tmdb_bearer_token
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Setup Guide

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with Email/Password
4. Copy configuration to your `.env` file

### TMDB API Setup

1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account and request API access
3. Generate your API key and bearer token
4. Add to your `.env` file

### Google Gemini AI Setup

1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create a new project
3. Generate your API key
4. Add to your `.env` file

## 📁 Project Structure

```
src/
├── components/
│   ├── customHooks/          # Custom React hooks
│   ├── ErrorBoundary.jsx     # Error handling component
│   ├── Loading.jsx           # Loading states and skeletons
│   ├── Header.jsx            # Navigation header
│   ├── Login.jsx             # Authentication component
│   ├── Browse.jsx            # Main browsing page
│   ├── GptSearch.jsx         # AI search interface
│   └── ...
├── utils/
│   ├── constants.js          # App constants and configurations
│   ├── validates.js          # Form validation utilities
│   ├── firebase.js           # Firebase configuration
│   ├── appStore.js           # Redux store setup
│   ├── languageConstant.js   # Multi-language support
│   └── ...
└── ...
```

## 🎯 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

## 🔒 Security Features

- Environment variables for sensitive data
- Firebase Authentication security rules
- Input validation and sanitization
- Error boundary implementation
- Secure API key management

## 🌐 Deployment

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init
npm run build
firebase deploy
```

### Other Platforms

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import project and configure environment variables
- **Heroku**: Use buildpack for React applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [Firebase](https://firebase.google.com/) for authentication services
- [Google AI](https://ai.google.dev/) for Gemini AI integration
- [Tailwind CSS](https://tailwindcss.com/) for styling framework

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact [uietbrijesh@gmail.com](mailto:uietbrijesh@gmail.com).

---

**Made with ❤️ by Brijesh Kumar**
