import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AdminAppBar } from "./AdminAppBar";
import './AdminMovies.css';
import { API } from "./global";
// import EditIcon from '@mui/icons-material/Edit';
import { Button } from "bootstrap";

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

  // const handleClick = (event, cellValues) => {
  //   console.log(cellValues.row);
  // };
  
  const columns = [
    { field: '_id', headerName: '_ID', width: 210 },
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Title', width: 130 },
    { field: 'poster', headerName: 'Poster', width: 130 },
    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      width: 90,
    },
    { field: 'summary', headerName: 'Summary', width: 130 },
    {
      field: 'trailer',
      headerName: 'Movie',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    { field: 'director', headerName: 'Director', width: 130 ,type:"string",editable:true },
    { field: 'Cast', headerName: 'Cast', width: 130 },
    { field: 'Year', headerName: 'Year', width: 60 },
    { field: 'Language', headerName: 'language', width: 90 },
    { field: 'time', headerName: 'Run Time', width: 70 },
    { field: 'Genres', headerName: 'Genre', width: 90 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width:100,
      renderCell:(cellValues)=>{
        return (<div
          onClick={(event)=>{
            console.log(cellValues.row);
          }}>
            Edit
        </div>)
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width:100,
      renderCell:(cellValues)=>{
        return (<div
          onClick={(event)=>{
            console.log(cellValues.row);
          }}>
            Delete
        </div>)
      }
    },
  ];

  function GetMovies(){
    const res=fetch(`${API}/movies`,{
      method:"GET",
          headers:{
            "content-Type":"application/json",
            "x-auth-token":localStorage.getItem('token'),
          }
    });
    res.then((data)=>data.json())
    .then((mvs)=>setRows(mvs));
}
const[rows,setRows]=useState([]);

useEffect(()=>{
GetMovies()
},[])


  return(
    <div>
      <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        
      />
    </div>
    </div>
  )
}