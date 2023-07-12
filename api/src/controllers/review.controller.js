const { Review, User, Service } = require("../db");

const reviewController = async (req, user_id) => {
  try {
    const { idService, reviewDescription, score } = req;

    const existingReview = await Review.findOne({
      where: { id: userId, id: serviceId },
      include: [{ model: User }, { model: Service }],
    });
    if (existingReview) {
      return 1
    }

    const newReview = await Review.create({
      description: reviewDescription,
      score: score,
    });

    newReview.setUser(user_id);

    newReview.setService(idService);

    await newReview.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { reviewController };
