const express = require("express");
const mongoose = require("mongoose")
const SaleRouter = require("./routes/sale.route");;
const cors = require("cors");





const app = express();

    /* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());
/* Allowing the frontend to access the backend. */
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

/* Telling the application to use the SaleRouter for any requests that start with "/api". */
app.use("/api", SaleRouter);


/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";



/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */

/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("connected to db and Server started on port", PORT));
  })
  .catch((err) => {
    console.log(err);
  });