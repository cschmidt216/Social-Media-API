const { Schema, Types } = require("mongoose");
const formatDate = require("../util/formatDate");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

module.exports = reactionSchema;