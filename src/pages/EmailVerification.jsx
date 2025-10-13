import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../services";
import { Toast } from "../components/ui";
import {
  MdEmail,
  MdArrowBack,
  MdMovie,
  MdSend,
  MdRefresh,
} from "react-icons/md";

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleResendVerification = async () => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);

    try {
      await sendEmailVerification(user);
      setToast({
        message: "Verification email sent successfully!",
        type: "success",
      });
    } catch (error) {
      let errorMessage = "Failed to send verification email.";

      switch (error.code) {
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Please wait before trying again.";
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      setToast({
        message: "Failed to sign out. Please try again.",
        type: "error",
      });
    }
  };

  const handleCheckVerification = async () => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);

    try {
      // Reload user to get updated email verification status
      await user.reload();

      if (user.emailVerified) {
        setToast({
          message: "Email verified successfully! Redirecting...",
          type: "success",
        });

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/browse");
        }, 2000);
      } else {
        setToast({
          message:
            "Email not yet verified. Please check your inbox and click the verification link.",
          type: "info",
        });
      }
    } catch (error) {
      setToast({
        message: "Failed to check verification status.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-red-900/10"></div>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Brand Section */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center mb-4">
            <MdMovie className="w-12 h-12 text-red-500 mr-3" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              MovieGPT
            </h1>
          </div>
        </motion.div>

        {/* Verification Card */}
        <motion.div
          className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          variants={itemVariants}
        >
          <div className="text-center">
            {/* Icon */}
            <motion.div
              className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <MdEmail className="w-10 h-10 text-blue-400" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Verify Your Email
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              We've sent a verification link to your email address. Please check
              your inbox and click the link to verify your account.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
              <p className="text-blue-400 text-sm">
                <strong>Didn't receive the email?</strong> Check your spam
                folder or click the resend button below.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckVerification}
                disabled={loading}
                className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300 font-medium py-3 px-4 rounded-xl border border-green-600/30 hover:border-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                    <span>Checking...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <MdRefresh className="w-4 h-4" />
                    <span>I've Verified My Email</span>
                  </div>
                )}
              </button>

              <button
                onClick={handleResendVerification}
                disabled={loading}
                className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 font-medium py-3 px-4 rounded-xl border border-purple-600/30 hover:border-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <MdSend className="w-4 h-4" />
                    <span>Resend Verification Email</span>
                  </div>
                )}
              </button>

              <button
                onClick={handleSignOut}
                className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <MdArrowBack className="w-4 h-4" />
                  <span>Sign Out</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <p className="text-gray-500 text-sm">
            Having trouble? Contact our support team for assistance.
          </p>
        </motion.div>
      </motion.div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default EmailVerification;
