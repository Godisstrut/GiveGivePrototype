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

        //TODO:    Make a check for for if the childId exists in DB_

        // Access the image buffer for further processing (e.g., saving to storage or database)
        const imageBuffer = image.buffer;
        

        const imageAnalysisResult = await uploadAndAnalyzeImage(imageBuffer, "Toy Image");;
        console.log(imageAnalysisResult);

        // Testing data
        // const imageAnalysisResult = require('../json-test/toy.json');  

        const Title = imageAnalysisResult.title;
        const stringifiedTags = imageAnalysisResult.tags.join(',');
        const Age_recommendation = imageAnalysisResult.ageRecommendation;
        const Price_recommendation = imageAnalysisResult.priceRecommendation;

        // Call the service to upload and create the toy
        const toyId = await uploadPixelatedImage(imageBuffer, childId, Title, stringifiedTags, Age_recommendation, Price_recommendation);

        const Tags = imageAnalysisResult.tags

        const formData = {
            Title: Title, 
            Tags: Tags
        }

        // Check if the upload was successful and respond
        if (toyId != null) {
            
            const response = {
                toyId: toyId,
                formData: formData
            }
            return res.status(200).json({ response });
        } else {
            return res.status(500).json({ message: 'Failed to create toy or upload image.' });
        }
    } catch (error) {
        console.error('Error in postImageForAI:', error);
        res.status(500).json({ message: 'An error occurred during image upload and toy creation.' });
    }
};