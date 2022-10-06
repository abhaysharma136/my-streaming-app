import "./Register.css";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { API } from "./global.js";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { forwardRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import Alert from '@mui/material/Alert';

const PasswordValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("This is a required field"),
  password: yup
    .string()
    .min(8)
    .matches()
    .required("Your password must contain between 4 and 60 characters."),
  FirstName: yup.string().required("This is a required field"),
  LastName: yup.string().required("This is a required field"),
});

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function Register() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  console.log(result);
  const verify = (message) => {
    console.log("Sending Email to Register");
    console.log(message.email);
    sentRegistrationEmail({ email: message.email });
    navigate(`/login-page`);
  };

  function sentRegistrationEmail(newUser) {
    fetch(`${API}/email/RegisterConfirmation`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    // res.then((result)=>result.json()).then((user)=>setResult(user));
  }

  function CreateUser(newUser) {
    const res = fetch(`${API}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    res.then((result) => result.json()).then((user) => handleFinalResult(user));
  }

  function handleFinalResult(user) {
    setResult(user);
    handleMessage();
  }

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { FirstName: "", LastName: "", email: "", password: "" },
      validationSchema: PasswordValidationSchema,
      onSubmit: (newUser, onSubmit) => {
        console.log("OnSubmit", newUser);
        CreateUser(newUser);
        onSubmit.resetForm();
      },
    });
  // const styles={
  //   color:result.message==='email allready exists'?"red":"green",
  // }

  const [open, setOpen] = useState(false);

  const handleMessage = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    if (result.message === "Email Sent to registered Email") {
      verify(result);
    }
  };

  return (
    <div className="RegisterPage-container">
      <Header />
      <div id="component-main-elements">
        <h1>Create your account to start your membership</h1>
        <form id="myForm-registerPage" onSubmit={handleSubmit}>
          {open ? (
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={
                  result.message === "Email Sent to registered Email"
                    ? "success"
                    : "error"
                }
                sx={{ width: "100%" }}
              >
                {result.message}
              </Alert>
            </Snackbar>
          ) : null}
          <TextField
            type="text"
            id="FirstName-registerPage"
            placeholder="First Name"
            name="FirstName"
            value={values.FirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.FirstName && errors.FirstName}
            helperText={
              touched.FirstName && errors.FirstName ? errors.FirstName : ""
            }
          ></TextField>
          <br></br>
          <TextField
            type="text"
            id="LastName-registerPage"
            placeholder="Last Name"
            name="LastName"
            value={values.LastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.LastName && errors.LastName}
            helperText={
              touched.LastName && errors.LastName ? errors.LastName : ""
            }
          ></TextField>

          <TextField
            type="email"
            id="email-id-registerPage"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : ""}
          ></TextField>

          <br></br>
          <TextField
            type="password"
            id="user-password-registerPage"
            placeholder="Add a Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : ""
            }
          ></TextField>

          <br />
          <button type="submit" id="Next-button-registerPage">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
