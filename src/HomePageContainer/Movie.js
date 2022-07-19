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
            <iframe width="80%" height="500px" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture" allowfullscreen="true"></iframe>
            <div className='movie-details-conatiner'>
                <div className='movie-specs'>
                    <h2 className='movie-name'>{movie.name}</h2>
                    <p className='movie-rating'>{movie.rating}⭐</p>
                </div>
                <p className='movie-summary'>{movie.summary}</p>
            </div>
        </div>
    );
}

export default Movie;