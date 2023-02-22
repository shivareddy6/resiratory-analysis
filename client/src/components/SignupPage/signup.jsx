import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./styles.css";
import sideImage from "../../assets/images/login_side_image.png";
import {
  Button,
  createTheme,
  duration,
  Link,
  ThemeProvider,
} from "@mui/material";
import { orange } from "@mui/material/colors";

import "react-phone-input-2/lib/style.css";
import MobileVerify from "./MobileVerify";
import { AuthContext } from "../../auth/AuthProvider";
import EmailVerify from "./EmailVerify";
import { motion } from "framer-motion/dist/framer-motion";

const Signup = () => {
  const navigate = useNavigate();

  /*--------------States---------------*/
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    email: "",
  });
  const [isUserValid, setIsUserValid] = useState(false);
  const [isOptVerified, setOtpVerify] = useState(false);
  const [isUserLoggedIn, setUserLoginStatus] = useState(false);
  const [isMobileVerification, changeVerificationMode] = useState(true);

  /*--------------Context---------------*/
  const { login, logout, getCurrentUser } = useContext(AuthContext);

  /*--------------Hooks---------------*/
  useEffect(() => {
    if (getCurrentUser() !== null) setUserLoginStatus(true);
  }, []);

  useEffect(() => {
    setIsUserValid(isValidUserDetails());
  }, [user, isOptVerified]);

  /*--------------Custom Functions---------------*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user, isUserValid);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const isValidUserDetails = () => {
    // console.log(
    //   user.username.length !== 0,
    //   user.password.length !== 0,
    //   user.password === user.confirmPassword,
    //   user.mobileNumber.length !== 0,
    //   isOptVerified
    // );
    if (
      user.username.length !== 0 &&
      user.password.length !== 0 &&
      user.password === user.confirmPassword &&
      isOptVerified === true &&
      ((isMobileVerification === true && user.mobileNumber.length !== 0) ||
        (isMobileVerification === false && user.email.length !== 0))
    )
      return true;
    return false;
  };

  const signup = () => {
    // console.log("signup", user);
    axios.post("http://localhost:3001/signup", user).then((res) => {
      // console.log(res.data);
      if (res.data.error) console.log(res.data.error);
      else navigate("/");
    });
  };

  /*--------------Styling---------------*/
  let theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: "#edf2ff",
      },
      green: {
        main: "#04C45C",
      },
    },
  });

  if (isUserLoggedIn === true) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <motion.main
        className="signup"
        initial={{ width: 0, x: "100px" }}
        animate={{ width: "100%", x: 0, transition: {duration: 1.5} }}
        exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
      >
        <div className="signup--content">
          <div className="signup--card">
            <h2 className="roboto-700">Sign up to your account</h2>
            <TextField
              // key="email"
              label="Username"
              variant="outlined"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
            <TextField
              // key="email"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
            <TextField
              // key="email"
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
            />

            {isOptVerified ? (
              <>
                <p style={{ color: "green" }}>OTP Verified Successfully</p>
              </>
            ) : (
              <div className="user-verification">
                {isMobileVerification ? (
                  <MobileVerify
                    handleChange={handleChange}
                    mobileNumber={user.mobileNumber}
                    setOtpVerify={setOtpVerify}
                    changeVerificationMode={changeVerificationMode}
                  />
                ) : (
                  <EmailVerify
                    handleChange={handleChange}
                    email={user.email}
                    setOtpVerify={setOtpVerify}
                    changeVerificationMode={changeVerificationMode}
                  />
                )}
              </div>
            )}
            <Button
              color="green"
              style={{ color: "white" }}
              variant="contained"
              disabled={!isUserValid}
              onClick={signup}
            >
              Signup now
            </Button>
          </div>

          <div className="signup-container">
            <p>Already have an account?</p>
            <Link underline="hover" className="link" onClick={redirectToLogin}>
              Login
            </Link>
          </div>
        </div>
        <img className="signup--side-image" src={sideImage} />
      </motion.main>
    </ThemeProvider>
  );
};

export { Signup };
