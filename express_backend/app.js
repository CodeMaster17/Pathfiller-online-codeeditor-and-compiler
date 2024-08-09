const express = require('express')
const cors = require('cors')
const app = express()
const database = require("./config/database");
const userRoutes = require("./routes/user");
const { generateFile } = require('./code/generateFile');
const { executeCpp } = require('./code/code_execution/execute_cpp')
require('dotenv').config()
app.use(express())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

database.connect();

app.use("/api/v1/auth", userRoutes);

// ----------------- code -----------------
// for running the code
app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;

    console.log(language, "Length:", code.length);

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);
    const output = await executeCpp(filepath)
    return res.json({ filepath, output })
});


// ----------------- code end --------------


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})