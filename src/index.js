const express = require("express");
const router = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();
const multer = require('multer')

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())

mongoose 
  .connect(
    "mongodb+srv://sumitkm:sumitkm@cluster0.6pqbwjj.mongodb.net/group20Database",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", router);
app.all("*", function (req, res) {
  //
  throw new Error("Bad Request"); 
});

app.use(function (e, req, res, next) { 
  if (e.message == "Bad Request")
    return res.status(400).send({ error: e.message });
});

app.listen(process.env.PORT || 3000, function () { 
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
