import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import './AdminMovies.css';
import { API } from "./global";
import { AdminAppBar } from "./AdminAppBar";
export function AdminUsersData() {

  return (
    <div>
<div className="Admin-movies-container">
  <AdminAppBar/>
      <h1>Users</h1>
      <DisplayUserData/>
    </div>
    </div>
  );
}


function DisplayUserData(){
  const columns = [
    { field: '_id', headerName: 'ID', width: 240 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'FirstName', headerName: 'First Name', width: 130 },
    { field: 'LastName', headerName: 'Last Name', width: 130 },
    {
      field: 'confirm',
      headerName: 'Account Status',
      type: 'boolean',
      width: 190,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.FirstName || ''} ${params.row.LastName || ''}`,
    },
  ];


  function GetUsers(){
    const res=fetch(`${API}/users`,{
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
  GetUsers()
  },[])

  return(
    <div>
<div style={{ height: 650, width: '100%' }}>
      <DataGrid
      getRowId={(row) => row._id}
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