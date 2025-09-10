import React, { useState, useEffect } from "react";
import {
  User,
  Settings,
  Clock,
  Heart,
  Download,
  Edit3,
  Camera,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Play,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { User2Icon } from "lucide-react";
import { API } from "../global";
import { Link } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, updateUser } = useAuthStore();
  const userId = localStorage.getItem("id"); // Get userId from localStorage
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("userData:", user);

  const [watchHistory, setWatchHistory] = useState([
    {
      id: 1,
      title: "The Great Adventure",
      thumbnail:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=120&fit=crop",
      progress: 75,
      duration: "2h 15m",
      lastWatched: "2 hours ago",
    },
    {
      id: 2,
      title: "Science Today",
      thumbnail:
        "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=200&h=120&fit=crop",
      progress: 30,
      duration: "45m",
      lastWatched: "1 day ago",
    },
    {
      id: 3,
      title: "Cooking Masterclass",
      thumbnail:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=120&fit=crop",
      progress: 100,
      duration: "1h 30m",
      lastWatched: "3 days ago",
    },
  ]);

  const [settings, setSettings] = useState({
    autoPlay: true,
    quality: "1080p",
    notifications: true,
    downloadQuality: "720p",
    language: "English",
  });

  // Fetch user's watchlist movies
  const fetchWatchlistMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API}/users/user/${userId}/preferences`, {
        headers: {
          "content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch watchlist");
      }

      const data = await response.json();
      const watchlistMovieIds = data.watchlistMovies || [];

      // Fetch details for each movie in watchlist
      const moviePromises = watchlistMovieIds.map((movieId) =>
        fetch(`${API}/movies/${movieId}`).then((res) => res.json())
      );

      const movies = await Promise.all(moviePromises);
      setWatchlistMovies(movies.filter((movie) => movie)); // Filter out any null responses
    } catch (err) {
      setError(err.message);
      console.error("Error fetching watchlist:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove movie from watchlist
  const removeFromWatchlist = async (movieId) => {
    try {
      const response = await fetch(
        `${API}/users/user/${userId}/watchlist/${movieId}`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        // Remove the movie from local state
        setWatchlistMovies((prev) =>
          prev.filter((movie) => movie._id !== movieId)
        );
      }
    } catch (err) {
      console.error("Error removing from watchlist:", err);
    }
  };

  useEffect(() => {
    fetchWatchlistMovies();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const renderProfileTab = () => (
    <div className="card-gradient space-y-6">
      <div className="flex items-center space-x-6">
        <div>
          <div className="flex justify-center items-center w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg">
            <User2Icon size={45} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Premium
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="card-gradient space-y-4">
      <h3 className="text-lg font-semibold">Watch History</h3>
      {watchHistory.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 card-gradient p-4 rounded-lg shadow-sm"
        >
          <div className="relative">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-32 h-20 object-cover rounded"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 rounded-full">
              <div
                className="h-1 bg-blue-500 rounded-full"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button className="bg-blue-600 bg-opacity-90 text-white p-2 rounded-full">
                <Play size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{item.title}</h4>
            <div className="text-sm text-gray-500 flex items-center space-x-4">
              <span>{item.duration}</span>
              <span>•</span>
              <span>{item.lastWatched}</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Edit3 size={16} />
          </button>
        </div>
      ))}
      {watchHistory.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p>No watch history yet</p>
        </div>
      )}
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="card-gradient space-y-4">
      <h3 className="text-lg font-semibold">My Watchlist</h3>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your watchlist...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600">
          <p>Error loading watchlist: {error}</p>
          <button
            onClick={fetchWatchlistMovies}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlistMovies.map((movie) => (
              <div
                key={movie._id}
                className="card-gradient rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={movie.poster}
                    alt={movie.name}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://drive-in-theatre.netlify.app/movieImages/default-movie.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <Link
                      to={`/movie/${movie._id}`}
                      className="bg-blue-600 bg-opacity-90 text-white p-3 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Play size={20} />
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">{movie.name}</h4>
                  <p className="text-sm text-gray-500">{movie.Year}</p>
                  <div className="flex justify-between items-center mt-3">
                    <Link
                      to={`/movie/${movie._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Watch now
                    </Link>
                    <button
                      onClick={() => removeFromWatchlist(movie._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {watchlistMovies.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Heart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your watchlist is empty</p>
              <p className="text-sm mt-2">
                Add movies to your watchlist by clicking the heart icon on movie
                pages
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* ... (existing settings code remains the same) */}
    </div>
  );

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "favorites", name: "Watchlist", icon: Heart }, // Changed name to Watchlist
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="card-gradient rounded-lg shadow-sm overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue text-blue-700 border-l-4 border-blue-700"
                        : "hover:bg-gray"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "favorites" && renderFavoritesTab()}
          </div>
        </div>
      </div>
    </div>
  );
}
