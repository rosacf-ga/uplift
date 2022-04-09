const Program = require ('../models/program')

module.exports = {
  index, 
  new: newProgram,
  create
}

function index(req, res){
  Program.find({}, function(err, programs){ 
    res.render('programs/index', {programs, title: 'All Programs'});
  })
}

function newProgram(req,res){
  res.render('programs/new', {title: 'Add a New Program'});
}

function create(req, res){
  const program = new Program(req.body);
  console.log(program);
  program.save(function(err){
    if(err) return res.redirect('/programs/new');
    res.redirect('/programs');
  })
}