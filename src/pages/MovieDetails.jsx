import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGE_CDN_URL, API_OPTIONS } from "../constants";
import { addMovieWithSync, removeMovieWithSync } from "../store/watchlistSlice";
import { Header } from "../components/layout";
import { Loading, Toast } from "../components/ui";
import { MdStar } from "react-icons/md";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies: watchlist, currentUserId } = useSelector(
    (store) => store.watchlist
  );
  const [movie, setMovie] = useState(location.state?.movie || null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(!movie);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTrailer, setShowTrailer] = useState(false);
  const [toast, setToast] = useState(null);

  // Check if movie is in watchlist
  const isInWatchlist = movie
    ? watchlist.some((m) => m.id === movie.id)
    : false;

  // Handle watchlist actions
  const handleWatchlistToggle = async () => {
    if (!movie) return;

    const movieTitle = movie.title || movie.original_title;

    if (isInWatchlist) {
      await dispatch(
        removeMovieWithSync({
          userId: currentUserId,
          movieId: movie.id,
        })
      );
      setToast({
        message: `"${movieTitle}" removed from watchlist`,
        type: "info",
      });
    } else {
      await dispatch(
        addMovieWithSync({
          userId: currentUserId,
          movie: {
            id: movie.id,
            title: movie.title || movie.original_title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
          },
        })
      );
      setToast({
        message: `"${movieTitle}" added to watchlist`,
        type: "success",
      });
    }
  };

  // Reset state when route changes
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);

    // Reset all state when the movie ID changes
    setMovie(location.state?.movie || null);
    setMovieDetails(null);
    setTrailerKey(null);
    setCast([]);
    setCrew([]);
    setRecommendations([]);
    setError(null);
    setActiveTab("overview");
    setShowTrailer(false);
    setLoading(true);
  }, [id, location.state?.movie]);

  // Fetch movie details if not passed via state
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        setMovie(data);
        setMovieDetails(data);
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    // Always fetch fresh data when ID changes
    fetchMovieDetails();
  }, [id]);

  // Fetch additional movie details (trailer, cast, crew, recommendations)
  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      if (!id) return;

      try {
        // Fetch trailer
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          API_OPTIONS
        );
        const trailerData = await trailerResponse.json();
        const trailer =
          trailerData.results?.find((video) => video.type === "Trailer") ||
          trailerData.results?.[0];
        setTrailerKey(trailer?.key);

        // Fetch cast and crew
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          API_OPTIONS
        );
        const castData = await castResponse.json();
        setCast(castData.cast?.slice(0, 12) || []);
        setCrew(
          castData.crew
            ?.filter((person) =>
              ["Director", "Producer", "Writer", "Screenplay"].includes(
                person.job
              )
            )
            .slice(0, 6) || []
        );

        // Fetch recommendations
        const recommendationsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
          API_OPTIONS
        );
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.results?.slice(0, 6) || []);

        // Fetch detailed movie info (if not already set)
        if (!movieDetails || movieDetails.id !== parseInt(id)) {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            API_OPTIONS
          );
          const detailsData = await detailsResponse.json();
          setMovieDetails(detailsData);
        }
      } catch (err) {
        console.error("Error fetching additional details:", err);
      }
    };

    fetchAdditionalDetails();
  }, [id, movieDetails]);

  if (loading) return <Loading message="Loading movie details..." />;
  if (error) return <div className="text-white text-center p-8">{error}</div>;
  if (!movie)
    return <div className="text-white text-center p-8">Movie not found</div>;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const castVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Parallax Effect */}
        {backdropUrl && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src={backdropUrl}
              alt={movie.title || movie.original_title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10 pt-20 pb-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="mb-8 flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5 group-hover:animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">Back to Browse</span>
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Movie Poster */}
              <motion.div className="lg:col-span-4" variants={itemVariants}>
                <div className="relative group">
                  <motion.img
                    src={IMAGE_CDN_URL + movie.poster_path}
                    alt={`${movie.title || movie.original_title} poster`}
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </motion.div>

              {/* Movie Info */}
              <motion.div
                className="lg:col-span-8 space-y-8"
                variants={itemVariants}
              >
                <div>
                  <motion.h1
                    className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {movie.title || movie.original_title}
                  </motion.h1>

                  {movie.tagline && (
                    <motion.p
                      className="text-xl md:text-2xl text-gray-300 italic mb-6 font-light"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      "{movie.tagline}"
                    </motion.p>
                  )}

                  <motion.div
                    className="flex flex-wrap items-center gap-6 mb-8"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                      <MdStar className="text-yellow-400 text-lg w-5 h-5" />
                      <span className="font-bold text-lg">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({movie.vote_count?.toLocaleString()} votes)
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-gray-300">
                      <span className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {movie.release_date?.split("-")[0]}
                      </span>
                      {movieDetails?.runtime && (
                        <span className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {Math.floor(movieDetails.runtime / 60)}h{" "}
                          {movieDetails.runtime % 60}m
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {movieDetails?.genres && (
                    <motion.div
                      className="flex flex-wrap gap-3 mb-8"
                      variants={itemVariants}
                    >
                      {movieDetails.genres.map((genre, index) => (
                        <motion.span
                          key={genre.id}
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium rounded-full shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {genre.name}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  <motion.p
                    className="text-lg leading-relaxed text-gray-300 mb-10 max-w-4xl"
                    variants={itemVariants}
                  >
                    {movie.overview}
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-4"
                    variants={itemVariants}
                  >
                    {trailerKey && (
                      <motion.button
                        onClick={() => setShowTrailer(true)}
                        className="flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 5v10l8-5-8-5z" />
                        </svg>
                        <span>Watch Trailer</span>
                      </motion.button>
                    )}

                    <motion.button
                      onClick={handleWatchlistToggle}
                      className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm border transition-all duration-300 ${isInWatchlist
                        ? "bg-green-600/80 hover:bg-green-700/80 border-green-500 text-white"
                        : "bg-gray-800/80 hover:bg-gray-700/80 border-gray-600 text-white"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isInWatchlist ? (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      )}
                      <span>
                        {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && trailerKey && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-8 h-8"
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
              </button>
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&showinfo=1&rel=0`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {["overview", "cast", "crew", "details"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold text-lg capitalize whitespace-nowrap border-b-2 transition-all duration-300 ${activeTab === tab
                  ? "border-red-500 text-white"
                  : "border-transparent text-gray-400 hover:text-white"
                  }`}
                whileHover={{ y: -2 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="py-16 px-4 md:px-8"
        >
          <div className="max-w-7xl mx-auto">
            {activeTab === "cast" && cast.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                  {cast.map((actor, index) => (
                    <motion.div
                      key={actor.id}
                      className="group cursor-pointer"
                      variants={castVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        {actor.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                            alt={actor.name}
                            className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                            <span className="text-gray-400 text-6xl">👤</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-bold text-white text-lg mb-1">
                            {actor.name}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {actor.character}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "crew" && crew.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center">Crew</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {crew.map((person, index) => (
                    <motion.div
                      key={`${person.id}-${person.job}`}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="font-bold text-xl mb-2">{person.name}</h3>
                      <p className="text-red-400 font-medium">{person.job}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "details" && movieDetails && (
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center">
                  Movie Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      label: "Release Date",
                      value: new Date(
                        movieDetails.release_date
                      ).toLocaleDateString(),
                    },
                    {
                      label: "Budget",
                      value: movieDetails.budget
                        ? `$${movieDetails.budget.toLocaleString()}`
                        : "N/A",
                    },
                    {
                      label: "Revenue",
                      value: movieDetails.revenue
                        ? `$${movieDetails.revenue.toLocaleString()}`
                        : "N/A",
                    },
                    {
                      label: "Original Language",
                      value: movieDetails.original_language?.toUpperCase(),
                    },
                    { label: "Status", value: movieDetails.status },
                    {
                      label: "Production Companies",
                      value:
                        movieDetails.production_companies
                          ?.map((c) => c.name)
                          .join(", ") || "N/A",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-red-400 font-semibold mb-2">
                        {item.label}
                      </h3>
                      <p className="text-white text-lg">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "overview" && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
                  Overview
                </h2>
                <motion.div
                  className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl leading-relaxed text-gray-300 text-center">
                    {movie.overview}
                  </p>
                </motion.div>

                {recommendations.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-3xl font-bold mb-8 text-center">
                      You Might Also Like
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {recommendations.map((rec, index) => (
                        <motion.div
                          key={rec.id}
                          className="group cursor-pointer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() =>
                            navigate(`/movie/${rec.id}`, {
                              state: { movie: rec },
                            })
                          }
                        >
                          <img
                            src={IMAGE_CDN_URL + rec.poster_path}
                            alt={rec.title}
                            className="w-full aspect-[2/3] object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                          />
                          <h4 className="mt-3 font-semibold text-sm text-center line-clamp-2">
                            {rec.title}
                          </h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </motion.div>
  );
};

export default MovieDetails;
