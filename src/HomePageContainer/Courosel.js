import React, { useEffect, useState } from 'react';
import './Courosel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../global';
function Courosel() {
   
        function Getbanners(){
            const res=fetch(`${API}/banners`,{
              method:"GET",
                  headers:{
                    "content-Type":"application/json",
                    "x-auth-token":localStorage.getItem('token'),
                  }
            });
            res.then((data)=>data.json())
            .then((mvs)=>setMovieBanners(mvs));
        }
        
      const[movieBanner,setMovieBanners]=useState([]);
    
      useEffect(()=>{
        Getbanners()
      },[])
        const navigate=useNavigate();
    const{id}=useParams();
    return (
        <div className='courosal-top'>
           
            <Carousel autoPlay	infiniteLoop interval="5000" showThumbs={false} width="100%">
            {movieBanner.map((movB)=>(
                <div onClick={()=>navigate(`/movie/${id}/${movB._id}`)} className="courisal-image-div">
                <CreateBanner movB={movB} key={movB.id}/>
                </div> 
            ))}
            
            </Carousel>
        
        </div>
    );
}

export default Courosel;

function CreateBanner({movB}){
  
return(
    <div className='banner-container'>
        <img src={movB.banner} alt={movB.name} className='banner1' />
    </div>
)
}