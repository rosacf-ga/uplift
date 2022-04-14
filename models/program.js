const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const reviewSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userName: String, 
  userAvatar: String
}, {
  timestamps: true
})

const programSchema = new Schema({
  programName: {type: String, required: true}, 
  city: {type: String, required: true}, 
  state: {
    type: String,
    enum: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
    required: true
  }, 
  website: String,
  description: {type: String, required: true}, 
  reviews: [reviewSchema], 
  user: {type: Schema.Types.ObjectId, ref: 'User'}
  //user field will be used to assess whether or not client can delete a program, depending if they created it or not 
}, {
  timestamps: true
})

module.exports = mongoose.model('Program', programSchema);