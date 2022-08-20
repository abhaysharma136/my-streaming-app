import './LoginPage.css'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from './global';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export function LoginPage() {
const navigate=useNavigate();
  const PasswordValidationSchema=yup.object({
    email:yup.string().email().required(),
    password:yup.string().min(8).matches().required(),
  })
  
const[result,setResult]=useState("");
// const [isLoggedin, setIsLoggedin] = useState(false);
const verify=()=>{
  if(result.token){
    console.log("veifing1");
    localStorage.setItem('token',result.token);
    
    navigate(`/HomePage/Onstream/${result.id}`);
  }
}
console.log(result);
setTimeout(verify,3000);
    function VerifyUser(newUser){
      const res=fetch(`${API}/users/login`,{
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
          "content-Type":"application/json"
        }
      });
      res.then((result1)=>result1.json()).then((user)=>setResult(user));
  }
  
  
  const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{email:"",password:"",},
    validationSchema:PasswordValidationSchema,
    onSubmit:(newUser)=>{
      // console.log("OnSubmit",newUser);
      VerifyUser(newUser);
      
    }
  })
  const styles={
    color:result.message==='Succesfull Login'?"green":"red",
  }
  return (
    <div className='login-container'>
      <div id="input-elements-all">
        <div id="Center-dispay-div">
         
            <h1 className='sign-up-heading'>Sign In</h1>
            <p style={styles}>{result.message}</p>
            <div id="loginInput">
            <form  id="myForm" onSubmit={handleSubmit}>
              <TextField type="email"
               id="email_address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email?errors.email:""}
                 placeholder="email">
              
                 </TextField>
                 
              <br/><br/>
              <TextField type="password"
               id="Account-password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password?errors.password:""}
                placeholder="Password"></TextField>
              <br/>
              <button className="SignIn_Button" type='submit'>
                Sign In
                </button>

              <br></br>

              <input type="checkbox" ></input>
              <label htmlFor="rememberMe" id="rememberMe-text">Remember me</label>
              <Link to="/Need-Help" id="needhelp">Need help?</Link>

              <p id="New-User-text"> New to Onstream? <span><Link to="/Register-now" id="sign-up-Link">Sign up now.</Link></span></p>
              <p id="Learn-more-text">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
              </form>
            </div>
          
        </div>
      </div>
      <hr className='login-seprater'></hr>
      <div className="second-container" id="more-links">
<p>Questions? Call 000-800-040-1843</p>
    <div className="links-bottom-click">
    <li className="link"><Link to="/FAQ">FAQ</Link></li>
    <li><Link to="/FAQ">Help Centre</Link></li>
    <li><Link to="/FAQ">Account</Link></li>
    <li><Link to="/FAQ">Media Centre</Link></li>
    <li><Link to="/FAQ">Investor Relation</Link></li>
    <li><Link to="/FAQ">Jobs</Link></li>
    <li><Link to="/FAQ">Ways to Watch</Link></li>
    <li><Link to="/FAQ">Terms of Use</Link></li>
    <li><Link to="/FAQ">Privacy</Link></li>
    <li><Link to="/FAQ">Cookie Preference</Link></li>
    <li><Link to="/FAQ">Corporate Information</Link></li>
    <li><Link to="/FAQ">Contact Us</Link></li>
    
        </div>
</div>
    </div>
  );
}
