import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global";
import TextField from "@mui/material/TextField";
import { forwardRef, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function LoginPage() {
  const navigate = useNavigate();
  const PasswordValidationSchema = yup.object({
    email: yup
      .string()
      .email("must be a valid email")
      .required("Please enter a valid email address."),
    password: yup
      .string()
      .min(8)
      .max(10)
      .matches()
      .required("Your password must contain between 8 and 60 characters."),
  });

  const [result, setResult] = useState({});
  console.log(result);
  // const [isLoggedin, setIsLoggedin] = useState(false);
  const verify = () => {
    if (result.token) {
      console.log("veifing1");
      localStorage.setItem("token", result.token);
      localStorage.setItem("id", result.id);
      localStorage.setItem("message", result.message);
      if (result.message === "Succesfull Login") {
        navigate(`/HomePage/Onstream/${result.id}`);
      } else {
        navigate(`/Onstream/AdminDashBoard/${result.id}`);
      }
    }
  };

  setTimeout(verify, 3000);
  function VerifyUser(newUser) {
    const res = fetch(`${API}/users/login`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    res
      .then((result1) => result1.json())
      .then((user) => {
        handleFinalResult(user);
      });
  }

  /**
   *
   * @param {object} user
   */

  /**
   * JS Doc comment, ESLint extention, prettier extension of VS code
   */
  const handleFinalResult = (user) => {
    setResult(user);
    handleMessage();
  };

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: PasswordValidationSchema,
      onSubmit: (newUser, onSubmit) => {
        // console.log("OnSubmit",newUser);
        VerifyUser(newUser);
        // setTimeout(()=>handleMessage(),300);
        onSubmit.resetForm();
      },
    });

  let id = localStorage.getItem("id");
  let message = localStorage.getItem("message");
  useEffect(() => {
    let isAuth = localStorage.getItem("token");
    if (isAuth && isAuth !== null) {
      if (message === "Succesfull Login") {
        navigate(`/HomePage/Onstream/${id}`);
      } else {
        navigate(`/Onstream/AdminDashBoard/${id}`);
      }
    }
  });

  // const styles={
  //   color:result.message==='Succesfull Login'?"green":"red",
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
    <div className="login-container">
      {open ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={
              result.message === "Succesfull Login"
                ? "success"
                : result.message === "Succesfull Admin Login"
                ? "success"
                : "error"
            }
            sx={{ width: "100%" }}
          >
            {result.message}
          </Alert>
        </Snackbar>
      ) : null}
      <div id="input-elements-all">
        <div id="Center-dispay-div">
          <h1 className="sign-up-heading">Sign In</h1>

          <div id="loginInput">
            <form id="myForm" onSubmit={handleSubmit}>
              <TextField
                type="email"
                id="email_address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email ? errors.email : ""}
                placeholder="email"
              ></TextField>

              <br />
              <br />
              <TextField
                type="password"
                id="Account-password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
                placeholder="Password"
              ></TextField>
              <br />
              <button className="SignIn_Button" type="submit">
                Sign In
              </button>

              <br></br>
              <div className="links-loginpage">
                <Link to="/verify-email" id="verify-email">
                  Verify Your email
                </Link>
                <Link to="/Need-Help" id="needhelp">
                  Need help?
                </Link>
              </div>

              <p id="New-User-text">
                {" "}
                New to Onstream?{" "}
                <span>
                  <Link to="/Register-now" id="sign-up-Link">
                    Sign up now.
                  </Link>
                </span>
              </p>
              <p id="Learn-more-text">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </p>
            </form>
          </div>
        </div>
      </div>
      <hr className="login-seprater"></hr>
      <div className="last-container" id="more-links-loginpage">
        <div className="additionalal-link-container">
          <p className="Additional-links-heading">
            Questions? Call 000-800-040-1843
          </p>
          <div className="links-bottom-click">
            <li>
              <Link to="/FAQ">FAQ</Link>
            </li>
            <li>
              <Link to="/FAQ">Help Centre</Link>
            </li>
            <li>
              <Link to="/FAQ">Account</Link>
            </li>
            <li>
              <Link to="/FAQ">Media Centre</Link>
            </li>
            <li>
              <Link to="/FAQ">Investor Relation</Link>
            </li>
            <li>
              <Link to="/FAQ">Jobs</Link>
            </li>
            <li>
              <Link to="/FAQ">Ways to Watch</Link>
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
            <li>
              <Link to="/FAQ">Contact Us</Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
