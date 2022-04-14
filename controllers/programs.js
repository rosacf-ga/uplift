const Program = require("../models/program");

module.exports = {
  index,
  myPrograms,
  searchState,
  new: newProgram,
  create,
  show,
  edit,
  update,
  delete: deleteProgram
};

function index(req, res) {
  console.log(req.user, "<-req.user");
  //finds/will display all programs
  Program.find({}, function (err, programs) {
    res.render("programs/index", { programs, title: "All Programs" });
  });
}

function myPrograms(req, res){
  //will find program that were ONLY created by logged in user
  Program.find({user: req.user._id}, function(err, programs){
    res.render("programs/my-programs", {programs, title: "My Programs"});
  })
}

function searchState(req, res){
  //make query object to use with Program.find if user has submitted a state in search bar
  let programQuery = req.query.state ? {state: new RegExp(req.query.state, 'i')} : {};
  Program.find(programQuery, function(err, programs){
    res.render('programs/index', {programs, title: `Programs in ${req.query.state}`, nameSearch: req.query.state});
  });
}

function newProgram(req, res) {
  res.render("programs/new", { title: "Add a New Program" });
}

function create(req, res) {
  const program = new Program(req.body);
  //assigns req.users unique id to user field in program schema
  program.user = req.user._id;
  console.log(program);
  //.save tracks changes in mongoose
  program.save(function (err) {
    if (err) return res.redirect("/programs/new");
    res.redirect(`programs/${program._id}`);
  });
}

function show(req, res) {
  //req.params.id will be able to target id of specific program we want to view
  Program.findById(req.params.id, function (err, program) {
    res.render("programs/show", { title: "Program Details", program });
  });
}

function edit(req, res) {
  Program.findById(req.params.id, function (err, program) {
    res.render("programs/edit", { title: "Edit Program", program });
  });
}

function update(req, res) {
  Program.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    //updates programs with new properties
    req.body,
    //new field ensures updated program is returned
    { new: true },
    function (err, program) {
      if (err || !program) return res.redirect("/programs");
      res.redirect(`/programs/${program._id}`);
    }
  );
}

function deleteProgram(req, res){
  //ensures program was created by logged in user
  Program.findOneAndDelete({ _id: req.params.id, user: req.user._id }, function(err){
    res.redirect('/programs');
  })
}
