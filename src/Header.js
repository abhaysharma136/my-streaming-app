import './Header.css'
import {useNavigate} from "react-router-dom";
export function Header() {
  const navigate=useNavigate();
  return (
    <div>
      <nav className='nav-bar-header'>
        <ul>
          <li id="logo">ONStream</li>
          <div>
            <li>
              <select id="language-option">
                <option value="English">English</option>
                <option value="Hindi">हिन्दी</option>
              </select>
            </li>
            <li>
              <form>
                <button id="SignIn-button1" onClick={()=>navigate("/login-Page")}>SignIn</button>
              </form>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
