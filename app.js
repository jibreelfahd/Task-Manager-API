const express = require("express");
const app = express();
const cors = require('cors');

// @desc IMPORTS
const mongoConnect = require("./src/db/index");
const { notFound } = require("./src/middlewares/404Middleware");
const taskRouter = require("./src/routes/taskRoutes");
const {
  customErrorHandler,
} = require("./src/middlewares/customErrorMiddleware");
require("dotenv").config();

// @desc MIDDLEWARES
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

// @desc setting PORT
const port = process.env.PORT || 2003;

// @desc setting MONGO connection
const dbURI = process.env.MONGO_URI;
const start = async () => {
  try {
    await mongoConnect(dbURI);
    app.listen(port, () =>
      console.log(`Server is up and running on port ${port}`)
    );
  } catch (error) {
    console.log("DB Error", error);
  }
};
start();

// @desc ROUTES
app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(customErrorHandler);
