const app = require("express");
let mongoose = require("mongoose");
const router = app.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const config = require("../config");

const dir = path.join(__dirname, '../public');
const enpointFront = `http://${config.HOST}:${config.PORT}/image/img?name=`
// SET STORAGE
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         cb(null, '../public')
//     },
//     filename: function (req, file, cb) {

//         cb(null, `${file.originalname}-${Date.now()}`)
//     }
// })
const storage = multer.diskStorage({});

// const upload = multer({
//     storage: storage
// });
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
};
const uploads = multer({ storage, fileFilter });

// // ROUTES
// router.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// })
router.post('/upload', uploads.single('profile'), (req, res) => {
    console.log('file', req);
    // console.log('body', req.body);
    res.status(200).json({
        message: 'success!',
    });
});

router.post('/test', (req, res) => {
    console.log('file', req.files);
    console.log('body', req.body);
    res.status(200).json({
        message: 'success!',
    });
});
// // router.post('/file', upload.array('file'), (req, res, next) => {
// //     file = req.file;
// //     let { data } = req.body;
// //     let temp = JSON.parse(data.toString());
// //     if (!file) {
// //         const error = new Error('No File')
// //         error.httpStatusCode = 400
// //         return next(error)
// //     }
// //     // console.log(req.file)
// //     // temp.file = req.file.filename
// //     // const img = new Img(temp);
// //     // db.createTask(img);
// //     res.send({ message: `item ${img.title} was created` });
// // })


// router.post('/files', upload.array('files'), (req, res, next) => {
//     const files = req.files;
//     let { data } = req.body;
//     let temp = JSON.parse(data.toString());
//     if (!files) {
//         const error = new Error('No File')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     // console.log(req.files.length)
//     temp.file = [];
//     for (let i = 0; i < files.length; i++) {
//         temp.file.push({
//             image: enpointFront + files[i].filename,
//             thumbImage: enpointFront + files[i].filename,
//             imageName: files[i].filename
//         })
//     }
//     // console.log(temp)
//     const img = new Img(temp);
//     db.createTask(img);
//     res.send({ sttus: 'ok' });
// })

// // router.get("/imgs", async (req, res) => {
// //     let result = await Img.find();
// //     res.send(result);
// // });

// router.delete("/delete", async (req, res) => {
//     const { id } = req.query;
//     try {
//         let result = await Img.findById(id);
//         let file = result.file;
//         await Img.deleteOne({ _id: id });
//         for (let i = 0; i < result.file.length; i++) {
//             let path = `src/public/${file[i].imageName}`
//             await fs.unlinkSync(path, (err) => {
//                 console.log(err)
//             })
//         }
//         res.send(
//             {
//                 message: `deleteted ${id}`
//             }
//         );
//     } catch (e) {
//         res.send({
//             message: `can't delete ${id}`
//         })
//     }
// });


router.get('/img', (req, res) => {
    let mime = {
        html: 'text/html',
        txt: 'text/plain',
        css: 'text/css',
        gif: 'image/gif',
        jpg: 'image/jpeg',
        png: 'image/png',
        svg: 'image/svg+xml',
        js: 'application/javascript'
    };
    let file = path.join(dir, req.query.name);
    let type = mime[path.extname(file).slice(1)] || 'text/plain';
    let s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});
module.exports = router;