const path = require('path');
const { readJSONFile, writeJSONFile } = require('../utils/fileHandler');

const blocksFilePath = path.join(__dirname, '../data/blocks.json');

const saveBlock = async (req, res) => {
  try {
    const { data, previousHash, nonce, hash, timestamp } = req.body;

    // Basic validation
    if (!previousHash || nonce === undefined || !hash || !timestamp) {
      return res.status(400).json({ error: 'Missing required block fields' });
    }

    const newBlock = {
      data: data || '',
      previousHash,
      nonce,
      hash,
      timestamp,
      minedAt: new Date().toISOString()
    };

    const blocks = await readJSONFile(blocksFilePath);
    blocks.push(newBlock);
    
    await writeJSONFile(blocksFilePath, blocks);
    
    return res.status(201).json({ message: 'Block saved successfully', block: newBlock });
  } catch (error) {
    console.error('Error saving block:', error.message);
    return res.status(500).json({ error: 'Failed to save block' });
  }
};

const getHistory = async (req, res) => {
  try {
    const blocks = await readJSONFile(blocksFilePath);
    return res.status(200).json(blocks);
  } catch (error) {
    console.error('Error reading blocks:', error.message);
    return res.status(500).json({ error: 'Failed to read block history' });
  }
};

module.exports = {
  saveBlock,
  getHistory
};
