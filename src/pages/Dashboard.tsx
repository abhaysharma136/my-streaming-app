import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";
import Button from "../components/ui/button";
import MovieCard from "../components/movieCard";
import { API } from "../global";
import Pagination from "../components/pagination";
import { useParams, useSearchParams } from "react-router-dom";

// const movies = [
//   {
//     id: "1",
//     title: "Stellar Odyssey",
//     year: 2024,
//     rating: 8.7,
//     poster:
//       "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
//     genre: "Sci-Fi",
//   },
//   {
//     id: "2",
//     title: "Midnight Chronicles",
//     year: 2024,
//     rating: 8.2,
//     poster:
//       "https://images.unsplash.com/photo-1489599243109-0c2b5be3b3a5?w=400&h=600&fit=crop",
//     genre: "Action",
//   },
//   {
//     id: "3",
//     title: "Digital Dreams",
//     year: 2023,
//     rating: 7.9,
//     poster:
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
//     genre: "Drama",
//   },
//   {
//     id: "4",
//     title: "Ocean's Edge",
//     year: 2024,
//     rating: 8.4,
//     poster:
//       "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
//     genre: "Thriller",
//   },
//   {
//     id: "5",
//     title: "Neon Nights",
//     year: 2023,
//     rating: 7.6,
//     poster:
//       "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
//     genre: "Cyberpunk",
//   },
//   {
//     id: "6",
//     title: "Forest Whispers",
//     year: 2024,
//     rating: 8.1,
//     poster:
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
//     genre: "Mystery",
//   },
//   {
//     id: "7",
//     title: "Chrome Velocity",
//     year: 2024,
//     rating: 7.8,
//     poster:
//       "https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=600&fit=crop",
//     genre: "Racing",
//   },
//   {
//     id: "8",
//     title: "Quantum Realm",
//     year: 2023,
//     rating: 8.5,
//     poster:
//       "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=600&fit=crop",
//     genre: "Sci-Fi",
//   },
// ];

const categories = [
  { name: "Trending", icon: TrendingUp },
  { name: "Recently Added", icon: Clock },
  { name: "Top Rated", icon: Star },
];

const genres = [
  "All",
  "Action",
  "Romance",
  "Documentary",
  // "Thriller",
  // "Mystery",
  "Comedy",
  "Horror",
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [movies, setMovies] = useState([]);
  const [totalpages, setTotalPages] = useState();
  console.log("movies:", movies);
  const filteredMovies = movies?.filter((movie) => {
    const movieTitle = movie?.title || movie?.name || "";
    const movieGenre = movie?.Genres || "";
    const matchesSearch = movieTitle
      .toLowerCase()
      .includes(searchQuery?.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || movieGenre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  function GetMovies(page) {
    // Get the URLSearchParams from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    // Get the Genres parameter from the URL
    const genres = urlParams.get("Genres");

    // Build the base URL
    let url = `${API}/movies/page/movie/${page}`;

    // Add genres query parameter if it exists in the URL
    if (genres) {
      url += `?Genres=${encodeURIComponent(genres)}`;
    }

    const res = fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res
      .then((data) => data.json())
      .then((result) => {
        setMovies(result.movies); // Set the movies array
        setTotalPages(result.totalPages); // Set the total pages
        // You can also access other properties if needed:
        // console.log("Current page:", result.currentPage);
        // console.log("Total count:", result.totalCount);
      });
  }

  useEffect(() => {
    GetMovies(page);
  }, [page, selectedGenre]);

  const handleGenreChange = (genre) => {
    const newParams = new URLSearchParams(searchParams);
    if (genre !== "All") {
      setSelectedGenre(genre);

      newParams.set("Genres", genre);
      newParams.delete("page");
      setSearchParams(newParams);
    } else {
      setSelectedGenre("All");
      newParams.delete("Genres");
      newParams.delete("page");
      setSearchParams(newParams);
    }
  };
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="container mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-4 text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Browse Movies
          </h1>
          <p className="text-muted-foreground">
            Discover and watch exclusive movie trailers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input/50 border-border/50 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-3 text-white"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-border/50 p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-4"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-4"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Button */}
            {/* <Button variant="outline" className="bg-card/50 px-3 py-2">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button> */}
          </div>
        </div>

        {/* Category Tabs */}
        {/* <div className="flex space-x-1 bg-muted/50 rounded-lg p-1">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              className="flex-1 data-[active]:bg-background data-[active]:shadow-sm"
              data-active={category.name === "Trending"}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div> */}

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "cinema" : "outline"}
              size="sm"
              onClick={() => handleGenreChange(genre)}
              className="bg-card/50 px-3 py-1"
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedGenre === "All"
                ? "All Movies"
                : selectedGenre}
            </h2>
            {/* <span className="text-muted-foreground">
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"}
            </span> */}
          </div>

          {filteredMovies.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  : "grid-cols-1"
              }`}
            >
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No movies found matching your criteria.
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("All");
                }}
                className="mt-4 p-3"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Pagination currentPage={Number(page) || 1} totalPages={totalpages} />
    </div>
  );
}
