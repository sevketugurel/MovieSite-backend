import express from "express";
import ReviewCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/").get((req, res) => res.send("Hello World!"));

router.route("/movie/:id").get(ReviewCtrl.apiGetReviews);
router.route("/new").post(ReviewCtrl.apiPostReview);
router.route("/:id")
  .put(ReviewCtrl.apiUpdateReview)
  .delete(ReviewCtrl.apiDeleteReview)
  .get(ReviewCtrl.apiGetReviews);
export default router;