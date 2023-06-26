const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../controllers/users_controller");

// Routes for '/api/users'
router.route("/")
  .get(getUsers)
  .post(createUser);

// Routes for '/api/users/:userId'
router.route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Routes for '/api/users/:userId/friends/:friendId'
router.route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;