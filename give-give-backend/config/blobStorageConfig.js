const { BlobServiceClient } = require('@azure/storage-blob');

// Azure Blob Storage configuration

const AZURE_STORAGE_CONNECTION_STRING = 'insert key here';

// Initialize the BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

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

        const blobName = file.originalname; 
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

module.exports = {
    uploadImageToBlob
};