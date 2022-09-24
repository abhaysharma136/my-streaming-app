import React, { forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";
import "./VerifyYourEmail.css";
import Button from "@mui/material/Button";
import { Header } from "./Header";
import * as yup from "yup";
import { useFormik } from "formik";
import { API } from "./global";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EmailValidationSchema = yup.object({
  email: yup.string().email().required(),
});

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function VerifyYourEmail() {
  const [UserStatus, setUserStatus] = useState("");
  function VerifyUserStatus(newUser) {
    const res = fetch(`${API}/users/verfyaccountstatus`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    res.then((result1) => result1.json()).then((user) => handleFinalResult(user));
  }

  function handleFinalResult(user) {
    setUserStatus(user);
    handleMessage();
  }


  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: EmailValidationSchema,
      onSubmit: (newUser, onSubmit) => {
        // console.log("OnSubmit",newUser);
        VerifyUserStatus(newUser);
        // onSubmit.resetForm();
      },
    });

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

  if (UserStatus.message === "email Sent") {
    sentRegistrationEmail(values);
  }

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
    <div className="VerifyEmail-container">
      <Header />
      {open ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={UserStatus.message === "email Sent" ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {UserStatus.message}
          </Alert>
        </Snackbar>
      ) : null}
      <h1>Not Able to Login?</h1>
      <form onSubmit={handleSubmit}>
        {/* <p>{UserStatus.message}</p> */}
        <TextField
          name="email"
          id="outlined-basic"
          label="Verify your Email"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && errors.email}
          helperText={touched.email && errors.email ? errors.email : ""}
        />

        <Button
          type="submit"
          variant="outlined"
          className="verify-email-button"
        >
          verify
        </Button>
      </form>
    </div>
  );
}
