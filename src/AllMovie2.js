import { useEffect, useState } from "react";
import { API } from "./global";
import './AllMovies.css';
import {useNavigate, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Pagination } from "@mui/material";
import Example from "./Loading";



function AllMovie2() {
  
  const [page, setPage] = useState(1);
  const onPageChange = (event, value) => {
    setPage(value);
  };

  function GetTotalMovies() {
    const res = fetch(`${API}/movies/Count/All`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieCount(mvs));
  }
  const [MovieCount, setMovieCount] = useState(0);
  var count = Math.ceil(MovieCount / 10);
  console.log(count);

  useEffect(() => {
    GetTotalMovies();
  }, []);

  function GetMovies(){
    const res=fetch(`${API}/movies/page/movie/${page}`,{
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
  },[page])
  
const[MovieList,setMovieList]=useState([]);


  return (
    <div>
      <NavBar/>
      <h2 className="Movie-heading-genre">All Movies</h2>
      {MovieList?<div className="movie-page-all-content">
      <div className="All-Movie-Container">
       {MovieList.map((movie)=>(
        <DisplayAllMovies movie={movie} key={movie._id} movieid={movie._id}/>
      ))}

    </div>
    <footer className="pagination-footer">
        <Pagination
          count={count}
          showFirstButton
          showLastButton
          className="bottom-pagination"
          onChange={onPageChange}
        />
      </footer>
      </div>:<Example/>}
  
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

export default AllMovie2