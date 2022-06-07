const router = require('express').Router();
const fs = require('fs');
const path = require("path");
let notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { request } = require('http');
const req = require('express/lib/request');

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
const noteId = req.params.id;
notes.splice(req.params.id, 1);
res.json(noteId)
});

router.post('/notes', (req, res) => {
  let newNote = req.body;
  newNote.id = uuidv4();
  notes.push(newNote);
  fs.writeFile(path.resolve(__dirname, "../db/db.json"), JSON.stringify(notes), function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred, please try again");
    }
    else {
      res.json(newNote)
    }
  })
});

module.exports = router;