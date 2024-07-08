const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const charRouter = require("./src/routers/charRouter"); 
const seriesRouter = require("./src/routers/seriesRouter");

const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/characters", charRouter); // Characters endpoints
app.use("/api/series", seriesRouter);   // Series endpoints

app.get("/", (req, res) => {
    res.send("Hi");
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
