const { validationResult } = require("express-validator");
const { reviewController } = require("../controllers/review.controller");

const reviewHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new Error(errors.throw());

    await reviewController(req.body, req.id);

    return (
      res
        .status(200)
        .json({
          msg: "review guardada con exito",
        })
    );
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "campos incompletos o su tipo no coincide con el indicado",
    });
  }
};

module.exports = { reviewHandler };
