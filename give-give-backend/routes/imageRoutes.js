const express = require("express");
const router = express.Router();
const toyIdentifierController = require("../controllers/toyIdentifierController");
const multer = require("multer");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });  // Change the destination folder as needed

router.post("/upload", upload.single("image"), toyIdentifierController.handleToyIdentification);

module.exports = router;
