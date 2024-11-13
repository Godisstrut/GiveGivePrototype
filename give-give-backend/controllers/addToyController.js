const Toy = require('../models/toyModel.js'); // Assuming a Toy model is defined

async function addToyToInventory(req, res) {
  try {
    const { userId, title, tags, ageRecommendation, priceRecommendation, condition, material} = req.body;

    // Validate required fields
    if (!userId || !title) {
      return res.status(400).json({ message: "User ID and Title are required." });
    }

    const newToy = new Toy({
      user_id: userId,
      title: title,
      tags: tags || [],
      age_recommendation: ageRecommendation,
      price_recommendation: priceRecommendation,
      condition: condition,
      material: material
    });

    await newToy.save();

    res.status(201).json({ message: "Toy added to inventory successfully", toy: newToy });
  } catch (error) {
    res.status(500).json({ message: "Error adding toy to inventory", error: error.message });
  }
}

module.exports = { addToyToInventory };
