import { useParams, Link } from "react-router-dom";
import {
  Play,
  Heart,
  Share2,
  Download,
  Star,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Volume2,
  X,
  Check,
  Copy,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import Button from "../components/ui/button";
import { Alert, Badge, IconButton, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../global";
import { Dialog, DialogContent } from "@mui/material";
import VideoPlayer from "../components/videoplayer";
// Mock movie data - in a real app, this would come from an API

export default function MovieDetail() {
  const [movie, setMovie] = useState({});
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [imgSrc, setImgSrc] = useState(""); // Initialize as empty string
  const [imgError, setImgError] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const movieCast = movie?.Cast
    ? movie.Cast.split(", ").map((actor) => actor.trim())
    : [];
  const movieGenre = movie?.Genres
    ? movie.Genres.split(", ").map((genre) => genre.trim())
    : [];
  const { movieId } = useParams();
  const userId = localStorage.getItem("id"); // Get userId from localStorage
  const fallbackImage =
    "https://drive-in-theatre.netlify.app/movieImages/default-movie.png";

  // Handle image loading errors
  const handleImageError = () => {
    if (!imgError) {
      setImgSrc(fallbackImage);
      setImgError(true);
    }
  };

  function GetMovies() {
    const res = fetch(`${API}/movies/${movieId}`);
    res.then((data) => data.json()).then((mv) => setMovie(mv));
  }

  // Check if movie is in user's watchlist
  const checkWatchlistStatus = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API}/users/user/${userId}/preferences`, {
        headers: {
          "content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        const isInWatchlist = data.watchlistMovies?.includes(movieId);
        setIsInWatchlist(isInWatchlist);
      }
    } catch (error) {
      console.error("Error checking watchlist status:", error);
    }
  };

  // Toggle watchlist status
  const toggleWatchlist = async () => {
    if (!userId) {
      setSnackbarMessage("Please log in to add to watchlist");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
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

      const data = await response.json();
      if (data.success) {
        setIsInWatchlist(data.inWatchlist);
        setSnackbarMessage(
          data.inWatchlist ? "Added to watchlist!" : "Removed from watchlist"
        );
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      setSnackbarMessage("Error updating watchlist");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetMovies();
    if (userId) {
      checkWatchlistStatus();
    }
  }, [movieId, userId]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Movie not found</h1>
          <Button asChild variant="cinema">
            <Link to="/dashboard">Back to Browse</Link>
          </Button>
        </div>
      </div>
    );
  }
  const getTrailerUrl = (url) => {
    if (!url) return "";

    // Extract video ID if a full URL is provided
    let videoId = url;
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      videoId = match ? match[1] : url;
    }

    // Construct URL with all parameters to prevent suggestions and related videos
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0&autoplay=1&iv_load_policy=3&disablekb=1&fs=1&playsinline=1&enablejsapi=1&widgetid=1&origin=${window.location.origin}`;
  };

  // Function to inject CSS to hide YouTube elements
  const injectYouTubeCSS = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      .youtube-embed-container .ytp-pause-overlay,
      .youtube-embed-container .ytp-watermark,
      .youtube-embed-container .ytp-chrome-top-buttons,
      .youtube-embed-container .ytp-show-cards-title,
      .youtube-embed-container .ytp-cards-teaser,
      .youtube-embed-container .ytp-ce-element {
        display: none !important;
      }
      
      /* Hide end screen recommendations */
      .youtube-embed-container .html5-endscreen {
        display: none !important;
      }
      
      /* Hide related videos at the end */
      .youtube-embed-container .ytp-videowall-still {
        display: none !important;
      }
      
      /* Hide the YouTube logo */
      .youtube-embed-container .ytp-title-link {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  // Handle dialog open
  const handleOpenTrailer = () => {
    setTrailerOpen(true);
    // Inject CSS after a short delay to ensure iframe is loaded
    setTimeout(injectYouTubeCSS, 1000);
  };
  const handlePlayVideo = () => {
    if (movie?.trailer) {
      setIsPlayingVideo(true);
    }
  };

  const handleCloseVideo = () => {
    setIsPlayingVideo(false);
  };
  // Share functionality
  const shareUrl = `${window.location.origin}/movie/${movieId}`;
  const shareText = `Check out "${movie.name}" (${
    movie.Year
  }) - ${movie.summary?.substring(0, 100)}...`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setSnackbarMessage("Link copied to clipboard!");
      setSnackbarOpen(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setSnackbarMessage("Failed to copy link");
      setSnackbarOpen(true);
    }
  };

  const shareOnSocialMedia = (platform) => {
    let shareUrl;

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(
          `Check out ${movie.name}`
        )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setShareOpen(true);
        }
      }
    } else {
      setShareOpen(true);
    }
  };
  return (
    <div className="min-h-screen">
      {/* Video Player Dialog for Trailer */}
      <Dialog
        open={isPlayingVideo}
        onClose={handleCloseVideo}
        maxWidth="xl"
        fullWidth
        className="video-player-dialog"
        PaperProps={{
          style: {
            backgroundColor: "black",
            boxShadow: "none",
            overflow: "hidden",
            width: "100%",
            maxWidth: "none",
            height: "100vh",
            margin: 0,
            borderRadius: 0,
          },
        }}
      >
        <DialogContent className="p-0 bg-black h-full w-full">
          <VideoPlayer
            videoUrl={movie.trailer}
            title={`${movie.name} - Trailer`}
            onClose={handleCloseVideo}
          />
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent className="p-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-center">
              Share "{movie.name}"
            </h3>

            <div className="flex justify-center space-x-4">
              <IconButton
                onClick={() => shareOnSocialMedia("facebook")}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3"
              >
                <Facebook className="h-6 w-6" />
              </IconButton>

              <IconButton
                onClick={() => shareOnSocialMedia("twitter")}
                className="bg-blue-400 hover:bg-blue-500 text-white p-3"
              >
                <Twitter className="h-6 w-6" />
              </IconButton>

              <IconButton
                onClick={() => shareOnSocialMedia("linkedin")}
                className="bg-blue-700 hover:bg-blue-800 text-white p-3"
              >
                <Linkedin className="h-6 w-6" />
              </IconButton>

              <IconButton
                onClick={() => shareOnSocialMedia("email")}
                className="bg-gray-600 hover:bg-gray-700 text-white p-3"
              >
                <Mail className="h-6 w-6" />
              </IconButton>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <Button
                onClick={copyToClipboard}
                variant={copySuccess ? "success" : "outline"}
                className="min-w-[100px]"
              >
                {copySuccess ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copySuccess ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Add the dialog component */}
      <Dialog
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        maxWidth="lg"
        fullWidth
        className="youtube-dialog"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <DialogContent className="p-0 bg-black relative">
          <IconButton
            className="absolute top-2 right-2 z-50 text-white bg-gray-800 hover:bg-gray-700"
            onClick={() => setTrailerOpen(false)}
            size="large"
            style={{ zIndex: 1000 }}
          >
            <X className="h-5 w-5" />
          </IconButton>

          <div className="relative pt-[56.25%] youtube-embed-container">
            {" "}
            {/* 16:9 aspect ratio */}
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getTrailerUrl(movie?.trailer)}
              title={`${movie.name} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              id="ytplayer"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-4 z-10">
          <Button variant="glass" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="grid lg:grid-cols-3 gap-8 items-end">
              {/* Poster */}
              <div className="lg:col-span-1">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-elevated"
                />
              </div>

              {/* Movie Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {movie.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-cinema-gold fill-current" />
                      <span className="font-semibold">{movie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{movie.Year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{movie.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {movieGenre.map((g) => (
                      <Badge
                        key={g}
                        variant="secondary"
                        className="bg-primary/10 text-primary rounded-lg px-2 py-1 text-sm"
                      >
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="hero"
                    size="lg"
                    className="min-w-40 py-2.5 px-8"
                    onClick={handleOpenTrailer}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Trailer
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    className="min-w-40 py-2.5 px-8"
                    onClick={handlePlayVideo}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Movie
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      variant="glass"
                      size="lg"
                      className="px-8"
                      onClick={toggleWatchlist}
                      disabled={loading}
                    >
                      <Heart
                        className={`mr-2 h-4 w-4 ${
                          isInWatchlist ? "fill-current text-red-500" : ""
                        }`}
                      />
                      {isInWatchlist ? "In Watchlist" : "Watchlist"}
                    </Button>
                    <Button
                      variant="glass"
                      size="icon"
                      className="p-3"
                      onClick={handleNativeShare}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    {/* <Button variant="glass" size="icon" className="p-3">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="glass" size="icon" className="p-3">
                      <Volume2 className="h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Synopsis */}
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-bold">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.summary}
                </p>
              </div>

              {/* Cast */}
              <div className="space-y-4 text-left">
                <h2 className="text-2xl font-bold">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movieCast?.map((actor, index) => (
                    <div key={actor} className="text-center space-y-2">
                      <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">{actor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Movie Details */}
              <div className="card-gradient rounded-lg p-6 space-y-4 text-left">
                <h3 className="text-xl font-bold">Movie Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Director</span>
                    <span>{movie.director}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Studio</span>
                    <span>{movie.studio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Release Date</span>
                    <span>
                      {/* {new Date(movie.releaseDate).toLocaleDateString()} */}
                      {movie?.Year}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Runtime</span>
                    <span>{movie.time}</span>
                  </div>
                </div>
              </div>

              {/* Awards */}
              <div className="card-gradient rounded-lg p-6 space-y-4 text-left">
                <h3 className="text-xl font-bold">Awards & Recognition</h3>
                <div className="space-y-2">
                  {/* {movie.awards.map((award, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Star className="h-4 w-4 text-cinema-gold fill-current mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{award}</span>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
