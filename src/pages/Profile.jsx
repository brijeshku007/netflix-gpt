import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  updatePassword,
  
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../services";
import { addUser, removeUser } from "../store/userSlice";
import { Header } from "../components/layout";
import { Toast } from "../components/ui";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdEdit,
  MdSave,
  MdCancel,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
  MdCamera,
} from "react-icons/md";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const handleUpdateProfile = async () => {
    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      const newName = nameRef.current.value;

      // Update display name
      if (newName !== user.displayName) {
        await updateProfile(currentUser, {
          displayName: newName,
        });
      }

      // Email updates are disabled for security reasons

      // Update Redux store
      dispatch(
        addUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        })
      );

      setIsEditing(false);
      setToast({
        message: "Profile updated successfully!",
        type: "success",
      });
    } catch (error) {
      let errorMessage = "Failed to update profile.";

      switch (error.code) {
        case "auth/requires-recent-login":
          errorMessage =
            "Please sign out and sign in again to update your profile.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use by another account.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        default:
          errorMessage = error.message;
      }

      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    // Validate current password is provided
    if (!currentPassword) {
      setToast({
        message: "Please enter your current password.",
        type: "error",
      });
      return;
    }

    // Validate new password
    if (!newPassword || newPassword.length < 6) {
      setToast({
        message: "New password must be at least 6 characters long.",
        type: "error",
      });
      return;
    }

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      setToast({
        message: "New password must be different from current password.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);

      // If re-authentication successful, update password
      await updatePassword(currentUser, newPassword);

      setShowPasswordFields(false);
      newPasswordRef.current.value = "";
      currentPasswordRef.current.value = "";

      setToast({
        message: "Password updated successfully!",
        type: "success",
      });
    } catch (error) {
      let errorMessage = "Failed to update password.";

      switch (error.code) {
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "Current password is incorrect.";
          break;
        case "auth/requires-recent-login":
          errorMessage =
            "Please sign out and sign in again to change your password.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        default:
          errorMessage = error.message;
      }

      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);

    try {
      await deleteUser(auth.currentUser);
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      let errorMessage = "Failed to delete account.";

      if (error.code === "auth/requires-recent-login") {
        errorMessage =
          "Please sign out and sign in again to delete your account.";
      }

      setToast({
        message: errorMessage,
        type: "error",
      });
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
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
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          {/* Header Section */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <p className="text-xl text-gray-300">
              Manage your account information and preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-purple-500/50 shadow-lg"
                    />
                    <button className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors shadow-lg">
                      <MdCamera className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-4">
                    {user?.displayName || "User"}
                  </h2>
                  <p className="text-gray-400">{user?.email}</p>
                </div>

                {/* Quick Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-xl">
                    <span className="text-gray-300">Account Status</span>
                    <span className="text-green-400 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-xl">
                    <span className="text-gray-300">Member Since</span>
                    <span className="text-gray-300">
                      {new Date(
                        user?.metadata?.creationTime || Date.now()
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Settings Panel */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">
                    Account Information
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      <MdEdit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-xl transition-colors"
                      >
                        <MdSave className="w-4 h-4" />
                        <span>{loading ? "Saving..." : "Save"}</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-colors"
                      >
                        <MdCancel className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <MdPerson className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        ref={nameRef}
                        type="text"
                        defaultValue={user?.displayName || ""}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        ref={emailRef}
                        type="email"
                        defaultValue={user?.email || ""}
                        disabled={true}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/30 border border-gray-600/30 rounded-xl text-gray-400 placeholder-gray-500 cursor-not-allowed opacity-60 transition-all duration-300"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed for security reasons
                    </p>
                  </div>

                  {/* Password Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-gray-300 text-sm font-medium">
                        Password
                      </label>
                      <button
                        onClick={() =>
                          setShowPasswordFields(!showPasswordFields)
                        }
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                      >
                        {showPasswordFields ? "Cancel" : "Change Password"}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showPasswordFields && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          {/* Current Password */}
                          <div className="relative">
                            <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              ref={currentPasswordRef}
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Current Password"
                              className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                              {showCurrentPassword ? (
                                <MdVisibilityOff className="w-5 h-5" />
                              ) : (
                                <MdVisibility className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          {/* New Password */}
                          <div className="relative">
                            <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              ref={newPasswordRef}
                              type={showNewPassword ? "text" : "password"}
                              placeholder="New Password (min 6 characters)"
                              className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                              {showNewPassword ? (
                                <MdVisibilityOff className="w-5 h-5" />
                              ) : (
                                <MdVisibility className="w-5 h-5" />
                              )}
                            </button>
                          </div>

                          <button
                            onClick={handleUpdatePassword}
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                          >
                            {loading ? "Updating..." : "Update Password"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Danger Zone */}
                  <div className="border-t border-gray-700 pt-6 mt-8">
                    <h4 className="text-lg font-semibold text-red-400 mb-4">
                      Danger Zone
                    </h4>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-4 py-3 rounded-xl border border-red-600/30 hover:border-red-500/50 transition-all duration-300"
                    >
                      <MdDelete className="w-5 h-5" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Delete Account Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 border border-gray-700/50 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
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
                    Delete Account?
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    This action cannot be undone. All your data, including your
                    watchlist and preferences, will be permanently deleted.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl font-semibold transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  >
                    {loading ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
