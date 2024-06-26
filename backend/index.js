import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy (Default Origins)
app.use(cors());

// Middleware for handling CORS Policy (Custom Origins)
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
//   })
// )

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("MERN");
})

app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then((result) => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  }).catch((err) => {
    console.log(err);
  });