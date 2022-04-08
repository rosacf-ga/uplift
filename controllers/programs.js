const Program = require ('../models/program')

module.exports = {
  index, 
  new: newProgram
}

function index(req, res){
  Program.find({}, function(err, programs){ 
    res.render('programs/index', {programs, title: 'All Programs'});
  })
}

function newProgram(req,res){
  const newProgram = new Program();
  res.render('programs/new', {title: 'Add a New Program'});
}