import { useNavigate, useParams } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import logo from "./Onstream-Logo.svg";
import { AccountCircle } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";

export function NavBar() {
  const navigate = useNavigate();
  //   function GetMovies(){
  //     const res=fetch(`${API}/movies`);
  //     res.then((data)=>data.json())
  //     .then((mvs)=>setMovieList(mvs));
  // }
  // const[MovieList,setMovieList]=useState([]);

  // useEffect(()=>{
  // GetMovies()
  // },[])
  const [movie, setMovie] = useState();
  const [anchorEl, setAnchorEl] = useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { id } = useParams();
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
    "margin-top": "60px",
  };
  return (
    <div className="MenuBar">
      <ul>
        <li>
          <img className="logo" src={logo} alt="logo"></img>
        </li>
        <li>
          <button
            className="Home-button"
            onClick={() => navigate(`/HomePage/Onstream/${id}`)}
          >
            Home
          </button>
        </li>
        <div className="Genres-dropdown">
          <button className="Genres-btn">Genres</button>
          <div className="dropdown-content">
            <button onClick={() => navigate(`/movies/${id}/All`)}>
              All Movies
            </button>
            <button onClick={() => navigate(`/movies/${id}/Genres/Horror`)}>
              Horror
            </button>
            <button
              onClick={() => navigate(`/movies/${id}/Genres/Documentary`)}
            >
              Documentary
            </button>
            <button onClick={() => navigate(`/movies/${id}/Genres/Comedy`)}>
              Comedy
            </button>
            <button onClick={() => navigate(`/movies/${id}/Genres/Action`)}>
              Action
            </button>
            <button onClick={() => navigate(`/movies/${id}/Genres/Romance`)}>
              Romance
            </button>
          </div>
        </div>
        <li>
          <div className="search-bar-container">
            <input
              className="search-movie"
              placeholder="Search movie here"
              onChange={(event) => setMovie(event.target.value)}
            />
            <button
              className="search-button"
              type="submit"
              onClick={() => navigate(`/movies/search/${id}/name/${movie}`)}
            >
              🔍
            </button>
          </div>
        </li>

        <li className="profile-img">
          <div>
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
              <MenuItem onClick={() => navigate(`/ProfilePage/Onstream/${id}`)}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => Logout()}>Logout</MenuItem>
            </Menu>
          </div>
        </li>
      </ul>
      <div className="search-bar-container2">
            <input
              className="search-movie2"
              placeholder="Search movie here"
              onChange={(event) => setMovie(event.target.value)}
            />
            <button
              className="search-button2"
              type="submit"
              onClick={() => navigate(`/movies/search/${id}/name/${movie}`)}
            >
              🔍
            </button>
          </div>
    </div>
  );
}
