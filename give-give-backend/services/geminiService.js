const { GoogleAIFileManager, GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config/dotenvConfig");

async function uploadAndAnalyzeImage(imagePath, displayName = "Uploaded Image") {
  try {
    const fileManager = new GoogleAIFileManager(config.GEMINI_KEY);
    const uploadResult = await fileManager.uploadFile(imagePath, {
      mimeType: "image/jpeg",
      displayName: displayName,
    });

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI(config.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Identify the toy in this image. Fill in this information. If you are unsure, leave it out: Title, Tags (can be brand or category), age recommendation, price recommendation.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    return result.response.text();

  } catch (error) {
    console.error("Error during upload or analysis:", error);
    throw error;
  }
}

module.exports = { uploadAndAnalyzeImage };
