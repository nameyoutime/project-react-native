const { Schema } = require("mongoose");

const categorySchema = new Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" }
});

module.exports = categorySchema;