const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const orderSchema = require('../../schemas/order.schemas');
const OrderDB = mongoose.model('Order', orderSchema);

router.get('/', async (req, res) => {
    // get all order
    try {
        let data = await OrderDB.find().populate('user').populate('products.product')
        res.send({ data: data })
    }
    catch (error) {
        res.send({ error: error })
    }

})

router.post('/', async (req, res) => {
    let { order } = req.body;
    // console.log(order)
    try {
        // check if order exist or not in db
        let check = await OrderDB.findOne({ _id: order._id });
        if (check) {
            res.send({ error: "Order already exist!" })
        } else {
            let newOrder = new OrderDB({ ...order, status: 0, timestamp: new Date().getTime() });
            let data = await newOrder.save();
            res.send({ data: data })
        }
    } catch (error) {
        res.send({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    // get order by id
    let { id } = req.params;
    // console.log(id);
    try {
        let data = await OrderDB.find({ user: id }).populate('products.product').populate('user');
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})

// change status of order
router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { status } = req.body;
    try {
        let data = await OrderDB.findOneAndUpdate({ _id: id }, { status: status }, { new: true });
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})


module.exports = router;