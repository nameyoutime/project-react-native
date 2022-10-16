const app = require("express");
let mongoose = require("mongoose");
const router = app.Router();
const ClassSchema = require("../../schemas/Class.schemas");
const ClassDB = mongoose.model("Class", ClassSchema);

router.get("/", async (req, res) => {
  try {
    let data = await ClassDB.find().populate("teacher");
    res.send({ data: data });
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/", async (req, res) => {
  let { classes } = req.body;
  let temp = {
    ...classes,
    date: Date.now(),
  };

  try {
    let result = new ClassDB(temp);
    await result.save();
    res.status(200).send({ data: result });
  } catch (error) {
    res.send({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let  classes  = req.body;
  
  try {
    let result = await ClassDB.findByIdAndUpdate(id, classes);
    
    res.status(200).send({ data: result });
    
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let data = await ClassDB.findById(id)
      .populate("teacher")
      .populate("students");
    res.send({ data: data });
  } catch (error) {
    res.send({ error: error });
  }
});
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await ClassDB.findByIdAndDelete(id);
    res.send({ data: data });
  } catch (error) {
    res.send({ error: error });
  }
});
router.get("/student/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await ClassDB.find({ student: mongoose.Types.ObjectId(id) });
    res.send({ data: data });
  } catch (error) {
    res.send({ error: error });
  }
});

router.put("/student/:id", async (req, res) => {
  let { id } = req.params;
  let { classes } = req.body;
  // console.log(id)
  //   for (let i = 0; i < classes.students.length; i++) {

  //   }

  try {

    let indexid = classes.students.findIndex((val) => val._id == id);
    classes.students.splice(indexid, 1);
    let data = await ClassDB.updateOne({_id:mongoose.Types.ObjectId(classes._id)},classes)
    // let data = await ClassDB.find({student:mongoose.Types.ObjectId(id)});
    res.send({ data: data });
  } catch (error) {
    res.send({ error: error });
  }
});

router.get("/teacher/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await ClassDB.find({ teacher: mongoose.Types.ObjectId(id) }).populate('teacher');
    res.send({ data: data });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = router;
