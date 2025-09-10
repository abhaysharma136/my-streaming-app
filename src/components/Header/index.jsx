import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import LogoComponent from "../Logo";
import Button from "../ui/button";
import { useIsMobile } from "../../hooks/use-mobile";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../stores/authStore";

export default function MainHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isActive = (path) => location.pathname === path;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, updateUser, logout } = useAuthStore();
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  let isAuth = localStorage.getItem("token");

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    logout();
    navigate("/");
    window.location.reload();
  };

  // Handle profile dropdown hover
  const handleProfileMouseEnter = () => {
    if (!isMobile && isAuth) {
      setIsDropdownOpen(true);
    }
  };

  const handleProfileMouseLeave = () => {
    if (!isMobile) {
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 100);
    }
  };

  const handleProfileClick = () => {
    if (isMobile) {
      if (isAuth) {
        setIsDropdownOpen(!isDropdownOpen);
      } else {
        navigate("/login-page");
      }
    }
  };

  // Handle notification bell hover
  const handleNotificationMouseEnter = () => {
    if (!isMobile) {
      setIsNotificationsOpen(true);
    }
  };

  const handleNotificationMouseLeave = () => {
    if (!isMobile) {
      setTimeout(() => {
        setIsNotificationsOpen(false);
      }, 100);
    }
  };

  const handleNotificationClick = () => {
    if (isMobile) {
      setIsNotificationsOpen(!isNotificationsOpen);
    }
  };

  return (
    <div className={styles.outerContainerStyles}>
      <div>
        <LogoComponent />
      </div>
      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link
          to="/"
          className={
            ("text-sm font-medium transition-colors hover:text-primary",
            isActive("/") ? "text-primary" : "text-muted-foreground")
          }
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className={
            ("text-sm font-medium transition-colors hover:text-primary",
            isActive("/dashboard") ? "text-primary" : "text-muted-foreground")
          }
        >
          Browse
        </Link>
      </nav>
      <div className="flex gap-7 justify-center">
        {!isMobile && (
          <div
            className="relative"
            ref={notificationsRef}
            onMouseEnter={handleNotificationMouseEnter}
            onMouseLeave={handleNotificationMouseLeave}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-md"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4" />
            </Button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-md shadow-xl py-2 z-50 border">
                <div className="px-4 py-2 border-b border-blue-900">
                  <h3 className="text-sm font-medium text-white">
                    Notifications
                  </h3>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {/* No notifications message */}
                  <div className="px-4 py-6 text-center">
                    <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-300">No notifications</p>
                    <p className="text-xs text-gray-500 mt-1">
                      You're all caught up!
                    </p>
                  </div>
                </div>

                {/* View all notifications link (optional) */}
                <div className="border-t border-blue-900 px-4 py-2">
                  <button className="text-xs text-blue-400 hover:text-blue-300 w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!isAuth &&
          (isMobile ? (
            <Button
              className="flex justify-center items-center px-3 rounded-xl text-black font-bold"
              variant="cinema"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                className="flex justify-center items-center px-3 rounded-xl text-black font-medium"
                variant="glass"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                className="flex justify-center items-center px-3 rounded-xl text-black font-medium"
                variant="cinema"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          ))}

        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <Button
            onClick={handleProfileClick}
            className="flex justify-center items-center w-10 h-10 rounded-md text-white"
            variant="ghost"
          >
            <User className="h-4 w-4" />
          </Button>

          {isDropdownOpen && isAuth && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-md shadow-xl py-1 z-50 border">
              <div className="px-4 py-3 border-b border-blue-900">
                <p className="text-sm font-medium text-white">
                  {user?.name || "User Account"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setIsDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
