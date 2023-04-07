const router = require("express").Router();
const handleAllPost = require("../controller/post.controller");

// I will do create some post API and plain the before how can i work it.
/*
 * create a post
 * update a post
 * delete a post
 * like a post
 * get a post
 * get timeline posts
 */

// create a new post
router.route("/").post(handleAllPost.createANewPost);

// update a post
// delete a post
router
  .route("/:id")
  .patch(handleAllPost.updateASinglePost)
  .delete(handleAllPost.deleteASinglePost);

// like and disliked a post
router.route("/:id/like").patch(handleAllPost.likeASinglePost);

// Get user all post
router.route("/").get(handleAllPost.getUserAllPost);

// Get a post
router.route("/:id").get(handleAllPost.getASinglePost);

router.route("/user-comments/:id").patch(handleAllPost.userCommentsInfo);
// Get a timeline post
router.route("/timeline/:id").get();

module.exports = router;
