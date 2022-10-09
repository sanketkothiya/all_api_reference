const express = require("express");
const app = express();
const port = 5000;
const connection = require("./database/connection");
const morgan = require("morgan");
connection();

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// log requests
app.use(morgan("tiny"));

app.use(express.json());

const articlesRoutes = require("./routes/article");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const userRoute = require('./routes/user');


app.use("/api/articles", articlesRoutes);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/user", userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
