const router = require('express').Router();
const fs = require('fs');
const path = require("path");
let notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { request } = require('http');

router.get('/notes', (req, res) => {
  res.json(notes);
});


router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});


// DELETE REQUEST THAT DOES NOT WORK...MAY COME BACK, FIX, AND RE-SUBMIT. IGNORE FOR NOW.
// router.delete('/notes/:id', (req, res) => {
// notes.removenote(req.params.id)
// request.db.get('notes').remove({'id': req.params.id}, function(error, document) {
//   if (error) res.send(error);
//   return res.send("deleted note");
// })
// });

router.post('/notes', (req, res) => {
let newNote = req.body;
newNote.id = uuidv4();
notes.push(newNote);
fs.writeFile(path.resolve(_dirname, "../db/db.json"), JSON.stringify(notes), function(err){
  if(err) {
    console.error(err);
    res.status(500).send("An error occurred, please try again");
  }
  else {
    res.json(newNote)
  }
})
});

module.exports = router;