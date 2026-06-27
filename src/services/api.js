const API_BASE_URL = 'http://localhost:5000/api';

export const fetchCryptoPrices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/prices`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from HashSphere Backend');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

export const saveMinedBlock = async (blockData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/block`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blockData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save mined block');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving block:', error);
    throw error;
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};
