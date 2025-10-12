import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeMovieWithSync,
  clearWatchlistWithSync,
} from "../store/watchlistSlice";
import { Header } from "../components/layout";
import { IMAGE_CDN_URL } from "../constants";
import { MdMovie, MdStar, MdDelete } from "react-icons/md";

const Watchlist = () => {
  const { movies: watchlist, currentUserId } = useSelector(
    (store) => store.watchlist
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleRemoveFromWatchlist = (movieId) => {
    dispatch(
      removeMovieWithSync({
        userId: currentUserId,
        movieId,
      })
    );
  };

  const handleClearWatchlist = () => {
    setShowClearModal(true);
  };

  const confirmClearWatchlist = () => {
    dispatch(clearWatchlistWithSync(currentUserId));
    setShowClearModal(false);
  };

  const cancelClearWatchlist = () => {
    setShowClearModal(false);
  };

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
      transition: { duration: 0.4 },
    },
  };

  return (
    <div>
      <Header />
      <motion.div
        className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Header Section */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              My Watchlist
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}{" "}
              saved for later
            </p>

            {watchlist.length > 0 && (
              <motion.button
                onClick={handleClearWatchlist}
                className="bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-6 py-3 rounded-xl font-semibold border border-red-600/30 hover:border-red-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All
              </motion.button>
            )}
          </motion.div>

          {/* Watchlist Content */}
          {watchlist.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              variants={containerVariants}
            >
              <AnimatePresence>
                {watchlist.map((movie) => (
                  <motion.div
                    key={movie.id}
                    className="relative group cursor-pointer"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Modern Remove Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWatchlist(movie.id);
                      }}
                      className="absolute top-3 right-3 z-20 bg-black/80 backdrop-blur-sm hover:bg-red-600/90 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-gray-600/50 hover:border-red-500/50"
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ rotate: 0 }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>

                    {/* Movie Card */}
                    <div
                      className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                      onClick={() =>
                        navigate(`/movie/${movie.id}`, { state: { movie } })
                      }
                    >
                      {/* Movie Poster */}
                      {movie.poster_path ? (
                        <div className="relative aspect-[3/4.5] overflow-hidden">
                          <img
                            src={IMAGE_CDN_URL + movie.poster_path}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                            loading="lazy"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                          {/* Rating Badge */}
                          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs px-2 py-1 rounded-lg font-semibold flex items-center space-x-1 border border-yellow-400/30">
                            <MdStar className="w-3 h-3" />
                            <span>
                              {movie.vote_average?.toFixed(1) || "N/A"}
                            </span>
                          </div>

                          {/* Year Badge */}
                          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-gray-300 text-xs px-2 py-1 rounded-lg font-medium border border-gray-600/30">
                            {movie.release_date?.split("-")[0] || "TBA"}
                          </div>

                          {/* Play Button - Hover Only */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30 hover:bg-white/30 transition-all duration-200">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-[3/4.5] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-2 border-dashed border-gray-600">
                          <div className="text-center p-4">
                            <MdMovie className="w-12 h-12 mb-2 opacity-50 mx-auto text-gray-500" />
                            <p className="text-gray-500 text-xs font-medium">
                              No Image
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Movie Info */}
                      <div className="p-3 h-20 flex flex-col justify-between bg-gradient-to-t from-gray-900/95 to-gray-800/95">
                        <h4 className="text-white text-xs md:text-sm font-semibold line-clamp-2 leading-tight">
                          {movie.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <MdStar className="w-3 h-3" />
                            <span className="font-medium">
                              {movie.vote_average?.toFixed(1) || "N/A"}
                            </span>
                          </div>
                          <span className="text-gray-400 font-medium">
                            {movie.release_date?.split("-")[0] || "TBA"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div className="text-center py-20" variants={itemVariants}>
              <MdMovie className="w-24 h-24 mb-6 opacity-50 mx-auto text-gray-500" />
              <h3 className="text-2xl font-bold text-gray-300 mb-4">
                Your watchlist is empty
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start adding movies to your watchlist by clicking the "Add to
                Watchlist" button on any movie details page.
              </p>
              <motion.button
                onClick={() => navigate("/browse")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Movies
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Modern Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cancelClearWatchlist}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 border border-gray-700/50 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <MdDelete className="w-8 h-8 text-red-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Clear Watchlist?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Are you sure you want to remove all{" "}
                  <span className="text-white font-semibold">
                    {watchlist.length} movies
                  </span>{" "}
                  from your watchlist? This action cannot be undone.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={cancelClearWatchlist}
                  className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl font-semibold transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={confirmClearWatchlist}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear All
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Watchlist;
