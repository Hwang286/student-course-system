import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from "react-bootstrap/Spinner";
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function ListCourses(props) {
  let navigate = useNavigate();
  const studentNumber = props.screen;
  console.log('props.screen'+studentNumber);
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/api/courses";
  const [studentData, setStudentData] = useState([]);
  const [showStudentLoading, setShowStudentLoading] = useState(true);
  const apiUrlStudent = "/api/students";
  
  useEffect(() => {
    setShowLoading(false);
    setShowStudentLoading(false);
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          // if(result.data.screen !== 'auth')
          // {
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          //}
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });

        const resultStudent = await axios(apiUrlStudent);
        setStudentData(resultStudent.data);
        setShowStudentLoading(false);
      };

    fetchData();
  }, []);

  const showDetail = id => {
    navigate( '/showcourse/' + id);
  };
  // console.log(data);
  let studentId = '';
  for(let i=0;i < studentData.length ;i++){
    if(studentData[i].studentNumber === studentNumber){
      studentId = studentData[i]._id;
    }
  }
  // console.log(studentId);
  // console.log(studentData);
  const displayCourseList = data.map((course, idx) => {
    if(course.students == null){return}else
    if (course.students._id == studentId) {
      return (
        <ListGroup.Item key={idx} 
        action onClick={() => { showDetail(course._id) }}>
          {course.courseCode}
        </ListGroup.Item>
      );
    }
  
  });

  return (
    <div>
      { data.length !== 0
        ? <div>

          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <h2 className="h2-style">List of My Courses</h2>
          <div class="col-12 center paddings div-style">
            <h5>Click on course to see course details.</h5>
          </div>
          <ListGroup>
            {displayCourseList}
          </ListGroup>
        </div>
        : < Login />
        
      }
    </div>
    
  );
}

export default ListCourses;
