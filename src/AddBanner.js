import "./AddMovie.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global";
import { forwardRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { AdminAppBar } from "./AdminAppBar";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import './AddBanner.css';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieValidationSchema = yup.object({
  _id: yup.number().required(),
  name: yup.string().required(),
  banner: yup.string().required(),
});
export function AddBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bannerpercent, setBannerPercent] = useState(0);
  const [urlBanner, setUrlBanner] = useState("");
  function handlePosterUpload() {
    if (!banner) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${banner.name}`);
    const uploadTask = uploadBytesResumable(storageRef, banner);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const bannerpercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setBannerPercent(bannerpercent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrlBanner(url);
        });
      }
    );
  }

  console.log(urlBanner);
  const [banner, setBanner] = useState("");

  // Handles input change event and updates state
  function handleChangePoster(event) {
    setBanner(event.target.files[0]);
  }
  console.log(banner);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        banner: "",
        _id: "",
        name: "",
      },
      validationSchema: MovieValidationSchema,
      onSubmit: (newmovie) => {
        console.log("OnSubmit", newmovie);
        addMovie(newmovie);
      },
    });

  const [result, setResult] = useState();
  function addMovie(newmovie) {
    fetch(`${API}/movies/add`, {
      method: "POST",
      body: JSON.stringify(newmovie),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => handleFinalResult(res));
  }

  const handleFinalResult = (res) => {
    setResult(res);
    handleMessage();
    // navigate(`/Onstream/AdminDashBoard/${id}`)
  };
  const [open, setOpen] = useState(false);

  const handleMessage = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="Admin-portal-banner">
      {open ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Movie Added Succesfully
          </Alert>
        </Snackbar>
      ) : null}
      <AdminAppBar />
      <h1>Add Banner </h1>
      <div>
        <h3>Add new banners for your App from here</h3>
        <div>
          <form onSubmit={handleSubmit} className="Add-movie-container">
            <TextField
              label="id"
              name="_id"
              value={values._id}
              id="add-movie-id"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched._id && errors._id}
              helperText={touched._id && errors._id ? errors._id : ""}
              className="add-movie-component"
            />

            <TextField
              label="name"
              name="name"
              value={values.name}
              id="add-movie-name"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
              helperText={touched.name && errors.name ? errors.name : ""}
              className="add-movie-component"
            />

            <div className="upload-inputs">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangePoster}
                />

                <Button onClick={handlePosterUpload} type="button">
                  Upload to Firebase
                </Button>
                <p>{bannerpercent}"% done"</p>
              </div>
              <div>
                <p className="link-result">{urlBanner}</p>
              </div>

              <TextField
                type="text"
                id="add-movie-poster"
                name="banner"
                label="banner"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.banner}
                error={touched.banner && errors.banner}
                helperText={
                  touched.banner && errors.banner ? errors.banner : ""
                }
                className="add-movie-component"
              />
            </div>
            <Button variant="contained" type="submit">
              Add Movie
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
