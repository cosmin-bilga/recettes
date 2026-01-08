const mongoose = require("mongoose");

const commentaireSchema = mongoose.Schema({
  comment: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const recetteSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String, default: "" },
});

module.exports = mongoose.model("Recette", recetteSchema);
