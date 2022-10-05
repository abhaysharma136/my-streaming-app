import "./NeedHelp.css";
import { Header } from "./Header";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global";
import { forwardRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EmailValidationSchema = yup.object({
  email: yup.string().email().required(),
});

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function NeedHelp() {
  const [result, setResult] = useState("");
  console.log(result);
  const navigate = useNavigate();
  const verify = () => {
    if (result.message === "email Sent") {
      console.log("veifing1");
      navigate(`/Email-Sent/${values.email}`);
    }
  };
  console.log(result);
  setTimeout(verify, 3000);
  function VerifyUser(User) {
    const res = fetch(`${API}/users/forgotPassword`, {
      method: "POST",
      body: JSON.stringify(User),
      headers: {
        "content-Type": "application/json",
      },
    });
    res.then((result1) => result1.json()).then((user) => handleFinalResult(user));
  }

  const handleFinalResult = (user) => {
    setResult(user);
    handleMessage();
  };

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: EmailValidationSchema,
      onSubmit: (User, onSubmit) => {
        console.log("OnSubmit", User);
        VerifyUser(User);
        // onSubmit.resetForm();
      },
    });
  // const styles={
  //   color:result.message==='email Sent'?"green":"red",
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
  };

  return (
    <div>
      <Header />
      <div id="form-content">
        {open ? (
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={result.message === "email Sent" ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {result.message}
            </Alert>
          </Snackbar>
        ) : null}
        {/* <p className='email-response' style={styles}>{result.message}</p> */}
        <form id="form_need-help" onSubmit={handleSubmit}>
          <div className="Page-text">
            <h1>Forgot Password?</h1>
            <p>Reset your Password now</p>
            <input
              type="radio"
              id="email_forgot_password"
              name="password_retreve_option"
              value="Email"
              checked
            ></input>
            <label htmlFor="email">Email</label>
            <br />
            <p>
              We will send you an email with instructions on how to reset your
              password.
            </p>
            <div className="div-button-text-box">
              <div id="email_otp_div">
                <TextField
                  type="email"
                  id="email_textBox"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email ? errors.email : ""}
                  placeholder="name@example.com"
                ></TextField>
              </div>

              <input type="submit" id="Send-button" value="Email Me"></input>
            </div>
          </div>
        </form>
      </div>
      <div className="All-link-element">
        <p>Questions? Call 000-800-040-1843</p>
        <div className="links">
          <li>
            <Link to="/FAQ">FAQ</Link>
          </li>
          <li>
            <Link to="/FAQ">Help Centre</Link>
          </li>
          <li>
            <Link to="/FAQ">Terms of Use</Link>
          </li>
          <li>
            <Link to="/FAQ">Privacy</Link>
          </li>
          <li>
            <Link to="/FAQ">Cookie Preference</Link>
          </li>
          <li>
            <Link to="/FAQ">Corporate Information</Link>
          </li>
        </div>
      </div>
    </div>
  );
}
