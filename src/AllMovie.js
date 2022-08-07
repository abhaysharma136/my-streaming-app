import { useEffect, useState } from "react";
import { API } from "./global";
import './AllMovies.css';
import {useNavigate, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";

export function AllMovie() {
  const{queryType}=useParams();
  const{query}=useParams();
 
  function GetMovies(){
    const res=fetch(`${API}/movies?${queryType}=${query}`);
    res.then((data)=>data.json())
    .then((mvs)=>setMovieList(mvs));
}

useEffect(()=>{
  GetMovies()
  },[query])
  
const[MovieList,setMovieList]=useState([]);


  return (
    <div>
      <NavBar/>
       <div className="All-Movie-Container">
       {MovieList.map((movie)=>(
        <DisplayAllMovies movie={movie} key={movie._id} movieid={movie._id}/>
      ))}
        
    
      
    </div>
    </div>
   
  );
}


function DisplayAllMovies({movie,movieid}){
  const navigate=useNavigate();
  const{id}=useParams();
  return(
    <>
        <img src={movie.poster} alt={movie.name} className="All-movies" onClick={()=>navigate(`/movie/${id}/${movieid}`)} />
    </>
  )
}