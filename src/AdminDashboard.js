import "./AdminDashboard.css";
import { AdminAppBar } from "./AdminAppBar";
import { useEffect, useState } from "react";
import { API } from "./global";
import { PieChart, Pie, Legend } from "recharts";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";

export function AdminDashboard() {
  const navigate=useNavigate();
  const {id}=useParams();
  return (
    <div className="AdminDashboard-container">
      <AdminAppBar />
      <div className="responsive-div">
        <div>
          <div className="Admin-container-movieData">
            <TotalMovieCount />
            <TotalUserCount />
          </div>
          <div>
            <CreatePie />
          </div>
        </div>
        <div className="Admin-add-button">
          <Button variant="contained" className="button-admin" onClick={() => navigate(`/Onstream/AdminDashBoard/Add-Banner/${id}`)}>
            <p>Add Banner</p>
            <AddIcon />
          </Button>
          <Button variant="contained" className="button-admin" onClick={() => navigate(`/Onstream/AdminDashBoard/Add-Movie/${id}`)}>
            <p>Add Movie</p>
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

function TotalMovieCount() {
  function GetMovies() {
    const res = fetch(`${API}/movies/Count/All`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieList(mvs));
  }

  const [MovieList, setMovieList] = useState("");

  useEffect(() => {
    GetMovies();
  }, []);

  console.log(MovieList);
  return (
    <div className="TotalMovie">
      <h1>Total Movies</h1>
      <div className="Movie-Count-components">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdhdGzr9-dyR34OTlY7rIKMmzdnkDzFEEzrw&usqp=CAU"
          alt="Movie-Icon"
          width="140px"
          height="140px"
        />
        <h1>{MovieList}</h1>
      </div>
    </div>
  );
}

function TotalUserCount() {
  function GetMovies() {
    const res = fetch(`${API}/users/Count/All`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setUserCount(mvs));
  }

  const [UserCount, setUserCount] = useState("");

  useEffect(() => {
    GetMovies();
  }, []);

  return (
    <div className="TotalMovie">
      <h1>Total Users</h1>
      <div className="Movie-Count-components">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS4zTG1k4qxgt_7Cebw-uuGxTDsu5LWCL6giFFSLrfC8cYmtlfbTGMdZuaw0RsRKE7c9Q&usqp=CAU"
          alt="user-icon"
          width="140px"
          height="140px"
        />
        <h1>{UserCount}</h1>
      </div>
    </div>
  );
}

const RADIAN = Math.PI / 180;
const renderCustomlabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function CreatePie() {
  //Comedy Movie Count
  function GetMoviesComedy() {
    const res = fetch(`${API}/movies/Count/All?Genres=Comedy`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieListComedy(mvs));
  }

  const [MovieListComedy, setMovieListComedy] = useState("");

  useEffect(() => {
    GetMoviesComedy();
  }, []);

  //Horror Movie Count
  function GetMoviesHorror() {
    const res = fetch(`${API}/movies/Count/All?Genres=Horror`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieListHorror(mvs));
  }

  const [MovieListHorror, setMovieListHorror] = useState("");

  useEffect(() => {
    GetMoviesHorror();
  }, []);

  //Romance Movie Count
  function GetMoviesRomance() {
    const res = fetch(`${API}/movies/Count/All?Genres=Romance`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieListRomance(mvs));
  }

  const [MovieListRomance, setMovieListRomance] = useState("");

  useEffect(() => {
    GetMoviesRomance();
  }, []);

  //Romance Action Count
  function GetMoviesAction() {
    const res = fetch(`${API}/movies/Count/All?Genres=Action`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieListAction(mvs));
  }

  const [MovieListAction, setMovieListAction] = useState("");

  useEffect(() => {
    GetMoviesAction();
  }, []);

  //Romance Documentary Count
  function GetMoviesDocumentary() {
    const res = fetch(`${API}/movies/Count/All?Genres=Documentary`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieListDocumentary(mvs));
  }

  const [MovieListDocumentary, setMovieListDocumentary] = useState("");

  useEffect(() => {
    GetMoviesDocumentary();
  }, []);

  const data = [
    { name: "Comedy", Genres: MovieListComedy, fill: "pink" },
    { name: "Horror", Genres: MovieListHorror, fill: "purple" },
    { name: "Romance", Genres: MovieListRomance, fill: "red" },
    { name: "Action", Genres: MovieListAction, fill: "blue" },
    { name: "Documentary", Genres: MovieListDocumentary, fill: "green" },
  ];

  return (
    <Box
      className="pie-chart-container"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <PieChart width={360} height={400} className="Pie-Chart-components">
        <Pie
          data={data}
          labelLine={false}
          dataKey="Genres"
          outerRadius={90}
          label={renderCustomlabel}
        />

        <Legend
          layout="horizontal"
          horizontalAlign="middle"
          align="center"
          margin={1}
          className="PieChart-label"
        />
      </PieChart>
    </Box>
  );
}

// function LatestMovies() {
//   return <div></div>;
// }
