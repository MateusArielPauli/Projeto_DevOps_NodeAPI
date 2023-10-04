var express = require('express');
var router = express.Router();
const User = require("../models/User");

/**
 * Obter pelo ID
 */
router.get("/:id", async(req, res) => {
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }
  catch(err) {
    return res.status(400).json({ message: "Formato do ID inválido"});
  }

  const user = await User.findById(id);

  return user
    ? res.json(user)
    : res.status(404).json({ message: "ID inexistente"});
} );

/**
 * Obter todos os usuarios da API
 */
router.get('/', async (request, response) => {
  const users = await User.find();

  return response.json(users);
} );

/**
 * Cadastrar usuario na colecao
 */
router.post("/", async (req, res) => {
  const user = req.body;

  const result = await User.create(user);

  res.send(user);
  //return result.json(result);

} );

/**
 * Atualizar usuario
 */
router.put("/:id", async(req, res) => {
  const userJson = req.body; //dados do usuario para atualizar
  const { id } = req.params; //o id do usuario

  try{
    new mongoose.Types.ObjectId(id);
  }
  catch(err) {
    return res.status(400).json({ message: "Formato do ID inválido"});
  }

  const userConfere = await User.findById(id);

  if(userConfere){
    userJson.updatedAt = new Date();
    userJson.createdAt = userConfere.createdAt;

    //Fazer a validação dos atributos do objeto
    const hasErrors = new User(userJson).validateSync();
    if(hasErrors) return res.status(400).json(hasErrors);

    await User.updateOne({_id: id}, userJson);
    return res.json(userJson);
  }

} );

/**
 * Deletar por ID
 */
router.delete("/", async(req, res) => {
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }
  catch(err) {
    return res.status(400).json({ message: "Formato do ID inválido"});
  }

  const result = await User.deleteOne(id);

  return result.deletedCount > 0
    ? res.send()
    : res.status(404).json({ message: "ID inexistente"});
} );



module.exports = router;
