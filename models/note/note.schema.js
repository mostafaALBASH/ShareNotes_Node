const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    content: String,
    privacyLevel: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
  });

module.exports = noteSchema;


  /*
  noteSchema.virtual('owner', {
    ref: 'User', // The model to use
    localField: 'name', // Find people where `localField`
    foreignField: 'gender', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
   // ,options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  });
  */

/*
const Note = module.exports = mongoose.model('Note', noteSchema);

module.exports.createNote = (note, callbck) =>{
    Note.create(note, callbck)
}

module.exports.readNote = (callback, limit) =>{
    Note.find(callback).limit(limit);
}

*/
