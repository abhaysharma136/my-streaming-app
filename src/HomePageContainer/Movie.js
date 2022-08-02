import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../global.js';
import "./Movie.css";


function Movie() {
    
    const[movie,setMovie]=useState({});
    const{id}=useParams();
    console.log(id);
    function GetMovies(){
        const res=fetch(`${API}/movies/${id}`);
        res.then((data)=>data.json())
        .then((mv)=>setMovie(mv));
    }
    useEffect(()=>{
        GetMovies()
      },[])
    
    return (
        <div className='movie-conatiner'>
           <div className='movie-screen'><iframe width="100%" height="100%" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true'></iframe></div>
            <div className='movie-specs'>
                <img className='movie-poster' src={movie.poster} alt={movie.name}></img>
                <div className='movie-details'>
                    <h1>{movie.name}</h1>
                    <p>{movie.rating}⭐</p>
                    <div className='movie-info'>
                    <p>{movie.summary}</p>
                    <p>Director: <b>{movie.director}</b></p>
                    <p>Cast: <b>{movie.Cast}</b></p>
                    <p>Year: <b>{movie.Year}</b></p>
                    <p>Genres: <b>{movie.Genres}</b></p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Movie;