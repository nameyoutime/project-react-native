const { Schema } = require("mongoose");

const StudentSchema = new Schema({
    fullName: String,
    description: String,
    sid: { type: Number, default: -1 }

});

module.exports = StudentSchema;