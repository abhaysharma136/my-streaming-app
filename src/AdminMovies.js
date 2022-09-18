import React, { useEffect, useState } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, TableBody, TableCell, TableContainer } from "@mui/material";
import { API } from "./global";
import { Table } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import "./AdminMovies.css";
import { AdminAppBar } from "./AdminAppBar";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';
// function createData(_id,id,name,Language, rating, Genres) {
//   return { _id, id, name, Language, rating,Genres };
//  }

export function AdminMovies() {
  const [page, setPage] = useState(1);
  const onPageChange = (event, value) => {
    setPage(value);
  };

  function GetTotalMovies() {
    const res = fetch(`${API}/movies/Count/All`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setMovieList(mvs));
  }

  const [MovieList, setMovieList] = useState(0);
  var count = Math.ceil(MovieList / 10);
  console.log(count);

  useEffect(() => {
    GetTotalMovies();
  }, []);

  return (
    <div className="Admin-movies-container">
      <AdminAppBar />
      <h1>Movies</h1>
      <DisplayAdminmovies page={page} />
      <footer>
        <Pagination
          count={count}
          showFirstButton
          showLastButton
          className="bottom-pagination"
          onChange={onPageChange}
        />
      </footer>
    </div>
  );
}

function DisplayAdminmovies({ page }) {
  const navigate = useNavigate();
  // const handleClick = (event, cellValues) => {
  //   console.log(cellValues.row);
  // };

  const [open, setOpen] = useState(false);
  const [val, setval] = useState();

  const handleopen = (row) => {
    setOpen(true);
    setval(row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (val) => {
    deleteMovie(val._id);
    setOpen(false);
  };
  const deleteMovie = (id) => {
    fetch(`${API}/movies/${id}`, {
      method: "DELETE",
    });
  };
  const [data, setData] = useState([]);
  function GetMovies() {
    const res = fetch(`${API}/movies/page/movie/${page}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setData(mvs));
  }

  useEffect(() => {
    GetMovies();
  }, [page]);
  const { id } = useParams();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className="movie-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">_id</TableCell>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">Language</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Genres</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="left">{row.Language}</TableCell>
                <TableCell align="left">{row.rating}</TableCell>
                <TableCell align="right">{row.Genres}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleopen(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/Onstream/${id}/editmovie/${row._id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
            Delete Movie
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
            Are you sure yoi want to delete this movie?
          </Typography>

          <Button onClick={() => handleDelete(val)} >delete</Button>
          <Button onClick={() => handleClose()}>cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
