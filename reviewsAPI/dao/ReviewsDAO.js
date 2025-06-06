import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async InjectDB(conn) {
    if (reviews) {
      console.log("Connection already estd");
      return;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews");
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error(`Unable to establish collection handles DAO, ${error}`);
    }
  }

  static async addReview(movieId, review, user) {
    try {
      const reviewDoc = {
        movieId,
        review,
        user,
      };

      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      console.log(`Unable to post review: ${error}`);
      return { error: e };
    }
  }

  static async getReview(reviewId) {
    try {
      if (!ObjectId.isValid(reviewId)) {
        console.log("Invalid ObjectId:", reviewId);
        return null;
      }
      return await reviews.findOne({ _id: new ObjectId(reviewId) });
    } catch (error) {
      console.log(`Unable to get review: ${error}`);
      return { error: error.message };
    }
  }

  static async updateReview( reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      );
      return updateResponse;
    } catch (error) {
      console.log(`Unable to update review: ${error}`);
      return { error: error.message };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
      });
      return deleteResponse;
    } catch (error) {
      console.log(`Unable to update review: ${error}`);
      return { error: e };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray();
    } catch (error) {
      console.log(`Unable to get review: ${error}`);
      return { error: e };
    }
  }
}
