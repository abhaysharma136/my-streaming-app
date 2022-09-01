import "./AdminDashboard.css";
import { AdminAppBar } from "./AdminAppBar";
import { useEffect, useState } from "react";
import { API } from "./global";
import { PieChart, Pie, Legend} from 'recharts';




export function AdminDashboard() {
  
  
  

  return (
    <div className="AdminDashboard-container">
      <AdminAppBar/>
      <div className="Admin-container-movieData">
        <div>
          <TotalMovieCount/>
          <MovieGenreCount/>
          <TotalUserCount/>
          
        </div>
        <CreatePie/>
      </div>
    </div>   
  );
}

function TotalMovieCount(){
  
  function GetMovies(){
    const res=fetch(`${API}/movies/Count/All`,{
      method:"GET",
          headers:{
            "content-Type":"application/json",
            "x-auth-token":localStorage.getItem('token'),
          }
    });
    res.then((data)=>data.json())
    .then((mvs)=>setMovieList(mvs));
}

const[MovieList,setMovieList]=useState("");

useEffect(()=>{
GetMovies()
},[])
 
    console.log(MovieList);
  return(
    <div className="TotalMovie">
      <h1>Total Movie</h1>
      <h1>{MovieList}</h1>
    </div>
  )
}

function MovieGenreCount(){
  return(
    <div className="TotalMovie">
      <h1>Total Genre</h1>
      <h1>6</h1>
    </div>
  )
}

function TotalUserCount(){
  function GetMovies(){
    const res=fetch(`${API}/users/Count/All`,{
      method:"GET",
          headers:{
            "content-Type":"application/json",
            "x-auth-token":localStorage.getItem('token'),
          }
    });
    res.then((data)=>data.json())
    .then((mvs)=>setUserCount(mvs));
}

const[UserCount,setUserCount]=useState("");

useEffect(()=>{
GetMovies()
},[])

  return(
    <div className="TotalMovie">
      <h1>Total User</h1>
      <h1>{UserCount}</h1>
    </div>
  )
}

function CreatePie(){
//Comedy Movie Count
  function GetMoviesComedy(){
    const res=fetch(`${API}/movies/Count/All?Genres=Comedy`,{
      method:"GET",
          headers:{
            "content-Type":"application/json",
            "x-auth-token":localStorage.getItem('token'),
          }
    });
    res.then((data)=>data.json())
    .then((mvs)=>setMovieListComedy(mvs));
}

const[MovieListComedy,setMovieListComedy]=useState("");

useEffect(()=>{
GetMoviesComedy()
},[])

//Horror Movie Count
function GetMoviesHorror(){
  const res=fetch(`${API}/movies/Count/All?Genres=Horror`,{
    method:"GET",
        headers:{
          "content-Type":"application/json",
          "x-auth-token":localStorage.getItem('token'),
        }
  });
  res.then((data)=>data.json())
  .then((mvs)=>setMovieListHorror(mvs));
}

const[MovieListHorror,setMovieListHorror]=useState("");

useEffect(()=>{
GetMoviesHorror()
},[])

//Romance Movie Count
function GetMoviesRomance(){
  const res=fetch(`${API}/movies/Count/All?Genres=Romance`,{
    method:"GET",
        headers:{
          "content-Type":"application/json",
          "x-auth-token":localStorage.getItem('token'),
        }
  });
  res.then((data)=>data.json())
  .then((mvs)=>setMovieListRomance(mvs));
}

const[MovieListRomance,setMovieListRomance]=useState("");

useEffect(()=>{
GetMoviesRomance()
},[])

//Romance Action Count
function GetMoviesAction(){
  const res=fetch(`${API}/movies/Count/All?Genres=Action`,{
    method:"GET",
        headers:{
          "content-Type":"application/json",
          "x-auth-token":localStorage.getItem('token'),
        }
  });
  res.then((data)=>data.json())
  .then((mvs)=>setMovieListAction(mvs));
}

const[MovieListAction,setMovieListAction]=useState("");

useEffect(()=>{
GetMoviesAction()
},[])

//Romance Documentary Count
function GetMoviesDocumentary(){
  const res=fetch(`${API}/movies/Count/All?Genres=Documentary`,{
    method:"GET",
        headers:{
          "content-Type":"application/json",
          "x-auth-token":localStorage.getItem('token'),
          
        }
  });
  res.then((data)=>data.json())
  .then((mvs)=>setMovieListDocumentary(mvs));
}

const[MovieListDocumentary,setMovieListDocumentary]=useState("");

useEffect(()=>{
GetMoviesDocumentary()
},[])

  const data = [
    {name: 'Comedy', Genres: MovieListComedy,fill:"yellow",},
    {name: 'Horror', Genres:MovieListHorror,fill:"purple"},
    {name: 'Romance', Genres: MovieListRomance,fill:"red"},
    {name: 'Action', Genres: MovieListAction,fill:"blue"},
    {name: 'Documentary', Genres: MovieListDocumentary,fill:"green"}
  ];

  
  return(
    <div>
      <PieChart width={700} height={700}>
        <Pie data={data} dataKey="Genres" outerRadius={250} label="Genres"/>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
      </PieChart>
    </div>
  )
}
