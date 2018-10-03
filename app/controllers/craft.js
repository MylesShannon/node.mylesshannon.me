var express = require('express'),
  router = express.Router(),
  ObjectID = require('mongodb').ObjectID,
  mongoose = require('mongoose'),
  Craft = mongoose.model('Craft');

router.get('/:craftId', (req, res, next) => {
  // GET craft data with supplied craft id
  User.find({ _id: req.query.craftId }, (err, craft) => {
    if(!err) {
      res.json({
        'content': craft,
        'status': 200
      }).status(200);
    } else if(err) {

    } else {
      res.json({
        'msg': 'No craft found',
        'status': 404
      }).status(404);
    }
  });
});

router.post('/', (req, res, next) => {
  // POST a new craft

  // insert new craft in "craft" table
  new Craft(req.query).save( (err, newCraftData) => {
    if(!err) {
      // find user and add new craft id to "crafts_by_id"
      User.update({ _id: req.currentUser.id }, {$push: {'_crafts_by_id': newCraftData._id} }, {upsert:true}, (err, user) => {
        if(!err) {
          res.json({
            'msg': 'Craft created',
            'craft_id': newCraftData._id,
            'status': 200
          }).status(200);
        } else {
          res.json({
            'msg': 'Error making new craft',
            'status': 500
          }).status(500);
        }
      });
    } else {
      res.json({
        'msg': 'Error making new craft',
        'status': 500
      }).status(500);
    }
  });
});

// update existing craft
router.put('/', (req, res, next) => {
  // Craft.update({_id: req.query.id, craft_name: req.query.craft_name, flight_controller: req.query.flight_controller, power_distribution_board: req.query.power_distribution_board, transmitter: req.query.transmitter, receiver: req.query.receiver, motors: req.query.motors, electronic_speed_controllers: req.query.electronic_speed_controllers, video_transmitter: req.query.video_transmitter, fpv_camera: req.query.fpv_camera}).exec((err) => {
  Craft.update({_id: req.query.id }, req.query ).exec((err) => {
    if(!err) {
      res.status(200).json({
        'msg': 'Craft updated!',
        'status': 200
      })
    } else {
      res.status(500).json({
        'msg': 'Error updating craft',
        'status': 500
      })
    }
  })
});

// DELETE a craft by id
router.delete('/:craftId', (req, res, next) => {
  Craft.findByIdAndRemove(req.params.craftId).exec((err) => {
    if(!err) {
      User.update({ _id: req.currentUser.id }, { $pull: { _crafts_by_id: req.params.craftId } }, (err) => {
        if(!err) {
          res.status(200).json({
            'msg': 'Craft deleted',
            'status': 200
          });
        } else {
          res.status(500).json({
            'msg': 'Error removing craft',
            'status': 500
          });
        }
      });
    } else {
      res.status(500).json({
        'msg': 'Error removing craft',
        'status': 500
      });
    }
  });
});

module.exports = (app, auth) => {
  app.use('/api/v1/craft', auth, router);
}
