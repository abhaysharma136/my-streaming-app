import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminAppBar.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";

export function AdminAppBar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("message");
    navigate(`/`);
  };
  useEffect(() => {
    let isAuth = localStorage.getItem("token");
    if (isAuth === false || isAuth == null) {
      navigate("/");
    }
  });
  const styles = {
    "margin-top": "40px",
  };
  return (
    <div className="Admin-menu-Bar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              color="inherit"
              onClick={() => navigate(`/Onstream/AdminDashBoard/${id}`)}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate(`/Onstream/AdminDashBoard/Movies/${id}`)}
            >
              Movies
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate(`/Onstream/AdminDashBoard/users/${id}`)}
            >
              Users
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate(`/Onstream/AdminDashBoard/banners/${id}`)}
            >
              Banners
            </Button>
            <div className="profile-img">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                style={styles}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => navigate(`/AdminProfilePage/Onstream/${id}`)}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={() => Logout()}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
