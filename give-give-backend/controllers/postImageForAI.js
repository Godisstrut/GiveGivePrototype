const { uploadPixelatedImage } = require('../services/internal/uploadImage');
const { uploadAndAnalyzeImage } = require('../services/external/geminiService')

// POST request to upload an image and process it
exports.postImageForAI = async (req, res) => {
    try {
        
        // Extract image and childId from the request body
        const { childId } = req.body;
        const image = req.file;

        // Validate required fields
        if (!image || !childId) {
            return res.status(400).json({ message: "File or childId missing"});
        }

        // Access the image buffer for further processing (e.g., saving to storage or database)
        const imageBuffer = image.buffer;
        

        const imageAnalysisResult = await uploadAndAnalyzeImage(imageBuffer, "Toy Image");;
        console.log(imageAnalysisResult);

        /* TODO
            Upload images to database, (cutout image, original image)

            Run Gemini to and update the table in the database on the information gathered

            if successfull return 
        */

        // Call the service to upload and create the toy
        const success = await uploadPixelatedImage(imageBuffer, childId);

        

        // Check if the upload was successful and respond
        if (success) {
            return res.status(200).json({ message: 'Toy created with uploaded image successfully.' });
        } else {
            return res.status(500).json({ message: 'Failed to create toy or upload image.' });
        }
    } catch (error) {
        console.error('Error in postImageForAI:', error);
        res.status(500).json({ message: 'An error occurred during image upload and toy creation.' });
    }
};