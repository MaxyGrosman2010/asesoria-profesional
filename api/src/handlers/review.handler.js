const { validationResult } = require("express-validator");
const { reviewController } = require("../controllers/review.controller");

const reviewHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new Error(errors.throw());

    const reviewer = await reviewController(req.body, req.id);
    if (reviewer.existingReview) {
      res.status(400).json({
        error: "Ya existe una revisión asociada a este usuario y servicio.",
      });
    }
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
