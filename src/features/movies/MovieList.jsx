import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import { MdMovie } from "react-icons/md";

const MovieList = ({ title, movies, category }) => {
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
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="px-4 md:px-6 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div className="mb-6" variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-red-500 to-purple-600 w-1 h-8 rounded-full"></div>
            <h1 className="text-xl md:text-3xl font-bold text-white">
              {title || "Movies"}
            </h1>
          </div>
          {movies && movies.length > 0 && (
            <div className="text-gray-400 text-sm">{movies.length} movies</div>
          )}
        </div>
      </motion.div>

      {/* Movies Container */}
      <div className="relative">
        <motion.div
          className="flex overflow-x-auto scrollbar-hide space-x-3 md:space-x-4 lg:space-x-5 pb-4 pt-2 modern-scrollbar"
          variants={containerVariants}
        >
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
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
            ))
          ) : (
            <motion.div
              className="flex-shrink-0 text-center p-12 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800"
              variants={itemVariants}
            >
              <MdMovie className="w-20 h-20 mb-4 mx-auto text-gray-500" />
              <h4 className="text-xl font-semibold text-gray-300 mb-2">
                No movies available
              </h4>
              <p className="text-gray-500">Check back later for updates</p>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Gradient fade on the right */}
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none"></div>

        {/* Subtle gradient fade on the left */}
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default MovieList;
