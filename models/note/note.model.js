
const mongoose = require('mongoose');
const noteSchema =  require('./note.schema');
const noteModel = mongoose.model('Note', noteSchema);
module.exports = noteModel;

noteModel.createNote = createNote;
noteModel.readAllNotes = readAllNotes;
noteModel.readNotesByUserGender = readNotesByUserGender;
noteModel.readNotesByUserId = readNotesByUserId;

function createNote(note, callbck) {
    noteModel.create(note, callbck)
}

function readAllNotes(payload, callback) {
    // noteModel.find({privacyLevel: payload.privacyLevel}).populate({path:'owner',match: {gender: payload.gender}, select:'gender username -_id'}).exec(callback);
    noteModel.find({privacyLevel: payload.privacyLevel}).populate({path:'owner'}).exec(callback);

}

function readNotesByUserGender(payload, callback) {
    // noteModel.find({privacyLevel: payload.privacyLevel}).populate({path:'owner',match: {gender: payload.gender}, select:'gender username -_id'}).
    // exec(callback);

    
    noteModel.find({privacyLevel: payload.privacyLevel}).populate({path:'owner'}).exec(callback);

    // noteModel.find({privacyLevel: payload.privacyLevel}).populate("owner").exec(callback);

}

function readNotesByUserId(payload, callback) {
    console.log("payload", payload)
    noteModel.find({owner: payload.userid, privacyLevel: payload.privacyLevel}).populate({path:'owner'}).exec(callback);
}
