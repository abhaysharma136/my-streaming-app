import React, { forwardRef, useEffect, useState } from "react";
import "./AdminMovies.css";
import { API } from "./global";
import { AdminAppBar } from "./AdminAppBar";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Modal,
  Snackbar,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import { Table } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import Example from "./Loading";
import MuiAlert from "@mui/material/Alert";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function AdminBanners() {
  function GetBanners() {
    const res = fetch(`${API}/banners`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setData(mvs));
  }
  const [data, setData] = useState();
  useEffect(() => {
    GetBanners();
  }, []);
  return (
    <div>
      <div className="Admin-movies-container">
        <AdminAppBar />
        <h1>Banners</h1>
        {data?<DisplayBanners data={data} />:<Example/>}
      </div>
    </div>
  );
}

function DisplayBanners({ data }) {
  const navigate = useNavigate();

  const [Snackbaropen, setSnackbarOpen] = useState(false);

  const handleSnackbarMessage = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

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
    deleteBanner(val._id);
    setOpen(false);
    handleSnackbarMessage();
  };

  const deleteBanner = (id) => {
    fetch(`${API}/banners/${id}`, {
      method: "DELETE",
    });
  };

  const { id } = useParams();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      {Snackbaropen ? (
        <Snackbar
          open={Snackbaropen}
          autoHideDuration={2000}
          Close={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Movie Deleted Succesfully
          </Alert>
        </Snackbar>
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className="movie-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">_id</TableCell>
              <TableCell align="left">Banner</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="left">{row.banner}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleopen(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/Onstream/${id}/editbanner/${row._id}`)
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="black"
          >
            Delete Banner
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
            Are you sure you want to delete this banner?
          </Typography>

          <Button onClick={() => handleDelete(val)}>delete</Button>
          <Button onClick={() => handleClose()}>cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
