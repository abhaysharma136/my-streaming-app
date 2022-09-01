import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminAppBar } from "./AdminAppBar";
import { EditDetailsForm } from "./EditProfile";
import { API } from "./global";
import './EditAdminProfile.css';


export function EditAdminProfile() {

  const {id}=useParams();
  console.log(id);


const[userDetails,setUserDetails]=useState();
const GetUserDetails=()=>{
  const res=fetch(`${API}/users/${id}`,{
    method:"GET",
  });
  res.then((data)=>data.json())
  .then((user)=>setUserDetails(user));
}

useEffect(()=> GetUserDetails(),[]);


  return (
    <div className="EditAdminProfile-container">
      <AdminAppBar/>
      {userDetails?<EditDetailsForm userDetails={userDetails}/>:".....Loading"}
    </div>
  );
}
