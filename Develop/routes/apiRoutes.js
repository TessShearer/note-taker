const router = require('express').Router();
const fs = require('fs');
const path = require("path");
let notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

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

router.delete('/notes/:id', (req, res) => {
notes = notes.filter(function(id){
  return id != req.params.id;
})
  }
);

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