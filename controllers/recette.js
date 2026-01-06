const Recette = require("../models/Recette");

exports.createRecette = (req, res, next) => {
  console.log(req.body);
  const thing = new Recette({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Recette enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getRecettes = (req, res, next) => {
  Recette.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

exports.getRecette = (req, res, next) => {
  Recette.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.updateRecette = (req, res, next) => {
  Recette.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Recette modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteRecette = (req, res, next) => {
  Recette.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Recette supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};
