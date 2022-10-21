const { Schema } = require("mongoose");

const AuthSchema = new Schema({
    userName: { type: String, default: "" },
    password: { type: String, default: "" },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = AuthSchema;