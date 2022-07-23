import './Register.css'
import { Header } from "./Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
export function Register() {
  const navigate=useNavigate();
  const{id}=useParams();
  console.log(id)
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');

  function GetEmail(){
    const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`);
    res.then((data)=>data.json())
    .then((eml)=>setEmail(eml.email));
}
useEffect(()=>{
    GetEmail()
  },)

  const newUserUpdatedData={
    password: password
  }
  function UpdatePassword(){
    const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`,{
      method:"PUT",
      body:JSON.stringify(newUserUpdatedData),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then(()=>navigate(`/Create-Profile/${id}`));
}

  return (
    <div className="RegisterPage-container">
    <Header/>
    <div id="component-main-elements">
        <h1>Create a password to start your membership</h1>
        <h3>Just a few more steps and you're done!
            We hate paperwork, too.</h3>
            <form id="myForm-registerPage">
            <input type="email" 
            id="email-id-registerPage" 
            placeholder="Email" 
            value={email}
            required></input>
            <br></br>
            <input type="password" 
            id="user-password-registerPage" 
            placeholder="Add a Password" 
            onChange={(event)=>setPassword(event.target.value)}
            required minlength="8"></input>
            <p id="password-alert-registerPage"></p>
            <br></br>
                <button type='button' id="Next-button-registerPage" onClick={()=>UpdatePassword()} >Register</button>
            </form>
            
    </div>
</div>
  );

}
