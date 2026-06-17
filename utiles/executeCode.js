const fs=require("fs");
const path=require("path");
const {exec} = require("child_process");
const outputDir = path.join(__dirname, "..", "outputs");
if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}
const executeCode = async (filepath) => {
const jobid=path.basename(filepath).split(".")[0];
const ext = path.extname(filepath).slice(1);
 if (ext === "cpp") {

        const outpath = path.join(
            outputDir,
            `${jobid}.exe`
        );

        return new Promise((resolve, reject) => {

            exec(
                `g++ "${filepath}" -o "${outpath}" && "${outpath}"`,
                (error, stdout, stderr) => {

                    if (error) {
                        return reject(error);
                    }

                    if (stderr) {
                        return reject(stderr);
                    }

                    resolve(stdout);
                }
            );

        });

    }

    else if (ext === "py") {

        return new Promise((resolve, reject) => {

            exec(
                `python "${filepath}"`,
                (error, stdout, stderr) => {

                    if (error) {
                        return reject(error);
                    }

                    if (stderr) {
                        return reject(stderr);
                    }

                    resolve(stdout);
                }
            );

        });

    }

    else if (ext === "js") {

        return new Promise((resolve, reject) => {

            exec(
                `node "${filepath}"`,
                (error, stdout, stderr) => {

                    if (error) {
                        return reject(error);
                    }

                    if (stderr) {
                        return reject(stderr);
                    }

                    resolve(stdout);
                }
            );

        });

    }

    else {

        throw new Error("Unsupported Language");

    }
};

module.exports = { executeCode };