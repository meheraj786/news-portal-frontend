import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      setError("Session invalid. Please verify your email again.");
      setTimeout(() => navigate("/verify-email"), 3000);
    }
  }, [email, navigate]);

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];
    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "",
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // পাসওয়ার্ড রিসেট হ্যান্ডলার
  const handleSubmit = async () => {
    setError("");
    if (!email) return setError("Email is missing.");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match");
    if (passwordStrength.strength < 3)
      return setError("Please use a stronger password");

    setLoading(true);
    try {
      // Backend expects: { email, password }
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}admin/reset-password`,
        { email, password: formData.password },
        { withCredentials: true } // Cookies handle korar jonno
      );

      setSuccess(true);
      toast.success(response.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Reset failed. Session expired.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full animate-in fade-in">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Success!</h1>
          <p className="text-gray-600">
            Password reset successful. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-red-500 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">New Password</h1>
          <p className="text-sm text-gray-500">
            Creating new password for <b>{email}</b>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm text-center mb-5 font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-3.5 border rounded-lg outline-none pr-10 focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="New Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full p-3.5 border rounded-lg outline-none pr-10 focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="Confirm Password"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-4 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !email}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-lg font-bold disabled:bg-gray-400 transition-colors shadow-lg"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
