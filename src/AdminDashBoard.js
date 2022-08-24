import "./AdminDashboard.css";
import { AdminAppBar } from "./AdminAppBar";
import { useEffect, useState } from "react";
import { API } from "./global";
import { useNavigate, useParams } from "react-router-dom";

export function AdminDashboard() {
  
  function GetMovies(){
    const res=fetch(`${API}/movies`,{
      method:"GET",
          headers:{
            "content-Type":"application/json",
            "x-auth-token":localStorage.getItem('token'),
          }
    });
    res.then((data)=>data.json())
    .then((mvs)=>setMovieList(mvs));
}

useEffect(()=>{
  GetMovies()
  },[])
  
const[MovieList,setMovieList]=useState([]);
  return (
    <div className="AdminDashboard-container">
      <AdminAppBar/>
    
   

<div className="AdminDashboard-MovieDetails">
        

{MovieList.map((movie)=>(
        <DisplayAllMoviesAdmin movie={movie} key={movie._id} movieid={movie._id}/>
      ))}
    </div>
    </div>
   
  );
}


function DisplayAllMoviesAdmin({movie,movieid}){
  const navigate=useNavigate();
  const{id}=useParams();
  return(
    <>
        <img src={movie.poster} alt={movie.name} className="All-movies-AdminPage" onClick={()=>navigate(`/movie/${id}/${movieid}`)} />
    </>
  )
}