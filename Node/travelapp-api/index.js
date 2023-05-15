const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/travelapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.json());

// const destinations = [
//   {
//     name: "banglore",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vidhana_Soudha_as_of_8_June_2022.jpg/640px-Vidhana_Soudha_as_of_8_June_2022.jpg",
//   },
//   {
//     name: "chennai",
//     image:
//       "https://chennaitourism.travel/images/places-to-visit/headers/marina-beach-chennai-tourism-entry-fee-timings-holidays-reviews-header.jpg",
//   },
// ];

// Define a schema for the data
const destinationSchema = new mongoose.Schema({
  name: String,
  image: String,
});

// Define a model for the data
const Destinations = mongoose.model("Destination", destinationSchema);

app.get("/", (_req, res) => {
  Destinations.find()
    .then((destinations) => {
      res.json({
        destinations,
      });
    })
    .catch((err) =>
      console.error("Failed to load destinations from database", err)
    );
});

app.post("/", (req, res) => {
  const newDestination = new Destinations({
    name: req.body.name,
    image: req.body.image,
  });

  newDestination
    .save()
    .then(() => {
      Destinations.find()
        .then((destinations) => {
          res.json({
            destinations,
          });
        })
        .catch((err) =>
          console.error("Failed to load destinations from database", err)
        );
    })
    .catch((err) => console.error("Failed to save person to database", err));
});

app.listen(port, () => {
  console.log(`TravelApp Started on port: http://localhost:${port}`);
});

/*
Basic type of requests:
------------------------

1. GET     -> Get Data
2. POST    -> Send Data to Be Created
3. PATCH   -> Update Data
4. DELETE  -> Delete Data
*/
