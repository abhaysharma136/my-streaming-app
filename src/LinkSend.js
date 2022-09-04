import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API } from './global';
import './LinkSend.css';
export function LinkSend() {
  const{email}=useParams();

const emaildata={
  email:email
}
  function SendEmail(emaildata){
    fetch(`${API}/email/sent`,{
      method:"POST",
      body:JSON.stringify(emaildata),
      headers:{
        "content-Type":"application/json"
      }
    });
}
useEffect(()=>{
  SendEmail(emaildata)
},[])
  return (
    <div className='email-screen-container'>
      <div className='emailTextContainer'>
      <p>Email reset link has been sent to the registered email <span className='email-param'>{email}</span></p>
      <p>The Link will expire in 10 minutes.</p>
    </div>
    </div>
    
  );
}
