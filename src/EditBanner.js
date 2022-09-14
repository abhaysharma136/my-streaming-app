import React, { useEffect, useState } from "react";
import './EditBanner.css';
import { AdminAppBar } from "./AdminAppBar";
import TextField from '@mui/material/TextField';
import { API } from "./global";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';


export function EditBanner() {
  const {bannerId}=useParams();
  console.log(bannerId);

  const[bannerDetails,setBannerDetails]=useState();
const GetBannerDetails=()=>{
  const res=fetch(`${API}/banners/${bannerId}`,{
    method:"GET",
  });
  res.then((data)=>data.json())
  .then((mv)=>setBannerDetails(mv));
}

useEffect(()=> GetBannerDetails(),[]);
  return (
    <div>
<AdminAppBar/>
      {bannerDetails?<DisplayEditBannerForm bannerDetails={bannerDetails}/>:".....Loading"}
    </div>
  );
}

function DisplayEditBannerForm({bannerDetails}){
  const[id,setId]=useState(bannerDetails._id);
  const[name,setName]=useState(bannerDetails.name);
  const[banner,setbanner]=useState(bannerDetails.banner);
  console.log(bannerDetails.banner);
    
  
  const navigate=useNavigate();
  const editBanner = () => {
    const updatedBanner = {
      name: name,
      id: id,
      banner:banner,
    };
    
    
      const res=fetch(`${API}/banners/${bannerDetails._id}`,{
        method:"PUT",
        body:JSON.stringify(updatedBanner),
        headers:{
          "content-Type":"application/json"
        }
      });
      res.then((result)=>result.json()).then(()=>navigate(-1));
    
  }
    
    
    return(
      <div className="Edit-Banner-container">
        <h1 className="edit-movie-heading">Edit Banner</h1>
     <form>
  
     
  
     <TextField type="text"
      label="Id"
      id="id" 
      variant="outlined" 
      value={bannerDetails._id}
      onChange={(event) => setId(event.target.value)}/>
      
      <TextField type="text"
      label="banner"
      id="movie-banner" 
      variant="outlined" 
      value={banner}
      onChange={(event) => setbanner(event.target.value)}/>
  
      
      <TextField 
      type="text" 
      label="Movie Title" 
      id="name" 
      variant="outlined"
      value={name}
      onChange={(event)=>setName(event.target.value)}/>
      
  
      
  <Button variant="outlined" onClick={()=>editBanner()}>Save Changes</Button>
      </form>   
      </div>
    )
  }