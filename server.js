const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv/config");

app.use(cors());
app.options("*", cors());

// Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("tiny"));

const avaliacaoRoute = require("./routes/avaliacao");

//Routes

app.get("/", (req, res) => {});
app.use("/avaliacao", avaliacaoRoute);

const dbConfig = require("./config/database.config.js");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const PORT = process.env.NODE_DOCKER_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});