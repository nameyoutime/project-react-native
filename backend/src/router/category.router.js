const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const categorySchema = require('../../schemas/category.schemas');
const CategoryDB = mongoose.model('Category', categorySchema);

router.get('/', async (req, res) => {
    // console.log("get all category");
    try {

        let data = await CategoryDB.find();
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})
router.post('/', async (req, res) => {
    // console.log("add category");
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


// router.post('/', async (req, res) => {
//     let { student } = req.body;
//     let result;

//     try {
//         let query = await StudentDB.find({ 'fullName': { "$in": student.fullName } }).count();
//         if (query <= 0) {
//             let count = await StudentDB.find().sort({_id:-1}).limit(1);
//             let temp = {
//                 ...student,
//                 sid: count[0].sid + 1
//             }
//             result = new StudentDB(temp);

//             await result.save();
//         } else {
//             result = "already exist";
//         }
//         res.status(200).send({ data: result });
//     } catch (error) {
//         res.send({ error: error });

//     }

// })


// router.get('/:sid', async (req, res) => {
//     let { sid } = req.params;
//     try {
//         let result = await StudentDB.findOne({sid:sid})
//         res.send({ result: result });
//     } catch (error) {
//         res.send({ error: error });
//     }
// })
// router.put('/:sid', async (req, res) => {
//     let { sid } = req.params;
//     let { student } = req.body;
//     try {
//         await StudentDB.findOneAndUpdate({ sid: sid }, {
//             fullName: student.fullName,
//             description: student.description
//         })
//         res.send({ result: "susccess" });
//     } catch (error) {
//         res.send({ error: error });
//     }
// })

// router.delete('/:sid', async (req, res) => {
//     let { sid } = req.params;
//     try {
//         await StudentDB.findOneAndRemove({sid:sid})
//         res.send({ result: "susccess" });
//     } catch (error) {
//         res.send({ error: error });
//     }

// })

// router.get('/id/:id', async (req, res) => {
//     let { id } = req.params;
//     try {
//         let result = await StudentDB.findById(id);
//         res.send({ result: result });
//     } catch (error) {
//         res.send({ error: error });
//     }
// })
module.exports = router;