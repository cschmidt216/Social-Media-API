const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Routes for '/api/thoughts'
router.route("/")
  .get(getThoughts)
  .post(createThought);

// Routes for '/api/thoughts/:thoughtId'
router.route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Routes for '/api/thoughts/:thoughtId/reactions'
router.route("/:thoughtId/reactions")
  .post(addReaction);

// Routes for '/api/thoughts/:thoughtId/reactions/:reactionId'
router.route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;