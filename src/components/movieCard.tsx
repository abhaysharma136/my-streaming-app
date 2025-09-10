import { Calendar, Play, Star } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/button";

export default function MovieCard({
  id,
  name,
  title,
  Year,
  rating,
  poster,
  Genres,
  _id,
}) {
  console.log("_id:", _id);
  const movieTitle = title ? title : name;
  const [imgSrc, setImgSrc] = useState(poster);
  const [imgError, setImgError] = useState(false);
  const fallbackImage =
    "https://drive-in-theatre.netlify.app/movieImages/default-movie.png";
  // Handle image loading errors
  const handleImageError = () => {
    if (!imgError) {
      setImgSrc(fallbackImage);
      setImgError(true);
    }
  };
  return (
    <Link to={`/movie/${_id}`} className="group">
      <div className="movie-card relative overflow-hidden bg-card rounded-lg shadow-card">
        <div className="aspect-[3/4]">
          <img
            src={imgSrc}
            alt={movieTitle}
            className="h-full w-full object-cover"
            onError={handleImageError}
            loading="lazy" // Optional: lazy loading for better performance
          />
          <div className="movie-card-overlay">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="cinema"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-smooth h-10 w-10"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 text-cinema-gold fill-current" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        {/* Movie Info */}
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-sm truncate">{movieTitle}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{Year}</span>
            </span>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
              {Genres}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
