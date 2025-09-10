import { Link, useNavigate } from "react-router-dom";
import { Film, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/button";
import { Card, CardContent } from "@mui/material";
import { API } from "../global";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create user
      const newUser = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(`${API}/users/signup`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        // Send verification email
        await sentRegistrationEmail({ email: formData.email });

        toast.success("Account created successfully! Verification email sent.");

        // Navigate to login page after a short delay
        setTimeout(() => {
          navigate(`/login`);
        }, 2000);
      } else {
        const errorMessage = result.message || "Failed to create account";
        setErrors({ submit: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = "An error occurred. Please try again.";
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sentRegistrationEmail = async (userData) => {
    try {
      await fetch(`${API}/email/RegisterConfirmation`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Registration email sent to:", userData.email);
    } catch (error) {
      console.error("Error sending registration email:", error);
      toast.warning("Account created, but verification email failed to send.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Film className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              OnStream
            </span>
          </Link>
        </div>

        {/* Register Form */}
        <Card className="card-gradient border-border/50 shadow-elevated">
          <div className="space-y-1 p-6 pb-0">
            <div className="text-2xl text-center text-white">
              Create account
            </div>
            <div className="text-center text-[#9dacaf]">
              Join CineStream and start exploring exclusive content
            </div>
          </div>
          <CardContent className="space-y-4">
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="space-y-2 w-full flex flex-col justify-center items-start">
                  <label htmlFor="firstName" className="text-white">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    className={`bg-input/50 border-border/50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white ${
                      errors.firstName ? "border-red-500" : ""
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2 w-full flex flex-col justify-center items-start">
                  <label htmlFor="lastName" className="text-white">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    className={`bg-input/50 border-border/50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white ${
                      errors.lastName ? "border-red-500" : ""
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 w-full flex flex-col justify-center items-start">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className={`bg-input/50 border-border/50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white ${
                    errors.email ? "border-red-500" : ""
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2 w-full flex flex-col justify-center items-start">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className={`bg-input/50 border-border/50 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white ${
                      errors.password ? "border-red-500" : ""
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2 w-full flex flex-col justify-center items-start">
                <label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className={`bg-input/50 border-border/50 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white ${
                      errors.confirmPassword ? "border-red-500" : ""
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-border"
                    required
                    disabled={loading}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link
                      to={"/terms"}
                      className="text-blue-500 hover:text-primary-glow"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to={"/policy"}
                      className="text-blue-500 hover:text-primary-glow"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="cinema"
                className="w-full py-4 font-medium"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="bg-card/50 text-white p-3"
                disabled={loading}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="bg-card/50 text-white"
                disabled={loading}
              >
                Apple
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary-glow transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
