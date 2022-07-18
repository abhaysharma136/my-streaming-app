import './NeedHelp.css'
import { Header } from "./Header";
import { Link } from 'react-router-dom';
import { useState } from 'react';
export function NeedHelp() {
    const[textbox,setTextBox]=useState(true);
    const isChecked=()=>{
        setTextBox(!textbox)
    }

  return (
    <div>
      <Header/>
      <div id="form-content">
        <div className="Page-text">
            <form id="form_need-help" action="Email-Sent.html">
                <h1>Forgot Email/Password</h1>
            <p>How would you like to reset your password?</p>
                <input type="radio" id="email_forgot_password" name="password_retreve_option" value="Email" onChange={()=>isChecked()} ></input>
            <label for="email">Email</label>
            <br></br>
            <input type="radio" id="Text_need_help" name="password_retreve_option" value="Text" onClick={()=>isChecked()}></input>
            <label for="Text">Text Message (SMS)</label>
            <p>We will send you an email with instructions on how to reset your password.</p>
        </form>
        </div>
        <div className="div-button-text-box">
            {textbox?<div id="email_otp_div">
                <input type="email" id="email_textBox" name="email_textBox" placeholder="name@example.com" ></input>
            </div>:
            
            <div id="number_otp_div"><select class="select_contry_code"><option><img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/640px-Flag_of_India.svg.png" alt="img"></img>+91</option>
                <option>+92</option>
                <option>+93</option>
                <option>+94</option>
                </select>
                <input type="number" id="number_otp" name="number_textBox"></input>
                </div>
}

            <input type="submit" id="Send-button" value="Email Me"></input>
            </div>
    </div>
    <div className="All-link-element">
        <p>Questions? Call 000-800-040-1843</p>
    <div className="links">
<li><Link to="/FAQ">FAQ</Link></li>
<li><Link to="/FAQ">Help Centre</Link></li>
<li><Link to="/FAQ">Terms of Use</Link></li>
<li><Link to="/FAQ">Privacy</Link></li>
<li><Link to="/FAQ">Cookie Preference</Link></li>
<li><Link to="/FAQ">Corporate Information</Link></li>
<li>
    <select id="language-option">
   <option value="English">English</option>
   <option value="Hindi">हिन्दी</option>
    </select>
    </li>
    </div>
    </div>
    </div>
  )

}
