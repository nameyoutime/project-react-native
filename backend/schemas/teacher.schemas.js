const { Schema } = require("mongoose");

const TeacherSchema = new Schema({
    userName:String,
    password:String,
    fullName:String,
    role:{type:String,default:"teacher"}

});

module.exports = TeacherSchema;