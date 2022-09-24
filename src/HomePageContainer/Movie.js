import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../global.js";
import { NavBar } from "../NavBar.js";
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
            <h1>{movie.name}</h1>
            <p>{movie.rating}⭐</p>
            <div className="movie-info">
              <p>
                Director: <b>{movie.director}</b>
              </p>
              <p>
                Cast: <b>{movie.Cast}</b>
              </p>
              <p>
                Year: <b>{movie.Year}</b>
              </p>
              <p>
                Genres: <b>{movie.Genres}</b>
              </p>
              <p className="movie-summary">{movie.summary}</p>
            </div>
          </div>
        </div>
        <div className="movie-info2">
          <p>
            Director: <b>{movie.director}</b>
          </p>
          <p>
            Cast: <b>{movie.Cast}</b>
          </p>
          <p>
            Year: <b>{movie.Year}</b>
          </p>
          <p>
            Genres: <b>{movie.Genres}</b>
          </p>
          <p className="movie-summary">{movie.summary}</p>
        </div>
        <p className="movie-summary-2">{movie.summary}</p>
      </div>
    </div>
  );
}

export default Movie;
