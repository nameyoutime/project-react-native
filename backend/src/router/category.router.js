const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const categorySchema = require('../../schemas/category.schemas');
const CategoryDB = mongoose.model('Category', categorySchema);

router.get('/', async (req, res) => {
    try {
        let data = await CategoryDB.find();
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})
router.post('/', async (req, res) => {
    let { title, description } = req.body;
    try {
        let data = {};
        // check if user already exists
        let category = await CategoryDB.findOne({ title: title });
        if (category) {
            data.error = "Category already exists";
            res.send(data);
        } else {
            // create new user
            let newCategory = new CategoryDB({
                title: title,
                description: description,
            });
            await newCategory.save();
            data.message = "Category created successfully";
            res.send(newCategory);
        }
    } catch (error) {
        res.send({ error: error })
    }
})
router.put('/:id', async (req, res) => {
    // console.log("update category");
    const { id } = req.params;
    let { title, description } = req.body;
    try {
        let data = {};
        // check if user already exists
        let category = await CategoryDB.findOne({ _id: id });
        if (category) {
            category.title = title;
            category.description = description;
            await category.save();
            data.message = "Category updated successfully";
            res.send(data);
        } else {
            data.error = "Category not found";
            res.send(data);
        }
    } catch (error) {
        res.send({ error: error })
    }
})


router.delete('/:id', async (req, res) => {
    // console.log("delete category");
    const { id } = req.params;
    try {
        let data = await CategoryDB.deleteOne({ _id: id });
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})

module.exports = router;