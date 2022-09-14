import React, { useEffect, useState } from "react";
import './AdminMovies.css';
import { API } from "./global";
import { AdminAppBar } from "./AdminAppBar";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {TableBody, TableCell, TableContainer } from "@mui/material";
import { Table } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from "react-router-dom";


export function AdminBanners() {
  function GetBanners(){
    const res=fetch(`${API}/banners`,{
      method:"GET",
          headers:{
            "content-Type":"application/json",
            "x-auth-token":localStorage.getItem('token'),
          }
    });
    res.then((data)=>data.json())
    .then((mvs)=>setData(mvs));
}
const[data,setData]=useState([]);
useEffect(()=>{
  GetBanners()
  },[])
  return (
    <div>
<div className="Admin-movies-container">
  <AdminAppBar/>
      <h1>Banners</h1>
      <DisplayBanners data={data} />

    </div>
    </div>
  );
}


function DisplayBanners({data}){
  const navigate=useNavigate()
  const deleteBanner=(id)=>{
    fetch(`${API}/banners/${id}`,{
      method:"DELETE",
    })
  }

  
  const {id}=useParams();
  return(
    <div>
<TableContainer component={Paper}>
     <Table aria-label="simple table"  className="movie-table">
       <TableHead>
         <TableRow>
           <TableCell>Name</TableCell>
           <TableCell align="left">_id</TableCell>
           <TableCell align="left">Banner</TableCell>
           <TableCell align="right">Delete</TableCell>
           <TableCell align="right">Edit</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.map((row) => (
           <TableRow key={row._id}>
             <TableCell component="th" scope="row">
               {row.name}
             </TableCell>
             <TableCell align="right">{row._id}</TableCell>
             <TableCell align="left">{row.banner}</TableCell>
             <TableCell align="right"><IconButton color="primary" onClick={()=>deleteBanner()}><DeleteIcon/></IconButton></TableCell>
             <TableCell align="right"><IconButton  color="primary" onClick={()=>navigate(`/Onstream/${id}/editbanner/${row._id}`)}><EditIcon/></IconButton></TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
    </div>
  );
}
