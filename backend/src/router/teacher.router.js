const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();
const teacherSchema = require('../../schemas/teacher.schemas');
const TeacherDB = mongoose.model('Teacher', teacherSchema);

router.get('/', async (req, res) => {
    try {
        let data = await TeacherDB.find();
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})


router.post('/', async (req, res) => {
    let { teacher } = req.body;
    let temp = {
        ...teacher
    }
    try {
        let result = new TeacherDB(temp);
        await result.save();
        res.status(200).send({ data: result });
    } catch (error) {
        res.status(200).send({ error: error });
    }

})
router.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let data = await TeacherDB.findById(id);
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})
router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { teacher } = req.body;
    try {
        await TeacherDB.findByIdAndUpdate(id,{
            userName:teacher.userName,
            password:teacher.password,
            fullName:teacher.fullName,
            role:teacher.role
        }) 
        res.send({ data: "sucess" })
    } catch (error) {
        res.send({ error: error })
    }

})

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let data = await TeacherDB.findByIdAndDelete(id);
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})


router.get('/login/:userName', async (req, res) => {
    let {userName} = req.params;
    let { password } = req.query;
    try {
        let data = await TeacherDB.find({ $and: [{userName:userName},{password:password}] });
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})


module.exports = router;