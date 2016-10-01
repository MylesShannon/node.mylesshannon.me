var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Note = mongoose.model('Note');

module.exports = (app, auth) => {
  app.use('/api/v1/note', auth, router);
}

router.get('/', (req, res, next) => {
  Note.find({_creator: req.currentUser.id}).exec((err, data) => {
    if(!err && data) {
      if(data.length) {
        res.json(
          data.map((d) => { return d.toObject() })
        ).status(200);
      } else {
        res.json([]).status(200);
      }
    } else {
      res.status(404);
    }
  });
});

router.post('/', (req, res, next) => {
  var newNote = new Note({
    _creator: req.currentUser.id,
    title: req.query.title,
    subtitle: req.query.subtitle,
    body: req.query.body,
    title_color: req.query.title_color,
    body_color: req.query.body_color,
  });
  newNote.save((err) => {
    if (!err) {
      res.json({id: newNote.id}).status(200);
    } else {
      res.json({ msg: 'Error saving note', status: 500 }).status(500);
    }
  });
});

router.delete('/:noteId', (req, res, next) => {
  Note.findByIdAndRemove(req.params.noteId).populate('_creator').exec((err, data) => {
    if(!err) {
      res.json({id: req.params.noteId, msg: 'Note removed', status: 200 }).status(200);
    } else {
      res.json({ msg: 'Error removing note', status: 500 }).status(500);
    }
  });
});
