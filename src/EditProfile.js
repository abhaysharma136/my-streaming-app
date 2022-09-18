import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";
import "./EditProfile.css";
import { NavBar } from "./NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { forwardRef, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function EditProfile() {
  const { id } = useParams();
  console.log(id);

  const [userDetails, setUserDetails] = useState();
  const GetUserDetails = () => {
    const res = fetch(`${API}/users/${id}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((user) => setUserDetails(user));
  };

  useEffect(() => GetUserDetails(), []);

  return (
    <div className="top-container">
      <NavBar />
      {userDetails ? (
        <EditDetailsForm userDetails={userDetails} />
      ) : (
        ".....Loading"
      )}
    </div>
  );
}

export function EditDetailsForm({ userDetails }) {
  const navigate = useNavigate();
  const [fname, setFName] = useState(userDetails.FirstName);
  const [lname, setLName] = useState(userDetails.LastName);

  const editUser = {
    FirstName: fname,
    LastName: lname,
  };

  const handleFinalResult = () => {
    navigate(-1);
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

  console.log(editUser);

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
    <div className="Edit-container">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Profile updated
        </Alert>
      </Snackbar>
      <form id="myForm-EditProfile">
        <h1>Edit Profile here</h1>
        <TextField
          required
          id="FirstName-EditProfile"
          label="First Name"
          name="FirstName"
          variant="outlined"
          value={fname}
          onChange={(event) => setFName(event.target.value)}
        />

        <TextField
          required
          id="LastName-EditProfile"
          label="Last Name"
          name="LastName"
          variant="outlined"
          value={lname}
          onChange={(event) => setLName(event.target.value)}
        />

        <Button
          type="submit"
          variant="outlined"
          color="success"
          onClick={() => {
            CreateUser(editUser);
          }}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
