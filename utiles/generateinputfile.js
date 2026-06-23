const fs = require("fs");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const dirinput =path.join(__dirname, "..", "input");
if(!fs.existsSync(dirinput)){
    fs.mkdirSync(dirinput);
}
const generateinputfile = (input) => {
    const jobId = uuidv4();
    const inputfilename = `${jobId}.txt`;
    const filepath = path.join(dirinput, inputfilename);
    fs.writeFileSync(filepath, input ?? "");
    return filepath;
}
module.exports = {generateinputfile};
