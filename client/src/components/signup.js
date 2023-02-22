import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OtpVerify from "./otp_verify";
import Divider from '@mui/material/Divider';
import { Chip } from "@mui/material";
const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [verify, setVerify] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const signup = () => {
    if (verify === false) {
      alert("Please Verify Phone Number.");
      return;
    }
    const { name, username, password } = user;
    if (name && username && password) {
      axios
        .post("http://localhost:3001/signup", user)
        .then((res) => {
          alert(res.data.message);
          navigate("/login");
        })
        .catch((err) => console.log("req error", err));
    } else {
      alert("invlid input");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div className="flexCol signup">
        {/* {console.log("User", user)} */}
        <h1>Sign Up</h1>
        {/* <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>  */}
        <div className="flexCol">
          <TextField
            variant="outlined"
            color="primary"
            type="text"
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />{" "}
          {/* <input type="text" name="username" value={user.username} placeholder="Your username" onChange={ handleChange }></input> <br/><br/> */}
          <TextField
            variant="outlined"
            color="primary"
            type="text"
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />{" "}
          {/* <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input> <br/><br/> */}
          <TextField
            variant="outlined"
            color="primary"
            type="password"
            label="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />{" "}
          <OtpVerify setVerify={setVerify} />
          <Button variant="contained" color="primary" onClick={signup}>
            Sign Up
          </Button>
        </div>
        &ensp;
        <Divider>
          <Chip label="OR" />
        </Divider>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </Box>
  );
};

export default Register;
