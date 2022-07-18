import { useNavigate } from 'react-router-dom';
import './CreateProfile.css';

export function CreateProfile() {
const navigate=useNavigate();
  return (
    <div>
      <h2 className='heading-createProfile'>Complete Your Profile</h2>
      <form className="form-createProfile">
        <div className="profilePic-createProfile">
          <div className='upload-createProfile'></div>
        </div>
        <input type="text" id="firstName-createProfile" placeholder="First Name"></input>
        <input type="text" id="LastName-createProfile" placeholder="Last Name"></input>
        <input type="text" id="userName-createProfile" placeholder="Create your User Name"></input>
        <button className='completeButton-createProfile' onClick={()=>navigate('/HomePage/Onstream')}>Complete Profile</button>
      </form>
    </div>
  );
}
