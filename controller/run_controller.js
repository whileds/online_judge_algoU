const {generatefile} = require("../utiles/generateFile");
const {executeCode} = require("../utiles/executeCode");
const runcode=async (req,res)=>{
  // const language = req.body.language;
  // const code = req.body.code;
  const {language='cpp', code} = req.body;
  if(!code){
    return res.status(400).json({message: "Code is required"});
  }
  try{
    const filepath=generatefile(language, code);
    const output=await executeCode(filepath);
    res.json({filepath, output});
  }
  catch(error){
    // res.status(500).json({message: "INTERNAL SERVER ERROR"});
     console.log(error);

    res.status(500).json({
        error
    });
  }
}
module.exports = {runcode};
