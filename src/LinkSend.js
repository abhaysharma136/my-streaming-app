import { useParams } from 'react-router-dom';
import './LinkSend.css';
export function LinkSend() {
  const{email}=useParams();

  return (
    <div className='email-screen-container'>
      <div className='emailTextContainer'>
      <p>Email reset link has been sent to the registered email <span className='email-param'>{email}</span></p>
      <p>The Link will expire in 10 minutes.</p>
    </div>
    </div>
    
  );
}
