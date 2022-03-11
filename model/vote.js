const mongoose = require("mongoose");
const schema = mongoose.Schema;

const voteSchema = new schema({
  os: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
