require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const database = require("./config/database");
const userRoutes = require("./routes/user");
const codeRoutes = require("./routes/code_route")
const playgroundRoutes = require("./routes/playground_route")
const problemRoutes = require("./routes/problem_route")


app.use(express())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

database.connect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/code", codeRoutes);
app.use("/api/v1/playground", playgroundRoutes);
app.use("/api/v1/problem", problemRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})