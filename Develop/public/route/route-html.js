const path = require('path');
const router = require('express').Router();

router.get('/notes.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'develop/public/notes.html'))
});

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'develop/public/index.html'))
});

module.exports = router;