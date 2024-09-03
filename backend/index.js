require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const connectDb = require("./connection/db");
const cors = require("cors");
const errorMiddelware = require("./middleware/error-middelware");

const app = express();

app.use(cors());
app.use(express.json());

// error middleware
app.use(errorMiddelware);

// defining routes
const todoRoutes = require("./routes/todoRoutes");

app.use("/todo", todoRoutes);

app.get("/", (req, res) => res.status(200).json("Todo app"));

connectDb().then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
