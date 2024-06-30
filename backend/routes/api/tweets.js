const express = require('express');
const { asyncHandler } = require('../../utils');

const router = express.Router();
const db = require('../../db/models');

const { Tweet } = db;

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json(tweets);
  })
);

router.post('/', async (req, res) => {
  const { content } = req.body;

  try {
    const newTweet = await Tweet.create({ content });
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tweet' });
  }
});

module.exports = router;
