const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");;
const fs = require("fs").promises;
const path = require("path");

async function uploadAndAnalyzeImage(imageBuffer, displayName = "Uploaded Image") {
  const tempFilePath = path.join(__dirname, "tempImage.jpg");

  try {
    // Save buffer to a temporary file
    await fs.writeFile(tempFilePath, imageBuffer);

    const fileManager = new GoogleAIFileManager(process.env.GEMINI_KEY);
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: "image/jpeg",
      displayName: displayName,
    });

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    const result = await model.generateContent([
      "Identify the toy in this image and fill in this information: Title, Tags (can be brand or category), age recommendation, price recommendation. If it is not a toy or suitable for a person under the age of 18 respond with 'Inappropiate content'",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    const parsedResponse = parseResponseToJSON(result.response.text());
    return parsedResponse;

  } catch (error) {
    console.error("Error during upload or analysis:", error);
    throw error;
  } finally {
    // Clean up the temporary file
    await fs.unlink(tempFilePath);
  }
}

module.exports = { uploadAndAnalyzeImage };

const parseResponseToJSON = (text) => {
  // Split by newlines to process each line individually
  const lines = text.split('\n');
  const jsonResult = {};

  // Regular expressions to match each field
  lines.forEach((line) => {
    if (/^Title:/.test(line)) {
      jsonResult.title = line.replace("Title:", "").trim();
    } else if (/^Tags:/.test(line)) {
      jsonResult.tags = line.replace("Tags:", "").trim().split(", ");
    } else if (/^Age recommendation:/.test(line)) {
      jsonResult.ageRecommendation = line.replace("Age recommendation:", "").trim();
    } else if (/^Price recommendation:/.test(line)) {
      jsonResult.priceRecommendation = line.replace("Price recommendation:", "").trim();
    }
  });

  return jsonResult;
};