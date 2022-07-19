import './HomePage.css';
import avatar from './netflix-avatar.png'
import { Link, useNavigate} from 'react-router-dom';
import Courosel from './Courosel';
import { useEffect, useState } from 'react';

export function HomePage() {
     function GetMovies(){
        const res=fetch('https://627dfcd0b75a25d3f3af4996.mockapi.io/movies');
        res.then((data)=>data.json())
        .then((mvs)=>setMovieList(mvs));
    }
  const[MovieList,setMovieList]=useState([]);

  useEffect(()=>{
    GetMovies()
  },[])

    
  return (
    <div className="homePage-container">
      <div className="navbar-homePage">
        <ul>
          <li><Link to="/"></Link>ONSTream</li>
          <li><Link to="/ProfilePage/Onstream"><img src={avatar} alt="profile pix" id="user_avatar" /></Link></li>
        </ul>
      </div>

      <Courosel/>
      <div>
      <div className="row">
        <h2>ONStream Orignals</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie.id} id={movie.id}/>
      ))}
        </div>
      </div>
    </div>
      

      <div className="row">
        <h2>Trending Now</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie.id} id={movie.id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Action Movies</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie.id} id={movie.id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Comedy Movies</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie.id} id={movie.id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Horror Movies</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie.id} id={movie.id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Romance Movies</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie.id} id={movie.id}/>
      ))}
        </div>
      </div>


      <div className="row">
        <h2>Documentaries</h2>
        <div className="row_posters">
        {MovieList.map((movie)=>(
        <DisplayMovies movie={movie} key={movie.id} id={movie.id}/>
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




