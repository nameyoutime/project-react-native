const { Schema } = require("mongoose");

const ClassSchema = new Schema({
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    title:String,
    description:String,
    teacher:{ type: Schema.Types.ObjectId, ref: 'Teacher' },
    isOpen:{type:Boolean,default:true},
    date:{type:Number,default:0}

});

module.exports = ClassSchema;