import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};

export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 h-64 w-full rounded mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-700 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 h-48 w-32 rounded mb-2"></div>
      <div className="bg-gray-700 h-4 w-full rounded"></div>
    </div>
  );
};

export default Loading;
