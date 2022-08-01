import './LoginPage.css'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from './global';
export function LoginPage() {



  const PasswordValidationSchema=yup.object({
    email:yup.string().email().required(),
    password:yup.string().min(8).matches().required(),
  })
  const navigate=useNavigate();

    function VerifyUser(newUser){
      const res=fetch(`${API}/users/login`,{
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
          "content-Type":"application/json"
        }
      });
      res.then((result)=>result.json()).then((user)=>navigate(`/HomePage/Onstream/${user.id}`));
  }
  
  const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
    initialValues:{email:"",password:""},
    validationSchema:PasswordValidationSchema,
    onSubmit:(newUser)=>{
      // console.log("OnSubmit",newUser);
      VerifyUser(newUser)
    }
  })
  return (
    <div className='login-container'>
      <div id="input-elements-all">
        <div id="Center-dispay-div">
         
            <h1 className='sign-up-heading'>Sign In</h1>
            <div id="loginInput">
            <form  id="myForm" onSubmit={handleSubmit}>
              <label for="email_address"></label>
              <input type="email"
               id="email_address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                 placeholder="email or phone number"></input>
                 {touched.email && errors.email?errors.email:""}
              <br></br><br></br>
              <label for="Account-password"></label>
              <input type="password"
               id="Account-password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                 placeholder="Password"></input>
                 {touched.password && errors.password?errors.password:""}
              <br></br>
              <button class="SignIn_Button" type='submit'>
                Sign In
                </button>

              <br></br>

              <input type="checkbox" required></input>
              <label for="rememberMe" id="rememberMe-text">Remember me</label>
              <Link to="/Need-Help" id="needhelp">Need help?</Link>

              <p id="New-User-text"> New to Onstream? <span><a href="registrationPage1.html" id="sign-up-Link">Sign up now.</a></span></p>
              <p id="Learn-more-text">This page is protected by Google reCAPTCHA to ensure you're not a bot.<span><a href="/Learn-more" id="Learn-more-link">Learn more.</a></span></p>
              </form>
            </div>
          
        </div>
      </div>
      <hr className='login-seprater'></hr>
      <div class="All-link-element">
        <p>Questions? Call 000-800-040-1843</p>
    <div class="links">
<li className='login-links'><a href="FAQ">FAQ</a></li>
<li className='login-links'><a href="FAQ">Help Centre</a></li>
<li className='login-links'><a href="FAQ">Terms of Use</a></li>
<li className='login-links'><a href="FAQ">Privacy</a></li>
<li className='login-links'><a href="FAQ">Cookie Preference</a></li>
<li className='login-links'><a href="FAQ">Corporate Information</a></li>
<li className='login-links'>
    <select id="language-option">
   <option value="English">English</option>
   <option value="Hindi">हिन्दी</option>
    </select>
    </li>
    </div>
    </div>
    </div>
  );
}
