import { motion } from "framer-motion";
import GPTSearchBar from "./GPTSearchBar";
import GPTSuggestion from "./GPTSuggestion";

import { useSelector } from "react-redux";

const GptSearch = () => {
  const { movieName } = useSelector((store) => store.gpt);

  return (
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

      {/* Model Tester removed - issue resolved! */}

      {/* Content */}
      <div className="relative z-10">
        {!movieName || movieName.length === 0 ? (
          <GPTSearchBar />
        ) : (
          <>
            <GPTSuggestion />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GptSearch;
