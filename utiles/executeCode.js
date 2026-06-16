const fs=require("fs");
const path=require("path");
const {exec} = require("child_process");
const outputDir = path.join(__dirname, "..", "outputs");
if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}
const executeCode = async (filepath) => {
const jobid=path.basename(filepath).split(".")[0];
const outpath=path.join(outputDir, `${jobid}.exe`);
return new Promise((resolve, reject) => {
    exec(`g++ ${filepath} -o ${outpath} && ${outpath}`, 
      (error, stdout, stderr) => {
        if(error){  
            reject({error, stderr});
        }
        if(stderr){
            reject(stderr);
        }
        resolve(stdout);
    });
});
} 
module.exports = {executeCode};