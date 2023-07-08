const { Review } = require('../db');

const reviewController = async (req, user_id) => {
    try {
          const { idService, reviewDescription } = req;

          const newReview = await Review.create({
            description: reviewDescription,
          });

          newReview.setUser(user_id);
          newReview.setService(idService);

          await newReview.save();
    } catch (error) {
        console.log(error);
    }

};


module.exports = { reviewController };