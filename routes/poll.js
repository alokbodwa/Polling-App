const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../model/vote");

const Pusher = require("pusher");
const { pusherId } = require("../secret");

const pusher = new Pusher(pusherId);

router.get("/", (req, res) => {
  Vote.find().then((votes) => {
    res.json({ success: true, votes: votes });
  });
});

router.post("/", (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1,
  };

  new Vote(newVote).save().then((vote) => {
    pusher.trigger("os-poll", "os-vote", {
      points: vote.points,
      os: vote.os,
    });
  });

  return res.json({ success: true, message: "Thanks for voting" });
});

module.exports = router;
