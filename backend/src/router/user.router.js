const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const authSchema = require('../../schemas/auth.schemas');
const AuthDB = mongoose.model('Auth', authSchema);

const userSchema = require('../../schemas/user.schemas');
const UserDB = mongoose.model('User', userSchema);

router.get('/', async (req, res) => {
    try {
        let data = await UserDB.find();
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})
router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        let data = await AuthDB.findOne({ _id: id }).populate('user');

        // console.log(data);
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }
})
router.post('/register', async (req, res) => {
    let { userName, password } = req.body;
    try {
        let data = {};
        // check if user already exists
        let user = await AuthDB.findOne({ userName: userName });
        if (user) {
            data.error = "User already exists";
            res.send(data);
        } else {
            // create new user
            let newProfile = new UserDB({
                name: "",
                phone: 0,
                address: "",
                email: "",
                isAdmin: false,
            });
            let newUser = new AuthDB({
                userName: userName,
                password: password,
                user: newProfile._id,
            });
            await newProfile.save();
            await newUser.save();
            data.message = "User created successfully";
            res.send(data);
        }
    } catch (error) {
        res.send({ error: error })
    }
})
router.post('/login', async (req, res) => {
    let { userName, password } = req.body;
    // console.log(req.body)
    try {
        let data = {};
        // check if user already exists
        let user = await AuthDB.findOne({ userName: userName });
        if (user) {
            // check if password is correct
            if (user.password === password) {
                data.message = "Login successful";
                data.user = await user.populate('user');
                res.send(data);
            } else {
                data.error = "Incorrect password";
                res.send(data);
            }
        } else {
            data.error = "User does not exist";
            res.send(data);
        }
    } catch (error) {
        res.send({ error: error })
    }
})

router.put('/update/profile', async (req, res) => {
    const { id } = req.query;
    const { profile } = req.body;
    // console.log(profile)à
    try {
        let data = await UserDB.findOneAndUpdate({ _id: id }, profile);
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