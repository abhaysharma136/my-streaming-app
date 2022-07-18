import './Register.css'
import { Header } from "./Header";
import { useNavigate } from 'react-router-dom';
export function Register() {
  const navigate=useNavigate();
  return (
    <div className="RegisterPage-container">
    <Header/>
    <div id="component-main-elements">
        <h1>Create a password to start your membership</h1>
        <h3>Just a few more steps and you're done!
            We hate paperwork, too.</h3>
            <form id="myForm-registerPage">
            <input type="email" id="email-id-registerPage" placeholder="Email" required></input>
            <br></br>
            <input type="password" id="user-password-registerPage" placeholder="Add a Password" required minlength="8"></input>
            <p id="password-alert-registerPage"></p>
            <br></br>
                <button id="Next-button-registerPage" onClick={()=>navigate('/Create-Profile')} >Register</button>
            </form>
            
    </div>
</div>
  );

}
