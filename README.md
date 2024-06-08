Sure! Here's the organized README from start to finish:

# Movie Reviews API

## Overview

This project is an API for managing movie reviews, including functionality to post, update, delete, and retrieve reviews. The API uses MongoDB for data storage and is built with Node.js and Express.

## Features

- **Post Review**: Add a new review for a movie.
- **Update Review**: Modify an existing review.
- **Delete Review**: Remove a review by its ID.
- **Get Reviews**: Retrieve reviews by ID or by movie ID.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/movie-reviews-api.git
   cd movie-reviews-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection details:
     ```plaintext
     MONGO_USERNAME=your_mongo_username
     MONGO_PASSWORD=your_mongo_password
     ```

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```

2. The server will be running on `http://localhost:8000`.

## Endpoints

### Post Review

- **URL**: `/api/v1/reviews`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "movieId": "string",
    "review": "string",
    "user": "string"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success"
  }
  ```

### Update Review

- **URL**: `/api/v1/reviews/:id`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "review": "string",
    "user": "string"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success"
  }
  ```

### Delete Review

- **URL**: `/api/v1/reviews/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "status": "success"
  }
  ```

### Get Reviews by ID

- **URL**: `/api/v1/reviews/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    // Review data
  }
  ```

### Get Reviews by Movie ID

- **URL**: `/api/v1/reviews/movie/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    // Reviews for the movie
  }
  ```

## Code Explanation

### Reviews Controller

The `ReviewsController` class handles the HTTP requests for the reviews:

```javascript
import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const { movieId, review, user } = req.body;
      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const { review, user } = req.body;
      const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);

      if (reviewResponse.error) {
        res.status(400).json({ error: reviewResponse.error });
        return;
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      const id = req.params.id;
      const reviews = await ReviewsDAO.getReviewById(id);
      if (!reviews) {
        res.status(404).json({ error: "Not found!" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviewsByMovie(req, res, next) {
    try {
      const movieId = req.params.id;
      const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);
      if (!reviews) {
        res.status(404).json({ error: "Not found!" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
```

### Server Configuration

The `server.js` file sets up the server and connects to the MongoDB database:

```javascript
import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
import ReviewsDAO from './dao/reviewsDAO.js';

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@moviesdb.xv9i54f.mongodb.net/?retryWrites=true&w=majority&appName=MoviesDB`;

const port = 8000;

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
```

## Troubleshooting DB Connection Issues

If you encounter database connection issues, ensure the following:

1. **Correct MongoDB URI**: Ensure the URI in `server.js` is correctly formatted and includes your MongoDB username and password.

2. **Network Access**: Ensure that your IP address is whitelisted in the MongoDB Atlas network access settings.

3. **MongoDB Atlas Cluster**: Verify that your MongoDB Atlas cluster is running and accessible.

4. **Environment Variables**: Ensure that your `.env` file is correctly set up with `MONGO_USERNAME` and `MONGO_PASSWORD`.

## Dependencies

- **Express**: Web framework for Node.js.
- **MongoDB**: Official MongoDB driver for Node.js.
- **dotenv**: Module to load environment variables from a `.env` file.
