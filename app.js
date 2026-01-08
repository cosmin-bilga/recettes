const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const recetteRoute = require("./routes/recette");
const utilisateurRoute = require("./routes/utilisateur");
const path = require("path");

/* CONNEXION */
const uri = process.env.DB_URI;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
mongoose
  .connect(uri, clientOptions)
  .then(() => console.log("Connexion à MongoDB réussie !"))

  .catch(() => console.log("Connexion à MongoDB échouée !"));

/* HEADERS CORS */

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/* ROUTES */

app.use("/api/recette", recetteRoute);
app.use("/api/auth", utilisateurRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
