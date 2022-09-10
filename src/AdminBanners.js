import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import './AdminMovies.css';
import { API } from "./global";
import { AdminAppBar } from "./AdminAppBar";
export function AdminBanners() {

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
    { field: 'name', headerName: 'Name', width: 240 },
    { field: 'banner', headerName: 'Banner', width: 130 },
  ];


  function GetBanners(){
    const res=fetch(`${API}/banners`,{
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
  GetBanners()
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
  );
}
