const mongoose = require("mongoose");

const recetteSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recette", recetteSchema);
