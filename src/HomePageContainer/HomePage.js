import './HomePage.css';
import avatar from './netflix-avatar.png'
import { Link, useNavigate, useParams} from 'react-router-dom';
import Courosel from './Courosel';
import { useEffect, useState } from 'react';
import { API } from '../global.js';

export function HomePage() {
     function GetMovies(){
        const res=fetch(`${API}/movies`);
        res.then((data)=>data.json())
        .then((mvs)=>setMovieList(mvs));
    }
  const[MovieList,setMovieList]=useState([]);

  useEffect(()=>{
    GetMovies()
  },[])

  function GetComedyMovies(){
    const res=fetch(`${API}/movies?Genres=Comedy`);
    res.then((data)=>data.json())
    .then((mvs)=>setComedyMovieList(mvs));
}
const[ComedyMovieList,setComedyMovieList]=useState([]);

useEffect(()=>{
GetComedyMovies()
},[])

function GetHorrorMovies(){
  const res=fetch(`${API}/movies?Genres=Horror`);
  res.then((data)=>data.json())
  .then((mvs)=>setHorrorMovieList(mvs));
}
const[HorrorMovieList,setHorrorMovieList]=useState([]);

useEffect(()=>{
GetHorrorMovies()
},[])

function GetRomanceMovies(){
  const res=fetch(`${API}/movies?Genres=Romance`);
  res.then((data)=>data.json())
  .then((mvs)=>setRomanceMovieList(mvs));
}
const[RomanceMovieList,setRomanceMovieList]=useState([]);

useEffect(()=>{
GetRomanceMovies()
},[])

function GetDocumentaryMovies(){
  const res=fetch(`${API}/movies?Genres=Documentary`);
  res.then((data)=>data.json())
  .then((mvs)=>setDocumentaryMovieList(mvs));
}
const[DocumentaryMovieList,setDocumentaryMovieList]=useState([]);

useEffect(()=>{
GetDocumentaryMovies()
},[])
  const{id}=useParams();
    const navigate=useNavigate();
  return (
    <div className="homePage-container">
      <div className="navbar-homePage">
        <ul>
          <li><Link to="/"></Link>ONSTream</li>
          <li><div onClick={()=>navigate(`/ProfilePage/Onstream/${id}`)}><img src={avatar} alt="profile pix" id="user_avatar" /></div></li>
        </ul>
      </div>

      <Courosel/>
      <div>
      <div className="row">
        <h2>ONStream Orignals</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie._id} id={movie._id}/>
      ))}
        </div>
      </div>
    </div>
      

      <div className="row">
        <h2>Trending Now</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie._id} id={movie._id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Action Movies</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie._id} id={movie._id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Comedy Movies</h2>
        <div className="row_posters">
        {ComedyMovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie._id} id={movie._id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Horror Movies</h2>
        <div className="row_posters">
        {HorrorMovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie._id} id={movie._id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Romance Movies</h2>
        <div className="row_posters">
        {RomanceMovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie._id} id={movie._id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Documentaries</h2>
        <div className="row_posters">
        {DocumentaryMovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie._id} id={movie._id}/>
      ))}
        </div>
      </div>
    </div>
  );
}


function DisplayMovies({movie,id}){
  const navigate=useNavigate();
  return(
    <>
        <img src={movie.poster} alt={movie.name} className="row_posterLarge row_poster" onClick={()=>navigate(`/movie/${id}`)} />
    </>
  )
}




