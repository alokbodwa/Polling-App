const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://kralok:alok2001@cluster0-shard-00-00.mpwep.mongodb.net:27017,cluster0-shard-00-01.mpwep.mongodb.net:27017,cluster0-shard-00-02.mpwep.mongodb.net:27017/PollingDatabase?ssl=true&replicaSet=atlas-5ioo7x-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("mongodb Connected"))
  .catch((err) => console.log(err));
