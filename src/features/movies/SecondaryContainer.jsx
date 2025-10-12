import { memo } from "react";
import { motion } from "framer-motion";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = memo(() => {
  const movies = useSelector((store) => store.movies);

  // Check if we have at least some movies to show
  const hasMovies =
    movies.nowPlayingMovies ||
    movies.popularMovies ||
    movies.topRatedMovies ||
    movies.upcomingMovies;

  if (!hasMovies) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
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

  return (
    <motion.div
      className="bg-gradient-to-b from-black via-gray-900 to-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="-mt-30 md:-mt-80 z-10 relative">
        {/* Movie Sections */}
        <div className="space-y-4 md:space-y-8">
          {movies.nowPlayingMovies && (
            <motion.div variants={sectionVariants}>
              <MovieList
                title="Now Playing"
                movies={movies.nowPlayingMovies}
                category="Now Playing"
              />
            </motion.div>
          )}

          {movies.topRatedMovies && (
            <motion.div variants={sectionVariants}>
              <MovieList
                title="Top Rated"
                movies={movies.topRatedMovies}
                category="Top Rated"
              />
            </motion.div>
          )}

          {movies.popularMovies && (
            <motion.div variants={sectionVariants}>
              <MovieList
                title="Popular"
                movies={movies.popularMovies}
                category="Popular"
              />
            </motion.div>
          )}

          {movies.upcomingMovies && (
            <motion.div variants={sectionVariants}>
              <MovieList
                title="Upcoming Movies"
                movies={movies.upcomingMovies}
                category="Upcoming"
              />
            </motion.div>
          )}
        </div>

        {/* Bottom Padding */}
        <div className="h-16"></div>
      </div>
    </motion.div>
  );
});

export default SecondaryContainer;
