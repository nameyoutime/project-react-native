const { Schema } = require("mongoose");

const AttendanceSchema = new Schema({
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    arr: [{
        student: { type: Schema.Types.ObjectId, ref: 'Student' },
        absence: { type: Boolean, default: true },
        date: { type: Number, default: 0 }
    }],
    class:{ type: Schema.Types.ObjectId, ref: 'Class' },
    isOpen:{type:Boolean,default:true},
    date:{type:String,default:""}
});

module.exports = AttendanceSchema;