const googleAIService = require("../services/googleAIService");

async function handleToyIdentification(req, res) {
  try {
    const imagePath = req.file.path;
    const result = await googleAIService.uploadAndAnalyzeImage(imagePath, req.body.displayName || "Uploaded Image");
    res.status(200).json({ message: "Image analyzed successfully", result });
    
  } catch (error) {
    res.status(500).json({ message: "Error analyzing image", error: error.message });
  }
}

module.exports = { handleToyIdentification };
