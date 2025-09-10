import React, { forwardRef, useEffect, useState } from "react";
import "./EditBanner.css";
import { AdminAppBar } from "./AdminAppBar";
import TextField from "@mui/material/TextField";
import { API } from "./global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Modal, Snackbar, Typography } from "@mui/material";
import Example from "./Loading";
import MuiAlert from "@mui/material/Alert";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function EditBanner() {
  const { bannerId } = useParams();
  console.log(bannerId);

  const [bannerDetails, setBannerDetails] = useState("");
  const GetBannerDetails = () => {
    const res = fetch(`${API}/banners/${bannerId}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((mv) => setBannerDetails(mv));
  };

  useEffect(() => GetBannerDetails(), []);
  return (
    <div>
      <AdminAppBar />
      {bannerDetails ? (
        <DisplayEditBannerForm bannerDetails={bannerDetails} />
      ) : (
        <Example/>
      )}
    </div>
  );
}

function DisplayEditBannerForm({ bannerDetails }) {
  const [id, setId] = useState(bannerDetails._id);
  const [name, setName] = useState(bannerDetails.name);
  const [banner, setbanner] = useState(bannerDetails.banner);
  console.log(bannerDetails.banner);

  const navigate = useNavigate();
  const editBanner = () => {
    const updatedBanner = {
      name: name,
      id: id,
      banner: banner,
    };

    const res = fetch(`${API}/banners/${bannerDetails._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBanner),
      headers: {
        "content-Type": "application/json",
      },
    });
    res.then((result) => result.json()).then(() => navigate(-1));
  };

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

  const [modalopen, setModalOpen] = useState(false);
  const handleModalopen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = () => {
    editBanner();
    setModalOpen(false);
    handleSnackbarMessage();
  };
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
    <div className="Edit-Banner-container">
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
            Banner Updated Succesfully
          </Alert>
        </Snackbar>
      ) : null}
      <h1 className="edit-movie-heading">Edit Banner</h1>
      <form>
        <TextField
          type="text"
          label="Id"
          id="id"
          variant="outlined"
          value={bannerDetails._id}
          onChange={(event) => setId(event.target.value)}
          disabled
        />

        <TextField
          type="text"
          label="banner"
          id="movie-banner"
          variant="outlined"
          value={banner}
          onChange={(event) => setbanner(event.target.value)}
        />

        <TextField
          type="text"
          label="Movie Title"
          id="name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Button variant="outlined" onClick={() => handleModalopen()}>
          Save Changes
        </Button>
      </form>
      <Modal
        open={modalopen}
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
            Save Changes?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
            Are you sure you want to save the changes?
          </Typography>

          <Button onClick={() => handleModalSave()}>Save</Button>
          <Button onClick={() => handleModalClose()}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
