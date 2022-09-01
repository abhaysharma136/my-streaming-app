import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate, useParams } from "react-router-dom";
import './AdminAppBar.css';
import avatar from './netflix-avatar.png';

export function AdminAppBar() {
  const{id}=useParams();
  const navigate = useNavigate();
  return (
    <div className='Admin-menu-Bar'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar >
            <Button color="inherit" onClick={() => navigate(`/Onstream/AdminDashBoard/${id}`)}>Home</Button>
            <Button color="inherit" onClick={() => navigate(`/Onstream/AdminDashBoard/Add-Movie/${id}`)}>Add Movie</Button>
            {/* <Button color="inherit" onClick={() => navigate("")}>Edit Movie</Button> */}
            <Button className="Admin-profile-icon" color="inherit" onClick={() => navigate(`/AdminProfilePage/Onstream/${id}`)}><img src={avatar} alt="profile pix" id="user_avatar-Admin" /></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
