const { Users, Thoughts } = require("../models");

const userController = {
  // Get all users
  getUsers(req, res) {
    Users.find({}, "-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get single user by id
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId }, "-__v")
      .populate("friends thoughts", "-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a user
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete user (BONUS: and delete associated thoughts)
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        return Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add friend to friend list
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Remove friend from friend list
  removeFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;