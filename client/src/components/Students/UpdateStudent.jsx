import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomModel from "../Modal";

const UpdateStudent = ({ isOpen, handleClose, student }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [classOfStudent, setClass] = useState("");

  useEffect(() => {
    console.log(student);
    setId(student.id);
    setName(student.name);
    setClass(student.class);
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(id, name, classOfStudent);
    const data = {
      _id: student._id,
      id,
      name,
      class: classOfStudent,
    };
    console.log(data, "to update");
    axios
      .put("http://localhost:3001/students", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") setId(value);
    else if (name === "name") setName(value);
    else setClass(value);
  };
  return (
    <CustomModel open={isOpen} handleClose={handleClose}>
      <h1>Update Student Form</h1>
      <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          value={id}
          onChange={(e) => handleChange(e)}
          label="Id"
          name="id"
        />
        <TextField
          value={name}
          onChange={(e) => handleChange(e)}
          name="name"
          label="Name"
        />
        <TextField
          value={classOfStudent}
          onChange={(e) => handleChange(e)}
          name="classOfStudent"
          label="Class"
        />
        <Button onClick={(e) => handleSubmit(e)}>Update Student</Button>
      </form>
    </CustomModel>
  );
};

export default UpdateStudent;
