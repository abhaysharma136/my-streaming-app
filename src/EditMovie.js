import React, { useEffect, useState } from "react";
import './EditMovie.css';
import { AdminAppBar } from "./AdminAppBar";
import TextField from '@mui/material/TextField';
import { API } from "./global";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { InputLabel, MenuItem, Select } from "@mui/material";

export function EditMovie() {
const {movieId}=useParams();

  const[movieDetails,setMovieDetails]=useState();
const GetMovieDetails=()=>{
  const res=fetch(`${API}/movies/${movieId}`,{
    method:"GET",
  });
  res.then((data)=>data.json())
  .then((mv)=>setMovieDetails(mv));
}

useEffect(()=> GetMovieDetails(),[]);


  return (
    <div>
      <AdminAppBar/>
      {movieDetails?<DisplayEditMovieForm movieDetails={movieDetails}/>:".....Loading"}
    </div>
  );
}


function DisplayEditMovieForm({movieDetails}){
const[id,setId]=useState(movieDetails.id);
const[name,setName]=useState(movieDetails.name);
const[director,setDirector]=useState(movieDetails.director);
const[cast,setCast]=useState(movieDetails.Cast);
const[year,setYear]=useState(movieDetails.Year);
const[language,setLanguage]=useState(movieDetails.Language);
const[time,setTime]=useState(movieDetails.time);
const[genres,setGenres]=useState(movieDetails.Genres);
const[rating,setRating]=useState(movieDetails.rating);
const[summary,setSummary]=useState(movieDetails.summary);
const[poster,setPoster]=useState(movieDetails.poster);
const[trailer,setTrailer]=useState(movieDetails.trailer);
  

const navigate=useNavigate();
const editMovie = () => {
  const updatedMovie = {
    name: name,
    id: id,
    director:director,
    Cast: cast,
    Year: year,
    Language:language,
    time:time,
    Genres:genres,
    rating:rating,
    summary:summary,
    poster:poster,
    trailer:trailer
  };
  
  
    const res=fetch(`${API}/movies/${movieDetails._id}`,{
      method:"PUT",
      body:JSON.stringify(updatedMovie),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then((result)=>result.json()).then(()=>navigate(-1));
  
}
  
  
  return(
    <div className="Edit-Movie-container">
      <h1 className="edit-movie-heading">Edit Movie</h1>
   <form>

   

   <TextField type="text"
    label="Id"
    id="id" 
    variant="outlined" 
    value={movieDetails._id}
    disabled/>
    
    <TextField type="text"
    label="poster"
    id="movie-poster" 
    variant="outlined" 
    value={poster}
    onChange={(event) => setPoster(event.target.value)}/>

    <TextField type="number"
    label="Movie Id"
    id="movie-id" 
    variant="outlined" 
    value={id}
    onChange={(event) => setId(event.target.value)}/>
    <TextField 
    type="text" 
    label="Movie Title" 
    id="name" 
    variant="outlined"
    value={name}
    onChange={(event)=>setName(event.target.value)}/>
    <TextField 
    type="text" 
    label="Director" 
    id="director" 
    variant="outlined"
    value={director}
    onChange={(event)=>setDirector(event.target.value)}/>
    <TextField 
    type="text" 
    label="Cast" 
    id="cast" 
    variant="outlined"
    value={cast}
    onChange={(event)=>setCast(event.target.value)}/>
    <TextField
    type="number"
    label="year" 
    id="year" 
    variant="outlined"
    value={year}
    onChange={(event)=>setYear(event.target.value)}/>
    <TextField 
    type="text" 
    label="language" 
    id="language" 
    variant="outlined"
    value={language}
    onChange={(event)=>setLanguage(event.target.value)}/>
    <TextField 
    type="text" 
    label="Run Time" 
    id="runtime" 
    variant="outlined"
    value={time}
    onChange={(event)=>setTime(event.target.value)}/>

    <div className="rating-genre-container">
      <div>
        <FormControl>
      <InputLabel id='movie-Genre' >Genres</InputLabel>
<Select 
id='movie-Genre' 
variant="outlined"
name='Genres' 
label='Genres' 
defaultValue=""
value={genres}
onChange={(event)=>setGenres(event.target.value)}>
  <MenuItem value="Comedy">Comedy</MenuItem>
  <MenuItem value="Horror">Horror</MenuItem>
  <MenuItem value="Action">Action</MenuItem>
  <MenuItem value="Documentary">Documentary</MenuItem>
  <MenuItem value="Romance">Romance</MenuItem>
</Select>
</FormControl>
      </div>
<div>
<TextField 
    type="number" 
    label="rating" 
    id="rating" 
    variant="outlined"
    value={rating}
    onChange={(event)=>setRating(event.target.value)}/>
</div>
    </div>
    <TextField 
id='add-movie-summary' 
name='summary' 
multiline
label="Summary"
rows={4}  
value={summary}
onChange={(event)=>setSummary(event.target.value)} />

<TextField type="text"
    label="trailer"
    id="movie-trailer" 
    variant="outlined" 
    value={trailer}
    onChange={(event) => setTrailer(event.target.value)}/>

    
<Button variant="outlined" onClick={()=>editMovie()}>Save Changes</Button>
    </form>   
    </div>
  )
}

