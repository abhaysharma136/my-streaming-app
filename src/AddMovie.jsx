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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieValidationSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  director: yup.string().required(),
  Cast: yup.string().required(),
  Year: yup.number().required(),
  Language: yup.string().required(),
  time: yup.string().required(),
  poster: yup.string().required(),
  summary: yup.string().required(),
  trailer: yup.string(),
  Genres: yup.string().required(),
  rating: yup.string().required(),
});
export function AddMovie(newmovie) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posterpercent, setPosterPercent] = useState(0);
  const [trailerpercent, setTrailerPercent] = useState(0);
  const [urlPoster, setUrlPoster] = useState("");
  const [urlTrailer, setUrlTrailer] = useState("");
  function handlePosterUpload() {
    if (!poster) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${poster.name}`);
    const uploadTask = uploadBytesResumable(storageRef, poster);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const posterpercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPosterPercent(posterpercent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrlPoster(url);
        });
      }
    );
  }

  function handleTrailerUpload() {
    if (!trailer) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${trailer.name}`);
    const uploadTask = uploadBytesResumable(storageRef, trailer);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const trailerpercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setTrailerPercent(trailerpercent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrlTrailer(url);
        });
      }
    );
  }

  console.log(urlPoster);
  const [poster, setPoster] = useState("");
  const [trailer, setTrailer] = useState("");

  // Handles input change event and updates state
  function handleChangePoster(event) {
    setPoster(event.target.files[0]);
  }
  console.log(poster);

  function handleChangeTrailer(event) {
    setTrailer(event.target.files[0]);
  }
  console.log(poster);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        poster: "",
        id: "",
        name: "",
        director: "",
        Cast: "",
        Year: "",
        Language: "",
        time: "",
        trailer: "",
        summary: "",
        Genres: "",
        rating: "",
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

  const verify = (message) => {
    if(message){
      navigate(`/Onstream/AdminDashBoard/${id}`)
    }
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
    verify(result)
    
  };
  return (
    <div className="Admin-portal-container">
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
      <h1>Add Movie </h1>
      <div>
        <h3>Add new movies for your App from here</h3>
        <div>
          <form onSubmit={handleSubmit} className="Add-movie-container">
            <TextField
              label="id"
              name="id"
              value={values.id}
              id="add-movie-id"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.id && errors.id}
              helperText={touched.id && errors.id ? errors.id : ""}
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

            <TextField
              type="text"
              name="director"
              value={values.director}
              label="Director"
              onBlur={handleBlur}
              onChange={handleChange}
              id="add-movie-director"
              error={touched.director && errors.director}
              helperText={
                touched.director && errors.director ? errors.director : ""
              }
              className="add-movie-component"
            />

            <TextField
              type="text"
              name="Cast"
              value={values.Cast}
              label="Cast"
              id="add-movie-cast"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.Cast && errors.Cast}
              helperText={touched.Cast && errors.Cast ? errors.Cast : ""}
              className="add-movie-component"
            />

            <TextField
              name="Year"
              value={values.Year}
              label="Year"
              id="add-movie-year"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.Year && errors.Year}
              helperText={touched.Year && errors.Year ? errors.Year : ""}
              className="add-movie-component"
            />

            <TextField
              type="text"
              name="Language"
              value={values.Language}
              label="Language"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.Language && errors.Language}
              helperText={
                touched.Language && errors.Language ? errors.Language : ""
              }
              className="add-movie-component"
            />

            <TextField
              type="text"
              name="time"
              value={values.time}
              label="Run Time"
              onBlur={handleBlur}
              onChange={handleChange}
              id="add-movie-time"
              error={touched.time && errors.time}
              helperText={touched.time && errors.time ? errors.time : ""}
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
                <p>{posterpercent}"% done"</p>
              </div>
              <div ><p className="link-result">{urlPoster}</p></div>

              <TextField
                type="text"
                id="add-movie-poster"
                name="poster"
                label="poster"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.poster}
                error={touched.poster && errors.poster}
                helperText={
                  touched.poster && errors.poster ? errors.poster : ""
                }
                className="add-movie-component"
              />
            </div>

            <div className="upload-inputs">
              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleChangeTrailer}
                />
                <Button onClick={handleTrailerUpload} type="button">
                  Upload to Firebase
                </Button>
                <p>{trailerpercent}"% done"</p>
              </div>
              <div ><p className="link-result">{urlTrailer}</p></div>
              <TextField
                type="text"
                label="trailer"
                id="add-movie-trailer"
                className="add-movie-component"
                name="trailer"
                onChange={handleChange}
              />
            </div>

            <div className="select-fields">
              <div>
                <FormControl>
                  <InputLabel id="movie-Genre">Genres</InputLabel>
                  <Select
                    id="movie-Genre"
                    name="Genres"
                    label="Genres"
                    defaultValue=""
                    error={touched.Genres && errors.Genres}
                    onChange={handleChange("Genres")}
                  >
                    <MenuItem value="Comedy">Comedy</MenuItem>
                    <MenuItem value="Horror">Horror</MenuItem>
                    <MenuItem value="Action">Action</MenuItem>
                    <MenuItem value="Documentary">Documentary</MenuItem>
                    <MenuItem value="Romance">Romance</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl>
                  <InputLabel id="movie-rating">Rating</InputLabel>
                  <Select
                    id="movie-rating"
                    name="rating"
                    label="rating"
                    onChange={handleChange("rating")}
                    error={touched.rating && errors.rating}
                    defaultValue=""
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <TextField
              id="add-movie-summary"
              name="summary"
              multiline
              label="Summary"
              rows={4}
              onChange={handleChange}
              error={touched.summary && errors.summary}
              onBlur={handleBlur}
              helperText={
                touched.summary && errors.summary ? errors.summary : ""
              }
            />
            <Button variant="contained" type="submit">
              Add Movie
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
