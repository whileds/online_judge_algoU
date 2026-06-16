const fs = require("fs");
const path = require("path");
const {v4:uuid}= require('uuid');
const dirCode = path.join(__dirname, "..", "codes");
if(!fs.existsSync(dirCode)){
    fs.mkdirSync(dirCode);
}
const generatefile = (language, code) => {
 const jobId=uuid();
 const filename= `${jobId}.${language}`;
 const filepath=path.join(dirCode, filename);
 fs.writeFileSync(filepath, code);
 return filepath;
};
module.exports = {generatefile};