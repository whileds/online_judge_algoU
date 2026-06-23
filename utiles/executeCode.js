const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const outputDir = path.join(__dirname, "..", "outputs");
const EXECUTION_TIMEOUT_MS = 5000;
const MAX_OUTPUT_BYTES = 1024 * 1024;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

class ExecutionError extends Error {
    constructor(message, statusCode = 422) {
        super(message);
        this.name = "ExecutionError";
        this.statusCode = statusCode;
    }
}

const runProcess = (command, args, inputFilePath) => new Promise((resolve, reject) => {
    const child = spawn(command, args, {
        windowsHide: true,
        stdio: ["pipe", "pipe", "pipe"]
    });

    let stdout = "";
    let stderr = "";
    let outputSize = 0;
    let finished = false;

    const finish = (callback, value) => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        callback(value);
    };

    const timer = setTimeout(() => {
        child.kill();
        finish(
            reject,
            new ExecutionError(`Execution timed out after ${EXECUTION_TIMEOUT_MS / 1000} seconds`)
        );
    }, EXECUTION_TIMEOUT_MS);

    const collectOutput = (chunk, target) => {
        outputSize += chunk.length;
        if (outputSize > MAX_OUTPUT_BYTES) {
            child.kill();
            finish(reject, new ExecutionError("Program output exceeded the 1 MB limit"));
            return;
        }

        if (target === "stdout") stdout += chunk.toString();
        else stderr += chunk.toString();
    };

    child.stdout.on("data", (chunk) => collectOutput(chunk, "stdout"));
    child.stderr.on("data", (chunk) => collectOutput(chunk, "stderr"));
    child.stdin.on("error", (error) => {
        if (error.code !== "EPIPE") finish(reject, error);
    });

    child.on("error", (error) => {
        const message = error.code === "ENOENT"
            ? `${command} is not installed or is not available in PATH`
            : error.message;
        finish(reject, new ExecutionError(message, 500));
    });

    child.on("close", (exitCode) => {
        if (exitCode !== 0) {
            return finish(
                reject,
                new ExecutionError(stderr.trim() || `Process exited with code ${exitCode}`)
            );
        }

        finish(resolve, stdout);
    });

    if (inputFilePath) {
        const inputStream = fs.createReadStream(inputFilePath);
        inputStream.on("error", (error) => finish(reject, error));
        inputStream.pipe(child.stdin);
    } else {
        child.stdin.end();
    }
});

const executeCode = async (filepath, inputFilePath) => {
    const jobId = path.parse(filepath).name;
    const extension = path.extname(filepath).slice(1).toLowerCase();

    if (extension === "cpp") {
        const executablePath = path.join(
            outputDir,
            process.platform === "win32" ? `${jobId}.exe` : jobId
        );

        try {
            await runProcess("g++", [filepath, "-o", executablePath]);
            return await runProcess(executablePath, [], inputFilePath);
        } finally {
            await fs.promises.unlink(executablePath).catch(() => {});
        }
    }

    if (extension === "py") {
        const pythonCommand = process.platform === "win32" ? "python" : "python3";
        return runProcess(pythonCommand, [filepath], inputFilePath);
    }

    if (extension === "js") {
        return runProcess("node", [filepath], inputFilePath);
    }

    throw new ExecutionError(`Unsupported language: ${extension || "unknown"}`, 400);
};

module.exports = { executeCode, ExecutionError };
