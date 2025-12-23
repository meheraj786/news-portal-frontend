import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with your actual API call
      /*
      const response = await fetch('YOUR_API/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error('Failed to send reset link');
      */

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setEmail("");

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // TODO: Navigate to login
    // window.location.href = '/login';
    alert("Navigate to login page");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://i.ibb.co/9ZKqJYf/logo.png"
            alt="প্রতিদিন জনতার"
            className="h-16 mx-auto"
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-5">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Forgot Password?
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              No worries! Enter your email address and we'll send you a reset
              link.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6 flex items-center gap-3 animate-in slide-in-from-top duration-300">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">
                Reset link sent! Please check your email inbox.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 animate-in slide-in-from-top duration-300">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="w-full pl-4 pr-12 py-3.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-4 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <button
              onClick={handleBackToLogin}
              className="w-full text-red-500 hover:text-red-600 font-medium text-sm py-2 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 leading-relaxed">
          By clicking continue, you agree to our{" "}
          <a href="#" className="text-gray-700 underline hover:text-gray-900">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-gray-700 underline hover:text-gray-900">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
