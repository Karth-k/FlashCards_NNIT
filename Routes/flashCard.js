const express = require('express');
const router = express.Router();
const flashcardModel = require('../Models/flashcardModel');
const subjectTagger = require('../Utils/subjectTagger');

router.post('/', async (req, res) => {
  const { student_id, question, answer } = req.body;

  if (!student_id || !question || !answer) {
    return res.status(400).json({ message: 'Missing input fields' });
  }
  const subject = subjectTagger(question);

  const newCard = new flashcardModel({
    student_id,
    question,
    answer,
    subject,
  });

  try {
    await newCard.save();
    console.log('Flashcard added');
    res.json({ message: 'The Item is Added ', subject });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ message: 'DB error', error: err.message });
  }
});


// GET /get-subject?student_id=stu001&limit=5
router.get('/get-subject', async (req, res) => {
  const { student_id, limit } = req.query;

  if (!student_id) {
    return res.status(400).json({ message: 'Missing student_id' });
  }

  const flashLimit = parseInt(limit) || 5;

  try {
    const allCards = await flashcardModel.find({ student_id });

    const subjectMap = {};

    // Group flashcards by subject
    allCards.forEach(card => {
      if (!subjectMap[card.subject]) subjectMap[card.subject] = [];
      subjectMap[card.subject].push(card);
    });

    let mixedCards = [];
    Object.values(subjectMap).forEach(cards => {
      if (cards.length > 0) {
        const randomIdx = Math.floor(Math.random() * cards.length);
        mixedCards.push(cards[randomIdx]);
      }
    });

    for (let i = mixedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixedCards[i], mixedCards[j]] = [mixedCards[j], mixedCards[i]];
    }
    res.json(mixedCards.slice(0, flashLimit));
  } catch (err) {
    console.error('Error fetching mixed subjects:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
