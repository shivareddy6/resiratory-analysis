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

function UpdateNotes({ handleClose, prevNote }) {
  const [note, setNote] = useState(prevNote || {});

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted", note);
    handleClose(false);
    axios
      .put(`http://localhost:3001/note/${note._id}`, note)
      .then((mes) => {
        console.log(mes);
        handleClose(false);
      })
      .catch((err) => console.log(err));
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
          <h1>Update Note</h1>
          <form onSubmit={handleSubmit} className="add-notes--form">
            <TextField
              variant="outlined"
              value={note.title}
              name="title"
              onChange={(e) => handleChange(e)}
              label="Title"
            />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <label htmlFor="note-body">Enter your Notes Here:</label>
              <TextareaAutosize
                minRows={3}
                value={note.body}
                onChange={(e) => handleChange(e)}
                name="body"
                label="Body"
                style={{ padding: "5px" }}
                id="note-body"
              />
            </div>

            <Button type="submit">Update</Button>
          </form>
        </ThemeProvider>
      </div>
    </>
  );
}

export default UpdateNotes;
