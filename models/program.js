const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const reviewSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, required: true},
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
    enum: [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ], 
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