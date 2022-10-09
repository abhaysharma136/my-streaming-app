import React from "react";
import { useEffect, useState } from "react";
import { API } from "./global";
import "./AllMovies.css";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";

export function SearchMovie() {
  const { query } = useParams();

  function GetMovies() {
    const res = fetch(`${API}/movies/search/?name=${query}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieList(mvs));
  }

  useEffect(() => {
    GetMovies();
  }, [query]);

  const [MovieList, setMovieList] = useState([]);
  return (
    <div>
      <NavBar />
      <div className="movie-page-all-content">
        {MovieList.length > 0 ? (
          <div className="All-Movie-Container">
            {MovieList.map((movie) => (
              <DisplayAllMovies
                movie={movie}
                key={movie._id}
                movieid={movie._id}
              />
            ))}
          </div>
        ) : (
          <NoMovieFound />
        )}
      </div>
    </div>
  );
}

function DisplayAllMovies({ movie, movieid }) {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <img
        src={movie.poster}
        alt={movie.name}
        className="All-movies"
        onClick={() => navigate(`/movie/${id}/${movieid}`)}
      />
    </>
  );
}

function NoMovieFound() {
  return (
    <div className="No-Movie-found">
      <h2>Sorry !!No Movie Found</h2>
    </div>
  );
}
