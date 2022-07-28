import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateProfile.css';
import { useFormik } from "formik";
import * as yup from 'yup';


const DetailsValidationSchema=yup.object({
  firstName:yup.string().required(),
  LastName:yup.string().required(),
  UserName:yup.string().required(),
})

export function CreateProfile() {
  const{id}=useParams();
  console.log(id);

  // const[firstName,setFirstName]=useState('');
  // const[lastName,setLastName]=useState('');
  // const[userName,setUserName]=useState('');
  // const NameDetails={
  //   firstName:firstName,
  //   LastName:lastName,
  //   UserName:userName
  // }
  function UpdateOtherDetails(NameDetails){
    const res=fetch(`https://627dfcd0b75a25d3f3af4996.mockapi.io/OnStreamUserData/${id}`,{
      method:"PUT",
      body:JSON.stringify(NameDetails),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then(()=>navigate(`/HomePage/Onstream/${id}`));
}

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{firstName:"",LastName:"",UserName:""},
  validationSchema:DetailsValidationSchema,
  onSubmit:(NameDetails)=>{
    console.log("OnSubmit",NameDetails);
    UpdateOtherDetails(NameDetails)
  }
})
const navigate=useNavigate();
  return (
    <div>
      <h2 className='heading-createProfile'>Complete Your Profile</h2>
      <form className="form-createProfile" onSubmit={handleSubmit}>
        <div className="profilePic-createProfile">
          <div className='upload-createProfile'></div>
        </div>
        <input type="text" 
        id="firstName-createProfile"
        name='firstName'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
         placeholder="First Name"></input>
         {touched.firstName && errors.firstName?errors.firstName:""}
        <input type="text" 
        id="LastName-createProfile"
        name='LastName'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.LastName}
        placeholder="Last Name"></input>
        {touched.LastName && errors.LastName?errors.LastName:""}
        <input type="text"
        id="userName-createProfile"
        name='UserName'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.UserName}
        placeholder="Create your User Name"></input>
        {touched.UserName && errors.UserName?errors.UserName:""}
        <button type='submit'
        className='completeButton-createProfile'>
          Complete Profile
        </button>
      </form>
    </div>
  );
}
