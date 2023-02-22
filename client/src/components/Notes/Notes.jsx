import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography, IconButton, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Edit, Delete, DragHandle } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import NavBar from "../Navbar";
// import { createTheme, ThemeProvider } from "@mui/system";
import axios from "axios";
import UpdateNotes from "./UpdateNotes";
import AddNotes from "./AddNotes";
import Modal from "../Modal";
import { orange } from "@mui/material/colors";
import DeleteNote from "./DeleteNote";

const Notes = () => {
  const [notesState, setNotesState] = useState([]);
  const [filtered, setFilteredNotes] = useState([]);
  const [updateNoteOpen, setUpdateNoteOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [deleteNoteOpen, setDeleteNoteOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((allNotes) => {
        console.log(allNotes);
        setNotesState(allNotes.data);
        setFilteredNotes(allNotes.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((allNotes) => {
        console.log(allNotes);
        setNotesState(allNotes.data);
        setFilteredNotes(allNotes.data);
      })
      .catch((err) => console.log(err));
  }, [addNoteOpen, deleteNoteOpen, updateNoteOpen]);

  useEffect(() => {
    if (search === "") {
      setFilteredNotes(notesState);
    } else {
      setFilteredNotes((prev) => {
        return notesState.filter((note) => note.title.includes(search));
      });
    }
  }, [search, notesState]);

  useEffect(() => console.log(filtered), [filtered]);

  useEffect(() => console.log(addNoteOpen), [addNoteOpen]);

  const handleDeleteNote = (noteId) => {
    // console.log(`http://localhost"3001/note/${noteId}`);
    axios
      .delete(`http://localhost:3001/note/${noteId}`)
      .then((mes) => {
        const filteredNotes = notesState.filter((note) => note._id !== noteId);
        setNotesState(filteredNotes);
      })
      .catch((err) => console.log(err));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(notesState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNotesState(items);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: "#edf2ff",
        darker: "#edf2ff",
      },
      orange: {
        main: orange[500],
      },
    },
  });

  return (
    <>
      <div>
        <NavBar />
        <Grid
          container
          justifyContent="center"
          //   alignItems="center"
          sx={{
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            paddingTop: "10%",
          }}
        >
          <Grid item xs={12}>
            <Paper sx={{ p: 2, boxShadow: 3 }} style={{ margin: "0 50px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" sx={{ mb: 2, color: "#37474f" }}>
                  Notes
                </Typography>
                <input
                  type="text"
                  placeholder="Search for notes"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ padding: "3px", width: "50%" }}
                />
                <ThemeProvider theme={theme}>
                  <Button color="orange" onClick={() => setAddNoteOpen(true)}>
                    Add Note
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Button
                    color="orange"
                    onClick={() => setDeleteNoteOpen(true)}
                  >
                    Delete Note
                  </Button>
                </ThemeProvider>
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="notes">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {filtered.map((note, index) => (
                        <Draggable
                          key={note._id}
                          draggableId={note._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              // {...provided.dragHandleProps}
                            >
                              <Paper
                                sx={{
                                  p: 2,
                                  my: 1,
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: "white",
                                }}
                              >
                                <div {...provided.dragHandleProps}>
                                  <DragHandle style={{ paddingRight: "5px" }} />
                                </div>
                                <Typography sx={{ flex: 1, color: "#37474f" }}>
                                  {note.title}
                                </Typography>
                                <IconButton
                                  onClick={() => handleDeleteNote(note._id)}
                                  sx={{ color: "#37474f" }}
                                >
                                  <Delete />
                                </IconButton>
                                <IconButton sx={{ color: "#37474f" }}>
                                  <Edit
                                    onClick={() => {
                                      setUpdateId(index);
                                      setUpdateNoteOpen(true);
                                    }}
                                  />
                                </IconButton>
                              </Paper>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Paper>
          </Grid>
        </Grid>
        <UpdateNotes />
      </div>
      <Modal open={updateNoteOpen} handleClose={() => setUpdateNoteOpen(false)}>
        <UpdateNotes
          handleClose={setUpdateNoteOpen}
          prevNote={notesState[updateId]}
        />
      </Modal>
      <Modal open={addNoteOpen} handleClose={() => setAddNoteOpen(false)}>
        <AddNotes handleClose={setAddNoteOpen} />
      </Modal>
      <Modal open={deleteNoteOpen} handleClose={() => setDeleteNoteOpen(false)}>
        <DeleteNote
          handleClose={setDeleteNoteOpen}
          allNotes={notesState}
          handleDeleteNode={handleDeleteNote}
        />
      </Modal>
    </>
  );
};

export default Notes;
