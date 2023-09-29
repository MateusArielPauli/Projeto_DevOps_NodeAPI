var express = require('express');
var router = express.Router();

const lista = [
  {id: 1, nome: "Juca"},
  {id: 2, nome: "Ze"},
  {id: 3, nome: "Juliana"}
]

/**
 * Obter pelo ID
 */
router.get("/:id", (req, res) => {
  const { id } = req.params; // desestruturação
  //const id = req.params.id; equivalente a linha de cima

  const user = lista.find(e => e.id === id);

  return user ? res.json(user) : res.sendStatus(404);
} );

/**
 * Obter todos os usuarios da API
 */
router.get('/', (request, response) => {
  response.json(lista);
} );

router.post("/", (req, res) => {
  res.send("Funcionou POST");
} );

router.put("/", (req, res) => {
  res.send("Funcionou PUT");
} );

router.delete("/", (req, res) => {
  res.send("Funcionou DELETE");
} );



module.exports = router;
