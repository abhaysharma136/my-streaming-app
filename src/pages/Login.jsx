import { Link, useNavigate } from "react-router-dom";
import { Film, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/button";
import { Card, CardContent } from "@mui/material";
import { API } from "../global";
import { useAuthStore } from "../stores/authStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const VerifyUser = async (newUser) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/users/login`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const user = await res.json();

      if (res.ok && user.token) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.id);

        if (user.message === "Succesfull Login") {
          login(user.token, {
            name: user?.user_name,
            email: user?.email,
          });
          toast.success("Login successful! Welcome back!");
          navigate(`/dashboard`);
        }
      } else {
        toast.error(user.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    const userResult = {
      email: email,
      password: password,
    };

    VerifyUser(userResult);
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

        {/* Login Form */}
        <Card className="card-gradient border-border/50 shadow-elevated">
          <div className="space-y-1">
            <div className="text-2xl text-center text-white">Welcome back</div>
            <div className="text-center text-[#9dacaf]">
              Sign in to your account to continue watching
            </div>
          </div>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 w-full flex flex-col justify-center items-start">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-input/50 border-border/50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2 w-full flex flex-col justify-center items-start">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-input/50 border-border/50 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    disabled={loading}
                    required
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-border"
                    disabled={loading}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-glow transition-colors"
                >
                  Forgot password?
                </Link>
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
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary-glow transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
