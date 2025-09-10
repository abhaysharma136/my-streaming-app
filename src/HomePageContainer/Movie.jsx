import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../global.js";
import { NavBar } from "../NavBar.jsx";
import "./Movie.css";

function Movie() {
  const [movie, setMovie] = useState({});
  const { movieid, id } = useParams();
  console.log(movieid, id);
  function GetMovies() {
    const res = fetch(`${API}/movies/${movieid}`);
    res.then((data) => data.json()).then((mv) => setMovie(mv));
  }
  useEffect(() => {
    GetMovies();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="movie-conatiner">
        <div className="movie-screen">
          <iframe
            width="100%"
            height="100%"
            src={movie.trailer}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen="true"
          ></iframe>
        </div>
        <div className="movie-specs">
          <img
            className="movie-poster"
            src={movie.poster}
            alt={movie.name}
          ></img>
          <div className="movie-details">
            <h2 className="movie-name-heading">{movie.name}</h2>
            <div className="movie-time-container">
              <p>{movie.rating}⭐</p>
              <p>{movie.time}</p>
            </div>
            <div className="movie-info">
              <p>
                Director:{" "}
                <span className="movie-specs-result">{movie.director}</span>
              </p>
              <p>
                Cast: <span className="movie-specs-result">{movie.Cast}</span>
              </p>
              <p>
                Year: <span className="movie-specs-result">{movie.Year}</span>
              </p>
              <p>
                Genres:{" "}
                <span className="movie-specs-result">{movie.Genres}</span>
              </p>
              <p className="movie-summary">{movie.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
