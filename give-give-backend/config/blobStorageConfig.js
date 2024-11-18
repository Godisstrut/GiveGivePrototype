const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

// Initialize the BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

// Upload function that with a containerName as parameter
async function uploadImageToBlob(file, containerName) {
    try {
        
        //If either file or containerName is missing, an error is sent
        if (!file) throw new Error("No file provided");
        if (!containerName) throw new Error("Container name is required");

        // Get a reference to the container client
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Throws error if the container doesnt exist
        const containerExists = await containerClient.exists();
        if (!containerExists) {
            throw new Error(`Container "${containerName}" does not exist.`);
        }

        const blobName = generateUniqueFileName(200); 
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload file to Azure Blob Storage
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: { blobContentType: file.mimetype } 
        });

        // Return the URL of the uploaded blob
        return blockBlobClient.url;
    } catch (error) {
        console.error("Error uploading image to blob storage:", error);
        throw error;
    }
}

function generateUniqueFileName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
  
    // Generate random characters
    for (let i = 0; i < length - 13; i++) { // Reserve 13 characters for the timestamp
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    // Append a timestamp for additional uniqueness
    const timestamp = Date.now().toString(); // 13 characters (e.g., 1699800000000)
    return result + timestamp; // Combine random string and timestamp
  }

module.exports = {
    uploadImageToBlob
};