import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {

  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movieId
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await  ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      res.json({status: "success"})
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      if (reviewResponse.error) {
        res.status(400).json({error: reviewResponse.error})
        return
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review")
      }

      res.json({status: "success"})
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({status: "success"})
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id
      let reviews = await ReviewsDAO.getReviewById(id)
      if (!reviews) {
        res.status(404).json({error: "Not found!"})
        return
      }
      res.json(reviews)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }

  static async apiGetReviewsByMovie(req, res, next) {
    try {
      let movieId = req.params.id
      let reviews = await ReviewsDAO.getReviewsByMovieId(movieId)
      if (!reviews) {
        res.status(404).json({error: "Not found!"})
        return
      }
      res.json(reviews)
    } catch (e) {
      res.status(500).json({error: e.message})
    }
  }


}