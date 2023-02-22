import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "./styles.css";
import { orange } from "@mui/material/colors";
import firebase from "../../auth/firebase";
import { generateOTP } from "../../utils/generalUtils";
import axios from "axios";
function EmailVerify({
  handleChange,
  email,
  setOtpVerify,
  changeVerificationMode,
}) {
  /*--------------States---------------*/
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(generateOTP(4));
  const [showEmail, setShowEmail] = useState(true);

  const sendOtp = async () => {
    if (email.length < 5) {
      alert("Give a valid email");
      return;
    }
    console.log(generatedOtp);
    setShowEmail(false);
    await axios
      .post("http://localhost:3001/sendEmail", {
        body: `Your OTP is ${generatedOtp}.`,
        to: "20bd1a6616@gmail.com",
        subject: "Your OTP for Respiratory Analysis Website",
      })
      .then((res) => {
        setShowEmail(false);
        console.log(res.data);
      });
  };

  const ValidateOtp = () => {
    if (otp === null || generatedOtp === null) return;
    // console.log("verify", otp, )
    if (otp === generatedOtp.toString()) {
      setOtpVerify(true);
    } else alert("wrong Code");
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

  return (
    <div className="mobile-verification" style={{ width: "100%" }}>
      {showEmail ? (
        <>
          <TextField
            type="email"
            value={email}
            onChange={handleChange}
            name="email"
            variant="outlined"
            label="Enter Email"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              color="green"
              style={{ color: "white", marginTop: "5px" }}
              variant="contained"
              onClick={sendOtp}
            >
              Verify Email
            </Button>
            <Button
              color="green"
              style={{ color: "white", marginTop: "5px" }}
              variant="contained"
              onClick={() => changeVerificationMode((prev) => !prev)}
            >
              Use Mobile Number
            </Button>
          </div>
        </>
      ) : (
        <ThemeProvider theme={theme}>
          <TextField
            label="Enter Otp"
            variant="outlined"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
          <Button
            color="green"
            style={{ color: "white", marginTop: "5px" }}
            variant="contained"
            onClick={ValidateOtp}
          >
            Submit Otp
          </Button>
        </ThemeProvider>
      )}
    </div>
  );
}

export default EmailVerify;
