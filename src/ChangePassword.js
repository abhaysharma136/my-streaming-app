import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import './ChangePassword.css';
import * as yup from 'yup';
import { useFormik } from "formik";
import { API } from "./global";
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ref } from "firebase/storage";


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
  confirmpassword:yup.string().required("please Confirm Your password")
  .min(8).oneOf([ref('password')], 'Passwords do not match'),
})

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 function ChangePassword() {
  const{email}=useParams();
  const [result,setResult]=useState();
  const UpdateAccountByEmail=(newUser)=>{
    const res=fetch(`${API}/users/updatepassword/${email}`,{
      method:"PUT",
      body:JSON.stringify(newUser),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then((data)=>data.json())
    .then((result)=>setResult(result));
  }

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{password:"",confirmpassword:""},
  validationSchema:EmailValidationSchema,
  onSubmit:(newUser,onsubmit)=>{
    delete newUser.confirmpassword;
    console.log("OnSubmit",newUser);
    UpdateAccountByEmail(newUser);
    setTimeout(()=>handleMessage(),300)
    onsubmit.resetForm();
  }
})

const [open, setOpen] = useState(false);

  const handleMessage = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="ChangePassword-container">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Password Succesfull Updated
        </Alert>
      </Snackbar>
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
