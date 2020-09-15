const mongoose = require("mongoose");
const config = require("config");
// config is only for local development, if you want to publish in production then make producion.json file and define the db and secret there 

const db = config.get("mongoURI");

// for local mongodb put something like this in default.json file
// {
//   "mongoURI":"mongodb://127.0.0.1:27017/contact-keeper-api",
//   "jwtSecret":"secret"
// }

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("mongodb connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
