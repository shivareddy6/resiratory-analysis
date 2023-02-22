import { ThemeProvider } from "@emotion/react";
import {
  Button,
  createTheme,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import axios from "axios";
import React, { useState } from "react";
import "./styles.css";

function DeleteNote({ handleClose, allNotes, handleDeleteNode }) {
  const [filtered, setFilteredNotes] = useState([]);

  const [titleDelete, setTitleDelete] = useState("");

  const handleChange = (event) => {
    setTitleDelete(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose(false);
    console.log("delete", titleDelete);
    let note = allNotes.filter((note) => note.title === titleDelete);
    if (note.length === 0) {
      alert("No notes found with given title");
    }
    note = note[0];
    handleDeleteNode(note._id);
    // axios
    //   .post("http://localhost:3001/create-note", note)
    //   .then((mes) => {
    //     console.log(mes);
    //   })
    //   .catch((err) => console.log(err));
  };

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
    <>
      <div className="add-notes">
        <ThemeProvider theme={theme}>
          <h1>Delete Note</h1>
          <form onSubmit={handleSubmit} className="add-notes--form">
            <TextField
              variant="outlined"
              value={titleDelete}
              name="title"
              onChange={(e) => handleChange(e)}
              label="Title"
            />

            <Button type="submit">Delete</Button>
          </form>
        </ThemeProvider>
      </div>
    </>
  );
}

export default DeleteNote;
