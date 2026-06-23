const fs = require("fs");
const { generatefile } = require("../utiles/generateFile");
const { executeCode } = require("../utiles/executeCode");
const { generateinputfile } = require("../utiles/generateinputfile");

const supportedLanguages = new Set(["cpp", "py", "js"]);

const runcode = async (req, res) => {
    const { language = "cpp", code, input = "" } = req.body;

    if (typeof code !== "string" || code.trim() === "") {
        return res.status(400).json({ message: "Code is required" });
    }

    if (!supportedLanguages.has(language)) {
        return res.status(400).json({
            message: `Unsupported language. Use one of: ${[...supportedLanguages].join(", ")}`
        });
    }

    if (typeof input !== "string") {
        return res.status(400).json({ message: "Input must be a string" });
    }

    let filepath;
    let inputFilePath;

    try {
        filepath = generatefile(language, code);
        inputFilePath = generateinputfile(input);
        const output = await executeCode(filepath, inputFilePath);

        return res.status(200).json({ output: output.trimEnd() });
    } catch (error) {
        console.error("Code execution failed:", error.message);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Code execution failed"
        });
    } finally {
        if (filepath) await fs.promises.unlink(filepath).catch(() => {});
        if (inputFilePath) await fs.promises.unlink(inputFilePath).catch(() => {});
    }
};

module.exports = { runcode };
