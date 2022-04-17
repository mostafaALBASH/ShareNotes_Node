const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const User = require('../models/user');
const User = require('../models/user/user.model');
const Note = require('../models/note/note.model');

const jwt = require('jsonwebtoken');
const dbs = require("../dbs");
// const db = detectedDB.DEV
//const db = "mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb";
// mongoose.Promise = global.Promise;

function connectDB() {
  const prodENV = process.env.NODE_ENV === 'PROD';
  let db = dbs.DEV
  if (prodENV) {
    db = dbs.PROD
  }
  mongoose.connect(db, function (err) {
    console.log("db ==================>", db)
    if (err) {
      console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')
    }
  });
}

connectDB();

var _owner = '';
var _gender = '';

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'shhhhh');
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject;
  _owner = payload.subject;
  User.readUsersByUserId(_owner, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      _gender = data[0].gender;
    }
  })
  next()
}

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'shhhhh')
      res.status(200).send({ token })
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({ username: userData.username }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else
        if (user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'shhhhh')
          res.status(200).send({ token })
        }
    }
  })
});

router.post('/createnote', verifyToken, (req, res) => {
  let note = req.body;
  note.owner = _owner;
  Note.createNote(note, (err, resault) => {
    if (err) {
      console.log('err', err)
    } else {
      res.json(resault)
    }
  });
});

router.post('/readnotes', verifyToken, (req, res) => {
  let payload = req.body
  if (payload.privacyLevel == 3) {
    Note.readAllNotes(payload, (err, resault) => {
      if (err) {
        console.log(err)
      } else {
        res.json(resault);
      }
    })
  }
  else if (payload.privacyLevel == 2) {
    Note.readNotesByUserGender(payload, (err, resault) => {
      if (err) return handleError(err);
      var levelIdentified = resault.filter(x => {
        return x.owner.gender === _gender;
      });
      res.send(levelIdentified);
    })
  }
  else if (payload.privacyLevel == 1) {
    payload.userid = _owner
    Note.readNotesByUserId(payload, (err, resault) => {
      if (err) {
        console.log(err);
      } else {
        res.json(resault);
      }
    })
  }
});

router.get('/readusers', verifyToken, (req, res) => {
  User.readUsers((err, resault) => {
    if (err) {
      console.log(err)
    } else {
      res.json(resault);
    }
  })
});

module.exports = router;