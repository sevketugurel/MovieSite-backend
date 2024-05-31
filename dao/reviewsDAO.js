import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }
  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return {error: e};
    }
  }
  static async getReviewById(reviewId) {
    try {
      return await reviews.findOne({_id: new ObjectId(reviewId)});
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }
  static async updateReview(reviewId, user, review) {
    try {
      return await reviews.updateOne(
        {_id: new ObjectId(reviewId)},
        {$set: {user: user, review: review}}
      );
    } catch (e) {
      console.error(`Unable to update review: ${e.message}`);
      return { error: e.message }; // hatayı daha iyi yönetebilmek için e.message kullandık.
    }
  }
  static async deleteReview(reviewId) {
    try {
      return await reviews.deleteOne({_id: new ObjectId(reviewId)});
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
  static async getReviewsByMovieId(movieId) {
    console.log("movie", movieId);
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray();
    } catch (e) {
      console.error(`Unable to get review: ${e.message}`);
      return { error: e.message };
    }
  }
}
