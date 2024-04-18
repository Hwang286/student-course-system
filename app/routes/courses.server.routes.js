// Load the 'courses' controller
const courses = require('../../app/controllers/courses.server.controller');
// Load the 'students' controller
const students = require('../../app/controllers/students.server.controller');
// Define the routes module' method
module.exports = function (app) {
    app
    .route('/api/courses')
    .get(courses.list)
    .post(students.requiresLogin, courses.create);
  //
  app
    .route('/api/courses/:courseId')
    .get(courses.read)
    .put(students.requiresLogin, courses.hasAuthorization, courses.
      update)
    .delete(students.requiresLogin, courses.hasAuthorization, courses.
      delete);

  app.param('courseId', courses.courseByID);
};
