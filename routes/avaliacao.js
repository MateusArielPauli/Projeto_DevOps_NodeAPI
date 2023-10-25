const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const Avaliacao = require("../models/avaliacao");

router.get("/", async (req, res) => {
  const avaliacoes = await Avaliacao.find();

  if (!avaliacoes) {
    res.status(500).json({ success: false });
  }

  res.send(avaliacoes);
});

router.get("/:id", async (req, res) => {
  const avaliacao = await Avaliacao.findById(req.params.id)

  if (!avaliacao) {
    res.status(500).json({
      success: false,
      message: "A avaliação com o ID informado não foi encontrada",
    });
  }

  res.status(200).send(avaliacao);
});

router.post("/register", async (req, res) => {
  try {
    let avaliacao = new Avaliacao({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    avaliacao = await avaliacao.save();

    if (!avaliacao) {
      return res.status(400).send("A avaliação não pode ser criada!");
    }

    res.send(avaliacao);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", (req, res) => {
  Avaliacao.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "Avaliação excluída com sucesso" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Avalição não encontrada" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;