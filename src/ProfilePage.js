import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'
export function ProfilePage() {

  const navigate=useNavigate();
  return (
    <div className="profilePage-container">
      <div className='form-container-profilePage'>
      <form className="form-profilePage">
        <div className="profilePic-profilePage">
          <div className='upload-profilePage'></div>
        </div>
        <input type="text" id="userName-profilePage" placeholder="User Name"></input>
        <input type="text" id="firstName-profilePage" placeholder="First Name"></input>
        <input type="text" id="LastName-profilePage" placeholder="Last Name"></input>
        <input type="email" id="Email-profilePage" placeholder="Email"></input>
        <input type="password" id="Password-profilePage" placeholder="Your password"></input>
        <button className='saveButton-profilePage' onClick={()=>navigate('/HomePage/Onstream')}>Save Changes</button>
      </form>
      </div>
      
    </div>
  );
}
