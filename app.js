const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const mongoConnection = require("./config/db");
const path = require("path");

dotenv.config();

mongoConnection(process.env.MONGO_URL);

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoute);

// app.get("/", (req, res) => console.log(req.headers));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ready at ${port}`));
