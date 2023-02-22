import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import nodemailer from "nodemailer";
import axios from "axios";
import { generateOTP } from "../utils/generalUtils";
import Modal from "./Modal";
import AddNotes from "./Notes/AddNotes";
import UpdateNotes from "./Notes/UpdateNotes";

function Testing() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const { login, logout, getCurrentUser } = useContext(AuthContext);
  const [boolState, setBoolState] = useState(true);
  // console.log(user)

  let testAccount = {
    user: "rosendo.hermiston40@ethereal.email",
    pass: "h9RdWh9mkj4sEbkz6t",
  };

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  const sendMail = (body) => {
    transporter
      .sendMail({
        from: `"Fred Foo 👻" <${testAccount.user}>`, // sender address
        to: "lila.hoppe@ethereal.email", // list of receivers
        subject: "Hello ✔", // Subject line
        text: body, // plain text body
        html: "<b>Hello world?</b>", // html body
      })
      .then((info) => {
        console.log(info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
  };

  const handleSubmit = async () => {
    setBoolState(true);
  };
  return (
    <>
      <TextField
        value={first}
        onChange={(e) => setFirst(e.target.value)}
      ></TextField>
      <br />
      <br />
      <TextField
        value={second}
        onChange={(e) => setSecond(e.target.value)}
      ></TextField>
      <br />
      <br />
      <button onClick={handleSubmit}>submit</button>
      <Modal open={boolState} handleClose={() => setBoolState(false)}>
        <UpdateNotes
          handleClose={setBoolState}
          prevNote={{
            _id: "thisId",
            title: "Title",
            body: "body",
          }}
        />
      </Modal>
    </>
  );
}

export { Testing };
