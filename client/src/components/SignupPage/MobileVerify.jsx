import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "./styles.css";
import { orange } from "@mui/material/colors";
import firebase from "../../auth/firebase";
function MobileVerify({ handleChange, mobileNumber, setOtpVerify, changeVerificationMode }) {
  /*--------------States---------------*/
  const [otp, setOtp] = useState("");
  const [generatedOtpObject, setOtpObject] = useState("");
  const [showMobile, setShowMobile] = useState(true);

  const sendOtp = async () => {
    // setShowMobile(false);
    // return;
    if (mobileNumber === "" || mobileNumber.length < 10) {
      alert("mobile number must be greater than 10 characters");
      return;
    }
    // console.log("+" + mobileNumber);
    const auth = firebase.auth();
    // Verifing captcha automatically
    let verify;
    try {
      verify = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          sendOtp();
          console.log("captcha verified");
        },
      });
    } catch (e) {
      console.log(e);
    }

    // Sending OTP
    auth
      .signInWithPhoneNumber("+" + mobileNumber, verify)
      .then((result) => {
        // console.log(result);
        setOtpObject(result);
        setShowMobile(false);
        // alert("code sent");
      })
      .catch((err) => {
        alert(err);
        // window.location.reload();
      });
  };

  const ValidateOtp = () => {
    // setOtpVerify(true);
    // return;
    if (otp === null || generatedOtpObject === null) return;
    generatedOtpObject
      .confirm(otp)
      .then((result) => {
        // success
        setOtpVerify(true);
        // alert("Success");
      })
      .catch((err) => {
        alert("Wrong code");
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

  return (
    <div className="mobile-verification" style={{ width: "100%" }}>
      {showMobile ? (
        <>
          <PhoneInput
            className="mobile-number"
            country={"in"}
            value={mobileNumber}
            name="mobileNumber"
            style={{
              marginLeft: "5%",
            }}
            onChange={(number, country) =>
              handleChange({
                target: { name: "mobileNumber", value: number },
              })
            }
          />
          <div id="recaptcha-container"></div>
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
              Verify Number
            </Button>
            <Button
              color="green"
              style={{ color: "white", marginTop: "5px" }}
              variant="contained"
              onClick={() => changeVerificationMode((prev) => !prev)}
            >
              Use Email
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

export default MobileVerify;
