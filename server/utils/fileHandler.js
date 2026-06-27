const fs = require('fs').promises;
const path = require('path');

const readJSONFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with empty array
      await writeJSONFile(filePath, []);
      return [];
    }
    throw error;
  }
};

const writeJSONFile = async (filePath, data) => {
  try {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  readJSONFile,
  writeJSONFile
};
