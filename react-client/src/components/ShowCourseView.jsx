import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom';

function ShowCourseView(props) {
  let navigate = useNavigate();
 
  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/courses/" + id;
  // const [courseData, setCourseData] = useState([]);
  // const [showCourseLoading, setShowCourseLoading] = useState(true);
  // const apiUrlCourse = "/api/api/courses";
  const [studentData, setStudentData] = useState([]);
  const [showStudentLoading, setShowStudentLoading] = useState(true);
  const apiUrlStudent = "/api/students";

  useEffect(() => {
    setShowLoading(false);
    // setShowCourseLoading(false);
    setShowStudentLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);

      // const resultCourse = await axios(apiUrlCourse);
      // setCourseData(resultCourse.data);
      // setShowCourseLoading(false);

      const resultStudent = await axios(apiUrlStudent);
      setStudentData(resultStudent.data);
      setShowStudentLoading(false);
    };

    fetchData();
  }, []);

  console.log(data)

  //
  const displayStudentTable = studentData.map((student, idx) => {
      if (data.students==null){ return}else
      if (student._id === data.students._id) {
        return (
          <tr key={idx}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.program}</td>
            <td>{student.email}</td>
          </tr>
        );
      }
    
  });

  return (
    <div className="container">
      <div className="span12 div-style">
        <div>
          
        </div>
        <h2 className="h2-style">Course Detail</h2>
        {showLoading && showStudentLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div class="jumbotron">
          <h1>Course Code: {data.courseCode}</h1>
          <p>Course Name: {data.courseName}</p>
          <p>Section: {data.section}</p>
          <p>Semester: {data.semester}</p>

          <h3>Students enrolled for {data.courseCode}</h3>

          <div className="col-12 center div-style">
            <table className="table table-primary">
              <thead className="thead-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Program</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>{displayStudentTable}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCourseView;
