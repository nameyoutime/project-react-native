const app = require("express");
let mongoose = require("mongoose");
const router = app.Router();


router.get("/", async (req, res) => {
    try {
        let data = [
            { id: 1, name: 'Thien' },
            { id: 2, name: 'Long' },
            { id: 3, name: 'Bao' },

        ];
        console.log(data);
        // let data = await AttendanceDB.find();
        res.send({ data: data });
    } catch (error) {
        res.send({ error: error });
    }
});

module.exports = router;