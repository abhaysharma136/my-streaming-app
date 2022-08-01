import './Register.css'
import { Header } from "./Header";
import { useNavigate } from 'react-router-dom';
import { API } from './global.js';
import { useFormik } from "formik";
import * as yup from 'yup';


const PasswordValidationSchema=yup.object({
  email:yup.string().email().required(),
  password:yup.string().min(8).matches().required(),
  FirstName:yup.string().required(),
  LastName:yup.string().required()
})

export function Register() {
  const navigate=useNavigate();

  function CreateUser(newUser){
    const res=fetch(`${API}/users/signup`,{
      method:"POST",
      body:JSON.stringify(newUser),
      headers:{
        "content-Type":"application/json"
      }
    });
    res.then((result)=>result.json()).then((user)=>navigate(`/HomePage/Onstream/${user.insertedId}`));
}

const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
  initialValues:{FirstName:"",LastName:"",email:"",password:""},
  validationSchema:PasswordValidationSchema,
  onSubmit:(newUser)=>{
    console.log("OnSubmit",newUser);
    CreateUser(newUser)
  }
})
  return (
    <div className="RegisterPage-container">
    <Header/>
    <div id="component-main-elements">
        <h1>Create your account to start your membership</h1>
            <form id="myForm-registerPage" onSubmit={handleSubmit}>
            <input type="text" 
            id="FirstName-registerPage" 
            placeholder="First Name" 
            name='FirstName'
            value={values.FirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            ></input>
            {touched.FirstName && errors.FirstName?errors.FirstName:""}
            <input type="text" 
            id="LastName-registerPage" 
            placeholder="Last Name" 
            name='LastName'
            value={values.LastName}
            onChange={handleChange}
            onBlur={handleBlur}
            ></input>
            {touched.LastName && errors.LastName?errors.LastName:""}
            <input type="email" 
            id="email-id-registerPage" 
            placeholder="Email" 
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            ></input>
            {touched.email && errors.email?errors.email:""}
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
            <br/>
                <button type='submit' id="Next-button-registerPage" >Register</button>
            </form>
            
    </div>
</div>
  );

}
