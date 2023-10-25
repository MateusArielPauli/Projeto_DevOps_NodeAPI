const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  idPasseio: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dataAvaliacao: {
    type: Date,
    required: true,
  },
  classificacao: {
    type: Number,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
});
 
userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Avaliacao", userSchema);