const mongoose = require("mongoose");

const connectDatabase = () => {
    console.log("Connecting the database")
  mongoose
    .connect(
      "mongodb+srv://root:root@cluster0.gldvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;
