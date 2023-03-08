import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CustomModel from "../Modal";

const StudentDelete = ({ isOpen, handleClose, allStudents }) => {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let student = {};
    for (var i = 0; i < allStudents.length; i++) {
      if (allStudents[i].id === id) {
        student = allStudents[i];
        break;
      }
    }
    console.log(student);
    axios
      .delete("http://localhost:3001/students", { data: student })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleClose();
  };
  return (
    <CustomModel open={isOpen} handleClose={handleClose}>
      <h1>Delete Student Form</h1>
      <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          value={id}
          onChange={(e) => setId(e.target.value)}
          label="Enter Id"
        />
        <Button onClick={handleSubmit}>Delete Student</Button>
      </form>
    </CustomModel>
  );
};

export default StudentDelete;
