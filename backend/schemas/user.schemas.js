const { Schema } = require("mongoose");

const UserSchema = new Schema({
    name: { type: String, default: "" },
    phone: { type: Number, default: 0 },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    // authId: { type: Schema.Types.ObjectId, ref: 'Auth' },
});

module.exports = UserSchema;