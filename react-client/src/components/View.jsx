import CreateCourse from "./CreateCourse";
import ListCourses from "./ListCourses";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//
import axios from "axios";
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [courseOperation, setCourseOperation] = useState("no-op");
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get("/api/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const getData = async () => {
    try {
      const res = await axios.get("/api/welcome");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //
  const createCourse = () => {
    console.log("in createCourse");
  };
  //
  const listCourses = (studentNumber) => {
    console.log("in courseList: ",studentNumber);
  };

  return (
    
    <div className="App">
      {
        (() => {
          switch (courseOperation) {
            case 'list':
              return <ListCourses screen={screen} setScreen={setScreen}/>
            case 'create':
              return <CreateCourse screen={screen} setScreen={setScreen} />
            
            default:
              return <div>
              <p>{screen}</p>
              <p>{data}</p>
              <button
                onClick={getData}
                
              >
                Get Data
              </button>
              <button
                onClick={() => setCourseOperation('create')}
                
              >
                Create Course
              </button>
              <button
                onClick={() => setCourseOperation('list')}
                
              >
                List Courses
              </button>
              <button
                onClick={deleteCookie}                
              >
                Log out
              </button>
            </div>
          }
        })()
      }
    </div>
  );
            
}

//
export default View;
