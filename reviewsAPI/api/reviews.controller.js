import e from "cors";
import ReviewsDAO from "../dao/ReviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.addReview(movieId, review, user);
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};

      let review = await ReviewsDAO.getReview(id);
      if (!review) {
        res.status(404).json({ error: "Not found" });
      }
      res.json(review);
    } catch (error) {
      console.log(`api, ${error}`);
      res.status(500).json({
        error: error.message,
      });
    }
  }
  static async apiUpdateReview(req, res, next) {
    try {
      const movieId = req.params.id;
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.updateReview(movieId,user, review);

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update");
      }

      res.status(200).json({ status: "success" });
    } catch (error) {
      console.log(`api, ${error}`);
      res.status(500).json({
        error: error.message,
      });
    }
  }
  static async apiDeleteReview(req, res, next) {
    try {
      const id = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(id);

      res.status(200).json({ status: "success", reviewResponse });
    } catch (error) {
      console.log(`api, ${error}`);
      res.status(500).json({
        error: error.message,
      });
    }
  }
  static async apiGetReviewsByMovie(req, res, next) {
    try {
      let id = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);

    if(!reviews){
        res.status(404).json({
            error: "Not found"
        })

        return;
    }   

      res.status(200).json({ status: "success" , reviews});
    } catch (error) {
      console.log(`api, ${error}`);
      res.status(500).json({
        error: error.message,
      });
    }
  }
}
