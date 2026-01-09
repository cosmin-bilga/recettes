const Recette = require("../models/Recette");
const fs = require("fs");

exports.createRecette = (req, res, next) => {
  //console.log(req.body.thing);
  const thingObject = JSON.parse(req.body.recette);
  delete thingObject._id;
  delete thingObject._userId;

  console.log(
    `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  );

  const thing = new Recette({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
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
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.recette),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  delete thingObject._userId;
  Recette.findOne({ _id: req.params.id })
    .then((recette) => {
      console.log(recette.author, "-", req.auth.userId);
      if (recette.author != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        Recette.updateOne(
          { _id: req.params.id },
          { ...thingObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Recette modifié!" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteRecette = (req, res, next) => {
  Recette.findOne({ _id: req.params.id })
    .then((recette) => {
      if (recette.author != req.auth.userId) {
        res.status(401).json({ message: "Non-autorisé" });
      } else {
        const filename = recette.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Recette.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "Recette supprimée !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.createRecetteComment = (req, res, next) => {
  Recette.updateOne(
    { _id: req.params.id },
    {
      $push: {
        comments: { comment: req.body.comment, author: req.auth.userId },
      },
    }
  )
    .then((recette) =>
      res.status(200).json({ message: "Recette mise à jour!" })
    )
    .catch((error) => res.status(400).json({ error }));
};
