import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import NavBar from "../Navbar";
import StudentAdd from "./StudentAdd";
import StudentDelete from "./StudentDelete";
import "./styles.css";
import UpdateStudent from "./UpdateStudent";

const Students = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [isStudentAddOpen, setStudentAddOpen] = useState(false);
  const [isStudentDeleteOpen, setStudentDeleteOpen] = useState(false);
  const [isStudentUpdateOpen, setStudentUpdateOpen] = useState(false);
  const [updateStudent, setUpdateStudent] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/students")
      .then((students) => {
        console.log(students.data);
        setAllStudents(students.data);
        setStudents(students.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/students")
      .then((students) => {
        console.log(students.data);
        setAllStudents(students.data);
        setStudents(students.data);
      })
      .catch((err) => console.log(err));
  }, [isStudentAddOpen, isStudentDeleteOpen, isStudentUpdateOpen]);

  useEffect(() => {
    if (searchId === "") {
      setStudents(allStudents);
      return;
    }
    setStudents(() => allStudents.filter((student) => student.id === searchId));
  }, [searchId]);

  return (
    <div>
      <NavBar />
      <div className="my-2" style={{ margin: "10px 15%" }}>
        <div className=" flex justify-between items-center p-2 my-3">
          <Button onClick={() => setStudentAddOpen(true)}>Add Student</Button>
          <h1 className="flex m-0" style={{ alignItems: "center" }}>
            Students List
          </h1>
          <Button onClick={() => setStudentDeleteOpen(true)}>
            Delete Student
          </Button>
        </div>
        <input
          className="p-2 m-2"
          placeholder="search for Id"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {students.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className={`p-2 border-0`}
                        style={{ borderRadius: "30px", background: "#E4DCCF" }}
                      >
                        <Edit
                          onClick={() => {
                            setUpdateStudent(student);
                            setStudentUpdateOpen(true);
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <h3>No Students To Display</h3>
        )}
      </div>
      <StudentAdd
        isOpen={isStudentAddOpen}
        handleClose={() => setStudentAddOpen(false)}
      />
      <StudentDelete
        isOpen={isStudentDeleteOpen}
        handleClose={() => setStudentDeleteOpen(false)}
        allStudents={allStudents}
      />
      <UpdateStudent
        isOpen={isStudentUpdateOpen}
        handleClose={() => setStudentUpdateOpen(false)}
        student={updateStudent}
      />
    </div>
  );
};

export default Students;
