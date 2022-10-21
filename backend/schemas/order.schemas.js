const { Schema } = require("mongoose");

const OrderSchema = new Schema({
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        _id: false
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    total: { type: Number, default: 1 },
    status: { type: Number, default: 0 },
});

module.exports = OrderSchema;