const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const recetteCtrl = require("../controllers/recette");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, recetteCtrl.createRecette);

router.get("/", recetteCtrl.getRecettes);

router.get("/:id", recetteCtrl.getRecette);

router.put("/:id", auth, multer, recetteCtrl.updateRecette);

router.delete("/:id", auth, recetteCtrl.deleteRecette);

module.exports = router;
