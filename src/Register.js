import './Register.css'
import { Header } from "./Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as yup from 'yup';


const PasswordValidationSchema=yup.object({
  password:yup.string().min(8).matches().required()
})

export function Register() {
  const navigate=useNavigate();
  const{id}=useParams();
  console.log(id)

  const [email,setEmail]=useState('');
  
// const [password,setPassword]=useState('');

  function GetEmail(){
    const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`);
    res.then((data)=>data.json())
    .then((eml)=>setEmail(eml.email));
}
useEffect(()=>{
    GetEmail()
  },)
  console.log(email);
  // const newUserUpdatedData={
  //   password: password
  // }
  function UpdatePassword(newUserUpdatedData){
    const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`,{
      method:"PUT",
      body:JSON.stringify(newUserUpdatedData),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then(()=>navigate(`/Create-Profile/${id}`));
}

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{password:""},
  validationSchema:PasswordValidationSchema,
  onSubmit:(newUserUpdatedData)=>{
    console.log("OnSubmit",newUserUpdatedData);
    UpdatePassword(newUserUpdatedData)
  }
})
  return (
    <div className="RegisterPage-container">
    <Header/>
    <div id="component-main-elements">
        <h1>Create a password to start your membership</h1>
        <h3>Just a few more steps and you're done!
            We hate paperwork, too.</h3>
            <form id="myForm-registerPage" onSubmit={handleSubmit}>
            <input type="email" 
            id="email-id-registerPage" 
            placeholder="Email" 
            name='email'
            value={email}
            ></input>
            <br></br>
            <input type="password" 
            id="user-password-registerPage" 
            placeholder="Add a Password" 
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            ></input>
            {touched.password && errors.password?errors.password:""}
            {/* <p id="password-alert-registerPage"></p> */}
            <br/>
                <button type='submit' id="Next-button-registerPage" >Register</button>
            </form>
            
    </div>
</div>
  );

}
