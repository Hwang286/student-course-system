var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'CourseSchema'
var CourseSchema = new Schema({
    courseCode: { 
        type: String,
        trim:true, 
        required: 'Course code cannot be blank' 
    },
    courseName: {
        type: String, default: '',
        trim: true
    },
    section: {
        type: String, default: '',
        trim: true
    },
    semester: {
        type: String, default: '',
        trim: true
    },
    students: {
        type: Schema.ObjectId, 
        ref: 'Student'
    }
});
// Create the 'Course' model out of the 'CourseSchema'
mongoose.model('Course', CourseSchema);