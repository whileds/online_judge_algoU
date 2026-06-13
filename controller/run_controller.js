const runcode=async (req,res)=>{
  // const language = req.body.language;
  // const code = req.body.code;
  const {language='cpp', code} = req.body;
  if(code === undefined){
    return res.status(400).json({message: "Code is required"});
  }
  try{
    res.json({language, code});
  }
  catch(error){
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
}
module.exports = {runcode};
