import React, { forwardRef, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AdminUserData.css";
import { API } from "./global";
import { AdminAppBar } from "./AdminAppBar";
import { Box, Button, IconButton, Modal, Snackbar, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Example from "./Loading";
import MuiAlert from "@mui/material/Alert";



const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function AdminUsersData() {
  function GetUsers() {
    const res = fetch(`${API}/users`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res.then((data) => data.json()).then((mvs) => setRows(mvs));
  }
  const [rows, setRows] = useState();
  useEffect(() => {
    GetUsers();
  }, []);
  return (
    <div>
      <div className="Admin-movies-container">
        <AdminAppBar />
        <h1>Users</h1>
        {rows ? <DisplayUserData rows={rows} /> : <Example />}
      </div>
    </div>
  );
}

function DisplayUserData({ rows }) {


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
    deleteMovie(val.id);
    // deleteMovie(val._id);
    setOpen(false);
    handleSnackbarMessage();
  };

  const deleteMovie = (id) => {
    fetch(`${API}/users/${id}`, {
      method: "DELETE",
    });
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 240,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 240,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "FirstName",
      headerName: "First Name",
      width: 130,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "LastName",
      headerName: "Last Name",
      width: 130,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "confirm",
      headerName: "Account Status",
      type: "boolean",
      width: 190,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.FirstName || ""} ${params.row.LastName || ""}`,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "Delete",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <IconButton color="primary" onClick={() => handleopen(cellValues)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

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
    <div className="Admin-user-container">
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
            User Deleted Succesfully
          </Alert>
        </Snackbar>
      ) : null}

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
        />
      </div>
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
            Delete Movie
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
            Are you sure yoi want to delete this movie?
          </Typography>

          <Button onClick={() => handleDelete(val)}>delete</Button>
          <Button onClick={() => handleClose()}>cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
