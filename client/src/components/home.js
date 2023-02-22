import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography, IconButton } from "@mui/material";
import { Edit, Delete, DragHandle } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/system";
import { orange } from "@mui/material/colors";

const notes = [
  { id: "note-1", content: "Note 1" },
  { id: "note-2", content: "Note 2" },
  { id: "note-3", content: "Note 3" },
];

const NotesApp = () => {
  const [notesState, setNotesState] = useState(notes);

  const handleDeleteNote = (noteId) => {
    const filteredNotes = notesState.filter((note) => note.id !== noteId);
    setNotesState(filteredNotes);
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
      mode: "dark",
      background: {
        default: "#1c1c1c",
        paper: "#252525",
      },
      text: {
        primary: "#f5f5f5",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
        dark: "#bf5f82",
      },
    },
  });

  return (
    <div>
      <Navbar />
      {/* <ThemeProvider theme={darkTheme}> */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <Grid item xs={12}>
          <Paper sx={{ p: 2, boxShadow: 3 }} style={{margin: "0 50px"}}>
            <Typography variant="h5" sx={{ mb: 2, color: "#37474f" }}>
              Notes
            </Typography>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="notes">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {notesState.map((note, index) => (
                      <Draggable
                        key={note.id}
                        draggableId={note.id}
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
                                {note.content}
                              </Typography>
                              <IconButton
                                onClick={() => handleDeleteNote(note.id)}
                                sx={{ color: "#37474f" }}
                              >
                                <Delete />
                              </IconButton>
                              <IconButton sx={{ color: "#37474f" }}>
                                <Edit />
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
      {/* </ThemeProvider> */}
    </div>
  );
};

export default NotesApp;
