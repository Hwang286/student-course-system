// Load the 'students' controller
var students = require('../../app/controllers/students.server.controller');
var express = require('express');
var router = express.Router();

// Define the routes module' method
module.exports = function (app) {
       
    // a post request to /tasks will execute createTask method in tasks.server.controller
    app.post('/',students.create);
    
    // a get request to /students will execute list method in students.server.controller
    app.get("/students",students.requiresLogin,students.list); //go to http://localhost:3000/students to see the list
    //
    // Set up the 'studentss' parameterized routes 
    app.route('/students/:studentId')
    .get(students.read)
    .put(students.update)
    .delete(students.delete);
    // Set up the 'taskId' parameter middleware
    // All param callbacks will be called before any handler of 
    // any route in which the param occurs, and they will each 
    // be called only once in a request - response cycle, 
    // even if the parameter is matched in multiple routes
    // Here, taskByID will be called first, then read, update, or delete methods
    app.param('studentId', students.studentByID);
    //authenticate user
    app.post('/signin', students.authenticate);
    app.get('/signout', students.signout);
    app.get('/read_cookie', students.isSignedIn);
    //
    //
    //path to a protected page
	app.get('/welcome',students.welcome);
};
