const express = require("express");
const cors = require("cors");
const todoRouter = require("./routes/todoRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/todos", todoRouter);

module.exports = app;