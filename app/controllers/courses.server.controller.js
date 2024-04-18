const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require("mongoose").model("Student");
//
// Create a new error handling controller method
function getErrorMessage(err) {
  if (err.errors) {
      for (let errName in err.errors) {
          if (err.errors[errName].message) return err.errors[errName].
              message;
      }
  } else {
      return 'Unknown server error';
  }
};
// Create a new course
exports.create = function (req, res) {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    //course.students = req.body.studentNumber;
    console.log(req.body);
  //
  //
  Student.findOne({ studentNumber: req.body.studentNumber }, (err, student) => {
    if (err) {
      return getErrorMessage(err);
    }
    //
    req.id = student._id;
    console.log("student._id", req.id);
  }).then(function() {
    course.students = req.id;
    console.log("req.student._id", req.id);

    course.save(err => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.status(200).json(course);
      }
    });
  });
};
        
//
// Returns all courses
exports.list = function (req, res) {
     
    Course.find().populate('students', 'firstName lastName fullName').exec((err, courses) => {
  if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};
        
//
//'read' controller method to display a course
exports.read = function(req, res) {
    // Use the 'response' object to send a JSON response
    res.status(200).json(req.course);
};
//
// 'courseByID' controller method to find a course by its id
exports.courseByID = function (req, res, next, id) {
    Course.findById(id)
    .populate("students", "firstName lastName fullName")
    .exec((err, course) => {
      if (err) return next(err);
      if (!course) return next(new Error("Failed to load course " + id));
      req.course = course;
      console.log("in courseById:", req.course);
      next();
    });
};

//update a course by id
exports.update = function(req, res) {
    console.log("in update:", req.course);

    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;

    course.save((err) => {
      if (err) {
          return res.status(400).send({
              message: getErrorMessage(err)
          });
      } else {
          res.status(200).json(course);
      }
  }); 
};
//
// delete a course by id
exports.delete = function(req, res) {
    const course = req.course;
  course.remove(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      console.log(course);
      res.status(200).json(course);
    }
  });
};
//

exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - students: ',req.course.students);
    console.log('in hasAuthorization - student:  ',req.id);

    if (req.course.students.id !== req.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};