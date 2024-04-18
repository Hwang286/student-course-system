import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom';

function ShowCourse(props) {
  let navigate = useNavigate()
  let {id} = useParams();
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
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from courses',result.data);
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

  const editCourse = (id) => {
    navigate('/editcourse/' + id
    );
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    console.log(apiUrl);
    const course = {
      courseCode: data.courseCode,
      courseName: data.courseName,
      section: data.section,
      semester: data.semester,
      students: data.students
    };
    //
    console.log(course);
    axios
      .delete(apiUrl, course)
      .then(result => {
        setShowLoading(false);
        navigate("/listcourses");
      })
      .catch(error => setShowLoading(false));
  };

  
  
  
  //
  const displayStudentTable = studentData.map((student, idx) => {
    
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
    }
    
  );

  return (
    <div className="container">
      <div className="span12 div-style">
        
        <h2 className="h2-style">Course Detail</h2>
        {showLoading && showStudentLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        
          <h1>Course Code: {data.courseCode}</h1>
          <p>Course Name: {data.courseName}</p>
          <p>Section: {data.section}</p>
          <p>Semester: {data.semester}</p>
          <p>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                editCourse(data._id)
              }}
            >
              Update My Course Info
            </Button>
            &nbsp;
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                deleteCourse(data._id)
              }}
            >
              Drop My Course
            </Button>
          </p>
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
  );
}

export default ShowCourse;
