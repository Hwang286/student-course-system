import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent(props) {
  let { id } = useParams();
  console.log(id)
  let navigate = useNavigate();
  const [student, setStudent] = useState({
    _id: '',
    studentNumber: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    program: '',
    address: '',
    city: '',
    favoritetopic: '',
    favoriteassignment: ''
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/students/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = e => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      studentNumber: student.studentNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      phoneNumber: student.phoneNumber,
      email: student.email,
      program: student.program,
      address: student.address,
      city: student.city,
      favoritetopic: student.favoritetopic,
      favoriteassignment: student.favoriteassignment
    };
    axios.put(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        navigate('/show/' + result.data._id);
      })
      .catch(error => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = e => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div>
        
        {showLoading && 
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
        
          <Form onSubmit={updateStudent}>
            <Form.Group>
              <Form.Label> Student Number</Form.Label>
              <Form.Control
                type="text"
                name="studentNumber"
                id="studentNumber"
                value={student.studentNumber}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                value={student.firstName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                value={student.lastName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={student.phoneNumber}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                rows="3"
                placeholder="Enter email"
                value={student.email}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                name="program"
                id="program"
                placeholder="Enter program"
                value={student.program}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                id="address"
                placeholder="Enter address"
                value={student.address}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                id="city"
                placeholder="Enter city"
                value={student.city}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Favorite Topic</Form.Label>
              <Form.Control
                type="text"
                name="favoritetopic"
                id="favoritetopic"
                placeholder="Enter favorite topic"
                value={student.favoritetopic}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Favorite Assignment</Form.Label>
              <Form.Control
                type="text"
                name="favoriteassignment"
                id="favoriteassignment"
                placeholder="Enter favorite assignment"
                value={student.favoriteassignment}
                onChange={onChange}
              />
            </Form.Group>

            <Button variant="primary col-12" type="submit">
              Update
            </Button>
          </Form>
        
      </div>
  );
}

export default EditStudent;
