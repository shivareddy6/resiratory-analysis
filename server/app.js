const express = require("express");
require("./database/db");
const User = require("./database/user_db");
const Notes = require("./database/notes_db");
const cors = require("cors");
const { sendOtpToMobileNumber } = require("./utils/firebaseUtils");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/login", (req, res) => {
  res.send("hello");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      if (password === user.password)
        res.send({ message: "Login Successfull", user: user });
      else res.send({ error: "Wrong password !!!" });
    } else {
      res.send({ error: "No User found" });
    }
  });
});

app.post("/signup", (req, res) => {
  const { name, username, password, mobileNumber, email } = req.body;
  console.log(req.body);
  User.findOne({ username: username }, (err, user) => {
    console.log("error", err);
    console.log(user);
    if (err) res.send({ error: err });
    if (user) {
      res.send({ error: "Username already exists !!!" });
    } else {
      const user = new User({
        name: name,
        username: username,
        password: password,
        mobileNumber: mobileNumber,
        email: email,
      });
      console.log("Saving", user);
      user.save((err) => {
        console.log(err);
        if (err) res.send({ error: err });
        else res.send({ message: "Sign Up Successfull" });
      });
    }
  });
});

app.post("/sendEmail", (req, res) => {
  const { subject, body, to } = req.body;
  console.log("got req", body);

  const email = {
    user: "respiratoryanalysis@gmail.com",
    pass: "xmuaoiqraaillncy",
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.user,
      pass: email.pass,
    },
  });
  console.log("working 1");
  transporter
    .sendMail({
      from: `"Respiratory Site" <${email.user}>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: body, // plain text body
    })
    .then((info) => {
      console.log(info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.send("success");
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

app.post("/create-note", (req, res) => {
  console.log(req.body);
  Notes.create(req.body, (error, data) => {
    if (error) res.send(error);
    else res.send(data);
  });
  // res.send("success");
});

app.get("/notes", (req, res) => {
  Notes.find({})
    .then((allNotes) => res.send(allNotes))
    .catch((err) => res.send(err));
});

app.get("/note/:id", (req, res) => {
  Notes.findOne({ _id: req.params.id })
    .then((note) => res.send(note))
    .catch((err) => res.send(err));
});

app.put("/note/:id", (req, res) => {
  Notes.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then((message) => res.send(message))
    .catch((err) => res.send(err));
});

app.delete("/note/:id", (req, res) => {
  Notes.findByIdAndDelete(req.params.id)
    .then((mes) => res.send(mes))
    .catch((err) => res.send(err));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
