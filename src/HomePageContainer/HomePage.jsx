import "./HomePage.css";
import { useNavigate, useParams } from "react-router-dom";
import Courosel from "./Courosel.jsx";
import { useEffect, useState } from "react";
import { API } from "../global.js";
import { NavBar } from "../NavBar";
import ScrollContainer from "react-indiana-drag-scroll";

export function HomePage() {
  function GetMovies() {
    const res = fetch(`${API}/movies`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieList(mvs));
  }

  const [MovieList, setMovieList] = useState([]);

  useEffect(() => {
    GetMovies();
  }, []);

  function GetActionMovies() {
    const res = fetch(`${API}/movies?Genres=Action`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setActionMovieList(mvs));
  }
  const [ActionMovieList, setActionMovieList] = useState([]);

  useEffect(() => {
    GetActionMovies();
  }, []);

  function GetComedyMovies() {
    const res = fetch(`${API}/movies?Genres=Comedy`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setComedyMovieList(mvs));
  }
  const [ComedyMovieList, setComedyMovieList] = useState([]);

  useEffect(() => {
    GetComedyMovies();
  }, []);

  function GetHorrorMovies() {
    const res = fetch(`${API}/movies?Genres=Horror`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setHorrorMovieList(mvs));
  }
  const [HorrorMovieList, setHorrorMovieList] = useState([]);

  useEffect(() => {
    GetHorrorMovies();
  }, []);

  function GetRomanceMovies() {
    const res = fetch(`${API}/movies?Genres=Romance`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setRomanceMovieList(mvs));
  }
  const [RomanceMovieList, setRomanceMovieList] = useState([]);

  useEffect(() => {
    GetRomanceMovies();
  }, []);

  function GetDocumentaryMovies() {
    const res = fetch(`${API}/movies?Genres=Documentary`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setDocumentaryMovieList(mvs));
  }
  const [DocumentaryMovieList, setDocumentaryMovieList] = useState([]);

  useEffect(() => {
    GetDocumentaryMovies();
  }, []);

  
  return (
    <div className="homePage-container">
      <NavBar />
      <Courosel />

      <div className="row">
        <h2>Trending Now</h2>
        <ScrollContainer
        horizontal={true}
        className="row_posters"
      >
          {MovieList.map((movie) => (
            <DisplayMovies movie={movie} key={movie._id} movieid={movie._id} />
          ))}
        </ScrollContainer>
      </div>

      <div className="row">
        <h2>Action Movies</h2>
        <ScrollContainer
        horizontal={true}
        className="row_posters"
      >
          {ActionMovieList.map((movie) => (
            <DisplayMovies movie={movie} key={movie._id} movieid={movie._id} />
          ))}
        </ScrollContainer>
      </div>

      <div className="row">
        <h2>Comedy Movies</h2>
        <ScrollContainer
        horizontal={true}
        className="row_posters"
      >
          {ComedyMovieList.map((movie) => (
            <DisplayMovies movie={movie} key={movie._id} movieid={movie._id} />
          ))}
        </ScrollContainer>
      </div>

      <div className="row">
        <h2>Horror Movies</h2>
        <ScrollContainer
        horizontal={true}
        className="row_posters"
      >
          {HorrorMovieList.map((movie) => (
            <DisplayMovies movie={movie} key={movie._id} movieid={movie._id} />
          ))}
        </ScrollContainer>
      </div>

      <div className="row">
        <h2>Romance Movies</h2>
        <ScrollContainer
        horizontal={true}
        className="row_posters"
      >
          {RomanceMovieList.map((movie) => (
            <DisplayMovies movie={movie} key={movie._id} movieid={movie._id} />
          ))}
        </ScrollContainer>
      </div>

      <div className="row">
        <h2>Documentaries</h2>
        <ScrollContainer
        horizontal={true}
        className="row_posters"
      >
          {DocumentaryMovieList.map((movie) => (
            <DisplayMovies movie={movie} key={movie._id} movieid={movie._id} />
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}

function DisplayMovies({ movie, movieid }) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <img
        src={movie.poster}
        alt={movie.name}
        className="row_poster"
        onClick={() => navigate(`/movie/${id}/${movieid}`)}
      />
    </>
  );
}
