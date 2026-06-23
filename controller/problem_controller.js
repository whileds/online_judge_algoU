const mongoose = require("mongoose");
const Problem = require("../models/problem");

const handleControllerError = (res, error) => {
    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ success: false, message: "Invalid problem ID" });
    }

    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ success: false, message: error.message });
    }

    console.error("Problem controller error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
};

const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find().select("-testCases");
        return res.status(200).json({ success: true, problems });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).select("-testCases");

        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }

        return res.status(200).json({ success: true, problem });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

const createProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            constraints,
            examples,
            testCases
        } = req.body;

        const problem = await Problem.create({
            title,
            description,
            difficulty,
            constraints,
            examples,
            testCases,
            createdBy: req.user.id
        });

        return res.status(201).json({ success: true, problem });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

const updateProblem = async (req, res) => {
    try {
        const allowedFields = [
            "title",
            "description",
            "difficulty",
            "constraints",
            "examples",
            "testCases"
        ];
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
        );

        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }

        return res.status(200).json({ success: true, problem });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);

        if (!problem) {
            return res.status(404).json({ success: false, message: "Problem not found" });
        }

        return res.status(200).json({ success: true, message: "Problem deleted" });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

module.exports = {
    getAllProblems,
    getProblemById,
    createProblem,
    updateProblem,
    deleteProblem
};
