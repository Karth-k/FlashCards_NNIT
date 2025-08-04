const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const flashcardRoutes = require('./Routes/flashCard');
dotenv.config();

const app = express();
app.use(express.json());

console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.error('Mongo error:', err.message));

app.use('/flashcard', flashcardRoutes);
// app.use('get-subject',flashcardRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
