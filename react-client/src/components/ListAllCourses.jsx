import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from 'react-bootstrap/ListGroup';
import Login from './Login';
import { useNavigate, useParams } from 'react-router-dom';


function ListAllCourses(props) {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/courses";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = id => {
    navigate("/showcourseview/" + id
    );
  };

  let array = [];
  data.map(item => {
    if (
      !array.find(
        course =>
          course.courseCode === item.courseCode &&
          course.courseName === item.courseName &&
          course.section === item.section &&
          course.semester === item.semester
      )
    ) {
      array.push(item);
      return item;
    }
  });

  return (
    <div>
      { data.length !== 0
        ? <div>

          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <h2 className="h2-style">List of All Courses</h2>
          <div class="col-12 center paddings div-style">
            <h5>Click on course to see course details.</h5>
          </div>
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.courseCode}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : < Login />
        
      }
    </div>
  );
}

export default ListAllCourses;
