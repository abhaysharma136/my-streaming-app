import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Movie.css";


function Movie() {
    
    const[movie,setMovie]=useState({});
    const{id}=useParams();
    console.log(id);
    function GetMovies(){
        const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/movies/${id}`);
        res.then((data)=>data.json())
        .then((mv)=>setMovie(mv));
    }
    useEffect(()=>{
        GetMovies()
      },[])
    
    return (
        <div className='movie-conatiner'>
           <div className='movie-div'><iframe width="100%" height="100%" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <div className='movie-specs'>
                <img className='movie-poster' src={movie.poster}></img>
                <div className='movie-details'>
                    <h1>{movie.name}</h1>
                    <div className='movie-rating'>{movie.rating}⭐</div>
                    <p>{movie.summary}</p>
                </div>
            </div>
        </div>
    );
}

export default Movie;