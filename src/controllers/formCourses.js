const mongoose = require("mongoose");
// const course = require("../models/course");
const FormCourse = require("../models/FormCourse");
/*-----------------------------get all courses-----------------------------*/

exports.get_FormCourse = async (req, res, next) => {
  if (!req.userId) return res.status(406).json({ massege: "Unauthenticated" });

  const data = await FormCourse.find().select("-__v");
  res.status(200).json(data);
};
/*----------------------------- post courses-----------------------------*/

exports.post_FormCourse = async (req, res, next) => {
  try {
    // if (!req.userId) return res.status(406).json({ massege: "Unauthenticated" });

    const FormCourse_id = req.body.FormCourse_id;
    const isFormCourse = FormCourse.findById(FormCourse_id);
    if (isFormCourse.lenght < 1) res.status(202).json("FormCourse not found");
    const course = new FormCourse({
      date: req.body.date,
      file: req.file.path,
      video: req.file.path,
      pdf: req.file.path,
    });
    const result = await course.save();
    res.status(200).send({
      result: result,
      request: {
        type: "GET",
        url: "localhost:3002/form/" + result._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "invalid id", error: err });
  }
};
/*-----------------------------get all courses-----------------------------*/
exports.patch_FormCourse = async (req, res, next) => {
  try {
    const _id = req.params.courseId;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).json({ message: "invalid id" });
    const data = await FormCourse.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) res.status(404).send("this id does'nt exist");
    res.status(200).json({
      message: "courseed updated",
      doc: data,
      request: {
        type: "GET",
        url: "localhost:3002/form",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/*-----------------------------get all courses-----------------------------*/
exports.delete_FormCourse = async (req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send("invalid id");
    const data = await FormCourse.findByIdAndDelete({ _id });
    if (!data) res.status(404).send("this id doesn'nt exist");
    res.status(200).send({
      message: "oredered is deleted",
      doc: data,
      request: {
        type: "GET",
        url: "localhost:3002/form",
      },
    });
  } catch (error) {
    res.status(404).send("$err");
  }
};
