import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTrailer } from "../../hooks";

const VideoBackground = ({ movieId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(movieId);

  // Fetch trailer for current movie
  useTrailer(currentMovieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const allMovies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Change to random movie every 30 seconds
  useEffect(() => {
    if (!allMovies || allMovies.length === 0) return;

    const interval = setInterval(() => {
      const randomMovie =
        allMovies[Math.floor(Math.random() * allMovies.length)];
      setCurrentMovieId(randomMovie.id);
      setIsLoading(true); // Reset loading state for new video
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, [allMovies]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!trailerVideo?.key) {
    return (
      <div className="w-screen aspect-video bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading trailer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen aspect-video relative bg-black">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p>Unable to load video</p>
          </div>
        </div>
      )}

      <iframe
        key={trailerVideo.key} // Force re-render when video changes
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideo.key}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&disablekb=1&fs=0&cc_load_policy=0`}
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
        style={{ border: "none" }}
      />
    </div>
  );
};

export default VideoBackground;
