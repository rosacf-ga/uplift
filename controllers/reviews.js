const Program = require ('../models/program');

module.exports = {
  create,
  delete: deleteReview
}

function create(req,res){
  //finds movie from database
  Program.findById(req.params.id, function(err, program){
    //assigns user and userName to req.user properties
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    //review content is pushed into reviews array
    program.reviews.push(req.body);
    //whenever mutate document, must let mongdb know by using .save
    program.save(function(err){
      res.redirect(`/programs/${program._id}`)
    })
  })
}

function deleteReview(req, res){
  //finds programs with the review
  Program.findOne({'reviews._id': req.params.id}, function(err, program){
    const review = program.reviews.id(req.params.id); 
    //if user isn't the one who made the review, they cannot delete and will be redirected
    if(!review.user.equals(req.user._id)) return res.redirect(`/programs/p${program._id}`);
    review.remove();
    program.save(function(err){
      if(err) next(err) //will pass it to the err handler
      res.redirect(`/programs/${program._id}`)
    })
  })
}