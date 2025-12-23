import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Shield, RefreshCw } from "lucide-react";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // TODO: Replace with your actual API call
      /*
      const response = await fetch('YOUR_API/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpValue })
      });

      if (!response.ok) throw new Error('Invalid OTP');
      
      // Navigate to reset password page
      window.location.href = '/reset-password';
      */

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("OTP Verified! Navigate to reset password page");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    setError("");

    try {
      // TODO: Replace with your actual API call
      /*
      const response = await fetch('YOUR_API/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to resend OTP');
      */

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // TODO: Navigate back
    // window.location.href = '/forgot-password';
    alert("Navigate back to forgot password");
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Verify OTP
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              We've sent a 6-digit code to your email.
              <br />
              Please enter it below to continue.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 animate-in slide-in-from-top duration-300">
              <p className="text-sm font-medium text-center">{error}</p>
            </div>
          )}

          {/* OTP Input */}
          <div className="mb-8">
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl font-semibold bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all"
                />
              ))}
            </div>
          </div>

          {/* Timer / Resend */}
          <div className="text-center mb-6">
            {!canResend ? (
              <p className="text-sm text-gray-600">
                Resend code in{" "}
                <span className="font-semibold text-red-500">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors inline-flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4" />
                Resend Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || otp.join("").length !== 6}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-4 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={loading}
            className="w-full text-red-500 hover:text-red-600 font-medium text-sm py-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forgot Password
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 leading-relaxed">
          Didn't receive the code? Check your spam folder or{" "}
          <button
            onClick={handleResend}
            disabled={!canResend || loading}
            className="text-red-500 hover:text-red-600 font-medium underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            resend
          </button>
          .
        </div>
      </div>
    </div>
  );
}
