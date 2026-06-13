const Problem = require("../models/problem");

// const getAllProblems = (req, res) => {
//   res.send("Fetching all problems");
// };

const getAllProblems = async (req,res)=>{
    const problems = await Problem.find();

    return res.status(200).json({
        success:true,
        problems
    });
}

// const getProblemById = (req, res) => {
//   res.send(`Fetching problem with ID: ${req.params.id}`);
// };

const getProblemById = async (req,res)=>{

    const problem = await Problem.findById(
        req.params.id
    );

    return res.status(200).json({
        success:true,
        problem
    });
}

// const createProblem = (req, res) => {
//   res.send("Creating a new problem");
// };
const createProblem = async (req, res) => {

    try{

        const {
            title,
            description,
            difficulty,
            constraints
        } = req.body;

        const problem = await Problem.create({
            title,
            description,
            difficulty,
            constraints
        });

        return res.status(201).json({
            success:true,
            problem
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

// const updateProblem = (req, res) => {
//   res.send(`Updating problem with ID: ${req.params.id}`);
// };
const updateProblem = async (req,res)=>{

    const problem =
    await Problem.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    return res.status(200).json({
        success:true,
        problem
    });
}

// const deleteProblem = (req, res) => {
//   res.send(`Deleting problem with ID: ${req.params.id}`);
// };

const deleteProblem = async (req,res)=>{

    await Problem.findByIdAndDelete(
        req.params.id
    );

    return res.status(200).json({
        success:true,
        message:"Problem Deleted"
    });
}

module.exports = {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem
};