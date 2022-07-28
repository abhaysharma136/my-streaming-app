import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProfilePage.css'


export function ProfilePage() {

  
  const{id}=useParams();
  console.log(id);
  const[userDetails,setUserDetails]=useState(null);

  const GetUserDetails=()=>{
    const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`,{
      method:"GET",
    });
    res.then((data)=>data.json())
    .then((user)=>setUserDetails(user));
}

useEffect(()=> GetUserDetails(),[]);
  
  return (
    <div>
      {userDetails?<DisplayUserData userDetails={userDetails} />:"....Loading"}
    </div>
   
  );
}


function DisplayUserData({userDetails,id}){
  const navigate=useNavigate();


  const[firstName,setFirstName]=useState(userDetails.firstName);
const[lastName,setLastName]=useState(userDetails.LastName);
const[userName,setUserName]=useState(userDetails.UserName);

const updatedData={
  firstName:firstName,
  LastName:lastName,
  UserName:userName
};
  return(
  <div className="profilePage-container">
  <div className='form-container-profilePage'>
  <form className="form-profilePage">
    <div className="profilePic-profilePage">
    <img  className="profile-pic" alt='profile-pic'></img>
      <div className='upload-profilePage'></div>
    </div>
    <input type="text"
     id="userName-profilePage"
     value={userName}
     onChange={(event)=>setUserName(event.target.value)}
      placeholder="User Name" required></input>

    <input type="text"
     id="firstName-profilePage"
     value={firstName}
     onChange={(event)=>setFirstName(event.target.value)}
      placeholder="First Name" required></input>

    <input type="text"
     id="LastName-profilePage"
     value={lastName}
     onChange={(event)=>setLastName(event.target.value)}
      placeholder="Last Name" required></input>

    <input type="email"
     id="Email-profilePage"
     value={userDetails.email}
      placeholder="Email"></input>

    <button type='submit'
    className='saveButton-profilePage'
    
     onClick={()=>{
      const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`,{
    method:"PUT",
    body:JSON.stringify(updatedData),
    headers:{"content-type":"application/json"},
  })
  res.then(()=>navigate(`/HomePage/Onstream/${id}`))
     }}>Save Changes</button>
  </form>
  </div>
  
</div>)
}