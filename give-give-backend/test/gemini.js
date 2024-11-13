require('dotenv').config();

const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function uploadAndAnalyzeImage(imagePath, displayName = "Uploaded Image") {
  try {
    console.log(process.env.GEMINI_KEY);
    const fileManager = new GoogleAIFileManager('AIzaSyD2TBMAhLh74Xj0M0f2LHlbcHGbWyKMW0M');
    const uploadResult = await fileManager.uploadFile(imagePath, {
      mimeType: "image/jpeg",
      displayName: displayName,
    });

    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI('AIzaSyD2TBMAhLh74Xj0M0f2LHlbcHGbWyKMW0M');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Identify the toy in this image. Fill in this information, if you are unsure leave it out: Title, Tags (can be brand or category), age recommendation, price recommendation.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    console.log(result.response.text());
    return result.response.text(); 

  } catch (error) {
    console.error("Error during upload or analysis:", error);
  }
}

const mediaPath = '../test-images/test-toy-5.jpg';
uploadAndAnalyzeImage(mediaPath, "test-toy");
