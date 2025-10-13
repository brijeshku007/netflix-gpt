import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { DropDown, StreamMeLogo } from "../ui";
import { auth } from "../../services";
import { SUPPORTED_LANGUAGES } from "../../constants";
import { HiMenu, HiX } from "react-icons/hi";
import {
  MdHome,
  MdSmartToy,
  MdPlaylistAdd,
  MdLogout,
  MdPerson,
} from "react-icons/md";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Check if we're on the search page
  const isOnSearchPage = location.pathname === "/search-movie";

  // Authentication is now handled in AuthWrapper
  const handleGpt = () => {
    if (isOnSearchPage) {
      // If on search page, go back to browse
      navigate("/browse");
    } else {
      // If not on search page, go to search page
      navigate("/search-movie");
    }
    setIsMobileMenuOpen(false); // Close mobile menu when action is taken
    document.body.classList.remove("no-scroll"); // Remove scroll lock
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  // Clean up body scroll class on component unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsMobileMenuOpen(false); // Close mobile menu on logout
        document.body.classList.remove("no-scroll"); // Remove scroll lock
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("no-scroll");
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileDropdownOpen &&
        !event.target.closest(".profile-dropdown-container")
      ) {
        closeProfileDropdown();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isProfileDropdownOpen) {
        closeProfileDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileDropdownOpen]);

  return (
    <div className="relative z-20">
      {/* Main Header */}
      <div className="flex items-center justify-between bg-gray-950 text-white px-4 py-3 md:px-8 md:py-4 lg:px-12 lg:py-5 xl:py-4">
        {/* Logo */}
        <div className="flex items-center">
          <StreamMeLogo
            width={200}
            height={60}
            animated={true}
            className="h-8 w-auto md:h-10 lg:h-12 xl:h-14"
            onClick={() => navigate("/browse")}
          />
        </div>

        {/* Desktop Navigation */}
        {user && (
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {isOnSearchPage && <DropDown names={SUPPORTED_LANGUAGES} />}

            <button
              onClick={() => navigate("/watchlist")}
              className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 xl:px-4 xl:py-2 text-sm md:text-base lg:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              aria-label="My Watchlist"
            >
              Watchlist
            </button>

            <button
              onClick={handleGpt}
              className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 xl:px-4 xl:py-2 text-sm md:text-base lg:text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200"
              aria-label={isOnSearchPage ? "Go to Home Page" : "Open AI Search"}
            >
              {isOnSearchPage ? "Home Page" : "AI Search"}
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 xl:px-4 xl:py-2 text-sm md:text-base lg:text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              aria-label="Logout"
            >
              Logout
            </button>

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown-container">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-800 transition-colors duration-200"
                aria-label="User Profile Menu"
                aria-expanded={isProfileDropdownOpen}
              >
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-10 xl:h-10 rounded-full border-2 border-gray-600 hover:border-white transition-colors duration-200"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  {/* Arrow pointer */}
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-800 border-l border-t border-gray-700 transform rotate-45"></div>
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-red-600 p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.photoURL}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full border-3 border-white shadow-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg truncate">
                          {user?.displayName || "User"}
                        </h3>
                        <p className="text-gray-200 text-sm truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Menu Items */}
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">
                        Account Info
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
                            User ID:
                          </span>
                          <span className="text-white text-sm font-mono bg-gray-700 px-2 py-1 rounded ">
                            {user?.uid?.substring(0, 8)}...
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Status:</span>
                          <span className="text-green-400 text-sm flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Online
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">Joined:</span>
                          <span className="text-gray-400 text-sm">
                            {new Date(
                              user?.metadata?.creationTime || Date.now()
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 py-3">
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">
                        Quick Actions
                      </div>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            navigate("/profile");
                            closeProfileDropdown();
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center space-x-2"
                        >
                          <MdPerson className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            navigate("/watchlist");
                            closeProfileDropdown();
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center space-x-2"
                        >
                          <MdPlaylistAdd className="w-4 h-4" />
                          <span>My Watchlist</span>
                        </button>

                        <button
                          onClick={() => {
                            handleGpt();
                            closeProfileDropdown();
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center space-x-2"
                        >
                          {isOnSearchPage ? (
                            <MdHome className="w-4 h-4" />
                          ) : (
                            <MdSmartToy className="w-4 h-4" />
                          )}
                          <span>
                            {isOnSearchPage ? "Go to Home" : "AI Search"}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            handleLogout();
                            closeProfileDropdown();
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors duration-200 flex items-center space-x-2"
                        >
                          <MdLogout className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Hamburger Menu Button */}
        {user && (
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6 md:w-6 md:h-6" />
            ) : (
              <HiMenu className="w-6 h-6 md:w-6 md:h-6" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Sidebar */}
      {user && (
        <div
          className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out md:hidden custom-scrollbar overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="p-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-700">
              <img
                src={user?.photoURL}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-600"
              />
              <div>
                <p className="text-white font-medium">
                  {user?.displayName || "User"}
                </p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>

            {/* Language Dropdown (only show on search page) */}
            {isOnSearchPage && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Language
                </label>
                <DropDown names={SUPPORTED_LANGUAGES} />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  navigate("/profile");
                  closeMobileMenu();
                }}
                className="w-full px-4 py-3 text-left text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <MdPerson className="w-5 h-5" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={() => {
                  navigate("/watchlist");
                  closeMobileMenu();
                }}
                className="w-full px-4 py-3 text-left text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <MdPlaylistAdd className="w-5 h-5" />
                <span>My Watchlist</span>
              </button>

              <button
                onClick={handleGpt}
                className="w-full px-4 py-3 text-left text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                {isOnSearchPage ? (
                  <MdHome className="w-5 h-5" />
                ) : (
                  <MdSmartToy className="w-5 h-5" />
                )}
                <span>{isOnSearchPage ? "Home Page" : "AI Search"}</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <MdLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {user && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Header;
