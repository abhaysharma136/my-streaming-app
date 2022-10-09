import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";
import "./EditProfile.css";
import { NavBar } from "./NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { forwardRef, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Example from "./Loading";
import * as yup from "yup";
import { useFormik } from "formik";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const userValidationSchema = yup.object({
  FirstName: yup.string().required(),
  LastName: yup.string().required(),
});
export function EditProfile() {
  const { id } = useParams();
  console.log(id);

  const [userDetails, setUserDetails] = useState();
  console.log(userDetails);
  const GetUserDetails = () => {
    const res = fetch(`${API}/users/${id}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((user) => setUserDetails(user));
  };

  useEffect(() => GetUserDetails(), []);

  return (
    <div>
      <NavBar />
      {userDetails ? (
        <EditDetailsForm userDetails={userDetails} />
      ) : (
        <Example />
      )}
    </div>
  );
}

export function EditDetailsForm({ userDetails }) {
  const navigate = useNavigate();

  const handleFinalResult = () => {
    handleMessage();
  };

  function CreateUser(editUser) {
    const res = fetch(`${API}/users/${userDetails._id}`, {
      method: "PUT",
      body: JSON.stringify(editUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    res.then((result) => result.json()).then(() => handleFinalResult());
  }

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        FirstName: userDetails.FirstName,
        LastName: userDetails.LastName,
      },
      validationSchema: userValidationSchema,
      onSubmit: (editUser) => {
        console.log("OnSubmit", editUser);
        CreateUser(editUser);
      },
    });

  const [open, setOpen] = useState(false);

  const handleMessage = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    navigate(-1);
  };

  return (
    <div className="top-container">
      <div className="Edit-container">
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Profile updated Succesfully
          </Alert>
        </Snackbar>
        <form id="myForm-EditProfile" onSubmit={handleSubmit}>
          <h1>Edit Profile here</h1>
          <TextField
            id="FirstName-EditProfile"
            label="First Name"
            name="FirstName"
            variant="standard"
            value={values.FirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.FirstName && errors.FirstName}
            helperText={
              touched.FirstName && errors.FirstName ? errors.FirstName : ""
            }
          />

          <TextField
            id="LastName-EditProfile"
            label="Last Name"
            name="LastName"
            variant="standard"
            value={values.LastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.LastName && errors.LastName}
            helperText={
              touched.LastName && errors.LastName ? errors.LastName : ""
            }
          />

          <Button
            type="submit"
            variant="outlined"
            color="success"
            id="Save-Changes-EditProfile"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
