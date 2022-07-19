import React from 'react';
import './Courosel.css';
function Courosel() {
    const movieBanner=[
        {name:"Kashmir Files",
            banner:"https://www.mmppicture.co.in/wp-content/uploads/2022/03/The-Kashmir-Files-Poster-1-1080x608.jpg"},
    {name:"Insurgent",
        banner:"https://www.wallpaperup.com/uploads/wallpapers/2015/12/12/858314/6b2103b79949d49de68d4e7a8d10fbcd.jpg"},
    {name:"Die Hard",
        banner:"https://cdn.wallpapersafari.com/66/81/kmY4Rg.jpg"},
        {name:"Kill Bill",
    banner:"https://wallpaperaccess.com/full/1512314.jpg"
    }
];
    return (
        <div>
            <div className='slides'>
               
            {movieBanner.map((movB)=>(
                <CreateBanner movB={movB}/>
            ))}
            </div>
        </div>
    );
}

export default Courosel;

function CreateBanner({movB}){
return(
    <div className='banner-container'>
        <img src={movB.banner} alt={movB.name} className='banner1'></img>
    </div>
)
}