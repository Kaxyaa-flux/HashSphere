const path = require('path');
const { readJSONFile, writeJSONFile } = require('../utils/fileHandler');

const feedbackFilePath = path.join(__dirname, '../data/feedback.json');

const saveFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newFeedback = {
      id: Date.now().toString(),
      name,
      email,
      message,
      submittedAt: new Date().toISOString()
    };

    const feedbackList = await readJSONFile(feedbackFilePath);
    feedbackList.push(newFeedback);
    
    await writeJSONFile(feedbackFilePath, feedbackList);
    
    return res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    console.error('Error saving feedback:', error.message);
    return res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedbackList = await readJSONFile(feedbackFilePath);
    return res.status(200).json(feedbackList);
  } catch (error) {
    console.error('Error fetching feedback:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve feedback' });
  }
};

module.exports = {
  saveFeedback,
  getFeedback
};
