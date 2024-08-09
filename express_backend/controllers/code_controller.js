const { generateFile } = require('../code/generateFile')
const { executeCpp } = require('../code/code_execution/execute_cpp')
const { executePy } = require('../code/code_execution/executePy')
exports.run_code = async (req, res) => {
    const { language = "cpp", code } = req.body;

    console.log(language, "Length:", code.length);

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    try {

        // need to generate a c++ file with content from the request
        const filepath = await generateFile(language, code);
        var output;
        if (language === "cpp") {
            output = await executeCpp(filepath)
        } else {
            output = await executePy(filepath)
        }
        return res.json({ filepath, output })
    } catch (error) {
        console.log(error);
    }
}