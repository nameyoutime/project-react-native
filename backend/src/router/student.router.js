const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const studentSchema = require('../../schemas/student.schemas');
const StudentDB = mongoose.model('Student', studentSchema);

router.get('/', async (req, res) => {
    try {
        let data = await StudentDB.find();
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})
router.post('/', async (req, res) => {
    let { student } = req.body;
    let result;
    
    try {
        let query = await StudentDB.find({ 'fullName': { "$in": student.fullName } }).count();
        if (query <= 0) {
            let count = await StudentDB.find().sort({_id:-1}).limit(1);
            let temp = {
                ...student,
                sid: count[0].sid + 1
            }
            result = new StudentDB(temp);
            
            await result.save();
        } else {
            result = "already exist";
        }
        res.status(200).send({ data: result });
    } catch (error) {
        res.send({ error: error });
        
    }

})


router.get('/:sid', async (req, res) => {
    let { sid } = req.params;
    try {
        let result = await StudentDB.findOne({sid:sid})
        res.send({ result: result });
    } catch (error) {
        res.send({ error: error });
    }
})
router.put('/:sid', async (req, res) => {
    let { sid } = req.params;
    let { student } = req.body;
    try {
        await StudentDB.findOneAndUpdate({ sid: sid }, {
            fullName: student.fullName,
            description: student.description
        })
        res.send({ result: "susccess" });
    } catch (error) {
        res.send({ error: error });
    }
})

router.delete('/:sid', async (req, res) => {
    let { sid } = req.params;
    try {
        await StudentDB.findOneAndRemove({sid:sid})
        res.send({ result: "susccess" });
    } catch (error) {
        res.send({ error: error });
    }

})

router.get('/id/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let result = await StudentDB.findById(id);
        res.send({ result: result });
    } catch (error) {
        res.send({ error: error });
    }
})
module.exports = router;