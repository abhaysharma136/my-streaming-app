import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import './VerifyYourEmail.css';
import Button from '@mui/material/Button';
import { Header } from "./Header";
import * as yup from 'yup';
import { useFormik } from "formik";
import { API } from './global';


const EmailValidationSchema=yup.object({
  email:yup.string().email().required(),
})
export function VerifyYourEmail() {

const [UserStatus,setUserStatus]=useState("");
  function VerifyUserStatus(newUser){
    const res=fetch(`${API}/users/verfyaccountstatus`,{
      method:"POST",
      body:JSON.stringify(newUser),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then((result1)=>result1.json()).then((user)=>setUserStatus(user));
}

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{email:"",},
  validationSchema:EmailValidationSchema,
  onSubmit:(newUser)=>{
    // console.log("OnSubmit",newUser);
    VerifyUserStatus(newUser);
    
  }
})

function sentRegistrationEmail(newUser){
  fetch(`${API}/email/RegisterConfirmation`,{
    method:"POST",
    body:JSON.stringify(newUser),
    headers:{
      "content-Type":"application/json"
    }
  });
  // res.then((result)=>result.json()).then((user)=>setResult(user));
}

if(UserStatus.message==="email Sent"){
sentRegistrationEmail(values)
}
  return (
    <div className="VerifyEmail-container">
      <Header/>
      <h1>Not Able to Login?</h1>
      <form onSubmit={handleSubmit}>
        <p>{UserStatus.message}</p>
      <TextField
        name="email"
        id="outlined-basic"
        label="Verify your Email"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && errors.email}
        helperText={touched.email && errors.email?errors.email:""}/>

<Button type="submit" variant="outlined" className="verify-email-button">verify</Button>
      </form>
      
    </div>
  );
}
