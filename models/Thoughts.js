const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reactions");
const formatDate = require("../utils/formatDate");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "You need to leave a thought!"],
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;