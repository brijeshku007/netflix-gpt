import { useNavigate } from "react-router-dom";
import { IMAGE_CDN_URL } from "../../constants";
import { MdMovie, MdStar } from "react-icons/md";

const MovieCard = ({ posterpath, movie, category }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div
      className="w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:z-10 relative group"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e);
        }
      }}
      aria-label={`View details for ${movie.title || movie.original_title}`}
    >
      {/* Modern Movie Card with Fixed Height */}
      <div className="h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 group-hover:bg-gradient-to-br group-hover:from-gray-800/90 group-hover:to-gray-700/90 relative">
        {/* Category Badge - Inside Card */}
        {category && (
          <div className="absolute top-2 left-2 z-30 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg max-w-[calc(100%-1rem)] truncate">
            {category}
          </div>
        )}

        {/* Image Container with Fixed Aspect Ratio */}
        {posterpath ? (
          <div className="relative aspect-[3/4.5] overflow-hidden">
            <img
              src={IMAGE_CDN_URL + posterpath}
              alt={movie.title || movie.original_title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />

            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* Enhanced Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Rating Badge - Always Visible */}
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs px-2 py-1 rounded-lg font-semibold flex items-center space-x-1 border border-yellow-400/30">
              <MdStar className="w-3 h-3" />
              <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
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

            {/* Bottom Info Overlay - Hover Only */}
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <h3 className="text-white text-sm font-bold mb-1 line-clamp-2 drop-shadow-lg">
                {movie.title || movie.original_title}
              </h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-200 bg-black/30 px-2 py-0.5 rounded-full">
                  Click to view
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-[3/4.5] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-2 border-dashed border-gray-600">
            <div className="text-center p-4">
              <MdMovie className="w-12 h-12 mb-2 opacity-50 mx-auto text-gray-500" />
              <p className="text-gray-500 text-xs font-medium">No Image</p>
            </div>
          </div>
        )}

        {/* Fixed Height Title Section */}
        <div className="p-3 h-20 flex flex-col justify-between bg-gradient-to-t from-gray-900/95 to-gray-800/95">
          <h4 className="text-white text-xs md:text-sm font-semibold line-clamp-2 leading-tight">
            {movie.title || movie.original_title}
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
    </div>
  );
};

export default MovieCard;
