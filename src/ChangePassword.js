import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import './ChangePassword.css';
import * as yup from 'yup';
import { useFormik } from "formik";
import { API } from "./global";
import { useParams } from "react-router-dom";



export function DisplayPasswordForm(){
  const[userConfirmation,setUserConfirmation]=useState({});
  const {token}=useParams();
  const GetConfirmationResonse=()=>{
    const res=fetch(`${API}/email/verify/${token}`,{
      method:"GET",
    });
    res.then((data)=>data.json())
    .then((user)=>setUserConfirmation(user));
}
console.log(userConfirmation)
useEffect(()=> GetConfirmationResonse(),[]);


  return(
    <div>
      {userConfirmation.message==="Email verified successfully"?<ChangePassword/>:"Email verification failed, possibly the link is invalid or expired"}
    </div>

  )
}


const EmailValidationSchema=yup.object({
  password:yup.string().required().min(8),
  confirmpassword:yup.string().required().min(8).oneOf([yup.ref('password'), null], 'Passwords must match'),
})
 function ChangePassword() {
  const{email}=useParams();
  const UpdateAccountByEmail=(newUser)=>{
    const res=fetch(`${API}/users/updatepassword/${email}`,{
      method:"PUT",
      body:JSON.stringify(newUser),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then((data)=>data.json());
  }

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{password:"",confirmpassword:""},
  validationSchema:EmailValidationSchema,
  onSubmit:(newUser)=>{
    delete newUser.confirmpassword;
    console.log("OnSubmit",newUser);
    UpdateAccountByEmail(newUser);
    
  }
})
  return (
    <div className="ChangePassword-container">
      <h1>Reset your Password?</h1>
      <form onSubmit={handleSubmit}>
        {/* <p>{UserStatus.message}</p> */}
      <TextField
        name="password"
        id="outlined-basic"
        label="password"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        error={touched.password && errors.password}
        helperText={touched.password && errors.password?errors.password:""}
        />

<TextField
        name="confirmpassword"
        id="outlined-basic"
        label="Confirm password"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.confirmpassword}
        error={touched.confirmpassword && errors.confirmpassword}
        helperText={touched.confirmpassword && errors.confirmpassword?errors.confirmpassword:""}
        />

        <Button type="submit" variant="outlined" className="reset-password-button">Reset</Button>
        </form>
    </div>
  );
}
