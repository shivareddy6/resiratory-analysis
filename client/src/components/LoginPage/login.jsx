import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./styles.css";
import sideImage from "../../assets/images/login_side_image.png";
import {
  Button,
  Checkbox,
  createTheme,
  Link,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import {style}
import { orange } from "@mui/material/colors";
import { AuthContext } from "../../auth/AuthProvider";
import { motion } from "framer-motion/dist/framer-motion";

const Login = () => {
  // console.log(setLoginUser);
  const navigate = useNavigate();

  /*--------------States---------------*/
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isUserLoggedIn, setUserLoginStatus] = useState(false);

  /*-------------Context-------------*/
  const { login, logout, getCurrentUser } = useContext(AuthContext);

  /*-------------Hooks-------------*/
  useEffect(() => {
    // User is already present
    if (getCurrentUser() !== null) setUserLoginStatus(true);
  }, []);

  /*-------------Custom Functions-------------*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    login(user.username, user.password).then((result) => {
      // console.log(result);
      if (result.error) {
        console.log(result.error);
      } else {
        navigate("/");
      }
    });
  };

  const redirectToSignup = () => {
    navigate("/signup");
  };

  /*-------------Styling-------------*/
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

  const CustomCheckBox = styled(Checkbox)(({ theme }) => ({
    width: 24,
    height: 24,
    "& .MuiSvgIcon-root": {
      fontSize: theme.typography.pxToRem(15),
    },
  }));

  // console.log("current", isUserLoggedIn);
  if (isUserLoggedIn === true) return <Navigate to="/" />;
  return (
    <ThemeProvider theme={theme}>
      <motion.main
        className="login"
        initial={{ width: 0, x: "-100px" }}
        animate={{ width: "100%", x: 0, transition: {duration: 1.5} }}
        exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
      >
        <img className="login--side-image" src={sideImage} />
        <div className="login--content">
          <div className="login--card">
            <h2 className="roboto-700">Login to your account</h2>
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
            <div className="login--card-footer">
              <label style={{ display: "flex", alignItems: "center" }}>
                <CustomCheckBox size="small" />
                <p className="remember-me">Remember me</p>
              </label>
              <Link underline="hover" className="link">
                Forgot Password?
              </Link>
            </div>
            <Button
              color="green"
              style={{ color: "white" }}
              variant="contained"
              onClick={handleLogin}
            >
              Login now
            </Button>
          </div>

          <div className="signup-container">
            <p>Dont have an account?</p>
            <Link underline="hover" className="link" onClick={redirectToSignup}>
              Signup now
            </Link>
          </div>
        </div>
      </motion.main>
    </ThemeProvider>
  );
};

export { Login };
