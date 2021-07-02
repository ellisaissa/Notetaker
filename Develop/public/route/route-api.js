const router = require('express').Router();
const Notes = require('../db/db.json');

router.get("/notes", (req, res) => {
  Notes.getNotes().then(notes => {
    return res.json(notes)
  }).catch(err => {
    res.status(500).json(err)
  })
})

router.post("/notes", (req, res) => {
  Notes.addNotes(req.body).then(notes => {
    if (notes.length < 10) {
      notes.push(req.body);
      return res.json(true);
    } else {
      notes.push(req.body);
      return res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err)
    alert("error 505")
  })
})

router.delete("/notes/clear", (req, res) => {
  let notes = req.params.notes;

  for (let i = 0; i < notes.length; i++) {
    if (note === notes[i]) {
      return res.json(notes[i]--)
    }
  }
})

module.exports = router;