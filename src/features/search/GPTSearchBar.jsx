import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_CONSTANTS } from "../../constants";
import { generateContentWithFallback } from "../../services";
import { API_OPTIONS } from "../../constants";
import { addGptMoviesResult, clearGptMoviesResult } from "../../store/gptSlice";
import { MdSmartToy, MdMovie, MdTrendingUp } from "react-icons/md";

const GPTSearchBar = ({ compact = false }) => {
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config.lang);
  const { movieName, searchTerm } = useSelector((store) => store.gpt);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Sync search value with Redux store on mount
  useEffect(() => {
    if (searchTerm) {
      setSearchValue(searchTerm);
      if (searchText.current) {
        searchText.current.value = searchTerm;
      }
    }
  }, [searchTerm]);

  // Search for movies in TMDB database
  const fetchMOviesTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie.trim()) +
        "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`TMDB API error: ${data.status}`);
      }

      const json = await data.json();
      return json.results || [];
    } catch (error) {
      console.error(`Error fetching movie "${movie}":`, error);
      return [];
    }
  };

  const handlegptSearchClick = async () => {
    if (!searchText.current.value.trim()) {
      return;
    }

    setIsLoading(true);
    const query = searchText.current.value.trim();
    setSearchValue(query);

    try {
      // Add to search history
      if (!searchHistory.includes(query)) {
        setSearchHistory((prev) => [query, ...prev.slice(0, 4)]);
      }

      // Try AI search first
      try {
        const gptQuery =
          "Act as a Movie Recommendation system and suggest some movies for the query: " +
          query +
          ". Only give me names of 5 movies, comma separated. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        const result = await generateContentWithFallback(gptQuery);
        const responseText = result.response.text();

        if (!responseText) {
          throw new Error("No response from AI");
        }

        // Clean and parse the movie names
        const getMovies = responseText
          .split(",")
          .map((movie) => movie.trim())
          .filter((movie) => movie.length > 0)
          .slice(0, 5);

        if (getMovies.length === 0) {
          throw new Error("No movies found in AI response");
        }

        // Search for each movie in TMDB
        const promiseArray = getMovies.map((movie) => fetchMOviesTMDB(movie));
        const tmdbResult = await Promise.all(promiseArray);

        dispatch(
          addGptMoviesResult({ movieName: getMovies, movieResult: tmdbResult, searchTerm: query })
        );
      } catch (aiError) {
        console.warn(
          "AI search failed, falling back to direct search:",
          aiError
        );

        // Fallback: Direct TMDB search
        const tmdbResult = await fetchMOviesTMDB(query);
        dispatch(
          addGptMoviesResult({
            movieName: [query],
            movieResult: [tmdbResult],
            searchTerm: query,
          })
        );

        // Show info message
        alert("AI search unavailable. Showing direct search results instead.");
      }
    } catch (error) {
      console.error("Error in AI search:", error);

      // Show user-friendly error messages
      let errorMessage = "Something went wrong. Please try again.";

      if (error.message.includes("API key")) {
        errorMessage = "API key issue. Please check your Gemini API key.";
      } else if (error.message.includes("404")) {
        errorMessage =
          "AI service temporarily unavailable. Please try again later.";
      } else if (error.message.includes("quota")) {
        errorMessage = "API quota exceeded. Please try again later.";
      }

      alert(errorMessage); // You can replace this with a proper toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    searchText.current.value = suggestion;
    setSearchValue(suggestion);
    setShowSuggestions(false);
    handlegptSearchClick();
  };

  const handleClearSearch = () => {
    searchText.current.value = "";
    setSearchValue("");
    dispatch(clearGptMoviesResult());
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const popularSearches = [
    "Action movies like John Wick",
    "Romantic comedies",
    "Sci-fi thrillers",
    "Marvel superhero movies",
    "Classic Bollywood films",
  ];
  // Determine if we should show compact mode (when results exist)
  const isCompactMode = compact || (movieName && movieName.length > 0);

  if (isCompactMode) {
    return (
      <motion.div
        className="bg-black py-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Compact Search Bar */}
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              handlegptSearchClick();
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-xl p-2 border border-gray-700">
                <div className="flex items-center space-x-4">
                  {/* Search Icon */}
                  <div className="pl-4">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  {/* Input Field */}
                  <input
                    ref={searchText}
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder={
                      LANGUAGE_CONSTANTS[langkey].gptSearchPlaceholder
                    }
                    className="flex-1 bg-transparent text-white text-base placeholder-gray-400 focus:outline-none py-3 pr-4"
                  />

                  {/* Clear Button */}
                  {searchValue && (
                    <motion.button
                      type="button"
                      onClick={handleClearSearch}
                      className="text-gray-400 hover:text-white transition-colors duration-200 p-1 mr-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}

                  {/* Search Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="hidden sm:inline">Searching...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span className="hidden sm:inline">
                          {LANGUAGE_CONSTANTS[langkey].search}
                        </span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          AI Movie Search
        </h1>
        <p className="text-lg md:text-xl lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Discover your next favorite movie with the power of artificial
          intelligence
        </p>
      </motion.div>

      {/* Search Container */}
      <motion.div
        className="w-full max-w-4xl relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            handlegptSearchClick();
          }}
        >
          {/* Main Search Bar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-3 md:p-2 border border-gray-700">
              {/* Mobile Layout */}
              <div className="block md:hidden space-y-4">
                {/* Input Field - Mobile */}
                <div className="flex items-center space-x-3">
                  <div className="pl-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    ref={searchText}
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder={
                      LANGUAGE_CONSTANTS[langkey].gptSearchPlaceholder
                    }
                    className="flex-1 bg-transparent text-white text-base placeholder-gray-400 focus:outline-none py-3"
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                  />
                  {searchValue && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Search Button - Mobile */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>{LANGUAGE_CONSTANTS[langkey].search}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Search Icon */}
                <div className="pl-6">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Input Field */}
                <input
                  ref={searchText}
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                  placeholder={LANGUAGE_CONSTANTS[langkey].gptSearchPlaceholder}
                  className="flex-1 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none py-3 lg:py-3 xl:py-3 pr-4"
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                />

                {/* Clear Button */}
                {searchValue && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Search Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 lg:py-3 xl:py-3 px-6 lg:px-6 xl:px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>{LANGUAGE_CONSTANTS[langkey].search}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {searchHistory.map((item, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-gray-800 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-300">{item}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">
                    Popular Searches
                  </h3>
                  <div className="space-y-2">
                    {popularSearches.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(item)}
                        className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              icon: <MdSmartToy className="w-12 h-12" />,
              title: "AI Powered",
              description: "Advanced AI understands your preferences and mood",
            },
            {
              icon: <MdMovie className="w-12 h-12" />,
              title: "Vast Database",
              description: "Access to millions of movies from around the world",
            },
            {
              icon: <MdTrendingUp className="w-12 h-12" />,
              title: "Instant Results",
              description: "Get personalized recommendations in seconds",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GPTSearchBar;
