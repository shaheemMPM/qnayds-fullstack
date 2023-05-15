const express = require("express");
const mongoose = require("mongoose");

// Initialize express app
const app = express();

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define a schema for the data
const schema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Define a model for the data
const Person = mongoose.model("Person", schema);

// Create a new person and save it to the database
const person = new Person({
  name: "John Doe",
  age: 30,
});
person
  .save()
  .then(() => console.log("Person saved to database"))
  .catch((err) => console.error("Failed to save person to database", err));

// Start the server
app.listen(8000, () => console.log("Server started on port 3000"));
