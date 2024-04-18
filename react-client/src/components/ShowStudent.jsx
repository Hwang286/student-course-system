import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom';

function ShowStudent(props) {
  let navigate = useNavigate();
 
  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/students/" + id;

  const [courseData, setCourseData] = useState([]);
  const [showCourseLoading, setShowCourseLoading] = useState(true);
  const apiUrlCourse = "/api/api/courses";

  useEffect(() => {
    setShowLoading(false);
    setShowCourseLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);

      const resultCourse = await axios(apiUrlCourse);
      setCourseData(resultCourse.data);
      setShowCourseLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = id => {
    navigate('/edit/' + id
    );
  };

  const deleteStudent = id => {
    setShowLoading(true);
    const student = {
      studentNumber: data.studentNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      program: data.program,
      address: data.address,
      city: data.city,
      favoritetopic: data.favoritetopic,
      favoriteassignment: data.favoriteassignment
    };

    axios
      .delete(apiUrl, student)
      .then(result => {
        setShowLoading(false);
        navigate("/list");
      })
      .catch(error => setShowLoading(false));
  };

  //
  const displayCourseTable = courseData.map((course, idx) => {
    console.log(course);
    console.log("data" + data.studentNumber);
    if(course.students == null){
      return
    }else
    if (course.students._id == data._id) {
      return (
        <tr key={idx}>
          <td>{course.courseCode}</td>
          <td>{course.courseName}</td>
          <td>{course.section}</td>
          <td>{course.semester}</td>
        </tr>
      );
    }
  });

  return (
    <div>
        
        <h2 className="h2-style">Student Detail</h2>
        {showLoading && showCourseLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div class="jumbotron">
          <h1>
            Name: {data.firstName}, {data.lastName}
          </h1>
          <p>Email: {data.email}</p>
          <p>Student Number: {data.studentNumber}</p>
          <p>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                editStudent(data._id);
              }}
            >
              Edit
            </Button>
            &nbsp;
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                deleteStudent(data._id);
              }}
            >
              Delete
            </Button>
          </p>

          <h3>
            Courses for {data.firstName} {data.lastName}
          </h3>
          <div className="col-12 center div-style">
            <table className="table table-primary">
              <thead className="thead-dark">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Section</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {displayCourseTable}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
}

export default ShowStudent;
