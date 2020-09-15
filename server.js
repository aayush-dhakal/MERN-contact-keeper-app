const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect to database
connectDB();

// middleware to accept incoming request data as JSON and in frontend set the header to content-type:json inside axios call
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // if any route is hit(like api/contacts) then we want to load this index.html file from client build folder
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
