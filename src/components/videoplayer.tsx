import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Settings,
  PictureInPicture,
  X,
} from "lucide-react";

export default function VideoPlayer({ videoUrl, onClose, title = "Movie" }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use a sample video that works in browsers
  const sampleVideoUrl =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Initialize Video.js player
  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(
        videoElement,
        {
          autoplay: false,
          controls: false,
          responsive: true,
          fluid: true,
          sources: [
            {
              src: sampleVideoUrl,
              type: "video/mp4",
            },
          ],
        },
        () => {
          console.log("Player is ready");
        }
      ));

      // Event listeners
      player.on("play", () => setIsPlaying(true));
      player.on("pause", () => setIsPlaying(false));
      player.on("timeupdate", () => setCurrentTime(player.currentTime()));
      player.on("loadedmetadata", () => setDuration(player.duration()));
      player.on("volumechange", () => {
        setVolume(player.volume());
        setIsMuted(player.muted());
      });
      player.on("fullscreenchange", () => {
        setIsFullscreen(player.isFullscreen());
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout;
    if (isPlaying && showControls && !isHovered) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls, isHovered]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (playerRef.current.isFullscreen()) {
        playerRef.current.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      playerRef.current.muted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.volume(newVolume);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.currentTime(newTime);
    }
  };

  const skip = (seconds) => {
    if (playerRef.current) {
      playerRef.current.currentTime(playerRef.current.currentTime() + seconds);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPictureInPicture(false);
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
        setIsPictureInPicture(true);
      }
    } catch (error) {
      console.error("Picture-in-Picture error:", error);
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (playerRef.current) {
      playerRef.current.playbackRate(rate);
    }
    setShowSettings(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPlaying) {
      // Set a small delay before hiding controls when leaving player area
      setTimeout(() => {
        if (!isHovered) setShowControls(false);
      }, 1000);
    }
  };

  const handleControlsMouseEnter = () => {
    setIsHovered(true);
  };

  const handleControlsMouseLeave = () => {
    setIsHovered(false);
    if (isPlaying) {
      setTimeout(() => {
        if (!isHovered) setShowControls(false);
      }, 1000);
    }
  };

  return (
    <div
      className="relative w-full h-full bg-black group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isFullscreen ? { height: "100vh", width: "100vw" } : {}}
    >
      {/* Video.js player */}
      <div
        data-vjs-player
        style={isFullscreen ? { height: "100%", width: "100%" } : {}}
      >
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          playsInline
          style={isFullscreen ? { height: "100%", width: "100%" } : {}}
        />
      </div>

      {/* Custom Controls Overlay */}
      <div
        ref={controlsRef}
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 transition-opacity duration-300 ${
          showControls || isHovered
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onMouseEnter={handleControlsMouseEnter}
        onMouseLeave={handleControlsMouseLeave}
        style={
          isFullscreen
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
              }
            : {}
        }
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold truncate max-w-md">
            {title}
          </h2>

          <div className="flex items-center space-x-2">
            <button
              onClick={togglePictureInPicture}
              className="text-white hover:text-gray-300 transition-colors p-2"
              title="Picture in Picture"
            >
              <PictureInPicture className="h-5 w-5" />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors p-2"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Center Play Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-4 hover:bg-black/70 transition-colors"
        >
          {isPlaying ? (
            <Pause className="h-12 w-12" />
          ) : (
            <Play className="h-12 w-12 ml-1" />
          )}
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-600 rounded-full cursor-pointer">
            <div
              className="absolute h-full bg-red-600 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer z-10"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => skip(-10)}
                className="text-white hover:text-gray-300 transition-colors"
                title="Rewind 10s"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              <button
                onClick={() => skip(10)}
                className="text-white hover:text-gray-300 transition-colors transform rotate-180"
                title="Forward 10s"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-red-600"
                />
              </div>

              {/* Time Display */}
              <span className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Settings Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-gray-800 rounded-lg p-2 w-32 space-y-1 z-20">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-700 ${
                          playbackRate === rate
                            ? "text-red-500 font-semibold"
                            : "text-white"
                        }`}
                      >
                        {rate}x Speed
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
