import './Register.css'
import { Header } from "./Header";
import { useNavigate } from 'react-router-dom';
import { API } from './global.js';
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useState } from 'react';



const PasswordValidationSchema=yup.object({
  email:yup.string().email().required(),
  password:yup.string().min(8).matches().required(),
  FirstName:yup.string().required(),
  LastName:yup.string().required()
})

export function Register() {
  const navigate=useNavigate();
  const[result,setResult]=useState("");
  console.log(result);
  const verify=()=>{
    if(result.message==='Email Sent to registered Email'){
      console.log("Sending Email to Register");
      console.log(values.email);

      sentRegistrationEmail(values);
      navigate(`/login-page`)
    }
  }
  setTimeout(verify,1000);
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

  function CreateUser(newUser){
    const res=fetch(`${API}/users/signup`,{
      method:"POST",
      body:JSON.stringify(newUser),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then((result)=>result.json()).then((user)=>setResult(user));
}

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{FirstName:"",LastName:"",email:"",password:""},
  validationSchema:PasswordValidationSchema,
  onSubmit:(newUser)=>{
    console.log("OnSubmit",newUser);
    CreateUser(newUser)
  }
})
const styles={
  color:result.message==='email allready exists'?"red":"green",
}
  return (
    <div className="RegisterPage-container">
    <Header/>
    <div id="component-main-elements">
        <h1>Create your account to start your membership</h1>
            <form id="myForm-registerPage" onSubmit={handleSubmit}>
              <p style={styles}>{result.message}</p>
            <TextField type="text" 
            id="FirstName-registerPage" 
            placeholder="First Name" 
            name='FirstName'
            value={values.FirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.FirstName && errors.FirstName}
            helperText={touched.FirstName && errors.FirstName?errors.FirstName:""}
            ></TextField>
            <br></br>
            <TextField type="text" 
            id="LastName-registerPage" 
            placeholder="Last Name" 
            name='LastName'
            value={values.LastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.LastName && errors.LastName}
            helperText={touched.LastName && errors.LastName?errors.LastName:""}
            ></TextField>
            
            <TextField type="email" 
            id="email-id-registerPage" 
            placeholder="Email" 
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email?errors.email:""}
            ></TextField>
            
            <br></br>
            <TextField type="password" 
            id="user-password-registerPage" 
            placeholder="Add a Password" 
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password?errors.password:""}
            ></TextField>
            
            <br/>
                <button type='submit' id="Next-button-registerPage" >Register</button>
            </form>
            
    </div>
</div>
  );

}
