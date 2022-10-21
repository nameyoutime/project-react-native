const { Schema } = require("mongoose");

const productSchema = new Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    images: [{ id: { type: String, default: "" }, url: { type: String, default: "" },_id:false }],
    quantity: { type: Number, default: 0 },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    timestamp: { type: Number, default: 0 }
});

module.exports = productSchema;