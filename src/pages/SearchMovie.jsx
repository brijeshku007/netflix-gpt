import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Header } from "../components/layout";
import { GPTSearchBar, GPTSuggestion } from "../features/search";

const SearchMovie = () => {
  const { movieName } = useSelector((store) => store.gpt);

  return (
    <div>
      <Header />
      <motion.div
        className="min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background Particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-red-900/20"></div>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Always show search bar */}
          <div className={movieName && movieName.length > 0 ? "pb-4" : ""}>
            <GPTSearchBar />
          </div>

          {/* Show results if available */}
          {movieName && movieName.length > 0 && (
            <div className="mt-0">
              <GPTSuggestion />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchMovie;
