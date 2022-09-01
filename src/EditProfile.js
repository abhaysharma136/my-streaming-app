import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";
import './EditProfile.css';
import { NavBar } from "./NavBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";


export function EditProfile() {
  
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
    <div className="top-container">
      <NavBar/>
      {userDetails?<EditDetailsForm userDetails={userDetails}/>:".....Loading"}
    </div>
  );
}


export function EditDetailsForm({userDetails,id}){
  const navigate=useNavigate();
 const [fname,setFName]=useState(userDetails.FirstName);
 const [lname,setLName]=useState(userDetails.LastName);

 const editUser={
  FirstName:fname,
  LastName:lname,
 }
 function CreateUser(editUser){
  const res=fetch(`${API}/users/${userDetails._id}`,{
    method:"PUT",
    body:JSON.stringify(editUser),
    headers:{
      "content-Type":"application/json"
    }
  });
  res.then((result)=>result.json()).then(()=>navigate(-1));
}


console.log(editUser);

  return(
<div className="Edit-container">
        
        <form id="myForm-EditProfile">
        <h1>Edit Profile here</h1>
          <TextField required 
            id="FirstName-EditProfile"
            label="First Name"
            name='FirstName'
            variant="outlined"
            value={fname}
            onChange={(event)=>setFName(event.target.value)}
            
            
          />
          
          <TextField required 
            id="LastName-EditProfile"
            label="Last Name"
            name='LastName'
            variant="outlined"
            value={lname}
            onChange={(event)=>setLName(event.target.value)}
            
          />
          
          <Button type="submit"
          variant="outlined"
           color="success"
          onClick={() => {
            CreateUser(editUser)
          }}>Save Changes</Button>
        </form>
      </div>
  )
}