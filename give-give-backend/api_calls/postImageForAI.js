const { uploadPixelatedImage } = require('../db_calls/uploadImage')

exports.postImageForAI = async (req, res) => {
    
    try {
        // Extract image and childId from the request body
        const { image, childId } = req.body;

        // Validate that both image and childId are provided
        if (!image || !childId) {
            return res.status(400).json({ message: 'Image and childId are required.' });
        }

        // Call the uploadPixelatedImage function to upload the image and create the toy
        const success = await uploadPixelatedImage(image, childId);

        // Check if the upload was successful and respond accordingly
        if (success) {
            return res.status(201).json({ message: 'Toy created with uploaded image successfully.' });
        } else {
            return res.status(500).json({ message: 'Failed to create toy or upload image.' });
        }
    } catch (error) {
        console.error('Error in postImageForAI:', error);
        res.status(500).json({ message: 'An error occurred during image upload and toy creation.' });
    }
    
};