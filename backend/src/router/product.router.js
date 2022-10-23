const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const productSchema = require('../../schemas/product.schemas');
const ProductDB = mongoose.model('Product', productSchema);

router.get('/', async (req, res) => {
    // console.log("get all category");
    let { category, sort, limit, skip } = req.query;
    let config = {
        category: category,
        sort: sort,
        limit: parseInt(limit) || 10,
        skip: parseInt(skip) || 0
    }
    try {
        let data = [];
        switch (config.sort) {
            case 'newest':
                config.sort = { timestamp: -1 }
                break;
            case 'oldest':
                config.sort = { timestamp: 1 }
                break;
            case 'price-asc':
                config.sort = { price: 1 }
                break;
            case 'price-desc':
                config.sort = { price: -1 }
                break;
            default:
                break;
        }
        if (config.category == 'all') {
            data = await ProductDB.find().populate('categories').sort(config.sort).limit(config.limit).skip(config.skip*config.limit);
            // setTimeout(() => {
            //     console.log("test")
            // }, 5000);
        } else {
            let objectid = { categories: mongoose.Types.ObjectId(config.category) };
            data = await ProductDB.find(objectid).populate('categories').sort(config.sort).limit(config.limit).skip(config.skip*config.limit);
            // console.log(data);
        }

        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})

router.post('/', async (req, res) => {
    let { product } = req.body;
    // console.log(product)

    try {
        // check if product exist or not in db
        // console.log(product.title)
        let check = await ProductDB.findOne({ title: product.title });

        if (check) {
            res.send({ error: "Product already exist!" })
        } else {
            // add a product
            let newProduct = new ProductDB({
                title: product.title,
                description: product.description,
                price: product.price,
                images: product.images,
                quantity: product.quantity,
                categories: product.categories,
                timestamp: new Date().getTime()
            });
            await newProduct.save();
            // console.log(newProduct);
            let data = await newProduct.populate('categories');
            res.send({ data: data });
        }
    } catch (error) {
        res.send({ error: error })
    }



});

router.put('/:id', async (req, res) => {
    let { product } = req.body;
    let { id } = req.params;

    try {
        // update product
        let data = await ProductDB.findOneAndUpdate({ _id: id }, product);
        // 4. get updated product
        let updatedProduct = await ProductDB.findById(id).populate('categories');
        // console.log(updatedProduct)
        res.send({ data: updatedProduct });
    } catch (error) {
        res.send({ error: error })
    }
});
router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        // console.log(id);
        await ProductDB.findByIdAndDelete(id);
        res.send({ message: "Success!" })
    } catch (err) {
        res.send({ error: error });
    }
})

router.get('/search', async (req, res) => {
    let { keyword } = req.query;
    // console.log(keyword)
    try {
        let data = await ProductDB.find({ title: { $regex: keyword, $options: 'i' } }).populate('categories');
        res.send({ data: data });
    } catch (error) {
        res.send({ error: error });
    }
})

module.exports = router;