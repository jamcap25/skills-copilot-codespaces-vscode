// Create web server
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Comment Schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    date: { type: Date, default: Date.now }
});

// Create Comment Model
const Comment = mongoose.model('Comment', commentSchema);

// Routes
// Get all comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});