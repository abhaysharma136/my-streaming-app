import React, { useEffect, useState } from "react";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {TableBody, TableCell, TableContainer } from "@mui/material";
import { API } from "./global";
import { Table } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import './AdminMovies.css';
import { AdminAppBar } from "./AdminAppBar";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
// function createData(_id,id,name,Language, rating, Genres) {
//   return { _id, id, name, Language, rating,Genres };
//  }
 
export function AdminMovies() {

  return (
    <div className="Admin-movies-container">
      <AdminAppBar/>
      <h1>Movies</h1>
      <DisplayAdminmovies/>
    </div>
  );
}



function DisplayAdminmovies(){
const navigate=useNavigate();
  // const handleClick = (event, cellValues) => {
  //   console.log(cellValues.row);
  // };
const deleteMovie=(id)=>{
  fetch(`${API}/movies/${id}`,{
    method:"DELETE",
  })
}
const[data,setData]=useState([]);
function GetMovies(){
  const res=fetch(`${API}/movies`,{
    method:"GET",
        headers:{
          "content-Type":"application/json",
          "x-auth-token":localStorage.getItem('token'),
        }
  });
  res.then((data)=>data.json())
  .then((mvs)=>setData(mvs));
}


useEffect(()=>{
GetMovies()
},[])
const {id}=useParams();



  return(
    <div>
      <TableContainer component={Paper}>
     <Table aria-label="simple table"  className="movie-table">
       <TableHead>
         <TableRow>
           <TableCell>Name</TableCell>
           <TableCell align="left">_id</TableCell>
           <TableCell align="right">id</TableCell>
           <TableCell align="right">Language</TableCell>
           <TableCell align="right">Rating</TableCell>
           <TableCell align="right">Genres</TableCell>
           <TableCell align="right">Delete</TableCell>
           <TableCell align="right">Edit</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.map((row) => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.name}
             </TableCell>
             <TableCell align="right">{row._id}</TableCell>
             <TableCell align="right">{row.id}</TableCell>
             <TableCell align="left">{row.Language}</TableCell>
             <TableCell align="left">{row.rating}</TableCell>
             <TableCell align="right">{row.Genres}</TableCell>
             <TableCell align="right"><IconButton color="primary" onClick={()=>deleteMovie(row._id)}><DeleteIcon/></IconButton></TableCell>
             <TableCell align="right"><IconButton  color="primary" onClick={()=>navigate(`/Onstream/${id}/editmovie/${row._id}`)}><EditIcon/></IconButton></TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
    </div>
  )
}