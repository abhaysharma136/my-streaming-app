import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateProfile.css';

export function CreateProfile() {
  const{id}=useParams();
  console.log(id);

  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[userName,setUserName]=useState('');
  const NameDetails={
    firstName:firstName,
    LastName:lastName,
    UserName:userName
  }
  function UpdateOtherDetails(){
    const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`,{
      method:"PUT",
      body:JSON.stringify(NameDetails),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then(()=>navigate(`/HomePage/Onstream/${id}`));
}

const navigate=useNavigate();
  return (
    <div>
      <h2 className='heading-createProfile'>Complete Your Profile</h2>
      <form className="form-createProfile">
        <div className="profilePic-createProfile">
          <div className='upload-createProfile'></div>
        </div>
        <input type="text" 
        id="firstName-createProfile"
        onChange={(event)=>setFirstName(event.target.value)}
         placeholder="First Name"></input>
        <input type="text" 
        id="LastName-createProfile"
        onChange={(event)=>setLastName(event.target.value)}
        placeholder="Last Name"></input>
        <input type="text"
        id="userName-createProfile"
        onChange={(event)=>setUserName(event.target.value)}
        placeholder="Create your User Name"></input>
        <button type='button'
        className='completeButton-createProfile'
        onClick={()=>UpdateOtherDetails()}>
          Complete Profile
        </button>
      </form>
    </div>
  );
}
