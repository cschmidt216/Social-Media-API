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
          return res.status(404).json({ message: "No user with this ID." });
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
          return res.status(404).json({ message: "No user with this ID." });
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
          return res.status(404).json({ message: "No user with this ID." });
        }
        return Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and their thoughts have been deleted." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Add friend to friend list
addFriend(req, res) {
  const { userId, friendId } = req.params;

  // Update the friend list of the user being added
  Users.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { friends: friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this ID." });
      }
      // Update the friend list of the user being added to the friend list
      return Users.findOneAndUpdate(
        { _id: friendId },
        { $addToSet: { friends: userId } },
        { new: true }
      );
    })
    .then((dbFriendData) => {
      if (!dbFriendData) {
        return res.status(404).json({ message: "No friend with this ID." });
      }
      res.json(dbFriendData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// Remove friend from friend list
removeFriend(req, res) {
  const { userId, friendId } = req.params;

  // Update the friend list of the user being removed
  Users.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this ID." });
      }
      // Update the friend list of the user being removed from the friend list
      return Users.findOneAndUpdate(
        { _id: friendId },
        { $pull: { friends: userId } },
        { new: true }
      );
    })
    .then((dbFriendData) => {
      if (!dbFriendData) {
        return res.status(404).json({ message: "No friend with this ID." });
      }
      res.json(dbFriendData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
};

module.exports = userController;