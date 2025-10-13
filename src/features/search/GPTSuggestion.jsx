import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { MovieCard } from "../movies";
import { MdMovie } from "react-icons/md";

const GPTSuggestion = () => {
  const { movieResult, movieName } = useSelector((store) => store.gpt);

  if (!movieName || movieName.length === 0) return null;

  // Calculate total movies across all categories
  const totalMovies = movieResult.reduce((total, categoryMovies) => {
    return total + (categoryMovies ? categoryMovies.length : 0);
  }, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-black via-gray-900 to-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Compact Header Section */}
      <motion.div className="text-center py-8 px-4" variants={sectionVariants}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Search Results
        </h2>
        <p className="text-lg text-gray-300">
          Found {totalMovies} movies across {movieName.length} categories
        </p>
      </motion.div>

      {/* Horizontal Scrolling Sections by Category */}
      <motion.div
        className="space-y-4 md:space-y-8 pb-16"
        variants={containerVariants}
      >
        {movieName.map((category, index) => {
          const categoryMovies = movieResult[index];

          if (!categoryMovies || categoryMovies.length === 0) return null;

          return (
            <motion.div
              key={category}
              className="px-4 md:px-6 py-6"
              variants={sectionVariants}
            >
              {/* Category Header */}
              <motion.div className="mb-6" variants={sectionVariants}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-red-500 to-purple-600 w-1 h-8 rounded-full"></div>
                    <h1 className="text-xl md:text-3xl font-bold text-white">
                      {category}
                    </h1>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {categoryMovies.length} movies
                  </div>
                </div>
              </motion.div>

              {/* Horizontal Scrolling Movies Container */}
              <div className="relative">
                <motion.div
                  className="flex overflow-x-auto scrollbar-hide space-x-3 md:space-x-4 lg:space-x-5 pb-4 pt-2 modern-scrollbar"
                  variants={containerVariants}
                >
                  {categoryMovies.map((movie) => (
                    <motion.div
                      key={movie.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MovieCard
                        posterpath={movie.poster_path}
                        movie={movie}
                        category={category}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Gradient fade on the right */}
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none"></div>

                {/* Subtle gradient fade on the left */}
                <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          );
        })}

        {/* No Results State */}
        {totalMovies === 0 && (
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-800 text-center mx-4 md:mx-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MdMovie className="w-20 h-20 mb-4 mx-auto text-gray-500" />
            <h4 className="text-xl font-semibold text-gray-300 mb-2">
              No movies found
            </h4>
            <p className="text-gray-500">Try searching for something else</p>
          </motion.div>
        )}

        {/* Scroll to Top Button */}
        <motion.div className="text-center mt-12" variants={sectionVariants}>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            <span>Back to Top</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GPTSuggestion;
