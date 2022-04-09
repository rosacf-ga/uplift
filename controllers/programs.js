const Program = require ('../models/program')

module.exports = {
  index, 
  new: newProgram,
  create,
  show
}

function index(req, res){
  console.log(req.user, '<-req.user')
  //finds/will display all programs
  Program.find({}, function(err, programs){ 
    res.render('programs/index', {programs, title: 'All Programs'});
  })
}

function newProgram(req,res){
  res.render('programs/new', {title: 'Add a New Program'});
}

function create(req, res){
  const program = new Program(req.body);
  program.user = req.user._id;
  console.log(program);
  program.save(function(err){
    if(err) return res.redirect('/programs/new');
    res.redirect(`programs/${program._id}`);
  })
}

function show(req, res){
  //req.params.id will be able to target id of specific program we want to view
  Program.findById(req.params.id, function(err, program){
    res.render('programs/show', {title: 'Program Details', program})
  })
}