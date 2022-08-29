import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "./global";
import './AccountConfirmation.css';

export function AccountConfirmation() {
  const[userConfirmation,setUserConfirmation]=useState({});
  const {token}=useParams();
  const {email}=useParams();
  const GetConfirmationResonse=()=>{
    const res=fetch(`${API}/email/verify/${token}`,{
      method:"GET",
    });
    res.then((data)=>data.json())
    .then((user)=>setUserConfirmation(user));
}
console.log(userConfirmation)
useEffect(()=> GetConfirmationResonse(),[]);


const ConfirmStatus={
  confirm:true,
 }
const UpdateAccountByEmail=()=>{
  const res=fetch(`${API}/users/ConfirmAccount/${email}`,{
    method:"PUT",
    body:JSON.stringify(ConfirmStatus),
    headers:{
      "content-Type":"application/json"
    }
  });
  res.then((data)=>data.json());
}

if(userConfirmation.message==="Email verified successfully"){
  UpdateAccountByEmail();
}

  return (
    <div className="Confirmation-response">
      <h1>{userConfirmation.message}</h1>
    </div>
  );
}
