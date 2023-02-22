const firebase = require("../database/firebase");

const sendOtpToMobileNumber = async (mobileNumber) => {
  const auth = firebase.auth();
  let verify;
  try {
    verify = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        signup();
        console.log("captcha verified");
      },
    });
  } catch (e) {
    console.log(e);
  }
  return await auth
    .signInWithPhoneNumber("+" + mobileNumber, verify)
    .then((result) => {
      //   console.log(result);
      //   setfinal(result);
      //   setShowMobile(false);
      //   alert("code sent");
      console.log("sent otp");
      return result;
    })
    .catch((err) => {
      console.log("error in fb", err);
      return err;
    });
};

module.exports = {
  sendOtpToMobileNumber,
};
