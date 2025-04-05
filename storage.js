const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // Only needed for Node.js < 18

// Function to ensure directory exists
const ensureDirectoryExists = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
};

const downloadFile = async (cid, filePath) => {
    try {
        console.log(`Downloading file with CID: ${cid}...`);
        const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const buffer = await response.buffer();

        ensureDirectoryExists(filePath);

        // Write file
        fs.writeFileSync(filePath, buffer);
        console.log(`File successfully saved to ${filePath}`);

    } catch (error) {
        console.error('Failed to save the file:', error);
    }
};

// Replace with your desired output file path
downloadFile('bafkreid3immaraas53siakrkitnpl4xzrnrmkfes2l5n5daboi3ztpvbwq', './downloaded-data.json');
