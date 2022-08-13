import { useNavigate, useParams } from "react-router-dom";
import avatar from './netflix-avatar.png';
import './NavBar.css';
import { useState } from "react";
import logo from './Onstream-Logo.svg';
export function NavBar() {
  const navigate=useNavigate();
//   function GetMovies(){
//     const res=fetch(`${API}/movies`);
//     res.then((data)=>data.json())
//     .then((mvs)=>setMovieList(mvs));
// }
// const[MovieList,setMovieList]=useState([]);

// useEffect(()=>{
// GetMovies()
// },[])
const[movie,setMovie]=useState();
const{id}=useParams();
  return (
    <div className="MenuBar">
      <ul>
        <li><img className='logo' src={logo} alt="logo"></img></li>
        <li><button className="Home-button" onClick={() => navigate(`/HomePage/Onstream/${id}`)}>Home</button></li>
        <div className='Genres-dropdown'>
          <button className='Genres-btn'>Genres</button>
          <div className='dropdown-content'>
            <button onClick={()=>navigate(`/movies/${id}/All`)}>All Movies</button>
            <button onClick={()=>navigate(`/movies/${id}/Genres/Horror`)}>Horror</button>
            <button onClick={()=>navigate(`/movies/${id}/Genres/Documentary`)}>Documentary</button>
            <button onClick={()=>navigate(`/movies/${id}/Genres/Comedy`)}>Comedy</button>
            <button onClick={()=>navigate(`/movies/${id}/Genres/Action`)}>Action</button>
            <button onClick={()=>navigate(`/movies/${id}/Genres/Romance`)}>Romance</button>
          </div>
        </div>
        <li>
          <input className="search-movie"
          placeholder="Search movie here"
          onChange={(event)=>setMovie(event.target.value)}/>
          </li>
          <li><button className="search-button" type="submit" onClick={()=>navigate(`/movies/${id}/name/${movie}`)}>🔍</button></li>
        <li className='profile-img'><div onClick={() => navigate(`/ProfilePage/Onstream/${id}`)}><img src={avatar} alt="profile pix" id="user_avatar" /></div></li>
      </ul>
    </div>
  );
}
