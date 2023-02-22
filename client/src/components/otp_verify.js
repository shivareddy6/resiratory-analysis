import React, { useState } from "react"
import firebase from './firebase'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const otp_verify = (props)=> {

    const [phno , setPhno] = useState();
    const [otp , setOtp] = useState();
    const [sent , setSent] =useState(false);
    const [success , setSucess] =useState(false);
    
  var handleChange = (e) =>{
    const {name, value } = e.target
    if(name==="otp")
        setOtp(value)
    else
        setPhno(value)
  }


  const auth = getAuth();
  var configureCaptcha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    },auth);
  }



  var onSignInSubmit = (e) => {
    e.preventDefault()
    configureCaptcha()
    // setSent(true);
    // return ;
    const phoneNumber = "+91" + phno
    console.log(phoneNumber);
    let appVerifier;
    try {
      appVerifier = window.recaptchaVerifier;
    } catch (error) {
      console.log(error);
    }
    const auth=getAuth();
    signInWithPhoneNumber(auth,phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          setSent(true);
        }).catch((error) => {
          console.log(error);
          console.log("SMS not sent")
        });
  }



  var onSubmitOTP = (e) =>{
    e.preventDefault()
    setSucess(true);
    return ;
    const code = otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user))
        alert("User is verified")
        props.setVerify(true);
    }).catch((error) => {
        alert("Wrong OTP");
    });
  }




    return (
      <div>
        <form onSubmit={onSignInSubmit}>
          <div id="sign-in-button"></div>
          <TextField
                variant="outlined"
                color="primary"
                type="number"
                label="Moblile Number"
                name="mobile"
                onChange={handleChange}
            /> <br/><br/>
            {!sent && <Button variant="contained" color="secondary" type="submit" >
                Send OTP
            </Button>}
          {/* <button type="submit">Submit</button> */}
        </form>



        {sent && <p style={{color: "green"}}>OTP sent successfully.</p>}

        {sent &&
        <div className="flexCol">
        <h4>Enter OTP :</h4>
        <form onSubmit={onSubmitOTP}>
          {/* <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange}/> */}
          <TextField
                variant="outlined"
                color="primary"
                type="number"
                label="OTP number"
                name="otp"
                onChange={handleChange}
            /> <br/><br/>
            <Button variant="contained" color="secondary" type="submit" >
                Verify
            </Button>
          {/* <button type="submit">Submit</button> */}
        </form>
        {success && <h5>User Verified !!!</h5>}
        </div>
}
      </div>
    )
}
export default otp_verify